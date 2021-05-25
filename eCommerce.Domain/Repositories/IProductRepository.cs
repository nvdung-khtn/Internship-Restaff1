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
    public interface IProductRepository : IRepository<Product>
    {
        Product Add(Product product);
        void Update(Product product);
        bool Delete(Product product);
        ProductPhoto UploadPhoto(ProductPhoto photo);

        Task<Product> GetProductByIdAsync(Guid id);
        Task<IEnumerable<Product>> GetProductsByCategoryId(Guid catId);
        Task<IEnumerable<Product>> GetAllAsync();
        Task<PaginatedResult<Product>> SearchAsync(SearchProductModel req);
        Task<PaginatedResult<Product>> SearchPublicAsync(SearchProductModel req);
        Task<int> GetQuantityByProductIdAsync(Guid id);
        Task<int> CountProductAsync(SearchProductModel rq);
    }
}
