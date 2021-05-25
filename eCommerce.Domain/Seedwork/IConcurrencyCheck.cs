using System;
using System.Collections.Generic;
using System.Text;

namespace eCommerce.Domain.Seedwork
{
    public interface IConcurrencyCheck
    {
        byte[] RowVersion { get; set; }
    }
}
