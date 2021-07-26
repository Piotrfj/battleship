using System.Collections.Generic;
using api.Interfaces;

namespace api.Services
{
    public class PlayersListService : IPlayersListService
    {
        private Dictionary<string, List<string>> _groupMembers = new();

        public void AddPlayer(string serverId, string userName)
        {
            if (!_groupMembers.ContainsKey(serverId))
            {
                _groupMembers[serverId] = new List<string>();
            }

            _groupMembers[serverId].Add(userName);
        }

        public void RemovePlayer(string serverId, string userName)
        {
            _groupMembers[serverId]?.Remove(userName);
        }

        public IEnumerable<string> GetUserNames(string serverId)
        {
            return _groupMembers[serverId];
        }
    }
}