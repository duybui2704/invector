import React, {
    forwardRef,
    useCallback,
    useImperativeHandle,
    useState
} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Modal from 'react-native-modal';

import { Configs } from '@/common/Configs';
import { ENUM_BIOMETRIC_TYPE } from '@/common/constants';
import Languages from '@/common/Languages';
import { COLORS, Styles } from '@/theme';
import { PopupActionTypes, PopupPropsTypes } from '../models/typesPopup';
import { Touchable } from './elements/touchable';

interface PopupErrorBiometryProps extends PopupPropsTypes {
    typeSupportBiometry?: string;
    btnText?: string;
}

const PopupErrorBiometry = forwardRef<
    PopupActionTypes,
    PopupErrorBiometryProps
    >(({ onClose, typeSupportBiometry }: PopupErrorBiometryProps, ref) => {
        const [visible, setVisible] = useState<boolean>(false);
        const show = useCallback(() => {
            setVisible(true);
        }, []);

        const hide = useCallback(() => {
            setVisible(false);
        }, []);

        useImperativeHandle(ref, () => ({
            show,
            hide
        }));

        const _onClose = useCallback(() => {
            hide();
            onClose?.();
        }, [hide, onClose]);

        const _openSetting = useCallback(() => {
            _onClose();
        // Utils.openSetting();
        }, [_onClose]);

        return (
            <Modal
                isVisible={visible}
                animationIn="slideInUp"
                useNativeDriver={true}
                onBackdropPress={hide}
                avoidKeyboard={true}
                hideModalContentWhileAnimating
            >
                <View style={styles.popup}>
                    <Text style={styles.txtTitle}>{Languages.quickAuThen.quickAuthn}</Text>
                    <Text style={styles.txtContent}>{typeSupportBiometry === ENUM_BIOMETRIC_TYPE.FACE_ID ? Languages.quickAuThen.desSetFaceId : Languages.quickAuThen.desSetTouchId}</Text>
                    <Touchable onPress={_openSetting} style={styles.setting}>
                        <Text style={styles.txtSetting}>
                            {Languages.quickAuThen.goToSetting}
                        </Text>
                    </Touchable>
                </View>
            </Modal>
        );
    });

export default PopupErrorBiometry;

const styles = StyleSheet.create({
    popup: {
        backgroundColor: COLORS.WHITE,
        borderColor: COLORS.TRANSPARENT,
        borderRadius: 6,
        borderWidth: 1,
        paddingBottom: 10,
        paddingLeft: 15,
        paddingTop: 10,
        paddingRight: 15
    },
    ic: {
        marginTop: 10,
        marginBottom: -10,
        width: Configs.IconSize.size39,
        height: Configs.IconSize.size39
    },
    txtTitle: {
        ...Styles.typography.bold,
        fontSize: Configs.FontSize.size15,
        color: COLORS.BLACK
    },
    txtContent: {
        ...Styles.typography.regular,
        marginVertical: 10,
        marginRight: 20,
        color: COLORS.BLACK,
        fontSize: Configs.FontSize.size13
    },
    btn: {
        width: '50%',
        marginTop: 10
    },
    iconFinger: {
        alignItems: 'center',
        alignSelf: 'center',
        paddingVertical: 20
    },
    description: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    iconClose: {
        alignItems: 'flex-end'
    },
    setting: {
        alignSelf: 'flex-end',
        marginRight: 10
    },
    txtSetting: {
        ...Styles.typography.bold,
        fontSize: Configs.FontSize.size16
    }
});
