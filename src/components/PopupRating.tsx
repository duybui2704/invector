import React, {
    forwardRef,
    useCallback,
    useImperativeHandle,
    useMemo,
    useState
} from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import Modal from 'react-native-modal';
import { Rating } from 'react-native-ratings';

import { COLORS, Styles } from '@/theme';
import Languages from '@/common/Languages';
import { PopupActionTypes, PopupPropsTypes } from '@/models/typesPopup';
import { Configs } from '@/common/Configs';
import { SCREEN_WIDTH } from '@/utils/DimensionUtils';
import HideKeyboard from './HideKeyboard';
import { Button } from './elements/button';
import { BUTTON_STYLES } from './elements/button/constants';
import { dataRatingPoint } from '@/mocks/data';
import { ItemProps } from '@/models/common-model';

interface PopupNoActionProps extends PopupPropsTypes {
    onChangeTextComment?: (_text?: string) => void;
    ratingSwipeComplete?: (_rating?: any) => void;
}

const PopupRating = forwardRef<
    PopupActionTypes,
    PopupNoActionProps
>(({ onClose,
    onConfirm,
    onChangeTextComment,
    ratingSwipeComplete
}: PopupNoActionProps, ref) => {
    const [visible, setVisible] = useState<boolean>(false);
    const [text, setText] = useState<string>('');
    const [ratingPoint, setRating] = useState<number>(1);
    const show = useCallback(() => {
        setVisible(true);
    }, []);

    const hide = useCallback(() => {
        setVisible(false);
        setText('');
        setRating('' || 1);
    }, []);

    const _onClose = useCallback(() => {
        hide();
        onClose?.();
    }, [hide, onClose]);

    const onChangeText = useCallback((_text?: string) => {
        setText(_text || '');
        onChangeTextComment(_text || '');

    }, [onChangeTextComment]);

    const ratingCompleted = useCallback((rating?: any) => {
        setRating(rating || 1);
        ratingSwipeComplete(rating || 1);
    }, [ratingSwipeComplete]);

    useImperativeHandle(ref, () => ({
        show,
        hide
    }));

    const renderDescribeRating = useMemo(() => {
        return (
            <>
                {dataRatingPoint.map((item?: ItemProps) => {
                    return (
                        <>
                            {`${ratingPoint}` === item?.id &&
                                <Text style={styles.txtDescribePoint}>
                                    {item?.value}
                                </Text>
                            }
                        </>
                    );
                })}
            </>
        );
    }, [ratingPoint]);

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
                    <Text style={styles.txtTitle}>{`${Languages.common.yourRate}`.toUpperCase()}</Text>
                    <Rating
                        ratingCount={5}
                        imageSize={40}
                        onFinishRating={ratingCompleted}
                        style={styles.wrapStarRate}
                        startingValue={ratingPoint || 1}
                        minValue={1}
                    />
                    {renderDescribeRating}
                    <View>
                        <Text style={styles.txtContent}>{Languages.common.comment}</Text>
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
                    <Button style={styles.row}
                        label={Languages.common.send}
                        buttonStyle={BUTTON_STYLES.GREEN}
                        onPress={onConfirm}
                    />
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
        fontSize: Configs.FontSize.size16,
        color: COLORS.DARK_GRAY,
        paddingBottom: 10

    },
    txtContent: {
        ...Styles.typography.regular,
        paddingTop: 10,
        fontSize: Configs.FontSize.size13,
        color: COLORS.DARK_GRAY,
        paddingBottom: 10
    },
    row: {
        width: '90%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        marginTop: 20,
        paddingTop: 10
    },
    wrapComment: {
        width: SCREEN_WIDTH * 0.75,
        minHeight: SCREEN_WIDTH * 0.3,
        paddingHorizontal: 16,
        borderColor: COLORS.GRAY_11,
        borderWidth: 1,
        borderRadius: 12
    },
    wrapStarRate: {
        flexDirection: 'column-reverse'
    },
    txtDescribePoint: {
        ...Styles.typography.regular,
        fontSize: Configs.FontSize.size11,
        color: COLORS.DARK_GRAY,
        paddingTop: 4
    }
});
