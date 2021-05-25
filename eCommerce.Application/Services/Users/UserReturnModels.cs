using AutoMapper;
using eCommerce.Domain.Shared;
using System;
using System.Collections.Generic;
using System.Text;

namespace eCommerce.Application.Services.Users
{
    public static class UserReturnModels
    {
        public class User
        {
            public Guid Id { get; set; }
            public string Username { get; set; }

            public UserRoles Role { get; set; }

            public string FirstName { get; set; }
            public string LastName { get; set; }
            public DateTime? LockoutEnd { get; set; }
            public DateTime CreatedDate { get; set; }
            public string CreatedBy { get; set; }
            public DateTime? LastUpdated { get; set; }
            public string LastUpdatedBy { get; set; }
            public string UrlImage { get; set; }
        }

        public class MappingProfile : Profile
        {
            public MappingProfile()
            {
                CreateMap<Domain.Entities.User, User>();
            }
        }

        public class UserInformation
        {
            public string Username { get; set; }
            public string FirstName { get; set; }
            public string LastName { get; set; }
            public string PhoneNumber { get; set; }
            public string UrlImage { get; set; }

        }

        public class MappingUserInformation : Profile
        {
            public MappingUserInformation()
            {
                CreateMap<Domain.Entities.User, UserInformation>();
            }
        }
    }
}
