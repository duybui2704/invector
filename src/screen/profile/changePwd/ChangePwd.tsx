import { observer } from 'mobx-react';
import React, { useCallback, useRef, useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, Text, View } from 'react-native';

import { Events } from '@/common/constants';
import Languages from '@/common/Languages';
import screenNames from '@/common/screenNames';
import { BUTTON_STYLES } from '@/components/elements/button/constants';
import { Button } from '@/components/elements/button/index';
import { MyTextInput } from '@/components/elements/textfield/index';
import { TextFieldActions } from '@/components/elements/textfield/types';
import HeaderBar from '@/components/header';
import HideKeyboard from '@/components/HideKeyboard';
import { useAppStore } from '@/hooks';
import Navigator from '@/routers/Navigator';
import { EventEmitter } from '@/utils/EventEmitter';
import FormValidate from '@/utils/FormValidate';
import ToastUtils from '@/utils/ToastUtils';
import { MyStylesChangePwd } from './styles';
import arrayIcon from '@/common/arrayIcon';


const ChangePwd = observer(() => {
    const styles = MyStylesChangePwd();
    const { userManager } = useAppStore();

    const [oldPwd, setOldPwd] = useState<string>('');
    const [newPwd, setNewPwd] = useState<string>('');
    const [currentNewPwd, setCurrentNewPwd] = useState<string>('');
    const [hasPass, setHasPass] = useState<boolean>(!!userManager.userInfo?.password);

    const oldRef = useRef<TextFieldActions>(null);
    const newRef = useRef<TextFieldActions>(null);
    const currentRef = useRef<TextFieldActions>(null);

    const onChangeText = useCallback((value?: any, tag?: any) => {
        switch (tag) {
            case Languages.changePwd.oldPass:
                setOldPwd(value);
                break;
            case Languages.changePwd.newPass:
                setNewPwd(value);
                break;
            case Languages.changePwd.currentNewPass:
                setCurrentNewPwd(value);
                break;
            default:
                break;
        }
    }, []);

    const renderInput = useCallback((_title?: any, _placeHolder?: any, _text?: string, _ref?: any, visible?: boolean, disabled?: boolean) => {
        const onChange = (text: string) => {
            onChangeText(text, _title);
        };
        if (visible) {
            return <View style={styles.groupInput}>
                <Text style={styles.title}>{_title}</Text>
                <MyTextInput
                    ref={_ref}
                    placeHolder={_placeHolder}
                    containerInput={disabled ? styles.containerStyle : styles.containerDisableStyle}
                    inputStyle={styles.inputStyle}
                    isPassword={true}
                    inputStylePwDIcon={styles.pwd}
                    maxLength={50}
                    value={_text}
                    keyboardType={'DEFAULT'}
                    onChangeText={onChange}
                    hasUnderline={false}
                    rightIcon={arrayIcon.login.pass}
                />
            </View>;
        }
        return null;
    }, [onChangeText, styles.containerDisableStyle, styles.containerStyle, styles.groupInput, styles.inputStyle, styles.pwd, styles.title]);

    const onChangeValidation = useCallback(
        () => {
            const oldPwdValidation = FormValidate.passValidate(oldPwd);
            const newPwdValidation = FormValidate.passValidate(newPwd);
            const currentPwdValidation = FormValidate.passConFirmValidate(newPwd, currentNewPwd);
            oldRef.current?.setErrorMsg(oldPwdValidation);
            newRef.current?.setErrorMsg(newPwdValidation);
            currentRef.current?.setErrorMsg(currentPwdValidation);

            if (`${oldPwdValidation}${currentPwdValidation}${newPwdValidation}`.length === 0) {
                return true;
            }
            return false;
        },
        [newPwd, currentNewPwd, oldPwd]
    );

    const logout = useCallback(() => {
        userManager.updateUserInfo(null);
        Navigator.navigateScreen(screenNames.invest);
    }, [userManager]);

    const onPressChange = useCallback(async () => {
        if (onChangeValidation()) {
            EventEmitter.emit(Events.LOGOUT, logout);
            ToastUtils.showSuccessToast(Languages.changePwd.successNotify);
        }
    }, [logout, onChangeValidation]);

    return (
        <HideKeyboard style={styles.container}>
            <View style={styles.container}>
                <HeaderBar
                    title={hasPass ? Languages.changePwd.title : Languages.changePwd.title} hasBack />
                <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                    <ScrollView>
                        <View style={styles.group}>
                            {renderInput(Languages.changePwd.oldPass, Languages.changePwd.placeOldPass, oldPwd, oldRef, !hasPass, true)}
                            {renderInput(Languages.changePwd.newPass, Languages.changePwd.placeNewPass, newPwd, newRef, true, true)}
                            {renderInput(Languages.changePwd.currentNewPass, Languages.changePwd.currentNewPass, currentNewPwd, currentRef, true, !!newPwd)}
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
                <View style={styles.button}>
                    <Button
                        label={`${Languages.changePwd.confirmPwd}`}
                        buttonStyle={!!oldPwd && newPwd && currentNewPwd ? BUTTON_STYLES.GREEN : BUTTON_STYLES.GRAY}
                        onPress={onPressChange}
                        isLowerCase
                        style={styles.btnStyle}
                    />
                </View>
            </View>
        </HideKeyboard>
    );
});

export default ChangePwd;
