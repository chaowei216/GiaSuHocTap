using System.ComponentModel.DataAnnotations;

namespace Common.DTO.Auth
{
    public class TokenRequestDTO
    {
        [Required]
        public string AccessToken { get; set; } = null!;

        [Required]
        public string RefreshToken { get; set; } = null!;
    }
}
