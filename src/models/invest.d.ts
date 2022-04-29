export interface RootObject {
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
    trang_thai_hop_dong: string
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
