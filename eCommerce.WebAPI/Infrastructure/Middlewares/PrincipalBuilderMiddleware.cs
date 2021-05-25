using eCommerce.Application.Shared;
using eCommerce.Domain.Entities;
using eCommerce.Domain.Shared;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace eCommerce.WebAPI.Infrastructure.Middlewares
{
    public class PrincipalBuilderMiddleware
    {
        private readonly RequestDelegate _next;

        public PrincipalBuilderMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task Invoke(HttpContext context)
        {
            var ctx = (ApplicationContext)context.RequestServices.GetService(typeof(ApplicationContext));

            var username = "anonymous";
            string userId = null;
            UserRoles role = 0;
            if (context.User.Identity.IsAuthenticated)
            {
                foreach (var claim in context.User.Claims)
                {
                    switch (claim.Type)
                    {
                        case "username":
                            username = claim.Value;
                            break;
                        case "id":
                            userId = claim.Value;
                            break;
                        case ClaimTypes.Role:
                            //role = claim.Value;
                            role = (UserRoles)Enum.Parse(typeof(UserRoles), claim.Value); ;
                            break;
                    }
                }
            }

            ctx.Principal = new UserPrincipal(userId, username,role);

            await _next.Invoke(context);
        }
    }
}
