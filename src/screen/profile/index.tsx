import React, { useMemo, useCallback, useState, useRef } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { observer } from 'mobx-react';
import { ScrollView } from 'react-native-gesture-handler';
import { BottomSheetModal, SCREEN_HEIGHT, SCREEN_WIDTH, useBottomSheetTimingConfigs } from '@gorhom/bottom-sheet';
import FastImage from 'react-native-fast-image';

import ChangePwdIC from '@/assets/image/ic_change_pwd.svg';
import FaceIdIC from '@/assets/image/ic_faceid_big.svg';
import StarIC from '@/assets/image/ic_arrow_right.svg';
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
import ArrowIC from '@/assets/image/ic_under_arrow.svg';
import KeyValue from '@/components/KeyValue';
import HeaderBar from '@/components/header';
import { COLORS, Styles } from '@/theme';
import { Touchable } from '@/components/elements/touchable';
import { dataUser } from '@/mocks/data';
import Navigator from '@/routers/Navigator';
import { Configs } from '@/common/Configs';
import { Button } from '@/components/elements/button';
import { BUTTON_STYLES } from '@/components/elements/button/constants';
import { ScreenName } from '@/common/screenNames';
import Languages from '@/common/Languages';
import { useAppStore } from '@/hooks';
import SessionManager from '@/manager/SessionManager';
import KeyToggleValue from '@/components/KeyToggleSwitch';
import { ENUM_BIOMETRIC_TYPE } from '@/common/constants';
import PopupConfirmBiometry from '@/components/PopupConfirmBiometry';
import { PopupActionTypes } from '@/models/typesPopup';
import PopupErrorBiometry from '@/components/PopupErrorBiometry';
import { PinCode, PinCodeT } from '@/components/pinCode';
import { CustomBackdropBottomSheet } from '@/components/CustomBottomSheet';

const customTexts = {
    set: Languages.setPassCode
};
const Profile = observer(() => {
    const { userManager, fastAuthInfoManager } = useAppStore();
    const { supportedBiometry } = fastAuthInfoManager;
    const popupError = useRef<PopupActionTypes>(null);
    const [isEnabledSwitch, setIsEnabledSwitch] = useState(false);
    const popupConfirm = useRef<PopupActionTypes>(null);
    const bottomSheetModalRef = useRef<BottomSheetModal>(null);
    const animationConfigs = useBottomSheetTimingConfigs({
        duration: 800
    });

    const onNavigate = useCallback((title: string) => {
        switch (title) {
            case Languages.account.accountLink:
                return Navigator.pushScreen(ScreenName.transaction);
            case Languages.account.changePwd:
                return Navigator.pushScreen(ScreenName.transaction);
            default:
                return null;
        }
    }, []);

    const onLogout = useCallback(() => {
        SessionManager.logout();
        userManager.updateUserInfo(null);
        Navigator.navigateScreen(ScreenName.home);
    }, [userManager]);

    const toggleSwitch = useCallback(() => {
        setIsEnabledSwitch(!isEnabledSwitch);
    }, [isEnabledSwitch]);

    const renderKeyValue = useCallback((title: string, leftIcon: any, hasDashBottom?: boolean) => {
        return (
            <KeyValue
                title={title}
                noIndicator
                hasDashBottom={!hasDashBottom}
                rightIcon={<ArrowIC />}
                leftIcon={leftIcon}
                styleTitle={styles.txtAuthnFinger}
                onPress={onNavigate}
                containerContent={styles.featureContainer}
            />
        );
    }, [onNavigate]);

    const popupUpdatePassCode = useMemo(() => {
        return (
            <PopupConfirmBiometry
                ref={popupConfirm}
                type={supportedBiometry}
            // onConfirm={onConfirm}
            />
        );
    }, [supportedBiometry]);

    const renderPopupError = useMemo(() => {
        return <PopupErrorBiometry title={'Loi'} ref={popupError} />;
    }, []);

    const renderAuthnFinger = useMemo(() => {
        if (supportedBiometry === ENUM_BIOMETRIC_TYPE.TOUCH_ID) {
            return (
                <KeyToggleValue
                    label={Languages.account.loginWithFinger}
                    isEnabledSwitch={isEnabledSwitch}
                    onToggleSwitch={toggleSwitch}
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
                    onToggleSwitch={toggleSwitch}
                    hasDash
                    leftIcon={<FaceIdIC width={Configs.IconSize.size18} height={Configs.IconSize.size18} />}
                />
            );
        }
        return null;

    }, [isEnabledSwitch, supportedBiometry, toggleSwitch]);

    const renderAccuracy = useMemo(() => {
        switch (dataUser?.accuracy) {
            case 1:
                return (
                    <Touchable style={styles.accuracyWrap}>
                        <Text style={styles.txtAccuracy}>{Languages.account.accVerified}</Text>
                    </Touchable>
                );
            case 2:
                return (
                    <Touchable style={styles.notAccuracyWrap} disabled={true}>
                        <Text style={styles.txtNotAccuracy}>{Languages.account.accuracyNow}</Text>
                    </Touchable>
                );
            default:
                return (
                    <Touchable style={styles.notAccuracyWrap} disabled={true}>
                        <Text style={styles.txtNotAccuracy}>{Languages.account.accuracyNow}</Text>
                    </Touchable>
                );
        }
    }, []);
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
                    // onSetSuccess={onSetPinCodeSuccess}
                    />
                </View>
            </BottomSheetModal>
        );
    }, [animationConfigs]);

    return (
        <View style={styles.container}>
            <HeaderBar title={Languages.account.title} isLight={false} />
            <View style={styles.accContainer}>
                {!dataUser.avatar ?
                    <AvatarIC style={styles.circleWrap} />
                    :
                    <FastImage
                        style={styles.circleWrap}
                        source={{
                            uri: dataUser?.avatar
                        }}
                        resizeMode={FastImage.resizeMode.cover}
                    />
                }
                <View style={styles.headerAccRight}>
                    <Text style={styles.headerAccName}>{dataUser.name || ''}</Text>
                    <Text style={styles.headerAccPhone}>{dataUser.phone || ''}</Text>
                    {renderAccuracy}
                </View>
                <ArrowIC />
            </View>
            <ScrollView style={styles.contentContainer} showsVerticalScrollIndicator={false}>
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
                    onPress={onLogout}
                    isLowerCase
                />
            </ScrollView>
            {popupUpdatePassCode}
            {renderPopupError}
            {renderPinCode}
        </View>
    );
});
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.GRAY_2
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
        marginHorizontal: 16,
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
