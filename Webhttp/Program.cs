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
    return new MongoClient(mongoConnectionString);
});


builder.Services.AddSingleton<MongoProvider>();

//builder.Services.AddSingleton<IBookRepository, BookRepository>();



builder.Services.AddAuthentication(opt => {
    opt.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    opt.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    //var key = Encoding.ASCII.GetBytes(configuration.GetValue<string>("Jwt:Key"));

    var key = Encoding.ASCII.GetBytes(configuration["Jwt:Key"]);
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateLifetime = true,
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = configuration["Jwt:Issuer"],
        ValidAudience = configuration["Jwt:Audience"],
        IssuerSigningKey = new SymmetricSecurityKey(key)
    };
});





//builder.WebHost.UseKestrelCore();
//builder.WebHost.UseIISIntegration();

//builder.WebHost.UseUrls("http://*:5000");
//builder.WebHost.UseContentRoot(Directory.GetCurrentDirectory());

builder.Services.AddSwaggerGen();

var app = builder.Build();




app.UseCors(options => options.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod());
app.UseRouting();

//app.UseAuthentication();
//app.UseAuthorization();


//Configure the HTTP request pipeline.
//app.UseSwagger();
//app.UseSwaggerUI();




app.MapControllers();

app.Run();
