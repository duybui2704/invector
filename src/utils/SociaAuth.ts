import { configGoogleSignIn } from '@/common/constants';
import appleAuth from '@invertase/react-native-apple-authentication';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { Platform } from 'react-native';
import {
    AccessToken, LoginManager,
    Profile
} from 'react-native-fbsdk-next';

GoogleSignin.configure(configGoogleSignIn);

export const loginWithGoogle = async () => {
    try {
        // await GoogleSignin.hasPlayServices();
        const { idToken } = await GoogleSignin.signIn();
        
        if (idToken) {
            const userInfo = await GoogleSignin.signInSilently();
            if (userInfo) GoogleSignin.signOut();
            return userInfo;
        }
        return null;
    } catch (err) {
        console.log('getAccessTokenGoogle error', err);
        return null;
    }
};


export const loginWithFacebook = async () => {
    try {
        const result = await LoginManager.logInWithPermissions(
            ['public_profile', 'email'],
            'limited',
            'my_nonce'
        );
        if (!result.isCancelled) {
            let data;
            if (Platform.OS === 'android') {
                data = await AccessToken.getCurrentAccessToken();
            }
            else {
                data = await Profile.getCurrentProfile();
            }
            if (data) LoginManager.logOut();
            return data;
        }
    } catch (error) {
        return null;
    }
};
