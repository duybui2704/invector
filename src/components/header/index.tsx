import React, { useCallback, useMemo } from 'react';
import { Image, ImageBackground, StatusBar, Text, View } from 'react-native';

import IcBack from '../../assets/image/header/ic_back_header.svg';
import IcNotify from '../../assets/image/header/ic_notify_header_home.svg';
import Images from '../../assets/Images';
import { isIOS } from '../../common/Config';
import Navigator from '../../routers/Navigator';
import { Touchable } from '../elements/touchable';
import { HeaderProps } from './types';
import { styles } from './styles';
import { COLORS } from '../../theme';

export const HeaderBar = ({
    onBackPressed,
    onGoBack,
    title,
    hasBack,
    noHeader,
    noStatusBar,
    isLight,
    exitApp }: HeaderProps) => {

    const _onBackPressed = useCallback(() => {
        if (!exitApp) {
            if (hasBack && onBackPressed) {
                onBackPressed();
            }
            else if (onGoBack) {
                onGoBack();
            } else {
                Navigator.goBack();
            }
            return true;
        }
        return false;
    }, [exitApp, hasBack, onBackPressed, onGoBack]);

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
    ), [title]);

    return (
        <View style={styles.container}>
            {!exitApp ? (
                <Image
                    source={Images.bg_header_home}
                    style={styles.imageBg1}
                    resizeMode='stretch'
                />
            ) : (
                <ImageBackground
                    source={Images.bg_header_home}
                    style={styles.imageBg}
                    resizeMode='stretch'
                >
                    <Image source={Images.logo_header_home} resizeMode='contain' style={styles.logo} />
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
            </View>}
        </View>
    );
};

export default HeaderBar;

