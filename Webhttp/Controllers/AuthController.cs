using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Webhttp.DBProviders;
using Webhttp.Models;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

using System.Text;
using Microsoft.AspNetCore.Authorization;


namespace Webhttp.Controllers
{
    
    [Route("[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly ILogger logger;
        MongoProvider _mongo;
        public AuthController(MongoProvider mongo, IConfiguration configuration, ILogger<WebhttpController> logger)
        {
            _mongo = mongo;
            _configuration = configuration;
            this.logger = logger;
        }


        [HttpPost]
        [Route("createregister")]
        public async Task<IActionResult> createregister(createregisterPost post)
        {

            await _mongo.createregisterPost(post);
            return Ok();
        }

        [HttpPost]
        [Route("refresh")]
        public IActionResult Refresh(TokenResponse tokenResponse)
        {
            System.Diagnostics.Debugger.Launch();
            // For demonstration, let's just generate a new access token
            var newAccessToken = TokenUtils.GenerateAccessTokenFromRefreshToken(tokenResponse.refreshToken, _configuration);

            var response = new TokenResponse
            {
                accessToken = newAccessToken,
                refreshToken = tokenResponse.refreshToken // Return the same refresh token
            };

            return Ok(response);
        }





        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> login(loginPost user)
        {
            //System.Diagnostics.Debugger.Launch();
            userPost myuser=   await _mongo.Login(user);

            if (myuser != null)
            {

                var accessToken = TokenUtils.GenerateAccessToken(myuser, _configuration);
                var refreshToken = TokenUtils.GenerateRefreshToken();

              

                var response = new TokenResponse
                {
                    accessToken = accessToken,
                    refreshToken = refreshToken
                };

                return Ok(response);
            }

            return Unauthorized();


       


         
        }

   

    }
}
