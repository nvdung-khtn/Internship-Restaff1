using eCommerce.Domain.Entities;
using eCommerce.Domain.Repositories.Models;
using eCommerce.Domain.Seedwork;
using eCommerce.Domain.Shared.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace eCommerce.Domain.Repositories
{
    public interface IUserRepository : IRepository<User>
    {
        User Add(User user);

        void Update(User user);

        Task<User> GetByIdAsync(Guid id);
        Task<User> GetUserByUsernameAsync(string username);
        Task<PaginatedResult<User>> SearchAsync(SearchUserModel rq);
        Task<int> CountUsersAsync();
        Task<IEnumerable<User>> GetAllAsync();
    }
}
