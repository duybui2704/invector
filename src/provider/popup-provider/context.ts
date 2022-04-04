import { createContext } from 'react';

import { PopupContextValue } from './type';

const NOOP = () => { };

export const PopupContext = createContext<PopupContextValue>({
    show: NOOP,
    close: NOOP
});
