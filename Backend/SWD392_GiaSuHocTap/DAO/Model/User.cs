using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DAO.Model
{
    public class User
    {
        [Key]
        public int UserId { get; set; }
        [Required]
        public string Fullname { get; set; } = null!;
        [Required]
        public string Email { get; set; } = null!;
        public byte[] PasswordHash { get; set; } = new byte[32];
        public byte[] PasswordSalt { get; set; } = new byte[32];
        public string? ResetPassToken { get; set; }
        [Required]
        public string Phonenumber { get; set; } = null!;
        public string DateOfBirth { get; set; } = null!;
        public string Address { get; set; } = null!;
        public string District { get; set; } = null!;
        public string City { get; set; } = null!;
        public string Gender { get; set; } = null!;
        public int CoinBalance { get; set; }
        public string IdentityNumber { get; set; } = null!;
        public string IdentityImage { get; set; } = null!;
        public string UserImage { get; set; } = null!;
        public int NumberOfReport {  get; set; }
        public bool Status { get; set; }
        public int RoleId { get; set; }
        [ForeignKey("RoleId")]
        public Role Role { get; set; } = null!;
        public ICollection<UserClass> UserClasses { get; set; } = null!;
        public ICollection<UserCourse> UserCourses { get; set; } = null!;
        public ICollection<UserNotification> UserNotifications { get; set; } = null!;
        public ICollection<RequestTime> RequestTimes { get; set; } = null!;
        public ICollection<Transaction> Transactions { get; set; } = null!;
        public ICollection<News> News { get; set; } = null!;
        public TutorDetail TutorDetail { get; set; } = null!;
    }
}
