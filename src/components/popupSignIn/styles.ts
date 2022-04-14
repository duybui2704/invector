import { StyleSheet } from 'react-native';
import { useMemo } from 'react';

import { COLORS, Styles } from '@/theme';
import { Configs } from '@/common/Configs';
import DimensionUtils from '@/utils/DimensionUtils';

export const MyStylePupUpSignIn = () => {
    return useMemo(() =>
        StyleSheet.create({
            popup: {
                flex: 1,
                backgroundColor: COLORS.TRANSPARENT,
                borderColor: COLORS.TRANSPARENT,
                justifyContent: 'center',
                alignItems: 'center'
            },
            tobModal: {
                flexDirection: 'column',
                width: '85%',
                height: '50%',
                backgroundColor: COLORS.WHITE,
                borderRadius: 10,
                justifyContent: 'center',
                alignItems: 'center'
            },
            tobView: {
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'center',
                width: '80%',
                alignItems: 'center'
            },
            textModel: {
                fontSize: 20,
                fontFamily: 'Roboto-Medium',
                textAlign: 'center',
                color: COLORS.GRAY
            },
            smallButton: {
                borderWidth: 1,
                borderRadius: 12,
                borderColor: COLORS.GREEN,
                backgroundColor: COLORS.WHITE,
                width: DimensionUtils.SCREEN_WIDTH * 0.5,
                height: DimensionUtils.SCREEN_HEIGHT * 0.05,
                marginVertical: 5,
                justifyContent: 'center',
                alignItems: 'center'
            },
            smallButtonText: {
                fontFamily: 'Roboto-Bold',
                fontSize: 12
            },
            tob: {
                width: '50%',
                justifyContent: 'center',
                alignItems: 'center'
            },
            viewFL: {
                width: '100%',
                height: '80%',
                justifyContent: 'center',
                alignItems: 'center'
            }
        })
        , []);
};
