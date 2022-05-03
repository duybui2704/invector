import { BottomSheetModal, SCREEN_HEIGHT, SCREEN_WIDTH } from '@gorhom/bottom-sheet';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { VictoryBar, VictoryChart, VictoryGroup, VictoryLabel, VictoryTheme, VictoryZoomContainer } from 'victory-native';
import { FlatList } from 'react-native-gesture-handler';
import { observer } from 'mobx-react';

import { Configs } from '@/common/Configs';
import { Touchable } from '@/components/elements/touchable';
import KeyValue from '@/components/KeyValue';
import { COLORS, Styles } from '@/theme';
import { OverviewMonthOfQuarterModal, TotalOfQuarterModal } from '@/models/monthOfQuarter-model';
import Utils from '@/utils/Utils';
import ICUnderArrow from '@/assets/image/ic_under_arrow.svg';
import PickerBottomSheet from '@/components/PickerBottomSheet';
import Languages from '@/common/Languages';
import HeaderBar from '@/components/header';
import { useAppStore } from '@/hooks';
import { ItemProps } from '@/models/common-model';
import Loading from '@/components/loading';
import DateUtils from '@/utils/DateUtils';

const Report = observer(() => {
    const { apiServices } = useAppStore();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [quarter, setQuarter] = useState<string>(DateUtils.getCurrentQuarter().toString());
    const [quarterList, setQuarterList] = useState<ItemProps[]>([]);
    const [year, setYear] = useState<string>(DateUtils.getCurrentYear().toString());
    const [yearList, setYearList] = useState<ItemProps[]>([]);
    const [dataChart, setDataChart] = useState<OverviewMonthOfQuarterModal[]>([]);
    const quarterRef = useRef<BottomSheetModal>(null);
    const yearRef = useRef<BottomSheetModal>(null);
    const [total, setTotal] =  useState<TotalOfQuarterModal>();

    const [reportList, setReportList] = useState<OverviewMonthOfQuarterModal[]>();

    const keyExtractor = useCallback((item?: OverviewMonthOfQuarterModal, index?: any) => {
        return `${item?.month}${index}`;
    }, []);

    useEffect(() => {
        fetchDataSearch();
    }, []);

    useEffect(() => {
        if (year && quarter) {
            fetchReport();
        }
    }, [quarter, year]);

    const fetchDataSearch = useCallback(async () => {
        const resQuarters = await apiServices.report.getQuarters(3);
        const resYear = await apiServices.report.getYear(3);
        if (resQuarters.success) {
            const dataQuarter = Utils.formatObjectToKeyLabel(resQuarters.data);
            setQuarterList(dataQuarter);
        }
        if (resYear.success) {
            const dataYear = Utils.formatObjectToKeyLabel(resYear.data);
            setYearList(dataYear);
        }

    }, [apiServices.report]);

    const fetchReport = useCallback(async () => {
        setIsLoading(true);
        const res = await apiServices.report.requestFinanceReport(quarter.substring(4), year);
        if (res.success) {
            setIsLoading(false);
            const dataMonths =  res?.data as OverviewMonthOfQuarterModal[];
            setReportList(dataMonths);

            const dataTotal = res?.total as TotalOfQuarterModal;
            setTotal(dataTotal);
            const temp =  dataMonths.map((item) => {
                return {
                    month: `T${`${item?.month}`.slice(6,8).replace('/','')}`,
                    year: item?.year,
                    so_hop_dong_dau_tu: item?.so_hop_dong_dau_tu,
                    tong_tien_dau_tu: item?.tong_tien_dau_tu,
                    tien_goc_thu_ve: item?.tien_goc_thu_ve,
                    tong_lai_phi: item?.tong_lai_phi,
                    tong_tien_thu_ve: item?.tong_tien_thu_ve
                };
            }).reverse() as OverviewMonthOfQuarterModal[];
            setDataChart(temp);
        }
        setIsLoading(false);

    }, [apiServices.report, quarter, year]);

    const renderItem = useCallback(({ item, isOverview }:
        { isOverview?: boolean, item?: OverviewMonthOfQuarterModal }) => {
        const _onPress = () => {
        };

        return (
            <Touchable style={!isOverview ? styles.containerItem : styles.containerItemOverview} onPress={_onPress}>
                <Text style={styles.overviewQuarterTxt}>
                    {isOverview ? `${Languages.report.overview}${' '}${quarter}` || 0 :
                        `${item?.month}`.slice(0, 8).replace('/','') || 0}
                </Text>
                <KeyValue
                    styleTitle={styles.textLeftMonth}
                    title={Languages.report.contractNumber}
                    containerContent={styles.containerContentKeyValue}
                    content={isOverview ? Utils.formatMoney(total?.tong_hop_dong || 0) : Utils.formatMoney(item?.so_hop_dong_dau_tu || 0)}
                    styleColor={styles.txtContractNumber} />
                <KeyValue
                    title={Languages.report.investMoney}
                    styleTitle={styles.textLeftMonth}
                    containerContent={styles.containerContentKeyValue}
                    content={isOverview ? Utils.formatMoney(total?.tong_tat_ca_tien_dau_tu || 0) : Utils.formatMoney(item?.tong_tien_dau_tu || 0)}
                    styleColor={styles.txtInvestNumber} />
                <KeyValue
                    title={Languages.report.originMoneyCollected}
                    styleTitle={styles.textLeftMonth}
                    containerContent={styles.containerContentKeyValue}
                    content={isOverview ? Utils.formatMoney(total?.tien_goc_thu_ve || 0) : Utils.formatMoney(item?.tien_goc_thu_ve || 0)}
                    styleColor={styles.txtEarning} />
                <KeyValue
                    title={Languages.report.interest}
                    styleTitle={styles.textLeftMonth}
                    containerContent={styles.containerContentKeyValue}
                    content={isOverview ? Utils.formatMoney(total?.tong_lai_phi || 0) : Utils.formatMoney(item?.tong_lai_phi || 0)}
                    styleColor={styles.txtInterest}
                />
            </Touchable>
        );
    }, [quarter, total?.tien_goc_thu_ve, total?.tong_hop_dong, total?.tong_lai_phi, total?.tong_tat_ca_tien_dau_tu]);

    const renderChart = useMemo(() => {
        return (
            <View style={styles.containerContent}>
                <Text style={styles.overviewQuarterTitle}>{Languages.report.quarterlyOverview}</Text>
                <View style={styles.chartContainer}>
                    <Text style={styles.chartTitle}>{Languages.report.financialChart}</Text>
                    <VictoryChart
                        width={SCREEN_WIDTH - 30}
                        height={SCREEN_HEIGHT * 0.35}
                        horizontal
                        theme={VictoryTheme.material}
                        domainPadding={{ x: 40 }}
                        containerComponent={
                            <VictoryZoomContainer
                                allowZoom={true}
                                allowPan={true}
                                zoomDomain={{ y: [100000, 4000000] }}
                            />
                        }
                    >
                        <VictoryGroup
                            offset={-3}
                            domainPadding={{ y: [2, -2] }}
                            domain={{ y: [100000, 200000000000] }}
                            animate
                        >

                            <VictoryBar
                                data={dataChart}
                                x={'month'}
                                y={'tong_tien_dau_tu'}
                                alignment={'start'}
                                animate
                                barRatio={0.45}
                                style={styles.chartInvest}
                            />

                            <VictoryBar
                                data={dataChart}
                                x={'month'}
                                y={'tong_tien_thu_ve'}
                                alignment={'end'}
                                barRatio={0.45}
                                style={styles.chartEarning}
                            />

                        </VictoryGroup>
                        <VictoryLabel x={30} y={25} style={styles.labelAxis}
                            text={Languages.report.month}
                        />
                        <VictoryLabel x={320} y={230} style={styles.labelAxis}
                            text={Languages.common.VND}
                        />
                    </VictoryChart>
                    <View style={styles.row}>
                        <View style={styles.row}>
                            <View style={styles.rectangleInvest}></View>
                            <Text style={styles.noteChart}>{Languages.report.investment}</Text>
                        </View>
                        <View style={styles.row}>
                            <View style={styles.rectangleEarning}></View>
                            <Text style={styles.noteChart}>{Languages.report.moneyCollected}</Text>
                        </View>
                    </View>
                </View>
                {renderItem({ isOverview: true })}
                <Text style={styles.overviewQuarterTitle}>{Languages.report.monthOfQuarter}</Text>
            </View>
        );
    }, [dataChart, renderItem]);

    const renderMonthList = useMemo(() => {
        return (
            <FlatList
                data={reportList}
                keyExtractor={keyExtractor}
                renderItem={renderItem}
                ListHeaderComponent={renderChart}
                style={styles.flatList}
                showsVerticalScrollIndicator={false}
            />
        );
    }, [keyExtractor, renderChart, renderItem, reportList]);

    const onPressQuarter = useCallback((item?: any) => {
        setQuarter(item?.value);
    }, []);
    const onPressYear = useCallback((item?: any) => {
        setYear(item?.value);
    }, []);
    const renderFilter = useMemo(() => {
        return (
            <View style={styles.rowFilter}>
                <PickerBottomSheet
                    ref={quarterRef}
                    data={quarterList}
                    value={quarter}
                    placeholder={Languages.report.quarter}
                    onPressItem={onPressQuarter}
                    btnContainer={styles.rowItemFilter}
                    valueText={[styles.txtInterest, styles.txtQuarter]}
                    rightIcon={<ICUnderArrow />}
                    containerStyle={styles.containerItemFilter}
                />
                <PickerBottomSheet
                    ref={yearRef}
                    data={yearList}
                    value={year}
                    placeholder={Languages.report.year}
                    onPressItem={onPressYear}
                    btnContainer={styles.rowItemFilter}
                    valueText={[styles.txtInterest, styles.txtQuarter]}
                    rightIcon={<ICUnderArrow />}
                    containerStyle={styles.containerItemFilter}
                />
            </View>
        );
    }, [onPressQuarter, onPressYear, quarter, quarterList, year, yearList]);

    return (
        <View style={styles.container}>
            <HeaderBar title={`${Languages.report.title}`} isLight={false} />
            {renderFilter}
            {renderMonthList}
            {isLoading && <Loading isOverview />}
        </View >
    );
});

export default Report;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.GRAY_5
    },
    containerContent: {
        justifyContent: 'space-between'
    },
    chartContainer: {
        backgroundColor: COLORS.WHITE,
        borderRadius: 16,
        borderColor: COLORS.GRAY_13,
        borderWidth: 1
    },
    chartTitle: {
        ...Styles.typography.medium,
        borderColor: COLORS.GRAY_7,
        marginLeft: 16
    },
    overviewQuarterTitle: {
        ...Styles.typography.medium,
        color: COLORS.GRAY_7,
        fontSize: Configs.FontSize.size16,
        marginTop: 20,
        paddingBottom: 8
    },
    chartInvest: {
        data: {
            fill: COLORS.DARK_YELLOW
        },
        backgroundColor: COLORS.YELLOW_2
    },
    chartEarning: {
        data: {
            fill: COLORS.GREEN
        },
        backgroundColor: COLORS.GREEN
    },
    rectangleInvest: {
        width: 16,
        height: 16,
        backgroundColor: COLORS.DARK_YELLOW
    },
    rectangleEarning: {
        width: 16,
        height: 16,
        backgroundColor: COLORS.GREEN
    },
    row: {
        flexDirection: 'row',
        marginLeft: 25,
        paddingBottom: 5
    },
    noteChart: {
        marginLeft: 10
    },
    txtContractNumber: {
        color: COLORS.GREEN,
        fontSize: Configs.FontSize.size16,
        paddingVertical: 8
    },
    txtInvestNumber: {
        color: COLORS.RED_2,
        fontSize: Configs.FontSize.size16,
        paddingVertical: 8
    },
    txtEarning: {
        color: COLORS.GRAY_7,
        paddingVertical: 8
    },
    txtInterest: {
        color: COLORS.GREEN_2,
        paddingVertical: 4
    },
    overviewQuarterTxt: {
        ...Styles.typography.medium,
        color: COLORS.GRAY_7,
        marginVertical: 8,
        fontSize: Configs.FontSize.size20,
        textAlign: 'center'
    },
    containerItem: {
        marginBottom: 8,
        backgroundColor: COLORS.WHITE,
        borderRadius: 16,
        borderColor: COLORS.GRAY_13,
        borderWidth: 1
    },
    containerItemOverview: {
        marginTop: 8,
        backgroundColor: COLORS.WHITE,
        borderRadius: 16,
        borderColor: COLORS.GRAY_13,
        borderWidth: 1
    },
    flatList: {
        marginBottom: 15,
        marginHorizontal: 16
    },
    labelAxis: {
        ...Styles.typography.regular,
        color: COLORS.GRAY_12
    },
    rowFilter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 16
    },
    rowItemFilter: {
        backgroundColor: COLORS.WHITE,
        width: SCREEN_WIDTH / 2 - 30,
        borderColor: COLORS.GRAY_11,
        borderRadius: 20,
        marginVertical: 8,
        paddingVertical: 4,
        flexDirection: 'row',
        justifyContent: 'space-around',
        borderWidth: 1
    },
    txtQuarter: {
        ...Styles.typography.medium,
        textAlign: 'center',
        color: COLORS.GREEN,
        paddingLeft: 35
    },
    txtArrow: {
        marginVertical: 8
    },
    containerItemFilter: {
        marginBottom: -45
    },
    containerContentKeyValue: {
        width: '100%',
        alignItems: 'center'
    },
    textLeftMonth: {
        paddingVertical: 8
    }
});
