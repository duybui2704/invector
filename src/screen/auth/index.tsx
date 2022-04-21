import { observer } from 'mobx-react';
import React, { useCallback, useState } from 'react';
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

const Auth = observer(() => {
    const styles = myStylesAuth();
    const isFocused = useIsFocused();
    const [isNavigate, setIsNavigate] = useState<string>(Languages.auth.txtLogin);
    const {
        apiServices,
        userManager,
        fastAuthInfoManager: fastAuthInfo,
        appManager
    } = useAppStore();

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

    return (
        <ImageBackground style={styles.main} source={Images.bg_login} resizeMode={'stretch'}>
            <StatusBar
                barStyle={'light-content'}
                animated
                translucent
                backgroundColor={COLORS.TRANSPARENT}
            />
            <View style={styles.viewSvg}>
                <SvgComponent onNavigate={onNavigate} />
            </View>
            <View style={styles.wrapAll}>
                {isNavigate === Languages.auth.txtLogin ? <Login/> :
                    isNavigate === Languages.auth.txtSignUp ? <SignUp/> : <ForgotPass/>
                }
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
            </View>
        </ImageBackground>
    );
});
export default Auth;
