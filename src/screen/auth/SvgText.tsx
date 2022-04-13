import * as React from 'react';
import {View, StyleSheet} from 'react-native';
import {Circle, TextPath, TSpan, G, Svg, Text} from 'react-native-svg';
import {useCallback, useState, useEffect} from 'react';

import {COLORS} from '@/theme';
import Languages from '@/common/languages';
import DimensionUtils from '@/utils/DimensionUtils';

const SvgComponent = (props) => {

    const [pressDN, setPressDN] = useState(true);
    const [pressDK, setPressDK] = useState(false);
    const [pressQMK, setPressQMK] = useState(false);
    const [key, setKey] = useState<string>();

    useEffect(() => {
        if (props.onNavigate) {
            props.onNavigate(key);
        }
    }, [props.onNavigate, key]);


    const onNavigateLogin = useCallback(() => {
        setPressDK(false);
        setPressDN(true);
        setPressQMK(false);
        setKey(Languages.Auth.txtLogin);
    }, []);

    const onNavigateSign = useCallback(() => {
        setPressDK(true);
        setPressDN(false);
        setPressQMK(false);
        setKey(Languages.Auth.txtTitle);
    }, []);

    const onNavigateFW = useCallback(() => {
        setPressDK(false);
        setPressDN(false);
        setPressQMK(true);
    }, []);

    return (
        <View style={{flex: 1}}>
            <View style={styles.container}>
                <Svg height="100%" width="100%" viewBox='100 20 160 300'  {...props}>
                    <G id="circle">
                        <Circle
                            r={DimensionUtils.SCREEN_WIDTH * 0.245}
                            x={DimensionUtils.SCREEN_WIDTH * 0.36}
                            y={DimensionUtils.SCREEN_WIDTH * 0.36}
                            fill="white"
                        />
                    </G>
                    <Text fill={pressQMK ?
                        COLORS.WHITE : COLORS.GRAY}
                    fontSize="10"
                    onResponderStart={onNavigateFW}
                    key='1'>
                        <TextPath href="#circle">
                            <TSpan dy={-DimensionUtils.SCREEN_WIDTH * 0.013}
                                dx={DimensionUtils.SCREEN_WIDTH * 0.16}>
                                Q u ê n  M â t  K h ẩ u
                            </TSpan>
                        </TextPath>
                    </Text>
                    <Text fill={pressDN ?
                        COLORS.WHITE : COLORS.GRAY
                    } fontSize="10" onPress={onNavigateLogin} key='2'>
                        <TextPath href="#circle">
                            <TSpan dx={1.175 * DimensionUtils.SCREEN_WIDTH}
                                dy={-DimensionUtils.SCREEN_WIDTH * 0.012}>
                                Đ ă n g  N h ậ p
                            </TSpan>
                        </TextPath>
                    </Text>
                    <Text onPress={onNavigateSign} key='3'>
                        <Text fill={pressDK ? COLORS.WHITE : COLORS.GRAY} fontSize="10">
                            <TextPath href="#circle">
                                <TSpan dx={1.44 * DimensionUtils.SCREEN_WIDTH}
                                    dy={-DimensionUtils.SCREEN_WIDTH * 0.012}>Đ ă n g </TSpan>
                            </TextPath>
                        </Text>
                        <Text fill={pressDK ? COLORS.WHITE : COLORS.GRAY} fontSize="10">
                            <TextPath href="#circle">
                                <TSpan dx={0} dy={-DimensionUtils.SCREEN_WIDTH * 0.012}>K ý</TSpan>
                            </TextPath>
                        </Text>
                    </Text>
                </Svg>
            </View>
        </View>
    );
};


export default SvgComponent;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: COLORS.TRANSPARENT
    }
});
