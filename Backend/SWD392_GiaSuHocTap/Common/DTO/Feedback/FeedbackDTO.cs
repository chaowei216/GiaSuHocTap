using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common.DTO.Feedback
{
    public class FeedbackDTO
    {
        public int FeedbackId { get; set; }
        [Required]
        public string Description { get; set; } = null!;
        [Required]
        public int Rating { get; set; }
        public string FromName { get; set; } = null!;
        public string ToName { get; set; } = null!;
    }
}
