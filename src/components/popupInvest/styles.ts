import { StyleSheet } from 'react-native';
import { useMemo } from 'react';

import { COLORS, Styles } from '@/theme';
import { Configs } from '@/common/Configs';
import DimensionUtils from '@/utils/DimensionUtils';

export const MyStylePupUp = () => {
    return useMemo(() =>
        StyleSheet.create({
            popup: {
                flex: 1,
                backgroundColor: COLORS.TRANSPARENT,
                borderColor: COLORS.TRANSPARENT,
                justifyContent: 'center',
                alignItems: 'center'
            },
            tobModal: {
                flexDirection: 'column',
                width: '85%',
                height: '40%',
                backgroundColor: COLORS.WHITE,
                borderRadius: 10,
                justifyContent: 'center',
                alignItems: 'center'
            },
            tobView: {
                height: 50,
                marginBottom: 30
            },
            textModel: {
                fontSize: 20,
                fontFamily: Configs.FontFamily.bold,
                textAlign: 'center',
                color: COLORS.BLACK
            },
            smallButton: {
                borderWidth: 1,
                borderRadius: 12,
                borderColor: COLORS.GREEN,
                backgroundColor: COLORS.WHITE,
                width: DimensionUtils.SCREEN_WIDTH * 0.5,
                height: DimensionUtils.SCREEN_HEIGHT * 0.05,
                marginVertical: 5,
                justifyContent: 'center',
                alignItems: 'center'
            },
            smallButtonText: {
                fontFamily: 'Roboto-Bold',
                fontSize: 12
            },
            tob: {
                width: '50%',
                justifyContent: 'center',
                alignItems: 'center'
            },
            viewFL: {
                width: '100%',
                height: '40%',
                justifyContent: 'center',
                alignItems: 'center'
            },
            inputPhone: {
                marginTop: 15,
                borderRadius: 30,
                height: Configs.FontSize.size40,
                width: '90%',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row'
            },
            textConfirm: {
                fontSize: Configs.FontSize.size14,
                fontFamily: Configs.FontFamily.regular,
                color: COLORS.WHITE
            },
            tobConfirm: {
                width: '40%',
                height: 40,
                borderRadius: 20,
                backgroundColor: COLORS.GREEN,
                justifyContent: 'center',
                alignItems: 'center',
                marginHorizontal: 12
            },
            viewBottom: {
                flexDirection: 'row',
                justifyContent: 'center',
                marginVertical: 20
            }
        })
        , []);
};
