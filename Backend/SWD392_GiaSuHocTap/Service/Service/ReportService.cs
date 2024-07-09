using AutoMapper;
using Common.Constant.Notification;
using Common.DTO;
using Common.DTO.Query;
using Common.DTO.Report;
using Common.Enum;
using DAO.Model;
using Org.BouncyCastle.Asn1.Ocsp;
using Repository.IRepository;
using Service.IService;

namespace Service.Service
{
    public class ReportService : IReportService
    {
        private readonly IReportRepository _reportRepository;
        private readonly IUserService _userService;
        private readonly INotificationService _notificationService;
        private readonly IMapper _mapper;

        public ReportService(IReportRepository reportRepository, IMapper mapper, IUserService userService, INotificationService notificationService)
        {
            _reportRepository = reportRepository;
            _mapper = mapper;
            _userService = userService;
            _notificationService = notificationService;
        }

        public async Task<ReportDTO?> AddNewReport(ReportCreateDTO report)
        {
            var createdReport = await _reportRepository.AddNewReport(new Report()
            {
                ReportTitle = report.ReportTitle,
                Description = report.Description,
                CreatedDate = DateTime.Now,
                FromId = report.UserId,
                ToId = report.TutorId,
                Status = false
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

        public async Task<bool> HandleReport(Report report, ReportUpdateDTO reportInfo)
        {
            if (!report.Status)
            {
                report.Status = true;
                var updatedReport = await _reportRepository.UpdateReport(report);

                if (updatedReport != null)
                {
                    if (reportInfo.IsAccepted)
                    {
                        var tutor = await _userService.GetUserById(report.ToId);
                        if (tutor != null && tutor.Status == UserStatusEnum.Active)
                        {
                            tutor.NumberOfReport += 1;

                            string tutorMessage = Description.TutorWarning1;

                            if (tutor.NumberOfReport == 2)
                            {
                                tutorMessage = Description.TutorWarning2;
                            }

                            if (tutor.NumberOfReport > 2)
                            {
                                tutorMessage = Description.TutorBanning;
                                tutor.NumberOfReport = 0;
                                tutor.Status = UserStatusEnum.InActive;
                            }

                            await _userService.UpdateUser(tutor);

                            // add notification
                            var userNotification = await _notificationService.AddNewNotification(new Notification()
                            {
                                NotificationType = NotificationType.Infomation,
                                Description = Description.ReportSuccess,
                                CreatedTime = DateTime.Now,
                                Status = false,
                            });

                            var tutorNotification = await _notificationService.AddNewNotification(new Notification()
                            {
                                NotificationType = NotificationType.Warning,
                                Description = tutorMessage,
                                CreatedTime = DateTime.Now,
                                Status = false,
                            });

                            // add user notification
                            await _notificationService.AddNewUserNotification(new UserNotification
                            {
                                UserId = report.FromId,
                                NotificationId = userNotification.NotificationId
                            });

                            await _notificationService.AddNewUserNotification(new UserNotification
                            {
                                UserId = tutor.UserId,
                                NotificationId = tutorNotification.NotificationId
                            });

                            return true;
                        }

                        return false;
                    }
                    else
                    {
                        // add notification
                        var userNotification = await _notificationService.AddNewNotification(new Notification()
                        {
                            NotificationType = NotificationType.Infomation,
                            Description = Description.ReportFail,
                            CreatedTime = DateTime.Now,
                            Status = false,
                        });

                        // add user notification
                        await _notificationService.AddNewUserNotification(new UserNotification
                        {
                            UserId = report.FromId,
                            NotificationId = userNotification.NotificationId
                        });

                        return true;
                    }
                }

                return false;
            }
            

            return false;
        }
    }
}
