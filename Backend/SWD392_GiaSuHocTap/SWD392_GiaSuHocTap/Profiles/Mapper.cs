using AutoMapper;
using Common.DTO.Auth;
using DAO.Model;

namespace SWD392_GiaSuHocTap.Profiles
{
    public class Mapper : Profile
    {
        public Mapper()
        {
            #region map entity
            CreateMap<UserDTO, User>().ReverseMap();
            #endregion
        }
    }
}
