using DAO.Model;
using Repository.IRepository;
using Service.IService;

namespace Service.Service
{
    public class RefreshTokenService : IRefreshTokenService
    {
        private readonly IRefreshTokenRepository _refreshTokenRepository;

        public RefreshTokenService(IRefreshTokenRepository refreshTokenRepository)
        {
            _refreshTokenRepository = refreshTokenRepository;
        }

        public async Task<RefreshToken> AddRefreshToken(RefreshToken refreshToken)
        {
            return await _refreshTokenRepository.AddRefreshToken(refreshToken);
        }

        public async Task<bool> DeleteRefreshToken(RefreshToken refreshToken)
        {
            return await _refreshTokenRepository.DeleteRefreshToken(refreshToken);
        }

        public IEnumerable<RefreshToken> GetAllRefreshTokens()
        {
            return _refreshTokenRepository.GetAllRefreshTokens();
        }

        public async Task<RefreshToken?> GetRefreshTokenById(int id)
        {
            return await _refreshTokenRepository.GetRefreshTokenById(id);
        }

        public RefreshToken? GetRefreshTokenByToken(string token)
        {
            return _refreshTokenRepository.GetRefreshTokenByToken(token);
        }

        public async Task<RefreshToken> UpdateRefreshToken(RefreshToken refreshToken)
        {
            return await _refreshTokenRepository.UpdateRefreshToken(refreshToken);
        }
    }
}
