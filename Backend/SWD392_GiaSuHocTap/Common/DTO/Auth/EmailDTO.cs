using System.ComponentModel.DataAnnotations;

namespace Common.DTO.Auth
{
    public class EmailDTO
    {
        [EmailAddress]
        public string Email { get; set; } = string.Empty;
    }
}
