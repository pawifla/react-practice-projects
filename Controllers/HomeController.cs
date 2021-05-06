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
        [HttpPost]
        [Route("Create")]
        public int CreatePerson (Person person)
        {
            //see if convert works.
          return Convert.ToInt16(_database.addPerson(person));
        }
        [HttpPost]
        [Route("Edit")]
        public bool EditPerson(Person person)
        {
            return Convert.ToBoolean(_database.editPerson(person));
        }

        [HttpDelete]
        [Route("Delete/{id}")]
        public bool DeletePerson(int id)
        {
            return Convert.ToBoolean(_database.deletePerson(id));
        }

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