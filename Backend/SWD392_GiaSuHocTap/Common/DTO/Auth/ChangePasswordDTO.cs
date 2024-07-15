using System.ComponentModel.DataAnnotations;

namespace Common.DTO.Auth
{
    public class ChangePasswordDTO
    {
        [Required]
        public string Password { get; set; } = null!;
    }
}
