﻿
using AutoMapper;
using Common.DTO;
using Common.DTO.Auth;
using Common.DTO.Class;
using Common.DTO.Course;
using Common.DTO.Feedback;
using Common.DTO.Payment;
using Common.DTO.Report;
using Common.DTO.TimeTable;
using Common.DTO.User;
using Common.Enum;
using Common.Helpers;
using DAO.Model;

namespace SWD392_GiaSuHocTap.Profiles
{
    public class Mapper : Profile
    {
        public Mapper()
        {
            #region map entity
            CreateMap<User, UserDTO>().ForMember(dest => dest.RoleName, opt => opt.MapFrom(src => RoleHelper.GetRoleName((RoleEnum)Enum.ToObject(typeof(RoleEnum), src.RoleId))));
            CreateMap<TutorCreateRequestDTO, User>().ReverseMap();
            CreateMap<TutorCreateRequestDTO, TutorDetail>().ReverseMap();
            CreateMap<ParentCreateRequestDTO, User>().ReverseMap();
            CreateMap<PagedList<User>, PaginationResponseDTO<UserDTO>>().ReverseMap();
            CreateMap<ClassDTO, Class>().ReverseMap();
            CreateMap<CourseDTO, Course>().ReverseMap();
            CreateMap<User, TutorInforDTO>().ForMember(dest => dest.RoleName, opt => opt.MapFrom(src => RoleHelper.GetRoleName((RoleEnum)Enum.ToObject(typeof(RoleEnum), src.RoleId))));
            CreateMap<PagedList<User>, PaginationResponseDTO<TutorInforDTO>>().ReverseMap();
            CreateMap<PagedList<User>, PaginationResponseDTO<TutorDTO>>().ReverseMap();
            CreateMap<User, TutorDTO>().ForMember(dest => dest.RoleName, opt => opt.MapFrom(src => RoleHelper.GetRoleName((RoleEnum)Enum.ToObject(typeof(RoleEnum), src.RoleId))));
            CreateMap<TutorDetailDTO, TutorDetail>().ReverseMap();
            CreateMap<UserClass, UserClassDTO>().ReverseMap();
            CreateMap<UserCourse, UserCourseDTO>().ReverseMap();
            CreateMap<TimeTable, TimetableDTO>().ReverseMap();
            CreateMap<DeleteUserClassDTO, UserClass>().ReverseMap();
            CreateMap<DeleteUserCourseDTO, UserCourse>().ReverseMap();
            CreateMap<Feedback, FeedbackDTO>().ReverseMap();
            CreateMap<Report, ReportDTO>().ReverseMap();
            CreateMap<Class, ClassFullDTO>().ReverseMap();
            CreateMap<Course, CourseFullDTO>().ReverseMap();
            CreateMap<Transaction, TransactionDTO>().ForMember(dest => dest.Email, opt => opt.MapFrom(src => src.User.Email)).ReverseMap();
            CreateMap<PagedList<Transaction>, PaginationResponseDTO<TransactionDTO>>().ReverseMap();
            #endregion
        }
    }
}
