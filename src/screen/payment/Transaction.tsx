import { Image, StyleSheet, Text, View } from 'react-native';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { FlatList } from 'react-native-gesture-handler';

import KeyValueTransaction from '../../components/KeyValueTransaction';
import HeaderBar from '../../components/header';
import Languages from '../../common/Languages';
import { COLORS } from '../../theme';
import { Touchable } from '../../components/elements/touchable';
import Filter from '../../components/Filter';
import { DATA, TransactionTypes } from '../../mocks/data';
import DatePickerTransaction from '../../components/DatePicker';
import Images from '../../asset/Images';
import { KeyValueModel } from '@/models/keyValue-model';
import { PagingConditionTypes } from '@/models/paging';
import { TransactionModel } from '@/models/transaction-model';

const Transaction = () => {
    const [selectedFilter, setSelectedFilter] = useState<number>(TransactionTypes[0].value);
    const condition = useRef<PagingConditionTypes>({
        isLoading: true,
        canLoadMore: true,
        offset: 0,
        startDate: undefined,
        endDate: undefined
    });
    const renderFilterTemplate = useCallback(
        (item: KeyValueModel) => {
            let selected = false;
            if (item.value === selectedFilter) {
                selected = true;
            }

            const _onPress = () => {
                setSelectedFilter(item.value);
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

    const keyExtractor = useCallback((item: TransactionModel) => {
        return `${item.id}`;
    }, []);

    const renderItem = useCallback(({ item }: { item: TransactionModel }) => {
        const _onPress = () => {

        };
        return (<Touchable onPress={_onPress}>
            <KeyValueTransaction
                title={item.growth}
                content={item.content}
                dateTime={item.date}
                debtNow={item.debt}
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
            />
        );
    }, [keyExtractor, renderItem]);

    const onChange = (date: Date, tag?: string) => {
        switch (tag) {
            case Languages?.transaction.fromDate:
                // condition.current.startDate;
                // onRefresh(date, condition.current.endDate);
                break;
            case Languages.transaction.toDate:
                // onRefresh(condition.current.startDate, date);
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
                    // onDateChangeDatePicker={onChange}
                    date={condition.current.startDate || new Date()}
                    maximumDate={new Date()}
                />
                {/* <Image source={Images.ic_arrow_date} resizeMode={'contain'} style={styles.arrow}/> */}
                <DatePickerTransaction
                    title={Languages.transaction.toDate}
                    onConfirmDatePicker={onConfirmValue}
                    // onDateChangeDatePicker={onChange}
                    date={condition.current.endDate || new Date()}
                    maximumDate={new Date()}
                />
            </View>

            {renderTransaction}
        </View>
    );
};

export default Transaction;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.GRAY_8
    },
    topBarContainer: {
        backgroundColor: COLORS.GRAY_13,
        borderRadius: 26,
        marginHorizontal: 16,
        flexDirection: 'row',
        marginTop: 10
    },
    filterItem: {
        paddingHorizontal: 5
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 16,
        marginTop: 12,
        marginBottom:20
    }, 
    arrow: {
        marginTop:6
    }
});
