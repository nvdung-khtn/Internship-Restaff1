using eCommerce.Application.Shared;
using eCommerce.Domain.Seedwork;
using eCommerce.Domain.Shared.Exceptions;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;

namespace eCommerce.Persistence
{
    public class ApplicationDbContext : DbContext, IUnitOfWork
    {
        private readonly ApplicationContext _applicationContext;
        private readonly IConfiguration _configuration;

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }

        public ApplicationDbContext(ApplicationContext applicationContext, IConfiguration configuration)
        {
            _applicationContext = applicationContext;
            _configuration = configuration;
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                var connectionString = _configuration.GetConnectionString("DefaultConnection");
                optionsBuilder.UseSqlServer(connectionString,
                    sqlOptions =>
                    {
                        sqlOptions.EnableRetryOnFailure(10, TimeSpan.FromSeconds(30), errorNumbersToAdd: null);
                    });
            }
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            ConfigureEntities(builder);
        }

        public async Task SaveChangesAsync(ConcurrencyResolutionStrategy strategy = ConcurrencyResolutionStrategy.None, CancellationToken cancellationToken = default)
        {
            bool saveFailed;

            switch (strategy)
            {
                case ConcurrencyResolutionStrategy.None:
                    try
                    {
                        // https://stackoverflow.com/questions/4402586/optimisticconcurrencyexception-does-not-work-in-entity-framework-in-certain-situ
                        var isRowVersionChanged = ChangeTracker.Entries()
                            .Any(x => x.Properties.Any(m => m.Metadata.Name == "RowVersion") && x.CurrentValues.GetValue<byte[]>("RowVersion") != null && !x.CurrentValues.GetValue<byte[]>("RowVersion").SequenceEqual(x.OriginalValues.GetValue<byte[]>("RowVersion")));
                        if (isRowVersionChanged)
                        {
                            throw new DbConcurrencyException();
                        }

                        PreSaveChanges();

                        await SaveChangesAsync(cancellationToken);
                    }
                    catch (DbUpdateConcurrencyException ex)
                    {
                        throw new DbConcurrencyException();
                    }

                    break;
                case ConcurrencyResolutionStrategy.DatabaseWin:
                    do
                    {
                        saveFailed = false;

                        try
                        {
                            PreSaveChanges();

                            await SaveChangesAsync(cancellationToken);
                        }
                        catch (DbUpdateConcurrencyException ex)
                        {
                            saveFailed = true;

                            // Update the values of the Entity that failed to save from the store 
                            ex.Entries.Single().Reload();
                        }

                    } while (saveFailed);

                    break;
                case ConcurrencyResolutionStrategy.ClientWin:
                    do
                    {
                        saveFailed = false;
                        try
                        {
                            PreSaveChanges();

                            await SaveChangesAsync(cancellationToken);
                        }
                        catch (DbUpdateConcurrencyException ex)
                        {
                            saveFailed = true;

                            // Update original values from the database 
                            var entry = ex.Entries.Single();
                            entry.OriginalValues.SetValues(entry.GetDatabaseValues());
                        }

                    } while (saveFailed);


                    break;
            }
        }

        private void PreSaveChanges()
        {
            foreach (var entry in ChangeTracker.Entries())
            {
                if (entry.Entity is Entity entity)
                {
                    if (entity.IsTransient)
                    {
                        entry.State = EntityState.Added;
                    }
                }

                if (entry.State == EntityState.Deleted && entry.Entity is ISoftDeletable)
                {
                    HandleSoftDelete(entry);
                }

                if ((entry.State == EntityState.Added || entry.State == EntityState.Modified) && entry.Entity is IAuditable)
                {
                    HandleAudit(entry);
                }
            }
        }

        private void ConfigureEntities(ModelBuilder builder)
        {
            builder.ApplyConfigurationsFromAssembly(typeof(ApplicationDbContext).Assembly);
        }

        private void HandleSoftDelete(EntityEntry entry)
        {
            entry.Property("IsDeleted").CurrentValue = true;
            entry.State = EntityState.Modified;
        }

        private void HandleAudit(EntityEntry entry)
        {
            var auditable = (IAuditable)entry.Entity;

            if (entry.State == EntityState.Added)
            {
                //auditable.CreatedBy = _applicationContext.Principal.UserId;
                auditable.CreatedBy = _applicationContext.Principal.Username;
                auditable.CreatedDate = DateTime.UtcNow;
                //auditable.LastUpdatedBy = _applicationContext.Principal.UserId;
                auditable.LastUpdatedBy = _applicationContext.Principal.Username;
                auditable.LastUpdated = DateTime.UtcNow;
            }
            else
            {
                //auditable.LastUpdatedBy = _applicationContext.Principal.UserId;
                auditable.LastUpdatedBy = _applicationContext.Principal.Username;
                auditable.LastUpdated = DateTime.UtcNow;
            }
        }
    }
}
