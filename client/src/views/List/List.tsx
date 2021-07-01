import React, { useEffect, useState } from 'react';
import ServerService from 'services/serverService';
import { GameServer } from 'models';

const List = () => {
    useEffect(() => {
        ServerService.someRequest().then(data => {
            setServers(data.data);
        });
    },[])

    const [servers, setServers] = useState<GameServer[]>([])

    return (
        <div>
            List is working
            {servers.map(server => <p>{server.title}</p>)}
        </div>
    );
};

export default List;