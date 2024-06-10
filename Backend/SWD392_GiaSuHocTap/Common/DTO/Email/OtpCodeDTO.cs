using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common.DTO.Email
{
    public class OtpCodeDTO
    {
        public string OTPCode { get; set; } = null!;
        public DateTime ExpiredTime { get; set; }
    }
}
