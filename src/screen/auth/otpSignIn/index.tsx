import React, { useState, useRef, useCallback, useEffect } from 'react';
import {View, Text} from 'react-native';
import Validate from '@/utils/Validate';
import IcLine from '@/assets/image/auth/ic_line_auth.svg';
import {Touchable} from '@/components/elements/touchable';
import {useAppStore} from '@/hooks';
import {ActiveAccountSocialModel} from '@/models/auth';
import {MyStylesOtp} from '@/screen/auth/otpSignIn/styles';
import { TextFieldActions } from '@/components/elements/textfield/types';
import { COLORS } from '@/theme';
import { MyTextInput } from '@/components/elements/textfield';
import Languages from '@/common/Languages';
import Navigator from '@/routers/Navigator';
import ScreenName from '@/common/screenNames';

const OtpSignIn = (props) => {
    let timer = 0;
    const [check, setCheck] = useState<boolean>(false);
    const [isActive, setIsActive] = useState<boolean>(false);
    const phone = props.phone;
    const [timerCount, setTimerCount] = useState(60);
    const styles = MyStylesOtp();
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
    const {apiServices, userManager} = useAppStore();

    useEffect(() => {
        setCheck(true);
        setIsActive(true);
        timer = getTime() + 60;
        refreshCountdown();
    }, [props.check]);

    const refreshCountdown = () => {
        setTimeout(() => {
            if (timer - getTime() <= 0) {
                setIsActive(false);
                setTimerCount(60);
                setCheck(false);
            } else {
                setTimerCount(timer - getTime());
                refreshCountdown();
            }
        }, 1000);
    };

    const getTime = () => {
        return Math.floor(Date.now() / 1000);
    };

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
    }, [textInputChange]);

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

    const onPressOtp = async () => {
        const OTP = otp1 + otp2 + otp3 + otp4 + otp5 + otp6;
        Navigator.navigateScreen(ScreenName.success);
        // const res = await apiServices.auth.activeAccountSocial(
        //     OTP,
        //     phone
        // );
        // if (res.success) {
        //     const temp = res?.data as ActiveAccountSocialModel;
        //     if (temp?.token_app) {
        //         userManager.updateUserInfo(temp);
        //     }
        // }
        // else {
        //     const res = await apiServices.auth.activeAuth(OTP, phone);
        //     if (res.success) {
        //         console.log('oke');
        //         setTimeout(() => {
        //         }, 1500);
        //     }
        // }
    };


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


    return (
        <View style={styles.container}>
                <View style={styles.viewTop}>
                    <Text style={styles.txtTitle}>{Languages.auth.txtTitleOtp}</Text>
                    <IcLine width={'35%'} height={'40%'}/>
                </View>
                <Text style={styles.confirmOtp}>{Languages.otp.confirmOtp}</Text>
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
                {(otp1 !== '' && otp2 !== '' && otp3 && otp4 !== '' && otp5 !== '' && otp6 !== '') ?

                    <Touchable style={styles.tobConfirm}
                        onPress={onPressOtp} disabled={false}>
                        <Text
                            style={styles.txtConfirm}>{Languages.auth.conFirm}</Text>
                    </Touchable>
                    :
                    <Touchable style={[styles.tobConfirm, {backgroundColor: COLORS.GRAY}]}
                        onPress={onPressOtp} disabled={true}>
                        <Text
                            style={[styles.txtConfirm, {color: COLORS.BLACK}]}>{Languages.auth.conFirm}</Text>
                    </Touchable>
                }

                <Touchable style={styles.sentOtp} disabled={check}>
                    {check ?
                        <Text style={styles.txtOtp}>{Languages.otp.sentOtp1}{timerCount}</Text> :
                        <Text style={styles.txtOtp}>{Languages.otp.sentOtp2}</Text>
                    }
                </Touchable>
        </View>
    );
};
export default OtpSignIn;

