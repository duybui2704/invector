import { observer } from 'mobx-react';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import HTMLView from 'react-native-htmlview';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import { SCREEN_HEIGHT } from '@gorhom/bottom-sheet';

import WarnIC from '@/assets/image/ic_warn_round_yellow.svg';
import VimoIC from '@/assets/image/ic_logo_vimo_large.svg';
import { Configs } from '@/common/Configs';
import Languages from '@/common/Languages';
import { Button } from '@/components/elements/button';
import { BUTTON_STYLES } from '@/components/elements/button/constants';
import HeaderBar from '@/components/header';
import HideKeyboard from '@/components/HideKeyboard';
import { COLORS, HtmlStyles, Styles } from '@/theme';
import Utils from '@/utils/Utils';
import { PopupActions } from '@/components/popupStatus/types';
import PopupNotifyNoAction from '@/components/PopupNotifyNoAction';

const VerifyOTP = observer(({ route }: { route: any }) => {

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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.GRAY_5,
        justifyContent: 'center'
    },
    wrapAllContent: {
        flex: 2,
        paddingHorizontal: 16,
        paddingTop: 10,
        marginBottom: 140
    },
    logo: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    reSendCodeText: {
        ...Styles.typography.regular,
        paddingVertical: 20,
        color: COLORS.RED_4,
        textAlign: 'center'
    },
    underlineStyleBase: {
        width: 50,
        height: 50,
        ...Styles.typography.regular,
        borderWidth: 1,
        borderColor: COLORS.GRAY_11,
        borderRadius: 30,
        color: COLORS.BLACK,
        backgroundColor: COLORS.WHITE,
        fontSize: Configs.FontSize.size16
    },
    underlineStyleHighLighted: {
        borderColor: COLORS.GREEN,
        ...Styles.typography.regular,
        fontSize: Configs.FontSize.size16,
        borderWidth: 1,
        color: COLORS.GREEN
    },
    wrapOTp: {
        height: SCREEN_HEIGHT * 0.1
    }

});
