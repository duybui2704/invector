
import { useMemo } from 'react';
import { Dimensions, StyleSheet } from 'react-native';

import { SCREEN_WIDTH, SCREEN_HEIGHT } from '@/utils/DimensionUtils';
import { COLORS } from '@/theme';
import { Configs } from '@/common/Configs';

const {width: screenWidth, height: screenHeight} = Dimensions.get('screen');

export const MyStylesCard = () => {
    return useMemo(() =>
        StyleSheet.create({
            container: {
                position: 'absolute',
                top: 0,
                zIndex: -1
            },
            imageANDROID: {
                width: screenWidth,
                height:screenHeight
            },
            imageIOS: {
                width: SCREEN_WIDTH,
                height: SCREEN_HEIGHT
            },
            gradient: {
                color: COLORS.TRANSPARENT,
                position: 'absolute',
                width: '100%'
            },
            title: {
                fontSize: Configs.FontSize.size20,
                color: COLORS.WHITE,
                fontFamily: Configs.FontFamily.regular,
                marginVertical: 10
            },
            txtContinue: {
                fontSize: Configs.FontSize.size16,
                color: COLORS.WHITE,
                fontFamily: Configs.FontFamily.regular,
                paddingVertical: '5%',
                textAlign: 'center'
            },
            txt: {
                fontSize: Configs.FontSize.size14,
                fontFamily: Configs.FontFamily.regular,
                color: COLORS.WHITE,
                lineHeight: 24
            },
            viewBottom: {
                marginTop: SCREEN_HEIGHT / 1.8,
                position: 'absolute',
                width: '80%',
                marginHorizontal: 10
            },
            viewText: {
                width: '100%'
            },
            tobIOS: {
                width: '40%',
                borderRadius: 25,
                borderWidth: 1,
                borderColor: COLORS.WHITE,
                position: 'absolute',
                bottom: SCREEN_HEIGHT * 0.06,
                left: 10,
                justifyContent: 'center',
                alignItems: 'center'
            },
            tobANDROID: {
                width: '40%',
                borderRadius: 25,
                borderWidth: 1,
                borderColor: COLORS.WHITE,
                position: 'absolute',
                bottom: SCREEN_HEIGHT * 0.1,
                left: 10,
                justifyContent: 'center',
                alignItems: 'center'
            },
            logo: {
                position: 'absolute',
                top: SCREEN_HEIGHT * 0.05,
                left: SCREEN_WIDTH * 0.08
            }
        }), []);
};
