import { observer } from 'mobx-react';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Text, TextStyle, View, ViewStyle } from 'react-native';
import { debounce } from 'lodash';

import IcBtnFilter from '@/assets/image/ic_button_filter.svg';
import arrayIcon from '@/common/arrayIcon';
import { ENUM_INVEST_STATUS } from '@/common/constants';
import Languages from '@/common/Languages';
import ScreenName from '@/common/screenNames';
import { MyTextInput } from '@/components/elements/textfield';
import { Touchable } from '@/components/elements/touchable';
import ItemInvest from '@/components/ItemInvest';
import MyFlatList from '@/components/MyFlatList';
import PopupInvest from '@/components/popupInvest';
import { investData } from '@/mocks/data';
import Navigator from '@/routers/Navigator';
import { COLORS, Styles } from '@/theme';
import { HeaderBar } from '../../components/header';
import styles from './styles';
import { ENUM_INVEST_MONEY } from '@/common/constants';
import Utils from "@/utils/Utils";
import { useAppStore } from '@/hooks';
import { useIsFocused } from '@react-navigation/core';


const Investment = observer(({ route }: any) => {
    const [btnInvest, setBtnInvest] = useState<string>(ENUM_INVEST_STATUS.INVEST_NOW);
    const [textSearch, setTextSearch] = useState<string>();
    const [listStore, setListStore] = useState<any[]>(investData);
    const [dataFilter, setDataFilter] = useState<any[]>(investData);
    const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
    const isFocus = useIsFocused();
    const popupInvestRef = useRef<any>();
    const {
        common
    } = useAppStore();
    useEffect(() => {
        if (isFocus) {
            setDataFilter(investData);
        } else {
            common.setIsFocus(false);
        }
    }, [common.isFocused, isFocus]);

    const onRefresh = useCallback(() => {
        setIsRefreshing(true);
        setIsRefreshing(false);
        setDataFilter(investData);
        setTextSearch(undefined);
    }, []);

    const onChangeText = useCallback((text: string) => {
        setTextSearch(text);
    }, [textSearch]);

    const searchItem = useCallback(
        (text: string) => {
            if (text) {
                setDataFilter(
                    dataFilter?.filter((item: any) =>
                        `${item?.amountMoney}`.includes(text)
                    )
                );
            } else {
                setDataFilter(dataFilter);
            }
        },
        [dataFilter]
    );

    const search = useCallback((money: string, month: string) => {
        switch (money) {
            case ENUM_INVEST_MONEY.BELOW_10:
                setDataFilter(
                    listStore?.filter((item: any) => item.amountMoney < 10000000 && item?.time.includes(month))
                );
                return;
            case ENUM_INVEST_MONEY.ABOUT_10_50:
                setDataFilter(
                    listStore?.filter((item: any) => item.amountMoney >= 10000000 && item.amountMoney < 50000000 && item?.time.includes(month)
                    )
                );
                return;
            case ENUM_INVEST_MONEY.ABOUT_50_100:
                setDataFilter(
                    listStore?.filter((item: any) => item.amountMoney < 100000000 && item.amountMoney >= 50000000 && item?.time.includes(month)
                    )
                );
                return;
            case ENUM_INVEST_MONEY.ABOVE_100:
                setDataFilter(
                    listStore?.filter((item: any) => item.amountMoney >= 100000000 && item?.time.includes(month)
                    )
                );
                return;
            default:
                break;
        }
    }, [dataFilter])

    const searchMoneyOrMonth = useCallback((money: string, month: string) => {
        switch (money) {
            case ENUM_INVEST_MONEY.BELOW_10:
                setDataFilter(
                    listStore?.filter((item: any) => item.amountMoney < 10000000)
                );
                return;
            case ENUM_INVEST_MONEY.ABOUT_10_50:
                setDataFilter(
                    listStore?.filter((item: any) => item.amountMoney >= 10000000 && item.amountMoney < 50000000
                    )
                );
                return;
            case ENUM_INVEST_MONEY.ABOUT_50_100:
                setDataFilter(
                    listStore?.filter((item: any) => item.amountMoney < 100000000 && item.amountMoney >= 50000000
                    )
                );
                return;
            case ENUM_INVEST_MONEY.ABOVE_100:
                setDataFilter(
                    listStore?.filter((item: any) => item.amountMoney >= 100000000
                    )
                );
                return;
            default:
                break;
        }
        setDataFilter(
            listStore?.filter((item: any) => item?.time.includes(month)
            )
        );
        return;

    }, [dataFilter])

    const searchItemPicker = useCallback(
        (month: string, money: string) => {
            if (money && month) {
                search(money, month);
                return;
            } else if (month || money) {
                searchMoneyOrMonth(money, month);
                return;
            }
            else {
                setDataFilter(investData);
                return;
            }
        },
        [dataFilter]
    );

    const debounceSearchItem = useCallback(
        debounce((text: string) => searchItem(text), 300),
        [searchItem]
    );

    const handleInputOnchange = useCallback(
        (value: string) => {
            debounceSearchItem(value);
        },
        [debounceSearchItem]
    );

    const navigateToDetail = useCallback(() => {

        Navigator.pushScreen(ScreenName.detailInvestment, { status: btnInvest });

    }, [btnInvest]);

    const keyExtractor = useCallback((item: any, index: number) => {
        return `${index}${item.id}`;
    }, []);

    const renderItem = useCallback(({ item }: any) => {
        switch (btnInvest) {
            case ENUM_INVEST_STATUS.INVEST_NOW:
                return <ItemInvest onPress={navigateToDetail} data={item} title={ENUM_INVEST_STATUS.INVEST_NOW} />;
            case ENUM_INVEST_STATUS.INVESTING:
                return <ItemInvest onPress={navigateToDetail} data={item} title={ENUM_INVEST_STATUS.INVESTING} />;
            case ENUM_INVEST_STATUS.HISTORY:
                return <ItemInvest onPress={navigateToDetail} data={item} title={ENUM_INVEST_STATUS.HISTORY} />;
        }
    }, [btnInvest, navigateToDetail]);

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
            <Touchable onPress={onPress} style={[styles.btInvest, styleBt]}>
                <Text style={[styles.txtBtInvest, styleTxt]}>{getTitle()}</Text>
            </Touchable>
        );
    }, [btnInvest]);

    const onPopupInvest = useCallback(() => {
        popupInvestRef.current.show();
        common.setIsFocus(true);
    }, [])

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
                    disabled={textSearch ? true : false}
                >
                    <IcBtnFilter />
                </Touchable>
            </View>
        );
    }, [onChangeText, textSearch]);

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
                    data={dataFilter}
                    renderItem={renderItem}
                    keyExtractor={keyExtractor}
                    ListHeaderComponent={renderSearchBar}
                    refreshing={isRefreshing}
                    onRefresh={onRefresh}
                />
            </View>
            <PopupInvest
                ref={popupInvestRef}
                title={Languages.invest.packageInvest}
                onConfirm={searchItemPicker}
            />
        </View>
    );
});

export default Investment;
