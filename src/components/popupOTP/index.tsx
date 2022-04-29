import React, {forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState} from 'react';
import { Text, View } from 'react-native';
import Modal from 'react-native-modal';

import { MyStylesOtpInvest } from '@/components/popupOTP/styles';
import LogoOtpInvest from '@/assets/image/invest/logo_otp_invest.svg';
import Languages from '@/common/Languages';
import { TextFieldActions } from '@/components/elements/textfield/types';
import { MyTextInput } from '@/components/elements/textfield';
import Validate from '@/utils/Validate';
import { PopupActions, PopupProps } from '@/components/popupInvest/types';

export const PopupInvestOTP = forwardRef<PopupActions, PopupProps>(
    ({
        onConfirm,
        onClose,
        title,
        description,
        data
    }: PopupProps, ref) => {
        const styles = MyStylesOtpInvest();
        const [otp1, setOtp1] = useState<string>('');
        const [otp2, setOtp2] = useState<string>('');
        const [otp3, setOtp3] = useState<string>('');
        const [otp4, setOtp4] = useState<string>('');
        const [otp5, setOtp5] = useState<string>('');
        const [otp6, setOtp6] = useState<string>('');
        const otp1Ref = useRef<TextFieldActions>();
        const otp2Ref = useRef<TextFieldActions>();
        const otp3Ref = useRef<TextFieldActions>();
        const otp4Ref = useRef<TextFieldActions>();
        const otp5Ref = useRef<TextFieldActions>();
        const otp6Ref = useRef<TextFieldActions>();

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

        const textInputChange = useCallback((text: string, ref: any) => {
            const value = Validate.stringIsNumberOnly(text) ? text.trim() : '';
            if (value !== '') {
                ref.current.focus();
            }
        }, []);

        const onChangeText = useCallback((value: string, tag?: string) => {
            switch (tag) {
                case Languages.otp.otp1:
                    setOtp1(value);
                    textInputChange(value, otp2Ref);
                    break;
                case Languages.otp.otp2:
                    setOtp2(value);
                    textInputChange(value, otp3Ref);
                    break;
                case Languages.otp.otp3:
                    setOtp3(value);
                    textInputChange(value, otp4Ref);
                    break;
                case Languages.otp.otp4:
                    setOtp4(value);
                    textInputChange(value, otp5Ref);
                    break;
                case Languages.otp.otp5:
                    setOtp5(value);
                    textInputChange(value, otp6Ref);
                    break;
                case Languages.otp.otp6:
                    setOtp6(value);
                    break;
                default:
                    break;
            }
            if (otp1 !== '' && otp2 !== '' && otp3 !== '' && otp4 !== '' && otp5 !== '' && otp6 !== '') {
                onPressOtp();
            }
        }, [textInputChange, otp1, otp2, otp3, otp4, otp5, otp6]);

        const onChangeInputOneKeyPress = useCallback((keyPress?: any) => {
            const key = keyPress.nativeEvent.key;
            if (key === 'Backspace') {
                otp1Ref.current?.focus();
            }
        }, []);

        const onChangeInputThreeKeyPress = useCallback((keyPress?: any) => {
            const key = keyPress.nativeEvent.key;
            if (key === 'Backspace') {
                otp3Ref.current?.focus();
            }
        }, []);

        const onChangeInputTwoKeyPress = useCallback((keyPress?: any) => {
            const key = keyPress.nativeEvent.key;
            if (key === 'Backspace') {
                otp2Ref.current?.focus();
            }
        }, []);

        const onChangeInputFourKeyPress = useCallback((keyPress?: any) => {
            const key = keyPress.nativeEvent.key;
            if (key === 'Backspace') {
                otp4Ref.current?.focus();
            }
        }, []);

        const onChangeInputFiveKeyPress = useCallback((keyPress?: any) => {
            const key = keyPress.nativeEvent.key;
            if (key === 'Backspace') {
                otp5Ref.current?.focus();
            }
        }, []);

        const onChangeInputSixKeyPress = useCallback((keyPress?: any) => {
            const key = keyPress.nativeEvent.key;
            if (key === 'Backspace') {
                otp6Ref.current?.focus();
            }
        }, []);

        const onPressOtp = useCallback(() => {
            hide();
            // console.log('onPressOtp');
            // Navigator.replaceScreen(ScreenName.investment);
        }, []);

        const renderInput =
        (
            ref: any,
            testId: string,
            value: string,
            onKeyPress?: any,
            disabled?: any
        ) => {
            return (
                <MyTextInput
                    ref={ref}
                    isPhoneNumber
                    inputStyle={styles.inputOtp}
                    value={value}
                    containerInput={styles.viewOtp}
                    keyboardType={'NUMBER'}
                    onChangeText={onChangeText}
                    maxLength={1}
                    testID={testId}
                    autoFocus={disabled}
                    onKeyPress={onKeyPress}
                />
            );
        };
        return (
            <Modal
                isVisible={visible}
                animationIn="slideInUp"
                useNativeDriver={true}
                onBackdropPress={hide}
                avoidKeyboard={true}
                hideModalContentWhileAnimating
            >
                <View style={styles.container}>
                    <View style={styles.tobModal}>
                        <LogoOtpInvest width={200} />
                        <Text style={styles.title}>{Languages.otp.title}</Text>
                        <Text style={styles.txt}>{Languages.otp.completionOtp}</Text>
                        <View style={styles.boxOtp}>
                            {renderInput(
                                otp1Ref,
                                Languages.otp.otp1,
                                otp1,
                                onChangeInputOneKeyPress
                            )}
                            {renderInput(
                                otp2Ref,
                                Languages.otp.otp2,
                                otp2,
                                onChangeInputTwoKeyPress
                            )}
                            {renderInput(
                                otp3Ref,
                                Languages.otp.otp3,
                                otp3,
                                onChangeInputThreeKeyPress
                            )}
                            {renderInput(
                                otp4Ref,
                                Languages.otp.otp4,
                                otp4,
                                onChangeInputFourKeyPress
                            )}
                            {renderInput(
                                otp5Ref,
                                Languages.otp.otp5,
                                otp5,
                                onChangeInputFiveKeyPress
                            )}
                            {renderInput(
                                otp6Ref,
                                Languages.otp.otp6,
                                otp6,
                                onChangeInputSixKeyPress
                            )}
                        </View>
                    </View>
                </View>
            </Modal>
        );
    });
