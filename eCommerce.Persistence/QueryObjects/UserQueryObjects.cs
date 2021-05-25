using eCommerce.Domain.Entities;
using eCommerce.Domain.Seedwork;
using eCommerce.Domain.Shared;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Text;

namespace eCommerce.Persistence.QueryObjects
{
    public static class UserQueryObjects
    {
        public class ContainsKeyword : QueryObject<User>
        {
            private string _keyword;

            public ContainsKeyword(string keyword)
            {
                _keyword = keyword;
            }

            protected override Expression<Func<User, bool>> AsExpression()
            {
                return s => s.Username.Contains(_keyword);
            }
        }

        public class IsLockout : QueryObject<User>
        {
            private UserLockStatusFilters _lockoutEnd;

            public IsLockout(UserLockStatusFilters lockoutEnd)
            {
                _lockoutEnd = lockoutEnd;
            }

            protected override Expression<Func<User, bool>> AsExpression()
            {
                return o => o.LockoutEnd != null && o.LockoutEnd >= DateTime.UtcNow; ;
            }
        }
        public class IsUnLockout : QueryObject<User>
        {
            private UserLockStatusFilters _lockoutEnd;

            public IsUnLockout(UserLockStatusFilters lockoutEnd)
            {
                _lockoutEnd = lockoutEnd;
            }

            protected override Expression<Func<User, bool>> AsExpression()
            {
                return o => o.LockoutEnd == null;
            }
        }
    }
}
