import { observer } from 'mobx-react';
import React, { useCallback, useMemo, useRef } from 'react';
import { StyleSheet, View, Text } from 'react-native';

import LinkIC from '@/assets/image/ic_ischecked_save_acc.svg';
import NotLinkIC from '@/assets/image/ic_unchecked_save_acc.svg';
import VimoIC from '@/assets/image/ic_vimo.svg';
import BankIC from '@/assets/image/ic_bank.svg';
import WarnIC from '@/assets/image/ic_warn_vimo_red_round.svg';
import Languages from '@/common/Languages';
import HeaderBar from '@/components/header';
import { COLORS, Styles } from '@/theme';
import { Configs } from '@/common/Configs';
import { Touchable } from '@/components/elements/touchable';
import { PopupActionTypes } from '@/models/typesPopup';
import PopupNotifyNoAction from '@/components/PopupNotifyNoAction';
import Navigator from '@/routers/Navigator';
import ScreenName from '@/common/screenNames';

const PaymentMethod = observer(() => {

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
    }, [onPopupVimoAgree]);

    const renderStateLink = useCallback((status?: boolean) => {
        return (
            <>
                {status ?
                    <Text style={styles.stateItemLink}>{Languages.linkSocialAcc.linked}</Text> :
                    <Text style={[styles.stateItemLink, styles.redText]}>{Languages.linkSocialAcc.notLinked}</Text>
                }
            </>
        );
    }, []);

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
    }, [onBank, onVimo, renderRightIcon, renderStateLink]);

    return (
        <View style={styles.container}>
            <HeaderBar isLight={false} title={Languages.account.payMethod} hasBack />
            <View style={styles.wrapAllContent}>
                <Text style={styles.txtMethodChoose}>{Languages.paymentMethod.methodChoose}</Text>
                {renderItemMethod(<VimoIC />, Languages.paymentMethod.vimo, false)}
                {renderItemMethod(<BankIC />, Languages.paymentMethod.bank)}
            </View>
            {popupVimo(vimoRef,<WarnIC/>)}
        </View >
    );
});

export default PaymentMethod;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.GRAY_5
    },
    wrapAllContent: {
        paddingHorizontal: 16,
        paddingTop: 10
    },
    txtMethodChoose: {
        ...Styles.typography.medium,
        color: COLORS.GRAY_7,
        fontSize: Configs.FontSize.size16
    },
    txtMethodName: {
        ...Styles.typography.medium,
        color: COLORS.GRAY_7
    },
    wrapItemPayment: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        paddingVertical: 10,
        borderWidth: 1,
        borderColor: COLORS.GRAY_2,
        borderRadius: 18,
        paddingHorizontal: 16,
        marginTop: 16
    },
    wrapRightItemPayment: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        width: '80%'
    },
    titleItemLink: {
        ...Styles.typography.medium,
        color: COLORS.GRAY_7
    },
    stateItemLink: {
        ...Styles.typography.regular,
        color: COLORS.GREEN
    },
    wrapRightIcon: {
        width: 32,
        height: 32,
        borderWidth: 1,
        borderRadius: 30,
        borderColor: COLORS.GRAY_12,
        alignItems: 'center',
        justifyContent: 'center'
    },
    redText: {
        color: COLORS.RED
    },
    greenBorder: {
        borderColor: COLORS.GREEN
    },
    containerAllBtnPopup:{
        flexDirection: 'row-reverse'
    },
    containerItemBtnPopup:{
        backgroundColor: COLORS.RED_2,
        borderColor : COLORS.RED_2,
        borderRadius: 20
    },
    containerCancelBtnPopup:{
        borderColor : COLORS.GRAY_13,
        borderRadius: 20
    },
    textCancel:{
        color: COLORS.GRAY_12
    }
});
