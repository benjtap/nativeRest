
using ConsoleAppToWebAPI;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Server.Kestrel.Core;
using Microsoft.AspNetCore.Server.Kestrel.Https;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Options;
using System;
using System.IO;
using System.Net;

public class Program
{
    static void Main() {
        CreateHostBuilder().Build().Run();
    }
public static IHostBuilder CreateHostBuilder()
    {
        return Host.CreateDefaultBuilder()
        .ConfigureWebHost(
          webHost => webHost
           //  .UseKestrel(options => options.Listen(IPAddress.Parse("127.0.0.1"), 5000))

           .UseStartup<Startup>()
           .UseKestrel(o =>
             o.Listen(IPAddress.Any, 5000)


          // o.Listen(IPAddress.Any, 443, opt =>
          //{
          //    opt.UseHttps(adapterOptions =>
          //    {
          //        adapterOptions.ClientCertificateMode = ClientCertificateMode.NoCertificate;
          //        adapterOptions.ServerCertificate = null;
          //        adapterOptions.CheckCertificateRevocation = false;
          //        adapterOptions.AllowAnyClientCertificate();
          //    });
          //})
           )

           

      );
    }

}

