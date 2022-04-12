import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { observer } from 'mobx-react';
import React, { useCallback, useMemo } from 'react';

import { ScreenName } from '../common/screenName';
import Login from '../screen/auth/login';
import Auth from '@/screen/auth';
import Otp from '../screen/auth/otp';
import Home from '@/screen/home';
import MyBottomTabs from './MyBottomBar';

const screenOptions = { headerShown: false };
const Stack = createNativeStackNavigator();


const RootStack = observer(() => {

    const AuthStack = useCallback(() => {
        return (
            <Stack.Navigator screenOptions={screenOptions}>
                <Stack.Screen name={ScreenName.auth} component={Auth} />
                <Stack.Screen name={ScreenName.login} component={Login} />
                <Stack.Screen name={ScreenName.otp} component={Otp} />
            </Stack.Navigator>
        );
    }, []);

    const AppStack = useCallback(() => {
        return (
            <Stack.Navigator screenOptions={screenOptions}>
                <Stack.Screen name={ScreenName.tabs} component={MyBottomTabs} />
                <Stack.Screen name={ScreenName.auth} component={AuthStack} />
            </Stack.Navigator>
        );
    }, [AuthStack]);
    const renderRootStack = useMemo(() => {
        return <AppStack />;
    }, [AppStack]);
    return renderRootStack;
});
export default RootStack;

