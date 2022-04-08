import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import React from 'react';

import { AppStoreProvider } from '../provider/app-provider/index';
import { COLORS } from '../theme/colors';
import { navigationRef } from './Navigator';
import RootStack from './RootStack';


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
        </AppStoreProvider>
    );
};


export default App;

