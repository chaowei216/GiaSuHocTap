using Common.DTO;
using Common.DTO.User;
using DAO.Model;

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
        Task<ParentCreateResponseDTO> AddNewParent(ParentCreateRequestDTO parent);

        /// <summary>
        /// Add new tutor
        /// </summary>
        /// <param name="tutor"></param>
        /// <returns></returns>
        Task<TutorCreateResponseDTO> AddNewTutor(TutorCreateRequestDTO tutor);

        /// <summary>
        /// Update user
        /// </summary>
        /// <param name="user"></param>
        /// <returns></returns>
        Task<User> UpdateUser(User user);

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

        CheckValidateResponseDTO CheckCreateTutor(TutorCreateRequestDTO tutor);

        CheckValidateResponseDTO CheckCreateParent(ParentCreateRequestDTO parent);
    }
}
