import { observer } from 'mobx-react';
import React, { useCallback, useEffect, useRef, useState, useMemo } from 'react';
import {
    NativeModules,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    ViewStyle
} from 'react-native';
import { runOnJS } from 'react-native-reanimated';
import {
    Camera,
    CameraCaptureError,
    useCameraDevices,
    useFrameProcessor
} from 'react-native-vision-camera';
import { Face, scanFaces } from 'vision-camera-face-detector';
import FastImage from 'react-native-fast-image';

import { COLORS, Styles } from '@/theme';
import { SCREEN_WIDTH } from '@/utils/DimensionUtils';
import FaceDetectUtils from '@/utils/FaceDetectUtils';
import Loading from '@/components/loading';
import Languages from '@/common/Languages';
import { ENUM_TYPE_CAMERA, ENUM_TYPE_CARD_CAMERA } from '@/common/constants';
import ScanRetangle, { DetectedRectangleModel } from '@/components/cardDetect';
import { Configs } from '@/common/Configs';
import CaptureIc from '@/assets/image/ic_capture_camera.svg';
import RollIc from '@/assets/image/ic_roll_camera.svg';
import BackIc from '@/assets/image/ic_back_camera.svg';
import CancelIc from '@/assets/image/ic_white_cancel_camera.svg';
import TickedIc from '@/assets/image/ic_white_tick_camera.svg';
import CancelButonIc from '@/assets/image/ic_cancel_buton_camera.svg';
import TickedButonIc from '@/assets/image/ic_checked_camera.svg';
import Navigator from '@/routers/Navigator';
import ScreenName from '@/common/screenNames';
import { useAppStore } from '@/hooks';
import ImageUtils from '@/utils/ImageUtils';

const CameraManager = NativeModules.RNRectangleScannerManager || {};

const AccountDetect = observer(({ route }: any) => {
    const { userManager } = useAppStore();
    const typeCamera = route?.params?.typeCamera;
    const typeCard = route?.params?.typeCard;

    const devices = useCameraDevices();
    const deviceFront = devices?.front;

    const [isBack, setIsBack] = useState<boolean>(false);
    const [faces, setFaces] = useState<Face[]>([]);
    const [avatarImg, setAvatar] = useState<any>();

    const [frontCard, setFrontCard] = useState<string>();
    const [backCard, setBackCard] = useState<string>();

    const [scanCard, setScanCard] = useState<DetectedRectangleModel>({});
    const [isLoading, setLoading] = useState<boolean>(false);

    const camera = useRef<Camera>(null);

    useEffect(() => {
        (async () => {
            const status = await Camera.requestCameraPermission();
        })();
    }, []);

    const frameProcessor = useFrameProcessor((frame) => {
        'worklet';

        const scannedFaces = scanFaces(frame);
        runOnJS(setFaces)(scannedFaces);
    }, []);

    const showBackCamera = useCallback(() => {
        setIsBack((last) => !last);
    }, []);

    const takePhotoCard = useCallback(async () => {
        setLoading(true);
        // setTimeout(() => {
        //     setLoading(false);
        // }, 4000);
        if (FaceDetectUtils.authenCard(scanCard)) {
            CameraManager.capture();
        }
        setLoading(!!frontCard);
    }, [frontCard, scanCard]);

    const takePhotoFace = useCallback(async () => {
        try {
            setLoading(true);
            const photo = await camera?.current
                ?.takePhoto({
                    flash: 'off'
                })
                .then(async (res) => {
                    if (res) {
                        console.log('res = ', res);
                        setAvatar(res);
                        setLoading(false);
                    }
                });
            setLoading(false);
        } catch (e) {
            if (e instanceof CameraCaptureError) {
                switch (e.code) {
                    case 'capture/file-io-error':
                        console.error('Failed to write photo to disk!');
                        break;
                    default:
                        console.error(e);
                        break;
                }
            }
        }
    }, []);

    const cancelScanImg = useCallback(() => {
        if (typeCard === ENUM_TYPE_CARD_CAMERA.FRONT) {
            setFrontCard('');
        } else if (typeCard === ENUM_TYPE_CARD_CAMERA.BACK) {
            setBackCard('');
        } else {
            setAvatar(null);
        }
    }, [typeCard]);

    const onNavigateBack = useCallback(() => {
        Navigator.goBack();
        cancelScanImg();
    }, [cancelScanImg]);

    const handleSetCardImageSize = useCallback(async (response: any) => {
        if (typeCard === ENUM_TYPE_CARD_CAMERA.FRONT) {
            setFrontCard(response?.uri);
            userManager.updateUserInfo({
                ...userManager.userInfo,
                front_facing_card: `${response?.uri}`
            });
        } else {
            setBackCard(response?.uri);
            userManager.updateUserInfo({
                ...userManager.userInfo,
                card_back: `${response?.uri}`
            });
        }
        Navigator.navigateScreen(ScreenName.accountIdentify, { isSaveCache: true });


    }, [typeCard, userManager]);

    const confirmScanImg = useCallback(async () => {
        setLoading(true);
        if (typeCamera === ENUM_TYPE_CAMERA.FACE) {
            userManager.updateUserInfo({
                ...userManager.userInfo,
                avatar: `${Languages.common.fileDir}${avatarImg?.path}`
            });
            Navigator.navigateScreen(ScreenName.accountIdentify, { isSaveCache: true });
        } else if (typeCard === ENUM_TYPE_CARD_CAMERA.FRONT) {

            ImageUtils.onResizeImage(
                `${frontCard}`,
                handleSetCardImageSize
            );


        } else {
            ImageUtils.onResizeImage(
                `${backCard}`,
                handleSetCardImageSize
            );
        }
        setLoading(false);

    }, [avatarImg?.path, backCard, frontCard, handleSetCardImageSize, typeCamera, typeCard, userManager]);

    const renderButon = useCallback((icon: any, btnStyle: any, _onPress: any, hasBorderRadio?: boolean, isOpacity?: boolean, _btnStyleContainer?: any) => {
        const opacityItem = {
            opacity: FaceDetectUtils.authenFace(faces) || FaceDetectUtils.authenCard(scanCard) ? 1 : 0.7
        } as ViewStyle;

        return (
            <TouchableOpacity
                style={[
                    isOpacity ? opacityItem : undefined,
                    hasBorderRadio ? styles.btnStyleContainer : styles.btnNOBOrder,
                    _btnStyleContainer
                ]}
                onPress={_onPress}
            >
                <View style={[btnStyle, isOpacity ? opacityItem : undefined]}>
                    {icon}
                </View>

            </TouchableOpacity>
        );
    }, [faces, scanCard]);

    const renderCardsScan = useCallback(
        (_ref: any, _setScan: any, _setValue?: any, _value?: string) => (
            <>
                <View style={styles.wrapIconCheckCard}>
                    {FaceDetectUtils.authenCard(scanCard) || frontCard || backCard ?
                        <TickedButonIc /> :
                        <CancelButonIc />}
                </View>
                <ScanRetangle ref={_ref}
                    setPositionScan={_setScan}
                    setOriginImg={_setValue}
                    imgCapture={_value}
                />
            </>

        ),
        [backCard, frontCard, scanCard]
    );

    const renderCam = useCallback(
        (
            _ref: any,
            _back?: any,
            _front?: any,
            _framePro?: any,
            hasColorStroke?: boolean
        ) => {

            const borderColor = {
                borderColor: hasColorStroke || avatarImg?.path ? COLORS.GREEN_2 : COLORS.RED_6
            } as ViewStyle;

            return (
                <>
                    <View style={styles.wrapIconCheck}>
                        {avatarImg?.path || FaceDetectUtils.authenFace(faces) ?
                            <TickedButonIc /> :
                            <CancelButonIc />}
                    </View>
                    <View style={[styles.cameraContainer, borderColor]}>
                        {avatarImg?.path ?
                            <FastImage
                                source={{ uri: `${Languages.common.fileDir}${avatarImg?.path}` }}
                                style={styles.wrapImage}
                            /> :
                            <Camera
                                ref={camera}
                                photo={true}
                                style={styles.wrapSelfCamera}
                                device={isBack ? _back : _front}
                                isActive={true}
                                fps={30}
                                frameProcessor={_framePro}
                                frameProcessorFps={5}
                            ></Camera>
                        }
                    </View>

                </>
            );
        },
        [avatarImg?.path, faces, isBack]
    );

    const renderDetectCam = useMemo(() => {
        if (deviceFront == null) {
            return <View style={styles.container}><Loading isOverview /></View>;
        } return <>
            {renderCam(
                camera,
                devices?.back,
                devices?.front,
                frameProcessor,
                FaceDetectUtils.authenFace(faces)
            )}
        </>;
    }, [deviceFront, devices?.back, devices?.front, faces, frameProcessor, renderCam]);

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar
                translucent
                backgroundColor={COLORS.TRANSPARENT}
                barStyle={'light-content'} />

            <View style={styles.container}>
                <View style={styles.wrapTitle}>
                    <Text style={styles.txtTitle}>
                        {
                            typeCamera === ENUM_TYPE_CAMERA.FACE ?
                                Languages.accountIdentify.capturePerson :
                                Languages.accountIdentify.captureCard
                        }
                    </Text>
                </View>
                <View style={styles.bodyContainer}>
                    <View >
                        {
                            typeCamera === ENUM_TYPE_CAMERA.FACE ?
                                renderDetectCam
                                :
                                renderCardsScan(
                                    camera,
                                    setScanCard,
                                    typeCard === ENUM_TYPE_CARD_CAMERA.FRONT ? setFrontCard : setBackCard,
                                    typeCard === ENUM_TYPE_CARD_CAMERA.FRONT ? frontCard : backCard)
                        }

                        <Text style={styles.noteCaptureText}>

                            {!avatarImg?.path ?
                                typeCamera === ENUM_TYPE_CAMERA.FACE ?
                                    Languages.accountIdentify.noteCapturePerson :
                                    Languages.accountIdentify.noteCaptureCard :
                                typeCamera === ENUM_TYPE_CAMERA.FACE ?
                                    Languages.accountIdentify.confirmCapturePerson :
                                    Languages.accountIdentify.confirmCaptureCard
                            }
                        </Text>

                        {avatarImg?.path || frontCard || backCard ?

                            <View style={styles.wrapViewBtnTakePhoto}>
                                {renderButon(
                                    <TickedIc />,
                                    styles.wrapBtnApproveImg,
                                    confirmScanImg,
                                    true,
                                    false,
                                    styles.borderConfirmImg
                                )}
                                {renderButon(
                                    <CancelIc />,
                                    styles.wrapBtnCancelImg,
                                    cancelScanImg,
                                    true,
                                    false,
                                    styles.borderCancelImg
                                )}
                            </View> :
                            <View style={styles.wrapViewBtnTakePhoto}>
                                {renderButon(
                                    <BackIc />,
                                    styles.wrapBtnChangeTypeCamera,
                                    onNavigateBack
                                )}
                                {renderButon(
                                    <CaptureIc />,
                                    styles.wrapBtnTakeCamera,
                                    typeCamera === ENUM_TYPE_CAMERA.FACE ?
                                        (FaceDetectUtils.authenFace(faces) ? takePhotoFace : undefined) :
                                        (FaceDetectUtils.authenCard(scanCard) ? takePhotoCard : undefined),
                                    true,
                                    true
                                )}
                                {typeCamera === ENUM_TYPE_CAMERA.FACE &&
                                    renderButon(
                                        <RollIc />,
                                        styles.wrapBtnChangeTypeCamera,
                                        showBackCamera
                                    )}
                            </View>
                        }
                    </View>
                </View>
                {isLoading && <Loading isOverview />}
            </View>
        </SafeAreaView>
    );
});

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.GRAY_17,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    bodyContainer: {
        flex: 8
    },
    wrapViewBtnTakePhoto: {
        flexDirection: 'row',
        paddingVertical: '10%',
        width: '80%',
        justifyContent: 'space-around',
        alignSelf: 'center',
        alignItems: 'center'
    },
    wrapBtnChangeTypeCamera: {
        alignSelf: 'center'
    },
    wrapBtnTakeCamera: {
        backgroundColor: COLORS.WHITE,
        width: SCREEN_WIDTH * 0.165,
        height: SCREEN_WIDTH * 0.165,
        borderRadius: SCREEN_WIDTH * 0.165,
        alignItems: 'center',
        justifyContent: 'center'
    },
    wrapSelfCamera: {
        width: SCREEN_WIDTH * 0.9,
        height: SCREEN_WIDTH * 0.9,
        alignSelf: 'center',
        transform: [{
            scaleY: 1 / 1.15
        }]
    },
    cameraContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 8,
        borderRadius: SCREEN_WIDTH * 0.8,
        overflow: 'hidden',
        width: SCREEN_WIDTH * 0.8,
        height: SCREEN_WIDTH * 0.8,
        alignSelf: 'center',
        transform: [{
            scaleY: 1.15
        }]
    },
    wrapImage: {
        width: SCREEN_WIDTH * 0.9,
        height: SCREEN_WIDTH * 0.9,
        transform: [{
            scaleY: 1 / 1.15
        }]
    },
    txtTitle: {
        ...Styles.typography.regular,
        fontSize: Configs.FontSize.size20,
        color: COLORS.WHITE
    },
    wrapTitle: {
        flex: 1,
        paddingTop: '20%'
    },
    noteCaptureText: {
        ...Styles.typography.regular,
        paddingHorizontal: '12%',
        textAlign: 'center',
        color: COLORS.WHITE,
        paddingTop: '26%'
    },
    wrapBtnCancelImg: {
        width: SCREEN_WIDTH * 0.165,
        height: SCREEN_WIDTH * 0.165,
        borderRadius: SCREEN_WIDTH * 0.165,
        borderWidth: 3.5,
        borderColor: COLORS.RED_6,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.RED_6
    },
    wrapBtnApproveImg: {
        width: SCREEN_WIDTH * 0.165,
        height: SCREEN_WIDTH * 0.165,
        borderRadius: SCREEN_WIDTH * 0.165,
        borderWidth: 3.5,
        borderColor: COLORS.GREEN_2,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.GREEN_2
    },
    btnStyleContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        width: SCREEN_WIDTH * 0.2,
        height: SCREEN_WIDTH * 0.2,
        borderRadius: SCREEN_WIDTH * 0.2,
        borderWidth: 3.5,
        borderColor: COLORS.WHITE
    },
    btnNOBOrder: {
        borderColor: COLORS.WHITE
    },
    borderConfirmImg: {
        borderColor: COLORS.GREEN_2
    },
    borderCancelImg: {
        borderColor: COLORS.RED_6
    },
    wrapIconCheck: {
        position: 'absolute',
        left: '15%',
        zIndex: 1000
    },
    wrapIconCheckCard: {
        position: 'absolute',
        left: '1%',
        top: -10,
        zIndex: 1000
    }

});

export default AccountDetect;
