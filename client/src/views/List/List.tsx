import React, { useEffect, useState } from 'react';
import ServerService from 'services/serverService';
import { GameServer } from 'models';
import { Link } from 'react-router-dom';

const List = () => {
    useEffect(() => {
        ServerService.getAvailableServers().then(data => {
            setServers(data.data);
        });
    },[])

    const [servers, setServers] = useState<GameServer[]>([])

    return (
        <div>
            List is working
            {servers.map(server => <Link to={'/list/' + server.id}>{server.title}</Link>)}
        </div>
    );
};

export default List;