import React, { useMemo, useCallback, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { observer } from 'mobx-react';
import { ScrollView } from 'react-native-gesture-handler';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '@gorhom/bottom-sheet';
import FastImage from 'react-native-fast-image';
import Dash from 'react-native-dash';
import { Switch } from 'react-native-switch';

import { COLORS, Styles } from '@/theme';
import HeaderBar from '@/components/header';
import KeyValue from '@/components/KeyValue';
import ArrowIC from '@/asset/icon/ic_arrow_right.svg';
import StarIC from '@/asset/icon/ic_star_rate.svg';
import TienngayWebIC from '@/asset/icon/ic_tienngay_web.svg';
import TienngayFBIC from '@/asset/icon/ic_tienngay_fb.svg';
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
import { Touchable } from '@/components/elements/touchable';
import { dataUser } from '@/mocks/data';
import Navigator from '@/routers/Navigator';
import { Configs } from '@/common/Configs';
import { Button } from '@/components/elements/button';
import { BUTTON_STYLES } from '@/components/elements/button/constants';
import { ScreenName } from '@/common/screenName';
import Languages from '@/common/Languages';
import { useAppStore } from '@/hooks';
import SessionManager from '@/manager/SessionManager';

const Profile = observer(() => {
    const { userManager } = useAppStore();
    const [isEnabledSwitch, setIsEnabledSwitch] = useState(false);
    const onNavigate = useCallback((title: string) => {
        switch (title) {
            case Languages.account.accountLink:
                return Navigator.pushScreen(ScreenName.transaction);
            case Languages.account.changePwd:
                return Navigator.pushScreen(ScreenName.transaction);
                // case Languages.account.rate:

                // case Languages.account.shareFriends:

                // case Languages.account.tienngayWeb:

                // case Languages.account.authenFinger:

                // case Languages.account.policy:

                // case Languages.account.tienngayFacebook:

                // case Languages.account.answer:

                // case Languages.account.hotline:

                // case Languages.account.useManual:

            default:
                return null;
        }
    }, []);

    const renderHeaderAccount = useMemo(() => {
        const onNavigateAccuracy = () => {

        };
        return (
            <View style={styles.row}>
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
                    {dataUser.accuracy === 1 &&
                        <Touchable style={styles.accuracyWrap} onPress={onNavigateAccuracy}>
                            <Text style={styles.txtAccuracy}>{Languages.account.accVerified}</Text>
                        </Touchable>}
                    {dataUser.accuracy === 2 &&
                        <Touchable style={styles.notAccuracyWrap} disabled={true}>
                            <Text style={styles.txtNotAccuracy}>{Languages.account.accuracyNow}</Text>
                        </Touchable>}
                </View>
                <ArrowIC />
            </View>
        );
    }, []);

    const renderPayMethod = useMemo(() => {
        const onNavigatePayMethod = () => {

        };
        return <KeyValue
            title={Languages.account.payMethod}
            noIndicator
            rightIcon={<ArrowIC />}
            leftIcon={<PayMethodIC />}
            styleTouchable={styles.stylePayMethodContainer}
            onPress={onNavigatePayMethod}
        />;
    }, []);

    const renderAuthenFinger = useMemo(() => {
        const toggleSwitch = () => {
            setIsEnabledSwitch(previousState => !previousState);
        };
        return (
            <>
                <View style={styles.fingerWrap}>
                    <FingerIC />
                    <Text style={styles.txtAuthenFinger}>{Languages.account.authenFinger}</Text>
                    {/* <Switch
                        trackColor={{ false: COLORS.BACKDROP, true: COLORS.GREEN }}
                        thumbColor={isEnabledSwitch ? COLORS.WHITE : COLORS.WHITE}
                        ios_backgroundColor={COLORS.GRAY_13}
                        onValueChange={toggleSwitch}
                        value={isEnabledSwitch}
                        style={styles.switch}
                    /> */}
                    <Switch
                        value={true}
                        onValueChange={toggleSwitch}
                        disabled={isEnabledSwitch}
                        circleSize={28}
                        barHeight={Configs.FontSize.size28}
                        circleBorderWidth={1}
                        backgroundActive={COLORS.GREEN}
                        backgroundInactive={COLORS.BACKDROP}
                        circleActiveColor={COLORS.WHITE}
                        circleInActiveColor={COLORS.BACKDROP}
                        renderActiveText={false}
                        renderInActiveText={false}
                        // renderInsideCircle={() => <CustomComponent />} // custom component to render inside the Switch circle (Text, Image, etc.)
                        changeValueImmediately={isEnabledSwitch} // if rendering inside circle, change state immediately or wait for animation to complete
                    // switchLeftPx={2} // denominator for logic when sliding to TRUE position. Higher number = more space from RIGHT of the circle to END of the slider
                    // switchRightPx={2} // denominator for logic when sliding to FALSE position. Higher number = more space from LEFT of the circle to BEGINNING of the slider
                    // switchWidthMultiplier={2} // multiplied by the `circleSize` prop to calculate total width of the Switch
                    // switchBorderRadius={0} // Sets the border Radius of the switch slider. If unset, it remains the circleSize.
                    />
                </View>
                <Dash
                    style={styles.dashFinger}
                    dashThickness={1}
                    dashLength={10}
                    dashGap={5}
                    dashColor={COLORS.GRAY_13} />
            </>

        );
    }, []);

    const renderAccountFeature = useMemo(() => {

        return (
            <View style={styles.containerFeature}>
                <KeyValue
                    title={Languages.account.changePwd}
                    noIndicator
                    hasDashBottom
                    rightIcon={<ArrowIC />}
                    leftIcon={<ChangePwdIC />}
                    styleTitle={styles.txtAuthenFinger}
                    onPress={onNavigate}
                />
                {renderAuthenFinger}
                <KeyValue
                    title={Languages.account.accountLink}
                    noIndicator
                    rightIcon={<ArrowIC />}
                    leftIcon={<LinkAccIC />}
                    styleTitle={styles.txtAuthenFinger}
                    onPress={onNavigate}
                />
            </View>
        );
    }, [onNavigate, renderAuthenFinger]);

    const renderKeyFeature = useMemo(() => {

        return (
            <View style={styles.containerFeature}>
                <KeyValue
                    title={Languages.account.policy}
                    noIndicator
                    hasDashBottom
                    rightIcon={<ArrowIC />}
                    leftIcon={<PolicyIC />}
                    styleTitle={styles.txtAuthenFinger}
                    onPress={onNavigate}
                />
                <KeyValue
                    title={Languages.account.shareFriends}
                    noIndicator
                    hasDashBottom
                    rightIcon={<ArrowIC />}
                    leftIcon={<ShareIC />}
                    styleTitle={styles.txtAuthenFinger}
                    onPress={onNavigate}
                />
                <KeyValue
                    title={Languages.account.tienngayWeb}
                    noIndicator
                    hasDashBottom
                    rightIcon={<ArrowIC />}
                    leftIcon={<TienngayWebIC />}
                    styleTitle={styles.txtAuthenFinger}
                    onPress={onNavigate}
                />
                <KeyValue
                    title={Languages.account.tienngayFacebook}
                    noIndicator
                    hasDashBottom
                    rightIcon={<ArrowIC />}
                    leftIcon={<TienngayFBIC />}
                    styleTitle={styles.txtAuthenFinger}
                    onPress={onNavigate}
                />
                <KeyValue
                    title={Languages.account.useManual}
                    noIndicator
                    hasDashBottom
                    rightIcon={<ArrowIC />}
                    leftIcon={<ManualIC />}
                    styleTitle={styles.txtAuthenFinger}
                    onPress={onNavigate}
                />
                <KeyValue
                    title={Languages.account.answer}
                    noIndicator
                    hasDashBottom
                    rightIcon={<ArrowIC />}
                    leftIcon={<AnswerIC />}
                    styleTitle={styles.txtAuthenFinger}
                    onPress={onNavigate}
                />
                <KeyValue
                    title={Languages.account.hotline}
                    noIndicator
                    hasDashBottom
                    rightIcon={<ArrowIC />}
                    leftIcon={<PhoneIC />}
                    styleTitle={styles.txtAuthenFinger}
                    onPress={onNavigate}
                />
                <KeyValue
                    title={Languages.account.rate}
                    noIndicator
                    rightIcon={<ArrowIC />}
                    leftIcon={<StarIC />}
                    styleTitle={styles.txtAuthenFinger}
                    onPress={onNavigate}
                />
            </View>
        );

    }, [onNavigate]);

    const renderLogoutBtn = useMemo(() => {
        const onLogout = () => {
            SessionManager.logout();
            userManager.updateUserInfo(null);
            Navigator.navigateScreen(ScreenName.home);
        };
        return <Button label={Languages.account.logout}
            style={styles.wrapBtn}
            buttonStyle={BUTTON_STYLES.GRAY_RED}
            onPress={onLogout}
        />;
    }, [userManager]);

    return (
        <View style={styles.container}>
            <HeaderBar title={Languages.account.title} isLight={false} />
            {renderHeaderAccount}
            <ScrollView style={styles.contentContainer} showsVerticalScrollIndicator={false}>
                {renderPayMethod}
                {renderAccountFeature}
                {renderKeyFeature}
                {renderLogoutBtn}
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
        marginTop: 10,
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
        paddingVertical: 10
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
        height: SCREEN_HEIGHT * 0.1 - 30
    },
    fingerWrap: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 16,
        alignItems: 'center'
    },
    dashFinger: {
        marginTop: 8,
        marginHorizontal: 16
    },
    txtAuthenFinger: {
        ...Styles.typography.regular,
        color: COLORS.GRAY_7,
        paddingVertical: 5
    },
    switch: {
        // width: 55
    }
});
export default Profile;
