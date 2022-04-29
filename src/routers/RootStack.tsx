import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { observer } from 'mobx-react';
import React, { useCallback, useEffect, useMemo } from 'react';
import TouchID from 'react-native-touch-id';
import { Platform } from 'react-native';

import Auth from '@/screen/auth';
import { ScreenName } from '../common/screenNames';
import Login from '../screen/auth/login';
import Home from '@/screen/home';
import MyBottomTabs from './MyBottomBar';
import SessionManager, { DeviceInfos } from '@/manager/SessionManager';
import { useAppStore } from '@/hooks';
import { ENUM_BIOMETRIC_TYPE, ERROR_BIOMETRIC } from '@/common/constants';
import { SuccessSignUp } from '@/screen/auth/signUp/successSignUp';
import Broadening from '@/screen/broadening';
import Splash from '@/screen/splash';


const screenOptions = { headerShown: false };
const Stack = createNativeStackNavigator();

export const isIOS = Platform.OS === 'ios';

const RootStack = observer(() => {
    const { fastAuthInfoManager } = useAppStore();

    const getSupportedBiometry = useCallback(() => {

        if (SessionManager.isEnableFastAuthentication) {
            fastAuthInfoManager.setEnableFastAuthentication(true);
        }
        if (isIOS && DeviceInfos.HasNotch) {
            fastAuthInfoManager.setSupportedBiometry(ENUM_BIOMETRIC_TYPE.FACE_ID);
        }
        else {
            fastAuthInfoManager.setSupportedBiometry(ENUM_BIOMETRIC_TYPE.TOUCH_ID);
        }
        if (!isIOS) {
            TouchID.isSupported()
                .then((biometricType) => {
                    if (biometricType) {
                        fastAuthInfoManager.setSupportedBiometry(ENUM_BIOMETRIC_TYPE.TOUCH_ID);
                    }
                })
                .catch((error) => {
                    if (error?.code === ERROR_BIOMETRIC.NOT_SUPPORTED) {
                        fastAuthInfoManager.setSupportedBiometry('');
                    } else {
                        fastAuthInfoManager.setSupportedBiometry(ENUM_BIOMETRIC_TYPE.TOUCH_ID);
                    }
                });
        }
    }, [fastAuthInfoManager]);

    useEffect(() => {
        getSupportedBiometry();
    }, []);

    useEffect(() => {
        console.log('support', fastAuthInfoManager?.supportedBiometry);
    }, [fastAuthInfoManager?.supportedBiometry]);

    const AuthStack = useCallback(() => {
        return (
            <Stack.Navigator screenOptions={screenOptions}>
                <Stack.Screen name={ScreenName.auth} component={Auth} />
                <Stack.Screen name={ScreenName.success} component={SuccessSignUp} />
            </Stack.Navigator>
        );
    }, []);

    const AppStack = useCallback(() => {
        return (
            <Stack.Navigator screenOptions={screenOptions}>
                {/* <Stack.Screen name={ScreenName.onBoard} component={Broadening} /> */}
                <Stack.Screen name={ScreenName.splash} component={Splash} />
                <Stack.Screen name={ScreenName.auth} component={AuthStack} />
                <Stack.Screen name={ScreenName.tabs} component={MyBottomTabs} />
            </Stack.Navigator>
        );
    }, [AuthStack]);

    const renderRootStack = useMemo(() => {
        return <AppStack />;
    }, [AppStack]);
    return renderRootStack;
});
export default RootStack;

