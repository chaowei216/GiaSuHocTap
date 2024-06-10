using DAO.Model;
using Repository.IRepository;
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

        public async Task<bool> DeleteTimeTable(TimeTable timeTable)
        {
            return await _timeTableRepository.DeleteTimeTable(timeTable);
        }

        public IEnumerable<TimeTable> GetAllTimeTables()
        {
            return _timeTableRepository.GetAllTimeTables();
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
