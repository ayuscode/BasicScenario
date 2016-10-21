using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System.Threading.Tasks;
using System.Net;
using System.Net.Http;
using System.Collections.Generic;
using System.Linq;
using BasicScenario.Server.Models;

namespace FunctionalTest
{
    [TestClass]
    public class BookingScenarios : Infrastructure.FunctionalTest
    {
        [TestMethod]
        public async Task FunctionalTest_Book_success_if_date_is_future()
        {
            // Arrange
            var futureDate = DateTime.Now.AddDays(1);
            var testUrl = String.Format("/api/booking/book?date={0}", futureDate.ToString("yyyy-MM-dd"));

            // Act
            var response = await this.Server.HttpClient.PostAsync(testUrl, null);

            // Assert
            Assert.AreEqual(HttpStatusCode.OK, response.StatusCode);

            var content = await response.Content.ReadAsAsync<BookResponse>();
            Assert.AreEqual(true, content.IsSuccess);
        }

        [TestMethod]
        public async Task FunctionalTest_Book_fail_if_date_is_less_than_today()
        {
            // Arrange
            var futureDate = DateTime.Now.AddDays(-1);
            var testUrl = String.Format("/api/booking/book?date={0}", futureDate.ToString("yyyy-MM-dd"));

            // Act
            var response = await this.Server.HttpClient.PostAsync(testUrl, null);

            // Assert
            Assert.AreEqual(HttpStatusCode.OK, response.StatusCode);

            var content = await response.Content.ReadAsAsync<BookResponse>();
            Assert.AreEqual(false, content.IsSuccess);
        }

        [TestMethod]
        public async Task FunctionalTest_Book_fail_if_date_is_reserved()
        {
            // First booking

            // Arrange
            var futureDate = DateTime.Now.AddDays(1);
            var testUrl = String.Format("/api/booking/book?date={0}", futureDate.ToString("yyyy-MM-dd"));

            // Act
            var response = await this.Server.HttpClient.PostAsync(testUrl, null);

            // Assert
            Assert.AreEqual(HttpStatusCode.OK, response.StatusCode);

            var content = await response.Content.ReadAsAsync<BookResponse>();
            Assert.AreEqual(true, content.IsSuccess);

            // Second booking with the same date

            // Act
            response = await this.Server.HttpClient.PostAsync(testUrl, null);

            // Assert
            Assert.AreEqual(HttpStatusCode.OK, response.StatusCode);

            content = await response.Content.ReadAsAsync<BookResponse>();
            Assert.AreEqual(false, content.IsSuccess);
        }

        [TestMethod]
        public async Task FunctionalTest_Book_success_get_booked_dates()
        {
            // First booking

            // Arrange
            var futureDate = DateTime.Now.AddDays(1).Date;
            var testUrl = String.Format("/api/booking/book?date={0}", futureDate.ToString("yyyy-MM-dd"));

            // Act
            var response = await this.Server.HttpClient.PostAsync(testUrl, null);

            // Assert
            Assert.AreEqual(HttpStatusCode.OK, response.StatusCode);

            var content = await response.Content.ReadAsAsync<BookResponse>();
            Assert.AreEqual(true, content.IsSuccess);

            // Check booked dates
            var testUrlUser = "/api/booking/user";

            // Act
            var responseUser = await this.Server.HttpClient.GetAsync(testUrlUser);

            // Assert
            Assert.AreEqual(HttpStatusCode.OK, responseUser.StatusCode);

            var contentUser = await responseUser.Content.ReadAsAsync<List<DateTime>>();
            Assert.AreEqual(1, contentUser.Count(x => x == futureDate));
            
        }
    }
}
