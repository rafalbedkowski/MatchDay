using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using MatchDay.Models;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using System.IO;
using Microsoft.AspNetCore.Hosting;

namespace MatchDay.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class MatchDayController : ControllerBase
    {
        private readonly IWebHostEnvironment _webHostEnvironment;
        private const string DefaultPath = "Teams";
        private const string DefaultFile = "default.json";
        private const string DefaultExtension = ".json";

        public MatchDayController(IWebHostEnvironment webHostEnvironment)
        {
            _webHostEnvironment = webHostEnvironment;
        }

        [HttpGet("getconfig")]
        public IActionResult GetConfig()
        {
            var data = ReadFile(null, DefaultFile);

            if (data != null) return Ok(data);
            return NotFound();
        }

        [HttpGet("getconfig/{userId}")]
        public IActionResult GetConfig([FromRoute] string userId)
        {
            var data = ReadFile(userId, userId + DefaultExtension);

            if (data != null) return Ok(data);
            return NotFound();
        }

        [HttpPost("update/{userId}")]
        public async Task<IActionResult> Update([FromForm] Config configFile, [FromForm] string persons, string userId)
        {
            var configDto = new ConfigDto();
            var configOld = new ConfigDto();

            var data = ReadFile(userId, userId + DefaultExtension);
            if (data != null) configOld = JsonConvert.DeserializeObject<ConfigDto>(data);

            var path = GetPath(userId);

            if (configFile != null)
            {
                configDto.Herb = await SaveImageFile(configFile.Crest, path, userId) ?? configOld.Herb;
                configDto.Tshirt = await SaveImageFile(configFile.Player, path, userId) ?? configOld.Tshirt;
                configDto.GoalKeeper = await SaveImageFile(configFile.Goalkeeper, path, userId) ?? configOld.GoalKeeper;
                configDto.Sponsors = await SaveImageFile(configFile.Sponsors, path, userId) ?? configOld.Sponsors;
            }

            if (persons != null)
                configDto.Persons = JsonConvert.DeserializeObject<ICollection<Person>>(persons);

            var JsonFile = JsonConvert.SerializeObject(configDto);
            var fileToSave = Path.Combine(path, userId + DefaultExtension);
            SaveJsonFile(JsonFile, fileToSave);
            CleanTeamFile(path, userId);
            return Ok();
        }

        private async Task<string>  SaveImageFile(IFormFile file, string path, string userId)
        {
            if (file != null )
                if (file.Length > 0)
                    {
                    string extension = Path.GetExtension(file.FileName);
                    string fileName = Path.ChangeExtension(
                        Path.GetRandomFileName(),
                        extension
                    );

                    var filePath = Path.Combine(path, fileName);
                    if (System.IO.File.Exists(filePath))
                        System.IO.File.Delete(filePath);

                    using (var stream = System.IO.File.Create(filePath))
                    {
                        await file.CopyToAsync(stream);
                    }
                    return "/Teams/" + userId +"/" + fileName ;
            }
            return null;
        }

        private void SaveJsonFile(string file, string filePath)
        {
            try
            {
                StreamWriter confFile = new StreamWriter(filePath, false);
                confFile.Write(file);
                confFile.Close();
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
        }

        private void CleanTeamFile(string path, string userId)
        {
            var configPath = Path.Combine(path, userId + ".json");

            try
            {
                StreamReader confFile = new StreamReader(configPath);
                var read = confFile.ReadToEnd();
                confFile.Close();

                var confModel = new ConfigDto();
                if (confFile != null)
                    confModel = JsonConvert.DeserializeObject<ConfigDto>(read);

                var fileList = Directory.GetFiles(path);

                for(var i=0; i< fileList.Length;i++)
                {
                    if (
                        Path.GetFileName(fileList[i]) != Path.GetFileName(confModel.GoalKeeper) &
                        Path.GetFileName(fileList[i]) != Path.GetFileName(confModel.Tshirt) &
                        Path.GetFileName(fileList[i]) != Path.GetFileName(confModel.Sponsors) &
                        Path.GetFileName(fileList[i]) != Path.GetFileName(confModel.Herb) &
                        fileList[i] != Path.Combine(path, userId + ".json")
                        )
                        System.IO.File.Delete(fileList[i]);
                }
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
        }

        private string ReadFile(string userId, string file)
        {
            var path = GetPath(userId);
            var filePath = Path.Combine(path, file);
            var fileExist = System.IO.File.Exists(filePath);

            if (!fileExist)
                return null;

            try
            {
                StreamReader confFile = new StreamReader(filePath);
                var read = confFile.ReadToEnd();
                confFile.Close();
                return read;
            }
            catch (Exception e)
            {
               throw new Exception(e.Message);
            }
        }

        private string GetPath(string userId)
        {
            if (userId == null) return Path.Combine(_webHostEnvironment.WebRootPath, DefaultPath);

            string webRootPath = Path.Combine(_webHostEnvironment.WebRootPath, DefaultPath, userId);
            bool directoryExist = Directory.Exists(webRootPath);

            if (!directoryExist)
                Directory.CreateDirectory(webRootPath);

            return webRootPath;
        }
    }
}
