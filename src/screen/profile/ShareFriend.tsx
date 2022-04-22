import { SCREEN_WIDTH } from '@gorhom/bottom-sheet';
import { observer } from 'mobx-react';
import React, { useCallback, useMemo, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import HTMLView from 'react-native-htmlview';
import Lightbox from 'react-native-lightbox';
import QRCode from 'react-native-qrcode-svg';

import ShareIC from '@/assets/image/ic_share_round.svg';
import { Configs, isIOS } from '@/common/Configs';
import { GET_LINK_INVESTOR } from '@/common/constants';
import Languages from '@/common/Languages';
import { Touchable } from '@/components/elements/touchable';
import HeaderBar from '@/components/header';
import SessionManager from '@/manager/SessionManager';
import { COLORS, HtmlStyles, Styles } from '@/theme';
import Utils from '@/utils/Utils';


const ShareFriend = observer(() => {
    const [code, setCode] = useState<string>(SessionManager.savePhone?.toString() || '');

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
                <View style={styles.wrapMyCode}>
                    <Text style={styles.textCode}>{code}</Text>
                    <Touchable onPress={share}>
                        <ShareIC />
                    </Touchable>
                </View>
                <View style={styles.wrapQR}>
                    <Text style={styles.txtQR}>{Languages.shareFriend.qrCode}</Text>
                    <Lightbox
                        renderContent={renderContent}
                        swipeToDismiss={true}>
                        <QRCode
                            value={onLinkQR}
                            size={SCREEN_WIDTH * 0.7}
                            quietZone={Configs.FontSize.size10}
                        />
                    </Lightbox>
                </View>
            </View>
        </View >
    );
});

export default ShareFriend;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.GRAY_5
    },
    wrapAllContent: {
        paddingHorizontal: 16,
        paddingTop: 10,
        paddingBottom: 16,
        alignSelf: 'center'
    },
    wrapMyCode: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: COLORS.GRAY_14,
        backgroundColor: COLORS.WHITE,
        borderRadius: 40,
        paddingHorizontal: 2,
        paddingVertical: 3,
        marginVertical: 8
    },
    txtMyQrCode: {
        ...Styles.typography.medium,
        color: COLORS.GRAY_12,
        fontSize: Configs.FontSize.size16,
        marginTop: 24
    },
    textCode: {
        ...Styles.typography.medium,
        color: COLORS.GRAY_7,
        paddingVertical: 6,
        paddingLeft: 16
    },
    wrapQR: {
        alignItems: 'center',
        marginTop: 10
    },
    txtQR: {
        ...Styles.typography.medium,
        color: COLORS.GRAY_12,
        fontSize: Configs.FontSize.size16,
        paddingBottom: 16
    }
});