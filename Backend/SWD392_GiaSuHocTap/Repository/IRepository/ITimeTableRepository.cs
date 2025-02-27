﻿using Common.Constant.Request;
using Common.DTO;
using Common.DTO.Query;
using DAO.Model;

namespace Repository.IRepository
{
    public interface ITimeTableRepository
    {
        /// <summary>
        /// Get all time tables
        /// </summary>
        /// <returns></returns>
        IEnumerable<TimeTable> GetAllTimeTables();

        /// <summary>
        /// Get time table by id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        Task<TimeTable?> GetTimeTableById(int id);

        /// <summary>
        /// Add new time table
        /// </summary>
        /// <param name="timeTable"></param>
        /// <returns></returns>
        Task<TimeTable> AddTimeTable(TimeTable timeTable);

        /// <summary>
        /// Update time table
        /// </summary>
        /// <param name="timeTable"></param>
        /// <returns></returns>
        Task<TimeTable> UpdateTimeTable(TimeTable timeTable);

        /// <summary>
        /// Delete time table
        /// </summary>
        /// <param name="timeTable"></param>
        /// <returns></returns>
        Task<bool> DeleteTimeTable(TimeTable timeTable);

        /// <summary>
        /// Get timetable of tutor by tutorId
        /// </summary>
        /// <param name="userId"></param>
        /// <returns></returns>
        IEnumerable<TimeTable> GetTimeTableByUserId(int userId);

        /// <summary>
        /// Get timetable of tutor by start time and userId
        /// </summary>
        /// <param name="userId"></param>
        /// <param name="startTime"></param>
        /// <returns></returns>
        Task<TimeTable?> GetTimeTableByStartTime(int userId, string startTime, string day);

        /// <summary>
        /// Get all offline time of user
        /// </summary>
        /// <param name="userId"></param>
        /// <returns></returns>
        IEnumerable<TimeTable> GetOfflineTimeOfUser(int userId);

        /// <summary>
        /// Get now online time of user
        /// </summary>
        /// <param name="userId"></param>
        /// <returns></returns>
        IEnumerable<TimeTable> GetOnlineTimeOfUser(int userId);

        /// <summary>
        /// Get old online time of user
        /// </summary>
        /// <param name="userId"></param>
        /// <returns></returns>
        IEnumerable<TimeTable> GetOldOnlineTimeOfUser(int userId);

        /// <summary>
        /// Get timetable of tutor by tutorId
        /// </summary>
        /// <param name="userId"></param>
        /// <returns></returns>
        PagedList<TimeTable> GetTimeTableByUserIdPaging(int userId, TimeTableParameters parameters);

        /// <summary>
        /// Get all time of user by day and start, end time online
        /// </summary>
        /// <param name="userId"></param>
        /// <param name="day"></param>
        /// <param name="period"></param>
        /// <returns></returns>
        IEnumerable<TimeTable> GetTimetableByDayAndPeriodAndUserIdOnline(int userId, string day, string start, string end);

        /// <summary>
        /// Get all time of user by day and period offline
        /// </summary>
        /// <param name="userId"></param>
        /// <param name="day"></param>
        /// <param name="period"></param>
        /// <returns></returns>
        IEnumerable<TimeTable> GetTimetableByDayAndPeriodAndUserIdOffline(int userId, string day, string period);

    }
}
