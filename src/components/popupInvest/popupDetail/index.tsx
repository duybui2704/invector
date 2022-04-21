import React, {forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState} from 'react';
import {FlatList, Text, View} from 'react-native';
import Modal from 'react-native-modal';

import {PopupActions, PopupProps} from '@/components/popupInvest/types';
import {MyStylePupUpDetail} from '@/components/popupInvest/popupDetail/styles';
import {Touchable} from '@/components/elements/touchable';
import {COLORS, Styles} from '@/theme';
import {TextFieldActions} from "@/components/elements/textfield/types";
import {Configs} from "@/common/Configs";
import DimensionUtils from "@/utils/DimensionUtils";

const PopupStatusDetail = forwardRef<PopupActions, PopupProps>(
        ({
             onConfirm,
             onClose,
             title,
             description,
             data,
             onChange
         }: PopupProps, ref) => {

            const styles = MyStylePupUpDetail();
            const [visible, setVisible] = useState<boolean>(false);
            const [titleModal, setTitleModal] = useState<string>('');

            useEffect(() => {
                console.log('title', title)
            }, [title])

            const show = useCallback((txt) => {
                setTitleModal(txt);
                setVisible(true);
            }, []);

            const hide = useCallback(() => {
                setVisible(false);
            }, []);

            const _onClose = useCallback(() => {
                hide();
                onClose?.();
            }, [hide, onClose]);

            useImperativeHandle(ref, () => ({
                show,
                hide
            }));

            const back = useCallback((value) => {
                console.log('txt: ' , title)
                onChange(title, value);
                _onClose();
            }, [])

            const renderFl = useCallback((item) => {
                return(
                    <Touchable style={{
                        width: DimensionUtils.SCREEN_WIDTH * 0.6,
                        height: 40,
                        borderRadius: 10,
                        borderWidth: 1,
                        borderColor: COLORS.GREEN,
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginVertical: 10
                    }}
                               onPress={() => back(item.item.month)}
                    >
                        <Text style={{fontFamily: Configs.FontFamily.regular, fontSize: Configs.FontSize.size14, color: COLORS.BLACK}}>{item.item.month}</Text>
                    </Touchable>
                );
            }, []);

            return (
                <Modal
                    isVisible={visible}
                    animationIn="slideInUp"
                    useNativeDriver={true}
                    onBackdropPress={hide}
                    avoidKeyboard={true}
                    hideModalContentWhileAnimating
                >
                    <View style={{flex: 1, flexDirection: 'column'}}>
                        <View style={styles.popup}>
                            <View style={styles.tobModal}>
                                <View style={styles.tobView}>
                                    <Text style={styles.textModel}>{title}</Text>
                                </View>
                                <FlatList
                                    data={data}
                                    renderItem={renderFl}
                                />
                            </View>
                        </View>
                    </View>
                </Modal>
            );
        }
    )
;

export default PopupStatusDetail;

