using MongoDB.Driver;

using Webhttp.DBProviders;

using Microsoft.AspNetCore.Authentication.JwtBearer;

using Microsoft.IdentityModel.Tokens;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

ConfigurationManager configuration = builder.Configuration;

var mongoConnectionString = configuration.GetValue<string>("DatabaseSettings:MongoConnectionString");


builder.Services.AddControllers();
builder.Services.AddSingleton<IMongoClient>(x =>
{
   // MongoClient mongoClient = MongoClients.create("mongodb://user1:pwd1@host1/?authSource=db1&authMechanism=SCRAM-SHA-256");
     return new MongoClient(mongoConnectionString);
    //return new MongoClient("mongodb://userdb:100171@localhost/?authMechanism=SCRAM-SHA-256");
   // return new MongoClient("mongodb://userdb:100171@localhost/?authSource=contact_group&authMechanism=SCRAM-SHA-256");
});


builder.Services.AddSingleton<MongoProvider>();

//builder.Services.AddSingleton<IBookRepository, BookRepository>();
var secret = configuration.GetValue<string>("Jwt:Key");
var key = Encoding.ASCII.GetBytes(secret);

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = false,
            ValidateAudience = false,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(key)
        };
    });




var app = builder.Build();




app.UseCors(options => options.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod());
app.UseRouting();
//app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();

app.Run();








//builder.Services.AddAuthentication(opt =>
//{
//    opt.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
//    opt.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
//})
//.AddJwtBearer(options =>
//{
//    var key = Encoding.ASCII.GetBytes(configuration.GetValue<string>("Jwt:Key"));


//    options.TokenValidationParameters = new TokenValidationParameters
//    {
//        ValidateLifetime = true,
//        ValidateIssuer = true,
//        ValidateAudience = true,
//        ValidateIssuerSigningKey = true,
//        ValidIssuer = configuration["Jwt:Issuer"],
//        ValidAudience = configuration["Jwt:Audience"],
//        IssuerSigningKey = new SymmetricSecurityKey(key)
//    };
//});





//builder.WebHost.UseKestrelCore();
//builder.WebHost.UseIISIntegration();

//builder.WebHost.UseUrls("http://*:5000");
//builder.WebHost.UseContentRoot(Directory.GetCurrentDirectory());

//builder.Services.AddSwaggerGen();