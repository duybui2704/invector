import { observer } from 'mobx-react-lite';
import React , {useState, useRef, useCallback, useMemo, useEffect} from 'react';
import {View, TextInput, ImageBackground, Text, TouchableWithoutFeedback, Keyboard, StatusBar} from 'react-native';
import { useIsFocused } from '@react-navigation/native';

// import IcFaceAuth from '@/assets/image/auth/ic_face_auth.svg';
// import IcInsAuth from '@/assets/image/auth/ic_ins_auth.svg';
// import IcInAuth from '@/assets/image/auth/ic_in_auth.svg';
// import IcGoogleAuth from '@/assets/image/auth/ic_gg_auth.svg';
// import IcEmailAuth from '@/assets/image/auth/ic_email_auth.svg';
// import IcDownAuth from '@/assets/image/auth/ic_down_auth.svg';
import CheckIcon from '@/assets/image/auth/ic_check_login.svg';
import UnCheckIcon from '@/assets/image/auth/ic_un_check_login.svg';
import {Touchable}  from '../../../components/elements/touchable';
import {MyTextInput} from '../../../components/elements/textfield';
import { myStylesAuth } from './styles';
import Images from '../../../assets/Images';
import { TextFieldActions } from '../../../components/elements/textfield/types';
import { HeaderBar } from '../../../components/header';
import { COLORS } from '../../../theme';
// import Loading from '../../../components/loading/loding';

const Login = observer(() => {
    const [phone, setPhone] = useState<any>('');
    const [pass, setPass] = useState<any>('');
    const styles = myStylesAuth();
    const refPhone = useRef<TextFieldActions>(null);
    const refPass = useRef<TextFieldActions>(null);
    const [checked, setCheck] = useState<boolean>(false);
    const [isLoading, setLoading] = useState<boolean>(false);

    const onChangeText = useCallback((value: string, tag?: string) => {
        switch (tag) {
            case 'Số điện thoại':
                setPhone(value);
                break;
            case 'Mật khẩu':
                setPass(value);
                break;
            default:
                break;
        }
    }, []);

    const isChecked = useCallback(() => {
        setCheck(last => !last);
        const checkbox = useMemo(() => {
            if (checked) {
                return <CheckIcon width={20} height={20} />;
            }
            return <UnCheckIcon width={20} height={20} />;
        }, [checked]);
    }, []);

    const onLoginPhone = useCallback(() => {

    }, []);

    return(
        <ImageBackground style={styles.main} source={Images.bg_login} resizeMode= 'stretch'>
            < StatusBar barStyle={'light-content'} backgroundColor={COLORS.GREEN_1}/>
            {/*<Touchable style = {styles.tob} >*/}
            {/*    <Text style = {styles.txt}>Đ ă n g  N h a p</Text>*/}
            {/*</Touchable>*/}
            {/*<Touchable style = {styles.tob1}>*/}
            {/*    <Text style = {styles.txt}>Đ ă n g  k ý</Text>*/}
            {/*</Touchable>*/}
            {/*<Touchable style = {styles.tob2} >*/}
            {/*    <Text style = {styles.txt}>Q u e n  M a t K h a u</Text>*/}
            {/*</Touchable>*/}
            <View style={styles.wrapAll}>
                <View style={styles.content} accessible={false}>
                    <MyTextInput
                        ref={refPhone}
                        value={phone}
                        isPhoneNumber={true}
                        // leftIcon={ICONS.PROFILE}
                        placeHolder={'Số điện thoại'}
                        containerInput={styles.inputPhone}
                        onChangeText={onChangeText}
                        keyboardType={'NUMBER'}
                    />
                    <MyTextInput
                        ref={refPass}
                        value={pass}
                        isPhoneNumber={false}
                        // leftIcon={ICONS.LOCK}
                        placeHolder={'Mật khẩu'}
                        containerInput={styles.inputPass}
                        onChangeText={onChangeText}
                        isPassword
                    />
                    <View style={styles.rowInfo}>
                        <View style={styles.row}>
                            <Touchable style={styles.checkbox} onPress={()=>{}}>
                                {isChecked}
                            </Touchable>
                            <Text style={styles.txtSave}>Lưu tài khoản</Text>
                        </View>
                        <Touchable onPress={onLoginPhone} style = {{width: 200, height: 50, backgroundColor: COLORS.GREEN, borderRadius: 20, justifyContent: 'center', alignItems: 'center'}} >
                            <Text style={styles.txtSubmit}>
                                Đăng nhập
                            </Text>
                        </Touchable>
                    </View>
                </View>
            </View>
            {/*{isLoading && <Loading isOverview />}*/}
        </ImageBackground>
    );
});
export default Login;
