import React, { forwardRef, useCallback, useImperativeHandle, useMemo, useState } from 'react';
import {
    Dimensions,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import Modal from 'react-native-modal';
import FastImage from 'react-native-fast-image';

import { COLORS } from '@/theme';
import { Configs } from '@/common/Configs';
import Languages from '@/common/Languages';

export type PopupInvestFirstProps = {
    onConfirm?: () => any;
    image?: string;
};

export type PopupActions = {
    show: (content?: string) => any;
    hide: (content?: string) => any;
    setContent?: (message: string) => void;
};

const PopupInvestFirst = forwardRef<PopupActions, PopupInvestFirstProps>(
    ({
        onConfirm,
        image
    }: PopupInvestFirstProps, ref) => {

        const [visible, setVisible] = useState<boolean>(false);

        useImperativeHandle(ref, () => ({
            show,
            hide
        }));

        const hide = useCallback(() => {
            setVisible(false);
        }, []);

        const show = useCallback(() => {
            setVisible(true);
        }, []);

        const onPress = useCallback(() => {
            onConfirm?.();
            hide();
        }, []);

        const onClose = useCallback(() => {
            hide();
        }, []);

        const renderBtnSubmit = useMemo(() => {
            return (
                <TouchableOpacity
                    onPress={onPress}
                    style={styles.confirm_button_wrapper}>
                    <Text style={styles.button}>{Languages.home.investNowFloral}</Text>
                </TouchableOpacity>
            );
        }, [onConfirm]);

        const renderInfo = useMemo(() => {
            return (
                <FastImage
                    style={{
                        width: IMG_WIDTH,
                        height: IMG_HEIGHT
                    }}
                    source={{ uri: image }}
                />
            );
        }, [image]);

        return (
            <Modal
                isVisible={visible}
                animationIn="slideInUp"
                useNativeDriver={true}
                avoidKeyboard={true}
                hideModalContentWhileAnimating
                onBackdropPress={onClose}
                coverScreen={true}>
                <View style={styles.mainContainer}>
                    {renderInfo}
                    {renderBtnSubmit}
                </View>
            </Modal>
        );
    });
export default PopupInvestFirst;

const IMG_WIDTH = Dimensions.get('screen').width / 1.3;
const IMG_HEIGHT = IMG_WIDTH;

const styles = StyleSheet.create({
    mainContainer: {
        width: IMG_WIDTH,
        marginVertical: 10,
        borderRadius: 15,
        overflow: 'hidden',
        alignSelf: 'center'
    },
    confirm_button_wrapper: {
        alignSelf: 'center',
        backgroundColor: COLORS.GREEN,
        width: IMG_WIDTH,
        paddingVertical: 15,
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        fontSize: 16,
        color: COLORS.WHITE,
        textAlign: 'center',
        fontFamily: Configs.FontFamily.bold
    }
});
