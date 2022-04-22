import { observer } from 'mobx-react';
import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { HeaderBar } from '@/components/header';
import DimensionUtils from '@/utils/DimensionUtils';
import Navigator from '@/routers/Navigator';
import ScreenNames from '@/common/screenNames';
import SessionManager from '@/manager/SessionManager';
import { useAppStore } from '@/hooks';
import { AppStatusModel } from '@/models/app-status';
import { isIOS } from '@/common/Configs';

const Splash = observer(() => {
    const { apiServices, appManager } = useAppStore();

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

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        if (!isLoading) {
            nextScreen();
        }
    }, [isLoading]);

    const nextScreen = useCallback(async () => {
        setTimeout(async () => {
                Navigator.replaceScreen(ScreenNames.tabs);
        }, 1e3);
    }, []);

    return (
        <View style={styles.container}>
            <HeaderBar
                noHeader
                barStyle />
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
        width: DimensionUtils.SCREEN_WIDTH - 100,
        alignSelf: 'center',
        marginBottom: DimensionUtils.SCREEN_HEIGHT / 5
    }
});