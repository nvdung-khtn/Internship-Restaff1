using eCommerce.Domain.Entities;
using eCommerce.Domain.Repositories.Models;
using eCommerce.Domain.Seedwork;
using eCommerce.Domain.Shared.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace eCommerce.Domain.Repositories
{
    public interface IProductRatingRepository : IRepository<ProductRating>
    {
        Task<PaginatedResult<ProductRating>> SearchAsync(SearchProductRating searchProductRating);

        ProductRating Add(ProductRating productRating);

        /// <summary>
        /// Get count Comment
        /// </summary>
        /// <param name="rq"></param>
        /// <returns></returns>
        Task<int> CountCommentAsync(SearchProductRating rq);
    }
}
