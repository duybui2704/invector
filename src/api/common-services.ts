
import { BaseService } from './base-service';
import { API_CONFIG } from './constants';

export class CommonServices extends BaseService {

    getListInvest = async () => this.api().post(API_CONFIG.CONTRACTS_HOT, {});

    getContractsDash = async () => this.api().post(API_CONFIG.CONTRACTS_DASH, {});

    getBanners = async () => this.api().post(API_CONFIG.GET_BANNERS, {});

    getAppInReview = async () => this.api().post(API_CONFIG.CHECK_APP_REVIEW);
}

