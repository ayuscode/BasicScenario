using Autofac.Integration.WebApi;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Routing;

namespace BasicScenario.App_Start
{
    /// <summary>
    /// Estamos usando Web API para obtener los datos.
    /// En este proyecto no usamos MVC ya que queremos separar completamente UI y servidor.
    /// Por eso usamos MapHttpRoute frente a MapRoute
    /// Referencia al artículo: http://hadihariri.com/2012/04/06/with-http-your-application-is-your-api/
    /// </summary>
    public static class WebApiConfig
    {

        public static void Register(HttpConfiguration config)
        {
            // Hay que configurar Autofac para Web Api
            config.DependencyResolver = new AutofacWebApiDependencyResolver(AutofacContainerConfig.Container);
            
            // Podemos configurar las rutas por los atributos del controlador [Route()]
            config.MapHttpAttributeRoutes();

            // Podemos configurar de forma manual las rutas
            //config.Routes.MapHttpRoute("Default",
            //    "{controller}/{id}", new { id = RouteParameter.Optional });

            // Quitamos las rutas a elmah
            RouteTable.Routes.Ignore("elmah.axd");
        }
    }
}