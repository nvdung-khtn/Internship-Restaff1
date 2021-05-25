using eCommerce.Application.Notification;
using MailKit.Net.Smtp;
using MailKit.Security;
using MimeKit;
using MimeKit.Text;
using System;

namespace eCommerce.Notification
{
    public class GmailEmailSender : IEmailSender
    {
        public void SendEmail(string from, string to, string subject, string content)
        {
            
                var email = new MimeMessage();
                email.From.Add(MailboxAddress.Parse(from));
                email.To.Add(MailboxAddress.Parse(to));
                email.Subject = subject;
                email.Body = new TextPart(TextFormat.Html) { Text = content };

                // send email
                using var smtp = new SmtpClient();
                smtp.Connect("smtp.gmail.com", 587, SecureSocketOptions.StartTls);
                smtp.Authenticate("edommerce.intern2021@gmail.com", "intern2021");
                smtp.Send(email);
                smtp.Disconnect(true);
                
            

        }

    }
}
