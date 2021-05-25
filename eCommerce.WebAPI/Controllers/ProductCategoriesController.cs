using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using eCommerce.Application.Services.ProductCategory;
using eCommerce.Domain.Shared.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace eCommerce.WebAPI.Controllers
{
    //[Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ProductCategoriesController : ControllerBase
    {
        private readonly IProductCategoryService _productCategoryService;

        public ProductCategoriesController(IProductCategoryService productCategoryService)
        {
            _productCategoryService = productCategoryService;
        }

        [HttpGet]
        public async Task<ActionResult<PaginatedResult<ProductCategoryReturnModels.ProductCategory>>> Search([FromQuery] ProductCategoryRequestModels.Search rq)
        {
            var productCategories = await _productCategoryService.SearchProductCategoriesAsync(rq);
            return productCategories;
        }

        [HttpPost]
        [Authorize(Policy = "PermissionAdmin")]
        public async Task<Guid> Create([FromBody] ProductCategoryRequestModels.Create rq)
        {
            var productCategoryId = await _productCategoryService.CreateProductCategoryAsync(rq);
            return productCategoryId;
        }

        [HttpPut("")]
        [Authorize(Policy = "PermissionAdmin")]
        public async Task<ActionResult> Update([FromBody] ProductCategoryRequestModels.Update rq)
        {
            var productCategory = await _productCategoryService.UpdateProductCategoryAsync(rq);
            if (productCategory == null)
                return BadRequest();

            return Ok(productCategory);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(Guid id)
        {
            var productCategory = await _productCategoryService.DeleteProductCategoryAsync(id);
            return Ok();
        }

        [HttpGet("/frontstore/api/Categories")]
        [AllowAnonymous]
        public async Task<ActionResult<PaginatedResult<ProductCategoryReturnModels.ProductCategory>>> FrontStoreSearch([FromQuery] ProductCategoryRequestModels.Search rq)
        {
            var productCategories = await _productCategoryService.SearchProductCategoriesAsync(rq);

            return productCategories;
        }

        [HttpGet("{id}")]
        public async Task<ProductCategoryReturnModels.ProductCategoryDetails> GetProductCategoryDetailsById(Guid id)
        {
            var rs = await _productCategoryService.GetProductCategoryDetailsById(id);
            return rs;
        }
    }
}