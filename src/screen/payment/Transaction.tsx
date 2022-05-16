import { observer } from 'mobx-react';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ActivityIndicator, FlatList, RefreshControl, View } from 'react-native';
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
import SessionManager from '@/manager/SessionManager';
import Navigator from '@/routers/Navigator';
import ScreenName from '@/common/screenNames';
import IMGNoDataTransaction from '@/assets/image/img_no_data_transaction.svg';

const Transaction = observer(() => {
    const { apiServices, fastAuthInfoManager } = useAppStore();
    const { supportedBiometry } = fastAuthInfoManager;
    const isFocused = useIsFocused();
    const [isFreshing, setIsFreshing] = useState<boolean>(true);
    const [dataHistory, setDataHistory] = useState<TransactionModel[]>([]);
    const [onEndReachedCalledDuringMomentum, setOnEndReachedCalledDuringMomentum] = useState<boolean>(true);

    const { common } = useAppStore();

    const condition = useRef<PagingConditionTypes>({
        isLoading: false,
        canLoadMore: false,
        offset: 0,
        startDate: '',
        endDate: '',
        option: TransactionTypes[0].type
    });
    const [selectedFilter, setSelectedFilter] = useState<string>(condition.current.option || '');

    useEffect(() => {
        if (!SessionManager.accessToken || !supportedBiometry) {
            Navigator.navigateToDeepScreen([ScreenName.authStack], ScreenName.auth, { titleAuth: Languages.auth.txtLogin });
        }
    }, [supportedBiometry]);

    useEffect(() => {
        if (isFocused) {
            common.setIsFocus(true);
            fetchHistory();
            setSelectedFilter(TransactionTypes[0].type);
        } else {
            common.setIsFocus(false);
        }
    }, [isFocused, common.isFocused, common]);

    const fetchHistory = useCallback(async (fDate?: string, tDate?: string, option?: string) => {
        condition.current.isLoading = true;
        const res = await apiServices.history.getHistory(
            fDate || '',
            tDate || '',
            option || ''
        );
        condition.current.isLoading = false;
        if (res.success) {
            const data = res.data as TransactionModel[];
            setDataHistory(data);
            setIsFreshing(false);
        }
        setIsFreshing(false);

    }, [apiServices.history]);

    const onRefresh = useCallback((startDate?: Date, endDate?: Date, option?: string, isRefreshDate?: boolean) => {
        setIsFreshing(true);
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
                condition.current.option = item.type;
                condition.current.isLoading = true;
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
                condition.current.isLoading = false;
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

    const handleLoadMore = useCallback(() => {
        fetchHistory(
            '',
            '',
            condition.current.option
        );
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
                <NoData description={Languages.transaction.noDataTransaction} img={<IMGNoDataTransaction/>}/>
            </View>
        );
    }, []);

    const renderFooter = () => {
        return <ActivityIndicator size="large" color="red" />;
    };

    const renderRefreshControl = useMemo(() => {
        const onFreshing = () => {
            onRefresh(condition.current.startDate, condition.current.endDate, condition.current.option, true);
        };
        return (<RefreshControl refreshing={false} onRefresh={onFreshing} />);
    }, [onRefresh]);

    const renderTransaction = useMemo(() => {

        return (
            <FlatList
                data={dataHistory}
                keyExtractor={keyExtractor}
                renderItem={renderItem}
                refreshControl={renderRefreshControl}
                onEndReachedThreshold={0.999}
                onEndReached={handleLoadMore}
                style={styles.wrapFlatList}
                // onContentSizeChange={() => setOnEndReachedCalledDuringMomentum(true)}
                ListEmptyComponent={renderEmptyData}
                ListFooterComponent={renderFooter}
            />
        );
    }, [dataHistory, keyExtractor, renderItem, renderRefreshControl, handleLoadMore, renderEmptyData]);

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
            {condition.current.isLoading && isFreshing === false && <Loading isOverview />}
        </View>
    );
});

export default Transaction;
