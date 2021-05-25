using System;

namespace eCommerce.Domain.Seedwork
{
    public interface IAuditable
    {
        DateTime CreatedDate { get; set; }

        string CreatedBy { get; set; }

        DateTime? LastUpdated { get; set; }

        string LastUpdatedBy { get; set; }
    }
}
