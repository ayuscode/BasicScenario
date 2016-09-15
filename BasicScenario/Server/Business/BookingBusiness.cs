using BasicScenario.Server.Models;
using BasicScenario.Server.Storage;
using Serilog;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;

namespace BasicScenario.Server.Business
{
    public class BookingBusiness
    {
        // Potencial Problem: Dependency
        // Future Problem: Header Interface...
        private readonly IBookingStorage _bookingStorage;

        public BookingBusiness(IBookingStorage storage)
        {
            if (storage == null)
            {
                throw new ArgumentNullException("storage");
            }

            _bookingStorage = storage;
        }

        public async Task<List<DateTime>> GetBookedDates(string user)
        {
            return await _bookingStorage.BookedDatesAsync(user);
        }

        public async Task<BookResponse> Book(Book book)
        {
            // Convert date to a valid date (no time needs)
            book.Date = book.Date.Date;

            // Check valid user
            if (string.IsNullOrWhiteSpace(book.User)) return new BookResponse { IsSuccess = false, Message = "Invalid User" };

            // Check valid date
            if (book.Date < DateTime.Now.Date) return new BookResponse { IsSuccess = false, Message = "Date must be today or later" };

            // Check date is not reserved
            var bookedDates = await _bookingStorage.BookedDatesAsync(null);
            if (bookedDates.Contains(book.Date)) return new BookResponse { IsSuccess = false, Message = "Date is reserved" };


            // Try to book the date
            var bookResult = await _bookingStorage.BookAsync(book);
            if (!bookResult)
                return new BookResponse { IsSuccess = false, Message = "Unable to book the date" };

            // Register book data (log information example)
            Log.Information("Book successful on {@Date} by {@User}", book.Date, book.User);

            return new BookResponse { IsSuccess = true, Message = "Date booked successfully" };
        }

    }
}