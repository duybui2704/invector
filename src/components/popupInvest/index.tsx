import React, {forwardRef, useCallback, useImperativeHandle, useRef, useState} from 'react';
import {Text, View ,Modal} from 'react-native';
// import Modal from 'react-native-modal';

import {PopupActions, PopupProps} from './types';
import {MyStylePupUp} from '@/components/popupInvest/styles';
import {Touchable} from '@/components/elements/touchable';
import {COLORS} from '@/theme';
import {MyTextInput} from "@/components/elements/textfield";
import arrayIcon from "@/common/arrayIcon";
import Languages from "@/common/Languages";
import {TextFieldActions} from "@/components/elements/textfield/types";
import {PopupInvest} from "@/components/popupOTP";
import PopupStatusDetail from "@/components/popupInvest/bottomSheetInvest";
import {BottomSheetModal} from "@gorhom/bottom-sheet";
import BottomSheetComponentInvest from "@/components/popupInvest/bottomSheetInvest";
import {ItemProps} from "@/components/bottomsheet";

const arrMonth = [
    {id: '1', value: '3 tháng'},
    {id: '2', value: '6 tháng'},
    {id: '3', value: '9 tháng'},
    {id: '4', value: '12 tháng'},
    {id: '5', value: '18 tháng'},
    {id: '6', value: '24 tháng'},
    {id: '7', value: '36 tháng'}
];
const arrMoney = [
    {id: '1', value: '800000'},
    {id: '2', value: '500000'},
    {id: '3', value: '9000000'},
    {id: '4', value: '12000000'},
    {id: '5', value: '18000000'},
    {id: '6', value: '24000000'},
    {id: '7', value: '36000000'}
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
            const [dataPicker, setDataPicker] = useState<ItemProps[]>(arrMonth);
            const refBottomSheetMoney = useRef<any>(null);
            const refBottomSheetMonth = useRef<any>(null);
            const [picker, setPicker] = useState<boolean>(false);
            const show = useCallback(() => {
                setVisible(true);
                setPicker(false);
            }, []);

            const hide = useCallback(() => {
                setVisible(false);
                // setPicker(false);
            }, []);

            const focusedInvest = useCallback(() => {
                console.log('aaa')
                setMonth();
                setMoney();
            }, []);

            const closePicker = useCallback(() => {
                refBottomSheetMoney.current.hide();
                refBottomSheetMonth.current.hide();
                setVisible(true);
            }, []);

            useImperativeHandle(ref, () => ({
                show,
                hide
            }));

            const _onClose = useCallback(() => {
                hide();
            }, [hide]);

            const actionYes = () => {
                onConfirm(month, money);
                hide();
            };

            const onChange = useCallback((value, title) => {
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
            }, []);

            const showPicker = useCallback((title) => {
                hide();
                if (title === Languages.invest.monthInvest) {
                    setDataPicker(arrMonth);
                    setPicker(true);
                    refBottomSheetMonth.current.show();
                } else {
                    setDataPicker(arrMoney);
                    setPicker(true);
                    refBottomSheetMoney.current.show();
                }
                return;
            }, []);

            return (
                <View>
                    <View style={{height: '100%', width: '100%' }}>
                        <Modal
                            visible={visible}
                            animationType={"slide"}
                            transparent={true}
                        >
                            <View style={styles.modal}>
                                <View style={styles.tobModal}>
                                    <View style={styles.viewFL}>
                                        <Text style={styles.textModel}>{title}</Text>
                                        <Touchable onPress={() => showPicker(Languages.invest.monthInvest)}>
                                            <MyTextInput
                                                ref={refMonth}
                                                value={month}
                                                rightIcon={arrayIcon.login.channel}
                                                placeHolder={Languages.invest.monthInvest}
                                                containerInput={styles.inputPhone}
                                            />
                                        </Touchable>
                                        <Touchable onPress={() => showPicker(Languages.invest.chooseMoney)}>
                                            <MyTextInput
                                                ref={refMoney}
                                                value={money}
                                                rightIcon={arrayIcon.login.channel}
                                                placeHolder={Languages.invest.chooseMoney}
                                                containerInput={styles.inputPhone}
                                            />
                                        </Touchable>
                                        <View style={styles.viewBottom}>
                                            <Touchable style={styles.tobConfirm} onPress={actionYes}>
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
                        </Modal>
                    </View>
                    <BottomSheetComponentInvest
                      ref={refBottomSheetMonth}
                      data={dataPicker}
                      onPressItem={onChange}
                      onClose={closePicker}
                      title={Languages.invest.monthInvest}
                    />
                    <BottomSheetComponentInvest
                        ref={refBottomSheetMoney}
                        data={dataPicker}
                        onPressItem={onChange}
                        onClose={closePicker}
                        title={Languages.invest.chooseMoney}
                    />
                </View>
            );
        }
    )
;

export default PopupStatus;

