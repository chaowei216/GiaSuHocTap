﻿using AutoMapper;
using Common.Constant.Message;
using Common.Constant.Notification;
using Common.Constant.Request;
using Common.Constant.Teaching;
using Common.Constant.TimeTable;
using Common.DTO;
using Common.DTO.Email;
using Common.DTO.Query;
using Common.DTO.Request;
using Common.Enum;
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
        private readonly IEmailService _emailService;
        private readonly IMapper _mapper;

        public RequestService(IRequestRepository requestRepository,
                              ITimeTableService timeTableService,
                              IUserService userService,
                              INotificationService notificationService,
                              IEmailService emailService,
                              IMapper mapper)
        {
            _requestRepository = requestRepository;
            _timeTableService = timeTableService;
            _userService = userService;
            _notificationService = notificationService;
            _emailService = emailService;
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
                    Status = RequestConst.PendingStatus,
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

        public async Task<ResponseDTO?> AddOnlineRequest(RequestOnlineDTO requestDto)
        {
            var user = await _userService.GetUserById(requestDto.FromId);
            var timeTable = await _timeTableService.GetTimeTableById(requestDto.TimeTableId);

            if (user == null || (user.CoinBalance) < requestDto.Coin)
            {
                return null;
            }

            var requestMap = _mapper.Map<Request>(requestDto);

            if (timeTable != null && timeTable.Status != TimeTableConst.BusyStatus)
            {
                requestMap.Status = RequestConst.PendingStatus;
                requestMap.RequestType = RequestConst.Online;
                requestMap.CreatedDate = DateTime.Now;
                requestMap = await _requestRepository.AddNewRequest(requestMap);


                if (user != null)
                {
                    await _requestRepository.AddNewRequestTime(new RequestTime()
                    {
                        Request = requestMap,
                        TimeTableId = requestDto.TimeTableId,
                        Status = RequestConst.PendingStatus,
                    });
                }

                timeTable.Status = TimeTableConst.BusyStatus;
                await _timeTableService.UpdateTimeTable(timeTable);

                user.CoinBalance -= requestDto.Coin;
                await _userService.UpdateUser(user);

                var tutor = await _userService.GetTutorDetailByUserId(timeTable.UserId);
                tutor.RentHour += 1;
                tutor.NumberOfRent += 1;
                await _userService.UpdateTutorDetail(tutor);

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

                await _notificationService.AddNewUserNotification(new UserNotification
                {
                    UserId = requestDto.FromId,
                    NotificationId = userNotification.NotificationId
                });

                await _notificationService.AddNewUserNotification(new UserNotification
                {
                    UserId = timeTable.UserId,
                    NotificationId = tutorNotification.NotificationId
                });

                if (requestMap != null)
                {
                    var result = new ResponseDTO()
                    {
                        Data = requestMap,
                        Message = GeneralMessage.Success,
                        StatusCode = (int)StatusCodeEnum.Created,
                    };
                    return result;
                }
                else
                {
                    var result = new ResponseDTO()
                    {
                        Data = null,
                        Message = GeneralMessage.Fail,
                        StatusCode = (int)StatusCodeEnum.BadRequest,
                    };
                    return result;
                }
            }
            return null;
        }

        public async Task<RequestDTO?> DoneOnlineRequest(DoneRequestDTO requestInfo)
        {
            var request = await _requestRepository.GetRequestById(requestInfo.RequestId);

            if (request != null)
            {
                var times = _requestRepository.GetAllTimeOfRequest(request.RequestId);
                var inprocesstime = times.Where(t => t.Status == RequestConst.InProcessStatus);

                foreach (var time in times)
                {
                    foreach (var inTime in inprocesstime)
                    {
                        var onlineTime = await _timeTableService.GetTimeTableById(inTime.TimeTableId);
                        onlineTime.Status = TimeTableConst.FreeStatus;
                        await _timeTableService.UpdateTimeTable(onlineTime);

                        inTime.Status = RequestConst.CompletedStatus;
                        await _requestRepository.UpdateRequestTime(time);
                    }
                }

                var compleTime = times.Where(t => t.Status == RequestConst.CompletedStatus).ToList();
                request.Coin = request.Coin * compleTime.Count();
                request.Status = RequestConst.CompletedStatus;
                await _requestRepository.UpdateRequest(request);

                var user = await _userService.GetUserById(requestInfo.TutorId);
                if (user != null)
                {
                    user.CoinBalance += (int)Math.Ceiling((decimal)request.Coin * 70 / 100);
                    await _userService.UpdateUser(user);
                }    

                var mappedCancelResponse = _mapper.Map<RequestDTO>(request);

                return mappedCancelResponse;
            }
            return null;
        }

        public async Task<RequestDTO?> ExtendOnlineRequest(DoneRequestDTO requestInfo)
        {
            var request = await _requestRepository.GetRequestById(requestInfo.RequestId);
            var requestTime = _requestRepository.GetAllTimeOfRequest(requestInfo.RequestId);
            var lastTime = requestTime.Last();
            var user = await _userService.GetUserById(request.FromId);

            var timetable = await _timeTableService.GetTimeTableById(lastTime.TimeTableId);

            if(timetable != null && user.CoinBalance >= request.Coin)
            {
                var splitTime = timetable.StartTime.Split(':');
                var thisTime = int.Parse(splitTime[0]);
                var nextTime = thisTime + 1;
                var timeInDB = nextTime.ToString() + ":00";

                var nextTimetable = await _timeTableService.GetTimeTableByUserIdAndStartTime(requestInfo.TutorId, timeInDB, timetable.DayOfWeek);

                if(nextTimetable != null)
                {
                    timetable.Status = TimeTableConst.FreeStatus;
                    await _timeTableService.UpdateTimeTable(timetable);

                    
                    user.CoinBalance -= (int) request.Coin;

                    nextTimetable.Status = TimeTableConst.BusyStatus;
                    await _timeTableService.UpdateTimeTable(nextTimetable);

                    lastTime.Status = RequestConst.InProcessStatus;
                    await _requestRepository.UpdateRequestTime(lastTime);

                    await _requestRepository.AddNewRequestTime(new RequestTime
                    {
                        RequestId = requestInfo.RequestId,
                        TimeTableId = nextTimetable.TimeTableId,
                        Status = RequestConst.PendingStatus,
                    });

                    request.Status = RequestConst.PendingStatus;
                    await _requestRepository.UpdateRequest(request);
                    return _mapper.Map<RequestDTO>(request);
                }
            }
            return null;
        }

        public IEnumerable<Request> GetAllRequests()
        {
            return _requestRepository.GetAllRequests();
        }

        public PaginationResponseDTO<RequestDTO> GetInProcessRequestsOfParents(int parentsId, RequestParameters parameters)
        {
            var requests = _requestRepository.GetPagedInProcessOnlineRequestsOfParents(parentsId, parameters);

            var mappedResponse = _mapper.Map<PaginationResponseDTO<RequestDTO>>(requests);
            mappedResponse.Data = _mapper.Map<List<RequestDTO>>(requests);

            return mappedResponse;
        }

        public PaginationResponseDTO<RequestDTO> GetInProcessRequestsOfTutor(int tutorId, RequestParameters parameters)
        {
            var requests = _requestRepository.GetPagedInProcessOnlineRequestsOfTutor(tutorId, parameters);

            var mappedResponse = _mapper.Map<PaginationResponseDTO<RequestDTO>>(requests);
            mappedResponse.Data = _mapper.Map<List<RequestDTO>>(requests);

            return mappedResponse;
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

        public PaginationResponseDTO<RequestDTO> GetPendingRequestsOfParents(int parentsId, RequestParameters parameters)
        {
            var requests = _requestRepository.GetPagedPendingOnlineRequestsOfParents(parentsId, parameters);

            var mappedResponse = _mapper.Map<PaginationResponseDTO<RequestDTO>>(requests);
            mappedResponse.Data = _mapper.Map<List<RequestDTO>>(requests);

            return mappedResponse;
        }

        public PaginationResponseDTO<RequestDTO> GetPendingRequestsOfTutor(int tutorId, RequestParameters parameters)
        {
            var requests = _requestRepository.GetPagedPendingOnlineRequestsOfTutor(tutorId, parameters);

            var mappedResponse = _mapper.Map<PaginationResponseDTO<RequestDTO>>(requests);
            mappedResponse.Data = _mapper.Map<List<RequestDTO>>(requests);

            return mappedResponse;
        }

        public IEnumerable<Request> GetRequestsOfUser(int userId)
        {
            var allRequests = _requestRepository.GetAllRequestOfUser(userId);

            return allRequests.Where(p => p.Status == RequestConst.CompletedStatus).ToList();
        }

        public double GetRevenueOfRequest()
        {
            return _requestRepository.GetRevenueOfRequest();
        }

        public PaginationResponseDTO<RequestDTO> GetUserRequests(int userId, RequestParameters parameters)
        {
            var requests = _requestRepository.GetUserRequest(userId, parameters);

            var mappedResponse = _mapper.Map<PaginationResponseDTO<RequestDTO>>(requests);
            mappedResponse.Data = _mapper.Map<List<RequestDTO>>(requests);

            return mappedResponse;
        }

        public async Task<RequestDTO?> UpdateOfflineRequest(RequestUpdateDTO requestInfo)
        {
            var request = await _requestRepository.GetRequestById(requestInfo.RequestId);

            if (request != null && request.Status == RequestConst.PendingStatus)
            {
                var times = _requestRepository.GetAllTimeOfRequest(request.RequestId);

                foreach (var time in times)
                {
                    time.Status = requestInfo.IsAccepted ? RequestConst.InProcessStatus : RequestConst.CancelledStatus;
                    await _requestRepository.UpdateRequestTime(time);
                }

                if (!requestInfo.IsAccepted)
                {
                    var offlineTime = _timeTableService.GetOfflineTimeOfUser(requestInfo.TutorId);
                    foreach (var time in offlineTime)
                    {
                        time.Status = TimeTableConst.FreeStatus;
                        await _timeTableService.UpdateTimeTable(time);
                    }

                    var user = await _userService.GetUserById(request.FromId);
                    if (user != null)
                    {
                        user.CoinBalance += 10;
                        await _userService.UpdateUser(user);
                    }
                }
                else
                {
                    var user = await _userService.GetUserById(request.FromId);
                    var tutor = await _userService.GetUserById(requestInfo.TutorId);

                    if (user != null && tutor != null)
                    {
                        _emailService.SendInfomationParentsEmail(tutor.Email, EmailSubject.ParentsInfoSubject, user);
                    }
                }

                request.Status = requestInfo.IsAccepted ? RequestConst.InProcessStatus : RequestConst.CancelledStatus;
                await _requestRepository.UpdateRequest(request);

                string message = requestInfo.IsAccepted ? Description.AcceptedRequest : Description.DeniedRequest;

                // add tutor notification
                var tutorNotification = await _notificationService.AddNewNotification(new Notification()
                {
                    NotificationType = NotificationType.Infomation,
                    Description = Description.OfflineAcceptedChecking,
                    CreatedTime = DateTime.Now,
                    Status = false,
                });

                // add user notification
                await _notificationService.AddNewUserNotification(new UserNotification
                {
                    UserId = requestInfo.TutorId,
                    NotificationId = tutorNotification.NotificationId
                });

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
            else if (request != null && request.Status == RequestConst.InProcessStatus)
            {
                // update time offline
                var offlineTime = _timeTableService.GetOfflineTimeOfUser(requestInfo.TutorId);
                foreach (var time in offlineTime)
                {
                    time.Status = TimeTableConst.FreeStatus;
                    await _timeTableService.UpdateTimeTable(time);
                }

                // update request status
                request.Status = RequestConst.CompletedStatus;
                await _requestRepository.UpdateRequest(request);

                // send message
                var userNotification = await _notificationService.AddNewNotification(new Notification()
                {
                    NotificationType = NotificationType.Infomation,
                    Description = Description.OfflineCompletedRequest,
                    CreatedTime = DateTime.Now,
                    Status = false,
                });

                var tutorNotification = await _notificationService.AddNewNotification(new Notification()
                {
                    NotificationType = NotificationType.Infomation,
                    Description = Description.OfflineCompletedRequest,
                    CreatedTime = DateTime.Now,
                    Status = false,
                });

                await _notificationService.AddNewUserNotification(new UserNotification
                {
                    UserId = request.FromId,
                    NotificationId = userNotification.NotificationId
                });

                await _notificationService.AddNewUserNotification(new UserNotification
                {
                    UserId = requestInfo.TutorId,
                    NotificationId = tutorNotification.NotificationId
                });

                var mappedResponse = _mapper.Map<RequestDTO>(request);

                return mappedResponse;
            }

            return null;
        }

        public async Task<RequestDTO?> UpdateOnlineRequest(RequestOnlineUpdateDTO requestInfo)
        {
            var request = await _requestRepository.GetRequestById(requestInfo.RequestId);

            if (request != null && request.Status == RequestConst.PendingStatus)
            {
                var times = _requestRepository.GetAllTimeOfRequest(request.RequestId);
                var pendingTime = times.Where(t => t.Status == RequestConst.PendingStatus).FirstOrDefault();
                var inprocessTime = times.Where(t => t.Status == RequestConst.InProcessStatus).FirstOrDefault();

                if (!requestInfo.IsAccepted)
                {
                    
                    var user = await _userService.GetUserById(request.FromId);

                    if (user != null)
                    {
                        user.CoinBalance += (int) request.Coin;
                        await _userService.UpdateUser(user);
                    }

                    if (inprocessTime == null)
                    {
                        request.Status = RequestConst.CancelledStatus;
                        await _requestRepository.UpdateRequest(request);

                        foreach (var time in times)
                        {
                            var thisTime = await _timeTableService.GetTimeTableById(time.TimeTableId);
                            if (thisTime != null)
                            {
                                thisTime.Status = TimeTableConst.FreeStatus;
                                await _timeTableService.UpdateTimeTable(thisTime);
                            }

                            if (time.Status != RequestConst.InProcessStatus)
                            {
                                time.Status = RequestConst.CancelledStatus;
                                await _requestRepository.UpdateRequestTime(time);
                            }
                        }
                    } else
                    {
                        pendingTime.Status = RequestConst.CancelledStatus;
                        await _requestRepository.UpdateRequestTime(pendingTime);

                        request.Status = RequestConst.AcceptedStatus;
                        await _requestRepository.UpdateRequest(request);

                        foreach (var time in times)
                        {
                            var thisTime = await _timeTableService.GetTimeTableById(pendingTime.TimeTableId);
                            var pretime = await _timeTableService.GetTimeTableById(inprocessTime.TimeTableId);
                            if (thisTime != null)
                            {
                                thisTime.Status = TimeTableConst.FreeStatus;
                                await _timeTableService.UpdateTimeTable(thisTime);

                                pretime.Status = TimeTableConst.BusyStatus;
                                await _timeTableService.UpdateTimeTable(pretime);
                            }

                            if (time.Status != RequestConst.InProcessStatus)
                            {
                                time.Status = RequestConst.CancelledStatus;
                                await _requestRepository.UpdateRequestTime(time);
                            }
                        }
                    }

                    var mappedCancelResponse = _mapper.Map<RequestDTO>(request);

                    return mappedCancelResponse;
                }

                foreach (var time in times)
                {
                    if (inprocessTime != null)
                    {
                        inprocessTime.Status = RequestConst.InProcessStatus;
                        pendingTime.Status = requestInfo.IsAccepted ? RequestConst.InProcessStatus : RequestConst.CancelledStatus;
                        await _requestRepository.UpdateRequestTime(inprocessTime);
                    } else
                    {
                        pendingTime.Status = requestInfo.IsAccepted ? RequestConst.InProcessStatus : RequestConst.CancelledStatus;
                        await _requestRepository.UpdateRequestTime(pendingTime);
                    }
                }

                request.LinkMeet = requestInfo.LinkMeet;
                request.Status = RequestConst.AcceptedStatus;
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
