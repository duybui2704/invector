import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import React from 'react';

import { AppStoreProvider } from '../provider/app-provider/index';
import { COLORS } from '../theme/colors';
import { navigationRef } from './Navigator';
import RootStack from './RootStack';
import { PopupsProvider } from '@/provider/popups-provider';


const MyTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        background: COLORS.WHITE
    }
};

const App = () => {
    return (
        <AppStoreProvider>
            <PopupsProvider>
                <NavigationContainer ref={navigationRef}
                    theme={MyTheme}>
                    <RootStack />
                </NavigationContainer>
            </PopupsProvider>
        </AppStoreProvider>
    );
};


export default App;

