using AutoMapper;
using System;
using System.Collections.Generic;
using System.Text;

namespace eCommerce.Application.Services.ProductCategory
{
    public static class ProductCategoryReturnModels
    {
        public class ProductCategory
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

        public class MappingProfile : Profile
        {
            public MappingProfile()
            {
                CreateMap<Domain.Entities.ProductCategory, ProductCategory>();
                CreateMap<Domain.Entities.ProductCategory, ProductCategoryDetails>()
                    .ForMember(a => a.LableOptions, b => b.MapFrom(c =>
                        new List<LableOptions>()
                        {
                           ( c.C1Lable != null && c.C1Options != null ) ? new LableOptions(){Lable = c.C1Lable,Options = c.C1Options} : null,
                           ( c.C2Lable != null && c.C2Options != null ) ? new LableOptions(){Lable = c.C2Lable,Options = c.C2Options} : null,
                           ( c.C3Lable != null && c.C3Options != null ) ? new LableOptions(){Lable = c.C3Lable,Options = c.C3Options} : null,
                           ( c.C4Lable != null && c.C4Options != null ) ? new LableOptions(){Lable = c.C4Lable,Options = c.C4Options} : null,
                           ( c.C5Lable != null && c.C5Options != null ) ? new LableOptions(){Lable = c.C5Lable,Options = c.C5Options} : null
                        }
                    ));
            }
        }

        public class LableOptions
        {
            public string Lable { get; set; }

            public string Options { get; set; }
        }

        public class ProductCategoryDetails
        {
            public Guid Id { get; set; }

            public string Name { get; set; }

            public List<LableOptions> LableOptions { get; set; }

        }

    }
}
