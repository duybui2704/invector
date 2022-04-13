import { observer } from 'mobx-react-lite';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Text, View } from 'react-native';

import CheckIcon from '@/assets/image/ic_ischecked_save_acc.svg';
import IcLine from '@/assets/image/auth/ic_line_auth.svg';
import UnCheckIcon from '@/assets/image/ic_unchecked_save_acc.svg';
import arrayIcon from '@/common/arrayIcon';
import Languages from '@/common/Languages';
import { useAppStore } from '@/hooks';
import SessionManager from '@/manager/SessionManager';
import {UserInfoModal} from "@/models/user-modal";
import Loading from "@/components/loading";
∂
const Login = observer(() => {
    const {
        apiServices,
        userManager,
        fastAuthInfoManager: fastAuthInfo,
        appManager
    } = useAppStore();
    const [phone, setPhone] = useState<any>('');
    const [pass, setPass] = useState<any>('');
    const styles = myStylesAuth();
    const refPhone = useRef<TextFieldActions>(null);
    const refPass = useRef<TextFieldActions>(null);
    const [checked, setCheck] = useState<boolean>(false);
    const [isLoading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        if (SessionManager.getPhoneLogin()) {
            setPhone(SessionManager.getPhoneLogin());
            setCheck(true);
        }
        if (SessionManager.getPwdLogin()) {
            setPass(SessionManager.getPwdLogin());
            setCheck(true);
        }
    }, []);

    // useEffect(() => {
    //     onLoading(isLoading);
    // }, [isLoading])

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


    const onLoginPhone = async () => {
        userManager.updateUserInfo({
            name: 'Dinh Giang'
        });
        Navigator.navigateToDeepScreen(
            [ScreenName.tabs],
            TabNamesArray[SessionManager.lastTabIndexBeforeOpenAuthTab || 0]
        );
    };

    return (
        <View style={styles.content}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={styles.txtTitle}>{Languages.Auth.txtTitle}</Text>
                <IcLine width={'40%'} height={40}/>
            </View>
            <MyTextInput
                ref={refPhone}
                value={phone}
                isPhoneNumber={true}
                maxLength={11}
                rightIcon={arrayIcon.login.phone}
                placeHolder={Languages.auth.txtPhone}
                containerInput={styles.inputPhone}
                onChangeText={onChangeText}
                keyboardType={'NUMBER'}
            />
            <MyTextInput
                ref={refPass}
                value={pass}
                isPhoneNumber={false}
                rightIcon={arrayIcon.login.pass}
                placeHolder={Languages.auth.txtPass}
                containerInput={styles.inputPass}
                onChangeText={onChangeText}
                isPassword
            />
            <View style={styles.rowInfo}>
               
                <Touchable style={styles.checkbox} onPress={onChangeChecked}>
                    {checkbox}
                    <Text style={styles.txtSave}>{Languages.auth.saveAcc}</Text>
                </Touchable>
                    
               
                <Touchable onPress={onLoginPhone} disabled={!checked}
                    style={checked ? styles.tobLogin : [styles.tobLogin, { backgroundColor: COLORS.GRAY_13 }]}>
                    <Text style={checked ? styles.txtSubmit : [styles.txtSubmit, { color: COLORS.GRAY_12 }]}>
                        {Languages.auth.txtTitle}
                    </Text>
                </Touchable>
            </View>
            {isLoading && <Loading isOverview/>}
        </View>
    );
});

export default Login;
