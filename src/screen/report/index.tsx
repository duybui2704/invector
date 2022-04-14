import { BottomSheetModal, SCREEN_HEIGHT, SCREEN_WIDTH } from '@gorhom/bottom-sheet';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { VictoryBar, VictoryChart, VictoryGroup, VictoryLabel, VictoryTheme, VictoryZoomContainer } from 'victory-native';
import { FlatList } from 'react-native-gesture-handler';
import { observer } from 'mobx-react';

import { Configs } from '@/common/Configs';
import { Touchable } from '@/components/elements/touchable';
import KeyValue from '@/components/KeyValue';
import { COLORS, Styles } from '@/theme';
import HeaderBar from '../../components/header';
import { DataChart, dataQuarterReport, dataYearReport } from '@/mocks/data';
import { MonthReportModel } from '@/models/monthOfQuarter-model';
import Utils from '@/utils/Utils';
import ICUnderArrow from '@/assets/image/ic_under_arrow.svg';
import PickerBottomSheet from '@/components/PickerBottomSheet';
import Languages from '@/common/Languages';

const Report = observer(()=> {
    const [quarter, setQuarter] = useState<string>('');
    const [year, setYear] = useState<string>('');
    const quarterRef = useRef<BottomSheetModal>(null);
    const yearRef = useRef<BottomSheetModal>(null);
    const keyExtractor = useCallback((item?: MonthReportModel) => {
        return `${item?.id}${item?.quarter}${item?.year}`;
    }, []);

    const renderItem = useCallback(({ item, isOverview }:
        { isOverview?: boolean, item?: MonthReportModel }) => {
        const _onPress = () => {
        };

        return (
            <Touchable style={!isOverview ? styles.containerItem : styles.containerItemOverview} onPress={_onPress}>
                <Text style={styles.overviewQuarterTxt}>
                    {isOverview ? `${Languages.report.overview}${' '}${Languages.report.quarter}${' '}${DataChart?.quarter1?.quarter}` :
                        `${Languages.report.month}${' '}${item?.month}`}
                </Text>
                <KeyValue
                    title={Languages.report.contractNumber}
                    styleTitle={styles.title}
                    content={isOverview ? Utils.formatMoney(DataChart?.quarter1?.contractNumberQuarter) : Utils.formatMoney(item?.contractNumber)}
                    styleColor={styles.txtContractNumber} />
                <KeyValue
                    title={Languages.report.investMoney}
                    styleTitle={styles.title}
                    content={isOverview ? Utils.formatMoney(DataChart?.quarter1?.investMountQuarter) : Utils.formatMoney(item?.investMount)}
                    styleColor={styles.txtInvestNumber} />
                <KeyValue
                    title={Languages.report.originMoneyCollected}
                    styleTitle={styles.title}
                    content={isOverview ? Utils.formatMoney(DataChart?.quarter1?.originAmountEarningQuarter) : Utils.formatMoney(item?.originAmountEarning)}
                    styleColor={styles.txtEarning} />
                <KeyValue
                    title={Languages.report.interest}
                    styleTitle={styles.title}
                    content={isOverview ? Utils.formatMoney(DataChart?.quarter1?.interestQuarter) : Utils.formatMoney(item?.interest)}
                    styleColor={styles.txtInterest}
                />
            </Touchable>
        );
    }, []);

    const renderChart = useCallback(() => {
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
                                zoomDomain={{ y: [1000000, 40000000] }}
                            />
                        }
                    >
                        <VictoryGroup
                            offset={-3}
                            domainPadding={{ y: [2, -2] }}
                            domain={{ y: [1000000, 2000000000000] }}
                            animate
                        >

                            <VictoryBar
                                data={DataChart.quarter1.data}
                                x={'month'}
                                y={'investMount'}
                                alignment={'start'}
                                animate
                                barRatio={0.45}
                                style={styles.chartInvest}
                            />

                            <VictoryBar
                                data={DataChart.quarter1.data}
                                x={'month'}
                                y={'originAmountEarning'}
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
    }, [renderItem]);

    const renderMonthList = useMemo(() => {
        return (
            <FlatList
                data={DataChart.quarter1.data}
                keyExtractor={keyExtractor}
                renderItem={renderItem}
                ListHeaderComponent={renderChart()}
                style={styles.flatList}
            />
        );
    }, [keyExtractor, renderChart, renderItem]);

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
                    data={dataQuarterReport}
                    value={quarter}
                    placeholder={Languages.report.quarter}
                    onPressItem={onPressQuarter}
                    btnContainer={styles.rowItemFilter}
                    valueText={[styles.txtInterest, styles.txtQuarter]}
                    rightIcon={<ICUnderArrow style={styles.txtArrow} />}
                    containerStyle={styles.containerItemFilter}
                />
                <PickerBottomSheet
                    ref={yearRef}
                    data={dataYearReport}
                    value={year}
                    placeholder={Languages.report.year}
                    onPressItem={onPressYear}
                    btnContainer={styles.rowItemFilter}
                    valueText={[styles.txtInterest, styles.txtQuarter]}
                    rightIcon={<ICUnderArrow style={styles.txtArrow} />}
                    containerStyle={styles.containerItemFilter}
                />
            </View>
        );
    }, [onPressQuarter, onPressYear, quarter, year]);

    return (
        <View style={styles.container}>
            <HeaderBar title={`${Languages.report.title}`} isLight={false} />
            {renderFilter}
            {renderMonthList}
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
        fontSize: Configs.FontSize.size16
    },
    txtInvestNumber: {
        color: COLORS.RED_2,
        fontSize: Configs.FontSize.size16
    },
    txtEarning: {
        color: COLORS.GRAY_7
    },
    txtInterest: {
        color: COLORS.GREEN_2
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
        paddingVertical: 8,
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
    title: {
        marginRight: 5
    }
});
