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
import { useAppStore } from '@/hooks';
import ToastUtils from '@/utils/ToastUtils';
import Loading from '@/components/loading';

const VerifyOTP = observer(({ route }: { route: any }) => {
    const { apiServices } = useAppStore();
    const styles= MyStylesVerifyOTP();
    const linked_id = route?.params?.linked_id;
    const [phone, setPhone] = useState<string>(route?.params?.phoneNumber);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [otp, setOTP] = useState<string>('');
    const time = 120000 /10;    // set time resend OTP = 12s
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
            }, 10000);
            setDisableResend(false);
        }
    }, [overTime]);

    const onCodeChanged = useCallback((code) => {
        setOTP(code);
    }, []);

    const onConfirmOTP = useCallback(async() => {
        if (otp.length === 6) {
            setIsLoading(true);
            const res = await apiServices.paymentMethod.requestActiveLinkVimo(3, phone, linked_id, otp);
            if(res.success){
                ToastUtils.showSuccessToast(Languages.msgNotify.successSendLinkVimo);
                setIsLoading(false);
            }
            else {ToastUtils.showErrorToast(Languages.msgNotify.failCancelLinkVimo);}
            setIsLoading(false);
        }
    }, [apiServices.paymentMethod, linked_id, otp, phone]);

    const onAgreeResendOTP = useCallback(async () => {
        setOverTime(time);
        setDisableResend((last) => !last);
        popupResendCode.current?.hide();
        const res = await apiServices.paymentMethod.requestSendLinkVimo(3, phone);
        if(res.success){
            ToastUtils.showSuccessToast(Languages.msgNotify.successSendLinkVimo);
        }else  ToastUtils.showErrorToast(Languages.msgNotify.failSendLinkVimo);
    }, [apiServices.paymentMethod, phone, time]);

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
                        onPress={onConfirmOTP}
                    />
                </View>
                {renderPopup(popupResendCode, Languages.confirmPhone.popupOtpResendCode)}
                {isLoading && <Loading isOverview/>}
            </View>
        </HideKeyboard >
    );
});

export default VerifyOTP;
