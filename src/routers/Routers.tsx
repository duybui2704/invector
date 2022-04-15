import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';

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

const App = () => {
    return (
        <AppStoreProvider>
            <PopupsProvider>
                <NavigationContainer ref={navigationRef}
                    theme={MyTheme}>
                    <BottomSheetModalProvider>
                        <RootStack />
                    </BottomSheetModalProvider>
                </NavigationContainer>
            </PopupsProvider>
        </AppStoreProvider>
    );
};


export default App;

