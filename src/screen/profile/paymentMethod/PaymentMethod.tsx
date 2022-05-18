import { observer } from 'mobx-react';
import React, { useCallback, useState } from 'react';
import { Text, View } from 'react-native';

import BankIC from '@/assets/image/ic_bank.svg';
import LinkIC from '@/assets/image/ic_isChecked_save_acc.svg';
import NotLinkIC from '@/assets/image/ic_unchecked_save_acc.svg';
import VimoIC from '@/assets/image/ic_vimo.svg';
import Languages from '@/common/Languages';
import ScreenName from '@/common/screenNames';
import { Touchable } from '@/components/elements/touchable';
import HeaderBar from '@/components/header';
import Navigator from '@/routers/Navigator';
import { MyStylesPaymentMethod } from './styles';
import { useAppStore } from '@/hooks';
import { TYPE_INTEREST_RECEIVE_ACC } from '@/common/constants';
import ToastUtils from '@/utils/ToastUtils';
import Loading from '@/components/loading';

const PaymentMethod = observer(() => {
    const { apiServices, userManager } = useAppStore();
    const styles = MyStylesPaymentMethod();
    const [isLoading, setLoading] = useState<boolean>(false);

    const renderStateLink = useCallback((status?: boolean) => {
        return (
            <>
                {status ?
                    <Text style={styles.stateItemLink}>{Languages.linkSocialAcc.linked}</Text> :
                    <Text style={[styles.stateItemLink, styles.redText]}>{Languages.linkSocialAcc.notLinked}</Text>
                }
            </>
        );
    }, [styles.redText, styles.stateItemLink]);

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

    const onBank = useCallback(() => {
        Navigator.pushScreen(ScreenName.accountBank);
    }, []);

    const onChangeMethodVimo = useCallback(async () => {
        setLoading(true);
        const res = await apiServices.paymentMethod.requestChoosePaymentReceiveInterest(TYPE_INTEREST_RECEIVE_ACC.VIMO);
        if (res.success) {
            setLoading(false);
            ToastUtils.showSuccessToast(Languages.msgNotify.successChangeMethod);
        }
        setLoading(false);
    }, [apiServices.paymentMethod]);

    const renderItemMethod = useCallback((leftIcon?: any, title?: string, activeMethod?: boolean, disabled?: boolean) => {
        const _onPressToChooseMethod = () => {
            switch (title) {
                case Languages.paymentMethod.vimo:
                    onChangeMethodVimo();
                    break;
                case Languages.paymentMethod.bank:
                    onBank();
                    break;
                default:
                    break;
            }
        };
        return (
            <Touchable style={activeMethod ? styles.wrapItemPaymentChooser : styles.wrapItemPayment}
                onPress={_onPressToChooseMethod}
                disabled={disabled}>
                {leftIcon}
                <View style={styles.wrapRightItemPayment}>
                    <View >
                        <Text style={styles.titleItemLink}>{`${title}`}</Text>
                        {renderStateLink(activeMethod)}
                    </View>
                    {renderRightIcon(activeMethod)}
                </View>
            </Touchable>
        );
    }, [onBank, onChangeMethodVimo, renderRightIcon, renderStateLink, styles.titleItemLink, styles.wrapItemPayment, styles.wrapItemPaymentChooser, styles.wrapRightItemPayment]);

    return (
        <View style={styles.container}>
            <HeaderBar isLight={false} title={Languages.account.payMethod} hasBack />
            <View style={styles.wrapAllContent}>
                <Text style={styles.txtMethodChoose}>{Languages.paymentMethod.methodChoose}</Text>
                {renderItemMethod(<VimoIC />,
                    Languages.paymentMethod.vimo,
                    userManager.userInfo?.tra_lai?.type_interest_receiving_account === TYPE_INTEREST_RECEIVE_ACC.VIMO,
                    userManager.userInfo?.tra_lai?.type_interest_receiving_account === TYPE_INTEREST_RECEIVE_ACC.VIMO
                )}
                {renderItemMethod(<BankIC />,
                    Languages.paymentMethod.bank,
                    userManager.userInfo?.tra_lai?.type_interest_receiving_account === TYPE_INTEREST_RECEIVE_ACC.BANK,
                    false
                )}
            </View>
            {isLoading && <Loading isOverview />}
        </View >
    );
});

export default PaymentMethod;
