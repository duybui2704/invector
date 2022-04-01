import * as React from 'react';
import { View, TouchableOpacity, ImageBackground, Image, Keyboard, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useEffect, useState } from 'react';
import { isNull } from 'lodash';

import { styles } from './styles';
import Images from '../../asset/Images';
import DimensionUtils from '../../utils/DimensionUtils';
import String from '../../common/string';

export default function BottomTabBar({ state, descriptors, navigation } : any) {
    const insets = useSafeAreaInsets();
    const heightContent = DimensionUtils.SCREEN_HEIGHT / 15;
    const focusedOptions = descriptors[state.routes[state.index].key].options;
    // const refCustomer = useRef();
    useEffect(() => {
        Keyboard.addListener('keyboardDidShow', _keyboardDidShow);
        Keyboard.addListener('keyboardDidHide', _keyboardDidHide);

        // cleanup function
        return () => {
            Keyboard.removeListener('keyboardDidShow', _keyboardDidShow);
            Keyboard.removeListener('keyboardDidHide', _keyboardDidHide);
        };
    }, []);

    const [keyboardStatus, setKeyboardStatus] = useState(undefined);
    const _keyboardDidShow = () => setKeyboardStatus(0);
    const _keyboardDidHide = () => setKeyboardStatus(1);
    const arrayTab = [String.home, String.invest, String.report, String.payment, String.account];

    if (keyboardStatus === 'Keyboard Shown') return (<></>);
    if (focusedOptions.tabBarVisible === false || focusedOptions.keyboardHidesTabBar === true) {
        return null;
    }
    return (
        keyboardStatus === 0 ? (<></>) : (
            <View
                style={[styles.container, { paddingTop: 0, height: heightContent + insets.bottom / 2 }]}>
                {state.routes.map((route, index) => {
                    const { options } = descriptors[route.key];
                    const isFocused = state.index === index;
                    let icon;
                    if (index === 0) {
                        if (isFocused) {
                            icon = <View style={styles.bgIcon}>
                                <Image source={Images.ic_home_on}
                                    style={styles.icon} />
                            </View>;
                        } else {
                            icon = <View style={styles.bgIcon}><Image source={Images.ic_home}
                                style={styles.icon} /></View>;
                        }
                    } else if (index === 1) {
                        if (isFocused) {
                            icon =
                                <View style={styles.bgIcon}><Image source={Images.ic_invest_on}
                                    style={styles.icon} /></View>;
                        } else {
                            icon = <View style={styles.bgIcon}><Image source={Images.ic_invest}
                                style={styles.icon} /></View>;
                        }
                    } else if (index === 2) {
                        if (isFocused) {
                            icon =
                                <View style={styles.bgIcon}><Image source={Images.ic_report_on}
                                    style={styles.icon} /></View>;
                        } else {
                            icon = <View style={styles.bgIcon}><Image source={Images.ic_report}
                                style={styles.icon} /></View>;
                        }
                    } else if (index === 3) {
                        if (isFocused) {
                            icon =
                                <View style={styles.bgIcon}><Image source={Images.ic_payment_on}
                                    style={styles.icon} />   
                                </View>;
                        } else {
                            icon = <View style={styles.bgIcon}><Image source={Images.ic_payment}
                                style={styles.icon} /></View>;
                        }
                    } else if (index === 4) {
                        if (isFocused) {
                            icon =
                                <View style={styles.bgIcon}><Image source={Images.ic_account_on}
                                    style={styles.icon} /></View>;
                        } else {
                            icon = <View style={styles.bgIcon}><Image source={Images.ic_account}
                                style={styles.icon} /></View>;
                        }
                    } 
                

                    const onPress = () => {
                        const event = navigation.emit({
                            type: 'tabPress',
                            target: route.key
                        });
                        if (!isFocused && !event.defaultPrevented) {
                            navigation.navigate(route.name);
                        }
                    };

                    const onLongPress = () => {
                        navigation.emit({
                            type: 'tabLongPress',
                            target: route.key
                        });
                    };

                    return (
                        <TouchableOpacity
                            key={index.toString()}
                            accessibilityRole="button"
                            accessibilityStates={isFocused ? ['selected'] : []}
                            accessibilityLabel={options.tabBarAccessibilityLabel}
                            testID={options.tabBarTestID}
                            onPress={onPress}
                            onLongPress={onLongPress}
                            style={isFocused ? styles.item2 : styles.item}
                        >
                            <View style = {styles.viewIcon}>
                                {icon}
                            </View>
                            {isFocused && <View style = {styles.viewTxt}>
                                <Text style={styles.txtTabs}>{arrayTab[index]}</Text>
                            </View>}
                        </TouchableOpacity> 
                    );
                })}
            </View>
        )
    );
}
