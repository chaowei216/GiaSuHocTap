using System.ComponentModel.DataAnnotations;

namespace DAO.Model
{
    public class Class
    {
        [Key]
        public int ClassId { get; set; }
        [Required]
        public string ClassName { get; set; } = null!;
        public ICollection<UserClass> UserClasses { get; set; } = null!;
        public ICollection<Request> Requests { get; set; } = null!;
    }
}
