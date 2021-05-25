using System;
using System.Collections.Generic;

namespace eCommerce.Domain.Seedwork
{
    public abstract class Entity
    {
        /// <summary>
        /// Non-clustered PK
        /// </summary>
        public Guid Id { get; set; }

        /// <summary>
        /// Clustered identity column
        /// </summary>
        public int IdentityKey { get; private set; }

        public bool IsTransient => IdentityKey == 0;
    }
}
