import { StyleSheet } from 'react-native';

import { COLORS } from '@/theme/colors';
import DimensionUtils from '@/utils/DimensionUtils';


const styles = StyleSheet.create({
    main: {
        flex: 1
    },
    scrollView: {
        marginHorizontal: 16
    },
    txt: {
        fontSize: 15,
        color: COLORS.BLACK
    },
    investTab: {
        flexDirection: 'row',
        width: '100%',
        backgroundColor: COLORS.GRAY_13,
        padding: 4,
        borderRadius: 26
    },
    btInvest: {
        width: (DimensionUtils.SCREEN_WIDTH - 32) / 3,
        alignItems: 'center',
        backgroundColor: COLORS.WHITEn

    }
});
export default styles;
