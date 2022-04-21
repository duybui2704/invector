import { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { SCREEN_HEIGHT } from '@gorhom/bottom-sheet';

import { Configs } from '@/common/Configs';
import { COLORS, Styles } from '@/theme';


export const MyStylesVerifyOTP = () => {
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
            logo: {
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center'
            },
            reSendCodeText: {
                ...Styles.typography.regular,
                paddingVertical: 20,
                color: COLORS.RED_4,
                textAlign: 'center'
            },
            underlineStyleBase: {
                width: 50,
                height: 50,
                ...Styles.typography.regular,
                borderWidth: 1,
                borderColor: COLORS.GRAY_11,
                borderRadius: 30,
                color: COLORS.BLACK,
                backgroundColor: COLORS.WHITE,
                fontSize: Configs.FontSize.size16
            },
            underlineStyleHighLighted: {
                borderColor: COLORS.GREEN,
                ...Styles.typography.regular,
                fontSize: Configs.FontSize.size16,
                borderWidth: 1,
                color: COLORS.GREEN
            },
            wrapOTp: {
                height: SCREEN_HEIGHT * 0.1
            }
        });
    }, []);
};
