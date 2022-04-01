import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { observer } from 'mobx-react';
import LinearGradient from 'react-native-linear-gradient';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '@gorhom/bottom-sheet';

import { COLORS } from '../../theme';


// import Logo from '@/assets/images/logo_tienngay.svg';


const LoginInvestor = observer(() => {
    return (
        <LinearGradient
            end={{ x: 4, y: 1 }}
            colors={[COLORS.DARK_GREEN, COLORS.WHITE]}
            style={styles.background}
            locations={[0, 0.8, 0.8]}
        >
            {/* <Logo style={styles.logo}/> */}
            <View style={styles.circle2}></View>

        </LinearGradient>
    );
});

export default LoginInvestor;

const styles = StyleSheet.create({
    background: {
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT ,
        flex: 1,
        backgroundColor: COLORS.DARK_GREEN,
        alignItems: 'center'
    },
    container: {
        flex: 1,
        backgroundColor: COLORS.WHITE
    },
    circle2: {
        width: 500,
        height: 500,
        flex: 1,
        borderRadius: 500,
        backgroundColor: COLORS.WHITE,
        position: 'absolute',
        left: -200,
        top: 150
    },
    logo: {
        marginTop: 45
    }
});
