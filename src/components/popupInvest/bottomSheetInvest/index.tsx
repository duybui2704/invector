import {
    BottomSheetBackdrop,
    BottomSheetBackdropProps,
    BottomSheetFlatList,
    BottomSheetModal,
    SCREEN_HEIGHT
} from '@gorhom/bottom-sheet';
import React, {
    forwardRef,
    useCallback, useEffect,
    useImperativeHandle,
    useMemo,
    useRef
} from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Configs, PADDING_BOTTOM } from '@/common/Configs';
import { Touchable } from "@/components/elements/touchable";
import { COLORS, Styles } from '@/theme';
import { ItemProps } from '@/models/common-model';
import Languages from "@/common/Languages";
import Utils from "@/utils/Utils";
import Dash from 'react-native-dash';

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
        const refModal = useRef();
        const snapPoints = useMemo(() => {
            const num = data?.length as number;
            const contentHeight = num * ITEM_HEIGHT + PADDING_BOTTOM + (num > MIN_SIZE_HAS_INPUT ? HEADER_HEIGHT : 0);
            let ratio = contentHeight * 100 / SCREEN_HEIGHT;
            ratio = Math.max(ratio, 35);
            ratio = Math.min(ratio, 70);

            return [`${ratio}%`, `${ratio}%`];
        }, [data]);

        const hide = useCallback(() => {
            bottomSheetRef?.current?.close();
        }, []);

        const close = useCallback(() => {

            onClose?.();
        }, [])

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
                    onPressItem?.(item.value, title);
                    close();
                };
                return (
                    <>
                    <Touchable onPress={onPress} style={styles.valueContainer}>
                        <View style={styles.row}>
                            <Text style={styles.value}>
                                    {item.value}
                            </Text>
                        </View>
                    </Touchable>
                        <View style={{ marginHorizontal: '5%' }}>
                            <Dash
                                dashThickness={1}
                                dashLength={10}
                                dashGap={5}
                                dashColor={COLORS.GRAY} />
                        </View>
                    </>
                );
            },
            [hide, onPressItem]
        );

        const keyExtractor = useCallback((index: any) => {
            return `${index.id}`;
        }, []);

        return (
            <View style={styles.container}>
                <BottomSheetModal
                    ref={bottomSheetRef}
                    index={1}
                    snapPoints={snapPoints}
                    backdropComponent={CustomBackdrop}
                    keyboardBehavior={'interactive'}
                    enablePanDownToClose={true}
                >
                    <Text style={styles.txtTitle}>{title}</Text>
                    <View style={{ marginHorizontal: '8%' }}>
                        <Dash
                            dashThickness={1}
                            dashLength={10}
                            dashGap={5}
                            dashColor={COLORS.GRAY} />
                    </View>
                    <BottomSheetFlatList
                        data={data}
                        testID={title}
                        renderItem={(item) => renderItem(item)}
                        style={styles.flatList}
                        keyExtractor={keyExtractor}
                    />

                </BottomSheetModal>
            </View>
        );
    });
export default BottomSheetComponentInvest;
const ITEM_HEIGHT = Configs.FontSize.size40;
const HEADER_HEIGHT = Configs.FontSize.size40 + 30;
const MIN_SIZE_HAS_INPUT = 10;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    valueContainer: {
        marginBottom: 5,
        justifyContent: 'flex-end',
        alignItems: 'flex-start',
        height: 40,
    },
    value: {
        flex: 1,
        ...Styles.typography.regular,
        fontSize: Configs.FontSize.size16
    },
    row: {
        flexDirection: 'row',
        marginHorizontal: 16
    },
    flatList: {
        flex: 1,
        marginTop: 0,
        paddingHorizontal: 16
    },
    txtTitle: {
        color: COLORS.BLACK,
        textAlign: 'center',
        marginVertical: 20,
        fontSize: Configs.FontSize.size16,
        fontFamily: Configs.FontFamily.bold
    }
});
