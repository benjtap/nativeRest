
using Microsoft.AspNetCore.Mvc;
using SelfApiproj.Repository;

using Webhttp.Models;



namespace ConsoleAppToWebAPI.Controllers
{
    
    [Route("[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {

        private readonly IMongoRepository _mongo;
        //MongoProvider _mongo;

       

        public AuthController(IMongoRepository mongo)
        {
            _mongo = mongo;
          
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
            //System.Diagnostics.Debugger.Launch();
            // For demonstration, let's just generate a new access token
            var newAccessToken = TokenUtils.GenerateAccessTokenFromRefreshToken(tokenResponse.refreshToken);

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

            userPost myuser = await _mongo.Login(user);

            if (myuser != null)
            {

                var accessToken = TokenUtils.GenerateAccessToken(myuser);
                var refreshToken = TokenUtils.GenerateRefreshToken();

              

                var response = new TokenResponse
                {
                    accessToken = accessToken,
                    refreshToken = refreshToken
                };

                return Ok(response);
            }

           // return Unauthorized();
            return BadRequest(new { message = "UserName or Password is incorrect" });

        }

   

    }
}
