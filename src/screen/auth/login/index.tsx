import { observer } from 'mobx-react-lite';
import React , {useState, useRef, useCallback, useMemo, useEffect} from 'react';
import {View, TextInput, ImageBackground, Text, TouchableWithoutFeedback, Keyboard, StatusBar} from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import {  Circle, TextPath, TSpan, G, Path, Svg, Image } from 'react-native-svg';

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
import Languages from "@/common/languages";
import SvgComponent from '../login/SvgText';
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
            case Languages.login.txtPhone:
                setPhone(value);
                break;
            case Languages.login.txtPass:
                setPass(value);
                break;
            default:
                break;
        }
    }, []);

    const onChangeChecked = useCallback(() => {
        setCheck(last => !last);

    }, []);

    const checkbox = useMemo(() => {
        if (checked) {
            return <CheckIcon width={20} height={20} />;
        }
        return <UnCheckIcon width={20} height={20} />;
    }, [checked]);


    const onLoginPhone = useCallback(() => {

    }, []);

    return(
        <View style={styles.main} >
            < StatusBar barStyle={'light-content'} backgroundColor={COLORS.GREEN_1}/>
            <View style={styles.viewSvg}>
                 <SvgComponent/>
            </View>

               {/* <View style={styles.wrapAll}>
                   <View style={styles.content} >
                       <Text style={styles.txtTitle}>{Languages.login.txtTitle}</Text>
                       <MyTextInput
                           ref={refPhone}
                           value={phone}
                           isPhoneNumber={true}
                           // leftIcon={ICONS.PROFILE}
                           placeHolder={Languages.login.txtPhone}
                           containerInput={styles.inputPhone}
                           onChangeText={onChangeText}
                           keyboardType={'NUMBER'}
                       />
                       <MyTextInput
                           ref={refPass}
                           value={pass}
                           isPhoneNumber={false}
                           // leftIcon={ICONS.LOCK}
                           placeHolder={Languages.login.txtPass}
                           containerInput={styles.inputPass}
                           onChangeText={onChangeText}
                           isPassword
                       />
                       <View style={styles.rowInfo}>
                           <View style={styles.row}>
                               <Touchable style={styles.checkbox} onPress={onChangeChecked}>
                                   {checkbox}
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
               </View>  */}
        </View>
    );
});
export default Login;
