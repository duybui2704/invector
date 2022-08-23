import React, {
    forwardRef,
    useCallback,
    useImperativeHandle,
    useState
} from 'react';
import {
    NativeModules,
    StyleSheet,
    View,
    ViewProps,
    ViewStyle
} from 'react-native';
import FastImage from 'react-native-fast-image';
import Scanner from 'react-native-rectangle-scanner';

import { COLORS } from '@/theme';
import { SCREEN_WIDTH } from '@/utils/DimensionUtils';
import FaceDetectUtils from '@/utils/FaceDetectUtils';
import Loading from '../loading';

export interface ScanRetangleActionsTypes {
    onHide: () => void;
    onShow: () => void;
    onCapture: () => any;
}

export interface ScanRetanglePropsTypes {
    filterId?: number; // 1, 2, 3, 4, default: none
    enableTorch?: boolean; // default: false
    capturedQuality?: number; // default : 0.5
    onTorchChanged?: () => void;
    onRectangleDetected?: () => void;
    onPictureTaken?: () => void;
    onPictureProcessed?: () => void;
    styles?: object;
    onErrorProcessingImage?: () => void;
    onDeviceSetup?: () => void;
    androidPermission?: object | boolean;
}

export interface BottomLeft {
    x: number;
    y: number;
}

export interface BottomRight {
    x: number;
    y: number;
}

export interface Dimensions {
    height: number;
    width: number;
}

export interface TopLeft {
    x: number;
    y: number;
}

export interface TopRight {
    x: number;
    y: number;
}

export interface DetectedRectangle {
    bottomLeft: BottomLeft;
    bottomRight: BottomRight;
    dimensions: Dimensions;
    topLeft: TopLeft;
    topRight: TopRight;
}

export interface DetectedRectangleModel {
    detectedRectangle: DetectedRectangle;
}

export interface ScanRetangleProps extends ScanRetanglePropsTypes {
    position?: DetectedRectangleModel;
    imgCapture?: any;
    imgFlash?: any;
    imgCancel?: any;
    onTakePhoto?: (fileDir?: string) => void;
    scaneContainer?: ViewProps;
    flashContainer?: ViewProps;
    cancelContainer?: ViewProps;
    captureContainer?: ViewProps;
    setPositionScan?: any;
    setOriginImg?: any;
    setCroppedImg?: any;
}

const CameraManager = NativeModules.RNRectangleScannerManager || {};

const ScanRetangle = forwardRef<ScanRetangleActionsTypes, ScanRetangleProps>(
    (
        {
            imgCapture,
            filterId,
            capturedQuality,
            onTakePhoto,
            scaneContainer,
            setPositionScan,
            setOriginImg,
            setCroppedImg
        },
        ref: any
    ) => {
        const [isShow, setShow] = useState<boolean>(false);
        const [isHasFlash, setHasFlash] = useState<boolean>(true);
        const [position, setPosition] = useState<DetectedRectangleModel>({});
        const [isLoading, setLoading] = useState<boolean>(false);

        const greenColor = {
            borderColor: FaceDetectUtils.authenCard(position) || imgCapture ? COLORS.GREEN_2 : COLORS.RED_6
        } as ViewStyle;

        const onShow = useCallback(() => {
            setShow(true);
        }, []);

        const onHide = useCallback(() => {
            setShow(false);
        }, []);

        const onPictureProcessed = useCallback(
            ({ croppedImage, initialImage }: any) => {
                // setLoading(true);
                // setCroppedImg?.(croppedImage);
                setOriginImg?.(initialImage);
                // if(initialImage){
                //     setLoading(false);
                // }
            },
            [setOriginImg]
        );


        const onRectangleDetected = useCallback(
            (res?: any) => {
                setPosition(res);
                setPositionScan(res);
            },
            [setPositionScan]
        );

        const onCapture = useCallback(() => {
            CameraManager.capture();
            // onTakePhoto?.();
        }, []);

        useImperativeHandle(ref, () => ({
            onShow,
            onHide,
            onCapture
        }));

        console.log('scanCard =', position);


        return (


            <View style={[styles.container, scaneContainer, greenColor]}>
                {imgCapture ?
                    <FastImage
                        source={{ uri: `${imgCapture}` }}
                        style={styles.wrapSelfCamera}
                    /> :
                    <Scanner
                        filterId={filterId}
                        onPictureProcessed={onPictureProcessed}
                        ref={ref}
                        enableTorch={!!isHasFlash}
                        capturedQuality={capturedQuality || 1}
                        style={styles.wrapSelfCamera}
                        onRectangleDetected={onRectangleDetected}
                    />}
                {isLoading && <Loading isOverview></Loading>}
            </View>
        );
    }
);
const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        borderWidth: 6,
        overflow: 'hidden',
        borderColor: COLORS.RED_6,
        width: SCREEN_WIDTH * 0.95,
        height: SCREEN_WIDTH * 0.75,
        alignSelf: 'center'
    },
    wrapSelfCamera: {
        width: SCREEN_WIDTH * 0.95,
        height: SCREEN_WIDTH * 0.75
    }


});
export default ScanRetangle;
