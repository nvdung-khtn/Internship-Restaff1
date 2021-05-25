using eCommerce.Domain.Seedwork;
using System;
using System.Collections.Generic;
using System.Text;

namespace eCommerce.Domain.Entities
{
    public class ProductRating : Entity
    {
        public string FullName { get; set; }

        public Guid ProductId { get; set; }

        public Product Product { get; set; }

        public string Email { get; set; }

        public string ReviewTitle { get; set; }

        public string ReviewContent { get; set; }

        public int NumberStar { get; set; }

        public DateTime CreatedDate { get; set; }
    }
}
