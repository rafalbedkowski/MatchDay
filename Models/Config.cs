using System.Collections;
using System.Collections.Generic;
using MatchDay.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace MatchDay.Models
{
    public class Config
    {
        public IFormFile Crest { get; set; }
        public IFormFile Player { get; set; }
        public IFormFile Goalkeeper { get; set; }
        public IFormFile Sponsors { get; set; }
    }
}