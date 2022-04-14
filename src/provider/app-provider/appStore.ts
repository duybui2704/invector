import { makeObservable, observable } from 'mobx';

import { ApiServices } from '../../api/index';
import { AppManager } from '@/manager/AppManager';
import { FastAuthInfo as FastAuthInfoManager } from '@/manager/FastAuthInfoManager';
import { UserManager } from '@/manager/UserManager';

class AppStore {
    @observable fastAuthInfoManager = new FastAuthInfoManager();

    @observable appManager = new AppManager();

    apiServices = new ApiServices();

    @observable userManager = new UserManager();

    constructor() {
        makeObservable(this);
    }

}

export type AppStoreType = AppStore;
export default AppStore;
