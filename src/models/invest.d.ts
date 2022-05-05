export interface PackageInvest {
    id: number;
    ma_hop_dong: string;
    so_tien_dau_tu: string;
    lai_hang_thang: string;
    ngay_dau_tu: string;
    ki_han_dau_tu: string;
    tong_lai_du_kien: string;
    tong_lai_da_nhan: string;
    ngay_dao_han: string;
    hinh_thuc_tra_lai: string;
    ti_le_lai_suat_hang_thang: string;
    trang_thai_hop_dong: string;
    ngay_dao_han_du_kien: string;
    tong_lai_nhan_duoc: string;
    thoi_gian_dau_tu: string;
}

export interface Notify {
    id: number;
    action: string;
    status: number;
    code_contract?: any;
    link?: any;
    message: string;
    note: string;
    created_by: string;
    user_id: number;
    created_at: number;
    updated_at: number;

}
export interface InvestorInfoModel {
    avatar: string;
    avatar_user: string
    card_back: string
    email: string
    front_facing_card: string
    full_name: string
    identity: string
    phone_number: string
    tinh_trang: StatusInvestModel
    tra_lai: InterestPaymentModel
}

export interface StatusInvestModel {
    status: string
    color: string
    auth: boolean
}
export interface InterestPaymentModel {
    type_interest_receiving_account: string
    interest_receiving_account: string
    bank_name: string
    name_bank_account: string
    type_card: string
}


