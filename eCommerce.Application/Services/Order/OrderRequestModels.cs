using eCommerce.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace eCommerce.Application.Services.Order
{
    public static class OrderRequestModels
    {
        public class Search
        {
            public DateTime? StartDate { get; set; }
            public DateTime? EndDate { get; set; }
            public OrderStatuses? Status { get; set; }
            public int PageIndex { get; set; }
            public int PageSize { get; set; }
            public string OrderBy { get; set; }
        }

        public class Create
        {
            public string BuyerEmail { get; set; }
            public string BuyerName { get; set; }
            public string BuyerPhone { get; set; }
            public string Address { get; set; }
            public List<OrderItem> OrderItems { get; set; }
            public string CouponCode { get; set; }
            public decimal OrderValue { get; set; }
        }

        public  class OrderItem
        {
            public Guid ProductId { get; set; }
            public int Quantity { get; set; }
            public int ProductPrice { get; set; }
            public string PropertyString { get; set; }
        }
    }
}
