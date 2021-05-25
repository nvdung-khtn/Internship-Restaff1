using System;
using System.Collections.Generic;
using System.Text;

namespace eCommerce.Domain.Shared.Exceptions
{
    public class DbConcurrencyException : Exception
    {
        public DbConcurrencyException()
            : base("Quantity has been changed, you must reload website")
        {
        }

    }
}
