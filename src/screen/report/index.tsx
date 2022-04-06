import { SCREEN_HEIGHT, SCREEN_WIDTH } from '@gorhom/bottom-sheet';
import React, { useCallback, useMemo, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { VictoryAxis, VictoryBar, VictoryChart, VictoryGroup, VictoryLabel, VictoryTheme, VictoryZoomContainer } from 'victory-native';
import { FlatList } from 'react-native-gesture-handler';

import { Configs } from '@/common/config';
import Languages from '@/common/Languages';
import { Touchable } from '@/components/elements/touchable';
import KeyValue from '@/components/KeyValue';
import { COLORS, Styles } from '@/theme';
import HeaderBar from '../../components/header';
import { DataChart } from '@/mocks/data';
import { MonthReportModel } from '@/models/monthOfQuarter-model';
import Utils from '@/utils/Utils';

const axisHorOption = {
    axis: { stroke: COLORS.BLACK, strokeWidth: 0.2 },
    ticks: { size: 0 },
    tickLabels: {
        fontSize: Configs.FontSize.size12,
        angle: -25
    }
};
const data = [
    { month: 'T3', earnings: 200, invest: 100 },
    { month: 'T2', earnings: 300, invest: 200 },
    { month: 'T1', earnings: 500, invest: 600 }
];
function Report() {

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
                    content={isOverview ? Utils.formatMoney(DataChart?.quarter1?.contractNumberQuarter) : Utils.formatMoney(item?.contractNumber)}
                    styleColor={styles.txtContractNumber} />
                <KeyValue
                    title={Languages.report.investMoney}
                    content={isOverview ? Utils.formatMoney(DataChart?.quarter1?.investMountQuarter) : Utils.formatMoney(item?.investMount)}
                    styleColor={styles.txtInvestNumber} />
                <KeyValue
                    title={Languages.report.originMoneyCollected}
                    content={isOverview ? Utils.formatMoney(DataChart?.quarter1?.originAmountEarningQuarter) : Utils.formatMoney(item?.originAmountEarning)}
                    styleColor={styles.txtEarning} />
                <KeyValue
                    title={Languages.report.interest}
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
                        >
                            <VictoryBar
                                data={DataChart.quarter1.data}
                                x={'month'}
                                y={'investMount'}
                                alignment={'start'}
                                animate
                                barRatio={0.4}
                                style={styles.chartInvest}
                                name={'ko'}
                            />

                            <VictoryBar
                                data={DataChart.quarter1.data}
                                x={'month'}
                                y={'originAmountEarning'}
                                alignment={'end'}
                                animate
                                barRatio={0.4}
                                style={styles.chartEarning}
                            />
                        </VictoryGroup>

                        <VictoryAxis
                            style={{
                                axisLabel: { fontSize: 20, padding: 20 },
                                tickLabels: { fontSize: 15, padding: 5 }
                            }}
                            label='Tháng'
                            labelComponent={
                                <VictoryLabel angle={-45} textAnchor='start' />
                            }
                        />
                        <VictoryAxis dependentAxis label="VND" fixLabelOverlap={false}
                            style={{
                                axisLabel: { fontSize: 20, padding: 23 },
                                tickLabels: { fontSize: 15, padding: 5 }
                            }} />
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

    return (
        <View style={styles.container}>
            <HeaderBar title={`${Languages.report.title}`} isLight={false} />
            {renderMonthList}

        </View >
    );
};

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
    }

});
