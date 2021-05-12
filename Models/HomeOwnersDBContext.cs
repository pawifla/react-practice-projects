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
            //just make a stored procedure

            //Amenities will need to be a list.
        //    var query = (from O in HomeOwners
        //                 join Location L in HomeOwners_Location
        //                 on O.LocationID equals L.ID
        //                 join House H in HomeOwners_Houses
        //                 on O.HouseID equals H.ID
        //                 join State S in HomeOwners_StateLUT
        //                 on L.StateID equals S.ID
        //                 join City C in HomeOwners_CityLUT
        //                 on L.CityID equals C.ID
        //                 join Amenities A in HomeOwners_HouseAmenitiesLUT
        //                 on H.AmenityID equals A.ID
        //                 join HouseSpecs HS in HomeOwners_HouseLUT
        //                 on H.HouseTypeID equals HS.HouseTypeName
        //                 where O.HouseID == H.ID && O.LocationID == L.ID
        //                 select new DisplayHomeOwner { FirstName = O.FirstName, LastName = O.LastName,
        //                     Age = (O.Age).ToString(), LocationName = C.CityName + ", " + S.StateName,
        //                     AmenityName = A.AmenityName, HouseName = HS.HouseTypeName
        //                 }).ToList();

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
                .GroupBy(x => x.ID)
                .SelectMany(x=> x).ToList();
            return cList;
        }

    }
}
