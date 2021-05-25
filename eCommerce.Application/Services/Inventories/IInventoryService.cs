using eCommerce.Domain.Entities;
using eCommerce.Domain.Shared.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace eCommerce.Application.Services.Inventories
{
    public interface IInventoryService
    {
        /// <summary>
        /// Searchs users
        /// </summary>
        /// <param name="rq"></param>
        /// <returns></returns>
        Task<PaginatedResult<InventoryReturnModels.Inventory>> SearchInventoriesAsync(InventoryRequestModels.Search rq);
        Task UpdateAsync(InventoryRequestModels.Update rq);
    }
}
