import { useIsFocused } from '@react-navigation/native';
import { observer } from 'mobx-react';
import React, { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { ImageBackground, Platform, StatusBar, Text, View } from 'react-native';

import LogoAuth from '@/assets/image/auth/logo_auth.svg';
import IcCloseAuth from '@/assets/image/auth/ic_close_auth.svg';
import IcApple from '@/assets/image/auth/ic_apple.svg';
import IcFaceAuth from '@/assets/image/ic_login_fb.svg';
import IcGoogleAuth from '@/assets/image/ic_login_gg.svg';
import Images from '@/assets/Images';
import Languages from '@/common/Languages';
import { Touchable } from '@/components/elements/touchable';
import { useAppStore } from '@/hooks';
import Login from '@/screen/auth/login';
import SvgComponent from '@/screen/auth/SvgText';
import { COLORS } from '@/theme';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '@/utils/DimensionUtils';
import { loginWithApple, loginWithFacebook, loginWithGoogle } from '@/utils/SociaAuth';
import ForgotPass from './forgotPass';
import LoginWithBiometry from './loginWithBiometrty';
import SignUp from './signUp';
import { myStylesAuth } from './styles';
import Navigator from '@/routers/Navigator';
import ScreenName, { TabNamesArray, TabsName } from '@/common/screenNames';
import ToastUtils from '@/utils/ToastUtils';
import SessionManager from '@/manager/SessionManager';
import { LoginWithThirdPartyModel } from '@/models/auth';
import { UserInfoModal } from '@/models/user-models';
import { ENUM_PROVIDER } from '@/common/constants';
import { PopupInvestOTP, PopupOTPLogin } from '@/components/popupOTPLogin';
import { PopupActionTypes } from '@/models/typesPopup';


const Auth = observer(({ route }: any) => {
    const styles = myStylesAuth();
    const ratio = SCREEN_HEIGHT / SCREEN_WIDTH;
    const [wid, setWid] = useState<number>(0);
    const [data, setData] = useState<LoginWithThirdPartyModel>();
    const [dataGoogle, setDataGoogle] = useState<LoginWithThirdPartyModel>();
    const [isNavigate, setIsNavigate] = useState<string>(Languages.auth.txtLogin);
    const isFocused = useIsFocused();
    const [isLoading, setLoading] = useState<boolean>(false);
    const refModal = useRef<PopupActionTypes>(null);
    const {
        fastAuthInfoManager: fastAuthInfo,
        common,
        apiServices,
        userManager
    } = useAppStore();

    useLayoutEffect(() => {
        if (common.successChangePass) {
            ToastUtils.showSuccessToast(Languages.auth.successChangePass);
        }
    }, [common.successChangePass]);

    useEffect(() => {
        setTimeout(() => {
            StatusBar.setBarStyle(isFocused ? 'light-content' : 'dark-content', true);
        }, 100);
    }, [isFocused]);

    useEffect(() => {
        if (route?.params) {
            setIsNavigate(route?.params.titleAuth);
        }
        screenRatio();
    }, []);

    const screenRatio = useCallback(() => {
        console.log(SCREEN_HEIGHT, SCREEN_WIDTH, ratio);
        if (ratio <= 1.7) {
            setWid(SCREEN_WIDTH * 0.65);
        }
        else if (ratio >= 1.7 && ratio <= 2) {
            setWid(SCREEN_WIDTH * 0.71);
        } else if (ratio > 2) {
            setWid(SCREEN_WIDTH * 0.75);
        }
    }, []);

    const onNavigate = (key: string) => {
        switch (key) {
            case Languages.auth.txtLogin:
                setIsNavigate(key);
                break;
            case Languages.auth.txtSignUp:
                setIsNavigate(key);
                break;
            case Languages.auth.forgotPwd:
                setIsNavigate(key);
                break;
            default:
                break;
        }
    };

    const gotoHome = useCallback(async () => {
        Navigator.navigateScreen(
            ScreenName.home
        );
    }, []);

    // const onLoginFacebook = useCallback(async () => {
    //     const data = await loginWithFacebook();
    // }, []);

    const initUser = useCallback(
        async (type_social: string, providerId: string, email: string, name: string) => {
            setLoading(true);
            const res = await apiServices?.auth?.loginWithThirdParty(
                type_social,
                providerId,
                email,
                name
            );
            setLoading(false);
            if (res.success) {
                const dataLogin = res.data as LoginWithThirdPartyModel;
                setDataGoogle(dataLogin);
                if (dataLogin?.token) {
                    SessionManager.setAccessToken(dataLogin?.token);
                    userManager.updateUserInfo(res.data as UserInfoModal);
                    fastAuthInfo.setEnableFastAuthentication(false);
                    if (SessionManager.accessToken) {
                        if (SessionManager.accessToken) {
                            Navigator.navigateToDeepScreen(
                                [ScreenName.tabs], TabNamesArray[0]
                            );
                        }
                    }
                } else {
                    common.setSuccessGetOTP(false);
                    refModal.current?.show();
                }
            }
        }, [apiServices?.auth, common, fastAuthInfo, userManager]);

    const getOTPLogin = useCallback(async (phone: string) => {
        setLoading(true);
        const resUpdate = await apiServices?.auth?.updatePhone(dataGoogle?.id || '', phone, dataGoogle?.checksum || '');
        setLoading(false);
        if (resUpdate.success) {
            const dataUpdate = resUpdate?.data as LoginWithThirdPartyModel;
            setData(dataUpdate);
            common.setSuccessGetOTP(true);
        } else {
            refModal.current?.setErrorMsg(resUpdate.message);
        }
    }, [apiServices?.auth, common, dataGoogle]);

    const activePhoneLogin = useCallback(async (otp: string) => {
        setLoading(true);
        const resActive = await apiServices?.auth?.activePhone(data?.id || '', otp, data?.checksum || '');
        setLoading(false);
        if (resActive.success) {
            const resData = resActive.data as LoginWithThirdPartyModel;
            refModal.current?.hide();
            common.setSuccessGetOTP(false);
            SessionManager.setAccessToken(resData?.token);
            userManager.updateUserInfo(resActive.data as UserInfoModal);
            fastAuthInfo.setEnableFastAuthentication(false);
            if (SessionManager.accessToken) {
                if (SessionManager.accessToken) {
                    setTimeout(() => {
                        Navigator.pushScreen(ScreenName.success, { isCheckLoginGoogle: true });
                    }, 500);
                }
            }
        } else {
            refModal.current?.setErrorOTP(resActive.message);
        }
    }, [apiServices?.auth, common, data?.checksum, data?.id, fastAuthInfo, userManager]);

    const onLoginGoogle = useCallback(async () => {
        const userInfo = await loginWithGoogle();
        if (userInfo) initUser(ENUM_PROVIDER.GOOGLE, userInfo?.user?.id, userInfo.user.email, userInfo?.user?.name || '');
    }, [initUser]);

    const onLoginApple = useCallback(async () => {
        const userInfo = await loginWithApple();
    }, []);

    const renderContent = useMemo(() => {
        switch (isNavigate) {
            case Languages.auth.txtLogin:
                if (fastAuthInfo?.isEnableFastAuth && !fastAuthInfo.isFocusLogin) return <LoginWithBiometry />;
                return <Login />;
            case Languages.auth.txtSignUp:
                return <SignUp />;
            case Languages.auth.forgotPwd:
                return <ForgotPass />;
            default:
                return null;
        }
    }, [isNavigate, fastAuthInfo?.isEnableFastAuth, fastAuthInfo.isFocusLogin]);
    return (
        <ImageBackground style={styles.main} source={Images.bg_login} resizeMode={'stretch'}>
            <StatusBar
                animated
                translucent
                backgroundColor={COLORS.TRANSPARENT}
            />
            <Touchable style={styles.iconClose} onPress={gotoHome}>
                <IcCloseAuth width={30} />
            </Touchable>
            <View style={styles.viewLogo}>
                <LogoAuth
                    width={SCREEN_HEIGHT * 0.2}
                    height={SCREEN_HEIGHT * 0.2}
                />
            </View>

            <View style={styles.viewSvg}>
                <SvgComponent onNavigate={onNavigate} title={isNavigate} />
            </View>
            <View style={[styles.wrapAll, { width: wid }]}>
                {renderContent}
            </View>
            <View style={styles.viewBottom}>
                <Text style={styles.txtLogin}>{Languages.auth.txtLoginWith}</Text>
                <View style={styles.viewIcon}>
                    {/* <Touchable style={styles.icon} onPress={onLoginFacebook}>
                        <IcFaceAuth />
                    </Touchable> */}
                    <Touchable style={styles.icon} onPress={onLoginGoogle}>
                        <IcGoogleAuth />
                    </Touchable>
                    {/* {Platform.OS === 'ios' && <Touchable style={styles.icon} onPress={onLoginApple}>
                        <IcApple />
                    </Touchable>} */}
                   
                </View>
            </View>
            <PopupOTPLogin
                getOTPcode={getOTPLogin}
                ref={refModal}
                title={Languages.otp.completionOtpLogin}
                onPressConfirm={activePhoneLogin}
            />
        </ImageBackground>
    );
});
export default Auth;
