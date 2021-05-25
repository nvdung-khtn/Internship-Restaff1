using eCommerce.Domain.Entities;
using eCommerce.Domain.Repositories;
using eCommerce.Domain.Repositories.Models;
using eCommerce.Domain.Seedwork;
using eCommerce.Domain.Shared;
using eCommerce.Domain.Shared.Models;
using eCommerce.Persistence.QueryObjects;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace eCommerce.Persistence.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly GenericRepository<User> _genericRepo;

        public IUnitOfWork UnitOfWork => _dbContext;

        public UserRepository(ApplicationDbContext context)
        {
            _dbContext = context;
            _genericRepo = new GenericRepository<User>(_dbContext.Set<User>());
        }

        public User Add(User user)
        {
            User rp = _genericRepo.Add(user);
            return rp;
        }

        public Task<User> GetByIdAsync(Guid id)
        {
            return _genericRepo.GetByIdAsync(id);
        }

        public void Update(User user)
        {
            _genericRepo.Update(user);
        }

        public async Task<User> GetUserByUsernameAsync(string username)
        {
            var user = await _dbContext.Set<User>().SingleOrDefaultAsync(x => x.Username == username);
            return user;
        }

        public async Task<PaginatedResult<User>> SearchAsync(SearchUserModel rq)
        {
            // filter
            var queryObject = QueryObject<User>.Empty;

            if (!string.IsNullOrWhiteSpace(rq.Keyword))
            {
                var keyword = rq.Keyword;
                queryObject.And(new UserQueryObjects.ContainsKeyword(keyword));
            }

            // filter lockout status
            switch (rq.IsLockout)
            {
                case UserLockStatusFilters.Lock:
                    queryObject.And(new UserQueryObjects.IsLockout(rq.IsLockout));
                    break;
                case UserLockStatusFilters.Unlock:
                    queryObject.And(new UserQueryObjects.IsUnLockout(rq.IsLockout));
                    break;
                default:
                    break;
            }

            // orderby
            if (!rq.Sort.Any())
            {
                rq.Sort.Add(new SortItem { FieldName = nameof(User.IdentityKey) });
            }

            rq.Sort.ForEach(x => queryObject.AddOrderBy(x.FieldName, x.IsDescending));


            // execute
            var result = await _genericRepo.SearchAsync(queryObject, rq.Pagination);
            return result;
        }

        public async Task<int> CountUsersAsync()
        {
            int countUsers = 0;
            var test = await _genericRepo.GetAllAsync();
            countUsers = test.Count();
            return countUsers;
        }

        public async Task<IEnumerable<User>> GetAllAsync()
        {
            return await _genericRepo.GetAllAsync();
        }
    }
}
