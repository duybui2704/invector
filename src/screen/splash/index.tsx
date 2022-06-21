import { observer } from 'mobx-react';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import VersionCheck from 'react-native-version-check';
import DeviceInfo from 'react-native-device-info';

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

const Splash = observer(() => {
    const { apiServices, appManager } = useAppStore();
    const storeUrlRef = useRef<string>();
    const popupAlert = useRef<PopupActionTypes>(null);

    const [isLoading, setLoading] = useState<boolean>(true);

    const fetchData = useCallback(async () => {
        const res = await apiServices.common.getAppInReview();
        setLoading(false);
        if (res.success) {
            const data = res.data as AppStatusModel;
            appManager.setAppInReview(isIOS ? data.apple : data.google);
        }else{
            appManager.setAppInReview(isIOS);
        }
    }, [apiServices.common]);

    // useEffect(() => {
    //     fetchData();
    // }, []);

    useEffect(() => {
        if (!isLoading) {
            nextScreen();
        }
    }, [isLoading]);

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
                fetchData();
            }
        });
    }, [fetchData]);

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


    return (
        <View style={styles.container}>
            <HeaderBar
                noHeader
                barStyle />
            {popupVerifyRequest}
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
