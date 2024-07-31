
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

using SelfApiproj.Repository;
using System.Collections;


using Webhttp.Models;
using static MongoDB.Driver.WriteConcern;

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





        //[HttpPost]
        //[Route("createAudiogroups")]
        //public async Task<IActionResult> createAudiogroups(createAudiogroupPost post)
        //{
        //    string id = "";
        //    var principal = HttpContext.User;
        //    if (principal?.Claims != null)
        //    {

        //        var claim = principal.Claims.FirstOrDefault();

        //        id = claim.Value;
        //    }

        //       await _mongo.createAudiogroup(post, id);
        //    return Ok();
        //}
        //[HttpPost]
        //[Route("creategrouptiming")]
        //public async Task<IActionResult> creategrouptiming(creategrouptimingPost post)
        //{
        //    string id = "";
        //    var principal = HttpContext.User;
        //    if (principal?.Claims != null)
        //    {

        //        var claim = principal.Claims.FirstOrDefault();

        //        id = claim.Value;
        //    }

        //    await _mongo.createTiminggroup(post, id);
        //    return Ok();
        //}

        [HttpGet]
        [Route("getappliTiming")]
        public async Task<IActionResult> getappliTiming()
        {
            Dictionary<string, HashSet<getappliTiming>> res = null;
            var principal = HttpContext.User;
            string id = "";
            if (principal?.Claims != null)
            {

                var claim = principal.Claims.FirstOrDefault();

                id = claim.Value;
            }

            try
            {
                res = await _mongo.getApplicationtiming(id);
                return Ok(res);
            }
            catch (Exception ex )
            {
                string message = ex.Message;
                return Ok(res);
            }
          
            
          
         
        }


        [HttpPost]
        [Route("getMenu")]
        public async Task<IActionResult> getMenu(getMenuPost post)
        {

            var principal = HttpContext.User;
            string id = "";


            if (principal?.Claims != null)
            {

                var claim = principal.Claims.FirstOrDefault();

                id = claim.Value;
            }

            menuPostMongo res = await _mongo.GetMenu(post.filename,id);

            return Ok(res);
        }

        [HttpPost]
        [Route("updatemenu")]
        public async Task<IActionResult> updatemenu(createmenuPost post)
        {
            string id = "";
            var principal = HttpContext.User;
            if (principal?.Claims != null)
            {

                var claim = principal.Claims.FirstOrDefault();

                id = claim.Value;
            }

           

            createMenu mymenu = new createMenu
            {
                jsonarr = post.jsonarray,
                filename = post.filename,
                uid = id

            };

        

            await _mongo.CreateMenu(mymenu, post.filename, id);
            return Ok();
        }


        [HttpPost]
        [Route("createmenu")]
        public async Task<IActionResult> createmenu(createmenuPost post)
        {
            string id = "";
            var principal = HttpContext.User;
            if (principal?.Claims != null)
            {

                var claim = principal.Claims.FirstOrDefault();

                id = claim.Value;
            }

            menuPostMongo res = await _mongo.isfilesmenuExist(id, post.filename);
            if (res != null)
                return Ok("message");

            createMenu mymenu = new createMenu
            {
                jsonarr = post.jsonarray,
                filename = post.filename,
                uid = id

            };

             await _mongo.CreateMenu(mymenu, post.filename,id);
            return Ok();
        }


        [HttpPost]
        [Route("createapp")]
        public async Task<IActionResult> createapp(createappPost post)
        {
            string id = "";
            var principal = HttpContext.User;
            if (principal?.Claims != null)
            {

                var claim = principal.Claims.FirstOrDefault();

                id = claim.Value;
            }

            applicationPostMongo res = await _mongo.isfilesappliExist(id, post.filename);
            if (res != null)
                return Ok("message");

            createApp myappl = new createApp
            {
                isenabled = post.isenabled,
                filename = post.filename,
                filecontact = post.filecontact,
                filemenu = post.filemenu,
                is2run = post.is2run,
                isrunning = post.isrunning,
                uid = id,
                date = post.date

            };

            await _mongo.CreateAppli(myappl);

            await _mongo.CreateAppliMenu(myappl);

            await _mongo.CreateAppliContact(myappl);
            DateTime date = new DateTime();
            DateTime.TryParse(post.date, out  date);
            if (date.Year > 2000)
            //if (myappl.date!= "0000-01-01T00:00:00.000Z")
               await _mongo.CreateAppliTiming(myappl);



            return Ok();
        }

        [HttpPost]
        [Route("updateapp")]
        public async Task<IActionResult> updateapp(createappPost post)
        {
            string id = "";
            var principal = HttpContext.User;
            if (principal?.Claims != null)
            {

                var claim = principal.Claims.FirstOrDefault();

                id = claim.Value;
            }

         

            createApp myappl = new createApp
            {
                isenabled = post.isenabled,
                filename = post.filename,
                filecontact = post.filecontact,
                filemenu = post.filemenu,
                uid = id,
                date = post.date,
                is2run = post.is2run,
                isrunning= post.isrunning

            };

            await _mongo.UpdateAppli(myappl);

            await _mongo.UpdateAppliMenu(myappl);

           await _mongo.UpdateAppliContact(myappl);

            DateTime date = new DateTime();
            DateTime.TryParse(post.date, out date);
            if (date.Year > 2000)
                await _mongo.UpdateAppliTiming(myappl);
            else
                await _mongo.DeleteAppliTiming(post.filename,id);


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

            string? filename = post.FirstOrDefault().filename;

            contactsPostMongo res = await _mongo.isfilescontactExist(id, filename);
            if (res != null)
                return Ok("message");

            List<createcontactsPostUid> lst = new List<createcontactsPostUid>();

            foreach (createcontactsPost item in post)
            {
                createcontactsPostUid mycontact = new createcontactsPostUid
                {
                    uid = id,
                    name = item.name,
                    filename = item.filename,
                    phone = item.phone

                };
                lst.Add(mycontact);

            }


            await _mongo.bulkcontacts(lst,filename,id);
            return Ok();
        }

        
        [HttpPost]
        [Route("bulkandeditcontacts")]
        public async Task<IActionResult> bulkandeditcontacts(List<createcontactsPost> post)
        {


            var principal = HttpContext.User;
            string id = "";
            if (principal?.Claims != null)
            {

                var claim = principal.Claims.FirstOrDefault();

                id = claim.Value;
            }

            string? filename = post.FirstOrDefault().filename;

           // await _mongo.bulkdeleteditcontacts(filename, id);

            List<createcontactsPostUid> lst = new List<createcontactsPostUid>();

            foreach (createcontactsPost item in post)
            {
                createcontactsPostUid mycontact = new createcontactsPostUid
                {
                    uid = id,
                    name = item.name,
                    filename = item.filename,
                    phone = item.phone

                };
                lst.Add(mycontact);

            }




            await _mongo.bulkcontacts(lst,filename,id);
            return Ok();
        }

        //[HttpPost]
        //[Route("bulkgroupcontacts")]
        //public async Task<IActionResult> bulkgroupcontacts(createcontactsgroupPost post)
        //{
        //    var principal = HttpContext.User;
        //    string id = "";


        //    if (principal?.Claims != null)
        //    {

        //        var claim = principal.Claims.FirstOrDefault();

        //        id = claim.Value;
        //    }


        //   await _mongo.bulkgroupcontacts(post,id);
        //    return Ok();
        //}

        //[HttpPost]
        //[Route("bulkdeletegroupcontacts")]
        //public async Task<IActionResult> bulkdeletegroupcontacts(createcontactsgroupPost post)
        //{
        //    var principal = HttpContext.User;
        //    string id = "";


        //    if (principal?.Claims != null)
        //    {

        //        var claim = principal.Claims.FirstOrDefault();

        //        id = claim.Value;
        //    }


        //    await _mongo.bulkdeletegroupcontacts(post, id);
        //    return Ok();
        //}

        [HttpPost]
        [Route("deleteAudiorecord")]
        public async Task<IActionResult> deleteAudiorecordPost(deleteAudioPost post)
        {

           

            var principal = HttpContext.User;
            string id = "";


            if (principal?.Claims != null)
            {

                var claim = principal.Claims.FirstOrDefault();

                id = claim.Value;
            }
            var res1 = await _mongo.deleteAudiorecordPost(post, id);

            if (res1 == false)
                return Ok("message");

            IEnumerable res = await _mongo.GetAudio(id);
            return Ok(res);

         
        }

        //[HttpPost]
        //[Route("deletetimimgrecord")]
        //public async Task<IActionResult> deletetimimg(deletetimingPost post)
        //{

        //    await _mongo.deletetimimg(post);
        //    return Ok();
        //}

        //[HttpPost]
        //[Route("deletegroup")]
        //public async Task<IActionResult> deletegroup(deletegroup post)
        //{
            
        //    await _mongo.deletegroupPost(post);
        //    return Ok();
        //}

        


        //[HttpPost]
        //[Route("getaudiogroup")]
        //public async Task<IActionResult> getaudiogroup(getAudiobyidReq post)
        //{
        //    var principal = HttpContext.User;
        //    string id = "";


        //    if (principal?.Claims != null)
        //    {

        //        var claim = principal.Claims.FirstOrDefault();

        //        id = claim.Value;
        //    }

        //    AudiogroupMongo res = await _mongo.getAudiobyidPost(post, id); ;
        // //  
        //    return Ok(res);
        //}

        //[HttpPost]
        //[Route("getgroupcontacts")]
        //public async Task<IActionResult> getgroupcontacts(createcontactsgroupPost post)
        //{

        //    var principal = HttpContext.User;
        //    string id = "";


        //    if (principal?.Claims != null)
        //    {

        //        var claim = principal.Claims.FirstOrDefault();

        //        id = claim.Value;
        //    }

        //    IEnumerable res = await _mongo.getgroupcontacts(post,id);
        //    return Ok(res);
        //}

        [HttpGet]
        [Route("getAllfilescontacts")]
        public async Task<IActionResult> getfilescontacts()
        {
            
            var principal = HttpContext.User;
            string id = "";


            if (principal?.Claims != null)
            {

                var claim = principal.Claims.FirstOrDefault() ;

                 id = claim.Value;
            }

            IEnumerable res = await _mongo.GetAllfilescontactsPost(id);
          
            return Ok(res);
        }

        [HttpGet]
        [Route("getAllfilesMenu")]
        public async Task<IActionResult> getAllfilesMenu()
        {

            var principal = HttpContext.User;
            string id = "";


            if (principal?.Claims != null)
            {

                var claim = principal.Claims.FirstOrDefault();

                id = claim.Value;
            }

            IEnumerable res = await _mongo.getAllfilesMenu(id);

            return Ok(res);
        }



        [HttpPost]
        [Route("deletefilesmenu")]
        public async Task<IActionResult> deletefilesmenu(getfilemenuPost post)
        {

            var principal = HttpContext.User;
            string id = "";


            if (principal?.Claims != null)
            {

                var claim = principal.Claims.FirstOrDefault();

                id = claim.Value;
            }

            string filename = post.filename;

            
            
            var res1 = await _mongo.deletefilesMenu(filename, id);
            if (res1 == false)
                return Ok("message");



            IEnumerable res = await _mongo.getAllfilesMenu(id);

            return Ok(res);
        }

        [HttpPost]
        [Route("updaterunappli")]
        public async Task<IActionResult> updaterunappli(getfilecontactsPost post)
        {

            var principal = HttpContext.User;
            string id = "";


            if (principal?.Claims != null)
            {

                var claim = principal.Claims.FirstOrDefault();

                id = claim.Value;
            }

            string filename = post.filename;




            await _mongo.updaterunappli(filename, id);



            return Ok();
          
        }

        [HttpPost]
        [Route("deletefilesappli")]
        public async Task<IActionResult> deletefilesappli(getfilecontactsPost post)
        {

            var principal = HttpContext.User;
            string id = "";


            if (principal?.Claims != null)
            {

                var claim = principal.Claims.FirstOrDefault();

                id = claim.Value;
            }

            string filename = post.filename;

          


            await _mongo.DeleteAppli(filename, id);


            IEnumerable res = await _mongo.GetApplis(id);

            return Ok(res);
        }

        [HttpPost]
        [Route("deletefilescontacts")]
        public async Task<IActionResult> deletefilescontacts(getfilecontactsPost post)
        {

            var principal = HttpContext.User;
            string id = "";


            if (principal?.Claims != null)
            {

                var claim = principal.Claims.FirstOrDefault();

                id = claim.Value;
            }

            string filename = post.filename;

            var res1 = await _mongo.deletefilescontacts(filename, id);
            if (res1 == false)
                return Ok("message");


            IEnumerable res = await _mongo.GetAllfilescontactsPost( id);

            return Ok(res);
        }



        [HttpPost]
        [Route("getfilecontacts")]
        public async Task<IActionResult> getfilecontacts(getfilecontactsPost post)
        {

            var principal = HttpContext.User;
            string id = "";


            if (principal?.Claims != null)
            {

                var claim = principal.Claims.FirstOrDefault();

                id = claim.Value;
            }

            string filename = post.filename;

            IEnumerable res = await _mongo.GetfilecontactsPosts(filename, id);

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
        [Route("getapplis")]
        public async Task<IActionResult> getApplis()
        {
            var principal = HttpContext.User;
            string id = "";


            if (principal?.Claims != null)
            {

                var claim = principal.Claims.FirstOrDefault();

                id = claim.Value;
            }

            IEnumerable res = await _mongo.GetApplis(id);

            return Ok(res);
        }



        [HttpPost]
        [Route("getallAppliInfo")]
        public async Task<IActionResult> getallAppliInfo(getallinfoAppliPost post)
        {
            try
            {
                var principal = HttpContext.User;
                string id = "";


                if (principal?.Claims != null)
                {

                    var claim = principal.Claims.FirstOrDefault();

                    id = claim.Value;
                }

                string filename = post.filename;

                var res = await _mongo.getallAppliInfo(filename, id);

                return Ok(res);
            }
            catch (Exception ex)
            {

                string str = ex.Message;
                return Ok(null);
            }
            
            
        }

        [HttpPost]
        [Route("uploadAudio")]
        public async Task<IActionResult> uploadAudio([FromForm] FormDataAudio formData)
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


            AudioPostMongo res = await _mongo.isfilesaklataExist(id, Audioname);
            if (res != null)
                return Ok("message");

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

