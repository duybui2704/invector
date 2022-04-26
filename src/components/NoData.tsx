import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { observer } from 'mobx-react';

import { COLORS } from '@/theme';

const NoData = observer(({ description }: { description: string }) => {
    return (
        <View style={styles.container}>
            <Text>{description}</Text>
        </View>
    );
});

export default NoData;

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: COLORS.TRANSPARENT,
        justifyContent: 'center',
        alignItems: 'center'
    }

});
