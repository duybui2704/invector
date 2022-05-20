import { SCREEN_WIDTH } from '@gorhom/bottom-sheet';
import { observer } from 'mobx-react';
import React, { useCallback, useMemo, useState } from 'react';
import { Text, View } from 'react-native';
import HTMLView from 'react-native-htmlview';
import Lightbox from 'react-native-lightbox-v2';
import QRCode from 'react-native-qrcode-svg';

import ShareIC from '@/assets/image/ic_share_round.svg';
import { Configs, isIOS } from '@/common/Configs';
import { GET_LINK_INVESTOR } from '@/common/constants';
import Languages from '@/common/Languages';
import { Touchable } from '@/components/elements/touchable';
import HeaderBar from '@/components/header';
import SessionManager from '@/manager/SessionManager';
import { HtmlStyles } from '@/theme';
import Utils from '@/utils/Utils';
import { MyStylesShareFriend } from './styles';

const ShareFriend = observer(() => {
    const styles = MyStylesShareFriend();
    const [code, setCode] = useState<string>(SessionManager.userInfo?.phone_number || '');

    const onLinkQR = useMemo(() => {
        if (isIOS) {
            return GET_LINK_INVESTOR.LINK_IOS;
        }
        return GET_LINK_INVESTOR.LINK_ANDROID;
    }, []);

    const renderContent = useCallback(() => {
        return <QRCode
            value={onLinkQR}
            size={SCREEN_WIDTH}
            quietZone={Configs.FontSize.size12}
        />;
    }, [onLinkQR]);

    const share = useCallback(() => {
        Utils.share(code);
    }, [code]);

    return (
        <View style={styles.container}>
            <HeaderBar isLight={false} title={Languages.shareFriend.introduce} hasBack />
            <View style={styles.wrapAllContent}>
                <HTMLView
                    value={Languages.shareFriend.introduceContent}
                    stylesheet={HtmlStyles || undefined}
                />
                <Text style={styles.txtMyQrCode}>{Languages.shareFriend.introduceCode}</Text>
                <View style={styles.row}>
                    <View style={styles.wrapMyCode}>
                        <Text style={styles.textCode}>{code}</Text>

                    </View>
                    <Touchable onPress={share}>
                        <ShareIC />
                    </Touchable>
                </View>
                <View style={styles.wrapQR}>
                    <Text style={styles.txtQR}>{Languages.shareFriend.qrCode}</Text>
                    <Lightbox
                        renderContent={renderContent}
                        springConfig={{ tension: 90000000, friction: 9000000 }}
                        swipeToDismiss={true}>
                        <QRCode
                            value={onLinkQR}
                            size={SCREEN_WIDTH * 0.75}
                            quietZone={Configs.FontSize.size16}
                        />
                    </Lightbox>
                </View>
            </View>
        </View >
    );
});

export default ShareFriend;
