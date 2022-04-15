import { observer } from 'mobx-react';
import React, { useCallback, useEffect, useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import TickedIcon from '@/assets/image/ic_ticked_round.svg';
import KYCIcon from '@/assets/image/ic_KYC_account.svg';
import Languages from '@/common/Languages';
import { Touchable } from '@/components/elements/touchable';
import HeaderBar from '@/components/header';
import KeyValue from '@/components/KeyValue';
import { dataUser } from '@/mocks/data';
import Navigator from '@/routers/Navigator';
import { COLORS, Styles } from '@/theme';
import SessionManager from '@/manager/SessionManager';
import ScreenName from '@/common/screenNames';


const AccountInfo = observer(() => {

    useEffect(() => {
    }, []);

    const onNavigateKYC = useCallback(() => {
        return Navigator.pushScreen(ScreenName.accountIdentify);
    }, []);

    const onNavigateEdit = useCallback(() => {
        return Navigator.pushScreen(ScreenName.editAccountInfo);
    }, []);

    const renderAccuracy = useMemo(() => {
        switch (dataUser?.accuracy) {
            case 1:
                return (
                    <Touchable style={styles.accuracyWrap} disabled={true}>
                        <Text style={styles.txtAccuracy}>{Languages.account.accVerified}</Text>
                    </Touchable>
                );
            case 2:
                return (
                    <Touchable style={styles.notAccuracyWrap} onPress={onNavigateKYC}>
                        <Text style={styles.txtNotAccuracy}>{Languages.account.accuracyNow}</Text>
                    </Touchable>
                );
            default:
                return (
                    <Touchable style={styles.notAccuracyWrap} onPress={onNavigateKYC}>
                        <Text style={styles.txtNotAccuracy}>{Languages.account.accuracyNow}</Text>
                    </Touchable>
                );
        }
    }, [onNavigateKYC]);

    const renderKeyFeature = useCallback((title: string, content?: string) => {
        return (
            <KeyValue title={title}
                content={content || undefined}
                styleTouchable={styles.wrapAllItemInfo}
                containerContent={content ? styles.wrapCheckedInfo: styles.wrapUnCheckedInfo}
                styleTitle={styles.styleTextInfo}
                styleColor={content ? styles.styleValueCheckedInfo: styles.styleValueUnCheckedInfo}
                noIndicator
                rightIcon={content ? <TickedIcon width={20} height={20} /> : null}
                hasDashBottom
            />
        );
    }, []);

    const renderInfoAcc = useMemo(() => {
        return (
            <View style={styles.wrapContent}>
                {renderKeyFeature(Languages.accountInfo.phoneNumber,SessionManager.savePhone?.toString())}
                {renderKeyFeature(Languages.accountInfo.email)}
                {renderKeyFeature(Languages.accountInfo.fullName)}
                {renderKeyFeature(Languages.accountInfo.gender)}
                {renderKeyFeature(Languages.accountInfo.birthday)}
                {renderKeyFeature(Languages.accountInfo.address)}
                {renderKeyFeature(Languages.accountInfo.job)}
                <View style={styles.wrapEdit}>
                    <Touchable style={styles.accuracyWrap} onPress={onNavigateEdit}>
                        <Text style={styles.txtAccuracy}>{Languages.accountInfo.edit}</Text>
                    </Touchable>
                </View>
            </View>
        );
    }, [onNavigateEdit, renderKeyFeature]);

    return (
        <View style={styles.container}>
            <HeaderBar isLight={false} title={Languages.accountInfo.accountInfo} hasBack  />
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
    wrapEdit: {
        paddingHorizontal: 16,
        width: '100%',
        paddingTop: 25,
        paddingBottom: 20
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
        color: COLORS.GRAY_12
    },
    styleValueCheckedInfo: {
        ...Styles.typography.medium,
        color: COLORS.GRAY_7,
        textAlign: 'right',
        width: '70%'
    },
    styleValueUnCheckedInfo: {
        ...Styles.typography.regular,
        color: COLORS.GRAY_7
    },
    wrapAllItemInfo: {
        width: '100%',
        justifyContent: 'space-between'
    },
    wrapCheckedInfo: {
        width: '90%',
        paddingVertical: 10
    },
    wrapUnCheckedInfo: {
        width: '100%',
        paddingVertical: 10
    },
    txtContentKYC: {
        width: '100%',
        ...Styles.typography.medium,
        color: COLORS.GRAY_7,
        textAlign: 'center',
        paddingVertical: 5
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
        width: '100%',
        backgroundColor: COLORS.PINK,
        borderRadius: 70,
        alignItems: 'center',
        marginTop: 5,
        paddingVertical: 8
    },
    iconTicked: {

    }
});
