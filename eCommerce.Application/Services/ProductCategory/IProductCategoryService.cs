using eCommerce.Domain.Shared.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace eCommerce.Application.Services.ProductCategory
{
    public interface IProductCategoryService
    {
        /// <summary>
        /// Searchs product category
        /// </summary>
        /// <param name="rq"></param>
        /// <returns></returns>
        Task<PaginatedResult<ProductCategoryReturnModels.ProductCategory>> SearchProductCategoriesAsync(ProductCategoryRequestModels.Search rq);

        /// <summary>
        /// Create product category
        /// </summary>
        /// <param name="rq"></param>
        /// <returns></returns>
        Task<Guid> CreateProductCategoryAsync(ProductCategoryRequestModels.Create rq);

        /// <summary>
        /// Update product category
        /// </summary>
        /// <param name="rq"></param>
        /// <returns></returns>
        Task<ProductCategoryReturnModels.ProductCategoryDetails> UpdateProductCategoryAsync(ProductCategoryRequestModels.Update rq);

        /// <summary>
        /// Delete product category
        /// </summary>
        /// <param name="rq"></param>
        /// <returns></returns>
        Task<Guid> DeleteProductCategoryAsync(Guid id);

        /// <summary>
        /// Get product category Id
        /// </summary>
        /// <param name="rq"></param>
        /// <returns></returns>
        Task<ProductCategoryReturnModels.ProductCategory> GetProductCategoryByIdAsync(Guid id);

        Task<ProductCategoryReturnModels.ProductCategoryDetails> GetProductCategoryDetailsById(Guid id);
    }
}
