import { observer } from 'mobx-react';
import React, { useCallback, useRef, useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from 'react-native';

import { BUTTON_STYLES } from '@/components/elements/button/constants';
import { Button } from '@/components/elements/button/index';
import { MyTextInput } from '@/components/elements/textfield/index';
import { TextFieldActions } from '@/components/elements/textfield/types';
import { useAppStore } from '@/hooks';
import { COLORS, Styles } from '@/theme';
import FormValidate from '@/utils/FormValidate';
import ToastUtils from '@/utils/ToastUtils';
import Navigator from '@/routers/Navigator';
import Languages from '@/common/Languages';
import screenNames from '@/common/screenNames';
import HeaderBar from '@/components/header';
import { Configs } from '@/common/Configs';
import { EventEmitter } from '@/utils/EventEmitter';
import { Events } from '@/common/constants';
import HideKeyboard from '@/components/HideKeyboard';

const ChangePwd = observer(() => {
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
                    isPassword
                    inputStylePwDIcon={styles.pwd}
                    maxLength={15}
                    value={_text}
                    onChangeText={onChange}
                    hasUnderline={false} />

            </View>;
        }
        return null;
    }, [onChangeText]);

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
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.GRAY_5
    },
    group: {
        paddingTop: 20,
        paddingRight: 15,
        paddingLeft: 15
    },
    groupInput: {
        marginBottom: 20
    },
    title: {
        ...Styles.typography.regular,
        marginBottom: 5
    },
    containerStyle: {
        backgroundColor: COLORS.WHITE,
        borderRadius: 30,
        alignItems: 'center'
    },
    containerDisableStyle: {
        backgroundColor: COLORS.TRANSPARENT,
        borderRadius: 30,
        alignItems: 'center'
    },
    inputStyle: {
        ...Styles.typography.regular,
        paddingVertical: 20,
        fontSize: Configs.FontSize.size14
    },
    button: {
        paddingHorizontal: 15
    },
    pwd: {
        top: 0
    },
    btnStyle: {
        borderRadius: 30
    }
});

