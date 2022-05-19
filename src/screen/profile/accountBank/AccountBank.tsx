import { observer } from 'mobx-react';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { KeyboardAvoidingView, Platform, Text, View } from 'react-native';
import HTMLView from 'react-native-htmlview';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import LinkIC from '@/assets/image/ic_isChecked_save_acc.svg';
import ViettinIC from '@/assets/image/ic_logo_viettin_bank.svg';
import ArrowIC from '@/assets/image/ic_right_arrow.svg';
import NotLinkIC from '@/assets/image/ic_unchecked_save_acc.svg';
import { ENUM_TYPE_CARD_BANK, TYPE_INTEREST_RECEIVE_ACC } from '@/common/constants';
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
import { ItemProps } from '@/models/common-model';
import ToastUtils from '@/utils/ToastUtils';
import Loading from '@/components/loading';
import { UserInfoModal } from '@/models/user-models';
import { DataBanksModal } from '@/models/payment-link-models';
import Utils from '@/utils/Utils';
import Navigator from '@/routers/Navigator';

const AccountBank = observer(() => {
    const { apiServices, userManager } = useAppStore();
    const styles = MyStylesAccountBank();
    const [dataBanks, setDataBanks] = useState<ItemProps[]>([]);
    const [banks, setBanks] = useState<string>(userManager.userInfo?.tra_lai?.bank_name || '');
    const [nameBank, setNameBank] = useState<string>(userManager.userInfo?.tra_lai?.bank_name || '');
    const [accountNumber, setAccountNumber] = useState<string>(userManager.userInfo?.tra_lai?.interest_receiving_account || '');
    const [ATMNumber, setATMNumber] = useState<string>(userManager.userInfo?.tra_lai?.interest_receiving_account || '');
    const [typeCard, setTypeCard] = useState<number>(userManager.userInfo?.tra_lai?.type_card || 1);
    const [accountProvider, setAccountProvider] = useState<string>(userManager.userInfo?.tra_lai?.name_bank_account || '');
    const [type, setType] = useState<string>(ENUM_TYPE_CARD_BANK.ACCOUNT_NUMBER || '');
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const accountNumberRef = useRef<TextFieldActions>(null);
    const ATMNumberRef = useRef<TextFieldActions>(null);
    const accountProviderRef = useRef<TextFieldActions>(null);
    const bankRef = useRef<PopupActionTypes>(null);

    useEffect(() => {
        fetchBankList();
    }, []);

    const fetchBankList = useCallback(async () => {
        const res = await apiServices.paymentMethod.getBank();
        if (res.success) {
            const data = res.data as DataBanksModal[];
            const temp = data?.map((item) => {
                return { id: item?.bank_code, value: item?.name, text: item?.short_name };
            }) as ItemProps[];
            const firstName = temp?.filter((item) => {
                return item?.id === nameBank;
            }) as ItemProps[];
            setNameBank(`${firstName?.[0]?.value || ''}${firstName?.[0]?.value ? ' - ' : ''}${firstName?.[0]?.text || ''}`);
            setDataBanks(temp);
        }
    }, [apiServices.paymentMethod, nameBank]);

    const onChangeText = useCallback(async (value?: any, tag?: any) => {
        switch (tag) {
            case Languages.accountBank.accountNumber:
                return setAccountNumber(value);
            case Languages.accountBank.ATMNumber:
                return setATMNumber(value);
            case Languages.accountBank.accountProvider:
                return setAccountProvider(Utils.formatForEachWordCase(value));
            default:
                return null;
        }
    }, []);

    const renderInput = useCallback((_title?: string, _placeHolder?: string, _text?: string, _ref?: any, typeKeyboard?: any, length?: number) => {
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

    const onPressType = useCallback((_title?: string) => {
        switch (_title) {
            case Languages.accountBank.accountNumber:
                setType(ENUM_TYPE_CARD_BANK.ACCOUNT_NUMBER);
                setTypeCard(1);
                break;
            case Languages.accountBank.ATMNumber:
                setType(ENUM_TYPE_CARD_BANK.ATM_NUMBER);
                setTypeCard(2);
                break;
            default:
                setType(ENUM_TYPE_CARD_BANK.ACCOUNT_NUMBER);
                setTypeCard(1);
                break;
        }
    }, []);

    const renderAccBank = useCallback((title?: string, status?: boolean) => {

        const onType = () => {
            onPressType(title);
        };

        return (
            <Touchable style={styles.rowContainerItemInputChoose} onPress={onType} disabled={status} >
                {status ?
                    <LinkIC width={20} height={20} /> :
                    <NotLinkIC width={20} height={20} />
                }
                <Text style={styles.textChooseToInput}>{title}</Text>
            </Touchable>
        );
    }, [onPressType, styles.rowContainerItemInputChoose, styles.textChooseToInput]);

    const onBanksChoose = useCallback((item?: ItemProps) => {
        setBanks(item?.id || '');
        setNameBank(`${item?.value}${' - '}${item?.text}` || '');
    }, []);

    const onValidate = useCallback(() => {
        const errMsgBank = FormValidate.inputEmpty(banks, Languages.errorMsg.errBankEmpty);
        const errMsgAccNumber = FormValidate.inputValidate(accountNumber, Languages.errorMsg.errStkEmpty, '', 16, true);
        const errMsgATMNumber = FormValidate.inputValidate(ATMNumber, Languages.errorMsg.errStkEmpty, '', 19, false, true);
        const errMsgName = FormValidate.inputNameEmpty(Utils.formatForEachWordCase(accountProvider), Languages.errorMsg.errNameEmpty, Languages.errorMsg.userNameRegex);

        accountNumberRef.current?.setErrorMsg(errMsgAccNumber);
        ATMNumberRef.current?.setErrorMsg(errMsgATMNumber);
        accountProviderRef.current?.setErrorMsg(errMsgName);
        bankRef.current?.setErrorMsg(errMsgBank);

        if (
            `${errMsgAccNumber}${errMsgName}${errMsgBank}`.length === 0
        ) {
            return true;
        }
        return false;
    }, [ATMNumber, accountNumber, accountProvider, banks]);

    const onAddAccount = useCallback(async () => {
        setIsLoading(true);
        if (onValidate()) {
            const res = await apiServices.paymentMethod.requestChoosePaymentReceiveInterest(
                TYPE_INTEREST_RECEIVE_ACC.BANK,
                banks,
                typeCard === 1 ? accountNumber : ATMNumber,
                accountProvider,
                typeCard
            );
            if (res.success) {
                ToastUtils.showSuccessToast(Languages.msgNotify.successAccountLinkBank);
                setIsLoading(false);
                const resUser = await apiServices.auth.getUserInfo();
                if (resUser.success) {
                    const user = resUser.data as UserInfoModal;
                    userManager.updateUserInfo({
                        ...userManager.userInfo,
                        ...user
                    });
                    Navigator.goBack();
                }
            }
        }
        setIsLoading(false);
    }, [ATMNumber, accountNumber, accountProvider, apiServices.auth, apiServices.paymentMethod, banks, onValidate, typeCard, userManager]);

    return (
        <GestureHandlerRootView style={styles.container}>
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
                                        value={nameBank}
                                        placeholder={Languages.accountBank.bankChoose}
                                        onPressItem={onBanksChoose}
                                        btnContainer={styles.rowItemFilter}
                                        containerStyle={styles.containerItemFilter}
                                        hasDash
                                        hasInput
                                        isValueBank
                                        styleText={styles.valuePicker}
                                        stylePlaceholder={styles.placeHolderPicker}
                                        leftIcon={<ViettinIC />}
                                        rightIcon={<ArrowIC />}
                                    />
                                    <View style={styles.rowContainerAllInputChoose}>
                                        {renderAccBank(Languages.accountBank.accountNumber,
                                            typeCard === 1)}
                                        {renderAccBank(Languages.accountBank.ATMNumber,
                                            typeCard === 2)}
                                    </View>
                                    {typeCard === 1 ?
                                        renderInput(
                                            Languages.accountBank.accountNumber,
                                            Languages.accountBank.accountNumber,
                                            accountNumber,
                                            accountNumberRef,
                                            'NUMBER',
                                            16
                                        ) :
                                        renderInput(
                                            Languages.accountBank.ATMNumber,
                                            Languages.accountBank.ATMNumber,
                                            ATMNumber,
                                            ATMNumberRef,
                                            'NUMBER',
                                            16
                                        )
                                    }

                                    {renderInput(
                                        Languages.accountBank.accountProvider,
                                        Languages.accountBank.accountProviderName,
                                        accountProvider,
                                        accountProviderRef,
                                        'DEFAULT',
                                        50)
                                    }
                                </KeyboardAvoidingView>
                                <HTMLView
                                    value={Languages.accountBank.noteAccountBank}
                                    stylesheet={HtmlStyles || undefined} />

                                <Button label={Languages.accountBank.addAccount}
                                    buttonStyle={nameBank && accountProvider && (accountNumber || ATMNumber) ? BUTTON_STYLES.GREEN : BUTTON_STYLES.GRAY}
                                    isLowerCase
                                    onPress={onAddAccount}
                                    disabled={!nameBank || !accountProvider || (!accountNumber || !ATMNumber)}
                                    style={styles.wrapBtnAddAcc}
                                />
                            </View>
                        </ScrollViewWithKeyboard>
                        {isLoading && <Loading isOverview />}
                    </View >
                </HideKeyboard>
            </BottomSheetModalProvider>
        </GestureHandlerRootView>
    );
});

export default AccountBank;

