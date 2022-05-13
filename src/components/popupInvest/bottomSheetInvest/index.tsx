import {
    BottomSheetBackdrop,
    BottomSheetBackdropProps,
    BottomSheetFlatList,
    BottomSheetModal,
    SCREEN_HEIGHT
} from '@gorhom/bottom-sheet';
import React, {
    forwardRef,
    useCallback, useImperativeHandle,
    useMemo,
    useRef
} from 'react';
import { Text, View } from 'react-native';
import Dash from 'react-native-dash';

import { Configs, PADDING_BOTTOM } from '@/common/Configs';
import { Touchable } from '@/components/elements/touchable';
import { ItemProps } from '@/models/common-model';
import { COLORS } from '@/theme';
import { MyStylesBottomSheetInvest } from './styles';


type BottomSheetProps = {
    data?: ItemProps[],
    onPressItem?: (item?: string, titlePicker?: string) => any,
    onClose?: () => void,
    onOpen?: () => void,
    title?: string
};

export type BottomSheetAction = {
    show?: (content?: string) => any,
    hide?: (content?: string) => any,
};

const CustomBackdrop = (props: BottomSheetBackdropProps) => {
    return <BottomSheetBackdrop {...props} pressBehavior="close" />;
};

const BottomSheetComponentInvest = forwardRef<BottomSheetAction, BottomSheetProps>(
    (
        {
            data,
            onPressItem,
            onClose,
            onOpen,
            title
        }: BottomSheetProps,
        ref: any
    ) => {

        const bottomSheetRef = useRef<BottomSheetModal>(null);
        const styles = MyStylesBottomSheetInvest();
        const snapPoints = useMemo(() => {
            const num = data?.length as number;
            const contentHeight = num * ITEM_HEIGHT + PADDING_BOTTOM + (num > MIN_SIZE_HAS_INPUT ? HEADER_HEIGHT : 0);
            let ratio = contentHeight * 100 / SCREEN_HEIGHT;
            ratio = Math.max(ratio, 35);
            ratio = Math.min(ratio, 70);

            return [`${ratio}%`, `${ratio}%`];
        }, [data]);

        const hide = useCallback(() => {
            bottomSheetRef.current?.dismiss();
        }, []);

        // const close = useCallback(() => {
        //     bottomSheetRef?.current?.onClose();
        //     // onClose?.();
        // }, [onClose]);

        const show = useCallback(() => {
            
            onOpen?.();
            bottomSheetRef?.current?.present();
        }, [onOpen]);

        useImperativeHandle(ref, () => ({
            show,
            hide
        }));

        const renderItem = useCallback(
            ({ item }: any) => {
                const onPress = () => {
                    console.log('fdfdfd');
                    hide();
                    onPressItem?.(item, title);
                };
                return (
                    <Touchable onPress={onPress} style={styles.valueContainer}>
                        <View style={styles.row}>
                            <Text style={styles.value}>
                                {item.value}
                            </Text>
                        </View>
                        <View style={styles.dash}>
                            <Dash
                                dashThickness={0.5}
                                dashLength={10}
                                dashGap={5}
                                dashColor={COLORS.GRAY_4} />
                        </View>
                    </Touchable>
                );
            },
            [hide, onPressItem, title]
        );

        const keyExtractor = useCallback((index: any) => {
            return `${index.id}`;
        }, []);
        const handleSheetChanges = useCallback(() => { }, []);

        return (
            <BottomSheetModal
                ref={bottomSheetRef}
                index={1}
                snapPoints={snapPoints}
                backdropComponent={CustomBackdrop}
                keyboardBehavior={'interactive'}
                enablePanDownToClose={true}
                onChange={handleSheetChanges}
            >
                <View style={{flex:1}}>
                    <Text style={styles.txtTitle}>{title?.toString().toUpperCase()}</Text>
                    <BottomSheetFlatList
                        data={data}
                        testID={title}
                        renderItem={renderItem}
                        style={styles.flatList}
                        keyExtractor={keyExtractor}
                    />
                </View>

            </BottomSheetModal>
        );
    });
export default BottomSheetComponentInvest;
const ITEM_HEIGHT = Configs.FontSize.size40;
const HEADER_HEIGHT = Configs.FontSize.size40 + 30;
const MIN_SIZE_HAS_INPUT = 10;
