import {StyleSheet} from 'react-native';

import { COLORS } from '../../theme';
import DimensionUtils from '../../utils/DimensionUtils';

const widthContent = DimensionUtils.SCREEN_WIDTH/2.2;
const heightContent = widthContent / 2;
const imageW = DimensionUtils.SCREEN_WIDTH / 6.5;
const marginT = DimensionUtils.SCREEN_HEIGHT / 15;
const marginLive = -DimensionUtils.SCREEN_HEIGHT / 35 - 18;

export const styles = StyleSheet.create({ 
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.WHITE,
        shadowColor: COLORS.GRAY,
        shadowOffset: {
            width: 0,
            height: 12
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,
        elevation: 24
    },
    item: {
        flexDirection: 'row',
        alignItems:'center',
        margin: 1,
        padding: DimensionUtils.SCREEN_WIDTH * 0.03,
        width: DimensionUtils.SCREEN_WIDTH / 5.5,
        height: '100%',
        marginBottom: DimensionUtils.SCREEN_HEIGHT * 0.02 
    },
    item2: {
        flexDirection: 'row',
        alignItems:'center',
        margin: 1,
        padding: DimensionUtils.SCREEN_WIDTH * 0.03,
        width: DimensionUtils.SCREEN_WIDTH / 4,
        height: '100%',
        backgroundColor: COLORS.GREEN,
        marginBottom: DimensionUtils.SCREEN_HEIGHT * 0.02,
        borderRadius: 20 
    },
    icon: {
        height:23,
        aspectRatio: 1,
        resizeMode: 'stretch'
    },
    bgIcon: {
        marginLeft: 5,
        width:30,
        height:30
    },
    icBackGroundLiveStream: {
        height: heightContent,
        width: widthContent,
        resizeMode: 'contain',
        top: -heightContent / 2,
        left: (DimensionUtils.SCREEN_WIDTH - widthContent) / 2,
        alignSelf: 'center',
        position: 'absolute'

    },
    contentLiveStream: {
        alignContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
    },
    icLiveStream: {
        height:imageW,
        width: imageW,
        marginLeft: -imageW/3.5,
        marginTop: marginLive
    },
    txtBottomBar: {
        fontSize: 15,
        color: COLORS.WHITE
    },
    txtTabs: {
        fontSize: 10,
        color: COLORS.WHITE
    },
    viewTxt: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center'
    },
    viewIcon: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }

});
