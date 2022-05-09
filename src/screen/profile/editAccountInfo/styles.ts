import { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { SCREEN_WIDTH } from '@gorhom/bottom-sheet';

import { COLORS, Styles } from '@/theme';

export const MyStylesEditAccountInfo = () => {
    return useMemo(() => {
        return StyleSheet.create({
            container: {
                flex: 1,
                backgroundColor: COLORS.GRAY_5
            },
            wrapContent: {
                marginTop: 16
            },
            wrapEdit: {
                paddingHorizontal: 16,
                width: '100%',
                paddingTop: 25,
                paddingBottom: 20
            },
            topContainer: {
                paddingVertical: 6,
                alignItems: 'center',
                justifyContent: 'space-between'
            },
            wrapInput: {
                justifyContent: 'space-between',
                width: '100%',
                paddingHorizontal: 16,
                paddingBottom: 5
            },
        
            accuracyWrap: {
                width: '100%',
                borderRadius: 70,
                alignItems: 'center',
                marginTop: 5,
                paddingVertical: 8
            },
            txtAccuracy: {
                ...Styles.typography.medium,
                color: COLORS.GREEN,
                paddingHorizontal: 40
            },
            circleWrap: {
                width: SCREEN_WIDTH * 0.4 - 25,
                height: SCREEN_WIDTH * 0.4 - 25,
                borderRadius: 70,
                alignItems: 'center',
                justifyContent: 'center',
                borderWidth: 0,
                borderColor: COLORS.GREEN,
                flex:1
            },
            noCircleWrap: {
                width: SCREEN_WIDTH * 0.4 - 25,
                height: SCREEN_WIDTH * 0.4 - 25,
                borderRadius: 70,
                alignItems: 'center',
                justifyContent: 'center',
                borderWidth: 2,
                borderColor: COLORS.GREEN
            },
            inputStyle: {
                borderWidth: 1,
                borderColor: COLORS.GRAY_11,
                borderRadius: 30,
                marginVertical: 5
            },
            labelStyle: {
                ...Styles.typography.regular,
                color: COLORS.GRAY_7
            }
        });
    }, []);
};
