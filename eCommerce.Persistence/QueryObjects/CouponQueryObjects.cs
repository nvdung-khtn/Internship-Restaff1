using eCommerce.Domain.Entities;
using eCommerce.Domain.Seedwork;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Text;

namespace eCommerce.Persistence.QueryObjects
{
    public class CouponQueryObjects
    {
        public class ContainsKeyword : QueryObject<Coupon>
        {
            private string _keyword;

            public ContainsKeyword(string keyword)
            {
                _keyword = keyword;
            }

            protected override Expression<Func<Coupon, bool>> AsExpression()
            {
                return s => s.Name.Contains(_keyword);
            }
        }

        public class FilterByStartDate : QueryObject<Coupon>
        {
            private DateTime? _startDate;

            public FilterByStartDate(DateTime? dateTime)
            {
                _startDate = dateTime;
            }

            protected override Expression<Func<Coupon, bool>> AsExpression()
            {
                return o => DateTime.Compare(_startDate.Value, o.CreatedDate) <= 0;
            }
        }

        public class FilterByEndDate : QueryObject<Coupon>
        {
            private DateTime? _endDate;

            public FilterByEndDate(DateTime? dateTime)
            {
                _endDate = dateTime;
            }

            protected override Expression<Func<Coupon, bool>> AsExpression()
            {
                return o => DateTime.Compare(o.CreatedDate, _endDate.Value) <= 0;
            }
        }

        public class FilterByValue : QueryObject<Coupon>
        {
            private decimal _value;

            public FilterByValue(decimal value)
            {
                _value = value;
            }

            protected override Expression<Func<Coupon, bool>> AsExpression()
            {
                return s => s.Value == _value;
            }
        }

        public class FilterByMinPrice : QueryObject<Coupon>
        {
            private decimal _minPrice;

            public FilterByMinPrice(decimal minPrice)
            {
                _minPrice = minPrice;
            }

            protected override Expression<Func<Coupon, bool>> AsExpression()
            {
                return s => s.MinPrice >= _minPrice;
            }
        }

        public class FilterByCode : QueryObject<Coupon>
        {
            private string _code;

            public FilterByCode(string code)
            {
                _code = code;
            }

            protected override Expression<Func<Coupon, bool>> AsExpression()
            {
                return s => s.Code == _code;
            }
        }

        public class IsValid : QueryObject<Coupon>
        {
            private DateTime _now;

            public IsValid()
            {
                _now = DateTime.UtcNow;
            }

            protected override Expression<Func<Coupon, bool>> AsExpression()
            {
                return s => s.StartDate <= _now && s.EndDate >= _now;
            }
        }

        public class FilterByValueOrder : QueryObject<Coupon>
        {
            private decimal _valueOrder;

            public FilterByValueOrder(decimal valueOrder)
            {
                _valueOrder = valueOrder;
            }

            protected override Expression<Func<Coupon, bool>> AsExpression()
            {
                return s => s.MinPrice <= _valueOrder;
            }
        }

    }
}
