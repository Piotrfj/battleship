using System.Linq;
using api.Interfaces;
using api.Models;

namespace api.Services
{
    public class StaticGameServerService : IGameServerService
    {
        private const int ServersAmount = 5;

        public GameServer[] GetAllServers()
        {
            return Enumerable
                .Range(1, ServersAmount)
                .Select(id => new GameServer {Id = id, Title = "Game server " + id})
                .ToArray();
        }
    }
}