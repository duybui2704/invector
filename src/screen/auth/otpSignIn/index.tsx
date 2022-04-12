import {MyTextInput} from '../../../components/elements/textfield';
import {TextFieldActions} from '../../../components/elements/textfield/types';
import {COLORS, Styles} from '../../../theme';
import Languages from "@/common/languages";
import {Configs} from "@/common/config";
import {OtpModal} from "@/models/user-modal";
import React, {useState, useRef, useCallback, useMemo, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import DimensionUtils from "@/utils/DimensionUtils";
import Validate from "@/utils/Validate";
import IcLine from "@/assets/image/auth/ic_line_auth.svg";
import {Touchable} from "@/components/elements/touchable";
import {useAppStore} from "@/hooks";
import {ActiveAccountSocialModel} from '@/models/auth';
import {MyStylesOtp} from "@/screen/auth/otpSignIn/styles";

const OtpSignIn = (props) => {
    const phone = props.phone;
    const styles = MyStylesOtp();
    const [otp1, setOtp1] = useState<string>('');
    const [otp2, setOtp2] = useState<string>('');
    const [otp3, setOtp3] = useState<string>('');
    const [otp4, setOtp4] = useState<string>('');
    const [otp5, setOtp5] = useState<string>('');
    const [otp6, setOtp6] = useState<string>('');
    const [disable, setDisable] = useState<boolean>(true)
    const otp1Ref = useRef<TextFieldActions>();
    const otp2Ref = useRef<TextFieldActions>();
    const otp3Ref = useRef<TextFieldActions>();
    const otp4Ref = useRef<TextFieldActions>();
    const otp5Ref = useRef<TextFieldActions>();
    const otp6Ref = useRef<TextFieldActions>();
    const {apiServices, userManager} = useAppStore();

    const textInputChange = useCallback((text: string, ref: any) => {
        const value = Validate.stringIsNumberOnly(text) ? text.trim() : '';
        if(value !== '') {
            ref.current.focus();
        }
    }, []);

    const onChangeText =
        (value: string, tag?: string) => {
            switch (tag) {
                case Languages.otp.otp1:
                    setOtp1(value);
                    textInputChange(value, otp2Ref);
                    break;
                case Languages.otp.otp2:
                    setOtp2(value);
                    if(otp1 !== '' && otp2 !== '') {
                        textInputChange(value, otp3Ref);
                    }
                    break;
                case Languages.otp.otp3:
                    setOtp3(value);
                    if(otp1 !== '' && otp2 !== '' && otp3) {
                        textInputChange(value, otp4Ref);
                    }
                    break;
                case Languages.otp.otp4:
                    setOtp4(value);
                    if(otp1 !== '' && otp2 !== '' && otp3 && otp4 !== '') {
                        textInputChange(value, otp5Ref);
                    }
                        break;
                case Languages.otp.otp5:
                    setOtp5(value);
                    if(otp1 !== '' && otp2 !== '' && otp3 && otp4 !== '' && otp5 !== '') {
                        textInputChange(value, otp6Ref);
                    }
                    break;
                case Languages.otp.otp6:
                    setOtp6(value);
                    break;
                default:
                    break;
            }
            if(otp1 !== '' && otp2 !== '' && otp3 && otp4 !== '' && otp5 !== '' && otp6 !== '') {
               setDisable(false);
            } else {
                setDisable(true);
            }
        };
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
        }

    const onPressOtp = async () => {
        const OTP = otp1 + otp2 + otp3 + otp4 + otp5 + otp6;
        const res = await apiServices.auth.activeAccountSocial(
            OTP,
            phone
        );
        if (res.success) {
            const temp = res?.data as ActiveAccountSocialModel;
            if (temp?.token_app) {
                userManager.updateUserInfo(temp);
            }
        }
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
        <View style={styles.containerBox}>
            <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 20}}>
                <Text style={styles.txtTitle}>{Languages.Auth.txtTitleOtp}</Text>
                <IcLine width={'40%'} height={'60%'}/>
            </View>
            <Text style={styles.confirmOtp}>{Languages.otp.confirmOtp}</Text>
            <View style={styles.boxOtp}>
                {renderInput(
                    otp1Ref,
                    Languages.otp.otp1,
                    otp1,
                    onChangeInputOneKeyPress,
                    disable
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
            <Touchable style={!disable ? styles.tobConfirm : [styles.tobConfirm, {backgroundColor: COLORS.GRAY}]}
                       onPress={onPressOtp} disabled={disable}>
                <Text
                    style={!disable ? styles.txtConfirm : [styles.txtConfirm, {color: COLORS.BLACK}]}>{Languages.Auth.conFirm}</Text>
            </Touchable>
        </View>
    </View>
);
}
export default OtpSignIn;

