import React, { useEffect } from 'react';
import { Animated, Image, ImageBackground, StatusBar, Text, View } from 'react-native';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '@gorhom/bottom-sheet';
import Svg, { Circle, G } from 'react-native-svg';

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
        outputRange: ['4deg', '0deg', '-4deg']
    });

    const animatedCardStyle = {
        transform: [...swipe.getTranslateTransform(), { rotate }]
    };

    return (
        <Animated.View
            style={isFirst && [animatedCardStyle, styles.gradient]}
        >
            <ImageBackground style={styles.image} source={Images.bg_board} resizeMode={'stretch'} >
                <Svg height="100%" width="100%"  >
                    <G id="circle">
                        <Circle
                            r={DimensionUtils.SCREEN_WIDTH * 0.6}
                            x={DimensionUtils.SCREEN_WIDTH * 0.2}
                            y={DimensionUtils.SCREEN_HEIGHT / 5}
                            fill={COLORS.WHITE}
                        />
                    </G>
                </Svg>
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
                    <Text style={styles.txtContinue}>{Languages.common.continue}</Text>
                </Touchable>
            </ImageBackground>
        </Animated.View>
    );
}
