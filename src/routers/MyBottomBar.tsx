import Images from '@/assets/Images';
import { COLORS } from '@/theme';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { observer } from 'mobx-react';
import React, { useCallback } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { AnimatedTabBarNavigator, DotSize, TabElementDisplayOptions } from 'react-native-animated-nav-tab-bar';
import { ScreenName, TabsName } from '../common/screenName';
import Home from '../screen/home';
import Invest from '../screen/invest';
import Payment from '../screen/payment';
import Profile from '../screen/profile';
import Report from '../screen/report';

const screenOptions = { headerShown: false };
const Tab = AnimatedTabBarNavigator()
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
const BottomTabBar = (props: any) => {
    return (
        <View style={styles.bgIcon}>
            {/* <Image source={Images.ic_home}
                style={styles.icon} /> */}
        </View>
    )
}

const MyBottomTabs = observer(() => {

    const onTabPress = useCallback((e: any, navigation: any, route: any) => {
        console.log(e)
    }, [])

    return (
        <Tab.Navigator
            tabBarOptions={{
                activeTintColor: "#ffffff",
                inactiveTintColor: COLORS.BLACK,
                activeBackgroundColor: COLORS.GREEN,
            }}
            appearance={{
            }}
        >
            <Tab.Screen
                name={TabsName.homeTabs}
                component={HomeStack}
                options={{
                    tabBarIcon: (props: any) => (
                        <BottomTabBar {...props} />
                    ),
                }}
                listeners={({ navigation, route }) => ({
                    tabPress: e => {
                        onTabPress(e, navigation, route)
                    },
                })}
            />
            <Tab.Screen
                name={TabsName.investTabs}
                component={InvestStack}
                options={{
                    tabBarIcon: (props: any) => (
                        <BottomTabBar {...props} />
                    ),
                }}
                listeners={({ navigation, route }) => ({
                    tabPress: e => {
                        onTabPress(e, navigation, route)
                    },
                })}
            />
            <Tab.Screen
                name={TabsName.reportTabs}
                component={ReportStack}
                options={{
                    tabBarIcon: (props: any) => (
                        <BottomTabBar {...props} />
                    ),
                }}
                listeners={({ navigation, route }) => ({
                    tabPress: e => {
                        onTabPress(e, navigation, route)
                    },
                })}
            />
            <Tab.Screen
                name={TabsName.paymentTabs}
                component={PaymentStack}
                options={{
                    tabBarIcon: (props: any) => (
                        <BottomTabBar {...props} />
                    ),
                }}
                listeners={({ navigation, route }) => ({
                    tabPress: e => {
                        onTabPress(e, navigation, route)
                    },
                })}
            />
            <Tab.Screen
                name={TabsName.accountTabs}
                component={AccountStack}
                options={{
                    tabBarIcon: (props: any) => (
                        <BottomTabBar {...props} />
                    ),
                }}
                listeners={({ navigation, route }) => ({
                    tabPress: e => {
                        onTabPress(e, navigation, route)
                    },
                })}
            />

        </Tab.Navigator>
    )

});
const styles = StyleSheet.create({

    icon: {
        width: 16,
        height: 16,
        aspectRatio: 1,
        resizeMode: 'stretch',
    },
    bgIcon: {
        // marginLeft: 5,
        // width:16,
        // height:16
    },

});


export default MyBottomTabs;
