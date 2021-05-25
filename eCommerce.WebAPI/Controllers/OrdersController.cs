using eCommerce.Application.Services.Order;
using eCommerce.Domain.Shared.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace eCommerce.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class OrdersController : ControllerBase
    {
        private readonly IOrderService _orderService;

        public OrdersController(IOrderService orderService)
        {
            _orderService = orderService;
        }

        [HttpGet]
        public async Task<ActionResult<PaginatedResult<OrderReturnModel.Order>>> Search([FromQuery] OrderRequestModels.Search rq)
        {
            var orders = await _orderService.SearchOrdersAsync(rq);
            return orders;
        }
        [HttpPost("{Id}/reject")]
        public async Task<ActionResult> RejectOrder(Guid Id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            bool check = await _orderService.RejectOrderAsync(Id);
            if (!check)
            {
                return BadRequest();
            }
            return Ok();
        }

        [HttpPost("{Id}/accept")]
        public async Task<ActionResult> AcceptOrder(Guid Id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            await _orderService.AcceptOrderAsync(Id);

            return Ok();
        }

        [HttpPost("/frontstore/api/orders")]
        [AllowAnonymous]
        public async Task<ActionResult> Create([FromBody] OrderRequestModels.Create req)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            await _orderService.CreateAsync(req);

            return Ok();
        }
    }
}
