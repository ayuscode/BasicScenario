using Owin;
using System.Web.Http;


namespace FunctionalTest.Infrastructure
{
    class Startup
    {
        public Startup()
        {
            // Ensure to delete the data base
            DbInitialize.Initialize();

            System.Diagnostics.Debug.WriteLine("Startup");
        }

        public void Configuration(IAppBuilder appBuilder)
        {
            // Initialize IoC container
            BasicScenario.App_Start.AutofacContainerConfig.Configure();

            // Configure WebApi
            var config = new HttpConfiguration();
            BasicScenario.App_Start.WebApiConfig.Register(config);

            // Register custom functional testing authentication middleware with Owin
            appBuilder.Use<FunctionalTestAuthentication>();

            // Register WebApi with Owin
            appBuilder.UseWebApi(config);
        }

    }
}
