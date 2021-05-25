using eCommerce.Domain.Seedwork;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;

namespace eCommerce.Persistence
{
    public static class ConfigurationExtensions
    {
        /// <summary>
        /// Configures Primary Key, Soft Delete, Multitenancy, Concurrency, Audit by convention
        /// </summary>
        /// <param name="builder"></param>
        public static void ConfigureByConvention(this EntityTypeBuilder builder)
        {
            builder.ConfigureEntityDefault();
            builder.ConfigureSoftDelete();
            builder.ConfigureConcurrencyCheck();
            builder.ConfigureAudit();
        }

        private static void ConfigureSoftDelete(this EntityTypeBuilder builder)
        {
            if (typeof(ISoftDeletable).IsAssignableFrom(builder.Metadata.ClrType))
            {
                builder
                    .HasDiscriminator("IsDeleted", typeof(bool))
                    .HasValue(false);

                builder
                    .Property(typeof(bool), "IsDeleted")
                    .IsRequired()
                    .HasDefaultValue(false);

                builder
                    .Property(typeof(bool), "IsDeleted")
                    .Metadata
                    .SetAfterSaveBehavior(PropertySaveBehavior.Save);
            }
        }

        private static void ConfigureConcurrencyCheck(this EntityTypeBuilder builder)
        {
            if (typeof(IConcurrencyCheck).IsAssignableFrom(builder.Metadata.ClrType))
            {
                builder.Property(nameof(IConcurrencyCheck.RowVersion))
                    .IsRowVersion();
            }
        }

        private static void ConfigureAudit(this EntityTypeBuilder builder)
        {
            if (typeof(IAuditable).IsAssignableFrom(builder.Metadata.ClrType))
            {
                builder.Property(nameof(IAuditable.CreatedBy)).IsRequired();
            }
        }

        private static void ConfigureEntityDefault(this EntityTypeBuilder builder)
        {
            if (typeof(Entity).IsAssignableFrom(builder.Metadata.ClrType))
            {
                builder.HasKey(nameof(Entity.Id)).IsClustered(false);
                builder.HasAlternateKey(nameof(Entity.IdentityKey)).IsClustered();
                builder.Property(nameof(Entity.IdentityKey)).UseIdentityColumn().ValueGeneratedOnAdd();
                builder.Ignore(nameof(Entity.IsTransient));
            }
        }
    }
}
