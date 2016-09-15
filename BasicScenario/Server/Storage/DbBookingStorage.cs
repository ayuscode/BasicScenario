using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using BasicScenario.Server.Models;
using System.Threading.Tasks;
using System.Data.Entity;

namespace BasicScenario.Server.Storage
{
    public class DbBookingStorage : IBookingStorage
    {
        public async Task<bool> BookAsync(Book book)
        {
            using (var bookingModel = new BookingModel())
            {
                bookingModel.Bookings.Add(book);
                int changes = await bookingModel.SaveChangesAsync();

                return changes > 0;
            }
        }

        public async Task<List<DateTime>> BookedDatesAsync(string user)
        {
            using (var bookingModel = new BookingModel())
            {
                var query = bookingModel.Bookings.AsQueryable();

                if (!String.IsNullOrWhiteSpace(user))
                    query = query.Where(x => x.User == user);

                var dates = await query.Select(x => x.Date).ToListAsync();

                return dates;
            }
        }
    }
}