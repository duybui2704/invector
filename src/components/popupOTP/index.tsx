import OtpInputs from 'react-native-otp-inputs';
import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View, ViewStyle } from 'react-native';
import Modal from 'react-native-modal';

import LogoOtpInvest from '@/assets/image/invest/logo_otp_invest.svg';
import { Configs } from '@/common/Configs';
import Languages from '@/common/Languages';
import { PopupActionTypes, PopupPropsTypes } from '@/models/typesPopup';
import { COLORS } from '@/theme/colors';
import { Styles } from '@/theme/styles';
import DimensionUtils from '@/utils/DimensionUtils';
import { Touchable } from '../elements/touchable';
import { useAppStore } from '@/hooks';


interface PopupOTPProps extends PopupPropsTypes {
    onConfirmOTP?: (text: string) => any;
    getOTPcode?: () => any
}

const second = 120;

export const PopupInvestOTP = forwardRef<
    PopupActionTypes,
    PopupOTPProps
>(({ onConfirmOTP: onSendOTP, getOTPcode }: PopupOTPProps, ref) => {

    const [visible, setVisible] = useState<boolean>(false);
    const [activeButton, setActiveButton] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    const [startCount, setStartCount] = useState<boolean>(false);
    const [timer, setTimer] = useState<number>(120);
    const [pin, setPin] = useState<string>('');
    const intervalRef = useRef<any>();
    console.log('t',timer);

    useEffect(() => {

        intervalRef.current = setTimeout(() => {
            setTimer((t) => t - 1);
        }, 1000);
    
    }, [timer]);

    const show = useCallback(() => {
        setVisible(true);
    }, []);

    const hide = useCallback(() => {
        setVisible(false);
    }, []);

    useImperativeHandle(ref, () => ({
        show,
        hide
    }));

    const onConfirm = useCallback(async () => {
        setLoading(true);
        const result = await onSendOTP?.(pin);
        setLoading(false);
        if (result) setStartCount(true);
    }, [onSendOTP, pin]);

    const onChangeCode = useCallback((code: string) => {
        setPin(code);
    }, []);

    const onResend = useCallback(()=>{
        
    },[]);

    const renderBtConfirm = useMemo(() => {
        if (!loading) {
            return (
                <Touchable onPress={onConfirm} style={styles.btConfirm}>
                    <Text style={styles.txtBt}>{Languages.otp.keyOtp}</Text>
                </Touchable>
            );
        }
        return (
            <View style={styles.btConfirm}>
                <ActivityIndicator size="small" color={COLORS.WHITE} />
            </View>
        );
    }, [loading, onConfirm]);

    const renderResend = useMemo(() => {
        return(
            <Touchable onPress={onResend} style={styles.btResend}>
                <Text style={styles.txtBt}>{`${Languages.otp.resentCode} sau ${timer}s`}</Text>
            </Touchable>
        );
    }, [onResend, timer]);

    return (
        <Modal
            isVisible={visible}
            animationIn="slideInUp"
            useNativeDriver={true}
            onBackdropPress={hide}
            avoidKeyboard={true}
            hideModalContentWhileAnimating
            hasBackdrop
        >
            <View style={styles.container}>
                <View style={styles.tobModal}>
                    <LogoOtpInvest width={200} />
                    <Text style={styles.title}>{Languages.otp.title}</Text>
                    <Text style={styles.txt}>{Languages.otp.completionOtp}</Text>

                    <View style={styles.boxOtp}>
                        <OtpInputs
                            handleChange={onChangeCode}
                            numberOfInputs={6}
                            style={styles.wrapOTP}
                            inputStyles={styles.viewOtp}
                            focusStyles={styles.focusStyle}
                        />
                    </View>
                    <View>
                        {renderBtConfirm}
                        {renderResend}
                    </View>
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
        color: COLORS.GRAY_7,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        fontSize: Configs.FontSize.size16
    },
    viewOtp: {
        ...Styles.typography.medium,
        width: (DimensionUtils.SCREEN_WIDTH - 64 - 5 * 5) / 6,
        height: (DimensionUtils.SCREEN_WIDTH - 64 - 5 * 5) / 6,
        marginVertical: 10,
        marginHorizontal: 2,
        borderWidth: 1,
        borderRadius: ((DimensionUtils.SCREEN_WIDTH - 64 - 5 * 5) / 6) / 2,
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: ((DimensionUtils.SCREEN_WIDTH - 64 - 5 * 5) / 6) / 2 - 4,
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
        marginTop: DimensionUtils.SCREEN_WIDTH * 0.01,
        marginBottom: DimensionUtils.SCREEN_WIDTH * 0.01
    },
    tobModal: {
        backgroundColor: COLORS.WHITE,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 16

    },
    underlineStyleBase: {
        width: DimensionUtils.SCREEN_WIDTH * 0.13,
        height: DimensionUtils.SCREEN_WIDTH * 0.13,
        borderWidth: 1,
        borderColor: COLORS.GRAY_4,
        color: COLORS.BLACK,
        fontSize: Configs.FontSize.size20,
        borderRadius: DimensionUtils.SCREEN_WIDTH * 0.07,
        justifyContent: 'center'
    },
    wrapOTP: {
        backgroundColor: COLORS.WHITE,
        height: DimensionUtils.SCREEN_WIDTH * 0.14,
        paddingHorizontal: 10,
        flexDirection: 'row'
    },
    btConfirm: {
        paddingVertical: 16,
        backgroundColor: COLORS.GREEN,
        borderRadius: 40,
        width: 240,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
        marginTop: 20
    },
    btResend: {
        paddingVertical: 16,
        backgroundColor: COLORS.GRAY_6,
        borderRadius: 40,
        width: 240,
        alignItems: 'center'
    },
    txtBt: {
        ...Styles.typography.medium,
        color: COLORS.WHITE
    }
});
