using Common.DTO.Auth;
using Common.Enum;
using DAO.Model;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Service.IService;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Service.Service
{
    public class TokenService : ITokenService
    {
        private readonly IConfiguration _configuration;
        private readonly IRefreshTokenService _refreshTokenService;

        public TokenService(IConfiguration configuration, 
                            IRefreshTokenService refreshTokenService)
        {
            _configuration = configuration;
            _refreshTokenService = refreshTokenService;
        }

        public async Task<TokenResponseDTO?> CreateJWTToken(User user)
        {
            // Create claims
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(ClaimTypes.Role, Enum.ToObject(typeof(RoleEnum), user.RoleId).ToString()!)
            };

            // key
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]!));

            // credentials
            var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            // token setting
            var token = new JwtSecurityToken(
                            _configuration["Jwt:Issuer"]!,
                            _configuration["Jwt:Audience"],
                            claims,
                            expires: DateTime.Now.AddMinutes(15),
                            signingCredentials: credentials);

            // write jwt token
            var jwtToken = new JwtSecurityTokenHandler().WriteToken(token);

            // create refresh token
            var refreshToken = await _refreshTokenService.AddRefreshToken(new RefreshToken()
            {
                JwtId = token.Id,
                IsRevoked = false,
                UserId = user.UserId,
                DateAdded = DateTime.Now,
                DateExpired = DateTime.Now.AddMonths(6),
                Token = Guid.NewGuid().ToString() + "-" + Guid.NewGuid().ToString()
            });

            if(refreshToken != null)
            {
                var response = new TokenResponseDTO()
                {
                    AccessToken = jwtToken,
                    RefreshToken = refreshToken.Token,
                    ExpiresAt = token.ValidTo                  
                };

                return response;
            }

            return null;
        }
    }
}
