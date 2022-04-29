import {observer} from 'mobx-react';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import { ScrollView, Text, TextStyle, View, ViewStyle } from 'react-native';

import IcBag from '@/assets/image/ic_bag.svg';
import Languages from '@/common/Languages';
import HeaderBar from '@/components/header';
import {COLORS, HtmlStyles} from '@/theme';
import Utils from '@/utils/Utils';
import { MyStylesInvest } from '@/screen/investment/invest/styles';
import ItemInfoContract from '@/components/ItemInfoContract';
import IcVimo from '@/assets/image/ic_vimo.svg';
import IcNganLuong from '@/assets/image/ic_ngan_luong.svg';
import {Touchable} from '@/components/elements/touchable';
import {ENUM_METHOD_PAYMENT} from '@/common/constants';
import IcCheckBoxOn from '@/assets/image/invest/check_box_on.svg';
import IcCheckBoxOff from '@/assets/image/invest/check_box_off.svg';
import { Configs } from '@/common/Configs';
import { PopupInvestOTP } from '@/components/popupOTP';
import { RootObject } from '@/models/invest';
import { useAppStore } from '@/hooks';
import Loading from '@/components/loading';


const Invest = observer(({route}: any) => {
    const styles = MyStylesInvest();
    const [csdl, setCsdl] = useState<RootObject>(route?.params?.d);
    const [methodPayment, setMethodPayment] = useState<string>();
    const [isCheckBox, setIsCheckBox] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const refModal = useRef<any>();
    const { apiServices } = useAppStore();

    const renderInfoItem = useCallback((label: string, value: string, colorText?: string) => {
        return (
            <ItemInfoContract label={label} value={value} colorText={colorText}/>
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
                    {selected && < View style={styles.circle}/>}
                </View>
            </Touchable>
        );
    }, [methodPayment]);

    const checkBox = useCallback(() => {
        setIsCheckBox(!isCheckBox);
    }, [isCheckBox]);

    const onModal= useCallback(() =>{
        refModal.current.show();
        sendOtp();
    }, []);

    const sendOtp = useCallback(async () => {
        const id = csdl?.id.toString();
        const resInvestOtp = await apiServices.invest.getInvestOtp(id);
        setIsLoading(true);
        if (resInvestOtp.success) {
            setIsLoading(false);
            console.log('aaaa');
        }
        setIsLoading(false);
    }, []);

    return (
        <View>
            <HeaderBar title={Languages.invest.title} hasBack/>
            <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}
                style={styles.wrapContent}>
                <View style={styles.wrapIcon}>
                    <IcBag/>
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
                {renderMethod(<IcVimo/>, Languages.detailInvest.vimo, ENUM_METHOD_PAYMENT.VIMO, true)}
                {renderMethod(<IcNganLuong/>, Languages.detailInvest.nganLuong, ENUM_METHOD_PAYMENT.NGAN_LUONG)}
                <View style={styles.viewBottom}>
                    <Touchable onPress={checkBox}>
                        {!isCheckBox ? <IcCheckBoxOff width={25} height={25}/> : <IcCheckBoxOn width={25} height={25}/>}
                    </Touchable>
                    <Text style={styles.txtCheckBox}>
                        {Languages.detailInvest.agreeTermsWith}
                        <Text style={{
                            color: COLORS.GREEN,
                            fontFamily: Configs.FontFamily.bold
                        }}>{Languages.detailInvest.rules}</Text>
                        {Languages.detailInvest.tienngay}
                    </Text>
                </View>

                <Touchable
                    onPress={onModal}
                    disabled={!(isCheckBox && methodPayment)}
                    style={isCheckBox && methodPayment ? styles.tobBottom :
                        [styles.tobBottom, {backgroundColor: COLORS.GRAY}]}>
                    <Text
                        style={isCheckBox && methodPayment ? styles.txtTob :
                            [styles.txtTob, {color: COLORS.BLACK}]}>
                        {Languages.invest.investNow}
                    </Text>
                </Touchable>
            </ScrollView>
            <PopupInvestOTP ref={refModal} />
            {isLoading && <Loading isOverview />}
        </View>
    );
});

export default Invest;



