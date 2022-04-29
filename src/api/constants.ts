import { isIOS } from '@/common/Configs';

// README: Should be using react native config

export enum LINKS {
    WEB = 'https://tienngay.vn/',
    VPS = 'https://openaccount.vps.com.vn/?MKTID=H787',
    ABOUT_US = 'https://tienngay.vn/home/aboutus',
    POLICY = 'https://tienngay.vn/app-privacy-policy',
    FAQ = 'https://tienngay.vn/home/faqs',
    FB_FAN_PAGE = 'https://www.facebook.com/groups/425567338856999',
    STORE_ANDROID = 'https://play.google.com/store/apps/details?id=vn.tienngay.customer',
    STORE_IOS = 'https://apps.apple.com/id/app/tienngay-customer/id1560920806',
    AQ_INVESTOR= 'https://tienngay.vn/template/hoidap',
    POLICY_INVESTOR = 'https://tienngay.vn/template/dieukhoansudung',
    MANUAL_INVESTOR = 'https://tienngay.vn/template/thongtinapp'
}

export enum CONTACT {
    PHONE = '19006907'
}

export const STORE_APP_LINK = isIOS ? LINKS.STORE_IOS : LINKS.STORE_ANDROID;

export enum API_CONFIG {
    BASE_URL_OLD = 'https://appkh.tienngay.vn/',
    // BASE_URL = 'https://appkh.tienngay.vn/V2',
    // BASE_URL_OLD = 'https://sandboxappkh.tienngay.vn',
    // BASE_URL = 'https://sandboxappkh.tienngay.vn/V2',
    BASE_URL = 'https://sandboxappndt.tienngay.vn/',
    //  BASE_URL = 'https://appndt.tienngay.vn/',
    DOMAIN_SHARE = 'https://',

    IMAGES_HOST = 'https://',

    GET_KEY_UPLOAD = '/api/KeyUpload',
    UPLOAD_IMAGE = '/UploadHandler.php',

    // common
    GET_VERSION = '/api/VersionApiStatic',
    GET_BANNERS = '/banner/get_all_home', // banner app
    GET_NEWS = '/banner/news', // tin tức truyền thông
    GET_INSURANCES = '/banner/handbook', // danh sách bảo hiểm
    ENCRYPT = '/api/Encrypt',
    CHECK_APP_REVIEW = '/app/review',

    // authentication
    LOGIN = 'auth/signin',  // Dang nhap investor
    TOKEN = '/token',
    VALIDATE_TOKEN = 'auth/validate_token',  // validate token
    REFRESH_TOKEN = 'auth/resend_token',     // gui lai token
    ACTIVE_USER = '/auth/active_account',  // kich hoat tai khoan
    USER_INFO = '/user/info_investor', // thông tin tài khoản investor
    REGISTER = '/auth/app_register', // đăng kí tài khoản
    ACTIVE_AUTH = '/auth/auth_register', // kích hoạt tài khoản: OTP
    RESEND_OTP = '/auth/resend_token', // gửi lại otp
    SAVE_TOKEN_DEVICE = 'user/save_device_token_user', // luu token device
    CLEAR_TOKEN_DEVICE = 'user/delete_device_token_user', // xoa token thiet bi
    CHANEL = '/configuration_formality/get_utm_source', // list danh sách kênh đăng kí
    UPDATE_USER_INFO = 'user/update_profile_investor', // update user account
    CHANGE_NEW_PWD = '/user/change_password_user', // change mật khẩu mới
    LOGOUT = '/api/Logout', // logout
    LOGIN_THIRD_PARTY = 'auth/login', // login bên thứ 3  facebook, google, apple,
    CONFIRM_PHONE_NUMBER = 'auth/update_phone_number', // xác thực số điện thoại
    ACTIVE_ACCOUNT_SOCIAL = 'auth/auth_otp_active', // active tài khoản sau khi xác thực OTP
    OTP_RESET_PWD = '/auth/reset_password', // otp reset pwd
    UPDATE_PWD = 'auth/new_password',
    LINK_SOCIAL = '/user/link_social',
    IDENTITY_VERIFY = '/user/identity_verification', //  xac thuc CCCD/CMT

    // upload ảnh

    UPLOAD_HTTP_IMAGE = '/user/upload',

    // history
    HISTORY = '/investor/history_transaction_investor',
    // DETAILS_HISTORY = '/transaction/detail_transaction',

    // notification
    NOTIFICATION = '/user/get_notification_user',
    CREATE_FCM_TOKEN = 'user/save_device_token_user',
    GET_UNREAD_COUNT_NOTIFICATION = 'user/get_count_notification_user',

    // contracts
    CONTRACTS = 'contract/contract_tempo_by_user', // List danh sách hợp đồng
    CONTRACT_DETAIL = 'contract/tempo_detail', // Chi tiết hợp đồng
    CONTRACT_PAYMENT = 'transaction/getTransactionByUser', // Lịch sử thanh toán của hợp đồng
    DOCUMENT = 'contract/get_image_accurecy', // Danh sách chứng từ
    REQUEST_PAYMENT_MOMO = 'MoMoAppKH/initPayment', // Thanh toán qua MOMO
    REQUEST_PAYMENT_BANK = 'transaction/app_create_transaction',
    TRANSACTION_INFO = 'MoMoAppKH/transactionInfo',
    // service payment
    GET_SERVICE_PROVIDERS = 'service/find_where', // list danh sách nhà cung cấp
    GET_PAYMENT_INFO = 'billingVimo/query_bill', // tìm thông tin hoá đơn
    CREATE_TRANSACTION = 'billingVimo/app_create_transaction_NL', // thanh toán hoá đơn

    // property valuation
    GET_LIST_FORMALITY = 'configuration_formality/get_configuration_formality_app', // list hình thức vay
    GET_LIST_BRAND_NAME = 'property/get_property_parent', // list hãng xe
    GET_LIST_MODEL_NAME = 'property/get_property_model', // list dòng xe
    GET_LIST_PROPERTY_NAME = 'property/get_property_child', // list danh sách tên xe
    GET_LIST_DEPRECIATION_PROPERTY = 'property/get_property', // list danh sách khấu hao
    GET_PRICE_PROPERTY = 'property/getPriceProperty', // định giá tài sản
    GET_LIST_FORMALITY_OF_PAYMENT = 'configuration_formality/get_configuration_type_payment_app', // hình thức vay
    GET_LIST_TIME_LOAN = 'configuration_formality/get_configuration_time_loan_app', // list thời gian vay
    GET_LIST_MAIN_PROPERTY = 'property/get_property_main_new', // list loại tài sản
    GET_LIST_PRODUCT_LOAN = 'property/get_product_loan', // list sản phẩm vay
    CREATE_CONTRACT_LOAN = 'lead/register_loan', // tạo khoản vay

    // Get all store
    GET_ALL_STORE = '/store/get_all', // List danh sách phòng giao dịch
    GET_RATE = '/rating_app/rate_of_satisfaction', // đánh giá ứng dụng

    // link account with payment method
    REQUEST_SEND_VIMO_LINK = 'vimo_link/send_link_vimo',    // gui lien ket vimo
    REQUEST_ACTIVE_VIMO_LINK = 'vimo_link/active_link_vimo',  // active lien ket vimo
    REQUEST_CANCEL_VIMO_LINK = 'vimo_link/unLink_vimo' ,       // huy lien ket vimo
    REQUEST_INFO_VIMO_LINK = 'vimo_link/info_vimo_investor',  // xem thong tin lien ket vimo
    GET_BANK = 'bankNganLuong/get_all',  // lay danh sach tai khoan ngan hang 
    CHOOSE_METHOD_RECEIVE_INTEREST = 'investor/confirm_account_payment',  // chon tai khoan nhan lai (vimo, bank)

    // report 
    GET_YEARS = 'investor/select_year', // get years for report
    GET_QUARTERS = 'investor/select_quarters_the_year', // get quarters for report
    REQUEST_FINANCE_REPORT = 'investor/financial_report' // bao cao tai chinh investor
}

export const PAYMENT_URL = {
    NL_SUCCESSFULLY: `${API_CONFIG.BASE_URL_OLD}/transaction/success`,
    NL_FAILED: `${API_CONFIG.BASE_URL_OLD}/transaction/cancelURL`,
    VIMO_FAILED: `${API_CONFIG.BASE_URL_OLD}/billingVimo/cancelUrl`,
    VIMO_SUCCESSFULLY: `${API_CONFIG.BASE_URL_OLD}/billingVimo/success`
};
