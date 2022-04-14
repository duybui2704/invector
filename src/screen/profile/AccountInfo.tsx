import { observer } from 'mobx-react';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { FlatList, StyleSheet, View, Text } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { SCREEN_WIDTH } from '@gorhom/bottom-sheet';

import { TransactionModel } from '@/models/transaction-model';
import Languages from '@/common/Languages';
import { Touchable } from '@/components/elements/touchable';
import { DATA, dataUser, TransactionTypes } from '@/mocks/data';
import KYCIcon from '@/assets/image/ic_KYC_account.svg';
import KeyValueTransaction from '@/components/KeyValueTransaction';
import HeaderBar from '@/components/header';
import { COLORS, Styles } from '@/theme';
import KeyValue from '@/components/KeyValue';
import { Configs } from '@/common/Configs';

const AccountInfo = observer(() => {
    const isFocused = useIsFocused();

    const [selectedFilter, setSelectedFilter] = useState<number>(TransactionTypes[0].value);



    useEffect(() => {
        // if (isFocused) {
        // }
    }, [isFocused]);

    const keyExtractor = useCallback((item: TransactionModel) => {
        return `${item.id}`;
    }, []);

    const renderItem = useCallback(({ item }: { item: TransactionModel }) => {
        const _onPress = () => {

        };
        return (<Touchable onPress={_onPress}>
            <KeyValueTransaction
                title={item.growth}
                content={item.content}
                dateTime={item.date}
                debtNow={item.debt}
                styleColor={item.color}
            />
        </Touchable>);
    }, []);

    const renderAccuracy = useMemo(() => {
        switch (dataUser?.accuracy) {
            case 1:
                return (
                    <Touchable style={styles.accuracyWrap}>
                        <Text style={styles.txtAccuracy}>{Languages.account.accVerified}</Text>
                    </Touchable>
                );
            case 2:
                return (
                    <Touchable style={styles.notAccuracyWrap} disabled={true}>
                        <Text style={styles.txtNotAccuracy}>{Languages.account.accuracyNow}</Text>
                    </Touchable>
                );
            default:
                return (
                    <Touchable style={styles.notAccuracyWrap} disabled={true}>
                        <Text style={styles.txtNotAccuracy}>{Languages.account.accuracyNow}</Text>
                    </Touchable>
                );
        }
    }, []);

    const renderKeyFeature = useCallback((title: string, content: string, rightIcon?: any) => {
        return (
            <KeyValue title={title}
                content={content}
                containerContent={styles.styleTouchable}
                styleTitle={styles.styleTextInfo}
                noIndicator
                rightIcon={rightIcon}
                hasDashBottom
            />
        );
    }, []);

    const renderInfoAcc = useMemo(() => {
        return (
            <View style={styles.wrapContent}>
                {renderKeyFeature(Languages.accountInfo.phoneNumber, 'đ')}
                {renderKeyFeature(Languages.accountInfo.email, '')}
                {renderKeyFeature(Languages.accountInfo.fullName, '')}
                {renderKeyFeature(Languages.accountInfo.gender, '')}
                {renderKeyFeature(Languages.accountInfo.birthday, '')}
                {renderKeyFeature(Languages.accountInfo.address, '')}
                {renderKeyFeature(Languages.accountInfo.job, '')}
                <Touchable style={styles.accuracyWrap}>
                    <Text style={styles.txtAccuracy}>{Languages.account.accVerified}</Text>
                </Touchable>
            </View>

        );
    }, [renderKeyFeature]);

    return (
        <View style={styles.container}>
            <HeaderBar isLight={false} title={Languages.accountInfo.accountInfo} hasBack />
            <View style={styles.mainContainer}>
                <View style={styles.topContainer}>
                    <KYCIcon />
                    <Text style={styles.txtContentKYC}>{Languages.accountInfo.content}</Text>
                    {renderAccuracy}
                </View>
                {renderInfoAcc}
            </View>
        </View>
    );
});

export default AccountInfo;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.GRAY_5
    },
    mainContainer: {
        paddingHorizontal: 16
    },
    wrapContent: {
        backgroundColor: COLORS.WHITE,
        borderRadius: 12,
        marginTop: 16,
        alignItems: 'center'
    },
    topContainer: {
        width: '100%',
        backgroundColor: COLORS.WHITE,
        borderRadius: 12,
        marginTop: 10,
        paddingHorizontal: 16,
        paddingVertical: 10,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    styleTextInfo: {
        ...Styles.typography.regular,
        color: COLORS.GRAY
    },
    arrow: {
        marginTop: 6
    },
    styleTouchable: {
        width: '100%',
        paddingVertical: 10
    },
    txtContentKYC: {
        width: '100%',
        ...Styles.typography.medium,
        color: COLORS.GRAY_7,
        textAlign: 'center'
    },
    accuracyWrap: {
        width: '100%',
        backgroundColor: COLORS.WHITE_GREEN,
        borderRadius: 70,
        alignItems: 'center',
        marginTop: 5,
        paddingVertical: 8
    },
    txtAccuracy: {
        ...Styles.typography.medium,
        color: COLORS.GREEN,
        paddingHorizontal: 40
    },
    txtNotAccuracy: {
        ...Styles.typography.medium,
        color: COLORS.RED_2,
        paddingHorizontal: 60
    },
    notAccuracyWrap: {
        backgroundColor: COLORS.PINK,
        borderRadius: 70,
        alignItems: 'center',
        marginTop: 5,
        paddingVertical: 8
    }
});
