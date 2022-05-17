import React, {
    forwardRef,
    useCallback,
    useImperativeHandle,
    useState
} from 'react';
import { StyleSheet, Text, TextInput, TextStyle, View, ViewStyle } from 'react-native';
import Modal from 'react-native-modal';
import { Rating } from 'react-native-ratings';

import { COLORS, Styles } from '@/theme';
import Languages from '@/common/Languages';
import { PopupActionTypes, PopupPropsTypes } from '@/models/typesPopup';
import { Configs } from '@/common/Configs';
import { Touchable } from './elements/touchable';
import { SCREEN_WIDTH } from '@/utils/DimensionUtils';
import HideKeyboard from './HideKeyboard';

interface PopupNoActionProps extends PopupPropsTypes {
    renderIcon?: any,
    renderTitle?: string,
    renderContent?: string,
    hasButton?: boolean,
    containerAllBtn?: ViewStyle,
    containerAgreeBtn?: ViewStyle,
    textCancel?: TextStyle,
    textAgree?: TextStyle,
    containerCancelBtn?: ViewStyle,
    onChangeTextComment?: (_text?: string) => void;
    ratingSwipeComplete?: (_rating?: any) => void;
}

const PopupRating = forwardRef<
    PopupActionTypes,
    PopupNoActionProps
>(({ onClose,
    onConfirm,
    renderIcon,
    renderTitle,
    renderContent,
    hasButton,
    containerAllBtn,
    containerAgreeBtn,
    textCancel,
    textAgree,
    containerCancelBtn,
    onChangeTextComment,
    ratingSwipeComplete
}: PopupNoActionProps, ref) => {
    const [visible, setVisible] = useState<boolean>(false);
    const [text, setText] = useState<string>('');
    const [ratingPoint, setRating] = useState<number>(0);
    const show = useCallback(() => {
        setVisible(true);
    }, []);

    const hide = useCallback(() => {
        setVisible(false);
        setText('');
        setRating('' || 0);
    }, []);

    const _onClose = useCallback(() => {
        hide();
        onClose?.();
    }, [hide, onClose]);

    const onChangeText = useCallback((_text?: string) => {
        setText(_text || '');
        onChangeTextComment(_text || '');

    },[onChangeTextComment]);

    const ratingCompleted = useCallback((rating?: any) => {
        console.log('Rating is: ', rating);
        setRating(rating || 0);
        ratingSwipeComplete(rating || 0);
    },[ratingSwipeComplete]);

    useImperativeHandle(ref, () => ({
        show,
        hide
    }));


    return (
        <Modal
            isVisible={visible}
            animationIn="slideInUp"
            useNativeDriver={true}
            onBackdropPress={hide}
            avoidKeyboard={true}
            hideModalContentWhileAnimating
        >
            <HideKeyboard>
                <View style={styles.popup}>
                    {renderIcon}
                    <Text style={styles.txtTitle}>{Languages.common.rate || renderTitle}</Text>
                    <Rating
                        ratingCount={5}
                        imageSize={40}
                        onFinishRating={ratingCompleted}
                        showRating={true}
                        style={styles.wrapStarRate}
                        startingValue={ratingPoint}
                    />
                    <View>
                        <Text style={styles.txtContent}>{Languages.common.comment || renderContent}</Text>
                        <TextInput
                            multiline={true}
                            keyboardType={'DEFAULT'}
                            numberOfLines={5}
                            maxLength={300}
                            onChangeText={onChangeText}
                            value={text}
                            style={styles.wrapComment}
                        />
                    </View>
                    {hasButton &&
                        <View style={[styles.row, containerAllBtn]}>
                            <Touchable style={[styles.closeButton, containerCancelBtn]} onPress={_onClose}>
                                <Text style={[styles.txtBt, textCancel]}>{Languages.common.cancel}</Text>
                            </Touchable>
                            <Touchable style={[styles.confirmButton, containerAgreeBtn]} onPress={onConfirm}>
                                <Text style={[styles.txtBtConfirm, textAgree]}>{Languages.common.rate}</Text>
                            </Touchable>
                        </View>}
                </View>
            </HideKeyboard>
        </Modal>
    );
});

export default PopupRating;

const styles = StyleSheet.create({
    popup: {
        backgroundColor: COLORS.WHITE,
        borderColor: COLORS.GRAY_13,
        borderRadius: 16,
        borderWidth: 1,
        paddingBottom: 16,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 16,
        paddingTop: 30
    },
    txtTitle: {
        ...Styles.typography.medium,
        fontSize: Configs.FontSize.size28,
        color: COLORS.GRAY_7,
        paddingBottom: 10

    },
    txtContent: {
        ...Styles.typography.medium,
        paddingTop: 10,
        fontSize: Configs.FontSize.size18,
        color: COLORS.GRAY_7,
        paddingBottom: 10
    },
    row: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        marginTop: 10,
        paddingTop: 10
    },
    txtBt: {
        ...Styles.typography.bold,
        fontSize: Configs.FontSize.size16,
        color: COLORS.GREEN
    },
    txtBtConfirm: {
        ...Styles.typography.medium,
        fontSize: Configs.FontSize.size16,
        color: COLORS.WHITE
    },
    closeButton: {
        backgroundColor: COLORS.WHITE,
        borderWidth: 1,
        borderColor: COLORS.GRAY_6,
        width: '45%',
        alignItems: 'center',
        paddingVertical: 8,
        borderRadius: 5
    },
    confirmButton: {
        backgroundColor: COLORS.GREEN,
        borderWidth: 1,
        borderColor: COLORS.GREEN,
        width: '45%',
        alignItems: 'center',
        paddingVertical: 8,
        borderRadius: 5
    },
    wrapComment: {
        width: SCREEN_WIDTH * 0.75,
        paddingHorizontal: 16,
        borderColor: COLORS.GRAY_11,
        borderWidth: 1,
        borderRadius: 12
    },
    wrapStarRate: {
        flexDirection: 'column-reverse'
    }
});
