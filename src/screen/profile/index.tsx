import React, { useMemo, useCallback, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { observer } from 'mobx-react';
import { ScrollView } from 'react-native-gesture-handler';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '@gorhom/bottom-sheet';
import FastImage from 'react-native-fast-image';

import { COLORS, Styles } from '@/theme';
import HeaderBar from '@/components/header';
import KeyValue from '@/components/KeyValue';
import ArrowIC from '@/asset/icon/ic_arrow_right.svg';
import StarIC from '@/asset/icon/ic_star_rate.svg';
import WebIC from '@/asset/icon/ic_tienngay_web.svg';
import FacebookIC from '@/asset/icon/ic_tienngay_fb.svg';
import PayMethodIC from '@/asset/icon/ic_pay_method.svg';
import ChangePwdIC from '@/asset/icon/ic_change_pwd.svg';
import AvatarIC from '@/asset/icon/ic_avatar.svg';
import ManualIC from '@/asset/icon/ic_manual.svg';
import FingerIC from '@/asset/icon/ic_finger.svg';
import PolicyIC from '@/asset/icon/ic_policy.svg';
import PhoneIC from '@/asset/icon/ic_phone.svg';
import ShareIC from '@/asset/icon/ic_share.svg';
import AnswerIC from '@/asset/icon/ic_answer.svg';
import LinkAccIC from '@/asset/icon/ic_acc_link.svg';
import FaceIdIC from '@/asset/icon/ic_faceid_big.svg';
import { Touchable } from '@/components/elements/touchable';
import { dataUser } from '@/mocks/data';
import Navigator from '@/routers/Navigator';
import { Configs } from '@/common/Configs';
import { Button } from '@/components/elements/button';
import { BUTTON_STYLES } from '@/components/elements/button/constants';
import { ScreenName } from '@/common/screenNames';
import Languages from '@/common/Languages';
import { useAppStore } from '@/hooks';
import SessionManager from '@/manager/SessionManager';
import KeyToggleValue from '@/components/KeyToggleSwitch';
import { ENUM_BIOMETRIC_TYPE } from '@/common/constants';

const Profile = observer(() => {
    const { userManager, fastAuthInfoManager } = useAppStore();
    const { supportedBiometry } = fastAuthInfoManager;
    const [isEnabledSwitch, setIsEnabledSwitch] = useState(false);

    const onNavigate = useCallback((title: string) => {
        switch (title) {
            case Languages.account.accountLink:
                return Navigator.pushScreen(ScreenName.transaction);
            case Languages.account.changePwd:
                return Navigator.pushScreen(ScreenName.transaction);
            default:
                return null;
        }
    }, []);

    const onLogout = useCallback(() => {
        SessionManager.logout();
        userManager.updateUserInfo(null);
        Navigator.navigateScreen(ScreenName.home);
    }, [userManager]);

    const toggleSwitch = useCallback(() => {
        setIsEnabledSwitch(!isEnabledSwitch);
    }, [isEnabledSwitch]);

    const renderKeyValue = useCallback((title: string, leftIcon: any, hasDashBottom?: boolean) => {
        return (
            <KeyValue
                title={title}
                noIndicator
                hasDashBottom={!hasDashBottom}
                rightIcon={<ArrowIC />}
                leftIcon={leftIcon}
                styleTitle={styles.txtAuthnFinger}
                onPress={onNavigate}
                containerContent={styles.featureContainer}
            />
        );
    }, [onNavigate]);

    const renderAuthnFinger = useMemo(() => {
        if (supportedBiometry === ENUM_BIOMETRIC_TYPE.TOUCH_ID) {
            return (
                <KeyToggleValue
                    label={Languages.account.loginWithFinger}
                    isEnabledSwitch={isEnabledSwitch}
                    onToggleSwitch={toggleSwitch}
                    hasDash
                    leftIcon={<FingerIC />}
                />
            );
        }
        if (supportedBiometry === ENUM_BIOMETRIC_TYPE.FACE_ID) {
            return (
                <KeyToggleValue
                    label={Languages.account.loginWithFaceId}
                    isEnabledSwitch={isEnabledSwitch}
                    onToggleSwitch={toggleSwitch}
                    hasDash
                    leftIcon={<FaceIdIC width={Configs.IconSize.size18} height={Configs.IconSize.size18} />}
                />
            );
        }
        return null;

    }, [isEnabledSwitch, supportedBiometry, toggleSwitch]);

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

    return (
        <View style={styles.container}>
            <HeaderBar title={Languages.account.title} isLight={false} />
            <View style={styles.accContainer}>
                {!dataUser.avatar ?
                    <AvatarIC style={styles.circleWrap} />
                    :
                    <FastImage
                        style={styles.circleWrap}
                        source={{
                            uri: dataUser?.avatar
                        }}
                        resizeMode={FastImage.resizeMode.cover}
                    />
                }
                <View style={styles.headerAccRight}>
                    <Text style={styles.headerAccName}>{dataUser.name || ''}</Text>
                    <Text style={styles.headerAccPhone}>{dataUser.phone || ''}</Text>
                    {renderAccuracy}
                </View>
                <ArrowIC />
            </View>
            <ScrollView style={styles.contentContainer} showsVerticalScrollIndicator={false}>
                {renderKeyValue(Languages.account.payMethod, <PayMethodIC />, true)}
                <View style={styles.containerFeature}>
                    {renderKeyValue(Languages.account.changePwd, <ChangePwdIC />)}
                    {renderAuthnFinger}
                    {renderKeyValue(Languages.account.accountLink, <LinkAccIC />, true)}
                </View>
                <View style={styles.containerFeature}>
                    {renderKeyValue(Languages.account.policy, <PolicyIC />)}
                    {renderKeyValue(Languages.account.shareFriends, <ShareIC />)}
                    {renderKeyValue(Languages.account.web, <WebIC />)}
                    {renderKeyValue(Languages.account.facebook, <FacebookIC />)}
                    {renderKeyValue(Languages.account.useManual, <ManualIC />)}
                    {renderKeyValue(Languages.account.answer, <AnswerIC />)}
                    {renderKeyValue(Languages.account.hotline, <PhoneIC />)}
                    {renderKeyValue(Languages.account.rate, <StarIC />, true)}
                </View>
                <Button label={`${Languages.account.logout}`}
                    style={styles.wrapBtn}
                    buttonStyle={BUTTON_STYLES.GRAY_RED}
                    onPress={onLogout}
                    isLowerCase
                />
            </ScrollView>
        </View>
    );
});
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.GRAY_2
    },
    contentContainer: {
        marginHorizontal: 16
    },
    containerFeature: {
        borderWidth: 1,
        borderColor: COLORS.GRAY_13,
        backgroundColor: COLORS.WHITE,
        borderRadius: 16,
        marginTop: 16,
        paddingVertical: 2
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderWidth: 1,
        borderColor: COLORS.GRAY_13,
        backgroundColor: COLORS.WHITE,
        borderRadius: 16,
        marginVertical: 12,
        paddingVertical: 12,
        paddingHorizontal: 16,
        marginHorizontal: 16,
        alignItems: 'center'
    },
    accContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderWidth: 1,
        borderColor: COLORS.GRAY_13,
        backgroundColor: COLORS.WHITE,
        borderRadius: 16,
        paddingVertical: 12,
        paddingHorizontal: 16,
        marginHorizontal: 16,
        alignItems: 'center',
        marginVertical: 16
    },
    leftText: {
        ...Styles.typography.regular,
        color: COLORS.GRAY_12
    },
    contentText: {
        ...Styles.typography.medium,
        color: COLORS.GRAY_7
    },
    dash: {
        paddingBottom: 10
    },
    stylePayMethodContainer: {
        paddingVertical: 10,
        marginTop: 16
    },
    headerAccRight: {
        justifyContent: 'space-around'
    },
    notAccuracyWrap: {
        backgroundColor: COLORS.PINK,
        borderRadius: 70,
        alignItems: 'center',
        marginTop: 5,
        paddingVertical: 4
    },
    accuracyWrap: {
        backgroundColor: COLORS.WHITE_GREEN,
        borderRadius: 70,
        alignItems: 'center',
        marginTop: 5,
        paddingVertical: 4
    },
    circleWrap: {
        width: SCREEN_WIDTH * 0.2 - 10,
        height: SCREEN_WIDTH * 0.2 - 10,
        borderRadius: 70,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: COLORS.GREEN
    },
    headerAccName: {
        ...Styles.typography.medium,
        color: COLORS.GREEN,
        fontSize: Configs.FontSize.size16
    },
    headerAccPhone: {
        ...Styles.typography.regular,
        color: COLORS.GRAY_7,
        fontSize: Configs.FontSize.size12
    },
    txtNotAccuracy: {
        ...Styles.typography.medium,
        color: COLORS.RED_2,
        fontSize: Configs.FontSize.size12,
        paddingHorizontal: 60
    },
    txtAccuracy: {
        ...Styles.typography.medium,
        color: COLORS.GREEN,
        fontSize: Configs.FontSize.size12,
        paddingHorizontal: 40
    },
    wrapBtn: {
        marginVertical: 15,
        width: SCREEN_WIDTH - 32,
        height: SCREEN_HEIGHT * 0.1 - 40
    },
    txtAuthnFinger: {
        ...Styles.typography.regular,
        color: COLORS.GRAY_7,
        paddingVertical: 7
    },
    featureContainer: {
        flex: 1,
        marginLeft: 16
    }
});
export default Profile;
