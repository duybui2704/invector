import { BottomSheetBackdrop, BottomSheetBackdropProps, BottomSheetFlatList, BottomSheetModal, SCREEN_HEIGHT } from '@gorhom/bottom-sheet';
import React, {
    forwardRef,
    useCallback, useEffect,
    useImperativeHandle,
    useMemo,
    useRef
} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Dash from 'react-native-dash';

import { Configs, PADDING_BOTTOM } from '@/common/Configs';
import { COLORS, Styles } from '@/theme';
import { ItemProps } from '@/models/common-model';
import { Touchable } from './elements/touchable';

type BottomSheetProps = {
    data?: ItemProps[],
    onPressItem?: (item?: any) => any,
    onClose?: () => void,
    onOpen?: () => void,
    hasDash?: boolean,
    leftIcon?: any,
    rightIcon?: any,
    title?: string
};

export type BottomSheetAction = {
    show?: (content?: string) => any,
    hide?: (content?: string) => any,
};

const BottomSheetComponent = forwardRef<BottomSheetAction, BottomSheetProps>(
    (
        {
            data,
            onPressItem,
            onClose,
            onOpen,
            hasDash,
            leftIcon,
            rightIcon,
            title
        }: BottomSheetProps,

        ref: any
    ) => {

        const bottomSheetRef = useRef<BottomSheetModal>(null);

        const snapPoints = useMemo(() => {
            const num = data?.length as number;
            const contentHeight = num * ITEM_HEIGHT + PADDING_BOTTOM + (num > MIN_SIZE_HAS_INPUT ? HEADER_HEIGHT : 0);
            let ratio = contentHeight * 100 / SCREEN_HEIGHT;
            ratio = Math.max(ratio, 15);
            ratio = Math.min(ratio, 70);

            return [`${ratio}%`, `${ratio}%`];
        }, [data]);

        const hide = useCallback(() => {
            bottomSheetRef?.current?.dismiss();
            onClose?.();
        }, [onClose]);

        const show = useCallback(() => {
            onOpen?.();
            bottomSheetRef?.current?.present();
        }, [onOpen]);

        useImperativeHandle(ref, () => ({
            show,
            hide
        }));

        const renderItem = useCallback(
            ({ item }) => {
                const onPress = () => {
                    onPressItem?.(item);
                    hide?.();
                };
                return (
                    <>
                        <Touchable onPress={onPress} style={styles.valueContainer}>
                            <View style={styles.row}>
                                {leftIcon}
                                <Text style={!leftIcon ? styles.value : styles.noLeftIconValue}>{item.value}</Text>
                                {rightIcon}
                            </View>
                        </Touchable>
                        {hasDash && <Dash
                            dashThickness={1}
                            dashLength={10}
                            dashGap={5}
                            dashColor={COLORS.GRAY_13}
                        />}
                    </>
                );
            },
            [hasDash, hide, leftIcon, onPressItem, rightIcon]
        );

        const keyExtractor = useCallback((item, index) => {
            return `${item.id}${index}`;
        }, []);

        const renderBackdrop = useCallback((props: BottomSheetBackdropProps) => {
            return (
                <BottomSheetBackdrop
                    {...props}
                >
                    <Touchable style={styles.backdropStyle}
                        onPress={hide}>
                    </Touchable>
                </BottomSheetBackdrop>
            );
        }, [hide]);

        const handleSheetChanges = useCallback(() => {
            // bottomSheetRef.current?.snapToIndex(0);
        }, []);

        const renderHeader = useCallback(() => {
            return (
                <>
                    <Text style={styles.txtTitle}>{title}</Text>
                    <Dash
                        dashThickness={1}
                        dashLength={10}
                        dashGap={5}
                        dashColor={COLORS.GRAY_13}
                    />
                </>
            );
        }, []);

        return (
            <View style={styles.container}>
                <BottomSheetModal
                    ref={bottomSheetRef}
                    index={1}
                    snapPoints={snapPoints}
                    backdropComponent={renderBackdrop}
                    keyboardBehavior={'fillParent'}
                    enablePanDownToClose={true}
                    onChange={handleSheetChanges}
                >
                    <BottomSheetFlatList
                        data={data}
                        ListHeaderComponent={renderHeader}
                        renderItem={renderItem}
                        style={styles.flatList}
                        keyExtractor={keyExtractor}
                    />
                </BottomSheetModal>
            </View>
        );
    });

export default BottomSheetComponent;
const ITEM_HEIGHT = Configs.FontSize.size40;
const HEADER_HEIGHT = Configs.FontSize.size40 + 30;
const MIN_SIZE_HAS_INPUT = 10;
const styles = StyleSheet.create({
    container: {
        padding: 20
    },
    valueContainer: {
        width: '100%',
        paddingVertical: 10
    },
    value: {
        flex: 1,
        ...Styles.typography.regular,
        fontSize: Configs.FontSize.size16
    },
    row: {
        flexDirection: 'row',
        marginHorizontal: 16,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    flatList: {
        flex: 1,
        marginTop: 0,
        paddingHorizontal: 16
    },
    noLeftIconValue: {
        flex: 1,
        ...Styles.typography.regular,
        fontSize: Configs.FontSize.size16,
        paddingLeft: 25
    },
    backdropStyle:{
        flex: 1,
        height: SCREEN_HEIGHT
    },
    txtTitle: {
        fontFamily: Configs.FontFamily.bold,
        fontSize: Configs.FontSize.size16,
        textAlign: 'center',
        marginVertical: 8
    }
});
