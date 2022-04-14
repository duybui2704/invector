import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import { ImageBackground, StatusBar, Text, View } from 'react-native';

import IcFaceAuth from '@/assets/image/ic_login_fb.svg';
import IcGoogleAuth from '@/assets/image/ic_login_gg.svg';
import IcInsAuth from '@/assets/image/ic_login_instagram.svg';
import IcLinkedInAuth from '@/assets/image/ic_login_linkedin.svg';
import Languages from '@/common/Languages';
import { Touchable } from '@/components/elements/touchable';
import Login from '@/screen/auth/login';
import SvgComponent from '@/screen/auth/SvgText';
import { myStylesAuth } from './styles';
import SignUp from './signUp';
import { COLORS } from '@/theme';
import Images from '@/assets/Images';

const Auth = observer(() => {
    const styles = myStylesAuth();
    const [isNavigate, setIsNavigate] = useState<string>(Languages.auth.txtLogin);

    const onNavigate = (key: string) => {
        switch (key){
            case Languages.auth.txtLogin:
                setIsNavigate(key);
                break;
            case Languages.auth.txtSignUp:
                setIsNavigate(key);
                break;
            case '1':
                setIsNavigate(key);
                break;
            default:
                break;
        }
    };

    return (
        <ImageBackground style={styles.main} source={Images.bg_login} resizeMode={'stretch'}>
            < StatusBar barStyle={'light-content'} backgroundColor={COLORS.GREEN_1}/>
            <View style={styles.viewSvg}>
                <SvgComponent onNavigate={onNavigate}/>
            </View>
            <View style={styles.wrapAll}>
                {isNavigate === Languages.auth.txtLogin ? <Login /> : <SignUp/>}
                <View style={styles.viewBottom}>
                    <Text style={styles.txtLogin}>{Languages.auth.txtLoginWith}</Text>
                    <View style={styles.viewIcon}>
                        <Touchable style={styles.icon}>
                            <IcFaceAuth  />
                        </Touchable>
                        <Touchable style={styles.icon}>
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
