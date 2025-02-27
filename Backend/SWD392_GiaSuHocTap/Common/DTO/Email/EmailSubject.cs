﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common.DTO.Email
{
    public class EmailSubject
    {
        public const string VerifyEmailSubject = "GiaSuHocTap: OTP Code For Verifying Account";

        public const string ResetPassEmailSubject = "GiaSuHocTap: OTP Code For Reseting Password";

        public const string WelcomeEmailSubject = "GiaSuHocTap: Welcome to GiaSuHocTap";

        public const string RejectEmailSubject = "GiaSuHocTap: Tutor request rejected";

        public const string ParentsInfoSubject = "GiaSuHocTap: Parents Information";

        public const string ModeratorInfoSubject = "GiaSuHocTap: Moderator Information";
    }
}
