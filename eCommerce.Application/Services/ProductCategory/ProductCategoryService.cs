using AutoMapper;
using eCommerce.Domain.Entities;
using eCommerce.Domain.Repositories;
using eCommerce.Domain.Repositories.Models;
using eCommerce.Domain.Shared.Exceptions;
using eCommerce.Domain.Shared.Models;
using System;
using System.Threading.Tasks;

namespace eCommerce.Application.Services.ProductCategory
{
    public class ProductCategoryService : IProductCategoryService
    {
        private readonly IProductRepository _productRepo;
        private readonly IProductcategoryRepository _productCategoryRepo;
        private readonly IMapper _mapper;

        public ProductCategoryService(IProductcategoryRepository productCategoryRepo, IMapper mapper, IProductRepository productRepo)
        {
            _productCategoryRepo = productCategoryRepo;
            _mapper = mapper;
            _productRepo = productRepo;
        }

        public async Task<PaginatedResult<ProductCategoryReturnModels.ProductCategory>> SearchProductCategoriesAsync(ProductCategoryRequestModels.Search rq)
        {
            var productcategories = await _productCategoryRepo.SearchAsync(new SearchProductCategoryModel
            {
                Keyword = rq.SearchTerm,
                Pagination = new Pagination { PageIndex = rq.PageIndex, ItemsPerPage = rq.PageSize },
            });

            return _mapper.Map<PaginatedResult<ProductCategoryReturnModels.ProductCategory>>(productcategories);
        }

        async Task<Guid> IProductCategoryService.CreateProductCategoryAsync(ProductCategoryRequestModels.Create rq)
        {
            var productCategory = _mapper.Map<Domain.Entities.ProductCategory>(rq);

            _productCategoryRepo.Create(productCategory);
            await _productCategoryRepo.UnitOfWork.SaveChangesAsync();

            return productCategory.Id;
        }

        public async Task<ProductCategoryReturnModels.ProductCategoryDetails> UpdateProductCategoryAsync(ProductCategoryRequestModels.Update rq)
        {
            var productCategory = await _productCategoryRepo.GetByIdAsync(rq.Id);
            if (productCategory == null)
            {
                throw new EntityNotFound("Category");
            }

            productCategory.Name = rq.Name;


            productCategory.C1Lable = rq.C1Lable;
            productCategory.C1Options = rq.C1Options;


            productCategory.C2Lable = rq.C2Lable;
            productCategory.C2Options = rq.C2Options;


            productCategory.C3Lable = rq.C3Lable;
            productCategory.C3Options = rq.C3Options;

            productCategory.C4Lable = rq.C4Lable;
            productCategory.C4Options = rq.C4Options;


            productCategory.C5Lable = rq.C5Lable;
            productCategory.C5Options = rq.C5Options;


            _productCategoryRepo.Update(productCategory);

            await _productCategoryRepo.UnitOfWork.SaveChangesAsync();

            return _mapper.Map<ProductCategoryReturnModels.ProductCategoryDetails>(productCategory);
        }

        private async Task<bool> CheckCanDeleteAsync(Guid Id)
        {
            var category = await _productCategoryRepo.GetByIdAsync(Id);
            await _productCategoryRepo.CheckCanDeleteAsync(category.Id);

            return false;
        }

        public async Task<Guid> DeleteProductCategoryAsync(Guid id)
        {
            var productCategory = await _productCategoryRepo.GetByIdAsync(id);
            if (productCategory == null)
                throw new EntityNotFound("Category");

            await CheckCanDeleteAsync(id);
            _productCategoryRepo.Delete(productCategory);
            await _productCategoryRepo.UnitOfWork.SaveChangesAsync();

            return (productCategory.Id);
        }

        public async Task<ProductCategoryReturnModels.ProductCategory> GetProductCategoryByIdAsync(Guid id)
        {
            var productCategory = await _productCategoryRepo.GetByIdAsync(id);
            if (productCategory == null)
                throw new EntityNotFound("Category");

            return _mapper.Map<ProductCategoryReturnModels.ProductCategory>(productCategory);
        }

        public async Task<ProductCategoryReturnModels.ProductCategoryDetails> GetProductCategoryDetailsById(Guid id)
        {
            var productCategory = await _productCategoryRepo.GetByIdAsync(id);
            if (productCategory == null)
            {
                throw new EntityNotFound("Category");
            }
            var productCategoryDetails = _mapper.Map<ProductCategoryReturnModels.ProductCategoryDetails>(productCategory);
            productCategoryDetails.LableOptions.RemoveAll(p => p == null);
            return productCategoryDetails;
        }
    }
}
