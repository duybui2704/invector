import { observer } from 'mobx-react';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import VersionCheck from 'react-native-version-check';
import DeviceInfo from 'react-native-device-info';
import RNExitApp from 'react-native-exit-app';
import remoteConfig from '@react-native-firebase/remote-config';

import { HeaderBar } from '@/components/header';
import { SCREEN_WIDTH, SCREEN_HEIGHT } from '@/utils/DimensionUtils';
import Navigator from '@/routers/Navigator';
import ScreenNames, { ScreenName, TabsName } from '@/common/screenNames';
import SessionManager from '@/manager/SessionManager';
import { useAppStore } from '@/hooks';
import { AppStatusModel } from '@/models/app-status';
import { isIOS } from '@/common/Configs';
import PopupUpdateVersion from '@/components/PopupUpdateVersion';
import { PopupActionTypes } from '@/models/typesPopup';
import Utils from '@/utils/Utils';
import PopupMaintain from '@/components/PopupMaintain';

const Splash = observer(() => {
    const storeUrlRef = useRef<string>();
    const popupAlert = useRef<PopupActionTypes>(null);
    const popupMaintainRef = useRef<PopupActionTypes>(null);

    const fetchRemoteConfig = useCallback(async () => {
        await remoteConfig().fetch(5);
        const activated = await remoteConfig().fetchAndActivate();

        if (activated) {
            const isMaintenance = remoteConfig().getValue(isIOS ? 'ios_isMaintenance' : 'android_isMaintenance');

            if (isMaintenance.asBoolean() === true) {
                popupMaintainRef.current?.show();
            } else {
                nextScreen();
            }
        } else {
            nextScreen();
        }
    }, [])

    const nextScreen = useCallback(async () => {
        setTimeout(async () => {
            if (SessionManager.isSkipOnboarding) {
                Navigator.replaceScreen(ScreenName.tabs);
            } else {
                Navigator.replaceScreen(ScreenNames.onBoard);
            }
        }, 1e3);
    }, []);

    const checkUpdateApp = useCallback(async () => {
        VersionCheck.needUpdate({
            provider: isIOS ? 'appStore' : 'playStore',
            packageName: DeviceInfo.getBundleId(),
            currentVersion: DeviceInfo.getVersion(),
            country: 'vn'
        }).then(async (res: any) => {
            if (res && res.isNeeded) {
                storeUrlRef.current = res.storeUrl;
                popupAlert.current?.show();
            } else {
                fetchRemoteConfig();
            }
        });
    }, [fetchRemoteConfig]);

    useEffect(() => {
        checkUpdateApp();
    }, []);

    const onUpdate = useCallback(() => {
        if (storeUrlRef.current) {
            Utils.openURL(storeUrlRef.current);
        } else {
            onSkip();
        }
    }, []);

    const onSkip = useCallback(() => {
        nextScreen();
    }, []);

    const popupVerifyRequest = useMemo(() => {
        return (
            <PopupUpdateVersion
                onConfirm={onUpdate}
                onClose={onSkip}
                ref={popupAlert}
            />
        );
    }, [onSkip, onUpdate]);

    const onQuit = useCallback(() => {
        popupMaintainRef?.current?.hide();
        RNExitApp.exitApp();
    }, []);

    return (
        <View style={styles.container}>
            <HeaderBar
                noHeader
                barStyle />
            {popupVerifyRequest}
            <PopupMaintain
                onConfirm={onQuit}
                onClose={onQuit}
                ref={popupMaintainRef}
            />
        </View>
    );
});

export default Splash;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    imgLogo: {
        width: SCREEN_WIDTH - 100,
        alignSelf: 'center',
        marginBottom: SCREEN_HEIGHT / 5
    }
});
