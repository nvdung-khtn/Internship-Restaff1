using eCommerce.Domain.Entities;
using eCommerce.Domain.Repositories;
using eCommerce.Domain.Repositories.Models;
using eCommerce.Domain.Seedwork;
using eCommerce.Domain.Shared.Exceptions;
using eCommerce.Domain.Shared.Models;
using eCommerce.Persistence.QueryObjects;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace eCommerce.Persistence.Repositories
{
    public class ProductCategoryRepository : IProductcategoryRepository
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly GenericRepository<ProductCategory> _genericRepo;

        public IUnitOfWork UnitOfWork => _dbContext;

        public ProductCategoryRepository(ApplicationDbContext context)
        {
            _dbContext = context;
            _genericRepo = new GenericRepository<ProductCategory>(_dbContext.Set<ProductCategory>());
        }

        public async Task<PaginatedResult<ProductCategory>> SearchAsync(SearchProductCategoryModel rq)
        {
            // filter
            var queryObject = QueryObject<ProductCategory>.Empty;

            if (!string.IsNullOrWhiteSpace(rq.Keyword))
            {
                var keyword = rq.Keyword;
                queryObject.And(new ProductCategoryQueryObjects.ContainsKeyword(keyword));
            }

            // orderby
            if (!rq.Sort.Any())
            {
                rq.Sort.Add(new SortItem { FieldName = nameof(ProductCategory.IdentityKey) });
            }

            rq.Sort.ForEach(x => queryObject.AddOrderBy(x.FieldName, x.IsDescending));

            // execute
            var result = await _genericRepo.SearchAsync(queryObject, rq.Pagination);
            return result;
        }         

        public Task<ProductCategory> GetByIdAsync(Guid Id)
        {
            return _genericRepo.GetByIdAsync(Id);
        }

        public ProductCategory Create(ProductCategory productCategory)
        {
            return _genericRepo.Add(productCategory);
        }

        public void Update(ProductCategory productCategory)
        {
            _genericRepo.Update(productCategory);
        }

        public void Delete(ProductCategory productCategory)
        {
            _genericRepo.Delete(productCategory);
        }

        public async Task CheckCanDeleteAsync(Guid categoryId)
        {            
            var check = await _dbContext.Set<Product>().Where(p=>p.CategoryId==categoryId).CountAsync();
            if (check != 0)            
                throw new BusinessException("Can't delete category");        
        }
        
    }
}
