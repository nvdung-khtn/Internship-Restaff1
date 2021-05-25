using AutoMapper;
using System;
using System.Collections.Generic;
using System.Text;

namespace eCommerce.Application.Services.Coupons
{
    public class CouponReturnModels
    {
        public class Coupon
        {
            public Guid Id { get; set; }
            public string Name { get; set; }
            public string Description { get; set; }
            public DateTime StartDate { get; set; }
            public DateTime EndDate { get; set; }
            public decimal? MinPrice { get; set; }
            public decimal Value { get; set; }
            public string Code { get; set; }
            public DateTime? LastUpdated { get; set; }
            public string LastUpdatedBy { get; set; }
        }

        public class MappingProfile : Profile
        {
            public MappingProfile()
            {
                CreateMap<Domain.Entities.Coupon, Coupon>();
            }
        }
    }
}
