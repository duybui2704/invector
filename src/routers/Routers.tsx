import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';

import { AppStoreProvider } from '../provider/app-provider/index';
import { COLORS } from '../theme/colors';
import { navigationRef } from './Navigator';
import RootStack from './RootStack';
import { PopupsProvider } from '@/provider/popups-provider';
<<<<<<< HEAD

=======
>>>>>>> transaction

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
            < BottomSheetModalProvider>
                <PopupsProvider>
                    <NavigationContainer ref={navigationRef}
                        theme={MyTheme}>
                        <RootStack />
                    </NavigationContainer>
                </PopupsProvider>
            </BottomSheetModalProvider>
        </AppStoreProvider>
    );
};


export default App;

