import React, {useCallback, useMemo} from 'react';
import {Image, ImageBackground, StatusBar, Text, View} from 'react-native';

import IcBack from '../../assets/image/header/ic_back_header.svg';
import IcNotify from '../../assets/image/header/ic_notify_header_home.svg';
import IcNotifyInvest from '../../assets/image/header/ic_header_invest.svg';
import Images from '../../assets/Images';
import {isIOS} from '../../common/Configs';
import Navigator from '../../routers/Navigator';
import {Touchable} from '../elements/touchable';
import {HeaderProps} from './types';
import {styles} from './styles';
import {COLORS} from '../../theme';
import Languages from "@/common/Languages";
import ScreenName from '@/common/screenNames';

export const HeaderBar = ({
                              onBackPressed,
                              onGoBack,
                              title,
                              hasBack,
                              noHeader,
                              noStatusBar,
                              isLight,
                              imageBackground,
                              exitApp
                          }: HeaderProps) => {

    const _onBackPressed = useCallback(() => {
        if (!exitApp) {
            if (hasBack && onBackPressed) {
                onBackPressed();
            } else if (onGoBack) {
                onGoBack();
            } else {
                Navigator.goBack();
            }
            return true;
        }
        return false;
    }, [exitApp, hasBack, onBackPressed, onGoBack]);

    const onNotifyInvest = useCallback(() => {
        Navigator.pushScreen(ScreenName.notifyInvest)
    }, []);

    const renderBack = useMemo(() => (
        <Touchable style={styles.goBack} onPress={_onBackPressed} size={40}>
            <IcBack width={27} height={27}/>
        </Touchable>
    ), [_onBackPressed]);

    const renderTitle = useMemo(() => (
        <View style={styles.titleContainer}>
            <Text
                numberOfLines={1}
                style={(!exitApp) ? styles.titleCenter1 : styles.titleCenter}>
                {title}
            </Text>
        </View>
    ), [exitApp, title]);

    return (
        <View style={styles.container}>
            {imageBackground && (
                <ImageBackground
                    source={Images.bg_header_home}
                    style={styles.imageBg}
                    resizeMode='stretch'
                >
                    <Image source={Images.logo_header_home} resizeMode='contain' style={styles.logo}/>
                    <IcNotify style={styles.imgNotify}/>
                </ImageBackground>
            )}
            {noStatusBar && isIOS ? null : <StatusBar
                animated
                translucent
                backgroundColor={COLORS.TRANSPARENT}
                barStyle={isLight ? 'light-content' : 'dark-content'}
            />}
            {!noHeader && !exitApp && <View style={styles.headerContainer}>
                {renderTitle}
                {(!exitApp) && (hasBack ? renderBack : null)}
                {title === Languages.invest.title &&
                    <Touchable style={{ position: 'absolute', right: 10 }} onPress={onNotifyInvest}>
                    <IcNotifyInvest width={22} height={22}/>
                  </Touchable>}
            </View>}
        </View>
    );
};

export default HeaderBar;

