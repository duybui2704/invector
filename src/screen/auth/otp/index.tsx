import React, {useRef, useState} from 'react';
import {ImageBackground, Text, View} from 'react-native';
import {observer} from 'mobx-react';

import {MyStylesOtp} from './styles';
import Languages from '@/common/Languages';
import IcLine from '@/assets/image/auth/ic_line_auth.svg';
import {MyTextInput} from '@/components/elements/textfield';
import {Touchable} from '@/components/elements/touchable';
import {COLORS} from '@/theme';
import {TextFieldActions} from '@/components/elements/textfield/types';

const Otp = observer((phone: any, data: any) => {
    const styles = MyStylesOtp();
    const [otp, setOtp] = useState<any>('');
    const refOtp = useRef<TextFieldActions>();

    const onChangeText = (value: string, tag?: string) => {
        switch (tag) {
            case Languages.auth.txtTitleOtp:
                setOtp(value);
                break;
            default:
                break;
        }
    };

    const onConfirm = () => {

    };

    return(
        <View style={styles.main}>
            <View style={styles.content}>
                <View style={styles.wrapTitle}>
                    <Text style={styles.txtTitle}>{Languages.auth.txtTitleOtp}</Text>
                    <IcLine/>
                </View>
                <Text style={styles.txtOtp}>{Languages.auth.txtConfirmOtp}</Text>
                <MyTextInput
                    ref={refOtp}
                    value={otp}
                    isPhoneNumber={true}
                    maxLength={11}
                    placeHolder={Languages.auth.txtTitleOtp}
                    containerInput={styles.inputPhone}
                    onChangeText={onChangeText}
                    keyboardType={'NUMBER'}
                />
                <View style={styles.rowInfo}>
                    <Touchable onPress={onConfirm} disabled={otp.length < 5}
                        style={otp.length > 5 ? styles.tobLogin : [styles.tobLogin, {backgroundColor: COLORS.GRAY}]}>
                        <Text style={otp.length > 5  ? styles.txtSubmit : [styles.txtSubmit, {color: COLORS.BLACK}]}>
                            {Languages.auth.conFirm}
                        </Text>
                    </Touchable>
                </View>
            </View>
        </View>
    );
});
export default Otp;
