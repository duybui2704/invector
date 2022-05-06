import { isIOS } from '@/common/Configs';

// README: Should be using react native config

export enum LINKS {
    VPS = 'https://openaccount.vps.com.vn/?MKTID=H787',
    FB_FAN_PAGE = 'https://www.facebook.com/groups/425567338856999',
    STORE_ANDROID = 'https://play.google.com/store/apps/details?id=vn.tienngay.customer',
    STORE_IOS = 'https://apps.apple.com/id/app/tienngay-customer/id1560920806',
    AQ_INVESTOR = 'https://tienngay.vn/template/hoidap',
    POLICY_INVESTOR = 'https://tienngay.vn/template/dieukhoansudung',
    MANUAL_INVESTOR = 'https://tienngay.vn/template/thongtinapp'
}

export enum CONTACT {
    PHONE = '19006907'
}

export const STORE_APP_LINK = isIOS ? LINKS.STORE_IOS : LINKS.STORE_ANDROID;

export enum API_CONFIG {
    BASE_URL = 'https://sandboxappndt.tienngay.vn/',
    // BASE_URL = 'https://appndt.tienngay.vn/',

    // common
    GET_BANNERS = '/banner/get_all_home', // banner app
    GET_NEWS = '/banner/news', // tin tức truyền thông
    GET_INSURANCES = '/banner/handbook', // danh sách bảo hiểm
    ENCRYPT = '/api/Encrypt',
    CHECK_APP_REVIEW = '/app/review',

    // authentication
    LOGIN = 'auth/signin',  // Dang nhap investor
    TOKEN = '/token',
    USER_INFO = 'user/info_investor', // thông tin tài khoản investor
    REGISTER = 'auth/investor_register',
    CHANEL = '/contract/get_utm_source', // list danh sách kênh đăng kí
    UPDATE_USER_INFO = 'user/update_profile_investor', // update user account
    ACTIVE_ACCOUNT_SOCIAL = '/auth/active_account',
    OTP_RESET_PWD = '/auth/reset_password',
    UPDATE_PWD = 'auth/new_password',
    IDENTITY_VERIFY = 'user/identity_verification', //  xac thuc CCCD/CMT

    // history
    HISTORY = '/investor/history_transaction_investor',

    // notification
    NOTIFICATION = '/user/get_notification_user',
    CREATE_FCM_TOKEN = 'user/save_device_token_user',
    GET_UNREAD_COUNT_NOTIFICATION = 'user/get_count_notification_user',
    NOTIFY_UPDATE_READ = '/user/update_read_notification',
    GET_ONREAD_COUNT_NOTIFICATION = '/user/get_count_notification_user',

    // contracts
    CONTRACTS = 'contract/contract_tempo_by_user', // List danh sách hợp đồng
    CONTRACTS_HOT = 'contract/contract_investor_app',
    CONTRACTS_DASH = '/contract/dashboard_investor',
    CONTRACT_DETAIL = '/contract/detail_contract_investor', // Chi tiết hợp đồng
    CONTRACT_OTP = '/contract/send_otp_invest',
    CONTRACT_HAVE_INVESTED = '/contract/detail_contract_have_invested',
    CONTRACT_ALL = '/contract/contract_investor_app_all',
    CONTRACT_DETAIL_INVEST_NOW = '/contract/detail_contract_investor',
    GET_INFOR_INVESTOR = 'user/info_investor',
    REQUEST_NGAN_LUONG = 'V2/contract/investment_ngan_luong',

    // link account with payment method
    REQUEST_SEND_VIMO_LINK = 'vimo_link/send_link_vimo',    // gui lien ket vimo
    REQUEST_ACTIVE_VIMO_LINK = 'vimo_link/active_link_vimo',  // active lien ket vimo
    REQUEST_CANCEL_VIMO_LINK = 'vimo_link/unLink_vimo',       // huy lien ket vimo
    REQUEST_INFO_VIMO_LINK = 'vimo_link/info_vimo_investor',  // xem thong tin lien ket vimo
    GET_BANK = 'bankNganLuong/get_all',  // lay danh sach tai khoan ngan hang 
    CHOOSE_METHOD_RECEIVE_INTEREST = 'investor/confirm_account_payment',  // chon tai khoan nhan lai (vimo, bank)

    // report 
    GET_YEARS = 'investor/select_year', // get years for report
    GET_QUARTERS = 'investor/select_quarters_the_year', // get quarters for report
    REQUEST_FINANCE_REPORT = 'investor/financial_report', // bao cao tai chinh investor

    // investor
    
    
}
export const PAYMENT_URL = {
    NL_SUCCESSFULLY: `${API_CONFIG.BASE_URL}transaction/success`,
    NL_FAILED: 'http://sandboxappndt.tienngay.vn/V2/contract/cancel'
};
