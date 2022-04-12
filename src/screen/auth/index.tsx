import {observer} from 'mobx-react-lite';
import React, {useState} from 'react';
import {View, ImageBackground, Text, StatusBar, Switch} from 'react-native';

import IcFace from '@/asset/icon/ic_login_fb.svg';
import IcGoogle from '@/asset/icon/ic_login_gg.svg';
import IcInstagram from '@/asset/icon/ic_login_instagram.svg';
import IcLinkedin from '@/asset/icon/ic_login_linkedin.svg';
import {myStylesAuth} from './styles';
import Images from '../../assets/Images';
import {HeaderBar} from '../../components/header';
import {COLORS} from '../../theme';
import Languages from '@/common/Languages';
import Login from '@/screen/auth/login';
import SignIn from '@/screen/auth/signIn';
import Loading from '@/components/loading';
import SvgComponent from '@/screen/auth/SvgText';
import { Touchable } from '@/components/elements/touchable';

const Auth = observer(() => {
    const styles = myStylesAuth();
    const [isNavigate, setIsNavigate] = useState<string>(Languages.Auth.txtLogin);

    const onNavigate = (key: string) => {
        switch (key){
            case Languages.Auth.txtLogin:
                setIsNavigate(key);
                break;
            case Languages.Auth.txtTitle:
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
                {isNavigate === Languages.Auth.txtLogin ? <Login /> : <SignIn/>}
                <View style={styles.viewBottom}>
                    <Text style={styles.txtLogin}>{Languages.Auth.txtLogin}</Text>
                    <View style={styles.viewIcon}>
                        <Touchable style={styles.icon}>
                            <IcFace  />
                        </Touchable>
                        <Touchable style={styles.icon}>
                            <IcGoogle />
                        </Touchable>
                        <Touchable style={styles.icon}>
                            <IcInstagram />
                        </Touchable>
                        <Touchable style={styles.icon}>
                            <IcLinkedin />
                        </Touchable>
                    </View>
                </View>
            </View>
        </ImageBackground>
    );
});
export default Auth;
