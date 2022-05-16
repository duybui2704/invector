import { StyleSheet } from 'react-native';
import { useMemo } from 'react';
import { SCREEN_WIDTH } from '@gorhom/bottom-sheet';

import { COLORS, Styles } from '@/theme';
import { Configs } from '@/common/Configs';

export const MyStylePupUp = () => {
    return useMemo(() =>
        StyleSheet.create({

            textModel: {
                ...Styles.typography.regular,
                fontSize: Configs.FontSize.size20,
                textAlign: 'center',
                color: COLORS.GREEN
            },
            viewFL: {
                backgroundColor: COLORS.WHITE,
                borderColor: COLORS.TRANSPARENT,
                borderRadius: 20,
                borderWidth: 1,
                paddingBottom: 10,
                paddingTop: 10,
                width: '100%',
                paddingHorizontal: 16
            },
            inputPhone: {
                marginTop: 15,
                borderRadius: 30,
                width: '100%',
                borderWidth: 1,
                paddingVertical: 10,
                borderColor: COLORS.GRAY_11,
                paddingLeft: 16
            },
            textConfirm: {
                ...Styles.typography.medium,
                fontSize: Configs.FontSize.size14,
                color: COLORS.WHITE
            },
            tobConfirm: {
                height: 40,
                borderRadius: 20,
                backgroundColor: COLORS.GREEN,
                justifyContent: 'center',
                alignItems: 'center',
                width: (SCREEN_WIDTH - 32 - 60) / 2
            },
            viewBottom: {
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginVertical: 20,
                alignItems: 'center'
            },
            txtPalaceholder: {
                ...Styles.typography.regular,
                color: COLORS.GRAY_16
            }
        })
    , []);
};
