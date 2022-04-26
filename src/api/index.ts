import { AuthServices } from './auth-services';
import { CommonServices } from './common-services';
import { HistoryServices } from './history-service';
import { PaymentMethodServices } from './payment-method-services';

export class ApiServices {
    auth = new AuthServices();
    
    common = new CommonServices();

    history = new HistoryServices();

    paymentMethod = new PaymentMethodServices();

}
