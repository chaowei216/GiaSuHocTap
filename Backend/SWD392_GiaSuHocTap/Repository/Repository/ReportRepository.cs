using DAO.DAO;
using DAO.Model;
using Repository.IRepository;

namespace Repository.Repository
{
    public class ReportRepository : IReportRepository
    {
        private readonly IGenericDAO<Report> _reportDAO;

        public ReportRepository(IGenericDAO<Report> reportDAO)
        {
            _reportDAO = reportDAO;
        }

        public async Task<Report> AddNewReport(Report report)
        {
            return await _reportDAO.AddAsync(report);
        }

        public IEnumerable<Report> GetAllReports()
        {
            return _reportDAO.GetAll().AsEnumerable();
        }

        public async Task<Report?> GetReportById(int id)
        {
            return await _reportDAO.GetByIdAsync(id);
        }

        public async Task<Report> UpdateReport(Report report)
        {
            return await _reportDAO.UpdateAsync(report);
        }
    }
}
