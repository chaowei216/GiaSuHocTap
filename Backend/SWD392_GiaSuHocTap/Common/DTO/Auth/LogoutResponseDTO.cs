namespace Common.DTO.Auth
{
    public class LogoutResponseDTO
    {
        public bool isSuccess { get; set; } = false;
        public string Message { get; set; } = null!;
    }
}
