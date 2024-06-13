using Common.Enum;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics.CodeAnalysis;
using System.Text.Json.Serialization;

namespace DAO.Model
{
    public class User
    {
        [Key]
        public int UserId { get; set; }
        [Required]
        [Range(1, 30)]
        public string Fullname { get; set; } = null!;
        [Required]
        public string Email { get; set; } = null!;
        public byte[] PasswordHash { get; set; } = new byte[32];
        public byte[] PasswordSalt { get; set; } = new byte[32];
        public string? ResetPassToken { get; set; }
        [Required]
        [Range(10, 10)]
        public string Phonenumber { get; set; } = null!;
        [Required]
        public string DateOfBirth { get; set; } = null!;
        [Required]
        public string Address { get; set; } = null!;
        [Required]
        public string District { get; set; } = null!;
        [Required]
        public string City { get; set; } = null!;
        [Required]
        public string Gender { get; set; } = null!;
        public string? Otp { get; set; }
        public DateTime? OtpExpiredTime { get; set; }
        [Required]
        public bool IsVerified { get; set; }
        public int CoinBalance { get; set; }
        [Range(12,12)]
        public string? IdentityNumber { get; set; }
        public List<string>? IdentityImage { get; set; }
        public string UserImage { get; set; } = null!;
        [AllowNull]
        public string? YoutubeLink { get; set; }
        public int NumberOfReport {  get; set; }
        [Required]
        [Column(TypeName = "nvarchar(24)")]
        [JsonConverter(typeof(JsonStringEnumConverter))]
        public UserStatusEnum Status { get; set; }
        public int RoleId { get; set; }
        [ForeignKey("RoleId")]
        public Role Role { get; set; } = null!;
        public ICollection<UserClass> UserClasses { get; set; } = null!;
        public ICollection<UserCourse> UserCourses { get; set; } = null!;
        public ICollection<UserNotification> UserNotifications { get; set; } = null!;
        public ICollection<RequestTime> RequestTimes { get; set; } = null!;
        public ICollection<Transaction> Transactions { get; set; } = null!;
        public ICollection<News> News { get; set; } = null!;
        public ICollection<RefreshToken> RefreshTokens { get; set; } = null!;
        public TutorDetail TutorDetail { get; set; } = null!;
    }
}
