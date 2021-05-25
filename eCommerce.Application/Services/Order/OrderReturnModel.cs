using AutoMapper;
using eCommerce.Domain.Entities;
using eCommerce.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace eCommerce.Application.Services.Order
{
    public static class OrderReturnModel
    {
        public class Order
        {
            public Guid Id { get; set; }
            public string BuyerName { get; set; }
            public string BuyerPhone { get; set; }
            public string BuyerEmail { get; set; }
            public string Address { get; set; }
            public decimal Price { get; set; }
            public int Quantity { get; set; }
            public decimal TotalAmount { get; set; }
            public decimal ActualPrice { get; set; }
            public Product Product { get; set; }
            public DateTime CreatedDate { get; set; }
            public OrderStatuses Status { get; set; }
            public string PropertyString { get; set; }
        }

        public class Product
        {
            public Guid Id { get; set; }
            public string Name { get; set; }
        }
        public class MappingProfile : Profile
        {
            public MappingProfile()
            {
                CreateMap<Domain.Entities.Order, Order>();
                CreateMap<Domain.Entities.Product, Product>();
            }
        }
    }
}
