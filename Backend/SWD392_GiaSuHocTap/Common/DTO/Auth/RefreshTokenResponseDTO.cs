namespace Common.DTO.Auth
{
    public class RefreshTokenResponseDTO
    {
        public TokenResponseDTO? Token { get; set; }
        public string Message { get; set; } = null!;
    }
}
