import { useMemo } from 'react';
import { Dimensions, StyleSheet } from 'react-native';

import { SCREEN_WIDTH, SCREEN_HEIGHT } from '@/utils/DimensionUtils';
import { COLORS } from '@/theme';

const {width: screenWidth, height: screenHeight} = Dimensions.get('screen');

export const MyStylesBoar = () => {
    return useMemo(() => StyleSheet.create({
        container: {
            backgroundColor: COLORS.WHITE,
            alignItems: 'center'
        },
        main: {
            width: SCREEN_WIDTH,
            height: SCREEN_HEIGHT * 1.5
        },
        iconBig: {
            position: 'absolute',
            top: SCREEN_HEIGHT * 0.15,
            left: SCREEN_WIDTH * 0.01
        },
        iconSmallIOS: {
            position: 'absolute',
            bottom: SCREEN_HEIGHT * 0.085,
            right: SCREEN_WIDTH * 0.2
        },
        iconSmallANDROID: {
            position: 'absolute',
            bottom: screenHeight * 0.105,
            right: screenWidth * 0.2
        }
    }), []);
};

