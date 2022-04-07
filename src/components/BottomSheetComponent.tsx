import { BottomSheetBackdrop, BottomSheetBackdropProps, BottomSheetFlatList, BottomSheetModal } from '@gorhom/bottom-sheet';
import React, { forwardRef, useCallback, useImperativeHandle, useMemo, useRef } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Touchable } from './elements/touchable';

export type ItemProps = {
    value?: string;
    text?: string;
    id?: string;
    bank_code?: any;
    bank_name?: any;
    full_name?: string;
    status?: string;
    account_type_atm?: number;
    account_type_bank?: number;
    created_at?: number;
    updated_at?: number;
};

type BottomSheetProps = {
    data?: ItemProps[];
    onPressItem?: (item: any) => void;;
    isIcon?: boolean,
    onClose?: () => void;
    onOpen?: () => void;
};

export type BottomSheetAction = {
    show: (content?: string) => any;
    hide?: (content?: string) => any;
    setContent?: (message: string) => void;
};
const BottomSheetComponent = forwardRef<BottomSheetProps, BottomSheetAction>(
    ({ data, onPressItem,  onClose, onOpen }: BottomSheetProps, ref) => {

        const bottomSheetRef = useRef<BottomSheetModal>(null);
        const snapPoints = useMemo(() => ['15%', '50%'], []);

        const hide = useCallback(() => {
            onClose?.();
            bottomSheetRef?.current?.close();
        }, [onClose]);

        const show = useCallback(() => {
            onOpen?.();
            bottomSheetRef?.current?.present();
        }, [onOpen]);

        const CustomBackdrop = (props: BottomSheetBackdropProps) => {
            return <BottomSheetBackdrop {...props} pressBehavior="close" />;
        };

        useImperativeHandle(ref, () => ({
            show,
            hide,
            onClose,
            onOpen
        }));

        const renderItem = useCallback(
            ({ item }) => {
                const onPress = () => {
                    onPressItem?.(item);
                    hide();
                };
                return (
                    <Touchable onPress={onPress} >
                        <View >
                            <View >
                                <Text >{item.name}</Text>
                                <Text ></Text>
                            </View>
                        </View>

                    </Touchable>
                );
            },
            [hide, onPressItem]
        );

        const keyExtractor = useCallback((index) => {
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

                    <BottomSheetFlatList
                        data={data}
                        renderItem={renderItem}
                        // style={styles.flatList}
                        keyExtractor={keyExtractor}
                    />

                </BottomSheetModal>
            </View>
        );
    });
export default BottomSheetComponent;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24
    }
});
