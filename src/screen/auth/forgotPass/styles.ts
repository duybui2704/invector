import { useMemo } from 'react';
import { StyleSheet } from 'react-native';

import { Configs, PADDING_TOP } from '../../../common/Configs';
import { COLORS, Styles } from '../../../theme';
import DimensionUtils from '../../../utils/DimensionUtils';

export const MyStylesForgotPass = () => {
    return useMemo(() => {
        return StyleSheet.create({
            inputPhone: {
                marginTop: 10,
                borderRadius: 30,
                height: Configs.FontSize.size40,
                width: '90%',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row'
            },
            rowInfo: {
                marginTop: DimensionUtils.SCREEN_HEIGHT * 0.02,
                flexDirection: 'column',
                alignItems: 'flex-start'
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
               flex: 1,
               marginTop: DimensionUtils.SCREEN_HEIGHT * 0.13,
               marginLeft: 10,
               width: '90%'
            },
            txtSave: {
                ...Styles.typography.regular,
                color: COLORS.GRAY_12,
                fontSize: Configs.FontSize.size12,
                marginLeft: DimensionUtils.SCREEN_WIDTH * 0.01
            },
            txtSubmit: {
                ...Styles.typography.medium,
                color: COLORS.WHITE,
                fontSize: Configs.FontSize.size14
            },
            txtTitle: {
                ...Styles.typography.medium,
                fontSize: Configs.FontSize.size20,
                fontWeight: '600',
                color: COLORS.GRAY_7,
                alignItems: 'center'
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
            txt: {
                color: COLORS.GRAY, 
                fontSize: Configs.FontSize.size12, 
                fontFamily: 'normal'
            }
        
        });
    }, []);
};