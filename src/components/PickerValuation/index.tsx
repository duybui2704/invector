import React, { forwardRef, useCallback, useImperativeHandle, useMemo, useRef, useState } from 'react';
import {
    Text,
    View
} from 'react-native';

import IcDownAuth from '@/assets/image/auth/ic_down_auth.svg';
import { COLORS, Styles } from '@/theme';
import Utils from '@/utils/Utils';
import BottomSheetComponent from '@/components/bottomSheet';

import { Touchable } from '../../components/elements/touchable';
import Validate from '@/utils/Validate';
import { PopupActionTypes , PickerAction, PickerProps} from '@/components/PickerValuation/types';
import arrayIcon from "@/common/arrayIcon";
import {MyStylesPicker} from "@/components/PickerValuation/styles";

const PickerValuation = forwardRef<PickerAction, PickerProps>(
    (
        {
            leftIcon,
            rightIcon,
            label,
            onPressItem,
            value,
            data,
            labelStyle,
            pickerStyle,
            containerStyle,
            isCheckboxList,
            optional = false,
            onScrollTo,
            placeholderStyle,
            index,
            disable,
            placeholder
        }: PickerProps,
        ref?: any
    ) => {

        useImperativeHandle(ref, () => ({
            setErrorMsg
        }));

        const styles = MyStylesPicker();
        const bottomSheetRef = useRef<PopupActionTypes>(null);
        const [errMsg, setErrMsg] = useState<string>('');
        const [coordinate, setCoordinate] = useState<number>(0);

        const onChangeValue = useCallback((item: any) => {
            setErrMsg('');
            onPressItem?.(item);
        }, [onPressItem]);

        const openPopup = useCallback(() => {
            bottomSheetRef.current?.show();
        }, []);

        useImperativeHandle(ref, () => ({
            setErrorMsg
        }));
        const setErrorMsg = useCallback((msg: string) => {
            if (Validate.isStringEmpty(msg)) {
                return;
            }
            setErrMsg(msg);
            if (data?.length > 0) {
                onScrollTo?.(coordinate);
            }
        }, [coordinate, data?.length, onScrollTo]);

        const renderValue = useMemo(() => {
            if (value) {
                return <Text numberOfLines={1} style={styles.textValue}>{value}</Text>;
            }
            return (
                <Text style={[styles.placeholder, placeholderStyle]}>
                    {Utils.capitalizeFirstLetter(label || '')}
                </Text>
            );
        }, [label, placeholderStyle, value]);

        const _containerStyle = useMemo(() => {
            const style = {
                backgroundColor: data?.length === 0 ? COLORS.GRAY_10 : COLORS.WHITE
            };
            return [styles.wrapInput, pickerStyle, style];
        }, [data?.length, pickerStyle]);

        const errorMessage = useMemo(() => {
            const paddingText = { paddingBottom: 0 };
            if (data?.length === 0) {
                setErrMsg('');
                return null;
            }
            if (!Validate.isStringEmpty(errMsg)) {
                return <View style={paddingText}>
                    <Text
                        style={styles.errorMessage}>{Utils.capitalizeFirstLetter(errMsg)}!</Text>
                </View>;
            }
            return null;
        }, [data?.length, errMsg]);

        const onLayout = useCallback((event) => {
            const layout = event.nativeEvent.layout;
            setCoordinate(layout.y);
        }, []);

        const checkIconRight = useMemo(() => {
            switch (rightIcon){
                case arrayIcon.login.channel:
                    return <IcDownAuth width={20} height={20}/>
                    break;
                default:
                    break;
            }
        }, [rightIcon])


        return (
            <View onLayout={onLayout} style={[styles.container, containerStyle]}>
                <Touchable
                    onPress={openPopup}
                    style={_containerStyle}
                    disabled={data?.length === 0}
                    radius={10}
                >
                    {renderValue}
                    <View style={styles.rightIcon}>
                        {checkIconRight}
                    </View>
                </Touchable>
                {errorMessage}
                {/*<BottomSheetComponent*/}
                {/*    ref={bottomSheetRef}*/}
                {/*    data={data}*/}
                {/*    onPressItem={onChangeValue}*/}
                {/*    isCheckboxList={isCheckboxList}*/}
                {/*/>*/}
            </View>
        );
    });

export default PickerValuation;
