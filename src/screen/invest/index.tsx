import React from 'react';
import {Text, View } from 'react-native';

import {HeaderBar} from '../../components/header';
import { styles } from './styles';

function Invest () {
    return (
        <View style={styles.main}>
            <HeaderBar title='Invest' isLight={false} />
            <Text style={styles.txt}>
               Invest
            </Text>
        </View>
    );
};
export default Invest;
