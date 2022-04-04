import { StyleSheet } from 'react-native';

import { COLORS } from '../../theme';
import DimensionUtils from '../../utils/DimensionUtils';

export const styles = StyleSheet.create({
    main: {
        flex: 1
    },
    viewTxt: {
        flex: 1,
        marginTop: DimensionUtils.SCREEN_HEIGHT/1.8,
        marginLeft: DimensionUtils.SCREEN_WIDTH * 0.04,
        marginRight: DimensionUtils.SCREEN_WIDTH * 0.1
    },
    txt1: {
        fontSize: 24,
        fontStyle: 'normal',
        fontWeight: '600',
        fontFamily: 'bold',
        color: COLORS.WHITE,
        paddingBottom: DimensionUtils.SCREEN_HEIGHT * 0.02
    },
    txt2: {
        fontSize: 16,
        fontStyle: 'normal',
        fontWeight: '400',
        fontFamily: 'bold',
        color: COLORS.WHITE
    },
    txt3: {
        fontSize: 16,
        fontStyle: 'normal',
        fontWeight: '600',
        fontFamily: 'bold',
        color: COLORS.WHITE
    },
    tob: {
        borderRadius: 10,
        width: DimensionUtils.SCREEN_WIDTH * 0.3,
        height: DimensionUtils.SCREEN_HEIGHT * 0.05,
        borderWidth: 0.7,
        borderColor: COLORS.WHITE,
        justifyContent: 'center',
        alignItems: 'center' 
    },
    viewTob: {
        flexDirection: 'row',
        alignItems: 'center',
        // justifyContent: 'center',
        marginVertical: DimensionUtils.SCREEN_HEIGHT * 0.1
    },
    img: {
        marginLeft: DimensionUtils.SCREEN_WIDTH * 0.35,
        fontSize: 30
    },
    picture: {
        width: DimensionUtils.SCREEN_WIDTH,
        height: DimensionUtils.SCREEN_HEIGHT,
        overflow: 'hidden'
    },
    pictures: {
        width: DimensionUtils.SCREEN_WIDTH,
        height: DimensionUtils.SCREEN_HEIGHT,
        flexDirection: 'row'
    },
    image: {
        ...StyleSheet.absoluteFillObject,
        width: DimensionUtils.SCREEN_WIDTH,
        height: DimensionUtils.SCREEN_HEIGHT
    },
    container: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: COLORS.BLACK
    }
});
