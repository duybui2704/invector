import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ActivityIndicator, RefreshControl, Text, TextStyle, View, ViewStyle } from 'react-native';
import Dash from 'react-native-dash';
import { FlatList } from 'react-native-gesture-handler';
import { useIsFocused } from '@react-navigation/native';

import { ENUM_INVEST_NOTIFY, ENUM_INVEST_STATUS } from '@/common/constants';
import Languages from '@/common/Languages';
import { Touchable } from '@/components/elements/touchable';
import HeaderBar from '@/components/header';
import { useAppStore } from '@/hooks';
import { Notify, PagingConditionTypes } from '@/models/invest';
import MyStyleLoading from '@/components/loading/styles';
import Loading from '@/components/loading';
import NoData from '@/components/NoData';
import { MyStylesNotifyInvest } from './styles';
import { COLORS, Styles } from '@/theme';
import DateUtils from '@/utils/DateUtils';
import Navigator from '@/routers/Navigator';
import ScreenName, { TabsName } from '@/common/screenNames';
import MyFlatList from '@/components/MyFlatList';

const PAGE_SIZE = 6;
export const NotifyInvest = () => {
    const styles = MyStylesNotifyInvest();
    const [data, setData] = useState<Notify[]>([]);
    const [dataFilter, setDataFilter] = useState<Notify[]>([]);
    const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
    const [btnInvest, setBtnInvest] = useState<string>(ENUM_INVEST_NOTIFY.NOTIFY_ALL);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [canLoadMoreUI, setCanLoadMoreUI] = useState<boolean>(false);
    const isFocused = useIsFocused();
    const { apiServices } = useAppStore();
    const condition = useRef({
        isLoading: true,
        offset: 0,
        canLoadMore: true
    });

    useEffect(() => {
        if (isFocused) {
            fetchData(btnInvest);
        }
    }, [isFocused]);

    const fetchData = useCallback(async (type: string, isLoadMore?: boolean) => {
        console.log(type, condition.current.offset);
        setIsLoading(true);
        const res = await apiServices.invest.getNotify(PAGE_SIZE, condition.current.offset);
        setIsLoading(false);
        if (res.success) {
            const dataNotify = res.data as Notify[];
            const dataNotifyOnRead = dataNotify?.filter((item: any) => item?.status === 1);
            console.log('data: ', dataNotifyOnRead);
            const newSize = dataNotify.length;
            if (newSize > 0) {
                if (isLoadMore) {
                    if (type === ENUM_INVEST_NOTIFY.NOTIFY_ALL) setData((list) => [...list || [], ...dataNotify]);
                    if (type === ENUM_INVEST_NOTIFY.UNREAD) setData((list) => [...list?.filter((item: any) => item?.status === 1) || [], ...dataNotifyOnRead]);
                } else {
                    if (type === ENUM_INVEST_NOTIFY.NOTIFY_ALL) setData(dataNotify);
                    if (type === ENUM_INVEST_NOTIFY.UNREAD) setData(dataNotifyOnRead);
                }
                condition.current.offset += newSize;
            }

            condition.current.isLoading = false;
            condition.current.canLoadMore = newSize >= PAGE_SIZE;
            setCanLoadMoreUI(condition.current.canLoadMore);
        }
    }, [apiServices.invest, btnInvest]);

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
            setData([]);
            fetchData(type, true);
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


    const ItemNotify = useCallback((item: any, title: string) => {
        const onRead = async (id: number, status: number) => {
            if (status === 1) {
                setIsLoading(true);
                const res = await apiServices.invest.getNotifyUpdateRead(id);
                if (res.success) {
                    fetchData(title);
                    Navigator.navigateToDeepScreen([TabsName.homeTabs], ScreenName.detailInvestment, { status: ENUM_INVEST_STATUS.INVESTING, id: `${item?.action_id}` });
                }
                setIsLoading(false);
            }
            Navigator.navigateToDeepScreen([TabsName.homeTabs], ScreenName.detailInvestment, { status: ENUM_INVEST_STATUS.INVESTING, id: `${item?.action_id}` });
        };

        return (
            <Touchable style={item?.status === 1 ? styles.item : styles.itemBlur} onPress={() => onRead(item?.id, item?.status)} >
                <View style={styles.rowTop}>
                    <View style={styles.viewLeft}>
                        <Text style={styles.title} numberOfLines={1}>{item?.note}</Text>
                    </View>
                    <View style={styles.txtRight}>
                        <Text style={styles.txtTimeDate}>{DateUtils.formatDatePicker(item.created_at)}</Text>
                    </View>

                </View>
                <Dash
                    dashThickness={1}
                    dashLength={10}
                    dashGap={5}
                    dashColor={COLORS.GRAY_13}
                />
                <Text style={styles.txtNote}>{item?.message}</Text>
            </Touchable >
        );
    }, [apiServices.invest, fetchData, styles.item, styles.itemBlur, styles.rowTop, styles.title, styles.txtNote, styles.txtRight, styles.txtTimeDate, styles.viewLeft]);

    const renderItem = useCallback(({ item }: any) => {
        switch (btnInvest) {
            case ENUM_INVEST_NOTIFY.NOTIFY_ALL:
                return ItemNotify(item, ENUM_INVEST_NOTIFY.NOTIFY_ALL);
            case ENUM_INVEST_NOTIFY.UNREAD:
                return ItemNotify(item, ENUM_INVEST_NOTIFY.UNREAD);
            default:
                return null;
        }
    }, [btnInvest]);

    const renderFooter = useMemo(() => {
        return <>
            {canLoadMoreUI && <ActivityIndicator size="large" color={COLORS.GREEN} />}
        </>;
    }, []);

    const renderEmptyData = useMemo(() => {
        return (
            <View style={styles.wrapNoData}>
                <NoData description='NoData' />
            </View>
        );
    }, [styles.wrapNoData]);

    const onRefreshing = useCallback(() => {
        console.log('onRefreshing', btnInvest);
        fetchData(btnInvest);
    }, [btnInvest, fetchData]);

    const handleLoadMore = useCallback(() => {
        console.log('handleLoadMore', condition.current.isLoading, condition.current.canLoadMore);
        if (!condition.current.isLoading && condition.current.canLoadMore) {
            fetchData(btnInvest, true);
        }
    }, []);

    const renderNotify = useMemo(() => {
        console.log(data);
        return (
            <MyFlatList
                contentContainerStyle={styles.flatList}
                showsVerticalScrollIndicator={false}
                data={data}
                renderItem={renderItem}
                keyExtractor={keyExtractor}
                ListEmptyComponent={renderEmptyData}
                ListFooterComponent={renderFooter}
                refreshing={isRefreshing}
                onRefresh={onRefreshing}
                onEndReached={handleLoadMore}
            />
        );
    }, [btnInvest, handleLoadMore, onRefreshing, data, renderItem, fetchData]);

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

