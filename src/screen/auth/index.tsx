import { observer } from 'mobx-react';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { ImageBackground, StatusBar, Text, View } from 'react-native';
import { useIsFocused } from '@react-navigation/native';

import IcFaceAuth from '@/assets/image/ic_login_fb.svg';
import IcGoogleAuth from '@/assets/image/ic_login_gg.svg';
import IcInsAuth from '@/assets/image/ic_login_instagram.svg';
import IcLinkedInAuth from '@/assets/image/ic_login_linkedin.svg';
import { Touchable } from '@/components/elements/touchable';
import Login from '@/screen/auth/login';
import SvgComponent from '@/screen/auth/SvgText';
import { myStylesAuth } from './styles';
import SignUp from './signUp';
import { COLORS } from '@/theme';
import Images from '@/assets/Images';
import Languages from '@/common/Languages';
import { useAppStore } from '@/hooks';
import { loginWithFacebook, loginWithGoogle } from '@/utils/SociaAuth';
import ForgotPass from './forgotPass';
import DimensionUtils from '@/utils/DimensionUtils';
import LogoAuth from '@/assets/image/auth/logo_auth.svg';
import SessionManager from '@/manager/SessionManager';
import Navigator from '@/routers/Navigator';
import ScreenName, { TabsName } from '@/common/screenNames';
import LoginWithBiometry from './loginWithBiometrty';

const Auth = observer(({ route }: any) => {
    const styles = myStylesAuth();
    const ratio = DimensionUtils.SCREEN_HEIGHT / DimensionUtils.SCREEN_WIDTH;
    const [wid, setWid] = useState<number>(0);
    const [isNavigate, setIsNavigate] = useState<string>(Languages.auth.txtLogin);
    const {
        apiServices,
        userManager,
        fastAuthInfoManager: fastAuthInfo,
        appManager
    } = useAppStore();

    useEffect(() => {
        if (route?.params) {
            console.log('route:', route.params);
            setIsNavigate(route?.params.titleAuth);
        }
        screenRatio();
    }, []);

    const screenRatio = useCallback(() => {
        if (ratio < 1.662) {
            setWid(DimensionUtils.SCREEN_WIDTH * 0.65);
        } else {
            setWid(DimensionUtils.SCREEN_WIDTH * 0.75);
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

    // const initUser = useCallback(
    //     async (typeLogin: string, providerId: string) => {
    //         const res = await apiServices?.auth?.loginWithThirdParty(
    //             typeLogin,
    //             providerId
    //         );
    //     }, [apiServices?.auth, userManager]);


    const onLoginFacebook = useCallback(async () => {
        const data = await loginWithFacebook();
    }, []);

    const onLoginGoogle = useCallback(async () => {
        const userInfo = await loginWithGoogle();
        // if (userInfo) initUser(ENUM_PROVIDER.GOOGLE, userInfo?.user?.id);
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
        <ImageBackground style={styles.main} source={Images.bg_board} resizeMode={'stretch'}>
            <StatusBar
                barStyle={'light-content'}
                animated
                translucent
                backgroundColor={COLORS.TRANSPARENT}
            />
            <View style={styles.viewLogo}>
                <LogoAuth
                    width={DimensionUtils.SCREEN_HEIGHT * 0.22}
                    height={DimensionUtils.SCREEN_HEIGHT * 0.22}
                /></View>
            <View style={styles.viewSvg}>
                <SvgComponent onNavigate={onNavigate} title={isNavigate} />
            </View>
            <View style={[styles.wrapAll, { width: wid }]}>
                {isNavigate === Languages.auth.txtLogin ? <Login/> :
                    isNavigate === Languages.auth.txtSignUp ? <SignUp/> : <ForgotPass/>
                }
            </View>
            <View style={styles.viewBottom}>
                <Text style={styles.txtLogin}>{Languages.auth.txtLogin}</Text>
                <View style={styles.viewIcon}>
                    <Touchable style={styles.icon} onPress={onLoginFacebook}>
                        <IcFaceAuth />
                    </Touchable>
                    <Touchable style={styles.icon} onPress={onLoginGoogle}>
                        <IcGoogleAuth />
                    </Touchable>
                    <Touchable style={styles.icon}>
                        <IcInsAuth />
                    </Touchable>
                    <Touchable style={styles.icon}>
                        <IcLinkedInAuth />
                    </Touchable>
                </View>
            </View>
        </ImageBackground>
    );
});
export default Auth;
