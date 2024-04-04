using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore;
using System.Net;
using System.Security.Cryptography.Xml;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.OpenApi.Models;
using WebBoobs.DBProviders;
using WebBoobs.Models;


var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
ConfigurationManager configuration = builder.Configuration;

var mongoConnectionString = configuration.GetValue<string>("DatabaseSettings:MongoConnectionString");

builder.Services.AddControllers();
builder.Services.AddSingleton<IMongoClient>(x =>
{
    return new MongoClient(mongoConnectionString);
});


builder.Services.AddSingleton<MongoProvider>();

builder.Services.AddSingleton<IBookRepository, BookRepository>();

builder.WebHost.UseKestrelCore();
builder.WebHost.UseIISIntegration();

builder.WebHost.UseUrls("http://*:5000");
builder.WebHost.UseContentRoot(Directory.GetCurrentDirectory());

builder.Services.AddSwaggerGen();

var app = builder.Build();





//Configure the HTTP request pipeline.
//app.UseSwagger();
//app.UseSwaggerUI();


app.MapControllers();

app.Run();

