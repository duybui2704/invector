import { StyleSheet } from 'react-native';
import { useMemo } from 'react';

import {COLORS, Styles} from '@/theme';
import {Configs} from '@/common/Configs';
import { SCREEN_WIDTH, SCREEN_HEIGHT } from '@/utils/DimensionUtils';

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
            modal: {
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: COLORS.MODAL,
                width: '100%',
                height: '100%',
                flexDirection: 'column'
            },
            tobModal: {
                flexDirection: 'column',
                width: '85%',
                height: SCREEN_HEIGHT * 0.4,
                backgroundColor: COLORS.WHITE,
                borderRadius: 10,
                justifyContent: 'center',
                alignItems: 'center'
            },
            tobView: {
                marginTop: SCREEN_HEIGHT * 0.2,
                marginBottom: 5
            },
            textModel: {
                ...Styles.typography.regular,
                fontSize: Configs.FontSize.size20,
                textAlign: 'center',
                color: COLORS.BLACK
            },
            smallButton: {
                borderWidth: 1,
                borderRadius: 12,
                borderColor: COLORS.GREEN,
                backgroundColor: COLORS.WHITE,
                width: SCREEN_WIDTH * 0.5,
                height: SCREEN_HEIGHT * 0.05,
                marginVertical: 5,
                justifyContent: 'center',
                alignItems: 'center'
            },
            smallButtonText: {
                fontFamily: Configs.FontFamily.bold,
                fontSize: 12
            },
            tob: {
                width: '50%',
                justifyContent: 'center',
                alignItems: 'center'
            },
            viewFL: {
                backgroundColor: COLORS.WHITE,
                borderColor: COLORS.TRANSPARENT,
                borderRadius: 20,
                borderWidth: 1,
                paddingBottom: 10,
                paddingTop: 10,
                width: '100%',
                height: SCREEN_HEIGHT * 0.4,
                justifyContent: 'center',
                alignItems: 'center'
            },
            inputPhone: {
                marginTop: 15,
                borderRadius: 30,
                height: Configs.FontSize.size40,
                width: '100%'
            },
            containerOverViewPicker: {
                marginTop: 12,
                borderRadius: 20,
                borderWidth: 1,
                justifyContent: 'space-between',
                alignItems: 'center',
                flexDirection: 'row',
                width: '100%',
                height: Configs.FontSize.size40,
                borderColor: COLORS.GRAY_11
            },
            valuePicker: {
                ...Styles.typography.regular,
                color: COLORS.GRAY_12
            },
            containerPicker: {
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
                paddingHorizontal: 20
            },
            textConfirm: {
                ...Styles.typography.medium,
                fontSize: Configs.FontSize.size14,
                color: COLORS.WHITE
            },
            tobConfirm: {
                height: 40,
                borderRadius: 20,
                backgroundColor: COLORS.GREEN,
                justifyContent: 'center',
                alignItems: 'center',
                width: (SCREEN_WIDTH - 32 - 60) / 2
            },
            viewBottom: {
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginVertical: 20,
                alignItems: 'center'
            }
        }), []);
};
