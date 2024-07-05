using AutoMapper;
using Common.Constant.Notification;
using Common.Constant.Request;
using Common.Constant.Teaching;
using Common.Constant.TimeTable;
using Common.DTO;
using Common.DTO.Query;
using Common.DTO.Request;
using DAO.Model;
using Firebase.Auth;
using Repository.IRepository;
using Service.IService;

namespace Service.Service
{
    public class RequestService : IRequestService
    {
        private readonly IRequestRepository _requestRepository;
        private readonly ITimeTableService _timeTableService;
        private readonly IUserService _userService;
        private readonly INotificationService _notificationService;
        private readonly IMapper _mapper;

        public RequestService(IRequestRepository requestRepository,
                              ITimeTableService timeTableService,
                              IUserService userService,
                              INotificationService notificationService,
                              IMapper mapper)
        {
            _requestRepository = requestRepository;
            _timeTableService = timeTableService;
            _userService = userService;
            _notificationService = notificationService;
            _mapper = mapper;
        }

        public async Task<RequestDTO?> AddOfflineRequest(RequestOfflineCreateDTO request)
        {
            var offlineTime = _timeTableService.GetOfflineTimeOfUser(request.TutorId);
            var user = await _userService.GetUserById(request.UserId);
            if (user == null || (user.CoinBalance) < 10)
            {
                return null;
            }

            if (offlineTime != null && offlineTime.Any() && offlineTime.First().Status != TimeTableConst.BusyStatus)
            {
                var newRequest = await _requestRepository.AddNewRequest(new Request()
                {
                    FromId = request.UserId,
                    ClassId = request.ClassId,
                    CourseId = request.CourseId,
                    CreatedDate = DateTime.Now,
                    Description = request.Description,
                    Location = request.Location,
                    Status = false,
                    Price = request.Price,
                    RequestType = RequestConst.Offline,
                });

                if (newRequest != null)
                {
                    foreach (var time in offlineTime)
                    {
                        await _requestRepository.AddNewRequestTime(new RequestTime()
                        {
                            RequestId = newRequest.RequestId,
                            TimeTableId = time.TimeTableId,
                            Status = RequestConst.PendingStatus
                        });

                        time.Status = TimeTableConst.BusyStatus;
                        await _timeTableService.UpdateTimeTable(time);
                    }
                }

                user.CoinBalance -= 10;
                await _userService.UpdateUser(user);

                // add notification
                var userNotification = await _notificationService.AddNewNotification(new Notification()
                {
                    NotificationType = NotificationType.Infomation,
                    Description = Description.CreateRequest,
                    CreatedTime = DateTime.Now,
                    Status = false,
                });

                var tutorNotification = await _notificationService.AddNewNotification(new Notification()
                {
                    NotificationType = NotificationType.Infomation,
                    Description = Description.ReceiveRequest,
                    CreatedTime = DateTime.Now,
                    Status = false,
                });

                // add user notification
                await _notificationService.AddNewUserNotification(new UserNotification
                {
                    UserId = user.UserId,
                    NotificationId = userNotification.NotificationId
                });

                await _notificationService.AddNewUserNotification(new UserNotification
                {
                    UserId = request.TutorId,
                    NotificationId = tutorNotification.NotificationId
                });

                var mappedResponse = _mapper.Map<RequestDTO>(newRequest);

                return mappedResponse;
            }

            return null;
        }

        public PaginationResponseDTO<RequestDTO> GetOfflineRequestsOfTutor(int tutorId, RequestParameters parameters)
        {
            var requests = _requestRepository.GetPagedOfflineRequestsOfTutor(tutorId, parameters);

            var mappedResponse = _mapper.Map<PaginationResponseDTO<RequestDTO>>(requests);
            mappedResponse.Data = _mapper.Map<List<RequestDTO>>(requests);

            return mappedResponse;
        }

        public PaginationResponseDTO<RequestDTO> GetOnlineRequestsOfTutor(int tutorId, RequestParameters parameters)
        {
            var requests = _requestRepository.GetPagedOnlineRequestsOfTutor(tutorId, parameters);

            var mappedResponse = _mapper.Map<PaginationResponseDTO<RequestDTO>>(requests);
            mappedResponse.Data = _mapper.Map<List<RequestDTO>>(requests);

            return mappedResponse;
        }

        public async Task<RequestDTO?> UpdateOfflineRequest(RequestUpdateDTO requestInfo)
        {
            var request = await _requestRepository.GetRequestById(requestInfo.RequestId);

            if (request != null && !request.Status)
            {
                var times = _requestRepository.GetAllTimeOfRequest(request.RequestId);

                foreach(var time in times)
                {
                    time.Status = requestInfo.IsAccepted ? RequestConst.InProcessStatus : RequestConst.CancelledStatus;
                    await _requestRepository.UpdateRequestTime(time);
                }

                if(!requestInfo.IsAccepted)
                {
                    var offlineTime = _timeTableService.GetOfflineTimeOfUser(requestInfo.TutorId);
                    foreach (var time in offlineTime)
                    {
                        time.Status = TimeTableConst.FreeStatus;
                        await _timeTableService.UpdateTimeTable(time);
                    }
                }

                request.Status = true;
                await _requestRepository.UpdateRequest(request);

                string message = requestInfo.IsAccepted ? Description.AcceptedRequest : Description.DeniedRequest;

                // add notification
                var notification = await _notificationService.AddNewNotification(new Notification()
                {
                    NotificationType = NotificationType.Infomation,
                    Description = message,
                    CreatedTime = DateTime.Now,
                    Status = false,
                });

                // add user notification
                await _notificationService.AddNewUserNotification(new UserNotification
                {
                    UserId = request.FromId,
                    NotificationId = notification.NotificationId
                });

                var mappedResponse = _mapper.Map<RequestDTO>(request);

                return mappedResponse;
            }

            return null;
        }
    }
}
