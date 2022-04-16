import React, { useCallback, useMemo, useState } from 'react';
import { Text, TextStyle, View, ViewStyle } from 'react-native';
import Dash from 'react-native-dash';
import { observer } from 'mobx-react';

import IcBtnFilter from '@/assets/image/ic_button_filter.svg';
import IcBtnInvest from '@/assets/image/ic_button_invest.svg';
import arrayIcon from '@/common/arrayIcon';
import Languages from '@/common/Languages';
import { MyTextInput } from '@/components/elements/textfield';
import { Touchable } from '@/components/elements/touchable';
import MyFlatList from '@/components/MyFlatList';
import { COLORS, Styles } from '@/theme';
import Utils from '@/utils/Utils';
import { HeaderBar } from '../../components/header';
import { investData } from '../mocks/mocks';
import styles from './styles';
import Navigator from '@/routers/Navigator';
import ScreenName from '@/common/screenNames';




const Invest = observer(() => {
    const [btnInvest, setBtnInvest] = useState<string>(Languages.invest.attractInvest);
    const [data, setData] = useState<any[]>(investData);
    const [textSearch, setTextSearch] = useState<string>();

    const onChangeText = useCallback((text: string) => {
        setTextSearch(text);
    }, []);

    const navigateToDetail = useCallback(() => {
        Navigator.pushScreen(ScreenName.detailInvestment);
    }, []);

    const keyExtractor = useCallback((item, index) => {
        return `${index}${item.id}`;
    }, []);

    const renderItem = useCallback(({ item }: any) => {

        const styleText = {
            color: btnInvest === Languages.invest.history ? COLORS.GRAY_7 : COLORS.GREEN
        } as TextStyle;

        return (
            <View style={styles.item}>
                <View style={styles.rowTop}>
                    <Text style={[styles.txtMoney, styleText]}>{Utils.formatMoney(item?.amountMoney)}</Text>
                    <View style={styles.wrapText}>
                        <Text style={styles.txtInterest}>{Languages.invest.interest}</Text>
                        <Text style={styles.txtPercent}>{item?.percent}</Text>
                    </View>
                </View>
                <Dash
                    dashThickness={1}
                    dashLength={10}
                    dashGap={5}
                    dashColor={COLORS.GRAY_13} />
                <View style={styles.rowCenter}>
                    <View>
                        <Text style={styles.txtInterest}>{Languages.invest.time}</Text>
                        <Text style={styles.txtFormality}>{item?.time}</Text>
                    </View>
                    <View style={styles.wrapText}>
                        <Text style={styles.txtInterest}>{Languages.invest.intent}</Text>
                        <Text style={styles.greenText}>{Utils.formatMoney(item?.amountMoney)}</Text>
                    </View>
                </View>
                <Dash
                    dashThickness={1}
                    dashLength={10}
                    dashGap={5}
                    dashColor={COLORS.GRAY_13} />
                <View style={styles.rowBottom}>
                    <View>
                        <Text style={styles.txtInterest} >{Languages.invest.formalPayment}</Text>
                        <Text style={styles.txtFormality}>{item?.formality}</Text>
                    </View>
                    {btnInvest === Languages.invest.attractInvest ? <Touchable onPress={navigateToDetail} style={styles.btInvestNow}>
                        <Text style={styles.txtInvestNow}>{Languages.invest.investNow}</Text>
                        <IcBtnInvest />
                    </Touchable> :
                        <View style={styles.wrapText}>
                            <Text style={styles.txtInterest} >{Languages.invest.getMoney}</Text>
                            <Text style={styles.txtYellow}>{Utils.formatMoney(item?.interest)}</Text>
                        </View>}
                </View>
            </View>
        );
    }, [btnInvest]);

    const renderInvest = useCallback((title: string) => {
        const styleBt = {
            backgroundColor: btnInvest === title ? COLORS.WHITE : null
        } as ViewStyle;

        const styleTxt = {
            fontFamily: Styles.typography.regular.fontFamily,
            color: btnInvest === title ? COLORS.GREEN : COLORS.GRAY_7
        } as TextStyle;

        const onPress = () => {
            setBtnInvest(title);
        };

        return (
            <Touchable onPress={onPress} style={[styles.btInvest, styleBt]}>
                <Text style={[styles.txtBtInvest, styleTxt]}>{title}</Text>
            </Touchable>
        );
    }, [btnInvest]);

    const renderSearchBar = useMemo(() => {
        return (
            <View style={styles.wrapSearch}>
                <MyTextInput
                    onChangeText={onChangeText}
                    value={`${textSearch}`}
                    rightIcon={arrayIcon.login.search}
                    containerInput={styles.input}
                    placeHolder={Languages.invest.enter}
                />
                <Touchable style={styles.iconFilter}>
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
                    {renderInvest(Languages.invest.attractInvest)}
                    {renderInvest(Languages.invest.investing)}
                    {renderInvest(Languages.invest.history)}
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
export default Invest;
