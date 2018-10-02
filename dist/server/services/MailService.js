"use strict";
const nodemailer = require('nodemailer');
var config = require('../config');
// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
    service: config.mail.service,
    auth: {
        user: config.mail.user,
        pass: config.mail.pass // password
    }
});
class MailService {
    sendMessage(title, mailOptions) {
        let success = false;
        // send mail with defined transport object
        transporter.sendMail(mailOptions, (error, info) => {
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
    }
}
module.exports = MailService;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NlcnZlci9zcmMvc2VydmljZXMvTWFpbFNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE1BQU0sVUFBVSxHQUFHLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQztBQUN6QyxJQUFJLE1BQU0sR0FBRyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUM7QUFFbEMsc0VBQXNFO0FBQ3RFLElBQUksV0FBVyxHQUFHLFVBQVUsQ0FBQyxlQUFlLENBQUM7SUFDM0MsT0FBTyxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTztJQUM1QixJQUFJLEVBQUU7UUFDSixJQUFJLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJO1FBQ3RCLElBQUksRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXO0tBQ25DO0NBQ0YsQ0FBQyxDQUFDO0FBRUg7SUFFQSxXQUFXLENBQUMsS0FBSyxFQUFFLFdBQVc7UUFDNUIsSUFBSSxPQUFPLEdBQUcsS0FBSyxDQUFDO1FBRXBCLDBDQUEwQztRQUMxQyxXQUFXLENBQUMsUUFBUSxDQUFDLFdBQVcsRUFBRSxDQUFDLEtBQUssRUFBRSxJQUFJLEVBQUUsRUFBRTtZQUNoRCxJQUFJLEtBQUssRUFBRTtnQkFDVCxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUNuQixPQUFPLEdBQUcsS0FBSyxDQUFDO2FBQ2pCO2lCQUFNO2dCQUNMLE9BQU8sQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLEVBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUNuRSxPQUFPLEdBQUcsSUFBSSxDQUFDO2FBQ2hCO1FBQ0gsQ0FBQyxDQUFDLENBQUM7UUFFSCxPQUFPLE9BQU8sQ0FBQztJQUNqQixDQUFDO0NBRUE7QUFDRCxpQkFBUyxXQUFXLENBQUMiLCJmaWxlIjoic2VydmljZXMvTWFpbFNlcnZpY2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBub2RlbWFpbGVyID0gcmVxdWlyZSgnbm9kZW1haWxlcicpO1xyXG52YXIgY29uZmlnID0gcmVxdWlyZSgnLi4vY29uZmlnJyk7XHJcblxyXG4vLyBjcmVhdGUgcmV1c2FibGUgdHJhbnNwb3J0ZXIgb2JqZWN0IHVzaW5nIHRoZSBkZWZhdWx0IFNNVFAgdHJhbnNwb3J0XHJcbmxldCB0cmFuc3BvcnRlciA9IG5vZGVtYWlsZXIuY3JlYXRlVHJhbnNwb3J0KHtcclxuICBzZXJ2aWNlOiBjb25maWcubWFpbC5zZXJ2aWNlLFxyXG4gIGF1dGg6IHtcclxuICAgIHVzZXI6IGNvbmZpZy5tYWlsLnVzZXIsIC8vZW1haWxcclxuICAgIHBhc3M6IGNvbmZpZy5tYWlsLnBhc3MgLy8gcGFzc3dvcmRcclxuICB9XHJcbn0pO1xyXG5cclxuY2xhc3MgTWFpbFNlcnZpY2Uge1xyXG5cclxuc2VuZE1lc3NhZ2UodGl0bGUsIG1haWxPcHRpb25zKTogYm9vbGVhbiB7XHJcbiAgbGV0IHN1Y2Nlc3MgPSBmYWxzZTtcclxuXHJcbiAgLy8gc2VuZCBtYWlsIHdpdGggZGVmaW5lZCB0cmFuc3BvcnQgb2JqZWN0XHJcbiAgdHJhbnNwb3J0ZXIuc2VuZE1haWwobWFpbE9wdGlvbnMsIChlcnJvciwgaW5mbykgPT4ge1xyXG4gICAgaWYgKGVycm9yKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcclxuICAgICAgc3VjY2VzcyA9IGZhbHNlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uc29sZS5sb2coJyVzICVzIHNlbnQ6ICVzJyx0aXRsZSwgaW5mby5tZXNzYWdlSWQsIGluZm8ucmVzcG9uc2UpO1xyXG4gICAgICBzdWNjZXNzID0gdHJ1ZTtcclxuICAgIH1cclxuICB9KTtcclxuXHJcbiAgcmV0dXJuIHN1Y2Nlc3M7XHJcbn1cclxuXHJcbn1cclxuZXhwb3J0ID0gTWFpbFNlcnZpY2U7XHJcbiJdfQ==
