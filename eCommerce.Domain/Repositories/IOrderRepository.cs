using eCommerce.Domain.Entities;
using eCommerce.Domain.Enums;
using eCommerce.Domain.Repositories.Models;
using eCommerce.Domain.Seedwork;
using eCommerce.Domain.Shared.Models;
using System;
using System.Threading.Tasks;

namespace eCommerce.Domain.Repositories

{
    public interface IOrderRepository : IRepository<Order>
    {
        Task<PaginatedResult<Order>> SearchAsync(SearchOrderModel searchOrderModel);
        Task<Order> GetOrderByIdAsync(Guid Id);
        Task<bool> UpdateStatusAsync(Guid Id, OrderStatuses orderStatuses);
        Order Add(Order order);

        /// <summary>
        /// Count buyer from order
        /// </summary>
        /// <param name="rq"></param>
        /// <returns></returns>
        Task<int> GetCountUsersAsync(SearchOrderModel rq);

        /// <summary>
        /// Get Sum Earning Form Orders
        /// </summary>
        /// <param name="rq"></param>
        /// <returns></returns>
        Task<decimal> GetSumEarningsAsync(SearchOrderModel rq);

        /// <summary>
        /// Statistics Categories
        /// </summary>
        /// <param name="rq"></param>
        /// <returns></returns>
        Task<string> StatisticsCategoriesAsync(SearchOrderModel rq);

        /// <summary>
        /// Statistics Products
        /// </summary>
        /// <param name="rq"></param>
        /// <returns></returns>
        Task<string> StatisticsProductsAsync(SearchOrderModel rq);

        /// <summary>
        /// Statistics Revenue Monthly By Seller 
        /// </summary>
        /// <param name="rq"></param>
        /// <returns></returns>
        Task<LineChartModels> RevenueMonthlyBySellerAsync(SearchOrderModel rq);
    }
}