using eCommerce.Domain.Shared.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace eCommerce.Application.Services.DashBoard
{
    public interface IDashBoardService
    {
        /// <summary>
        /// Get SumEarnings 
        /// </summary>
        /// <returns></returns>
        Task<decimal> GetSumEarningsAsync();

        /// <summary>
        /// Get CountUser 
        /// </summary>
        /// <returns></returns>
        Task<int> GetCountUserAsync();

        /// <summary>
        /// Get CountComment
        /// </summary>
        /// <returns></returns>
        Task<int> GetCountComment();

        /// <summary>
        /// Get CountProduct
        /// </summary>
        /// <returns></returns>
        Task<int> GetCountProductAsync();

        /// <summary>
        /// Statistics Categories
        /// </summary>
        /// <returns></returns>
        Task<string> StatisticsCategories();

        /// <summary>
        /// Statistics Products
        /// </summary>
        /// <returns></returns>
        Task<string> StatisticsProducts();

        /// <summary>
        /// Revenue Monthly
        /// </summary>
        /// <returns></returns>
        Task<List<LineChartModels>> RevenueMonthly();
    }
}
