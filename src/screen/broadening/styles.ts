import { useMemo } from 'react';
import { StyleSheet } from 'react-native';

import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../utils/DimensionUtils';
import { COLORS } from '@/theme';
import DimensionUtils from '@/utils/DimensionUtils';

export const MyStylesBoar = () => {
    return useMemo(() => StyleSheet.create({
        container: {
            backgroundColor: COLORS.WHITE,
            alignItems: 'center'
        },
        main: {
            width: SCREEN_WIDTH,
            height: SCREEN_HEIGHT
        },
        iconBig: {
            position: 'absolute',
            top: DimensionUtils.SCREEN_HEIGHT * 0.15,
            left: DimensionUtils.SCREEN_WIDTH * 0.05
        },
        iconSmall: {
            position: 'absolute',
            bottom: DimensionUtils.SCREEN_HEIGHT * 0.1,
            right: DimensionUtils.SCREEN_WIDTH * 0.2
        }
    }), []);
};

