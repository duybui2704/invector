import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { observer } from 'mobx-react';
import React, { useCallback, useRef, useState } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, Text, View } from 'react-native';
import HTMLView from 'react-native-htmlview';

import ViettinIC from '@/assets/image/ic_logo_viettin_bank.svg';
import ArrowIC from '@/assets/image/ic_right_arrow.svg';
import LinkIC from '@/assets/image/ic_ischecked_save_acc.svg';
import NotLinkIC from '@/assets/image/ic_unchecked_save_acc.svg';
import { Configs } from '@/common/Configs';
import Languages from '@/common/Languages';
import { MyTextInput } from '@/components/elements/textfield';
import { TextFieldActions } from '@/components/elements/textfield/types';
import HeaderBar from '@/components/header';
import { dataBank } from '@/mocks/data';
import { COLORS, HtmlStyles, Styles } from '@/theme';
import { Touchable } from '@/components/elements/touchable';
import { ENUM_TYPE_CARD_BANK } from '@/common/constants';
import { Button } from '@/components/elements/button';
import { BUTTON_STYLES } from '@/components/elements/button/constants';
import FormValidate from '@/utils/FormValidate';
import PickerBankValuation from '@/components/PickerBankValuation';
import { PopupActionTypes } from '@/models/typesPopup';
import HideKeyboard from '@/components/HideKeyboard';

const AccountBank = observer(() => {
    const [banks, setBanks] = useState<string>('');
    const [accountNumber, setAccountNumber] = useState<string>('');
    const [ATMNumber, setATMNumber] = useState<string>('');
    const [accountProvider, setAccountProvider] = useState<string>('');
    const [active, setActive] = useState<boolean>();

    const accountNumberRef = useRef<TextFieldActions>(null);
    const ATMNumberRef = useRef<TextFieldActions>(null);
    const accountProviderRef = useRef<TextFieldActions>(null);
    const bankRef = useRef<PopupActionTypes>(null);

    const onChangeText = useCallback((value?: any, tag?: any) => {
        switch (tag) {
            case Languages.accountBank.accountNumber:
                return setAccountNumber(value);
            case Languages.accountBank.ATMNumber:
                return setATMNumber(value);
            case Languages.accountBank.accountProvider:
                return setAccountProvider(value);
            default:
                return null;
        }
    }, []);

    const renderInput = useCallback((_title?: any, _placeHolder?: any, _text?: string, _ref?: any, typeKeyboard?: any, length?: number) => {
        const onChange = (text: string) => {
            onChangeText(text, _title);
        };
        return <View style={styles.groupInput}>
            <Text style={styles.title}>{_title}</Text>
            <MyTextInput
                ref={_ref}
                placeHolder={_placeHolder}
                keyboardType={typeKeyboard}
                containerInput={styles.containerStyle}
                inputStyle={styles.inputStyle}
                inputStylePwDIcon={styles.pwd}
                maxLength={length}
                value={_text}
                onChangeText={onChange}
                hasUnderline={false}
                placeHolderColor={COLORS.GRAY_16}
            />
        </View>;
    }, [onChangeText]);

    const renderAccBank = useCallback((title?: string, status?: boolean) => {
        const onType = () => {
            setActive(title === ENUM_TYPE_CARD_BANK.ACCOUNT_NUMBER);
        };
        return (
            <Touchable style={styles.rowContainerItemInputChoose} onPress={onType}>
                {status ?
                    <LinkIC width={24} height={24} /> :
                    <NotLinkIC width={24} height={24} />
                }
                <Text style={styles.textChooseToInput}>{title}</Text>
            </Touchable>
        );
    }, []);

    const onBanksChoose = useCallback((item?: any) => {
        setBanks(item?.value);
    }, []);

    const onValidate = useCallback(() => {
        const errMsgBank = FormValidate.inputValidate(banks, Languages.errorMsg.errBankEmpty);
        const errMsgAccNumber = FormValidate.inputValidate(accountNumber, Languages.errorMsg.errStkEmpty, Languages.errorMsg.errStk, 16);
        const errMsgATMNumber = FormValidate.inputValidate(ATMNumber, Languages.errorMsg.errStkEmpty, Languages.errorMsg.errStk, 16);
        const errMsgName = FormValidate.inputNameEmpty(accountProvider, Languages.errorMsg.errNameEmpty, Languages.errorMsg.userNameRegex);

        accountNumberRef.current?.setErrorMsg(errMsgAccNumber);
        ATMNumberRef.current?.setErrorMsg(errMsgATMNumber);
        accountProviderRef.current?.setErrorMsg(errMsgName);
        bankRef.current?.setErrorMsg(errMsgBank);

        if (
            `${errMsgAccNumber}${errMsgATMNumber}${errMsgName}${errMsgBank}`.length === 0
        ) {
            return true;
        }
        return false;
    }, [ATMNumber, accountNumber, accountProvider, banks]);

    const onAddAccount = useCallback(() => {
        if (onValidate()) {
            // console.log();
        }
    }, [onValidate]);

    return (
        <BottomSheetModalProvider>
            <HideKeyboard style={styles.container}>
                <View style={styles.container}>
                    <HeaderBar isLight={false} title={Languages.paymentMethod.bank} hasBack />
                    <View style={styles.wrapAllContent}>
                        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                            <Text style={styles.txtBankChoose}>{Languages.accountBank.bankChoose}</Text>
                            <PickerBankValuation
                                ref={bankRef}
                                data={dataBank}
                                value={banks}
                                placeholder={Languages.accountBank.bankChoose}
                                onPressItem={onBanksChoose}
                                btnContainer={styles.rowItemFilter}
                                containerStyle={styles.containerItemFilter}
                                hasDash
                                styleText={styles.valuePicker}
                                stylePlaceholder={styles.placeHolderPicker}
                                leftIcon={<ViettinIC/>}
                                rightIcon= {<ArrowIC/>}
                            />
                            <View style={styles.rowContainerAllInputChoose}>
                                {renderAccBank(Languages.accountBank.accountNumber, true)}
                                {renderAccBank(Languages.accountBank.ATMNumber, true)}
                            </View>
                            {active ? renderInput(Languages.accountBank.accountNumber, Languages.accountBank.accountNumber, accountNumber, accountNumberRef, 'NUMBER') :
                                renderInput(Languages.accountBank.ATMNumber, Languages.accountBank.ATMNumber, ATMNumber, ATMNumberRef, 'NUMBER')}
                            {renderInput(Languages.accountBank.accountProvider, Languages.accountBank.accountProviderName, accountProvider, accountProviderRef)}
                        </KeyboardAvoidingView>
                        <HTMLView
                            value={Languages.accountBank.noteAccountBank}
                            stylesheet={HtmlStyles || undefined} />

                        <Button label={Languages.accountBank.addAccount}
                            buttonStyle={banks && accountNumber && accountProvider && ATMNumber ? BUTTON_STYLES.GREEN : BUTTON_STYLES.GRAY}
                            isLowerCase
                            onPress={onAddAccount}
                        />
                    </View>
                </View >
            </HideKeyboard>
        </BottomSheetModalProvider>
    );
});

export default AccountBank;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.GRAY_5
    },
    wrapAllContent: {
        paddingHorizontal: 16,
        paddingTop: 10
    },
    txtBankChoose: {
        ...Styles.typography.regular,
        color: COLORS.GRAY_7,
        fontSize: Configs.FontSize.size14
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
    groupInput: {
        marginBottom: 20
    },
    pwd: {
        top: 0
    },
    rowContainerAllInputChoose: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 12
    },
    rowContainerItemInputChoose: {
        flexDirection: 'row',
        marginRight: 20
    },
    textChooseToInput: {
        ...Styles.typography.regular,
        color: COLORS.GRAY_7,
        paddingLeft: 10
    },
    containerItemFilter: {
        marginBottom: 10
    },
    rowItemFilter: {
        backgroundColor: COLORS.WHITE,
        width: '100%',
        borderColor: COLORS.GRAY_11,
        borderRadius: 20,
        marginVertical: 8,
        paddingVertical: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderWidth: 1,
        alignItems: 'center',
        paddingHorizontal: 16
    },
    valuePicker: {
        ...Styles.typography.regular,
        color: COLORS.GRAY_1
    },
    placeHolderPicker: {
        ...Styles.typography.regular,
        color: COLORS.GRAY_16
    }
});
