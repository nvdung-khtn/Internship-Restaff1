using AutoMapper;
using eCommerce.Domain.Entities;
using eCommerce.Domain.Repositories;
using eCommerce.Domain.Repositories.Models;
using eCommerce.Domain.Shared.Exceptions;
using eCommerce.Domain.Shared.Models;
using System;
using System.Threading.Tasks;
using EasyEncryption;
using eCommerce.Domain.Shared;
using eCommerce.Application.Services.KeyResetPasswords;
using eCommerce.Application.Notification;
using AutoMapper.Configuration;

namespace eCommerce.Application.Services.Users
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepo;
        private readonly IMapper _mapper;
        private readonly IKeyResetPasswordService _keyResetPasswordService;
        readonly private IEmailSender _emailSender;

        public UserService(IUserRepository userRepo, IMapper mapper, IKeyResetPasswordService keyResetPasswordService, IEmailSender emailSender)
        {
            _userRepo = userRepo;
            _mapper = mapper;
            _keyResetPasswordService = keyResetPasswordService;
            _emailSender = emailSender;
        }

        public async Task<PaginatedResult<UserReturnModels.User>> SearchUsersAsync(UserRequestModels.Search rq)
        {
            var users = await _userRepo.SearchAsync(new SearchUserModel
            {
                Keyword = rq.SearchTerm,
                Pagination = new Pagination { PageIndex = rq.PageIndex, ItemsPerPage = rq.PageSize },
                IsLockout = rq.IsLockout,
            });

            return _mapper.Map<PaginatedResult<UserReturnModels.User>>(users);
        }

        public async Task<UserReturnModels.User> GetValidUserAsync(string username, string password)
        {
            var user = await _userRepo.GetUserByUsernameAsync(username);
            if (user == null)
            {
                return null;
            }
            // TODO: need to encrypt password and compare with PasswordHash

            if (user.PasswordHash == SHA.ComputeSHA256Hash(password))
            {
                return _mapper.Map<UserReturnModels.User>(user);
            }

            return null;
        }

        public async Task<Guid> RegisterUserAsync(UserRequestModels.Register rq)
        {
            var user = new User
            {
                Id = Guid.NewGuid(),
                Username = rq.Username,
                PasswordHash = rq.Password // TODO: need to encrypt password here
            };

            _userRepo.Add(user);
            await _userRepo.UnitOfWork.SaveChangesAsync();

            return user.Id;
        }

        public async Task<Guid> CreateUserAsync(UserRequestModels.Create rq, string host)
        {
            var user = await _userRepo.GetUserByUsernameAsync(rq.Username);
            if (user != null)
            {
                throw new BusinessException("username exsist");
            }

            // add new user
            User u = new User();
            u.Username = rq.Username;
            u.LastName = rq.LastName;
            u.FirstName = rq.FirstName;
            u.Role = UserRoles.Seller;
            _userRepo.Add(u);


            // send password reset email
            var keyParam = await _keyResetPasswordService.AddAsync(u);
            await _userRepo.UnitOfWork.SaveChangesAsync();
            if (keyParam == null)
            {
                throw new BusinessException("generate token fails");

            }
            SendEmailChangPassword("eCommerce", rq.Username, keyParam, host, "congratulations you have been created account");
            return u.Id;
        }

        public async Task UpdatePasswordAsync(UserRequestModels.UpdatePassword rq)
        {
            //check token
            await _keyResetPasswordService.VerifyKeyAsync(rq.Username, rq.KeyParam);
            //get update password user
            User user = await _userRepo.GetUserByUsernameAsync(rq.Username);
            user.PasswordHash = SHA.ComputeSHA256Hash(rq.Password);
            _userRepo.Update(user);
            await _userRepo.UnitOfWork.SaveChangesAsync();
        }
        public async Task<bool> LockoutUserAsync(Guid Id)
        {
            var user = await _userRepo.GetByIdAsync(Id);
            if (user != null)
            {
                user.LockoutEnd = DateTime.Now.AddDays(5);
                _userRepo.Update(user);
                await _userRepo.UnitOfWork.SaveChangesAsync();
                return true;
            }
            else
            {
                throw new EntityNotFound("user");
            }
        }

        public async Task<bool> UnlockUserAsync(Guid Id)
        {
            var user = await _userRepo.GetByIdAsync(Id);
            if (user != null)
            {
                user.LockoutEnd = null;
                _userRepo.Update(user);
                await _userRepo.UnitOfWork.SaveChangesAsync();
                return true;
            }
            return false;
        }
        private void SendEmailChangPassword(string from, string to, string keyParam, string host, string title)
        {
            string html = "<!DOCTYPE html>";
            html += "<html>";
            html += "<head>";
            html += "<meta chahtmlet='utf-8'>";
            html += "</head>";
            html += "<body>";
            html += "<h1>"+title+"</h1>";
            html += "<h1>Please click into link to change password </h1>";
            html += "<form method='get' action='";
            html += host;
            html += "/auth/reset-password'>";
            html += "<input type='hidden' name='key' value='" + keyParam + "'/>";
            html += "<input type='hidden' name='email' value='" + to + "'/>";
            html += "<button style='background-color: green; color: aliceblue; border: none; font-size: 50px; padding: 10px; border-radius: 5px;' type='submit'>Open link</button>";
            html += "</form>";
            html += "</body>";
            html += "</html>";
            _emailSender.SendEmail(from, to, "Reset password", html);
        }


        public async Task ResetPasswordAsync(string username, string host)
        {
            //find username
            var user = await _userRepo.GetUserByUsernameAsync(username);
            if (user == null)
            {
                throw new BusinessException("username not exsist");
            }

            var keyParam = await _keyResetPasswordService.AddAsync(user);
            await _userRepo.UnitOfWork.SaveChangesAsync();
            if (keyParam == null)
            {
                throw new BusinessException("generate token fails");

            }
            SendEmailChangPassword("eCommerce", username, keyParam, host, "Request reset password success");

        }

        public async Task<bool> ForgotPasswordAsync(UserRequestModels.ForgotPassword rq, string host)
        {
            //find by username
            var user = await _userRepo.GetUserByUsernameAsync(rq.Username);
            if (user == null)
            {
                throw new BusinessException("username not exsist");
            }

            //check firt name and last name to deny spam servers email
            if(user.LastName != rq.LastName || user.FirstName != rq.FirstName)
            {
                throw new BusinessException("Information in valid" );
            }
            // send password reset email
            var keyParam = await _keyResetPasswordService.AddAsync(user);
            await _userRepo.UnitOfWork.SaveChangesAsync();
            if (keyParam == null)
            {
                throw new BusinessException("generate token fails");
            }
            SendEmailChangPassword("eCommerce", rq.Username, keyParam, host, "Request change password success");
            return true;
        }

        public async Task<UserReturnModels.UserInformation> GetUserbyUsernameAsync(string username)
        {
            var user = await _userRepo.GetUserByUsernameAsync(username);
            if (user == null)
            {
                throw new EntityNotFound("user");
            }
            return _mapper.Map<UserReturnModels.UserInformation>(user);
        }

        public async Task UpdateAvataAsync(string username, string urlImage)
        {
            var user = await _userRepo.GetUserByUsernameAsync(username);
            if (user == null)
            {
                throw new BusinessException("username not exsist");
            }
            user.UrlImage = urlImage;
            _userRepo.Update(user);
            await _userRepo.UnitOfWork.SaveChangesAsync();
        }

        public async Task UpdateInformationAsync(string username, UserRequestModels.UserUpdateInformation user)
        {
            var u = await _userRepo.GetUserByUsernameAsync(username);
            if (u== null)
            {
                throw new BusinessException("username not exsist");
            }
            u.PhoneNumber = user.PhoneNumber;
            u.FirstName = user.FirstName;
            u.LastName = user.LastName;
            _userRepo.Update(u);
            await _userRepo.UnitOfWork.SaveChangesAsync();
        }
    }
}
