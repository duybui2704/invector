import { useMemo } from 'react';
import { StyleSheet } from 'react-native';

import { Configs } from '@/common/Configs';
import { COLORS, Styles } from '@/theme';

export const MyStylesAccountInfo = () => {
    return useMemo(() => {
        return StyleSheet.create({
            container: {
                flex: 1,
                backgroundColor: COLORS.GRAY_5
            },
            mainContainer: {
                paddingHorizontal: 16
            },
            wrapContent: {
                backgroundColor: COLORS.WHITE,
                borderRadius: 12,
                marginTop: 16,
                alignItems: 'center'
            },
            wrapEdit: {
                paddingHorizontal: 16,
                width: '100%',
                paddingTop: 25,
                paddingBottom: 20
            },
            topContainer: {
                width: '100%',
                backgroundColor: COLORS.WHITE,
                borderRadius: 12,
                marginTop: 10,
                paddingHorizontal: 16,
                paddingVertical: 10,
                alignItems: 'center',
                justifyContent: 'space-between'
            },
            styleTextInfo: {
                ...Styles.typography.regular,
                color: COLORS.GRAY_12
            },
            styleValueCheckedInfo: {
                ...Styles.typography.medium,
                color: COLORS.GRAY_7,
                textAlign: 'right',
                width: '70%'
            },
            styleValueUnCheckedInfo: {
                ...Styles.typography.regular,
                color: COLORS.GRAY_7
            },
            wrapAllItemInfo: {
                width: '100%',
                justifyContent: 'space-between'
            },
            wrapCheckedInfo: {
                width: '90%',
                paddingVertical: 10
            },
            wrapUnCheckedInfo: {
                width: '100%',
                paddingVertical: 10
            },
            txtContentKYC: {
                width: '100%',
                ...Styles.typography.medium,
                color: COLORS.GRAY_7,
                textAlign: 'center',
                paddingVertical: 5
            },
            accuracyWrap: {
                width: '100%',
                backgroundColor: COLORS.WHITE_GREEN,
                borderRadius: 70,
                alignItems: 'center',
                marginTop: 5,
                paddingVertical: 8
            },
            txtAccuracy: {
                ...Styles.typography.medium,
                color: COLORS.GREEN,
                paddingHorizontal: 40
            },
            txtNotAccuracy: {
                ...Styles.typography.medium,
                color: COLORS.RED_2,
                paddingHorizontal: 60
            },
            notAccuracyWrap: {
                width: '100%',
                backgroundColor: COLORS.PINK,
                borderRadius: 70,
                alignItems: 'center',
                marginTop: 5,
                paddingVertical: 8
            },
            iconTicked: {
        
            }
        });
    }, []);
};
