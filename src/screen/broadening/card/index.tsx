import React, { useEffect } from 'react';
import { Animated, Image, ImageBackground, StatusBar, Text, View } from 'react-native';

import DimensionUtils, { ACTION_OFFSET } from '@/utils/DimensionUtils';
import { MyStylesCard } from './styles';
import { COLORS } from '@/theme';
import { Touchable } from '@/components/elements/touchable';
import Languages from '@/common/Languages';
import { Configs } from '@/common/Configs';
import Images from '@/assets/Images';
import LogoBroadening from '@/assets/image/broadening/logo_broadening.svg';

type ItemProps = {
    name: string
    source?: any
    icons?: any
    isFirst?: boolean
    swipe?: any
    tiltSign?: any
    txt: string
    handleChoice?: () => any,
    rest?: any

};

export default function Card({
    name,
    source,
    isFirst,
    swipe,
    tiltSign,
    txt,
    icons,
    handleChoice
}: ItemProps) {

    const styles = MyStylesCard();

    const rotate = Animated.multiply(swipe.x, tiltSign).interpolate({
        inputRange: [-ACTION_OFFSET, 0, ACTION_OFFSET],
        outputRange: ['8deg', '0deg', '-8deg']
    });

    const animatedCardStyle = {
        transform: [...swipe.getTranslateTransform(), { rotate }]
    };

    return (
        <Animated.View
            style={isFirst && [animatedCardStyle, styles.gradient]}
        >
            <ImageBackground style={styles.image} source={Images.bg_board} resizeMode={'stretch'} >
                <LogoBroadening
                    style={styles.logo}
                    width={DimensionUtils.SCREEN_WIDTH * 0.5}
                    height={DimensionUtils.SCREEN_WIDTH * 0.14}
                />
                {source}
                {icons}
                <View style={styles.viewBottom}>
                    <View style={styles.viewText}>
                        <Text style={styles.title}>{name}</Text>
                        <Text style={styles.txt}>{txt}</Text>
                    </View>
                </View>
                <Touchable style={styles.tob} onPress={handleChoice}>
                    <Text style={[styles.title, { fontSize: Configs.FontSize.size16 }]}>{Languages.common.continue}</Text>
                </Touchable>
            </ImageBackground>
        </Animated.View>
    );
}
