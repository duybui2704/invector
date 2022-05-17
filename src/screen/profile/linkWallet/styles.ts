import { useMemo } from 'react';
import { StyleSheet } from 'react-native';

import { COLORS, Styles } from '@/theme';

export const MyStylesLinkWallet = () => {
    return useMemo(() => {
        return StyleSheet.create({
            container: {
                flex: 1,
                backgroundColor: COLORS.GRAY_5
            },
            wrapAllContent: {
                width: '100%',
                paddingHorizontal: 16,
                paddingTop: 30,
                paddingBottom: 16,
                alignSelf: 'center'
            },
            wrapBtnLinkWallet: {
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
                borderWidth: 1,
                borderColor: COLORS.GRAY_2,
                backgroundColor: COLORS.WHITE,
                borderRadius: 20,
                paddingHorizontal: 16,
                paddingVertical: 13
            },
            wrapBtnLinkWalletChooser: {
                justifyContent: 'space-between',
                alignItems: 'center',
                flexDirection: 'row',
                paddingVertical: 13,
                borderWidth: 1,
                borderColor: COLORS.GREEN,
                borderRadius: 20,
                paddingHorizontal: 16,
                backgroundColor: COLORS.WHITE
            },
            txtNameLink: {
                ...Styles.typography.medium,
                color: COLORS.GRAY_7
            },
            txtStateLink: {
                ...Styles.typography.medium,
                color: COLORS.GRAY_7,
                paddingVertical: 5
            },
            wrapTitle: {
                width: '65%'
            },
            redText: {
                color: COLORS.RED
            },
            stateItemLink: {
                ...Styles.typography.regular,
                color: COLORS.GREEN
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
