using eCommerce.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;

namespace eCommerce.Persistence.EntityConfigurations
{
    class OrderConfiguration : IEntityTypeConfiguration<Order>
    {
        public void Configure(EntityTypeBuilder<Order> builder)
        {
            // table
            builder.ToTable(nameof(Order));
            builder.ConfigureByConvention();
            builder.Ignore(order => order.TotalAmount);
        }
    }
}
