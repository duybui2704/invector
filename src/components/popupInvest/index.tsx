import React, {forwardRef, useCallback, useImperativeHandle, useRef, useState} from 'react';
import {Text, View} from 'react-native';
import Modal from 'react-native-modal';

import {PopupActions, PopupProps} from './types';
import {MyStylePupUp} from '@/components/popupInvest/styles';
import {Touchable} from '@/components/elements/touchable';
import {COLORS} from '@/theme';
import {MyTextInput} from "@/components/elements/textfield";
import arrayIcon from "@/common/arrayIcon";
import Languages from "@/common/Languages";
import {TextFieldActions} from "@/components/elements/textfield/types";
import {PopupInvest} from "@/components/popupOTP";
import PopupStatusDetail from "@/components/popupInvest/popupDetail";

const arrMonth = [
    {id: '1', month: '3 tháng'},
    {id: '2', month: '6 tháng'},
    {id: '3', month: '9 tháng'},
    {id: '4', month: '12 tháng'},
    {id: '5', month: '18 tháng'},
    {id: '6', month: '24 tháng'},
    {id: '7', month: '36 tháng'}
];
const arrMoney = [
    {id: '1', month: '3.000.000'},
    {id: '2', month: '6.000.000'},
    {id: '3', month: '9.000.000'},
    {id: '4', month: '12.000.000'},
    {id: '5', month: '18.000.000'},
    {id: '6', month: '24.000.000'},
    {id: '7', month: '36.000.000'}
];

const PopupStatus = forwardRef<PopupActions, PopupProps>(
        ({
             onConfirm,
             onClose,
             title,
             description,
             data
         }: PopupProps, ref) => {

            const styles = MyStylePupUp();
            const [visible, setVisible] = useState<boolean>(false);
            const refMonth = useRef<TextFieldActions>(null);
            const [month, setMonth] = useState<string>();
            const refMoney = useRef<TextFieldActions>(null);
            const [money, setMoney] = useState<string>();
            const refModelDetail = useRef<TextFieldActions>(null);
            const [dataArr, setDataArr] = useState([]);
            const [titleDetail, setTitleDetail] = useState<boolean>();
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

            const actionYes = () => {
                // onConfirm(item.item.name);
                // hide(

                // onConfirm(item.item.name);
                hide();
            };

            const onChangeText = useCallback((title, value) => {
                switch (title) {
                    case Languages.invest.monthInvest :
                        setMonth(value);
                        return;
                    case Languages.invest.chooseMoney:
                        setMoney(value);
                        return;
                    default:
                        break;
                }
            }, [money, month]);

            const onModalDetail = useCallback((title) => {
                if (title === Languages.invest.monthInvest) {
                    setDataArr(arrMonth);
                    setTitleDetail(title);
                } else {
                    setDataArr(arrMoney);
                    setTitleDetail(title);
                }
                refModelDetail.current.show();
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
                                <View style={styles.viewFL}>
                                    <Touchable onPress={() => onModalDetail(Languages.invest.monthInvest)}>
                                        <MyTextInput
                                            ref={refMonth}
                                            value={month}
                                            rightIcon={arrayIcon.login.channel}
                                            placeHolder={Languages.invest.monthInvest}
                                            containerInput={styles.inputPhone}
                                            onChangeText={onChangeText}
                                        />
                                    </Touchable>
                                    <Touchable onPress={() => onModalDetail(Languages.invest.chooseMoney)}>
                                        <MyTextInput
                                            ref={refMoney}
                                            value={money}
                                            rightIcon={arrayIcon.login.channel}
                                            placeHolder={Languages.invest.chooseMoney}
                                            containerInput={styles.inputPhone}
                                            onChangeText={onChangeText}
                                        />
                                    </Touchable>
                                    <View style={styles.viewBottom}>
                                        <Touchable style={styles.tobConfirm} onPress={onConfirm}>
                                            <Text style={styles.textConfirm}>{Languages.invest.search}</Text>
                                        </Touchable>
                                        <Touchable style={[styles.tobConfirm, {backgroundColor: COLORS.GRAY}]}
                                                   onPress={_onClose}>
                                            <Text
                                                style={[styles.textConfirm, {color: COLORS.BLACK}]}>{Languages.invest.cancel}</Text>
                                        </Touchable>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                    <PopupStatusDetail
                        ref={refModelDetail}
                        title={titleDetail}
                        data={dataArr}
                        onChange={onChangeText}
                    />
                </Modal>
            );
        }
    )
;

export default PopupStatus;

