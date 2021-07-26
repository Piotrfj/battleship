using System;
using System.Collections;
using System.Collections.Generic;
using System.Threading.Tasks;
using api.Interfaces;
using api.Models;
using Microsoft.AspNetCore.SignalR;

namespace api.Hubs
{
    public class ServerHub : Hub
    {
        private readonly IPlayersListService _playersListService;

        public ServerHub(IPlayersListService playersListService)
        {
            _playersListService = playersListService;
        }

        public override async Task OnConnectedAsync()
        {
            var serverId = CurrentServerId;
            _playersListService.AddPlayer(serverId, CurrentUserId);
            await Groups.AddToGroupAsync(CurrentUserId, serverId);
            await Clients.Group(serverId).SendAsync("Joined", _playersListService.GetUserNames(serverId));
        }

        public override async Task OnDisconnectedAsync(Exception exception)
        {
            var serverId = CurrentServerId;
            _playersListService.RemovePlayer(serverId, CurrentUserId);
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, serverId);
            await Clients.Group(serverId).SendAsync("Left", _playersListService.GetUserNames(serverId));
        }

        public async Task SendMessage(string message)
        {
            var serverId = CurrentServerId;
            await Clients.Group(serverId).SendAsync("Message", new ChatMessage()
            {
                Sender = CurrentUserId,
                Text = message
            });
        }

        private string CurrentUserId => Context.ConnectionId;

        private string CurrentServerId => Context.GetHttpContext()?.Request?.Query?["serverId"].ToString();
    }
}