import { observer } from 'mobx-react-lite';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Text, View } from 'react-native';

import IcLine from '@/assets/image/auth/ic_line_auth.svg';
import arrayIcon from '@/common/arrayIcon';
import Languages from '@/common/Languages';
import { useAppStore } from '@/hooks';
import Loading from '@/components/loading';
import { TextFieldActions } from '@/components/elements/textfield/types';
import { MyStylesChangePass } from './styles';
import { MyTextInput } from '@/components/elements/textfield';
import Navigator from '@/routers/Navigator';
import ScreenName, { TabNamesArray } from '@/common/screenNames';
import { Touchable } from '@/components/elements/touchable';
import { COLORS } from '@/theme';
import FormValidate from '@/utils/FormValidate';
import Login from '../login';

const ChangePass = observer((props: any) => {
    const {
        apiServices
    } = useAppStore();
    const [confirmPass, setConfirmPass] = useState<any>('');
    const [newPass, setNewPass] = useState<any>('');
    const styles = MyStylesChangePass();
    const refConfirmPass = useRef<TextFieldActions>(null);
    const refPassNew = useRef<TextFieldActions>(null);
    const [isLoading, setLoading] = useState<boolean>(false);
    const [disTob, setDisTob] = useState<boolean>(true);
    const [isNavigate, setIsNavigate] = useState<boolean>(false);

    useEffect(() => {
        isDis();
    }, [newPass, confirmPass]);

    const onChangeText = (value: string, tag?: string) => {
        switch (tag) {
            case Languages.auth.txtConfirmNewPass:
                setConfirmPass(value);
                break;
            case Languages.auth.txtNewPass:
                setNewPass(value);
                break;
            default:
                break;
        }
    };

    const onValidate = useCallback(() => {
        const errMsgPwd = FormValidate.passValidate(newPass);
        const errMsgPwdNew = FormValidate.passConFirmValidate(newPass, confirmPass);
        refPassNew.current?.setErrorMsg(errMsgPwd);
        refConfirmPass.current?.setErrorMsg(errMsgPwdNew);
        if (`${errMsgPwd}${errMsgPwdNew}`.length === 0) {
            return true;
        }
        return false;

    }, [newPass, confirmPass]);

    const isDis = useCallback(() => {
        if (newPass !== '' && confirmPass !== '') {
            setDisTob(false);
        }
    }, [newPass, confirmPass]);

    const onChange = async () => {
        console.log('props', props);
        if (onValidate()) {
            setLoading(true);
            const resChangePass = await apiServices.auth.updateNewPwd(props?.phone, props?.token, newPass, confirmPass);
            setLoading(false);
            if (resChangePass.success) {
                setTimeout(() => {
                    setIsNavigate(true);
                }, 1500);
            }
        }
    };

    const renderChangePass = () => {
        return (
            <View style={styles.content}>
                <View style={styles.viewTitle}>
                    <Text style={styles.txtTitle}>{Languages.auth.titleChangePass}</Text>
                </View>
                <View style={styles.viewTxt}>
                    <Text style={styles.txt}>{Languages.auth.txtChange}</Text>
                </View>
                <MyTextInput
                    ref={refPassNew}
                    value={newPass}
                    isPhoneNumber={true}
                    maxLength={11}
                    rightIcon={arrayIcon.login.pass}
                    placeHolder={Languages.auth.txtNewPass}
                    containerInput={styles.inputPass}
                    onChangeText={onChangeText}
                    isPassword
                />
                <MyTextInput
                    ref={refConfirmPass}
                    value={confirmPass}
                    isPhoneNumber={true}
                    maxLength={11}
                    rightIcon={arrayIcon.login.pass}
                    placeHolder={Languages.auth.txtConfirmNewPass}
                    containerInput={styles.inputPass}
                    onChangeText={onChangeText}
                    isPassword
                />
                <View style={styles.rowInfo}>
                    <Touchable onPress={onChange} disabled={disTob}
                        style={!disTob ? styles.tobLogin : [styles.tobLogin, { backgroundColor: COLORS.GRAY_13 }]}>
                        <Text style={!disTob ? styles.txtSubmit : [styles.txtSubmit, { color: COLORS.GRAY_12 }]}>
                            {Languages.auth.change}
                        </Text>
                    </Touchable>
                </View>
                {isLoading && <Loading isOverview />}
            </View>
        );
    };

    return (
        <>
            {isNavigate ? <Login /> : renderChangePass()}
        </>
    );
});

export default ChangePass;
