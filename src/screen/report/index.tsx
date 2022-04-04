import React  from 'react';
import { Text, View } from 'react-native';

import { styles } from './styles';
import HeaderBar from '../../components/header';

function Report () {
    return (
        <View style={styles.main}>
            <HeaderBar title='Report' hasBack isLight={false}/>
            <Text style={styles.txt}>
                Report
            </Text>
        </View>
    );
};

export default Report;
