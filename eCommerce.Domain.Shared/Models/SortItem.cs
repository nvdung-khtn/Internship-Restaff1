using System;
using System.Collections.Generic;
using System.Text;

namespace eCommerce.Domain.Shared.Models
{
    public class SortItem
    {
        public string FieldName { get; set; }

        public bool IsDescending { get; set; }
    }
}
