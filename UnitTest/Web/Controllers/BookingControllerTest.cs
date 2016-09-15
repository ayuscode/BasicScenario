using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace UnitTest.Web.Controllers
{
    [TestClass]
    public class BookingControllerTest
    {
        [TestMethod]
        [ExpectedException(typeof(ArgumentNullException))]
        public void UnitTest_BookingController_Constructor_fail_if_business_is_null()
        {
            var controller = new BasicScenario.Server.Controllers.BookingController(null);
        }
        
    }
}
