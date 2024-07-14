using AutoMapper;
using Common.Constant.TimeTable;
using Common.DTO.Query;
using Common.DTO;
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

        public async Task<TimeTable?> GetTimeTableByUserIdAndStartTime(int userId, string startTime, string day)
        {
            return await _timeTableRepository.GetTimeTableByStartTime(userId, startTime, day); 
        }

        public async Task<TimeTable> UpdateTimeTable(TimeTable timeTable)
        {
            return await _timeTableRepository.UpdateTimeTable(timeTable);
        }

        public async Task<TimetableDTO> DeleteTimetable(int timetableId)
        {
            var timetable = await _timeTableRepository.GetTimeTableById(timetableId);

            if(timetable != null)
            {
                timetable.Status = TimeTableConst.DeleteStatus;
                var response = await _timeTableRepository.UpdateTimeTable(timetable);
                var map = _mapper.Map<TimetableDTO>(timetable);
                return map;
            }

            return null;
        }

        public async Task<TimetableDTO> EnableTimetable(int timetableId)
        {
            var timetable = await _timeTableRepository.GetTimeTableById(timetableId);

            if (timetable != null)
            {
                timetable.Status = TimeTableConst.FreeStatus;
                var response = await _timeTableRepository.UpdateTimeTable(timetable);
                var map = _mapper.Map<TimetableDTO>(timetable);
                return map;
            }

            return null;
        }

        public PaginationResponseDTO<TimetableDTO> GetTimeTableByUserId(int userId, TimeTableParameters parameters)
        {
            var timetable = _timeTableRepository.GetTimeTableByUserIdPaging(userId, parameters);

            var respone = _mapper.Map<PaginationResponseDTO<TimetableDTO>>(timetable);
            respone.Data = _mapper.Map<List<TimetableDTO>>(timetable);
            return respone;
        }

        public IEnumerable<TimeTable> GetTimetableByDayAndPeriodAndUserIdOnline(int userId, string day, string start, string end)
        {
            return _timeTableRepository.GetTimetableByDayAndPeriodAndUserIdOnline(userId, day, start, end);
        }

        public IEnumerable<TimeTable> GetTimetableByDayAndPeriodAndUserIdOffline(int userId, string day, string period)
        {
            return _timeTableRepository.GetTimetableByDayAndPeriodAndUserIdOffline(userId, day, period);
        }
    }
}
