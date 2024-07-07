using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common.DTO.Feedback
{
    public class FeedbackCreateDTO
    {
        [Required]
        public string Description { get; set; } = null!;
        [Required]
        public int Rating { get; set; }
        public int FromId { get; set; }
        public int ToId { get; set; }
    }
}
