import { observer } from 'mobx-react';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { FlatList, View } from 'react-native';
import { useIsFocused } from '@react-navigation/native';

import ICCalender from '@/assets/image/ic_arrow_date_picker.svg';
import Languages from '@/common/Languages';
import DatePickerTransaction from '@/components/DatePicker';
import { Touchable } from '@/components/elements/touchable';
import Filter from '@/components/Filter';
import HeaderBar from '@/components/header';
import KeyValueTransaction from '@/components/KeyValueTransaction';
import { useAppStore } from '@/hooks';
import { TransactionTypes } from '@/mocks/data';
import { KeyValueModel } from '@/models/keyValue-model';
import { PagingConditionTypes } from '@/models/paging';
import { TransactionModel } from '@/models/transaction-model';
import { styles } from './styles';
import NoData from '@/components/NoData';
import DateUtils from '@/utils/DateUtils';
import Loading from '@/components/loading';
import IMGNoDataTransaction from '@/assets/image/img_no_data_transaction.svg';

const PER_PAGE = 7;

const Transaction = observer(() => {
    const { apiServices } = useAppStore();
    const isFocused = useIsFocused();
    const [isFreshing, setIsFreshing] = useState<boolean>(true);
    const [isFilterLoading, setFilterLoading] = useState<boolean>(false);
    const [isLoadMore, setLoadMore] = useState<boolean>(true);
    const [dataHistory, setDataHistory] = useState<TransactionModel[]>([]);

    const { common } = useAppStore();

    const condition = useRef<PagingConditionTypes>({
        isLoading: true,
        canLoadMore: true,
        offset: 0,
        startDate: '',
        endDate: '',
        option: TransactionTypes[0].type
    });
    const [selectedFilter, setSelectedFilter] = useState<string>(condition.current.option || '');

    useEffect(() => {
        if (isFocused) {
            setDataHistory([]);
            common.setIsFocus(true);
            fetchHistory();
            setSelectedFilter(TransactionTypes[0].type);
        } else {
            common.setIsFocus(false);
        }
    }, [isFocused, common.isFocused, common]);

    const fetchHistory = useCallback(async (fDate?: string, tDate?: string, option?: string, isLoadMoreData?: boolean) => {
        if (!isLoadMoreData) {
            setLoadMore(true);
        }
        const res = await apiServices.history.getHistory(
            fDate || '',
            tDate || '',
            option || '',
            PER_PAGE,
            isLoadMoreData ? condition.current.offset : 0
        );
        const data = res.data as TransactionModel[];
        const dataSize = data?.length;
        if (dataSize > 0) {
            condition.current.offset = isLoadMoreData ? condition.current.offset + dataSize : dataSize;
            if (isLoadMoreData) {
                setDataHistory((last) => [...last || [], ...data]);
            }
            else {
                setDataHistory(data);
            }
        } else if (!res.success || !isLoadMoreData) {
            setDataHistory([]);
        }
        condition.current.canLoadMore = dataSize >= PER_PAGE;
        setIsFreshing(false);
        setLoadMore(condition.current.canLoadMore);

    }, [apiServices.history]);

    const onRefresh = useCallback((startDate?: Date, endDate?: Date, option?: string, isRefreshDate?: boolean) => {
        setIsFreshing(true);
        setDataHistory([]);
        condition.current.canLoadMore = false;
        condition.current.offset = 0;
        condition.current.startDate = startDate || '';
        condition.current.endDate = endDate || '';
        condition.current.option = option;
        setSelectedFilter(condition.current.option || '');
        if (isRefreshDate) {
            common.setRefresh(true);
            fetchHistory(
                '',
                '',
                condition.current.option || option
            );
        } else {
            fetchHistory(
                `${DateUtils.formatMMDDYYYYPicker(condition.current.startDate)}`,
                `${DateUtils.formatMMDDYYYYPicker(condition.current.endDate)}`,
                condition.current.option || option
            );
        }
    }, [common, fetchHistory]);

    const renderFilterTemplate = useCallback(
        (item: KeyValueModel) => {
            let selected = false;
            if (item.type === selectedFilter) {
                selected = true;
            }

            const _onPress = () => {
                setDataHistory([]);
                condition.current.option = item.type;
                setSelectedFilter(item.type || TransactionTypes[0].type);
                if (condition.current.startDate && condition.current.endDate) {
                    setFilterLoading(true);
                    fetchHistory(
                        `${DateUtils.formatMMDDYYYYPicker(condition.current.startDate)}`,
                        `${DateUtils.formatMMDDYYYYPicker(condition.current.endDate)}`,
                        condition.current.option
                    );
                    setFilterLoading(false);
                } else {
                    setFilterLoading(true);
                    fetchHistory(
                        '',
                        '',
                        condition.current.option
                    );
                    setFilterLoading(false);
                }
            };

            return (
                <Filter
                    key={item.value}
                    style={styles.filterItem}
                    item={item}
                    onPress={_onPress}
                    selected={selected}
                    disabled={false}
                />
            );
        },
        [selectedFilter, fetchHistory]
    );
    const renderFilter = useMemo(() => {
        return (
            <View style={styles.topBarContainer}>
                {TransactionTypes.map(
                    renderFilterTemplate
                )}
            </View>
        );
    }, [renderFilterTemplate]);

    const keyExtractor = useCallback((item: TransactionModel, index?: number) => {
        return `${index}`;
    }, []);

    const renderItem = useCallback(({ item }: { item: TransactionModel }) => {
        const _onPress = () => {

        };
        return (<Touchable onPress={_onPress}>
            <KeyValueTransaction
                title={item?.so_tien}
                content={item?.hinh_thuc}
                dateTime={item?.created_at}
                debtNow={item?.so_du}
                styleColor={item?.color}
            />
        </Touchable>);
    }, []);

    const renderEmptyData = useMemo(() => {
        return (
            <View style={styles.wrapNoData}>
                <NoData description={Languages.transaction.noDataTransaction} img={<IMGNoDataTransaction />} />
            </View>
        );
    }, []);

    const renderFooter = useMemo(() => {
        return <>
            {isLoadMore && <Loading />}
        </>;
    }, [isLoadMore]);

    const onEndReached = useCallback(() => {
        fetchHistory(
            `${DateUtils.formatMMDDYYYYPicker(condition.current.startDate)}` || '',
            `${DateUtils.formatMMDDYYYYPicker(condition.current.endDate)}` || '',
            condition.current.option,
            true
        );
    }, [fetchHistory]);

    const renderTransaction = useMemo(() => {
        const onFreshing = () => {
            onRefresh(condition.current.startDate, condition.current.endDate, condition.current.option, true);
        };
        return (
            <FlatList
                data={dataHistory}
                keyExtractor={keyExtractor}
                renderItem={renderItem}
                refreshing={isFreshing}
                onRefresh={onFreshing}
                onEndReachedThreshold={0.99}
                onEndReached={onEndReached}
                style={styles.wrapFlatList}
                ListEmptyComponent={renderEmptyData}
                ListFooterComponent={renderFooter}
            />
        );
    }, [dataHistory, keyExtractor, renderItem, isFreshing, onEndReached, renderEmptyData, renderFooter, onRefresh]);

    const onChange = (date: Date, tag?: string) => {
        switch (tag) {
            case Languages?.transaction?.fromDate:
                condition.current.startDate = date;
                if (condition.current.startDate && condition.current.endDate) {
                    onRefresh(date, condition.current.endDate, condition.current.option, false);
                }
                break;
            case Languages?.transaction?.toDate:
                condition.current.endDate = date;
                if (condition.current.startDate && condition.current.endDate) {
                    onRefresh(condition.current.startDate, date, condition.current.option, false);
                }
                break;
            default:
                break;
        }
    };

    const onConfirmValue = (date: Date, tag?: string) => {
        onChange(date, tag);
    };

    return (
        <View style={styles.container}>
            <HeaderBar isLight={false} title={Languages.transaction.title} />
            {renderFilter}
            <View style={styles.row}>
                <DatePickerTransaction
                    title={Languages.transaction.fromDate}
                    onConfirmDatePicker={onConfirmValue}
                    onDateChangeDatePicker={onChange}
                    date={condition.current.startDate || new Date()}
                    maximumDate={condition.current.endDate || new Date()}
                />
                <ICCalender style={styles.arrow} />
                <DatePickerTransaction
                    title={Languages.transaction.toDate}
                    onConfirmDatePicker={onConfirmValue}
                    onDateChangeDatePicker={onChange}
                    date={condition.current.endDate || new Date()}
                    minimumDate={condition.current.startDate || new Date()}
                    maximumDate={new Date()}
                />
            </View>
            {renderTransaction}
            {isFilterLoading && <Loading isOverview />}
        </View>
    );
});

export default Transaction;
