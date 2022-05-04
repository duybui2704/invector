import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Animated, ImageBackground, PanResponder, StatusBar, View } from 'react-native';

import Images from '@/assets/Images';
import Languages from '@/common/Languages';
import DimensionUtils, { ACTION_OFFSET, CARD } from '@/utils/DimensionUtils';
import Card from './card';
import { MyStylesBoar } from './styles';
import { COLORS, Styles } from '@/theme';
import Navigator from '@/routers/Navigator';
import ScreenName from '@/common/screenNames';
import IcBroad1 from '@/assets/image/broadening/ic_broad1.svg';
import IcBroad2 from '@/assets/image/broadening/ic_broad2.svg';
import IcBroad3 from '@/assets/image/broadening/ic_broad3.svg';
import IcIndex1 from '@/assets/image/broadening/ic_index1.svg';
import IcIndex2 from '@/assets/image/broadening/ic_index2.svg';
import IcIndex3 from '@/assets/image/broadening/ic_index3.svg';


export default function Broadening() {
    const styles = MyStylesBoar();
    const arr = [
        {
            title: Languages.board.title1,
            images: <IcBroad1
                style={styles.iconBig}
                width={DimensionUtils.SCREEN_WIDTH * 0.44}
                height={DimensionUtils.SCREEN_WIDTH * 0.44}
            />,
            icon: <IcIndex1 style={styles.iconSmall} />,
            txt: Languages.board.txt1
        },
        {
            title: Languages.board.title2,
            images: <IcBroad2
                style={styles.iconBig}
                width={DimensionUtils.SCREEN_WIDTH * 0.44}
                height={DimensionUtils.SCREEN_WIDTH * 0.44} />,
            icon: <IcIndex2 style={styles.iconSmall} />,
            txt: Languages.board.txt2
        },
        {
            title: Languages.board.title3,
            images: <IcBroad3
                style={styles.iconBig}
                width={DimensionUtils.SCREEN_WIDTH * 0.44}
                height={DimensionUtils.SCREEN_WIDTH * 0.44} />,
            icon: <IcIndex3 style={styles.iconSmall} />,
            txt: Languages.board.txt3
        }
    ];

    const swipe = useRef(new Animated.ValueXY()).current;
    const tiltSign = useRef(new Animated.Value(1)).current;
    const [data, setData] = useState(arr);
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
                            y: dy
                        },
                        useNativeDriver: true
                    }).start(transitionNext);
                } else {
                    Animated.spring(swipe, {
                        friction: 5,
                        toValue: {
                            x: 0,
                            y: 0
                        },
                        useNativeDriver: true
                    }).start();
                }
            }
        })
    ).current;

    const transitionNext = useCallback(() => {
        dem++;
        if (dem < 2) {
            setData((prevState) => prevState.slice(1));
            swipe.setValue({ x: 0, y: 0 });
        }
    }, [dem, swipe]);

    const handleChoise = useCallback(
        (name: string, isFirst: boolean, sign: number) => {
            console.log(name, isFirst);
            if ((name !== Languages.board.title3 && isFirst)) {
                Animated.timing(swipe.x, {
                    duration: 500,
                    toValue: sign * CARD.CARD_OUT_WIDTH,
                    useNativeDriver: true
                }).start(transitionNext);
            } else {
                Navigator.replaceScreen(ScreenName.auth);
            }
        },
        [swipe.x, transitionNext]
    );

    return (
        <ImageBackground style={styles.main} source={Images.bg_board} resizeMode='stretch'>
            <StatusBar
                barStyle={'dark-content'}
                animated
                translucent
                backgroundColor={COLORS.TRANSPARENT}
            />
            <Animated.View style={styles.container}>
                {data
                    .map(({ title, images, txt, icon }, index) => {
                        const isFirst = index === 0;
                        const panHandlers = isFirst ? panResponder.panHandlers : {};
                        return (
                            <Card
                                key={title}
                                name={title}
                                source={images}
                                icons={icon}
                                isFirst={isFirst}
                                swipe={swipe}
                                tiltSign={tiltSign}
                                txt={txt}
                                handleChoise={() => { handleChoise(title, isFirst, -1); }}
                                {...panHandlers}
                            />
                        );
                    })
                    .reverse()}
            </Animated.View>
        </ImageBackground>
    );
}
