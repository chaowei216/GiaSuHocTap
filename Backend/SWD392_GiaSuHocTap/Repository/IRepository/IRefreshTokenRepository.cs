using DAO.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.IRepository
{
    public interface IRefreshTokenRepository
    {
        /// <summary>
        /// Get all time tables
        /// </summary>
        /// <returns></returns>
        IEnumerable<RefreshToken> GetAllRefreshTokens();

        /// <summary>
        /// Get time table by id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        Task<RefreshToken?> GetRefreshTokenById(int id);

        /// <summary>
        /// Add new time table
        /// </summary>
        /// <param name="refreshToken"></param>
        /// <returns></returns>
        Task<RefreshToken> AddRefreshToken(RefreshToken refreshToken);

        /// <summary>
        /// Update time table
        /// </summary>
        /// <param name="refreshToken"></param>
        /// <returns></returns>
        Task<RefreshToken> UpdateRefreshToken(RefreshToken refreshToken);

        /// <summary>
        /// Delete time table
        /// </summary>
        /// <param name="refreshToken"></param>
        /// <returns></returns>
        Task<bool> DeleteRefreshToken(RefreshToken refreshToken);

        /// <summary>
        /// Get refresh token by token
        /// </summary>
        /// <param name="token"></param>
        /// <returns></returns>
        RefreshToken? GetRefreshTokenByToken(string token);
    }
}
