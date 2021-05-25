using Autofac;
using Microsoft.Extensions.DependencyInjection;
using System;

namespace eCommerce.ModuleRegister
{
    public class ApplicationModule : Module
    {
        private readonly IServiceCollection _services;

        public ApplicationModule(IServiceCollection services)
        {
            _services = services;
        }

        protected override void Load(ContainerBuilder container)
        {
            Application.Module.Register(container, _services);
            Persistence.Module.Register(container, _services);
            Notification.Module.Register(container, _services);
        }
    }
}
