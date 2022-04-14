import { useMemo } from 'react';
import { StyleSheet } from 'react-native';

import { Configs, PADDING_TOP } from '@/common/Configs';
import { COLORS, Styles } from '@/theme';
import DimensionUtils from '@/utils/DimensionUtils';


export const MyStylesLogin = () => {
    return useMemo(() => {
        return StyleSheet.create({
            main: {
                flex: 1,
                backgroundColor: COLORS.GREEN,
                width: DimensionUtils.SCREEN_WIDTH,
                height: DimensionUtils.SCREEN_HEIGHT
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
            inputPass: {
                marginTop: 15,
                borderRadius: 30,
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
                width: '90%',
                height: Configs.FontSize.size40
            },
            rowInfo: {
                marginTop: 10,
                flexDirection: 'column',
                alignItems: 'flex-start',
                marginHorizontal: 10
            },
            wrapIcon: {
                flexDirection: 'row',
                marginTop: 20,
                marginBottom: Configs.IconSize.size30,
                justifyContent: 'center'
            },
            wrapAll: {
                flex: 1,
                paddingBottom: PADDING_TOP,
                marginTop: DimensionUtils.SCREEN_HEIGHT / 3,
                height: DimensionUtils.SCREEN_HEIGHT / 3,
                width: '80%',
                position: 'absolute',
                top: -20
            },
            checkbox: {
                justifyContent: 'space-between',
                paddingVertical: 15,
                alignItems: 'center',
                flexDirection: 'row'
            },
            row: {
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingVertical: 16
            },
            content: {
                marginTop: DimensionUtils.SCREEN_HEIGHT * 0.04,
                justifyContent: 'center',
                marginHorizontal: 10,
                height: DimensionUtils.SCREEN_HEIGHT * 0.3
            },
            txtSave: {
                ...Styles.typography.regular,
                color: COLORS.GRAY_12,
                marginLeft: 20,
                fontSize: Configs.FontSize.size16
            },
            txtSubmit: {
                ...Styles.typography.medium,
                color: COLORS.WHITE,
                fontSize: Configs.FontSize.size16
            },
            txtTitle: {
                ...Styles.typography.medium,
                fontSize: Configs.FontSize.size20,
                fontWeight: '600',
                color: COLORS.GRAY_7,
                padding: 5
            },
            tobLogin: {
                marginTop: 10,
                width: DimensionUtils.SCREEN_WIDTH * 0.4,
                height: Configs.FontSize.size40,
                backgroundColor: COLORS.GREEN,
                borderRadius: 25,
                justifyContent: 'center',
                alignItems: 'center'
            },
            checkContainer: {
                paddingTop: 20
            },
            wrapLoginTxt: {
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 150
            }
        });
    }, []);
};
