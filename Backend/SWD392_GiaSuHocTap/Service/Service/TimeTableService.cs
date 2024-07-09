using AutoMapper;
using Common.Constant.TimeTable;
using Common.DTO.TimeTable;
using Common.DTO.User;
using DAO.Model;
using Repository.IRepository;
using Repository.Repository;
using Service.IService;

namespace Service.Service
{
    public class TimeTableService : ITimeTableService
    {
        private readonly ITimeTableRepository _timeTableRepository;
        private readonly IMapper _mapper;

        public TimeTableService(ITimeTableRepository timeTableRepository, IMapper mapper)
        {
            _timeTableRepository = timeTableRepository;
            _mapper = mapper;
        }

        public async Task<TimeTable> AddTimeTable(TimeTable timeTable)
        {
           return await _timeTableRepository.AddTimeTable(timeTable);
        }

        public async Task<bool> DeleteTimeTable(int userId)
        {
            try
            {
                var userTimeTable = _timeTableRepository.GetTimeTableByUserId(userId).ToList();
                await Task.WhenAll(userTimeTable.Select(c => _timeTableRepository.DeleteTimeTable(c)));
                return true;
            } catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            
        }

        public IEnumerable<TimeTable> GetAllTimeTables()
        {
            return _timeTableRepository.GetAllTimeTables();
        }

        public IEnumerable<TimeTable> GetOfflineTimeOfUser(int userId)
        {
            return _timeTableRepository.GetOfflineTimeOfUser(userId).ToList();
        }

        public TimeTable? GetOnlineTimeOfUser(int userId)
        {
            return _timeTableRepository.GetOnlineTimeOfUser(userId).FirstOrDefault();
        }

        public async Task<TimeTable?> GetTimeTableById(int id)
        {
            return await _timeTableRepository.GetTimeTableById(id);
        }

        public async Task<TimeTable?> GetTimeTableByUserIdAndStartTime(int userId, string startTime)
        {
            return await _timeTableRepository.GetTimeTableByStartTime(userId, startTime); 
        }

        public async Task<TimeTable> UpdateTimeTable(TimeTable timeTable)
        {
            return await _timeTableRepository.UpdateTimeTable(timeTable);
        }

        public async Task<TimetableDTO?> UpdateTimeTable(int timetableId, UpdateTimeTableDTO timetableInfo)
        {
            var timetable = await _timeTableRepository.GetTimeTableById(timetableId);

            if(timetable != null)
            {
                timetable.StartTime = timetableInfo.StartTime + ":00";
                timetable.EndTime = timetableInfo.EndTime + ":00";
                timetable.DayOfWeek = timetableInfo.DayOfWeek;
                timetable.Period = timetableInfo.Period;
                timetable.Status = TimeTableConst.FreeStatus;
                timetable.LearningType = timetable.LearningType;
                timetable.UserId = timetable.UserId;

                var response = await _timeTableRepository.UpdateTimeTable(timetable);
                var responseMapper = _mapper.Map<TimetableDTO>(response);
                return responseMapper;
            }
            return null;
        }

        public async Task<bool> DeleteTimetable(int timetableId)
        {
            var timetable = await _timeTableRepository.GetTimeTableById(timetableId);

            if(timetable != null)
            {
                var response = await _timeTableRepository.DeleteTimeTable(timetable);

                return response;
            }

            return false;
        }
    }
}
