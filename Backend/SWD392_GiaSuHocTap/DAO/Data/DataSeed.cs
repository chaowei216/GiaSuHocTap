using Common.Enum;
using DAO.DAO;
using DAO.Model;
using System.Security.Cryptography;

namespace DAO.Data
{

    public class DataSeed
    {
        private readonly DataContext _context;

        public DataSeed(DataContext context)
        {
            _context = context;
        }

        private void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using (var hMac = new HMACSHA512())
            {
                passwordSalt = hMac.Key;
                passwordHash = hMac
                    .ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }

        public void TrySeed()
        {
            CreatePasswordHash("1234567!", out byte[] passwordHash, out byte[] passwordSalt);
            if (!_context.Roles.Any() && !_context.Classes.Any() && !_context.Courses.Any())
            {
                var roleAdmin = new Role { RoleName = RoleEnum.Admin };
                var roleModerator = new Role { RoleName = RoleEnum.Moderator };
                var roleTutor = new Role { RoleName = RoleEnum.Tutor };
                var roleParents = new Role { RoleName = RoleEnum.Parents };

                List<Role> userRoles = new()
                {
                    roleAdmin,
                    roleModerator,
                    roleTutor,
                    roleParents
                };

                _context.Roles.AddRange(userRoles);

                List<Class> classes = new()
                {
                    new Class
                    {
                        ClassName = "Lớp 6",
                    },
                    new()
                    {
                        ClassName = "Lớp 7",
                    },
                    new()
                    {
                        ClassName = "Lớp 8",
                    },
                    new()
                    {
                        ClassName = "Lớp 9",
                    },
                    new()
                    {
                        ClassName = "Lớp 10",
                    },
                    new()
                    {
                        ClassName = "Lớp 11",
                    },
                    new()
                    {
                        ClassName = "Lớp 12",
                    }
                };
                List<Course> courses = new()
                {
                    new Course
                    {
                        CourseName = "Toán",
                        Description = "Môn toán"
                    },
                    new()
                    {
                        CourseName = "Văn",
                        Description = "Môn văn"
                    },
                    new()
                    {
                        CourseName = "Tiếng Anh",
                        Description = "Môn anh"
                    },
                    new()
                    {
                        CourseName = "Hóa",
                        Description = "Môn hóa"
                    },
                    new()
                    {
                        CourseName = "Lí",
                        Description = "Môn lí"
                    },
                };
                List<User> users = new()
                {
                    new User
                    {
                        Fullname = "Lê Việt Hùng",
                        Email = "hung@gmail.com",
                        PasswordHash = passwordHash,
                        PasswordSalt = passwordSalt,
                        RefreshTokens = null,
                        Phonenumber = "0919111222",
                        DateOfBirth = "1-5-2000",
                        Address = "Đường Cộng Hòa",
                        District = "Q9",
                        City = "TP Hồ Chí Minh",
                        Gender = "Male",
                        Otp = null,
                        OtpExpiredTime = null,
                        IsVerified = true,
                        CoinBalance = 0,
                        IdentityNumber = "283471927471",
                        IdentityImage = null,
                        UserImage = "anh-den-ngau-005.jpg",
                        YoutubeLink = null,
                        NumberOfReport = 0,
                        Status = UserStatusEnum.Active,
                        RoleId = (int)RoleEnum.Moderator  ,
                    },
                    new()
                    {
                        Fullname = "Lê Việt Vĩ",
                        Email = "vi@gmail.com",
                        PasswordHash = passwordHash,
                        PasswordSalt = passwordSalt,
                        RefreshTokens = null,
                        Phonenumber = "0919111221",
                        DateOfBirth = "6-5-2000",
                        Address = "Đường Lê Văn Khương",
                        District = "Q12",
                        City = "TP Hồ Chí Minh",
                        Gender = "Male",
                        Otp = null,
                        OtpExpiredTime = null,
                        IsVerified = true,
                        CoinBalance = 0,
                        IdentityNumber = "283471927221",
                        IdentityImage = null,
                        YoutubeLink = null,
                        UserImage = "anh-den-ngau-002.jpg",
                        NumberOfReport = 0,
                        Status = UserStatusEnum.Active,
                        RoleId = (int)RoleEnum.Moderator  ,
                    },
                    new()
                    {
                        Fullname = "Lê Việt Nam",
                        Email = "nam@gmail.com",
                        PasswordHash = passwordHash,
                        PasswordSalt = passwordSalt,
                        RefreshTokens = null,
                        Phonenumber = "0919221221",
                        DateOfBirth = "6-12-2000",
                        Address = "Đường Lê Văn Khương",
                        District = "Q12",
                        City = "TP Hồ Chí Minh",
                        Gender = "Male",
                        Otp = null,
                        OtpExpiredTime = null,
                        IsVerified = true,
                        CoinBalance = 0,
                        IdentityNumber = "283471927221",
                        IdentityImage = null,
                        YoutubeLink = null,
                        UserImage = "anh-den-ngau-001.jpg",
                        NumberOfReport = 0,
                        Status = UserStatusEnum.Active,
                        RoleId = (int)RoleEnum.Moderator  ,
                    },
                    new()
                    {
                        Fullname = "Lưu Triều Vĩ",
                        Email = "vimap@gmail.com",
                        PasswordHash = passwordHash,
                        PasswordSalt = passwordSalt,
                        RefreshTokens = null,
                        Phonenumber = "0919991221",
                        DateOfBirth = "6-5-2000",
                        Address = "Đường Suối Tiên",
                        District = "Thủ Đức",
                        City = "TP Hồ Chí Minh",
                        Gender = "FeMale",
                        Otp = null,
                        OtpExpiredTime = null,
                        IsVerified = true,
                        CoinBalance = 0,
                        IdentityNumber = "283881927121",
                        IdentityImage = null,
                        YoutubeLink = null,
                        UserImage = "anh-den-ngau-003.jpg",
                        NumberOfReport = 0,
                        Status = UserStatusEnum.Active,
                        RoleId = (int)RoleEnum.Moderator  ,
                    },
                    new()
                    {
                        Fullname = "Lưu Triều Hùng",
                        Email = "hungmap@gmail.com",
                        PasswordHash = passwordHash,
                        PasswordSalt = passwordSalt,
                        RefreshTokens = null,
                        Phonenumber = "0919121221",
                        DateOfBirth = "12-5-2000",
                        Address = "Dĩ An",
                        District = "Thủ Đức",
                        City = "TP Hồ Chí Minh",
                        Gender = "FeMale",
                        Otp = null,
                        OtpExpiredTime = null,
                        IsVerified = true,
                        CoinBalance = 0,
                        IdentityNumber = "283881927121",
                        IdentityImage = null,
                        YoutubeLink = null,
                        UserImage = "anh-den-ngau-011.jpg",
                        NumberOfReport = 0,
                        Status = UserStatusEnum.Active,
                        RoleId = (int)RoleEnum.Moderator  ,
                    },
                    new()
                    {
                        Fullname = "Lưu Triều Nam",
                        Email = "nammap@gmail.com",
                        PasswordHash = passwordHash,
                        PasswordSalt = passwordSalt,
                        RefreshTokens = null,
                        Phonenumber = "0919121221",
                        DateOfBirth = "12-5-2000",
                        Address = "188A, Lý Thường Kiệt",
                        District = "Dĩ An",
                        City = "Bình Dương",
                        Gender = "FeMale",
                        Otp = null,
                        OtpExpiredTime = null,
                        IsVerified = true,
                        CoinBalance = 0,
                        IdentityNumber = "283881927121",
                        IdentityImage = null,
                        YoutubeLink = null,
                        UserImage = "anh-den-ngau-012.jpg",
                        NumberOfReport = 0,
                        Status = UserStatusEnum.Active,
                        RoleId = (int)RoleEnum.Parents,
                    },
                    new()
                    {
                        Fullname = "Nguyễn Phương Nam",
                        Email = "nam1@gmail.com",
                        PasswordHash = passwordHash,
                        PasswordSalt = passwordSalt,
                        RefreshTokens = null,
                        Phonenumber = "0919228993",
                        DateOfBirth = "12-1-2000",
                        Address = "162A, Thủ Dầu Một",
                        District = "Thủ Dầu Một",
                        City = "Bình Dương",
                        Gender = "FeMale",
                        Otp = null,
                        OtpExpiredTime = null,
                        IsVerified = true,
                        CoinBalance = 0,
                        IdentityNumber = "283881927121",
                        IdentityImage = null,
                        YoutubeLink = null,
                        UserImage = "anh-den-ngau-016.jpg",
                        NumberOfReport = 0,
                        Status = UserStatusEnum.Active,
                        RoleId = (int)RoleEnum.Parents,
                    }
                };

                _context.Classes.AddRange(classes);
                _context.Courses.AddRange(courses);
                _context.Users.AddRange(users);

                _context.SaveChanges();
            }
        }
    }
}
