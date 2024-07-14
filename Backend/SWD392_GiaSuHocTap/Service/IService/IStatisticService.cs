using Common.DTO.Statistic;
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

        /// <summary>
        /// Get statistic of system
        /// </summary>
        /// <returns></returns>
        StatisticSystemDTO GetStatisticOfSystem();

        /// <summary>
        /// Get general data of system
        /// </summary>
        /// <returns></returns>
        GeneralDataDTO GetGeneralData();
    }
}
