import { observer } from 'mobx-react';
import React, { useState, useRef, useCallback, useMemo, useEffect } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { BottomSheetModal } from '@gorhom/bottom-sheet';

import IcLine from '@/assets/image/auth/ic_line_auth.svg';
import CheckIcon from '@/assets/image/ic_isChecked_save_acc.svg';
import UnCheckIcon from '@/assets/image/ic_unchecked_save_acc.svg';
import Languages from '@/common/Languages';
import arrayIcon from '@/common/arrayIcon';
import FormValidate from '@/utils/FormValidate';
import ICUnderArrow from '@/assets/image/ic_under_arrow.svg';
import { ItemProps } from '@/components/bottomSheet';
import { useAppStore } from '@/hooks';
import { ChannelModal } from '@/models/ChannelModal';
import { TextFieldActions } from '@/components/elements/textfield/types';
import { MyTextInput } from '@/components/elements/textfield';
import { Touchable } from '@/components/elements/touchable';
import { COLORS } from '@/theme';
import PickerBottomSheet from '@/components/PickerBottomSheet';
import { MyStylesSign } from './styles';
import OtpSignIn from '../otpSignIn';
import { UserInfoModal } from '@/models/user-models';
import Loading from '@/components/loading';
import HideKeyboard from '@/components/HideKeyboard';

const SignUp = observer(() => {
    const { apiServices } = useAppStore();
    const [phone, setPhone] = useState<string>('');
    const [pass, setPass] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [passNew, setPassNew] = useState<string>('');
    const [channel, setChannel] = useState<ItemProps>();
    const [dataChannel, setDataChannel] = useState<ItemProps[]>();
    // const [data, setData] = useState<any>('');
    const [isNavigate, setNavigate] = useState<boolean>(false);
    const styles = MyStylesSign();
    const refPhone = useRef<TextFieldActions>(null);
    const refName = useRef<TextFieldActions>(null);
    const refEmail = useRef<TextFieldActions>(null);
    const refChannel = useRef<BottomSheetModal>(null);
    const refPass = useRef<TextFieldActions>(null);
    const refPassNew = useRef<TextFieldActions>(null);
    const [checked, setCheck] = useState<boolean>(false);
    const [isLoading, setLoading] = useState<boolean>(false);
    const [userData, setUserData] = useState<UserInfoModal>();


    useEffect(() => {
        fetchData();
    }, [apiServices.auth]);

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
        const res = await apiServices.auth.getChanelSource();
        if (res.success) {
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

    const onValidate = useCallback(() => {
        const errMsgPhone = FormValidate.passConFirmPhone(phone);
        const errMsgPwd = FormValidate.passValidate(pass);
        const errMsgName = FormValidate.userNameValidate(name);
        const errMsgPwdNew = FormValidate.passConFirmValidate(pass, passNew);
        const errMsgPwdEmail = FormValidate.emailValidate(email);

        refPhone.current?.setErrorMsg(errMsgPhone);
        refPass.current?.setErrorMsg(errMsgPwd);
        refName.current?.setErrorMsg(errMsgName);
        refPassNew.current?.setErrorMsg(errMsgPwdNew);
        refEmail.current?.setErrorMsg(errMsgPwdEmail);
        if (`${errMsgPhone}${errMsgPwd}${errMsgName}`.length === 0) {
            return true;
        }
        return false;
    }, [channel, email, name, pass, passNew, phone]);

    const onSignIn = useCallback(async () => {
        if (onValidate()) {
            setLoading(true);
            const res = await apiServices.auth.registerAuth(phone, name, pass, passNew, email, channel?.value);
            setLoading(false);
            if (res.success) {
                setNavigate(true);
            }
        }
    }, [name, phone, pass, passNew, channel, email]);

    const onChangeChanel = (item: any) => {
        setChannel(item);
    };

    const renderInput = useCallback((
        ref: any, value: string, isPhoneNumber: boolean, rightIcon: string, placeHolder: string, maxLength: number, isPassword?: boolean, keyboardType?: any) => {
        return <MyTextInput
            ref={ref}
            value={value}
            isPhoneNumber={isPhoneNumber}
            maxLength={maxLength}
            rightIcon={rightIcon}
            placeHolder={placeHolder}
            containerInput={styles.inputPass}
            onChangeText={onChangeText}
            keyboardType={keyboardType}
            isPassword={isPassword}
        />;
    }, [styles.inputPass]);

    const renderView = () => {
        let isDisTouchable: boolean;
        if (!(phone !== '' && pass !== '' && passNew !== '' && email !== '' && channel !== '' && name !== '')) {
            isDisTouchable = false;
        } else {
            isDisTouchable = true;
        }

        return (
            <HideKeyboard>
                <View style={styles.content}>
                    <View style={styles.wrapLoginTxt}>
                        <Text style={styles.txtTitle}>{Languages.auth.txtSignUp}</Text>
                        <IcLine width={'50%'} height={'10%'} />
                    </View>
                    <ScrollView
                        style={styles.scrollView}
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
                    >
                        {renderInput(refName, name, false, arrayIcon.login.name, Languages.auth.txtName, 50, false)}
                        {renderInput(refPhone, phone, true, arrayIcon.login.phone, Languages.auth.txtPhone, 10, false, 'NUMBER')}
                        {renderInput(refEmail, email, false, arrayIcon.login.email, Languages.auth.txtEmail, 50, false, 'EMAIL')}
                        {renderInput(refPass, pass, false, arrayIcon.login.pass, Languages.auth.txtPass, 50, true)}
                        {renderInput(refName, passNew, false, arrayIcon.login.confirmPass, Languages.auth.txtConfirmPass, 50, true)}
                        <View style={styles.inputPass}>
                            <PickerBottomSheet
                                ref={refChannel}
                                containerStyle={styles.containerOverViewPicker}
                                rightIcon={<ICUnderArrow />}
                                placeholder={Languages.auth.knowChannel}
                                onPressItem={onChangeChanel}
                                value={channel?.value}
                                data={dataChannel}
                                valueText={styles.valuePicker}
                                btnContainer={styles.containerPicker}
                                placeholderStyle={styles.containerPlaceholderPicker}
                            />
                        </View>
                        <View style={styles.rowInfo}>
                            <View style={styles.row}>
                                <Touchable style={styles.checkbox} onPress={onChangeChecked}>
                                    {checkbox}
                                </Touchable>
                                <Text style={styles.txtSave}>{Languages.auth.saveAcc}</Text>
                            </View>
                            <Touchable onPress={onSignIn} disabled={!isDisTouchable}
                                style={isDisTouchable ? styles.tobLogin : [styles.tobLogin, { backgroundColor: COLORS.GRAY_13 }]}>
                                <Text style={isDisTouchable ? styles.txtSubmit : [styles.txtSubmit, { color: COLORS.GRAY_12 }]}>
                                    {Languages.auth.txtSignUp}
                                </Text>
                            </Touchable>
                        </View>
                    </ScrollView>
                    {isLoading && <Loading isOverview />}
                </View>
            </HideKeyboard>
        );
    };

    return (
        <HideKeyboard>
            <View style={styles.container}>
                {isNavigate ? <OtpSignIn phone={phone} isChecked={checked} pass={pass} /> : renderView()}
            </View>
        </HideKeyboard>
    );
});

export default SignUp;
