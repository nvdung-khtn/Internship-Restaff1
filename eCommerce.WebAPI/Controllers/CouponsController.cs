using eCommerce.Application.Services.Coupons;
using eCommerce.Application.Services.Products;
using eCommerce.Domain.Shared.Exceptions;
using eCommerce.Domain.Shared.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace eCommerce.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class CouponsController: ControllerBase
    {
        private readonly ICouponService _couponService;
        
        public CouponsController(ICouponService couponService)
        {
            _couponService = couponService;
        }

        [HttpGet]
        public async Task<ActionResult<PaginatedResult<CouponReturnModels.Coupon>>> Search([FromQuery] CouponRequestModels.Search req)
        {
            var coupon = await _couponService.SearchCouponsAsync(req);
            return coupon;
        }

        [HttpPost]
        public async Task<ActionResult<CouponReturnModels.Coupon>> Create([FromBody] CouponRequestModels.Create req)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var couponId = await _couponService.CreateAsync(req);
            var coupon = await _couponService.GetCouponByIdAsync(couponId);

            return coupon;
        }

        [HttpPatch("{couponId}")]
        public async Task<ActionResult> Update([FromBody] CouponRequestModels.Update req, Guid couponId)
        {
            await _couponService.UpdateCouponAsync(req, couponId);

            var newCoupon = await _couponService.GetCouponByIdAsync(couponId);
            return Ok(newCoupon);
        }

        [HttpDelete("{couponId}")]
        public async Task<ActionResult> Detele(Guid couponId)
        {
            await _couponService.DeleteCouponAsync(couponId);
            return Ok();
        }

        [HttpGet("{couponId}")] //[POST] api/Coupons/:couponId;
        public async Task<ActionResult<CouponReturnModels.Coupon>> GetCouponDetail(Guid couponId)
        {
            var coupon = await _couponService.GetCouponByIdAsync(couponId);

            if (coupon == null)
            {
                return NotFound();
            }

            return coupon;
        }

        [HttpGet("/frontstore/api/coupons/verify")]
        [AllowAnonymous]
        public async Task<ActionResult<decimal>> FrontStoreVerifyCoupon([FromQuery]CouponRequestModels.Verify req)
        {
            var coupon = await _couponService.GetCouponByCodeAsync(req.code);
            if (coupon == null)
            {
                throw new BusinessException("Coupon is invalid");
            }

            return _couponService.IsValidCoupon(coupon, req.orderValue);
        }

        [HttpGet("/frontstore/api/coupons/valid")]
        [AllowAnonymous]
        public async Task<ActionResult<List<CouponReturnModels.Coupon>>> FrontStoreGetValidCoupon([FromQuery] CouponRequestModels.GetValidCoupon req)
        {
            var coupons = await _couponService.GetAllValidCouponAsync(req);

            return coupons;
        }

    }
}
