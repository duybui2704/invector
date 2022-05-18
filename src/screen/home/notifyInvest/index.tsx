import IcNoDataNotify from '@/assets/image/home/ic_no_data_notify.svg';
import { ENUM_INVEST_STATUS } from '@/common/constants';
import Languages from '@/common/Languages';
import ScreenName, { TabsName } from '@/common/screenNames';
import { Touchable } from '@/components/elements/touchable';
import HeaderBar from '@/components/header';
import Loading from '@/components/loading';
import MyFlatList from '@/components/MyFlatList';
import NoData from '@/components/NoData';
import { useAppStore } from '@/hooks';
import { Notify } from '@/models/invest';
import Navigator from '@/routers/Navigator';
import { COLORS } from '@/theme';
import DateUtils from '@/utils/DateUtils';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Text, View } from 'react-native';
import Dash from 'react-native-dash';
import { MyStylesNotifyInvest } from './styles';

const PAGE_SIZE = 7;
export const NotifyInvest = () => {
    const styles = MyStylesNotifyInvest();
    const [data, setData] = useState<Notify[]>([]);
    const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
    const [canLoadMoreUI, setCanLoadMoreUI] = useState<boolean>(true);
    const { apiServices } = useAppStore();
    const condition = useRef({
        isLoading: false,
        offset: 0,
        canLoadMore: true
    });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = useCallback(async (isLoadMore?: boolean) => {
        if (condition.current.isLoading) {
            return;
        }
        condition.current.isLoading = true;

        const res = await apiServices.invest.getNotify(PAGE_SIZE, condition.current.offset);
        let totalSize = 0;
        if (res.success) {
            const dataNotify = res.data as Notify[];
            totalSize = dataNotify?.length || 0;

            if (totalSize > 0) {
                if (isLoadMore) {
                    setData((list) => [...list || [], ...dataNotify]);
                } else {
                    setData(dataNotify);
                }
                condition.current.offset += totalSize;
            }
        }

        condition.current.isLoading = false;

        condition.current.canLoadMore = totalSize >= PAGE_SIZE;
        setCanLoadMoreUI(condition.current.canLoadMore);
    }, [apiServices.invest]);

    const keyExtractor = useCallback((item: any, index: number) => {
        return `${index}${item.id}`;
    }, []);

    const renderItem = useCallback(({ item }: any) => {
        const onRead = async (id: number, status: number) => {
            if (status === 1) {
                const res = await apiServices.invest.getNotifyUpdateRead(id);
                if (res.success) {
                    Navigator.navigateToDeepScreen([TabsName.homeTabs], ScreenName.detailInvestment, { status: ENUM_INVEST_STATUS.INVESTING, id: `${item?.action_id}` });
                }
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
    }, [apiServices.invest, styles.item, styles.itemBlur, styles.rowTop, styles.title, styles.txtNote, styles.txtRight, styles.txtTimeDate, styles.viewLeft]);

    const renderFooter = useMemo(() => {
        return <>
            {canLoadMoreUI && <Loading />}
        </>;
    }, [canLoadMoreUI]);

    const renderEmptyData = useMemo(() => {
        return (
            <>
                {!canLoadMoreUI && <NoData img={<IcNoDataNotify />} description={Languages.home.noNotify} />}
            </>
        );
    }, [canLoadMoreUI, styles.wrapNoData]);

    const onRefreshing = useCallback(() => {
        condition.current.offset = 0;
        condition.current.canLoadMore = true;
        setIsRefreshing(true);
        fetchData();
        setIsRefreshing(false);
    }, [fetchData]);

    const handleLoadMore = useCallback(() => {
        if (!condition.current.isLoading && condition.current.canLoadMore) {
            fetchData(true);
        }
    }, [fetchData]);

    const renderNotify = useMemo(() => {
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
    }, [data, styles.flatList, renderItem, keyExtractor, renderEmptyData, renderFooter, isRefreshing, onRefreshing, handleLoadMore]);

    return (
        <View style={styles.container}>
            <HeaderBar title={Languages.invest.notify} hasBack />
            <View style={styles.wrapContent}>
                {data && renderNotify}
            </View>
        </View>
    );
};

