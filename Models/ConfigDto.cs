using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MatchDay.Models
{
    public class ConfigDto
    {
        public string TeamName { get; set; }
        public string Herb { get; set; }
        public string Tshirt { get; set; }
        public string GoalKeeper { get; set; }
        public string Sponsors { get; set; }
        public ICollection<Person> Persons { get; set; }
    }
}
