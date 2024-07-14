namespace Common.DTO.Statistic
{
    public class TopUserDTO
    {
        public int UserId { get; set; }
        public string FullName { get; set; } = null!;
        public string Image { get; set; } = null!;
        public double RatingTopTutor { get; set; }
    }
}
