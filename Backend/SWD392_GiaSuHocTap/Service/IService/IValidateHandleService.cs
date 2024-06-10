using DAO.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.IService
{
    public interface IValidateHandleService
    {
        bool CheckNull(string field);
        bool CheckFormatFullName(string fullName);
        bool CheckFormatPassword(string password);
        bool CheckFormatEmail(string email);
        bool CheckFormatPhoneNumber(string phoneNumber);

        bool CheckEmailAlreadyExists(string email, List<User> userList);

        bool CheckPhoneNumberAlreadyExists(string phoneNumber, List<User> userList);
    }
}
