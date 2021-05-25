using eCommerce.Domain.Seedwork;
using System;
using System.Collections.Generic;
using System.Text;

namespace eCommerce.Domain.Entities
{
    public class Product : Entity, IAuditable, ISoftDeletable
    {
        public string Name { get; set; }
        public decimal Price { get; set; }

        public Guid CategoryId { get; set; }
        public ProductCategory Category { get; set; }

        public Guid OwnerId { get; set; }
        public User Owner { get; set; }
        public string Description { get; set; }
        public Inventory Inventory { get; set; }

        public List<ProductPhoto> Photos { get; set; }

        public DateTime CreatedDate { get; set; }
        public string CreatedBy { get; set; }
        public DateTime? LastUpdated { get; set; }
        public string LastUpdatedBy { get; set; }
        public bool IsDeleted { get; set; }

        //public Product(List<string> photos)
        //{
        //    if(Photos == null)
        //    {
        //        Photos = new List<ProductPhoto>();
        //    }
        //    foreach(var photo  in photos)
        //    {
        //        Photos.Add(new ProductPhoto() { Url = photo });
        //    }
        //}
    }
}
