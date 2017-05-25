"use strict";
var nodemailer = require('nodemailer');
// create reusable transporter object using the default SMTP transport
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'georgianTest@gmail.com',
        pass: 'georgianTest1'
    }
});
var MailService = (function () {
    function MailService() {
    }
    MailService.prototype.sendMail = function () {
        console.log("SENDING MAIL");
        // setup email data with unicode symbols
        var mailOptions = {
            from: '"Fred Foo 👻" <foo@blurdybloop.com>',
            to: 'georgianTest@gmail.com',
            subject: 'Hello ✔',
            text: 'Hello world ?',
            html: '<b>Hello world ?</b>' // html body
        };
        // send mail with defined transport object
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                return console.log(error);
            }
            console.log('Message %s sent: %s', info.messageId, info.response);
        });
    };
    return MailService;
}());
Object.seal(MailService);
module.exports = MailService;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NlcnZlci9zcmMvc2VydmljZXMvbWFpbC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxJQUFNLFVBQVUsR0FBRyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUM7QUFDekMsc0VBQXNFO0FBQ3RFLElBQUksV0FBVyxHQUFHLFVBQVUsQ0FBQyxlQUFlLENBQUM7SUFDekMsT0FBTyxFQUFFLE9BQU87SUFDaEIsSUFBSSxFQUFFO1FBQ0YsSUFBSSxFQUFFLHdCQUF3QjtRQUM5QixJQUFJLEVBQUUsZUFBZTtLQUN4QjtDQUNKLENBQUMsQ0FBQztBQUVIO0lBQUE7SUFvQkEsQ0FBQztJQW5CQyw4QkFBUSxHQUFSO1FBQ0UsT0FBTyxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUM1Qix3Q0FBd0M7UUFDeEMsSUFBSSxXQUFXLEdBQUc7WUFDZCxJQUFJLEVBQUUscUNBQXFDO1lBQzNDLEVBQUUsRUFBRSx3QkFBd0I7WUFDNUIsT0FBTyxFQUFFLFNBQVM7WUFDbEIsSUFBSSxFQUFFLGVBQWU7WUFDckIsSUFBSSxFQUFFLHNCQUFzQixDQUFDLFlBQVk7U0FDNUMsQ0FBQztRQUVGLDBDQUEwQztRQUMxQyxXQUFXLENBQUMsUUFBUSxDQUFDLFdBQVcsRUFBRSxVQUFDLEtBQUssRUFBRSxJQUFJO1lBQzFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQ1IsTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDOUIsQ0FBQztZQUNELE9BQU8sQ0FBQyxHQUFHLENBQUMscUJBQXFCLEVBQUUsSUFBSSxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDdEUsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBQ0gsa0JBQUM7QUFBRCxDQXBCQSxBQW9CQyxJQUFBO0FBQ0QsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztBQUN6QixpQkFBUyxXQUFXLENBQUMiLCJmaWxlIjoic2VydmljZXMvbWFpbC5zZXJ2aWNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3Qgbm9kZW1haWxlciA9IHJlcXVpcmUoJ25vZGVtYWlsZXInKTtcclxuLy8gY3JlYXRlIHJldXNhYmxlIHRyYW5zcG9ydGVyIG9iamVjdCB1c2luZyB0aGUgZGVmYXVsdCBTTVRQIHRyYW5zcG9ydFxyXG5sZXQgdHJhbnNwb3J0ZXIgPSBub2RlbWFpbGVyLmNyZWF0ZVRyYW5zcG9ydCh7XHJcbiAgICBzZXJ2aWNlOiAnZ21haWwnLFxyXG4gICAgYXV0aDoge1xyXG4gICAgICAgIHVzZXI6ICdnZW9yZ2lhblRlc3RAZ21haWwuY29tJyxcclxuICAgICAgICBwYXNzOiAnZ2VvcmdpYW5UZXN0MSdcclxuICAgIH1cclxufSk7XHJcblxyXG5jbGFzcyBNYWlsU2VydmljZSB7XHJcbiAgc2VuZE1haWwoKSB7XHJcbiAgICBjb25zb2xlLmxvZyhcIlNFTkRJTkcgTUFJTFwiKTtcclxuICAgIC8vIHNldHVwIGVtYWlsIGRhdGEgd2l0aCB1bmljb2RlIHN5bWJvbHNcclxuICAgIGxldCBtYWlsT3B0aW9ucyA9IHtcclxuICAgICAgICBmcm9tOiAnXCJGcmVkIEZvbyDwn5G7XCIgPGZvb0BibHVyZHlibG9vcC5jb20+JywgLy8gc2VuZGVyIGFkZHJlc3NcclxuICAgICAgICB0bzogJ2dlb3JnaWFuVGVzdEBnbWFpbC5jb20nLCAvLyBsaXN0IG9mIHJlY2VpdmVyc1xyXG4gICAgICAgIHN1YmplY3Q6ICdIZWxsbyDinJQnLCAvLyBTdWJqZWN0IGxpbmVcclxuICAgICAgICB0ZXh0OiAnSGVsbG8gd29ybGQgPycsIC8vIHBsYWluIHRleHQgYm9keVxyXG4gICAgICAgIGh0bWw6ICc8Yj5IZWxsbyB3b3JsZCA/PC9iPicgLy8gaHRtbCBib2R5XHJcbiAgICB9O1xyXG5cclxuICAgIC8vIHNlbmQgbWFpbCB3aXRoIGRlZmluZWQgdHJhbnNwb3J0IG9iamVjdFxyXG4gICAgdHJhbnNwb3J0ZXIuc2VuZE1haWwobWFpbE9wdGlvbnMsIChlcnJvciwgaW5mbykgPT4ge1xyXG4gICAgICAgIGlmIChlcnJvcikge1xyXG4gICAgICAgICAgICByZXR1cm4gY29uc29sZS5sb2coZXJyb3IpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zb2xlLmxvZygnTWVzc2FnZSAlcyBzZW50OiAlcycsIGluZm8ubWVzc2FnZUlkLCBpbmZvLnJlc3BvbnNlKTtcclxuICAgIH0pO1xyXG4gIH1cclxufVxyXG5PYmplY3Quc2VhbChNYWlsU2VydmljZSk7XHJcbmV4cG9ydCA9IE1haWxTZXJ2aWNlO1xyXG4iXX0=
