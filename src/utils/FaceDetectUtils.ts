import { Platform } from 'react-native';
import { Face } from 'vision-camera-face-detector';
import RNFS from 'react-native-fs';

import { DetectedRectangleModel } from '../components/cardDetect/index';

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
                objects?.detectedRectangle?.bottomLeft?.x > 500 &&
                objects?.detectedRectangle?.bottomLeft?.x <= 1400 &&
                objects?.detectedRectangle?.bottomLeft?.y > 1100 &&
                objects?.detectedRectangle?.bottomLeft?.y <= 1800 
            ) {
                return true;
            }
            return false;
        case 'android':
            if (
                objects?.detectedRectangle?.bottomLeft?.x > 500 &&
                objects?.detectedRectangle?.bottomLeft?.x <= 1400 &&
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

function replaceFiles(oldFilePath: string, newFilePath: string, onAction?: any){
    RNFS.exists(newFilePath).then(async(res)=>{
        console.log('filesExist =', res);
        if(res){
            await RNFS.unlink(newFilePath).then(async()=>{
                console.log('IMAGE  DELETED!!!');
                await RNFS.moveFile(oldFilePath, newFilePath)
                    .then(() => {
                        console.log('BACK IMAGE MOVED', oldFilePath, '-- to --', newFilePath);
                        return onAction();
                    });  
            })
                .catch((e)=>{
                    console.log(e);
                });
        }else {
            await  RNFS.moveFile(oldFilePath, newFilePath)
                .then(() => {
                    console.log('BACK IMAGE MOVED', oldFilePath, '-- to --', newFilePath);
                    return onAction();
                }); 
        }
    });
}

export default {
    authenFace,
    authenCard,
    replaceFiles
};
