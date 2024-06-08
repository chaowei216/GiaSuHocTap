using AutoMapper;
using Common.DTO.Auth;
using Common.Enum;
using DAO.Model;
using Microsoft.Extensions.Configuration;
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

        public AuthService(IUserService userService,
                            ITokenService tokenService,
                            IConfiguration configuration,
                            IMapper mapper)
        {
            _userService = userService;
            _tokenService = tokenService;
            _mapper = mapper;
            _configuration = configuration;
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
            } else
            {
                // get user by email
                user = _userService.GetUserByEmail(loginRequest.Email);

                // check password & create token
                if (user != null && VerifyPasswordHash(loginRequest.Password, user.PasswordHash, user.PasswordSalt))
                {
                    // write token
                    var response = await _tokenService.CreateJWTToken(user);

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
                if(adminEmail == username && adminPassword == password)
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

    }
}
