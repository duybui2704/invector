import Images from '@/assets/Images';
import Languages from '@/common/Languages';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Animated, PanResponder, StatusBar, View } from 'react-native';
import { ACTION_OFFSET, CARD } from '@/utils/DimensionUtils';

import Card from './card';
import { MyStylesBoar } from './styles';
import { COLORS } from '@/theme';
import Navigator from '@/routers/Navigator';
import ScreenName from '@/common/screenNames';

const arr = [
    {
        title: Languages.board.title1,
        images: Images.bg_board1,
        txt: Languages.board.txt1
    },
    {
        title: Languages.board.title2,
        images: Images.bg_board2,
        txt: Languages.board.txt2
    },
    {
        title: Languages.board.title3,
        images: Images.bg_board3,
        txt: Languages.board.txt3
    }
];

export default function Onboarding() {
    const swipe = useRef(new Animated.ValueXY()).current;
    const tiltSign = useRef(new Animated.Value(1)).current;
    const [data, setData] = useState(arr);
    const styles = MyStylesBoar();
    let dem = 0;

    useEffect(() => {
        if (data.length === 0) {
            setData(arr);
        }
    }, [data]);

    const panResponder = useRef(
        PanResponder.create({
            onMoveShouldSetPanResponder: () => true,
            onPanResponderRelease: (e, { dx, dy }) => {
                const direction = Math.sign(dx);
                const userAction = Math.abs(dx) > ACTION_OFFSET;

                if (userAction) {
                    Animated.timing(swipe, {
                        duration: 200,
                        toValue: {
                            x: direction * CARD.CARD_OUT_WIDTH,
                            y: dy,
                        },
                        useNativeDriver: true,
                    }).start(transitionNext);
                } else {
                    Animated.spring(swipe, {
                        friction: 5,
                        toValue: {
                            x: 0,
                            y: 0,
                        },
                        useNativeDriver: true,
                    }).start();
                }
            },
        })
    ).current;

    const transitionNext = useCallback(() => {
        dem++;
        if (dem < 2) {
            setData((prevState) => prevState.slice(1));
            swipe.setValue({ x: 0, y: 0 });
        } 
    }, [swipe]);

    const handleChoise = useCallback(
        (name, isFirst, sign) => {
            console.log(name, isFirst);
            if ((name !== Languages.board.title3 && isFirst)) {
                Animated.timing(swipe.x, {
                    duration: 500,
                    toValue: sign * CARD.CARD_OUT_WIDTH,
                    useNativeDriver: true,
                }).start(transitionNext);
            } else {
                Navigator.replaceScreen(ScreenName.auth)
            }
        },
        [swipe.x, transitionNext]
    );

    return (
        <View style={{ flex: 1 }}>
            <StatusBar
                barStyle={'dark-content'}
                animated
                translucent
                backgroundColor={COLORS.TRANSPARENT}
            />
            <Animated.View style={styles.container}>
                {data
                    .map(({ title, images, txt }, index) => {
                        const isFirst = index === 0;
                        const panHandlers = isFirst ? panResponder.panHandlers : {};
                        return (
                            <Card
                                key={title}
                                name={title}
                                source={images}
                                isFirst={isFirst}
                                swipe={swipe}
                                tiltSign={tiltSign}
                                txt={txt}
                                handleChoise={() => { handleChoise(title, isFirst, -1) }}
                                {...panHandlers}
                            />
                        );
                    })
                    .reverse()}
            </Animated.View>
        </View>
    );
}
