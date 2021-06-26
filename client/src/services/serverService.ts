import axios from 'axios';
import { GameServer } from 'models';
import { BaseRadService } from 'services/baseRadService';

class ServerService extends BaseRadService {
    protected endpoint = '/server';

    public someRequest = () => {
        return axios.get<GameServer[]>(this.getBaseUrl());
    }
}

export default new ServerService();