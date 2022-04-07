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
    TouchableOpacity,
    View,
    ViewStyle
} from 'react-native';

import { Configs } from '@/common/config';
import { COLORS, Styles } from '@/theme';
import BottomSheetComponent, { ItemProps } from './BottomSheetComponent';

type PickerProps = {
    containerStyle?: ViewStyle;
    label?: string;
    placeholder?: string;
    onPressItem?: (item: any) => void;
    value?: string;
    data?: ItemProps[];
    labelContainer?: ViewStyle;
    labelStyle?: any;
    btnContainer?: any;
    placeholderStyle?: any;
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
    wrapInput: {
        width: '100%',
        borderColor: COLORS.GRAY_7,
        borderWidth: 1,
        paddingVertical: 12,
        paddingHorizontal: 12,
        borderRadius: 5,
        flexDirection: 'row',
        justifyContent: 'flex-start'
    },
    wrapLabel: {
        flexDirection: 'row'
    },
    label: {
        marginBottom: 7,
        color: COLORS.BLACK
    },
    red: {
        ...Styles.typography.regular,
        color: COLORS.RED
    },
    placeholder: {
        ...Styles.typography.regular,
        color: COLORS.GRAY_4
    },
    leftIcon: {
        fontSize: Configs.IconSize.size18,
        color: COLORS.LIGHT_GRAY,
        marginRight: 10
    },
    rightIcon: {
        fontSize: Configs.IconSize.size18,
        color: COLORS.LIGHT_GRAY,
        marginRight: 10,
        position: 'absolute',
        right: 0,
        top: '110%'
    },
    errorMessage: {
        fontSize: Configs.FontSize.size12,
        fontFamily: Configs.FontFamily.medium,
        color: COLORS.RED
    },
    containerUnderLine: {
        justifyContent: 'center',
        paddingVertical: 0,
        height: Configs.FontSize.size40,
        borderBottomColor: COLORS.GRAY_7,
        borderBottomWidth: 1
    }
});
