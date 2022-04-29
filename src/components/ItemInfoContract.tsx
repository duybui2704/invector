import React from 'react';
import { StyleSheet, Text, TextStyle, View } from 'react-native';
import Dash from 'react-native-dash';

import { COLORS, Styles } from '@/theme';


type ItemProps = {
    label: string;
    value: string
    colorText?: string

};
const ItemInfoContract = ({ label, value, colorText }: ItemProps
) => {
    const styleText = {
        color: colorText || COLORS.GRAY_7
    } as TextStyle;

    return (
        <>
            <Dash
                dashThickness={1}
                dashLength={10}
                dashGap={5}
                dashColor={COLORS.GRAY_13} />
            <View style={styles.wrapItem}>
                <Text style={styles.label}>{label}</Text>
                <Text style={[styles.txtValue, styleText]} numberOfLines={1}>{value}</Text>
            </View>
        </>
    );
};
const styles = StyleSheet.create({
    wrapItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 8,
        alignItems: 'center'
    },
    label: {
        ...Styles.typography.regular,
        color: COLORS.GRAY_12,
        maxWidth: '40%'
    },
    txtValue: {
        ...Styles.typography.medium,
        color: COLORS.GRAY_7,
        maxWidth: '60%'
    }
});
export default ItemInfoContract;


