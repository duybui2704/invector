import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Dash from 'react-native-dash';

import { COLORS, Styles } from '../theme';
import { Touchable } from './elements/touchable';

const KeyValue = (
    { title, content, noIndicator, styleColor, styleContainer, leftIcon, rightIcon, hasDashBottom, styleTouchable, onPress, styleTitle }:
        {
            noIndicator?: boolean,
            title: string,
            content?: string,
            styleColor?: any,
            styleContainer?: any,
            leftIcon?: any,
            rightIcon?: any,
            styleTouchable?:any,
            hasDashBottom?: boolean,
            onPress?:any,
            styleTitle?:any
        }
) => {

    return (
        <View style={[styles.container, styleContainer]}>
            {!noIndicator && <Dash
                style={styles.dash}
                dashThickness={1}
                dashLength={10}
                dashGap={5}
                dashColor={COLORS.GRAY_13} />
            }

            <Touchable style={[styles.row, styleTouchable]} onPress={onPress}>
                {leftIcon || null}
                <Text style={[styles.leftText, styleTitle]}>{title}</Text>
                <Text style={[styles.contentText, styleColor]}>{content}</Text>
                {rightIcon || null}
            </Touchable>
            {hasDashBottom && <Dash
                style={styles.dashBottom}
                dashThickness={1}
                dashLength={10}
                dashGap={5}
                dashColor={COLORS.GRAY_13} />
            }
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
        justifyContent: 'space-between',
        alignItems: 'center'
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
    },
    dashBottom: {
        paddingTop: 8
    }
});
