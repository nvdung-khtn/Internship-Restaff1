using eCommerce.Domain.Repositories;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using System.Linq;
using eCommerce.Application.Services.Order;
using eCommerce.Domain.Repositories.Models;
using eCommerce.Application.Shared;
using eCommerce.Domain.Shared.Models;

namespace eCommerce.Application.Services.DashBoard
{
    public class DashBoardService : IDashBoardService
    {
        private readonly IOrderRepository _orderRepository;
        private readonly IProductRepository _productRepository;
        private readonly IProductRatingRepository _productRatingRepository;
        private readonly IUserRepository _userRepository;
        private readonly ApplicationContext _appContext;
        public DashBoardService(IUserRepository userRepository, IOrderRepository orderRepository, IProductRepository productRepository, ApplicationContext appContext, IProductRatingRepository productRatingRepository)
        {
            _orderRepository = orderRepository;
            _productRepository = productRepository;
            _appContext = appContext;
            _productRatingRepository = productRatingRepository;
            _userRepository = userRepository;
        }

        public async Task<int> GetCountComment()
        {
            return await _productRatingRepository.CountCommentAsync(new SearchProductRating
            {
                Role = _appContext.Principal.Role,
                OwnerUserName = _appContext.Principal.Username,
                OwnerId = _appContext.Principal.UserId
            });
        }

        public async Task<int> GetCountProductAsync()
        {
            int count = await _productRepository.CountProductAsync(new SearchProductModel
            {
                Role = _appContext.Principal.Role,
                UserName = _appContext.Principal.Username
            });
            return count;
        }

        public async Task<int> GetCountUserAsync()
        {
            return await _orderRepository.GetCountUsersAsync(new SearchOrderModel
            {
                OwnerId = _appContext.Principal.UserId,
                OwnerUserName = _appContext.Principal.Username,
                Role = _appContext.Principal.Role
            });
        }

        public async Task<decimal> GetSumEarningsAsync()
        {
            return await _orderRepository.GetSumEarningsAsync(new SearchOrderModel
            {
                Role = _appContext.Principal.Role,
                OwnerUserName = _appContext.Principal.Username,
                OwnerId = _appContext.Principal.UserId
            });
        }

        public async Task<List<LineChartModels>> RevenueMonthly()
        {

            var users = await _userRepository.GetAllAsync();
            List<LineChartModels> lineChartModels = new List<LineChartModels>(); ;
            LineChartModels lineChart;
            if (_appContext.Principal.Role == Domain.Shared.UserRoles.Admin)
            {
                foreach (var item in users)
                {
                    lineChart = await RevenueMonthlyBySellerAsync(new SearchOrderModel(item.Id.ToString(), item.Username, item.Role));
                    lineChartModels.Add(lineChart);
                }
                return lineChartModels;
            }
            else
            {
                lineChart = await RevenueMonthlyBySellerAsync(new SearchOrderModel(
                    _appContext.Principal.UserId,
                    _appContext.Principal.Username,
                    _appContext.Principal.Role));
                lineChartModels.Add(lineChart);
            }
            return lineChartModels;
        }

        private async Task<LineChartModels> RevenueMonthlyBySellerAsync(SearchOrderModel searchOrderModel)
        {
            return await _orderRepository.RevenueMonthlyBySellerAsync(searchOrderModel);
        }

        public async Task<string> StatisticsCategories()
        {
            return await _orderRepository.StatisticsCategoriesAsync(new SearchOrderModel
            {
                Role = _appContext.Principal.Role,
                OwnerId = _appContext.Principal.UserId,
                OwnerUserName = _appContext.Principal.Username
            });
        }

        public async Task<string> StatisticsProducts()
        {
            return await _orderRepository.StatisticsProductsAsync(new SearchOrderModel
            {
                Role = _appContext.Principal.Role,
                OwnerId = _appContext.Principal.UserId,
                OwnerUserName = _appContext.Principal.Username
            });
        }
    }
}
