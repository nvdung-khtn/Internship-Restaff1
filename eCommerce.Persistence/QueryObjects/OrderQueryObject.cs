using eCommerce.Domain.Entities;
using eCommerce.Domain.Enums;
using eCommerce.Domain.Seedwork;
using eCommerce.Domain.Shared;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Text;

namespace eCommerce.Persistence.QueryObjects
{
    public static class OrderQueryObject
    {
        public class FilterByStartDate : QueryObject<Order>
        {
            private DateTime _startDate;

            public FilterByStartDate(DateTime dateTime)
            {
                _startDate = dateTime;
            }

            protected override Expression<Func<Order, bool>> AsExpression()
            {
                return o => DateTime.Compare(_startDate, o.CreatedDate) <= 0; 
            }
        }   

        public class FilterByEndDate : QueryObject<Order>
        {
            private DateTime _endDate;

            public FilterByEndDate(DateTime dateTime)
            {
                _endDate = dateTime;
            }

            protected override Expression<Func<Order, bool>> AsExpression()
            {
                return o => DateTime.Compare(o.CreatedDate, _endDate) <= 0;
            }
        }

        public class HasStatus : QueryObject<Order>
        {
            private OrderStatuses _status;

            public HasStatus(OrderStatuses status)
            {
                _status = status;
            }

            protected override Expression<Func<Order, bool>> AsExpression()
            {
                return o => o.Status == _status;
            }
        }

        public class HasRole : QueryObject<Order>
        {
            private UserRoles _role;

            public HasRole(UserRoles role)
            {
                _role = role;
            }

            protected override Expression<Func<Order, bool>> AsExpression()
            {
                return o => o.Product.Owner.Role == _role;
            }
        }

        public class FilterByCurrentUserName : QueryObject<Order>
        {
            private string _username;
            public FilterByCurrentUserName(string username)
            {
                _username = username;
            }

            protected override Expression<Func<Order, bool>> AsExpression()
            {
                return o => o.Product.Owner.Username.Equals(_username);
            }
        }
    }
}
