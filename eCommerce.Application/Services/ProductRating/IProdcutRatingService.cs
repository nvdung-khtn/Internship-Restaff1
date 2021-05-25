using eCommerce.Domain.Shared.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace eCommerce.Application.Services.ProductRating
{
    public interface IProductRatingService
    {
        Task<PaginatedResult<ProductRatingReturnModels.ProductRating>> SearchProductRatingAsync(ProductRatingRequestModels.Search rq);
        Task<Guid> CreateProductRatingAsync(ProductRatingRequestModels.Create rq);
        Task<ProductRatingReturnModels.GetStarResponse> GetStarAsync(Guid idProduct);
        Task<ProductRatingReturnModels.GetStarInCardResponse> GetStarInCardAsync(Guid idProduct);
    }
}
