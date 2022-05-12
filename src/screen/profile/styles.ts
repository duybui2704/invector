import { StyleSheet } from 'react-native';

import { COLORS } from '@/theme';


export const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: COLORS.GRAY_13
    },
    txt: {
        ...Styles.typography.regular,
        fontSize: 15,
        color: COLORS.BLACK
    }
});
