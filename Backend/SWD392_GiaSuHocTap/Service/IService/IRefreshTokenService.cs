using DAO.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.IService
{
    public interface IRefreshTokenService
    {
        /// <summary>
        /// Get all refreshtoken
        /// </summary>
        /// <returns></returns>
        IEnumerable<RefreshToken> GetAllRefreshTokens();

        /// <summary>
        /// Get refreshtoken by id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        Task<RefreshToken?> GetRefreshTokenById(int id);

        /// <summary>
        /// Add new refreshtoken
        /// </summary>
        /// <param name="refreshToken"></param>
        /// <returns></returns>
        Task<RefreshToken> AddRefreshToken(RefreshToken refreshToken);

        /// <summary>
        /// Update refreshtoken
        /// </summary>
        /// <param name="refreshToken"></param>
        /// <returns></returns>
        Task<RefreshToken> UpdateRefreshToken(RefreshToken refreshToken);

        /// <summary>
        /// Delete refreshtoken
        /// </summary>
        /// <param name="refreshToken"></param>
        /// <returns></returns>
        Task<bool> DeleteRefreshToken(RefreshToken refreshToken);

        /// <summary>
        /// Get Refresh Token By Token
        /// </summary>
        /// <param name="token"></param>
        /// <returns></returns>
        RefreshToken? GetRefreshTokenByToken(string token);
    }
}
