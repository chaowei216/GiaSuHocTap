using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common.DTO.User
{
    public class ParentCreateResponseDTO
    {
        public ParentCreateRequestDTO? Request { get; set; }
        public bool IsSuccess { get; set; }
    }
}
