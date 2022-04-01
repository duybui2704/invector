import { observer } from 'mobx-react-lite';
import React , {useState, useRef} from 'react';
import {View, TextInput} from 'react-native';

import { styles } from './styles';

const Login = observer(() => {
    const [phone, setPhone] = useState<any>('');
    const [pass, setPass] = useState<any>('');
    return(
        <View style={styles.main}>
             
        </View>
    );
});
export default Login;
