"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");
var MailService = require("../services/MailService");
var ActivityService = require("../services/ActivityService");
var sql = require('mssql');
var config = require('../config');
var db = config.db;
var mail = config.mail;
var site_settings = config.site_settings;
var AuthController = /** @class */ (function () {
    function AuthController() {
    }
    // Login Authentication
    AuthController.prototype.auth = function (req, res) {
        try {
            var _username = req.body.username;
            var _password = req.body.password;
            var response;
            sql.connect(db)
                .then(function (connection) {
                sql.query(templateObject_1 || (templateObject_1 = __makeTemplateObject(["SELECT * FROM Users WHERE username = ", ""], ["SELECT * FROM Users WHERE username = ", ""])), _username).then(function (user) {
                    if (user.length > 0) {
                        if (bcrypt.compareSync(_password, user[0].password)) {
                            new ActivityService().reportActivity(user[0].userType + ' Login', 'success', user[0].userID, _username + ' was successfully logged in.');
                            var token = jwt.sign({ userid: user[0].userID }, "f9b574a2fc0d77986cb7ebe21a0dea480f5f21931abfa5cf329a45ecc0c8e1ff");
                            var statusToken = { status: 200, body: { token: token, userID: user[0].userID, username: user[0].username, userType: user[0].userType, active: user[0].active } };
                            response = JSON.stringify(statusToken);
                        }
                        else {
                            new ActivityService().reportActivity(user[0].userType + ' Login', 'fail', user[0].userID, _username + ' attempted to log in but entered the wrong password.');
                            response = false;
                        }
                    }
                    else {
                        new ActivityService().reportActivity('Login', 'fail', '', 'Attempted login as: ' + _username + '. This username does not exist.');
                        response = false;
                    }
                    res.send(response);
                }).catch(function (err) {
                    console.log("Error - Login: " + err);
                    res.send({ result: "error", title: "Error", msg: "There was an error logging in.", serverMsg: "" });
                });
            }).catch(function (err) {
                console.log("DB Connection error - Login: " + err);
                res.send({ result: "error", title: "Connection Error", msg: "There was an error connecting to the database.", serverMsg: err });
            });
        }
        catch (err) {
            console.log("Error - Login: " + err);
            res.send({ result: "error", title: "Error", msg: "There was an error logging in.", serverMsg: "" });
        }
    };
    //Decode token and check if user is authorized
    AuthController.prototype.authUser = function (req, res, data) {
        try {
            if (req.headers && req.headers.authorization) {
                jwt.verify(req.headers.authorization, 'f9b574a2fc0d77986cb7ebe21a0dea480f5f21931abfa5cf329a45ecc0c8e1ff', function (err, decoded) {
                    if (err) {
                        return res.send({ error: "There was an error" });
                    }
                    else {
                        if (decoded === null || Object.keys(decoded).length === 0) {
                            return res.send({ error: "No values in token" });
                        }
                    }
                    var _id = decoded.userid;
                    sql.connect(db)
                        .then(function (connection) {
                        new sql.Request(connection)
                            .query("SELECT * FROM Users WHERE userID = " + _id)
                            .then(function (user) {
                            var hasSome = data.requiredAuth.some(function (v) {
                                return user[0].userType.indexOf(v) >= 0;
                            });
                            if (hasSome) {
                                try {
                                    data.done();
                                }
                                catch (err) {
                                    console.log(err.stack);
                                    throw "There was an issue in the logic done after the authentication"; // This will throw to catch on line 83
                                }
                            }
                            else {
                                res.send({ status: '403' });
                            }
                        }).catch(function (err) {
                            console.log("Error - Get user by id: " + err);
                            res.send({ result: "error", title: "Error", msg: "There was an error authenticating the current user.", serverMsg: "" });
                        });
                    }).catch(function (err) {
                        console.log("DB Connection error - Authenticate user: " + err);
                        res.send({ result: "error", title: "Connection Error", msg: "There was an error connecting to the database.", serverMsg: err });
                    });
                });
            }
            else {
                res.send({ error: "No auth header" });
            }
        }
        catch (err) {
            console.log("Error - Authenticate user: " + err);
            res.send({ result: "error", title: "Error", msg: "There was an error authenticating the current user.", serverMsg: "" });
        }
    };
    AuthController.prototype.resetPassword = function (req, res) {
        try {
            var _userID = req.body.userID;
            var _password = req.body.password;
            var salt = bcrypt.genSaltSync(10);
            // Hash the password with the salt
            _password = bcrypt.hashSync(_password, salt);
            sql.connect(db)
                .then(function (connection) {
                sql.query(templateObject_2 || (templateObject_2 = __makeTemplateObject(["UPDATE Users SET password=", ", active='true' WHERE userID = ", ""], ["UPDATE Users SET password=", ", active='true' WHERE userID = ", ""])), _password, _userID).then(function (recordset) {
                    res.send({ result: "success", title: "Success!", msg: "Please log in using your new password.", serverMsg: "" });
                }).catch(function (err) {
                    console.log("Update user password " + err);
                    res.send({ result: "error", title: "Error", msg: "There was an error resetting your password.", serverMsg: "" });
                });
            }).catch(function (err) {
                console.log(err);
                res.send({ result: "error", title: "Connection Error", msg: "There was an error connecting to the database.", serverMsg: "" });
            });
        }
        catch (err) {
            console.log("Error - Reset password: " + err);
            res.send({ result: "error", title: "Error", msg: "There was an error resetting your password.", serverMsg: "" });
        }
    };
    AuthController.prototype.requestReset = function (req, res) {
        try {
            var _email = req.params._email;
            var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            var emailValidation = re.test(_email);
            var randomstring = Math.random().toString(36).slice(-8);
            randomstring = randomstring.charAt(0).toUpperCase() + randomstring.slice(1);
            var salt = bcrypt.genSaltSync(10);
            // Hash the password with the salt
            var _password = bcrypt.hashSync(randomstring, salt);
            if (!emailValidation) {
                res.send({ result: "invalid", title: "Invalid", msg: "Please enter a proper email address. (example@email.com)", serverMsg: "" });
            }
            else {
                sql.connect(db)
                    .then(function (connection) {
                    new sql.Request(connection)
                        .query("UPDATE Users SET password = '" + _password + "', active = 'false' WHERE email = '" + _email + "'")
                        .then(function (result) {
                        console.log(result);
                        if (result != null) {
                            // setup email data with unicode symbols
                            var mailOptions = {
                                from: mail.user,
                                to: _email,
                                subject: 'Password Reset',
                                text: '',
                                html: 'Here is your new temporary password: <b>' + randomstring + '</b><br /> Please login at ' + site_settings.url + ' <br /><br /> Thankyou' // html body
                            };
                            new ActivityService().reportActivity('Request Password Reset', 'success', '', 'Password reset accepted. Instructions for login sent to ' + _email + '.');
                            new MailService().sendMessage(" Reset Password", mailOptions);
                        }
                        else {
                            new ActivityService().reportActivity('Request Password Reset', 'fail', '', 'Could not find user with email ' + _email + '.');
                        }
                        res.send({ result: "success", title: "Success!", msg: "Check your email for reset instructions.", serverMsg: "" });
                    }).catch(function (err) {
                        console.log("Update user password " + err);
                        res.send({ result: "error", title: "Error", msg: "There was an error requesting password reset.", serverMsg: "" });
                    });
                }).catch(function (err) {
                    console.log(err);
                    res.send({ result: "error", title: "Connection Error", msg: "There was an error connecting to the database.", serverMsg: "" });
                });
            }
        }
        catch (err) {
            console.log("Error - Request password reset: " + err);
            res.send({ result: "error", title: "Error", msg: "There was an error requesting password reset.", serverMsg: "" });
        }
    };
    return AuthController;
}());
var templateObject_1, templateObject_2;
module.exports = AuthController;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NlcnZlci9zcmMvY29udHJvbGxlcnMvQXV0aENvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFDQSxrQ0FBcUM7QUFDckMsK0JBQWtDO0FBQ2xDLElBQU0sV0FBVyxHQUFHLE9BQU8sQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDO0FBQ3ZELElBQU0sZUFBZSxHQUFHLE9BQU8sQ0FBQyw2QkFBNkIsQ0FBQyxDQUFDO0FBQy9ELElBQUksR0FBRyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUMzQixJQUFNLE1BQU0sR0FBRyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUM7QUFDcEMsSUFBTSxFQUFFLEdBQUcsTUFBTSxDQUFDLEVBQUUsQ0FBQztBQUNyQixJQUFNLElBQUksR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDO0FBQ3pCLElBQU0sYUFBYSxHQUFHLE1BQU0sQ0FBQyxhQUFhLENBQUM7QUFFM0M7SUFBQTtJQStLQSxDQUFDO0lBN0tDLHVCQUF1QjtJQUN2Qiw2QkFBSSxHQUFKLFVBQUssR0FBb0IsRUFBRSxHQUFxQjtRQUM5QyxJQUFJO1lBQ0YsSUFBSSxTQUFTLEdBQVcsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7WUFDMUMsSUFBSSxTQUFTLEdBQVcsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7WUFDMUMsSUFBSSxRQUFRLENBQUM7WUFFYixHQUFHLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQztpQkFDWixJQUFJLENBQUMsVUFBUyxVQUFVO2dCQUN2QixHQUFHLENBQUMsS0FBSyw4R0FDUCx1Q0FBd0MsRUFBUyxFQUFFLEtBQVgsU0FBUyxFQUNoRCxJQUFJLENBQUMsVUFBUyxJQUFJO29CQUNqQixJQUFJLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO3dCQUNuQixJQUFJLE1BQU0sQ0FBQyxXQUFXLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxR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SUFBQTs7QUFDRCxpQkFBUyxjQUFjLENBQUMiLCJmaWxlIjoiY29udHJvbGxlcnMvQXV0aENvbnRyb2xsZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgZXhwcmVzcyA9IHJlcXVpcmUoXCJleHByZXNzXCIpO1xyXG5pbXBvcnQgand0ID0gcmVxdWlyZSgnanNvbndlYnRva2VuJyk7XHJcbmltcG9ydCBiY3J5cHQgPSByZXF1aXJlKCdiY3J5cHQnKTtcclxuY29uc3QgTWFpbFNlcnZpY2UgPSByZXF1aXJlKFwiLi4vc2VydmljZXMvTWFpbFNlcnZpY2VcIik7XHJcbmNvbnN0IEFjdGl2aXR5U2VydmljZSA9IHJlcXVpcmUoXCIuLi9zZXJ2aWNlcy9BY3Rpdml0eVNlcnZpY2VcIik7XHJcbnZhciBzcWwgPSByZXF1aXJlKCdtc3NxbCcpO1xyXG5jb25zdCBjb25maWcgPSByZXF1aXJlKCcuLi9jb25maWcnKTtcclxuY29uc3QgZGIgPSBjb25maWcuZGI7XHJcbmNvbnN0IG1haWwgPSBjb25maWcubWFpbDtcclxuY29uc3Qgc2l0ZV9zZXR0aW5ncyA9IGNvbmZpZy5zaXRlX3NldHRpbmdzO1xyXG5cclxuY2xhc3MgQXV0aENvbnRyb2xsZXIge1xyXG5cclxuICAvLyBMb2dpbiBBdXRoZW50aWNhdGlvblxyXG4gIGF1dGgocmVxOiBleHByZXNzLlJlcXVlc3QsIHJlczogZXhwcmVzcy5SZXNwb25zZSk6IHZvaWQge1xyXG4gICAgdHJ5IHtcclxuICAgICAgdmFyIF91c2VybmFtZTogc3RyaW5nID0gcmVxLmJvZHkudXNlcm5hbWU7XHJcbiAgICAgIHZhciBfcGFzc3dvcmQ6IHN0cmluZyA9IHJlcS5ib2R5LnBhc3N3b3JkO1xyXG4gICAgICB2YXIgcmVzcG9uc2U7XHJcblxyXG4gICAgICBzcWwuY29ubmVjdChkYilcclxuICAgICAgICAudGhlbihmdW5jdGlvbihjb25uZWN0aW9uKSB7XHJcbiAgICAgICAgICBzcWwucXVlcnlcclxuICAgICAgICAgICAgYFNFTEVDVCAqIEZST00gVXNlcnMgV0hFUkUgdXNlcm5hbWUgPSAke191c2VybmFtZX1gXHJcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKHVzZXIpIHtcclxuICAgICAgICAgICAgICBpZiAodXNlci5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoYmNyeXB0LmNvbXBhcmVTeW5jKF9wYXNzd29yZCwgdXNlclswXS5wYXNzd29yZCkpIHtcclxuICAgICAgICAgICAgICAgICAgbmV3IEFjdGl2aXR5U2VydmljZSgpLnJlcG9ydEFjdGl2aXR5KHVzZXJbMF0udXNlclR5cGUgKyAnIExvZ2luJywgJ3N1Y2Nlc3MnLCB1c2VyWzBdLnVzZXJJRCwgX3VzZXJuYW1lICsgJyB3YXMgc3VjY2Vzc2Z1bGx5IGxvZ2dlZCBpbi4nKTtcclxuICAgICAgICAgICAgICAgICAgdmFyIHRva2VuID0gand0LnNpZ24oeyB1c2VyaWQ6IHVzZXJbMF0udXNlcklEIH0sIFwiZjliNTc0YTJmYzBkNzc5ODZjYjdlYmUyMWEwZGVhNDgwZjVmMjE5MzFhYmZhNWNmMzI5YTQ1ZWNjMGM4ZTFmZlwiKTtcclxuICAgICAgICAgICAgICAgICAgdmFyIHN0YXR1c1Rva2VuID0geyBzdGF0dXM6IDIwMCwgYm9keTogeyB0b2tlbjogdG9rZW4sIHVzZXJJRDogdXNlclswXS51c2VySUQsIHVzZXJuYW1lOiB1c2VyWzBdLnVzZXJuYW1lLCB1c2VyVHlwZTogdXNlclswXS51c2VyVHlwZSwgYWN0aXZlOiB1c2VyWzBdLmFjdGl2ZSB9IH07XHJcbiAgICAgICAgICAgICAgICAgIHJlc3BvbnNlID0gSlNPTi5zdHJpbmdpZnkoc3RhdHVzVG9rZW4pO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgbmV3IEFjdGl2aXR5U2VydmljZSgpLnJlcG9ydEFjdGl2aXR5KHVzZXJbMF0udXNlclR5cGUgKyAnIExvZ2luJywgJ2ZhaWwnLCB1c2VyWzBdLnVzZXJJRCwgX3VzZXJuYW1lICsgJyBhdHRlbXB0ZWQgdG8gbG9nIGluIGJ1dCBlbnRlcmVkIHRoZSB3cm9uZyBwYXNzd29yZC4nKTtcclxuICAgICAgICAgICAgICAgICAgcmVzcG9uc2UgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgbmV3IEFjdGl2aXR5U2VydmljZSgpLnJlcG9ydEFjdGl2aXR5KCdMb2dpbicsICdmYWlsJywgJycsICdBdHRlbXB0ZWQgbG9naW4gYXM6ICcgKyBfdXNlcm5hbWUgKyAnLiBUaGlzIHVzZXJuYW1lIGRvZXMgbm90IGV4aXN0LicpO1xyXG4gICAgICAgICAgICAgICAgcmVzcG9uc2UgPSBmYWxzZTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgcmVzLnNlbmQocmVzcG9uc2UpO1xyXG4gICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbihlcnIpIHtcclxuICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yIC0gTG9naW46IFwiICsgZXJyKTtcclxuICAgICAgICAgICAgICByZXMuc2VuZCh7IHJlc3VsdDogXCJlcnJvclwiLCB0aXRsZTogXCJFcnJvclwiLCBtc2c6IFwiVGhlcmUgd2FzIGFuIGVycm9yIGxvZ2dpbmcgaW4uXCIsIHNlcnZlck1zZzogXCJcIiB9KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhcIkRCIENvbm5lY3Rpb24gZXJyb3IgLSBMb2dpbjogXCIgKyBlcnIpO1xyXG4gICAgICAgICAgcmVzLnNlbmQoeyByZXN1bHQ6IFwiZXJyb3JcIiwgdGl0bGU6IFwiQ29ubmVjdGlvbiBFcnJvclwiLCBtc2c6IFwiVGhlcmUgd2FzIGFuIGVycm9yIGNvbm5lY3RpbmcgdG8gdGhlIGRhdGFiYXNlLlwiLCBzZXJ2ZXJNc2c6IGVyciB9KTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgY29uc29sZS5sb2coXCJFcnJvciAtIExvZ2luOiBcIiArIGVycik7XHJcbiAgICAgIHJlcy5zZW5kKHsgcmVzdWx0OiBcImVycm9yXCIsIHRpdGxlOiBcIkVycm9yXCIsIG1zZzogXCJUaGVyZSB3YXMgYW4gZXJyb3IgbG9nZ2luZyBpbi5cIiwgc2VydmVyTXNnOiBcIlwiIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLy9EZWNvZGUgdG9rZW4gYW5kIGNoZWNrIGlmIHVzZXIgaXMgYXV0aG9yaXplZFxyXG4gIGF1dGhVc2VyKHJlcTogZXhwcmVzcy5SZXF1ZXN0LCByZXM6IGV4cHJlc3MuUmVzcG9uc2UsIGRhdGEpOiB2b2lkIHtcclxuICAgIHRyeSB7XHJcbiAgICAgIGlmIChyZXEuaGVhZGVycyAmJiByZXEuaGVhZGVycy5hdXRob3JpemF0aW9uKSB7XHJcbiAgICAgICAgand0LnZlcmlmeShyZXEuaGVhZGVycy5hdXRob3JpemF0aW9uLCAnZjliNTc0YTJmYzBkNzc5ODZjYjdlYmUyMWEwZGVhNDgwZjVmMjE5MzFhYmZhNWNmMzI5YTQ1ZWNjMGM4ZTFmZicsIGZ1bmN0aW9uKGVyciwgZGVjb2RlZCkge1xyXG4gICAgICAgICAgaWYgKGVycikge1xyXG4gICAgICAgICAgICByZXR1cm4gcmVzLnNlbmQoeyBlcnJvcjogXCJUaGVyZSB3YXMgYW4gZXJyb3JcIiB9KTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGlmIChkZWNvZGVkID09PSBudWxsIHx8IE9iamVjdC5rZXlzKGRlY29kZWQpLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICAgIHJldHVybiByZXMuc2VuZCh7IGVycm9yOiBcIk5vIHZhbHVlcyBpbiB0b2tlblwiIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICB2YXIgX2lkID0gZGVjb2RlZC51c2VyaWQ7XHJcblxyXG4gICAgICAgICAgc3FsLmNvbm5lY3QoZGIpXHJcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKGNvbm5lY3Rpb24pIHtcclxuICAgICAgICAgICAgICBuZXcgc3FsLlJlcXVlc3QoY29ubmVjdGlvbilcclxuICAgICAgICAgICAgICAgIC5xdWVyeShgU0VMRUNUICogRlJPTSBVc2VycyBXSEVSRSB1c2VySUQgPSAke19pZH1gKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24odXNlcikge1xyXG4gICAgICAgICAgICAgICAgICB2YXIgaGFzU29tZSA9IGRhdGEucmVxdWlyZWRBdXRoLnNvbWUoZnVuY3Rpb24odikge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB1c2VyWzBdLnVzZXJUeXBlLmluZGV4T2YodikgPj0gMDtcclxuICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgaWYgKGhhc1NvbWUpIHtcclxuICAgICAgICAgICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgZGF0YS5kb25lKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIuc3RhY2spO1xyXG4gICAgICAgICAgICAgICAgICAgICAgdGhyb3cgXCJUaGVyZSB3YXMgYW4gaXNzdWUgaW4gdGhlIGxvZ2ljIGRvbmUgYWZ0ZXIgdGhlIGF1dGhlbnRpY2F0aW9uXCI7IC8vIFRoaXMgd2lsbCB0aHJvdyB0byBjYXRjaCBvbiBsaW5lIDgzXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlcy5zZW5kKHsgc3RhdHVzOiAnNDAzJyB9KTtcclxuICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3IgLSBHZXQgdXNlciBieSBpZDogXCIgKyBlcnIpO1xyXG4gICAgICAgICAgICAgICAgICByZXMuc2VuZCh7IHJlc3VsdDogXCJlcnJvclwiLCB0aXRsZTogXCJFcnJvclwiLCBtc2c6IFwiVGhlcmUgd2FzIGFuIGVycm9yIGF1dGhlbnRpY2F0aW5nIHRoZSBjdXJyZW50IHVzZXIuXCIsIHNlcnZlck1zZzogXCJcIiB9KTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbihlcnIpIHtcclxuICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkRCIENvbm5lY3Rpb24gZXJyb3IgLSBBdXRoZW50aWNhdGUgdXNlcjogXCIgKyBlcnIpO1xyXG4gICAgICAgICAgICAgIHJlcy5zZW5kKHsgcmVzdWx0OiBcImVycm9yXCIsIHRpdGxlOiBcIkNvbm5lY3Rpb24gRXJyb3JcIiwgbXNnOiBcIlRoZXJlIHdhcyBhbiBlcnJvciBjb25uZWN0aW5nIHRvIHRoZSBkYXRhYmFzZS5cIiwgc2VydmVyTXNnOiBlcnIgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9KTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICByZXMuc2VuZCh7IGVycm9yOiBcIk5vIGF1dGggaGVhZGVyXCIgfSk7XHJcbiAgICAgIH1cclxuICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICBjb25zb2xlLmxvZyhcIkVycm9yIC0gQXV0aGVudGljYXRlIHVzZXI6IFwiICsgZXJyKTtcclxuICAgICAgcmVzLnNlbmQoeyByZXN1bHQ6IFwiZXJyb3JcIiwgdGl0bGU6IFwiRXJyb3JcIiwgbXNnOiBcIlRoZXJlIHdhcyBhbiBlcnJvciBhdXRoZW50aWNhdGluZyB0aGUgY3VycmVudCB1c2VyLlwiLCBzZXJ2ZXJNc2c6IFwiXCIgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICByZXNldFBhc3N3b3JkKHJlcTogZXhwcmVzcy5SZXF1ZXN0LCByZXM6IGV4cHJlc3MuUmVzcG9uc2UpOiB2b2lkIHtcclxuICAgIHRyeSB7XHJcbiAgICAgIHZhciBfdXNlcklEOiBzdHJpbmcgPSByZXEuYm9keS51c2VySUQ7XHJcbiAgICAgIHZhciBfcGFzc3dvcmQ6IHN0cmluZyA9IHJlcS5ib2R5LnBhc3N3b3JkO1xyXG4gICAgICB2YXIgc2FsdCA9IGJjcnlwdC5nZW5TYWx0U3luYygxMCk7XHJcbiAgICAgIC8vIEhhc2ggdGhlIHBhc3N3b3JkIHdpdGggdGhlIHNhbHRcclxuICAgICAgX3Bhc3N3b3JkID0gYmNyeXB0Lmhhc2hTeW5jKF9wYXNzd29yZCwgc2FsdCk7XHJcblxyXG4gICAgICBzcWwuY29ubmVjdChkYilcclxuICAgICAgICAudGhlbihmdW5jdGlvbihjb25uZWN0aW9uKSB7XHJcbiAgICAgICAgICBzcWwucXVlcnlcclxuICAgICAgICAgICAgYFVQREFURSBVc2VycyBTRVQgcGFzc3dvcmQ9JHtfcGFzc3dvcmR9LCBhY3RpdmU9J3RydWUnIFdIRVJFIHVzZXJJRCA9ICR7X3VzZXJJRH1gXHJcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKHJlY29yZHNldCkge1xyXG4gICAgICAgICAgICAgIHJlcy5zZW5kKHsgcmVzdWx0OiBcInN1Y2Nlc3NcIiwgdGl0bGU6IFwiU3VjY2VzcyFcIiwgbXNnOiBcIlBsZWFzZSBsb2cgaW4gdXNpbmcgeW91ciBuZXcgcGFzc3dvcmQuXCIsIHNlcnZlck1zZzogXCJcIiB9KTtcclxuICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XHJcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJVcGRhdGUgdXNlciBwYXNzd29yZCBcIiArIGVycik7XHJcbiAgICAgICAgICAgICAgcmVzLnNlbmQoeyByZXN1bHQ6IFwiZXJyb3JcIiwgdGl0bGU6IFwiRXJyb3JcIiwgbXNnOiBcIlRoZXJlIHdhcyBhbiBlcnJvciByZXNldHRpbmcgeW91ciBwYXNzd29yZC5cIiwgc2VydmVyTXNnOiBcIlwiIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KS5jYXRjaChmdW5jdGlvbihlcnIpIHtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XHJcbiAgICAgICAgICByZXMuc2VuZCh7IHJlc3VsdDogXCJlcnJvclwiLCB0aXRsZTogXCJDb25uZWN0aW9uIEVycm9yXCIsIG1zZzogXCJUaGVyZSB3YXMgYW4gZXJyb3IgY29ubmVjdGluZyB0byB0aGUgZGF0YWJhc2UuXCIsIHNlcnZlck1zZzogXCJcIiB9KTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgY29uc29sZS5sb2coXCJFcnJvciAtIFJlc2V0IHBhc3N3b3JkOiBcIiArIGVycik7XHJcbiAgICAgIHJlcy5zZW5kKHsgcmVzdWx0OiBcImVycm9yXCIsIHRpdGxlOiBcIkVycm9yXCIsIG1zZzogXCJUaGVyZSB3YXMgYW4gZXJyb3IgcmVzZXR0aW5nIHlvdXIgcGFzc3dvcmQuXCIsIHNlcnZlck1zZzogXCJcIiB9KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHJlcXVlc3RSZXNldChyZXE6IGV4cHJlc3MuUmVxdWVzdCwgcmVzOiBleHByZXNzLlJlc3BvbnNlKTogdm9pZCB7XHJcbiAgICB0cnkge1xyXG4gICAgICB2YXIgX2VtYWlsOiBzdHJpbmcgPSByZXEucGFyYW1zLl9lbWFpbDtcclxuICAgICAgdmFyIHJlID0gL14oKFtePD4oKVtcXF1cXFxcLiw7Olxcc0BcXFwiXSsoXFwuW148PigpW1xcXVxcXFwuLDs6XFxzQFxcXCJdKykqKXwoXFxcIi4rXFxcIikpQCgoXFxbWzAtOV17MSwzfVxcLlswLTldezEsM31cXC5bMC05XXsxLDN9XFwuWzAtOV17MSwzfVxcXSl8KChbYS16QS1aXFwtMC05XStcXC4pK1thLXpBLVpdezIsfSkpJC87XHJcbiAgICAgIHZhciBlbWFpbFZhbGlkYXRpb24gPSByZS50ZXN0KF9lbWFpbCk7XHJcbiAgICAgIHZhciByYW5kb21zdHJpbmcgPSBNYXRoLnJhbmRvbSgpLnRvU3RyaW5nKDM2KS5zbGljZSgtOCk7XHJcbiAgICAgIHJhbmRvbXN0cmluZyA9IHJhbmRvbXN0cmluZy5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHJhbmRvbXN0cmluZy5zbGljZSgxKTtcclxuICAgICAgdmFyIHNhbHQgPSBiY3J5cHQuZ2VuU2FsdFN5bmMoMTApO1xyXG4gICAgICAvLyBIYXNoIHRoZSBwYXNzd29yZCB3aXRoIHRoZSBzYWx0XHJcbiAgICAgIHZhciBfcGFzc3dvcmQgPSBiY3J5cHQuaGFzaFN5bmMocmFuZG9tc3RyaW5nLCBzYWx0KTtcclxuICAgICAgaWYgKCFlbWFpbFZhbGlkYXRpb24pIHtcclxuICAgICAgICByZXMuc2VuZCh7IHJlc3VsdDogXCJpbnZhbGlkXCIsIHRpdGxlOiBcIkludmFsaWRcIiwgbXNnOiBcIlBsZWFzZSBlbnRlciBhIHByb3BlciBlbWFpbCBhZGRyZXNzLiAoZXhhbXBsZUBlbWFpbC5jb20pXCIsIHNlcnZlck1zZzogXCJcIiB9KVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHNxbC5jb25uZWN0KGRiKVxyXG4gICAgICAgICAgLnRoZW4oZnVuY3Rpb24oY29ubmVjdGlvbikge1xyXG4gICAgICAgICAgICBuZXcgc3FsLlJlcXVlc3QoY29ubmVjdGlvbilcclxuICAgICAgICAgICAgICAucXVlcnkoYFVQREFURSBVc2VycyBTRVQgcGFzc3dvcmQgPSAnJHtfcGFzc3dvcmR9JywgYWN0aXZlID0gJ2ZhbHNlJyBXSEVSRSBlbWFpbCA9ICcke19lbWFpbH0nYClcclxuICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3VsdCk7XHJcbiAgICAgICAgICAgICAgICBpZiAocmVzdWx0ICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgLy8gc2V0dXAgZW1haWwgZGF0YSB3aXRoIHVuaWNvZGUgc3ltYm9sc1xyXG4gICAgICAgICAgICAgICAgICBsZXQgbWFpbE9wdGlvbnMgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZnJvbTogbWFpbC51c2VyLCAvLyBzZW5kZXIgYWRkcmVzc1xyXG4gICAgICAgICAgICAgICAgICAgIHRvOiBfZW1haWwsIC8vIGxpc3Qgb2YgcmVjZWl2ZXJzXHJcbiAgICAgICAgICAgICAgICAgICAgc3ViamVjdDogJ1Bhc3N3b3JkIFJlc2V0JywgLy8gU3ViamVjdCBsaW5lXHJcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogJycsIC8vIHBsYWluIHRleHQgYm9keVxyXG4gICAgICAgICAgICAgICAgICAgIGh0bWw6ICdIZXJlIGlzIHlvdXIgbmV3IHRlbXBvcmFyeSBwYXNzd29yZDogPGI+JyArIHJhbmRvbXN0cmluZyArICc8L2I+PGJyIC8+IFBsZWFzZSBsb2dpbiBhdCAnICsgc2l0ZV9zZXR0aW5ncy51cmwgKyAnIDxiciAvPjxiciAvPiBUaGFua3lvdScvLyBodG1sIGJvZHlcclxuICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgbmV3IEFjdGl2aXR5U2VydmljZSgpLnJlcG9ydEFjdGl2aXR5KCdSZXF1ZXN0IFBhc3N3b3JkIFJlc2V0JywgJ3N1Y2Nlc3MnLCAnJywgJ1Bhc3N3b3JkIHJlc2V0IGFjY2VwdGVkLiBJbnN0cnVjdGlvbnMgZm9yIGxvZ2luIHNlbnQgdG8gJyArIF9lbWFpbCArICcuJyk7XHJcbiAgICAgICAgICAgICAgICAgIG5ldyBNYWlsU2VydmljZSgpLnNlbmRNZXNzYWdlKFwiIFJlc2V0IFBhc3N3b3JkXCIsIG1haWxPcHRpb25zKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgIG5ldyBBY3Rpdml0eVNlcnZpY2UoKS5yZXBvcnRBY3Rpdml0eSgnUmVxdWVzdCBQYXNzd29yZCBSZXNldCcsICdmYWlsJywgJycsICdDb3VsZCBub3QgZmluZCB1c2VyIHdpdGggZW1haWwgJyArIF9lbWFpbCArICcuJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXMuc2VuZCh7IHJlc3VsdDogXCJzdWNjZXNzXCIsIHRpdGxlOiBcIlN1Y2Nlc3MhXCIsIG1zZzogXCJDaGVjayB5b3VyIGVtYWlsIGZvciByZXNldCBpbnN0cnVjdGlvbnMuXCIsIHNlcnZlck1zZzogXCJcIiB9KTtcclxuICAgICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbihlcnIpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiVXBkYXRlIHVzZXIgcGFzc3dvcmQgXCIgKyBlcnIpO1xyXG4gICAgICAgICAgICAgICAgcmVzLnNlbmQoeyByZXN1bHQ6IFwiZXJyb3JcIiwgdGl0bGU6IFwiRXJyb3JcIiwgbXNnOiBcIlRoZXJlIHdhcyBhbiBlcnJvciByZXF1ZXN0aW5nIHBhc3N3b3JkIHJlc2V0LlwiLCBzZXJ2ZXJNc2c6IFwiXCIgfSk7XHJcbiAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbihlcnIpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coZXJyKTtcclxuICAgICAgICAgICAgcmVzLnNlbmQoeyByZXN1bHQ6IFwiZXJyb3JcIiwgdGl0bGU6IFwiQ29ubmVjdGlvbiBFcnJvclwiLCBtc2c6IFwiVGhlcmUgd2FzIGFuIGVycm9yIGNvbm5lY3RpbmcgdG8gdGhlIGRhdGFiYXNlLlwiLCBzZXJ2ZXJNc2c6IFwiXCIgfSk7XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgfVxyXG5cclxuXHJcbiAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgY29uc29sZS5sb2coXCJFcnJvciAtIFJlcXVlc3QgcGFzc3dvcmQgcmVzZXQ6IFwiICsgZXJyKTtcclxuICAgICAgcmVzLnNlbmQoeyByZXN1bHQ6IFwiZXJyb3JcIiwgdGl0bGU6IFwiRXJyb3JcIiwgbXNnOiBcIlRoZXJlIHdhcyBhbiBlcnJvciByZXF1ZXN0aW5nIHBhc3N3b3JkIHJlc2V0LlwiLCBzZXJ2ZXJNc2c6IFwiXCIgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxufVxyXG5leHBvcnQgPSBBdXRoQ29udHJvbGxlcjtcclxuIl19
