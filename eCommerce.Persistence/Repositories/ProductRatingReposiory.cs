using eCommerce.Domain.Entities;
using eCommerce.Domain.Repositories;
using eCommerce.Domain.Repositories.Models;
using eCommerce.Domain.Seedwork;
using eCommerce.Domain.Shared;
using eCommerce.Domain.Shared.Models;
using eCommerce.Persistence.QueryObjects;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace eCommerce.Persistence.Repositories
{
    public class ProductRatingReposiory : IProductRatingRepository
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly GenericRepository<ProductRating> _genericRepo;
        public IUnitOfWork UnitOfWork => _dbContext;

        public ProductRatingReposiory(ApplicationDbContext context)
        {
            _dbContext = context;
            _genericRepo = new GenericRepository<ProductRating>(_dbContext.Set<ProductRating>());
        }

        public async Task<PaginatedResult<ProductRating>> SearchAsync(SearchProductRating searchProductRating)
        {
            var productRatingsQuery = QueryObject<ProductRating>.Empty;

            if (searchProductRating.ProductId != null)
            {
                var productId = searchProductRating.ProductId;
                productRatingsQuery.And(new ProductRatingQueryObject.BelongsToProduct(productId));
            }

            searchProductRating.Sort.ForEach(x => productRatingsQuery.AddOrderBy(x.FieldName, x.IsDescending));
            var result = await _genericRepo.SearchAsync(productRatingsQuery, searchProductRating.Pagination, x => x.Include(p => p.Product));
            return result;
        }

        public ProductRating Add(ProductRating productRating)
        {
            var rp = _genericRepo.Add(productRating);
            return rp;
        }

        public async Task<int> CountCommentAsync(SearchProductRating rq)
        {
            var queryObject = QueryObject<ProductRating>.Empty;

            //Filter by current user name
            if (!string.IsNullOrWhiteSpace(rq.OwnerUserName) && rq.Role != UserRoles.Admin)
            {
                var userName = rq.OwnerUserName;
                queryObject.And(new ProductRatingQueryObject.FilterByCurrentUserName(userName));
            }

            var result = await _genericRepo.SearchAsync(queryObject);
            return result
                .Select(pr=>pr.ReviewContent)
                .Count();
        }
    }

}
