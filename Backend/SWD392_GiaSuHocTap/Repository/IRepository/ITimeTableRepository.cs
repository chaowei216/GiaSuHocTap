﻿using DAO.Model;

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
    }
}
