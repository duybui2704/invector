import React from 'react';
import {
    View,
    ActivityIndicator
} from 'react-native';

import { COLORS } from '@/theme';
import MyStyleLoading from './styles';

const Loading = ({ isOverview }: { isOverview?: boolean }) => {

    const styles = MyStyleLoading();
    return (
        <>
            { isOverview ?
                <View style={styles.overlay}>
                    <ActivityIndicator
                        size="large"
                        color={COLORS.WHITE}
                        style={styles.activityIndicator} />
                </View> :
                <View style={styles.inline} >
                    <ActivityIndicator size="small" color={COLORS.RED} />
                </View>}
        </>
    );

};


export default Loading;
