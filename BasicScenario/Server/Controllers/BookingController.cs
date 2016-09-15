using BasicScenario.Server.Business;
using Serilog;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;

namespace BasicScenario.Server.Controllers
{
    /// <summary>
    /// Booking controller. Nuestro controlador es de tipo Web API.
    /// Aquí no estamos usando el controller de MVC.
    /// 
    /// </summary>
    public class BookingController : ApiController
    {
        // Potencial Problem: Dependency
        private BookingBusiness _bookingBusiness;


        public BookingController(BookingBusiness business)
        {
            if (business == null)
            {
                throw new ArgumentNullException("business");
            }

            _bookingBusiness = business;
        }

        /// <summary>
        /// Devuelve la lista con las fechas reservadas
        /// </summary>
        /// <returns>Lista de fechas reservadas</returns>
        [Route("api/booking")]
        [HttpGet]
        public async Task<IHttpActionResult> Get()
        {
            var bookedDates = await _bookingBusiness.GetBookedDates(null);

            return Ok(bookedDates);
        }


        /// <summary>
        /// Intenta establecer una reserva de una fecha
        /// </summary>
        /// <param name="user">Usuario que realiza la reserva</param>
        /// <param name="date">Fecha a reservar</param>
        /// <returns>Indica si se ha podido o no reservar la fecha</returns>
        [Route("api/booking/book")]
        [HttpPost]
        [Authorize]
        public async Task<IHttpActionResult> Book(DateTime date)
        {
            Log.Debug("Book {@Date} request by @{User}", date, User.Identity.Name);

            var result = await _bookingBusiness.Book(new Models.Book { User = User.Identity.Name, Date = date });

            return Ok(result.IsSuccess);
        }

        [Route("api/booking/user")]
        [HttpGet]
        [Authorize]
        public async Task<IHttpActionResult> GetBookedUser()
        {
            var bookedDates = await _bookingBusiness.GetBookedDates(User.Identity.Name);

            return Ok(bookedDates);
        }

    }
}