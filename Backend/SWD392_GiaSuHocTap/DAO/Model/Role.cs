using Common.Enum;
using System.Collections.Specialized;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace DAO.Model
{
    public class Role
    {
        [Key]
        public int RoleId { get; set; }
        [Required]
        [Column(TypeName = "nvarchar(24)")]
        [JsonConverter(typeof(JsonStringEnumConverter))]
        public RoleEnum RoleName { get; set; }
        public ICollection<User> Users { get; set; } = null!;
    }
}
