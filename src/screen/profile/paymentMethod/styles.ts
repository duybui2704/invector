import { useMemo } from 'react';
import { StyleSheet } from 'react-native';

import { Configs } from '@/common/Configs';
import { COLORS, Styles } from '@/theme';

export const MyStylesPaymentMethod = () => {
    return useMemo(() => {
        return StyleSheet.create({
            container: {
                flex: 1,
                backgroundColor: COLORS.GRAY_5
            },
            wrapAllContent: {
                paddingHorizontal: 16,
                paddingTop: 10
            },
            txtMethodChoose: {
                ...Styles.typography.medium,
                color: COLORS.GRAY_7,
                fontSize: Configs.FontSize.size16
            },
            txtMethodName: {
                ...Styles.typography.medium,
                color: COLORS.GRAY_7
            },
            wrapItemPayment: {
                justifyContent: 'space-between',
                alignItems: 'center',
                flexDirection: 'row',
                paddingVertical: 10,
                borderWidth: 1,
                borderColor: COLORS.GRAY_2,
                borderRadius: 18,
                paddingHorizontal: 16,
                marginTop: 16
            },
            wrapRightItemPayment: {
                justifyContent: 'space-between',
                alignItems: 'center',
                flexDirection: 'row',
                width: '80%'
            },
            titleItemLink: {
                ...Styles.typography.medium,
                color: COLORS.GRAY_7
            },
            stateItemLink: {
                ...Styles.typography.regular,
                color: COLORS.GREEN
            },
            wrapRightIcon: {
                width: 32,
                height: 32,
                borderWidth: 1,
                borderRadius: 30,
                borderColor: COLORS.GRAY_12,
                alignItems: 'center',
                justifyContent: 'center'
            },
            redText: {
                color: COLORS.RED
            },
            greenBorder: {
                borderColor: COLORS.GREEN
            },
            containerAllBtnPopup:{
                flexDirection: 'row-reverse'
            },
            containerItemBtnPopup:{
                backgroundColor: COLORS.RED_2,
                borderColor : COLORS.RED_2,
                borderRadius: 20
            },
            containerCancelBtnPopup:{
                borderColor : COLORS.GRAY_13,
                borderRadius: 20
            },
            textCancel:{
                color: COLORS.GRAY_12
            }
        });
    }, []);
};
