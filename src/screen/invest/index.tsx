import React, { useCallback } from 'react';
import { ScrollView, Text, View } from 'react-native';

import Languages from '@/common/Languages';
import { Touchable } from '@/components/elements/touchable';
import { HeaderBar } from '../../components/header';
import styles from './styles';


function Invest () {

    const renderInvest = useCallback((title: string) => {
        return (
            <Touchable style={styles.btInvest}>
                <Text>{title}</Text>
            </Touchable>
        );
    }, []);


    return (
        <View style={styles.main}>
            <HeaderBar title={Languages.invest.title} isLight={false} />
            <ScrollView style={styles.scrollView}>
                <View style={styles.investTab}>
                    {renderInvest(Languages.invest.attractInvest)}
                    {renderInvest(Languages.invest.investing)}
                    {renderInvest(Languages.invest.history)}
                </View>
            </ScrollView>
        </View>
    );
};
export default Invest;
