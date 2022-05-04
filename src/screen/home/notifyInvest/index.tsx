import React, { useCallback, useEffect, useState } from 'react';
import { ScrollView, Text, TextStyle, View, ViewStyle } from 'react-native';
import Dash from 'react-native-dash';
import { useIsFocused } from '@react-navigation/core';
import { join } from 'lodash';

import { ENUM_INVEST_NOTIFY } from '@/common/constants';
import Languages from '@/common/Languages';
import { Touchable } from '@/components/elements/touchable';
import HeaderBar from '@/components/header';
import MyFlatList from '@/components/MyFlatList';
import { COLORS, Styles } from '@/theme';
import { MyStylesNotifyInvest } from './styles';
import { useAppStore } from '@/hooks';
import { Notify } from '@/models/invest';
import MyStyleLoading from '@/components/loading/styles';

export const NotifyInvest = () => {
    const styles = MyStylesNotifyInvest();
    const [isRead, setIsRead] = useState<boolean>(false);
    const [data, setData] = useState<Notify>();
    const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
    const [btnInvest, setBtnInvest] = useState<string>(ENUM_INVEST_NOTIFY.NOTIFY_ALL);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const isFocused = useIsFocused();
    const { apiServices } = useAppStore();

    useEffect(() => {
        if (isFocused) {
            fetchData(btnInvest);
        }
    }, [isFocused]);

    const fetchData = useCallback(async (type: string) => {
        if (type === ENUM_INVEST_NOTIFY.NOTIFY_ALL) {
            setIsLoading(true);
            const res = await apiServices.invest.getNotify();
            setIsLoading(false);
            if (res.success) {
                console.log(JSON.stringify(res.data));
                const dataNotify = res.data as Notify;
                setData(dataNotify);
            }
        }
        else {
            setIsLoading(true);
            const res = await apiServices.invest.getNotifyOnRead();
            setIsLoading(false);
            if (res.success) {
                console.log(JSON.stringify(res.data));
                // const dataNotify = res.data as Notify;
                // setData(dataNotify);
            }
        }
    }, [btnInvest]);

    const onRefresh = useCallback(() => {
        setIsRefreshing(true);
        setIsRefreshing(false);
        fetchData(btnInvest);
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
            fetchData(type);
        };

        const getTitle = () => {
            switch (type) {
                case ENUM_INVEST_NOTIFY.NOTIFY_ALL:
                    return Languages.invest.notifyAll;
                case ENUM_INVEST_NOTIFY.UNREAD:
                    return Languages.invest.notifyUnRead;
                default:
                    return null;
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

        const onRead = async (id: number) => {
            setIsLoading(true);
            const res = await apiServices.invest.getNotifyUpdateRead(id);
            setIsLoading(false);
            if (res.success) {
                fetchData(btnInvest);
            }
        };

        return (
            <Touchable style={styles.item} onPress={() => onRead(item?.id)}>
                <View style={styles.rowTop}>
                    <View style={styles.viewLeft}>
                        <Text style={styles.title} numberOfLines={1}>{item?.note}</Text>
                    </View>
                    <View style={styles.txtRight}>
                        <Text style={styles.txtTimeDate}>{item.date}</Text>
                        {/* <Text style={styles.txtTimeDate}>{` ${item.time}`}</Text> */}
                    </View>

                </View>
                <Dash
                    dashThickness={1}
                    dashLength={10}
                    dashGap={5}
                    dashColor={COLORS.GRAY_13}
                />
                <Text style={styles.txtNote}>{item?.message}</Text>
                {/* {item.title === Languages.invest.investPay || item.title === Languages.invest.investSuccess
                    ? <Text style={styles.txtNote}>{item.rate}</Text> : null
                } */}

            </Touchable >
        );
    }, []);

    const onNotifyDetail = () => {
        console.log('detail');
    };

    const renderItem = useCallback(({ item }: any) => {
        switch (btnInvest) {
            case ENUM_INVEST_NOTIFY.NOTIFY_ALL:
                return ItemNotify(onNotifyDetail, item, ENUM_INVEST_NOTIFY.NOTIFY_ALL);
            case ENUM_INVEST_NOTIFY.UNREAD:
                return ItemNotify(onNotifyDetail, item, ENUM_INVEST_NOTIFY.UNREAD);
            default:
                return null;
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
                {data && <MyFlatList
                    contentContainerStyle={styles.flatList}
                    showsVerticalScrollIndicator={false}
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={keyExtractor}
                    refreshing={isRefreshing}
                    onRefresh={onRefresh}
                />}
            </View>
        </View>
    );
};

