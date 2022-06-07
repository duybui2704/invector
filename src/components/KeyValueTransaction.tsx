import { StyleSheet, Text, View } from 'react-native';
import React, { useCallback } from 'react';
import Dash from 'react-native-dash';
import { observer } from 'mobx-react';

import Languages from '@/common/Languages';
import { COLORS, Styles } from '@/theme';
import { Configs } from '@/common/Configs';
import { COLOR_TRANSACTION } from '@/common/constants';
import { typeTransaction } from '@/mocks/data';

const KeyValueTransaction = observer(({ title, dateTime, content, noIndicator, styleColor}:
    {
        noIndicator?: boolean,
        title?: string,
        dateTime?: string,
        content?: string,
        styleColor?: string,
    }) => {

    const renderColor = useCallback((_styleColor?: string, _title?: string) => {
        switch (_styleColor) {
            case COLOR_TRANSACTION.RED:
                return <Text style={[styles.leftText, styles.red]}>{_title}</Text>;
            case COLOR_TRANSACTION.YELLOW:
                return <Text style={[styles.leftText, styles.yellow]}>{_title}</Text>;
            case COLOR_TRANSACTION.GREEN:
                return <Text style={[styles.leftText, styles.green]}>{_title}</Text>;
            default:
                return <Text style={[styles.leftText, styles.green]}>{_title}</Text>;
        }
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <View style={styles.row}>
                    {renderColor(styleColor, title)}
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
            <View style={styles.wrapBottom}>
                {content === typeTransaction?.[0]?.value
                    ? <Text style={styles.commentText}>{Languages.msgNotify.successReceivedCongratulation}</Text>
                    : <Text style={styles.commentText}>{Languages.msgNotify.successInvestedCongratulation}</Text>
                }
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
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    wrapBottom: {
        paddingVertical: 2
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
        alignSelf: 'flex-end',
        paddingVertical: 2
    },
    contentText: {
        ...Styles.typography.medium,
        color: COLORS.GRAY_7,
        alignSelf: 'flex-end',
        paddingVertical: 6
    },
    dash: {
        marginVertical: 1
    },
    commentText: {
        ...Styles.typography.regular,
        color: COLORS.GRAY_12,
        paddingVertical: 4
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
