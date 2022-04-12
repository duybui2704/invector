import React, {forwardRef, useCallback, useEffect, useImperativeHandle, useState} from 'react';
import {Text, View, FlatList} from 'react-native';
import Modal from 'react-native-modal';

import {PopupActions, PopupProps} from './types';
import {MyStylePupUpSignIn} from "@/components/popupSignIn/styles";
import {Touchable} from "@/components/elements/touchable";
import {COLORS} from "@/theme";

const PopupStatus = forwardRef<PopupActions, PopupProps>(
        ({
             onConfirm,
             onClose,
             title,
             description,
             data,
         }: PopupProps, ref) => {

            const styles = MyStylePupUpSignIn();
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

            const actionYes = (item) => {
                // onConfirm(item.item.name);
                // hide(
                    setTimeout(() => {
                        if(onConfirm) {
                            onConfirm(item.item.name);
                        }
                    }, 10000);
                    hide();
            }

            const renderFlatList = (item) => {
                return (
                    <Touchable
                        style={[
                            styles.smallButton,
                            {backgroundColor: COLORS.WHITE},
                        ]}
                        onPress={() => {
                            actionYes(item);
                        }}>
                        <Text style={{fontSize: 12, color: COLORS.BLACK}}>{item.item.name}</Text>
                    </Touchable>
                );
            }

            return (
                <Modal
                    isVisible={visible}
                    animationIn="slideInUp"
                    useNativeDriver={true}
                    onBackdropPress={hide}
                    avoidKeyboard={true}
                    hideModalContentWhileAnimating
                >
                 <View style={{flex :1, flexDirection: 'column'}}>
                     <View style={styles.popup} >
                         <View style={styles.tobModal}>
                             <View style={[styles.tobView, {marginTop: 12}]}>
                                 <Text style={styles.textModel}>{title}</Text>
                             </View>
                             <View
                                 style={styles.viewFL}>
                                 <FlatList
                                     data={data}
                                     renderItem={renderFlatList}
                                     keyExtractor={item => item.type}
                                 />
                             </View>
                         </View>
                     </View>
                 </View>
                </Modal>
            );
        }
    )
;

export default PopupStatus;

