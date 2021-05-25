using eCommerce.Domain.Entities;
using eCommerce.Domain.Seedwork;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Text;

namespace eCommerce.Persistence.QueryObjects
{
    public class ProductRatingQueryObject
    {
        public class BelongsToProduct : QueryObject<ProductRating>
        {
            private Guid _productId;

            public BelongsToProduct(Guid productId)
            {
                _productId = productId;
            }

            protected override Expression<Func<ProductRating, bool>> AsExpression()
            {
                return p => p.ProductId == _productId;
            }
        }

        internal class FilterByCurrentUserName : QueryObject<ProductRating>
        {
            private string _userName;

            public FilterByCurrentUserName(string userName)
            {
                this._userName = userName;
            }

            protected override Expression<Func<ProductRating, bool>> AsExpression()
            {
                return o => o.Product.Owner.Username.Equals(this._userName);
            }
        }
    }
}
