import { StyleSheet } from 'react-native';
import { useMemo } from 'react';

import { COLORS, Styles } from '@/theme';
import { Configs } from '@/common/Configs';

export const MyStylesBottomSheetInvest = () => {
    return useMemo(() =>
        StyleSheet.create({
            container: {
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
            },
            valueContainer: {
                paddingTop: 10
            },
            value: {
                ...Styles.typography.regular,
                fontSize: Configs.FontSize.size14,
                marginHorizontal: 16,
                paddingBottom: 10
            },
            row: {
            },
            flatList: {
                flex: 1,
                marginTop: 0
            },
            txtTitle: {
                ...Styles.typography.medium,
                color: COLORS.BLACK,
                textAlign: 'center',
                fontSize: Configs.FontSize.size16,
                marginVertical: 5
            },
            dash: {
            },
            topDash: {
                marginHorizontal: '8%'
            }
        }), []);
};
