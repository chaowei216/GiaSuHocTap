namespace Common.DTO
{
    public class ResponseDTO
    {
        public int StatusCode { get; set; }
        public string Message { get; set; } = null!;
        public object? Data { get; set; }
    }
}
