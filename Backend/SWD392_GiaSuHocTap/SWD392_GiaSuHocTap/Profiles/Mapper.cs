using AutoMapper;
using Common.DTO.Auth;
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
            #endregion
        }
    }
}
