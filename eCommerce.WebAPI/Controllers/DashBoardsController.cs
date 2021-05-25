using eCommerce.Application.Services.DashBoard;
using eCommerce.Application.Services.Order;
using eCommerce.Domain.Shared.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace eCommerce.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class DashBoardsController : ControllerBase
    {
        private readonly IDashBoardService _dashBoardService;
        private readonly IOrderService _orderService;
        public DashBoardsController(IDashBoardService dashBoardService, IOrderService orderService)
        {
            _dashBoardService = dashBoardService;
            _orderService = orderService;
        }

        [HttpGet("SumEarnings")]
        public async Task<ActionResult> GetSumEarningsAsync()
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            var sumEarning = await _dashBoardService.GetSumEarningsAsync();
            return Ok(sumEarning);
        }

        [HttpGet("CountProduct")]
        public async Task<ActionResult> GetCountProductAsync()
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            var countProduct = await _dashBoardService.GetCountProductAsync();
            return Ok(countProduct);
        }

        [HttpGet("CountComment")]
        public async Task<ActionResult> GetCountCommentAsync()
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            var countComment = await _dashBoardService.GetCountComment();
            return Ok(countComment);
        }
        [HttpGet("GetCountUser")]
        public async Task<ActionResult> GetCountUserAsync()
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            var countUsers = await _dashBoardService.GetCountUserAsync();
            return Ok(countUsers);
        }

        [HttpGet("GetCategory")]
        public async Task<ActionResult> GetCategoryAsync()
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            var result = await _dashBoardService.StatisticsCategories();
            return Ok(result);
        }

        [HttpGet("GetProducts")]
        public async Task<ActionResult> GetProductsAsync()
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            var result = await _dashBoardService.StatisticsProducts();
            return Ok(result);
        }

        [HttpGet("RevenueMonthly")]
        public async Task<ActionResult<List<LineChartModels>>> RevenueMonthly()
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            var result = await _dashBoardService.RevenueMonthly();
            return result;
        }
    }
}
