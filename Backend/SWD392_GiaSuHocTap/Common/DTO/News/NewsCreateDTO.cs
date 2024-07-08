using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common.DTO.News
{
    public class NewsCreateDTO
    {
        [Required]
        public string Description { get; set; } = null!;
        [Required]
        public string Title { get; set; } = null!;
        public string Image { get; set; } = null!;
        [Required]
        public DateTime CreateDate { get; set; }
        public int UserId { get; set; }
    }
}
