using System;
using System.Collections.Generic;
using System.Text;

namespace eCommerce.Domain.Shared.Exceptions
{
    public class BusinessException : Exception
    {
        public BusinessException()
        {
        }

        public BusinessException(string message)
            : base(message)
        {
        }

        public BusinessException(string message, Exception inner)
            : base(message, inner)
        {
        }
    }

    public class EntityNotFound : BusinessException
    {
        public EntityNotFound(string entity) : base($"{entity} was not found.")
        {
        }
    }
}
