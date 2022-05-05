import RsaUtils from '@/utils/RsaUtils';
import { BaseService } from './base-service';
import { API_CONFIG } from './constants';

export class InvestServices extends BaseService {
    getInvestDetail = async (id: string) => this.api().post(API_CONFIG.CONTRACT_DETAIL, this.buildFormData({ id }));

    getInvestOtp = async (id: string) => this.api().post(API_CONFIG.CONTRACT_OTP, this.buildFormData({ id }));

    getInvestHaveContract = async (id: string) => this.api().post(API_CONFIG.CONTRACT_HAVE_INVESTED, this.buildFormData({ id }));

    getInvestAll = async () => this.api().post(API_CONFIG.CONTRACT_ALL, this.buildFormData({}));

    getInvesting = async () => this.api().post(API_CONFIG.CONTRACT_ALL, this.buildFormData({}));

    getDetailInvestNow = async (id: string) => this.api().post(API_CONFIG.CONTRACT_DETAIL_INVEST_NOW, this.buildFormData({ id }));

    getNotify = async () => this.api().post(API_CONFIG.NOTIFICATION, this.buildFormData({}));

    getNotifyOnRead = async () => this.api().post(API_CONFIG.GET_ONREAD_COUNT_NOTIFICATION, this.buildFormData({}));

    getNotifyUpdateRead = async (id: number) => this.api().post(API_CONFIG.NOTIFY_UPDATE_READ, this.buildFormData({ id }));

}
