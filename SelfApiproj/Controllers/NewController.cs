using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Webhttp.Controllers;
//using Webhttp.DBProviders;
using Webhttp.Models;

namespace ConsoleAppToWebAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class testController : ControllerBase
    {
        private readonly ILogger logger;

        public testController( ILogger logger)
        {
             this.logger = logger;
        }

        [HttpGet]
        [Route("test")]
        public string Test()
        {

            return "test";
        }


        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> login(loginPost user)
        {
            return Ok("test");
        }
    }
}
