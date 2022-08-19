import { useMemo } from 'react';
import { StyleSheet } from 'react-native';

import { COLORS } from '@/theme';

export const MyStylesFaceDetect = () => {
    return useMemo(() => {
        return StyleSheet.create({
            container: {
                flex: 1,
                backgroundColor: COLORS.GRAY_5
            },
            wrapAllContent: {
                width: '100%',
                paddingHorizontal: 16,
                paddingTop: 30,
                paddingBottom: 16,
                alignSelf: 'center'
            }
           
        });
    }, []);
};
