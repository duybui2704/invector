import React, { useMemo, useCallback, useState, useRef, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { observer } from 'mobx-react';
import { ScrollView } from 'react-native-gesture-handler';
import { BottomSheetModal, SCREEN_HEIGHT, SCREEN_WIDTH, useBottomSheetTimingConfigs } from '@gorhom/bottom-sheet';
import FastImage from 'react-native-fast-image';
import TouchID from 'react-native-touch-id';
import PasscodeAuth from '@el173/react-native-passcode-auth';

import WarnIC from '@/assets/image/ic_warn_vimo_red_round.svg';
import ChangePwdIC from '@/assets/image/ic_change_pwd.svg';
import FaceIdIC from '@/assets/image/ic_faceid_big.svg';
import StarIC from '@/assets/image/ic_star_rate.svg';
import WebIC from '@/assets/image/ic_tienngay_web.svg';
import FacebookIC from '@/assets/image/ic_tienngay_fb.svg';
import PayMethodIC from '@/assets/image/ic_pay_method.svg';
import AvatarIC from '@/assets/image/ic_avatar.svg';
import ManualIC from '@/assets/image/ic_manual.svg';
import FingerIC from '@/assets/image/ic_finger.svg';
import PolicyIC from '@/assets/image/ic_policy.svg';
import PhoneIC from '@/assets/image/ic_phone.svg';
import ShareIC from '@/assets/image/ic_share.svg';
import AnswerIC from '@/assets/image/ic_answer.svg';
import LinkAccIC from '@/assets/image/ic_acc_link.svg';
import ArrowIC from '@/assets/image/ic_right_arrow.svg';
import KeyValue from '@/components/KeyValue';
import HeaderBar from '@/components/header';
import { COLORS, Styles } from '@/theme';
import { Touchable } from '@/components/elements/touchable';
import Navigator from '@/routers/Navigator';
import { Configs, isIOS } from '@/common/Configs';
import { Button } from '@/components/elements/button';
import { BUTTON_STYLES } from '@/components/elements/button/constants';
import { ScreenName, TabNamesArray } from '@/common/screenNames';
import Languages from '@/common/Languages';
import { useAppStore } from '@/hooks';
import SessionManager from '@/manager/SessionManager';
import KeyToggleValue from '@/components/KeyToggleSwitch';
import { ENUM_BIOMETRIC_TYPE, ERROR_BIOMETRIC, GET_LINK_INVESTOR, LINK_TIENNGAY, messageError, STATE_VERIFY_ACC, StorageKeys } from '@/common/constants';
import PopupConfirmBiometry from '@/components/PopupConfirmBiometry';
import { PopupActionTypes } from '@/models/typesPopup';
import PopupErrorBiometry from '@/components/PopupErrorBiometry';
import { PinCode, PinCodeT } from '@/components/pinCode';
import { CustomBackdropBottomSheet } from '@/components/CustomBottomSheet';
import StorageUtils from '@/utils/StorageUtils';
import ToastUtils from '@/utils/ToastUtils';
import Utils from '@/utils/Utils';
import { LINKS } from '@/api/constants';
import PopupNotifyNoAction from '@/components/PopupNotifyNoAction';

const customTexts = {
    set: Languages.setPassCode
};
const configTouchId = {
    unifiedErrors: false,
    passcodeFallback: false
};
const Profile = observer(() => {
    const { userManager, fastAuthInfoManager } = useAppStore();
    const { supportedBiometry } = fastAuthInfoManager;
    const popupError = useRef<PopupActionTypes>(null);
    const isEnable = SessionManager?.isEnableFastAuthentication;
    const [isEnabledSwitch, setIsEnabledSwitch] = useState(isEnable || false);
    const popupConfirm = useRef<PopupActionTypes>(null);
    const bottomSheetModalRef = useRef<BottomSheetModal>(null);
    const animationConfigs = useBottomSheetTimingConfigs({
        duration: 800
    });
    const [errorText, setErrorText] = useState<string>('');
    const popupLogout = useRef<PopupActionTypes>();

    useEffect(() => {
        if (!supportedBiometry || !SessionManager.accessToken) {
            Navigator.pushScreen(ScreenName.auth);
        }
    }, [supportedBiometry]);

    const callPhone = useCallback(() => {
        Utils.callNumber(Languages.common.hotline);
    }, []);

    const onLinkRate = useCallback(() => {
        if (isIOS) {
            return Utils.openURL(GET_LINK_INVESTOR.LINK_IOS);
        }
        return Utils.openURL(GET_LINK_INVESTOR.LINK_ANDROID);
    }, []);

    const onNavigateAccInfo = useCallback(() => {
        return Navigator.pushScreen(ScreenName.accountInfo);
    }, []);

    const onPopupLogout = useCallback(() => {
        popupLogout.current?.show();
    }, []);

    const onAgreeLogout = useCallback(() => {
        SessionManager.logout();
        userManager.updateUserInfo(null);
        Navigator.navigateToDeepScreen(
            [ScreenName.authStack], ScreenName.auth, { titleAuth: Languages.auth.txtLogin }
        );
    }, [userManager]);

    const renderPopupLogout = useCallback((ref: any) => {
        return (
            <PopupNotifyNoAction
                ref={ref}
                renderIcon={<WarnIC />}
                containerAllBtn={styles.containerAllBtnPopup}
                containerAgreeBtn={styles.containerItemBtnPopup}
                containerCancelBtn={styles.containerCancelBtnPopup}
                renderContent={Languages.account.logoutNotice}
                renderTitle={Languages.account.logout}
                textCancel={styles.textCancel}
                hasButton
                onConfirm={onAgreeLogout}
            />
        );
    }, [onAgreeLogout]);

    const renderKeyValue = useCallback((title: string, leftIcon: any, hasDashBottom?: boolean) => {
        const onNavigateScreen = () => {
            switch (title) {
                case Languages.account.shareFriends:
                    Navigator.pushScreen(ScreenName.shareFriend);
                    break;
                case Languages.account.changePwd:
                    Navigator.pushScreen(ScreenName.changePwd);
                    break;
                case Languages.account.accountLink:
                    Navigator.pushScreen(ScreenName.accountLink);
                    break;
                case Languages.account.useManual:
                    Navigator.pushScreen(ScreenName.myWedView,
                        {
                            title: Languages.account.useManual,
                            url: LINKS.MANUAL_INVESTOR
                        });
                    break;
                case Languages.account.answer:
                    Navigator.pushScreen(ScreenName.myWedView,
                        {
                            title: Languages.account.answer,
                            url: LINKS.AQ_INVESTOR
                        });
                    break;
                case Languages.account.payMethod:
                    Navigator.pushScreen(ScreenName.paymentMethod);
                    break;
                case Languages.account.hotline:
                    callPhone();
                    break;
                case Languages.account.policy:
                    Navigator.pushScreen(ScreenName.myWedView,
                        {
                            title: Languages.account.policy,
                            url: LINKS.POLICY_INVESTOR
                        });
                    break;
                case Languages.account.web:
                    Utils.openURL(LINK_TIENNGAY.LINK_TIENNGAY_WEB);
                    break;
                case Languages.account.facebook:
                    Utils.openURL(LINK_TIENNGAY.LINK_TIENNGAY_FACEBOOK);
                    break;
                case Languages.account.rate:
                    onLinkRate();
                    break;
                default:
                    break;
            }
        };
        return (
            <KeyValue
                title={title}
                noIndicator
                hasDashBottom={!hasDashBottom}
                rightIcon={<ArrowIC />}
                leftIcon={leftIcon}
                styleTitle={styles.txtAuthnFinger}
                onPress={onNavigateScreen}
                containerContent={styles.featureContainer}
            />
        );
    }, [callPhone, onLinkRate]);

    const onToggleBiometry = useCallback(
        (value) => {
            if (value)
                TouchID.isSupported(configTouchId)
                    .then(() => {
                        console.log('dd');
                        popupConfirm.current?.show();
                    })
                    .catch((error) => {
                        console.log(error);
                        let message;
                        if (isIOS) {
                            if (supportedBiometry === ENUM_BIOMETRIC_TYPE.FACE_ID) {
                                message = messageError(ERROR_BIOMETRIC.ErrorFaceId);
                            }
                            if (
                                supportedBiometry === ENUM_BIOMETRIC_TYPE.TOUCH_ID &&
                                !message
                            ) {
                                message = messageError(ERROR_BIOMETRIC.LAErrorTouchIDLockout);
                            } else {
                                message = messageError(ERROR_BIOMETRIC.NOT_ENROLLED);
                            }
                        } else {
                            message = messageError(error.code);
                        }
                        setErrorText(message || '');
                        popupError.current?.show();
                    });
            else {
                StorageUtils.clearDataOfKey(StorageKeys.KEY_ENABLE_FAST_AUTHENTICATION);
                setIsEnabledSwitch(false);
            }
        },
        [supportedBiometry]
    );

    const onConfirm = useCallback(() => {
        if (isIOS) {
            popupConfirm?.current?.hide?.();
            PasscodeAuth.authenticate(
                supportedBiometry === ENUM_BIOMETRIC_TYPE.FACE_ID
                    ? Languages.quickAuThen.useFaceID
                    : Languages.quickAuThen.useTouchID
            )
                .then(() => {
                    SessionManager.setEnableFastAuthentication(true);
                    setIsEnabledSwitch(true);
                })
                .catch(() => { });
        } else {
            popupConfirm?.current?.hide?.();
            bottomSheetModalRef.current?.present?.();
        }
    }, [supportedBiometry]);

    const onSetPinCodeSuccess = useCallback(
        (pin: string) => {
            bottomSheetModalRef.current?.close?.();
            SessionManager.setEnableFastAuthentication(true);
            StorageUtils.saveDataToKey(StorageKeys.KEY_PIN, pin);
            setIsEnabledSwitch(true);
            const message =
                supportedBiometry === ENUM_BIOMETRIC_TYPE.FACE_ID
                    ? Languages.quickAuThen.successAddFaceId
                    : Languages.quickAuThen.successAddTouchId;
            ToastUtils.showMsgToast(message);
        },
        [supportedBiometry]
    );

    const popupUpdatePassCode = useMemo(() => {
        return (
            <PopupConfirmBiometry
                ref={popupConfirm}
                type={supportedBiometry}
                onConfirm={onConfirm}
            />
        );
    }, [onConfirm, supportedBiometry]);

    const renderPopupError = useMemo(() => {

        return <PopupErrorBiometry
            typeSupportBiometry={supportedBiometry}
            ref={popupError}
        />;
    }, [supportedBiometry]);

    const renderAuthnFinger = useMemo(() => {
        if (supportedBiometry === ENUM_BIOMETRIC_TYPE.TOUCH_ID) {
            return (
                <KeyToggleValue
                    label={Languages.account.loginWithFinger}
                    isEnabledSwitch={isEnabledSwitch}
                    onToggleSwitch={onToggleBiometry}
                    hasDash
                    leftIcon={<FingerIC />}
                />
            );
        }
        if (supportedBiometry === ENUM_BIOMETRIC_TYPE.FACE_ID) {
            return (
                <KeyToggleValue
                    label={Languages.account.loginWithFaceId}
                    isEnabledSwitch={isEnabledSwitch}
                    onToggleSwitch={onToggleBiometry}
                    hasDash
                    leftIcon={<FaceIdIC width={Configs.IconSize.size18} height={Configs.IconSize.size18} />}
                />
            );
        }
        return null;

    }, [isEnabledSwitch, onToggleBiometry, supportedBiometry]);

    const renderAccuracy = useMemo(() => {
        switch (userManager.userInfo?.tinh_trang?.status) {
            case STATE_VERIFY_ACC.VERIFIED:
                return (
                    <View style={styles.accuracyWrap}>
                        <Text style={styles.txtAccuracy}>{Languages.account.accVerified}</Text>
                    </View>
                );
            case STATE_VERIFY_ACC.NO_VERIFIED:
                return (
                    <View style={styles.notAccuracyWrap}>
                        <Text style={styles.txtNotAccuracy}>{Languages.account.accuracyNow}</Text>
                    </View>
                );
            case STATE_VERIFY_ACC.WAIT:
                return (
                    <View style={styles.waitAccuracyWrap}>
                        <Text style={styles.txtWaitAccuracy}>{Languages.account.waitVerify}</Text>
                    </View>
                );
            default:
                return (
                    <View style={styles.notAccuracyWrap}>
                        <Text style={styles.txtNotAccuracy}>{Languages.account.accuracyNow}</Text>
                    </View>
                );
        }
    }, [userManager.userInfo?.tinh_trang?.status]);
    const renderPinCode = useMemo(() => {
        return (
            <BottomSheetModal
                ref={bottomSheetModalRef}
                index={1}
                snapPoints={['20%', '82%']}
                keyboardBehavior={'interactive'}
                enablePanDownToClose={true}
                backdropComponent={CustomBackdropBottomSheet}
                animationConfigs={animationConfigs}
                style={{ backgroundColor: COLORS.TRANSPARENT }}
            >
                <View style={styles.wrapPin}>
                    <PinCode
                        mode={PinCodeT.Modes.Set}
                        visible={true}
                        options={{
                            pinLength: 4,
                            maxAttempt: 4,
                            lockDuration: 10000,
                            disableLock: false
                        }}
                        mainStyle={customStyles.main}
                        textOptions={customTexts}
                        titleStyle={customStyles.title}
                        buttonsStyle={customStyles.buttons}
                        subTitleStyle={customStyles.subTitle}
                        buttonTextStyle={customStyles.buttonText}
                        pinContainerStyle={customStyles.pinContainer}
                        onSetSuccess={onSetPinCodeSuccess}
                    />
                </View>
            </BottomSheetModal>
        );
    }, [animationConfigs, onSetPinCodeSuccess]);

    return (
        <View style={styles.container}>
            <HeaderBar title={Languages.account.title} isLight={false} />
            <ScrollView style={styles.contentContainer} showsVerticalScrollIndicator={false}>
                <Touchable style={styles.accContainer} onPress={onNavigateAccInfo}>
                    {!userManager.userInfo?.avatar_user ?
                        <AvatarIC style={styles.circleWrap} />
                        :
                        <FastImage
                            style={styles.circleWrap}
                            source={{
                                uri: userManager.userInfo?.avatar_user
                            }}
                            resizeMode={FastImage.resizeMode.cover}
                        />
                    }
                    <View style={styles.headerAccRight}>
                        <Text style={styles.headerAccName}>{userManager.userInfo?.full_name || ''}</Text>
                        <Text style={styles.headerAccPhone}>{userManager.userInfo?.phone_number || ''}</Text>
                        {renderAccuracy}
                    </View>
                    <ArrowIC />
                </Touchable>
                {renderKeyValue(Languages.account.payMethod, <PayMethodIC />, true)}
                <View style={styles.containerFeature}>
                    {renderKeyValue(Languages.account.changePwd, <ChangePwdIC />)}
                    {renderAuthnFinger}
                    {renderKeyValue(Languages.account.accountLink, <LinkAccIC />, true)}
                </View>
                <View style={styles.containerFeature}>
                    {renderKeyValue(Languages.account.policy, <PolicyIC />)}
                    {renderKeyValue(Languages.account.shareFriends, <ShareIC />)}
                    {renderKeyValue(Languages.account.web, <WebIC />)}
                    {renderKeyValue(Languages.account.facebook, <FacebookIC />)}
                    {renderKeyValue(Languages.account.useManual, <ManualIC />)}
                    {renderKeyValue(Languages.account.answer, <AnswerIC />)}
                    {renderKeyValue(Languages.account.hotline, <PhoneIC />)}
                    {renderKeyValue(Languages.account.rate, <StarIC />, true)}
                </View>
                <Button label={`${Languages.account.logout}`}
                    style={styles.wrapBtn}
                    buttonStyle={BUTTON_STYLES.GRAY_RED}
                    onPress={onPopupLogout}
                    isLowerCase
                />
            </ScrollView>
            {popupUpdatePassCode}
            {renderPopupError}
            {renderPinCode}
            {renderPopupLogout(popupLogout)}
        </View>
    );
});
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.GRAY_5
    },
    contentContainer: {
        marginHorizontal: 16
    },
    containerFeature: {
        borderWidth: 1,
        borderColor: COLORS.GRAY_13,
        backgroundColor: COLORS.WHITE,
        borderRadius: 16,
        marginTop: 16,
        paddingVertical: 2
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderWidth: 1,
        borderColor: COLORS.GRAY_13,
        backgroundColor: COLORS.WHITE,
        borderRadius: 16,
        marginVertical: 12,
        paddingVertical: 12,
        paddingHorizontal: 16,
        marginHorizontal: 16,
        alignItems: 'center'
    },
    accContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderWidth: 1,
        borderColor: COLORS.GRAY_13,
        backgroundColor: COLORS.WHITE,
        borderRadius: 16,
        paddingVertical: 12,
        paddingHorizontal: 16,
        alignItems: 'center',
        marginVertical: 16
    },
    leftText: {
        ...Styles.typography.regular,
        color: COLORS.GRAY_12
    },
    contentText: {
        ...Styles.typography.medium,
        color: COLORS.GRAY_7
    },
    dash: {
        paddingBottom: 10
    },
    stylePayMethodContainer: {
        paddingVertical: 10,
        marginTop: 16
    },
    headerAccRight: {
        justifyContent: 'space-around'
    },
    notAccuracyWrap: {
        backgroundColor: COLORS.PINK,
        borderRadius: 70,
        alignItems: 'center',
        marginTop: 5,
        paddingVertical: 4
    },
    waitAccuracyWrap: {
        backgroundColor: COLORS.YELLOW_3,
        borderRadius: 70,
        alignItems: 'center',
        marginTop: 5,
        paddingVertical: 4
    },
    accuracyWrap: {
        backgroundColor: COLORS.WHITE_GREEN,
        borderRadius: 70,
        alignItems: 'center',
        marginTop: 5,
        paddingVertical: 4
    },
    circleWrap: {
        width: SCREEN_WIDTH * 0.2 - 10,
        height: SCREEN_WIDTH * 0.2 - 10,
        borderRadius: 70,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: COLORS.GREEN
    },
    headerAccName: {
        ...Styles.typography.medium,
        color: COLORS.GREEN,
        fontSize: Configs.FontSize.size16
    },
    headerAccPhone: {
        ...Styles.typography.regular,
        color: COLORS.GRAY_7,
        fontSize: Configs.FontSize.size12
    },
    txtNotAccuracy: {
        ...Styles.typography.medium,
        color: COLORS.RED_2,
        fontSize: Configs.FontSize.size12,
        paddingHorizontal: 60
    },
    txtWaitAccuracy: {
        ...Styles.typography.medium,
        color: COLORS.YELLOW_2,
        fontSize: Configs.FontSize.size12,
        textAlign: 'center',
        paddingHorizontal: 16
    },
    txtAccuracy: {
        ...Styles.typography.medium,
        color: COLORS.GREEN,
        fontSize: Configs.FontSize.size12,
        paddingHorizontal: 40
    },
    wrapBtn: {
        marginVertical: 15,
        width: SCREEN_WIDTH - 32,
        height: SCREEN_HEIGHT * 0.1 - 40
    },
    txtAuthnFinger: {
        ...Styles.typography.regular,
        color: COLORS.GRAY_7,
        paddingVertical: 7
    },
    featureContainer: {
        flex: 1,
        marginLeft: 16
    },
    wrapPin: {
        flex: 1
    },
    containerAllBtnPopup:{
        flexDirection: 'row-reverse'
    },
    containerItemBtnPopup:{
        backgroundColor: COLORS.RED_2,
        borderColor : COLORS.RED_2,
        borderRadius: 20
    },
    containerCancelBtnPopup:{
        borderColor : COLORS.GRAY_13,
        borderRadius: 20
    },
    textCancel:{
        color: COLORS.GRAY_12
    }
});
const customStyles = StyleSheet.create({
    main: {
        marginTop: 20,
        paddingHorizontal: 20,
        backgroundColor: COLORS.TRANSPARENT
    },

    title: {
        fontSize: Configs.FontSize.size16,
        fontFamily: Configs.FontFamily.medium,
        color: COLORS.GREEN
    },
    subTitle: {
        color: COLORS.BLACK
    },
    buttonText: {
        color: COLORS.GREEN,
        fontSize: Configs.FontSize.size32,
        fontFamily: Configs.FontFamily.medium
    },
    buttons: {
        backgroundColor: COLORS.WHITE,
        borderWidth: 1.5,
        marginHorizontal: 15,
        borderColor: COLORS.GREEN,
        width: 65,
        height: 65,
        borderRadius: 35
    },
    pinContainer: {
        height: 30,
        justifyContent: 'center',
        marginBottom: 10
    }
});
export default Profile;
