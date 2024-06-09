﻿using Common.Constant.Message;
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
        private readonly TokenValidationParameters _validationParameters;
        private readonly IUserService _userService;

        public TokenService(IConfiguration configuration,
                            IRefreshTokenService refreshTokenService,
                            TokenValidationParameters validationParameters,
                            IUserService userService)
        {
            _configuration = configuration;
            _refreshTokenService = refreshTokenService;
            _validationParameters = validationParameters;
            _userService = userService;
        }

        public async Task<TokenResponseDTO?> CreateJWTToken(User user, string existingRefreshToken)
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

            // refresh token
            var refreshToken = new RefreshToken();

            if (string.IsNullOrEmpty(existingRefreshToken))
            {
                // create refresh token
                refreshToken = await _refreshTokenService.AddRefreshToken(new RefreshToken()
                {
                    JwtId = token.Id,
                    IsRevoked = false,
                    UserId = user.UserId,
                    DateAdded = DateTime.Now,
                    DateExpired = DateTime.Now.AddMonths(6),
                    Token = Guid.NewGuid().ToString() + "-" + Guid.NewGuid().ToString()
                });
            }

            var response = new TokenResponseDTO()
            {
                AccessToken = jwtToken,
                RefreshToken = string.IsNullOrEmpty(existingRefreshToken) ? refreshToken.Token : existingRefreshToken,
                ExpiresAt = token.ValidTo
            };

            return response;
        }

        public async Task<RefreshTokenResponseDTO> GenerateNewToken(string accessToken, string refreshToken)
        {
            string message = string.Empty;
            var jwtTokenHandler = new JwtSecurityTokenHandler();

            // Check 1 - Check JWT token format
            var tokenInVerification = jwtTokenHandler.ValidateToken(accessToken,
                                                                    _validationParameters,
                                                                    out var validatedToken);

            // Check 2 - Encryption algorithm
            if (validatedToken is JwtSecurityToken jwtSecurityToken)
            {
                var result = jwtSecurityToken.Header.Alg.Equals(SecurityAlgorithms.HmacSha256,
                    StringComparison.InvariantCultureIgnoreCase);

                if (!result) return new RefreshTokenResponseDTO()
                {
                    Token = null,
                    Message = TokenMessage.InvalidToken
                };
            }

            // Check 3 - Validate expiry date
            var utcExpiryDate = long.Parse(tokenInVerification.Claims.FirstOrDefault(x => x.Type == JwtRegisteredClaimNames.Exp)!.Value);

            var expiryDate = UnixTimeStampToDateTimeInUTC(utcExpiryDate);

            if (expiryDate > DateTime.UtcNow)
                return new RefreshTokenResponseDTO()
                {
                    Token = null,
                    Message = TokenMessage.UnExpiredToken
                };

            // Check 4 - Refresh token exists in the DB
            var dbRefreshToken = _refreshTokenService.GetRefreshTokenByToken(refreshToken!);

            if (dbRefreshToken == null) throw new Exception(TokenMessage.NoExist);
            else
            {
                // Check 5 - Validate id
                var jti = tokenInVerification.Claims.FirstOrDefault(x => x.Type == JwtRegisteredClaimNames.Jti)!.Value;

                if (dbRefreshToken.JwtId != jti) return new RefreshTokenResponseDTO()
                {
                    Token = null,
                    Message = TokenMessage.NotMatched
                }; ;

                if (dbRefreshToken.DateExpired <= DateTime.UtcNow) return new RefreshTokenResponseDTO()
                {
                    Token = null,
                    Message = TokenMessage.ExpiredRefreshToken
                };

                if (dbRefreshToken.IsRevoked) return new RefreshTokenResponseDTO()
                {
                    Token = null,
                    Message = TokenMessage.IsRevoked
                };

                // Generate new token (with existing refresh token
                var user = await _userService.GetUserById(dbRefreshToken.UserId);

                var newTokenResponse = await CreateJWTToken(user!, refreshToken!);              

                return new RefreshTokenResponseDTO()
                {
                    Token = newTokenResponse,
                    Message = TokenMessage.SuccessfullyCreated
                };
            }
        }

        private DateTime UnixTimeStampToDateTimeInUTC(long unixTimeStamp)
        {
            var dateTimeVal = new DateTime(1970, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc);
            dateTimeVal = dateTimeVal.AddSeconds(unixTimeStamp);
            return dateTimeVal;
        }
    }
}
