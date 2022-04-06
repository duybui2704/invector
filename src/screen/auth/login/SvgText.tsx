import * as React from 'react';
import { View, StyleSheet } from 'react-native';

import { Circle, TextPath, TSpan, G, Path, Svg, Image, Text, Ellipse } from 'react-native-svg';
import { COLORS } from "@/theme";
import Languages from "@/common/languages";
import { Touchable } from '@/components/elements/touchable';

const SvgComponent = props => {
    const [isCheck, setIsCheck] = React.useState<boolean>(false);
    const onClickTob = () => {
        setIsCheck(isCheck => !isCheck);
    }
    return (
        <View style={{ flex: 1 }}>
            <View style={styles.container} onPress={onClickTob}>
                <Svg height="100%" width="100%" viewBox='110 20 180 300' color={COLORS.BLUE} {...props}>
                        <Circle
                            r={100}
                            x={150}
                            y={150}
                            fill={'#fff'}
                        >
                        </Circle>
                    <Text fill={isCheck ? 'white' : 'black'} fontSize="14">
                        <TextPath href="#circle">
                            <TSpan dy={-15} dx={30}>
                                Đăng nhập
                            </TSpan>
                        </TextPath>
                    </Text>
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
