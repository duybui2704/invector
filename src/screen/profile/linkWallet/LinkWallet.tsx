import { observer } from 'mobx-react';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Text, View } from 'react-native';
import { useIsFocused } from '@react-navigation/native';

import LinkIC from '@/assets/image/ic_ischecked_save_acc.svg';
import NotLinkIC from '@/assets/image/ic_unchecked_save_acc.svg';
import WarnIC from '@/assets/image/ic_warn_vimo_red_round.svg';
import VimoIC from '@/assets/image/ic_vimo.svg';
import { STATE_LINK } from '@/common/constants';
import Languages from '@/common/Languages';
import { Touchable } from '@/components/elements/touchable';
import HeaderBar from '@/components/header';
import { useAppStore } from '@/hooks';
import Navigator from '@/routers/Navigator';
import ScreenName from '@/common/screenNames';
import PopupNotifyNoAction from '@/components/PopupNotifyNoAction';
import { PopupActionTypes } from '@/models/typesPopup';
import { InfoLinkVimoModal } from '@/models/user-models';
import Loading from '@/components/loading';
import ToastUtils from '@/utils/ToastUtils';
import { MyStylesLinkWallet } from './styles';

const LinkWallet = observer(() => {
    const styles = MyStylesLinkWallet();
    const { apiServices, userManager } = useAppStore();
    const vimoRef = useRef<PopupActionTypes>();
    const [dataInfoVimo, setDataInfoVimo] = useState<InfoLinkVimoModal>();
    const [isLoading, setLoading] = useState<boolean>(true);
    const isFocus = useIsFocused();

    useEffect(() => {
        if (isFocus === true) {
            fetchInfoVimoLink();
        }
    }, [isFocus]);

    const fetchInfoVimoLink = useCallback(async () => {
        const res = await apiServices.paymentMethod.requestInfoLinkVimo();
        setLoading(true);
        if (res.success) {
            setLoading(false);
            const data = res.data as InfoLinkVimoModal;
            setDataInfoVimo(data);
            userManager.updateUserInfo({
                ...userManager.userInfo,
                infoLinkVimo: { ...data }
            });
        }
        setLoading(false);
    }, [apiServices.paymentMethod, userManager]);

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

    const onPopupVimoAgree = useCallback(async () => {
        setLoading(true);
        const res = await apiServices.paymentMethod.requestCancelLinkVimo();
        if (res.success) {
            setLoading(false);
            ToastUtils.showSuccessToast(Languages.msgNotify.successCancelLinkVimo);
            vimoRef.current?.hide();
            fetchInfoVimoLink();
        } else {
            vimoRef.current?.hide();
        }
        setLoading(false);
    }, [apiServices.paymentMethod, fetchInfoVimoLink]);

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


    const onVimo = useCallback(() => {
        if (userManager.userInfo?.infoLinkVimo?.trang_thai === STATE_LINK.LINKING) {
            vimoRef.current?.show();
        }
        else {
            Navigator.pushScreen(ScreenName.confirmPhone);
        }
    }, [userManager.userInfo?.infoLinkVimo?.trang_thai]);

    const renderAccountWallet = useCallback((icon: any, title: string, state: boolean) => {
        const _onPress = () => {
            onVimo();
        };
        return (
            <Touchable onPress={_onPress} style={state ? styles.wrapBtnLinkWalletChooser : styles.wrapBtnLinkWallet}>
                {icon}
                <View style={styles.wrapTitle}>
                    <Text style={styles.txtNameLink}>{title}</Text>
                    {renderStateLink(state)}
                </View>
                {renderRightIcon(state)}
            </Touchable>
        );
    }, [onVimo, renderRightIcon, renderStateLink, styles.txtNameLink, styles.wrapBtnLinkWallet, styles.wrapBtnLinkWalletChooser, styles.wrapTitle]);

    return (
        <View style={styles.container}>
            <HeaderBar isLight={false} title={Languages.account.linkWallet} hasBack />
            <View style={styles.wrapAllContent}>
                {renderAccountWallet(<VimoIC />, Languages.paymentMethod.vimo, userManager.userInfo?.infoLinkVimo?.trang_thai === STATE_LINK.LINKING)}
            </View>
            {popupVimo(vimoRef, <WarnIC />)}
            {isLoading && <Loading isOverview />}
        </View >
    );
});

export default LinkWallet;
