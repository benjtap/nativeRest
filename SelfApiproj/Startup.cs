using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;

using Microsoft.Extensions.DependencyInjection;
using MongoDB.Driver;

//using SelfApiproj.DBProviders;

using Microsoft.AspNetCore.Authentication.JwtBearer;

using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.Extensions.Configuration;

using Microsoft.Extensions.Configuration.Json;
using SelfApiproj.Repository;
using SelfApiproj.settings;
using Microsoft.Extensions.Options;


namespace ConsoleAppToWebAPI
{
   
    public class Startup
    {
      

        public void ConfigureServices(IServiceCollection services)
        {
            var configuration = new ConfigurationBuilder()
                   .AddJsonFile($"appsettings.json")
              ;
            var config = configuration.Build();



            var secret = config.GetSection("Jwt:Key").Value;
            var key = Encoding.ASCII.GetBytes(secret);

            

            var DatabaseSettings = config.GetSection("DatabaseSettings");

            var mongoConnectionString = config.GetSection("DatabaseSettings:MongoConnectionString");
            var mongoDatabase = config.GetSection("DatabaseSettings:DatabaseName");
            services.AddControllers();
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
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

            services.Configure<MongoDbSettings>(DatabaseSettings);
            
             services.AddSingleton<IMongoDbSettings>(serviceProvider =>
        serviceProvider.GetRequiredService<IOptions<MongoDbSettings>>().Value);

            services.AddScoped<IMongoRepository, MongoRepository>();




           
        }
        public void Configure(IApplicationBuilder app,IWebHostEnvironment env)
        {
            app.UseCors(options => options.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod());

            app.UseRouting();
             app.UseAuthentication();
            app.UseAuthorization();
           
            
           
           
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
           



        }
    }
}
