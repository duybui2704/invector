import React, {useEffect, useState} from 'react';
import { ScrollView, StatusBar, Text, View, TouchableOpacity } from 'react-native';
import { useIsFocused } from '@react-navigation/native';

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
import Loading from '@/components/loading';



const Home = () => {

    const isFocused = useIsFocused();
    const styles = MyStylesHome();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const arrayData = [
        {
            id: '1',
            value: '500000',
            interestRate: '5%',
            expInterest: '10000',
            time: '5 tháng',
            format: 'Lãi hàng tháng gốc hàng tháng'

        },
        {
            id: '2',
            value: '200000',
            interestRate: '5%',
            expInterest: '10000',
            time: '3 tháng',
            format: 'Lãi hàng tháng gốc hàng tháng'

        },
        {
            id: '3',
            value: '500000',
            interestRate: '5%',
            expInterest: '10000',
            time: '5 tháng',
            format: 'Lãi hàng tháng gốc hàng tháng'

        }
    ];

    useEffect(() => {
        console.log('focus home:', isFocused);
        setTimeout(() => {
            StatusBar.setBarStyle(isFocused ? 'light-content' : 'dark-content', true);
        }, 10);
    }, [isFocused]);

    return (
        <View style={styles.main}>
            <HeaderBar noHeader={false} noStatusBar isLight={true} exitApp />
            <View style={styles.viewTop}>
                <Text style={styles.txt1}>{Languages.home.sumInvest}</Text>
                <View style={styles.viewTop2}>
                    <Text style={styles.txt2}>1000000000000</Text>
                    <View style={styles.viewTxt}>
                        <Text style={styles.txt4}>VNĐ</Text>
                    </View>
                </View>
                <View style={styles.viewTop1}>
                    <View style={styles.viewTop3}>
                        <Text style={styles.txt3}>{Languages.home.sumpProfit}</Text>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.txt4}>1800000</Text>
                            <View style={styles.viewTxt1}>
                                <Text style={[styles.txt4, { fontSize: 10 }]}>{Languages.home.vnd}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.viewTop3}>
                        <Text style={styles.txt3}>{Languages.home.sumResidualProfit}</Text>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.txt4}>1800000</Text>
                            <View style={styles.viewTxt1}>
                                <Text style={[styles.txt4, { fontSize: 10 }]}>{Languages.home.vnd}</Text>
                            </View>
                        </View>
                    </View>

                </View>
                <View style={styles.viewTob}>
                    <Touchable style={styles.tob}>
                        <IcWallet width={20} height={20} />
                        <Text style={styles.txtTob}>{Languages.home.have}</Text>
                    </Touchable>
                    <Touchable style={styles.tob}>
                        <IcDollar width={20} height={20} />
                        <Text style={styles.txtTob}>{Languages.home.invest}</Text>
                    </Touchable>
                    <Touchable style={styles.tob}>
                        <IcChartUp width={20} height={20} />
                        <Text style={styles.txtTob}>{Languages.home.report}</Text>
                    </Touchable>
                    <Touchable style={styles.tob}>
                        <IcSmartPhone width={20} height={20} />
                        <Text style={[styles.txtTob, { marginRight: 10, marginLeft: 5 }]}>{Languages.home.payment}</Text>
                    </Touchable>
                </View>
            </View>

            <ScrollView style={styles.viewCenter}>
                <Text style={[styles.txt, { color: COLORS.BLACK, marginVertical: 5 }]}>{Languages.home.investPackages}</Text>
                {arrayData.map(item => {
                    return (
                        <View style={styles.item}>
                            <View style={styles.itemChild}>
                                <Text style={[styles.txt1, { color: COLORS.GREEN }]}>{item.value}</Text>
                                <View style={styles.itemRight}>
                                    <Text style={styles.txt3}>Lãi suất tháng</Text>
                                    <Text style={[styles.txt3, { color: COLORS.RED_2 }]}>{item.interestRate}</Text>
                                </View>
                                {/* <IcLine /> */}
                            </View>
                            <IcLine width={'100%'}/>
                            <View style={styles.itemChild}>
                                <View style={styles.itemLeft}>
                                    <Text style={styles.txt3}>Thời gian đầu tư</Text>
                                    <Text style={[styles.txt3, { color: COLORS.BLACK }]}>{item.time}</Text>
                                </View>
                                <View style={styles.itemRight}>
                                    <Text style={styles.txt3}>Lãi dự kiến</Text>
                                    <Text style={[styles.txt3, { color: COLORS.GREEN }]}>{item.expInterest}</Text>
                                </View>
                            </View>
                            <IcLine width={'100%'}/>
                            <View style={styles.itemChild}>
                                <View style={styles.itemLeft}>
                                    <Text style={styles.txt3}>Hình thức trả lãi</Text>
                                    <Text style={[styles.txt3, { color: COLORS.BLACK }]}>{item.format}</Text>
                                </View>
                                <View style={styles.viewTobRight}>
                                    <TouchableOpacity style={styles.tobItem} onPress={() => { }}>
                                        <Text style={[styles.txt5, { color: COLORS.WHITE }]}>{Languages.home.investNow} </Text>
                                        <IcInvest width={20} height={20} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    );
                })}
                <Touchable style={styles.more}>
                    <Text style={[styles.txt3, { color: COLORS.GREEN }]}>{Languages.home.more}</Text>
                </Touchable>

                <Touchable style={styles.viewVfs}>
                    <LogoVfs width={100} height={100} />
                    <View style={styles.txtVfs}>
                        <Text style={[styles.txt4, { color: COLORS.RED_2 }]}>{Languages.home.stockVfs}</Text>
                        <Text style={styles.txt3}>{Languages.home.signFree}</Text>
                    </View>
                </Touchable>

                <View style={styles.viewBottom}>
                    <View style={[styles.txtQuestion, { flex: 1.2 }]}><Text style={styles.txt}>{Languages.home.question}</Text></View>
                    <Touchable style={styles.txtQuestion}>
                        <View style={styles.viewTxtBottom}>
                            <Text style={styles.txt3}>{Languages.home.todoInvest}</Text>
                        </View>
                        <Touchable style={styles.icon}>
                            <IcChevronRight width={20} height={20} />
                        </Touchable>
                    </Touchable>
                    <IcLine width={'90%'}/>
                    <Touchable style={styles.txtQuestion}>
                        <View style={styles.viewTxtBottom}>
                            <Text style={styles.txt3}>{Languages.home.investNow}?</Text>
                        </View>
                        <Touchable style={styles.icon}>
                            <IcChevronRight width={20} height={20} />
                        </Touchable>
                    </Touchable>
                    <IcLine width={'90%'}/>
                    <Touchable style={styles.txtQuestion}>
                        <View style={styles.viewTxtBottom}>
                            <Text style={styles.txt3}>{Languages.home.percentCalculated}</Text>
                        </View>
                        <Touchable style={styles.icon}>
                            <IcChevronRight width={20} height={20} />
                        </Touchable>
                    </Touchable>
                    <IcLine width={'90%'}/>
                    <Touchable style={styles.txtQuestion}>
                        <View style={styles.viewTxtBottom}>
                            <Text style={styles.txt3}>{Languages.home.paymentMethod}</Text>
                        </View>
                        <Touchable style={styles.icon}>
                            <IcChevronRight width={20} height={20} />
                        </Touchable>
                    </Touchable>
                </View>
            </ScrollView>
            {isLoading && <Loading isOverview/>}
        </View>
    );
};

export default Home;
