
import PasscodeAuth from '@el173/react-native-passcode-auth';
import { observer } from 'mobx-react';
import React, { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { FlatList, ImageBackground, StatusBar, Text, View } from 'react-native';
import Dash from 'react-native-dash';
import FastImage from 'react-native-fast-image';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import { useIsFocused } from '@react-navigation/native';

import { LINKS } from '@/api/constants';
import LogoVfs from '@/assets/image/home/logo_vfs.svg';
import AvatarIC from '@/assets/image/ic_avatar.svg';
import Images from '@/assets/Images';
import { isIOS } from '@/common/Configs';
import { ENUM_BIOMETRIC_TYPE, ENUM_INVEST_STATUS } from '@/common/constants';
import Languages from '@/common/Languages';
import ScreenName, { TabsName } from '@/common/screenNames';
import DraggableComponent from '@/components/Draggable';
import { Touchable } from '@/components/elements/touchable';
import { MyImageView } from '@/components/image';
import ItemInvest from '@/components/ItemInvest';
import Loading from '@/components/loading';
import PopupInvestFirst, { PopupActions } from '@/components/popupInvestFirst';
import { useAppStore } from '@/hooks';
import SessionManager from '@/manager/SessionManager';
import { BannerHome, BannerModel } from '@/models/banner';
import { BaseModel } from '@/models/base-model';
import { DashBroad } from '@/models/dash';
import { PackageInvest } from '@/models/invest';
import { UserInfoModal } from '@/models/user-models';
import Navigator from '@/routers/Navigator';
import { COLORS } from '@/theme';
import DateUtils from '@/utils/DateUtils';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '@/utils/DimensionUtils';
import Utils from '@/utils/Utils';
import IcNotify from '../../assets/image/header/ic_notify_header_home.svg';
import LogoHome from '../../assets/image/header/logo_home.svg';
import NotificationListening from './NotificationListening';
import { MyStylesHome } from './styles';

const PAGE_SIZE = 3;

const Home = observer(() => {
    const {
        apiServices,
        userManager,
        fastAuthInfoManager
    } = useAppStore();
    const [btnInvest, setBtnInvest] = useState<string>(ENUM_INVEST_STATUS.INVEST_NOW);
    const isFocused = useIsFocused();
    const styles = MyStylesHome();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [banners, setBanners] = useState<BannerModel[]>([]);
    const [dataArr, setDataArr] = useState<PackageInvest[]>();
    const [dataDash, setDataDash] = useState<DashBroad>();
    const [showFloating, setShowFloating] = useState<boolean>(true);
    const refPopupFirst = useRef<PopupActions>(null);
    const [iconBanner, setIconBanner] = useState<BannerHome>();
    const [unMore, setUnMore] = useState<boolean>(false);
    const ref = useRef(null);
    const condition = useRef({
        isLoading: true,
        offset: 0,
        canLoadMore: true
    });

    useLayoutEffect(() => {
        if (isFocused) {
            setTimeout(() => {
                StatusBar.setBarStyle(isFocused ? 'light-content' : 'dark-content', true);
            }, 500);
        }

    }, [isFocused]);

    useEffect(() => {
        condition.current.offset = 0;
        fetchDataInvest();
        fetchDataBanner();
        auth();
    }, []);

    useEffect(() => {
        if (isFocused) {
            if (SessionManager.accessToken) {
                getInfo();
            }
        }
    }, [isFocused]);


    const auth = useCallback(() => {
        if (fastAuthInfoManager.isEnableFastAuth && fastAuthInfoManager?.supportedBiometry === ENUM_BIOMETRIC_TYPE.FACE_ID) {

            PasscodeAuth.authenticate(Languages.quickAuThen.description)
                .then(() => {
                    fastAuthInfoManager.setEnableFastAuthentication(false);
                })
                .catch(() => { });
        }
    }, [fastAuthInfoManager]);

    useEffect(() => {
        if (isFocused) {
            if (userManager.userInfo) {
                fetchContractsDash();
            }
        }
    }, [isFocused]);

    const getInfo = useCallback(async () => {
        const resInfoAcc = await apiServices.auth.getUserInfo();
        if (resInfoAcc.success) {
            const data = resInfoAcc?.data as UserInfoModal;
            userManager.updateUserInfo({
                ...data
            });
        }
    }, [apiServices.auth, userManager]);

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
            if (bannerHome && bannerHome.icon && bannerHome.image) {
                setTimeout(() => {
                    setShowFloating(true);
                    showFirstPopup();
                }, 500);
            }
        }
        setIsLoading(false);

    }, [apiServices.common]);

    const onMore = useCallback(() => {
        if (!condition.current.isLoading && condition.current.canLoadMore) {
            fetchDataInvest(true);
        }
    }, [fetchDataInvest]);

    const navigateToDetail = useCallback((item: PackageInvest) => {
        if (userManager?.userInfo && !fastAuthInfoManager?.isEnableFastAuth) {
            Navigator.navigateToDeepScreen([ScreenName.packageInvestStack], ScreenName.detailInvestment, { status: btnInvest, id: item?.id });
        } else {
            Navigator.navigateToDeepScreen([ScreenName.authStack], ScreenName.auth, { titleAuth: Languages.auth.txtLogin });
        }
    }, [userManager?.userInfo, fastAuthInfoManager?.isEnableFastAuth, btnInvest]);

    const navigateToInvestNow = useCallback((item: PackageInvest) => {
        if (userManager?.userInfo && !fastAuthInfoManager?.isEnableFastAuth) {
            Navigator.navigateToDeepScreen([ScreenName.packageInvestStack], ScreenName.invest, { status: btnInvest, id: item?.id });
        } else {
            Navigator.navigateToDeepScreen([ScreenName.authStack], ScreenName.auth, { titleAuth: Languages.auth.txtLogin });
        }
    }, [btnInvest, fastAuthInfoManager?.isEnableFastAuth, userManager?.userInfo]);

    const gotoLogin = useCallback((titleAuth: string) => {
        setTimeout(() => {
            Navigator.navigateToDeepScreen([ScreenName.authStack], ScreenName.auth, { titleAuth });
        }, 1000);
    }, []);

    const renderNavigateScreen = useCallback((title: string) => {
        const onPress = () => gotoLogin(title);
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

    const keyExtractor = useCallback((item: any, index: number) => `${index}${item.id}`, []);

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

    const keyExtractorBanner = useCallback((item: BaseModel) => `${item._id?.$oid}`, []);

    const renderNews = useMemo(() => (
        <FlatList
            data={banners}
            style={styles.newsContainer}
            renderItem={renderNewsItem}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={keyExtractorBanner}
        />
    ), [banners, keyExtractorBanner, renderNewsItem, styles.newsContainer]);

    const renderTop = useMemo(() => (
        <View style={styles.viewForeground}>
            {(userManager?.userInfo && !fastAuthInfoManager.isEnableFastAuth) ?
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
            {(!userManager?.userInfo || fastAuthInfoManager.isEnableFastAuth)  &&
                    <View style={isIOS ? styles.viewSmallMenuLoginIOS : styles.viewSmallMenuLoginAndroid}>
                        {renderNavigateScreen(Languages.auth.txtLogin)}
                        {renderNavigateScreen(Languages.auth.txtSignUp)}
                    </View>
            }
        </View>
    ), [styles.viewForeground, styles.viewTop, styles.txtSumInvest, styles.viewSumInvestValueCenter, styles.txtSumInvestValue, styles.txtVND, styles.wrapRow, styles.wrapTotalInterest, styles.txtLeft, styles.txtSumProfit, styles.viewSumInvestValue, styles.txtTotalInterestReceived, styles.txtVNDSmall, styles.txtRight, styles.txtTotalInterestExtant, styles.viewTopLogo, styles.circleWrap, styles.fastImage, styles.viewRightTop, styles.imgNotify, styles.logo, styles.viewTopCenter, styles.txtHello, styles.txtName, styles.txtInvest, styles.viewSmallMenuLoginIOS, styles.viewSmallMenuLoginAndroid, userManager.userInfo, fastAuthInfoManager.isEnableFastAuth, dataDash?.tong_tien_dau_tu, dataDash?.so_du, dataDash?.tong_tien_lai, dataDash?.tong_goc_con_lai, dataDash?.tong_lai_con_lai, gotoProfile, onNotifyInvest, renderNavigateScreen]);

    const renderFooter = useMemo(() => (
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
    ), [styles.marginHorizontal, styles.more, styles.txtForEachTitleQuestion, styles.viewVfs, styles.txtVfs, styles.txtVPS, styles.txtNews, dataArr, unMore, onMore, onOpenVPS, renderNews]);


    const renderItem = useCallback((item: any) => {
        const onPressToInvestNow = () => navigateToInvestNow(item);
        const onPressToDetail = () => navigateToDetail(item);
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
    }, [navigateToDetail, navigateToInvestNow, styles.marginHorizontal]);

    const renderItemInvestPackage = useCallback((item: any) => renderItem(item?.item), [renderItem]);


    const focusContracts = useCallback(() => {
        if (userManager?.userInfo && !fastAuthInfoManager.isEnableFastAuth) {
            Navigator.navigateToDeepScreen([TabsName.investTabs], ScreenName.investment, { types: ENUM_INVEST_STATUS.INVEST_NOW });
        } else {
            Navigator.navigateToDeepScreen([ScreenName.authStack], ScreenName.auth, { titleAuth: Languages.auth.txtLogin });
        }
    }, [fastAuthInfoManager.isEnableFastAuth, userManager?.userInfo]);

    const renderBottom = useMemo(() => (
        <View style={styles.viewBottom}>
            <Text style={styles.txtCenter}>{Languages.home.reasonInvest}</Text>
            <View style={styles.viewReason}>
                <Text style={styles.txtReason}>{Languages.home.reasonOne}</Text>
                <Dash dashThickness={1} dashLength={10} dashGap={5} dashColor={COLORS.GRAY_13} />
                <Text style={styles.txtReason}>{Languages.home.reasonTwo}</Text>
                <Dash dashThickness={1} dashLength={10} dashGap={5} dashColor={COLORS.GRAY_13} />
                <Text style={styles.txtReason}>{Languages.home.reasonThree}</Text>
                <Dash dashThickness={1} dashLength={10} dashGap={5} dashColor={COLORS.GRAY_13} />
                <Text style={styles.txtReason}>{Languages.home.reasonFour}</Text>
                <Dash dashThickness={1} dashLength={10} dashGap={5} dashColor={COLORS.GRAY_13} />
                <Text style={styles.txtReason}>{Languages.home.reasonFive}</Text>
            </View>
        </View>
    ), [styles.txtCenter, styles.txtReason, styles.viewBottom, styles.viewReason]);

    const renderContent = useMemo(() => (
        <View style={!userManager?.userInfo || fastAuthInfoManager.isEnableFastAuth ? {} : [{ marginTop: - SCREEN_HEIGHT * 0.04 }]}>
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
            {renderBottom}
        </View>
    ), [dataArr, fastAuthInfoManager.isEnableFastAuth, keyExtractor, renderBottom, renderFooter, renderItemInvestPackage, styles.txtCenter, userManager?.userInfo]);


    const renderStatusBar = useMemo(() => (
        <StatusBar
            animated
            translucent
            backgroundColor={COLORS.TRANSPARENT}
            barStyle={'light-content'}
        />
    ), []);

    const renderBackground = useMemo(() => (
        <>
            {renderStatusBar}
            < ImageBackground source={Images.bg_header_home} style={styles.imageBg} resizeMode='stretch' />
        </>
    ), [renderStatusBar, styles.imageBg]);

    const renderForeground = () => (renderTop);

    const showFirstPopup = () => {
        refPopupFirst.current?.show();
    };

    return (
        <NotificationListening>
            <View style={styles.container}>
                {renderStatusBar}
                <ParallaxScrollView
                    contentBackgroundColor={COLORS.TRANSPARENT}
                    backgroundColor={COLORS.TRANSPARENT}
                    parallaxHeaderHeight={SCREEN_HEIGHT * 0.4}
                    stickyHeaderHeight={SCREEN_HEIGHT * 0.12}
                    renderBackground={() => renderBackground}
                    renderForeground={renderForeground}
                >
                    {renderContent}
                </ParallaxScrollView>
                {(showFloating && iconBanner?.icon && iconBanner?.image) ?
                    <DraggableComponent
                        image={iconBanner?.icon}
                        x={SCREEN_WIDTH - 110}
                        renderSize={100}
                        isCircle
                        shouldReverse
                        onShortPressRelease={showFirstPopup}
                        onClose={() => setShowFloating(false)}
                    />
                    : <View></View>}
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
