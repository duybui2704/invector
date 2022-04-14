import {observer} from 'mobx-react-lite';
import React, {useState, useRef, useCallback, useMemo, useEffect} from 'react';
import {View, Text} from 'react-native';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';

import ScrollViewWithKeyboard from '@/components/scrollViewWithKeyboard';
import IcLine from '@/assets/image/auth/ic_line_auth.svg';
import CheckIcon from '@/assets/image/auth/ic_check_login.svg';
import IcChannel from '@/assets/image/auth/ic_down_auth.svg';
import UnCheckIcon from '@/assets/image/auth/ic_un_check_login.svg';
import {Touchable} from '@/components/elements/touchable';
import {MyTextInput} from '@/components/elements/textfield';
import {myStylesSign} from './styles';
import {TextFieldActions} from '@/components/elements/textfield/types';
import {COLORS} from '@/theme';
<<<<<<< HEAD
import Languages from "@/common/Languages";
import arrayIcon from "@/common/arrayIcon";
import FormValidate from "@/utils/FormValidate";
import {useAppStore} from "@/hooks";
import OtpSign from "@/screen/auth/otpSignIn";
=======
import Languages from '@/common/Languages';
import arrayIcon from '@/common/arrayIcon';
import FormValidate from '@/utils/FormValidate';
import { useAppStore } from '@/hooks';
import OtpSign from '@/screen/auth/otpSignIn';
>>>>>>> dev
import Loading from '@/components/loading';
import PopupSignIn from '@/components/popupSignIn';
import DimensionUtils from '@/utils/DimensionUtils';

const SignIn = observer(() => {

    const {apiServices} = useAppStore();
    const [isLoading, setLoading] = useState<boolean>(false);
    const [username, setUsername] = useState<string>('');
    const [phone, setPhone] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [channel, setchannel] = useState<string>('');
    const [pass, setPass] = useState<string>('');
    const [conFirmPass, setConFirmPass] = useState<string>('');
    const [disable, setDisable] = useState<boolean>(false);
    const [modal, setModal] = useState<boolean>(false);

    const userNameRef = useRef<TextFieldActions>(null);
    const phoneRef = useRef<TextFieldActions>(null);
    const emailRef = useRef<TextFieldActions>(null);
    const pwdRef = useRef<TextFieldActions>(null);
    const pwdCfRef = useRef<TextFieldActions>(null);
    const modalRef = useRef();
    const [checked, setChecked] = useState<boolean>(false);
    const [isNavigate, setIsNavigate] = useState<boolean>(false);
    const [data, setData] = useState<any>();
    const styles = myStylesSign();

    const onValidation = useCallback(() => {
        const errMsgUsername = FormValidate.userNameValidate(username);
        const errMsgPhone = FormValidate.passConFirmPhone(phone);
        const errMsgEmail = FormValidate.emailValidate(email);
        const errMsgPwd = FormValidate.passValidate(pass);
        const errMsgConFirmPwd = FormValidate.passConFirmValidate(pass, conFirmPass);

        userNameRef.current?.setErrorMsg(errMsgUsername);
        phoneRef.current?.setErrorMsg(errMsgPhone);
        emailRef.current?.setErrorMsg(errMsgEmail);
        pwdRef.current?.setErrorMsg(errMsgPwd);
        pwdCfRef.current?.setErrorMsg(errMsgConFirmPwd);

        if (`${errMsgUsername}${errMsgEmail}${errMsgPwd}${errMsgConFirmPwd}${errMsgPhone}`.length === 0) {
            return true;
        }
        return false;
    }, [channel, conFirmPass, email, pass, phone, username]);

    const onPressSignUp = async () => {
        setIsNavigate(true);
        if (onValidation()) {
            setLoading(true);
            setDisable(!disable);
            // const res = await apiServices.auth.registerAuth(phone, username, pass, conFirmPass, email, channel?.value);
            // if (res.success) {
            //     setLoading(false);
            //     // Navigator.pushScreen(ScreenName.otp, {
            //     //     phone,
            //     //     data: res.data
            //     // });
            // }
        }
    };

    const fetchData = async () => {
        setLoading(true);
        const res = await apiServices.auth.getChanelSource();
        if (res.success) {
            setData(res.data);
            console.log(res.data);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchData();
    }, [apiServices.auth]);

    const onChangeText = (value: string, tag?: string) => {
        switch (tag) {
            case Languages.Auth.username:
                setUsername(value);
                break;
            case Languages.Auth.txtPhone:
                setPhone(value);
                break;
            case Languages.Auth.email:
                setEmail(value);
                break;
            case Languages.Auth.enterPwd:
                setPass(value);
                break;
            case Languages.Auth.currentPass:
                setConFirmPass(value);
                break;
            default:
                break;
        }
    };

    const checkbox = useMemo(() => {
        if (checked) {
            return <CheckIcon width={24} height={24}/>;
        }
        return <UnCheckIcon width={20} height={20}/>;
    }, [checked]);


    const onChangeChecked = useCallback(() => {
        setChecked(last => !last);
    }, []);

    const onModal = useCallback(() => {
        modalRef.current?.show();
    }, []);

    const actionYes = useCallback((txt) => {
        setchannel(txt);
    }, []);

    const renderView = () => {
        return (
            <View style={styles.container}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text style={styles.txtTitle}>{Languages.Auth.txtSignIn}</Text>
                    <IcLine/>
                </View>
                <ScrollViewWithKeyboard style={{marginBottom: 20, width: DimensionUtils.SCREEN_WIDTH * 0.8, backgroundColor: COLORS.TRANSPARENT}}>
                    <MyTextInput
                        ref={userNameRef}
                        value={username}
                        isPhoneNumber={false}
                        rightIcon={arrayIcon.login.name}
                        placeHolder={Languages.Auth.username}
                        onChangeText={onChangeText}
                        containerInput={styles.inputPass}
                        maxLength={100}
                    />
                    <MyTextInput
                        ref={phoneRef}
                        value={phone}
                        isPhoneNumber={true}
                        rightIcon={arrayIcon.login.phone}
                        placeHolder={Languages.Auth.txtPhone}
                        onChangeText={onChangeText}
                        maxLength={10}
                        keyboardType={'NUMERIC'}
                        containerInput={styles.inputPass}
                    />

                    <MyTextInput
                        ref={emailRef}
                        value={email}
                        isPhoneNumber={false}
                        rightIcon={arrayIcon.login.email}
                        placeHolder={Languages.Auth.email}
                        onChangeText={onChangeText}
                        maxLength={100}
                        containerInput={styles.inputPass}
                        keyboardType={'EMAIL'}
                    />
                    <MyTextInput
                        ref={pwdRef}
                        value={pass}
                        isPassword
                        isPhoneNumber={false}
                        containerInput={styles.inputPass}
                        rightIcon={arrayIcon.login.pass}
                        placeHolder={Languages.Auth.enterPwd}
                        onChangeText={onChangeText}
                    />

                    <MyTextInput
                        ref={pwdCfRef}
                        isPassword
                        isPhoneNumber={false}
                        value={conFirmPass}
                        containerInput={styles.inputPass}
                        rightIcon={arrayIcon.login.pass}
                        placeHolder={Languages.Auth.currentPass}
                        onChangeText={onChangeText}
                    />

                    <Touchable onPress={() => onModal()} style={styles.tob} disabled={!data}>
                        <Text style={channel !== '' ?
                            [styles.txtTitleModal, {color: COLORS.BLACK}] : styles.txtTitleModal}>
                            {channel !== '' ? channel : Languages.Auth.knowChannel}</Text>
                        <View style={styles.viewIcon}>
                            <IcChannel width={20} height={20}/>
                        </View>
                    </Touchable>

                    <View style={styles.rowInfo}>
                        <View style={styles.row}>
                            <Touchable style={styles.checkbox} onPress={onChangeChecked}>
                                {checkbox}
                            </Touchable>
                            <Text style={styles.txtSave}>Lưu tài khoản</Text>
                        </View>
                        <Touchable onPress={onPressSignUp} disabled={!checked}
                            style={checked ? styles.tobLogin : [styles.tobLogin, { backgroundColor: COLORS.GRAY }]}>
                            <Text style={checked ? styles.txtSubmit : [styles.txtSubmit, {color: COLORS.BLACK}]}>
                                {Languages.Auth.txtSignIn}
                            </Text>
                        </Touchable>
                    </View>
                </ScrollViewWithKeyboard>
                {data &&
                  <PopupSignIn
                    ref={modalRef}
                    onConfirm={actionYes}
                    title={Languages.Auth.knowChannel}
                    data={data}
                  />}
                {isLoading && <Loading isOverview/>}
            </View>
        );
    };

    return (
        <View style={{flex: 1}}>
            {!isNavigate ? <OtpSign phone={'0862319100'} check={true}/> : renderView()}
        </View>
    );
});

export default SignIn;
