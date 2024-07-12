using Common.Constant.Teaching;
using Common.Constant.TimeTable;
using Common.DTO;
using Common.DTO.Auth;
using Common.DTO.Query;
using Common.Enum;
using DAO.DAO;
using DAO.Model;
using Microsoft.EntityFrameworkCore;
using Repository.IRepository;
using System;

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

        public IEnumerable<TimeTable> GetOnlineTimeOfUser(int userId)
        {
            return _timeTableDAO.GetAll().AsEnumerable().Where(t => t.LearningType == TimeTableConst.Online
                                                                                && DateTime.Parse(t.StartTime) <= DateTime.Now.AddMinutes(20) &&
                                                                                DateTime.Parse(t.EndTime) >= DateTime.Now.AddMinutes(20));
        }

        public IEnumerable<TimeTable> GetOldOnlineTimeOfUser(int userId)
        {
            return _timeTableDAO.GetAll().AsEnumerable().Where(t => t.LearningType == TimeTableConst.Online
                                                                                && t.Status == TimeTableConst.BusyStatus);
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

        public async Task<TimeTable?> GetTimeTableByStartTime(int userId, string startTime)
        {
            return await _timeTableDAO.GetAll().Where(t => t.StartTime == startTime && t.UserId == userId).FirstOrDefaultAsync();
        }

        public PagedList<TimeTable> GetTimeTableByUserIdPaging(int userId, TimeTableParameters parameters)
        {
            return PagedList<TimeTable>.ToPagedList(_timeTableDAO.GetAll().Where(t => t.UserId == userId), parameters.PageNumber, parameters.PageSize);
        }
    }
}
