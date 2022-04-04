import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { observer } from 'mobx-react';
import React, { useCallback, useMemo } from 'react';
import { View } from 'react-native';
import { ScreenName, TabsName } from '../common/screenName';
import Login from '../screen/auth/login';
import Home from '../screen/home';
import Invest from '../screen/invest';
import Payment from '../screen/payment';
import Profile from '../screen/profile';
import Report from '../screen/report';
import BottomTabBar from './bottomBar';


const screenOptions = { headerShown: false };
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const HomeStack = () => {
    return (
        <Stack.Navigator screenOptions={screenOptions}>
            <Stack.Screen name={ScreenName.homeScreen} component={Home} />
        </Stack.Navigator>
    );
};

const InvestStack = () => {
    return (
        <Stack.Navigator screenOptions={screenOptions}>
            <Stack.Screen name={ScreenName.investScreen} component={Invest} />
        </Stack.Navigator>
    );
};

const ReportStack = () => {
    return (
        <Stack.Navigator screenOptions={screenOptions}>
            <Stack.Screen name={ScreenName.reportScreen} component={Report} />
        </Stack.Navigator>
    );
};

const PaymentStack = () => {
    return (
        <Stack.Navigator screenOptions={screenOptions}>
            <Stack.Screen name={ScreenName.paymentScreen} component={Payment} />
        </Stack.Navigator>
    );
};

const AccountStack = () => {
    return (
        <Stack.Navigator screenOptions={screenOptions}>
            <Stack.Screen name={ScreenName.accountScreen} component={Profile} />
            {/* <Stack.Screen name={ScreenName.login} component={Login} /> */}
        </Stack.Navigator>
    );
};

const RootStack = observer(() => {
    const Tabs = useCallback(
        () => (
            <Tab.Navigator screenOptions={screenOptions} tabBar={(props) => <BottomTabBar {...props} />}>
                <Tab.Screen
                    name={TabsName.homeTabs}
                    component={HomeStack}
                    // options={getOption}
                />   
                <Tab.Screen
                    name={TabsName.investTabs}
                    component={InvestStack}
                    // options={getOption}
                /> 
                <Tab.Screen
                    name={TabsName.reportTabs}
                    component={ReportStack}
                    // options={getOption}
                /> 
                <Tab.Screen
                    name={TabsName.paymentTabs}
                    component={PaymentStack}
                    // options={getOption}
                /> 
                <Tab.Screen
                    name={TabsName.accountTabs}
                    component={AccountStack}
                    // options={getOption}
                />  
                
            </Tab.Navigator>
        ), []);

    const AuthStack = useCallback(() => {
        return (
            <Stack.Navigator screenOptions={screenOptions}>
                <Stack.Screen name={ScreenName.login} component={Login} />
            </Stack.Navigator>
        );
    }, []);

    const AppStack = useCallback(() => {
        return (
            <Stack.Navigator screenOptions={screenOptions}>
                <Stack.Screen name={ScreenName.tabs} component={Tabs} />
            </Stack.Navigator>
        );
    }, [AuthStack, Tabs]);
    
    const renderRootStack = useMemo(() => {
        return <AppStack/>
    }, [AppStack]);
    return renderRootStack;
});

export default RootStack;
