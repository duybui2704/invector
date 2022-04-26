import { observer } from 'mobx-react-lite';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Text, View } from 'react-native';

import IcLine from '@/assets/image/auth/ic_line_auth.svg';
import CheckIcon from '@/assets/image/ic_ischecked_save_acc.svg';
import UnCheckIcon from '@/assets/image/ic_unchecked_save_acc.svg';
import arrayIcon from '@/common/arrayIcon';
import Languages from '@/common/Languages';
import ScreenName, { TabNamesArray } from '@/common/screenNames';
import { MyTextInput } from '@/components/elements/textfield';
import { TextFieldActions } from '@/components/elements/textfield/types';
import { Touchable } from '@/components/elements/touchable';
import Loading from '@/components/loading';
import { useAppStore } from '@/hooks';
import SessionManager from '@/manager/SessionManager';
import Navigator from '@/routers/Navigator';
import { COLORS } from '@/theme';
import { MyStylesLogin } from './styles';
import { UserInfoModal } from '@/models/user-models';
import { dataUser } from '@/mocks/data';


const Login = observer(() => {
    const {
        apiServices,
        userManager,
        fastAuthInfoManager: fastAuthInfo,
        appManager
    } = useAppStore();
    const [phone, setPhone] = useState<string>('');
    const [pass, setPass] = useState<string>('');
    const [userData, setUserData] = useState<UserInfoModal>();
    const styles = MyStylesLogin();
    const refPhone = useRef<TextFieldActions>(null);
    const refPass = useRef<TextFieldActions>(null);
    const [checked, setCheck] = useState<boolean>(false);
    const [isLoading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        if (SessionManager.getPhoneLogin()) {
            setPhone(SessionManager.getPhoneLogin.toString());
            setCheck(true);
        }
        if (SessionManager.getPwdLogin()) {
            setPass(SessionManager.getPwdLogin.toString);
            setCheck(true);
        }
    }, []);

    useEffect(() => {
        setLoading(isLoading);
        setPhone('0988251903');
        setPass('12345678');
    }, [isLoading]);

    const onChangeText = (value: string, tag?: string) => {
        switch (tag) {
            case Languages.auth.txtPhone:
                setPhone(value);
                break;
            case Languages.auth.txtPass:
                setPass(value);
                break;
            default:
                break;
        }
    };

    const onChangeChecked = useCallback(() => {
        setCheck(last => !last);
    }, []);

    const checkbox = useMemo(() => {
        if (checked) {
            return <CheckIcon />;
        }
        return <UnCheckIcon />;
    }, [checked]);

    const renderInput = useCallback((ref: any, value: any, isPhone: boolean, placeHolder: string, rightIcon?: string, keyboardType?: any, maxLength?: number, isPass?: boolean) => {
        return (
            <MyTextInput
                ref={ref}
                value={value}
                isPhoneNumber={isPhone}
                maxLength={maxLength}
                rightIcon={rightIcon}
                placeHolder={placeHolder}
                containerInput={styles.inputPhone}
                onChangeText={onChangeText}
                keyboardType={keyboardType}
                isPassword={isPass}
            />
        );
    }, [styles.inputPhone]);


    const onLoginPhone = useCallback(async () => {
        setLoading(true);
        const res = await apiServices.auth.loginPhoneOld(phone, pass, 3);

        if (res.success) {
            setLoading(false);
            SessionManager.setAccessToken(res?.data?.token);
            const resInfoAcc = await apiServices.auth.getUserInfo(3);
            if (resInfoAcc.success) {
                const data = resInfoAcc?.data as UserInfoModal;
                setUserData(data);
                userManager.updateUserInfo(data);
            }
            Navigator.navigateToDeepScreen(
                [ScreenName.tabs],
                TabNamesArray[SessionManager.lastTabIndexBeforeOpenAuthTab || 0]
            );
        }
        setLoading(false);

    }, [apiServices.auth, pass, phone, userManager]);

    useEffect(() => {
        console.log('userData=', userData);
    }, [isLoading, userData]);

    return (
        <View style={styles.content}>
            <View style={styles.wrapLoginTxt}>
                <Text style={styles.txtTitle}>{Languages.auth.txtLogin}</Text>
                <IcLine />
            </View>
            {renderInput(refPhone, phone, true, Languages.auth.txtPhone, arrayIcon.login.phone, 'PHONE', 11)}
            {renderInput(refPass, pass, false, Languages.auth.txtPass, arrayIcon.login.pass, 'DEFAULT', 20, true)}
            <View style={styles.rowInfo}>
                <Touchable style={styles.checkbox} onPress={onChangeChecked}>
                    {checkbox}
                    <Text style={styles.txtSave}>{Languages.auth.saveAcc}</Text>
                </Touchable>

                <Touchable onPress={onLoginPhone} disabled={!checked}
                    style={checked ? styles.tobLogin : [styles.tobLogin, { backgroundColor: COLORS.GRAY_13 }]}>
                    <Text style={checked ? styles.txtSubmit : [styles.txtSubmit, { color: COLORS.GRAY_12 }]}>
                        {Languages.auth.txtLogin}
                    </Text>
                </Touchable>
            </View>
            {isLoading && <Loading isOverview />}
        </View>
    );
});

export default Login;
