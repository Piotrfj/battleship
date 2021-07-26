using System.Collections.Generic;

namespace api.Interfaces
{
    public interface IPlayersListService
    {
        public void AddPlayer(string serverId, string userName);

        public void RemovePlayer(string serverId, string userName);

        public IEnumerable<string> GetUserNames(string serverId);
    }
}