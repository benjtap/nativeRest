using Amazon.Auth.AccessControlPolicy;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using MongoDB.Bson.IO;
using SelfApiproj.Repository;
using System.Collections;
using System.Net;

using Webhttp.Models;

namespace Webhttp.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class WebhttpController : ControllerBase
    {
      //  private readonly ILogger logger;

        private static readonly string[] Summaries = new[]
        {
                "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
            };

       // MongoProvider _mongo;

        private readonly IMongoRepository _mongo;
        public WebhttpController(IMongoRepository mongo)
        {
            _mongo = mongo;
            
        }


        [HttpGet]
        [Route("test")]
        public string Test()
        {

            return "test";
        }



        

        [HttpPost]
        [Route("createAudiogroups")]
        public async Task<IActionResult> createAudiogroups(createAudiogroupPost post)
        {
            string id = "";
            var principal = HttpContext.User;
            if (principal?.Claims != null)
            {

                var claim = principal.Claims.FirstOrDefault();

                id = claim.Value;
            }

               await _mongo.createAudiogroup(post, id);
            return Ok();
        }


        [HttpPost]
        [Route("creategroups")]
        public async Task<IActionResult> creategroups(creategroupsPost post)
        {
            string id = "";
            var principal = HttpContext.User;
            if (principal?.Claims != null)
            {

                var claim = principal.Claims.FirstOrDefault();

                 id = claim.Value;
            }

            creategroupsPostui mygroup = new creategroupsPostui
            {
                uid = id,
                name= post.name

            };

            await _mongo.CreategroupsPost(mygroup);
            return Ok();
        }


        [HttpPost]
        [Route("bulkcontacts")]
        public async Task<IActionResult> bulkcontacts(List<createcontactsPost> post)
        {

          
            var principal = HttpContext.User;
            string id = "";
            if (principal?.Claims != null)
            {

                var claim = principal.Claims.FirstOrDefault();

                 id = claim.Value;
            }

            List<createcontactsPostUid> lst = new List<createcontactsPostUid>();

            foreach (createcontactsPost item in post)
            {
                createcontactsPostUid mycontact = new createcontactsPostUid
                {
                    uid = id,
                    name = item.name,
                    phone = item.phone

                };
                lst.Add(mycontact);

            }


            await _mongo.bulkcontacts(lst);
            return Ok();
        }

        [HttpPost]
        [Route("bulkgroupcontacts")]
        public async Task<IActionResult> bulkgroupcontacts(createcontactsgroupPost post)
        {
            var principal = HttpContext.User;
            string id = "";


            if (principal?.Claims != null)
            {

                var claim = principal.Claims.FirstOrDefault();

                id = claim.Value;
            }


           await _mongo.bulkgroupcontacts(post,id);
            return Ok();
        }

        [HttpPost]
        [Route("bulkdeletegroupcontacts")]
        public async Task<IActionResult> bulkdeletegroupcontacts(createcontactsgroupPost post)
        {
            var principal = HttpContext.User;
            string id = "";


            if (principal?.Claims != null)
            {

                var claim = principal.Claims.FirstOrDefault();

                id = claim.Value;
            }


            await _mongo.bulkdeletegroupcontacts(post, id);
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
        [Route("deletegroup")]
        public async Task<IActionResult> deletegroup(deletegroup post)
        {
            
            await _mongo.deletegroupPost(post);
            return Ok();
        }

        


        [HttpPost]
        [Route("getaudiogroup")]
        public async Task<IActionResult> getaudiogroup(getAudiobyidReq post)
        {
            var principal = HttpContext.User;
            string id = "";


            if (principal?.Claims != null)
            {

                var claim = principal.Claims.FirstOrDefault();

                id = claim.Value;
            }

            AudiogroupMongo res = await _mongo.getAudiobyidPost(post, id); ;
         //  
            return Ok(res);
        }

        [HttpPost]
        [Route("getgroupcontacts")]
        public async Task<IActionResult> getgroupcontacts(createcontactsgroupPost post)
        {

            var principal = HttpContext.User;
            string id = "";


            if (principal?.Claims != null)
            {

                var claim = principal.Claims.FirstOrDefault();

                id = claim.Value;
            }

            IEnumerable res = await _mongo.getgroupcontacts(post,id);
            return Ok(res);
        }

        [HttpGet]
        [Route("getcontacts")]
        public async Task<IActionResult> getcontacts()
        {
            
            var principal = HttpContext.User;
            string id = "";


            if (principal?.Claims != null)
            {

                var claim = principal.Claims.FirstOrDefault() ;

                 id = claim.Value;
            }

            IEnumerable res = await _mongo.GetcontactsPost(id);
          
            return Ok(res);
        }

        [HttpGet]
        [Route("getaudios")]
        public async Task<IActionResult> getaudios()
        {
            var principal = HttpContext.User;
            string id = "";


            if (principal?.Claims != null)
            {

                var claim = principal.Claims.FirstOrDefault();

                id = claim.Value;
            }



            IEnumerable res = await _mongo.GetAudio(id);
            return Ok(res);
        }


        [HttpGet]
        [Route("getgroups")]
        public async Task<IActionResult> getgroups()
        {
            var principal = HttpContext.User;
            string id = "";


            if (principal?.Claims != null)
            {

                var claim = principal.Claims.FirstOrDefault();

                id = claim.Value;
            }

            IEnumerable res = await _mongo.getgroupsPost(id);

            return Ok(res);
        }

        [HttpPost]
        [Route("uploadAudio")]
        public IActionResult uploadAudio([FromForm] FormDataAudio formData)
        {
            var principal = HttpContext.User;
            string id = "";


            if (principal?.Claims != null)
            {

                var claim = principal.Claims.FirstOrDefault();

                id = claim.Value;
            }
            var Audioname = formData.Audioname;
                var avatarFile = formData.fileAudioname;

                string fileNameWithPath = "c://Upload//" + formData.fileAudioname.FileName;

                using (var stream = new FileStream(fileNameWithPath, FileMode.Create))
                {
                    avatarFile.CopyTo(stream);
                }

                createAudio postM = new createAudio
                {
                    uid = id,
                    name = Audioname,
                    filename = formData.fileAudioname.FileName

                };

                _mongo.CreateAudio(postM);

          
          
            return Ok();

           


        }
    }

}

