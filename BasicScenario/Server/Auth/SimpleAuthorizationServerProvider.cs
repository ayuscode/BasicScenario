using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.Owin.Security.OAuth;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Web;

namespace BasicScenario.Server.Auth
{
    public class SimpleAuthorizationServerProvider : OAuthAuthorizationServerProvider
    {
        public override Task ValidateClientAuthentication(OAuthValidateClientAuthenticationContext context)
        {
            // Mark client as validate
            context.Validated();
            return base.ValidateClientAuthentication(context);
        }


        public override async Task GrantResourceOwnerCredentials(OAuthGrantResourceOwnerCredentialsContext context)
        {
            using (AuthRepository _repo = new AuthRepository())
            {
                IdentityUser user = await _repo.FindUser(context.UserName, context.Password);

                if (user == null)
                {
                    context.SetError("invalid_grant", "The user name or password is incorrect.");
                    return;
                }

                // Si queremos crear un identity que lleve en el User.Identity.Name el valor
                ClaimsIdentity identity = await _repo.GenerateUserIdentityAsync(user, OAuthDefaults.AuthenticationType);

                // Si queremos crear un identity sin userName y meter el dato como Claim
                //var identity = new ClaimsIdentity(context.Options.AuthenticationType);
                // identity.AddClaim(new Claim("user", context.UserName));

                // Claim con el roles (por ejemplo)
                identity.AddClaim(new Claim("role", "BasicUser"));

                context.Validated(identity);
            }




        }
    }
}
