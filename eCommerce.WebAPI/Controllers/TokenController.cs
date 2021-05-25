using eCommerce.Application.Services.Users;
using eCommerce.WebAPI.Infrastructure.Config;
using eCommerce.WebAPI.Models;
using eCommerce.WebAPI.Services;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace eCommerce.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    //[Authorize]
    public class TokenController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly JwtAuthManager _jwtAuthManager;

        public TokenController(IUserService userService, JwtAuthManager jwtAuthManager)
        {
            _userService = userService;
            _jwtAuthManager = jwtAuthManager;
        }

        [HttpPost]
        [AllowAnonymous]
        public async Task<ActionResult<JwtAuthResult>> GetToken([FromBody] LoginRequest rq)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            var user = await _userService.GetValidUserAsync(rq.Username, rq.Password);
            if (user == null)
            {
                return BadRequest(new { message = "Username or password is incorrect" });
            }

            if (user.LockoutEnd != null)
            {
                if (user.LockoutEnd < DateTime.UtcNow)
                {
                   await _userService.UnlockUserAsync(user.Id);
                }
                else
                {
                    return BadRequest(new { message = "User locked to " + user.LockoutEnd });
                }
            }

            string urlImage = "";
            if (user.UrlImage!=null)
            {
                urlImage = user.UrlImage;
            }

            var claims = new[]
            {
                new Claim("id", user.Id.ToString()),
                new Claim("username", user.Username.ToString()),
                new Claim("role",user.Role.ToString()),
                new Claim("avatar",urlImage)
            };
            var jwtResult = _jwtAuthManager.GenerateTokens(rq.Username, claims);
            return jwtResult;
        }

        [HttpPost("logout")]
        public ActionResult Logout()
        {
            var userName = User.Identity.Name;
            _jwtAuthManager.RemoveRefreshTokenByUsername(userName);
            return Ok();
        }

        [HttpPost("refresh")]
        public async Task<ActionResult> RefreshToken([FromBody] RefreshTokenRequest request)
        {
            try
            {
                //var username = User.Identity?.Name;

                if (string.IsNullOrWhiteSpace(request.RefreshToken))
                {
                    return Unauthorized();
                }

                var accessToken = await HttpContext.GetTokenAsync("Bearer", "access_token");
                var jwtResult = _jwtAuthManager.Refresh(request.RefreshToken, accessToken);
                return Ok(new JwtAuthResult
                {
                    //Username = username,
                    AccessToken = jwtResult.AccessToken,
                    RefreshToken = jwtResult.RefreshToken
                });
            }
            catch (SecurityTokenException e)
            {
                return Unauthorized(e.Message);
            }
        }
    }
}
