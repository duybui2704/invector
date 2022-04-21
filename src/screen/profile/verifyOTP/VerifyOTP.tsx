import OTPInputView from '@twotalltotems/react-native-otp-input';
import { observer } from 'mobx-react';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Text, View } from 'react-native';
import HTMLView from 'react-native-htmlview';

import VimoIC from '@/assets/image/ic_logo_vimo_large.svg';
import WarnIC from '@/assets/image/ic_warn_round_yellow.svg';
import Languages from '@/common/Languages';
import { Button } from '@/components/elements/button';
import { BUTTON_STYLES } from '@/components/elements/button/constants';
import HeaderBar from '@/components/header';
import HideKeyboard from '@/components/HideKeyboard';
import PopupNotifyNoAction from '@/components/PopupNotifyNoAction';
import { PopupActions } from '@/components/popupStatus/types';
import { HtmlStyles } from '@/theme';
import Utils from '@/utils/Utils';
import { MyStylesVerifyOTP } from './styles';

const VerifyOTP = observer(({ route }: { route: any }) => {

    const styles= MyStylesVerifyOTP();

    const [phone, setPhone] = useState<string>(route?.params?.phoneNumber);
    const [otp, setOTP] = useState<string>('');
    const time = 120000 /10;
    const [disableResend, setDisableResend] = useState<boolean>(true);
    const [overTime, setOverTime] = useState<number>(time);
    const intervalRef = useRef<any>();
    const popupResendCode = useRef<PopupActions>();

    useEffect(() => {
        if(overTime > 0 && disableResend === true){
            intervalRef.current = setInterval(() => {
                setOverTime(timer => timer - 1000);
            }, 1000);
        }
        return () => clearInterval(intervalRef.current);
    }, [disableResend, overTime]);

    useEffect(() => {
        if (overTime <= 0) {
            clearInterval(intervalRef.current);
        }
        if (overTime === 0) {
            popupResendCode.current?.show();
            setTimeout(() => {
                popupResendCode.current?.hide();
            }, 5500);
            setDisableResend(false);
        }
    }, [overTime]);

    const onCodeChanged = useCallback((code) => {
        setOTP(code);
    }, []);

    const onSendOTP = useCallback(() => {
        if (otp.length === 6) {
        //    
        }
    }, [otp.length]);

    const onAgreeResendOTP = useCallback(async () => {
        setOverTime(time);
        setDisableResend((last) => !last);
        popupResendCode.current?.hide();
    }, [time]);

    const renderPopup = useCallback((ref: any, content: string) => {
        return (
            <PopupNotifyNoAction
                ref={ref}
                renderIcon={<WarnIC/>}
                renderTitle={Languages.confirmPhone.popupOtpErrorTitle}
                renderContent={content}
                hasButton
                onConfirm={onAgreeResendOTP}
            />
        );
    }, [onAgreeResendOTP]);

    return (
        <HideKeyboard style={styles.container}>
            <View style={styles.container}>
                <HeaderBar isLight={false} title={Languages.confirmPhone.verifyOTP} hasBack />
                <View style={styles.logo}>
                    <VimoIC />
                </View>
                <View style={styles.wrapAllContent}>
                    <HTMLView
                        value={Languages.confirmPhone.noteVerifyOTP.replace('%phone', Utils.encodePhone(phone))}
                        stylesheet={HtmlStyles || undefined}
                    />
                    <OTPInputView
                        style={styles.wrapOTp}
                        pinCount={6}
                        autoFocusOnLoad
                        onCodeChanged={onCodeChanged}
                        editable={true}
                        codeInputFieldStyle={styles.underlineStyleBase}
                        codeInputHighlightStyle={styles.underlineStyleHighLighted}
                        code={otp}
                    />

                    <Text style={styles.reSendCodeText}>{`${Languages.confirmPhone.reSendCode}${Utils.covertSecondAndGetMinute(overTime)}:${Utils.covertSecondAndGetSecond(overTime)}`}</Text>
                    <Button label={Languages.confirmPhone.verifyOTP}
                        buttonStyle={BUTTON_STYLES.GREEN}
                        isLowerCase
                        onPress={onSendOTP}
                    />
                </View>
                {renderPopup(popupResendCode, Languages.confirmPhone.popupOtpResendCode)}
            </View>
        </HideKeyboard >
    );
});

export default VerifyOTP;
