import React from 'react';
import { Animated, Image, StatusBar, Text, View } from 'react-native';

import { ACTION_OFFSET } from '@/utils/DimensionUtils';

import { MyStylesCard } from './styles';
import { useEffect } from 'react';
import { COLORS } from '@/theme';
import { Touchable } from '@/components/elements/touchable';
import Languages from '@/common/Languages';
import { Configs } from '@/common/Configs';

export default function Card({
    name,
    source,
    isFirst,
    swipe,
    tiltSign,
    txt,
    handleChoise,
    ...rest
}) {

    const styles = MyStylesCard();

    const rotate = Animated.multiply(swipe.x, tiltSign).interpolate({
        inputRange: [-ACTION_OFFSET, 0, ACTION_OFFSET],
        outputRange: ['8deg', '0deg', '-8deg'],
    });

    const animatedCardStyle = {
        transform: [...swipe.getTranslateTransform(), { rotate: rotate }],
    };

    return (
        <Animated.View
            style={isFirst && [animatedCardStyle, styles.gradient]}
            {...rest}
        >
            <Image style={styles.image} source={source} resizeMode={'stretch'} />
            <View style={styles.viewBottom}>
                <View style={styles.viewText}>
                    <Text style={styles.title}>{name}</Text>
                    <Text style={styles.txt}>{txt}</Text>
                </View>
                <Touchable style={styles.tob} onPress={handleChoise}>
                    <Text style={[styles.title, {fontSize: Configs.FontSize.size16}]}>{Languages.common.continue}</Text>
                </Touchable>
            </View>
        </Animated.View>
    );
}
