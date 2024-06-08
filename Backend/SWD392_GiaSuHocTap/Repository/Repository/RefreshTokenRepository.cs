using DAO.DAO;
using DAO.Model;
using Repository.IRepository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Repository
{
    public class RefreshTokenRepository: IRefreshTokenRepository
    {
        private readonly IGenericDAO<RefreshToken> _refreshTokenDAO;

        public RefreshTokenRepository(IGenericDAO<RefreshToken> refreshTokenDAO)
        {
            _refreshTokenDAO = refreshTokenDAO;
        }

        public async Task<RefreshToken> AddRefreshToken(RefreshToken RefreshToken)
        {
            return await _refreshTokenDAO.AddAsync(RefreshToken);
        }

        public async Task<bool> DeleteRefreshToken(RefreshToken refreshToken)
        {
            return await _refreshTokenDAO.DeleteAsync(refreshToken);
        }

        public IEnumerable<RefreshToken> GetAllRefreshTokens()
        {
            return _refreshTokenDAO.GetAll().AsEnumerable();
        }

        public async Task<RefreshToken?> GetRefreshTokenById(int id)
        {
            return await _refreshTokenDAO.GetByIdAsync(id);
        }

        public Task<RefreshToken> UpdateRefreshToken(RefreshToken refreshToken)
        {
            return _refreshTokenDAO.UpdateAsync(refreshToken);
        }
    }
}
