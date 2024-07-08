using AutoMapper;
using Common.DTO;
using Common.DTO.Query;
using Common.DTO.Report;
using DAO.Model;
using Repository.IRepository;
using Service.IService;

namespace Service.Service
{
    public class ReportService : IReportService
    {
        private readonly IReportRepository _reportRepository;
        private readonly IMapper _mapper;

        public ReportService(IReportRepository reportRepository, IMapper mapper)
        {
            _reportRepository = reportRepository;
            _mapper = mapper;
        }

        public async Task<ReportDTO?> AddNewReport(ReportCreateDTO report)
        {
            var createdReport = await _reportRepository.AddNewReport(new Report()
            {
                ReportTitle = report.ReportTitle,
                Description = report.Description,
                CreatedDate = DateTime.Now,
                FromId = report.UserId,
                ToId = report.TutorId
            });
            
            if (createdReport != null)
            {
                var mappedResponse = _mapper.Map<ReportDTO>(createdReport);

                return mappedResponse;
            }

            return null;
        }

        public IEnumerable<Report> GetAllReports()
        {
            return _reportRepository.GetAllReports().AsEnumerable();
        }

        public PaginationResponseDTO<ReportDTO> GetPagedReportOfUser(int userId, ReportParameters parameters)
        {
            var reports = _reportRepository.GetPagedReportListOfUser(userId, parameters);

            var mappedResponse = _mapper.Map<PaginationResponseDTO<ReportDTO>>(reports);
            mappedResponse.Data = _mapper.Map<List<ReportDTO>>(reports);

            return mappedResponse;
        }

        public async Task<Report?> GetReportById(int id)
        {
            return await _reportRepository.GetReportById(id);
        }

        public PaginationResponseDTO<ReportDTO> GetReportsWithPagination(ReportParameters parameters)
        {
            var reports = _reportRepository.GetPagedReportList(parameters);

            var mappedResponse = _mapper.Map<PaginationResponseDTO<ReportDTO>>(reports);
            mappedResponse.Data = _mapper.Map<List<ReportDTO>>(reports);

            return mappedResponse;
        }
    }
}
