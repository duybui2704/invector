import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import React from 'react';

import {AppStoreProvider} from '../provider/app-provider/index';
import {COLORS} from '../theme/colors';
import {navigationRef} from './Navigator';
import RootStack from './RootStack';
import {PopupsProvider} from "@/provider/popups-provider";
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';


const MyTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        background: COLORS.WHITE
    }
};

const App = () => {
    console.log('aaaa');
    return (
        <AppStoreProvider>
            <NavigationContainer ref={navigationRef}
                theme={MyTheme}>
                <BottomSheetModalProvider>
                    <RootStack />
                </BottomSheetModalProvider>
            </NavigationContainer>
            <PopupsProvider>
                <NavigationContainer ref={navigationRef}
                                     theme={MyTheme}>
                    <RootStack/>
                </NavigationContainer>
            </PopupsProvider>
        </AppStoreProvider>
    );
};


export default App;

