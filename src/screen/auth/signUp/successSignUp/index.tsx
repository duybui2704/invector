import React from 'react';
import { ImageBackground, StyleSheet, Text, View } from 'react-native';

import Images from '@/assets/Images';
import { Configs } from '@/common/Configs';
import Languages from '@/common/Languages';
import { COLORS } from '@/theme';
import { SCREEN_WIDTH, SCREEN_HEIGHT } from '@/utils/DimensionUtils';
import { Touchable } from '@/components/elements/touchable';
import Navigator from '@/routers/Navigator';
import ScreenName, { TabNamesArray, TabsName } from '@/common/screenNames';

export const SuccessSignUp = () => {

    const gotoHome = () => {
        Navigator.navigateScreen(ScreenName.tabs);
    };

    return (
        <ImageBackground style={{ flex: 1 }} source={Images.bg_successSignUp} resizeMode='stretch'>
            <View style={styles.main}>
                <Text style={styles.txt1}>{Languages.auth.succuss}</Text>
                <Text style={styles.txt2}>{Languages.auth.notifySuccess}</Text>
                <View style={styles.viewTob}>
                    <Touchable onPress={gotoHome} style={styles.tob}>
                        <Text style={styles.txt3}>{Languages.auth.continue}</Text>
                    </Touchable>
                </View>
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
    txt1: {
        color: COLORS.WHITE,
        marginVertical: 15,
        fontSize: Configs.FontSize.size16,
        fontFamily: Configs.FontFamily.regular,
    },
    txt2: {
        fontSize: Configs.FontSize.size14,
        fontFamily: Configs.FontFamily.regular,
        color: COLORS.WHITE
    },
    txt3: {
        color: COLORS.WHITE,
        fontSize: Configs.FontSize.size16,
        textAlign: 'center',
        fontFamily: Configs.FontFamily.bold
    },
    viewTob: {
        justifyContent: 'center',
        width: '50%',
        height: 100,
        alignItems: 'center',
        marginTop: 15
    },
    tob: {
        width: '100%',
        height: 40,
        borderWidth: 1,
        borderColor: COLORS.WHITE,
        justifyContent: 'center',
        alignContent: 'center',
        borderRadius: 20
    }
});
