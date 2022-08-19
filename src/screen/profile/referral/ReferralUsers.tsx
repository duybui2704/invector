import { observer } from 'mobx-react';
import React, { useCallback, useEffect, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import HTMLView from 'react-native-htmlview';
import MonthPicker from 'react-native-month-year-picker';

import Languages from '@/common/Languages';
import HeaderBar from '@/components/header';
import { COLORS, HtmlStyles } from '@/theme';
import { MyStylesReferral } from './styles';
import Utils from '@/utils/Utils';
import { Touchable } from '@/components/elements/touchable';
import IcBtnFilter from '@/assets/image/ic_button_filter.svg';
import DateUtils from '@/utils/DateUtils';

const ReferralUsers = observer(() => {
    const styles = MyStylesReferral();

    const [date, setDate] = useState(new Date());
    const [visibleFilter, setVisibleFilter] = useState<boolean>(false);
    const [title, setTitle] = useState<string>(Languages.referralUsers.tableDes);

    useEffect(() => {
        onValueChange(null, new Date());
    }, []);

    const renderColIndex = useCallback(() => {
        return <View style={[styles.colContainer, { backgroundColor: COLORS.LIGHT_GREEN }]}>
            <Text style={styles.colName}>
                {Languages.referralUsers.colName}
            </Text>
            <Text style={styles.colMoney}>
                {Languages.referralUsers.colMoney}
            </Text>
            <Text style={styles.colCommission}>
                {Languages.referralUsers.colCommission}
            </Text>
        </View>;
    }, []);

    const renderRow = useCallback((index: number) => {
        return <View style={[styles.colContainer, { backgroundColor: index % 2 === 0 ? COLORS.GRAY_2 : COLORS.GRAY_15 }]}>
            <Text style={styles.colNameC}>
                {'Nguyễn Văn A'}
            </Text>
            <Text style={styles.colMoneyC}>
                {Utils.formatMoney('10000000')}
            </Text>
            <Text style={styles.colCommissionC}>
                {Utils.formatMoney('1000000')}
            </Text>
        </View>;
    }, []);

    const onPopupFilter = useCallback((index: number) => {
        setVisibleFilter(true);
    }, []);

    const onValueChange = useCallback((event, newDate) => {
        const selectedDate = newDate || date;
        const monthYear = DateUtils.formatMonthPicker(newDate);
        setTitle(Languages.referralUsers.tableDes.replace('%s', monthYear));

        setDate(selectedDate);
        setVisibleFilter(false);
    }, [date]);

    return (
        <View style={styles.container}>
            <HeaderBar isLight={false} title={Languages.referralUsers.title} hasBack />
            <View style={styles.wrapAllContent}>
                <View style={styles.desContainer}>
                    <Text style={styles.textDes}>
                        {title}
                    </Text>
                    <Touchable
                        style={styles.iconFilter}
                        onPress={onPopupFilter}
                    >
                        <IcBtnFilter />
                    </Touchable>
                </View>

                {renderColIndex()}
                {renderRow(1)}
                {renderRow(2)}
            </View>

            <HTMLView
                value={Languages.referralUsers.des}
                stylesheet={HtmlStyles || undefined}
            />

            {visibleFilter && <MonthPicker
                locale="vi"
                value={date}
                minimumDate={new Date(2021, 1)}
                maximumDate={new Date()}
                okButton={Languages.common.agree}
                cancelButton={Languages.common.cancel}
                onChange={onValueChange}
            />}
        </View >
    );
});

export default ReferralUsers;
