import { observer } from 'mobx-react';
import React, { useCallback, useEffect, useRef, useState } from 'react';
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
import SessionManager from '@/manager/SessionManager';
import { useAppStore } from '@/hooks';
import { InfoLinkVimoModal } from '@/models/user-models';
import { TYPE_INTEREST_RECEIVE_ACC } from '@/common/constants';
import ToastUtils from '@/utils/ToastUtils';

const PaymentMethod = observer(() => {
    const { apiServices } = useAppStore();
    const styles = MyStylesPaymentMethod();
    const vimoRef = useRef<PopupActionTypes>();
    const [dataInfoVimo, setDataInfoVimo] = useState<InfoLinkVimoModal>();
    const [paymentReceive, setpaymentReceive] = useState<string>(SessionManager.userInfo?.tra_lai?.type_interest_receiving_account || '');
    const [active, setActive] = useState<boolean>(!!paymentReceive);

    const fetchInfoVimoLink = useCallback(async () => {
        const res = await apiServices.paymentMethod.requestInfoLinkVimo(3);
        if (res.success) {
            const data = res.data as InfoLinkVimoModal;
            setDataInfoVimo(data);
        }
    }, [apiServices.paymentMethod]);

    useEffect(() => {
        fetchInfoVimoLink();
        if (paymentReceive === '') {
            setActive(false);
        }
    }, []);

    const onPopupVimoAgree = useCallback(async () => {
        const res = await apiServices.paymentMethod.requestCancelLinkVimo(3);
        if (res.success) {
            ToastUtils.showSuccessToast(Languages.msgNotify.successCancelLinkVimo);
            vimoRef.current?.hide();
        } else {
            ToastUtils.showSuccessToast(Languages.msgNotify.failCancelLinkVimo);
            vimoRef.current?.hide();
        }

    }, [apiServices.paymentMethod]);

    const popupVimo = useCallback((ref?: any, icon?: any) => {
        return (
            <PopupNotifyNoAction
                ref={ref}
                renderIcon={icon}
                renderTitle={Languages.paymentMethod.cancelLinkVimo}
                renderContent={Languages.paymentMethod.contentCancelLinkVimo}
                containerAllBtn={styles.containerAllBtnPopup}
                containerAgreeBtn={styles.containerItemBtnPopup}
                containerCancelBtn={styles.containerCancelBtnPopup}
                textCancel={styles.textCancel}
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
        } else {
            Navigator.pushScreen(ScreenName.confirmPhone);
        }
    }, []);

    const onBank = useCallback(() => {
        Navigator.pushScreen(ScreenName.accountBank);
    }, []);

    const renderItemMethod = useCallback((leftIcon?: any, title?: string, activeMethod?: boolean) => {
        const _onPress = () => {
            switch (title) {
                case Languages.paymentMethod.vimo:
                    onVimo(activeMethod);
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
                        {renderStateLink(activeMethod)}
                    </View>
                    {renderRightIcon(activeMethod)}
                </View>
            </Touchable>
        );
    }, [onBank, onVimo, renderRightIcon, renderStateLink, styles.titleItemLink, styles.wrapItemPayment, styles.wrapRightItemPayment]);

    return (
        <View style={styles.container}>
            <HeaderBar isLight={false} title={Languages.account.payMethod} hasBack />
            <View style={styles.wrapAllContent}>
                <Text style={styles.txtMethodChoose}>{Languages.paymentMethod.methodChoose}</Text>
                {renderItemMethod(<VimoIC />,
                    Languages.paymentMethod.vimo,
                    paymentReceive === TYPE_INTEREST_RECEIVE_ACC.VIMO
                )}
                {renderItemMethod(<BankIC />,
                    Languages.paymentMethod.bank,
                    paymentReceive === TYPE_INTEREST_RECEIVE_ACC.BANK
                )}
            </View>
            {popupVimo(vimoRef, <WarnIC />)}
        </View >
    );
});

export default PaymentMethod;
