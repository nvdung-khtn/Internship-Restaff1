using eCommerce.Domain.Shared.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace eCommerce.Domain.Repositories.Models
{
    public class SearchCouponModel
    {
        public string Keyword { get; set; }
        public Pagination Pagination { get; set; } = new Pagination();
        public List<SortItem> Sort { get; set; } = new List<SortItem>();
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public decimal? MinPrice { get; set; }
        public decimal Value { get; set; }
        public string Code { get; set; }
    }
}
