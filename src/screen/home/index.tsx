import { useIsFocused } from '@react-navigation/native';
import { observer } from 'mobx-react';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { StatusBar, Text, View, FlatList, Image, ImageBackground } from 'react-native';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import FastImage from 'react-native-fast-image';

import { LINKS } from '@/api/constants';
import AvatarIC from '@/assets/image/ic_avatar.svg';
import LogoVfs from '@/assets/image/home/logo_vfs.svg';
import { ENUM_INVEST_STATUS } from '@/common/constants';
import Languages from '@/common/Languages';
import ScreenName, { TabsName } from '@/common/screenNames';
import { Touchable } from '@/components/elements/touchable';
import ItemInvest from '@/components/ItemInvest';
import Loading from '@/components/loading';
import { useAppStore } from '@/hooks';
import { BannerHome, BannerModel } from '@/models/banner';
import { DashBroad } from '@/models/dash';
import { PackageInvest } from '@/models/invest';
import Navigator from '@/routers/Navigator';
import { COLORS } from '@/theme';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '@/utils/DimensionUtils';
import Utils from '@/utils/Utils';
import IcNotify from '../../assets/image/header/ic_notify_header_home.svg';
import LogoHome from '../../assets/image/header/logo_home.svg';
import NotificationListening from './NotificationListening';
import { MyStylesHome } from './styles';
import DraggableComponent from '@/components/Draggable';
import PopupInvestFirst, { PopupActions } from '@/components/popupInvestFirst';
import { MyImageView } from '@/components/image';
import DateUtils from '@/utils/DateUtils';
import { BaseModel } from '@/models/base-model';
import { isIOS } from '@/common/Configs';
import Images from '@/assets/Images';

const PAGE_SIZE = 3;

const Home = observer(() => {
    const { apiServices, userManager } = useAppStore();
    const [btnInvest, setBtnInvest] = useState<string>(ENUM_INVEST_STATUS.INVEST_NOW);
    const isFocused = useIsFocused();
    const styles = MyStylesHome();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [banners, setBanners] = useState<BannerModel[]>([]);
    const [dataArr, setDataArr] = useState<PackageInvest[]>();
    const [dataDash, setDataDash] = useState<DashBroad>();
    const [showFloating, setShowFloating] = useState<boolean>(true);
    const refPopupFirst = useRef<PopupActions>();
    const [iconBanner, setIconBanner] = useState<BannerHome>();
    const [unMore, setUnMore] = useState<boolean>(false);
    const ref = useRef();
    const condition = useRef({
        isLoading: true,
        offset: 0,
        canLoadMore: true
    });

    useEffect(() => {
        setShowFloating(true);
        setTimeout(() => {
            StatusBar.setBarStyle(isFocused ? 'light-content' : 'dark-content', true);
        }, 10);
    }, [isFocused]);

    useEffect(() => {
        fetchDataInvest();
        fetchDataBanner();
    }, []);

    useEffect(() => {
        if (isFocused) {
            condition.current.offset = 0;
            if (userManager.userInfo) {
                fetchContractsDash();
            }
        }
    }, [isFocused]);

    const onOpenVPS = useCallback(() => {
        Utils.openURL(LINKS.VPS);
    }, []);

    const fetchDataInvest = useCallback(async (isLoadMore?: boolean) => {
        if (!isLoadMore) {
            setIsLoading(true);
        }
        condition.current.isLoading = true;
        const resInvest = await apiServices.common.getListInvest(PAGE_SIZE, condition.current.offset);
        setIsLoading(false);
        if (resInvest.success) {
            const data = resInvest?.data as PackageInvest[];
            const dataSize = data.length;
            if (dataSize > 0) {
                if (isLoadMore) {
                    setDataArr((list) => [...list || [], ...data]);
                }
                else {
                    setDataArr(data);
                }
                condition.current.offset += dataSize;
            }
            condition.current.canLoadMore = dataSize >= PAGE_SIZE;
            setUnMore(dataSize >= PAGE_SIZE);
        }
        condition.current.isLoading = false;
        setIsLoading(false);

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
            setBanners(data);
        }
        const resBannerHome = await apiServices.common.getBannerHome();
        if (resBannerHome.success) {
            const bannerHome = resBannerHome?.data as BannerHome;
            setIconBanner(bannerHome);
        }
        setIsLoading(false);

    }, [apiServices.common]);

    const onMore = useCallback(() => {
        if (!condition.current.isLoading && condition.current.canLoadMore) {
            fetchDataInvest(true);
        }
    }, [fetchDataInvest]);

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
    }, [btnInvest, userManager?.userInfo]);

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

    const gotoProfile = useCallback(() => {
        Navigator.navigateToDeepScreen([ScreenName.tabs], TabsName.accountTabs);
    }, []);

    const keyExtractor = useCallback((item: any, index: number) => {
        return `${index}${item.id}`;
    }, []);

    const renderNewsItem = useCallback(({ item }: { item: BannerModel }) => {
        const navigate = () => {
            Navigator.pushScreen(ScreenName.myWedView, {
                title: item.title_vi,
                url: `https://tienngay.vn/${item.link.toString()}`
            });
        };

        return (
            <Touchable style={styles.newsItem} onPress={navigate}>
                <MyImageView
                    imageUrl={item.image}
                    resizeMode={'cover'}
                    style={styles.communicationImage}
                />

                <Text style={styles.txtCommunityTitle} numberOfLines={2}>
                    {item.title_vi}
                </Text>
                <Text style={styles.txtCommunityDes}>
                    {DateUtils.getLongFromDate(item.created_at)}
                </Text>
            </Touchable>
        );
    }, [styles.communicationImage, styles.newsItem, styles.txtCommunityDes, styles.txtCommunityTitle]);

    const keyExtractorBanner = useCallback((item: BaseModel) => {
        return `${item._id?.$oid}`;
    }, []);

    const renderNews = useMemo(() => {
        return (
            <FlatList
                data={banners}
                style={styles.newsContainer}
                renderItem={renderNewsItem}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={keyExtractorBanner}
            />
        );
    }, [banners, keyExtractorBanner, renderNewsItem]);

    const renderTop = useMemo(() => {
        return (
            <View style={styles.viewForeground}>
                {userManager?.userInfo ?
                    <>
                        <View style={styles.viewTop}>
                            <Text style={styles.txtSumInvest}>{Languages.home.sumInvest}</Text>
                            <View style={styles.viewSumInvestValueCenter}>
                                <Text style={styles.txtSumInvestValue}>
                                    {Utils.formatMoney(dataDash?.tong_tien_dau_tu)}
                                </Text>
                                <Text style={styles.txtVND}> {Languages.home.vnd}</Text>
                            </View>
                            <View style={styles.wrapRow}>
                                <View style={styles.wrapTotalInterest}>
                                    <View style={styles.txtLeft}>
                                        <Text style={styles.txtSumProfit}>{Languages.home.balanceVimo}</Text>
                                        <View style={styles.viewSumInvestValue}>
                                            <Text style={styles.txtTotalInterestReceived}>
                                                {Utils.formatMoney(dataDash?.so_du)}
                                            </Text>
                                            <Text style={styles.txtVNDSmall} >{Languages.home.vnd}</Text>
                                        </View>

                                    </View>
                                </View>
                                <View style={styles.wrapTotalInterest}>
                                    <View style={styles.txtRight}>
                                        <Text style={styles.txtSumProfit}>{Languages.home.sumpProfit}</Text>
                                        <View style={styles.viewSumInvestValue}>
                                            <Text style={styles.txtTotalInterestExtant} numberOfLines={1}>
                                                {Utils.formatMoney(dataDash?.tong_tien_lai)}
                                            </Text>
                                            <Text style={styles.txtVNDSmall} >{Languages.home.vnd}</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.wrapRow}>
                                <View style={styles.wrapTotalInterest}>
                                    <View style={styles.txtLeft}>
                                        <Text style={styles.txtSumProfit}>{Languages.home.totalCaption}</Text>
                                        <View style={styles.viewSumInvestValue}>
                                            <Text style={styles.txtTotalInterestReceived} >
                                                {Utils.formatMoney(dataDash?.tong_goc_con_lai)}
                                            </Text>
                                            <Text style={styles.txtVNDSmall} >{Languages.home.vnd}</Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={styles.wrapTotalInterest}>
                                    <View style={styles.txtRight}>
                                        <Text style={styles.txtSumProfit}>{Languages.home.sumResidualProfit}</Text>
                                        <View style={styles.viewSumInvestValue}>
                                            <Text style={styles.txtTotalInterestExtant} >
                                                {Utils.formatMoney(dataDash?.tong_lai_con_lai)}
                                            </Text>
                                            <Text style={styles.txtVNDSmall} >{Languages.home.vnd}</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>
                        <View style={styles.viewTopLogo}>
                            <Touchable onPress={gotoProfile} style={styles.circleWrap}>
                                {!userManager.userInfo?.avatar_user ?
                                    <AvatarIC width={SCREEN_WIDTH * 0.08} height={SCREEN_WIDTH * 0.08} />
                                    :
                                    <FastImage
                                        style={styles.fastImage}
                                        source={{
                                            uri: userManager.userInfo?.avatar_user
                                        }}
                                        resizeMode={FastImage.resizeMode.cover}
                                    />
                                }
                            </Touchable>
                            <Touchable style={styles.viewRightTop} onPress={onNotifyInvest}>
                                <IcNotify style={styles.imgNotify} width={SCREEN_WIDTH * 0.08} />
                            </Touchable>
                        </View>
                    </>
                    :
                    <>
                        <View style={styles.viewTopLogo}>
                            <LogoHome style={styles.logo} />
                        </View>
                        <View style={styles.viewTopCenter}>
                            <Text style={styles.txtHello}>{Languages.home.hello}</Text>
                            <Text style={styles.txtName}>{Languages.home.nameApp}</Text>
                            <Text style={styles.txtInvest}>{Languages.home.investAndAccumulate}</Text>
                        </View>
                    </>
                }
                {!userManager?.userInfo &&
                    <View style={isIOS ?styles.viewSmallMenuLoginIOS :styles.viewSmallMenuLoginAndroid }>
                        {renderNavigateScreen(Languages.auth.txtLogin)}
                        {renderNavigateScreen(Languages.auth.txtSignUp)}
                    </View>}
            </View>
        );
    }, [styles.viewForeground, styles.viewTop, styles.txtSumInvest, styles.viewSumInvestValueCenter, styles.txtSumInvestValue, styles.txtVND, styles.wrapRow, styles.wrapTotalInterest, styles.txtLeft, styles.txtSumProfit, styles.viewSumInvestValue, styles.txtTotalInterestReceived, styles.txtVNDSmall, styles.txtRight, styles.txtTotalInterestExtant, styles.viewTopLogo, styles.logo, styles.viewRightTop, styles.imgNotify, styles.viewTopCenter, styles.txtHello, styles.txtName, styles.txtInvest, styles.viewSmallMenuLoginIOS, styles.viewSmallMenuLoginAndroid, userManager?.userInfo, dataDash?.tong_tien_dau_tu, dataDash?.so_du, dataDash?.tong_tien_lai, dataDash?.tong_goc_con_lai, dataDash?.tong_lai_con_lai, gotoProfile, onNotifyInvest, renderNavigateScreen]);

    const renderFooter = useMemo(() => {
        return (
            <>
                <View style={styles.marginHorizontal}>
                    {dataArr && unMore && <Touchable style={styles.more} onPress={onMore}>
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
                    <Text style={styles.txtNews}>{Languages.home.newMedia}</Text>
                </View>
                {renderNews}
            </>
        );
    }, [dataArr, unMore, styles.more, styles.txtForEachTitleQuestion, styles.viewVfs, styles.txtVfs, styles.txtVPS, styles.viewBanner, styles.txtCenter, onMore, onOpenVPS, renderNews]);


    const renderItem = useCallback((item: any) => {
        const onPressToInvestNow = () => {
            return navigateToInvestNow(item);
        };
        const onPressToDetail = () => {
            return navigateToDetail(item);
        };
        return (
            <View style={styles.marginHorizontal}>
                <ItemInvest
                    onPress={onPressToDetail}
                    onPressInvestNow={onPressToInvestNow}
                    data={item}
                    title={ENUM_INVEST_STATUS.INVEST_NOW}
                />
            </View>
        );
    }, [navigateToDetail, navigateToInvestNow]);

    const renderItemInvestPackage = useCallback((item: any) => {
        return renderItem(item?.item);
    }, [renderItem]);


    const focusContracts = useCallback(() => {
        if (userManager?.userInfo) {
            Navigator.navigateToDeepScreen([TabsName.investTabs], ScreenName.investment, { types: ENUM_INVEST_STATUS.INVEST_NOW });
        } else {
            Navigator.navigateToDeepScreen([ScreenName.authStack], ScreenName.auth, { titleAuth: Languages.auth.txtLogin });
        }
    }, []);

    const renderContent = useMemo(() => {

        console.log('dataArr: ', dataArr);
        return (
            <View style={userManager?.userInfo ? [{ marginTop: - SCREEN_HEIGHT * 0.03 }] : {}}>
                <Text style={styles.txtCenter}>{Languages.home.investPackages}</Text>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    ref={ref}
                    data={dataArr}
                    renderItem={renderItemInvestPackage}
                    ListFooterComponent={renderFooter}
                    keyExtractor={keyExtractor}
                    nestedScrollEnabled
                />
            </View>
        );
    }, [dataArr, keyExtractor, renderFooter, renderItemInvestPackage, styles.txtCenter, styles.viewCenter, userManager?.userInfo]);


    const renderBackground = () => {
        return (<ImageBackground source={Images.bg_header_home} style={styles.imageBg} resizeMode='stretch' />);
    };

    const renderForeground = () => {
        return (renderTop);
    };

    const showFirstPopup = () => {
        refPopupFirst.current?.show();
    };

    return (
        <NotificationListening>
            <View style={styles.container}>
                <ParallaxScrollView
                    contentBackgroundColor={COLORS.TRANSPARENT}
                    backgroundColor={COLORS.TRANSPARENT}
                    parallaxHeaderHeight={SCREEN_HEIGHT * 0.4}
                    stickyHeaderHeight={SCREEN_HEIGHT * 0.12}
                    renderBackground={renderBackground}
                    renderForeground={renderForeground}
                >
                    {renderContent}
                </ParallaxScrollView>
                {showFloating && (
                    <DraggableComponent
                        image={iconBanner?.icon}
                        x={SCREEN_WIDTH - 110}
                        renderSize={100}
                        isCircle
                        shouldReverse
                        onShortPressRelease={showFirstPopup}
                        onClose={() => setShowFloating(false)}
                    />
                )}
                <PopupInvestFirst
                    ref={refPopupFirst}
                    image={iconBanner?.image}
                    onConfirm={focusContracts}
                />
                {isLoading && <Loading isOverview />}
            </View >
        </NotificationListening >
    );
});

export default Home;
