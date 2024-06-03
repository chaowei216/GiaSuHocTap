namespace DAO.Model
{
    public class UserCourse
    {
        public int CourseId { get; set; }
        public int UserId { get; set; }
        public Course Course { get; set; } = null!;
        public User User { get; set; } = null!;

    }
}
