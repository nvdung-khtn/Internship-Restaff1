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
    public interface ICouponRepository : IRepository<Coupon>
    {
        Task<PaginatedResult<Coupon>> SearchAsync(SearchCouponModel req);
        Coupon Add(Coupon coupon);
        void Update(Coupon coupon);
        void Detete(Coupon coupon);
        Task<Coupon> GetCouponById(Guid id);
        Task<Coupon> GetCouponByCodeAsync(string code);
        Task<IEnumerable<Coupon>> GetAllValidCouponAsync(decimal? valueOrder);
    }
}
