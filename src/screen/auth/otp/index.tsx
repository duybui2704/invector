import React, {useRef, useState} from 'react';
import {ImageBackground, Text, View} from "react-native";
import Images from "@/assets/Images";
import {MyStylesOtp} from './styles';
import Languages from "@/common/Languages";
import IcLine from "@/assets/image/auth/ic_line_auth.svg";
import {MyTextInput} from "@/components/elements/textfield";
import {observer} from "mobx-react";
import {Touchable} from "@/components/elements/touchable";
import {COLORS} from "@/theme";
import {TextFieldActions} from "@/components/elements/textfield/types";
const Otp = observer((phone: any, data: any) => {
    const styles = MyStylesOtp();
    const [otp, setOtp] = useState<any>('');
    const refOtp = useRef<TextFieldActions>();

    const onChangeText = (value: string, tag?: string) => {
        switch (tag) {
            case Languages.Auth.txtTitleOtp:
                setOtp(value);
                break;
            default:
                break;
        }
    };

    const onConfirm = () => {

    }

    return(
        <View style={{flex: 1}}>
            <View style={styles.content}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text style={styles.txtTitle}>{Languages.Auth.txtTitleOtp}</Text>
                    <IcLine/>
                </View>
                <Text style={styles.txtOtp}>{Languages.Auth.txtConfirmOtp}</Text>
                <MyTextInput
                    ref={refOtp}
                    value={otp}
                    isPhoneNumber={true}
                    maxLength={11}
                    placeHolder={Languages.Auth.txtTitleOtp}
                    containerInput={styles.inputPhone}
                    onChangeText={onChangeText}
                    keyboardType={'NUMBER'}
                />
                <View style={styles.rowInfo}>
                    <Touchable onPress={onConfirm} disabled={otp.length < 5 ? true : false}
                               style={otp.length > 5 ? styles.tobLogin : [styles.tobLogin, {backgroundColor: COLORS.GRAY}]}>
                        <Text style={otp.length > 5  ? styles.txtSubmit : [styles.txtSubmit, {color: COLORS.BLACK}]}>
                            {Languages.Auth.conFirm}
                        </Text>
                    </Touchable>
                </View>
            </View>
        </View>
    );
})
export default Otp;
