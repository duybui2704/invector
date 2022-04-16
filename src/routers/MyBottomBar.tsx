import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { observer } from 'mobx-react';
import React, { useCallback } from 'react';
import { AnimatedTabBarNavigator } from 'react-native-animated-nav-tab-bar';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';

import { ICONS } from '@/assets/icons/constant';
import { IconTienngay } from '@/assets/icons/icon-tienngay';
import ScreenName, { TabsName } from '../common/screenNames';
import { COLORS, Styles } from '@/theme';
import Home from '@/screen/home';
import Investment from '@/screen/investment';
import Transaction from '@/screen/payment/Transaction';
import Profile from '@/screen/profile';
import Report from '@/screen/report';
import { useAppStore } from '@/hooks';
import SessionManager from '@/manager/SessionManager';
import DetailInvestment from '@/screen/investment/detailInvestment';
import Invest from '@/screen/investment/invest';

const TabsData = [
    {
        name: TabsName.homeTabs,
        icon: ICONS.HOME,
        color: COLORS.GRAY,
        index: 0
    },
    {
        name: TabsName.investTabs,
        icon: ICONS.INVEST,
        color: COLORS.GRAY,
        index: 1
    },
    {
        name: TabsName.reportTabs,
        icon: ICONS.REPORT,
        color: COLORS.GRAY,
        index: 2
    },
    {
        name: TabsName.paymentTabs,
        icon: ICONS.TRANSACTION,
        color: COLORS.GRAY,
        index: 3
    },
    {
        name: TabsName.accountTabs,
        icon: ICONS.ACCOUNT,
        color: COLORS.GRAY,
        index: 4
    }

];

const screenOptions = { headerShown: false };
const Tab = AnimatedTabBarNavigator();
const Stack = createNativeStackNavigator();

const HomeStack = () => {
    return (
        <Stack.Navigator screenOptions={screenOptions}>
            <Stack.Screen name={ScreenName.home} component={Home} />
        </Stack.Navigator>
    );
};

const InvestStack = () => {
    return (
        <Stack.Navigator screenOptions={screenOptions}>
            <Stack.Screen name={ScreenName.investment} component={Investment} />
            <Stack.Screen name={ScreenName.detailInvestment} component={DetailInvestment} />
            <Stack.Screen name={ScreenName.invest} component={Invest} />
        </Stack.Navigator>
    );
};

const ReportStack = () => {
    return (
        <Stack.Navigator screenOptions={screenOptions}>
            <Stack.Screen name={ScreenName.report} component={Report} />
        </Stack.Navigator>
    );
};

const PaymentStack = () => {
    return (
        <Stack.Navigator screenOptions={screenOptions}>
            <Stack.Screen name={ScreenName.transaction} component={Transaction} />
        </Stack.Navigator>
    );
};

const AccountStack = () => {
    return (
        <Stack.Navigator screenOptions={screenOptions}>
            <Stack.Screen name={ScreenName.account} component={Profile} />
            <Stack.Screen name={ScreenName.transaction} component={Transaction} />
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
    );
};


const MyBottomTabs = observer(() => {
    const { userManager } = useAppStore();

    const onTabPress = useCallback((e: any, navigation: any, route: any) => {
        e?.preventDefault();
        const tab = TabsData.filter((item) => item.name === route?.name)[0];
        if (route?.name !== TabsName.homeTabs && !userManager?.userInfo) {
            navigation.navigate(ScreenName.auth);
            SessionManager.lastTabIndexBeforeOpenAuthTab = tab?.index;
        }
        else {
            navigation.navigate(route?.name);
        }

    }, [userManager]);

    const getTabBarVisibility = useCallback((route: any) => {
        const routeName = getFocusedRouteNameFromRoute(route);
        if (
            routeName === undefined ||
            routeName === ScreenName.home ||
            routeName === ScreenName.investment ||
            routeName === ScreenName.report ||
            routeName === ScreenName.transaction ||
            routeName === ScreenName.account
        ) {
            return true;
        }
        return false;
    }, []);

    const getOptions = useCallback((props: any) => {
        return {
            tabBarIcon: (data: any) => <TabBar props={{ ...data, tabName: props.route.name }} />,
            tabBarVisible: getTabBarVisibility(props?.route)
        };

    }, [getTabBarVisibility]);

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
                options={getOptions}
                listeners={({ navigation, route }) => ({
                    tabPress: e => {
                        onTabPress(e, navigation, route);
                    }
                })}
            />
            <Tab.Screen
                name={TabsName.investTabs}
                component={InvestStack}
                options={getOptions}
                listeners={({ navigation, route }) => ({
                    tabPress: e => {
                        onTabPress(e, navigation, route);
                    }
                })}
            />
            <Tab.Screen
                name={TabsName.reportTabs}
                component={ReportStack}
                options={getOptions}
                listeners={({ navigation, route }) => ({
                    tabPress: e => {
                        onTabPress(e, navigation, route);
                    }
                })}
            />
            <Tab.Screen
                name={TabsName.paymentTabs}
                component={PaymentStack}
                options={getOptions}
                listeners={({ navigation, route }) => ({
                    tabPress: e => {
                        onTabPress(e, navigation, route);
                    }
                })}
            />
            <Tab.Screen
                name={TabsName.accountTabs}
                component={AccountStack}
                options={getOptions}
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
