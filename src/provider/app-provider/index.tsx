import React, { useEffect, useState } from 'react';

import SessionManager from '@/manager/SessionManager';
import AppStore from './appStore';
import { AppStoreContext } from './context';

export const AppStoreProvider = ({ children }: any) => {

    const [appStore, setAppStore] = useState<AppStore>(null);

    useEffect(() => {
        SessionManager.initData(async () => {
            if (!SessionManager.isEnableFastAuthentication) {
                SessionManager.setUserInfo();
                SessionManager.setAccessToken();
            }
            setAppStore(new AppStore());
        });
    }, []);

    return (
        appStore && <AppStoreContext.Provider value={appStore}>
            {children}
        </AppStoreContext.Provider>
    );
};
