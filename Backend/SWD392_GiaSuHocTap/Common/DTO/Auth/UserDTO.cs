using System.ComponentModel.DataAnnotations;

namespace Common.DTO.Auth
{
    public class UserDTO
    {
        public int UserId { get; set; }
        public string Fullname { get; set; } = null!;
        public string Email { get; set; } = null!;
        public string Phonenumber { get; set; } = null!;
        public string DateOfBirth { get; set; } = null!;
        public string Address { get; set; } = null!;
        public string District { get; set; } = null!;
        public string City { get; set; } = null!;
        public string Gender { get; set; } = null!;
        public int CoinBalance { get; set; }
        public string IdentityNumber { get; set; } = null!;
        public string[] IdentityImage { get; set; } = null!;
        public string UserImage { get; set; } = null!;
        public int NumberOfReport { get; set; }
        public bool Status { get; set; }
        public int RoleId { get; set; }
    }
}
