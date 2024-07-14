using Common.DTO.Class;
using Common.DTO.Course;

namespace Common.DTO.User
{
    public class TopTutorInfoDTO
    {
        public int UserId { get; set; }
        public string FullName { get; set; } = null!;
        public string UserImage { get; set; } = null!;
        public double AverageRating { get; set; }
        public ICollection<UserClassDTO> UserClasses { get; set; } = null!;
        public ICollection<UserCourseDTO> UserCourses { get; set; } = null!;
    }
}
