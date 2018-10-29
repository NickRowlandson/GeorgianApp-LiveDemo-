"use strict";
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const MailService = require("../services/MailService");
const ActivityService = require("../services/ActivityService");
var sql = require('mssql');
const config = require('../config');
const db = config.db;
const mail = config.mail;
const site_settings = config.site_settings;
class AuthController {
    // Login Authentication
    auth(req, res) {
        try {
            var _username = req.body.username;
            var _password = req.body.password;
            var response;
            sql.connect(db).then(pool => {
                return pool.request()
                    .input('username', sql.VarChar(100), _username)
                    .query("SELECT * FROM Users WHERE username = @username");
            }).then(user => {
                if (user.length > 0) {
                    if (bcrypt.compareSync(_password, user[0].password)) {
                        new ActivityService().reportActivity('user', user[0].userType + ' Login', 'success', '', user[0].userID, _username + ' was successfully logged in.');
                        // expires in 12 hours
                        var token = jwt.sign({ userid: user[0].userID }, "f9b574a2fc0d77986cb7ebe21a0dea480f5f21931abfa5cf329a45ecc0c8e1ff", { expiresIn: 60 * 60 * 12 });
                        var statusToken = { status: 200, body: { token: token, userID: user[0].userID, username: user[0].username, userType: user[0].userType, active: user[0].active } };
                        response = JSON.stringify(statusToken);
                    }
                    else {
                        new ActivityService().reportActivity('user', user[0].userType + ' Login', 'fail', '', user[0].userID, _username + ' attempted to log in but entered the wrong password.');
                        response = false;
                    }
                }
                else {
                    new ActivityService().reportActivity('user', 'Login', 'fail', '', '', 'Attempted login as: ' + _username + '. This username does not exist.');
                    response = false;
                }
                res.send(response);
            }).catch(function (err) {
                console.log("Error - Login: " + err);
                res.send({ result: "error", title: "Error", msg: "There was an error with your request.", serverMsg: "" });
            });
        }
        catch (err) {
            console.log("Error - Login: " + err);
            res.send({ result: "error", title: "Error", msg: "There was an error logging in.", serverMsg: "" });
        }
    }
    //Decode token and check if user is authorized
    authUser(req, res, data) {
        try {
            if (req.headers && req.headers.authorization) {
                jwt.verify(req.headers.authorization, 'f9b574a2fc0d77986cb7ebe21a0dea480f5f21931abfa5cf329a45ecc0c8e1ff', function (err, decoded) {
                    if (err) {
                        if (err.name === 'TokenExpiredError') {
                            var msg = "Session expired";
                        }
                        else {
                            var msg = "There was an error in your request. Please try logging in again.";
                        }
                        console.log("Error - Authenticate user (Token Verification Error): " + err);
                        return res.send({ result: "error", title: "Auth Error", msg: msg, serverMsg: "" });
                    }
                    else {
                        if (decoded === null || Object.keys(decoded).length === 0) {
                            console.log("Error - Authenticate user (No values in token): " + err);
                            return res.send({ result: "error", title: "Auth Error", msg: "There was an error in your request. Please try logging in again.", serverMsg: "" });
                        }
                    }
                    sql.connect(db).then(pool => {
                        return pool.request()
                            .input('userID', sql.Int(), decoded.userid)
                            .query("SELECT * FROM Users WHERE userID = @userID");
                    }).then(user => {
                        var hasSome = data.requiredAuth.some(function (v) {
                            return user[0].userType.indexOf(v) >= 0;
                        });
                        if (hasSome) {
                            try {
                                data.done(decoded.userid);
                            }
                            catch (err) {
                                console.log(err.stack);
                                throw "There was an issue in the logic done after the authentication"; // This will throw to catch on line 83
                            }
                        }
                        else {
                            console.log("Error - Authenticate user (userID in token not found in DB): " + err);
                            res.send({ result: "error", title: "Auth Error", msg: "There was an error in your request. Please try logging in again.", serverMsg: "" });
                        }
                    }).catch(function (err) {
                        console.log("Error - Authenticate user (Select Query): " + err);
                        res.send({ result: "error", title: "Auth Error", msg: "There was an error in your request. Please try logging in again.", serverMsg: "" });
                    });
                });
            }
            else {
                console.log("Error - Authenticate user: No Headers.");
                res.send({ result: "error", title: "Auth Error", msg: "There was an error in your request. Please try logging in again.", serverMsg: "" });
            }
        }
        catch (err) {
            console.log("Error - Authenticate user (Catch): " + err);
            res.send({ result: "error", title: "Auth Error", msg: "There was an error in your request. Please try logging in again.", serverMsg: "" });
        }
    }
    resetPassword(req, res) {
        try {
            var _userID = req.body.userID;
            var _password = req.body.password;
            var salt = bcrypt.genSaltSync(10);
            // Hash the password with the salt
            _password = bcrypt.hashSync(_password, salt);
            sql.connect(db).then(pool => {
                return pool.request()
                    .input('password', sql.VarChar(250), _password)
                    .input('userID', sql.Int(), _userID)
                    .query("UPDATE Users SET password = @password, active = 'true' WHERE userID = @userID");
            }).then(result => {
                res.send({ result: "success", title: "Success!", msg: "Please log in using your new password.", serverMsg: "" });
            }).catch(function (err) {
                console.log(err);
                res.send({ result: "error", title: "Error", msg: "There was an error with your request.", serverMsg: err.message });
            });
        }
        catch (err) {
            console.log("Error - Reset password: " + err);
            res.send({ result: "error", title: "Error", msg: "There was an error resetting your password.", serverMsg: "" });
        }
    }
    requestReset(req, res) {
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
                sql.connect(db).then(pool => {
                    return pool.request()
                        .input('password', sql.VarChar(250), _password)
                        .input('email', sql.VarChar(100), _email)
                        .query("UPDATE Users SET password = @password, active = 'false' WHERE email = @email; SELECT @@rowcount as 'RowsAffected'");
                }).then(result => {
                    console.dir(result);
                    if (result != null) {
                        // setup email data with unicode symbols
                        let mailOptions = {
                            from: mail.user,
                            to: _email,
                            subject: 'Password Reset',
                            text: '',
                            html: 'Here is your new temporary password: <b>' + randomstring + '</b><br /> Please login at ' + site_settings.url + ' <br /><br /> Thankyou' // html body
                        };
                        new ActivityService().reportActivity('user', 'Request Password Reset', 'success', '', '', 'Password reset accepted. Instructions for login sent to ' + _email + '.');
                        new MailService().sendMessage(" Reset Password", mailOptions);
                    }
                    else {
                        new ActivityService().reportActivity('user', 'Request Password Reset', 'fail', '', '', 'Could not find user with email ' + _email + '.');
                    }
                    res.send({ result: "success", title: "Success!", msg: "Check your email for reset instructions.", serverMsg: "" });
                }).catch(function (err) {
                    console.log(err);
                    res.send({ result: "error", title: "Error", msg: "There was an error with your request.", serverMsg: err.message });
                });
            }
        }
        catch (err) {
            console.log("Error - Request password reset: " + err);
            res.send({ result: "error", title: "Error", msg: "There was an error requesting password reset.", serverMsg: "" });
        }
    }
}
module.exports = AuthController;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NlcnZlci9zcmMvY29udHJvbGxlcnMvQXV0aENvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUNBLG9DQUFxQztBQUNyQyxpQ0FBa0M7QUFDbEMsTUFBTSxXQUFXLEdBQUcsT0FBTyxDQUFDLHlCQUF5QixDQUFDLENBQUM7QUFDdkQsTUFBTSxlQUFlLEdBQUcsT0FBTyxDQUFDLDZCQUE2QixDQUFDLENBQUM7QUFDL0QsSUFBSSxHQUFHLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQzNCLE1BQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQztBQUNwQyxNQUFNLEVBQUUsR0FBRyxNQUFNLENBQUMsRUFBRSxDQUFDO0FBQ3JCLE1BQU0sSUFBSSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUM7QUFDekIsTUFBTSxhQUFhLEdBQUcsTUFBTSxDQUFDLGFBQWEsQ0FBQztBQUUzQztJQUVFLHVCQUF1QjtJQUN2QixJQUFJLENBQUMsR0FBb0IsRUFBRSxHQUFxQjtRQUM5QyxJQUFJO1lBQ0YsSUFBSSxTQUFTLEdBQVcsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7WUFDMUMsSUFBSSxTQUFTLEdBQVcsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7WUFDMUMsSUFBSSxRQUFRLENBQUM7WUFFYixHQUFHLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRTtnQkFDMUIsT0FBTyxJQUFJLENBQUMsT0FBTyxFQUFFO3FCQUNwQixLQUFLLENBQUMsVUFBVSxFQUFFLEdBQUcsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEVBQUUsU0FBUyxDQUFDO3FCQUM5QyxLQUFLLENBQUMsZ0RBQWdELENBQUMsQ0FBQTtZQUMxRCxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUU7Z0JBQ2IsSUFBSSxJQUFJLENBQUMsTUFBTSxHQUFH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QUMsa0NBQWtDLEdBQUcsR0FBRyxDQUFDLENBQUM7WUFDdEQsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxHQUFHLEVBQUUsK0NBQStDLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7U0FDcEg7SUFDSCxDQUFDO0NBRUY7QUFDRCxpQkFBUyxjQUFjLENBQUMiLCJmaWxlIjoiY29udHJvbGxlcnMvQXV0aENvbnRyb2xsZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgZXhwcmVzcyA9IHJlcXVpcmUoXCJleHByZXNzXCIpO1xyXG5pbXBvcnQgand0ID0gcmVxdWlyZSgnanNvbndlYnRva2VuJyk7XHJcbmltcG9ydCBiY3J5cHQgPSByZXF1aXJlKCdiY3J5cHQnKTtcclxuY29uc3QgTWFpbFNlcnZpY2UgPSByZXF1aXJlKFwiLi4vc2VydmljZXMvTWFpbFNlcnZpY2VcIik7XHJcbmNvbnN0IEFjdGl2aXR5U2VydmljZSA9IHJlcXVpcmUoXCIuLi9zZXJ2aWNlcy9BY3Rpdml0eVNlcnZpY2VcIik7XHJcbnZhciBzcWwgPSByZXF1aXJlKCdtc3NxbCcpO1xyXG5jb25zdCBjb25maWcgPSByZXF1aXJlKCcuLi9jb25maWcnKTtcclxuY29uc3QgZGIgPSBjb25maWcuZGI7XHJcbmNvbnN0IG1haWwgPSBjb25maWcubWFpbDtcclxuY29uc3Qgc2l0ZV9zZXR0aW5ncyA9IGNvbmZpZy5zaXRlX3NldHRpbmdzO1xyXG5cclxuY2xhc3MgQXV0aENvbnRyb2xsZXIge1xyXG5cclxuICAvLyBMb2dpbiBBdXRoZW50aWNhdGlvblxyXG4gIGF1dGgocmVxOiBleHByZXNzLlJlcXVlc3QsIHJlczogZXhwcmVzcy5SZXNwb25zZSk6IHZvaWQge1xyXG4gICAgdHJ5IHtcclxuICAgICAgdmFyIF91c2VybmFtZTogc3RyaW5nID0gcmVxLmJvZHkudXNlcm5hbWU7XHJcbiAgICAgIHZhciBfcGFzc3dvcmQ6IHN0cmluZyA9IHJlcS5ib2R5LnBhc3N3b3JkO1xyXG4gICAgICB2YXIgcmVzcG9uc2U7XHJcblxyXG4gICAgICBzcWwuY29ubmVjdChkYikudGhlbihwb29sID0+IHtcclxuICAgICAgICByZXR1cm4gcG9vbC5yZXF1ZXN0KClcclxuICAgICAgICAuaW5wdXQoJ3VzZXJuYW1lJywgc3FsLlZhckNoYXIoMTAwKSwgX3VzZXJuYW1lKVxyXG4gICAgICAgIC5xdWVyeShcIlNFTEVDVCAqIEZST00gVXNlcnMgV0hFUkUgdXNlcm5hbWUgPSBAdXNlcm5hbWVcIilcclxuICAgICAgfSkudGhlbih1c2VyID0+IHtcclxuICAgICAgICBpZiAodXNlci5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICBpZiAoYmNyeXB0LmNvbXBhcmVTeW5jKF9wYXNzd29yZCwgdXNlclswXS5wYXNzd29yZCkpIHtcclxuICAgICAgICAgICAgbmV3IEFjdGl2aXR5U2VydmljZSgpLnJlcG9ydEFjdGl2aXR5KCd1c2VyJywgdXNlclswXS51c2VyVHlwZSArICcgTG9naW4nLCAnc3VjY2VzcycsICcnLCB1c2VyWzBdLnVzZXJJRCwgX3VzZXJuYW1lICsgJyB3YXMgc3VjY2Vzc2Z1bGx5IGxvZ2dlZCBpbi4nKTtcclxuICAgICAgICAgICAgLy8gZXhwaXJlcyBpbiAxMiBob3Vyc1xyXG4gICAgICAgICAgICB2YXIgdG9rZW4gPSBqd3Quc2lnbih7IHVzZXJpZDogdXNlclswXS51c2VySUQgfSwgXCJmOWI1NzRhMmZjMGQ3Nzk4NmNiN2ViZTIxYTBkZWE0ODBmNWYyMTkzMWFiZmE1Y2YzMjlhNDVlY2MwYzhlMWZmXCIsIHtleHBpcmVzSW46IDYwKjYwKjEyfSk7XHJcbiAgICAgICAgICAgIHZhciBzdGF0dXNUb2tlbiA9IHsgc3RhdHVzOiAyMDAsIGJvZHk6IHsgdG9rZW46IHRva2VuLCB1c2VySUQ6IHVzZXJbMF0udXNlcklELCB1c2VybmFtZTogdXNlclswXS51c2VybmFtZSwgdXNlclR5cGU6IHVzZXJbMF0udXNlclR5cGUsIGFjdGl2ZTogdXNlclswXS5hY3RpdmUgfSB9O1xyXG4gICAgICAgICAgICByZXNwb25zZSA9IEpTT04uc3RyaW5naWZ5KHN0YXR1c1Rva2VuKTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIG5ldyBBY3Rpdml0eVNlcnZpY2UoKS5yZXBvcnRBY3Rpdml0eSgndXNlcicsIHVzZXJbMF0udXNlclR5cGUgKyAnIExvZ2luJywgJ2ZhaWwnLCAnJywgdXNlclswXS51c2VySUQsIF91c2VybmFtZSArICcgYXR0ZW1wdGVkIHRvIGxvZyBpbiBidXQgZW50ZXJlZCB0aGUgd3JvbmcgcGFzc3dvcmQuJyk7XHJcbiAgICAgICAgICAgIHJlc3BvbnNlID0gZmFsc2U7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIG5ldyBBY3Rpdml0eVNlcnZpY2UoKS5yZXBvcnRBY3Rpdml0eSgndXNlcicsICdMb2dpbicsICdmYWlsJywgJycsICcnLCAnQXR0ZW1wdGVkIGxvZ2luIGFzOiAnICsgX3VzZXJuYW1lICsgJy4gVGhpcyB1c2VybmFtZSBkb2VzIG5vdCBleGlzdC4nKTtcclxuICAgICAgICAgIHJlc3BvbnNlID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJlcy5zZW5kKHJlc3BvbnNlKTtcclxuICAgICAgfSkuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJFcnJvciAtIExvZ2luOiBcIiArIGVycik7XHJcbiAgICAgICAgcmVzLnNlbmQoeyByZXN1bHQ6IFwiZXJyb3JcIiwgdGl0bGU6IFwiRXJyb3JcIiwgbXNnOiBcIlRoZXJlIHdhcyBhbiBlcnJvciB3aXRoIHlvdXIgcmVxdWVzdC5cIiwgc2VydmVyTXNnOiBcIlwiIH0pO1xyXG4gICAgICB9KTtcclxuICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICBjb25zb2xlLmxvZyhcIkVycm9yIC0gTG9naW46IFwiICsgZXJyKTtcclxuICAgICAgcmVzLnNlbmQoeyByZXN1bHQ6IFwiZXJyb3JcIiwgdGl0bGU6IFwiRXJyb3JcIiwgbXNnOiBcIlRoZXJlIHdhcyBhbiBlcnJvciBsb2dnaW5nIGluLlwiLCBzZXJ2ZXJNc2c6IFwiXCIgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvL0RlY29kZSB0b2tlbiBhbmQgY2hlY2sgaWYgdXNlciBpcyBhdXRob3JpemVkXHJcbiAgYXV0aFVzZXIocmVxOiBleHByZXNzLlJlcXVlc3QsIHJlczogZXhwcmVzcy5SZXNwb25zZSwgZGF0YSk6IHZvaWQge1xyXG4gICAgdHJ5IHtcclxuICAgICAgaWYgKHJlcS5oZWFkZXJzICYmIHJlcS5oZWFkZXJzLmF1dGhvcml6YXRpb24pIHtcclxuICAgICAgICBqd3QudmVyaWZ5KHJlcS5oZWFkZXJzLmF1dGhvcml6YXRpb24sICdmOWI1NzRhMmZjMGQ3Nzk4NmNiN2ViZTIxYTBkZWE0ODBmNWYyMTkzMWFiZmE1Y2YzMjlhNDVlY2MwYzhlMWZmJywgZnVuY3Rpb24oZXJyLCBkZWNvZGVkKSB7XHJcbiAgICAgICAgICBpZiAoZXJyKSB7XHJcbiAgICAgICAgICAgIGlmIChlcnIubmFtZSA9PT0gJ1Rva2VuRXhwaXJlZEVycm9yJykge1xyXG4gICAgICAgICAgICAgIHZhciBtc2cgPSBcIlNlc3Npb24gZXhwaXJlZFwiO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIHZhciBtc2cgPSBcIlRoZXJlIHdhcyBhbiBlcnJvciBpbiB5b3VyIHJlcXVlc3QuIFBsZWFzZSB0cnkgbG9nZ2luZyBpbiBhZ2Fpbi5cIjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yIC0gQXV0aGVudGljYXRlIHVzZXIgKFRva2VuIFZlcmlmaWNhdGlvbiBFcnJvcik6IFwiICsgZXJyKTtcclxuICAgICAgICAgICAgcmV0dXJuIHJlcy5zZW5kKHsgcmVzdWx0OiBcImVycm9yXCIsIHRpdGxlOiBcIkF1dGggRXJyb3JcIiwgbXNnOiBtc2csIHNlcnZlck1zZzogXCJcIiB9KTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGlmIChkZWNvZGVkID09PSBudWxsIHx8IE9iamVjdC5rZXlzKGRlY29kZWQpLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3IgLSBBdXRoZW50aWNhdGUgdXNlciAoTm8gdmFsdWVzIGluIHRva2VuKTogXCIgKyBlcnIpO1xyXG4gICAgICAgICAgICAgIHJldHVybiByZXMuc2VuZCh7IHJlc3VsdDogXCJlcnJvclwiLCB0aXRsZTogXCJBdXRoIEVycm9yXCIsIG1zZzogXCJUaGVyZSB3YXMgYW4gZXJyb3IgaW4geW91ciByZXF1ZXN0LiBQbGVhc2UgdHJ5IGxvZ2dpbmcgaW4gYWdhaW4uXCIsIHNlcnZlck1zZzogXCJcIiB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgc3FsLmNvbm5lY3QoZGIpLnRoZW4ocG9vbCA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiBwb29sLnJlcXVlc3QoKVxyXG4gICAgICAgICAgICAuaW5wdXQoJ3VzZXJJRCcsIHNxbC5JbnQoKSwgZGVjb2RlZC51c2VyaWQpXHJcbiAgICAgICAgICAgIC5xdWVyeShcIlNFTEVDVCAqIEZST00gVXNlcnMgV0hFUkUgdXNlcklEID0gQHVzZXJJRFwiKVxyXG4gICAgICAgICAgfSkudGhlbih1c2VyID0+IHtcclxuICAgICAgICAgICAgICB2YXIgaGFzU29tZSA9IGRhdGEucmVxdWlyZWRBdXRoLnNvbWUoZnVuY3Rpb24odikge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHVzZXJbMF0udXNlclR5cGUuaW5kZXhPZih2KSA+PSAwO1xyXG4gICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgIGlmIChoYXNTb21lKSB7XHJcbiAgICAgICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgICBkYXRhLmRvbmUoZGVjb2RlZC51c2VyaWQpO1xyXG4gICAgICAgICAgICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVyci5zdGFjayk7XHJcbiAgICAgICAgICAgICAgICAgIHRocm93IFwiVGhlcmUgd2FzIGFuIGlzc3VlIGluIHRoZSBsb2dpYyBkb25lIGFmdGVyIHRoZSBhdXRoZW50aWNhdGlvblwiOyAvLyBUaGlzIHdpbGwgdGhyb3cgdG8gY2F0Y2ggb24gbGluZSA4M1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yIC0gQXV0aGVudGljYXRlIHVzZXIgKHVzZXJJRCBpbiB0b2tlbiBub3QgZm91bmQgaW4gREIpOiBcIiArIGVycik7XHJcbiAgICAgICAgICAgICAgICByZXMuc2VuZCh7IHJlc3VsdDogXCJlcnJvclwiLCB0aXRsZTogXCJBdXRoIEVycm9yXCIsIG1zZzogXCJUaGVyZSB3YXMgYW4gZXJyb3IgaW4geW91ciByZXF1ZXN0LiBQbGVhc2UgdHJ5IGxvZ2dpbmcgaW4gYWdhaW4uXCIsIHNlcnZlck1zZzogXCJcIiB9KTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGVycikge1xyXG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3IgLSBBdXRoZW50aWNhdGUgdXNlciAoU2VsZWN0IFF1ZXJ5KTogXCIgKyBlcnIpO1xyXG4gICAgICAgICAgICAgIHJlcy5zZW5kKHsgcmVzdWx0OiBcImVycm9yXCIsIHRpdGxlOiBcIkF1dGggRXJyb3JcIiwgbXNnOiBcIlRoZXJlIHdhcyBhbiBlcnJvciBpbiB5b3VyIHJlcXVlc3QuIFBsZWFzZSB0cnkgbG9nZ2luZyBpbiBhZ2Fpbi5cIiwgc2VydmVyTXNnOiBcIlwiIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yIC0gQXV0aGVudGljYXRlIHVzZXI6IE5vIEhlYWRlcnMuXCIpO1xyXG4gICAgICAgIHJlcy5zZW5kKHsgcmVzdWx0OiBcImVycm9yXCIsIHRpdGxlOiBcIkF1dGggRXJyb3JcIiwgbXNnOiBcIlRoZXJlIHdhcyBhbiBlcnJvciBpbiB5b3VyIHJlcXVlc3QuIFBsZWFzZSB0cnkgbG9nZ2luZyBpbiBhZ2Fpbi5cIiwgc2VydmVyTXNnOiBcIlwiIH0pO1xyXG4gICAgICB9XHJcbiAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgY29uc29sZS5sb2coXCJFcnJvciAtIEF1dGhlbnRpY2F0ZSB1c2VyIChDYXRjaCk6IFwiICsgZXJyKTtcclxuICAgICAgcmVzLnNlbmQoeyByZXN1bHQ6IFwiZXJyb3JcIiwgdGl0bGU6IFwiQXV0aCBFcnJvclwiLCBtc2c6IFwiVGhlcmUgd2FzIGFuIGVycm9yIGluIHlvdXIgcmVxdWVzdC4gUGxlYXNlIHRyeSBsb2dnaW5nIGluIGFnYWluLlwiLCBzZXJ2ZXJNc2c6IFwiXCIgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICByZXNldFBhc3N3b3JkKHJlcTogZXhwcmVzcy5SZXF1ZXN0LCByZXM6IGV4cHJlc3MuUmVzcG9uc2UpOiB2b2lkIHtcclxuICAgIHRyeSB7XHJcbiAgICAgIHZhciBfdXNlcklEOiBzdHJpbmcgPSByZXEuYm9keS51c2VySUQ7XHJcbiAgICAgIHZhciBfcGFzc3dvcmQ6IHN0cmluZyA9IHJlcS5ib2R5LnBhc3N3b3JkO1xyXG4gICAgICB2YXIgc2FsdCA9IGJjcnlwdC5nZW5TYWx0U3luYygxMCk7XHJcbiAgICAgIC8vIEhhc2ggdGhlIHBhc3N3b3JkIHdpdGggdGhlIHNhbHRcclxuICAgICAgX3Bhc3N3b3JkID0gYmNyeXB0Lmhhc2hTeW5jKF9wYXNzd29yZCwgc2FsdCk7XHJcblxyXG4gICAgICBzcWwuY29ubmVjdChkYikudGhlbihwb29sID0+IHtcclxuICAgICAgICByZXR1cm4gcG9vbC5yZXF1ZXN0KClcclxuICAgICAgICAuaW5wdXQoJ3Bhc3N3b3JkJywgc3FsLlZhckNoYXIoMjUwKSwgX3Bhc3N3b3JkKVxyXG4gICAgICAgIC5pbnB1dCgndXNlcklEJywgc3FsLkludCgpLCBfdXNlcklEKVxyXG4gICAgICAgIC5xdWVyeShcIlVQREFURSBVc2VycyBTRVQgcGFzc3dvcmQgPSBAcGFzc3dvcmQsIGFjdGl2ZSA9ICd0cnVlJyBXSEVSRSB1c2VySUQgPSBAdXNlcklEXCIpXHJcbiAgICAgIH0pLnRoZW4ocmVzdWx0ID0+IHtcclxuICAgICAgICAgIHJlcy5zZW5kKHsgcmVzdWx0OiBcInN1Y2Nlc3NcIiwgdGl0bGU6IFwiU3VjY2VzcyFcIiwgbXNnOiBcIlBsZWFzZSBsb2cgaW4gdXNpbmcgeW91ciBuZXcgcGFzc3dvcmQuXCIsIHNlcnZlck1zZzogXCJcIiB9KTtcclxuICAgICAgfSkuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coZXJyKTtcclxuICAgICAgICByZXMuc2VuZCh7IHJlc3VsdDogXCJlcnJvclwiLCB0aXRsZTogXCJFcnJvclwiLCBtc2c6IFwiVGhlcmUgd2FzIGFuIGVycm9yIHdpdGggeW91ciByZXF1ZXN0LlwiLCBzZXJ2ZXJNc2c6IGVyci5tZXNzYWdlIH0pO1xyXG4gICAgICB9KTtcclxuXHJcbiAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgY29uc29sZS5sb2coXCJFcnJvciAtIFJlc2V0IHBhc3N3b3JkOiBcIiArIGVycik7XHJcbiAgICAgIHJlcy5zZW5kKHsgcmVzdWx0OiBcImVycm9yXCIsIHRpdGxlOiBcIkVycm9yXCIsIG1zZzogXCJUaGVyZSB3YXMgYW4gZXJyb3IgcmVzZXR0aW5nIHlvdXIgcGFzc3dvcmQuXCIsIHNlcnZlck1zZzogXCJcIiB9KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHJlcXVlc3RSZXNldChyZXE6IGV4cHJlc3MuUmVxdWVzdCwgcmVzOiBleHByZXNzLlJlc3BvbnNlKTogdm9pZCB7XHJcbiAgICB0cnkge1xyXG4gICAgICB2YXIgX2VtYWlsOiBzdHJpbmcgPSByZXEucGFyYW1zLl9lbWFpbDtcclxuICAgICAgdmFyIHJlID0gL14oKFtePD4oKVtcXF1cXFxcLiw7Olxcc0BcXFwiXSsoXFwuW148PigpW1xcXVxcXFwuLDs6XFxzQFxcXCJdKykqKXwoXFxcIi4rXFxcIikpQCgoXFxbWzAtOV17MSwzfVxcLlswLTldezEsM31cXC5bMC05XXsxLDN9XFwuWzAtOV17MSwzfVxcXSl8KChbYS16QS1aXFwtMC05XStcXC4pK1thLXpBLVpdezIsfSkpJC87XHJcbiAgICAgIHZhciBlbWFpbFZhbGlkYXRpb24gPSByZS50ZXN0KF9lbWFpbCk7XHJcbiAgICAgIHZhciByYW5kb21zdHJpbmcgPSBNYXRoLnJhbmRvbSgpLnRvU3RyaW5nKDM2KS5zbGljZSgtOCk7XHJcbiAgICAgIHJhbmRvbXN0cmluZyA9IHJhbmRvbXN0cmluZy5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHJhbmRvbXN0cmluZy5zbGljZSgxKTtcclxuICAgICAgdmFyIHNhbHQgPSBiY3J5cHQuZ2VuU2FsdFN5bmMoMTApO1xyXG4gICAgICAvLyBIYXNoIHRoZSBwYXNzd29yZCB3aXRoIHRoZSBzYWx0XHJcbiAgICAgIHZhciBfcGFzc3dvcmQgPSBiY3J5cHQuaGFzaFN5bmMocmFuZG9tc3RyaW5nLCBzYWx0KTtcclxuICAgICAgaWYgKCFlbWFpbFZhbGlkYXRpb24pIHtcclxuICAgICAgICByZXMuc2VuZCh7IHJlc3VsdDogXCJpbnZhbGlkXCIsIHRpdGxlOiBcIkludmFsaWRcIiwgbXNnOiBcIlBsZWFzZSBlbnRlciBhIHByb3BlciBlbWFpbCBhZGRyZXNzLiAoZXhhbXBsZUBlbWFpbC5jb20pXCIsIHNlcnZlck1zZzogXCJcIiB9KVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgc3FsLmNvbm5lY3QoZGIpLnRoZW4ocG9vbCA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiBwb29sLnJlcXVlc3QoKVxyXG4gICAgICAgICAgICAuaW5wdXQoJ3Bhc3N3b3JkJywgc3FsLlZhckNoYXIoMjUwKSwgX3Bhc3N3b3JkKVxyXG4gICAgICAgICAgICAuaW5wdXQoJ2VtYWlsJywgc3FsLlZhckNoYXIoMTAwKSwgX2VtYWlsKVxyXG4gICAgICAgICAgICAucXVlcnkoXCJVUERBVEUgVXNlcnMgU0VUIHBhc3N3b3JkID0gQHBhc3N3b3JkLCBhY3RpdmUgPSAnZmFsc2UnIFdIRVJFIGVtYWlsID0gQGVtYWlsOyBTRUxFQ1QgQEByb3djb3VudCBhcyAnUm93c0FmZmVjdGVkJ1wiKVxyXG4gICAgICAgICAgfSkudGhlbihyZXN1bHQgPT4ge1xyXG4gICAgICAgICAgICBjb25zb2xlLmRpcihyZXN1bHQpO1xyXG4gICAgICAgICAgICBpZiAocmVzdWx0ICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAvLyBzZXR1cCBlbWFpbCBkYXRhIHdpdGggdW5pY29kZSBzeW1ib2xzXHJcbiAgICAgICAgICAgICAgbGV0IG1haWxPcHRpb25zID0ge1xyXG4gICAgICAgICAgICAgICAgZnJvbTogbWFpbC51c2VyLCAvLyBzZW5kZXIgYWRkcmVzc1xyXG4gICAgICAgICAgICAgICAgdG86IF9lbWFpbCwgLy8gbGlzdCBvZiByZWNlaXZlcnNcclxuICAgICAgICAgICAgICAgIHN1YmplY3Q6ICdQYXNzd29yZCBSZXNldCcsIC8vIFN1YmplY3QgbGluZVxyXG4gICAgICAgICAgICAgICAgdGV4dDogJycsIC8vIHBsYWluIHRleHQgYm9keVxyXG4gICAgICAgICAgICAgICAgaHRtbDogJ0hlcmUgaXMgeW91ciBuZXcgdGVtcG9yYXJ5IHBhc3N3b3JkOiA8Yj4nICsgcmFuZG9tc3RyaW5nICsgJzwvYj48YnIgLz4gUGxlYXNlIGxvZ2luIGF0ICcgKyBzaXRlX3NldHRpbmdzLnVybCArICcgPGJyIC8+PGJyIC8+IFRoYW5reW91Jy8vIGh0bWwgYm9keVxyXG4gICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgbmV3IEFjdGl2aXR5U2VydmljZSgpLnJlcG9ydEFjdGl2aXR5KCd1c2VyJywgJ1JlcXVlc3QgUGFzc3dvcmQgUmVzZXQnLCAnc3VjY2VzcycsICcnLCAnJywgJ1Bhc3N3b3JkIHJlc2V0IGFjY2VwdGVkLiBJbnN0cnVjdGlvbnMgZm9yIGxvZ2luIHNlbnQgdG8gJyArIF9lbWFpbCArICcuJyk7XHJcbiAgICAgICAgICAgICAgbmV3IE1haWxTZXJ2aWNlKCkuc2VuZE1lc3NhZ2UoXCIgUmVzZXQgUGFzc3dvcmRcIiwgbWFpbE9wdGlvbnMpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIG5ldyBBY3Rpdml0eVNlcnZpY2UoKS5yZXBvcnRBY3Rpdml0eSgndXNlcicsICdSZXF1ZXN0IFBhc3N3b3JkIFJlc2V0JywgJ2ZhaWwnLCAnJywgJycsICdDb3VsZCBub3QgZmluZCB1c2VyIHdpdGggZW1haWwgJyArIF9lbWFpbCArICcuJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmVzLnNlbmQoeyByZXN1bHQ6IFwic3VjY2Vzc1wiLCB0aXRsZTogXCJTdWNjZXNzIVwiLCBtc2c6IFwiQ2hlY2sgeW91ciBlbWFpbCBmb3IgcmVzZXQgaW5zdHJ1Y3Rpb25zLlwiLCBzZXJ2ZXJNc2c6IFwiXCIgfSk7XHJcbiAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbihlcnIpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coZXJyKTtcclxuICAgICAgICAgICAgcmVzLnNlbmQoeyByZXN1bHQ6IFwiZXJyb3JcIiwgdGl0bGU6IFwiRXJyb3JcIiwgbXNnOiBcIlRoZXJlIHdhcyBhbiBlcnJvciB3aXRoIHlvdXIgcmVxdWVzdC5cIiwgc2VydmVyTXNnOiBlcnIubWVzc2FnZSB9KTtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgY29uc29sZS5sb2coXCJFcnJvciAtIFJlcXVlc3QgcGFzc3dvcmQgcmVzZXQ6IFwiICsgZXJyKTtcclxuICAgICAgcmVzLnNlbmQoeyByZXN1bHQ6IFwiZXJyb3JcIiwgdGl0bGU6IFwiRXJyb3JcIiwgbXNnOiBcIlRoZXJlIHdhcyBhbiBlcnJvciByZXF1ZXN0aW5nIHBhc3N3b3JkIHJlc2V0LlwiLCBzZXJ2ZXJNc2c6IFwiXCIgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxufVxyXG5leHBvcnQgPSBBdXRoQ29udHJvbGxlcjtcclxuIl19
