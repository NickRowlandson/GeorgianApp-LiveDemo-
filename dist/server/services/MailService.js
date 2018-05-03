"use strict";
var nodemailer = require('nodemailer');
var config = require('../config');
// create reusable transporter object using the default SMTP transport
var transporter = nodemailer.createTransport({
    service: config.mail.service,
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NlcnZlci9zcmMvc2VydmljZXMvTWFpbFNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLElBQU0sVUFBVSxHQUFHLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQztBQUN6QyxJQUFJLE1BQU0sR0FBRyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUM7QUFFbEMsc0VBQXNFO0FBQ3RFLElBQUksV0FBVyxHQUFHLFVBQVUsQ0FBQyxlQUFlLENBQUM7SUFDM0MsT0FBTyxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTztJQUM1QixJQUFJLEVBQUU7UUFDSixJQUFJLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJO1FBQ3RCLElBQUksRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXO0tBQ25DO0NBQ0YsQ0FBQyxDQUFDO0FBRUg7SUFBQTtJQW1CQSxDQUFDO0lBakJELGlDQUFXLEdBQVgsVUFBWSxLQUFLLEVBQUUsV0FBVztRQUM1QixJQUFJLE9BQU8sR0FBRyxLQUFLLENBQUM7UUFFcEIsMENBQTBDO1FBQzFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFFLFVBQUMsS0FBSyxFQUFFLElBQUk7WUFDNUMsSUFBSSxLQUFLLEVBQUU7Z0JBQ1QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDbkIsT0FBTyxHQUFHLEtBQUssQ0FBQzthQUNqQjtpQkFBTTtnQkFDTCxPQUFPLENBQUMsR0FBRyxDQUFDLGdCQUFnQixFQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFDbkUsT0FBTyxHQUFHLElBQUksQ0FBQzthQUNoQjtRQUNILENBQUMsQ0FBQyxDQUFDO1FBRUgsT0FBTyxPQUFPLENBQUM7SUFDakIsQ0FBQztJQUVELGtCQUFDO0FBQUQsQ0FuQkEsQUFtQkMsSUFBQTtBQUNELGlCQUFTLFdBQVcsQ0FBQyIsImZpbGUiOiJzZXJ2aWNlcy9NYWlsU2VydmljZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IG5vZGVtYWlsZXIgPSByZXF1aXJlKCdub2RlbWFpbGVyJyk7XHJcbnZhciBjb25maWcgPSByZXF1aXJlKCcuLi9jb25maWcnKTtcclxuXHJcbi8vIGNyZWF0ZSByZXVzYWJsZSB0cmFuc3BvcnRlciBvYmplY3QgdXNpbmcgdGhlIGRlZmF1bHQgU01UUCB0cmFuc3BvcnRcclxubGV0IHRyYW5zcG9ydGVyID0gbm9kZW1haWxlci5jcmVhdGVUcmFuc3BvcnQoe1xyXG4gIHNlcnZpY2U6IGNvbmZpZy5tYWlsLnNlcnZpY2UsXHJcbiAgYXV0aDoge1xyXG4gICAgdXNlcjogY29uZmlnLm1haWwudXNlciwgLy9lbWFpbFxyXG4gICAgcGFzczogY29uZmlnLm1haWwucGFzcyAvLyBwYXNzd29yZFxyXG4gIH1cclxufSk7XHJcblxyXG5jbGFzcyBNYWlsU2VydmljZSB7XHJcblxyXG5zZW5kTWVzc2FnZSh0aXRsZSwgbWFpbE9wdGlvbnMpOiBib29sZWFuIHtcclxuICBsZXQgc3VjY2VzcyA9IGZhbHNlO1xyXG5cclxuICAvLyBzZW5kIG1haWwgd2l0aCBkZWZpbmVkIHRyYW5zcG9ydCBvYmplY3RcclxuICB0cmFuc3BvcnRlci5zZW5kTWFpbChtYWlsT3B0aW9ucywgKGVycm9yLCBpbmZvKSA9PiB7XHJcbiAgICBpZiAoZXJyb3IpIHtcclxuICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xyXG4gICAgICBzdWNjZXNzID0gZmFsc2U7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zb2xlLmxvZygnJXMgJXMgc2VudDogJXMnLHRpdGxlLCBpbmZvLm1lc3NhZ2VJZCwgaW5mby5yZXNwb25zZSk7XHJcbiAgICAgIHN1Y2Nlc3MgPSB0cnVlO1xyXG4gICAgfVxyXG4gIH0pO1xyXG5cclxuICByZXR1cm4gc3VjY2VzcztcclxufVxyXG5cclxufVxyXG5leHBvcnQgPSBNYWlsU2VydmljZTtcclxuIl19
