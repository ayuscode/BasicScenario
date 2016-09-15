using BasicScenario.App_Start;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Security;
using System.Web.SessionState;

namespace BasicScenario
{
    public class Global : System.Web.HttpApplication
    {

        protected void Application_Start(object sender, EventArgs e)
        {
            // Una vez que hemos declarado Startup con Owin para que el pipeline vaya todo 
            // controlado por este, la clase Global.asx podríamos quitarla.

            // Autofac (IoC)
            AutofacContainerConfig.Configure();

            // Estamos usando Web Api, por lo que seguimos cierta estandarización para registrar las rutas (ver WebApiConfig).
            //GlobalConfiguration.Configure(WebApiConfig.Register);
        }
    }
}