import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, RefreshControl, Text, TextStyle, View, ViewStyle } from 'react-native';
import Dash from 'react-native-dash';
import { FlatList } from 'react-native-gesture-handler';
import { useIsFocused } from '@react-navigation/native';

import { ENUM_INVEST_NOTIFY } from '@/common/constants';
import Languages from '@/common/Languages';
import { Touchable } from '@/components/elements/touchable';
import HeaderBar from '@/components/header';
import { useAppStore } from '@/hooks';
import { Notify } from '@/models/invest';
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
                const dataNotify = res.data as Notify[];
                if (dataNotify.length >= 0) {
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
            ...Styles.typography.medium,
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
    }, [apiServices.invest, fetchData, styles.item, styles.itemBlur, styles.rowTop, styles.title, styles.txtNote, styles.txtRight, styles.txtTimeDate, styles.viewLeft]);

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
        return <ActivityIndicator size="large" color={COLORS.GREEN} />;
    }, []);

    const renderEmptyData = useMemo(() => {
        return (
            <View style={styles.wrapNoData}>
                <NoData description='NoData' />
            </View>
        );
    }, [styles.wrapNoData]);

    const onRefreshing = useCallback(() => {
        console.log('aaa');
        fetchData(btnInvest);
    }, [btnInvest, fetchData]);

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
    }, [styles.flatList, data, renderItem, keyExtractor, isRefreshing, onRefreshing, renderFooter, renderEmptyData]);

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

