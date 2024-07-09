using Common.DTO.TimeTable;

namespace Common.DTO.Request
{
    public class RequestTimeDTO
    {
        public RequestTimetableDTO TimeTable { get; set; } = null!;
        public string Status { get; set; } = null!;
    }
}
