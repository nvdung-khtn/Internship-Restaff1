using AutoMapper;
using System;
using System.Collections.Generic;
using System.Text;

namespace eCommerce.Application.Services.Inventories
{
   public class InventoryReturnModels
   {
        public class Inventory
        {
            public Guid Id { get; set; }
            public Product Product { get; set; }
            public int Quantity { get; set; }
            public string[] RowVersion { get; set; }
            public string OwnerUsername { get; set; }
            public DateTime? LastUpdated { get; set; }
            public string LastUpdatedBy { get; set; }
            public string ProductCategoryName { get; set; }
        }

        public class Product 
        {
            public Guid Id { get; set; }
            public string Name { get; set; }
            public Decimal Price { get; set; }
        }


        public class MappingProfile : Profile
        {
            public MappingProfile()
            {
                CreateMap<Domain.Entities.Inventory, Inventory>()
                    .ForMember(a => a.RowVersion, b => b.MapFrom(c =>  c.RowVersion))
                    .ForMember(a => a.OwnerUsername, b => b.MapFrom(c => c.Product.Owner.Username))
                    .ForMember(a => a.ProductCategoryName, b => b.MapFrom(c => c.Product.Category.Name));

                CreateMap<Domain.Entities.Product, Product>();

            }
        }
    }
}
