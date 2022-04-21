import { useMemo } from 'react';
import { StyleSheet } from 'react-native';

import { COLORS } from '@/theme';

export const MyStylesBoar = () => {
    return useMemo(() => StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: COLORS.WHITE,
            alignItems: 'center'
        },
        main:{
            flex: 1
        }
    }), []);
};

