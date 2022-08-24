import { Platform } from 'react-native';
import { Face } from 'vision-camera-face-detector';

import { DetectedRectangleModel } from '../components/cardDetect/index';

const authenFace = (objects: Face[]) => {
    switch (Platform.OS) {
        case 'ios':  // tested ip X
            if (
                objects?.length === 1 &&
                objects[0].yawAngle > -10 &&
                objects[0].yawAngle <= 10 &&
                objects[0].pitchAngle > -10 &&
                objects[0].pitchAngle <= 6 &&
                objects[0].rollAngle > -10 &&
                objects[0].rollAngle <= 10 &&
                objects[0].bounds.width >= 500 &&
                objects[0].bounds.width <= 1000 &&
                objects[0].bounds.height >= 500 &&
                objects[0].bounds.height <= 1000 &&
                objects[0].bounds.boundingCenterX >= 320 &&
                objects[0].bounds.boundingCenterX <= 700 &&
                objects[0].bounds.boundingCenterY >= 600 &&
                objects[0].bounds.boundingCenterY <= 1200 &&
                objects[0].leftEyeOpenProbability > 0 &&
                objects[0].rightEyeOpenProbability > 0
            ) {
                return true;
            }
            return false;
        case 'android':
            if (
                objects?.length === 1 &&
                objects[0].yawAngle > -6 &&
                objects[0].yawAngle <= 6 &&
                objects[0].pitchAngle > -6 &&
                objects[0].pitchAngle <= 6 &&
                objects[0].rollAngle > -6 &&
                objects[0].rollAngle <= 6 &&
                objects[0].bounds.width >= 280 &&
                objects[0].bounds.width <= 345 &&
                objects[0].bounds.height >= 280 &&
                objects[0].bounds.height <= 345 &&
                objects[0].bounds.boundingCenterX >= 240 &&
                objects[0].bounds.boundingCenterX <= 270 &&
                objects[0].bounds.boundingCenterY >= 330 &&
                objects[0].bounds.boundingCenterY <= 390 &&
                objects[0].leftEyeOpenProbability > 0 &&
                objects[0].rightEyeOpenProbability > 0
            ) {
                return true;
            }
            return false;
        default:
            return false;
    }
};

const authenCard = (objects: DetectedRectangleModel) => {
    switch (Platform.OS) {
        case 'ios':
            if (
                objects?.detectedRectangle?.bottomLeft?.x > 100 &&
                objects?.detectedRectangle?.bottomLeft?.x <= 1400 &&
                objects?.detectedRectangle?.bottomLeft?.y > 100 &&
                objects?.detectedRectangle?.bottomLeft?.y <= 1800
            ) { 
                return true;
            }
            return false;
        case 'android':
            if (
                objects?.detectedRectangle?.bottomLeft?.x > 500 &&
                objects?.detectedRectangle?.bottomLeft?.x <= 1500 &&
                objects?.detectedRectangle?.bottomLeft?.y > 1100 &&
                objects?.detectedRectangle?.bottomLeft?.y <= 1800
            ) {
                return true;
            }
            return false;
        default:
            return false;
    }
};

export default {
    authenFace,
    authenCard
};
