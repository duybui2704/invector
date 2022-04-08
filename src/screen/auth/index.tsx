import {observer} from 'mobx-react-lite';
import React, {useState} from 'react';
import {View, ImageBackground, Text, StatusBar} from 'react-native';

import IcFaceAuth from '@/assets/image/auth/ic_face_auth.svg';
import IcInsAuth from '@/assets/image/auth/ic_ins_auth.svg';
import IcInAuth from '@/assets/image/auth/ic_in_auth.svg';
import IcGoogleAuth from '@/assets/image/auth/ic_gg_auth.svg';
import {myStylesAuth} from './styles';
import Images from '../../assets/Images';
import {HeaderBar} from '../../components/header';
import {COLORS} from '../../theme';
import Languages from "@/common/languages";
import Login from "@/screen/auth/login";
import SignIn from "@/screen/auth/signIn";
import Loading from "@/components/loading";
import SvgComponent from "@/screen/auth/SvgText";

const Auth = observer(() => {
    const styles = myStylesAuth();
    return (
        <ImageBackground style={styles.main} source={Images.bg_login} resizeMode={'stretch'}>
            < StatusBar barStyle={'light-content'} backgroundColor={COLORS.GREEN_1}/>
            <View style={styles.viewSvg}>
                <SvgComponent/>
            </View>
            <View style={styles.wrapAll}>
                <View style={styles.func}><SignIn/></View>
                <View style={styles.viewBottom}>
                    <Text style={styles.txtLogin}>{Languages.Auth.txtLogin}</Text>
                    <View style={styles.viewIcon}>
                        <View style={styles.icon}>
                            <IcFaceAuth width={32} height={32} />
                        </View>
                        <View style={styles.icon}>
                            <IcGoogleAuth width={32} height={32}/>
                        </View>
                        <View style={styles.icon}>
                            <IcInsAuth width={32} height={32}/>
                        </View>
                        <View style={styles.icon}>
                            <IcInAuth width={30} height={30}/>
                        </View>
                    </View>
                </View>
            </View>
        </ImageBackground>
    );
});
export default Auth;
