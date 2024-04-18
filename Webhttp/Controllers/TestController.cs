using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Hosting;
using MongoDB.Bson.IO;
using System.Collections;
using System.Net;
using Webhttp.DBProviders;
using Webhttp.Models;

namespace Webhttp.Controllers
{
     [ApiController]
    [Route("[controller]")]
    public class WebhttpController : ControllerBase
    {
        private readonly ILogger logger;

        private static readonly string[] Summaries = new[]
        {
                "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
            };

        MongoProvider _mongo;
        public WebhttpController(MongoProvider mongo, ILogger<WebhttpController> logger)
        {
            _mongo = mongo;
            this.logger = logger;
        }


        [HttpGet]
        [Route("test")]
        public string Test()
        {

            return "test";
        }



        [HttpPost]
        [Route("createcontacts")]
        public async Task<IActionResult> createcontacts(createcontactsPost post)
        {

            await _mongo.CreatecontactsPost(post);
            return Ok();
        }

        

        [HttpPost]
        [Route("createAudiogroups")]
        public async Task<IActionResult> createAudiogroups(createAudiogroupPost post)
        {

            await _mongo.createAudiogroup(post);
            return Ok();
        }


        [HttpPost]
        [Route("creategroups")]
        public async Task<IActionResult> creategroups(creategroupsPost post)
        {

            await _mongo.CreategroupsPost(post);
            return Ok();
        }


        [HttpPost]
        [Route("bulkcontacts")]
        public async Task<IActionResult> bulkcontacts(List<createcontactsPost> post)
        {

            await _mongo.bulkcontacts(post);
            return Ok();
        }

        [HttpPost]
        [Route("bulkgroupcontacts")]
        public async Task<IActionResult> bulkgroupcontacts(createcontactsgroupPost post)
        {

            await _mongo.bulkgroupcontacts(post);
            return Ok();
        }

        [HttpPost]
        [Route("bulkdeletegroupcontacts")]
        public async Task<IActionResult> bulkdeletegroupcontacts(createcontactsgroupPost post)
        {

            await _mongo.bulkdeletegroupcontacts(post);
            return Ok();
        }

        [HttpPost]
        [Route("deleteAudiorecord")]
        public async Task<IActionResult> deleteAudiorecordPost(deleteAudioPost post)
        {

            await _mongo.deleteAudiorecordPost(post);
            return Ok();
        }
        

        [HttpPost]
        [Route("getaudiogroup")]
        public async Task<IActionResult> getaudiogroup(getAudiobyidReq post)
        {

            AudiogroupMongo res =await _mongo.getAudiobyidPost(post);
            return Ok(res);
        }

        [HttpPost]
        [Route("getgroupcontacts")]
        public async Task<IActionResult> getgroupcontacts(createcontactsgroupPost post)
        {

            IEnumerable res = await _mongo.getgroupcontacts(post);
            return Ok(res);
        }

        [HttpGet]
        [Route("getcontacts")]
        public async Task<IActionResult> getcontacts()
        {
            
                IEnumerable res = await _mongo.GetcontactsPost();
          
            return Ok(res);
        }

        [HttpGet]
        [Route("getaudios")]
        public async Task<IActionResult> getaudios()
        {

            IEnumerable res = await _mongo.GetAudio();
            return Ok(res);
        }


        [HttpGet]
        [Route("getgroups")]
        public async Task<IActionResult> getgroups()
        {

            IEnumerable res = await _mongo.getgroupsPost();

            return Ok(res);
        }

        [HttpPost]
        [Route("uploadAudio")]
        public IActionResult uploadAudio([FromForm] FormDataAudio formData)
        {
            logger.Log(LogLevel.Information, "log FormDataAudio");
            try
            {
                var Audioname = formData.Audioname;
                var avatarFile = formData.fileAudioname;

                string fileNameWithPath = "c://Upload//" + formData.fileAudioname.FileName;

                using (var stream = new FileStream(fileNameWithPath, FileMode.Create))
                {
                    avatarFile.CopyTo(stream);
                }

                createAudio postM = new createAudio
                {
                    name = Audioname,
                    filename = formData.fileAudioname.FileName

                };

                _mongo.CreateAudio(postM);

            }
            catch (Exception ex)
            {

                logger.Log(LogLevel.Error, ex.Message);
            } 
            // Access the form fields and files
            
          
            return Ok();

            // Process the form data as needed
            // ...

           
        }
    }

}

