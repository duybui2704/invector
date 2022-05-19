import { useIsFocused } from '@react-navigation/native';
import { observer } from 'mobx-react';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { ImageBackground, Platform, StatusBar, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

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
import { TabsName } from '@/common/screenNames';


const Auth = observer(({ route }: any) => {
    const styles = myStylesAuth();
    const ratio = SCREEN_HEIGHT / SCREEN_WIDTH;
    const [wid, setWid] = useState<number>(0);
    const [isNavigate, setIsNavigate] = useState<string>(Languages.auth.txtLogin);
    const isFocused = useIsFocused();
    const {
        fastAuthInfoManager: fastAuthInfo,
        common
    } = useAppStore();

    useEffect(() => {
        setTimeout(() => {
            StatusBar.setBarStyle(isFocused ? 'light-content' : 'dark-content', true);
        }, 100);
    }, [isFocused]);

    useEffect(() => {
        if (route?.params) {
            console.log('route:', route.params);
            setIsNavigate(route?.params.titleAuth);
        }
        screenRatio();
    }, []);

    const screenRatio = useCallback(() => {
        if (ratio < 1.662) {
            setWid(SCREEN_WIDTH * 0.65);
        } else {
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
        console.log('abccccc');
        Navigator.navigateScreen(TabsName.homeTabs);
    }, []);

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

    const onLoginApple = useCallback(async () => {
        const data = await loginWithApple();
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
        <ImageBackground  style={styles.main} source={Images.bg_login} resizeMode={'stretch'}>
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
                    width={SCREEN_HEIGHT * 0.22}
                    height={SCREEN_HEIGHT * 0.22}
                />
            </View>

            <View style={styles.viewSvg}>
                <SvgComponent onNavigate={onNavigate} title={isNavigate} />
            </View>
            <View  style={[styles.wrapAll, { width: wid }]}>
                {renderContent}
            </View>
            <View style={styles.viewBottom}>
                <Text style={styles.txtLogin}>{Languages.auth.txtLoginWith}</Text>
                <View style={styles.viewIcon}>
                    <Touchable style={styles.icon} onPress={onLoginFacebook}>
                        <IcFaceAuth />
                    </Touchable>
                    <Touchable style={styles.icon} onPress={onLoginGoogle}>
                        <IcGoogleAuth />
                    </Touchable>
                    {Platform.OS === 'ios' && <Touchable style={styles.icon} onPress={onLoginApple}>
                        <IcApple />
                    </Touchable>}
                   
                </View>
            </View>
        </ImageBackground>
    );
});
export default Auth;
