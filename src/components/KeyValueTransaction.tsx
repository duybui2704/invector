import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Dash from 'react-native-dash';

import { COLORS } from '../theme';
import { Configs } from '../common/config';
import Languages from '../common/Languages';

const KeyValueTransaction = ({ title, dateTime, content, noIndicator ,styleColor, debtNow}: 
    { noIndicator?: boolean, title?: string, dateTime?: string, content?: string , styleColor?:any, debtNow?:string}) => {

    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <View style={styles.row}>
                    <Text style={styleColor==='red'?[styles.leftText,styles.red]:[styles.leftText,styles.green]}>
                        {styleColor==='red'?`${'- '}`:`${'+ '}`}
                    </Text>
                    <Text style={styleColor==='red'?[styles.leftText,styles.red]:[styles.leftText,styles.green]}>{title}</Text>
                </View>
                <View style={styles.rightView}>
                    <Text style={styles.dateText}>{dateTime}</Text>
                    <Text style={styles.contentText}>{content}</Text>
                </View>
            </View>
            {!noIndicator && <Dash
                style={styles.dash}
                dashThickness={1}
                dashLength={10}
                dashGap={5}
                dashColor={COLORS.GRAY_13} />}
            <View style={styles.rowDebt}>
                <Text style={styles.debtText}>{`${Languages.transaction.debtNow}: `}</Text>
                <Text style={styles.debtNumber}>{`${debtNow || ''}`}</Text>
            </View>    
        </View>
    );
};

export default KeyValueTransaction;

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 16,
        marginTop: 10,
        backgroundColor: COLORS.WHITE,
        borderRadius: 16,
        paddingHorizontal:16,
        paddingVertical:3
    },
    row:{
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    rowDebt:{
        flexDirection: 'row'
    },
    rightView: {

    },
    leftText: {
        color: COLORS.GREEN,
        fontSize: Configs.FontSize.size20
    },
    dateText: {
        color: COLORS.GRAY_12,
        fontSize: Configs.FontSize.size10
    },
    contentText: {
        color: COLORS.GRAY_7,
        fontSize: Configs.FontSize.size14
    },
    dash: {
        marginVertical:4
    },
    debtText:{
        fontSize: Configs.FontSize.size14
    },
    debtNumber:{
        color: COLORS.BLACK,
        fontSize: Configs.FontSize.size14
    },
    red:{
        color:COLORS.RED
    },
    green:{
        color:COLORS.GREEN
    }
});
