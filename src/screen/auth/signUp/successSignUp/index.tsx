import React from 'react';
import { ImageBackground, StyleSheet, Text, View } from 'react-native';

import Images from '@/assets/Images';
import { Configs } from '@/common/Configs';
import Languages from '@/common/Languages';
import { COLORS } from '@/theme';
import { SCREEN_WIDTH, SCREEN_HEIGHT } from '@/utils/DimensionUtils';
import { Touchable } from '@/components/elements/touchable';
import Navigator from '@/routers/Navigator';
import ScreenName, { TabsName } from '@/common/screenNames';

export const SuccessSignUp = () => {

    const gotoHome = () => {
        Navigator.navigateToDeepScreen([ScreenName.tabs], TabsName.homeTabs);
    };

    return (
        <ImageBackground style={styles.container} source={Images.bg_successSignUp} resizeMode='stretch'>
            <View style={styles.main}>
                <Text style={styles.txtSuccess}>{Languages.auth.succuss}</Text>
                <Text style={styles.txtNotifySuccess}>{Languages.auth.notifySuccess}</Text>
            </View>
            <View style={styles.viewTob}>
                <Touchable onPress={gotoHome} style={styles.tobContinue}>
                    <Text style={styles.txtContinue}>{Languages.auth.continue}</Text>
                </Touchable>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    main: {
        marginTop: SCREEN_HEIGHT * 0.6,
        padding: 10,
        width: '80%'
    },
    container: {
        flex: 1
    },
    txtSuccess: {
        color: COLORS.WHITE,
        marginVertical: 15,
        fontSize: Configs.FontSize.size16,
        fontFamily: Configs.FontFamily.regular,
    },
    txtNotifySuccess: {
        fontSize: Configs.FontSize.size14,
        fontFamily: Configs.FontFamily.regular,
        color: COLORS.WHITE
    },
    txtContinue: {
        color: COLORS.WHITE,
        fontSize: Configs.FontSize.size16,
        textAlign: 'center',
        fontFamily: Configs.FontFamily.bold
    },
    viewTob: {
        justifyContent: 'center',
        width: '100%',
        height: 100,
        alignItems: 'center',
        marginTop: 15
    },
    tobContinue: {
        width: '40%',
        height: 40,
        borderWidth: 1,
        borderColor: COLORS.WHITE,
        justifyContent: 'center',
        alignContent: 'center',
        borderRadius: 20
    }
});
