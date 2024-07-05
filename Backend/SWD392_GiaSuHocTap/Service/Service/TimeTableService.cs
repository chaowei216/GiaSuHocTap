using DAO.Model;
using Repository.IRepository;
using Repository.Repository;
using Service.IService;

namespace Service.Service
{
    public class TimeTableService : ITimeTableService
    {
        private readonly ITimeTableRepository _timeTableRepository;

        public TimeTableService(ITimeTableRepository timeTableRepository)
        {
            _timeTableRepository = timeTableRepository;
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

        public async Task<TimeTable?> GetTimeTableById(int id)
        {
            return await _timeTableRepository.GetTimeTableById(id);
        }

        public async Task<TimeTable> UpdateTimeTable(TimeTable timeTable)
        {
            return await _timeTableRepository.UpdateTimeTable(timeTable);
        }
    }
}
