using Common.Enum;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common.DTO.User
{
    public class TutorCreateRequestDTO
    {
        public string Fullname { get; set; } = null!;
        public string Email { get; set; } = null!;
        public string Password { get; set; } = null!;
        public string Phonenumber { get; set; } = null!;
        public string DateOfBirth { get; set; } = null!;
        public string Address { get; set; } = null!;
        public string District { get; set; } = null!;
        public string City { get; set; } = null!;
        public string Gender { get; set; } = null!;
        public string? IdentityNumber { get; set; }
        public string[]? IdentityImage { get; set; }
        public string UserImage { get; set; } = null!;
        public string Job { get; set; } = null!;
        public string Major { get; set; } = null!;
        public string[] CertificateImage { get; set; } = null!;
    }
}
