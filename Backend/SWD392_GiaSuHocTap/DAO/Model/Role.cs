using Common.Enum;
using System.ComponentModel.DataAnnotations;

namespace DAO.Model
{
    public class Role
    {
        [Key]
        public int RoleId { get; set; }
        [Required]
        public RoleEnum RoleName { get; set; }
        public ICollection<User> Users { get; set; } = null!;
    }
}
