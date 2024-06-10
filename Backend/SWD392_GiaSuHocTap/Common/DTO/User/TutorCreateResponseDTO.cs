using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common.DTO.User
{
    public class TutorCreateResponseDTO
    {
        public TutorCreateRequestDTO? Request { get; set; } = null!;
        public bool IsSuccess { get; set; }
    }
}
