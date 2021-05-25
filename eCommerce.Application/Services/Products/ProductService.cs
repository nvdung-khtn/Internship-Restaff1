using AutoMapper;
using eCommerce.Domain.Entities;
using eCommerce.Application.Shared;
using eCommerce.Domain.Repositories;
using eCommerce.Domain.Repositories.Models;
using eCommerce.Domain.Shared.Exceptions;
using eCommerce.Domain.Shared.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using eCommerce.Domain.Shared;

namespace eCommerce.Application.Services.Products
{
    class ProductService : IProductService
    {
        private readonly IProductRepository _productRepo;
        private readonly IMapper _mapper;
        private readonly ApplicationContext _appContext;
        private readonly IInventoryRepository _inventoryRepository;

        public ProductService(IProductRepository productRepo, IMapper mapper, ApplicationContext appContext, IInventoryRepository inventoryRepository)
        {
            _productRepo = productRepo;
            _mapper = mapper;
            _appContext = appContext;
            _inventoryRepository = inventoryRepository;
        }

        public async Task<PaginatedResult<ProductReturnModels.Product>> SearchProductsAsync(ProductRequestModels.Search req)
        {
            List<SortItem> sortRequest = new List<SortItem>();
            if (!String.IsNullOrEmpty(req.Sort))
            {
                sortRequest = Sort.ListSort(req.Sort);
            }
            var products = await _productRepo.SearchAsync(new SearchProductModel
            {
                Keyword = req.SearchTerm,
                Pagination = new Pagination { PageIndex = req.PageIndex, ItemsPerPage = req.PageSize },
                ProductCategoryName = req.CategoryName,
                OwnerName = req.OwnerName,
                Sort = sortRequest,
                Role = _appContext.Principal.Role,
                UserName = _appContext.Principal.Username
            });

            return _mapper.Map<PaginatedResult<ProductReturnModels.Product>>(products);  //mapper khi get data from DB
        }

        public async Task<Guid> CreateAsync(ProductRequestModels.Create request)
        {
            var product = new Product()
            {
                Name = request.Name,
                Price = request.Price,
                CategoryId = request.CategoryId,
                OwnerId = request.OwnerId,
                Description = request.Description,
                Photos = request.Photos.Select(x => new ProductPhoto { Url = x }).ToList()
            };
            _productRepo.Add(product);
            InitializeInventory(product);

            //foreach(var photo in request.Photo)
            //{
            //    var p = new ProductPhoto()
            //    {
            //        Url = photo
            //    };

            //    product.Photos.Add(p);
            //}


            _productRepo.Add(product);
            await _productRepo.UnitOfWork.SaveChangesAsync();
            return product.Id;
        }

        private void InitializeInventory(Product product)
        {
            Inventory inventory = new Inventory();
            inventory.Product = product;
            inventory.Id = Guid.NewGuid();
            inventory.Quantity = 0;
            _inventoryRepository.Add(inventory);
        }

        public async Task<ProductReturnModels.Product> GetProductByIdAsync(Guid Id)
        {
            var product = await _productRepo.GetProductByIdAsync(Id);
            if (product == null) throw new EntityNotFound("Product");
            int quantity = await _productRepo.GetQuantityByProductIdAsync(Id);
            product.Inventory = new Inventory { Quantity = quantity };
            return _mapper.Map<ProductReturnModels.Product>(product);
        }

        public async Task<Guid> UploadPhotoAsync(ProductRequestModels.UploadPhoto request)
        {
            var photo = new ProductPhoto()
            {
                ProductId = request.ProductId,
                Url = request.Url
            };

            _productRepo.UploadPhoto(photo);
            await _productRepo.UnitOfWork.SaveChangesAsync();
            return photo.ProductId;
        }

        public async Task<List<ProductReturnModels.Product>> GetProductByCategoryIdAsync(Guid categoryId)
        {
            var products = await _productRepo.GetProductsByCategoryId(categoryId);
            var ret = products.ToList();

            return _mapper.Map<List<ProductReturnModels.Product>>(products);
        }

        public async Task<PaginatedResult<ProductReturnModels.Product>> SearchProductsPublicAsync(ProductRequestModels.Search req)
        {
            List<SortItem> sortRequest = new List<SortItem>();
            if (!String.IsNullOrEmpty(req.Sort))
            {
                sortRequest = Sort.ListSort(req.Sort);
            }
            var products = await _productRepo.SearchPublicAsync(new SearchProductModel
            {
                Keyword = req.SearchTerm,
                Pagination = new Pagination { PageIndex = req.PageIndex, ItemsPerPage = req.PageSize },
                ProductCategoryName = req.CategoryName,
                OwnerName = req.OwnerName,
                Sort = sortRequest,
                MinPrice = req.MinPrice,
                MaxPrice = req.MaxPrice,
            });

            return _mapper.Map<PaginatedResult<ProductReturnModels.Product>>(products);
        }

        public async Task<bool> DeteleProductAsync(Guid id)
        {
            var product = await _productRepo.GetProductByIdAsync(id);
            if (product == null)
            {
                throw new EntityNotFound("product");
            }
            _productRepo.Delete(product);
            await _productRepo.UnitOfWork.SaveChangesAsync();
            return true;
        }

        public async Task<ProductReturnModels.Product> UpdateProductAsync(ProductRequestModels.Product rq)
        {
            var product = await _productRepo.GetProductByIdAsync(rq.Id);
            product.Name = rq.Name;
            product.Price = rq.Price;
            product.Description = rq.Description;
            product.CategoryId = rq.CategoryId;
            product.Photos = rq.Photos.Select(x => new ProductPhoto { Url = x }).ToList();
            _productRepo.Update(product);
            await _productRepo.UnitOfWork.SaveChangesAsync();
            return _mapper.Map<ProductReturnModels.Product>(product);
        }




        // return all photo of product
        //public async Task<ProductReturnModels.Photo> GetPhotosByProductIdAsync(Guid productId)
        //{
        //    var photo = await _productRepo.GetPhotosByProductIdAsync(productId);

        //    if (photo == null)
        //    {
        //        throw new EntityNotFound("photo");  // emit error
        //    }

        //    return _mapper.Map<ProductReturnModels.Photo>(photo);
        //}
    }
}
