using DAO.Model;
using Repository.IRepository;
using Service.IService;

namespace Service.Service
{
    public class ReportService : IReportService
    {
        private readonly IReportRepository _reportRepository;

        public ReportService(IReportRepository reportRepository)
        {
            _reportRepository = reportRepository;
        }

        public async Task<Report> AddNewReport(Report report)
        {
            return await _reportRepository.AddNewReport(report);
        }

        public IEnumerable<Report> GetAllReports()
        {
            return _reportRepository.GetAllReports().AsEnumerable();
        }

        public async Task<Report?> GetReportById(int id)
        {
            return await _reportRepository.GetReportById(id);
        }

        public async Task<Report> UpdateReport(Report report)
        {
            return await _reportRepository.UpdateReport(report);
        }
    }
}
