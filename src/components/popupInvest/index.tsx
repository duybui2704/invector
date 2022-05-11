import React, { forwardRef, useCallback, useImperativeHandle, useRef, useState } from 'react';
import { Modal, Text, View } from 'react-native';

import arrayIcon from '@/common/arrayIcon';
import Languages from '@/common/Languages';
import { ItemProps } from '@/components/bottomSheet';
import { MyTextInput } from '@/components/elements/textfield';
import { TextFieldActions } from '@/components/elements/textfield/types';
import { Touchable } from '@/components/elements/touchable';
import BottomSheetComponentInvest from '@/components/popupInvest/bottomSheetInvest';
import { MyStylePupUp } from '@/components/popupInvest/styles';
import { useAppStore } from '@/hooks';
import { arrMoney, arrMonth } from '@/mocks/data';
import { COLORS } from '@/theme';
import { PopupActions, PopupProps } from './types';


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
        const {
            common
        } = useAppStore();

        const show = useCallback(() => {
            if (!common.isFocused) {
                setMoney('');
                setMonth('');
            }
            setVisible(true);
            setPicker(false);
        }, [common.isFocused]);

        const hide = useCallback(() => {
            setVisible(false);
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

        const onChange = useCallback((value: string, title: string) => {
            switch (title) {
                case Languages.invest.monthInvest:
                    return setMonth(value);

                case Languages.invest.chooseMoney:
                    return setMoney(value);

                default:
                    return null;
            }
        }, []);

        const showPicker = useCallback((title: string) => {
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

        }, []);

        return (
            <View>
                <View style={{ height: '100%', width: '100%' }}>
                    <Modal
                        visible={visible}
                        animationType={'slide'}
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
                                        <Touchable style={[styles.tobConfirm, { backgroundColor: COLORS.GRAY }]}
                                            onPress={_onClose}>
                                            <Text
                                                style={[styles.textConfirm, { color: COLORS.BLACK }]}>{Languages.invest.cancel}</Text>
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

