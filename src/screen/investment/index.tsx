import { debounce } from 'lodash';
import { observer } from 'mobx-react';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Text, TextStyle, View, ViewStyle } from 'react-native';

import IMGNoData from '@/assets/image/img_no_data_invest.svg';
import IcBtnFilter from '@/assets/image/ic_button_filter.svg';
import arrayIcon from '@/common/arrayIcon';
import { ENUM_INVEST_STATUS } from '@/common/constants';
import Languages from '@/common/Languages';
import ScreenName from '@/common/screenNames';
import { ItemProps } from '@/components/bottomsheet';
import BottomSheetComponentInvest from '@/components/BottomSheetInvest';
import { MyTextInput } from '@/components/elements/textfield';
import { Touchable } from '@/components/elements/touchable';
import ItemInvest from '@/components/ItemInvest';
import Loading from '@/components/loading';
import MyFlatList from '@/components/MyFlatList';
import PopupFilterInvested from '@/components/PopupFilterInvested';
import PopupInvest from '@/components/popupInvest';
import { useAppStore } from '@/hooks';
import { PackageInvest, PagingConditionTypes } from '@/models/invest';
import NoData from '@/components/NoData';
import Navigator from '@/routers/Navigator';
import { COLORS } from '@/theme';
import Utils from '@/utils/Utils';
import { HeaderBar } from '../../components/header';
import styles from './styles';

const PAGE_SIZE = 5;

const Investment = observer(({ route }: { route: any }) => {
    const [btnInvest, setBtnInvest] = useState<string>(ENUM_INVEST_STATUS.INVEST_NOW);
    const [textSearch, setTextSearch] = useState<string>();
    const [listStore, setListStore] = useState<PackageInvest[]>();
    const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const [dataTime, setDataTime] = useState<any>([]);
    const [timeValue, setTimeValue] = useState<ItemProps>();

    const [dataMoney, setDataMoney] = useState<any>([]);
    const [moneyValueInvest, setMoneyValueInvest] = useState<ItemProps>();
    const [moneyValueInvested, setMoneyValueInvested] = useState<ItemProps>();

    const popupInvestRef = useRef<any>();
    const popupInvestedRef = useRef<any>();

    const refBottomSheetMonth = useRef<any>(null);
    const refBottomSheetMoney = useRef<any>(null);
    const [canLoadMoreUI, setCanLoadMoreUI] = useState<boolean>(false);
    const condition = useRef<PagingConditionTypes>({
        isLoading: true,
        offset: 0,
        canLoadMore: true,
        timeInvestment: '',
        moneyInvest: '',
        textSearch: '',
        fromDate: '',
        toDate: '',
        moneyInvested: ''
    });

    const {
        common, apiServices
    } = useAppStore();


    useEffect(() => {
        setBtnInvest(ENUM_INVEST_STATUS.INVEST_NOW);
        fetchData(ENUM_INVEST_STATUS.INVEST_NOW, false);
        fetchDataTimeInvestment();
        fetchDataMoney();
    }, []);


    const fetchDataInvested = useCallback(async (isLoadMore?: boolean) => {
        if(!isLoadMore)
        {
            setIsLoading(true);
        }
        else{
            setCanLoadMoreUI(true);
        }
        condition.current.isLoading = true;
        const resInvest = await apiServices.invest.getListContractInvesting(
            condition.current.textSearch,
            condition.current.moneyInvest,
            condition.current.fromDate,
            condition.current.toDate,
            isLoadMore ? condition.current.offset : 0,
            PAGE_SIZE);
        const newData = resInvest.data as PackageInvest[];
        const newSize = newData?.length;

        if (newSize > 0) {
            if (isLoadMore) {
                setListStore((data) => [...data || [], ...newData]);
            }
            else {
                setListStore(newData);
            }
            condition.current.offset = isLoadMore ? condition.current.offset + newSize : newSize;
        }
        else if (!resInvest?.success || !isLoadMore) {
            setListStore([]);
        }
        condition.current.isLoading = false;
        condition.current.canLoadMore = newSize >= PAGE_SIZE;
        setIsLoading(false);
    }, [apiServices.invest]);

    const fetchAllDataInvest = useCallback(async (isLoadMore?: boolean) => {
        if(!isLoadMore)
        {
            setIsLoading(true);
        }
        else{
            setCanLoadMoreUI(true);
        }
        condition.current.isLoading = true;
        const resInvest = await apiServices.invest.getAllContractInvest(
            condition.current.textSearch,
            condition.current.timeInvestment,
            condition.current.moneyInvest,
            isLoadMore ? condition.current.offset : 0,
            PAGE_SIZE);
        const newData = resInvest.data as PackageInvest[];
        const newSize = newData?.length;

        if (newSize > 0) {
            if (isLoadMore) {
                setListStore((data) => [...data || [], ...newData]);
            }
            else {
                setListStore(newData);
            }
            condition.current.offset = isLoadMore ? condition.current.offset + newSize : newSize;
        }
        else if (!resInvest?.success || !isLoadMore) {
            setListStore([]);
        }
        condition.current.isLoading = false;
        condition.current.canLoadMore = newSize >= PAGE_SIZE;
        setIsLoading(false);
        setCanLoadMoreUI(condition.current.canLoadMore);
    }, [apiServices.invest]);


    const fetchData = useCallback((type: string, isLoadMore?: boolean) => {
        switch (type) {
            case ENUM_INVEST_STATUS.INVEST_NOW:
                fetchAllDataInvest(isLoadMore);
                break;
            case ENUM_INVEST_STATUS.INVESTING:
                fetchDataInvested(isLoadMore);
                break;
            case ENUM_INVEST_STATUS.HISTORY:
                break;
            default:
                break;
        }
    }, [fetchAllDataInvest, fetchDataInvested]);

    const onEndReached = useCallback(() => {
        if (!condition.current.isLoading && condition.current.canLoadMore) {
            fetchData(btnInvest, true);
        }
    }, [btnInvest, fetchData]);

    const onRefresh = useCallback(() => {
        setTimeValue({});
        setMoneyValueInvest({});
        condition.current.offset = 1;
        condition.current.timeInvestment = '';
        condition.current.moneyInvest = '';
        condition.current.textSearch = '';
        setIsRefreshing(true);
        fetchData(btnInvest);
        setIsRefreshing(false);
        setTextSearch(undefined);
    }, [btnInvest, fetchData]);

    const fetchDataTimeInvestment = useCallback(async () => {
        const res = await apiServices.invest.getListTimeInvestment();
        if (res.success) {
            const data = res.data as [];
            const temp = Object.entries(data);
            setDataTime(temp.map((item) => {
                return {
                    id: item[0],
                    value: item[1]

                };
            }));
        }
    }, [apiServices.invest]);

    const fetchDataMoney = useCallback(async () => {
        const res = await apiServices.invest.getListMoneyInvestment();
        if (res.success) {
            const data = res.data as [];
            const temp = Object.entries(data);
            setDataMoney(temp.map((item) => {
                return {
                    id: item[0],
                    value: item[1]

                };
            }));
        }
    }, [apiServices.invest]);

    const navigateToDetail = useCallback((item: any) => {
        if (item) {
            Navigator.pushScreen(ScreenName.detailInvestment, { status: btnInvest, id: item?.id });
        }
    }, [btnInvest]);

    const navigateToInvestNow = useCallback((item: any) => {
        Navigator.pushScreen(ScreenName.invest, { status: btnInvest, id: item?.id });
    }, [btnInvest]);

    const openBottomSheet = useCallback((type: string) => {
        if (type === Languages.invest.monthInvest)
            refBottomSheetMonth.current.show();
        if (type === Languages.invest.chooseMoney)
            refBottomSheetMoney.current.show();
    }, []);

    const onPressItem = useCallback((item?: any, title?: string) => {
        console.log('tt', item);
        if (title === Languages.invest.monthInvest) {
            setTimeValue(item);
            condition.current.timeInvestment = item.id;
        }
        if (title === Languages.invest.chooseMoney) {
            if (btnInvest === ENUM_INVEST_STATUS.INVEST_NOW) {
                setMoneyValueInvest(item);
                condition.current.moneyInvest = item.id;
            }
            if (btnInvest === ENUM_INVEST_STATUS.INVESTING) {
                setMoneyValueInvested(item);
                condition.current.moneyInvested = item.id;
            }
        }


        if (btnInvest === ENUM_INVEST_STATUS.INVEST_NOW) {
            popupInvestRef.current?.show();
        }
        else {
            popupInvestedRef.current?.show();
        }
    }, [btnInvest]);

    const debounceSearchItem = useCallback(debounce(() => fetchData(btnInvest), 500), [btnInvest]);

    const handleInputOnchange = useCallback(
        (value: string) => {
            setTextSearch(Utils.formatMoney(value));
            condition.current.textSearch = Utils.formatTextToNumber(value);
            debounceSearchItem();
        },
        [debounceSearchItem]
    );
    const keyExtractor = useCallback((item: any, index: number) => {
        return `${index}${item.id}`;
    }, []);

    const renderItem = useCallback(({ item }: any) => {
        switch (btnInvest) {
            case ENUM_INVEST_STATUS.INVEST_NOW:
                return <ItemInvest onPress={() => navigateToDetail(item)} onPressInvestNow={() => navigateToInvestNow(item)} data={item} title={ENUM_INVEST_STATUS.INVEST_NOW} />;
            case ENUM_INVEST_STATUS.INVESTING:
                return <ItemInvest onPress={() => navigateToDetail(item)} data={item} title={ENUM_INVEST_STATUS.INVESTING} />;
            case ENUM_INVEST_STATUS.HISTORY:
                return <ItemInvest onPress={() => navigateToDetail(item)} data={item} title={ENUM_INVEST_STATUS.HISTORY} />;
            default:
                return null;
        }
    }, [btnInvest, navigateToDetail, navigateToInvestNow]);

    const renderInvest = useCallback((type: string) => {
        const styleBt = {
            backgroundColor: btnInvest === type ? COLORS.WHITE : null,
        } as ViewStyle;

        const styleTxt = {
            color: btnInvest === type ? COLORS.GREEN : COLORS.GRAY_7
        } as TextStyle;

        const onPress = () => {
            setBtnInvest(type);
            fetchData(type);
            condition.current.offset = 0;
            setListStore([]);
        };

        const getTitle = () => {
            switch (type) {
                case ENUM_INVEST_STATUS.INVEST_NOW:
                    return Languages.invest.attractInvest;
                case ENUM_INVEST_STATUS.INVESTING:
                    return Languages.invest.investing;
                case ENUM_INVEST_STATUS.HISTORY:
                    return Languages.invest.history;
                default:
                    return Languages.invest.attractInvest;
            }
        };

        return (
            <Touchable disabled={btnInvest === type} onPress={onPress} style={[styles.btInvest, styleBt]} radius={26}>
                <Text style={[styles.txtBtnStatus, styleTxt]}>{getTitle()}</Text>
            </Touchable>
        );
    }, [btnInvest, fetchData]);

    const onConfirmFilter = useCallback(() => {
        fetchData(btnInvest);
    }, [btnInvest, fetchData]);

    const onConfirmFilterInvested = useCallback((fromDate: string, toDate: string) => {
        condition.current.fromDate = fromDate;
        condition.current.toDate = toDate;
        condition.current.moneyInvested = moneyValueInvested?.value || '';
        console.log(toDate, fromDate, moneyValueInvested);
    }, [moneyValueInvested]);

    const onPopupInvest = useCallback(() => {
        switch (btnInvest) {
            case ENUM_INVEST_STATUS.INVEST_NOW:
                popupInvestRef.current.show();
                break;
            case ENUM_INVEST_STATUS.INVESTING:
                popupInvestedRef.current.show();
                break;
            default:
                break;
        }

    }, [btnInvest]);
    const openTimeInvestment = useCallback(() => {
        refBottomSheetMoney.current.show();
    }, []);

    const renderSearchBar = useMemo(() => {
        return (
            <View style={styles.wrapSearch}>
                <MyTextInput
                    onChangeText={handleInputOnchange}
                    rightIcon={arrayIcon.login.search}
                    containerInput={styles.input}
                    placeHolder={Languages.invest.enter}
                    keyboardType={'NUMBER'}
                    value={textSearch}
                />
                <Touchable
                    style={styles.iconFilter}
                    onPress={onPopupInvest}
                >
                    <IcBtnFilter />
                </Touchable>
            </View>
        );
    }, [handleInputOnchange, onPopupInvest, textSearch]);

    const renderLoading = useMemo(() => {
        return <View >{canLoadMoreUI && <Loading />}</View>;
    }, [canLoadMoreUI]);

    const renderEmptyData = useMemo(() => {
        if (listStore?.length === 0 && isLoading === false) {
            return (
                <NoData img={<IMGNoData />} description={Languages.invest.emptyData} />
            );
        }
        return null;
    }, [isLoading, listStore?.length]);

    return (
        <View style={styles.main}>
            <HeaderBar title={Languages.invest.title} isLight={false} />
            <View style={styles.wrapContent}>
                <View style={styles.investTab}>
                    {renderInvest(ENUM_INVEST_STATUS.INVEST_NOW)}
                    {renderInvest(ENUM_INVEST_STATUS.INVESTING)}
                    {renderInvest(ENUM_INVEST_STATUS.HISTORY)}
                </View>
                <MyFlatList
                    contentContainerStyle={styles.flatList}
                    showsVerticalScrollIndicator={false}
                    data={listStore}
                    renderItem={renderItem}
                    keyExtractor={keyExtractor}
                    ListHeaderComponent={renderSearchBar}
                    ListFooterComponent={renderLoading}
                    refreshing={isRefreshing}
                    onRefresh={onRefresh}
                    onEndReached={onEndReached}
                    ListEmptyComponent={renderEmptyData}
                />
            </View>
            <PopupInvest
                ref={popupInvestRef}
                title={Languages.invest.packageInvest}
                onConfirm={onConfirmFilter}
                openBottomSheet={openBottomSheet}
                timeInvestment={timeValue}
                moneyInvestment={moneyValueInvest}
            />
            <PopupFilterInvested
                ref={popupInvestedRef}
                title={Languages.invest.packageInvest}
                onConfirm={onConfirmFilterInvested}
                openTimeInvestment={openTimeInvestment}
                money={moneyValueInvested?.value}
            />
            <BottomSheetComponentInvest
                ref={refBottomSheetMoney}
                data={dataMoney}
                title={Languages.invest.chooseMoney}
                onPressItem={onPressItem}
            />
            <BottomSheetComponentInvest
                ref={refBottomSheetMonth}
                data={dataTime}
                title={Languages.invest.monthInvest}
                onPressItem={onPressItem}
            />
            {/* {isLoading && <Loading isOverview />} */}
        </View>
    );
});

export default Investment;
