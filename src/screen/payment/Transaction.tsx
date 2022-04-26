import { useIsFocused } from '@react-navigation/native';
import { observer } from 'mobx-react';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { FlatList, View } from 'react-native';

import ICCalender from '@/assets/image/ic_arrow_date_picker.svg';
import Languages from '@/common/Languages';
import DatePickerTransaction from '@/components/DatePicker';
import { Touchable } from '@/components/elements/touchable';
import Filter from '@/components/Filter';
import HeaderBar from '@/components/header';
import KeyValueTransaction from '@/components/KeyValueTransaction';
import { useAppStore } from '@/hooks';
import { DATA, TransactionTypes } from '@/mocks/data';
import { KeyValueModel } from '@/models/keyValue-model';
import { PagingConditionTypes } from '@/models/paging';
import { TransactionModel } from '@/models/transaction-model';
import { styles } from './styles';

const Transaction = observer(() => {
    const isFocused = useIsFocused();

    const [selectedFilter, setSelectedFilter] = useState<number>(TransactionTypes[0].value);
    const [isFreshing, setIsFreshing] = useState<boolean>(true);
    const [dataHistory, setDataHistory] = useState<TransactionModel[]>();

    const condition = useRef<PagingConditionTypes>({
        isLoading: true,
        canLoadMore: true,
        offset: 0,
        startDate: undefined,
        endDate: undefined,
        option: TransactionTypes[0].type
    });
    const { apiServices } = useAppStore();

    const fetchHistory = useCallback(async () => {
        setIsFreshing(true);
        const res = await apiServices.history.getHistory(
            3,
            condition.current?.startDate,
            condition.current?.endDate, 
            condition.current?.option
        );
        if(res.success){
            setIsFreshing(false);
            setDataHistory(res?.data?.data as TransactionModel[]);
        }
        setIsFreshing(false);
    }, [apiServices.history]);

    useEffect(() => {
        if (isFocused) {
            setIsFreshing(false);
            fetchHistory();
        }
    }, [dataHistory, fetchHistory, isFocused]);

    const onRefresh = useCallback((startDate?: Date, endDate?: Date) => { 
        setIsFreshing(true);
        // condition.current.canLoadMore = true;
        // condition.current.offset = 0;
        condition.current.startDate = startDate;
        condition.current.endDate = endDate;
        condition.current.option = TransactionTypes[0].type ;
        fetchHistory();
        setIsFreshing(false);
    }, [fetchHistory]);

    const renderFilterTemplate = useCallback(
        (item: KeyValueModel) => {
            let selected = false;
            if (item.value === selectedFilter) {
                selected = true;
            }

            const _onPress = () => {
                setSelectedFilter(item.value);
                condition.current.option = item.type;
                console.log('condition.current.option = ', condition.current.option);
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
        [selectedFilter]
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

    const keyExtractor = useCallback((item: TransactionModel, index?:number) => {
        return `${index}`;
    }, []);

    const renderItem = useCallback(({ item }: { item: TransactionModel }) => {
        const _onPress = () => {

        };
        return (<Touchable onPress={_onPress}>
            <KeyValueTransaction
                title={item.so_tien}
                content={item.hinh_thuc}
                dateTime={item.created_at}
                debtNow={item.so_du}
                styleColor={item.color}
            />
        </Touchable>);
    }, []);

    const renderTransaction = useMemo(() => {
        return (
            <FlatList
                data={DATA}
                keyExtractor={keyExtractor}
                renderItem={renderItem}
                refreshing={isFreshing}
                onRefresh={onRefresh}
            />
        );
    }, [isFreshing, keyExtractor, onRefresh, renderItem]);

    const onChange = (date: Date, tag?: string) => {
        switch (tag) {
            case Languages?.transaction?.fromDate:
                onRefresh(date, condition.current.endDate);
                break;
            case Languages?.transaction?.toDate:
                onRefresh(condition.current.startDate, date);
                break;
            default:
                break;
        }
    };

    const onConfirmValue = (date: Date, tag?: string) => {
        onChange(date, tag);
        console.log('start', condition.current.startDate);
        console.log('end', condition.current.endDate);
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
            {renderTransaction}
        </View>
    );
});

export default Transaction;
