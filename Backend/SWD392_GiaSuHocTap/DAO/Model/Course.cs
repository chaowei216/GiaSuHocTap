using System.ComponentModel.DataAnnotations;

namespace DAO.Model
{
    public class Course
    {
        [Key]
        public int CourseId { get; set; }
        [Required]
        public string CourseName { get; set; } = null!;
        public string? Description { get; set; }
        public ICollection<UserCourse> UserCourses { get; set; } = null!;
        public ICollection<Request> Requests { get; set; } = null!;
    }
}
