import { useMemo } from 'react';
import { StyleSheet } from 'react-native';

import { COLORS, Styles } from '@/theme';

export const MyStylesReferral = () => {
    return useMemo(() => {
        return StyleSheet.create({
            container: {
                flex: 1,
                paddingBottom: 20,
                backgroundColor: COLORS.GRAY_5
            },
            wrapAllContent: {
                flex:1,
                padding: 5,
            },
            desContainer: {
                flexDirection: 'row',
                height: 50,
                justifyContent:'center',
                alignItems:'center',
            },
            textDes: {
                flex: 1,
                ...Styles.typography.medium,
                color: COLORS.GRAY_7,
                textAlign: 'center',
                paddingLeft: 10
            },
            row: {
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                backgroundColor: COLORS.GRAY_13,
                borderWidth: 1,
                borderColor: COLORS.GRAY_14,
                marginRight: 10,
                borderRadius: 40
            },
            wrapBtnShare: {
                borderWidth: 1,
                borderColor: COLORS.GREEN,
                borderRadius: 40,
                margin: 2
            },
            detailContainer: {
                flex: 1,
            },
            colContainer: {
                flexDirection: 'row',
                paddingVertical: 10,
                paddingHorizontal: 5
            },
            colName: {
                ...Styles.typography.medium,
                color: COLORS.GRAY_7,
                flex: 1.7
            },
            colMoney: {
                ...Styles.typography.medium,
                color: COLORS.GRAY_7,
                flex: 1,
                textAlign: 'right'
            },
            colCommission: {
                ...Styles.typography.medium,
                color: COLORS.GRAY_7,
                flex: 1,
                textAlign: 'right'
            },
            colNameC: {
                ...Styles.typography.regular,
                color: COLORS.GRAY_7,
                flex: 1.7
            },
            colMoneyC: {
                ...Styles.typography.regular,
                color: COLORS.GRAY_7,
                flex: 1,
                textAlign: 'right'
            },
            colCommissionC: {
                ...Styles.typography.regular,
                color: COLORS.GRAY_7,
                flex: 1,
                textAlign: 'right'
            },
            iconFilter: {
                width: 32,
                height: 32,
                borderRadius: 16,
                backgroundColor: COLORS.WHITE,
                justifyContent: 'center',
                alignItems: 'center',
                borderWidth: 1,
                borderColor: COLORS.GRAY_11
            },
        });
    }, []);
};
