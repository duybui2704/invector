import { observer } from 'mobx-react';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Alert, Platform, ScrollView, Text, TextStyle, View, ViewStyle } from 'react-native';
import OTPInputView from '@twotalltotems/react-native-otp-input';

import IcBag from '@/assets/image/ic_bag.svg';
import Languages from '@/common/Languages';
import HeaderBar from '@/components/header';
import { COLORS, HtmlStyles } from '@/theme';
import Utils from '@/utils/Utils';
import { MyStylesInvest } from '@/screen/investment/invest/styles';
import ItemInfoContract from '@/components/ItemInfoContract';
import IcVimo from '@/assets/image/ic_vimo.svg';
import IcNganLuong from '@/assets/image/ic_ngan_luong.svg';
import { Touchable } from '@/components/elements/touchable';
import { ENUM_METHOD_PAYMENT } from '@/common/constants';
import IcCheckBoxOn from '@/assets/image/invest/check_box_on.svg';
import IcCheckBoxOff from '@/assets/image/invest/check_box_off.svg';
import { Configs } from '@/common/Configs';
import { PopupInvestOTP } from '@/components/popupOTP';
import { CheckVimoWalletModel, InvestorInfoModel, PackageInvest } from '@/models/invest';
import { useAppStore } from '@/hooks';
import Loading from '@/components/loading';
import PopupConfirmPolicy from '@/components/PopupConfirmPolicy';
import { PopupActionTypes } from '@/models/typesPopup';
import Navigator from '@/routers/Navigator';
import ScreenName, { TabsName } from '@/common/screenNames';


const Invest = observer(({ route }: any) => {
    const styles = MyStylesInvest();
    const [csdl, setCsdl] = useState<PackageInvest>();
    const [methodPayment, setMethodPayment] = useState<string>();
    const [isCheckBox, setIsCheckBox] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const refModal = useRef<PopupActionTypes>(null);
    const refPopupPolicy = useRef<PopupActionTypes>(null);
    const { apiServices } = useAppStore();

    useEffect(() => {
        fetchDetailInvestNow();
        refModal.current?.show();

    }, []);

    const fetchDetailInvestNow = useCallback(async () => {
        setIsLoading(true);
        const resInvestNow = await apiServices.invest.getDetailInvestNow(route.params.id);
        setIsLoading(false);
        if (resInvestNow.success) {
            const res = resInvestNow.data as PackageInvest;
            setCsdl(res);
        }
    }, [apiServices.invest, route.params.id]);

    const checkBox = useCallback(() => {
        setIsCheckBox(!isCheckBox);
    }, [isCheckBox]);

    const getOtpVimo = useCallback(async () => {
        refModal.current?.show();
        // const resOtp = await apiServices.invest.getOTP(csdl?.id?.toString() || '');
        // if (resOtp.success && resOtp.data) {
        //     refModal.current?.show();
        // }
        // else {
        //     const infor = resOtp?.data as CheckVimoWalletModel;
        //     Alert.alert(infor.message || Languages.detailInvest.error);
        // }
    }, []);

    const onInvest = useCallback(async () => {
        const res = await apiServices.invest.getInforInvest();
        if (res.success) {
            const data = res.data as InvestorInfoModel;
            if (data?.tra_lai && !data?.tra_lai?.type_interest_receiving_account) {
                Alert.alert(
                    Languages.invest.notify, Languages.invest.updateBankInfo,
                    [
                        {
                            text: Languages.common.cancel,
                            style: 'cancel'
                        },
                        {
                            text: Languages.common.agree,
                            style: 'default',
                            onPress: () => {
                                Navigator.navigateScreen(TabsName.accountTabs);
                            }
                        }
                    ]
                );
            }
            else if (methodPayment === ENUM_METHOD_PAYMENT.NGAN_LUONG) {
                const resPayment = await apiServices.invest.requestNganLuong(csdl?.id?.toString() || '', Platform.OS);
                if (res.success && resPayment.data) {
                    Navigator.pushScreen(ScreenName.paymentWebview, {
                        url: resPayment?.data
                    });
                }
            }
            else if (methodPayment === ENUM_METHOD_PAYMENT.VIMO) {
                getOtpVimo();
            }
        }
    }, [apiServices.invest, csdl?.id, getOtpVimo, methodPayment]);

    const openPolicy = useCallback(() => {
        refPopupPolicy.current?.show();
    }, []);

    const onConfirmPopup = useCallback(() => {
        setIsCheckBox(true);
        refPopupPolicy.current?.hide();
    }, []);


    const onConfirmOTP = useCallback(async (otp: string) => {
        const res = await apiServices.invest.confirmInvest(csdl?.id?.toString() || '', otp);
        if (res?.success) {
            const data = res?.data as CheckVimoWalletModel;
            Alert.alert(data?.message);
            return true;
        }
        return false;
    }, [apiServices.invest, csdl?.id]);

    const renderInfoItem = useCallback((label: string, value: string, colorText?: string) => {
        return (
            <ItemInfoContract label={label} value={value} colorText={colorText} />
        );
    }, []);

    const renderMethod = useCallback((icon: any, label: string, method: string, linked?: boolean) => {
        const onPress = () => {
            setMethodPayment(method);
        };
        const selected = methodPayment === method;

        const borderColor = {
            borderColor: selected ? COLORS.GREEN : COLORS.GRAY_11
        } as ViewStyle;

        return (
            <Touchable onPress={onPress} style={[styles.wrapItemMethod, borderColor]}>
                {icon}
                <View style={styles.wrapLabel}>
                    <Text style={styles.txtMethod}>{label}</Text>
                    {linked && <Text style={styles.greenText}>{Languages.detailInvest.linked}</Text>}
                </View>
                <View style={[styles.btSelected, borderColor]}>
                    {selected && < View style={styles.circle} />}
                </View>
            </Touchable>
        );
    }, [methodPayment, styles.btSelected, styles.circle, styles.greenText, styles.txtMethod, styles.wrapItemMethod, styles.wrapLabel]);

    return (
        <View>
            <HeaderBar title={Languages.invest.title} hasBack />
            <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}
                style={styles.wrapContent}>
                <View style={styles.wrapIcon}>
                    <IcBag />
                </View>
                <View style={styles.wrapInfo}>
                    <Text style={styles.title}>{Languages.detailInvest.information}</Text>
                    {renderInfoItem(Languages.detailInvest.idContract, `${csdl?.ma_hop_dong}`, COLORS.GREEN)}
                    {renderInfoItem(Languages.detailInvest.moneyInvest, Utils.formatMoney(csdl?.so_tien_dau_tu), COLORS.RED)}
                    {renderInfoItem(Languages.detailInvest.interest, `${csdl?.ti_le_lai_suat_hang_thang}`)}
                    {renderInfoItem(Languages.detailInvest.interestMonth, Utils.formatMoney(csdl?.lai_hang_thang))}
                    {renderInfoItem(Languages.detailInvest.amountInterest, Utils.formatMoney(csdl?.tong_lai_nhan_duoc))}
                    {renderInfoItem(Languages.detailInvest.period, `${csdl?.thoi_gian_dau_tu}`)}
                    {renderInfoItem(Languages.detailInvest.expectedDate, `${csdl?.ngay_dao_han_du_kien}`)}
                    {renderInfoItem(Languages.detailInvest.formality, `${csdl?.hinh_thuc_tra_lai}`)}
                </View>
                <Text style={styles.labelMoney}>{Languages.detailInvest.money}</Text>
                <Text style={styles.money}>{Utils.formatMoney(csdl?.so_tien_dau_tu)}</Text>
                <Text style={styles.headerText}>{Languages.detailInvest.method}</Text>
                {renderMethod(<IcVimo />, Languages.detailInvest.vimo, ENUM_METHOD_PAYMENT.VIMO, true)}
                {renderMethod(<IcNganLuong />, Languages.detailInvest.nganLuong, ENUM_METHOD_PAYMENT.NGAN_LUONG)}
                <View style={styles.viewBottom}>
                    <Touchable onPress={checkBox}>
                        {!isCheckBox ? <IcCheckBoxOff width={25} height={25} /> : <IcCheckBoxOn width={25} height={25} />}
                    </Touchable>
                    <Touchable onPress={openPolicy} style={styles.policy}>
                        <Text style={styles.txtCheckBox}>
                            {Languages.detailInvest.agreeTermsWith}
                            <Text style={{
                                color: COLORS.GREEN,
                                fontFamily: Configs.FontFamily.bold
                            }}>{Languages.detailInvest.rules}</Text>
                            {Languages.detailInvest.tienngay}
                        </Text>
                    </Touchable>
                </View>

                <Touchable
                    onPress={onInvest}
                    disabled={!(isCheckBox && methodPayment)}
                    style={isCheckBox && methodPayment ? styles.tobBottom :
                        [styles.tobBottom, { backgroundColor: COLORS.GRAY }]}>
                    <Text
                        style={isCheckBox && methodPayment ? styles.txtTob :
                            [styles.txtTob, { color: COLORS.BLACK }]}>
                        {Languages.invest.investNow}
                    </Text>
                </Touchable>

            </ScrollView>
            <PopupInvestOTP onConfirmOTP={onConfirmOTP} getOTPcode={getOtpVimo} ref={refModal} />
            <PopupConfirmPolicy
                onConfirm={onConfirmPopup}
                ref={refPopupPolicy}
            />
            {isLoading && <Loading isOverview />}
        </View>
    );
});

export default Invest;



