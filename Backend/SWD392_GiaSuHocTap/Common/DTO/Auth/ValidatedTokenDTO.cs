namespace Common.DTO.Auth
{
    public class ValidatedTokenDTO
    {
        public bool IsValidated { get; set; } = false;
        public string? Message { get; set; }
    }
}
