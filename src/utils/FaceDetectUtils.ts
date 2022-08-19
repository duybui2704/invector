import { Platform } from 'react-native';
import { Face } from 'vision-camera-face-detector';

const authenFace = (objects: Face[]) => {
    switch (Platform.OS) {
        case 'ios':
            if (
                objects?.length === 1 &&
                objects[0].yawAngle > -6 &&
                objects[0].yawAngle <= 6 &&
                objects[0].pitchAngle > -6 &&
                objects[0].pitchAngle <= 6 &&
                objects[0].rollAngle > -6 &&
                objects[0].rollAngle <= 6 &&
                objects[0].bounds.width >= 500 &&
                objects[0].bounds.width <= 620 &&
                objects[0].bounds.height >= 500 &&
                objects[0].bounds.height <= 620 &&
                objects[0].bounds.x >= 130 &&
                objects[0].bounds.x <= 230 &&
                objects[0].bounds.y >= 400 &&
                objects[0].bounds.y <= 550 &&
                objects[0].bounds.boundingCenterX >= 320 &&
                objects[0].bounds.boundingCenterX <= 390 &&
                objects[0].bounds.boundingCenterY >= 600 &&
                objects[0].bounds.boundingCenterY <= 720 &&
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
                objects[0].bounds.x >= 90 &&
                objects[0].bounds.x <= 140 &&
                objects[0].bounds.boundingCenterX >= 240&&
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

export default {
    authenFace
};
