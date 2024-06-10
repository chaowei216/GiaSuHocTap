using DAO.Model;
using Microsoft.IdentityModel.Tokens;
using Service.IService;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace Service.Service
{
    public class ValidateHandleService : IValidateHandleService
    {
        public bool CheckEmailAlreadyExists(string email, List<User> userList)
        {
            var check = !(userList.Any(user => user.Email == email));
            return check;
        }

        public bool CheckFormatEmail(string email)
        {
            var check = true;
            string pattern = @"^[a-zA-Z0-9_.+-]+@gmail\.com$";
            if (!Regex.IsMatch(email, pattern))
            {
                check = false;
                return check;
            }
            return check;
        }

        public bool CheckFormatFullName(string fullName)
        {
            var check = true;
            if (fullName.Length > 30)
            {
                check = false;
                return check;
            }
            return check;
        }

        public bool CheckFormatPassword(string password)
        {
            var check = true;
            Regex specialCharRegex = new Regex("[^a-zA-Z0-9]");
            if (password.Length < 8 || password.Length > 20 ||
                password.Contains(' ') ||
                !specialCharRegex.IsMatch(password))
            {
                check = false;
                return check;
            }
            return check;
        }

        public bool CheckFormatPhoneNumber(string phoneNumber)
        {
            var check = true;
            string pattern = @"^0\d{9}$";
            if (!Regex.IsMatch(phoneNumber, pattern))
            {
                check = false;
                return check;
            }
            return check;
        }

        public bool CheckNull(string field)
        {
            var check = true;
            if (field.IsNullOrEmpty())
            {
                check = false;
                return check;
            }
            return check;
        }

        public bool CheckPhoneNumberAlreadyExists(string phoneNumber, List<User> userList)
        {
            var check = !(userList.Any(user => user.Phonenumber == phoneNumber));
            return check;
        }
    }
}
