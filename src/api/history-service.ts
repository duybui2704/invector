import { BaseService } from './base-service';
import { API_CONFIG } from './constants';

export class HistoryServices extends BaseService {

    getHistory = async (fdate: string, tdate: string, option: string) => this.api().post(API_CONFIG.HISTORY, this.buildFormData({
        fdate,          // ngay tim kiem
        tdate,          // ngay ket thuc
        option      // all:tat ca, investor: tien ra, pay: tien vao
    }));
}
