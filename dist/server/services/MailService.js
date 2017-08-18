"use strict";
var nodemailer = require('nodemailer');
// create reusable transporter object using the default SMTP transport
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'test2017531@gmail.com',
        pass: 'gc200282965'
    }
});
var MailService = (function () {
    function MailService() {
    }
    MailService.prototype.welcomeMessage = function (client) {
        // setup email data with unicode symbols
        var mailOptions = {
            from: '"Georgian Academic & Career Prep"',
            to: client.email,
            subject: 'Welcome, ' + client.firstName,
            text: '',
            html: 'Youre username is <b>' + client.username + '</b> and your password is your birthday in the following format: ddmmyyyy<br /> Please login and complete the required forms. <br /><br /> Thankyou' // html body
        };
        // send mail with defined transport object
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                return console.log(error);
            }
            else {
                return console.log('Welcome Message %s sent: %s', info.messageId, info.response);
            }
        });
    };
    MailService.prototype.scheduledMessage = function (mailOptions) {
        // send mail with defined transport object
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                return console.log(error);
            }
            else {
                return console.log('Scheduled Message %s sent: %s', info.messageId, info.response);
            }
        });
    };
    return MailService;
}());
module.exports = MailService;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NlcnZlci9zcmMvc2VydmljZXMvTWFpbFNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLElBQU0sVUFBVSxHQUFHLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQztBQUV6QyxzRUFBc0U7QUFDdEUsSUFBSSxXQUFXLEdBQUcsVUFBVSxDQUFDLGVBQWUsQ0FBQztJQUMzQyxPQUFPLEVBQUUsT0FBTztJQUNoQixJQUFJLEVBQUU7UUFDSixJQUFJLEVBQUUsdUJBQXVCO1FBQzdCLElBQUksRUFBRSxhQUFhO0tBQ3BCO0NBQ0YsQ0FBQyxDQUFDO0FBRUg7SUFBQTtJQWlDQSxDQUFDO0lBL0JELG9DQUFjLEdBQWQsVUFBZSxNQUFNO1FBQ25CLHdDQUF3QztRQUN4QyxJQUFJLFdBQVcsR0FBRztZQUNoQixJQUFJLEVBQUUsbUNBQW1DO1lBQ3pDLEVBQUUsRUFBRSxNQUFNLENBQUMsS0FBSztZQUNoQixPQUFPLEVBQUUsV0FBVyxHQUFHLE1BQU0sQ0FBQyxTQUFTO1lBQ3ZDLElBQUksRUFBRSxFQUFFO1lBQ1IsSUFBSSxFQUFFLHVCQUF1QixHQUFHLE1BQU0sQ0FBQyxRQUFRLEdBQUcscUpBQXFKLENBQUMsWUFBWTtTQUNyTixDQUFDO1FBRUYsMENBQTBDO1FBQzFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFFLFVBQUMsS0FBSyxFQUFFLElBQUk7WUFDNUMsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztnQkFDVixNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUM1QixDQUFDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ04sTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsNkJBQTZCLEVBQUUsSUFBSSxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDbkYsQ0FBQztRQUNILENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELHNDQUFnQixHQUFoQixVQUFpQixXQUFXO1FBQzFCLDBDQUEwQztRQUMxQyxXQUFXLENBQUMsUUFBUSxDQUFDLFdBQVcsRUFBRSxVQUFDLEtBQUssRUFBRSxJQUFJO1lBQzVDLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQ1YsTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDNUIsQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNOLE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLCtCQUErQixFQUFFLElBQUksQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ3JGLENBQUM7UUFDSCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCxrQkFBQztBQUFELENBakNBLEFBaUNDLElBQUE7QUFDRCxpQkFBUyxXQUFXLENBQUMiLCJmaWxlIjoic2VydmljZXMvTWFpbFNlcnZpY2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBub2RlbWFpbGVyID0gcmVxdWlyZSgnbm9kZW1haWxlcicpO1xyXG5cclxuLy8gY3JlYXRlIHJldXNhYmxlIHRyYW5zcG9ydGVyIG9iamVjdCB1c2luZyB0aGUgZGVmYXVsdCBTTVRQIHRyYW5zcG9ydFxyXG5sZXQgdHJhbnNwb3J0ZXIgPSBub2RlbWFpbGVyLmNyZWF0ZVRyYW5zcG9ydCh7XHJcbiAgc2VydmljZTogJ2dtYWlsJyxcclxuICBhdXRoOiB7XHJcbiAgICB1c2VyOiAndGVzdDIwMTc1MzFAZ21haWwuY29tJyxcclxuICAgIHBhc3M6ICdnYzIwMDI4Mjk2NSdcclxuICB9XHJcbn0pO1xyXG5cclxuY2xhc3MgTWFpbFNlcnZpY2Uge1xyXG5cclxud2VsY29tZU1lc3NhZ2UoY2xpZW50KTogdm9pZCB7XHJcbiAgLy8gc2V0dXAgZW1haWwgZGF0YSB3aXRoIHVuaWNvZGUgc3ltYm9sc1xyXG4gIGxldCBtYWlsT3B0aW9ucyA9IHtcclxuICAgIGZyb206ICdcIkdlb3JnaWFuIEFjYWRlbWljICYgQ2FyZWVyIFByZXBcIicsIC8vIHNlbmRlciBhZGRyZXNzXHJcbiAgICB0bzogY2xpZW50LmVtYWlsLCAvLyBsaXN0IG9mIHJlY2VpdmVyc1xyXG4gICAgc3ViamVjdDogJ1dlbGNvbWUsICcgKyBjbGllbnQuZmlyc3ROYW1lLCAvLyBTdWJqZWN0IGxpbmVcclxuICAgIHRleHQ6ICcnLCAvLyBwbGFpbiB0ZXh0IGJvZHlcclxuICAgIGh0bWw6ICdZb3VyZSB1c2VybmFtZSBpcyA8Yj4nICsgY2xpZW50LnVzZXJuYW1lICsgJzwvYj4gYW5kIHlvdXIgcGFzc3dvcmQgaXMgeW91ciBiaXJ0aGRheSBpbiB0aGUgZm9sbG93aW5nIGZvcm1hdDogZGRtbXl5eXk8YnIgLz4gUGxlYXNlIGxvZ2luIGFuZCBjb21wbGV0ZSB0aGUgcmVxdWlyZWQgZm9ybXMuIDxiciAvPjxiciAvPiBUaGFua3lvdScgLy8gaHRtbCBib2R5XHJcbiAgfTtcclxuXHJcbiAgLy8gc2VuZCBtYWlsIHdpdGggZGVmaW5lZCB0cmFuc3BvcnQgb2JqZWN0XHJcbiAgdHJhbnNwb3J0ZXIuc2VuZE1haWwobWFpbE9wdGlvbnMsIChlcnJvciwgaW5mbykgPT4ge1xyXG4gICAgaWYgKGVycm9yKSB7XHJcbiAgICAgIHJldHVybiBjb25zb2xlLmxvZyhlcnJvcik7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gY29uc29sZS5sb2coJ1dlbGNvbWUgTWVzc2FnZSAlcyBzZW50OiAlcycsIGluZm8ubWVzc2FnZUlkLCBpbmZvLnJlc3BvbnNlKTtcclxuICAgIH1cclxuICB9KTtcclxufVxyXG5cclxuc2NoZWR1bGVkTWVzc2FnZShtYWlsT3B0aW9ucyk6IHZvaWQge1xyXG4gIC8vIHNlbmQgbWFpbCB3aXRoIGRlZmluZWQgdHJhbnNwb3J0IG9iamVjdFxyXG4gIHRyYW5zcG9ydGVyLnNlbmRNYWlsKG1haWxPcHRpb25zLCAoZXJyb3IsIGluZm8pID0+IHtcclxuICAgIGlmIChlcnJvcikge1xyXG4gICAgICByZXR1cm4gY29uc29sZS5sb2coZXJyb3IpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuIGNvbnNvbGUubG9nKCdTY2hlZHVsZWQgTWVzc2FnZSAlcyBzZW50OiAlcycsIGluZm8ubWVzc2FnZUlkLCBpbmZvLnJlc3BvbnNlKTtcclxuICAgIH1cclxuICB9KTtcclxufVxyXG5cclxufVxyXG5leHBvcnQgPSBNYWlsU2VydmljZTtcclxuIl19
