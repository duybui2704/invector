import { useMemo } from 'react';
import { StyleSheet } from 'react-native';

import { COLORS } from '@/theme';

export const MyStylesManual = () => {
    return useMemo(() => {
        return StyleSheet.create({
            container: {
                flex: 1,
                backgroundColor: COLORS.GRAY_5
            },
            wrapAllContent: {
                paddingHorizontal: 16,
                paddingTop: 10
            }
        });
    }, []);
};
