using Common.Enum;
using DAO.DAO;
using DAO.Model;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace DAO.Data
{

    public class DataSeed
    {
        private readonly DataContext _context;

        public DataSeed(DataContext context)
        {
            _context = context;
        }

        public void TrySeed()
        {
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

                _context.Classes.AddRange(classes);
                _context.Courses.AddRange(courses);
                _context.Roles.AddRange(userRoles);

                _context.SaveChanges();
            }
        }
    }
}
