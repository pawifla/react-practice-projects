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
        public int addPerson(Person person)
        {
            Persons.Add(person);
            this.SaveChanges();
            return 1;
        }
        public int editPerson(Person person)
        {
            var personToEdit = Persons.Where(x => x.PersonID == person.PersonID).ToList().FirstOrDefault();
            Persons.Update(personToEdit);
            this.SaveChanges();
            return 1;
        }
        public int deletePerson(int id)
        {
            var personToDelete = Persons.Where(x => x.PersonID == id).ToList().FirstOrDefault();
            Persons.Remove(personToDelete);
            this.SaveChanges();
            return 1;
        }
    }
}
