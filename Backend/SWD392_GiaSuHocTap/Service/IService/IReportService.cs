using DAO.Model;

namespace Service.IService
{
    public interface IReportService
    {
        /// <summary>
        /// Get all Reports
        /// </summary>
        /// <returns></returns>
        IEnumerable<Report> GetAllReports();

        /// <summary>
        /// Get Report by id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        Task<Report?> GetReportById(int id);

        /// <summary>
        /// Add new Report
        /// </summary>
        /// <param name="report"></param>
        /// <returns></returns>
        Task<Report> AddNewReport(Report report);

        /// <summary>
        /// Update Report
        /// </summary>
        /// <param name="report"></param>
        /// <returns></returns>
        Task<Report> UpdateReport(Report report);
    }
}
