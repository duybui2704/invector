import { Id } from './id';

export interface UserInfoModal {
    type: string;
    phone_number: string;
    password: string;
    full_name: string;
    email: string;
    loan_purpose: string;
    channels: string;
    created_at: number;
    status: string;
    status_login: boolean;
    token_active: number;
    timeExpried_active: number;
    created_by: string;
    token_app: string;
    _id: Id;
    indentify: string;
    identify: string;
    role_user: string;
    updated_at: string;
    updated_by: string;
    username: string;
    birth_date: string;
    avatar: string,
    id_fblogin?: string;
    id_google?: string;
    user_apple?: string;
    gender?: string;
    front_facing_card: string,
    card_back: string,
    accuracy?:number;   // 1: da xac thuc, 2: chua xac thuc
}
interface OtpModal {
    otp1: any;
    otp2: any;
    otp3: any;
    otp4: any;
    otp5: any;
    otp6: any
}
