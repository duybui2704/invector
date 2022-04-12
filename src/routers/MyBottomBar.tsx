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
import { ICONS } from '@/assets/icons/constant';
import { IconTienngay } from '@/assets/icons/icon-tienngay';
import { Text } from 'react-native';

const TabsData = [
    {
        name: TabsName.homeTabs,
        icon: ICONS.HOME,
        color: COLORS.GRAY
    },
    {
        name: TabsName.investTabs,
        icon: ICONS.INVEST,
        color: COLORS.GRAY
    },
    {
        name: TabsName.reportTabs,
        icon: ICONS.CHART,
        color: COLORS.GRAY
    },
    {
        name: TabsName.paymentTabs,
        icon: ICONS.TRANSACTION,
        color: COLORS.GRAY
    },
    {
        name: TabsName.accountTabs,
        icon: ICONS.ACCOUNT,
        color: COLORS.GRAY
    }

];

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

const TabBar = ({ props }: any) => {
    const { focused, size, tabName } = props;

    const tab = TabsData.filter((item) => item.name === tabName)[0];

    const getColor = useCallback(() => {
        if (focused) return COLORS.WHITE;
        return COLORS.GRAY_6;
    }, [focused]);

    return (
        <IconTienngay
            name={tab.icon}
            color={getColor()}
            size={size}
        />
        // <Text style={Styles.typography.bold}>
        //     lklaka
        // </Text>
    );
};


const MyBottomTabs = observer(() => {

    const onTabPress = useCallback((e: any, navigation: any, route: any) => {
        e?.preventDefault();
        navigation.navigate(route?.name);
    }, []);

    return (
        <Tab.Navigator
            tabBarOptions={{
                activeTintColor: COLORS.WHITE,
                inactiveTintColor: COLORS.BLACK,
                activeBackgroundColor: COLORS.GREEN,
                labelStyle: {
                    ...Styles.typography.medium,
                    color: COLORS.WHITE
                }
            }}
            appearance={{
                horizontalPadding: 10
            }}
        >
            <Tab.Screen
                name={TabsName.homeTabs}
                component={HomeStack}
                options={{
                    tabBarIcon: (props: any) => <TabBar props={{ ...props, tabName: TabsName.homeTabs }} />

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
                    tabBarIcon: (props: any) => <TabBar props={{ ...props, tabName: TabsName.investTabs }} />
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
                    tabBarIcon: (props: any) => <TabBar props={{ ...props, tabName: TabsName.reportTabs }} />
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
                    tabBarIcon: (props: any) => <TabBar props={{ ...props, tabName: TabsName.paymentTabs }} />
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
                    tabBarIcon: (props: any) => <TabBar props={{ ...props, tabName: TabsName.accountTabs }} />
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
