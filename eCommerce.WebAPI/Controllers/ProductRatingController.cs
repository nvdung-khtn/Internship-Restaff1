using eCommerce.Application.Services.ProductRating;
using eCommerce.Domain.Shared.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace eCommerce.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductRatingController : ControllerBase
    {

        private readonly IProductRatingService _productRatingService;

        public ProductRatingController(IProductRatingService productRatingService)
        {
            _productRatingService = productRatingService;
        }

        [HttpGet]
        public async Task<ActionResult<PaginatedResult<ProductRatingReturnModels.ProductRating>>> Search([FromQuery] ProductRatingRequestModels.Search rq)
        {
            var rp = await _productRatingService.SearchProductRatingAsync(rq);
            return rp;
        }

        [HttpPost]
        public async Task<ActionResult<Guid>> CreateProductRarting([FromBody] ProductRatingRequestModels.Create rq)
        {
            var id = await _productRatingService.CreateProductRatingAsync(rq);
            return id;
        }

        [HttpGet("star/{idProduct}")]
        public async Task<ProductRatingReturnModels.GetStarResponse> GetStar(Guid idProduct)
        {
            var rp = await _productRatingService.GetStarAsync(idProduct);
            return rp;
        }

        [HttpGet("star-in-card/{idProduct}")]
        public async Task<ActionResult<ProductRatingReturnModels.GetStarInCardResponse>> GetStarInCard(Guid idProduct)
        {
            var rp = await _productRatingService.GetStarInCardAsync(idProduct);
            return Ok(rp);
        }
    }
}
