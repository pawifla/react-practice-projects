using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReactCoreApi.Models
{
    public class HomeOwnersDBContext : DbContext
    {
        public DbSet<HomeOwner> HomeOwners { get; set; }
        public DbSet<House> HomeOwners_Houses { get; set; }
        public DbSet<HouseSpecs> HomeOwners_HouseLUT { get; set; }
        public DbSet<Amenities> HomeOwners_HouseAmenitiesLUT { get; set; }
        public DbSet<Location> HomeOwners_Location { get; set; }
        public DbSet<State> HomeOwners_StateLUT { get; set; }
        public DbSet<City> HomeOwners_CityLUT { get; set; }
        public DbSet<DisplayHomeOwner> displayHomeOwners { get; set; }
        //good for now, need to add all methods to insert house and location data.
        //I don't think you need to hit cities, satates or amenities bc they are luts.
        //Maybe wont need to grab any of them...
        public HomeOwnersDBContext(DbContextOptions<HomeOwnersDBContext> options) : base(options) { }

        public List<DisplayHomeOwner> GetHomeOwnerss()
        {
            var sqlQuery = displayHomeOwners.FromSql("Select HomeOwners.ID, FirstName, LastName, Age, (Select CityName from HomeOwners_CityLUT Where CityID = Loc.CityID) CityName," +
                                   " (Select StateName from HomeOwners_StateLUT Where ID = Loc.StateID) StateName, " +
                                   " (Select HouseType From HomeOwners_HouseLUT Where HouseTypeID = House.HouseTypeID) HouseName " +
                                   " From HomeOwners " +
                                   " Join HomeOwners_Location Loc on HomeOwners.LocationID = Loc.ID " +
                                   " Join HomeOwners_Houses House on HomeOwners.HouseID = House.ID").ToList();
                        

          
            //var query = from owner in HomeOwners
            return (List<DisplayHomeOwner>)sqlQuery;
        }
        public List<HomeOwner> GetHomeOwners() {
            return HomeOwners.ToList();
        }

        public int AddHomeOwner(HomeOwner homeOwner)
        {
            HomeOwners.Add(homeOwner);
            return this.SaveChanges();
        }
        public int EditHomeOwner(HomeOwner homeOwner)
        {
            var homeOwnerToEdit = HomeOwners.Where(x => x.ID == homeOwner.ID).ToList().FirstOrDefault();
            homeOwnerToEdit.FirstName = homeOwner.FirstName;
            homeOwnerToEdit.LastName = homeOwner.LastName;
            homeOwnerToEdit.Age = homeOwner.Age;
            homeOwnerToEdit.HouseID = homeOwner.ID;
            homeOwnerToEdit.LocationID = homeOwner.ID;
            //for now just set the house and location id the same as the person.
            return this.SaveChanges();
        }
        public int DeleteHomeOwner(int id)
        {
            HomeOwners.Remove(HomeOwners.Where(x => x.ID == id).ToList().FirstOrDefault());
            return this.SaveChanges();
        }
        public List<State> GetStates()
        {
            return HomeOwners_StateLUT.ToList();
        }
        public List<City> GenerateCities(string stateID)
        {
            List<City> cList = HomeOwners_CityLUT
                .Where(x=> x.ID == stateID)
                .GroupBy(x => x)
                .SelectMany(x=> x).ToList();
            return cList;
        }

    }
}
