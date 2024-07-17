namespace Common.DTO.Email
{
    public static class EmailTemplate
    {
        public const string logoUrl = "https://giasusuphamdangkhoa.com/mediaroot/media/userfiles/useruploads/311/image/side/21327083555_f6b61e2e5c_o.png";
        public static string OTPEmailTemplate(string userEmail, string otpCode, string subject)
        {
            string htmlTemplate = @"<head>    
        <meta content=""text/html; charset=utf-8"" http-equiv=""Content-Type"">
        <title>
            {TITLE}
        </title>
        <style type=""text/css"">
            html {
                background-color: #FFF;
            }
            body {
                font-size: 120%;
                background-color: wheat;
                border-radius: 5px;
            }
            .logo {
                text-align: center;
                padding: 2% 0;
            }
            .logo img {
                width: 40%;
                height: 35%;
            }
            .title {
                padding: 2% 5%;
                text-align: center; 
                background-color: #FFF; 
                border-radius: 5px 5px 0 0;
            }
            .OTPCode {
                color: darkorange; 
                text-align: center;
            }
            .notice {
                padding: 2% 5%;
                text-align: center;
                background-color: #FFF;
            }
            .footer {
                padding: 2% 5%;
                text-align: center; 
                font-size: 80%; 
                opacity: 0.8; 
            }
            .do-not {
                color: red;
            }
        </style>
    </head>
    <body>
            <div class=""logo"">
                <img src=""{LOGO_URL}""/>
            </div>
            <div class=""title"">
                <p>Hello {USER_NAME}</p>
                <p>OTP code of your GiaSuHocTap account is </p>
            </div>
            <div class=""OTPCode"">
                <h1>{OTP_CODE}</h1>
            </div>
            <div class=""notice"">
                <p>Expires in 15 minutes. <span class=""do-not""> DO NOT share this code with others, including GiaSuHocTap employees.</span>
                </p>
            </div>
            <div class=""footer"">
                <p>This is an automatic email. Please do not reply to this email.</p>
                <p>17th Floor LandMark 81, 208 Nguyen Huu Canh Street, Binh Thanh District, Ho Chi Minh 700000, Vietnam</p>
            </div>
    </body>
</html>
";
            htmlTemplate = htmlTemplate.Replace("{OTP_CODE}", otpCode)
                .Replace("{USER_NAME}", userEmail)
                .Replace("{LOGO_URL}", logoUrl)
                .Replace("{TITLE}", subject);

            return htmlTemplate;
        }

        public static string WelcomeEmailTemplate(string userEmail, string subject)
        {
            string htmlTemplate = @"<head>
    <meta content=""text/html; charset=utf-8"" http-equiv=""Content-Type"">
    <title>
        {TITLE}
    </title>
    <style type=""text/css"">
        html {
            background-color: #FFF;
        }

        body {
            font-size: 120%;
            background-color: wheat;
            border-radius: 5px;
        }

        .logo {
            text-align: center;
            padding: 2% 0;
        }

        .logo img {
            width: 40%;
            height: 35%;
        }

        .content {
            padding: 2% 5%;
            background-color: #FFF;
            border-radius: 5px 5px 0 0;
        }

        .welcome-text {
            padding-bottom: 1%;
        }

        .features {
            padding-bottom: 1%;
        }

        .feature-header {
            font-weight: bold;
        }
        
        .end-text {
            padding-bottom: 1%;
        }

        .footer {
            padding: 2% 5%;
            text-align: center;
            font-size: 80%;
            opacity: 0.8;
        }
    </style>
</head>

<body>
    <div class=""logo"">
        <img src=""{LOGO_URL}"" />
    </div>
    <div class=""content"">
        <div class=""welcome-text"">
            <p>Hello {USER_NAME}</p>
            <p>We are delighted to welcome you to GiaSuHocTap! We appreciate your interest and trust in our service.</p>
            <p>GiaSuHocTap is more than just a shopping platform; it's a vibrant community where you can discover the
                latest
                products, access exciting offers, and enjoy exceptional customer service.</p>
        </div>
        <div class=""features"">
            <p>Here are some key features you can explore:</p>
            <p><span class=""feature-header"">Effortless Shopping:</span>Browse and shop from a diverse range of products
                across multiple categories.</p>
            <p><span class=""feature-header"">Exclusive Deals:</span>Browse and shop from a diverse range of products
                across multiple categories.</p>
            <p><span class=""feature-header"">Fast Delivery:</span>Browse and shop from a diverse range of products across
                multiple categories.</p>
            <p><span class=""feature-header"">Customer Support:</span>We are always here to assist you through various
                communication channels, from email to online chat.</p>
        </div>

        <div class=""end-text"">
            <p>Feel free to explore our app and reach out if you have any questions or concerns. We're here to help you have
                the best shopping experience possible.</p>
            <p>Once again, welcome to GiaSuHocTap! We hope you have exciting and satisfying experiences here.</p>
        </div>
        <p>Best regards,</p>
        <p>The GiaSuHocTap Team</p>
        </p>
    </div>
    <div class=""footer"">
        <p>This is an automatic email. Please do not reply to this email.</p>
        <p>17th Floor LandMark 81, 208 Nguyen Huu Canh Street, Binh Thanh District, Ho Chi Minh 700000, Vietnam</p>
    </div>
</body>

</html>";
            htmlTemplate = htmlTemplate
                .Replace("{USER_NAME}", userEmail)
                .Replace("{LOGO_URL}", logoUrl)
                .Replace("{TITLE}", subject);

            return htmlTemplate;
        }
        public static string RejectEmailTemplate(string userEmail, string subject, string reason)
        {
            string htmlTemplate = @"<head>
    <meta content=""text/html; charset=utf-8"" http-equiv=""Content-Type"">
    <title>
        {TITLE}
    </title>
    <style type=""text/css"">
        html {
            background-color: #FFF;
        }

        body {
            font-size: 120%;
            background-color: wheat;
            border-radius: 5px;
        }

        .logo {
            text-align: center;
            padding: 2% 0;
        }

        .logo img {
            width: 40%;
            height: 35%;
        }

        .content {
            padding: 2% 5%;
            background-color: #FFF;
            border-radius: 5px 5px 0 0;
        }

        .welcome-text {
            padding-bottom: 1%;
        }

        .features {
            padding-bottom: 1%;
        }

        .feature-header {
            font-weight: bold;
        }
        
        .end-text {
            padding-bottom: 1%;
        }

        .footer {
            padding: 2% 5%;
            text-align: center;
            font-size: 80%;
            opacity: 0.8;
        }
    </style>
</head>

<body>
    <div class=""logo"">
        <img src=""{LOGO_URL}"" />
    </div>
    <div class=""content"">
        <div class=""welcome-text"">
            <p>Hello {USER_NAME}</p>
            <p>We are sorry that you have rejected from our website. {REASON}</p>
            
        </div>
        <div class=""features"">
            <p>Here are some key features you can explore:</p>
            <p><span class=""feature-header"">Effortless Shopping:</span>Teaching and helping you the subject that you have problem in school.</p>
            <p><span class=""feature-header"">Exclusive Deals:</span>Learning and teaching the subject that you have problem in school.</p>
            <p><span class=""feature-header"">Fast Delivery:</span>Learning and teaching the subject that you have problem in school..</p>
            <p><span class=""feature-header"">Customer Support:</span>We are always here to assist you through various
                communication channels, from email to online chat.</p>
        </div>

        <div class=""end-text"">
            <p>Please check your register again. Maybe some fields are incorrect.</p>
            <p>Once again, we are sorry about that! We hope you have exciting and satisfying day.</p>
        </div>
        <p>Best regards,</p>
        <p>The GiaSuHocTap Team</p>
        </p>
    </div>
    <div class=""footer"">
        <p>This is an automatic email. Please do not reply to this email.</p>
        <p>17th Floor LandMark 81, 208 Nguyen Huu Canh Street, Binh Thanh District, Ho Chi Minh 700000, Vietnam</p>
    </div>
</body>

</html>";
            htmlTemplate = htmlTemplate
                .Replace("{USER_NAME}", userEmail)
                .Replace("{LOGO_URL}", logoUrl)
                .Replace("{TITLE}", subject)
                .Replace("{REASON}", reason);

            return htmlTemplate;
        }

        public static string ParentInfoTemplate(string userEmail, string subject, string email, string name, string phone)
        {
            string htmlTemplate = @"<head>
    <meta content=""text/html; charset=utf-8"" http-equiv=""Content-Type"">
    <title>
        {TITLE}
    </title>
    <style type=""text/css"">
        html {
            background-color: #FFF;
        }

        body {
            font-size: 120%;
            background-color: wheat;
            border-radius: 5px;
        }

        .logo {
            text-align: center;
            padding: 2% 0;
        }

        .logo img {
            width: 40%;
            height: 35%;
        }

        .content {
            padding: 2% 5%;
            background-color: #FFF;
            border-radius: 5px 5px 0 0;
        }

        .welcome-text {
            padding-bottom: 1%;
        }

        .features {
            padding-bottom: 1%;
        }

        .feature-header {
            font-weight: bold;
        }
        
        .end-text {
            padding-bottom: 1%;
        }

        .footer {
            padding: 2% 5%;
            text-align: center;
            font-size: 80%;
            opacity: 0.8;
        }
    </style>
</head>

<body>
    <div class=""logo"">
        <img src=""{LOGO_URL}"" />
    </div>
    <div class=""content"">
        <div class=""welcome-text"">
            <p>Hello {USER_NAME}</p>
            <p>You have just had a new invitation for offline teaching from {PARENTS_NAME}</p>
            
        </div>
        <div class=""features"">
            <p>Here are some information about parents for you to contact:</p>
            <p><span class=""feature-header"">Email:</span> {PARENTS_EMAIL}.</p>
            <p><span class=""feature-header"">Name:</span> {PARENTS_NAME}.</p>
            <p><span class=""feature-header"">Phone Number:</span> {PARENTS_PHONE}.</p>
        </div>

        <div class=""end-text"">
            <p>Please contact with parents as soon as possible for teaching.</p>
            <p>We hope you have exciting and satisfying day.</p>
        </div>
        <p>Best regards,</p>
        <p>The GiaSuHocTap Team</p>
        </p>
    </div>
    <div class=""footer"">
        <p>This is an automatic email. Please do not reply to this email.</p>
        <p>17th Floor LandMark 81, 208 Nguyen Huu Canh Street, Binh Thanh District, Ho Chi Minh 700000, Vietnam</p>
    </div>
</body>

</html>";

            htmlTemplate = htmlTemplate
                .Replace("{USER_NAME}", userEmail)
                .Replace("{PARENTS_NAME}", name)
                .Replace("{LOGO_URL}", logoUrl)
                .Replace("{TITLE}", subject)
                .Replace("{PARENTS_EMAIL}", email)
                .Replace("{PARENTS_PHONE}", phone);

            return htmlTemplate;
        }

        public static string ModeratorInfoTemplate(string userEmail, string subject, string email, string name, string phone)
        {
            string htmlTemplate = @"<head>
    <meta content=""text/html; charset=utf-8"" http-equiv=""Content-Type"">
    <title>
        {TITLE}
    </title>
    <style type=""text/css"">
        html {
            background-color: #FFF;
        }

        body {
            font-size: 120%;
            background-color: wheat;
            border-radius: 5px;
        }

        .logo {
            text-align: center;
            padding: 2% 0;
        }

        .logo img {
            width: 40%;
            height: 35%;
        }

        .content {
            padding: 2% 5%;
            background-color: #FFF;
            border-radius: 5px 5px 0 0;
        }

        .welcome-text {
            padding-bottom: 1%;
        }

        .features {
            padding-bottom: 1%;
        }

        .feature-header {
            font-weight: bold;
        }
        
        .end-text {
            padding-bottom: 1%;
        }

        .footer {
            padding: 2% 5%;
            text-align: center;
            font-size: 80%;
            opacity: 0.8;
        }
    </style>
</head>

<body>
    <div class=""logo"">
        <img src=""{LOGO_URL}"" />
    </div>
    <div class=""content"">
        <div class=""welcome-text"">
            <p>Welcome {USER_NAME}</p>
            <p>We are pleased to inform you that your account has been added to our GiaSuHocTap website.</p>
            
        </div>
        <div class=""features"">
            <p>This is your account information:</p>
            <p><span class=""feature-header"">Email: {PARENTS_EMAIL}.</span> </p>
            <p><span class=""feature-header"">Name: {PARENTS_NAME}.</span> </p>
            <p><span class=""feature-header"">Password: 12345Aa@</span></p>
        </div>

        <div class=""end-text"">
            <p>Please login soon to check all information. Contact with us as soon as possible for fixing information if it has problem.</p>
            <p>We hope you have exciting and satisfying day.</p>
        </div>
        <p>Best regards,</p>
        <p>The GiaSuHocTap Team</p>
        </p>
    </div>
    <div class=""footer"">
        <p>This is an automatic email. Please do not reply to this email.</p>
        <p>17th Floor LandMark 81, 208 Nguyen Huu Canh Street, Binh Thanh District, Ho Chi Minh 700000, Vietnam</p>
    </div>
</body>

</html>";

            htmlTemplate = htmlTemplate
                .Replace("{USER_NAME}", userEmail)
                .Replace("{PARENTS_NAME}", name)
                .Replace("{LOGO_URL}", logoUrl)
                .Replace("{TITLE}", subject)
                .Replace("{PARENTS_EMAIL}", email)
                .Replace("{PARENTS_PHONE}", phone);

            return htmlTemplate;
        }
    }
}


