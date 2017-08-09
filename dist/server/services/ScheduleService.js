var schedule = require('node-schedule');
var MailService = require("./MailService");
var sql = require('mssql');
var config = {
    user: 'NickRowlandson',
    password: 'georgianTest1',
    server: 'nr-comp2007.database.windows.net',
    database: 'GeorgianApp',
    options: {
        encrypt: true // Use this if you're on Windows Azure
    }
};
//runs every night at 10pm
var attendanceCheck = schedule.scheduleJob('0 22 * * *', function () {
    var date = new Date();
    var str = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    console.log("Checking student attendance... " + str);
    var missedClasses;
    var student;
    try {
        sql.connect(config)
            .then(function (connection) {
            new sql.Request(connection)
                .query("SELECT * FROM Attendance ORDER BY date DESC")
                .then(function (attendanceResult) {
                new sql.Request(connection)
                    .query("SELECT * FROM Students")
                    .then(function (studentsResult) {
                    missedClasses = [];
                    for (var _i = 0, attendanceResult_1 = attendanceResult; _i < attendanceResult_1.length; _i++) {
                        var item = attendanceResult_1[_i];
                        var attendanceDate = new Date();
                        attendanceDate = item.date;
                        var formattedDate = attendanceDate.getDate();
                        if (item.attendanceValue === 'A' && formattedDate === date.getDate()) {
                            missedClasses.push(item);
                        }
                    }
                    if (missedClasses) {
                        var _loop_1 = function (item) {
                            student = studentsResult.filter(function (x) { return x.userID === item.userID; });
                            var mailOptions = {
                                from: '"Test" <ghost@test.com>',
                                to: student[0].email,
                                subject: 'SCHEDULER ✔',
                                text: '',
                                html: '<b> Hi ' + student[0].firstName + '!</b><br  />You have been absent from <insert class name here> for two or more classes in a row.' + item.date + '' // html body
                            };
                            //new MailService().scheduledMessage(mailOptions);
                        };
                        for (var _a = 0, missedClasses_1 = missedClasses; _a < missedClasses_1.length; _a++) {
                            var item = missedClasses_1[_a];
                            _loop_1(item);
                        }
                        var mailOptionsAdmin = {
                            from: '"Test" <ghost@test.com>',
                            to: 'nicholasrowlandson@gmail.com',
                            subject: 'SCHEDULER ✔',
                            text: '',
                            html: '<b> Hi admin!</b><br  />There were ' + missedClasses.length + ' emails sent out due to missed classes.' // html body
                        };
                        new MailService().scheduledMessage(mailOptionsAdmin);
                        console.log("TOTAL EMAILS SENT: " + missedClasses.length);
                    }
                    else {
                        console.log("No missed classes");
                    }
                }).catch(function (err) {
                    console.log("Get all attendance " + err);
                });
            }).catch(function (err) {
                console.log("Get all attendance " + err);
            });
        }).catch(function (err) {
            console.log(err);
        });
    }
    catch (err) {
        console.log(err);
    }
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NlcnZlci9zcmMvc2VydmljZXMvU2NoZWR1bGVTZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQU0sUUFBUSxHQUFHLE9BQU8sQ0FBQyxlQUFlLENBQUMsQ0FBQztBQUMxQyxJQUFNLFdBQVcsR0FBRyxPQUFPLENBQUMsZUFBZSxDQUFDLENBQUM7QUFDN0MsSUFBSSxHQUFHLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQzNCLElBQU0sTUFBTSxHQUFHO0lBQ1gsSUFBSSxFQUFFLGdCQUFnQjtJQUN0QixRQUFRLEVBQUUsZUFBZTtJQUN6QixNQUFNLEVBQUUsa0NBQWtDO0lBQzFDLFFBQVEsRUFBRSxhQUFhO0lBQ3ZCLE9BQU8sRUFBRTtRQUNMLE9BQU8sRUFBRSxJQUFJLENBQUMsc0NBQXNDO0tBQ3ZEO0NBQ0osQ0FBQTtBQUVELDBCQUEwQjtBQUMxQixJQUFJLGVBQWUsR0FBRyxRQUFRLENBQUMsV0FBVyxDQUFDLFlBQVksRUFBRTtJQUN2RCxJQUFJLElBQUksR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDO0lBQ3RCLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxXQUFXLEVBQUUsR0FBRyxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxPQUFPLEVBQUUsR0FBRyxHQUFHLEdBQUksSUFBSSxDQUFDLFFBQVEsRUFBRSxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsVUFBVSxFQUFFLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUMvSixPQUFPLENBQUMsR0FBRyxDQUFDLGlDQUFpQyxHQUFHLEdBQUcsQ0FBQyxDQUFDO0lBQ3JELElBQUksYUFBYSxDQUFDO0lBQ2xCLElBQUksT0FBTyxDQUFDO0lBRVosSUFBSSxDQUFDO1FBQ0gsR0FBRyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUM7YUFD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QUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxVQUFTLEdBQUc7WUFDakIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNyQixDQUFDLENBQUMsQ0FBQztJQUNULENBQUM7SUFDRCxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ1QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNyQixDQUFDO0FBRUgsQ0FBQyxDQUFDLENBQUMiLCJmaWxlIjoic2VydmljZXMvU2NoZWR1bGVTZXJ2aWNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3Qgc2NoZWR1bGUgPSByZXF1aXJlKCdub2RlLXNjaGVkdWxlJyk7XHJcbmNvbnN0IE1haWxTZXJ2aWNlID0gcmVxdWlyZShcIi4vTWFpbFNlcnZpY2VcIik7XHJcbnZhciBzcWwgPSByZXF1aXJlKCdtc3NxbCcpO1xyXG5jb25zdCBjb25maWcgPSB7XHJcbiAgICB1c2VyOiAnTmlja1Jvd2xhbmRzb24nLFxyXG4gICAgcGFzc3dvcmQ6ICdnZW9yZ2lhblRlc3QxJyxcclxuICAgIHNlcnZlcjogJ25yLWNvbXAyMDA3LmRhdGFiYXNlLndpbmRvd3MubmV0JywgLy8gWW91IGNhbiB1c2UgJ2xvY2FsaG9zdFxcXFxpbnN0YW5jZScgdG8gY29ubmVjdCB0byBuYW1lZCBpbnN0YW5jZVxyXG4gICAgZGF0YWJhc2U6ICdHZW9yZ2lhbkFwcCcsXHJcbiAgICBvcHRpb25zOiB7XHJcbiAgICAgICAgZW5jcnlwdDogdHJ1ZSAvLyBVc2UgdGhpcyBpZiB5b3UncmUgb24gV2luZG93cyBBenVyZVxyXG4gICAgfVxyXG59XG5cclxuLy9ydW5zIGV2ZXJ5IG5pZ2h0IGF0IDEwcG1cclxudmFyIGF0dGVuZGFuY2VDaGVjayA9IHNjaGVkdWxlLnNjaGVkdWxlSm9iKCcwIDIyICogKiAqJywgZnVuY3Rpb24oKXtcclxuICB2YXIgZGF0ZSA9IG5ldyBEYXRlKCk7XHJcbiAgdmFyIHN0ciA9IGRhdGUuZ2V0RnVsbFllYXIoKSArIFwiLVwiICsgKGRhdGUuZ2V0TW9udGgoKSArIDEpICsgXCItXCIgKyBkYXRlLmdldERhdGUoKSArIFwiIFwiICsgIGRhdGUuZ2V0SG91cnMoKSArIFwiOlwiICsgZGF0ZS5nZXRNaW51dGVzKCkgKyBcIjpcIiArIGRhdGUuZ2V0U2Vjb25kcygpO1xyXG4gIGNvbnNvbGUubG9nKFwiQ2hlY2tpbmcgc3R1ZGVudCBhdHRlbmRhbmNlLi4uIFwiICsgc3RyKTtcclxuICB2YXIgbWlzc2VkQ2xhc3NlcztcclxuICB2YXIgc3R1ZGVudDtcclxuXHJcbiAgdHJ5IHtcclxuICAgIHNxbC5jb25uZWN0KGNvbmZpZylcclxuICAgICAgICAudGhlbihmdW5jdGlvbihjb25uZWN0aW9uKSB7XHJcbiAgICAgICAgICAgIG5ldyBzcWwuUmVxdWVzdChjb25uZWN0aW9uKVxyXG4gICAgICAgICAgICAgICAgLnF1ZXJ5KFwiU0VMRUNUICogRlJPTSBBdHRlbmRhbmNlIE9SREVSIEJZIGRhdGUgREVTQ1wiKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24oYXR0ZW5kYW5jZVJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgICAgIG5ldyBzcWwuUmVxdWVzdChjb25uZWN0aW9uKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAucXVlcnkoXCJTRUxFQ1QgKiBGUk9NIFN0dWRlbnRzXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKHN0dWRlbnRzUmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgbWlzc2VkQ2xhc3NlcyA9IFtdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGl0ZW0gb2YgYXR0ZW5kYW5jZVJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGF0dGVuZGFuY2VEYXRlID0gbmV3IERhdGUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dGVuZGFuY2VEYXRlID0gaXRlbS5kYXRlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGZvcm1hdHRlZERhdGUgPSBhdHRlbmRhbmNlRGF0ZS5nZXREYXRlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbS5hdHRlbmRhbmNlVmFsdWUgPT09ICdBJyAmJiBmb3JtYXR0ZWREYXRlID09PSBkYXRlLmdldERhdGUoKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtaXNzZWRDbGFzc2VzLnB1c2goaXRlbSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChtaXNzZWRDbGFzc2VzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpdGVtIG9mIG1pc3NlZENsYXNzZXMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R1ZGVudCA9IHN0dWRlbnRzUmVzdWx0LmZpbHRlcih4ID0+IHgudXNlcklEID09PSBpdGVtLnVzZXJJRCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBtYWlsT3B0aW9ucyA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmcm9tOiAnXCJUZXN0XCIgPGdob3N0QHRlc3QuY29tPicsIC8vIHNlbmRlciBhZGRyZXNzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdG86IHN0dWRlbnRbMF0uZW1haWwsIC8vIGxpc3Qgb2YgcmVjZWl2ZXJzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3ViamVjdDogJ1NDSEVEVUxFUiDinJQnLCAvLyBTdWJqZWN0IGxpbmVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0OiAnJywgLy8gcGxhaW4gdGV4dCBib2R5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaHRtbDogJzxiPiBIaSAnICsgc3R1ZGVudFswXS5maXJzdE5hbWUgKyAnITwvYj48YnIgIC8+WW91IGhhdmUgYmVlbiBhYnNlbnQgZnJvbSA8aW5zZXJ0IGNsYXNzIG5hbWUgaGVyZT4gZm9yIHR3byBvciBtb3JlIGNsYXNzZXMgaW4gYSByb3cuJyArIGl0ZW0uZGF0ZSArICcnIC8vIGh0bWwgYm9keVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL25ldyBNYWlsU2VydmljZSgpLnNjaGVkdWxlZE1lc3NhZ2UobWFpbE9wdGlvbnMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG1haWxPcHRpb25zQWRtaW4gPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZyb206ICdcIlRlc3RcIiA8Z2hvc3RAdGVzdC5jb20+JywgLy8gc2VuZGVyIGFkZHJlc3NcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdG86ICduaWNob2xhc3Jvd2xhbmRzb25AZ21haWwuY29tJywgLy8gbGlzdCBvZiByZWNlaXZlcnNcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3ViamVjdDogJ1NDSEVEVUxFUiDinJQnLCAvLyBTdWJqZWN0IGxpbmVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dDogJycsIC8vIHBsYWluIHRleHQgYm9keVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBodG1sOiAnPGI+IEhpIGFkbWluITwvYj48YnIgIC8+VGhlcmUgd2VyZSAnICsgbWlzc2VkQ2xhc3Nlcy5sZW5ndGggKyAnIGVtYWlscyBzZW50IG91dCBkdWUgdG8gbWlzc2VkIGNsYXNzZXMuJyAvLyBodG1sIGJvZHlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXcgTWFpbFNlcnZpY2UoKS5zY2hlZHVsZWRNZXNzYWdlKG1haWxPcHRpb25zQWRtaW4pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJUT1RBTCBFTUFJTFMgU0VOVDogXCIgKyBtaXNzZWRDbGFzc2VzLmxlbmd0aCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiTm8gbWlzc2VkIGNsYXNzZXNcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbihlcnIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiR2V0IGFsbCBhdHRlbmRhbmNlIFwiICsgZXJyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbihlcnIpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkdldCBhbGwgYXR0ZW5kYW5jZSBcIiArIGVycik7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICB9KS5jYXRjaChmdW5jdGlvbihlcnIpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coZXJyKTtcclxuICAgICAgICB9KTtcclxuICB9XHJcbiAgY2F0Y2ggKGVycikge1xyXG4gICAgICBjb25zb2xlLmxvZyhlcnIpO1xyXG4gIH1cclxuXHJcbn0pO1xyXG4iXX0=
