import { observer } from 'mobx-react';
import React, { useCallback, useEffect, useMemo } from 'react';
import { Text, View } from 'react-native';

import KYCIcon from '@/assets/image/ic_KYC_account.svg';
import TickedIcon from '@/assets/image/ic_ticked_round.svg';
import Languages from '@/common/Languages';
import ScreenName from '@/common/screenNames';
import { Touchable } from '@/components/elements/touchable';
import HeaderBar from '@/components/header';
import KeyValue from '@/components/KeyValue';
import SessionManager from '@/manager/SessionManager';
import { dataUser } from '@/mocks/data';
import Navigator from '@/routers/Navigator';
import { MyStylesAccountInfo } from './styles';

const AccountInfo = observer(() => {
    const styles = MyStylesAccountInfo();
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
    }, [onNavigateKYC, styles.accuracyWrap, styles.notAccuracyWrap, styles.txtAccuracy, styles.txtNotAccuracy]);

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
    }, [styles.styleTextInfo, styles.styleValueCheckedInfo, styles.styleValueUnCheckedInfo, styles.wrapAllItemInfo, styles.wrapCheckedInfo, styles.wrapUnCheckedInfo]);

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
    }, [onNavigateEdit, renderKeyFeature, styles.accuracyWrap, styles.txtAccuracy, styles.wrapContent, styles.wrapEdit]);

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
