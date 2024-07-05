using Common.Constant.Teaching;
using DAO.DAO;
using DAO.Model;
using Microsoft.EntityFrameworkCore;
using Repository.IRepository;

namespace Repository.Repository
{
    public class TimeTableRepository : ITimeTableRepository
    {
        private readonly IGenericDAO<TimeTable> _timeTableDAO;

        public TimeTableRepository(IGenericDAO<TimeTable> timeTableDAO)
        {
            _timeTableDAO = timeTableDAO;
        }

        public async Task<TimeTable> AddTimeTable(TimeTable timeTable)
        {
            return await _timeTableDAO.AddAsync(timeTable);
        }

        public async Task<bool> DeleteTimeTable(TimeTable timeTable)
        {
            return await _timeTableDAO.DeleteAsync(timeTable);
        }

        public IEnumerable<TimeTable> GetAllTimeTables()
        {
            return _timeTableDAO.GetAll().AsEnumerable();
        }

        public IEnumerable<TimeTable> GetOfflineTimeOfUser(int userId)
        {
            return _timeTableDAO.GetAll().Where(p => p.UserId == userId && p.LearningType == LearningType.Offline).ToList();
        }

        public async Task<TimeTable?> GetTimeTableById(int id)
        {
            return await _timeTableDAO.GetByIdAsync(id);
        }

        public IEnumerable<TimeTable> GetTimeTableByUserId(int userId)
        {
            return _timeTableDAO.GetAll().Where(t => t.UserId == userId).AsEnumerable();
        }

        public Task<TimeTable> UpdateTimeTable(TimeTable timeTable)
        {
            return _timeTableDAO.UpdateAsync(timeTable);
        }
    }
}
