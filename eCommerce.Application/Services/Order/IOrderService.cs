using eCommerce.Domain.Shared.Models;
using System;
using System.Threading.Tasks;

namespace eCommerce.Application.Services.Order
{
    public interface IOrderService
    {
        Task<PaginatedResult<OrderReturnModel.Order>> SearchOrdersAsync(OrderRequestModels.Search rq);
        Task<bool> RejectOrderAsync(Guid Id);        
        Task<bool> AcceptOrderAsync(Guid Id);
        Task CreateAsync(OrderRequestModels.Create req);
    }
}