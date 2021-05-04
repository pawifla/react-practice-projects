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
    [ApiController]
    [Route("api")]
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private readonly PersonDBContext _database;

        public HomeController(ILogger<HomeController> logger, PersonDBContext context)
        {
            _logger = logger;
            _database = context;

        }

        [HttpGet]
        [Route("People")]
        public List<Person> GetPeople()
        {
            List<Person> Persons = _database.getPersons(); 
            return Persons;
        }       
        // GET: api
        // POST: api/Create
        //There are no views so none of the views work.
        [HttpPost]

        // GET: Home/Edit/5
        public ActionResult Edit(int id)
        {
            return View();
        }

        // POST: Home/Edit/5
        [HttpPost]
        [ValidateAntiForgeryToken]
      
        // GET: Home/Delete/5
        public ActionResult Delete(int id)
        {
            return View();
        }
    }
}