using AutoMapper;
using eCommerce.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace eCommerce.Application.Services.Products
{
    public static class ProductReturnModels
    {
        public class Product
        {
            public Guid Id { get; set; }
            public string Name { get; set; }
            public decimal Price { get; set; }
            public Category Category { get; set; }
            public User Owner { get; set; }
            public DateTime LastUpdated { get; set; }
            public string LastUpdatedBy { get; set; }
            public List<Photo> Photos { get; set; }
            public string Description { get; set; }
            public Inventory Inventory { get; set; }
        }

        public class Category
        {
            public Guid Id { get; set; }

            public string Name { get; set; }

            public string C1Lable { get; set; }

            public string C1Options { get; set; }

            public string C2Lable { get; set; }

            public string C2Options { get; set; }

            public string C3Lable { get; set; }

            public string C3Options { get; set; }

            public string C4Lable { get; set; }

            public string C4Options { get; set; }

            public string C5Lable { get; set; }

            public string C5Options { get; set; }
        }

        public class User
        {
            public Guid Id { get; set; }

            public string Username { get; set; }
        }

        public class Photo
        {
            public string Url { get; set; }
            public Guid Id { get; set; }
        }

        public class Inventory
        {
            public int Quantity { get; set; }
        }

        public class MappingProfile : Profile
        {
            public MappingProfile()
            {
                CreateMap<Domain.Entities.Product, Product>();
                CreateMap<Domain.Entities.ProductCategory, Category>();
                CreateMap<Domain.Entities.ProductPhoto, Photo>();
                CreateMap<Domain.Entities.Inventory, Inventory>();
                CreateMap<Domain.Entities.User, User>();
            }
        }
    }
}
