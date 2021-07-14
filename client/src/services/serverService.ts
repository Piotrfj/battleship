import axios from 'axios';
import {ChatMessage, GameServer} from 'models';
import {BaseRadService} from 'services/baseRadService';
import {HubConnectionBuilder, LogLevel, HubConnection} from "@microsoft/signalr";

class ServerService extends BaseRadService {
    private connection?: HubConnection;
    protected endpoint = '/server';

    public getAvailableServers = () => {
        return axios.get<GameServer[]>(this.getBaseUrl());
    }

    public join = async (serverId: string) => {
        this.connection = this.buildConnection(serverId);
        try {
            await this.connection.start();
            return true;
        } catch {
            return false;
        }
    }

    public onPlayersListChange = (callback: (playersList: string[]) => void) => {
        this.connection?.on('Joined', callback);
        this.connection?.on('Left', callback);
    }

    public onMessageSent = (callback: (message: ChatMessage) => void) => {
        this.connection?.on('Message', callback);
    }

    public leave = () => {
        this.connection?.off('Joined');
        this.connection?.off('Left');
        this.connection?.off('Message');
        this.connection?.stop();
    }

    public sendMessage = (message: string) => {
        this.connection?.send('SendMessage', message);
    }

    private buildConnection = (serverId: string) => {
        return new HubConnectionBuilder()
            .withUrl(`${this.getBaseUrl()}/hub?serverId=${serverId}`)
            .configureLogging(LogLevel.Information)
            .build();
    }
}

export default new ServerService();