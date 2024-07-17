using Common.DTO;
using Common.DTO.Query;
using DAO.DAO;
using DAO.Model;
using Microsoft.EntityFrameworkCore;
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

        public PagedList<Report> GetPagedReportList(ReportParameters parameters)
        {
            var reports = _reportDAO.GetAll().Include(p => p.From).Include(p => p.To).AsQueryable();

            if (parameters.FromEmail != null)
            {
                reports = reports.Where(p => p.From.Email.Contains(parameters.FromEmail));
            }

            if (parameters.ToEmail != null)
            {
                reports = reports.Where(p => p.To.Email.Contains(parameters.ToEmail));
            }

            if (parameters.Status != null)
            {
                reports = reports.Where(p => p.Status == parameters.Status);
            }

            return PagedList<Report>.ToPagedList(reports, parameters.PageNumber, parameters.PageSize);
        }

        public PagedList<Report> GetPagedReportListOfUser(int userId, ReportParameters parameters)
        {
            var reports = _reportDAO.GetAll().Include(p => p.From).Include(p => p.To).Where(p => p.FromId == userId);

            if (parameters.ToEmail != null)
            {
                reports = reports.Where(p => p.To.Email.Contains(parameters.ToEmail));
            }

            return PagedList<Report>.ToPagedList(reports, parameters.PageNumber, parameters.PageSize);
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
