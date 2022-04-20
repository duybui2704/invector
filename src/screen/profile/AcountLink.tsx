import { observer } from 'mobx-react';
import React, { useCallback, useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import LinkIC from '@/assets/image/ic_linked_acc_social.svg';
import NotLinkIC from '@/assets/image/ic_not_linked_acc_social.svg';
import FaceBookIC from '@/assets/image/ic_link_fb.svg';
import GoogleIC from '@/assets/image/ic_link_gg.svg';
import AppleIC from '@/assets/image/ic_link_apple_store.svg';
import { isIOS } from '@/common/Configs';
import Languages from '@/common/Languages';
import { Touchable } from '@/components/elements/touchable';
import HeaderBar from '@/components/header';
import { COLORS, Styles } from '@/theme';
import { dataUser } from '@/mocks/data';
import { loginWithApple, loginWithFacebook, loginWithGoogle } from '@/utils/SociaAuth';

const AccountLink = observer(() => {
    const renderStateLink = useCallback((status?:boolean) => {
        return (
            <>
                {status ?
                    <Text style={styles.stateItemLink}>{Languages.linkSocialAcc.linked}</Text> :
                    <Text style={[styles.stateItemLink,styles.redText]}>{Languages.linkSocialAcc.notLinked}</Text>
                }
            </>
        );
    }, []);

    const renderRightIcon = useCallback((status?:boolean) => {
        return (
            <>
                {status ?
                    <View style={[styles.wrapRightIcon, styles.greenBorder]}>
                        <LinkIC />
                    </View> :
                    <View style={styles.wrapRightIcon}>
                        <NotLinkIC />
                    </View>
                }
            </>
        );
    }, []);

    const onLoginGoogle = useCallback(async () => {
        const userInfo = await loginWithGoogle();
    }, []);

    const onLoginFacebook = useCallback(async () => {
        const data = await loginWithFacebook();
    }, []);

    const onLoginApple = useCallback(async () => {
        const data = await loginWithApple();
    }, []);

    const renderItemLink = useCallback((leftIcon?: any, titleLink?: string, status?:boolean) => {
        const _onPress = () => {
            switch (titleLink) {
                case Languages.linkSocialAcc.fb:
                    onLoginFacebook();
                    break;
                case Languages.linkSocialAcc.google:
                    onLoginGoogle();
                    break;
                case Languages.linkSocialAcc.apple:
                    onLoginApple();
                    break;
                default:
                    break;
            }
        };
        return (
            <Touchable style={styles.wrapItemSocial} disabled={status} onPress={_onPress}>
                {leftIcon}
                <View style={styles.wrapRightItemSocial}>
                    <View>
                        <Text style={styles.titleItemLink}>{`${Languages.linkSocialAcc.link}${titleLink}`}</Text>
                        {renderStateLink(status)}
                    </View>
                    {renderRightIcon(status)}
                </View>
            </Touchable>
        );
    }, [onLoginApple, onLoginFacebook, onLoginGoogle, renderRightIcon, renderStateLink]);

    return (
        <View style={styles.container}>
            <HeaderBar isLight={false} title={Languages.linkSocialAcc.titleSocial} hasBack />
            <View style={styles.wrapAllContent}>
                {renderItemLink(<FaceBookIC />, Languages.linkSocialAcc.fb)}
                {renderItemLink(<GoogleIC />, Languages.linkSocialAcc.google, !!dataUser.id_google)}
                {isIOS &&
                    renderItemLink(<AppleIC />, Languages.linkSocialAcc.fb)}
            </View>
        </View >
    );
});

export default AccountLink;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.GRAY_15
    },
    wrapAllContent: {
        paddingHorizontal: 16,
        paddingTop: 10
    },
    wrapItemSocial: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        paddingVertical: 10,
        borderWidth: 1,
        borderColor: COLORS.GRAY_2,
        borderRadius: 18,
        paddingHorizontal: 16,
        marginTop: 16
    },
    wrapRightItemSocial: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        width: '80%'
    },
    titleItemLink: {
        ...Styles.typography.medium,
        color: COLORS.GRAY_7
    },
    stateItemLink: {
        ...Styles.typography.regular,
        color: COLORS.GREEN
    },
    wrapRightIcon: {
        width: 32,
        height: 32,
        borderWidth: 1,
        borderRadius: 30,
        borderColor: COLORS.GRAY_12,
        alignItems: 'center',
        justifyContent: 'center'
    },
    redText:{
        color:COLORS.RED
    },
    greenBorder:{
        borderColor:COLORS.GREEN
    }
});
