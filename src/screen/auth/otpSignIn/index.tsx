import React, { useCallback, useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import OtpInputs from 'react-native-otp-inputs';

import IcLine from '@/assets/image/auth/ic_line_auth.svg';
import Languages from '@/common/Languages';
import ScreenName from '@/common/screenNames';
import { Touchable } from '@/components/elements/touchable';
import Loading from '@/components/loading';
import { useAppStore } from '@/hooks';
import SessionManager from '@/manager/SessionManager';
import { UserInfoModal } from '@/models/user-models';
import Navigator from '@/routers/Navigator';
import { MyStylesOtp } from '@/screen/auth/otpSignIn/styles';
import ChangePass from '../changePass';

const OtpSignIn = (props: any) => {
    let timer = 0;
    const [check, setCheck] = useState<boolean>(false);
    const [isActive, setIsActive] = useState<boolean>(false);
    const [isNavigate, setIsNavigate] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const phone = props.phone;
    const pass = props.pass;
    const [token, setToken] = useState<string>();
    const [timerCount, setTimerCount] = useState(60);
    const styles = MyStylesOtp();
    const { apiServices, userManager } = useAppStore();

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

    const onChangeCode = useCallback((code: string) => {
        setToken(code);
    }, []);

    const onPressOtp = async () => {
        if (props?.isChangePass) {
            setIsNavigate(true);
        } else {
            setIsLoading(true);
            const res = await apiServices.auth.activeAccount(
                token,
                phone
            );
            setIsLoading(false);
            if (res.success) {
                if (!props.isChecked) {
                    SessionManager.setSavePhoneLogin('');
                    SessionManager.setSavePassLogin('');
                } else {
                    SessionManager.setSavePhoneLogin(phone);
                    SessionManager.setSavePassLogin(pass);
                }
                const temp = res?.data as UserInfoModal;
                if (temp?.token) {
                    SessionManager.setAccessToken(temp?.token);
                    const resInfoAcc = await apiServices.auth.getUserInfo();
                    if (resInfoAcc.success) {
                        const resData = resInfoAcc.data as UserInfoModal;
                        userManager.updateUserInfo(resData);
                    }
                }
                Navigator.navigateScreen(ScreenName.success);
            }
        }
    };

    const sendOTP = useCallback(async () => {
        setIsLoading(true);
        const resSendOTP = await apiServices.auth.otpResetPwd(phone);
        setIsLoading(false);
        if (resSendOTP.success) {
            setCheck(true);
            setIsActive(true);
            timer = getTime() + 60;
            refreshCountdown();
        }
    }, [getTime]);

    const renderOTP = () => {
        return (
            <View style={styles.container}>
                <View style={styles.viewTop}>
                    <Text style={styles.txtTitle}>{Languages.auth.txtTitleOtp}</Text>
                    <IcLine width={'35%'} height={'40%'} />
                </View>
                <Text style={styles.confirmOtp}>{Languages.otp.confirmOtp}</Text>
                <View style={styles.boxOtp}>
                    <OtpInputs
                        handleChange={onChangeCode}
                        numberOfInputs={6}
                        style={styles.wrapOTP}
                        inputStyles={styles.viewOtp}
                    />
                </View>
                <Touchable style={styles.tobConfirm}
                    onPress={onPressOtp} disabled={false}>
                    <Text
                        style={styles.txtConfirm}>{Languages.auth.conFirm}</Text>
                </Touchable>


                <Touchable style={styles.sentOtp} disabled={check} onPress={sendOTP}>
                    {check ?
                        <Text style={styles.txtOtp}>{Languages.otp.sentOtp1}{timerCount}</Text> :
                        <Text style={styles.txtOtp}>{Languages.otp.sentOtp2}</Text>
                    }
                </Touchable>
                {isLoading && <Loading isOverview />}
            </View>
        );
    };

    return (
        <>
            {isNavigate ? <ChangePass phone={phone} token={token} /> : renderOTP()}
        </>
    );
};
export default OtpSignIn;

