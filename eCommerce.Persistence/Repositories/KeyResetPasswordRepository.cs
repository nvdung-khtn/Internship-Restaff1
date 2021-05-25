using eCommerce.Domain.Entities;
using eCommerce.Domain.Repositories;
using eCommerce.Domain.Seedwork;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace eCommerce.Persistence.Repositories
{
    public class KeyResetPasswordRepository : IKeyResetPasswordRepository
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly GenericRepository<KeyResetPassword> _genericRepo;
        public IUnitOfWork UnitOfWork => _dbContext;

        public KeyResetPasswordRepository(ApplicationDbContext context)
        {
            _dbContext = context;
            _genericRepo = new GenericRepository<KeyResetPassword>(_dbContext.Set<KeyResetPassword>());
        }

        public KeyResetPassword Add(KeyResetPassword keyResetPassword)
        {
            KeyResetPassword rp = _genericRepo.Add(keyResetPassword);
            return rp;
        }

        public async Task<KeyResetPassword> FindByUsername(string username)
        {
            var keyResetPassword = await _dbContext.Set<KeyResetPassword>().SingleOrDefaultAsync(x => x.User.Username == username);
            return keyResetPassword;
        }

        public void Remove(KeyResetPassword keyResetPassword)
        {
            _genericRepo.Remove(keyResetPassword);
        }
    }
}
