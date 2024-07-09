using Common.DTO;
using Common.DTO.Query;
using Common.DTO.Report;
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
        Task<ReportDTO?> AddNewReport(ReportCreateDTO report);

        /// <summary>
        /// Get all reports with pagination
        /// </summary>
        /// <param name="parameters"></param>
        /// <returns></returns>
        PaginationResponseDTO<ReportDTO> GetReportsWithPagination(ReportParameters parameters);

        /// <summary>
        /// Get reports of user
        /// </summary>
        /// <param name="userId"></param>
        /// <param name="parameters"></param>
        /// <returns></returns>
        PaginationResponseDTO<ReportDTO> GetPagedReportOfUser(int userId, ReportParameters parameters);

        /// <summary>
        /// Handle report
        /// </summary>
        /// <param name="report"></param>
        /// <param name="reportInfo"></param>
        /// <returns></returns>
        Task<bool> HandleReport(Report report, ReportUpdateDTO reportInfo);
    }
}
