import { observer } from 'mobx-react-lite';
import React, { useState, useRef, useCallback, useMemo, useEffect } from 'react';
import { View, TextInput, ImageBackground, Text, TouchableWithoutFeedback, Keyboard, StatusBar } from 'react-native';
import placeholder from 'lodash/fp/placeholder';

import IcLine from '@/assets/image/auth/ic_line_auth.svg';
import CheckIcon from '@/assets/image/auth/ic_check_login.svg';
import UnCheckIcon from '@/assets/image/auth/ic_un_check_login.svg';
import { Touchable } from '../../../components/elements/touchable';
import { MyTextInput } from '../../../components/elements/textfield';
import { myStylesAuth } from './styles';
import { TextFieldActions } from '../../../components/elements/textfield/types';
import { COLORS } from '../../../theme';
import Languages from '@/common/Languages';
import arrayIcon from '@/common/arrayIcon';
import FormValidate from '@/utils/FormValidate';
import { useAppStore } from '@/hooks';
import SessionManager from '@/manager/SessionManager';
import Navigator from '@/routers/Navigator';
import { LoginWithThirdPartyModel } from '@/models/auth';
import { UserInfoModal } from '@/models/user-modal';
import Loading from '@/components/loading';
import ScreenName, { TabNamesArray } from '@/common/screenName';

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
            case Languages.Auth.txtPhone:
                setPhone(value);
                break;
            case Languages.Auth.txtPass:
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
            return <CheckIcon width={24} height={24} />;
        }
        return <UnCheckIcon width={20} height={20} />;
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
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={styles.txtTitle}>{Languages.Auth.txtTitle}</Text>
                <IcLine />
            </View>
            <MyTextInput
                ref={refPhone}
                value={phone}
                isPhoneNumber={true}
                maxLength={11}
                rightIcon={arrayIcon.login.phone}
                placeHolder={Languages.Auth.txtPhone}
                containerInput={styles.inputPhone}
                onChangeText={onChangeText}
                keyboardType={'NUMBER'}
            />
            <MyTextInput
                ref={refPass}
                value={pass}
                isPhoneNumber={false}
                rightIcon={arrayIcon.login.pass}
                placeHolder={Languages.Auth.txtPass}
                containerInput={styles.inputPass}
                onChangeText={onChangeText}
                isPassword
            />
            <View style={styles.rowInfo}>
                <View style={styles.row}>
                    <Touchable style={styles.checkbox} onPress={onChangeChecked}>
                        {checkbox}
                    </Touchable>
                    <Text style={styles.txtSave}>Lưu tài khoản</Text>
                </View>
                <Touchable onPress={onLoginPhone} disabled={!checked}
                    style={checked ? styles.tobLogin : [styles.tobLogin, { backgroundColor: COLORS.GRAY }]}>
                    <Text style={checked ? styles.txtSubmit : [styles.txtSubmit, { color: COLORS.BLACK }]}>
                        {Languages.Auth.txtTitle}
                    </Text>
                </Touchable>
            </View>
            {/* {isLoading && <Loading isOverview/>} */}
        </View>
    );
});

export default Login;
