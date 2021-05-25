using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using LinqKit;

namespace eCommerce.Domain.Seedwork
{
    public abstract class QueryObject<T> where T : Entity
    {
        public static QueryObject<T> Empty => new EmptyQueryObject<T>();

        private readonly Dictionary<string, string> _orderBy = new Dictionary<string, string>();
        private Expression<Func<T, bool>> _query;

        /// <summary>
        /// Original expression
        /// </summary>
        protected abstract Expression<Func<T, bool>> AsExpression();

        public string OrderBy => string.Join(",", _orderBy.Select(x => $"{x.Key} {x.Value}"));

        /// <summary>
        /// Final expression
        /// </summary>
        public Expression<Func<T, bool>> Expression => _query ?? AsExpression();

        public QueryObject<T> And(QueryObject<T> queryObject)
        {
            And(queryObject.AsExpression());
            return this;
        }

        public QueryObject<T> Or(QueryObject<T> queryObject)
        {
            Or(queryObject.AsExpression());
            return this;
        }

        public void AddOrderBy(string fieldName, bool isDescending)
        {
            var direction = "ASC";
            if (isDescending)
            {
                direction = "DESC";
            }

            _orderBy.Add(fieldName, direction);
        }

        private void And(Expression<Func<T, bool>> query)
        {
            _query = _query ?? AsExpression();
            _query = _query == null ? query : _query.And(query.Expand());
        }

        private void Or(Expression<Func<T, bool>> query)
        {
            _query = _query ?? AsExpression();
            _query = _query == null ? query : _query.Or(query.Expand());
        }
    }

    /// <summary>
    /// Empty query object with no filter condition
    /// </summary>
    /// <typeparam name="T"></typeparam>
    public class EmptyQueryObject<T> : QueryObject<T> where T : Entity
    {
        protected override Expression<Func<T, bool>> AsExpression()
        {
            return x => 1 == 1;
        }
    }
}
