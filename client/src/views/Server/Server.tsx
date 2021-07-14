import {RouteComponentProps} from "react-router-dom";
import ServerService from "../../services/serverService";
import React, {useCallback, useEffect, useState} from "react";
import {ChatMessage} from "../../models";

const Server = (props: RouteComponentProps<any>) => {
    const [isConnected, setIsConnected] = useState<boolean>(false);
    const [players, setPlayers] = useState<string[]>([]);
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [chatInput, setChatInput] = useState<string>('');

    useEffect(() => {
        ServerService.join(props.match.params.id).then(data => setIsConnected(data));
        ServerService.onPlayersListChange(players => setPlayers(players));
        ServerService.onMessageSent(message => setMessages(messages => [...messages, message]));
        return () => ServerService.leave();
    }, [props.match.params.id]);

    const handleInputChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setChatInput(event.target.value);
    }, []);

    const handleKeyDown = useCallback((event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            ServerService.sendMessage(chatInput);
            setChatInput('');
        }
    }, [chatInput]);

    return (
        <div>
            <p>Connected: {String(isConnected)}</p>
            <hr/>
            <p>Players on the server:</p>
            {players?.map(player => <p>{player}</p>)}
            <hr/>
            <p>Chat:</p>
            {messages.map(message => <p>{message.sender}: {message.text}</p>)}
            <input value={chatInput} onChange={handleInputChange} onKeyDown={e => handleKeyDown(e)}/>
        </div>
    );
};

export default Server;