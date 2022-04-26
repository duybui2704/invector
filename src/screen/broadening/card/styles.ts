
import DimensionUtils, { CARD, VERTICAL_MARGIN } from '@/utils/DimensionUtils';
import { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { COLORS } from '@/theme';
import { Configs } from '@/common/Configs';

export const MyStylesCard = () => {
    return useMemo(() =>
        StyleSheet.create({
            container: {
                position: 'absolute',
                top: 0,
                zIndex: -1
            },
            image: {
                width: DimensionUtils.SCREEN_WIDTH,
                height: DimensionUtils.SCREEN_HEIGHT
            },
            gradient: {
                color: COLORS.TRANSPARENT,
                position: 'absolute',
                width: '100%',
                bottom: DimensionUtils.SCREEN_HEIGHT / 1.2,
                height: DimensionUtils.SCREEN_HEIGHT / 6
            },
            title: {
                fontSize: Configs.FontSize.size20,
                color: COLORS.WHITE,
                fontFamily: Configs.FontFamily.regular,
                paddingVertical: 10
            },
            txt: {
                fontSize: Configs.FontSize.size14,
                fontFamily: Configs.FontFamily.regular,
                color: COLORS.WHITE,
                lineHeight: 24
            },
            viewBottom: {
                marginTop: DimensionUtils.SCREEN_HEIGHT / 2,
                position: 'absolute',
                width: '80%',
                marginHorizontal: 10
            },
            viewText: {
                width: '100%',
                height: DimensionUtils.SCREEN_HEIGHT * 0.2
            },
            tob: {
                width: '40%',
                height: 45,
                borderRadius: 20,
                borderWidth: 1,
                borderColor: COLORS.WHITE,
                position: 'absolute',
                bottom: DimensionUtils.SCREEN_HEIGHT * 0.08,
                left: 10,
                justifyContent: 'center',
                alignItems: 'center'
            },
            logo: {
                position: 'absolute',
                top: DimensionUtils.SCREEN_HEIGHT * 0.05,
                left: DimensionUtils.SCREEN_WIDTH * 0.1
            },
            viewTop: {
                width: DimensionUtils.SCREEN_WIDTH * 0.9,
                height: DimensionUtils.SCREEN_WIDTH * 0.9,
                backgroundColor: COLORS.WHITE,
                borderRadius: DimensionUtils.SCREEN_WIDTH * 0.45,
                position: 'absolute',
                top: -DimensionUtils.SCREEN_HEIGHT * 0.08,
                left: -DimensionUtils.SCREEN_WIDTH * 0.2
            }
        })
        , [])
}
