import * as React from 'react';
import { View, StyleSheet } from 'react-native';

import { Circle, TextPath, TSpan, G, Path, Svg, Image, Text, Ellipse } from 'react-native-svg';
import { COLORS } from "@/theme";
import Languages from "@/common/languages";
import { Touchable } from '@/components/elements/touchable';
import {useCallback} from "react";
import Navigator from "@/routers/Navigator";
import ScreenName from "@/common/screenName";

const SvgComponent = props => {
    const onNavigate = useCallback(() => {
        Navigator.navigateScreen(ScreenName.login);
    }, [])

    return (
        <View style={{ flex: 1 }}>
            <View style={styles.container}>
                <Svg height="100%" width="100%" viewBox='100 20 160 300'  {...props}>
                    <G id="circle">
                        <Circle
                            r={110}
                            x={150}
                            y={150}
                            fill="white"
                        />
                    </G>
                    <Text fill="white" fontSize="10" onPress={onNavigate}>
                        <TextPath href="#circle">
                            <TSpan dy={-5} dx={20}>
                                {Languages.Auth.txtTitle}
                            </TSpan>
                        </TextPath>
                    </Text>
                    {/*<Text fill="black" fontSize="10" onPress={onNavigate}>*/}
                    {/*    <TextPath href="#circle">*/}
                    {/*        <TSpan dy={-5} dx={-20}>*/}
                    {/*            {Languages.Auth.txtTitle}*/}
                    {/*        </TSpan>*/}
                    {/*    </TextPath>*/}
                    {/*</Text>*/}
                </Svg>
            </View>
        </View>
    );
}

export default SvgComponent;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: COLORS.TRANSPARENT,
    },
});
