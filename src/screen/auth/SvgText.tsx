import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { Circle, TextPath, TSpan, G, Svg, Text } from 'react-native-svg';
import { useCallback, useState, useEffect } from 'react';

import { COLORS } from '@/theme';
import Languages from '@/common/Languages';

const SvgComponent = (props) => {

    const [pressDN, setPessDN] = useState(true);
    const [pressDK, setPessDK] = useState(false);
    const [pressQMK, setPessQMK] = useState(false);
    const [key, setKey] = useState<string>();

    useEffect(() => {
        if (props.onNavigate) {
            props.onNavigate(key);
        }
    }, [props.onNavigate, key]);


    const onNavigateLogin = useCallback(() => {
        setPessDK(false);
        setPessDN(true);
        setPessQMK(false);
        setKey(Languages.Auth.txtLogin);
    }, []);
    const onNavigateSign = useCallback(() => {
        setPessDK(true);
        setPessDN(false);
        setPessQMK(false);
        setKey(Languages.Auth.txtTitle);
    }, []);
    const onNavigateFW = useCallback(() => {
        setPessDK(false);
        setPessDN(false);
        setPessQMK(true);
    }, []);

    return (
        <View style={{ flex: 1 }}>
            <View style={styles.container}>
                <Svg height="100%" width="100%" viewBox='100 20 160 300'  {...props}>
                    <G id="circle">
                        <Circle
                            r={100}
                            x={150}
                            y={150}
                            fill="white"
                        />
                    </G>
                    <Text fill={pressQMK ? 'white' : 'black'} fontSize="10" onPress={onNavigateFW} key='1'>
                        <TextPath href="#circle">
                            <TSpan dy={-5} dx={50}>
                                Q u ê n  M â t  K h ẩ u
                            </TSpan>
                        </TextPath>
                    </Text>
                    <Text fill={pressDN ? 'white' : 'black'} fontSize="10" onPress={onNavigateLogin} key='2'>
                        <TextPath href="#circle">
                            <TSpan dx={490} dy={-5}>
                                Đ ă n g  N h ậ p
                            </TSpan>
                        </TextPath>
                    </Text>
                    <Text onPress={onNavigateSign} key='3'>
                        <Text fill={pressDK ? 'white' : 'black'} fontSize="10">
                            <TextPath href="#circle">
                                <TSpan dx={590} dy={-5}>Đ ă n g </TSpan>
                            </TextPath>
                        </Text>
                        <Text fill={pressDK ? 'white' : 'black'} fontSize="10">
                            <TextPath href="#circle">
                                <TSpan dx={0} dy={-5}>K ý</TSpan>
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
