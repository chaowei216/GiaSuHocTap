using Common.DTO.Timetable;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion.Internal;

namespace Common.DTO.User
{
    public class UpdateTutorDTO
    {
        public int TutorId { get; set; }
        public List<int> Courses { get; set; } = null!;
        public List<int> Classes { get; set; } = null!;
        public bool IsOfflineTeaching { get; set; } = false;
        public string YoutubeLink { get; set; } = null!;
        public List<TimetableDTO> OnlineTime { get; set; } = null!;
        public List<TimetableDTO>? OfflineTime { get; set; }
    }
}
