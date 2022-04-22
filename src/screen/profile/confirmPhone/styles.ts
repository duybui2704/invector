import { useMemo } from 'react';
import { StyleSheet } from 'react-native';

import { Configs } from '@/common/Configs';
import { COLORS, Styles } from '@/theme';


export const MyStylesConfirmPhone = () => {
    return useMemo(() => {
        return StyleSheet.create({
            container: {
                flex: 1,
                backgroundColor: COLORS.GRAY_5,
                justifyContent: 'center'
            },
            wrapAllContent: {
                flex: 2,
                paddingHorizontal: 16,
                paddingTop: 10,
                marginBottom: 140
            },
            title: {
                ...Styles.typography.regular,
                marginBottom: 5
            },
            containerStyle: {
                backgroundColor: COLORS.WHITE,
                borderRadius: 30,
                alignItems: 'center'
            },
            inputStyle: {
                ...Styles.typography.regular,
                paddingVertical: 20,
                fontSize: Configs.FontSize.size14
            },
            groupInput: {
                marginBottom: 30
            },
            logo: {
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center'
            }
        });
    }, []);
};
