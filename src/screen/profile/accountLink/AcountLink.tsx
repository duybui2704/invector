import { observer } from 'mobx-react';
import React, { useCallback } from 'react';
import { Text, View } from 'react-native';

import LinkIC from '@/assets/image/ic_linked_acc_social.svg';
import AppleIC from '@/assets/image/ic_link_apple_store.svg';
import FaceBookIC from '@/assets/image/ic_link_fb.svg';
import GoogleIC from '@/assets/image/ic_link_gg.svg';
import NotLinkIC from '@/assets/image/ic_not_linked_acc_social.svg';
import { isIOS } from '@/common/Configs';
import Languages from '@/common/Languages';
import { Touchable } from '@/components/elements/touchable';
import HeaderBar from '@/components/header';
import { dataUser } from '@/mocks/data';
import { loginWithApple, loginWithFacebook, loginWithGoogle } from '@/utils/SociaAuth';
import { MyStylesAccountLink } from './styles';

const AccountLink = observer(() => {
    const styles = MyStylesAccountLink();
    const renderStateLink = useCallback((status?:boolean) => {
        return (
            <>
                {status ?
                    <Text style={styles.stateItemLink}>{Languages.linkSocialAcc.linked}</Text> :
                    <Text style={[styles.stateItemLink,styles.redText]}>{Languages.linkSocialAcc.notLinked}</Text>
                }
            </>
        );
    }, [styles.redText, styles.stateItemLink]);

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
    }, [onLoginApple, onLoginFacebook, onLoginGoogle, renderRightIcon, renderStateLink, styles.titleItemLink, styles.wrapItemSocial, styles.wrapRightItemSocial]);

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