import { observer } from 'mobx-react-lite';
import React, { useState, useRef, useCallback, useMemo, useEffect } from 'react';
import { View, Text } from 'react-native';

import IcLine from '@/assets/image/auth/ic_line_auth.svg';
import CheckIcon from '@/assets/image/ic_ischecked_save_acc.svg';
import UnCheckIcon from '@/assets/image/ic_unchecked_save_acc.svg';
import { Touchable } from '../../../components/elements/touchable';
import { MyTextInput } from '../../../components/elements/textfield';
import { myStylesAuth } from './styles';
import { TextFieldActions } from '../../../components/elements/textfield/types';
import { COLORS } from '../../../theme';
import Languages from '@/common/Languages';
import arrayIcon from '@/common/arrayIcon';
import FormValidate from '@/utils/FormValidate';
import Otp from '../otp';
import { ItemProps } from '@/components/bottomsheet';
import { useAppStore } from '@/hooks';
import { ChannelModal } from '@/models/ChannelModal';

const SignUp = observer(() => {
    const { apiServices } = useAppStore();
    const [phone, setPhone] = useState<string>('');
    const [card, setCard] = useState<string>('');
    const [pass, setPass] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [passNew, setPassNew] = useState<string>('');
    const [channel, setChannel] = useState<ItemProps>();
    const [dataChannel, setDataChannel] = useState<ItemProps[]>();
    const [data, setData] = useState<any>('');
    const [isNavigate, setNavigate] = useState<boolean>(false);
    const styles = myStylesAuth();
    const refPhone = useRef<TextFieldActions>(null);
    const refName = useRef<TextFieldActions>(null);
    const refEmail = useRef<TextFieldActions>(null);
    const refChannel = useRef<TextFieldActions>(null);
    const refPass = useRef<TextFieldActions>(null);
    const refPassNew = useRef<TextFieldActions>(null);
    const [checked, setCheck] = useState<boolean>(false);

    const onChangeText = (value: string, tag?: string) => {
        switch (tag) {
            case Languages.auth.txtPhone:
                setPhone(value);
                break;
            case Languages.auth.txtPass:
                setPass(value);
                break;
            case Languages.auth.txtName:
                setName(value);
                break;
            case Languages.auth.txtConfirmPass:
                setPassNew(value);
                break;
            case Languages.auth.txtEmail:
                setEmail(value);
                break;
            default:
                break;
        }
    };

    const fetchData = async () => {
        // setLoading(true);
        const res = await apiServices.auth.getChanelSource();
        if (res.success) {
            // setLoading(false);
            const data = res.data as ChannelModal[];
            const temp = [] as ItemProps[];
            data?.forEach((item: any) => {
                temp.push({
                    value: item?.name,
                    id: item.type
                });
            });
            setDataChannel(temp);
        }
        // setLoading(false);
    };

    useEffect(() => {
        fetchData();
    }, [apiServices.auth]);

    const onChangeChecked = useCallback(() => {
        setCheck(last => !last);

    }, []);

    const checkbox = useMemo(() => {
        if (checked) {
            return <CheckIcon />;
        }
        return <UnCheckIcon />;
    }, [checked]);

    const onValidate = useCallback(() => {
        const errMsgPhone = FormValidate.passConFirmPhone(phone);
        const errMsgPwd = FormValidate.passValidate(pass);
        const errMsgName = FormValidate.userNameValidate(name);
        const errMsgPwdNew = FormValidate.passConFirmPhone(passNew);
        const errMsgPwdEmail = FormValidate.emailValidate(email);
        const errMsgChannel = FormValidate.inputNameEmpty(channel, '');

        refPhone.current?.setErrorMsg(errMsgPhone);
        refPass.current?.setErrorMsg(errMsgPwd);
        refName.current?.setErrorMsg(errMsgName);
        refPassNew.current?.setErrorMsg(errMsgPwdNew);
        refEmail.current?.setErrorMsg(errMsgPwdEmail);
        refChannel.current?.setErrorMsg(errMsgChannel);
    }, []);

    const onSignIn = async () => {
        setNavigate(true);
        if (onValidate()) {
            const res = await apiServices.auth.registerAuth(phone, name, pass, passNew, email, card, '123', channel?.value);
            if (res.success) {
                setNavigate(true);
                setData(res.data);
            }
        }
    };

    const onChangeFormality = (item: any) => {
        setChannel(item);
    };

    const renderView = () => {
        return (
            <View style={styles.content}>
                <View style={styles.wrapLoginTxt}>
                    <Text style={styles.txtTitle}>{Languages.auth.txtSignIn}</Text>
                    <IcLine />
                </View>
                <MyTextInput
                    ref={refName}
                    value={name}
                    isPhoneNumber={false}
                    rightIcon={arrayIcon.login.name}
                    placeHolder={Languages.auth.txtName}
                    containerInput={styles.inputPhone}
                    onChangeText={onChangeText}
                />
                <MyTextInput
                    ref={refPhone}
                    value={phone}
                    isPhoneNumber={true}
                    rightIcon={arrayIcon.login.phone}
                    placeHolder={Languages.auth.txtPhone}
                    containerInput={styles.inputPass}
                    onChangeText={onChangeText}
                    keyboardType={'NUMBER'}
                />
                <MyTextInput
                    ref={refEmail}
                    value={email}
                    isPhoneNumber={false}
                    rightIcon={arrayIcon.login.email}
                    placeHolder={Languages.auth.txtEmail}
                    containerInput={styles.inputPass}
                    onChangeText={onChangeText}
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
                <MyTextInput
                    ref={refPass}
                    value={passNew}
                    isPhoneNumber={false}
                    rightIcon={arrayIcon.login.pass}
                    placeHolder={Languages.auth.txtConfirmPass}
                    containerInput={styles.inputPass}
                    onChangeText={onChangeText}
                    isPassword
                />
                {/* <PickerValuation */}
                {/*    ref={refChannel} */}
                {/*    containerStyle={styles.inputPass} */}
                {/*    // leftIcon={ICONS.LOCATION} */}
                {/*    // label={Languages.profileauth.about} */}
                {/*    placeholder={Languages.auth.knowChannel} */}
                {/*    onPressItem={onChangeFormality} */}
                {/*    value={channel?.value} */}
                {/*    data={dataChannel} */}
                {/* /> */}
                <View style={styles.rowInfo}>
                    <View style={styles.row}>
                        <Touchable style={styles.checkbox} onPress={onChangeChecked}>
                            {checkbox}
                        </Touchable>
                        <Text style={styles.txtSave}>{Languages.auth.saveAcc}</Text>
                    </View>
                    <Touchable onPress={onSignIn} disabled={!checked}
                        style={checked ? styles.tobLogin : [styles.tobLogin, { backgroundColor: COLORS.GRAY_13 }]}>
                        <Text style={checked ? styles.txtSubmit : [styles.txtSubmit, { color: COLORS.GRAY_12 }]}>
                            {Languages.auth.txtSignIn}
                        </Text>
                    </Touchable>
                </View>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            {isNavigate ? <Otp phone={phone} data={data} /> : renderView()}
        </View>
    );
});

export default SignUp;
