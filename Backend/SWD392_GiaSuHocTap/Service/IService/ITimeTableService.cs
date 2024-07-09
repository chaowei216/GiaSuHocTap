using Common.DTO.TimeTable;
using Common.DTO.User;
using DAO.Model;

namespace Service.IService
{
    public interface ITimeTableService
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
        /// <param name="userId"></param>
        /// <returns></returns>
        Task<bool> DeleteTimeTable(int userId);

        /// <summary>
        /// Get offline time of user
        /// </summary>
        /// <param name="userId"></param>
        /// <returns></returns>
        IEnumerable<TimeTable> GetOfflineTimeOfUser(int userId);

        /// <summary>
        /// Get offline time of user
        /// </summary>
        /// <param name="userId"></param>
        /// <returns></returns>
        TimeTable? GetOnlineTimeOfUser(int userId);

        /// <summary>
        /// Get timetable of tutor by tutorId
        /// </summary>
        /// <param name="userId"></param>
        /// <param name="startTime"></param>
        /// <returns></returns>
        Task<TimeTable?> GetTimeTableByUserIdAndStartTime(int userId, string startTime);

        /// <summary>
        /// Update timetable
        /// </summary>
        /// <param name="timetableId"></param>
        /// <param name="timetableInfo"></param>
        /// <returns></returns>
        Task<TimetableDTO?> UpdateTimeTable(int timetableId, UpdateTimeTableDTO timetableInfo);

        /// <summary>
        /// delete timetable
        /// </summary>
        /// <param name="timetableId"></param>
        /// <returns></returns>
        Task<bool> DeleteTimetable(int timetableId);
    }
}
