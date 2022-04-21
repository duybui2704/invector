import { useMemo } from 'react';
import { StyleSheet } from 'react-native';

import { Configs } from '@/common/Configs';
import { COLORS, Styles } from '@/theme';


export const MyStylesShareFriend = () => {
    return useMemo(() => {
        return StyleSheet.create({
            container: {
                flex: 1,
                backgroundColor: COLORS.GRAY_5
            },
            wrapAllContent: {
                paddingHorizontal: 16,
                paddingTop: 10,
                paddingBottom: 16,
                alignSelf: 'center'
            },
            wrapMyCode: {
                justifyContent: 'space-between',
                alignItems: 'center',
                flexDirection: 'row',
                borderWidth: 1,
                borderColor: COLORS.GRAY_14,
                backgroundColor: COLORS.WHITE,
                borderRadius: 40,
                paddingHorizontal: 2,
                paddingVertical: 3,
                marginVertical: 8
            },
            txtMyQrCode: {
                ...Styles.typography.medium,
                color: COLORS.GRAY_12,
                fontSize: Configs.FontSize.size16,
                marginTop: 24
            },
            textCode: {
                ...Styles.typography.medium,
                color: COLORS.GRAY_7,
                paddingVertical: 6,
                paddingLeft: 16
            },
            wrapQR: {
                alignItems: 'center',
                marginTop: 10
            },
            txtQR: {
                ...Styles.typography.medium,
                color: COLORS.GRAY_12,
                fontSize: Configs.FontSize.size16,
                paddingBottom: 16
            }
        });
    }, []);
};
