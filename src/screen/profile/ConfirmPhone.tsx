import { observer } from 'mobx-react';
import React, { useCallback, useRef, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import HTMLView from 'react-native-htmlview';

import Languages from '@/common/Languages';
import HeaderBar from '@/components/header';
import { COLORS, HtmlStyles, Styles } from '@/theme';
import VimoIC from '@/assets/image/ic_logo_vimo_large.svg';
import HumanIC from '@/assets/image/ic_human.svg';
import { MyTextInput } from '@/components/elements/textfield';
import { TextFieldActions } from '@/components/elements/textfield/types';
import { Configs } from '@/common/Configs';
import { Button } from '@/components/elements/button';
import { BUTTON_STYLES } from '@/components/elements/button/constants';
import FormValidate from '@/utils/FormValidate';
import HideKeyboard from '@/components/HideKeyboard';
import Navigator from '@/routers/Navigator';
import ScreenName from '@/common/screenNames';

const ConfirmPhone = observer(() => {
    const [phone, setPhone] = useState<string>('');
    const phoneRef = useRef<TextFieldActions>(null);

    const renderInput = useCallback((_title?: any, _placeHolder?: any, _text?: string, _ref?: any, leftIcon?: any) => {
        const onChange = (text: string) => {
            setPhone(text);
        };
        return <View style={styles.groupInput}>
            <Text style={styles.title}>{_title}</Text>
            <MyTextInput
                ref={_ref}
                placeHolder={_placeHolder}
                keyboardType={'NUMBER'}
                containerInput={styles.containerStyle}
                inputStyle={styles.inputStyle}
                maxLength={10}
                value={_text}
                onChangeText={onChange}
                hasUnderline={false}
                leftIcon={leftIcon}
            />
        </View>;
    }, []);

    const onValidation = useCallback(
        () => {
            const phoneValidate = FormValidate.passConFirmPhone(phone);
            phoneRef.current?.setErrorMsg(phoneValidate);

            if (`${phoneValidate}`.length === 0) {
                return true;
            }
            return false;
        },
        [phone]
    );

    const onSendOTP = useCallback(() => {
        if (onValidation()) {
            Navigator.pushScreen(ScreenName.verifyOTP, {phoneNumber: phone});
        }
    }, [onValidation, phone]);

    return (
        <HideKeyboard style={styles.container}>
            <View style={styles.container}>
                <HeaderBar isLight={false} title={Languages.confirmPhone.confirmPhone} hasBack />
                <View style={styles.logo}>
                    <VimoIC />
                </View>
                <View style={styles.wrapAllContent}>
                    <HTMLView
                        value={Languages.confirmPhone.noteConfirmPhone}
                        stylesheet={HtmlStyles || undefined}
                    />
                    {renderInput(Languages.confirmPhone.phone, Languages.confirmPhone.inputPhone, phone, phoneRef, <HumanIC />)}
                    <Button label={Languages.confirmPhone.sendOTP}
                        buttonStyle={BUTTON_STYLES.GREEN}
                        isLowerCase
                        onPress={onSendOTP}
                    />
                </View>
            </View>
        </HideKeyboard >
    );
});

export default ConfirmPhone;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.GRAY_5,
        justifyContent: 'center'
    },
    wrapAllContent: {
        flex: 2,
        paddingHorizontal: 16,
        paddingTop: 10,
        marginBottom: 140
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
    inputStyle: {
        ...Styles.typography.regular,
        paddingVertical: 20,
        fontSize: Configs.FontSize.size14
    },
    groupInput: {
        marginBottom: 30
    },
    logo: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});
