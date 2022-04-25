import { observer } from 'mobx-react';
import React, { useCallback, useEffect, useMemo } from 'react';
import { Text, TextStyle, View, ViewStyle } from 'react-native';

import KYCVerifyIcon from '@/assets/image/ic_acc_verified.svg';
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

    const renderTopAcc = useCallback((image?: any, content?: string,titleAccuracyState?:string,  accuracyStateWrap?: ViewStyle, accuracyStateText?: TextStyle) => {
        return (
            <>
                { image }
                {content !== '' && <Text style={styles.txtContentKYC}>{content}</Text>}
                <Touchable style={accuracyStateWrap} onPress={onNavigateKYC}>
                    <Text style={accuracyStateText}>{titleAccuracyState}</Text>
                </Touchable>
            </>
        );
    }, [onNavigateKYC, styles.txtContentKYC]);

    const renderAccuracy = useMemo(() => {
        switch (dataUser?.accuracy) {
            case 1:
                return <>{renderTopAcc( <KYCVerifyIcon />,'',Languages.account.accVerified, styles.accuracyWrap, styles.txtAccuracy)}</>;
            case 2:
                return <>{renderTopAcc( <KYCIcon />,Languages.accountInfo.content,Languages.account.accuracyNow, styles.notAccuracyWrap, styles.txtNotAccuracy)}</>;
            case 3:
                return <>{renderTopAcc( <KYCIcon />,Languages.accountInfo.noteWaitVerify,Languages.accountInfo.accWaitVerify, styles.waitAccuracyWrap, styles.txtWaitAccuracy)}</>;
            default:
                return <>{renderTopAcc( <KYCIcon />,Languages.accountInfo.content,Languages.account.accuracyNow, styles.notAccuracyWrap, styles.txtNotAccuracy)}</>;
        }
    }, [renderTopAcc, styles.accuracyWrap, styles.notAccuracyWrap, styles.txtAccuracy, styles.txtNotAccuracy, styles.txtWaitAccuracy, styles.waitAccuracyWrap]);

    const renderKeyFeature = useCallback((title: string, content?: string) => {
        return (
            <KeyValue title={title}
                content={content || undefined}
                styleTouchable={styles.wrapAllItemInfo}
                containerContent={content ? styles.wrapCheckedInfo : styles.wrapUnCheckedInfo}
                styleTitle={styles.styleTextInfo}
                styleColor={content ? styles.styleValueCheckedInfo : styles.styleValueUnCheckedInfo}
                noIndicator
                rightIcon={content ? <TickedIcon width={20} height={20} /> : null}
                hasDashBottom
            />
        );
    }, [styles.styleTextInfo, styles.styleValueCheckedInfo, styles.styleValueUnCheckedInfo, styles.wrapAllItemInfo, styles.wrapCheckedInfo, styles.wrapUnCheckedInfo]);

    const renderInfoAcc = useMemo(() => {
        return (
            <View style={styles.wrapContent}>
                {renderKeyFeature(Languages.accountInfo.phoneNumber, SessionManager.savePhone?.toString())}
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
            <HeaderBar isLight={false} title={Languages.accountInfo.accountInfo} hasBack />
            <View style={styles.mainContainer}>
                <View style={styles.topContainer}>
                    {renderAccuracy}
                </View>
                {renderInfoAcc}
            </View>
        </View>
    );
});

export default AccountInfo;