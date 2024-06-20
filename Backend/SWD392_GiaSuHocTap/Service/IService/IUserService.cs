﻿using Common.DTO.User;
using Common.DTO.Auth;
using Common.DTO;
using Common.DTO.Query;
using DAO.Model;
using Microsoft.AspNetCore.Http;

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
        /// <returns></returns>
        PaginationResponseDTO<TutorDTO> GetPagedUserList(UserParameters parameters);

        /// <summary>
        /// Get all pending users
        /// </summary>
        /// <returns></returns>
        PaginationResponseDTO<TutorDTO> GetAllPendingUser(UserParameters parameters);

        /// <summary>
        /// Get all active users
        /// </summary>
        /// <returns></returns>
        PaginationResponseDTO<UserDTO> GetAllActiveUser(UserParameters parameters);

        /// <summary>
        /// Function to help service get image
        /// </summary>
        /// <param name="rootPath"></param>
        /// <returns></returns>
        Task<FileStream> RetrieveItemAsync(string rootPath);
    }
}
