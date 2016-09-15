using Microsoft.Owin;
using Owin;
using System.Web.Http;
using BasicScenario.App_Start;
using BasicScenario.Server.Auth;
using Serilog;


[assembly: OwinStartup(typeof(BasicScenario.Startup))]

namespace BasicScenario
{
    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            // For more information on how to configure your application, visit http://go.microsoft.com/fwlink/?LinkID=316888

            // OAuth configuration
            AuthConfig.ConfigureOAuth(app);

            // Cors configuration
            app.UseCors(Microsoft.Owin.Cors.CorsOptions.AllowAll);

            // Web api configuration
            HttpConfiguration config = new HttpConfiguration();
            WebApiConfig.Register(config);
            app.UseWebApi(config);

            // Log configuration
            Serilog.Debugging.SelfLog.Enable(msg => System.Diagnostics.Debug.WriteLine(msg));
            Log.Logger = new LoggerConfiguration()
                .ReadFrom.AppSettings()
                .CreateLogger();


        }

        
    }
}
