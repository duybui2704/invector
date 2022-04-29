
import { BaseService } from './base-service';
import { API_CONFIG } from './constants';

export class ReportServices extends BaseService {

    requestFinanceReport = async (
        // type: number,
        quarters: string,
        year: string
    ) => this.api().post(API_CONFIG.CHOOSE_METHOD_RECEIVE_INTEREST, this.buildFormData({
        // type,  
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

