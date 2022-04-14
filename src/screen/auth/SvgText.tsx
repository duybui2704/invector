import { observer } from 'mobx-react';
import * as React from 'react';
import { useCallback, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Circle, G, Svg, Text, TextPath, TSpan } from 'react-native-svg';

import {COLORS} from '@/theme';
import Languages from '@/common/Languages';
import { Configs } from '@/common/Configs';


const SvgComponent = observer((props: any) => {

    const [login, setLogin] = useState<boolean>(true);
    const [signUp, setSignUp] = useState<boolean>(false);
    const [forgotPwd, setForgotPwd] = useState<boolean>(false);
    const [key, setKey] = useState<string>();

    useEffect(() => {
        if (props.onNavigate) {
            props.onNavigate(key);
        }
    }, [props.onNavigate, key, props]);


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
    }, []);

    return (
        <View style={styles.container}>
            <Svg height="100%" width="100%" viewBox='100 20 160 300' {...props} >
                <G id="circle">
                    <Circle
                        r={100}
                        x={150}
                        y={150}
                        fill={COLORS.WHITE}
                    />
                    <Text>hhjjjjkj</Text>
                </G>
                <Text fill={login ? COLORS.WHITE : COLORS.BLACK}
                    fontSize={Configs.FontSize.size8}
                    onPress={onNavigateLogin}
                    key='1'
                    fontFamily={Configs.FontFamily.regular}
                    letterSpacing={Configs.FontSize.size4}
                    strokeWidth={Configs.FontSize.size28}
                    stroke={COLORS.NO_BACKDROP}
                >
                    <TextPath href="#circle" >
                        <TSpan dx={515} dy={-8}>
                            {Languages.auth.txtLogin}
                        </TSpan>
                    </TextPath>
                </Text>
                <Text fill={signUp ? COLORS.WHITE : COLORS.BLACK}
                    fontSize={Configs.FontSize.size8}
                    onPress={onNavigateSignUp}
                    key='2'
                    fontFamily={Configs.FontFamily.regular}
                    letterSpacing={Configs.FontSize.size4}
                    strokeWidth={Configs.FontSize.size28}
                    stroke={COLORS.NO_BACKDROP}
                >
                    <TextPath href="#circle" >
                        <TSpan dx={590} dy={-8}>
                            {Languages.auth.txtSignUp}
                        </TSpan>
                    </TextPath>
                </Text>
                <Text fill={forgotPwd ? COLORS.WHITE : COLORS.BLACK}
                    fontSize={Configs.FontSize.size8}
                    onPress={onNavigateForgotPwd}
                    key='3'
                    fontFamily={Configs.FontFamily.regular}
                    letterSpacing={Configs.FontSize.size4}
                    strokeWidth={Configs.FontSize.size28}
                    stroke={COLORS.NO_BACKDROP}
                >
                    <TextPath href="#circle" >
                        <TSpan dx={35} dy={-8} >
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
