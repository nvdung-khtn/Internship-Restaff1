using eCommerce.Domain.Seedwork;
using eCommerce.Domain.Shared;
using System;

namespace eCommerce.Domain.Entities
{
    public class User : Entity, IAuditable
    {
        public string Username { get; set; }
        public string PhoneNumber { get; set; }
        public string UrlImage { get; set; }
        public string PasswordHash { get; set; }

        public UserRoles Role { get; set; }

        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime? LockoutEnd { get; set; }
        public DateTime CreatedDate { get; set; }
        public string CreatedBy { get; set; }
        public DateTime? LastUpdated { get; set; }
        public string LastUpdatedBy { get; set; }
    }
}
