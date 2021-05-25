using eCommerce.Domain.Entities;
using eCommerce.Domain.Repositories.Models;
using eCommerce.Domain.Seedwork;
using eCommerce.Domain.Shared.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace eCommerce.Domain.Repositories
{
    public interface IInventoryRepository : IRepository<Inventory>
    {
        Task<PaginatedResult<Inventory>> SearchAsync(SearchInventoryModel rq);
        Inventory Add(Inventory inventory);
        Task<Inventory> FindByIdAsync(Guid id);
        void Update(Inventory inventory);
        Task<int> ReduceQuantityAsync(Guid Id, int quantity);
        Task<bool> CheckQuantityAsync(int quantityInventory, int quantityOrder);        
    }
}
