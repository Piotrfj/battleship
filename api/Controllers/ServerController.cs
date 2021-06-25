using api.Interfaces;
using api.Models;
using Microsoft.AspNetCore.Mvc;

namespace DefaultNamespace
{
    [Route("api/[controller]")]
    [ApiController]
    public class ServerController : Controller
    {
        private readonly IGameServerService _gameServerService;

        public ServerController(IGameServerService gameServerService)
        {
            _gameServerService = gameServerService;
        }

        [HttpGet]
        [Route("all")]
        public GameServer[] All()
        {
            return _gameServerService.GetAllServers();
        }
    }
}