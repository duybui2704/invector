import { useMemo } from 'react';
import { StyleSheet } from 'react-native';

import { COLORS } from '../../../theme/colors';
import { SCREEN_HEIGHT } from '@/utils/DimensionUtils';
import { Configs } from '@/common/Configs';
import { Styles } from '@/theme';

export const MyStylesNotifyInvest = () => {
    return useMemo(() =>
        StyleSheet.create({
            container: {
                flex: 1,
                backgroundColor: COLORS.WHITE_GRAY1
            },
            pagerView: {
                flex: 1,
            },
            investTab: {
                flexDirection: 'row',
                width: '100%',
                height: SCREEN_HEIGHT * 0.05,
                backgroundColor: COLORS.GRAY_13,
                borderRadius: 26,
                marginBottom: 12,
                padding: 5
            },
            wrapContent: {
                flex: 1,
                marginHorizontal: 10
            },
            btInvest: {
                alignItems: 'center',
                justifyContent: 'center',
                paddingVertical: 4,
                borderRadius: 26,
                paddingHorizontal: 16
            },
            txtBtInvest: {
                ...Styles.typography.medium,
                fontSize: Configs.FontSize.size13
            },
            flatList: {
                paddingBottom: 10
            },
            item: {
                paddingTop: 8,
                backgroundColor: COLORS.WHITE,
                paddingHorizontal: 10,
                paddingBottom: 5,
                borderRadius: 10,
                marginBottom: 8,
                opacity: 1
            },
            itemPromotion: {
                paddingTop: 8,
                backgroundColor: COLORS.WHITE,
                paddingHorizontal: 10,
                paddingBottom: 5,
                marginBottom: 8,
            },
            itemBlur: {
                paddingTop: 8,
                backgroundColor: COLORS.WHITE,
                paddingHorizontal: 10,
                borderRadius: 10,
                marginBottom: 8,
                paddingBottom: 5,
                opacity: 0.7
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
                flex: 1,
                textAlign: 'left',
            },
            titlePromotion: {
                fontSize: Configs.FontSize.size15,
                fontFamily: Configs.FontFamily.bold,
                color: COLORS.GREEN,
                marginTop: 5
            },
            titlePromotionDetail: {
                fontSize: Configs.FontSize.size15,
                fontFamily: Configs.FontFamily.bold,
                color: COLORS.GREEN,
                marginTop: 5,
                marginHorizontal: 5
            },
            txtTimeDate: {
                fontSize: Configs.FontSize.size11,
                fontFamily: Configs.FontFamily.medium,
                color: COLORS.GRAY_12,
                textAlign:'right'
            },
            txtTimeDatePromotion: {
                fontSize: Configs.FontSize.size11,
                fontFamily: Configs.FontFamily.medium,
                color: COLORS.GRAY_12,
                marginTop: 2,
                marginBottom: 7
            },
            txtRight: {
                position: 'absolute',
                right: 0,
                flexDirection: 'row'
            },
            txtNote: {
                fontSize: Configs.FontSize.size13,
                fontFamily: Configs.FontFamily.medium,
                color: COLORS.GRAY_12,
                marginVertical: 5
            },
            wrapNoData: {
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: SCREEN_HEIGHT / 2
            },
            topBarContainer: {
                backgroundColor: COLORS.GRAY_13,
                borderRadius: 26,
                marginHorizontal: 16,
                flexDirection: 'row',
                marginBottom: 10,
                justifyContent: 'space-between'
            },
            filterItem: {
                paddingHorizontal: 2
            },
        }), []);
};
