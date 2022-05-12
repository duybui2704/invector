export type PopupProps = {
    onClose?: () => any;
    onConfirm?: (txt1: string, txt2: string) => any;
    onChange?: (value: string, title: string) => any;
    onBackdropPress?: () => any;
    content?: string;
    btnText?: string;
    description?: string;
    title?: string,
    data?: [],
    value?: string,
    openBottomSheet?: (type: string) => void

};

export type PopupActions = {
    show: (content?: string) => any;
    hide: (content?: string) => any;
    setContent?: (message: string) => void
};


