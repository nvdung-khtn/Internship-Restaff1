using System;
using System.Threading;
using System.Threading.Tasks;

namespace eCommerce.Domain.Seedwork
{
    public interface IUnitOfWork : IDisposable
    {
        Task SaveChangesAsync(ConcurrencyResolutionStrategy strategy = ConcurrencyResolutionStrategy.None, CancellationToken cancellationToken = default);
    }
}
