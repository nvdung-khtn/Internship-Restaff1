using System;
using System.Collections.Generic;
using System.Text;

namespace eCommerce.Application.Notification
{
    public interface IEmailSender
    {
        void SendEmail(string from, string to, string subject, string content);
    }
}
