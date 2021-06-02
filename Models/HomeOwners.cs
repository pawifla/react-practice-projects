using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReactCoreApi.Models
{
    public class HomeOwner
    {
        public int ID { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public int Age { get; set; }
        public int HouseID { get; set; }
        public int LocationID { get; set; }
    }
    public class DisplayHomeOwner
    {
        public int ID { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public int Age { get; set; }
        public string HouseName { get; set; }
        //public string AmenityName { get; set; }
        //public string LocationName { get; set; }
        public string StateName { get; set; }
        public string CityName { get; set; }
    }
    public class House
    {
        public int ID { get; set; }//HomeOwner.HouseID
        public string HouseTypeID { get; set; }
        public int AmenityID { get; set; }
    }
    public class Location
    {
        public int ID { get; set;  }//HomeOwner.LocationID
        public string StateID { get; set;  }
        public string CityID { get; set;  }
    }
    public class State
    {
        public string ID { get; set; }//Location.StateID 
        public string StateName { get; set; }
    }
    public class City
    {
        public string ID { get; set; }//Location.CityID
        public int CityID { get; set; }
        public string CityName { get; set; }
    }
    public class Amenities
    {
        public int ID { get; set; }//Houses.AmenityID
        public string AmenityName { get; set; }
    }
    public class HouseSpecs
    {
        public int ID { get; set; }
        public string HouseTypeName { get;set; }
    }
}
