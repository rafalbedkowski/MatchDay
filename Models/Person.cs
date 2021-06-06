using Microsoft.AspNetCore.Mvc;

namespace MatchDay.Models
{
    public class Person
    {
        public int Number { get; set; }

        public string Name { get; set; }

        public bool Goalkeeper { get; set; }
    }
}