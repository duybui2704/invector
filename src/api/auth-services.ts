import RsaUtils from '@/utils/RsaUtils';
import { BaseService } from './base-service';
import { API_CONFIG } from './constants';

export class AuthServices extends BaseService {
    loginPhoneOld = async (phone_number: string, password: string, type: number) =>
        this.api().post(
            API_CONFIG.LOGIN,
            this.buildFormData({
                phone_number,
                password,
                type
            })
        );

    loginPhone = async (phone_number: string, password: string) =>
        this.api().post(
            API_CONFIG.LOGIN,
            this.buildFormData({
                phone_number,
                password
            })
        );

    updateUserInf = async (
        full_name: string,
        gender:string,
        birth_date: string,
        phone: string,
        email: string,
        address: string,
        job: string
    ) =>
        this.api().post(
            API_CONFIG.UPDATE_USER_INFO,
            this.buildFormData({
                full_name,
                gender,
                birth_date,
                phone,
                email,
                address,
                job
            })
        );

    registerAuth = async (
        phone_number: string,
        full_name: string,
        password: string,
        re_password: string,
        email: string,
        channels: string
    ) =>
        this.api().post(
            API_CONFIG.REGISTER,
            this.buildFormData({
                phone_number,
                full_name,
                password,
                re_password,
                email,
                channels
            })
        );

    changePwdAuth = async (current_password: string, password: string, re_password: string) =>
        this.api().post(
            API_CONFIG.CHANGE_NEW_PWD,
            this.buildFormData({
                current_password: current_password || '',
                password,
                re_password
            })
        );

    getChanelSource = async () =>
        this.api().post(API_CONFIG.CHANEL, this.buildFormData({}));

    activeAuth = async (otp: string, phone_number: string) =>
        this.api().post(
            API_CONFIG.ACTIVE_AUTH,
            this.buildFormData({
                otp: await RsaUtils.encryptData(otp),
                phone_number: await RsaUtils.encryptData(phone_number)
            })
        );

    resendOtp = async (phone_number: string) =>
        this.api().post(
            API_CONFIG.RESEND_OTP,
            this.buildFormData({
                phone_number
            })
        );

    otpResetPwd = async (phone_number: string) =>
        this.api().post(
            API_CONFIG.OTP_RESET_PWD,
            this.buildFormData({
                phone_number
            })
        );

    updateNewPwd = async (
        phone_number: string,
        token_reset_password: string,
        password: string,
        re_password: string
    ) =>
        this.api().post(
            API_CONFIG.UPDATE_PWD,
            this.buildFormData({
                phone_number,
                token_reset_password,
                password,
                re_password
            })
        );

    loginWithThirdParty = async (type_login: string, provider_id: string) =>
        this.api().post(
            API_CONFIG.LOGIN_THIRD_PARTY,
            this.buildFormData({
                type_login,
                provider_id
            })
        );

    confirmPhoneNumber = async (user_id: string, phone_number: string) =>
        this.api().post(
            API_CONFIG.CONFIRM_PHONE_NUMBER,
            this.buildFormData({
                user_id,
                phone_number
            })
        );

    activeAccountSocial = async (otp: string, user_id: string) =>
        this.api().post(
            API_CONFIG.ACTIVE_ACCOUNT_SOCIAL,
            this.buildFormData({
                otp,
                user_id
            })
        );

    getUserInfo = async (type: number) =>
        this.api().post(API_CONFIG.USER_INFO, this.buildFormData({type}));

    linkSocialAccount = async (type_login: string, provider_id: string) =>
        this.api().post(
            API_CONFIG.LINK_SOCIAL,
            this.buildFormData({ type_login, provider_id })
        );


    uploadHttpImage = async (
        file: any
    ) =>
        this.api().post(
            API_CONFIG.UPLOAD_HTTP_IMAGE,
            this.buildFormData({
                file
            })
        );
}
