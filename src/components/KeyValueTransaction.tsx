import { StyleSheet, Text, View } from 'react-native';
import React, { useCallback, useMemo } from 'react';
import Dash from 'react-native-dash';
import { observer } from 'mobx-react';

import Languages from '@/common/Languages';
import { COLORS, Styles } from '@/theme';
import { Configs } from '@/common/Configs';
import { COLOR_TRANSACTION } from '@/common/constants';

const KeyValueTransaction = observer(({ title, dateTime, content, noIndicator, styleColor, debtNow }:
    { noIndicator?: boolean, title?: string, dateTime?: string, content?: string, styleColor?: string, debtNow?: number }) => {

    const renderColor = useCallback((_styleColor?: string, _title?: string) => {
        switch (_styleColor) {
            case COLOR_TRANSACTION.RED:
                return <Text style={[styles.leftText, styles.red]}>{_title}</Text>;
            case COLOR_TRANSACTION.YELLOW:
                return <Text style={[styles.leftText, styles.green]}>{_title}</Text>;
            case COLOR_TRANSACTION.GREEN:
                return <Text style={[styles.leftText, styles.yellow]}>{_title}</Text>;
            default:
                return <Text style={[styles.leftText, styles.yellow]}>{_title}</Text>;
        }
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <View style={styles.row}>
                    <Text> {renderColor(styleColor, title)}</Text>
                </View>
                <View>
                    <Text style={styles.dateText}>{dateTime}</Text>
                    <Text style={styles.contentText}>{content}</Text>
                </View>
            </View>
            {!noIndicator && <Dash
                style={styles.dash}
                dashThickness={1}
                dashLength={10}
                dashGap={5}
                dashColor={COLORS.GRAY_13} />}
            <View style={styles.rowDebt}>
                <Text style={styles.debtText}>{`${Languages.transaction.allInvestNow}: `}</Text>
                <Text style={styles.debtNumber}>{`${debtNow}`|| ''}</Text>
            </View>
        </View>
    );
});

export default KeyValueTransaction;

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 16,
        marginTop: 10,
        backgroundColor: COLORS.WHITE,
        borderRadius: 16,
        paddingHorizontal: 16,
        paddingVertical: 3
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    rowDebt: {
        flexDirection: 'row'
    },
    leftText: {
        ...Styles.typography.medium,
        color: COLORS.GREEN,
        fontSize: Configs.FontSize.size20,
        alignSelf: 'center'
    },
    dateText: {
        ...Styles.typography.regular,
        color: COLORS.GRAY_12,
        fontSize: Configs.FontSize.size10,
        alignSelf: 'flex-end'
    },
    contentText: {
        ...Styles.typography.medium,
        color: COLORS.GRAY_7,
        alignSelf: 'flex-end'
    },
    dash: {
        marginVertical: 4
    },
    debtText: {
        ...Styles.typography.regular
    },
    debtNumber: {
        ...Styles.typography.medium
    },
    red: {
        color: COLORS.RED
    },
    green: {
        color: COLORS.GREEN
    },
    yellow: {
        color: COLORS.YELLOW
    }
});
