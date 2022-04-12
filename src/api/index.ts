import { AuthServices } from './auth-services';
import { CommonServices } from './common-services';
import { HistoryServices } from './history-service';

export class ApiServices {
    auth = new AuthServices();
    
    common = new CommonServices();

    history = new HistoryServices();

}
