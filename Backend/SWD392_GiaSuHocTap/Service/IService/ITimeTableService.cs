using Common.DTO;
using Common.DTO.Query;
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
        /// delete timetable
        /// </summary>
        /// <param name="timetableId"></param>
        /// <returns></returns>
        Task<TimetableDTO> DeleteTimetable(int timetableId);

        /// <summary>
        /// enable timetable
        /// </summary>
        /// <param name="timetableId"></param>
        /// <returns></returns>
        Task<TimetableDTO> EnableTimetable(int timetableId);

        /// <summary>
        /// Update user
        /// </summary>
        /// <param name="userId"></param>
        /// <returns></returns>
        PaginationResponseDTO<TimetableDTO> GetTimeTableByUserId(int userId, TimeTableParameters parameters);

        /// <summary>
        /// Get all time of user by day and start time, end time online
        /// </summary>
        /// <param name="userId"></param>
        /// <param name="day"></param>
        /// <param name="period"></param>
        /// <returns></returns>
        IEnumerable<TimeTable> GetTimetableByDayAndPeriodAndUserIdOnline(int userId, string day, string start, string end);

        /// <summary>
        /// Get all time of user by day and start time, endtime offline
        /// </summary>
        /// <param name="userId"></param>
        /// <param name="day"></param>
        /// <param name="period"></param>
        /// <returns></returns>
        IEnumerable<TimeTable> GetTimetableByDayAndPeriodAndUserIdOffline(int userId, string day, string period);
    }
}
