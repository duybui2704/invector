import React from 'react';
import {
    StyleSheet, Text, View
} from 'react-native';
import Dash from 'react-native-dash';
import { Switch } from 'react-native-switch';

import { COLORS, Styles } from '@/theme';
import { Configs } from '@/common/Configs';

const KeyToggleValue = ({ leftIcon, label, isEnabledSwitch, onToggleSwitch, hasDash }:
    { label: string, isEnabledSwitch: boolean, onToggleSwitch: (value: boolean) => any, hasDash?: boolean, leftIcon?: any }) => {

    return (
        <>
            <View style={styles.fingerWrap}>
                {leftIcon}
                <View style={styles.featureFingerContainer}>
                    <Text style={styles.txtAuthenFinger}>{label}</Text>
                    <Switch
                        value={isEnabledSwitch}
                        onValueChange={onToggleSwitch}
                        circleSize={Configs.FontSize.size22}
                        barHeight={Configs.FontSize.size22}
                        circleBorderWidth={1}
                        backgroundActive={COLORS.GREEN}
                        backgroundInactive={COLORS.BACKDROP}
                        circleActiveColor={COLORS.WHITE}
                        circleInActiveColor={COLORS.WHITE}
                        renderActiveText={false}
                        renderInActiveText={false}
                    />
                </View>
            </View>
            {hasDash ? <Dash
                style={styles.dash}
                dashThickness={1}
                dashLength={10}
                dashGap={5}
                dashColor={COLORS.GRAY_13} /> : null}
        </>
    );
};

export default KeyToggleValue;

const styles = StyleSheet.create({
    txtAuthenFinger: {
        ...Styles.typography.regular,
        color: COLORS.GRAY_7,
        paddingVertical: 10
    },
    dash: {
        marginHorizontal: 16
    },
    featureFingerContainer: {
        width: '90%',
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingLeft: 8,
        alignItems: 'center'
    },
    fingerWrap: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 16,
        alignItems: 'center'
    }
});
