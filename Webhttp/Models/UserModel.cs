namespace JWTMongoProject.Models
{
    public class LoginModel
    {
        public string? UserName { get; set; }
        public string? Password { get; set; }
    }

 

    public class AuthenticatedResponse
    {
        public string? accessToken { get; set; }
        public string? refreshToken { get; set; }

     
    }
}
