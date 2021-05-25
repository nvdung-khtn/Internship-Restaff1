using System;
using System.Collections.Generic;
using System.Text;

namespace eCommerce.Domain.Shared
{
    public enum UserRoles
    {
        Admin = 1,
        Seller
    }
    public enum UserLockStatusFilters
    {
        All,
        Lock,
        Unlock
    }
}
