
using AutoMapper;
using Common.Constant.Report;
using Common.Constant.Request;
using Common.DTO;
using Common.DTO.Auth;
using Common.DTO.Class;
using Common.DTO.Course;
using Common.DTO.Feedback;
using Common.DTO.News;
using Common.DTO.Notification;
using Common.DTO.Payment;
using Common.DTO.Report;
using Common.DTO.Request;
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
            CreateMap<List<TutorInforDTO>, PaginationResponseDTO<TutorInforDTO>>().ReverseMap();
            CreateMap<User, TutorInforDTO>().ForMember(dest => dest.RoleName, opt => opt.MapFrom(src => RoleHelper.GetRoleName((RoleEnum)Enum.ToObject(typeof(RoleEnum), src.RoleId))));
            CreateMap<PagedList<User>, PaginationResponseDTO<TutorInforDTO>>().ReverseMap();
            CreateMap<PagedList<User>, PaginationResponseDTO<TutorDTO>>().ReverseMap();
            CreateMap<PagedList<Feedback>, PaginationResponseDTO<FeedbackDTO>>().ReverseMap();
            CreateMap<PagedList<News>, PaginationResponseDTO<NewsDTO>>().ReverseMap();
            CreateMap<News, NewsDTO>().ReverseMap();
            CreateMap<News, NewsCreateDTO>().ReverseMap();
            CreateMap<User, TutorDTO>().ForMember(dest => dest.RoleName, opt => opt.MapFrom(src => RoleHelper.GetRoleName((RoleEnum)Enum.ToObject(typeof(RoleEnum), src.RoleId))));
            CreateMap<TutorDetailDTO, TutorDetail>().ReverseMap();
            CreateMap<UserClass, UserClassDTO>().ReverseMap();
            CreateMap<UserCourse, UserCourseDTO>().ReverseMap();
            CreateMap<TimeTable, TimetableDTO>().ReverseMap();
            CreateMap<DeleteUserClassDTO, UserClass>().ReverseMap();
            CreateMap<DeleteUserCourseDTO, UserCourse>().ReverseMap();
            CreateMap<Feedback, FeedbackDTO>().ForMember(dest => dest.FromName, otp => otp.MapFrom(src => src.From.Fullname))
                                              .ForMember(dest => dest.ToName, otp => otp.MapFrom(src => src.To.Fullname)).ReverseMap();
            CreateMap<FeedbackCreateDTO, Feedback>().ReverseMap();
            CreateMap<Report, ReportDTO>().ReverseMap();
            CreateMap<Class, ClassFullDTO>().ReverseMap();
            CreateMap<Course, CourseFullDTO>().ReverseMap();
            CreateMap<Transaction, TransactionDTO>().ForMember(dest => dest.Email, opt => opt.MapFrom(src => src.User.Email)).ReverseMap();
            CreateMap<PagedList<Transaction>, PaginationResponseDTO<TransactionDTO>>().ReverseMap();
            CreateMap<Notification, NotificationDTO>().ReverseMap();
            CreateMap<PagedList<Request>, PaginationResponseDTO<RequestDTO>>().ReverseMap();
            CreateMap<Request, RequestDTO>().ForMember(dest => dest.ClassName, opt => opt.MapFrom(src => src.Class.ClassName))
                                            .ForMember(dest => dest.CourseName, opt => opt.MapFrom(src => src.Course.CourseName))
                                            .ForMember(dest => dest.RequestUserName, opt => opt.MapFrom(src => src.From.Fullname))
                                            .ForMember(dest => dest.RequestStatus, opt => opt.MapFrom(src => src.Status)).ReverseMap();
            CreateMap<Request, RequestUserDTO>().ForMember(dest => dest.ClassName, opt => opt.MapFrom(src => src.Class.ClassName))
                                            .ForMember(dest => dest.CourseName, opt => opt.MapFrom(src => src.Course.CourseName))
                                            .ForMember(dest => dest.RequestUserName, opt => opt.MapFrom(src => src.From.Fullname))
                                            .ForMember(dest => dest.RequestStatus, opt => opt.MapFrom(src => src.Status))
                                            .ReverseMap();
            CreateMap<RequestOnlineDTO, Request>().ReverseMap();
            CreateMap<RequestTimeDTO, RequestTime>().ReverseMap();
            CreateMap<TimeTable, RequestTimetableDTO>().ForMember(dest => dest.Fullname, otp => otp.MapFrom(src => src.User.Fullname))
                                                       .ForMember(dest => dest.TutorId, otp => otp.MapFrom(src => src.User.UserId)).ReverseMap();
            CreateMap<PagedList<Notification>, PaginationResponseDTO<NotificationDTO>>().ReverseMap();
            CreateMap<PagedList<Report>, PaginationResponseDTO<ReportDTO>>().ReverseMap();
            CreateMap<Report, ReportDTO>().ForMember(dest => dest.ParentsEmail, opt => opt.MapFrom(src => src.From.Email))
                                          .ForMember(dest => dest.TutorEmail, opt => opt.MapFrom(src => src.To.Email))
                                          .ForMember(dest => dest.Status, opt => opt.MapFrom(src => src.Status ? ReportConst.DoneStatus : ReportConst.PendingStatus)).ReverseMap();
            CreateMap<UserUpdateDTO, User>().ReverseMap();
            #endregion
        }
    }
}
