import { ENUM_INVEST_NOTIFY } from "@/common/constants";
import Languages from "@/common/Languages";
import { Touchable } from "@/components/elements/touchable";
import HeaderBar from "@/components/header";
import MyFlatList from "@/components/MyFlatList";
import { COLORS, Styles } from "@/theme";
import { useIsFocused } from "@react-navigation/core";
import React, { useCallback, useEffect, useState } from "react";
import { ScrollView, Text, TextStyle, View, ViewStyle } from "react-native";
import Dash from "react-native-dash";
import { MyStylesNotifyInvest } from "./styles";

const dataArr = [
    {
        id: '1',
        title: 'Trả lãi đầu tư',
        date: '10/10/2022',
        time: '12:00:00',
        note: 'Thông báo lãi tháng 3 gói đầu tư XLN374 trả lãi 1.000.000 VNĐ vào tài khoản ',
        isRead: false,
        rate: 4e5
    },
    {
        id: '2',
        title: 'Đầu tư thành công',
        date: '10/10/2022',
        time: '12:00:00',
        note: 'Chúc mừng bạn đã đầu tư thành công gói đầu tư XLN374 với số tiền 80.000.000 VNĐ lãi hàng tháng gốc cuối... ',
        isRead: false,
        rate: 4e5
    },
    {
        id: '3',
        title: 'Thay đổi phần trăm tích luỹ',
        date: '10/10/2022',
        time: '12:00:00',
        note: 'Thông báo đổi phần trăm tích luỹ gói đầu tư 80.000.000 VNĐ lãi hàng tháng gốc cuối kỳ ',
        isRead: false
    },
    {
        id: '4',
        title: 'Tri ân khách hàng cùng tienngay.vn',
        date: '10/10/2022',
        time: '12:00:00',
        note: 'Thông báo đổi phần trăm tích luỹ gói đầu tư 80.000.000 VNĐ lãi hàng tháng gốc cuối kỳ ',
        isRead: false
    },
];

export const NotifyInvest = () => {
    const styles = MyStylesNotifyInvest();
    const [isRead, setIsRead] = useState<boolean>(false);
    const [data, setData] = useState<any>(dataArr);
    const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
    const [btnInvest, setBtnInvest] = useState<string>(ENUM_INVEST_NOTIFY.NOTIFY_ALL);
    const isFocused = useIsFocused();

    useEffect(() => {
        if (isFocused) {
            setData(dataArr);

        }
    }, [isFocused]);

    const onRefresh = useCallback(() => {
        setIsRefreshing(true);
        setIsRefreshing(false);
        setData(dataArr);
    }, []);

    const renderInvest = useCallback((type: string) => {

        const styleBt = {
            backgroundColor: btnInvest === type ? COLORS.WHITE : null
        } as ViewStyle;

        const styleTxt = {
            fontFamily: Styles.typography.regular.fontFamily,
            color: btnInvest === type ? COLORS.GREEN : COLORS.GRAY_7
        } as TextStyle;

        const onPress = () => {
            setBtnInvest(type);
        };

        const getTitle = () => {
            switch (type) {
                case ENUM_INVEST_NOTIFY.NOTIFY_ALL:
                    return Languages.invest.notifyAll;
                case ENUM_INVEST_NOTIFY.UNREAD:
                    return Languages.invest.notifyUnRead;
                default:
                    break;
            }
        };
        return (
            <Touchable onPress={onPress} style={[styles.btInvest, styleBt]}>
                <Text style={[styles.txtBtInvest, styleTxt]}>{getTitle()}</Text>
            </Touchable>
        );

    }, [btnInvest]);

    const keyExtractor = useCallback((item: any, index: number) => {
        return `${index}${item.id}`;
    }, []);

    const ItemNotify = useCallback((onPress: any, item: any, title: string) => {
        return (
            <Touchable style={styles.item}>
                <View style={styles.rowTop}>
                    <View style={styles.viewLeft}>
                        <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
                    </View>
                    <View style={styles.txtRight}>
                        <Text style={styles.txtTimeDate}>{item.date}</Text>
                        <Text style={styles.txtTimeDate}>{` ` + item.time}</Text>
                    </View>

                </View>
                <Dash
                    dashThickness={1}
                    dashLength={10}
                    dashGap={5}
                    dashColor={COLORS.GRAY_13}
                />
                <Text style={styles.txtNote}>{item.note}</Text>
                {/* {item.title === Languages.invest.investPay || item.title === Languages.invest.investSuccess
                    ? <Text style={styles.txtNote}>{item.rate}</Text> : null
                } */}

            </Touchable >
        );
    }, []);

    const onNotifyDetail = () => {
        console.log('detail')
    }

    const renderItem = useCallback(({ item }: any) => {
        switch (btnInvest) {
            case ENUM_INVEST_NOTIFY.NOTIFY_ALL:
                return ItemNotify(onNotifyDetail, item, ENUM_INVEST_NOTIFY.NOTIFY_ALL);
            case ENUM_INVEST_NOTIFY.UNREAD:
                return ItemNotify(onNotifyDetail, item, ENUM_INVEST_NOTIFY.UNREAD);
        }
    }, [btnInvest]);

    return (
        <View style={styles.main}>
            <HeaderBar title={Languages.invest.notify} hasBack />
            <View style={styles.wrapContent}>
                <View style={styles.investTab}>
                    {renderInvest(ENUM_INVEST_NOTIFY.NOTIFY_ALL)}
                    {renderInvest(ENUM_INVEST_NOTIFY.UNREAD)}
                </View>
                <MyFlatList
                    contentContainerStyle={styles.flatList}
                    showsVerticalScrollIndicator={false}
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={keyExtractor}
                    refreshing={isRefreshing}
                    onRefresh={onRefresh}
                />
            </View>
        </View>
    );
}

