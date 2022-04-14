import { StyleSheet, Text, TextStyle, View, ViewStyle } from 'react-native';
import React from 'react';
import Dash from 'react-native-dash';

import { TouchableProps } from './elements/touchable/types';
import { COLORS, Styles } from '@/theme';
import { Touchable } from './elements/touchable';


const KeyValue = (
    { title, content, noIndicator, styleColor,
        styleContainer, leftIcon, rightIcon, hasDashBottom,
        styleTouchable, onPress, styleTitle, containerContent }:
        {
            noIndicator?: boolean,
            title: string,
            content?: string,
            styleColor?: TextStyle,
            styleContainer?: ViewStyle,
            leftIcon?: any,
            rightIcon?: any,
            styleTouchable?: TouchableProps,
            hasDashBottom?: boolean,
            onPress?: any,
            styleTitle?: TextStyle,
            containerContent?: ViewStyle
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
                <View style={[styles.rowCenter, containerContent]}>
                    <Text style={[styles.leftText, styleTitle]}>{title}</Text>
                    <Text style={[styles.contentText, styleColor]}>{content}</Text>
                </View>
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
    rowCenter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%'
    },
    leftText: {
        ...Styles.typography.regular,
        color: COLORS.GRAY_12,
        alignSelf: 'flex-start'
    },
    contentText: {
        ...Styles.typography.medium,
        color: COLORS.GRAY_7,
        alignSelf: 'flex-end'
    },
    dash: {
        paddingBottom: 10
    },
    dashBottom: {
        paddingTop: 8
    }
});
