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

const Transaction = observer(() => {
    const { apiServices } = useAppStore();
    const isFocused = useIsFocused();
    const [isFreshing, setIsFreshing] = useState<boolean>(true);
    const [dataHistory, setDataHistory] = useState<TransactionModel[]>([]);

    const condition = useRef<PagingConditionTypes>({
        isLoading: true,
        canLoadMore: true,
        offset: 0,
        startDate: '',
        endDate: '',
        option: TransactionTypes[0].type
    });
    const [selectedFilter, setSelectedFilter] = useState<string>(condition.current.option || '');


    const fetchHistory = useCallback(async (fDate?: string, tDate?: string, option?: string) => {
        console.log('start', DateUtils.formatMMDDYYYYPicker(condition.current.startDate));
        console.log('end', DateUtils.formatMMDDYYYYPicker(condition.current.endDate));
        console.log('option', condition.current.option);
        console.log('select', selectedFilter);
        const res = await apiServices.history.getHistory(
            3,
            fDate || '',
            tDate || '',
            condition.current.option || option
        );

        if (res.success) {
            const data = res.data as TransactionModel[];
            setDataHistory(data);
            setIsFreshing(false);
        }
        setIsFreshing(false);

    }, [apiServices.history, selectedFilter]);

    useEffect(() => {
        if (isFocused) {
            fetchHistory();
        }
    }, []);

    const onRefresh = useCallback((startDate?: Date, endDate?: Date, isRefreshDate?: boolean, option?: string) => {
        setIsFreshing(true);
        condition.current.canLoadMore = true;
        condition.current.offset = 0;
        condition.current.startDate = startDate || '';
        condition.current.endDate = endDate || '';
        condition.current.option = option || TransactionTypes[0].type;
        setSelectedFilter(condition.current.option || '');
        if (isRefreshDate) {
            return fetchHistory(
                '',
                '',
                selectedFilter
            );

        }
        return fetchHistory(
            `${DateUtils.formatMMDDYYYYPicker(condition.current.startDate)}`,
            `${DateUtils.formatMMDDYYYYPicker(condition.current.endDate)}`,
            selectedFilter
        );

    }, [fetchHistory, selectedFilter]);



    const renderFilterTemplate = useCallback(
        (item: KeyValueModel) => {
            let selected = false;
            if (item.type === selectedFilter) {
                selected = true;
            }

            const _onPress = () => {
                condition.current.option = item.type;
                setSelectedFilter(item.type || TransactionTypes[0].type);
                fetchHistory(
                    !condition.current.isLoading ? `${DateUtils.formatMMDDYYYYPicker(condition.current.startDate)}` : '',
                    !condition.current.isLoading ? `${DateUtils.formatMMDDYYYYPicker(condition.current.endDate)}` : '',
                    condition.current.option
                );
            };

            return (
                <Filter
                    key={item.value}
                    style={styles.filterItem}
                    item={item}
                    onPress={_onPress}
                    selected={selected}
                />
            );
        },
        [fetchHistory, selectedFilter]
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

    const onEndReached = useCallback(() => {
        if (!condition.current.isLoading && condition.current.canLoadMore) {
            // fetchHistory();
        }
    }, [fetchHistory]);

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

    const renderTransaction = useMemo(() => {
        return (
            <FlatList
                data={dataHistory}
                keyExtractor={keyExtractor}
                renderItem={renderItem}
                refreshing={isFreshing}
                onRefresh={onRefresh}
                onEndReached={onEndReached}
                onEndReachedThreshold={0.01}
            />
        );
    }, [dataHistory, isFreshing, keyExtractor, onEndReached, onRefresh, renderItem]);

    const onChange = (date: Date, tag?: string) => {
        switch (tag) {
            case Languages?.transaction?.fromDate:
                onRefresh(date, condition.current.endDate, false, condition.current.option);
                break;
            case Languages?.transaction?.toDate:
                onRefresh(condition.current.startDate, date, false, condition.current.option);
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
                    maximumDate={new Date()}
                />
                <ICCalender style={styles.arrow} />
                <DatePickerTransaction
                    title={Languages.transaction.toDate}
                    onConfirmDatePicker={onConfirmValue}
                    onDateChangeDatePicker={onChange}
                    date={condition.current.endDate || new Date()}
                    minimumDate={condition.current.startDate}
                    maximumDate={new Date()}
                />
            </View>
            {dataHistory.length !== 0 ? renderTransaction : <NoData description='NoData' />}
        </View>
    );
});

export default Transaction;
