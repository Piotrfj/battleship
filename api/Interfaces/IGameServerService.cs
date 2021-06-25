using api.Models;

namespace api.Interfaces
{
    public interface IGameServerService
    {
        GameServer[] GetAllServers();
    }
}