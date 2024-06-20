namespace Common.DTO.Auth
{
    public class UserByTokenDTO
    {
        public UserDTO? User { get; set; }
        public string? Message { get; set; }
    }
}
