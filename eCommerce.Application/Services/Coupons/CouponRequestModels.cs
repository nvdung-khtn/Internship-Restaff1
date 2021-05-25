using System;
using System.Collections.Generic;
using System.Text;

namespace eCommerce.Application.Services.Coupons
{
    public class CouponRequestModels
    {
        public class Create
        {
            public string Name { get; set; }
            public string Description { get; set; }
            public DateTime StartDate { get; set; }
            public DateTime EndDate { get; set; }
            public decimal? MinPrice { get; set; }
            public decimal Value { get; set; }
            public string Code { get; set; }
        }

        public class Update
        {
            public string Name { get; set; }
            public string Description { get; set; }
            public DateTime StartDate { get; set; }
            public DateTime EndDate { get; set; }
            public decimal? MinPrice { get; set; }
            public decimal Value { get; set; }
            public string Code { get; set; }
        }

        public class Search
        {
            public string SearchTerm { get; set; }
            public DateTime? StartDate { get; set; }
            public DateTime? EndDate { get; set; }
            public decimal? MinPrice { get; set; }
            public decimal Value { get; set; }
            public string Code { get; set; }
            public int PageIndex { get; set; }
            public int PageSize { get; set; }
            public string Sort { get; set; }
        }

        public class GetValidCoupon
        {
            public decimal? valueOrder { get; set; }
        }

        public class Verify
        {
            public string code { get; set; }
            public decimal orderValue { get; set; }
        }
    }
}
