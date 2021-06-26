import { apiUrl } from 'config';

export abstract class BaseRadService {
    protected abstract endpoint: string;

    protected getBaseUrl = () => {
        return apiUrl + this.endpoint;
    }
}