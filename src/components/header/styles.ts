import { StyleSheet } from 'react-native';

import DimensionUtils from '../../utils/DimensionUtils';
import { COLORS, Styles } from '../../theme';
import { Configs, PADDING_TOP, STATUSBAR_HEIGHT } from '../../common/Configs';

const IMG_HEADER_HEIGHT = DimensionUtils.SCREEN_WIDTH / 375 * 85;
export const styles = StyleSheet.create({
    container: {
        height: IMG_HEADER_HEIGHT
    },
    imageBg: {
        position: 'absolute',
        top: 0,
        right: 0,
        left: 0,
        width: DimensionUtils.SCREEN_WIDTH,
        height: DimensionUtils.SCREEN_WIDTH / 1.8
    },
    imageBg1: {
        position: 'absolute',
        top: 0,
        right: 0,
        left: 0,
        width: DimensionUtils.SCREEN_WIDTH,
        height: IMG_HEADER_HEIGHT,
        tintColor: COLORS.WHITE
    },
    headerContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: STATUSBAR_HEIGHT + PADDING_TOP,
        marginHorizontal: DimensionUtils.SCREEN_HEIGHT * 0.01
    },
    goBack: {
        justifyContent: 'center'
    },
    titleContainer: {
        position: 'absolute',
        left: 0,
        right: 0
    },
    titleCenter: {
        ...Styles.typography.medium,
        fontSize: Configs.FontSize.size20,
        textAlign: 'center',
        color: COLORS.WHITE
    },
    titleCenter1: {
        ...Styles.typography.medium,
        fontSize: Configs.FontSize.size20,
        textAlign: 'center',
        color: COLORS.GREEN
    },
    imgBack:{
        width: DimensionUtils.SCREEN_WIDTH * 0.05, 
        height: DimensionUtils.SCREEN_WIDTH * 0.05
    },
    logo: {
        position: 'absolute',
        left: DimensionUtils.SCREEN_WIDTH * 0.03,
        top: DimensionUtils.SCREEN_HEIGHT * 0.03,
        width: DimensionUtils.SCREEN_WIDTH * 0.3,
        height: DimensionUtils.SCREEN_WIDTH * 0.3
    },
    imgNotify: {
        position: 'absolute',
        right: DimensionUtils.SCREEN_WIDTH * 0.03,
        top: DimensionUtils.SCREEN_HEIGHT * 0.09,
        width: DimensionUtils.SCREEN_WIDTH * 0.08,
        height: DimensionUtils.SCREEN_WIDTH * 0.08
    }
});
