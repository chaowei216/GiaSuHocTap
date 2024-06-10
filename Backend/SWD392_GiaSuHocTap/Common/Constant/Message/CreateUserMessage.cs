using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common.Constant.Message
{
    public static class CreateUserMessage
    {
        public const string CreateSuccess = "Create success";

        public const string NullUserName = "Please input username";

        public const string WrongFormatUserName = "Username must have at least 3 characters, at most 30 characters and not contain space";

        public const string UserNameAlreadyExists = "UserName already exists";

        public const string NullFullName = "Please input Full Name";

        public const string WrongFormatFullName = "The format of Full Name is incorrect";

        public const string NullPassword = "Please input password";

        public const string NullToken = "Please input token";

        public const string WrongFormatPassword = "Password must have at least 8 characters, at most 20 characters, at least 1 special character and not contain space";

        public const string WrongConfirmPassword = "Confirm password is not valid";

        public const string UserNotFound = "User not match in the system";

        public const string NullPhoneNumber = "Please input phone number";

        public const string WrongFormatPhoneNumber = "The format of phone number is incorrect";

        public const string PhoneNumberAlreadyExists = "Phone number already exists";

        public const string EmailAlreadyExists = "Email already exists";

        public const string NullEmail = "Please input email";

        public const string WrongFormatEmail = "The format of email is incorrect";

        public const string NullBirthday = "Please input birthday";

        public const string WrongFormatBirthday = "The format of birthday is incorrect";

        public const string NullGender = "Please select gender";

        public const string NullAddress = "Please input address";

        public const string WrongFormatAddress = "The format of address is incorrect";

        public const string NullDistrict = "Please select district";

        public const string NullCity = "Please select city";

        public const string CheckSuccess = "Check validate success";
    }
}
