using eCommerce.Domain.Shared.Models;
using FluentValidation;
﻿using eCommerce.Domain.Shared;
using System;
using System.Collections.Generic;
using System.Text;

namespace eCommerce.Application.Services.Users
{
    public static class UserRequestModels
    {
        public class Register
        {
            public string Username { get; set; }

            public string Password { get; set; }
        }

        public class Search
        {
            public string SearchTerm { get; set; }

            public int PageIndex { get; set; }

            public int PageSize { get; set; }

            public string Sort { get; set; }
            public UserLockStatusFilters IsLockout { get; set; }
        }

        public class Create
        {
            public string Username { get; set; }
            public string FirstName { get; set; }
            public string LastName { get; set; }
        }

        public class CreateValidator: AbstractValidator<Create>
        {
            public CreateValidator()
            {
                RuleFor(c => c.Username).EmailAddress();
                RuleFor(c => c.FirstName).NotEmpty();
                RuleFor(c => c.LastName).NotEmpty();
            }
        }
        
        public class UpdatePassword
        {
            public string Username { get; set; }
            public string KeyParam { get; set; }
            public string Password { get; set; }
        }

        public class UpdatePasswordValidator : AbstractValidator<UpdatePassword>
        {
            public UpdatePasswordValidator()
            {
                RuleFor(c => c.Username).EmailAddress();
                RuleFor(c => c.KeyParam).NotEmpty();
                RuleFor(c => c.Password).MinimumLength(6);
            }
        }

        public class ForgotPassword
        {
            public string Username { get; set; }
            public string FirstName { get; set; }
            public string LastName { get; set; }
        }

        public class ForgotPasswordValidator : AbstractValidator<ForgotPassword>
        {
            public ForgotPasswordValidator()
            {
                RuleFor(c => c.Username).EmailAddress();
                RuleFor(c => c.FirstName).NotEmpty();
                RuleFor(c => c.LastName).NotEmpty();
            }
        }

        public class UrlImage
        {
            public string url { get; set; }
        }

        public class UserUpdateInformation
        {
            public string FirstName { get; set; }
            public string LastName { get; set; }
            public string PhoneNumber { get; set; }
        }
        public class UserUpdateInformationValidator : AbstractValidator<UserUpdateInformation>
        {
            public UserUpdateInformationValidator()
            {
                RuleFor(c => c.FirstName).NotEmpty();
                RuleFor(c => c.LastName).NotEmpty();
                RuleFor(c => c.PhoneNumber).MinimumLength(8).MaximumLength(15);
            }
        }
    }
}
