import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Dash from 'react-native-dash';

import { COLORS, Styles } from '../theme';

const KeyValue = ({ title, content, noIndicator, styleColor }:
    { noIndicator?: boolean, title?: string, content?: string, styleColor?: any, }) => {

    return (
        <View style={styles.container}>
            {!noIndicator && <Dash
                style={styles.dash}
                dashThickness={1}
                dashLength={10}
                dashGap={5}
                dashColor={COLORS.GRAY_13} />
            }

            <View style={styles.row}>
                <Text style={styles.leftText}>{title}</Text>
                <Text style={[styles.contentText, styleColor]}>{content}</Text>
            </View>

        </View>
    );
};

export default KeyValue;

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.WHITE,
        paddingHorizontal: 16,
        paddingVertical: 4,
        borderRadius: 16
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    leftText: {
        ...Styles.typography.regular,
        color: COLORS.GRAY_12
    },
    contentText: {
        ...Styles.typography.medium,
        color: COLORS.GRAY_7
    },
    dash: {
        paddingBottom: 10
    }
});
