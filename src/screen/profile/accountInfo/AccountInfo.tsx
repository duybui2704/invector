import { observer } from 'mobx-react';
import React, { useCallback, useMemo } from 'react';
import { Text, TextStyle, View, ViewStyle } from 'react-native';

import KYCVerifyIcon from '@/assets/image/ic_acc_verified.svg';
import KYCIcon from '@/assets/image/ic_KYC_account.svg';
import TickedIcon from '@/assets/image/ic_ticked_round.svg';
import Languages from '@/common/Languages';
import ScreenName from '@/common/screenNames';
import { Touchable } from '@/components/elements/touchable';
import HeaderBar from '@/components/header';
import Navigator from '@/routers/Navigator';
import { MyStylesAccountInfo } from './styles';
import { useAppStore } from '@/hooks';
import { STATE_VERIFY_ACC } from '@/common/constants';
import KeyValueReport from '@/components/KeyValueReport';
import SessionManager from '@/manager/SessionManager';

const AccountInfo = observer(() => {
    const { apiServices } = useAppStore();
    const styles = MyStylesAccountInfo();

    const onNavigateKYC = useCallback(() => {
        return Navigator.pushScreen(ScreenName.accountIdentify);
    }, []);

    const onNavigateEdit = useCallback(() => {
        return Navigator.pushScreen(ScreenName.editAccountInfo);
    }, []);

    const renderTopAcc = useCallback((image?: any, content?: string, titleAccuracyState?: string, accuracyStateWrap?: ViewStyle, accuracyStateText?: TextStyle) => {
        return (
            <>
                {image}
                {content !== '' && <Text style={styles.txtContentKYC}>{content}</Text>}
                <Touchable style={accuracyStateWrap} onPress={onNavigateKYC}>
                    <Text style={accuracyStateText}>{titleAccuracyState}</Text>
                </Touchable>
            </>
        );
    }, [onNavigateKYC, styles.txtContentKYC]);

    const renderAccuracy = useMemo(() => {
        switch (SessionManager.userInfo?.tinh_trang?.status) {
            case STATE_VERIFY_ACC.VERIFIED:
                return <>{renderTopAcc(<KYCVerifyIcon />, '', Languages.account.accVerified, styles.accuracyWrap, styles.txtAccuracy)}</>;
            case STATE_VERIFY_ACC.NO_VERIFIED:
                return <>{renderTopAcc(<KYCIcon />, Languages.accountInfo.content, Languages.account.accuracyNow, styles.notAccuracyWrap, styles.txtNotAccuracy)}</>;
            case STATE_VERIFY_ACC.WAIT:
                return <>{renderTopAcc(<KYCIcon />, Languages.accountInfo.noteWaitVerify, Languages.accountInfo.accWaitVerify, styles.waitAccuracyWrap, styles.txtWaitAccuracy)}</>;
            default:
                return <>{renderTopAcc(<KYCIcon />, Languages.accountInfo.content, Languages.account.accuracyNow, styles.notAccuracyWrap, styles.txtNotAccuracy)}</>;
        }
    }, [renderTopAcc, styles.accuracyWrap, styles.notAccuracyWrap, styles.txtAccuracy, styles.txtNotAccuracy, styles.txtWaitAccuracy, styles.waitAccuracyWrap]);

    const renderKeyFeature = useCallback((title: string, content?: string) => {
        return (
            <KeyValueReport title={title}
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
                {renderKeyFeature(Languages.accountInfo.phoneNumber, SessionManager.userInfo?.phone_number)}
                {renderKeyFeature(Languages.accountInfo.email, SessionManager.userInfo?.email)}
                {renderKeyFeature(Languages.accountInfo.fullName, SessionManager.userInfo?.full_name)}
                {renderKeyFeature(Languages.accountInfo.gender, SessionManager.userInfo?.gender)}
                {renderKeyFeature(Languages.accountInfo.birthday, SessionManager.userInfo?.birth_date)}
                {renderKeyFeature(Languages.accountInfo.address, SessionManager.userInfo?.address)}
                {renderKeyFeature(Languages.accountInfo.job, SessionManager.userInfo?.job)}
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
