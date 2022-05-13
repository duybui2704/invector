import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { observer } from 'mobx-react';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import AvatarIC from '@/assets/image/ic_edit_avatar_large.svg';
import { isIOS } from '@/common/Configs';
import Languages from '@/common/Languages';
import { Button } from '@/components/elements/button';
import { BUTTON_STYLES } from '@/components/elements/button/constants';
import { MyTextInput } from '@/components/elements/textfield';
import { TextFieldActions } from '@/components/elements/textfield/types';
import HeaderBar from '@/components/header';
import HideKeyboard from '@/components/HideKeyboard';
import PhotoPickerBottomSheet from '@/components/PhotoPickerBottomSheet';
import { useAppStore } from '@/hooks';
import SessionManager from '@/manager/SessionManager';
import { typePhoto } from '@/mocks/data';
import { UpLoadImage } from '@/models/common-model';
import FormValidate from '@/utils/FormValidate';
import ImageUtils from '@/utils/ImageUtils';
import ToastUtils from '@/utils/ToastUtils';
import Utils from '@/utils/Utils';
import { MyStylesEditAccountInfo } from './styles';
import { UpdateInfoModal } from '@/models/user-models';
import ScrollViewWithKeyboard from '@/components/scrollViewWithKeyboard';
import DatePickerTransaction from '@/components/DatePicker';
import DateUtils from '@/utils/DateUtils';

const EditAccountInfo = observer(() => {
    const { apiServices, userManager } = useAppStore();
    const styles = MyStylesEditAccountInfo();
    const [name, setName] = useState<string>(userManager.userInfo?.full_name || '');
    const [emailUser, setEmail] = useState<string>(userManager.userInfo?.email || '');
    const [phone, setPhone] = useState<string>(userManager.userInfo?.phone_number || '');
    const [genderUser, setGender] = useState<string>(userManager.userInfo?.gender || '');
    const [addressUser, setAddress] = useState<string>(userManager.userInfo?.address || '');
    const [jobUser, setJob] = useState<string>(userManager.userInfo?.job || '');
    const [birthday, setBirthday] = useState<any>(userManager.userInfo?.birth_date || '');
    const [birthdayValue, setBirthdayValue] = useState<string>(userManager.userInfo?.birth_date || '');
    const [avatarAcc, setAvatarAcc] = useState<UpLoadImage>();
    const [errText, setErrText] = useState<string>('');

    const avatarRef = useRef<BottomSheetModal>();
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

    const onPressItemFrontPhoto = useCallback((item: any) => {
        if (item?.value === 'Camera') {
            ImageUtils.openCamera(setAvatarAcc);
        } else {
            ImageUtils.openLibrary(setAvatarAcc, 1);
        }
    }, []);

    const renderPhotoPicker = useCallback((ref: any, image: any, icon: any, imageSource?: string) => {
        return <PhotoPickerBottomSheet
            ref={ref}
            data={typePhoto}
            image={image}
            icon={icon}
            title={Languages.accountInfo.chooseAvatarUser}
            onPressItem={onPressItemFrontPhoto}
            containerStyle={icon ? styles.circleWrap : styles.noCircleWrap}
            containerImage={styles.noCircleWrap}
            hasDash
            imageSource={imageSource}
        />;
    }, [onPressItemFrontPhoto, styles.circleWrap, styles.noCircleWrap]);

    const renderBirthday = useMemo(() => {
        const onConfirmValue = async (date: Date) => {
            setBirthday(date);
            setBirthdayValue(`${DateUtils.formatMMDDYYYYPicker(date?.toDateString())}`);
        };
        return (
            <View style={styles.wrapBirthday}>
                <Text style={styles.labelBirthdayStyle}>{Languages.accountInfo.birthday}</Text>
                <DatePickerTransaction
                    title={Languages.accountInfo.birthday}
                    onConfirmDatePicker={onConfirmValue}
                    onDateChangeDatePicker={setBirthday}
                    date={birthday || new Date()}
                    maximumDate={new Date()}
                    errMessage={errText}
                    placeHolderStyle={!birthdayValue ?styles.placeHolderBirthday : styles.placeHolderValueBirthday}
                />
            </View>
        );
    }, [birthday, birthdayValue, errText, styles.labelBirthdayStyle, styles.placeHolderBirthday, styles.placeHolderValueBirthday, styles.wrapBirthday]);

    const onValidate = useCallback(() => {
        const errMsgName = FormValidate.userNameValidate(name);
        const errMsgGender = FormValidate.genderValidate(genderUser);
        const errMsgBirthday = FormValidate.birthdayValidate(birthdayValue);
        const errMsgPhone = FormValidate.passConFirmPhone(phone);
        const errMsgPwdEmail = FormValidate.emailValidate(emailUser);
        const errMsgAddress = FormValidate.addressValidate(addressUser);
        const errMsgJob = FormValidate.jobValidate(jobUser);

        nameRef.current?.setErrorMsg(errMsgName);
        genderRef.current?.setErrorMsg(errMsgGender);
        setErrText(errMsgBirthday);
        phoneRef.current?.setErrorMsg(errMsgPhone);
        emailRef.current?.setErrorMsg(errMsgPwdEmail);
        addressRef.current?.setErrorMsg(errMsgAddress);
        jobRef.current?.setErrorMsg(errMsgJob);
        if (`${errMsgName}${errMsgGender}${errMsgBirthday}${errMsgPhone}${errMsgPwdEmail}${errMsgAddress}${errMsgJob}`.length === 0) {
            return true;
        } return false;
    }, [addressUser, birthdayValue, emailUser, genderUser, jobUser, name, phone]);

    const onSaveInfo = useCallback(async () => {
        if (onValidate()) {
            const res = await apiServices.auth.updateUserInf(
                name,
                genderUser,
                birthdayValue,
                phone,
                emailUser,
                addressUser,
                jobUser,
                avatarAcc ? {
                    ...avatarAcc?.images?.[0],
                    uri: isIOS ? avatarAcc?.images?.[0]?.path?.replace('file://', '') : avatarAcc?.images?.[0]?.path,
                    type: avatarAcc?.images?.[0]?.mime,
                    name: Utils.getFileName(avatarAcc?.images?.[0])
                } : null
            );
            if (res.success) {
                const resData = res.data as UpdateInfoModal;
                ToastUtils.showSuccessToast(Languages.accountInfo.successEdit);
                userManager.updateUserInfo({
                    ...userManager.userInfo,
                    full_name: name,
                    avatar_user: resData?.url_avatar,
                    gender: genderUser,
                    birth_date: birthdayValue,
                    phone_number: phone,
                    email: emailUser,
                    address: addressUser,
                    job: jobUser
                });
            }
        }
    }, [addressUser, apiServices.auth, avatarAcc, birthdayValue, emailUser, genderUser, jobUser, name, onValidate, phone, userManager]);

    const renderInfoAcc = useMemo(() => {
        return (
            <View style={styles.wrapContent}>
                {renderKeyFeature(nameRef, Languages.accountInfo.fullName, Utils.formatForEachWordCase(name), 'DEFAULT', false, 50)}
                {renderKeyFeature(genderRef, Languages.accountInfo.gender, Utils.formatForEachWordCase(genderUser), 'DEFAULT', false, 3)}
                {renderBirthday}
                {renderKeyFeature(phoneRef, Languages.accountInfo.phoneNumber, phone, 'PHONE', true, 10)}
                {renderKeyFeature(emailRef, Languages.accountInfo.email, emailUser, 'EMAIL', false, 50)}
                {renderKeyFeature(addressRef, Languages.accountInfo.address, Utils.formatForEachWordCase(addressUser), 'DEFAULT', false, 100)}
                {renderKeyFeature(jobRef, Languages.accountInfo.job, Utils.formatForEachWordCase(jobUser), 'DEFAULT', false, 50)}
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
    }, [addressUser, emailUser, genderUser, jobUser, name, onSaveInfo, phone, renderBirthday, renderKeyFeature, styles.accuracyWrap, styles.wrapContent, styles.wrapEdit]);

    return (
        <View style={styles.container}>
            <View style={styles.container}>
                <HeaderBar isLight={false} title={Languages.accountInfo.editAcc} hasBack />
                <HideKeyboard>
                    <ScrollViewWithKeyboard>
                        <View style={styles.topContainer}>
                            {renderPhotoPicker(avatarRef,
                                avatarAcc,
                                <AvatarIC />,
                                SessionManager.userInfo?.avatar_user)}
                        </View>
                        {renderInfoAcc}
                    </ScrollViewWithKeyboard>
                </HideKeyboard>
            </View>
        </View>
    );
});

export default EditAccountInfo;
