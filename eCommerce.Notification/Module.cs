using Autofac;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Reflection;
using System.Text;

namespace eCommerce.Notification
{
    public class Module
    {
        public static void Register(ContainerBuilder container, IServiceCollection services)
        {
            container.RegisterAssemblyTypes(typeof(GmailEmailSender).GetTypeInfo().Assembly)
                .AsImplementedInterfaces()
                .InstancePerLifetimeScope();
        }
    }
}
