import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { observer } from 'mobx-react';
import React, { useCallback, useRef, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import LinkIC from '@/assets/image/ic_ischecked_save_acc.svg';
import NotLinkIC from '@/assets/image/ic_unchecked_save_acc.svg';
import ICUnderArrow from '@/assets/image/ic_under_arrow.svg';
import { Configs } from '@/common/Configs';
import Languages from '@/common/Languages';
import { MyTextInput } from '@/components/elements/textfield';
import { TextFieldActions } from '@/components/elements/textfield/types';
import HeaderBar from '@/components/header';
import PickerBottomSheet from '@/components/PickerBottomSheet';
import { dataBank } from '@/mocks/data';
import { COLORS, Styles } from '@/theme';

const AccountBank = observer(() => {
    const [accountNumber, setAccountNumber] = useState<string>('');
    const [accountProvider, setAccountProvider] = useState<string>('');
    const [banks, setBanks] = useState<string>('');

    const accountNumberRef = useRef<TextFieldActions>(null);
    const accountProviderRef = useRef<TextFieldActions>(null);
    const bankRef = useRef<BottomSheetModal>(null);

    const onChangeText = useCallback((value?: any, tag?: any) => {
        switch (tag) {
            case Languages.accountBank.accountNumber:
                setAccountNumber(value);
                break;
            case Languages.accountBank.accountProvider:
                setAccountProvider(value);
                break;
            default:
                break;
        }
    }, []);

    const renderInput = useCallback((_title?: any, _placeHolder?: any, _text?: string, _ref?: any, disabled?: boolean) => {
        const onChange = (text: string) => {
            onChangeText(text, _title);
        };
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
                hasUnderline={false}
                placeHolderColor={COLORS.GRAY_16} 
            />
        </View>;
    }, [onChangeText]);

    const renderRightIcon = useCallback((status?: boolean) => {
        return (
            <>
                {status ?
                    <LinkIC width={24} height={24} /> :
                    <NotLinkIC width={24} height={24} />
                }
            </>
        );
    }, []);

    const renderAccBank = useCallback((title?: string, status?: boolean) => {
        return (
            <View style={styles.rowContainerItemInputChoose}>
                {renderRightIcon(status)}
                <Text style={styles.textChooseToInput}>{title}</Text>
            </View>
        );
    }, [renderRightIcon]);

    const onBank = useCallback(() => {

    }, []);

    const onBanksChoose = useCallback((item?: any) => {
        setBanks(item?.value);
    }, []);

    return (
        <View style={styles.container}>
            <HeaderBar isLight={false} title={Languages.paymentMethod.bank} hasBack />
            <View style={styles.wrapAllContent}>
                <Text style={styles.txtBankChoose}>{Languages.accountBank.bankChoose}</Text>
                <PickerBottomSheet
                    ref={bankRef}
                    data={dataBank}
                    value={banks}
                    placeholder={Languages.accountBank.bankChoose}
                    onPressItem={onBanksChoose}
                    btnContainer={styles.rowItemFilter}
                    valueText={styles.valuePicker}
                    rightIcon={<ICUnderArrow />}
                    containerStyle={styles.containerItemFilter}
                    placeholderStyle={styles.placeHolderPicker}
                />
                <View style={styles.rowContainerAllInputChoose}>
                    {renderAccBank(Languages.accountBank.accountNumber, true)}
                    {renderAccBank(Languages.accountBank.accountProvider, false)}
                </View>
                {renderInput(Languages.accountBank.accountNumber, Languages.accountBank.accountNumber, accountNumber, accountNumberRef)}
                {renderInput(Languages.accountBank.accountProvider, Languages.accountBank.accountProviderName, accountProvider, accountProviderRef)}
            </View>
        </View >
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
        marginBottom: -45
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
