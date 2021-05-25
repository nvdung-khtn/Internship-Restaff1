using eCommerce.Domain.Entities;
using eCommerce.Domain.Seedwork;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Text;

namespace eCommerce.Persistence.QueryObjects
{
    public static class ProductQueryObjects
    {
        public class ContainsKeyword : QueryObject<Product>
        {
            private string _keyword;

            public ContainsKeyword(string keyword)
            {
                _keyword = keyword;
            }

            protected override Expression<Func<Product, bool>> AsExpression()
            {
                return s => s.Name.Contains(_keyword);
            }
        }
        public class FilterByCategory : QueryObject<Product>
        {
            private string _keyword;

            public FilterByCategory(string keyword)
            {
                _keyword = keyword;
            }

            protected override Expression<Func<Product, bool>> AsExpression()
            {
                return s => s.Category.Name.Contains(_keyword);
            }
        }
        public class FilterBySeller : QueryObject<Product>
        {
            public string _keyword;

            public FilterBySeller(string keyword)
            {
                _keyword = keyword;
            }

            protected override Expression<Func<Product, bool>> AsExpression()
            {
                return s => s.CreatedBy.Equals(_keyword);
            }
        }
        public class FilterByCategoryId : QueryObject<Product>
        {
            public Guid _categoryId;

            public FilterByCategoryId(Guid keyword)
            {
                _categoryId = keyword;
            }

            protected override Expression<Func<Product, bool>> AsExpression()
            {
                return s => s.CategoryId == _categoryId;
            }
        }

        public class FilterByPrice : QueryObject<Product>
        {
            public decimal _minPrice;
            public decimal _maxPrice;
            public FilterByPrice(decimal minPrice, decimal maxPrice)
            {
                _minPrice = minPrice;
                _maxPrice = maxPrice;
            }

            protected override Expression<Func<Product, bool>> AsExpression()
            {
                return p => p.Price >= _minPrice && p.Price <= _maxPrice;
            }
        }

        public class FilterByDeleted : QueryObject<Product>
        {
            protected override Expression<Func<Product, bool>> AsExpression()
            {
                return p => p.IsDeleted == false;
            }
        }
    }
}
