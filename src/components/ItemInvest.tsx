import React from 'react';
import { StyleSheet, Text, TextStyle, View } from 'react-native';
import Dash from 'react-native-dash';

import { COLORS, Styles } from '@/theme';
import { Touchable } from './elements/touchable';
import Languages from '@/common/Languages';
import IcBtnInvest from '@/assets/image/ic_button_invest.svg';
import { Configs } from '@/common/Configs';
import Utils from '@/utils/Utils';

type ItemProps = {
    data?: any;
    onPress?: () => void
    hasButton?: boolean | true
};
const ItemInvest = ({ data, onPress, hasButton }: ItemProps
) => {
    const styleText = {
        color: hasButton ? COLORS.GREEN : COLORS.GRAY_7
    } as TextStyle;
    return (
        <Touchable onPress={onPress} style={styles.item}>
            <View style={styles.rowTop}>
                <Text style={[styles.txtMoney, styleText]}>{Utils.formatMoney(data?.amountMoney)}</Text>
                <View style={styles.wrapText}>
                    <Text style={styles.txtInterest}>{Languages.invest.interest}</Text>
                    <Text style={styles.txtPercent}>{data?.percent}</Text>
                </View>
            </View>
            <Dash
                dashThickness={1}
                dashLength={10}
                dashGap={5}
                dashColor={COLORS.GRAY_13} />
            <View style={styles.rowCenter}>
                <View>
                    <Text style={styles.txtInterest}>{Languages.invest.time}</Text>
                    <Text style={styles.txtFormality}>{data?.time}</Text>
                </View>
                <View style={styles.wrapText}>
                    <Text style={styles.txtInterest}>{Languages.invest.intent}</Text>
                    <Text style={styles.greenText}>{Utils.formatMoney(data?.amountMoney)}</Text>
                </View>
            </View>
            <Dash
                dashThickness={1}
                dashLength={10}
                dashGap={5}
                dashColor={COLORS.GRAY_13} />
            <View style={styles.rowBottom}>
                <View>
                    <Text style={styles.txtInterest} >{Languages.invest.formalPayment}</Text>
                    <Text style={styles.txtFormality}>{data?.formality}</Text>
                </View>
                {hasButton ? <Touchable onPress={onPress} style={styles.btInvestNow}>
                    <Text style={styles.txtInvestNow}>{Languages.invest.investNow}</Text>
                    <IcBtnInvest />
                </Touchable> :
                    <View style={styles.wrapText}>
                        <Text style={styles.txtInterest} >{Languages.invest.getMoney}</Text>
                        <Text style={styles.txtYellow}>{Utils.formatMoney(data?.interest)}</Text>
                    </View>}
            </View>
        </Touchable>
    );
};
const styles = StyleSheet.create({
    item: {
        paddingTop: 8,
        backgroundColor: COLORS.WHITE,
        paddingHorizontal: 16,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: COLORS.GRAY_11,
        marginBottom: 8
    },
    rowTop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: 8
    },
    rowCenter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 8
    },
    rowBottom: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        paddingVertical: 8
    },
    txtMoney: {
        ...Styles.typography.medium,
        fontSize: Configs.FontSize.size20,
        color: COLORS.GREEN
    },
    txtInterest: {
        fontSize: Configs.FontSize.size12,
        color: COLORS.GRAY_12
    },
    txtPercent: {
        ...Styles.typography.medium,
        color: COLORS.RED
    },
    wrapText: {
        alignItems: 'flex-end'
    },
    greenText: {
        ...Styles.typography.medium,
        color: COLORS.GREEN
    },
    btInvestNow: {
        backgroundColor: COLORS.GREEN,
        flexDirection: 'row',
        paddingVertical: 5,
        borderRadius: 20,
        paddingHorizontal: 7,
        alignItems: 'center'

    },
    txtInvestNow: {
        ...Styles.typography.medium,
        color: COLORS.WHITE,
        fontSize: Configs.FontSize.size12,
        marginRight: 5
    },
    txtFormality: {
        ...Styles.typography.medium
    },
    txtYellow: {
        ...Styles.typography.medium,
        color: COLORS.YELLOW_2
    }
});
export default ItemInvest;


