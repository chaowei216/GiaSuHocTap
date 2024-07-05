using AutoMapper;
using Common.Constant.Request;
using Common.Constant.Teaching;
using Common.Constant.TimeTable;
using Common.DTO;
using Common.DTO.Query;
using Common.DTO.Request;
using DAO.Model;
using Repository.IRepository;
using Service.IService;

namespace Service.Service
{
    public class RequestService : IRequestService
    {
        private readonly IRequestRepository _requestRepository;
        private readonly ITimeTableService _timeTableService;
        private readonly IUserService _userService;
        private readonly IMapper _mapper;

        public RequestService(IRequestRepository requestRepository,
                              ITimeTableService timeTableService,
                              IUserService userService,
                              IMapper mapper)
        {
            _requestRepository = requestRepository;
            _timeTableService = timeTableService;
            _userService = userService;
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

            if (offlineTime != null && offlineTime.Any())
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
    }
}
