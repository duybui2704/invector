import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, RefreshControl, Text, TextStyle, View, ViewStyle } from 'react-native';
import Dash from 'react-native-dash';
import { useIsFocused } from '@react-navigation/core';
import { join } from 'lodash';
import { FlatList } from 'react-native-gesture-handler';

import { ENUM_INVEST_NOTIFY } from '@/common/constants';
import Languages from '@/common/Languages';
import { Touchable } from '@/components/elements/touchable';
import HeaderBar from '@/components/header';
import MyFlatList from '@/components/MyFlatList';
import { useAppStore } from '@/hooks';
import { Notify } from '@/models/invest';
import MyStyleLoading from '@/components/loading/styles';
import Loading from '@/components/loading';
import NoData from '@/components/NoData';
import { MyStylesNotifyInvest } from './styles';
import { COLORS, Styles } from '@/theme';

export const NotifyInvest = () => {
    const styles = MyStylesNotifyInvest();
    const [isRead, setIsRead] = useState<boolean>(false);
    const [data, setData] = useState<Notify[]>();
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
        console.log('type: ', type);
        if (type === ENUM_INVEST_NOTIFY.NOTIFY_ALL) {
            setIsLoading(true);
            const res = await apiServices.invest.getNotify();
            setIsLoading(false);
            if (res.success) {
                const dataNotify = res.data as Notify[];
                setData(dataNotify);
            }
        }
        else {
            setIsLoading(true);
            const res = await apiServices.invest.getNotify();
            setIsLoading(false);
            if (res.success) {

                if (res.data?.length >= 0) {
                    const dataNotify = res.data as Notify[];
                    console.log('dataFilter: ', dataNotify?.filter((item: any) => item?.status === 1));
                    setData(dataNotify?.filter((item: any) => item?.status === 1));
                } else {
                    setData(undefined);
                }
            }
        }
    }, [apiServices.invest]);

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

    }, [btnInvest, fetchData, styles.btInvest, styles.txtBtInvest]);

    const keyExtractor = useCallback((item: any, index: number) => {
        return `${index}${item.id}`;
    }, []);


    const ItemNotify = useCallback((onPress: any, item: any, title: string) => {

        const onRead = async (id: number) => {
            setIsLoading(true);
            const res = await apiServices.invest.getNotifyUpdateRead(id);
            if (res.success) {
                fetchData(title);
            }
            setIsLoading(false);
            if (res.success) {
                // fetchData(btnInvest);
            }
        };

        return (
            <Touchable style={item?.status === 1 ? styles.item : styles.itemBlur} onPress={() => onRead(item?.id)} disabled={!(item?.status === 1)}>
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
    }, [apiServices.invest, styles.item, styles.rowTop, styles.title, styles.txtNote, styles.txtRight, styles.txtTimeDate, styles.viewLeft]);

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
    }, [ItemNotify, btnInvest]);

    const renderFooter = useMemo(() => {
        return <ActivityIndicator size="large" color="red" />;
    }, []);

    const renderEmptyData = useMemo(() => {
        return (
            <View style={styles.wrapNoData}>
                <NoData description='NoData' />
            </View>
        );
    }, []);

    const onRefreshing = useCallback(() => {
        console.log('aaa');
        fetchData(btnInvest);
    }, []);

    const handleLoadMore = () => {
        fetchData(btnInvest);
    };

    const renderNotify = useMemo(() => {
        return (
            <FlatList
                contentContainerStyle={styles.flatList}
                showsVerticalScrollIndicator={false}
                data={data}
                renderItem={renderItem}
                keyExtractor={keyExtractor}
                refreshing={isRefreshing}
                // onRefresh={onRefresh}
                refreshControl={
                    <RefreshControl
                        tintColor={COLORS.RED}
                        refreshing={isRefreshing}
                        onRefresh={onRefreshing}
                    />
                }
                onEndReachedThreshold={0.5}
                onEndReached={handleLoadMore}
                ListFooterComponent={renderFooter}
                ListEmptyComponent={renderEmptyData}
            />
        );
    }, [btnInvest, handleLoadMore, onRefreshing, isRefreshing]);

    return (
        <View style={styles.container}>
            <HeaderBar title={Languages.invest.notify} hasBack />
            <View style={styles.wrapContent}>
                <View style={styles.investTab}>
                    {renderInvest(ENUM_INVEST_NOTIFY.NOTIFY_ALL)}
                    {renderInvest(ENUM_INVEST_NOTIFY.UNREAD)}
                </View>
                {data && renderNotify}
            </View>
            {isLoading && <Loading isOverview />}
        </View>
    );
};

