import { BottomSheetModal } from '@gorhom/bottom-sheet';
import React, {
    forwardRef,
    useCallback, useImperativeHandle,
    useRef
} from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    ViewStyle
} from 'react-native';
import Dash from 'react-native-dash';
import FastImage from 'react-native-fast-image';

import { COLORS, Styles } from '@/theme';
import BottomSheetComponent from './BottomSheetComponent';
import { ItemProps } from '@/models/common-model';

type PickerProps = {
    containerStyle?: ViewStyle;
    onPressItem?: (item: any) => void;
    data?: ItemProps[];
    label?:string;
    disable?: boolean;
    image?: any;
    icon?: any;
    hasDash?: boolean;
    hasImage?: boolean;
    imageSource?:string;
};
type BottomSheetAction = {
    show: (content?: string) => any;
    hide: (content?: string) => any;
};
const PhotoPickerBottomSheet = forwardRef<BottomSheetModal, PickerProps>(
    (
        {
            onPressItem,
            data = [],
            disable,
            containerStyle,
            image,
            label,
            hasDash,
            icon,
            hasImage,
            imageSource
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

        return (
            <View style={[styles.container, containerStyle]}>
                <TouchableOpacity
                    onPress={openPicker}
                    disabled={disable || data.length === 0}
                    ref={ref}
                    style={styles.wrapItemPhoto}
                >
                    <Text style={styles.identifyTextStyle}>{label}</Text>
                    {image?.images[0].path || hasImage ? (
                        <FastImage style={styles.image}
                            source={ { uri: !hasImage ? image?.images[0].path : imageSource }}
                            resizeMode={FastImage.resizeMode.cover} />
                    ) : (
                        icon
                    )}
                </TouchableOpacity>
                {hasDash && <Dash
                    dashThickness={1}
                    dashLength={10}
                    dashGap={5}
                    dashColor={COLORS.GRAY_13}
                />}
                <BottomSheetComponent
                    ref={bottomSheetRef}
                    data={data}
                    onPressItem={onPressItem}
                />
            </View>
        );
    }
);

export default PhotoPickerBottomSheet;

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    wrapItemPhoto: {
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingBottom: 5
    },
    identifyTextStyle: {
        ...Styles.typography.regular,
        color: COLORS.GRAY_7,
        alignSelf: 'flex-start',
        paddingVertical: 8
    },
    image: {
        backgroundColor: COLORS.WHITE,
        marginBottom: 5,
        height: 160,
        width: '100%',
        marginTop: 10,
        resizeMode: 'contain'
    }
});
