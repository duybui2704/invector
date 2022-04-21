import { observer } from 'mobx-react';
import React, { useCallback, useMemo, useState } from 'react';
import { Text, TextStyle, View, ViewStyle } from 'react-native';

import IcBtnFilter from '@/assets/image/ic_button_filter.svg';
import arrayIcon from '@/common/arrayIcon';
import Languages from '@/common/Languages';
import ScreenName from '@/common/screenNames';
import { MyTextInput } from '@/components/elements/textfield';
import { Touchable } from '@/components/elements/touchable';
import ItemInvest from '@/components/ItemInvest';
import MyFlatList from '@/components/MyFlatList';
import Navigator from '@/routers/Navigator';
import { COLORS, Styles } from '@/theme';
import { HeaderBar } from '../../components/header';
import styles from './styles';
import { ENUM_INVEST_STATUS } from '@/common/constants';
import { investData } from '@/mocks/data';



const Investment = observer(() => {
    const [btnInvest, setBtnInvest] = useState<string>(ENUM_INVEST_STATUS.INVEST_NOW);
    const [data, setData] = useState<any[]>(investData);
    const [textSearch, setTextSearch] = useState<string>();

    const onChangeText = useCallback((text: string) => {
        setTextSearch(text);
    }, []);

    const navigateToDetail = useCallback(() => {

        Navigator.pushScreen(ScreenName.detailInvestment, { status: btnInvest });

    }, [btnInvest]);

    const keyExtractor = useCallback((item, index) => {
        return `${index}${item.id}`;
    }, []);

    const renderItem = useCallback(({ item }: any) => {

        return (
            <ItemInvest onPress={navigateToDetail} data={item} hasButton={btnInvest === ENUM_INVEST_STATUS.INVEST_NOW} />
        );
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

    const renderSearchBar = useMemo(() => {
        return (
            <View style={styles.wrapSearch}>
                <MyTextInput
                    onChangeText={onChangeText}
                    rightIcon={arrayIcon.login.search}
                    containerInput={styles.input}
                    placeHolder={Languages.invest.enter}
                />
                <Touchable style={styles.iconFilter}>
                    <IcBtnFilter />
                </Touchable>
            </View>
        );
    }, [onChangeText]);


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
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={keyExtractor}
                    ListHeaderComponent={renderSearchBar}
                />
            </View>
        </View>
    );
});

export default Investment;
