﻿using Common.DTO.Email;
using DAO.Model;
using Microsoft.Extensions.Configuration;
using Service.IService;
using System.Net;
using System.Net.Mail;

namespace Service.Service
{
    public class EmailService: IEmailService
    {
        private readonly IConfiguration _configuration;
        private readonly Random random = new Random();
        public EmailService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public OtpCodeDTO GenerateOTP()
        {
            int otpCode = random.Next(100000, 1000000);
            var otpDto = new OtpCodeDTO
            {
                OTPCode = otpCode.ToString(),
                ExpiredTime = DateTime.Now.AddMinutes(15),
            };
            return otpDto;
        }

        public void SendInfomationParentsEmail(string userEmail, string subject, User info)
        {
            var sendEmail = _configuration.GetSection("SendEmailAccount")["Email"];
            var toEmail = userEmail;
            var htmlBody = EmailTemplate.ParentInfoTemplate(userEmail, subject, info.Email, info.Fullname, info.Phonenumber);
            MailMessage mailMessage = new MailMessage(sendEmail, toEmail, subject, htmlBody);
            mailMessage.IsBodyHtml = true;

            var smtpServer = _configuration.GetSection("SendEmailAccount")["SmtpServer"];
            int.TryParse(_configuration.GetSection("SendEmailAccount")["Port"], out int port);
            var userNameEmail = _configuration.GetSection("SendEmailAccount")["UserName"];
            var password = _configuration.GetSection("SendEmailAccount")["Password"];

            SmtpClient client = new SmtpClient(smtpServer, port);
            client.UseDefaultCredentials = false;
            client.Credentials = new NetworkCredential(userNameEmail, password);
            client.EnableSsl = true; // Enable SSL/TLS encryption

            client.Send(mailMessage);
        }

        public void SendOTPEmail(string userEmail, string otpCode, string subject)
        {
            try
            {
                var sendEmail = _configuration.GetSection("SendEmailAccount")["Email"];
                var toEmail = userEmail;
                var htmlBody = EmailTemplate.OTPEmailTemplate(userEmail, otpCode, subject);
                MailMessage mailMessage = new MailMessage(sendEmail, toEmail, subject, htmlBody);
                mailMessage.IsBodyHtml = true;

                var smtpServer = _configuration.GetSection("SendEmailAccount")["SmtpServer"];
                int.TryParse(_configuration.GetSection("SendEmailAccount")["Port"], out int port);
                var userNameEmail = _configuration.GetSection("SendEmailAccount")["UserName"];
                var password = _configuration.GetSection("SendEmailAccount")["Password"];

                SmtpClient client = new SmtpClient(smtpServer, port);
                client.UseDefaultCredentials = false;
                client.Credentials = new NetworkCredential(userNameEmail, password);
                client.EnableSsl = true; // Enable SSL/TLS encryption

                client.Send(mailMessage);
            } catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
            }
            
        }

        public void SendRejectEmail(string userEmail, string subject, string reason)
        {
            var sendEmail = _configuration.GetSection("SendEmailAccount")["Email"];
            var toEmail = userEmail;
            var htmlBody = EmailTemplate.RejectEmailTemplate(userEmail, subject, reason);
            MailMessage mailMessage = new MailMessage(sendEmail, toEmail, subject, htmlBody);
            mailMessage.IsBodyHtml = true;

            var smtpServer = _configuration.GetSection("SendEmailAccount")["SmtpServer"];
            int.TryParse(_configuration.GetSection("SendEmailAccount")["Port"], out int port);
            var userNameEmail = _configuration.GetSection("SendEmailAccount")["UserName"];
            var password = _configuration.GetSection("SendEmailAccount")["Password"];

            SmtpClient client = new SmtpClient(smtpServer, port);
            client.UseDefaultCredentials = false;
            client.Credentials = new NetworkCredential(userNameEmail, password);
            client.EnableSsl = true; // Enable SSL/TLS encryption

            client.Send(mailMessage);
        }

        public void SendWelcomeEmail(string userEmail, string subject)
        {
            var sendEmail = _configuration.GetSection("SendEmailAccount")["Email"];
            var toEmail = userEmail;
            var htmlBody = EmailTemplate.WelcomeEmailTemplate(userEmail, subject);
            MailMessage mailMessage = new MailMessage(sendEmail, toEmail, subject, htmlBody);
            mailMessage.IsBodyHtml = true;

            var smtpServer = _configuration.GetSection("SendEmailAccount")["SmtpServer"];
            int.TryParse(_configuration.GetSection("SendEmailAccount")["Port"], out int port);
            var userNameEmail = _configuration.GetSection("SendEmailAccount")["UserName"];
            var password = _configuration.GetSection("SendEmailAccount")["Password"];

            SmtpClient client = new SmtpClient(smtpServer, port);
            client.UseDefaultCredentials = false;
            client.Credentials = new NetworkCredential(userNameEmail, password);
            client.EnableSsl = true; // Enable SSL/TLS encryption

            client.Send(mailMessage);
        }

        public void SendInfomationModeratorEmail(string userEmail, string subject, User info)
        {
            var sendEmail = _configuration.GetSection("SendEmailAccount")["Email"];
            var toEmail = userEmail;
            var htmlBody = EmailTemplate.ModeratorInfoTemplate(userEmail, subject, info.Email, info.Fullname, info.Phonenumber);
            MailMessage mailMessage = new MailMessage(sendEmail, toEmail, subject, htmlBody);
            mailMessage.IsBodyHtml = true;

            var smtpServer = _configuration.GetSection("SendEmailAccount")["SmtpServer"];
            int.TryParse(_configuration.GetSection("SendEmailAccount")["Port"], out int port);
            var userNameEmail = _configuration.GetSection("SendEmailAccount")["UserName"];
            var password = _configuration.GetSection("SendEmailAccount")["Password"];

            SmtpClient client = new SmtpClient(smtpServer, port);
            client.UseDefaultCredentials = false;
            client.Credentials = new NetworkCredential(userNameEmail, password);
            client.EnableSsl = true; // Enable SSL/TLS encryption

            client.Send(mailMessage);
        }
    }
}
