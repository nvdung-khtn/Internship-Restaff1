using eCommerce.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;


namespace eCommerce.Persistence.EntityConfigurations
{
    class KeyResetPasswordConfiguration : IEntityTypeConfiguration<KeyResetPassword>
    {
        public void Configure(EntityTypeBuilder<KeyResetPassword> builder)
        {
            // table
            builder.ToTable(nameof(KeyResetPassword));
            builder.ConfigureByConvention();
        }
    }
}

