using eCommerce.Domain.Seedwork;
using eCommerce.Domain.Shared.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Query;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Linq.Dynamic.Core;

namespace eCommerce.Persistence.Repositories
{
    internal class GenericRepository<T> where T : Entity
    {
        private readonly DbSet<T> _dbSet;

        public GenericRepository(DbSet<T> dbSet)
        {
            _dbSet = dbSet;
        }

        public void Remove(T entity)
        {
            _dbSet.Remove(entity);
        }

        public T Add(T entity)
        {
            return _dbSet.Add(entity).Entity;
        }

        public void Update(T entity)
        {
            _dbSet.Update(entity);
        }

        public void Delete(T entity)
        {
            _dbSet.Remove(entity);
        }

        public async Task<PaginatedResult<T>> SearchAsync(QueryObject<T> queryObject, Pagination pagingRq, Func<IQueryable<T>, IIncludableQueryable<T, object>> includeProperties = null)
        {
            var query = _dbSet.AsNoTracking().Where(queryObject.Expression);

            if (!string.IsNullOrEmpty(queryObject.OrderBy))
            {
                query = query.OrderBy(queryObject.OrderBy);
            }

            if (includeProperties != null)
            {
                query = includeProperties(query);
            }

            var totalRows = await query.CountAsync();

            if (totalRows == 0)
            {
                return new PaginatedResult<T> { Items = null, TotalPages = 0, TotalRows = 0 };

            }

            var items = await query.Skip(pagingRq.PageIndex * pagingRq.ItemsPerPage).Take(pagingRq.ItemsPerPage).ToListAsync();
            var totalPages = (totalRows + pagingRq.ItemsPerPage - 1) / pagingRq.ItemsPerPage;

            return new PaginatedResult<T> { Items = items, TotalPages = totalPages, TotalRows = totalRows };
        }

        public async Task<IEnumerable<T>> SearchAsync(QueryObject<T> queryObject, Func<IQueryable<T>, IIncludableQueryable<T, object>> includeProperties = null)
        {
            var query = _dbSet.AsNoTracking().Where(queryObject.Expression);

            if (!string.IsNullOrEmpty(queryObject.OrderBy))
            {
                query = query.OrderBy(queryObject.OrderBy);
            }

            if (includeProperties != null)
            {
                query = includeProperties(query);
            }

            var items = await query.ToListAsync();

            return items;
        }

        public async Task<IEnumerable<T>> GetAllAsync()
        {
            var query = _dbSet.AsNoTracking();

            var items = await query.ToListAsync();

            return items;
        }

        public async Task<T> GetByIdAsync(Guid id, Func<IQueryable<T>, IIncludableQueryable<T, object>> includeProperties = null)
        {
            var query = _dbSet.AsQueryable();

            if (includeProperties != null)
            {
                query = includeProperties(query);
            }

            var result = await query.FirstOrDefaultAsync(x => x.Id == id);
            return result;
        }
    }
}
