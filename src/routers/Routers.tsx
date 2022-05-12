import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ViewStyle } from 'react-native';

import { AppStoreProvider } from '../provider/app-provider/index';
import { COLORS } from '../theme/colors';
import { navigationRef } from './Navigator';
import RootStack from './RootStack';
import { PopupsProvider } from '@/provider/popups-provider';

const MyTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        background: COLORS.GRAY_5
    }
};
const styles={
    flex:1
} as ViewStyle;

const App = () => {
    return (
        <AppStoreProvider>
            <PopupsProvider>
                <NavigationContainer ref={navigationRef}
                    theme={MyTheme}>
                    <GestureHandlerRootView style={styles}>
                        <BottomSheetModalProvider>
                            <RootStack />
                        </BottomSheetModalProvider>
                    </GestureHandlerRootView>
                </NavigationContainer>
            </PopupsProvider>
        </AppStoreProvider>
    );
};


export default App;

