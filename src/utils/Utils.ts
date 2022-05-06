import messaging from '@react-native-firebase/messaging';
import { PushNotification } from 'react-native-push-notification';
import { Linking, Platform, Share } from 'react-native';

import Validate from './Validate';

function formatMoney(number: string | number | undefined) {
    const hasMinus = `${number}`.includes('-');
    number = `${number}`.replace(/[^0-9]/g, '');

    if (!number || Number.isNaN(number) || Number(number) === 0) {
        return '0';
    }
    return `${hasMinus ? '-' : ''}${Math.ceil(Number(number))
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`;
}

function convertMoney(number: string | number | undefined) {
    const hasMinus = `${number}`.includes('-');
    number = `${number}`.replace(/[^0-9]/g, '');

    if (!number || Number.isNaN(number) || Number(number) === 0) {
        return '0';
    }
    return `${hasMinus ? '-' : ''}${Math.ceil(Number(number))
        .toString()}`;
}

function formatTextToNumber(textNumber: string) {
    const num = (`${textNumber}`).replace(/[^0-9]/g, '');
    return num;
}

function capitalizeFirstLetter(text: string) {
    return text.charAt(0).toUpperCase() + text.slice(1);
}

function callNumber(phone: string) {
    const phoneNumber = `tel://${phone}`;
    Linking.canOpenURL(phoneNumber)
        .then((supported) => {
            if (supported) {
                Linking.openURL(phoneNumber);
            } else {
                console.log(`Don't know how to go: ${phoneNumber}`);
            }
        })
        .catch((err) => console.error('An error occurred', err));
};

function openSetting() {
    const app = 'app-settings:';
    if (Platform.OS === 'ios') {
        Linking.canOpenURL(app)
            .then((supported) => {
                if (supported && Platform.OS === 'ios') {
                    Linking.openURL(app);
                }
            })
            .catch((err) => console.error('An error occurred', err));
    } else {
        AndroidOpenSettings.generalSettings();
    }
};

function share(text: string) {
    if (Validate.isStringEmpty(text)) {
        return;
    }
    try {
        Share.share({
            message: text
        });
    } catch (error) {
        console.log(error);
    }
}

function openURL(url: string) {
    Linking.canOpenURL(url)
        .then((supported) => {
            if (!supported) {
                console.error(`Unsupported url: ${url}`);
            } else {
                Linking.openURL(url);
            }
        })
        .catch((err) => {
            console.error('An error occurred', err);
        });
};

function encodePhone(phoneNumber: string) {
    const number = phoneNumber.replace(' ', '').replace('.', '');
    return number.length > 6
        ? `${number.slice(0, 4)
        }****${number.slice(number.length - 2, number.length)}`
        : number;
};

function covertSecondAndGetMinute(second: number) {
    if (Math.floor((second / 1000) / 60).toString().length === 1) {
        return ('0'.concat(Math.floor((second / 1000) / 60).toString()));
    }
    return Math.floor((second / 1000) / 60);
};

function covertSecondAndGetSecond(second: number) {
    if (((second / 1000) % 60).toString().length === 1) {
        return ('0'.concat(((second / 1000) % 60).toString()));
    }
    return ((second / 1000) % 60);
};

function formatObjectToKeyLabel(data: any) {
    const lengthArray = new Array(Object.keys(data).length);
    if (lengthArray.length > 0) {
        for (let i = 0; i < lengthArray.length; i++) {
            lengthArray[i] = {
                value: Object.values(data)[i],
                label: Object.keys(data)[i]
            };
        }
        return lengthArray;
    }
    return [];
}

async function getFcmToken() {
    const fcmToken = await messaging().getToken();
    if (fcmToken) {
        return fcmToken;
    }
    return null;
}

const createChannel = () => {
    PushNotification.createChannel(
        {
            channelId: 'noti', // (required)
            channelName: 'TienNgay.vn', // (required)
            channelDescription: 'A channel to categorise your notifications' // (optional) default: undefined.
        },
        (created: any) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
    );
};

async function requestUserPermissionNotify() {
    const authStatus = await messaging().requestPermission({
        alert: false
    });
    const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
        console.log('Authorization status:', authStatus);
    }
};

async function configNotification(onNotification: () => void) {
    requestUserPermissionNotify();
    createChannel();

    PushNotification.configure({
        async onNotification(notification: any) {
            if (notification.channelId) {
                onNotification();
            }
        },

        onAction(notification: any) {
            console.log('ACTION:', notification.action);
            console.log('NOTIFICATION:', notification);
        },
        onRegistrationError(err: any) {
            console.error(err.message, err);
        },
        permissions: {
            alert: true,
            badge: true,
            sound: true
        },
        popInitialNotification: true,
        requestPermissions: true
    });
}



export default {
    formatTextToNumber,
    capitalizeFirstLetter,
    formatMoney,
    share,
    openSetting,
    openURL,
    callNumber,
    encodePhone,
    covertSecondAndGetMinute,
    covertSecondAndGetSecond,
    formatObjectToKeyLabel,
    convertMoney,
    configNotification,
    getFcmToken
};
