using AutoMapper;
using Common.Constant.Message;
using Common.DTO;
using Common.DTO.Auth;
using Common.DTO.Email;
using Common.Enum;
using DAO.Model;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Service.IService;
using System.Security.Cryptography;

namespace Service.Service
{
    public class AuthService : IAuthService
    {
        private readonly IUserService _userService;
        private readonly ITokenService _tokenService;
        private readonly IMapper _mapper;
        private readonly IConfiguration _configuration;
        private readonly IRefreshTokenService _refreshTokenService;
        private readonly IEmailService _emailService;

        public AuthService(IUserService userService,
                            ITokenService tokenService,
                            IConfiguration configuration,
                            IMapper mapper,
                            IRefreshTokenService refreshTokenService,
                            IEmailService emailService)
        {
            _userService = userService;
            _tokenService = tokenService;
            _mapper = mapper;
            _configuration = configuration;
            _refreshTokenService = refreshTokenService;
            _emailService = emailService;
        }

        public async Task<LoginResponseDTO?> Login(LoginRequestDTO loginRequest)
        {
            // check if it is a admin account
            var user = CheckAdminAccount(loginRequest.Email, loginRequest.Password);
            if (user != null)
            {
                return new LoginResponseDTO()
                {
                    User = _mapper.Map<UserDTO>(user),
                    Token = null
                };
            }
            else
            {
                // get user by email
                user = _userService.GetUserByEmail(loginRequest.Email);

                // check password & create token
                if (user != null && VerifyPasswordHash(loginRequest.Password, user.PasswordHash, user.PasswordSalt))
                {
                    // write token
                    var response = await _tokenService.CreateJWTToken(user, "");

                    if (response != null)
                    {
                        return new LoginResponseDTO()
                        {
                            User = _mapper.Map<UserDTO>(user),
                            Token = response
                        };
                    }
                }
            }

            return null;
        }

        public async Task<LogoutResponseDTO> LogOut(string refreshToken)
        {
            // update refresh token in db (revoke token)
            var refreshTokenDb = _refreshTokenService.GetRefreshTokenByToken(refreshToken);

            if (refreshTokenDb != null)
            {
                refreshTokenDb!.IsRevoked = true;

                var updatedRefreshToken = await _refreshTokenService.UpdateRefreshToken(refreshTokenDb);

                if (updatedRefreshToken != null)
                {
                    return new LogoutResponseDTO()
                    {
                        isSuccess = true,
                        Message = AuthMessage.LogoutSuccess
                    };
                }
            }

            return new LogoutResponseDTO()
            {
                Message = AuthMessage.LogoutFail
            };
        }

        // verify password hash
        private bool VerifyPasswordHash(string password, byte[] passwordHash, byte[] passwordSalt)
        {
            using (var hMac = new HMACSHA512(passwordSalt))
            {
                var computedHash = hMac
                    .ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
                return computedHash.SequenceEqual(passwordHash);
            }
        }

        // create password pash & salt
        private void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using (var hMac = new HMACSHA512())
            {
                passwordSalt = hMac.Key;
                passwordHash = hMac
                    .ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }

        // check admin account
        private User? CheckAdminAccount(string username, string password)
        {
            var adminEmail = _configuration["AdminAccount:Email"];
            var adminPassword = _configuration["AdminAccount:Password"];

            if (!string.IsNullOrEmpty(adminEmail) && !string.IsNullOrEmpty(adminPassword))
            {
                if (adminEmail == username && adminPassword == password)
                {
                    return new User
                    {
                        Email = adminEmail,
                        RoleId = (int)RoleEnum.Admin
                    };
                }
            }

            return null;
        }

        public ResponseDTO CheckValidationForgotPassword(ForgotPasswordDTO model)
        {
            throw new NotImplementedException();
        }

        public ForgotPasswordResponseDTO ResetPassword(ForgotPasswordDTO model)
        {
            if (model.Email.IsNullOrEmpty())
            {
                var response = new ForgotPasswordResponseDTO()
                {
                    IsSuccess = false,
                    StatusCode = (int)StatusCodeEnum.BadRequest,
                    Message = CreateUserMessage.NullEmail
                };
                return response;
            }

            var user = _userService.GetAllUsers().FirstOrDefault(c => c.Email == model.Email);
            if (user == null)
            {
                return new ForgotPasswordResponseDTO()
                {
                    IsSuccess = false,
                    StatusCode = (int)StatusCodeEnum.BadRequest,
                    Message = CreateUserMessage.NullEmail
                };
            }
            return new ForgotPasswordResponseDTO()
            {
                IsSuccess = false,
                StatusCode = (int)StatusCodeEnum.BadRequest,
                Message = CreateUserMessage.NullEmail
            };

        }

        public ResponseDTO ForgotPassword(string email)
        {
            var user = _userService.GetUserByEmail(email);
            if (user == null)
            {
                return new ResponseDTO()
                {
                    Message = AuthMessage.UserNotFound,
                    StatusCode = (int)StatusCodeEnum.NotFound
                };
            }

            if (!user.IsVerified)
            {
                return new ResponseDTO()
                {
                    Message = AuthMessage.UserIsNotVerified,
                    StatusCode = (int)StatusCodeEnum.NotFound
                };
            }

            var otp = _emailService.GenerateOTP();
            user.Otp = otp.OTPCode;

            user.Otp = otp.OTPCode;
            user.OtpExpiredTime = otp.ExpiredTime;

            _emailService.SendOTPEmail(email, otp.OTPCode, EmailSubject.ResetPassEmailSubject);

            return new ResponseDTO()
            {
                Message = EmailNotificationMessage.SendOTPEmailSuccessfully + email,
                StatusCode = (int)StatusCodeEnum.Created,
                Data = otp
            };
        }

        public bool CheckUserVerifiedStatus(string email)
        {
            var user = _userService.GetUserByEmail(email);
            while(user != null)
            {
                if(user.IsVerified)
                {
                    return true;
                }
            }
            return false;
        }

        public bool CheckOTPExpired(string email)
        {
            throw new NotImplementedException();
        }

        public bool SetOtp(OtpCodeDTO otpDto, string email)
        {
            var user = _userService.GetUserByEmail(email);

            if (user != null)
            {
                user.Otp = otpDto.OTPCode;
                user.OtpExpiredTime = otpDto.ExpiredTime;
                _userService.UpdateUser(user);
                return true;
            }
            return false;
        }

        public bool CheckOTP(string email, string otpCode)
        {
            throw new NotImplementedException();
        }
    }
}
