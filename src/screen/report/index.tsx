import { BottomSheetModal, SCREEN_HEIGHT, SCREEN_WIDTH } from '@gorhom/bottom-sheet';
import { observer } from 'mobx-react';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Text, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { VictoryBar, VictoryChart, VictoryGroup, VictoryLabel, VictoryTheme, VictoryZoomContainer } from 'victory-native';

import ICUnderArrow from '@/assets/image/ic_under_arrow.svg';
import Languages from '@/common/Languages';
import HeaderBar from '@/components/header';
import KeyValueReport from '@/components/KeyValueReport';
import Loading from '@/components/loading';
import PickerBottomSheet from '@/components/PickerBottomSheet';
import { useAppStore } from '@/hooks';
import { ItemProps } from '@/models/common-model';
import { OverviewMonthOfQuarterModal, TotalOfQuarterModal } from '@/models/monthOfQuarter-model';
import DateUtils from '@/utils/DateUtils';
import Utils from '@/utils/Utils';
import { MyStylesReport } from './styles';

const Report = observer(() => {
    const styles = MyStylesReport();
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
    
        return (
            <View style={!isOverview ? styles.containerItem : styles.containerItemOverview}>
                <Text style={styles.overviewQuarterTxt}>
                    {isOverview ? `${Languages.report.overview}${' '}${quarter}` || 0 :
                        `${item?.month}`.slice(0, 8).replace('/','') || 0}
                </Text>
                <KeyValueReport
                    styleTitle={styles.textLeftMonth}
                    title={Languages.report.contractNumber}
                    containerContent={styles.containerContentKeyValue}
                    content={isOverview ? Utils.formatMoney(total?.tong_hop_dong || 0) : Utils.formatMoney(item?.so_hop_dong_dau_tu || 0)}
                    styleColor={styles.txtContractNumber} />
                <KeyValueReport
                    title={Languages.report.investMoney}
                    styleTitle={styles.textLeftMonth}
                    containerContent={styles.containerContentKeyValue}
                    content={isOverview ? Utils.formatMoney(total?.tong_tat_ca_tien_dau_tu || 0) : Utils.formatMoney(item?.tong_tien_dau_tu || 0)}
                    styleColor={styles.txtInvestNumber} />
                <KeyValueReport
                    title={Languages.report.originMoneyCollected}
                    styleTitle={styles.textLeftMonth}
                    containerContent={styles.containerContentKeyValue}
                    content={isOverview ? Utils.formatMoney(total?.tien_goc_thu_ve || 0) : Utils.formatMoney(item?.tien_goc_thu_ve || 0)}
                    styleColor={styles.txtEarning} />
                <KeyValueReport
                    title={Languages.report.interest}
                    styleTitle={styles.textLeftMonth}
                    containerContent={styles.containerContentKeyValue}
                    content={isOverview ? Utils.formatMoney(total?.tong_lai_phi || 0) : Utils.formatMoney(item?.tong_lai_phi || 0)}
                    styleColor={styles.txtInterest}
                />
            </View>
        );
    }, [quarter, styles.containerContentKeyValue, styles.containerItem, styles.containerItemOverview, styles.overviewQuarterTxt, styles.textLeftMonth, styles.txtContractNumber, styles.txtEarning, styles.txtInterest, styles.txtInvestNumber, total?.tien_goc_thu_ve, total?.tong_hop_dong, total?.tong_lai_phi, total?.tong_tat_ca_tien_dau_tu]);

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
    }, [dataChart, renderItem, styles.chartContainer, styles.chartEarning, styles.chartInvest, styles.chartTitle, styles.containerContent, styles.labelAxis, styles.noteChart, styles.overviewQuarterTitle, styles.rectangleEarning, styles.rectangleInvest, styles.row]);

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
    }, [keyExtractor, renderChart, renderItem, reportList, styles.flatList]);

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
    }, [onPressQuarter, onPressYear, quarter, quarterList, styles.containerItemFilter, styles.rowFilter, styles.rowItemFilter, styles.txtInterest, styles.txtQuarter, year, yearList]);

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
