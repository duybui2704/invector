import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Modal from 'react-native-modal';
import OtpInputs from 'react-native-otp-inputs';

import IcClose from '@/assets/image/invest/ic_close.svg';
import LogoOtpInvest from '@/assets/image/invest/logo_otp_invest.svg';
import { Configs } from '@/common/Configs';
import Languages from '@/common/Languages';
import { useAppStore } from '@/hooks';
import { PopupActionTypes, PopupPropsTypes } from '@/models/typesPopup';
import { COLORS } from '@/theme/colors';
import { Styles } from '@/theme/styles';
import { SCREEN_WIDTH } from '@/utils/DimensionUtils';
import { Touchable } from '../elements/touchable';
import Utils from '@/utils/Utils';
import { MyTextInput } from '../elements/textfield';
import arrayIcon from '@/common/arrayIcon';
import FormValidate from '@/utils/FormValidate';
import { TextFieldActions } from '../elements/textfield/types';

interface PopupOTPProps extends PopupPropsTypes {
    getOTPcode?: (phone: string) => any,
    onPressConfirm?: (otp: string) => any
}

export const PopupInvestOTP = forwardRef<
    PopupActionTypes,
    PopupOTPProps
>(({ getOTPcode, onPressConfirm }: PopupOTPProps, ref) => {
    const { common } = useAppStore();
    const [visible, setVisible] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const refPhone = useRef<TextFieldActions>();
    const [startCount, setStartCount] = useState<boolean>(true);
    const [timer, setTimer] = useState<number>(0);
    const [pin, setPin] = useState<string>('');
    const [errMsg, setErrMsg] = useState<string>('');
    const [phone, setPhone] = useState<string>('');
    const intervalRef = useRef<any>();

    useEffect(() => {
        intervalRef.current = setInterval(() => {
            setTimer((t) => t - 1);
        }, 1000);
        if (timer <= 0) {
            clearInterval(intervalRef.current);
            setStartCount(false);
        }
        return () => {
            clearInterval(intervalRef.current);
            setStartCount(true);
        };
    }, [timer]);

    const _onCancel = useCallback(() => {
        setLoading(false);
        setStartCount(true);
        setTimer(0);
        setPin('');
    }, []);

    const show = useCallback(() => {
        setPhone('');
        setVisible(true);
        setTimer(120);
    }, []);

    const hide = useCallback(() => {
        setVisible(false);
        _onCancel();
    }, [_onCancel]);

    useImperativeHandle(ref, () => ({
        show,
        hide
    }));

    useEffect(() => {
        if (pin.toString().length === 6) {
            onPressConfirm(pin);
        }
    }, [pin]);

    const onValidate = useCallback(() => {
        const errMsgPhone = FormValidate.passConFirmPhone(phone);
        refPhone.current?.setErrorMsg(errMsgPhone);
        if (`${errMsgPhone}`.length === 0) {
            return true;
        }
        return false;
    }, [phone]);

    const onConfirm = useCallback(async () => {
        if (onValidate()) {
            await getOTPcode?.(phone);
            setStartCount(true);
            setTimer(120);
        }
    }, [getOTPcode, hide, onValidate, phone]);

    const onChangeText = useCallback((value: string) => {
        setPhone(value);
    }, [phone]);

    const onChangeCode = useCallback((code: string) => {
        setPin(code);
        setErrMsg('');
    }, []);

    const onResend = useCallback(async () => {
        await getOTPcode?.(phone);
        setStartCount(true);
        setTimer(120);
    }, [getOTPcode, phone]);

    const renderBtConfirm = useMemo(() => {
        return (
            <Touchable onPress={onConfirm} style={styles.btConfirm}>
                <Text style={[styles.txtBt, { color: COLORS.WHITE }]}>{Languages.confirmPhone.sendOTP}</Text>
            </Touchable>
        );
    }, [loading, onConfirm]);

    const renderResend = useMemo(() => {
        if (startCount) {
            return (
                <View style={styles.btResend}>
                    <Text style={styles.txtBt}>{`${Utils.convertSecondToMinutes(timer)}s`}</Text>
                </View>
            );
        }
        return (
            <Touchable onPress={onResend} style={styles.btResendActive}>
                <Text style={styles.txtBt}>{Languages.otp.resentCode.toUpperCase()}</Text>
            </Touchable>
        );
    }, [onResend, startCount, timer]);

    return (
        <Modal
            isVisible={visible}
            animationIn="slideInUp"
            useNativeDriver={true}
            avoidKeyboard={true}
            hideModalContentWhileAnimating
        >
            <View style={styles.container}>
                <View style={styles.tobModal}>
                    <Touchable onPress={hide} style={styles.ic_close}>
                        <IcClose width={20} height={20} />
                    </Touchable>
                    <LogoOtpInvest width={200} />
                    <Text style={styles.title}>{!common.successGetOTP ? Languages.otp.accuracyPhone : Languages.otp.title}</Text>
                    <Text style={styles.txt}>{!common.successGetOTP ? Languages.otp.completionPhoneLogin : Languages.otp.completionOtpLogin}</Text>
                    {!common.successGetOTP ?
                        <>
                            <MyTextInput
                                ref={refPhone}
                                value={phone}
                                isPhoneNumber={true}
                                maxLength={10}
                                rightIcon={arrayIcon.login.phone}
                                placeHolder={Languages.auth.txtPhone}
                                containerInput={styles.inputPhone}
                                onChangeText={onChangeText}
                                keyboardType={'NUMBER'}
                            />
                            {renderBtConfirm}
                        </>
                        :
                        <>
                            <View style={styles.boxOtp}>
                                <OtpInputs
                                    handleChange={onChangeCode}
                                    numberOfInputs={6}
                                    style={styles.wrapOTP}
                                    inputStyles={styles.viewOtp}
                                    focusStyles={styles.focusStyle}
                                />
                            </View>
                            {!!errMsg && <Text style={styles.errTxt}>{errMsg}</Text>}
                            <View>
                                {renderResend}
                            </View>
                        </>
                    }
                </View>
            </View>
        </Modal>
    );
});
const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.TRANSPARENT,
        borderColor: COLORS.TRANSPARENT,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        ...Styles.typography.bold,
        fontSize: Configs.FontSize.size16,
        marginTop: 20,
        color: COLORS.GRAY_7
    },
    txt: {
        ...Styles.typography.regular,
        fontSize: Configs.FontSize.size14,
        color: COLORS.GRAY_12,
        marginHorizontal: 16,
        textAlign: 'center',
        padding: 10

    },
    inputOtp: {
        ...Styles.typography.regular,
        color: COLORS.GRAY_7,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        fontSize: Configs.FontSize.size16
    },
    viewOtp: {
        ...Styles.typography.medium,
        width: (SCREEN_WIDTH - 64 - 5 * 5) / 6,
        height: (SCREEN_WIDTH - 64 - 5 * 5) / 6,
        marginVertical: 10,
        marginHorizontal: 2,
        borderWidth: 1,
        borderRadius: ((SCREEN_WIDTH - 64 - 5 * 5) / 6) / 2,
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: ((SCREEN_WIDTH - 64 - 5 * 5) / 6) / 2 - 4,
        borderColor: COLORS.GRAY_6,
        color: COLORS.BLACK,
        fontSize: Configs.FontSize.size18
    },
    focusStyle: {

    },
    boxOtp: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: SCREEN_WIDTH * 0.01,
        marginBottom: SCREEN_WIDTH * 0.01
    },
    inputPhone: {
        marginTop: 10,
        borderRadius: 30,
        paddingVertical: 10,
        width: SCREEN_WIDTH * 0.7,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    tobModal: {
        backgroundColor: COLORS.WHITE,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 16

    },
    underlineStyleBase: {
        width: SCREEN_WIDTH * 0.13,
        height: SCREEN_WIDTH * 0.13,
        borderWidth: 1,
        borderColor: COLORS.GRAY_4,
        color: COLORS.BLACK,
        fontSize: Configs.FontSize.size20,
        borderRadius: SCREEN_WIDTH * 0.07,
        justifyContent: 'center'
    },
    wrapOTP: {
        backgroundColor: COLORS.WHITE,
        height: SCREEN_WIDTH * 0.14,
        paddingHorizontal: 10,
        flexDirection: 'row',
        marginBottom: 10
    },
    btConfirm: {
        paddingVertical: 10,
        backgroundColor: COLORS.GREEN,
        borderRadius: 30,
        width: SCREEN_WIDTH * 0.7,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
        marginTop: 20
    },
    btResend: {
        paddingVertical: 16,
        backgroundColor: COLORS.WHITE,
        borderRadius: 40,
        width: 240,
        alignItems: 'center'
    },
    btResendActive: {
        paddingVertical: 16,
        backgroundColor: COLORS.WHITE,
        borderRadius: 40,
        width: 240,
        alignItems: 'center'
    },
    txtBt: {
        ...Styles.typography.medium,
        color: COLORS.RED_2
    },
    ic_close: {
        position: 'absolute',
        right: 16,
        top: 16
    },
    errTxt: {
        ...Styles.typography.regular,
        color: COLORS.RED
    }
});
