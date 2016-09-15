using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using BasicScenario.Server.Business;
using Autofac;
using System.Threading.Tasks;
using BasicScenario.Server.Storage;
using Moq;

namespace UnitTest.Web.Business
{
    [TestClass]
    public class BookingBusinessTest
    {
        // Checking dependecy injection creation
        private ILifetimeScope _scope;
        private BookingBusiness _bookingBusiness;

        [TestInitialize]
        public void Initialize()
        {
            // Autofac para configurar los test 
            // En este entorno, al ser pruebas unitarias, vamos a usar Moq y quitamos Autofac
            BasicScenario.App_Start.AutofacContainerConfig.Configure();
            _scope = BasicScenario.App_Start.AutofacContainerConfig.Container.BeginLifetimeScope();
            _bookingBusiness = _scope.Resolve<BookingBusiness>();

        }

        [TestCleanup]
        public void Cleanup()
        {
            _scope.Dispose();
        }

        [TestMethod]
        public void UnitTest_BookingBusiness_success_on_create_DependecyInjection()
        {
            // En este test, verificamos que la clase crea correctamente la dependencia.
            // Esta para mostrar cómo configurar Autofac en un entorno de pruebas unitarias si fuese necesario
            Assert.AreNotEqual(null, _bookingBusiness);
        }

        [TestMethod]
        public async Task UnitTest_BookingBusiness_fail_if_user_is_null()
        {
            // Arrage
            Mock<IBookingStorage> mockStorage = new Mock<IBookingStorage>();
            var bookingBusiness = new BookingBusiness(mockStorage.Object);

            // Act
            var result = await bookingBusiness.Book(new BasicScenario.Server.Models.Book { User = null, Date = DateTime.Now });

            // Assert
            Assert.AreEqual(false, result.IsSuccess);
        }

        [TestMethod]
        public async Task UnitTest_BookingBusiness_fail_if_user_is_whitespace()
        {
            // Arrange
            Mock<IBookingStorage> mockStorage = new Mock<IBookingStorage>();
            var bookingBusiness = new BookingBusiness(mockStorage.Object);

            // Act
            var result = await bookingBusiness.Book(new BasicScenario.Server.Models.Book { User = " ", Date = DateTime.Now });

            // Assert
            Assert.AreEqual(false, result.IsSuccess);
        }

        [TestMethod]
        public async Task UnitTest_BookingBusiness_fail_if_date_is_less_than_today()
        {
            // Arrange
            Mock<IBookingStorage> mockStorage = new Mock<IBookingStorage>();
            var bookingBusiness = new BookingBusiness(mockStorage.Object);

            // Act
            var result = await bookingBusiness.Book(new BasicScenario.Server.Models.Book { User = "User", Date = DateTime.Now.AddDays(-1.0) });

            // Assert
            Assert.AreEqual(false, result.IsSuccess);
        }
    }
}
