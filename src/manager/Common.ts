import { action, makeObservable, observable } from 'mobx';

export class Common {
    @observable isFocused = false;

    @observable refresh = false;

    constructor() {
        makeObservable(this);
    }

    @action setIsFocus(isFocus: boolean) {
        this.isFocused = isFocus;
    }

    @action setRefresh(refresh: boolean) {
        this.refresh = refresh;
    }
}
