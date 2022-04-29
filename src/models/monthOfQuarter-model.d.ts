export interface MonthReportModel {
    id: number
    quarter: number
    contractNumber: number
    investMount: number
    originAmountEarning: number
    interest: number
    month: string
    year: string
}
export interface QuarterReportModel {
    contractNumber: number
    investMount: number
    originAmountEarning: number
    interest: number,
    quarter: number,
    year: string
    data: MonthReportModel[]
}



export interface OverviewMonthReportModal {
    month: string;
    year: number;
    so_hop_dong_dau_tu: number;
    tong_tien_dau_tu: number;
    tien_goc_thu_ve: number;
    tong_lai_phi: number;
    tong_tien_thu_ve: number;
}

export interface OverviewQuarterReportModal {
    status: number;
    data: OverviewMonthReportModal[];
    total:{
        tong_hop_dong: number;
        tong_tat_ca_tien_dau_tu: number;
        tien_goc_thu_ve: number;
        tong_lai_phi: number;
    }
   
}
