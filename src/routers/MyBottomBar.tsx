import React, { useCallback } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AnimatedTabBarNavigator } from 'react-native-animated-nav-tab-bar';
import { observer } from 'mobx-react';

import { ScreenName, TabsName } from '../common/screenName';
import { COLORS, Styles } from '@/theme';
import Home from '@/screen/home';
import Invest from '@/screen/invest';
import Report from '@/screen/report';
import Payment from '@/screen/payment';
import Profile from '@/screen/profile';
import IcHomeActive from '@/assets/image/bottomTabs/ic_home_active.svg';
import IcHomeInactive from '@/assets/image/bottomTabs/ic_home_inactive.svg';
import IcInvestActive from '@/assets/image/bottomTabs/ic_invest_active.svg';
import IcInvestInactive from '@/assets/image/bottomTabs/ic_invest_inactive.svg';
import IcReportActive from '@/assets/image/bottomTabs/ic_report_active.svg';
import IcReportInactive from '@/assets/image/bottomTabs/ic_report_inactive.svg';
import IcTransactionActive from '@/assets/image/bottomTabs/ic_transaction_active.svg';
import IcTransactionInactive from '@/assets/image/bottomTabs/ic_transaction_inactive.svg';
import IcAccountActive from '@/assets/image/bottomTabs/ic_account_active.svg';
import IcAccountInactive from '@/assets/image/bottomTabs/ic_account_inactive.svg';

const screenOptions = { headerShown: false };
const Tab = AnimatedTabBarNavigator();
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
        </Stack.Navigator>
    );
};



const MyBottomTabs = observer(() => {

    const onTabPress = useCallback((e: any, navigation: any, route: any) => {
        console.log(route);
    }, []);

    return (
        <Tab.Navigator
            tabBarOptions={{
                activeTintColor: COLORS.WHITE,
                inactiveTintColor: COLORS.BLACK,
                activeBackgroundColor: COLORS.GREEN,
                labelStyle:{
                    ...Styles.typography.medium,
                    color:COLORS.WHITE
                }
            }}
            appearance={{
                // tabBarBackground:COLORS.GRAY,
                horizontalPadding:10
            }}
        >
            <Tab.Screen
                name={TabsName.homeTabs}
                component={HomeStack}
                options={{
                    tabBarIcon: (props: any) => props?.focused ? <IcHomeActive /> : <IcHomeInactive />

                }}
                listeners={({ navigation, route }) => ({
                    tabPress: e => {
                        onTabPress(e, navigation, route);
                    }
                })}
            />
            <Tab.Screen
                name={TabsName.investTabs}
                component={InvestStack}
                options={{
                    tabBarIcon: (props: any) => props?.focused ? <IcInvestActive /> : <IcInvestInactive />
                }}
                listeners={({ navigation, route }) => ({
                    tabPress: e => {
                        onTabPress(e, navigation, route);
                    }
                })}
            />
            <Tab.Screen
                name={TabsName.reportTabs}
                component={ReportStack}
                options={{
                    tabBarIcon: (props: any) => props?.focused ? <IcReportActive /> : <IcReportInactive />
                }}
                listeners={({ navigation, route }) => ({
                    tabPress: e => {
                        onTabPress(e, navigation, route);
                    }
                })}
            />
            <Tab.Screen
                name={TabsName.paymentTabs}
                component={PaymentStack}
                options={{
                    tabBarIcon: (props: any) => props?.focused ? <IcTransactionActive /> : <IcTransactionInactive />
                }}
                listeners={({ navigation, route }) => ({
                    tabPress: e => {
                        onTabPress(e, navigation, route);
                    }
                })}
            />
            <Tab.Screen
                name={TabsName.accountTabs}
                component={AccountStack}
                options={{
                    tabBarIcon: (props: any) => props?.focused ? <IcAccountActive /> : <IcAccountInactive />
                }}
                listeners={({ navigation, route }) => ({
                    tabPress: e => {
                        onTabPress(e, navigation, route);
                    }
                })}
            />

        </Tab.Navigator>
    );

});

export default MyBottomTabs;
