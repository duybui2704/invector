import React, { useEffect, useState } from 'react';
import { ScrollView, StatusBar, Text, View, TouchableOpacity } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { observer } from 'mobx-react';

import IcChartUp from '@/assets/image/home/ic_chart_up.svg';
import IcChevronRight from '@/assets/image/home/ic_chevron_right.svg';
import LogoVfs from '@/assets/image/home/logo_vfs.svg';
import IcWallet from '@/assets/image/home/ic_wallet.svg';
import IcDollar from '@/assets/image/home/ic_dollar.svg';
import IcLine from '@/assets/image/home/ic_line_home.svg';
import IcInvest from '@/assets/image/home/ic_invest.svg';
import IcSmartPhone from '@/assets/image/home/ic_smartphone.svg';
import { Touchable } from '@/components/elements/touchable';
import { MyStylesHome } from './styles';
import HeaderBar from '@/components/header';
import { COLORS } from '@/theme';
import Languages from '@/common/Languages';
import { arrayData } from '@/mocks/data';
import Loading from '@/components/loading';
import { Configs } from '@/common/Configs';
import Navigator from '@/routers/Navigator';
import ScreenName, { TabsName } from '@/common/screenNames';
import SessionManager from '@/manager/SessionManager';

const Home = observer(() => {

    const isFocused = useIsFocused();
    const styles = MyStylesHome();
    const [isLoading, setIsLoading] = useState<boolean>(false);


    useEffect(() => {
        console.log('focus home:', isFocused);
        setTimeout(() => {
            StatusBar.setBarStyle(isFocused ? 'light-content' : 'dark-content', true);
        }, 10);
    }, [isFocused]);

    const gotoProfile = () => {
        Navigator.navigateScreen(TabsName.accountTabs);
    }

    const gotoInvest = () => {
        Navigator.navigateScreen(TabsName.investTabs);
    }

    const gotoReport = () => {
        Navigator.navigateScreen(TabsName.reportTabs);
    }

    const gotoPayment = () => {
        Navigator.navigateScreen(TabsName.paymentTabs);
    }

    return (
        <View style={styles.main}>
            <HeaderBar exitApp imageBackground />
            <View style={styles.viewTop}>
                <Text style={styles.txt1}>{Languages.home.sumInvest}</Text>
                <View style={styles.viewTop2}>
                    <Text style={styles.txt2} numberOfLines={1}>100000000000000000000000000000000000000000000000</Text>
                    <View style={styles.viewTxt}>
                        <Text style={styles.txt4}>VNĐ</Text>
                    </View>
                </View>
                <View style={styles.viewTop1}>
                    <View style={styles.viewTop3}>
                        <View style={{ marginLeft: '30%', justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={styles.txt3}>{Languages.home.sumpProfit}</Text>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={[styles.txt4, { marginRight: 5 }]} numberOfLines={1}>1800000000000000000000</Text>
                                <Text style={[styles.txt4, { fontSize: Configs.FontSize.size10, paddingTop: 6 }]}>{Languages.home.vnd}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.viewTop3}>
                        <View style={{ marginRight: '30%', justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={styles.txt3}>{Languages.home.sumResidualProfit}</Text>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={[styles.txt4, { marginLeft: 5 }]} numberOfLines={1}>1800000000</Text>
                                <Text style={[styles.txt4, { fontSize: Configs.FontSize.size10, paddingTop: 6 }]}>{Languages.home.vnd}</Text>
                            </View>
                        </View>
                    </View>

                </View>
                <View style={styles.viewTob}>
                    <Touchable style={styles.tob} onPress={gotoProfile}>
                        <IcWallet width={20} height={20} />
                        <Text style={styles.txtTob}>{Languages.home.have}</Text>
                    </Touchable>
                    <Touchable style={styles.tob} onPress={gotoInvest}>
                        <IcDollar width={20} height={20} />
                        <Text style={styles.txtTob}>{Languages.home.invest}</Text>
                    </Touchable>
                    <Touchable style={styles.tob} onPress={gotoReport}>
                        <IcChartUp width={20} height={20} />
                        <Text style={styles.txtTob}>{Languages.home.report}</Text>
                    </Touchable>
                    <Touchable style={styles.tob} onPress={gotoPayment}>
                        <IcSmartPhone width={20} height={20} />
                        <Text style={[styles.txtTob, { marginRight: 10, marginLeft: 5 }]}>{Languages.home.payment}</Text>
                    </Touchable>
                </View>
            </View>

            <ScrollView style={styles.viewCenter}>
                <Text style={[styles.txt, { color: COLORS.BLACK, marginVertical: 5 }]}>{Languages.home.investPackages}</Text>
                {arrayData.map(item => {
                    return (
                        <View style={styles.item} key={item.id}>
                            <View style={styles.itemChild}>
                                <Text style={[styles.txt1, { color: COLORS.GREEN }]} numberOfLines={1}>{item.value}</Text>
                                <View style={styles.itemRight}>
                                    <Text style={styles.txt5}>{Languages.home.interestRateMonth}</Text>
                                    <Text style={[styles.txt5, { color: COLORS.RED_2 }]}>{item.interestRate}</Text>
                                </View>
                                {/* <IcLine /> */}
                            </View>
                            <IcLine width={'100%'} />
                            <View style={styles.itemChild}>
                                <View style={styles.itemLeft}>
                                    <Text style={styles.txt5}>{Languages.home.timeInvest}</Text>
                                    <Text style={[styles.txt5, { color: COLORS.BLACK }]}>{item.time}</Text>
                                </View>
                                <View style={styles.itemRight}>
                                    <Text style={styles.txt5}>{Languages.home.interestExpected}</Text>
                                    <Text style={[styles.txt5, { color: COLORS.GREEN }]} numberOfLines={1}>{item.expInterest}</Text>
                                </View>
                            </View>
                            <IcLine width={'100%'} />
                            <View style={styles.itemChild}>
                                <View style={styles.itemLeft}>
                                    <Text style={styles.txt5}>{Languages.home.formInterestPay}</Text>
                                    <Text style={[styles.txt5, { color: COLORS.BLACK }]}>{item.format}</Text>
                                </View>
                                <View style={styles.viewTobRight}>
                                    <TouchableOpacity style={styles.tobItem} onPress={() => { }}>
                                        <Text style={[styles.txt1, { color: COLORS.WHITE }]}>{Languages.home.investNow} </Text>
                                        <IcInvest width={20} height={20} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    );
                })}
                <Touchable style={styles.more} onPress={gotoInvest}>
                    <Text style={[styles.txt5, { color: COLORS.GREEN }]}>{Languages.home.more}</Text>
                </Touchable>

                <Touchable style={styles.viewVfs}>
                    <LogoVfs width={100} height={100} />
                    <View style={styles.txtVfs}>
                        <Text style={[styles.txt4, { color: COLORS.RED_2 }]}>{Languages.home.stockVfs}</Text>
                        <Text style={styles.txt5}>{Languages.home.signFree}</Text>
                    </View>
                </Touchable>

                <View style={styles.viewBottom}>
                    <View style={[styles.txtQuestion, { flex: 1.2 }]}><Text style={styles.txt}>{Languages.home.question}</Text></View>
                    <Touchable style={styles.txtQuestion}>
                        <View style={styles.viewTxtBottom}>
                            <Text style={styles.txt5}>{Languages.home.todoInvest}</Text>
                        </View>
                        <Touchable style={styles.icon}>
                            <IcChevronRight width={20} height={20} />
                        </Touchable>
                    </Touchable>
                    <IcLine width={'90%'} />
                    <Touchable style={styles.txtQuestion}>
                        <View style={styles.viewTxtBottom}>
                            <Text style={styles.txt5}>{Languages.home.investNow}?</Text>
                        </View>
                        <Touchable style={styles.icon}>
                            <IcChevronRight width={20} height={20} />
                        </Touchable>
                    </Touchable>
                    <IcLine width={'90%'} />
                    <Touchable style={styles.txtQuestion}>
                        <View style={styles.viewTxtBottom}>
                            <Text style={styles.txt5}>{Languages.home.percentCalculated}</Text>
                        </View>
                        <Touchable style={styles.icon}>
                            <IcChevronRight width={20} height={20} />
                        </Touchable>
                    </Touchable>
                    <IcLine width={'90%'} />
                    <Touchable style={styles.txtQuestion}>
                        <View style={styles.viewTxtBottom}>
                            <Text style={styles.txt5}>{Languages.home.paymentMethod}</Text>
                        </View>
                        <Touchable style={styles.icon}>
                            <IcChevronRight width={20} height={20} />
                        </Touchable>
                    </Touchable>
                </View>
                <Text>{SessionManager}</Text>
            </ScrollView>
            {isLoading && <Loading isOverview />}
        </View>
    );
});

export default Home;
