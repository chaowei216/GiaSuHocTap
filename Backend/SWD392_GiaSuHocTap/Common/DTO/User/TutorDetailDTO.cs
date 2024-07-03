using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common.DTO.User
{
    public class TutorDetailDTO
    {
        public string Job { get; set; } = null!;
        public string Major { get; set; } = null!;
        public List<string> CertificateImage { get; set; } = null!;
    }
}
