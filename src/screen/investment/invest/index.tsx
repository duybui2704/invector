import { observer } from 'mobx-react';
import React, { useCallback, useMemo, useState } from 'react';
import { ScrollView, Text, TextStyle, View, ViewStyle } from 'react-native';
import Dash from 'react-native-dash';

import IcBag from '@/assets/image/ic_bag.svg';
import Languages from '@/common/Languages';
import HeaderBar from '@/components/header';
import { COLORS, HtmlStyles } from '@/theme';
import Utils from '@/utils/Utils';
import styles from './styles';
import ItemInfoContract from '@/components/ItemInfoContract';
import IcVimo from '@/assets/image/ic_vimo.svg';
import IcNganLuong from '@/assets/image/ic_ngan_luong.svg';
import { Touchable } from '@/components/elements/touchable';
import { ENUM_METHOD_PAYMENT } from '@/common/constants';




const Invest = observer(({ route }: any) => {
    const [methodPayment, setMethodPayment] = useState<string>();

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
    }, [methodPayment]);

    return (
        <View>
            <HeaderBar title={Languages.invest.title} hasBack />
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
                    {renderInfoItem(Languages.detailInvest.amountInterest, Utils.formatMoney(1000000))}
                    {renderInfoItem(Languages.detailInvest.period, '24 tháng')}
                    {renderInfoItem(Languages.detailInvest.expectedDate, '12/11/2024')}
                    {renderInfoItem(Languages.detailInvest.formality, 'Lãi hàng tháng gôc cuối kỳ')}
                </View>
                <Text style={styles.labelMoney}>{Languages.detailInvest.money}</Text>
                <Text style={styles.money}>{Utils.formatMoney(110000000)}</Text>
                <Text style={styles.headerText}>{Languages.detailInvest.method}</Text>
                {renderMethod(<IcVimo />, Languages.detailInvest.vimo, ENUM_METHOD_PAYMENT.VIMO, true)}
                {renderMethod(<IcNganLuong />, Languages.detailInvest.nganLuong, ENUM_METHOD_PAYMENT.NGAN_LUONG)}

            </ScrollView>
        </View>
    );
});

export default Invest;



