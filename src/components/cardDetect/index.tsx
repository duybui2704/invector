import React, {
    forwardRef,
    useCallback,
    useImperativeHandle,
    useState
} from 'react';
import {
    Image,
    NativeModules,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    ViewProps,
    ViewStyle
} from 'react-native';
import Scanner from 'react-native-rectangle-scanner';
import FastImage from 'react-native-fast-image';

import { COLORS } from '@/theme';
import { SCREEN_WIDTH } from '@/utils/DimensionUtils';

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
        const [position, setPosition] = useState<DetectedRectangleModel>();

        const greenColor = {
            borderColor: position?.detectedRectangle || imgCapture ? COLORS.GREEN : COLORS.RED
        } as ViewStyle;

        const onShow = useCallback(() => {
            setShow(true);
        }, []);

        const onHide = useCallback(() => {
            setShow(false);
        }, []);

        const onPictureProcessed = useCallback(
            ({ croppedImage, initialImage }: any) => {
                // setCroppedImg?.(croppedImage);
                setOriginImg?.(initialImage);
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
        borderColor: COLORS.RED,
        width: SCREEN_WIDTH * 0.95,
        height: SCREEN_WIDTH * 0.75,
        alignSelf: 'center'
    },
    wrapSelfCamera: {
        width: SCREEN_WIDTH * 0.95,
        height: SCREEN_WIDTH * 0.75
    },
    wrapOptionScan: {
        flexDirection: 'row'
    },
    wrapCancel: {
        width: 60,
        height: 60,
        borderColor: COLORS.PINK,
        borderWidth: 5,
        backgroundColor: COLORS.YELLOW,
        borderRadius: 40,
        alignItems: 'center',
        justifyContent: 'center'
    },
    wrapCapture: {
        width: 90,
        height: 90,
        borderColor: COLORS.PINK,
        borderWidth: 5,
        backgroundColor: COLORS.RED,
        borderRadius: 90,
        alignItems: 'center',
        justifyContent: 'center'
    },
    wrapSetFlash: {
        width: 60,
        height: 60,
        borderColor: COLORS.PINK,
        borderWidth: 5,
        backgroundColor: COLORS.YELLOW,
        borderRadius: 40,
        alignItems: 'center',
        justifyContent: 'center'
    },
    wrapOpenScanBtn: { backgroundColor: COLORS.GRAY },
    txtOpenScanBtn: { paddingVertical: 10 },
    imgContainer: {
        width: 300,
        height: 300
    }
});
export default ScanRetangle;
