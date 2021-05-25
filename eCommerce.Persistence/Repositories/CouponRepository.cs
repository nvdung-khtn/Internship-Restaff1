using eCommerce.Domain.Entities;
using eCommerce.Domain.Repositories;
using eCommerce.Domain.Repositories.Models;
using eCommerce.Domain.Seedwork;
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
    class CouponRepository : ICouponRepository
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly GenericRepository<Coupon> _genericRepo;

        public IUnitOfWork UnitOfWork => _dbContext;

        public CouponRepository(ApplicationDbContext context)
        {
            _dbContext = context;
            _genericRepo = new GenericRepository<Coupon>(_dbContext.Set<Coupon>());
        }

        public Coupon Add(Coupon coupon)
        {
            return _genericRepo.Add(coupon);
        }

        public void Update(Coupon coupon)
        {
            _genericRepo.Update(coupon);
        }

        public void Detete(Coupon coupon)
        {
            _genericRepo.Delete(coupon);
        }

        public Task<Coupon> GetCouponById(Guid id)
        {
            return _genericRepo.GetByIdAsync(id);
        }

        public async Task<PaginatedResult<Coupon>> SearchAsync(SearchCouponModel req)
        {
            // filter
            var queryObject = QueryObject<Coupon>.Empty;

            if (!string.IsNullOrWhiteSpace(req.Keyword))
            {
                var keyword = req.Keyword;
                queryObject.And(new CouponQueryObjects.ContainsKeyword(keyword));
            }

            //Filter by start date
            if (req.StartDate.HasValue)
            {
                var startDate = req.StartDate.Value;
                queryObject.And(new CouponQueryObjects.FilterByStartDate(req.StartDate));
            }

            //Filter by end date
            if (req.EndDate.HasValue)
            {
                var endDate = req.EndDate.Value;
                queryObject.And(new CouponQueryObjects.FilterByEndDate(req.EndDate));
            }

            // filter by value of coupon
            if (req.Value > 0)
            {
                var value = req.Value;
                queryObject.And(new CouponQueryObjects.FilterByValue(value));
            }

            // fillter by min price
            if (req.MinPrice.HasValue)
            {
                var minPrice = req.MinPrice.Value;
                queryObject.And(new CouponQueryObjects.FilterByMinPrice(minPrice));
            }

            //fillter by code
            if(req.Code != null)
            {
                queryObject.And(new CouponQueryObjects.FilterByCode(req.Code));
            }

            // orderby
            if (!req.Sort.Any())
            {
                req.Sort.Add(new SortItem { FieldName = nameof(Coupon.IdentityKey) });
            }

            req.Sort.ForEach(x => queryObject.AddOrderBy(x.FieldName, x.IsDescending));

            // execute
            var result = await _genericRepo.SearchAsync(queryObject, req.Pagination);
            return result;
        }

        public async Task<Coupon> GetCouponByCodeAsync(string code)
        {
            return await _dbContext.Set<Coupon>().SingleOrDefaultAsync(x => x.Code == code);
        }

        public async Task<IEnumerable<Coupon>> GetAllValidCouponAsync(decimal? valueOrder)
        {
            // filter
            var queryObject = QueryObject<Coupon>.Empty;
            
            // fillter by value order
            if (valueOrder.HasValue)
            {
                var value = valueOrder.Value;
                queryObject.And(new CouponQueryObjects.FilterByValueOrder(value));
            }

            // fillter coupon is valid
            queryObject.And(new CouponQueryObjects.IsValid());

            // execute
            var result = await _genericRepo.SearchAsync(queryObject);
            return result;
        }
    }
}
