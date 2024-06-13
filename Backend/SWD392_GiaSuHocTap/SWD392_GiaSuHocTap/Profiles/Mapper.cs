using AutoMapper;
using Common.DTO;
using Common.DTO.Auth;
using Common.DTO.Class;
using Common.DTO.Course;
using Common.DTO.User;
using DAO.Model;

namespace SWD392_GiaSuHocTap.Profiles
{
    public class Mapper : Profile
    {
        public Mapper()
        {
            #region map entity
            CreateMap<UserDTO, User>().ReverseMap();
            CreateMap<TutorCreateRequestDTO, User>().ReverseMap();
            CreateMap<TutorCreateRequestDTO, TutorDetail>().ReverseMap();
            CreateMap<ParentCreateRequestDTO, User>().ReverseMap();
            CreateMap<PagedList<User>, PaginationResponseDTO<UserDTO>>().ReverseMap();
            CreateMap<ClassDTO, Class>().ReverseMap();
            CreateMap<CourseDTO, Course>().ReverseMap();
            #endregion
        }
    }
}
