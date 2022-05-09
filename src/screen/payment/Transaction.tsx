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
    const [onEndReachedCalledDuringMomentum, setOnEndReachedCalledDuringMomentum] = useState<boolean>(true);
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
            common.setIsFocus(true);
            fetchHistory();
            setSelectedFilter(TransactionTypes[0].type);
        } else {
            common.setIsFocus(false);
        }
    }, [isFocused, common.isFocused]);

    const fetchHistory = useCallback(async (fDate?: string, tDate?: string, option?: string) => {
        const res = await apiServices.history.getHistory(
            fDate || '',
            tDate || '',
            option || ''
        );

        if (res.success) {
            const data = res.data as TransactionModel[];
            setDataHistory(data);
            setIsFreshing(false);
        }
        setIsFreshing(false);

    }, [apiServices.history]);

    const onRefresh = useCallback((startDate?: Date, endDate?: Date, isRefreshDate?: boolean, option?: string) => {
        setIsFreshing(true);
        condition.current.canLoadMore = true;
        condition.current.offset = 0;
        condition.current.startDate = startDate || '';
        condition.current.endDate = endDate || '';
        condition.current.option = option || TransactionTypes[0].type;
        setSelectedFilter(condition.current.option || '');
        if (isRefreshDate) {
            common.setRefresh(true);
            fetchHistory(
                '',
                '',
                condition.current.option
            );
        } else {
            fetchHistory(
                `${DateUtils.formatMMDDYYYYPicker(condition.current.startDate)}`,
                `${DateUtils.formatMMDDYYYYPicker(condition.current.endDate)}`,
                condition.current.option
            );
        }

    }, [fetchHistory, condition.current.option]);



    const renderFilterTemplate = useCallback(
        (item: KeyValueModel) => {
            let selected = false;
            if (item.type === selectedFilter) {
                selected = true;
            }

            const _onPress = () => {
                condition.current.option = item.type;
                condition.current.isLoading = false;
                setSelectedFilter(item.type || TransactionTypes[0].type);
                if (condition.current.startDate && condition.current.endDate) {
                    fetchHistory(
                        `${DateUtils.formatMMDDYYYYPicker(condition.current.startDate)}`,
                        `${DateUtils.formatMMDDYYYYPicker(condition.current.endDate)}`,
                        condition.current.option
                    );
                } else {
                    fetchHistory(
                        '',
                        '',
                        condition.current.option
                    );
                }
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
        [selectedFilter, condition]
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
        if (!onEndReachedCalledDuringMomentum) {
            fetchHistory();
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
                onRefresh={() => onRefresh(condition.current.startDate, condition.current.endDate, true, condition.current.option)}
                onEndReached={onEndReached}
                onEndReachedThreshold={0.5}
                onMomentumScrollBegin={() => setOnEndReachedCalledDuringMomentum(false)}
            />
        );
    }, [dataHistory, isFreshing, keyExtractor, onEndReached, onRefresh, renderItem]);

    const onChange = (date: Date, tag?: string) => {
        switch (tag) {
            case Languages?.transaction?.fromDate:
                condition.current.startDate = date;
                if (condition.current.endDate && condition.current.endDate) {
                    onRefresh(date, condition.current.endDate, false, condition.current.option);
                }
                break;
            case Languages?.transaction?.toDate:
                condition.current.endDate = date;
                if (condition.current.startDate && condition.current.endDate) {
                    onRefresh(condition.current.startDate, date, false, condition.current.option);
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
            {dataHistory ? renderTransaction : <NoData description='NoData' />}
        </View>
    );
});

export default Transaction;
