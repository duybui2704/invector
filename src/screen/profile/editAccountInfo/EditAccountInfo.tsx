import { observer } from 'mobx-react';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { Text, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { ScrollView } from 'react-native-gesture-handler';

import AvatarIC from '@/assets/image/ic_edit_avatar_large.svg';
import Languages from '@/common/Languages';
import { Button } from '@/components/elements/button';
import { BUTTON_STYLES } from '@/components/elements/button/constants';
import { MyTextInput } from '@/components/elements/textfield';
import { TextFieldActions } from '@/components/elements/textfield/types';
import HeaderBar from '@/components/header';
import HideKeyboard from '@/components/HideKeyboard';
import SessionManager from '@/manager/SessionManager';
import FormValidate from '@/utils/FormValidate';
import { MyStylesEditAccountInfo } from './styles';
import { useAppStore } from '@/hooks';
import ToastUtils from '@/utils/ToastUtils';

const EditAccountInfo = observer(() => {
    const {apiServices, userManager} = useAppStore();
    const styles = MyStylesEditAccountInfo();
    const [name, setName] = useState<string>(SessionManager.userInfo?.full_name || '');
    const [emailUser, setEmail] = useState<string>(SessionManager.userInfo?.email || '');
    const [phone, setPhone] = useState<string>(SessionManager.userInfo?.phone_number || '');
    const [genderUser, setGender] = useState<string>(SessionManager.userInfo?.gender || '');
    const [addressUser, setAddress] = useState<string>(SessionManager.userInfo?.address || '');
    const [jobUser, setJob] = useState<string>(SessionManager.userInfo?.job || '');
    const [birthday, setBirthday] = useState<string>(SessionManager.userInfo?.birth_date || '');

    const nameRef = useRef<TextFieldActions>();
    const emailRef = useRef<TextFieldActions>();
    const phoneRef = useRef<TextFieldActions>();
    const birthdayRef = useRef<TextFieldActions>();
    const genderRef = useRef<TextFieldActions>();
    const addressRef = useRef<TextFieldActions>();
    const jobRef = useRef<TextFieldActions>();

    const onChangeText = useCallback((value?: any, tag?: any) => {
        switch (tag) {
            case Languages.accountInfo.fullName:
                setName(value);
                break;
            case Languages.accountInfo.gender:
                setGender(value);
                break;
            case Languages.accountInfo.birthday:
                setBirthday(value);
                break;
            case Languages.accountInfo.phoneNumber:
                setPhone(value);
                break;
            case Languages.accountInfo.email:
                setEmail(value);
                break;
            case Languages.accountInfo.address:
                setAddress(value);
                break;
            case Languages.accountInfo.job:
                setJob(value);
                break;
            default:
                break;
        }
    }, []);

    const renderKeyFeature = useCallback((ref: any, label: string, value: any, keyboardType?: any, disabled?: boolean, maxLength?: number) => {
        return (
            <View style={styles.wrapInput}>
                <Text style={styles.labelStyle}>{label}</Text>
                <MyTextInput
                    ref={ref}
                    isPhoneNumber={false}
                    placeHolder={label}
                    keyboardType={keyboardType}
                    value={value}
                    maxLength={maxLength}
                    onChangeText={onChangeText}
                    containerInput={styles.inputStyle}
                    disabled={disabled}
                />
            </View>
        );
    }, [onChangeText, styles.inputStyle, styles.labelStyle, styles.wrapInput]);

    const onValidate = useCallback(() => {
        const errMsgName = FormValidate.userNameValidate(name);
        const errMsgGender = FormValidate.genderValidate(genderUser);
        const errMsgBirthday = FormValidate.birthdayValidate(birthday);
        const errMsgPhone = FormValidate.passConFirmPhone(phone);
        const errMsgPwdEmail = FormValidate.emailValidate(emailUser);
        const errMsgAddress = FormValidate.addressValidate(addressUser);
        const errMsgJob = FormValidate.jobValidate(jobUser);

        nameRef.current?.setErrorMsg(errMsgName);
        genderRef.current?.setErrorMsg(errMsgGender);
        birthdayRef.current?.setErrorMsg(errMsgBirthday);
        phoneRef.current?.setErrorMsg(errMsgPhone);
        emailRef.current?.setErrorMsg(errMsgPwdEmail);
        addressRef.current?.setErrorMsg(errMsgAddress);
        jobRef.current?.setErrorMsg(errMsgJob);
        if (`${errMsgName}${errMsgGender}${errMsgBirthday}${errMsgPhone}${errMsgPwdEmail}${errMsgAddress}${errMsgJob}`.length === 0) {
            return true;
        } return false;
    }, [addressUser, birthday, emailUser, genderUser, jobUser, name, phone]);

    const onSaveInfo = useCallback(async() => {
        if (onValidate()) {
            const res = await apiServices.auth.updateUserInf(name, genderUser,birthday, phone, emailUser, addressUser, jobUser);
            if(res.success){
                userManager.updateUserInfo({
                    ...userManager.userInfo,
                    full_name: name,
                    gender: genderUser,
                    birth_date: birthday,
                    phone_number: phone,
                    email: emailUser,
                    address: addressUser,
                    job: jobUser
                });
                ToastUtils.showSuccessToast(Languages.accountInfo.editAcc);
            }
            
        }
    }, [addressUser, apiServices.auth, birthday, emailUser, genderUser, jobUser, name, onValidate, phone, userManager]);


    const renderInfoAcc = useMemo(() => {
        return (
            <View style={styles.wrapContent}>
                {renderKeyFeature(nameRef, Languages.accountInfo.fullName, name)}
                {renderKeyFeature(genderRef, Languages.accountInfo.gender, genderUser, 'DEFAULT', false, 3)}
                {renderKeyFeature(birthdayRef, Languages.accountInfo.birthday, birthday)}
                {renderKeyFeature(phoneRef, Languages.accountInfo.phoneNumber, phone, 'PHONE', true)}
                {renderKeyFeature(emailRef, Languages.accountInfo.email, emailUser, 'EMAIL')}
                {renderKeyFeature(addressRef, Languages.accountInfo.address, addressUser)}
                {renderKeyFeature(jobRef, Languages.accountInfo.job, jobUser)}
                <View style={styles.wrapEdit}>
                    <Button
                        style={styles.accuracyWrap}
                        onPress={onSaveInfo}
                        label={Languages.accountInfo.save}
                        buttonStyle={BUTTON_STYLES.GREEN_1}
                        isLowerCase />
                </View>
            </View>
        );
    }, [addressUser, birthday, emailUser, genderUser, jobUser, name, onSaveInfo, phone, renderKeyFeature, styles.accuracyWrap, styles.wrapContent, styles.wrapEdit]);

    return (
        <View style={styles.container}>
            <View style={styles.container}>
                <HeaderBar isLight={false} title={Languages.accountInfo.editAcc} hasBack />
                <HideKeyboard>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View style={styles.topContainer}>
                            {!SessionManager?.userInfo?.avatar ?
                                <AvatarIC style={styles.circleWrap} />
                                :
                                <FastImage
                                    style={styles.circleWrap}
                                    source={{
                                        uri: SessionManager?.userInfo?.avatar
                                    }}
                                    resizeMode={FastImage.resizeMode.cover}
                                />
                            }
                        </View>
                        {renderInfoAcc}
                    </ScrollView>
                </HideKeyboard>
            </View>
        </View>
    );
});

export default EditAccountInfo;
