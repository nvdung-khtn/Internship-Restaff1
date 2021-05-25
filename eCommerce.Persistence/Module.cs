using Autofac;
using eCommerce.Persistence.Repositories;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Reflection;
using System.Text;

namespace eCommerce.Persistence
{
    public class Module
    {
        public static void Register(ContainerBuilder container, IServiceCollection services)
        {
            // DbContext
            container.RegisterType<ApplicationDbContext>().InstancePerLifetimeScope();

            // Repositories
            container.RegisterAssemblyTypes(typeof(UserRepository).GetTypeInfo().Assembly)
                .AsImplementedInterfaces()
                .InstancePerLifetimeScope();
        }
    }
}
