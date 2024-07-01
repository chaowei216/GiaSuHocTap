using Common.DTO.TimeTable;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion.Internal;

namespace Common.DTO.User
{
    public class UpdateTutorDTO
    {
        public int TutorId { get; set; }
        public List<int> Subjects { get; set; } = null!;
        public List<int> Classes { get; set; } = null!;
        public bool IsOfflineTeaching { get; set; } = false;
        public string YoutubeLink { get; set; } = null!;
        public List<List<string>> DayOfWeekOnline { get; set; } = null!;
        public List<List<string>>? DayOfWeekOffline { get; set; }
    }
}
