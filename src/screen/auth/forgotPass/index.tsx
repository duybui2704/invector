import { observer } from 'mobx-react-lite';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Text, View } from 'react-native';

import IcLine from '@/assets/image/auth/ic_line_auth.svg';
import arrayIcon from '@/common/arrayIcon';
import Languages from '@/common/Languages';
import { useAppStore } from '@/hooks';
import SessionManager from '@/manager/SessionManager';
import Loading from '@/components/loading';
import { TextFieldActions } from '@/components/elements/textfield/types';
import { MyStylesForgotPass } from './styles';
import { MyTextInput } from '@/components/elements/textfield';
import Navigator from '@/routers/Navigator';
import ScreenName, { TabNamesArray } from '@/common/screenNames';
import { Touchable } from '@/components/elements/touchable';
import { COLORS } from '@/theme';
import FormValidate from '@/utils/FormValidate';
import ChangePass from '@/screen/auth/changePass';

const ForgotPass = observer(() => {
    const {
        apiServices,
        userManager,
        fastAuthInfoManager: fastAuthInfo,
        appManager
    } = useAppStore();
    const [phone, setPhone] = useState<any>('');
    const [isNavigate, setNavigate] = useState<boolean>(true);
    const styles = MyStylesForgotPass();
    const refPhone = useRef<TextFieldActions>(null);;
    const [isLoading, setLoading] = useState<boolean>(false);


    const onChangeText = (value: string, tag?: string) => {
        switch (tag) {
            case Languages.auth.txtPhone:
                setPhone(value);
                break;
            default:
                break;
        }
    };

    const onValidate = useCallback(() => {
        const errMsgPhone = FormValidate.passConFirmPhone(phone);

        refPhone.current?.setErrorMsg(errMsgPhone);
    }, []);

    const onSentOtp = async () => {
        setNavigate(false);
    };

    return (
        <View style={styles.container}>
            {!isNavigate ? <ChangePass /> :
                <View style={styles.content}>
                    <View style={styles.viewTitle}>
                        <Text style={styles.txtTitle}>{Languages.auth.titleForgotPass}</Text>
                        {/* <IcLine width={'20%'}/> */}
                    </View>
                    <View style={styles.txtLeft}>
                        <Text style={styles.txt}>{Languages.auth.txtForgotPass}</Text>
                    </View>
                    <MyTextInput
                        ref={refPhone}
                        value={phone}
                        isPhoneNumber={true}
                        maxLength={11}
                        rightIcon={arrayIcon.login.phone}
                        placeHolder={Languages.auth.txtPhone}
                        containerInput={styles.inputPhone}
                        onChangeText={onChangeText}
                        keyboardType={'NUMBER'}
                    />
                    <View style={styles.rowInfo}>
                        <Touchable onPress={onSentOtp} disabled={phone === ''}
                            style={phone !== '' ? styles.tobLogin : [styles.tobLogin, { backgroundColor: COLORS.GRAY_13 }]}>
                            <Text style={phone !== '' ? styles.txtSubmit : [styles.txtSubmit, { color: COLORS.GRAY_12 }]}>
                                {Languages.auth.sentOTP}
                            </Text>
                        </Touchable>
                    </View>
                </View>
            }

            {isLoading && <Loading isOverview />}
        </View>
    );
});

export default ForgotPass;
