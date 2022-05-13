import React from 'react';
import {
    StyleSheet, Text, TextStyle
} from 'react-native';

import { KeyValueModel } from '@/models/keyValue-model';
import { Touchable } from './elements/touchable';
import { COLORS, Styles } from '@/theme';

const Filter = ({ item, selected, onPress, style }:
    { item: KeyValueModel , selected: boolean, onPress: any, style?: TextStyle }) => {

    return <Touchable style={selected ? styles.filterSelected : styles.filterUnSelected}
        onPress={onPress}>
        <Text style={[selected ? styles.filterTxtSelected : styles.filterTxtUnSelected, style]}>
            {item.label}
        </Text>
    </Touchable>;
};

export default Filter;

const styles = StyleSheet.create({
    filterUnSelected: {
        borderRadius: 35,
        marginHorizontal: 5,
        backgroundColor: COLORS.GRAY_13,
        paddingHorizontal: 16
    },
    filterSelected: {
        borderRadius: 35,
        backgroundColor: COLORS.WHITE,
        marginHorizontal: 5,
        paddingHorizontal: 16
    },
    filterTxtSelected: {
        ...Styles.typography.medium,
        color: COLORS.GREEN,
        paddingVertical: 3,
        alignSelf: 'center'
    },
    filterTxtUnSelected: {
        ...Styles.typography.medium,
        color: COLORS.GRAY_7,
        paddingVertical: 3,
        alignSelf: 'center'
    }
});
