using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common.DTO.Email
{
    public static class EmailTemplate
    {
        public const string logoUrl = "https://th.bing.com/th/id/OIP.kIhqHrBdGP_opgoX-u7_jQHaFP?rs=1&pid=ImgDetMain";
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
                <p>OTP code of your InnerCode E-Commerce account is </p>
            </div>
            <div class=""OTPCode"">
                <h1>{OTP_CODE}</h1>
            </div>
            <div class=""notice"">
                <p>Expires in 15 minutes. <span class=""do-not""> DO NOT share this code with others, including InnerCode E-Commerce employees.</span>
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
            <p>We are delighted to welcome you to InnerShop! We appreciate your interest and trust in our service.</p>
            <p>InnerShop is more than just a shopping platform; it's a vibrant community where you can discover the
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
            <p>Once again, welcome to InnerShop! We hope you have exciting and satisfying experiences here.</p>
        </div>
        <p>Best regards,</p>
        <p>The InnerShop Team</p>
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

    }
}

