using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Microsoft.Owin.Testing;

namespace FunctionalTest.Infrastructure
{
    public abstract class FunctionalTest
    {
        protected TestServer Server { get; private set; }
        protected FunctionalTest()
        {
            Server = TestServer.Create<Startup>();
        }
    }
}
