using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common.DTO.Auth
{
    public class RejectTutorDTO
    {
        [EmailAddress]
        public string Email { get; set; } = string.Empty;
        public string Reason { get; set; } = string.Empty;
    }
}
