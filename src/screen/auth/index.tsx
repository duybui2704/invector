import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import { ImageBackground, StatusBar, Text, View } from 'react-native';

import IcFaceAuth from '@/assets/image/auth/ic_face_auth.svg';
import IcGoogleAuth from '@/assets/image/auth/ic_gg_auth.svg';
import IcInsAuth from '@/assets/image/auth/ic_ins_auth.svg';
import IcInAuth from '@/assets/image/auth/ic_in_auth.svg';
import Languages from '@/common/Languages';
import { Touchable } from '@/components/elements/touchable';
import Navigator from '@/routers/Navigator';
import Login from '@/screen/auth/login';
import SignIn from '@/screen/auth/signIn';
import SvgComponent from '@/screen/auth/SvgText';
import Images from '../../assets/Images';
import { COLORS } from '../../theme';
import { myStylesAuth } from './styles';


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
                        <Touchable onPress={() => Navigator.goBack()} style={styles.icon}>
                            <IcFaceAuth width={32} height={32} />
                        </Touchable>
                        <Touchable style={styles.icon}>
                            <IcGoogleAuth width={32} height={32}/>
                        </Touchable>
                        <Touchable style={styles.icon}>
                            <IcInsAuth width={32} height={32}/>
                        </Touchable>
                        <Touchable style={styles.icon}>
                            <IcInAuth width={30} height={30}/>
                        </Touchable>
                    </View>
                </View>
            </View>
        </ImageBackground>
    );
});
export default Auth;
