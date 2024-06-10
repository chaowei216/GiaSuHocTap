using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAO.Model
{
    public class UserClass
    {
        public int UsertId { get; set; }
        public int ClassId { get; set; }
        public User User { get; set; } = null!;
        public Class Class { get; set; } = null!;
    }
}
