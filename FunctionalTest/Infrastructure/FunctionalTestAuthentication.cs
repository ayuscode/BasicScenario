using Microsoft.Owin;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Security.Principal;
using System.Text;
using System.Threading.Tasks;

namespace FunctionalTest.Infrastructure
{
    class FunctionalTestAuthentication : OwinMiddleware
    {
        public FunctionalTestAuthentication(OwinMiddleware next)
            : base(next)
        {

        }

        public override Task Invoke(IOwinContext context)
        {
            IIdentity identity = new GenericIdentity("Test");
            context.Authentication.User = new GenericPrincipal(identity, new string[] { });
            

            return Next.Invoke(context);
        }
    }
}
