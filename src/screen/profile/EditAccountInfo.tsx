import { SCREEN_WIDTH } from '@gorhom/bottom-sheet';
import { observer } from 'mobx-react';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { ScrollView } from 'react-native-gesture-handler';

import AvatarIC from '@/assets/image/ic_edit_avatar_large.svg';
import Languages from '@/common/Languages';
import { Button } from '@/components/elements/button';
import { BUTTON_STYLES } from '@/components/elements/button/constants';
import { MyTextInput } from '@/components/elements/textfield';
import { TextFieldActions } from '@/components/elements/textfield/types';
import HeaderBar from '@/components/header';
import SessionManager from '@/manager/SessionManager';
import { dataUser } from '@/mocks/data';
import { COLORS, Styles } from '@/theme';
import FormValidate from '@/utils/FormValidate';


const EditAccountInfo = observer(() => {
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [phone, setPhone] = useState<string>('');
    const [gender, setGender] = useState<string>('');
    const [address, setAddress] = useState<string>('');
    const [job, setJob] = useState<string>('');
    const [birthday, setBirthday] = useState<string>('');

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

    const renderKeyFeature = useCallback((ref: any, label: string, value: any, keyboardType?: any, disabled?:boolean) => {
        return (
            <View style={styles.wrapInput}>
                <Text style={styles.labelStyle}>{label}</Text>
                <MyTextInput
                    ref={ref}
                    isPhoneNumber={false}
                    placeHolder={label}
                    keyboardType={keyboardType}
                    value={value}
                    onChangeText={onChangeText}
                    containerInput={ styles.inputStyle}
                    disabled={disabled}
                />
            </View>
        );
    }, [onChangeText]);

    const onValidate = useCallback(() => {
        const errMsgName = FormValidate.userNameValidate(name);
        const errMsgGender = FormValidate.genderValidate(gender);
        const errMsgBirthday = FormValidate.birthdayValidate(birthday);
        const errMsgPhone = FormValidate.passConFirmPhone(phone);
        const errMsgPwdEmail = FormValidate.emailValidate(email);
        const errMsgAddress = FormValidate.addressValidate(address);
        const errMsgJob = FormValidate.jobValidate(job);

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
    }, [address, birthday, email, gender, job, name, phone]);

    const onSaveInfo = useCallback(() => {
        if (onValidate()) {
            console.log('name = ', name);
        }
    }, [name, onValidate]);


    const renderInfoAcc = useMemo(() => {
        return (
            <View style={styles.wrapContent}>
                {renderKeyFeature(nameRef, Languages.accountInfo.fullName, name)}
                {renderKeyFeature(genderRef, Languages.accountInfo.gender, gender)}
                {renderKeyFeature(birthdayRef, Languages.accountInfo.birthday, birthday)}
                {renderKeyFeature(phoneRef, Languages.accountInfo.phoneNumber, SessionManager.savePhone?.toString(), 'PHONE', true)}
                {renderKeyFeature(emailRef, Languages.accountInfo.email, email, 'EMAIL')}
                {renderKeyFeature(addressRef, Languages.accountInfo.address, address)}
                {renderKeyFeature(jobRef, Languages.accountInfo.job, job)}
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
    }, [address, birthday, email, gender, job, name, onSaveInfo, renderKeyFeature]);

    return (
        <View style={styles.container}>
            <HeaderBar isLight={false} title={Languages.accountInfo.editAcc} hasBack />
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.topContainer}>
                    {!dataUser.avatar ?
                        <AvatarIC style={styles.circleWrap} />
                        :
                        <FastImage
                            style={styles.circleWrap}
                            source={{
                                uri: dataUser?.avatar
                            }}
                            resizeMode={FastImage.resizeMode.cover}
                        />
                    }
                </View>
                {renderInfoAcc}
            </ScrollView>
        </View>
    );
});

export default EditAccountInfo;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.GRAY_5
    },
    wrapContent: {
        marginTop: 16
    },
    wrapEdit: {
        paddingHorizontal: 16,
        width: '100%',
        paddingTop: 25,
        paddingBottom: 20
    },
    topContainer: {
        paddingVertical: 6,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    wrapInput: {
        justifyContent: 'space-between',
        width: '100%',
        paddingHorizontal: 16,
        paddingBottom: 5
    },

    accuracyWrap: {
        width: '100%',
        borderRadius: 70,
        alignItems: 'center',
        marginTop: 5,
        paddingVertical: 8
    },
    txtAccuracy: {
        ...Styles.typography.medium,
        color: COLORS.GREEN,
        paddingHorizontal: 40
    },

    circleWrap: {
        width: SCREEN_WIDTH * 0.4 - 25,
        height: SCREEN_WIDTH * 0.4 - 25,
        borderRadius: 70,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: COLORS.GREEN
    },
    inputStyle: {
        borderWidth: 1,
        borderColor: COLORS.GRAY_11,
        borderRadius: 30,
        marginVertical: 5
    },
    labelStyle: {
        ...Styles.typography.regular,
        color: COLORS.GRAY_7
    }
});
