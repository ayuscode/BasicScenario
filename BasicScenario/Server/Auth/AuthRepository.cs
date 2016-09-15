using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;

namespace BasicScenario.Server.Auth
{
    public class AuthRepository : IDisposable
    {
        private AuthContext _ctx;

        private UserManager<IdentityUser> _userManager;

        public AuthRepository()
        {
            _ctx = new AuthContext();
            _userManager = new UserManager<IdentityUser>(new UserStore<IdentityUser>(_ctx));
        }

        public async Task<IdentityResult> RegisterUser(UserModel userModel)
        {
            IdentityUser user = new IdentityUser
            {
                UserName = userModel.UserName
            };

            var result = await _userManager.CreateAsync(user, userModel.Password);

            return result;
        }

        public async Task<IdentityUser> FindUser(string userName, string password)
        {
            IdentityUser user = await _userManager.FindAsync(userName, password);

            return user;
        }

        /// <summary>
        /// Para generar el Indetity con el userName en el Identity.User (y poder usarlo posteriormente en llamadas en el controlador).
        /// </summary>
        /// <param name="user"></param>
        /// <param name="authenticationType"></param>
        /// <returns></returns>
        public async Task<System.Security.Claims.ClaimsIdentity> GenerateUserIdentityAsync(IdentityUser user, string authenticationType)
        {
            var userIdentity = await _userManager.CreateIdentityAsync(user, authenticationType);

            return userIdentity;
        }


        public void Dispose()
        {
            _ctx.Dispose();
            _userManager.Dispose();
        }
    }
}