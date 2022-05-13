import { observer } from 'mobx-react';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Text, TextStyle, View, ViewStyle } from 'react-native';
import { debounce } from 'lodash';
import { useIsFocused } from '@react-navigation/core';

import IcBtnFilter from '@/assets/image/ic_button_filter.svg';
import arrayIcon from '@/common/arrayIcon';
import { ENUM_INVEST_STATUS, ENUM_INVEST_MONEY } from '@/common/constants';
import Languages from '@/common/Languages';
import ScreenName from '@/common/screenNames';
import { MyTextInput } from '@/components/elements/textfield';
import { Touchable } from '@/components/elements/touchable';
import ItemInvest from '@/components/ItemInvest';
import MyFlatList from '@/components/MyFlatList';
import PopupInvest from '@/components/popupInvest';
import Navigator from '@/routers/Navigator';
import { COLORS, Styles } from '@/theme';
import { HeaderBar } from '../../components/header';
import styles from './styles';
import Utils from '@/utils/Utils';
import { useAppStore } from '@/hooks';
import { PackageInvest, PagingCoditionTypes } from '@/models/invest';
import Loading from '@/components/loading';
import BottomSheetComponentInvest from '@/components/popupInvest/bottomSheetInvest';
import { ItemProps } from '@/components/bottomsheet';
import { arrMonth } from '@/mocks/data';

const PAGE_SZIE = 5;

const Investment = observer(({ route }: { route: any }) => {
    const [btnInvest, setBtnInvest] = useState<string>(ENUM_INVEST_STATUS.INVEST_NOW);
    const [textSearch, setTextSearch] = useState<string>();
    const [listStore, setListStore] = useState<PackageInvest[]>();
    const [dataFilter, setDataFilter] = useState<PackageInvest[]>();
    const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [dataTime, setDataTime] = useState<any>([]);
    const [timeValue, setTimeValue] = useState<ItemProps>();

    const [dataMoney, setDataMoney] = useState<any>([]);
    const [moneyValue, setMoneyValue] = useState<ItemProps>();

    const popupInvestRef = useRef<any>();

    const [dataPicker, setDataPicker] = useState<ItemProps[]>(arrMonth);
    const refBottomSheetMonth = useRef<any>(null);
    const refBottomSheetMoney = useRef<any>(null);
    const condition = useRef<PagingCoditionTypes>({
        isLoading: true,
        offset: 0,
        canLoadMore: true,
        timeInvestment: '',
        moneyInvestment: '',
        textSearch: ''
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

    useEffect(() => {
        console.log('listStore', listStore);
    }, [listStore]);

    const fetchDataInvested = useCallback(async (isLoadMore?: boolean) => {
        setIsLoading(true);
        condition.current.isLoading = true;
        const resInvest = await apiServices.invest.getListContractInvesting(isLoadMore ? condition.current.offset : 0, PAGE_SZIE);
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
        condition.current.canLoadMore = newSize >= PAGE_SZIE;
        setIsLoading(false);
    }, [apiServices.invest]);

    const fetchAllDataInvest = useCallback(async (isLoadMore?: boolean) => {
        setIsLoading(true);
        condition.current.isLoading = true;
        const resInvest = await apiServices.invest.getAllContractInvest(
            condition.current.textSearch,
            condition.current.timeInvestment,
            condition.current.moneyInvestment,
            isLoadMore ? condition.current.offset : 0,
            PAGE_SZIE);
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
        condition.current.canLoadMore = newSize >= PAGE_SZIE;
        setIsLoading(false);
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
        setTimeValue(null);
        setMoneyValue(null);
        condition.current.offset = 1;
        condition.current.timeInvestment='';
        condition.current.moneyInvestment='';
        condition.current.textSearch='';
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
        if (title === Languages.invest.monthInvest) {
            setTimeValue(item);
            condition.current.timeInvestment = item.id;
        }
        if (title === Languages.invest.chooseMoney) {
            setMoneyValue(item);
            condition.current.moneyInvestment = item.id;
        }
        popupInvestRef.current?.show();
    }, []);

    const searchItem = useCallback(
        (text: string) => {
            if (text) {
                setDataFilter(
                    listStore?.filter((item: any) =>
                        Utils.convertMoney(item?.so_tien_dau_tu).includes(text)
                    )
                );
            } else {
                setDataFilter(listStore);
            }
        },
        [listStore]
    );

    const debounceSearchItem = useCallback(() => {
        debounce(() => fetchData(btnInvest), 300);
    }, [btnInvest, fetchData]);

    const handleInputOnchange = useCallback(
        (value: string) => {
            setTextSearch(value);
            condition.current.textSearch = value;
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
            backgroundColor: btnInvest === type ? COLORS.WHITE : null
        } as ViewStyle;

        const styleTxt = {
            fontFamily: Styles.typography.regular.fontFamily,
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
            <Touchable disabled={btnInvest === type} onPress={onPress} style={[styles.btInvest, styleBt]}>
                <Text style={[styles.txtBtInvest, styleTxt]}>{getTitle()}</Text>
            </Touchable>
        );
    }, [btnInvest, fetchData]);

    const onConfirmFilter = useCallback(() => {
        fetchData(btnInvest);
    }, [btnInvest, fetchData]);

    const onPopupInvest = useCallback(() => {
        popupInvestRef.current.show();
        common.setIsFocus(true);
    }, [common]);

    const renderSearchBar = useMemo(() => {
        return (
            <View style={styles.wrapSearch}>
                <MyTextInput
                    onChangeText={handleInputOnchange}
                    rightIcon={arrayIcon.login.search}
                    containerInput={styles.input}
                    placeHolder={Languages.invest.enter}
                    keyboardType={'NUMBER'}
                />
                <Touchable
                    style={styles.iconFilter}
                    onPress={onPopupInvest}
                >
                    <IcBtnFilter />
                </Touchable>
            </View>
        );
    }, [handleInputOnchange, onPopupInvest]);

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
                    refreshing={isRefreshing}
                    onRefresh={onRefresh}
                    onEndReached={onEndReached}
                />
            </View>
            <PopupInvest
                ref={popupInvestRef}
                title={Languages.invest.packageInvest}
                onConfirm={onConfirmFilter}
                openBottomSheet={openBottomSheet}
                timeInvestment={timeValue}
                moneyInvestment={moneyValue}
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
            {isLoading && <Loading isOverview />}
        </View>
    );
});

export default Investment;
