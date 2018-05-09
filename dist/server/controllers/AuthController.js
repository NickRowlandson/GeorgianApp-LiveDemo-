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
                            new ActivityService().reportActivity('Login', 'success', user[0].userID, _username + ' was successfully logged in.');
                            var token = jwt.sign({ userid: user[0].userID }, "f9b574a2fc0d77986cb7ebe21a0dea480f5f21931abfa5cf329a45ecc0c8e1ff");
                            var statusToken = { status: 200, body: { token: token, userID: user[0].userID, username: user[0].username, userType: user[0].userType, active: user[0].active } };
                            response = JSON.stringify(statusToken);
                        }
                        else {
                            new ActivityService().reportActivity('Login', 'fail', user[0].userID, _username + ' attempted to log in but entered the wrong password.');
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NlcnZlci9zcmMvY29udHJvbGxlcnMvQXV0aENvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFDQSxrQ0FBcUM7QUFDckMsK0JBQWtDO0FBQ2xDLElBQU0sV0FBVyxHQUFHLE9BQU8sQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDO0FBQ3ZELElBQU0sZUFBZSxHQUFHLE9BQU8sQ0FBQyw2QkFBNkIsQ0FBQyxDQUFDO0FBQy9ELElBQUksR0FBRyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUMzQixJQUFNLE1BQU0sR0FBRyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUM7QUFDcEMsSUFBTSxFQUFFLEdBQUcsTUFBTSxDQUFDLEVBQUUsQ0FBQztBQUNyQixJQUFNLElBQUksR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDO0FBQ3pCLElBQU0sYUFBYSxHQUFHLE1BQU0sQ0FBQyxhQUFhLENBQUM7QUFFM0M7SUFBQTtJQStLQSxDQUFDO0lBN0tDLHVCQUF1QjtJQUN2Qiw2QkFBSSxHQUFKLFVBQUssR0FBb0IsRUFBRSxHQUFxQjtRQUM5QyxJQUFJO1lBQ0YsSUFBSSxTQUFTLEdBQVcsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7WUFDMUMsSUFBSSxTQUFTLEdBQVcsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7WUFDMUMsSUFBSSxRQUFRLENBQUM7WUFFYixHQUFHLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQztpQkFDWixJQUFJLENBQUMsVUFBUyxVQUFVO2dCQUN2QixHQUFHLENBQUMsS0FBSyw4R0FDUCx1Q0FBd0MsRUFBUyxFQUFFLEtBQVgsU0FBUyxFQUNoRCxJQUFJLENBQUMsVUFBUyxJQUFJO29CQUNqQixJQUFJLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO3dCQUNuQixJQUFJLE1BQU0sQ0FBQyxXQUFXLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxR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dXJjZXNDb250ZW50IjpbImltcG9ydCBleHByZXNzID0gcmVxdWlyZShcImV4cHJlc3NcIik7XHJcbmltcG9ydCBqd3QgPSByZXF1aXJlKCdqc29ud2VidG9rZW4nKTtcclxuaW1wb3J0IGJjcnlwdCA9IHJlcXVpcmUoJ2JjcnlwdCcpO1xyXG5jb25zdCBNYWlsU2VydmljZSA9IHJlcXVpcmUoXCIuLi9zZXJ2aWNlcy9NYWlsU2VydmljZVwiKTtcclxuY29uc3QgQWN0aXZpdHlTZXJ2aWNlID0gcmVxdWlyZShcIi4uL3NlcnZpY2VzL0FjdGl2aXR5U2VydmljZVwiKTtcclxudmFyIHNxbCA9IHJlcXVpcmUoJ21zc3FsJyk7XHJcbmNvbnN0IGNvbmZpZyA9IHJlcXVpcmUoJy4uL2NvbmZpZycpO1xyXG5jb25zdCBkYiA9IGNvbmZpZy5kYjtcclxuY29uc3QgbWFpbCA9IGNvbmZpZy5tYWlsO1xyXG5jb25zdCBzaXRlX3NldHRpbmdzID0gY29uZmlnLnNpdGVfc2V0dGluZ3M7XHJcblxyXG5jbGFzcyBBdXRoQ29udHJvbGxlciB7XHJcblxyXG4gIC8vIExvZ2luIEF1dGhlbnRpY2F0aW9uXHJcbiAgYXV0aChyZXE6IGV4cHJlc3MuUmVxdWVzdCwgcmVzOiBleHByZXNzLlJlc3BvbnNlKTogdm9pZCB7XHJcbiAgICB0cnkge1xyXG4gICAgICB2YXIgX3VzZXJuYW1lOiBzdHJpbmcgPSByZXEuYm9keS51c2VybmFtZTtcclxuICAgICAgdmFyIF9wYXNzd29yZDogc3RyaW5nID0gcmVxLmJvZHkucGFzc3dvcmQ7XHJcbiAgICAgIHZhciByZXNwb25zZTtcclxuXHJcbiAgICAgIHNxbC5jb25uZWN0KGRiKVxyXG4gICAgICAgIC50aGVuKGZ1bmN0aW9uKGNvbm5lY3Rpb24pIHtcclxuICAgICAgICAgIHNxbC5xdWVyeVxyXG4gICAgICAgICAgICBgU0VMRUNUICogRlJPTSBVc2VycyBXSEVSRSB1c2VybmFtZSA9ICR7X3VzZXJuYW1lfWBcclxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24odXNlcikge1xyXG4gICAgICAgICAgICAgIGlmICh1c2VyLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgIGlmIChiY3J5cHQuY29tcGFyZVN5bmMoX3Bhc3N3b3JkLCB1c2VyWzBdLnBhc3N3b3JkKSkge1xyXG4gICAgICAgICAgICAgICAgICBuZXcgQWN0aXZpdHlTZXJ2aWNlKCkucmVwb3J0QWN0aXZpdHkoJ0xvZ2luJywgJ3N1Y2Nlc3MnLCB1c2VyWzBdLnVzZXJJRCwgX3VzZXJuYW1lICsgJyB3YXMgc3VjY2Vzc2Z1bGx5IGxvZ2dlZCBpbi4nKTtcclxuICAgICAgICAgICAgICAgICAgdmFyIHRva2VuID0gand0LnNpZ24oeyB1c2VyaWQ6IHVzZXJbMF0udXNlcklEIH0sIFwiZjliNTc0YTJmYzBkNzc5ODZjYjdlYmUyMWEwZGVhNDgwZjVmMjE5MzFhYmZhNWNmMzI5YTQ1ZWNjMGM4ZTFmZlwiKTtcclxuICAgICAgICAgICAgICAgICAgdmFyIHN0YXR1c1Rva2VuID0geyBzdGF0dXM6IDIwMCwgYm9keTogeyB0b2tlbjogdG9rZW4sIHVzZXJJRDogdXNlclswXS51c2VySUQsIHVzZXJuYW1lOiB1c2VyWzBdLnVzZXJuYW1lLCB1c2VyVHlwZTogdXNlclswXS51c2VyVHlwZSwgYWN0aXZlOiB1c2VyWzBdLmFjdGl2ZSB9IH07XHJcbiAgICAgICAgICAgICAgICAgIHJlc3BvbnNlID0gSlNPTi5zdHJpbmdpZnkoc3RhdHVzVG9rZW4pO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgbmV3IEFjdGl2aXR5U2VydmljZSgpLnJlcG9ydEFjdGl2aXR5KCdMb2dpbicsICdmYWlsJywgdXNlclswXS51c2VySUQsIF91c2VybmFtZSArICcgYXR0ZW1wdGVkIHRvIGxvZyBpbiBidXQgZW50ZXJlZCB0aGUgd3JvbmcgcGFzc3dvcmQuJyk7XHJcbiAgICAgICAgICAgICAgICAgIHJlc3BvbnNlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIG5ldyBBY3Rpdml0eVNlcnZpY2UoKS5yZXBvcnRBY3Rpdml0eSgnTG9naW4nLCAnZmFpbCcsICcnLCAnQXR0ZW1wdGVkIGxvZ2luIGFzOiAnICsgX3VzZXJuYW1lICsgJy4gVGhpcyB1c2VybmFtZSBkb2VzIG5vdCBleGlzdC4nKTtcclxuICAgICAgICAgICAgICAgIHJlc3BvbnNlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIHJlcy5zZW5kKHJlc3BvbnNlKTtcclxuICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XHJcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJFcnJvciAtIExvZ2luOiBcIiArIGVycik7XHJcbiAgICAgICAgICAgICAgcmVzLnNlbmQoeyByZXN1bHQ6IFwiZXJyb3JcIiwgdGl0bGU6IFwiRXJyb3JcIiwgbXNnOiBcIlRoZXJlIHdhcyBhbiBlcnJvciBsb2dnaW5nIGluLlwiLCBzZXJ2ZXJNc2c6IFwiXCIgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGVycikge1xyXG4gICAgICAgICAgY29uc29sZS5sb2coXCJEQiBDb25uZWN0aW9uIGVycm9yIC0gTG9naW46IFwiICsgZXJyKTtcclxuICAgICAgICAgIHJlcy5zZW5kKHsgcmVzdWx0OiBcImVycm9yXCIsIHRpdGxlOiBcIkNvbm5lY3Rpb24gRXJyb3JcIiwgbXNnOiBcIlRoZXJlIHdhcyBhbiBlcnJvciBjb25uZWN0aW5nIHRvIHRoZSBkYXRhYmFzZS5cIiwgc2VydmVyTXNnOiBlcnIgfSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3IgLSBMb2dpbjogXCIgKyBlcnIpO1xyXG4gICAgICByZXMuc2VuZCh7IHJlc3VsdDogXCJlcnJvclwiLCB0aXRsZTogXCJFcnJvclwiLCBtc2c6IFwiVGhlcmUgd2FzIGFuIGVycm9yIGxvZ2dpbmcgaW4uXCIsIHNlcnZlck1zZzogXCJcIiB9KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8vRGVjb2RlIHRva2VuIGFuZCBjaGVjayBpZiB1c2VyIGlzIGF1dGhvcml6ZWRcclxuICBhdXRoVXNlcihyZXE6IGV4cHJlc3MuUmVxdWVzdCwgcmVzOiBleHByZXNzLlJlc3BvbnNlLCBkYXRhKTogdm9pZCB7XHJcbiAgICB0cnkge1xyXG4gICAgICBpZiAocmVxLmhlYWRlcnMgJiYgcmVxLmhlYWRlcnMuYXV0aG9yaXphdGlvbikge1xyXG4gICAgICAgIGp3dC52ZXJpZnkocmVxLmhlYWRlcnMuYXV0aG9yaXphdGlvbiwgJ2Y5YjU3NGEyZmMwZDc3OTg2Y2I3ZWJlMjFhMGRlYTQ4MGY1ZjIxOTMxYWJmYTVjZjMyOWE0NWVjYzBjOGUxZmYnLCBmdW5jdGlvbihlcnIsIGRlY29kZWQpIHtcclxuICAgICAgICAgIGlmIChlcnIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHJlcy5zZW5kKHsgZXJyb3I6IFwiVGhlcmUgd2FzIGFuIGVycm9yXCIgfSk7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAoZGVjb2RlZCA9PT0gbnVsbCB8fCBPYmplY3Qua2V5cyhkZWNvZGVkKS5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgICByZXR1cm4gcmVzLnNlbmQoeyBlcnJvcjogXCJObyB2YWx1ZXMgaW4gdG9rZW5cIiB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgdmFyIF9pZCA9IGRlY29kZWQudXNlcmlkO1xyXG5cclxuICAgICAgICAgIHNxbC5jb25uZWN0KGRiKVxyXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbihjb25uZWN0aW9uKSB7XHJcbiAgICAgICAgICAgICAgbmV3IHNxbC5SZXF1ZXN0KGNvbm5lY3Rpb24pXHJcbiAgICAgICAgICAgICAgICAucXVlcnkoYFNFTEVDVCAqIEZST00gVXNlcnMgV0hFUkUgdXNlcklEID0gJHtfaWR9YClcclxuICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKHVzZXIpIHtcclxuICAgICAgICAgICAgICAgICAgdmFyIGhhc1NvbWUgPSBkYXRhLnJlcXVpcmVkQXV0aC5zb21lKGZ1bmN0aW9uKHYpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdXNlclswXS51c2VyVHlwZS5pbmRleE9mKHYpID49IDA7XHJcbiAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgIGlmIChoYXNTb21lKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgICAgICAgIGRhdGEuZG9uZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyLnN0YWNrKTtcclxuICAgICAgICAgICAgICAgICAgICAgIHRocm93IFwiVGhlcmUgd2FzIGFuIGlzc3VlIGluIHRoZSBsb2dpYyBkb25lIGFmdGVyIHRoZSBhdXRoZW50aWNhdGlvblwiOyAvLyBUaGlzIHdpbGwgdGhyb3cgdG8gY2F0Y2ggb24gbGluZSA4M1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICByZXMuc2VuZCh7IHN0YXR1czogJzQwMycgfSk7XHJcbiAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGVycikge1xyXG4gICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yIC0gR2V0IHVzZXIgYnkgaWQ6IFwiICsgZXJyKTtcclxuICAgICAgICAgICAgICAgICAgcmVzLnNlbmQoeyByZXN1bHQ6IFwiZXJyb3JcIiwgdGl0bGU6IFwiRXJyb3JcIiwgbXNnOiBcIlRoZXJlIHdhcyBhbiBlcnJvciBhdXRoZW50aWNhdGluZyB0aGUgY3VycmVudCB1c2VyLlwiLCBzZXJ2ZXJNc2c6IFwiXCIgfSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XHJcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJEQiBDb25uZWN0aW9uIGVycm9yIC0gQXV0aGVudGljYXRlIHVzZXI6IFwiICsgZXJyKTtcclxuICAgICAgICAgICAgICByZXMuc2VuZCh7IHJlc3VsdDogXCJlcnJvclwiLCB0aXRsZTogXCJDb25uZWN0aW9uIEVycm9yXCIsIG1zZzogXCJUaGVyZSB3YXMgYW4gZXJyb3IgY29ubmVjdGluZyB0byB0aGUgZGF0YWJhc2UuXCIsIHNlcnZlck1zZzogZXJyIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmVzLnNlbmQoeyBlcnJvcjogXCJObyBhdXRoIGhlYWRlclwiIH0pO1xyXG4gICAgICB9XHJcbiAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgY29uc29sZS5sb2coXCJFcnJvciAtIEF1dGhlbnRpY2F0ZSB1c2VyOiBcIiArIGVycik7XHJcbiAgICAgIHJlcy5zZW5kKHsgcmVzdWx0OiBcImVycm9yXCIsIHRpdGxlOiBcIkVycm9yXCIsIG1zZzogXCJUaGVyZSB3YXMgYW4gZXJyb3IgYXV0aGVudGljYXRpbmcgdGhlIGN1cnJlbnQgdXNlci5cIiwgc2VydmVyTXNnOiBcIlwiIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcmVzZXRQYXNzd29yZChyZXE6IGV4cHJlc3MuUmVxdWVzdCwgcmVzOiBleHByZXNzLlJlc3BvbnNlKTogdm9pZCB7XHJcbiAgICB0cnkge1xyXG4gICAgICB2YXIgX3VzZXJJRDogc3RyaW5nID0gcmVxLmJvZHkudXNlcklEO1xyXG4gICAgICB2YXIgX3Bhc3N3b3JkOiBzdHJpbmcgPSByZXEuYm9keS5wYXNzd29yZDtcclxuICAgICAgdmFyIHNhbHQgPSBiY3J5cHQuZ2VuU2FsdFN5bmMoMTApO1xyXG4gICAgICAvLyBIYXNoIHRoZSBwYXNzd29yZCB3aXRoIHRoZSBzYWx0XHJcbiAgICAgIF9wYXNzd29yZCA9IGJjcnlwdC5oYXNoU3luYyhfcGFzc3dvcmQsIHNhbHQpO1xyXG5cclxuICAgICAgc3FsLmNvbm5lY3QoZGIpXHJcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24oY29ubmVjdGlvbikge1xyXG4gICAgICAgICAgc3FsLnF1ZXJ5XHJcbiAgICAgICAgICAgIGBVUERBVEUgVXNlcnMgU0VUIHBhc3N3b3JkPSR7X3Bhc3N3b3JkfSwgYWN0aXZlPSd0cnVlJyBXSEVSRSB1c2VySUQgPSAke191c2VySUR9YFxyXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbihyZWNvcmRzZXQpIHtcclxuICAgICAgICAgICAgICByZXMuc2VuZCh7IHJlc3VsdDogXCJzdWNjZXNzXCIsIHRpdGxlOiBcIlN1Y2Nlc3MhXCIsIG1zZzogXCJQbGVhc2UgbG9nIGluIHVzaW5nIHlvdXIgbmV3IHBhc3N3b3JkLlwiLCBzZXJ2ZXJNc2c6IFwiXCIgfSk7XHJcbiAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGVycikge1xyXG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiVXBkYXRlIHVzZXIgcGFzc3dvcmQgXCIgKyBlcnIpO1xyXG4gICAgICAgICAgICAgIHJlcy5zZW5kKHsgcmVzdWx0OiBcImVycm9yXCIsIHRpdGxlOiBcIkVycm9yXCIsIG1zZzogXCJUaGVyZSB3YXMgYW4gZXJyb3IgcmVzZXR0aW5nIHlvdXIgcGFzc3dvcmQuXCIsIHNlcnZlck1zZzogXCJcIiB9KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xyXG4gICAgICAgICAgcmVzLnNlbmQoeyByZXN1bHQ6IFwiZXJyb3JcIiwgdGl0bGU6IFwiQ29ubmVjdGlvbiBFcnJvclwiLCBtc2c6IFwiVGhlcmUgd2FzIGFuIGVycm9yIGNvbm5lY3RpbmcgdG8gdGhlIGRhdGFiYXNlLlwiLCBzZXJ2ZXJNc2c6IFwiXCIgfSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3IgLSBSZXNldCBwYXNzd29yZDogXCIgKyBlcnIpO1xyXG4gICAgICByZXMuc2VuZCh7IHJlc3VsdDogXCJlcnJvclwiLCB0aXRsZTogXCJFcnJvclwiLCBtc2c6IFwiVGhlcmUgd2FzIGFuIGVycm9yIHJlc2V0dGluZyB5b3VyIHBhc3N3b3JkLlwiLCBzZXJ2ZXJNc2c6IFwiXCIgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICByZXF1ZXN0UmVzZXQocmVxOiBleHByZXNzLlJlcXVlc3QsIHJlczogZXhwcmVzcy5SZXNwb25zZSk6IHZvaWQge1xyXG4gICAgdHJ5IHtcclxuICAgICAgdmFyIF9lbWFpbDogc3RyaW5nID0gcmVxLnBhcmFtcy5fZW1haWw7XHJcbiAgICAgIHZhciByZSA9IC9eKChbXjw+KClbXFxdXFxcXC4sOzpcXHNAXFxcIl0rKFxcLltePD4oKVtcXF1cXFxcLiw7Olxcc0BcXFwiXSspKil8KFxcXCIuK1xcXCIpKUAoKFxcW1swLTldezEsM31cXC5bMC05XXsxLDN9XFwuWzAtOV17MSwzfVxcLlswLTldezEsM31cXF0pfCgoW2EtekEtWlxcLTAtOV0rXFwuKStbYS16QS1aXXsyLH0pKSQvO1xyXG4gICAgICB2YXIgZW1haWxWYWxpZGF0aW9uID0gcmUudGVzdChfZW1haWwpO1xyXG4gICAgICB2YXIgcmFuZG9tc3RyaW5nID0gTWF0aC5yYW5kb20oKS50b1N0cmluZygzNikuc2xpY2UoLTgpO1xyXG4gICAgICByYW5kb21zdHJpbmcgPSByYW5kb21zdHJpbmcuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyByYW5kb21zdHJpbmcuc2xpY2UoMSk7XHJcbiAgICAgIHZhciBzYWx0ID0gYmNyeXB0LmdlblNhbHRTeW5jKDEwKTtcclxuICAgICAgLy8gSGFzaCB0aGUgcGFzc3dvcmQgd2l0aCB0aGUgc2FsdFxyXG4gICAgICB2YXIgX3Bhc3N3b3JkID0gYmNyeXB0Lmhhc2hTeW5jKHJhbmRvbXN0cmluZywgc2FsdCk7XHJcbiAgICAgIGlmICghZW1haWxWYWxpZGF0aW9uKSB7XHJcbiAgICAgICAgcmVzLnNlbmQoeyByZXN1bHQ6IFwiaW52YWxpZFwiLCB0aXRsZTogXCJJbnZhbGlkXCIsIG1zZzogXCJQbGVhc2UgZW50ZXIgYSBwcm9wZXIgZW1haWwgYWRkcmVzcy4gKGV4YW1wbGVAZW1haWwuY29tKVwiLCBzZXJ2ZXJNc2c6IFwiXCIgfSlcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBzcWwuY29ubmVjdChkYilcclxuICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKGNvbm5lY3Rpb24pIHtcclxuICAgICAgICAgICAgbmV3IHNxbC5SZXF1ZXN0KGNvbm5lY3Rpb24pXHJcbiAgICAgICAgICAgICAgLnF1ZXJ5KGBVUERBVEUgVXNlcnMgU0VUIHBhc3N3b3JkID0gJyR7X3Bhc3N3b3JkfScsIGFjdGl2ZSA9ICdmYWxzZScgV0hFUkUgZW1haWwgPSAnJHtfZW1haWx9J2ApXHJcbiAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXN1bHQpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHJlc3VsdCAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgIC8vIHNldHVwIGVtYWlsIGRhdGEgd2l0aCB1bmljb2RlIHN5bWJvbHNcclxuICAgICAgICAgICAgICAgICAgbGV0IG1haWxPcHRpb25zID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIGZyb206IG1haWwudXNlciwgLy8gc2VuZGVyIGFkZHJlc3NcclxuICAgICAgICAgICAgICAgICAgICB0bzogX2VtYWlsLCAvLyBsaXN0IG9mIHJlY2VpdmVyc1xyXG4gICAgICAgICAgICAgICAgICAgIHN1YmplY3Q6ICdQYXNzd29yZCBSZXNldCcsIC8vIFN1YmplY3QgbGluZVxyXG4gICAgICAgICAgICAgICAgICAgIHRleHQ6ICcnLCAvLyBwbGFpbiB0ZXh0IGJvZHlcclxuICAgICAgICAgICAgICAgICAgICBodG1sOiAnSGVyZSBpcyB5b3VyIG5ldyB0ZW1wb3JhcnkgcGFzc3dvcmQ6IDxiPicgKyByYW5kb21zdHJpbmcgKyAnPC9iPjxiciAvPiBQbGVhc2UgbG9naW4gYXQgJyArIHNpdGVfc2V0dGluZ3MudXJsICsgJyA8YnIgLz48YnIgLz4gVGhhbmt5b3UnLy8gaHRtbCBib2R5XHJcbiAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgIG5ldyBBY3Rpdml0eVNlcnZpY2UoKS5yZXBvcnRBY3Rpdml0eSgnUmVxdWVzdCBQYXNzd29yZCBSZXNldCcsICdzdWNjZXNzJywgJycsICdQYXNzd29yZCByZXNldCBhY2NlcHRlZC4gSW5zdHJ1Y3Rpb25zIGZvciBsb2dpbiBzZW50IHRvICcgKyBfZW1haWwgKyAnLicpO1xyXG4gICAgICAgICAgICAgICAgICBuZXcgTWFpbFNlcnZpY2UoKS5zZW5kTWVzc2FnZShcIiBSZXNldCBQYXNzd29yZFwiLCBtYWlsT3B0aW9ucyk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICBuZXcgQWN0aXZpdHlTZXJ2aWNlKCkucmVwb3J0QWN0aXZpdHkoJ1JlcXVlc3QgUGFzc3dvcmQgUmVzZXQnLCAnZmFpbCcsICcnLCAnQ291bGQgbm90IGZpbmQgdXNlciB3aXRoIGVtYWlsICcgKyBfZW1haWwgKyAnLicpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmVzLnNlbmQoeyByZXN1bHQ6IFwic3VjY2Vzc1wiLCB0aXRsZTogXCJTdWNjZXNzIVwiLCBtc2c6IFwiQ2hlY2sgeW91ciBlbWFpbCBmb3IgcmVzZXQgaW5zdHJ1Y3Rpb25zLlwiLCBzZXJ2ZXJNc2c6IFwiXCIgfSk7XHJcbiAgICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlVwZGF0ZSB1c2VyIHBhc3N3b3JkIFwiICsgZXJyKTtcclxuICAgICAgICAgICAgICAgIHJlcy5zZW5kKHsgcmVzdWx0OiBcImVycm9yXCIsIHRpdGxlOiBcIkVycm9yXCIsIG1zZzogXCJUaGVyZSB3YXMgYW4gZXJyb3IgcmVxdWVzdGluZyBwYXNzd29yZCByZXNldC5cIiwgc2VydmVyTXNnOiBcIlwiIH0pO1xyXG4gICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XHJcbiAgICAgICAgICAgIHJlcy5zZW5kKHsgcmVzdWx0OiBcImVycm9yXCIsIHRpdGxlOiBcIkNvbm5lY3Rpb24gRXJyb3JcIiwgbXNnOiBcIlRoZXJlIHdhcyBhbiBlcnJvciBjb25uZWN0aW5nIHRvIHRoZSBkYXRhYmFzZS5cIiwgc2VydmVyTXNnOiBcIlwiIH0pO1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuXHJcblxyXG4gICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3IgLSBSZXF1ZXN0IHBhc3N3b3JkIHJlc2V0OiBcIiArIGVycik7XHJcbiAgICAgIHJlcy5zZW5kKHsgcmVzdWx0OiBcImVycm9yXCIsIHRpdGxlOiBcIkVycm9yXCIsIG1zZzogXCJUaGVyZSB3YXMgYW4gZXJyb3IgcmVxdWVzdGluZyBwYXNzd29yZCByZXNldC5cIiwgc2VydmVyTXNnOiBcIlwiIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbn1cclxuZXhwb3J0ID0gQXV0aENvbnRyb2xsZXI7XHJcbiJdfQ==
