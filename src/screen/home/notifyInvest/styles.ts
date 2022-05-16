import { useMemo } from 'react';
import { StyleSheet } from 'react-native';

import { COLORS } from '../../../theme/colors';
import { SCREEN_WIDTH, SCREEN_HEIGHT } from '@/utils/DimensionUtils';
import { Configs } from '@/common/Configs';
import { Styles } from '@/theme';

export const MyStylesNotifyInvest = () => {
    return useMemo(() =>
        StyleSheet.create({
            container: {
                flex: 1,
                backgroundColor: COLORS.WHITE_GRAY1
            },
            investTab: {
                flexDirection: 'row',
                width: '100%',
                height: SCREEN_HEIGHT * 0.05,
                backgroundColor: COLORS.GRAY_13,
                padding: 4,
                borderRadius: 26,
                marginBottom: 12

            },
            wrapContent: {
                marginHorizontal: 16
            },
            btInvest: {
                width: (SCREEN_WIDTH - 40) / 3,
                alignItems: 'center',
                justifyContent: 'center',
                paddingVertical: 4,
                borderRadius: 26
            },
            txtBtInvest: {
                ...Styles.typography.medium,
                fontSize: Configs.FontSize.size12
            },
            flatList: {
                paddingBottom: 150
            },
            item: {
                paddingTop: 8,
                backgroundColor: COLORS.WHITE,
                paddingHorizontal: 16,
                borderRadius: 16,
                borderWidth: 1,
                borderColor: COLORS.GRAY_11,
                marginBottom: 8,
                opacity: 1
            },
            itemBlur: {
                paddingTop: 8,
                backgroundColor: COLORS.WHITE,
                paddingHorizontal: 16,
                borderRadius: 16,
                borderWidth: 1,
                borderColor: COLORS.GRAY_11,
                marginBottom: 8,
                opacity: 0.5
            },
            rowTop: {
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingBottom: 8
            },
            wrapText: {
                alignItems: 'flex-end'
            },
            title: {
                fontSize: Configs.FontSize.size14,
                fontFamily: Configs.FontFamily.bold,
                color: COLORS.GREEN,
                textAlign: 'center'
            },
            viewLeft: {
                width: '50%',
                alignItems: 'flex-start'
            },
            txtTimeDate: {
                fontSize: Configs.FontSize.size12,
                fontFamily: Configs.FontFamily.medium,
                color: COLORS.BLACK
            },
            txtRight: {
                position: 'absolute',
                right: 0,
                flexDirection: 'row'
            },
            txtNote: {
                fontSize: Configs.FontSize.size12,
                fontFamily: Configs.FontFamily.medium,
                color: COLORS.BLACK,
                marginVertical: 5
            },
            wrapNoData: {
                flex: 12,
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: SCREEN_HEIGHT / 2
            }

        }), []);
};
