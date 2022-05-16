import { useIsFocused } from '@react-navigation/native';
import { observer } from 'mobx-react';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { StatusBar, Text, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import ParallaxScrollView from 'react-native-parallax-scroll-view';

import { LINKS } from '@/api/constants';
import IcChartUp from '@/assets/image/home/ic_chart_up.svg';
import IcChevronRight from '@/assets/image/home/ic_chevron_right.svg';
import IcDollar from '@/assets/image/home/ic_dollar.svg';
import IcSmartPhone from '@/assets/image/home/ic_smartphone.svg';
import IcWallet from '@/assets/image/home/ic_wallet.svg';
import LogoVfs from '@/assets/image/home/logo_vfs.svg';
import { ENUM_INVEST_STATUS } from '@/common/constants';
import Languages from '@/common/Languages';
import ScreenName, { TabsName } from '@/common/screenNames';
import Banner from '@/components/banner';
import { Touchable } from '@/components/elements/touchable';
import HeaderBar from '@/components/header';
import ItemInvest from '@/components/ItemInvest';
import Loading from '@/components/loading';
import { useAppStore } from '@/hooks';
import { BannerModel } from '@/models/banner';
import { DashBroad } from '@/models/dash';
import { PackageInvest } from '@/models/invest';
import Navigator from '@/routers/Navigator';
import { COLORS } from '@/theme';
import { SCREEN_HEIGHT } from '@/utils/DimensionUtils';
import Utils from '@/utils/Utils';
import IcNotify from '../../assets/image/header/ic_notify_header_home.svg';
import LogoHome from '../../assets/image/header/logo_home.svg';
import NotificationListening from './NotificationListening';
import { MyStylesHome } from './styles';
import KeyValue from '@/components/KeyValue';

const Home = observer(() => {
    const { apiServices, userManager } = useAppStore();
    const [btnInvest, setBtnInvest] = useState<string>(ENUM_INVEST_STATUS.INVEST_NOW);
    const isFocused = useIsFocused();
    const styles = MyStylesHome();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [banners, setBanners] = useState<BannerModel[]>();
    const [dataArr, setDataArr] = useState<PackageInvest[]>();
    const [dataDash, setDataDash] = useState<DashBroad>();

    useEffect(() => {
        setTimeout(() => {
            StatusBar.setBarStyle(isFocused ? 'light-content' : 'dark-content', true);
        }, 10);
    }, [isFocused]);

    useEffect(() => {
        fetchContractsDash();
        fetchDataInvest();
        fetchDataBanner();
    }, []);

    const onOpenVPS = useCallback(() => {
        Utils.openURL(LINKS.VPS);
    }, []);

    const fetchDataInvest = useCallback(async () => {
        setIsLoading(true);
        const resInvest = await apiServices.common.getListInvest();
        setIsLoading(false);
        if (resInvest.success) {
            const data = resInvest?.data as PackageInvest[];
            const temp = data.slice(0, 3);
            setDataArr(temp);
        }
    }, [apiServices.common]);

    const fetchContractsDash = useCallback(async () => {
        setIsLoading(true);
        const resContractsDash = await apiServices.common.getContractsDash();
        setIsLoading(false);
        if (resContractsDash.success) {
            const data = resContractsDash?.data as DashBroad;
            setDataDash(data);
        }
    }, [apiServices.common]);

    const fetchDataBanner = useCallback(async () => {
        setIsLoading(true);
        const resBanner = await apiServices.common.getBanners();
        if (resBanner.success) {
            const data = resBanner?.data as BannerModel[];
            setBanners(
                (data).filter((item) => item.image_mobile)
            );
        }
    }, [apiServices.common]);

    const gotoInvest = () => {
        Navigator.navigateToDeepScreen([TabsName.investTabs], ScreenName.investment, { types: ENUM_INVEST_STATUS.INVEST_NOW });
    };

    const navigateToDetail = useCallback((item: PackageInvest) => {
        if (userManager?.userInfo) {
            Navigator.navigateToDeepScreen([TabsName.homeTabs], ScreenName.detailInvestment, { status: btnInvest, id: item?.id });
        } else {
            Navigator.navigateToDeepScreen([ScreenName.authStack], ScreenName.auth, { titleAuth: Languages.auth.txtLogin });
        }
    }, [userManager?.userInfo, btnInvest]);

    const navigateToInvestNow = useCallback((item: PackageInvest) => {
        if (userManager?.userInfo) {
            Navigator.navigateToDeepScreen([TabsName.homeTabs], ScreenName.invest, { status: btnInvest, id: item?.id });
        } else {
            Navigator.navigateToDeepScreen([ScreenName.authStack], ScreenName.auth, { titleAuth: Languages.auth.txtLogin });
        }
    }, [userManager?.userInfo]);

    const gotoLogin = useCallback((titleAuth: string) => {
        setTimeout(() => {
            Navigator.navigateToDeepScreen([ScreenName.authStack], ScreenName.auth, { titleAuth });
        }, 1000);
    }, []);

    const renderNavigateScreen = useCallback((title: string) => {
        const onPress = () => {
            return gotoLogin(title);
        };
        return (
            <Touchable style={styles.tobAuth} onPress={onPress}>
                <Text style={styles.txtLogin}>{title}</Text>
            </Touchable>
        );
    }, [gotoLogin, styles.tobAuth, styles.txtLogin]);

    const onNotifyInvest = useCallback(() => {
        Navigator.navigateScreen(ScreenName.notifyInvest);
    }, []);

    const keyExtractor = useCallback((item: any, index: number) => {
        return `${index}${item.id}`;
    }, []);

    const iconTouchable = useCallback((title: string) => {
        switch (title) {
            case Languages.home.have:
                return <IcWallet />;
            case Languages.home.invest:
                return <IcDollar />;
            case Languages.home.report:
                return <IcChartUp />;
            case Languages.home.payment:
                return <IcSmartPhone />;
            default:
                return null;
        }
    }, []);

    const renderIconTab = useCallback((title: string) => {
        const onPress = () => {
            switch (title) {
                case Languages.home.have:
                    return Navigator.navigateToDeepScreen([TabsName.investTabs], ScreenName.investment, { types: ENUM_INVEST_STATUS.INVESTING });
                case Languages.home.invest:
                    return gotoInvest();
                case Languages.home.report:
                    return Navigator.navigateScreen(TabsName.reportTabs);
                case Languages.home.payment:
                    return Navigator.navigateScreen(TabsName.paymentTabs);
                default:
                    return null;
            }
        };
        return (
            <Touchable style={styles.tab} onPress={onPress}>
                {iconTouchable(title)}
                <Text style={styles.txtTab}>{title}</Text>
            </Touchable>
        );
    }, [iconTouchable, styles.tab, styles.txtTab]);


    const renderTabBottom = useCallback((text: string, hasDash?: boolean) => {
        return (
            <KeyValue
                title={text}
                noIndicator
                hasDashBottom={hasDash}
                rightIcon={<IcChevronRight />}
                styleTitle={styles.txtForEachTitleQuestion}
                containerContent={styles.featureContainer}
                disable={true}
            />
        );
    }, [styles.featureContainer, styles.txtForEachTitleQuestion]);

    const renderTop = useMemo(() => {
        return (
            <View style={styles.viewForeground}>
                <View style={styles.viewTopLogo}>
                    <LogoHome style={styles.logo} />
                    <Touchable style={styles.viewRightTop} onPress={onNotifyInvest}>
                        <IcNotify style={styles.imgNotify} />
                    </Touchable>
                </View>
                {userManager?.userInfo ?
                    <View style={styles.viewTop}>
                        <Text style={styles.txtSumInvest}>{Languages.home.sumInvest}</Text>
                        <View style={styles.viewSumInvestValue}>
                            <Text style={styles.txtSumInvestValue} numberOfLines={1}>
                                {Utils.formatMoney(dataDash?.so_du)}
                                <Text style={styles.txtVND}> {Languages.home.vnd}</Text>
                            </Text>
                        </View>
                        <View style={styles.wrapRow}>
                            <View style={styles.wrapTotalInterest}>
                                <View style={styles.txtLeft}>
                                    <Text style={styles.txtSumProfit}>{Languages.home.sumpProfit}</Text>
                                    <Text style={styles.txtTotalInterestReceived} numberOfLines={1} >

                                        {Utils.formatMoney(dataDash?.tong_goc_da_tra)}
                                        <Text style={styles.txtVNDSmall} >{Languages.home.vnd}</Text>
                                    </Text>
                                </View>
                            </View>
                            <View style={styles.wrapTotalInterest}>
                                <View style={styles.txtRight}>
                                    <Text style={styles.txtSumProfit}>{Languages.home.sumResidualProfit}</Text>
                                    <Text style={styles.txtTotalInterestExtant} numberOfLines={1}>
                                        {Utils.formatMoney(dataDash?.tong_lai_con_lai)}
                                        <Text style={styles.txtVNDSmall} >{Languages.home.vnd}</Text>
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    :
                    <View style={styles.viewTopCenter}>
                        <Text style={styles.txtHello}>{Languages.home.hello}</Text>
                        <Text style={styles.txtName}>{Languages.home.nameApp}</Text>
                        <Text style={styles.txtInvest}>{Languages.home.investAndAccumulate}</Text>
                    </View>}
                {userManager?.userInfo ?
                    <View style={styles.viewSmallMenu}>
                        {renderIconTab(Languages.home.have)}
                        {renderIconTab(Languages.home.invest)}
                        {renderIconTab(Languages.home.report)}
                        {renderIconTab(Languages.home.payment)}
                    </View>
                    :
                    <View style={styles.viewSmallMenuLogin}>
                        {renderNavigateScreen(Languages.auth.txtLogin)}
                        {renderNavigateScreen(Languages.auth.txtSignUp)}
                    </View>}
            </View>
        );
    }, [styles, onNotifyInvest, userManager?.userInfo, dataDash?.so_du, dataDash?.tong_goc_da_tra, dataDash?.tong_lai_con_lai, renderIconTab, renderNavigateScreen]);

    const renderFooter = useMemo(() => {
        return (
            <>
                {dataArr && <Touchable style={styles.more} onPress={gotoInvest}>
                    <Text style={[styles.txtForEachTitleQuestion, { color: COLORS.GREEN }]}>{Languages.home.more}</Text>
                </Touchable>
                }
                <Touchable style={styles.viewVfs} onPress={onOpenVPS}>
                    <LogoVfs />
                    <View style={styles.txtVfs}>
                        <Text style={styles.txtVPS}>{Languages.home.stockVfs}</Text>
                        <Text style={styles.txtForEachTitleQuestion}>{Languages.home.signFree}</Text>
                    </View>
                </Touchable>
                {banners && <Banner banners={banners} />}
                <View style={styles.wrapManualQuestion}>
                    <Text style={styles.txtTitleQuestion}>{Languages.home.question}</Text>
                    {renderTabBottom(Languages.home.todoInvest, true)}
                    {renderTabBottom(Languages.home.investNow, true)}
                    {renderTabBottom(Languages.home.percentCalculated, true)}
                    {renderTabBottom(Languages.home.paymentMethod, false)}
                </View>
            </>
        );
    }, [dataArr, styles.more, styles.txtForEachTitleQuestion, styles.viewVfs, styles.txtVfs, styles.txtVPS, styles.wrapManualQuestion, styles.txtTitleQuestion, onOpenVPS, banners, renderTabBottom]);


    const renderItem = useCallback((item: any) => {
        const onPressToInvestNow = () => {
            return navigateToInvestNow(item);
        };
        const onPressToDetail = () => {
            return navigateToDetail(item);
        };
        return (
            <ItemInvest
                onPress={onPressToDetail}
                onPressInvestNow={onPressToInvestNow}
                data={item}
                title={ENUM_INVEST_STATUS.INVEST_NOW}
            />
        );
    }, [navigateToDetail, navigateToInvestNow]);

    const renderItemInvestPackage = useCallback((item: any) => {
        return renderItem(item?.item);
    }, [renderItem]);

    const renderContent = useMemo(() => {
        return (
            <View style={styles.viewCenter}>
                <Text style={styles.txtCenter}>{Languages.home.investPackages}</Text>
                <FlatList
                    data={dataArr}
                    renderItem={renderItemInvestPackage}
                    ListFooterComponent={renderFooter}
                    keyExtractor={keyExtractor}
                    nestedScrollEnabled
                />
            </View>
        );
    }, [dataArr, keyExtractor, renderFooter, renderItemInvestPackage, styles.txtCenter, styles.viewCenter]);


    const renderBackground = () => {
        return (<HeaderBar exitApp imageBackground />);
    };

    const renderForeground = () => {
        return (renderTop);
    };

    return (
        <NotificationListening>
            <View style={styles.container}>
                <StatusBar
                    barStyle={'light-content'}
                    animated
                    translucent
                    backgroundColor={COLORS.TRANSPARENT}
                />
                <ParallaxScrollView
                    contentBackgroundColor={COLORS.TRANSPARENT}
                    backgroundColor={COLORS.TRANSPARENT}
                    parallaxHeaderHeight={SCREEN_HEIGHT * 0.38}
                    stickyHeaderHeight={SCREEN_HEIGHT * 0.12}
                    renderBackground={renderBackground}
                    renderForeground={renderForeground}>
                    {renderContent}
                </ParallaxScrollView>
                {isLoading && <Loading isOverview />}
            </View >
        </NotificationListening >
    );
});

export default Home;
