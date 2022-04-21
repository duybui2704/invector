import { observer } from 'mobx-react';
import React, { useCallback, useRef } from 'react';
import { Text, View } from 'react-native';

import BankIC from '@/assets/image/ic_bank.svg';
import LinkIC from '@/assets/image/ic_ischecked_save_acc.svg';
import NotLinkIC from '@/assets/image/ic_unchecked_save_acc.svg';
import VimoIC from '@/assets/image/ic_vimo.svg';
import WarnIC from '@/assets/image/ic_warn_vimo_red_round.svg';
import Languages from '@/common/Languages';
import ScreenName from '@/common/screenNames';
import { Touchable } from '@/components/elements/touchable';
import HeaderBar from '@/components/header';
import PopupNotifyNoAction from '@/components/PopupNotifyNoAction';
import { PopupActionTypes } from '@/models/typesPopup';
import Navigator from '@/routers/Navigator';
import { MyStylesPaymentMethod } from './styles';

const PaymentMethod = observer(() => {
    const styles = MyStylesPaymentMethod();
    const vimoRef = useRef<PopupActionTypes>();

    const onPopupVimoAgree = useCallback(() => {
    },[]);

    const popupVimo = useCallback((ref?: any, icon?: any) => {
        return (
            <PopupNotifyNoAction
                ref = {ref}
                renderIcon = {icon}
                renderTitle = {Languages.paymentMethod.cancelLinkVimo}
                renderContent = {Languages.paymentMethod.contentCancelLinkVimo}
                containerAllBtn = {styles.containerAllBtnPopup}
                containerAgreeBtn = {styles.containerItemBtnPopup}
                containerCancelBtn = {styles.containerCancelBtnPopup}
                textCancel = {styles.textCancel}
                hasButton
                onConfirm={onPopupVimoAgree}
            />
        );
    }, [onPopupVimoAgree, styles.containerAllBtnPopup, styles.containerCancelBtnPopup, styles.containerItemBtnPopup, styles.textCancel]);

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

    const onVimo = useCallback((status?: boolean) => {
        if (status) {
            vimoRef.current?.show();
        }else {
            Navigator.pushScreen(ScreenName.confirmPhone);
        }
    }, []);

    const onBank = useCallback(() => {
        Navigator.pushScreen(ScreenName.accountBank);
    }, []);

    const renderItemMethod = useCallback((leftIcon?: any, title?: string, status?: boolean) => {
        const _onPress = () => {
            switch (title) {
                case Languages.paymentMethod.vimo:
                    onVimo(status);
                    break;
                case Languages.paymentMethod.bank:
                    onBank();
                    break;
                default:
                    break;
            }
        };
        return (
            <Touchable style={styles.wrapItemPayment} onPress={_onPress}>
                {leftIcon}
                <View style={styles.wrapRightItemPayment}>
                    <View>
                        <Text style={styles.titleItemLink}>{`${title}`}</Text>
                        {renderStateLink(status)}
                    </View>
                    {renderRightIcon(status)}
                </View>
            </Touchable>
        );
    }, [onBank, onVimo, renderRightIcon, renderStateLink, styles.titleItemLink, styles.wrapItemPayment, styles.wrapRightItemPayment]);

    return (
        <View style={styles.container}>
            <HeaderBar isLight={false} title={Languages.account.payMethod} hasBack />
            <View style={styles.wrapAllContent}>
                <Text style={styles.txtMethodChoose}>{Languages.paymentMethod.methodChoose}</Text>
                {renderItemMethod(<VimoIC />, Languages.paymentMethod.vimo, false)}
                {renderItemMethod(<BankIC />, Languages.paymentMethod.bank, true)}
            </View>
            {popupVimo(vimoRef,<WarnIC/>)}
        </View >
    );
});

export default PaymentMethod;
