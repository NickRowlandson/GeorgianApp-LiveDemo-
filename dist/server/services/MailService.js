"use strict";
var nodemailer = require('nodemailer');
var config = require('../config');
// create reusable transporter object using the default SMTP transport
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: config.mail.user,
        pass: config.mail.pass // password
    }
});
var MailService = /** @class */ (function () {
    function MailService() {
    }
    MailService.prototype.sendMessage = function (title, mailOptions) {
        var success = false;
        // send mail with defined transport object
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
                success = false;
            }
            else {
                console.log('%s %s sent: %s', title, info.messageId, info.response);
                success = true;
            }
        });
        return success;
    };
    return MailService;
}());
module.exports = MailService;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NlcnZlci9zcmMvc2VydmljZXMvTWFpbFNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLElBQU0sVUFBVSxHQUFHLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQztBQUN6QyxJQUFJLE1BQU0sR0FBRyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUM7QUFHbEMsc0VBQXNFO0FBQ3RFLElBQUksV0FBVyxHQUFHLFVBQVUsQ0FBQyxlQUFlLENBQUM7SUFDM0MsT0FBTyxFQUFFLE9BQU87SUFDaEIsSUFBSSxFQUFFO1FBQ0osSUFBSSxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSTtRQUN0QixJQUFJLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVztLQUNuQztDQUNGLENBQUMsQ0FBQztBQUVIO0lBQUE7SUFtQkEsQ0FBQztJQWpCRCxpQ0FBVyxHQUFYLFVBQVksS0FBSyxFQUFFLFdBQVc7UUFDNUIsSUFBSSxPQUFPLEdBQUcsS0FBSyxDQUFDO1FBRXBCLDBDQUEwQztRQUMxQyxXQUFXLENBQUMsUUFBUSxDQUFDLFdBQVcsRUFBRSxVQUFDLEtBQUssRUFBRSxJQUFJO1lBQzVDLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQ1YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDbkIsT0FBTyxHQUFHLEtBQUssQ0FBQztZQUNsQixDQUFDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ04sT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsRUFBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7Z0JBQ25FLE9BQU8sR0FBRyxJQUFJLENBQUM7WUFDakIsQ0FBQztRQUNILENBQUMsQ0FBQyxDQUFDO1FBRUgsTUFBTSxDQUFDLE9BQU8sQ0FBQztJQUNqQixDQUFDO0lBRUQsa0JBQUM7QUFBRCxDQW5CQSxBQW1CQyxJQUFBO0FBQ0QsaUJBQVMsV0FBVyxDQUFDIiwiZmlsZSI6InNlcnZpY2VzL01haWxTZXJ2aWNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3Qgbm9kZW1haWxlciA9IHJlcXVpcmUoJ25vZGVtYWlsZXInKTtcclxudmFyIGNvbmZpZyA9IHJlcXVpcmUoJy4uL2NvbmZpZycpO1xyXG5cclxuXHJcbi8vIGNyZWF0ZSByZXVzYWJsZSB0cmFuc3BvcnRlciBvYmplY3QgdXNpbmcgdGhlIGRlZmF1bHQgU01UUCB0cmFuc3BvcnRcclxubGV0IHRyYW5zcG9ydGVyID0gbm9kZW1haWxlci5jcmVhdGVUcmFuc3BvcnQoe1xyXG4gIHNlcnZpY2U6ICdnbWFpbCcsXHJcbiAgYXV0aDoge1xyXG4gICAgdXNlcjogY29uZmlnLm1haWwudXNlciwgLy9lbWFpbFxyXG4gICAgcGFzczogY29uZmlnLm1haWwucGFzcyAvLyBwYXNzd29yZFxyXG4gIH1cclxufSk7XHJcblxyXG5jbGFzcyBNYWlsU2VydmljZSB7XHJcblxyXG5zZW5kTWVzc2FnZSh0aXRsZSwgbWFpbE9wdGlvbnMpOiBib29sZWFuIHtcclxuICBsZXQgc3VjY2VzcyA9IGZhbHNlO1xyXG5cclxuICAvLyBzZW5kIG1haWwgd2l0aCBkZWZpbmVkIHRyYW5zcG9ydCBvYmplY3RcclxuICB0cmFuc3BvcnRlci5zZW5kTWFpbChtYWlsT3B0aW9ucywgKGVycm9yLCBpbmZvKSA9PiB7XHJcbiAgICBpZiAoZXJyb3IpIHtcclxuICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xyXG4gICAgICBzdWNjZXNzID0gZmFsc2U7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zb2xlLmxvZygnJXMgJXMgc2VudDogJXMnLHRpdGxlLCBpbmZvLm1lc3NhZ2VJZCwgaW5mby5yZXNwb25zZSk7XHJcbiAgICAgIHN1Y2Nlc3MgPSB0cnVlO1xyXG4gICAgfVxyXG4gIH0pO1xyXG5cclxuICByZXR1cm4gc3VjY2VzcztcclxufVxyXG5cclxufVxyXG5leHBvcnQgPSBNYWlsU2VydmljZTtcclxuIl19
