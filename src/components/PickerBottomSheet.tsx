import React, {
    forwardRef,
    useCallback,
    useEffect,
    useImperativeHandle,
    useMemo,
    useRef,
    useState
} from 'react';
import {
    Animated,
    StyleSheet,
    Text,
    TextStyle,
    TouchableOpacity,
    View,
    ViewStyle
} from 'react-native';
import { BottomSheetModal } from '@gorhom/bottom-sheet';

import { COLORS, Styles } from '@/theme';
import RightIcon from '@/assets/images/ic_down.svg';
import BottomSheetComponent, { BottomSheetAction, ItemProps } from './BottomSheetComponent';
import { Configs } from '@/common/config';

type PickerProps = {
  leftIcon?: string;
  containerStyle?: ViewStyle;
  label?: string;
  placeholder?: string;
  onPressItem?: (item: any) => void;
  value?: string;
  data?: ItemProps[];
  labelStyle?: ViewStyle;
  pickerStyle?: ViewStyle;
  rightIcon?: string;
  disable?: boolean;
  hideInput?: boolean;
  hasUnderline?: boolean;
  styleText?: TextStyle;
  isBasicBottomSheet?: boolean;
};
 type PopupActions = {
    show: (content?: string) => any;
    hide: (content?: string) => any;
};
const PickerBottomSheet= forwardRef<BottomSheetModal, PickerProps>(
    (
        {
            leftIcon,
            label,
            placeholder,
            onPressItem,
            value,
            data = [],
            labelStyle,
            disable,
            containerStyle,
            styleText
        }: PickerProps,
        ref: any
    ) => {
        useImperativeHandle(ref, () => ({
            
        }));
        const bottomSheetRef = useRef<BottomSheetAction>(null);

        const openPopup = useCallback(() => {
            bottomSheetRef.current?.show();
        }, []);

        const renderValue = useMemo(() => {
            if (value) {
                return <Text style={styleText}>{value}</Text>;
            }
            return <Text style={styles.placeholder}>{placeholder}</Text>;
        }, [placeholder, styleText, value]);

        return (
            <View style={[styles.container, containerStyle]}>
                <View style={[styles.wrapLabel, labelStyle]}>
                    {label && (
                        <>
                            <Text style={styles.label}>
                                {label || ''}
                            </Text>
                        </>
                    )}
                </View>
                <View  ref={ref}>
                    <TouchableOpacity
                        onPress={openPopup}
                        disabled={disable || data.length===0}
                    >
                        {leftIcon && <RightIcon style={styles.leftIcon} />}
                        {renderValue}
                        <RightIcon style={styles.rightIcon} />
                    </TouchableOpacity>
                    <BottomSheetComponent
                        ref={bottomSheetRef}
                        data={data}
                        onPressItem={onPressItem}
                        // hideInput={hideInput}
                        
                        // isBasicBottomSheet={isBasicBottomSheet}
                    />
                </View>
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
