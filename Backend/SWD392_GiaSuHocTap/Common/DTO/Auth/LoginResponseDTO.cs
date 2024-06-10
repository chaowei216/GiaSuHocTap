namespace Common.DTO.Auth
{
    public class LoginResponseDTO
    {
        public UserDTO User { get; set; } = null!;
        public TokenResponseDTO? Token { get; set; } = null!;
    }
}
