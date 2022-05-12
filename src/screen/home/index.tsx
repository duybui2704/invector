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
import IcLine from '@/assets/image/home/ic_line_home.svg';
import IcSmartPhone from '@/assets/image/home/ic_smartphone.svg';
import IcWallet from '@/assets/image/home/ic_wallet.svg';
import LogoVfs from '@/assets/image/home/logo_vfs.svg';
import { Configs } from '@/common/Configs';
import { ENUM_INVEST_STATUS } from '@/common/constants';
import Languages from '@/common/Languages';
import ScreenName, { TabsName } from '@/common/screenNames';
import Banner from '@/components/banner';
import { Touchable } from '@/components/elements/touchable';
import HeaderBar from '@/components/header';
import ItemInvest from '@/components/ItemInvest';
import Loading from '@/components/loading';
import { useAppStore } from '@/hooks';
import SessionManager from '@/manager/SessionManager';
import { BannerModel } from '@/models/banner';
import { DashBroad } from '@/models/dash';
import { PackageInvest } from '@/models/invest';
import { NewsModel } from '@/models/news';
import Navigator from '@/routers/Navigator';
import { COLORS } from '@/theme';
import DimensionUtils from '@/utils/DimensionUtils';
import Utils from '@/utils/Utils';
import IcNotify from '../../assets/image/header/ic_notify_header_home.svg';
import LogoHome from '../../assets/image/header/logo_home.svg';
import NotificationListening from './NotificationListening';
import { MyStylesHome } from './styles';


const Home = observer(() => {
    const [btnInvest, setBtnInvest] = useState<string>(ENUM_INVEST_STATUS.INVEST_NOW);
    const isFocused = useIsFocused();
    const styles = MyStylesHome();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [banners, setBanners] = useState<BannerModel[]>();
    const [news, setNews] = useState<NewsModel[]>();
    const [dataArr, setDataArr] = useState<PackageInvest[]>();
    const [dataDash, setDataDash] = useState<DashBroad>();
    const [insurances, setInsurances] = useState<NewsModel[]>();
    const { apiServices } = useAppStore();

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

        const resNews = await apiServices.common.getNews();
        if (resNews.success) {
            const data = resNews?.data as NewsModel[];
            setNews(data);
        }

        const resInsurances = await apiServices.common.getInsurances();
        if (resInsurances.success) {
            const data = resInsurances?.data as NewsModel[];
            setInsurances(data);
        }
    }, [apiServices.common]);

    const gotoInvestHistory = () => {

        Navigator.navigateToDeepScreen([TabsName.investTabs], ScreenName.investment, { types: ENUM_INVEST_STATUS.INVESTING });
    };

    const gotoInvest = () => {
        Navigator.navigateToDeepScreen([TabsName.investTabs], ScreenName.investment, { types: ENUM_INVEST_STATUS.INVEST_NOW });
    };

    const gotoReport = () => {
        Navigator.navigateScreen(TabsName.reportTabs);
    };

    const gotoPayment = () => {
        Navigator.navigateScreen(TabsName.paymentTabs);
    };

    const onOpenVPS = useCallback(() => {
        Utils.openURL(LINKS.VPS);
    }, []);

    const navigateToDetail = useCallback((item: any) => {
        if (SessionManager.accessToken) {
            Navigator.navigateToDeepScreen([TabsName.homeTabs], ScreenName.detailInvestment, { status: btnInvest, id: item?.id });
        } else {
            Navigator.navigateToDeepScreen([ScreenName.authStack], ScreenName.auth, { titleAuth: Languages.auth.txtLogin });
        }
    }, [btnInvest]);

    const navigateToInvestNow = useCallback((item: any) => {
        if (SessionManager.accessToken) {
            Navigator.navigateToDeepScreen([TabsName.homeTabs], ScreenName.invest, { status: btnInvest, id: item?.id });
        } else {
            Navigator.navigateToDeepScreen([ScreenName.authStack], ScreenName.auth, { titleAuth: Languages.auth.txtLogin });
        }
    }, [btnInvest]);

    const gotoLogin = useCallback((titleAuth: string) => {
        setTimeout(() => {
            Navigator.navigateToDeepScreen([ScreenName.authStack], ScreenName.auth, { titleAuth });
        }, 1000);
    }, []);

    const onNotifyInvest = useCallback(() => {
        Navigator.navigateScreen(ScreenName.notifyInvest);
    }, []);

    const renderItem = useCallback((item: any) => {
        return (
            <ItemInvest
                onPress={() => navigateToDetail(item)}
                onPressInvestNow={() => navigateToInvestNow(item)}
                data={item}
                title={ENUM_INVEST_STATUS.INVEST_NOW}
            />
        );
    }, [navigateToDetail, navigateToInvestNow]);

    const keyExtractor = useCallback((item: any, index: number) => {
        return `${index}${item.id}`;
    }, []);

    const iconTouchable = useCallback((title: string) => {
        switch (title) {
            case Languages.home.have:
                return <IcWallet width={20} height={20} />;
            case Languages.home.invest:
                return <IcDollar width={20} height={20} />;
            case Languages.home.report:
                return <IcChartUp width={20} height={20} />;
            case Languages.home.payment:
                return <IcSmartPhone width={20} height={20} />;
            default:
                return null;
        }
    }, []);

    const renderIconTob = useCallback((gotoScreen: any, title: string) => {
        return (
            <Touchable style={styles.tob} onPress={gotoScreen}>
                {iconTouchable(title)}
                <Text style={styles.txtTob}>{title}</Text>
            </Touchable>
        );
    }, [iconTouchable, styles.tob, styles.txtTob]);

    const renderTobBottom = useCallback((text: string) => {
        return (
            <Touchable style={styles.txtQuestion}>
                <View style={styles.viewTxtBottom}>
                    <Text style={styles.txt5}>{text}</Text>
                </View>
                <Touchable style={styles.icon}>
                    <IcChevronRight width={20} height={20} />
                </Touchable>
            </Touchable>
        );
    }, [styles.icon, styles.txt5, styles.txtQuestion, styles.viewTxtBottom]);

    const renderFooter = useCallback(() => {
        return (
            <>
                {dataArr && <Touchable style={styles.more} onPress={gotoInvest}>
                    <Text style={[styles.txt5, { color: COLORS.GREEN }]}>{Languages.home.more}</Text>
                </Touchable>
                }
                <Touchable style={styles.viewVfs} onPress={onOpenVPS}>
                    <View style={styles.logoVfs}>
                        <LogoVfs width={90} height={90} />
                    </View>
                    <View style={styles.txtVfs}>
                        <Text style={[styles.txt4, { color: COLORS.RED_2 }]}>{Languages.home.stockVfs}</Text>
                        <Text style={styles.txt5}>{Languages.home.signFree}</Text>
                    </View>
                </Touchable>
                {banners && <Banner banners={banners} />}
                <View style={styles.viewBottom}>
                    <View style={styles.txtQuestionTop}><Text
                        style={styles.txt}>{Languages.home.question}</Text></View>
                    {renderTobBottom(Languages.home.todoInvest)}
                    <IcLine width={'100%'} />
                    {renderTobBottom(Languages.home.investNow)}
                    <IcLine width={'100%'} />
                    {renderTobBottom(Languages.home.percentCalculated)}
                    <IcLine width={'100%'} />
                    {renderTobBottom(Languages.home.paymentMethod)}
                </View></>
        );
    }, [banners, dataArr, onOpenVPS, renderTobBottom, styles.logoVfs, styles.more, styles.txt, styles.txt4, styles.txt5, styles.txtQuestionTop, styles.txtVfs, styles.viewBottom, styles.viewVfs]);

    const renderViewFooter = useMemo(() => {
        return (
            <View style={styles.viewForeground}>
                <View style={styles.viewTopLogo}>
                    <LogoHome
                        width={DimensionUtils.SCREEN_HEIGHT * 0.18}
                        height={DimensionUtils.SCREEN_HEIGHT * 0.18}
                        style={styles.logo}
                    />
                    <Touchable style={styles.viewRightTop} onPress={onNotifyInvest}>
                        <IcNotify style={styles.imgNotify} width={30} height={30} />
                    </Touchable>
                </View>
                {SessionManager.accessToken ?
                    <View style={styles.viewTop}>
                        <Text style={styles.txt1}>{Languages.home.sumInvest}</Text>
                        <View style={styles.viewTop2}>
                            <Text style={styles.txt2} numberOfLines={1}>
                                {Utils.formatMoney(dataDash?.so_du)}
                                <Text style={styles.txt4}> {Languages.home.vnd}</Text>
                            </Text>
                        </View>
                        <View style={styles.viewTop1}>
                            <View style={styles.viewTop3}>
                                <View style={styles.txtLeft}>
                                    <Text style={styles.txt3}>{Languages.home.sumpProfit}</Text>
                                    <Text style={styles.txt7} numberOfLines={1}
                                    >
                                        {Utils.formatMoney(dataDash?.tong_goc_da_tra)}{ }
                                        <Text style={
                                            [styles.txt4, { fontSize: Configs.FontSize.size10 }]}
                                        >{Languages.home.vnd}</Text>
                                    </Text>
                                </View>
                            </View>
                            <View style={styles.viewTop3}>
                                <View style={styles.txtRight}>
                                    <Text style={styles.txt3}>{Languages.home.sumResidualProfit}</Text>
                                    <Text style={styles.txt6} numberOfLines={1}>
                                        {Utils.formatMoney(dataDash?.tong_lai_con_lai)}
                                        <Text style={
                                            [styles.txt4, { fontSize: Configs.FontSize.size10 }]}
                                        >{Languages.home.vnd}</Text>

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
                {SessionManager.accessToken ?
                    <View style={styles.viewTob}>
                        {renderIconTob(gotoInvestHistory, Languages.home.have)}
                        {renderIconTob(gotoInvest, Languages.home.invest)}
                        {renderIconTob(gotoReport, Languages.home.report)}
                        {renderIconTob(gotoPayment, Languages.home.payment)}
                    </View>
                    :
                    <View style={styles.viewTob}>
                        <Touchable style={styles.tobAuth} onPress={() => gotoLogin(Languages.auth.txtLogin)}>
                            <Text style={styles.txtLogin}>{Languages.auth.txtLogin}</Text>
                        </Touchable>
                        <Touchable style={styles.tobAuth} onPress={() => gotoLogin(Languages.auth.txtSignUp)}>
                            <Text style={styles.txtLogin}>{Languages.auth.txtSignUp}</Text>
                        </Touchable>
                    </View>}

            </View>
        );
    }, [dataDash?.so_du, dataDash?.tong_goc_da_tra, dataDash?.tong_lai_con_lai, gotoLogin, onNotifyInvest, renderIconTob, styles.imgNotify, styles.logo, styles.tobAuth, styles.txt1, styles.txt2, styles.txt3, styles.txt4, styles.txt6, styles.txt7, styles.txtHello, styles.txtInvest, styles.txtLeft, styles.txtLogin, styles.txtName, styles.txtRight, styles.viewForeground, styles.viewRightTop, styles.viewTob, styles.viewTop, styles.viewTop1, styles.viewTop2, styles.viewTop3, styles.viewTopCenter, styles.viewTopLogo]);

    const renderContent = useMemo(() => {
        return (
            <View style={styles.viewCenter}>
                <Text style={styles.txtCenter}>{Languages.home.investPackages}</Text>
                <FlatList
                    style={styles.viewFlatList}
                    data={dataArr}
                    renderItem={(item) => renderItem(item.item)}
                    ListFooterComponent={renderFooter}
                    ListFooterComponentStyle={styles.viewFlatList}
                    keyExtractor={keyExtractor}
                    nestedScrollEnabled
                />
            </View>
        );
    }, [dataArr, keyExtractor, renderFooter, renderItem, styles.txtCenter, styles.viewCenter, styles.viewFlatList]);

    return (
        <NotificationListening>
            <View style={styles.main}>
                <StatusBar
                    barStyle={'light-content'}
                    animated
                    translucent
                    backgroundColor={COLORS.TRANSPARENT}
                />
                <ParallaxScrollView
                    contentBackgroundColor={COLORS.TRANSPARENT}
                    backgroundColor={COLORS.TRANSPARENT}
                    parallaxHeaderHeight={DimensionUtils.SCREEN_HEIGHT * 0.38}
                    stickyHeaderHeight={DimensionUtils.SCREEN_HEIGHT * 0.12}
                    renderBackground={() => (
                        <HeaderBar exitApp imageBackground />
                    )}
                    renderForeground={() => renderViewFooter}>
                    {renderContent}
                </ParallaxScrollView>
                {isLoading && <Loading isOverview />}
            </View >
        </NotificationListening >
    );
});

export default Home;
