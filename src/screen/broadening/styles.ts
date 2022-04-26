import { useMemo } from 'react';
import { StyleSheet } from 'react-native';

import { COLORS } from '@/theme';
import DimensionUtils from '@/utils/DimensionUtils';

export const MyStylesBoar = () => {
    return useMemo(() => StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: COLORS.WHITE,
            alignItems: 'center'
        },
        main: {
            flex: 1
        },
        iconBig: {
            position: 'absolute',
            top: DimensionUtils.SCREEN_HEIGHT * 0.12,
            left: DimensionUtils.SCREEN_WIDTH * 0.08
        },
        iconSmall: {
            position: 'absolute',
            bottom: DimensionUtils.SCREEN_HEIGHT * 0.1,
            right: DimensionUtils.SCREEN_WIDTH * 0.2
        }
    }), []);
};

