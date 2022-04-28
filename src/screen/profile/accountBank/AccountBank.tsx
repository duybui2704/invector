import { observer } from 'mobx-react';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { KeyboardAvoidingView, Platform, Text, View } from 'react-native';
import HTMLView from 'react-native-htmlview';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';

import LinkIC from '@/assets/image/ic_ischecked_save_acc.svg';
import ViettinIC from '@/assets/image/ic_logo_viettin_bank.svg';
import ArrowIC from '@/assets/image/ic_right_arrow.svg';
import NotLinkIC from '@/assets/image/ic_unchecked_save_acc.svg';
import { ENUM_TYPE_CARD_BANK } from '@/common/constants';
import Languages from '@/common/Languages';
import { Button } from '@/components/elements/button';
import { BUTTON_STYLES } from '@/components/elements/button/constants';
import { MyTextInput } from '@/components/elements/textfield';
import { TextFieldActions } from '@/components/elements/textfield/types';
import { Touchable } from '@/components/elements/touchable';
import HeaderBar from '@/components/header';
import HideKeyboard from '@/components/HideKeyboard';
import PickerBankValuation from '@/components/PickerBankValuation';
import { PopupActionTypes } from '@/models/typesPopup';
import { COLORS, HtmlStyles } from '@/theme';
import FormValidate from '@/utils/FormValidate';
import { MyStylesAccountBank } from './styles';
import ScrollViewWithKeyboard from '@/components/scrollViewWithKeyboard';
import { useAppStore } from '@/hooks';
import { DataBanksModal } from '@/models/payment-link-models';
import SessionManager from '@/manager/SessionManager';
import { ItemProps } from '@/models/common-model';
import ToastUtils from '@/utils/ToastUtils';
import Loading from '@/components/loading';

const AccountBank = observer(() => {
    const { apiServices } = useAppStore();
    const styles = MyStylesAccountBank();
    const [dataBanks, setDataBanks] = useState<ItemProps[]>([]);
    const [banks, setBanks] = useState<string>(SessionManager.userInfo?.tra_lai?.bank_name || '');
    const [accountNumber, setAccountNumber] = useState<string>(SessionManager.userInfo?.tra_lai?.interest_receiving_account || '');
    const [ATMNumber, setATMNumber] = useState<string>(SessionManager.userInfo?.tra_lai?.interest_receiving_account || '');
    const [accountProvider, setAccountProvider] = useState<string>(SessionManager.userInfo?.tra_lai?.name_bank_account || '');
    const [active, setActive] = useState<boolean>(true);
    const [type, setType] = useState<string>( ENUM_TYPE_CARD_BANK.ACCOUNT_NUMBER || '');
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const accountNumberRef = useRef<TextFieldActions>(null);
    const ATMNumberRef = useRef<TextFieldActions>(null);
    const accountProviderRef = useRef<TextFieldActions>(null);
    const bankRef = useRef<PopupActionTypes>(null);

    const fetchBankList = useCallback(async () => {
        const res = await apiServices.paymentMethod.getBank();
        if (res.success) {
            const data = res.data as DataBanksModal[];
            const temp = data?.map((item) => {
                return { id: item?.bank_code, value: item?.short_name };
            }) as ItemProps[];
            setDataBanks(temp);
        }
    }, [apiServices.paymentMethod]);

    useEffect(() => {
        fetchBankList();
    }, []);

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
                isPassword={false}
                maxLength={length}
                value={_text}
                onChangeText={onChange}
                hasUnderline={false}
                placeHolderColor={COLORS.GRAY_16}
            />
        </View>;
    }, [onChangeText, styles.containerStyle, styles.groupInput, styles.inputStyle, styles.pwd, styles.title]);

    const renderAccBank = useCallback((title?: string, status?: boolean) => {

        const onType = () => {
            setActive( title === ENUM_TYPE_CARD_BANK.ACCOUNT_NUMBER);
            switch (title) {
                case ENUM_TYPE_CARD_BANK.ACCOUNT_NUMBER:
                    setType(ENUM_TYPE_CARD_BANK.ACCOUNT_NUMBER);
                    break;
                case ENUM_TYPE_CARD_BANK.ATM_NUMBER:
                    setType(ENUM_TYPE_CARD_BANK.ATM_NUMBER);
                    break;
                default:
                    break;
            }
        };
        return (
            <Touchable style={styles.rowContainerItemInputChoose} onPress={onType} >
                {status?
                    <LinkIC width={24} height={24} /> :
                    <NotLinkIC width={24} height={24} />
                }
                <Text style={styles.textChooseToInput}>{title}</Text>
            </Touchable>
        );
    }, [styles.rowContainerItemInputChoose, styles.textChooseToInput]);

    const onBanksChoose = useCallback((item?: any) => {
        setBanks(item?.id);
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

    const onAddAccount = useCallback(async() => {
        setIsLoading(true);
        if (onValidate()) {
            const res = await apiServices.paymentMethod.requestChoosePaymentReceiveInterest('bank', banks ,accountNumber, accountProvider, 2);
            if(res.success){
                ToastUtils.showSuccessToast(Languages.msgNotify.successAccountLinkBank);
                setIsLoading(false);
            }
            else {
                ToastUtils.showErrorToast(Languages.msgNotify.failAccountLinkBank);
            }
        }
        setIsLoading(false);
    }, [accountNumber, accountProvider, apiServices.paymentMethod, banks, onValidate]);

    return (
        <BottomSheetModalProvider>
            <HideKeyboard style={styles.container}>
                <View style={styles.container}>
                    <HeaderBar isLight={false} title={Languages.paymentMethod.bank} hasBack />
                    <ScrollViewWithKeyboard showsVerticalScrollIndicator={false}>
                        <View style={styles.wrapAllContent}>
                            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                                <Text style={styles.txtBankChoose}>{Languages.accountBank.bankChoose}</Text>
                                <PickerBankValuation
                                    ref={bankRef}
                                    data={dataBanks}
                                    value={banks}
                                    placeholder={Languages.accountBank.bankChoose}
                                    onPressItem={onBanksChoose}
                                    btnContainer={styles.rowItemFilter}
                                    containerStyle={styles.containerItemFilter}
                                    hasDash
                                    styleText={styles.valuePicker}
                                    stylePlaceholder={styles.placeHolderPicker}
                                    leftIcon={<ViettinIC />}
                                    rightIcon={<ArrowIC />}
                                />
                                <View style={styles.rowContainerAllInputChoose}>
                                    {renderAccBank(Languages.accountBank.accountNumber, type === ENUM_TYPE_CARD_BANK.ACCOUNT_NUMBER)}
                                    {renderAccBank(Languages.accountBank.ATMNumber, type === ENUM_TYPE_CARD_BANK.ATM_NUMBER)}
                                </View>
                                {active ? renderInput(Languages.accountBank.accountNumber, Languages.accountBank.accountNumber, accountNumber, accountNumberRef, 'NUMBER', 15) :
                                    renderInput(Languages.accountBank.ATMNumber, Languages.accountBank.ATMNumber, ATMNumber, ATMNumberRef, 'NUMBER', 15)}
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
                    </ScrollViewWithKeyboard>
                    {isLoading && <Loading isOverview/>}
                </View >
            </HideKeyboard>
        </BottomSheetModalProvider>
    );
});

export default AccountBank;

