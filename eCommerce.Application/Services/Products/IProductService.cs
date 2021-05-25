using eCommerce.Domain.Shared.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace eCommerce.Application.Services.Products
{
    public interface IProductService
    {
        /// <summary>
        /// Searchs products
        /// </summary>
        /// <param name="proId">productId</param>
        /// <returns></returns>
        Task<PaginatedResult<ProductReturnModels.Product>> SearchProductsAsync(ProductRequestModels.Search req);

        /// <summary>
        /// Create new product
        /// </summary>
        /// <param name="request"></param>
        /// <returns>ProductId</returns>
        Task<Guid> CreateAsync(ProductRequestModels.Create request);

        /// <summary>
        /// Get a product by Id
        /// </summary>
        /// <param name="Id">Product Id</param>
        /// <returns>ProductReturnModels.Product</returns>
        Task<ProductReturnModels.Product> GetProductByIdAsync(Guid Id);

        /// <summary>
        /// Upload one photo
        /// </summary>
        /// <param name="request">Id of photo was uploaded</param>
        /// <returns></returns>
        Task<Guid> UploadPhotoAsync(ProductRequestModels.UploadPhoto request);

        Task<List<ProductReturnModels.Product>> GetProductByCategoryIdAsync(Guid categoryId);
        //Task<ProductReturnModels.Photo> GetPhotosByProductIdAsync(Guid productId);

        /// <summary>
        /// FrontStore GetProduct
        /// </summary>
        /// <param name="Id"></param>
        /// <returns></returns>
        Task<PaginatedResult<ProductReturnModels.Product>> SearchProductsPublicAsync(ProductRequestModels.Search req);

        /// <summary>
        /// Detele Product
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        Task<bool> DeteleProductAsync(Guid id);

        /// <summary>
        /// Update Product
        /// </summary>
        /// <param name="rq"></param>
        /// <returns></returns>
        Task<ProductReturnModels.Product> UpdateProductAsync(ProductRequestModels.Product rq);
    }
}
