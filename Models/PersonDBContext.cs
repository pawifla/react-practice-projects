using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReactCoreApi.Models
{
    public class PersonDBContext : DbContext
    {
        public DbSet<Person> Persons { get; set; }
        public PersonDBContext(DbContextOptions<PersonDBContext> options) : base(options)
        {

        }
        public List<Person> getPersons() => Persons.ToList(); 
        public void AddPerson(Person person)
        {
            Persons.Add(person);
            this.SaveChanges();
            return;
        }
    }
}
