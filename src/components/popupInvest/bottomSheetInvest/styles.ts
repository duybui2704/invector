import { StyleSheet } from 'react-native';
import { useMemo } from 'react';

import { COLORS, Styles } from '@/theme';
import { Configs } from '@/common/Configs';
import DimensionUtils from '@/utils/DimensionUtils';

export const MyStylesBottomSheetInvest = () => {
    return useMemo(() =>
        StyleSheet.create({
            container: {
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
            },
            valueContainer: {
                marginBottom: 5,
                justifyContent: 'flex-end',
                alignItems: 'flex-start',
                height: 40
            },
            value: {
                flex: 1,
                ...Styles.typography.regular,
                fontSize: Configs.FontSize.size16
            },
            row: {
                flexDirection: 'row',
                marginHorizontal: 16
            },
            flatList: {
                flex: 1,
                marginTop: 0,
                paddingHorizontal: 16
            },
            txtTitle: {
                color: COLORS.BLACK,
                textAlign: 'center',
                marginVertical: 20,
                fontSize: Configs.FontSize.size16,
                fontFamily: Configs.FontFamily.bold
            },
            dash: {
                marginHorizontal: '5%'
            },
            topDash: {
                marginHorizontal: '8%'
            }
        }), []);
};
