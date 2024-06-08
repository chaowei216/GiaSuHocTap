using Common.DTO.Auth;
using DAO.Model;
using Service.IService;

namespace Service.Service
{
    public class AuthService : IAuthService
    {
        private readonly IUserService _userService;
        private readonly ITokenService _tokenService;

        public AuthService(IUserService userService,
                            ITokenService tokenService)
        {
            _userService = userService;
            _tokenService = tokenService;
        } 

        public Task<User> Login(LoginRequestDTO loginRequest)
        {
            throw new NotImplementedException();
        }
    }
}
