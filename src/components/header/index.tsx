import React, { useCallback, useLayoutEffect, useMemo } from 'react';
import { ImageBackground, StatusBar, Text, View } from 'react-native';
import { useIsFocused } from '@react-navigation/native';

import IcBack from '../../assets/image/header/ic_back_header.svg';
import Images from '../../assets/Images';
import Navigator from '../../routers/Navigator';
import { COLORS } from '../../theme';
import { Touchable } from '../elements/touchable';
import { MyStylesHeader } from './styles';
import { HeaderProps } from './types';

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

    const styles = MyStylesHeader();
    const isFocused = useIsFocused();

    useLayoutEffect(() => {
        if (isFocused) {
            setTimeout(() => {

            }, 50);
            StatusBar.setBarStyle(isFocused ? 'dark-content' : 'light-content', true);
        }

    }, [isFocused]);

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

    const renderBack = useMemo(() => (
        <Touchable style={styles.goBack} onPress={_onBackPressed} size={40}>
            <IcBack width={27} height={27} />
        </Touchable>
    ), [_onBackPressed, styles.goBack]);

    const renderTitle = useMemo(() => (
        <View style={styles.titleContainer}>
            <Text
                numberOfLines={1}
                style={(!exitApp) ? styles.titleCenter1 : styles.titleCenter}>
                {title}
            </Text>
        </View>
    ), [exitApp, styles.titleCenter, styles.titleCenter1, styles.titleContainer, title]);

    return (
        <View style={styles.container}>
            {imageBackground && (
                <ImageBackground
                    source={Images.bg_header_home}
                    style={styles.imageBg}
                    resizeMode='stretch'
                />
            )}
            {noStatusBar ? null : <StatusBar
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

