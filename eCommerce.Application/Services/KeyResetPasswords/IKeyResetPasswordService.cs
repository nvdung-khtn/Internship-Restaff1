using eCommerce.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace eCommerce.Application.Services.KeyResetPasswords
{
    public interface IKeyResetPasswordService
    {
        Task<string> AddAsync(User u);
        Task VerifyKeyAsync(string username, string keyParam);
    }
}
