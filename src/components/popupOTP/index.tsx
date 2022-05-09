import OTPInputView from '@twotalltotems/react-native-otp-input';
import React, { forwardRef, useCallback, useImperativeHandle, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Modal from 'react-native-modal';

import LogoOtpInvest from '@/assets/image/invest/logo_otp_invest.svg';
import { Configs } from '@/common/Configs';
import Languages from '@/common/Languages';
import { PopupActionTypes, PopupPropsTypes } from '@/models/typesPopup';
import { COLORS } from '@/theme/colors';
import { Styles } from '@/theme/styles';
import DimensionUtils from '@/utils/DimensionUtils';
import { Touchable } from '../elements/touchable';


interface PopupOTPProps extends PopupPropsTypes {
    onSendOTP?: () => any;
}


export const PopupInvestOTP = forwardRef<
    PopupActionTypes,
    PopupOTPProps
>(({ onClose, onSendOTP }: PopupOTPProps, ref) => {


    const [visible, setVisible] = useState<boolean>(false);

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

    const onPressOtp = useCallback(() => {

    }, []);

    const onChangeCode = useCallback((code: string) => {
        if (code.toString().length === 6) {
            hide();
            onSendOTP?.();
        }
    }, [hide, onSendOTP]);

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
                        <OTPInputView
                            pinCount={6}
                            autoFocusOnLoad
                            editable={true}
                            codeInputFieldStyle={styles.underlineStyleBase}
                            style={styles.wrapOTP}
                            onCodeChanged={onChangeCode}
                        />
                    </View>
                    <View>
                        <Touchable style={styles.btConfirm}>
                            <Text style={styles.txtBt}>{Languages.otp.keyOtp}</Text>
                        </Touchable>
                        <Touchable style={styles.btResend}>
                            <Text style={styles.txtBt}>{Languages.otp.resentCode} sau 2:00</Text>
                        </Touchable>
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
        width: DimensionUtils.SCREEN_WIDTH * 0.14,
        height: DimensionUtils.SCREEN_WIDTH * 0.14,
        marginVertical: 10,
        marginHorizontal: 2,
        borderWidth: 1,
        borderRadius: DimensionUtils.SCREEN_WIDTH * 0.07,
        justifyContent: 'center',
        alignItems: 'center'
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
        width: '100%',
        paddingHorizontal: 10
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
