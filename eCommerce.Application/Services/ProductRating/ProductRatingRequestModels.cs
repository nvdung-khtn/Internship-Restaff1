using AutoMapper;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Text;

namespace eCommerce.Application.Services.ProductRating
{
    public static class ProductRatingRequestModels
    {

        public class Search
        {

            public int PageIndex { get; set; }

            public int PageSize { get; set; }

            public Guid ProductId { get; set; }

        }

        public class Create
        {
            public string FullName { get; set; }

            public Guid ProductId { get; set; }

            public string Email { get; set; }

            public string ReviewTitle { get; set; }

            public int NumberStar { get; set; }

            public string ReviewContent { get; set; }
        }

        public class MapperProductRating : Profile
        {
            public MapperProductRating()
            {
                CreateMap<Create, Domain.Entities.ProductRating>()
                    .ForMember(a => a.Id, b => b.MapFrom(c => Guid.NewGuid()));
            }
        }

        public class CreateValidator : AbstractValidator<Create>
        {
            public CreateValidator()
            {
                RuleFor(c => c.FullName).NotEmpty();

                RuleFor(c => c.ProductId).NotEmpty();

                RuleFor(c => c.Email).EmailAddress();

                RuleFor(c => c.ReviewTitle).NotEmpty();

                RuleFor(c => c.ReviewContent).NotEmpty();

                RuleFor(c => c.NumberStar).NotEmpty();
            }
        }
    }
}
