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
    public interface IProductcategoryRepository : IRepository<ProductCategory>
    {
        ProductCategory Create(ProductCategory productCategory);

        void Update(ProductCategory productCategory);

        void Delete(ProductCategory productCategory);

        Task<ProductCategory> GetByIdAsync(Guid Id);
        Task<PaginatedResult<ProductCategory>> SearchAsync(SearchProductCategoryModel rq);
        Task CheckCanDeleteAsync(Guid categoryId);
    }
}
