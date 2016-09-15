using Autofac;
using Autofac.Integration.WebApi;
using BasicScenario.Server.Business;
using BasicScenario.Server.Storage;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BasicScenario.App_Start
{
    public static class AutofacContainerConfig
    {
        public static IContainer Container { get; set; }

        public static void Configure()
        {
            var builder = new ContainerBuilder();

            // Types register
            builder.RegisterType<DbBookingStorage>().As<IBookingStorage>();
            builder.RegisterType<BookingBusiness>().AsSelf();

            // This assembly Api Controllers register 
            builder.RegisterApiControllers(typeof(BookingBusiness).Assembly);

            Container = builder.Build();
        }
    }
}