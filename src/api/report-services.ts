
import { BaseService } from './base-service';
import { API_CONFIG } from './constants';

export class ReportServices extends BaseService {

    requestFinanceReport = async (
        quarters: string,
        year: string
    ) => this.api().post(API_CONFIG.REQUEST_FINANCE_REPORT, this.buildFormData({
        quarters,
        year
    }));

    getYear =async ( type:number ) => this.api().post(API_CONFIG.GET_YEARS, this.buildFormData({
        type
    }));

    getQuarters =async ( type:number ) => this.api().post(API_CONFIG.GET_QUARTERS, this.buildFormData({
        type
    }));
}

