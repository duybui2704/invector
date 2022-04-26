
import { BaseService } from './base-service';
import { API_CONFIG } from './constants';

export class PaymentMethodServices extends BaseService {

    getRate = async (point:any, note?:string) => this.api().post(API_CONFIG.GET_RATE, this.buildFormData({
        point,
        note
    }));

}

