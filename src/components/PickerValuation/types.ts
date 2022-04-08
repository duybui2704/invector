import {TextStyle, ViewStyle} from "react-native";
import {ItemProps} from "@/components/bottomSheet/types";

export type PopupActionTypes = {
    show: (content?: string) => any;
    hide: (content?: string) => any;
    setContent?: (message: string) => void;
    setErrorMsg?: (msg?: string) => void;
};
export type PopupPropsTypes = {
    onClose?: () => any;
    onConfirm?: () => any;
    onBackdropPress?: () => any;
    title?: string;
    content?: string;
    btnText?: string;
};

export type PickerAction = {
    setErrorMsg: (msg?: string) => void;
};

export type PickerProps = {
    leftIcon?: string,
    containerStyle?: ViewStyle;
    label?: string;
    placeholder?: string;
    onPressItem?: (item: any) => void;
    value?: any;
    data?: Array<ItemProps>;
    labelStyle?: ViewStyle;
    pickerStyle?: ViewStyle;
    rightIcon?: string;
    disable?: boolean;
    isCheckboxList?: boolean,
    optional?: boolean,
    index?: number,
    onScrollTo?: (value: number) => void,
    placeholderStyle?: TextStyle
};
