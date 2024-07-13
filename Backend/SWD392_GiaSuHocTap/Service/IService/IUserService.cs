using Common.DTO.User;
using Common.DTO.Auth;
using Common.DTO;
using Common.DTO.Query;
using DAO.Model;
using Microsoft.AspNetCore.Http;
using Common.DTO.TimeTable;

namespace Service.IService
{
    public interface IUserService
    {
        /// <summary>
        /// Get all users
        /// </summary>
        /// <returns></returns>
        IEnumerable<User> GetAllUsers();

        /// <summary>
        /// Get user by id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        Task<User?> GetUserById(int id);

        /// <summary>
        /// Add new parent
        /// </summary>
        /// <param name="parent"></param>
        /// <returns></returns>
        Task<ParentCreateResponseDTO> AddNewParent(ParentCreateRequestDTO parent, IFormFile userImageUrl);

        /// <summary>
        /// Add new tutor
        /// </summary>
        /// <param name="tutor"></param>
        /// <returns></returns>
        Task<TutorCreateResponseDTO> AddNewTutor(TutorCreateRequestDTO tutor, IFormFile imageFile, List<IFormFile> idenFiles,
                                                                List<IFormFile> cerFiles);

        /// <summary>
        /// Update user
        /// </summary>
        /// <param name="user"></param>
        /// <returns></returns>
        Task<User> UpdateUserOtp(User user);

        /// <summary>
        /// Add new tutor detail
        /// </summary>
        /// <param name="tutorDetail"></param>
        /// <returns></returns>
        Task<TutorDetail> AddNewTutorDetail(TutorDetail tutorDetail);

        /// <summary>
        /// Update tutor detail
        /// </summary>
        /// <param name="tutorDetail"></param>
        /// <returns></returns>
        Task<TutorDetail> UpdateTutorDetail(TutorDetail tutorDetail);

        /// <summary>
        /// Get user by email
        /// </summary>
        /// <param name="email"></param>
        /// <returns></returns>
        User? GetUserByEmail(string email);

        /// <summary>
        /// Check validate create tutor
        /// </summary>
        /// <param name="tutor"></param>
        /// <returns></returns>
        CheckValidateResponseDTO CheckCreateTutor(TutorCreateRequestDTO tutor);

        /// <summary>
        /// Check validate create parent
        /// </summary>
        /// <param name="parent"></param>
        /// <returns></returns>
        CheckValidateResponseDTO CheckCreateParent(ParentCreateRequestDTO parent);

        /// <summary>
        /// Get user list with pagination
        /// Get all users where status is pending
        /// </summary>
        /// <param name="parameters"></param>
        /// <returns></returns>
        PaginationResponseDTO<TutorDTO> GetPagedUserList(UserParameters parameters);

        /// <summary>
        /// Get tutor list with pagination
        /// </summary>
        /// <param name="parameters"></param>
        /// <returns></returns>
        PaginationResponseDTO<TutorDTO> GetPagedTutorList(UserParameters parameters);

        /// <summary>
        /// Get all pending users
        /// </summary>
        /// <param name="parameters"></param>
        /// <returns></returns>
        PaginationResponseDTO<TutorInforDTO> GetAllPendingUser(UserParameters parameters);

        /// <summary>
        /// Get all active users
        /// </summary>
        /// <param name="parameters"></param>
        /// <returns></returns>
        PaginationResponseDTO<TutorInforDTO> GetAllActiveUser(UserParameters parameters);

        /// <summary>
        /// Function to help service get image
        /// </summary>
        /// <param name="rootPath"></param>
        /// <returns></returns>
        Task<FileStream> RetrieveItemAsync(string rootPath);

        /// <summary>
        /// Update User
        /// </summary>
        /// <param name="user"></param>
        /// <returns></returns>
        Task<bool> UpdateTutorLastStep(UpdateTutorDTO tutorInfo);

        /// <summary>
        /// Get all teaching online tutor
        /// </summary>
        /// <param name="parameters"></param>
        /// <returns></returns>
        PaginationResponseDTO<TutorInforDTO> GetTutorTeachOnline(TutorParameters parameters);

        /// <summary>
        /// Get all teaching offline tutor
        /// </summary>
        /// <param name="parameters"></param>
        /// <returns></returns>
        PaginationResponseDTO<TutorInforDTO> GetTutorTeachOffline(TutorParameters parameters);

        /// <summary>
        /// Get tutor by email include all information
        /// </summary>
        /// <param name="email"></param>
        /// <returns></returns>
        TutorDTO? GetUserByEmailInclude(string email);

        /// <summary>
        /// Get top tutor
        /// </summary>
        /// <returns></returns>
        IEnumerable<TutorInforDTO> GetTopTutor();

        /// <summary>
        /// Update user info
        /// </summary>
        /// <param name="user"></param>
        /// <returns></returns>
        Task<User> UpdateUser(User user);

        /// <summary>
        /// Get tutor detail by user id
        /// </summary>
        /// <param name="userId"></param>
        /// <returns></returns>
        Task<TutorDetail?> GetTutorDetailByUserId(int userId);

        /// <summary>
        /// Update user
        /// </summary>
        /// <param name="user"></param>
        /// <param name="userInfo"></param>
        /// <returns></returns>
        Task<TutorDTO?> UpdateUser(User user, UserUpdateDTO userInfo);

        /// <summary>
        /// Update user
        /// </summary>
        /// <param name="user"></param>
        /// <param name="userInfo"></param>
        /// <returns></returns>
        PaginationResponseDTO<TimetableDTO> GetTimeTableByEmail(string email, TimeTableParameters parameters);

        /// <summary>
        /// Update timetable
        /// </summary>
        /// <param name="tutorInfo"></param>
        /// <returns></returns>
        Task<bool> UpdateTimetable(UpdateTimeTableDTO tutorInfo);
    }
}
