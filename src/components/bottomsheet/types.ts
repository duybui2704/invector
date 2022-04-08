export type ItemProps = {
    value?: string;
    id?: string;
    selected?: boolean;
    price?: string;
};

export type BottomSheetProps = {
    data?: Array<ItemProps>;
    onPressItem?: (item: any) => void;
    isCheckboxList?: boolean;
};

export type BottomSheetAction = {
    show: (content?: string) => any;
    hide?: (content?: string) => any;
    setContent?: (message: string) => void;
};
