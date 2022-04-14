import { BottomSheetModal } from '@gorhom/bottom-sheet';
import React, {
    forwardRef,
    useCallback, useImperativeHandle,
    useMemo,
    useRef
} from 'react';
import {
    StyleSheet,
    Text,
    TextStyle,
    TouchableOpacity,
    View,
    ViewStyle
} from 'react-native';

import { COLORS, Styles } from '@/theme';
import BottomSheetComponent from './BottomSheetComponent';
import { ItemProps } from '@/models/common-model';

type PickerProps = {
    containerStyle?: ViewStyle;
    label?: string;
    placeholder?: string;
    onPressItem?: (item: any) => void;
    value?: string;
    data?: ItemProps[];
    labelContainer?: ViewStyle;
    labelStyle?: TextStyle;
    btnContainer?: any;
    placeholderStyle?: TextStyle;
    rightIcon?: any;
    disable?: boolean;
    valueText?: any;
};
type BottomSheetAction = {
    show: (content?: string) => any;
    hide: (content?: string) => any;
};
const PickerBottomSheet = forwardRef<BottomSheetModal, PickerProps>(
    (
        {
            btnContainer,
            label,
            placeholder,
            placeholderStyle,
            onPressItem,
            value,
            data = [],
            labelContainer,
            labelStyle,
            disable,
            containerStyle,
            valueText,
            rightIcon
        }: PickerProps,
        ref: any
    ) => {
        useImperativeHandle(ref, () => ({
            openPicker,
            closePicker
        }));
        const bottomSheetRef = useRef<BottomSheetAction>(null);

        const openPicker = useCallback(() => {
            bottomSheetRef.current?.show();
        }, []);
        const closePicker = useCallback(() => {
            bottomSheetRef.current?.hide();
        }, []);

        const renderValue = useMemo(() => {
            if (value) {
                return <Text style={valueText}>{value || ''}</Text>;
            }
            return <Text style={[styles.placeholder, placeholderStyle]}>{placeholder || ''}</Text>;
        }, [placeholder, placeholderStyle, valueText, value]);

        return (
            <View style={[styles.container, containerStyle]}>
                <View style={[styles.wrapLabel, labelContainer]}>
                    {label && (
                        <Text style={[styles.label, labelStyle]}>
                            {label || ''}
                        </Text>
                    )}
                </View>
                <TouchableOpacity
                    onPress={openPicker}
                    disabled={disable || data.length === 0}
                    ref={ref}
                    style={btnContainer}
                >
                    {renderValue}
                    {rightIcon || null}
                </TouchableOpacity>
                <BottomSheetComponent
                    ref={bottomSheetRef}
                    data={data}
                    onPressItem={onPressItem}
                />
            </View>
        );
    }
);

export default PickerBottomSheet;

const styles = StyleSheet.create({
    container: {
        marginBottom: 5
    },
    wrapLabel: {
        flexDirection: 'row'
    },
    label: {
        marginBottom: 7,
        color: COLORS.BLACK
    },
    placeholder: {
        ...Styles.typography.regular,
        color: COLORS.GRAY_4
    }
});
