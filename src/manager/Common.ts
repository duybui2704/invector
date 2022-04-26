import { action, makeObservable, observable } from 'mobx';

export class Common {
    @observable isFocused = false;

    constructor() {
        makeObservable(this);
    }

    @action setIsFocus(isFocus: boolean) {
        this.isFocused = isFocus;
    }
}
