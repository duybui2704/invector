import { observer } from 'mobx-react';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { ScrollView, Text, TextStyle, View } from 'react-native';
import Dash from 'react-native-dash';

import { Touchable } from '@/components/elements/touchable';
import IcBag from '@/assets/image/ic_bag.svg';
import Languages from '@/common/Languages';
import HeaderBar from '@/components/header';
import { COLORS } from '@/theme';
import Utils from '@/utils/Utils';
import styles from './styles';
import { ENUM_INVEST_STATUS } from '@/common/constants';
import Navigator from '@/routers/Navigator';
import ScreenName from '@/common/screenNames';
import ItemInfoContract from '@/components/ItemInfoContract';
import { useAppStore } from '@/hooks';
import { PackageInvest } from '@/models/invest';
import Loading from '@/components/loading';

export const DetailInvestment = observer(({ route }: any) => {

    const { status } = route?.params as any;
    const { id } = route?.params as any;
    const { apiServices } = useAppStore();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [data, setData] = useState<PackageInvest>();
    const [dataHistory, setDataHistory] = useState<PackageInvest>();

    useEffect(() => {
        switch (status) {
            case ENUM_INVEST_STATUS.INVEST_NOW:
                fetchDetailInvestNow();
                break;
            case ENUM_INVEST_STATUS.INVESTING:
                fetchDetailInvesting();
                break;
            case ENUM_INVEST_STATUS.HISTORY:
                fetchDetailHistory();
                break;
            default:
                break;
        }
    }, [status]);

    const fetchDetailInvestNow = useCallback(async () => {
        setIsLoading(true);
        console.log('resInvest');
        const resInvestNow = await apiServices.invest.getDetailInvestNow(id);
        setIsLoading(false);
        if (resInvestNow.success) {
            const res = resInvestNow.data as PackageInvest;
            setData(res);
        }
    }, [apiServices.invest, id]);

    const fetchDetailInvesting = useCallback(async () => {
        setIsLoading(true);
        console.log('resInvesting');
        const resInvesting = await apiServices.invest.getInvestHaveContract(id);
        setIsLoading(false);
        if (resInvesting.success) {
            const res = resInvesting.data as PackageInvest;
            setData(res);
        }

    }, [apiServices.invest, id]);

    const fetchDetailHistory = useCallback(async () => {
        console.log('resInvestHistory');
        const resInvestHistory = await apiServices.invest.getInvestHaveContract(id);
        setIsLoading(false);
        if (resInvestHistory.success) {
            const res = resInvestHistory.data as PackageInvest;
            setData(res);
        }
    }, [apiServices.invest, id]);

    const renderInfoItem = useCallback((label: string, value: string, colorText?: string, visible?: boolean) => {
        return (
            <ItemInfoContract label={label} value={value} colorText={colorText} />
        );
    }, []);

    const renderItem = useCallback((due?: boolean, visible?: boolean) => {

        const txtMoney = {
            color: due ? COLORS.GREEN : COLORS.GRAY_7
        } as TextStyle;
        const txtDue = {
            color: due ? COLORS.GREEN : COLORS.GRAY_7
        } as TextStyle;

        if (visible) return null;

        return (
            <>
                <Dash
                    dashThickness={1}
                    dashLength={10}
                    dashGap={5}
                    dashColor={COLORS.GRAY_13} />
                <View style={styles.wrapItem}>
                    <Text style={[styles.txtValue, txtMoney]}>{Utils.formatMoney(1245000)}</Text>
                    <View style={styles.wrapItemInfo}>
                        <Text style={styles.txtDate}>16/4/2022</Text>
                        <Text style={[styles.txtDue, txtDue]}>{due ? Languages.detailInvest.paid : Languages.detailInvest.unpaid}</Text>
                    </View>
                </View>
            </>
        );
    }, []);
    const navigateToInvest = useCallback(() => {
        console.log('data: ', data);
        if (data) {
            Navigator.pushScreen(ScreenName.invest, { id: data?.id });
        }
    }, [data]);

    const renderBottom = useMemo(() => {
        switch (status) {
            case ENUM_INVEST_STATUS.INVEST_NOW:
                return (
                    <Touchable onPress={navigateToInvest} style={styles.button}>
                        <Text style={styles.txtBt}>{Languages.detailInvest.investNow}</Text>
                    </Touchable>
                );
            case ENUM_INVEST_STATUS.INVESTING:
                return (
                    <View style={styles.wrapInfo}>
                        <Text style={styles.title}>{Languages.detailInvest.information}</Text>
                        {renderItem(true)}
                        {renderItem(true)}
                        {renderItem()}
                        {renderItem()}
                    </View>
                );
            case ENUM_INVEST_STATUS.HISTORY:
                return (
                    <View style={styles.center}>
                        <View style={styles.wrapInfo}>
                            <Text style={styles.title}>{Languages.detailInvest.information}</Text>
                            {renderItem(true)}
                            {renderItem(true)}
                            {renderItem(true)}
                            {renderItem(true)}
                        </View>
                        <Touchable style={styles.button} onPress={navigateToInvest}>
                            <Text style={styles.txtBt}>{Languages.detailInvest.reinvest}</Text>
                        </Touchable>
                    </View>
                );
            default:
                return null;
        }
    }, [navigateToInvest, renderItem, status]);

    const renderInfoContract = useMemo(()=>{
        if(!isLoading)
        {
            return(
                <>
                    <View style={styles.wrapInfo}>
                        <Text style={styles.title}>{Languages.detailInvest.information}</Text>
                        {renderInfoItem(Languages.detailInvest.idContract, `${data?.ma_hop_dong}`, COLORS.GREEN)}
                        {renderInfoItem(Languages.detailInvest.moneyInvest, Utils.formatMoney(data?.so_tien_dau_tu), COLORS.RED)}
                        {renderInfoItem(Languages.detailInvest.interest, `${data?.ti_le_lai_suat_hang_thang}`)}
                        {renderInfoItem(Languages.detailInvest.interestMonth, Utils.formatMoney(data?.lai_hang_thang))}
                        {status !== ENUM_INVEST_STATUS.INVEST_NOW && renderInfoItem(Languages.detailInvest.day, `${data?.ngay_dau_tu}`, '')}
                        {renderInfoItem(Languages.detailInvest.amountInterest, Utils.formatMoney(data?.tong_lai_nhan_duoc))}
                        {renderInfoItem(Languages.detailInvest.period, `${data?.thoi_gian_dau_tu}`)}
                        {status !== ENUM_INVEST_STATUS.INVEST_NOW && renderInfoItem(Languages.detailInvest.amountReceived, Utils.formatMoney(data?.tong_lai_da_nhan))}
                        {renderInfoItem(Languages.detailInvest.expectedDate, `${data?.ngay_dao_han_du_kien}`)}
                        {renderInfoItem(Languages.detailInvest.formality, `${data?.hinh_thuc_tra_lai}`)}
                    </View>
                    {renderBottom}
                </>
            );
        }
        return null;
    },[data, isLoading, renderInfoItem, status,renderBottom]);

    return (
        <View style={styles.container}>
            <HeaderBar title={Languages.detailInvest.title} hasBack />
            <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false} style={styles.wrapContent}>
                <View style={styles.wrapIcon}>
                    <IcBag />
                </View>
                {renderInfoContract}
            </ScrollView>
            {isLoading && <Loading isOverview />}
        </View>
    );
});



