import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { observer } from 'mobx-react';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { Text, View } from 'react-native';

import AvatarIC from '@/assets/image/ic_edit_avatar_large.svg';
import Languages from '@/common/Languages';
import { Button } from '@/components/elements/button';
import { BUTTON_STYLES } from '@/components/elements/button/constants';
import { MyTextInput } from '@/components/elements/textfield';
import { TextFieldActions } from '@/components/elements/textfield/types';
import HeaderBar from '@/components/header';
import HideKeyboard from '@/components/HideKeyboard';
import PhotoPickerBottomSheet from '@/components/PhotoPickerBottomSheet';
import { useAppStore } from '@/hooks';
import { typeGender, typePhoto } from '@/mocks/data';
import { ItemProps, UpLoadImage } from '@/models/common-model';
import FormValidate from '@/utils/FormValidate';
import ImageUtils from '@/utils/ImageUtils';
import ToastUtils from '@/utils/ToastUtils';
import Utils from '@/utils/Utils';
import { MyStylesEditAccountInfo } from './styles';
import { UpdateInfoModal } from '@/models/user-models';
import ScrollViewWithKeyboard from '@/components/scrollViewWithKeyboard';
import DatePickerTransaction from '@/components/DatePicker';
import DateUtils from '@/utils/DateUtils';
import PickerBankValuation from '@/components/PickerBankValuation';
import { PopupActionTypes } from '@/models/typesPopup';
import Navigator from '@/routers/Navigator';
import Loading from '@/components/loading';

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
    const [avatarUrl, setAvatarUrl] = useState<string>(userManager.userInfo?.avatar_user || '');
    const [errText, setErrText] = useState<string>('');
    const [isLoading, setLoading] = useState<boolean>(false);

    const avatarRef = useRef<BottomSheetModal>();
    const nameRef = useRef<TextFieldActions>();
    const emailRef = useRef<TextFieldActions>();
    const phoneRef = useRef<TextFieldActions>();
    const genderRef = useRef<PopupActionTypes>();
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

    const onPressItemFrontPhoto = useCallback((item: ItemProps) => {
        if (item?.text === 'Camera') {
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

    const renderBirthday = useCallback((disable?: boolean) => {
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
                    containerDate={disable ? styles.containerDateDisable : styles.containerDate}
                    placeHolderStyle={!birthdayValue ? styles.placeHolderBirthday : styles.placeHolderValueBirthday}
                    disabled={disable}
                />
            </View>
        );
    }, [birthday, birthdayValue, errText, styles.containerDate, styles.containerDateDisable, styles.labelBirthdayStyle, styles.placeHolderBirthday, styles.placeHolderValueBirthday, styles.wrapBirthday]);

    const onGenderChoose = useCallback((item?: any) => {
        setGender(item?.value || '');
    }, []);

    const onValidate = useCallback(() => {
        const errMsgName = FormValidate.userNameValidate(name);
        const errMsgGender = FormValidate.genderValidate(genderUser);
        const errMsgBirthday = FormValidate.birthdayValidate(birthdayValue);
        const errMsgPhone = FormValidate.passConFirmPhone(phone);
        const errMsgPwdEmail = FormValidate.emailValidate(emailUser);
        const errMsgAddress = FormValidate.addressValidate(addressUser);
        const errMsgJob = FormValidate.jobValidate(jobUser);

        genderRef.current?.setErrorMsg(errMsgGender);
        nameRef.current?.setErrorMsg(errMsgName);
        setErrText(errMsgBirthday);
        phoneRef.current?.setErrorMsg(errMsgPhone);
        emailRef.current?.setErrorMsg(errMsgPwdEmail);
        addressRef.current?.setErrorMsg(errMsgAddress);
        jobRef.current?.setErrorMsg(errMsgJob);

        if (`${errMsgName}${errMsgGender}${errMsgBirthday}${errMsgPhone}${errMsgPwdEmail}${errMsgAddress}${errMsgJob}`.length === 0) {
            return true;
        } return false;
    }, [addressUser, birthdayValue, emailUser, genderUser, jobUser, name, phone]);

    const renderGender = useCallback((disable?: boolean) => {
        return (
            <View style={styles.wrapBirthday}>
                <Text style={styles.labelBirthdayStyle}>{Languages.accountInfo.gender}</Text>
                <PickerBankValuation
                    ref={genderRef}
                    data={typeGender}
                    value={genderUser}
                    placeholder={Languages.accountInfo.gender}
                    onPressItem={onGenderChoose}
                    btnContainer={disable ? styles.rowItemFilterDisable : styles.rowItemFilter}
                    containerStyle={styles.containerItemFilter}
                    hasDash
                    wrapErrText={styles.textErrorGender}
                    styleText={disable ? styles.valuePickerDisable : styles.valuePicker}
                    stylePlaceholder={styles.placeHolderPicker}
                    disable={disable}
                />
            </View>
        );
    }, [genderUser, onGenderChoose, styles.containerItemFilter, styles.labelBirthdayStyle, styles.placeHolderPicker, styles.rowItemFilter, styles.rowItemFilterDisable, styles.textErrorGender, styles.valuePicker, styles.valuePickerDisable, styles.wrapBirthday]);

    const updateUserInformation = useCallback(async (avatar: any) => {
        setLoading(true);
        const res = await apiServices.auth.updateUserInf(
            avatar,
            name,
            genderUser,
            birthdayValue,
            phone,
            emailUser,
            addressUser,
            jobUser

        );
        setLoading(false);
        if (res.success) {
            const resData = res.data as UpdateInfoModal;
            ToastUtils.showSuccessToast(Languages.accountInfo.successEdit);
            userManager.updateUserInfo({
                ...userManager.userInfo,
                full_name: name,
                avatar_user: avatar,
                gender: genderUser,
                // birth_date: birthdayValue,
                phone_number: phone,
                email: emailUser,
                address: addressUser,
                job: jobUser
            });
            Navigator.goBack();
        }
    }, [addressUser, apiServices.auth, birthdayValue, emailUser, genderUser, jobUser, name, phone, userManager]);

    const uploadImages = useCallback(async (file: any) => {
        const res = await apiServices?.image.uploadImage(
            file,
            Languages.errorMsg.uploading
        );
        if (res.success) {
            const data = res?.data;
            console.log('data = ', JSON.stringify(data));
            setAvatarUrl(data);
            updateUserInformation(data);
        }
    }, [apiServices?.image, updateUserInformation]);

    const onSaveInfo = useCallback(async () => {
        if (onValidate()) {
            if (avatarAcc) {
                uploadImages(avatarAcc?.images?.[0]);
            }
            else updateUserInformation(userManager.userInfo?.avatar_user);
        }
    }, [avatarAcc, onValidate, updateUserInformation, uploadImages, userManager.userInfo?.avatar_user]);

    const renderInfoAcc = useMemo(() => {
        return (
            <View style={styles.wrapContent}>
                {renderKeyFeature(nameRef, Languages.accountInfo.fullName, Utils.formatForEachWordCase(name), 'DEFAULT', false, 50)}
                {renderGender(!!userManager.userInfo?.gender)}
                {renderBirthday(!!userManager.userInfo?.birth_date)}
                {renderKeyFeature(phoneRef, Languages.accountInfo.phoneNumber, phone, 'PHONE', true, 10)}
                {renderKeyFeature(emailRef, Languages.accountInfo.email, emailUser, 'EMAIL', !!userManager.userInfo?.email, 50)}
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
    }, [addressUser, emailUser, jobUser, name, onSaveInfo, phone, renderBirthday, renderGender, renderKeyFeature, styles.accuracyWrap, styles.wrapContent, styles.wrapEdit, userManager.userInfo?.birth_date, userManager.userInfo?.email, userManager.userInfo?.gender]);

    return (
        <View style={styles.container}>
            <View style={styles.container}>
                <HeaderBar isLight={false} title={Languages.accountInfo.editAcc} hasBack />
                <HideKeyboard>
                    <ScrollViewWithKeyboard showsHorizontalScrollIndicator={false}>
                        <View style={styles.topContainer}>
                            {renderPhotoPicker(avatarRef,
                                avatarAcc,
                                <AvatarIC />,
                                userManager.userInfo?.avatar_user)}
                        </View>
                        {renderInfoAcc}
                        {isLoading && <Loading isOverview />}
                    </ScrollViewWithKeyboard>
                </HideKeyboard>
            </View>
        </View>
    );
});

export default EditAccountInfo;
