using Common.DTO.User;
using DAO.Model;

namespace Service.IService
{
    public interface IStatisticService
    {

        /// <summary>
        /// Get renting info of user
        /// </summary>
        /// <param name="user"></param>
        /// <returns></returns>
        UserRentingInfoDTO GetUserRentingInfo(User user);
    }
}
