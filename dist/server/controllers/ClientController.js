"use strict";
var bcrypt = require("bcrypt");
var AuthController = require("../controllers/AuthController");
var sql = require('mssql');
var auth = ["Admin", "Staff"];
var nodemailer = require('nodemailer');
var schedule = require('node-schedule');
// create reusable transporter object using the default SMTP transport
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'test2017531@gmail.com',
        pass: 'gc200282965'
    }
});
// var j = schedule.scheduleJob([{minute: 1}], function(){
//   let mailOptions = {
//     from: '"Test Ghost 👻" <ghost@test.com>', // sender address
//     to: 'chaodyz@gmail.com', // list of receivers
//     subject: 'SCHEDULER ✔', // Subject line
//     text: 'Sending every hour...', // plain text body
//     html: '<b>Hello world ?</b>' // html body
//   };
//
//   // send mail with defined transport object
//   transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//       return console.log(error);
//     } else {
//       return console.log('Message %s sent: %s', info.messageId, info.response);
//     }
//   });
// });
var ClientController = (function () {
    function ClientController() {
    }
    ClientController.prototype.create = function (req, res) {
        try {
            new AuthController().authUser(req, res, {
                requiredAuth: auth, done: function () {
                    var salt = bcrypt.genSaltSync(10);
                    var password = req.body.client.password;
                    // Hash the password with the salt
                    password = bcrypt.hashSync(password, salt);
                    req.body.client.password = password;
                    var client = req.body.client;
                    var suitabilityForm = req.body.suitabilityForm;
                    sql.connect("mssql://NickRowlandson:georgianTest1@nr-comp2007.database.windows.net/GeorgianApp?encrypt=true").then(function () {
                        new sql.Request().query("INSERT INTO Users VALUES ('" + client.username + "','" + client.password + "','Client')").then(function () {
                            new sql.Request().query("SELECT userID FROM Users WHERE username = '" + client.username + "' AND password = '" + client.password + "'").then(function (id) {
                                var clientQuery = "'" + id[0].userID + "', '" +
                                    client.firstName + "', '" +
                                    client.lastName + "', '" +
                                    client.email + "', '" +
                                    client.inquiryDate + "', '" +
                                    client.birthday + "', '" +
                                    client.phone + "', '" +
                                    1 + "'";
                                // setup email data with unicode symbols
                                var mailOptions = {
                                    from: '"Georgian Academic & Career Prep"',
                                    to: client.email,
                                    subject: 'Welcome, ' + client.firstName,
                                    text: '',
                                    html: 'Youre username is <b>' + client.username + '</b> and your password is your birthday in the following format: yyyymmdd<br /> Please login and complete the required forms. <br /><br /> Thankyou' // html body
                                };
                                // send mail with defined transport object
                                transporter.sendMail(mailOptions, function (error, info) {
                                    if (error) {
                                        return console.log(error);
                                    }
                                    else {
                                        return console.log('Message %s sent: %s', info.messageId, info.response);
                                    }
                                });
                                new sql.Request().query("INSERT INTO Clients VALUES (" + clientQuery + ")").then(function () {
                                    var suitabilityFormQuery = "'" + id[0].userID
                                        + "', '" + suitabilityForm.transcript
                                        + "', '" + suitabilityForm.courses
                                        + "', '" + suitabilityForm.goal
                                        + "', '" + suitabilityForm.transitionDate
                                        + "', '" + suitabilityForm.governmentID
                                        + "', '" + suitabilityForm.appropriateGoal
                                        + "', '" + suitabilityForm.isValidAge
                                        + "', '" + suitabilityForm.schoolRegistration
                                        + "', '" + suitabilityForm.availableDuringClass
                                        + "', '" + suitabilityForm.lastGrade
                                        + "', '" + suitabilityForm.level
                                        + "', '" + suitabilityForm.offerStartDate
                                        + "', '" + suitabilityForm.meetsGoal
                                        + "', '" + suitabilityForm.timeOutOfSchool
                                        + "', '" + suitabilityForm.inProgramBefore
                                        + "', '" + suitabilityForm.employment
                                        + "', '" + suitabilityForm.incomeSource
                                        + "', '" + suitabilityForm.ageRange
                                        + "', '" + suitabilityForm.hoursPerWeek
                                        + "', '" + suitabilityForm.workHistory
                                        + "', '" + suitabilityForm.factorHealth
                                        + "', '" + suitabilityForm.factorInstructions
                                        + "', '" + suitabilityForm.factorCommunication
                                        + "', '" + suitabilityForm.factorLanguage
                                        + "', '" + suitabilityForm.factorComputer
                                        + "', '" + suitabilityForm.factorHousing
                                        + "', '" + suitabilityForm.factorTransportation
                                        + "', '" + suitabilityForm.factorDaycare
                                        + "', '" + suitabilityForm.factorInternet
                                        + "', '" + suitabilityForm.factorPersonal
                                        + "', '" + suitabilityForm.factorOther
                                        + "', '" + suitabilityForm.summaryTransportation
                                        + "', '" + suitabilityForm.summaryHousing
                                        + "', '" + suitabilityForm.summaryChildcare
                                        + "', '" + suitabilityForm.summaryHealth
                                        + "', '" + suitabilityForm.summaryOther
                                        + "', '" + suitabilityForm.dbTotalPoints + "'";
                                    new sql.Request().query("INSERT INTO SuitabilityForm VALUES (" + suitabilityFormQuery + ")").then(function () {
                                    }).catch(function (err) {
                                        res.send({ "error": "error" });
                                        console.log("insert suitabilityForm " + err);
                                    });
                                }).catch(function (err) {
                                    res.send({ "error": "error" });
                                    console.log("insert client " + err);
                                    new sql.Request().query("DELETE FROM Users WHERE userID = '" + id[0] + "'").then(function () {
                                        res.send({ "success": "success" });
                                    }).catch(function (err) {
                                        res.send({ "error": "error" });
                                        console.log("Delete user with id " + id[0] + ". " + err);
                                    });
                                });
                            }).catch(function (err) {
                                res.send({ "error": "error" });
                                console.log("get user " + err);
                            });
                        }).catch(function (err) {
                            res.send({ "error": "error" });
                            console.log("insert user " + err);
                        });
                    }).catch(function (err) {
                        console.log(err);
                        res.send({ "error": "error" });
                    });
                }
            });
        }
        catch (e) {
            console.log(e);
            res.send({ "error": "error in your request" });
        }
    };
    ClientController.prototype.update = function (req, res) {
        try {
            new AuthController().authUser(req, res, {
                requiredAuth: auth, done: function () {
                    var client = req.body;
                    var _id = req.params._id;
                    sql.connect("mssql://NickRowlandson:georgianTest1@nr-comp2007.database.windows.net/GeorgianApp?encrypt=true").then(function () {
                        new sql.Request().query("UPDATE Clients SET firstName='" + client.firstName + "', lastName='" + client.lastName + "', birthdate='" + client.birthday + "', email='" + client.email + "', phone='" + client.phone + "' WHERE studentID = '" + _id + "'").then(function (recordset) {
                            res.send({ "success": "success" });
                        }).catch(function (err) {
                            res.send({ "error": "error" });
                            console.log("Update client " + err);
                        });
                    }).catch(function (err) {
                        console.log(err);
                        res.send({ "error": "error" });
                    });
                }
            });
        }
        catch (e) {
            console.log(e);
            res.send({ "error": "error in your request" });
        }
    };
    ClientController.prototype.delete = function (req, res) {
        try {
            new AuthController().authUser(req, res, {
                requiredAuth: auth, done: function () {
                    var _id = req.params._id;
                    sql.connect("mssql://NickRowlandson:georgianTest1@nr-comp2007.database.windows.net/GeorgianApp?encrypt=true").then(function () {
                        new sql.Request().query("DELETE FROM Clients WHERE userID = '" + _id + "'").then(function () {
                            new sql.Request().query("DELETE FROM Users WHERE userID = '" + _id + "'").then(function () {
                                res.send({ "success": "success" });
                            }).catch(function (err) {
                                res.send({ "error": "error" });
                                console.log("Delete user with id " + _id + ". " + err);
                            });
                        }).catch(function (err) {
                            res.send({ "error": "error" });
                            console.log("Delete client with id " + _id + ". " + err);
                        });
                    }).catch(function (err) {
                        console.log(err);
                        res.send({ "error": "error" });
                    });
                }
            });
        }
        catch (e) {
            console.log(e);
            res.send({ "error": "error in your request" });
        }
    };
    ClientController.prototype.retrieve = function (req, res) {
        try {
            new AuthController().authUser(req, res, {
                requiredAuth: auth, done: function () {
                    sql.connect("mssql://NickRowlandson:georgianTest1@nr-comp2007.database.windows.net/GeorgianApp?encrypt=true").then(function () {
                        new sql.Request().query('SELECT * FROM Clients').then(function (clients) {
                            new sql.Request().query('SELECT * FROM SuitabilityForm').then(function (suitabilityForms) {
                                res.send({ clients: clients, suitabilityForms: suitabilityForms });
                            }).catch(function (err) {
                                res.send({ "error": "error" });
                                console.log("Get suitabilityForms " + err);
                            });
                        }).catch(function (err) {
                            res.send({ "error": "error" });
                            console.log("Get clients " + err);
                        });
                    }).catch(function (err) {
                        console.log(err);
                        res.send({ "error": "error" });
                    });
                }
            });
        }
        catch (e) {
            console.log(e);
            res.send({ "error": "error in your request" });
        }
    };
    ClientController.prototype.findById = function (req, res) {
        try {
            new AuthController().authUser(req, res, {
                requiredAuth: auth, done: function () {
                    var _id = req.params._id;
                    sql.connect("mssql://NickRowlandson:georgianTest1@nr-comp2007.database.windows.net/GeorgianApp?encrypt=true").then(function () {
                        new sql.Request().query("SELECT *  FROM Clients WHERE clientID = '" + _id + "'").then(function (recordset) {
                            res.send(recordset[0]);
                        }).catch(function (err) {
                            res.send({ "error": "error" });
                            console.log("Get client by id " + err);
                        });
                    }).catch(function (err) {
                        console.log(err);
                        res.send({ "error": "error" });
                    });
                }
            });
        }
        catch (e) {
            console.log(e);
            res.send({ "error": "error in your request" });
        }
    };
    return ClientController;
}());
module.exports = ClientController;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NlcnZlci9zcmMvY29udHJvbGxlcnMvQ2xpZW50Q29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBRUEsK0JBQWtDO0FBQ2xDLDhEQUFpRTtBQUNqRSxJQUFJLEdBQUcsR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDM0IsSUFBSSxJQUFJLEdBQUcsQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUM7QUFDOUIsSUFBTSxVQUFVLEdBQUcsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDO0FBQ3pDLElBQU0sUUFBUSxHQUFHLE9BQU8sQ0FBQyxlQUFlLENBQUMsQ0FBQztBQUUxQyxzRUFBc0U7QUFDdEUsSUFBSSxXQUFXLEdBQUcsVUFBVSxDQUFDLGVBQWUsQ0FBQztJQUMzQyxPQUFPLEVBQUUsT0FBTztJQUNoQixJQUFJLEVBQUU7UUFDSixJQUFJLEVBQUUsdUJBQXVCO1FBQzdCLElBQUksRUFBRSxhQUFhO0tBQ3BCO0NBQ0YsQ0FBQyxDQUFDO0FBRUgsMERBQTBEO0FBQzFELHdCQUF3QjtBQUN4QixrRUFBa0U7QUFDbEUsb0RBQW9EO0FBQ3BELDhDQUE4QztBQUM5Qyx3REFBd0Q7QUFDeEQsZ0RBQWdEO0FBQ2hELE9BQU87QUFDUCxFQUFFO0FBQ0YsK0NBQStDO0FBQy9DLHlEQUF5RDtBQUN6RCxtQkFBbUI7QUFDbkIsbUNBQW1DO0FBQ25DLGVBQWU7QUFDZixrRkFBa0Y7QUFDbEYsUUFBUTtBQUNSLFFBQVE7QUFDUixNQUFNO0FBRU47SUFBQTtJQXVOQSxDQUFDO0lBck5HLGlDQUFNLEdBQU4sVUFBTyxHQUFvQixFQUFFLEdBQXFCO1FBQzlDLElBQUksQ0FBQztZQUNELElBQUksY0FBYyxFQUFFLENBQUMsUUFBUSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUU7Z0JBQ3BDLFlBQVksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFO29CQUN0QixJQUFJLElBQUksR0FBRyxNQUFNLENBQUMsV0FBVyxDQUFDLEVB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TkMsSUFBQTtBQUNELGlCQUFTLGdCQUFnQixDQUFDIiwiZmlsZSI6ImNvbnRyb2xsZXJzL0NsaWVudENvbnRyb2xsZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgZXhwcmVzcyA9IHJlcXVpcmUoXCJleHByZXNzXCIpO1xyXG5pbXBvcnQgand0ID0gcmVxdWlyZSgnanNvbndlYnRva2VuJyk7XHJcbmltcG9ydCBiY3J5cHQgPSByZXF1aXJlKCdiY3J5cHQnKTtcclxuaW1wb3J0IEF1dGhDb250cm9sbGVyID0gcmVxdWlyZShcIi4uL2NvbnRyb2xsZXJzL0F1dGhDb250cm9sbGVyXCIpO1xyXG52YXIgc3FsID0gcmVxdWlyZSgnbXNzcWwnKTtcclxudmFyIGF1dGggPSBbXCJBZG1pblwiLCBcIlN0YWZmXCJdO1xyXG5jb25zdCBub2RlbWFpbGVyID0gcmVxdWlyZSgnbm9kZW1haWxlcicpO1xyXG5jb25zdCBzY2hlZHVsZSA9IHJlcXVpcmUoJ25vZGUtc2NoZWR1bGUnKTtcclxuXHJcbi8vIGNyZWF0ZSByZXVzYWJsZSB0cmFuc3BvcnRlciBvYmplY3QgdXNpbmcgdGhlIGRlZmF1bHQgU01UUCB0cmFuc3BvcnRcclxubGV0IHRyYW5zcG9ydGVyID0gbm9kZW1haWxlci5jcmVhdGVUcmFuc3BvcnQoe1xyXG4gIHNlcnZpY2U6ICdnbWFpbCcsXHJcbiAgYXV0aDoge1xyXG4gICAgdXNlcjogJ3Rlc3QyMDE3NTMxQGdtYWlsLmNvbScsXHJcbiAgICBwYXNzOiAnZ2MyMDAyODI5NjUnXHJcbiAgfVxyXG59KTtcclxuXHJcbi8vIHZhciBqID0gc2NoZWR1bGUuc2NoZWR1bGVKb2IoW3ttaW51dGU6IDF9XSwgZnVuY3Rpb24oKXtcclxuLy8gICBsZXQgbWFpbE9wdGlvbnMgPSB7XHJcbi8vICAgICBmcm9tOiAnXCJUZXN0IEdob3N0IPCfkbtcIiA8Z2hvc3RAdGVzdC5jb20+JywgLy8gc2VuZGVyIGFkZHJlc3NcclxuLy8gICAgIHRvOiAnY2hhb2R5ekBnbWFpbC5jb20nLCAvLyBsaXN0IG9mIHJlY2VpdmVyc1xyXG4vLyAgICAgc3ViamVjdDogJ1NDSEVEVUxFUiDinJQnLCAvLyBTdWJqZWN0IGxpbmVcclxuLy8gICAgIHRleHQ6ICdTZW5kaW5nIGV2ZXJ5IGhvdXIuLi4nLCAvLyBwbGFpbiB0ZXh0IGJvZHlcclxuLy8gICAgIGh0bWw6ICc8Yj5IZWxsbyB3b3JsZCA/PC9iPicgLy8gaHRtbCBib2R5XHJcbi8vICAgfTtcclxuLy9cclxuLy8gICAvLyBzZW5kIG1haWwgd2l0aCBkZWZpbmVkIHRyYW5zcG9ydCBvYmplY3RcclxuLy8gICB0cmFuc3BvcnRlci5zZW5kTWFpbChtYWlsT3B0aW9ucywgKGVycm9yLCBpbmZvKSA9PiB7XHJcbi8vICAgICBpZiAoZXJyb3IpIHtcclxuLy8gICAgICAgcmV0dXJuIGNvbnNvbGUubG9nKGVycm9yKTtcclxuLy8gICAgIH0gZWxzZSB7XHJcbi8vICAgICAgIHJldHVybiBjb25zb2xlLmxvZygnTWVzc2FnZSAlcyBzZW50OiAlcycsIGluZm8ubWVzc2FnZUlkLCBpbmZvLnJlc3BvbnNlKTtcclxuLy8gICAgIH1cclxuLy8gICB9KTtcclxuLy8gfSk7XHJcblxyXG5jbGFzcyBDbGllbnRDb250cm9sbGVyIHtcclxuXHJcbiAgICBjcmVhdGUocmVxOiBleHByZXNzLlJlcXVlc3QsIHJlczogZXhwcmVzcy5SZXNwb25zZSk6IHZvaWQge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIG5ldyBBdXRoQ29udHJvbGxlcigpLmF1dGhVc2VyKHJlcSwgcmVzLCB7XHJcbiAgICAgICAgICAgICAgICByZXF1aXJlZEF1dGg6IGF1dGgsIGRvbmU6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBzYWx0ID0gYmNyeXB0LmdlblNhbHRTeW5jKDEwKTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgcGFzc3dvcmQgPSByZXEuYm9keS5jbGllbnQucGFzc3dvcmQ7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gSGFzaCB0aGUgcGFzc3dvcmQgd2l0aCB0aGUgc2FsdFxyXG4gICAgICAgICAgICAgICAgICAgIHBhc3N3b3JkID0gYmNyeXB0Lmhhc2hTeW5jKHBhc3N3b3JkLCBzYWx0KTtcclxuICAgICAgICAgICAgICAgICAgICByZXEuYm9keS5jbGllbnQucGFzc3dvcmQgPSBwYXNzd29yZDtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgY2xpZW50ID0gcmVxLmJvZHkuY2xpZW50O1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBzdWl0YWJpbGl0eUZvcm0gPSByZXEuYm9keS5zdWl0YWJpbGl0eUZvcm07XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHNxbC5jb25uZWN0KFwibXNzcWw6Ly9OaWNrUm93bGFuZHNvbjpnZW9yZ2lhblRlc3QxQG5yLWNvbXAyMDA3LmRhdGFiYXNlLndpbmRvd3MubmV0L0dlb3JnaWFuQXBwP2VuY3J5cHQ9dHJ1ZVwiKS50aGVuKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXcgc3FsLlJlcXVlc3QoKS5xdWVyeShcIklOU0VSVCBJTlRPIFVzZXJzIFZBTFVFUyAoJ1wiICsgY2xpZW50LnVzZXJuYW1lICsgXCInLCdcIiArIGNsaWVudC5wYXNzd29yZCArIFwiJywnQ2xpZW50JylcIikudGhlbihmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBzcWwuUmVxdWVzdCgpLnF1ZXJ5KFwiU0VMRUNUIHVzZXJJRCBGUk9NIFVzZXJzIFdIRVJFIHVzZXJuYW1lID0gJ1wiICsgY2xpZW50LnVzZXJuYW1lICsgXCInIEFORCBwYXNzd29yZCA9ICdcIiArIGNsaWVudC5wYXNzd29yZCArIFwiJ1wiKS50aGVuKGZ1bmN0aW9uKGlkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGNsaWVudFF1ZXJ5ID0gXCInXCIgKyBpZFswXS51c2VySUQgKyBcIicsICdcIiArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsaWVudC5maXJzdE5hbWUgKyBcIicsICdcIiArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsaWVudC5sYXN0TmFtZSArIFwiJywgJ1wiICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xpZW50LmVtYWlsICsgXCInLCAnXCIgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGllbnQuaW5xdWlyeURhdGUgKyBcIicsICdcIiArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsaWVudC5iaXJ0aGRheSArIFwiJywgJ1wiICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xpZW50LnBob25lICsgXCInLCAnXCIgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAxICsgXCInXCI7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBzZXR1cCBlbWFpbCBkYXRhIHdpdGggdW5pY29kZSBzeW1ib2xzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBtYWlsT3B0aW9ucyA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmcm9tOiAnXCJHZW9yZ2lhbiBBY2FkZW1pYyAmIENhcmVlciBQcmVwXCInLCAvLyBzZW5kZXIgYWRkcmVzc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvOiBjbGllbnQuZW1haWwsIC8vIGxpc3Qgb2YgcmVjZWl2ZXJzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3ViamVjdDogJ1dlbGNvbWUsICcgKyBjbGllbnQuZmlyc3ROYW1lLCAvLyBTdWJqZWN0IGxpbmVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0OiAnJywgLy8gcGxhaW4gdGV4dCBib2R5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaHRtbDogJ1lvdXJlIHVzZXJuYW1lIGlzIDxiPicgKyBjbGllbnQudXNlcm5hbWUgKyAnPC9iPiBhbmQgeW91ciBwYXNzd29yZCBpcyB5b3VyIGJpcnRoZGF5IGluIHRoZSBmb2xsb3dpbmcgZm9ybWF0OiB5eXl5bW1kZDxiciAvPiBQbGVhc2UgbG9naW4gYW5kIGNvbXBsZXRlIHRoZSByZXF1aXJlZCBmb3Jtcy4gPGJyIC8+PGJyIC8+IFRoYW5reW91JyAvLyBodG1sIGJvZHlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHNlbmQgbWFpbCB3aXRoIGRlZmluZWQgdHJhbnNwb3J0IG9iamVjdFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cmFuc3BvcnRlci5zZW5kTWFpbChtYWlsT3B0aW9ucywgKGVycm9yLCBpbmZvKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gY29uc29sZS5sb2coZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gY29uc29sZS5sb2coJ01lc3NhZ2UgJXMgc2VudDogJXMnLCBpbmZvLm1lc3NhZ2VJZCwgaW5mby5yZXNwb25zZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3IHNxbC5SZXF1ZXN0KCkucXVlcnkoXCJJTlNFUlQgSU5UTyBDbGllbnRzIFZBTFVFUyAoXCIgKyBjbGllbnRRdWVyeSArIFwiKVwiKS50aGVuKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgc3VpdGFiaWxpdHlGb3JtUXVlcnkgPSBcIidcIiArIGlkWzBdLnVzZXJJRFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICArIFwiJywgJ1wiICsgc3VpdGFiaWxpdHlGb3JtLnRyYW5zY3JpcHRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKyBcIicsICdcIiArIHN1aXRhYmlsaXR5Rm9ybS5jb3Vyc2VzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICsgXCInLCAnXCIgKyBzdWl0YWJpbGl0eUZvcm0uZ29hbFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICArIFwiJywgJ1wiICsgc3VpdGFiaWxpdHlGb3JtLnRyYW5zaXRpb25EYXRlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICsgXCInLCAnXCIgKyBzdWl0YWJpbGl0eUZvcm0uZ292ZXJubWVudElEXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICsgXCInLCAnXCIgKyBzdWl0YWJpbGl0eUZvcm0uYXBwcm9wcmlhdGVHb2FsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICsgXCInLCAnXCIgKyBzdWl0YWJpbGl0eUZvcm0uaXNWYWxpZEFnZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICArIFwiJywgJ1wiICsgc3VpdGFiaWxpdHlGb3JtLnNjaG9vbFJlZ2lzdHJhdGlvblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICArIFwiJywgJ1wiICsgc3VpdGFiaWxpdHlGb3JtLmF2YWlsYWJsZUR1cmluZ0NsYXNzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICsgXCInLCAnXCIgKyBzdWl0YWJpbGl0eUZvcm0ubGFzdEdyYWRlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICsgXCInLCAnXCIgKyBzdWl0YWJpbGl0eUZvcm0ubGV2ZWxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKyBcIicsICdcIiArIHN1aXRhYmlsaXR5Rm9ybS5vZmZlclN0YXJ0RGF0ZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICArIFwiJywgJ1wiICsgc3VpdGFiaWxpdHlGb3JtLm1lZXRzR29hbFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICArIFwiJywgJ1wiICsgc3VpdGFiaWxpdHlGb3JtLnRpbWVPdXRPZlNjaG9vbFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICArIFwiJywgJ1wiICsgc3VpdGFiaWxpdHlGb3JtLmluUHJvZ3JhbUJlZm9yZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICArIFwiJywgJ1wiICsgc3VpdGFiaWxpdHlGb3JtLmVtcGxveW1lbnRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKyBcIicsICdcIiArIHN1aXRhYmlsaXR5Rm9ybS5pbmNvbWVTb3VyY2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKyBcIicsICdcIiArIHN1aXRhYmlsaXR5Rm9ybS5hZ2VSYW5nZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICArIFwiJywgJ1wiICsgc3VpdGFiaWxpdHlGb3JtLmhvdXJzUGVyV2Vla1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICArIFwiJywgJ1wiICsgc3VpdGFiaWxpdHlGb3JtLndvcmtIaXN0b3J5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICsgXCInLCAnXCIgKyBzdWl0YWJpbGl0eUZvcm0uZmFjdG9ySGVhbHRoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICsgXCInLCAnXCIgKyBzdWl0YWJpbGl0eUZvcm0uZmFjdG9ySW5zdHJ1Y3Rpb25zXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICsgXCInLCAnXCIgKyBzdWl0YWJpbGl0eUZvcm0uZmFjdG9yQ29tbXVuaWNhdGlvblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICArIFwiJywgJ1wiICsgc3VpdGFiaWxpdHlGb3JtLmZhY3Rvckxhbmd1YWdlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICsgXCInLCAnXCIgKyBzdWl0YWJpbGl0eUZvcm0uZmFjdG9yQ29tcHV0ZXJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKyBcIicsICdcIiArIHN1aXRhYmlsaXR5Rm9ybS5mYWN0b3JIb3VzaW5nXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICsgXCInLCAnXCIgKyBzdWl0YWJpbGl0eUZvcm0uZmFjdG9yVHJhbnNwb3J0YXRpb25cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKyBcIicsICdcIiArIHN1aXRhYmlsaXR5Rm9ybS5mYWN0b3JEYXljYXJlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICsgXCInLCAnXCIgKyBzdWl0YWJpbGl0eUZvcm0uZmFjdG9ySW50ZXJuZXRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKyBcIicsICdcIiArIHN1aXRhYmlsaXR5Rm9ybS5mYWN0b3JQZXJzb25hbFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICArIFwiJywgJ1wiICsgc3VpdGFiaWxpdHlGb3JtLmZhY3Rvck90aGVyXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICsgXCInLCAnXCIgKyBzdWl0YWJpbGl0eUZvcm0uc3VtbWFyeVRyYW5zcG9ydGF0aW9uXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICsgXCInLCAnXCIgKyBzdWl0YWJpbGl0eUZvcm0uc3VtbWFyeUhvdXNpbmdcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKyBcIicsICdcIiArIHN1aXRhYmlsaXR5Rm9ybS5zdW1tYXJ5Q2hpbGRjYXJlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICsgXCInLCAnXCIgKyBzdWl0YWJpbGl0eUZvcm0uc3VtbWFyeUhlYWx0aFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICArIFwiJywgJ1wiICsgc3VpdGFiaWxpdHlGb3JtLnN1bW1hcnlPdGhlclxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICArIFwiJywgJ1wiICsgc3VpdGFiaWxpdHlGb3JtLmRiVG90YWxQb2ludHMgKyBcIidcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3IHNxbC5SZXF1ZXN0KCkucXVlcnkoXCJJTlNFUlQgSU5UTyBTdWl0YWJpbGl0eUZvcm0gVkFMVUVTIChcIiArIHN1aXRhYmlsaXR5Rm9ybVF1ZXJ5ICsgXCIpXCIpLnRoZW4oZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbihlcnIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcy5zZW5kKHsgXCJlcnJvclwiOiBcImVycm9yXCIgfSk7IGNvbnNvbGUubG9nKFwiaW5zZXJ0IHN1aXRhYmlsaXR5Rm9ybSBcIiArIGVycik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGVycikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXMuc2VuZCh7IFwiZXJyb3JcIjogXCJlcnJvclwiIH0pOyBjb25zb2xlLmxvZyhcImluc2VydCBjbGllbnQgXCIgKyBlcnIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXcgc3FsLlJlcXVlc3QoKS5xdWVyeShcIkRFTEVURSBGUk9NIFVzZXJzIFdIRVJFIHVzZXJJRCA9ICdcIiArIGlkWzBdICsgXCInXCIpLnRoZW4oZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXMuc2VuZCh7IFwic3VjY2Vzc1wiOiBcInN1Y2Nlc3NcIiB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXMuc2VuZCh7IFwiZXJyb3JcIjogXCJlcnJvclwiIH0pOyBjb25zb2xlLmxvZyhcIkRlbGV0ZSB1c2VyIHdpdGggaWQgXCIgKyBpZFswXSArIFwiLiBcIiArIGVycik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzLnNlbmQoeyBcImVycm9yXCI6IFwiZXJyb3JcIiB9KTsgY29uc29sZS5sb2coXCJnZXQgdXNlciBcIiArIGVycik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXMuc2VuZCh7IFwiZXJyb3JcIjogXCJlcnJvclwiIH0pOyBjb25zb2xlLmxvZyhcImluc2VydCB1c2VyIFwiICsgZXJyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcy5zZW5kKHsgXCJlcnJvclwiOiBcImVycm9yXCIgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlKTtcclxuICAgICAgICAgICAgcmVzLnNlbmQoeyBcImVycm9yXCI6IFwiZXJyb3IgaW4geW91ciByZXF1ZXN0XCIgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgdXBkYXRlKHJlcTogZXhwcmVzcy5SZXF1ZXN0LCByZXM6IGV4cHJlc3MuUmVzcG9uc2UpOiB2b2lkIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBuZXcgQXV0aENvbnRyb2xsZXIoKS5hdXRoVXNlcihyZXEsIHJlcywge1xyXG4gICAgICAgICAgICAgICAgcmVxdWlyZWRBdXRoOiBhdXRoLCBkb25lOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgY2xpZW50ID0gcmVxLmJvZHk7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIF9pZDogc3RyaW5nID0gcmVxLnBhcmFtcy5faWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgc3FsLmNvbm5lY3QoXCJtc3NxbDovL05pY2tSb3dsYW5kc29uOmdlb3JnaWFuVGVzdDFAbnItY29tcDIwMDcuZGF0YWJhc2Uud2luZG93cy5uZXQvR2VvcmdpYW5BcHA/ZW5jcnlwdD10cnVlXCIpLnRoZW4oZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBzcWwuUmVxdWVzdCgpLnF1ZXJ5KFwiVVBEQVRFIENsaWVudHMgU0VUIGZpcnN0TmFtZT0nXCIgKyBjbGllbnQuZmlyc3ROYW1lICsgXCInLCBsYXN0TmFtZT0nXCIgKyBjbGllbnQubGFzdE5hbWUgKyBcIicsIGJpcnRoZGF0ZT0nXCIgKyBjbGllbnQuYmlydGhkYXkgKyBcIicsIGVtYWlsPSdcIiArIGNsaWVudC5lbWFpbCArIFwiJywgcGhvbmU9J1wiICsgY2xpZW50LnBob25lICsgXCInIFdIRVJFIHN0dWRlbnRJRCA9ICdcIiArIF9pZCArIFwiJ1wiKS50aGVuKGZ1bmN0aW9uKHJlY29yZHNldCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzLnNlbmQoeyBcInN1Y2Nlc3NcIjogXCJzdWNjZXNzXCIgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGVycikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzLnNlbmQoeyBcImVycm9yXCI6IFwiZXJyb3JcIiB9KTsgY29uc29sZS5sb2coXCJVcGRhdGUgY2xpZW50IFwiICsgZXJyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcy5zZW5kKHsgXCJlcnJvclwiOiBcImVycm9yXCIgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlKTtcclxuICAgICAgICAgICAgcmVzLnNlbmQoeyBcImVycm9yXCI6IFwiZXJyb3IgaW4geW91ciByZXF1ZXN0XCIgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZGVsZXRlKHJlcTogZXhwcmVzcy5SZXF1ZXN0LCByZXM6IGV4cHJlc3MuUmVzcG9uc2UpOiB2b2lkIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBuZXcgQXV0aENvbnRyb2xsZXIoKS5hdXRoVXNlcihyZXEsIHJlcywge1xyXG4gICAgICAgICAgICAgICAgcmVxdWlyZWRBdXRoOiBhdXRoLCBkb25lOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgX2lkOiBzdHJpbmcgPSByZXEucGFyYW1zLl9pZDtcclxuICAgICAgICAgICAgICAgICAgICBzcWwuY29ubmVjdChcIm1zc3FsOi8vTmlja1Jvd2xhbmRzb246Z2VvcmdpYW5UZXN0MUBuci1jb21wMjAwNy5kYXRhYmFzZS53aW5kb3dzLm5ldC9HZW9yZ2lhbkFwcD9lbmNyeXB0PXRydWVcIikudGhlbihmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmV3IHNxbC5SZXF1ZXN0KCkucXVlcnkoXCJERUxFVEUgRlJPTSBDbGllbnRzIFdIRVJFIHVzZXJJRCA9ICdcIiArIF9pZCArIFwiJ1wiKS50aGVuKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3IHNxbC5SZXF1ZXN0KCkucXVlcnkoXCJERUxFVEUgRlJPTSBVc2VycyBXSEVSRSB1c2VySUQgPSAnXCIgKyBfaWQgKyBcIidcIikudGhlbihmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXMuc2VuZCh7IFwic3VjY2Vzc1wiOiBcInN1Y2Nlc3NcIiB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGVycikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcy5zZW5kKHsgXCJlcnJvclwiOiBcImVycm9yXCIgfSk7IGNvbnNvbGUubG9nKFwiRGVsZXRlIHVzZXIgd2l0aCBpZCBcIiArIF9pZCArIFwiLiBcIiArIGVycik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXMuc2VuZCh7IFwiZXJyb3JcIjogXCJlcnJvclwiIH0pOyBjb25zb2xlLmxvZyhcIkRlbGV0ZSBjbGllbnQgd2l0aCBpZCBcIiArIF9pZCArIFwiLiBcIiArIGVycik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbihlcnIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzLnNlbmQoeyBcImVycm9yXCI6IFwiZXJyb3JcIiB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGUpO1xyXG4gICAgICAgICAgICByZXMuc2VuZCh7IFwiZXJyb3JcIjogXCJlcnJvciBpbiB5b3VyIHJlcXVlc3RcIiB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXRyaWV2ZShyZXE6IGV4cHJlc3MuUmVxdWVzdCwgcmVzOiBleHByZXNzLlJlc3BvbnNlKTogdm9pZCB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgbmV3IEF1dGhDb250cm9sbGVyKCkuYXV0aFVzZXIocmVxLCByZXMsIHtcclxuICAgICAgICAgICAgICAgIHJlcXVpcmVkQXV0aDogYXV0aCwgZG9uZTogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3FsLmNvbm5lY3QoXCJtc3NxbDovL05pY2tSb3dsYW5kc29uOmdlb3JnaWFuVGVzdDFAbnItY29tcDIwMDcuZGF0YWJhc2Uud2luZG93cy5uZXQvR2VvcmdpYW5BcHA/ZW5jcnlwdD10cnVlXCIpLnRoZW4oZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBzcWwuUmVxdWVzdCgpLnF1ZXJ5KCdTRUxFQ1QgKiBGUk9NIENsaWVudHMnKS50aGVuKGZ1bmN0aW9uKGNsaWVudHMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICBuZXcgc3FsLlJlcXVlc3QoKS5xdWVyeSgnU0VMRUNUICogRlJPTSBTdWl0YWJpbGl0eUZvcm0nKS50aGVuKGZ1bmN0aW9uKHN1aXRhYmlsaXR5Rm9ybXMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzLnNlbmQoe2NsaWVudHM6IGNsaWVudHMsIHN1aXRhYmlsaXR5Rm9ybXM6IHN1aXRhYmlsaXR5Rm9ybXN9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbihlcnIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzLnNlbmQoeyBcImVycm9yXCI6IFwiZXJyb3JcIiB9KTsgY29uc29sZS5sb2coXCJHZXQgc3VpdGFiaWxpdHlGb3JtcyBcIiArIGVycik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGVycikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzLnNlbmQoeyBcImVycm9yXCI6IFwiZXJyb3JcIiB9KTsgY29uc29sZS5sb2coXCJHZXQgY2xpZW50cyBcIiArIGVycik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGVycikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXMuc2VuZCh7IFwiZXJyb3JcIjogXCJlcnJvclwiIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coZSk7XHJcbiAgICAgICAgICAgIHJlcy5zZW5kKHsgXCJlcnJvclwiOiBcImVycm9yIGluIHlvdXIgcmVxdWVzdFwiIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGZpbmRCeUlkKHJlcTogZXhwcmVzcy5SZXF1ZXN0LCByZXM6IGV4cHJlc3MuUmVzcG9uc2UpOiB2b2lkIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBuZXcgQXV0aENvbnRyb2xsZXIoKS5hdXRoVXNlcihyZXEsIHJlcywge1xyXG4gICAgICAgICAgICAgICAgcmVxdWlyZWRBdXRoOiBhdXRoLCBkb25lOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgX2lkOiBzdHJpbmcgPSByZXEucGFyYW1zLl9pZDtcclxuICAgICAgICAgICAgICAgICAgICBzcWwuY29ubmVjdChcIm1zc3FsOi8vTmlja1Jvd2xhbmRzb246Z2VvcmdpYW5UZXN0MUBuci1jb21wMjAwNy5kYXRhYmFzZS53aW5kb3dzLm5ldC9HZW9yZ2lhbkFwcD9lbmNyeXB0PXRydWVcIikudGhlbihmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmV3IHNxbC5SZXF1ZXN0KCkucXVlcnkoXCJTRUxFQ1QgKiAgRlJPTSBDbGllbnRzIFdIRVJFIGNsaWVudElEID0gJ1wiICsgX2lkICsgXCInXCIpLnRoZW4oZnVuY3Rpb24ocmVjb3Jkc2V0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXMuc2VuZChyZWNvcmRzZXRbMF0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbihlcnIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcy5zZW5kKHsgXCJlcnJvclwiOiBcImVycm9yXCIgfSk7IGNvbnNvbGUubG9nKFwiR2V0IGNsaWVudCBieSBpZCBcIiArIGVycik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGVycikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXMuc2VuZCh7IFwiZXJyb3JcIjogXCJlcnJvclwiIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coZSk7XHJcbiAgICAgICAgICAgIHJlcy5zZW5kKHsgXCJlcnJvclwiOiBcImVycm9yIGluIHlvdXIgcmVxdWVzdFwiIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5leHBvcnQgPSBDbGllbnRDb250cm9sbGVyO1xyXG4iXX0=
