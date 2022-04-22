import { useMemo } from 'react';
import { StyleSheet } from 'react-native';

import { Configs } from '@/common/Configs';
import { COLORS, Styles } from '@/theme';

export const MyStylesAccountIdentify = () => {
    return useMemo(() => {
        return StyleSheet.create({
            container: {
                flex: 1,
                backgroundColor: COLORS.GRAY_5
            },
            wrapEdit: {
                paddingHorizontal: 16,
                width: '100%',
                paddingTop: 10,
                paddingBottom: 16
            },
            contentContainer: {
                paddingHorizontal: 16,
                paddingBottom: 24,
                backgroundColor: COLORS.WHITE,
                borderRadius: 16,
                borderWidth: 1,
                borderColor: COLORS.GRAY_13
            },
            pickerContainer: {
                marginBottom: -40
            },
            wrapInput: {
                justifyContent: 'space-between',
                width: '100%',
                paddingHorizontal: 16,
                paddingBottom: 5
            },
            wrapTopHtml: {
                alignSelf: 'center',
                paddingHorizontal: 16
            },
            accuracyWrap: {
                width: '100%',
                borderRadius: 70,
                alignItems: 'center',
                marginTop: 5,
                paddingVertical: 8
            },
            inputStyle: {
                borderWidth: 1,
                borderColor: COLORS.GRAY_11,
                borderRadius: 30,
                marginVertical: 5
            },
            labelStyle: {
                ...Styles.typography.regular,
                color: COLORS.GRAY_7
            },
            titlePhoto: {
                ...Styles.typography.medium,
                color: COLORS.RED_2,
                paddingTop: 16
            },
            txtNotePhoto: {
                ...Styles.typography.regular,
                color: COLORS.GRAY_12,
                fontSize: Configs.FontSize.size12,
                paddingVertical: 4
            }
        });
    }, []);
};
