using eCommerce.Application.Services.Inventories;
using eCommerce.Application.Shared;
using eCommerce.Domain.Entities;
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
    public class InventoriesController : ControllerBase
    {
        private readonly IInventoryService _iventoriesService;

        public InventoriesController(IInventoryService iventoriesService)
        {
            _iventoriesService = iventoriesService;
        }

        [HttpGet]
        [Authorize(Policy = "PermissionSeller")]
        public async Task<PaginatedResult<InventoryReturnModels.Inventory>> Search([FromQuery] InventoryRequestModels.Search rq)
        {
            var inventories = await _iventoriesService.SearchInventoriesAsync(rq);
            return inventories;
        }

        [HttpPut]
        [Authorize(Policy = "PermissionSeller")]
        public async Task<ActionResult> UpdateInventory([FromBody] InventoryRequestModels.Update rq)
        {
            await _iventoriesService.UpdateAsync(rq);
            return Ok();
        }
    }
}
