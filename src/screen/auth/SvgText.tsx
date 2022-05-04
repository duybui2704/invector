import { observer } from 'mobx-react';
import * as React from 'react';
import { useCallback, useEffect, useState, useLayoutEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Circle, G, Svg, Text, TextPath, TSpan } from 'react-native-svg';

import {COLORS} from '@/theme';
import Languages from '@/common/Languages';
import { Configs } from '@/common/Configs';
import DimensionUtils from '@/utils/DimensionUtils';

const ratio = DimensionUtils.SCREEN_HEIGHT / DimensionUtils.SCREEN_WIDTH;

const SvgComponent = observer((props: any) => {
    // const ratio = DimensionUtils.SCREEN_HEIGHT / DimensionUtils.SCREEN_WIDTH;
    const [login, setLogin] = useState<boolean>(true);
    const [signUp, setSignUp] = useState<boolean>(false);
    const [forgotPwd, setForgotPwd] = useState<boolean>(false);
    const [key, setKey] = useState<string>('');
    const [r, setR] = useState<number>(0);
    const [x, setX] = useState<number>(0);
    const [dx, setDx] = useState<number>(0);

    useEffect(() => {
        if (props.onNavigate) {
            props.onNavigate(key);
        }
    }, [props.onNavigate, key, props]);

    useLayoutEffect(() => {
        if (ratio < 1.662) {
            setR(DimensionUtils.SCREEN_WIDTH * 0.54);
            setX(DimensionUtils.SCREEN_WIDTH * 0.2);
            setDx(0);
        } else {
            setR(DimensionUtils.SCREEN_WIDTH * 0.6);
            setX(DimensionUtils.SCREEN_WIDTH * 0.22);
            setDx(DimensionUtils.SCREEN_WIDTH * 0.6 * 0.035);
        }
    }, []);

    const onNavigateLogin = useCallback(() => {
        setSignUp(false);
        setLogin(true);
        setForgotPwd(false);
        setKey(Languages.auth.txtLogin);
    }, []);

    const onNavigateSignUp = useCallback(() => {
        setSignUp(true);
        setLogin(false);
        setForgotPwd(false);
        setKey(Languages.auth.txtSignUp);
    }, []);

    const onNavigateForgotPwd = useCallback(() => {
        setSignUp(false);
        setLogin(false);
        setForgotPwd(true);
        setKey(Languages.auth.forgotPwd);
    }, []);

    return (
        <View style={styles.container}>
            <Svg height="100%" width="100%" {...props} >
                <G id="circle">
                    <Circle
                        r={r}
                        x={x}
                        y={DimensionUtils.SCREEN_HEIGHT / 2}
                        fill={COLORS.WHITE}
                    />
                </G>
                <Text fill={login ? COLORS.WHITE : COLORS.GRAY}
                    fontSize={Configs.FontSize.size20}
                    onPress={onNavigateLogin}
                    key='1'
                    fontFamily={Configs.FontFamily.regular}
                    letterSpacing={Configs.FontSize.size4}
                    strokeWidth={Configs.FontSize.size28}
                    stroke={COLORS.NO_BACKDROP}
                >
                    <TextPath href="#circle" >
                        <TSpan dx={5.17 * r} dy={-15}>
                            {Languages.auth.txtLogin}
                        </TSpan>
                    </TextPath>
                </Text>
                <Text fill={signUp ? COLORS.WHITE : COLORS.GRAY}
                    fontSize={Configs.FontSize.size20}
                    onPress={onNavigateSignUp}
                    key='2'
                    fontFamily={Configs.FontFamily.regular}
                    letterSpacing={Configs.FontSize.size4}
                    strokeWidth={Configs.FontSize.size28}
                    stroke={COLORS.NO_BACKDROP}
                >
                    <TextPath href="#circle" >
                        <TSpan dx={6.05 * r} dy={-15}>
                            {Languages.auth.txtD}
                        </TSpan>
                    </TextPath>
                </Text>

                <Text fill={signUp ? COLORS.WHITE : COLORS.GRAY}
                    fontSize={Configs.FontSize.size20}
                    onPress={onNavigateSignUp}
                    key='3'
                    fontFamily={Configs.FontFamily.regular}
                    letterSpacing={Configs.FontSize.size4}
                    strokeWidth={Configs.FontSize.size28}
                    stroke={COLORS.NO_BACKDROP}
                >
                    <TextPath href="#circle" >
                        <TSpan dx={dx} dy={-15} >
                            {Languages.auth.txtK}
                        </TSpan>
                    </TextPath>
                </Text>
                
                <Text fill={forgotPwd ? COLORS.WHITE : COLORS.GRAY}
                    fontSize={Configs.FontSize.size20}
                    onPress={onNavigateForgotPwd}
                    key='4'
                    fontFamily={Configs.FontFamily.regular}
                    letterSpacing={Configs.FontSize.size4}
                    strokeWidth={Configs.FontSize.size28}
                    stroke={COLORS.NO_BACKDROP}
                >
                    <TextPath href="#circle" >
                        <TSpan dx={r * 0.55} dy={-15} >
                            {Languages.auth.forgotPwd}
                        </TSpan>
                    </TextPath>
                </Text>
            </Svg>
        </View>
    );
});


export default SvgComponent;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: COLORS.TRANSPARENT
    }
});
