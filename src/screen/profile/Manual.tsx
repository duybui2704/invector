import { observer } from 'mobx-react';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import Languages from '@/common/Languages';
import HeaderBar from '@/components/header';
import { COLORS } from '@/theme';


const Manual = observer(() => {


    return (
        <View style={styles.container}>
            <HeaderBar isLight={false} title={Languages.account.useManual} hasBack />
            <View style={styles.wrapAllContent}>
               
            </View>
        </View >
    );
});

export default Manual;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.GRAY_5
    },
    wrapAllContent: {
        paddingHorizontal: 16,
        paddingTop: 10
    }
});
