using BasicScenario.Server.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;

namespace BasicScenario.Server.Storage
{
    public interface IBookingStorage
    {
        Task<List<DateTime>> BookedDatesAsync(string user);

        Task<bool> BookAsync(Book book);
    }
}