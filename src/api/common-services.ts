
import { BaseService } from './base-service';
import { API_CONFIG } from './constants';

export class CommonServices extends BaseService {
    getNews = async () => this.api().post(API_CONFIG.GET_NEWS, {});

    getListInvest = async () => this.api().post(API_CONFIG.CONTRACTS_HOT, {});

    getContractsDash = async () => this.api().post(API_CONFIG.CONTRACTS_DASH, {});

    getInsurances = async () => this.api().post(API_CONFIG.GET_INSURANCES, {});

    getBanners = async () => this.api().post(API_CONFIG.GET_BANNERS, {});


    getAppInReview = async () => this.api().post(API_CONFIG.CHECK_APP_REVIEW);
}

