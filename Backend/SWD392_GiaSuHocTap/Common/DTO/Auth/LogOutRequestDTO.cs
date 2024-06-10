using System.ComponentModel.DataAnnotations;

namespace Common.DTO.Auth
{
    public class LogOutRequestDTO
    {
        [Required]
        public string RefreshToken { get; set; } = null!;
    }
}
