﻿using Common.Enum;
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
                        Phonenumber = "0911000000",
                        DateOfBirth = "1-5-2000",
                        Address = "Đường Cộng Hòa",
                        District = "Q9",
                        City = "TP Hồ Chí Minh",
                        Gender = "Male",
                        Otp = null,
                        OtpExpiredTime = null,
                        IsVerified = true,
                        CoinBalance = 0,
                        IdentityNumber = "200000000001",
                        IdentityImage = ["c1.jfif", "c2.jfif"],
                        UserImage = "anh-den-ngau-001.jpg",
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
                        Phonenumber = "0911000001",
                        DateOfBirth = "6-5-2000",
                        Address = "Đường Lê Văn Khương",
                        District = "Q12",
                        City = "TP Hồ Chí Minh",
                        Gender = "Male",
                        Otp = null,
                        OtpExpiredTime = null,
                        IsVerified = true,
                        CoinBalance = 0,
                        IdentityNumber = "200000000002",
                        IdentityImage = ["c3.jfif", "c2.jfif"],
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
                        Phonenumber = "0911000002",
                        DateOfBirth = "6-11-2000",
                        Address = "Đường Lê Văn Khương",
                        District = "Q12",
                        City = "TP Hồ Chí Minh",
                        Gender = "Male",
                        Otp = null,
                        OtpExpiredTime = null,
                        IsVerified = true,
                        CoinBalance = 0,
                        IdentityNumber = "200000000003",
                        IdentityImage = ["c4.jfif", "c6.jfif"],
                        YoutubeLink = null,
                        UserImage = "anh-den-ngau-003.jpg",
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
                        Phonenumber = "0911000003",
                        DateOfBirth = "6-1-1987",
                        Address = "Đường Suối Tiên",
                        District = "Thủ Đức",
                        City = "TP Hồ Chí Minh",
                        Gender = "FeMale",
                        Otp = null,
                        OtpExpiredTime = null,
                        IsVerified = true,
                        CoinBalance = 0,
                        IdentityNumber = "200000000004",
                        IdentityImage = ["c5.jfif", "c2.jfif"],
                        YoutubeLink = null,
                        UserImage = "anh-den-ngau-005.jpg",
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
                        Phonenumber = "0911000004",
                        DateOfBirth = "7-5-2000",
                        Address = "Dĩ An",
                        District = "Thủ Đức",
                        City = "TP Hồ Chí Minh",
                        Gender = "FeMale",
                        Otp = null,
                        OtpExpiredTime = null,
                        IsVerified = true,
                        CoinBalance = 0,
                        IdentityNumber = "200000000005",
                        IdentityImage = ["c6.jfif", "c8.jfif"],
                        YoutubeLink = null,
                        UserImage = "anh-den-ngau-006.jpg",
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
                        Phonenumber = "0911000005",
                        DateOfBirth = "12-5-2000",
                        Address = "188A, Lý Thường Kiệt",
                        District = "Dĩ An",
                        City = "Bình Dương",
                        Gender = "FeMale",
                        Otp = null,
                        OtpExpiredTime = null,
                        IsVerified = true,
                        CoinBalance = 0,
                        IdentityNumber = "200000000006",
                        IdentityImage = ["c7.jfif", "c2.jfif"],
                        YoutubeLink = null,
                        UserImage = "anh-den-ngau-011.jpg",
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
                        Phonenumber = "0911000006",
                        DateOfBirth = "12-1-2003",
                        Address = "162A, Thủ Dầu Một",
                        District = "Thủ Dầu Một",
                        City = "Bình Dương",
                        Gender = "FeMale",
                        Otp = null,
                        OtpExpiredTime = null,
                        IsVerified = true,
                        CoinBalance = 0,
                        IdentityNumber = "200000000007",
                        IdentityImage = ["c8.jfif", "c7.jfif"],
                        YoutubeLink = null,
                        UserImage = "anh-den-ngau-012.jpg",
                        NumberOfReport = 0,
                        Status = UserStatusEnum.Active,
                        RoleId = (int)RoleEnum.Parents,
                    },
                    new()
                    {
                        Fullname = "Lê Hoàng Huy",
                        Email = "nam6@gmail.com",
                        PasswordHash = passwordHash,
                        PasswordSalt = passwordSalt,
                        RefreshTokens = null,
                        Phonenumber = "0911000007",
                        DateOfBirth = "12-5-1991",
                        Address = "18A, Lý Thường Kiệt",
                        District = "Dĩ An",
                        City = "Bình Dương",
                        Gender = "FeMale",
                        Otp = null,
                        OtpExpiredTime = null,
                        IsVerified = true,
                        CoinBalance = 0,
                        IdentityNumber = "200000000008",
                        IdentityImage = ["c9.jfif", "c2.jfif"],
                        YoutubeLink = null,
                        UserImage = "anh-den-ngau-016.jpg",
                        NumberOfReport = 0,
                        Status = UserStatusEnum.Active,
                        RoleId = (int)RoleEnum.Parents,
                    },
                    new()
                    {
                        Fullname = "Lưu Triều Nam",
                        Email = "nammap@gmail.com",
                        PasswordHash = passwordHash,
                        PasswordSalt = passwordSalt,
                        RefreshTokens = null,
                        Phonenumber = "0911000008",
                        DateOfBirth = "2-6-2001",
                        Address = "188A, Lý Thường Kiệt",
                        District = "Dĩ An",
                        City = "Bình Dương",
                        Gender = "FeMale",
                        Otp = null,
                        OtpExpiredTime = null,
                        IsVerified = true,
                        CoinBalance = 0,
                        IdentityNumber = "200000000009",
                        IdentityImage = ["c1.jfif", "c3.jfif"],
                        YoutubeLink = null,
                        UserImage = "anh-den-ngau-001.jpg",
                        NumberOfReport = 0,
                        Status = UserStatusEnum.Active,
                        RoleId = (int)RoleEnum.Parents,
                    },
                    new()
                    {
                        Fullname = "Lưu Triều Nam",
                        Email = "nammap@gmail.com",
                        PasswordHash = passwordHash,
                        PasswordSalt = passwordSalt,
                        RefreshTokens = null,
                        Phonenumber = "0911000009",
                        DateOfBirth = "3-4-2000",
                        Address = "188A, Lý Thường Kiệt",
                        District = "Dĩ An",
                        City = "Bình Dương",
                        Gender = "FeMale",
                        Otp = null,
                        OtpExpiredTime = null,
                        IsVerified = true,
                        CoinBalance = 0,
                        IdentityNumber = "200000000010",
                        IdentityImage = ["c9.jfif", "c4.jfif"],
                        YoutubeLink = null,
                        UserImage = "anh-den-ngau-012.jpg",
                        NumberOfReport = 0,
                        Status = UserStatusEnum.Active,
                        RoleId = (int)RoleEnum.Parents,
                    },
                    new()
                    {
                        Fullname = "Nguyễn Đăng Khoa",
                        Email = "nam5@gmail.com",
                        PasswordHash = passwordHash,
                        PasswordSalt = passwordSalt,
                        RefreshTokens = null,
                        Phonenumber = "0911000010",
                        DateOfBirth = "12-1-2001",
                        Address = "162A, Thủ Dầu Một",
                        District = "Thủ Dầu Một",
                        City = "Bình Dương",
                        Gender = "FeMale",
                        Otp = null,
                        OtpExpiredTime = null,
                        IsVerified = true,
                        CoinBalance = 0,
                        IdentityNumber = "200000000011",
                        IdentityImage = ["c6.jfif", "c5.jfif"],
                        YoutubeLink = null,
                        UserImage = "anh-den-ngau-016.jpg",
                        NumberOfReport = 0,
                        Status = UserStatusEnum.Active,
                        RoleId = (int)RoleEnum.Tutor,
                    },
                    new()
                    {
                        Fullname = "Nguyễn Vũ Sơn",
                        Email = "nam4@gmail.com",
                        PasswordHash = passwordHash,
                        PasswordSalt = passwordSalt,
                        RefreshTokens = null,
                        Phonenumber = "0911000011",
                        DateOfBirth = "01-09-2000",
                        Address = "162A, Thủ Dầu Một",
                        District = "Thủ Dầu Một",
                        City = "Bình Dương",
                        Gender = "FeMale",
                        Otp = null,
                        OtpExpiredTime = null,
                        IsVerified = true,
                        CoinBalance = 0,
                        IdentityNumber = "200000000012",
                        IdentityImage = ["c1.jfif", "c6.jfif"],
                        YoutubeLink = null,
                        UserImage = "anh-den-ngau-011.jpg",
                        NumberOfReport = 0,
                        Status = UserStatusEnum.Active,
                        RoleId = (int)RoleEnum.Tutor,
                    },
                    new()
                    {
                        Fullname = "Nguyễn Huy Nam",
                        Email = "nam3@gmail.com",
                        PasswordHash = passwordHash,
                        PasswordSalt = passwordSalt,
                        RefreshTokens = null,
                        Phonenumber = "0911000012",
                        DateOfBirth = "12-10-2004",
                        Address = "162A, Thủ Dầu Một",
                        District = "Thủ Dầu Một",
                        City = "Bình Dương",
                        Gender = "FeMale",
                        Otp = null,
                        OtpExpiredTime = null,
                        IsVerified = true,
                        CoinBalance = 0,
                        IdentityNumber = "200000000013",
                        IdentityImage = ["c4.jfif", "c7.jfif"],
                        YoutubeLink = null,
                        UserImage = "anh-den-ngau-002.jpg",
                        NumberOfReport = 0,
                        Status = UserStatusEnum.Active,
                        RoleId = (int)RoleEnum.Tutor,
                    },
                    new()
                    {
                        Fullname = "Nguyễn Phương Huy",
                        Email = "nam2@gmail.com",
                        PasswordHash = passwordHash,
                        PasswordSalt = passwordSalt,
                        RefreshTokens = null,
                        Phonenumber = "0911000013",
                        DateOfBirth = "12-1-1999",
                        Address = "162A, Thủ Dầu Một",
                        District = "Thủ Dầu Một",
                        City = "Bình Dương",
                        Gender = "FeMale",
                        Otp = null,
                        OtpExpiredTime = null,
                        IsVerified = true,
                        CoinBalance = 0,
                        IdentityNumber = "200000000014",
                        IdentityImage = ["c1.jfif", "c8.jfif"],
                        YoutubeLink = null,
                        UserImage = "anh-den-ngau.jpg",
                        NumberOfReport = 0,
                        Status = UserStatusEnum.Active,
                        RoleId = (int)RoleEnum.Tutor,
                    },
                    new()
                    {
                        Fullname = "Nguyễn Phương Huy",
                        Email = "nam7@gmail.com",
                        PasswordHash = passwordHash,
                        PasswordSalt = passwordSalt,
                        RefreshTokens = null,
                        Phonenumber = "0911000014",
                        DateOfBirth = "4-3-1999",
                        Address = "162A, Thủ Dầu Một",
                        District = "Thủ Dầu Một",
                        City = "Bình Dương",
                        Gender = "FeMale",
                        Otp = null,
                        OtpExpiredTime = null,
                        IsVerified = true,
                        CoinBalance = 0,
                        IdentityNumber = "200000000015",
                        IdentityImage = ["c1.jfif", "c9.jfif"],
                        YoutubeLink = null,
                        UserImage = "anh-den-ngau-005.jpg",
                        NumberOfReport = 0,
                        Status = UserStatusEnum.Active,
                        RoleId = (int)RoleEnum.Tutor,
                    },
                    new()
                    {
                        Fullname = "Nguyễn Phương Huy",
                        Email = "nam8@gmail.com",
                        PasswordHash = passwordHash,
                        PasswordSalt = passwordSalt,
                        RefreshTokens = null,
                        Phonenumber = "0911000015",
                        DateOfBirth = "6-3-2001",
                        Address = "162A, Thủ Dầu Một",
                        District = "Thủ Dầu Một",
                        City = "Bình Dương",
                        Gender = "FeMale",
                        Otp = null,
                        OtpExpiredTime = null,
                        IsVerified = true,
                        CoinBalance = 0,
                        IdentityNumber = "200000000016",
                        IdentityImage = ["c3.jfif", "c4.jfif"],
                        YoutubeLink = null,
                        UserImage = "anh-den-ngau-006.jpg",
                        NumberOfReport = 0,
                        Status = UserStatusEnum.Active,
                        RoleId = (int)RoleEnum.Tutor,
                    },
                    new()
                    {
                        Fullname = "Nguyễn Phương Huy",
                        Email = "nam9@gmail.com",
                        PasswordHash = passwordHash,
                        PasswordSalt = passwordSalt,
                        RefreshTokens = null,
                        Phonenumber = "0911000016",
                        DateOfBirth = "7-1-1999",
                        Address = "162A, Thủ Dầu Một",
                        District = "Thủ Dầu Một",
                        City = "Bình Dương",
                        Gender = "FeMale",
                        Otp = null,
                        OtpExpiredTime = null,
                        IsVerified = true,
                        CoinBalance = 0,
                        IdentityNumber = "200000000017",
                        IdentityImage = ["c3.jfif", "c5.jfif"],
                        YoutubeLink = null,
                        UserImage = "anh-den-ngau-016.jpg",
                        NumberOfReport = 0,
                        Status = UserStatusEnum.Active,
                        RoleId = (int)RoleEnum.Tutor,
                    },
                    new()
                    {
                        Fullname = "Nguyễn Phương Huy",
                        Email = "nam10@gmail.com",
                        PasswordHash = passwordHash,
                        PasswordSalt = passwordSalt,
                        RefreshTokens = null,
                        Phonenumber = "0911000017",
                        DateOfBirth = "20-5-1989",
                        Address = "162A, Thủ Dầu Một",
                        District = "Thủ Dầu Một",
                        City = "Bình Dương",
                        Gender = "FeMale",
                        Otp = null,
                        OtpExpiredTime = null,
                        IsVerified = true,
                        CoinBalance = 0,
                        IdentityNumber = "200000000018",
                        IdentityImage = ["c3.jfif", "c6.jfif"],
                        YoutubeLink = null,
                        UserImage = "anh-den-ngau.jpg",
                        NumberOfReport = 0,
                        Status = UserStatusEnum.Active,
                        RoleId = (int)RoleEnum.Tutor,
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
