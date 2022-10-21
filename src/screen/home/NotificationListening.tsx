import PushNotificationIOS from '@react-native-community/push-notification-ios';
import messaging from '@react-native-firebase/messaging';
import { observer } from 'mobx-react';
import React, { useCallback, useEffect } from 'react';
import PushNotification from 'react-native-push-notification';

import { isIOS } from '@/common/Configs';
import ScreenName from '@/common/screenNames';
import { useAppStore } from '@/hooks';
import SessionManager from '@/manager/SessionManager';
import { NotificationTotalModel } from '@/models/notification';
import Navigator from '@/routers/Navigator';
import Utils from '@/utils/Utils';

const NotificationListening = observer(({ children }: any) => {
    const { apiServices, notificationManager, userManager } =
        useAppStore();

    const onLocalNotificationIOS = (notification: any) => {
        const isClicked = notification.getData().userInteraction === 1;
        if (isClicked) {
            navigateNotify();
        }
    };

    const navigateNotify = useCallback(() => {
        if (userManager?.userInfo) {
            setTimeout(() => {
                Navigator.navigateScreen(ScreenName.notifyInvest);
            }, 200);
        } else {
            Navigator.navigateToDeepScreen([ScreenName.authStack], ScreenName.auth);
        }
    }, [userManager?.userInfo]);

    const createToken = useCallback(async () => {
        const fcmToken = await Utils.getFcmToken();
        if (fcmToken && SessionManager.accessToken) {
            apiServices?.notification?.createFcmToken(fcmToken);
        }
    }, []);

    const getUnreadNotify = useCallback(async () => {
        if (userManager.userInfo) {
            const res = await apiServices.notification?.getUnreadNotify();
            console.log('res',res);
            if (res.success) {
                const data = res.data as NotificationTotalModel;
                notificationManager.setUnReadNotifyCount(data?.total_unRead);
                PushNotificationIOS.setApplicationIconBadgeNumber(data?.total_unRead);
            }
        }
    }, [apiServices.notification, notificationManager, userManager.userInfo]);

    const pushNotificationLocal = useCallback(
        async (remoteMessage: any) => {
            if (isIOS) {
                PushNotificationIOS.addNotificationRequest({
                    id: 'notificationWithSound',
                    title: remoteMessage?.notification?.title,
                    // subtitle: 'Sample Subtitle',
                    body: remoteMessage?.notification?.body,
                    sound: 'customSound.wav'
                });
            } else {
                PushNotification.localNotification({
                    autoCancel: true,
                    data: 'test',
                    channelId: 'TienNgay.vn-chanel',
                    showWhen: true,
                    message: remoteMessage?.notification?.body,
                    vibrate: true,
                    vibration: 300,
                    playSound: true,
                    soundName: 'default'
                });
            }
            getUnreadNotify();
        },
        [getUnreadNotify]
    );

    useEffect(() => {
        Utils.configNotification(navigateNotify);
        PushNotificationIOS.addEventListener(
            'localNotification',
            onLocalNotificationIOS
        );
        const unsubscribe = messaging().onMessage(async (remoteMessage) => {
            pushNotificationLocal(remoteMessage);
        });

        messaging().setBackgroundMessageHandler(async (remoteMessage) => { });
        messaging().onNotificationOpenedApp((remoteMessage) => {
            if (remoteMessage) {
                navigateNotify();
            }
        });
        messaging()
            .getInitialNotification()
            .then((remoteMessage) => {
                if (remoteMessage) {
                    navigateNotify();
                }
            });
        return unsubscribe;
    }, []);

    useEffect(() => {
        createToken();
    }, [userManager?.userInfo?.phone_number]);

    return <>{children}</>;
});

export default NotificationListening;
