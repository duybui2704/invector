
import { BaseService } from './base-service';
import { API_CONFIG } from './constants';

export class PaymentMethodServices extends BaseService {

    requestSendLinkVimo = async (type: number, phone: string) => this.api().post(API_CONFIG.REQUEST_SEND_VIMO_LINK, this.buildFormData({
        type,
        phone
    }));

    requestActiveLinkVimo = async (type: number, phone: string, linked_id: string, otp: string) => this.api().post(API_CONFIG.REQUEST_ACTIVE_VIMO_LINK, this.buildFormData({
        type,
        phone,
        linked_id,
        otp
    }));

    requestCancelLinkVimo = async (type: number) => this.api().post(API_CONFIG.REQUEST_CANCEL_VIMO_LINK, this.buildFormData({
        type
    }));

    requestInfoLinkVimo = async (type: number) => this.api().post(API_CONFIG.REQUEST_INFO_VIMO_LINK, this.buildFormData({
        type
    }));

    getBank = async () => this.api().post(API_CONFIG.GET_BANK, this.buildFormData({}));

    requestChoosePaymentReceiveInterest = async (
        type_payment: string,
        bank_name: string,
        bank_account: string,
        name_account: string,
        type_card: number
    ) => this.api().post(API_CONFIG.CHOOSE_METHOD_RECEIVE_INTEREST, this.buildFormData({
        type_payment,  // vimo or bank
        bank_name,
        bank_account,
        name_account,
        type_card
    }));

}

