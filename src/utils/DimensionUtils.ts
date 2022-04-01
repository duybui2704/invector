import { Dimensions, Platform } from 'react-native';

const {width, height} = Dimensions.get('window');
const screenScale = Dimensions.get('window').scale;
function deviceHasNotch() {
    const _height = height * screenScale;
    if (Platform.OS === 'ios') {
        switch (_height) {
            case 1792: // iPhone XR/ 11
            case 2436: // iPhone X/XS/11 Pro
            case 2688: // iPhone XS Max/11 Pro Max
            case 2778: // iPhone 12 ProMax,
            case 2340:// iPhone 12 mini
            case 2532: // iPhone 12, 12 pro
                return true;
            default: break;
        }
    }
    return false;
}

function getPaddingTopByDevice() {
    return deviceHasNotch() ? 24 : 0;
};

// check if devices is ipX, ipXS, ipXSMAx
function getPaddingBottomByDevice() {
    return deviceHasNotch() ? 24 : 0;
};
export default {
    SCREEN_WIDTH: width,
    SCREEN_HEIGHT: height,
    getPaddingTopByDevice,
    getPaddingBottomByDevice

};
