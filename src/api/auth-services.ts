import { BaseService } from './base-service';
import { API_CONFIG } from './constants';

export class AuthServices extends BaseService {

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
        file: any,
        gender: string,
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
                file,
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

    getChanelSource = async () =>
        this.api().post(API_CONFIG.CHANEL, this.buildFormData({}));

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

    activeAccountSocial = async (otp: string, user_id: string) =>
        this.api().post(
            API_CONFIG.ACTIVE_ACCOUNT_SOCIAL,
            this.buildFormData({
                otp,
                user_id
            })
        );

    getUserInfo = async (type:number) =>
        this.api().post(API_CONFIG.USER_INFO, this.buildFormData({type}));

    identityVerify = async (
        identity: string,
        front_facing_card: any,
        card_back: any,
        avatar: any
    ) =>
        this.api().post(
            API_CONFIG.IDENTITY_VERIFY,
            this.buildFormData({
                identity,
                front_facing_card,
                card_back,
                avatar
            })
        );
}
