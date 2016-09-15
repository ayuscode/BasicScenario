using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FunctionalTest.Infrastructure
{
    public static class DbInitialize
    {
        public static void Initialize()
        {
            using (var bookingContext = new BasicScenario.Server.Storage.BookingModel())
            {
                bookingContext.Database.Delete();
            }
        }
    }
}
