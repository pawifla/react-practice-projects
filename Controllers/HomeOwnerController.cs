using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using ReactCoreApi.Models;

namespace ReactCoreApi.Controllers
{
    [Route("api")]
    [ApiController]
    public class HomeOwnerController : ControllerBase
    {
        private readonly ILogger<HomeOwnerController> _logger;
        private readonly HomeOwnersDBContext _database;
        public HomeOwnerController(ILogger<HomeOwnerController> logger, HomeOwnersDBContext context)
        {
            _logger = logger;
            _database = context;
        }
        [HttpGet]
        [Route("HomeOwners")]
        public List<HomeOwner> GetHomeOwners()
        {
            List<HomeOwner> homeOwners = _database.GetHomeOwners();
            return homeOwners;
        }
        [HttpGet]
        [Route("HomeOwnersReal")]
        public Object GetHomeOwnerss()
        {
            Object homeOwners = _database.GetHomeOwnerss();
            Object stringhomeOwners = _database.GetHomeOwnerss().ToString();
            return homeOwners;
        }
        [HttpGet]
        [Route("GetStates")]
        public List<State> GetStates()
        {
            List<State> states = _database.GetStates();
            return states;
        }
        [HttpPost]
        [Route("CreateHomeOwners")]
        public int AddHomeOwner(HomeOwner homeOwner)
        {
            return _database.AddHomeOwner(homeOwner);
        }
        [HttpPost]
        [Route("GenCities/{stateID}")]
        public List<City> GetCities(string stateID)
        {
            return _database.GenerateCities(stateID);
        }
        [HttpPost]
        [Route("EditHomeOwners")]
        public int EditHomeOwner(HomeOwner homeOwner)
        {
            return _database.EditHomeOwner(homeOwner);
        }
        [HttpDelete]
        [Route("DeleteHomeOwners")]
        public int DeleteHomeOwner(int id)
        {
            return _database.DeleteHomeOwner(id);
        }
    }
}