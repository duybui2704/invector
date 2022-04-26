import { observer } from 'mobx-react';
import React, { useCallback, useMemo } from 'react';
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

export const DetailInvestment = observer(({ route }: any) => {

    const { status } = route?.params as any;

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
        Navigator.pushScreen(ScreenName.invest);
    }, []);

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

    return (
        <View>
            <HeaderBar title={Languages.detailInvest.title} hasBack />
            <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false} style={styles.wrapContent}>
                <View style={styles.wrapIcon}>
                    <IcBag />
                </View>
                <View style={styles.wrapInfo}>
                    <Text style={styles.title}>{Languages.detailInvest.information}</Text>
                    {renderInfoItem(Languages.detailInvest.idContract, 'HD0100232042833210', COLORS.GREEN)}
                    {renderInfoItem(Languages.detailInvest.moneyInvest, Utils.formatMoney(110000000), COLORS.RED)}
                    {renderInfoItem(Languages.detailInvest.interest, '5%')}
                    {renderInfoItem(Languages.detailInvest.interestMonth, Utils.formatMoney(110000))}
                    {status !== ENUM_INVEST_STATUS.INVEST_NOW && renderInfoItem(Languages.detailInvest.day, '16/05/2022', '')}
                    {renderInfoItem(Languages.detailInvest.amountInterest, Utils.formatMoney(1000000))}
                    {renderInfoItem(Languages.detailInvest.period, '24 tháng')}
                    {status !== ENUM_INVEST_STATUS.INVEST_NOW && renderInfoItem(Languages.detailInvest.amountReceived, Utils.formatMoney(6000000))}
                    {renderInfoItem(Languages.detailInvest.expectedDate, '12/11/2024')}
                    {renderInfoItem(Languages.detailInvest.formality, 'Lãi hàng tháng gôc cuối kỳ')}
                </View>
                {renderBottom}
            </ScrollView>
        </View>
    );
});



