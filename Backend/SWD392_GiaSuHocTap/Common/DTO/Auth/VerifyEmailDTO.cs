using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common.DTO.Auth
{
    public class VerifyEmailDTO
    {
        public string OtpCode { get; set; } = string.Empty;

        [EmailAddress]
        public string Email { get; set; } = string.Empty;
    }
}
