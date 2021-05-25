using Autofac;
using AutoMapper;
using AutoMapper.Contrib.Autofac.DependencyInjection;
using eCommerce.Application.Services.Users;
using eCommerce.Application.Shared;
using eCommerce.Domain.Shared.Models;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Reflection;
using System.Text;

namespace eCommerce.Application
{
    public static class Module
    {
        public static void Register(ContainerBuilder container, IServiceCollection services)
        {
            // Services
            container.RegisterAssemblyTypes(typeof(UserService).GetTypeInfo().Assembly)
                .AsImplementedInterfaces()
                .InstancePerLifetimeScope();

            // Application Context
            container.RegisterType<ApplicationContext>().AsSelf().InstancePerLifetimeScope();

            // AutoMapper
            container.RegisterAutoMapper(typeof(UserReturnModels.MappingProfile).Assembly);
        }
    }

    public class CommonMappingProfile : Profile
    {
        public CommonMappingProfile()
        {
            CreateMap(typeof(PaginatedResult<>), typeof(PaginatedResult<>));
        }
    }
}
