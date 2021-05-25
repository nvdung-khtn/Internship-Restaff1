using eCommerce.Domain.Shared;
using eCommerce.Domain.Shared.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace eCommerce.Domain.Repositories.Models
{
    public class SearchProductRating
    {
        public Guid ProductId { get; set; }

        public Pagination Pagination { get; set; } = new Pagination();

        public List<SortItem> Sort { get; set; } = new List<SortItem>();
        public string OwnerId { get; set; }
        public string OwnerUserName { get; set; }
        public UserRoles Role { get; set; }
    }
}
