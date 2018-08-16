"use strict";
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
            sql.connect(db).then(function (pool) {
                return pool.request()
                    .input('username', sql.VarChar(100), _username)
                    .query("SELECT * FROM Users WHERE username = @username");
            }).then(function (user) {
                if (user.length > 0) {
                    if (bcrypt.compareSync(_password, user[0].password)) {
                        new ActivityService().reportActivity('user', user[0].userType + ' Login', 'success', '', user[0].userID, _username + ' was successfully logged in.');
                        var token = jwt.sign({ userid: user[0].userID }, "f9b574a2fc0d77986cb7ebe21a0dea480f5f21931abfa5cf329a45ecc0c8e1ff");
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
                    sql.connect(db).then(function (pool) {
                        return pool.request()
                            .input('userID', sql.Int(), decoded.userid)
                            .query("SELECT * FROM Users WHERE userID = @userID");
                    }).then(function (user) {
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
                            res.send({ status: '403' });
                        }
                    }).catch(function (err) {
                        console.log("Error - Authenticate user: " + err);
                        res.send({ result: "error", title: "Error", msg: "There was an error with your request.", serverMsg: "" });
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
            sql.connect(db).then(function (pool) {
                return pool.request()
                    .input('password', sql.VarChar(250), _password)
                    .input('userID', sql.Int(), _userID)
                    .query("UPDATE Users SET password = @password, active = 'true' WHERE userID = @userID");
            }).then(function (result) {
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
                sql.connect(db).then(function (pool) {
                    return pool.request()
                        .input('password', sql.VarChar(250), _password)
                        .input('email', sql.VarChar(100), _email)
                        .query("UPDATE Users SET password = @password, active = 'false' WHERE email = @email; SELECT @@rowcount as 'RowsAffected'");
                }).then(function (result) {
                    console.dir(result);
                    if (result != null) {
                        // setup email data with unicode symbols
                        var mailOptions = {
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
    };
    return AuthController;
}());
module.exports = AuthController;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NlcnZlci9zcmMvY29udHJvbGxlcnMvQXV0aENvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUNBLGtDQUFxQztBQUNyQywrQkFBa0M7QUFDbEMsSUFBTSxXQUFXLEdBQUcsT0FBTyxDQUFDLHlCQUF5QixDQUFDLENBQUM7QUFDdkQsSUFBTSxlQUFlLEdBQUcsT0FBTyxDQUFDLDZCQUE2QixDQUFDLENBQUM7QUFDL0QsSUFBSSxHQUFHLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQzNCLElBQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQztBQUNwQyxJQUFNLEVBQUUsR0FBRyxNQUFNLENBQUMsRUFBRSxDQUFDO0FBQ3JCLElBQU0sSUFBSSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUM7QUFDekIsSUFBTSxhQUFhLEdBQUcsTUFBTSxDQUFDLGFBQWEsQ0FBQztBQUUzQztJQUFBO0lBMkpBLENBQUM7SUF6SkMsdUJBQXVCO0lBQ3ZCLDZCQUFJLEdBQUosVUFBSyxHQUFvQixFQUFFLEdBQXFCO1FBQzlDLElBQUk7WUFDRixJQUFJLFNBQVMsR0FBVyxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQztZQUMxQyxJQUFJLFNBQVMsR0FBVyxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQztZQUMxQyxJQUFJLFFBQVEsQ0FBQztZQUViLEdBQUcsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUEsSUFBSTtnQkFDdkIsT0FBTyxJQUFJLENBQUMsT0FBTyxFQUFFO3FCQUNwQixLQUFLLENBQUMsVUFBVSxFQUFFLEdBQUcsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEVBQUUsU0FBUyxDQUFDO3FCQUM5QyxLQUFLLENBQUMsZ0RBQWdELENBQUMsQ0FBQTtZQUMxRCxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQSxJQUFJO2dCQUNWLElBQUksSUFBSSxD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LFVBQVMsR0FBRztvQkFDbkIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztvQkFDakIsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxHQUFHLEVBQUUsdUNBQXVDLEVBQUUsU0FBUyxFQUFFLEdBQUcsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDO2dCQUN0SCxDQUFDLENBQUMsQ0FBQzthQUNOO1NBQ0Y7UUFBQyxPQUFPLEdBQUcsRUFBRTtZQUNaLE9BQU8sQ0FBQyxHQUFHLENBQUMsa0NBQWtDLEdBQUcsR0FBRyxDQUFDLENBQUM7WUFDdEQsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxHQUFHLEVBQUUsK0NBQStDLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7U0FDcEg7SUFDSCxDQUFDO0lBRUgscUJBQUM7QUFBRCxDQTNKQSxBQTJKQyxJQUFBO0FBQ0QsaUJBQVMsY0FBYyxDQUFDIiwiZmlsZSI6ImNvbnRyb2xsZXJzL0F1dGhDb250cm9sbGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGV4cHJlc3MgPSByZXF1aXJlKFwiZXhwcmVzc1wiKTtcclxuaW1wb3J0IGp3dCA9IHJlcXVpcmUoJ2pzb253ZWJ0b2tlbicpO1xyXG5pbXBvcnQgYmNyeXB0ID0gcmVxdWlyZSgnYmNyeXB0Jyk7XHJcbmNvbnN0IE1haWxTZXJ2aWNlID0gcmVxdWlyZShcIi4uL3NlcnZpY2VzL01haWxTZXJ2aWNlXCIpO1xyXG5jb25zdCBBY3Rpdml0eVNlcnZpY2UgPSByZXF1aXJlKFwiLi4vc2VydmljZXMvQWN0aXZpdHlTZXJ2aWNlXCIpO1xyXG52YXIgc3FsID0gcmVxdWlyZSgnbXNzcWwnKTtcclxuY29uc3QgY29uZmlnID0gcmVxdWlyZSgnLi4vY29uZmlnJyk7XHJcbmNvbnN0IGRiID0gY29uZmlnLmRiO1xyXG5jb25zdCBtYWlsID0gY29uZmlnLm1haWw7XHJcbmNvbnN0IHNpdGVfc2V0dGluZ3MgPSBjb25maWcuc2l0ZV9zZXR0aW5ncztcclxuXHJcbmNsYXNzIEF1dGhDb250cm9sbGVyIHtcclxuXHJcbiAgLy8gTG9naW4gQXV0aGVudGljYXRpb25cclxuICBhdXRoKHJlcTogZXhwcmVzcy5SZXF1ZXN0LCByZXM6IGV4cHJlc3MuUmVzcG9uc2UpOiB2b2lkIHtcclxuICAgIHRyeSB7XHJcbiAgICAgIHZhciBfdXNlcm5hbWU6IHN0cmluZyA9IHJlcS5ib2R5LnVzZXJuYW1lO1xyXG4gICAgICB2YXIgX3Bhc3N3b3JkOiBzdHJpbmcgPSByZXEuYm9keS5wYXNzd29yZDtcclxuICAgICAgdmFyIHJlc3BvbnNlO1xyXG5cclxuICAgICAgc3FsLmNvbm5lY3QoZGIpLnRoZW4ocG9vbCA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHBvb2wucmVxdWVzdCgpXHJcbiAgICAgICAgLmlucHV0KCd1c2VybmFtZScsIHNxbC5WYXJDaGFyKDEwMCksIF91c2VybmFtZSlcclxuICAgICAgICAucXVlcnkoXCJTRUxFQ1QgKiBGUk9NIFVzZXJzIFdIRVJFIHVzZXJuYW1lID0gQHVzZXJuYW1lXCIpXHJcbiAgICAgIH0pLnRoZW4odXNlciA9PiB7XHJcbiAgICAgICAgaWYgKHVzZXIubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgaWYgKGJjcnlwdC5jb21wYXJlU3luYyhfcGFzc3dvcmQsIHVzZXJbMF0ucGFzc3dvcmQpKSB7XHJcbiAgICAgICAgICAgIG5ldyBBY3Rpdml0eVNlcnZpY2UoKS5yZXBvcnRBY3Rpdml0eSgndXNlcicsIHVzZXJbMF0udXNlclR5cGUgKyAnIExvZ2luJywgJ3N1Y2Nlc3MnLCAnJywgdXNlclswXS51c2VySUQsIF91c2VybmFtZSArICcgd2FzIHN1Y2Nlc3NmdWxseSBsb2dnZWQgaW4uJyk7XHJcbiAgICAgICAgICAgIHZhciB0b2tlbiA9IGp3dC5zaWduKHsgdXNlcmlkOiB1c2VyWzBdLnVzZXJJRCB9LCBcImY5YjU3NGEyZmMwZDc3OTg2Y2I3ZWJlMjFhMGRlYTQ4MGY1ZjIxOTMxYWJmYTVjZjMyOWE0NWVjYzBjOGUxZmZcIik7XHJcbiAgICAgICAgICAgIHZhciBzdGF0dXNUb2tlbiA9IHsgc3RhdHVzOiAyMDAsIGJvZHk6IHsgdG9rZW46IHRva2VuLCB1c2VySUQ6IHVzZXJbMF0udXNlcklELCB1c2VybmFtZTogdXNlclswXS51c2VybmFtZSwgdXNlclR5cGU6IHVzZXJbMF0udXNlclR5cGUsIGFjdGl2ZTogdXNlclswXS5hY3RpdmUgfSB9O1xyXG4gICAgICAgICAgICByZXNwb25zZSA9IEpTT04uc3RyaW5naWZ5KHN0YXR1c1Rva2VuKTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIG5ldyBBY3Rpdml0eVNlcnZpY2UoKS5yZXBvcnRBY3Rpdml0eSgndXNlcicsIHVzZXJbMF0udXNlclR5cGUgKyAnIExvZ2luJywgJ2ZhaWwnLCAnJywgdXNlclswXS51c2VySUQsIF91c2VybmFtZSArICcgYXR0ZW1wdGVkIHRvIGxvZyBpbiBidXQgZW50ZXJlZCB0aGUgd3JvbmcgcGFzc3dvcmQuJyk7XHJcbiAgICAgICAgICAgIHJlc3BvbnNlID0gZmFsc2U7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIG5ldyBBY3Rpdml0eVNlcnZpY2UoKS5yZXBvcnRBY3Rpdml0eSgndXNlcicsICdMb2dpbicsICdmYWlsJywgJycsICcnLCAnQXR0ZW1wdGVkIGxvZ2luIGFzOiAnICsgX3VzZXJuYW1lICsgJy4gVGhpcyB1c2VybmFtZSBkb2VzIG5vdCBleGlzdC4nKTtcclxuICAgICAgICAgIHJlc3BvbnNlID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJlcy5zZW5kKHJlc3BvbnNlKTtcclxuICAgICAgfSkuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJFcnJvciAtIExvZ2luOiBcIiArIGVycik7XHJcbiAgICAgICAgcmVzLnNlbmQoeyByZXN1bHQ6IFwiZXJyb3JcIiwgdGl0bGU6IFwiRXJyb3JcIiwgbXNnOiBcIlRoZXJlIHdhcyBhbiBlcnJvciB3aXRoIHlvdXIgcmVxdWVzdC5cIiwgc2VydmVyTXNnOiBcIlwiIH0pO1xyXG4gICAgICB9KTtcclxuICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICBjb25zb2xlLmxvZyhcIkVycm9yIC0gTG9naW46IFwiICsgZXJyKTtcclxuICAgICAgcmVzLnNlbmQoeyByZXN1bHQ6IFwiZXJyb3JcIiwgdGl0bGU6IFwiRXJyb3JcIiwgbXNnOiBcIlRoZXJlIHdhcyBhbiBlcnJvciBsb2dnaW5nIGluLlwiLCBzZXJ2ZXJNc2c6IFwiXCIgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvL0RlY29kZSB0b2tlbiBhbmQgY2hlY2sgaWYgdXNlciBpcyBhdXRob3JpemVkXHJcbiAgYXV0aFVzZXIocmVxOiBleHByZXNzLlJlcXVlc3QsIHJlczogZXhwcmVzcy5SZXNwb25zZSwgZGF0YSk6IHZvaWQge1xyXG4gICAgdHJ5IHtcclxuICAgICAgaWYgKHJlcS5oZWFkZXJzICYmIHJlcS5oZWFkZXJzLmF1dGhvcml6YXRpb24pIHtcclxuICAgICAgICBqd3QudmVyaWZ5KHJlcS5oZWFkZXJzLmF1dGhvcml6YXRpb24sICdmOWI1NzRhMmZjMGQ3Nzk4NmNiN2ViZTIxYTBkZWE0ODBmNWYyMTkzMWFiZmE1Y2YzMjlhNDVlY2MwYzhlMWZmJywgZnVuY3Rpb24oZXJyLCBkZWNvZGVkKSB7XHJcbiAgICAgICAgICBpZiAoZXJyKSB7XHJcbiAgICAgICAgICAgIHJldHVybiByZXMuc2VuZCh7IGVycm9yOiBcIlRoZXJlIHdhcyBhbiBlcnJvclwiIH0pO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKGRlY29kZWQgPT09IG51bGwgfHwgT2JqZWN0LmtleXMoZGVjb2RlZCkubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgcmV0dXJuIHJlcy5zZW5kKHsgZXJyb3I6IFwiTm8gdmFsdWVzIGluIHRva2VuXCIgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHNxbC5jb25uZWN0KGRiKS50aGVuKHBvb2wgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gcG9vbC5yZXF1ZXN0KClcclxuICAgICAgICAgICAgLmlucHV0KCd1c2VySUQnLCBzcWwuSW50KCksIGRlY29kZWQudXNlcmlkKVxyXG4gICAgICAgICAgICAucXVlcnkoXCJTRUxFQ1QgKiBGUk9NIFVzZXJzIFdIRVJFIHVzZXJJRCA9IEB1c2VySURcIilcclxuICAgICAgICAgIH0pLnRoZW4odXNlciA9PiB7XHJcbiAgICAgICAgICAgICAgdmFyIGhhc1NvbWUgPSBkYXRhLnJlcXVpcmVkQXV0aC5zb21lKGZ1bmN0aW9uKHYpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB1c2VyWzBdLnVzZXJUeXBlLmluZGV4T2YodikgPj0gMDtcclxuICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgIGlmIChoYXNTb21lKSB7XHJcbiAgICAgICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgICBkYXRhLmRvbmUoZGVjb2RlZC51c2VyaWQpO1xyXG4gICAgICAgICAgICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVyci5zdGFjayk7XHJcbiAgICAgICAgICAgICAgICAgIHRocm93IFwiVGhlcmUgd2FzIGFuIGlzc3VlIGluIHRoZSBsb2dpYyBkb25lIGFmdGVyIHRoZSBhdXRoZW50aWNhdGlvblwiOyAvLyBUaGlzIHdpbGwgdGhyb3cgdG8gY2F0Y2ggb24gbGluZSA4M1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXMuc2VuZCh7IHN0YXR1czogJzQwMycgfSk7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbihlcnIpIHtcclxuICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yIC0gQXV0aGVudGljYXRlIHVzZXI6IFwiICsgZXJyKTtcclxuICAgICAgICAgICAgICByZXMuc2VuZCh7IHJlc3VsdDogXCJlcnJvclwiLCB0aXRsZTogXCJFcnJvclwiLCBtc2c6IFwiVGhlcmUgd2FzIGFuIGVycm9yIHdpdGggeW91ciByZXF1ZXN0LlwiLCBzZXJ2ZXJNc2c6IFwiXCIgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJlcy5zZW5kKHsgZXJyb3I6IFwiTm8gYXV0aCBoZWFkZXJcIiB9KTtcclxuICAgICAgfVxyXG4gICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3IgLSBBdXRoZW50aWNhdGUgdXNlcjogXCIgKyBlcnIpO1xyXG4gICAgICByZXMuc2VuZCh7IHJlc3VsdDogXCJlcnJvclwiLCB0aXRsZTogXCJFcnJvclwiLCBtc2c6IFwiVGhlcmUgd2FzIGFuIGVycm9yIGF1dGhlbnRpY2F0aW5nIHRoZSBjdXJyZW50IHVzZXIuXCIsIHNlcnZlck1zZzogXCJcIiB9KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHJlc2V0UGFzc3dvcmQocmVxOiBleHByZXNzLlJlcXVlc3QsIHJlczogZXhwcmVzcy5SZXNwb25zZSk6IHZvaWQge1xyXG4gICAgdHJ5IHtcclxuICAgICAgdmFyIF91c2VySUQ6IHN0cmluZyA9IHJlcS5ib2R5LnVzZXJJRDtcclxuICAgICAgdmFyIF9wYXNzd29yZDogc3RyaW5nID0gcmVxLmJvZHkucGFzc3dvcmQ7XHJcbiAgICAgIHZhciBzYWx0ID0gYmNyeXB0LmdlblNhbHRTeW5jKDEwKTtcclxuICAgICAgLy8gSGFzaCB0aGUgcGFzc3dvcmQgd2l0aCB0aGUgc2FsdFxyXG4gICAgICBfcGFzc3dvcmQgPSBiY3J5cHQuaGFzaFN5bmMoX3Bhc3N3b3JkLCBzYWx0KTtcclxuXHJcbiAgICAgIHNxbC5jb25uZWN0KGRiKS50aGVuKHBvb2wgPT4ge1xyXG4gICAgICAgIHJldHVybiBwb29sLnJlcXVlc3QoKVxyXG4gICAgICAgIC5pbnB1dCgncGFzc3dvcmQnLCBzcWwuVmFyQ2hhcigyNTApLCBfcGFzc3dvcmQpXHJcbiAgICAgICAgLmlucHV0KCd1c2VySUQnLCBzcWwuSW50KCksIF91c2VySUQpXHJcbiAgICAgICAgLnF1ZXJ5KFwiVVBEQVRFIFVzZXJzIFNFVCBwYXNzd29yZCA9IEBwYXNzd29yZCwgYWN0aXZlID0gJ3RydWUnIFdIRVJFIHVzZXJJRCA9IEB1c2VySURcIilcclxuICAgICAgfSkudGhlbihyZXN1bHQgPT4ge1xyXG4gICAgICAgICAgcmVzLnNlbmQoeyByZXN1bHQ6IFwic3VjY2Vzc1wiLCB0aXRsZTogXCJTdWNjZXNzIVwiLCBtc2c6IFwiUGxlYXNlIGxvZyBpbiB1c2luZyB5b3VyIG5ldyBwYXNzd29yZC5cIiwgc2VydmVyTXNnOiBcIlwiIH0pO1xyXG4gICAgICB9KS5jYXRjaChmdW5jdGlvbihlcnIpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xyXG4gICAgICAgIHJlcy5zZW5kKHsgcmVzdWx0OiBcImVycm9yXCIsIHRpdGxlOiBcIkVycm9yXCIsIG1zZzogXCJUaGVyZSB3YXMgYW4gZXJyb3Igd2l0aCB5b3VyIHJlcXVlc3QuXCIsIHNlcnZlck1zZzogZXJyLm1lc3NhZ2UgfSk7XHJcbiAgICAgIH0pO1xyXG5cclxuICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICBjb25zb2xlLmxvZyhcIkVycm9yIC0gUmVzZXQgcGFzc3dvcmQ6IFwiICsgZXJyKTtcclxuICAgICAgcmVzLnNlbmQoeyByZXN1bHQ6IFwiZXJyb3JcIiwgdGl0bGU6IFwiRXJyb3JcIiwgbXNnOiBcIlRoZXJlIHdhcyBhbiBlcnJvciByZXNldHRpbmcgeW91ciBwYXNzd29yZC5cIiwgc2VydmVyTXNnOiBcIlwiIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcmVxdWVzdFJlc2V0KHJlcTogZXhwcmVzcy5SZXF1ZXN0LCByZXM6IGV4cHJlc3MuUmVzcG9uc2UpOiB2b2lkIHtcclxuICAgIHRyeSB7XHJcbiAgICAgIHZhciBfZW1haWw6IHN0cmluZyA9IHJlcS5wYXJhbXMuX2VtYWlsO1xyXG4gICAgICB2YXIgcmUgPSAvXigoW148PigpW1xcXVxcXFwuLDs6XFxzQFxcXCJdKyhcXC5bXjw+KClbXFxdXFxcXC4sOzpcXHNAXFxcIl0rKSopfChcXFwiLitcXFwiKSlAKChcXFtbMC05XXsxLDN9XFwuWzAtOV17MSwzfVxcLlswLTldezEsM31cXC5bMC05XXsxLDN9XFxdKXwoKFthLXpBLVpcXC0wLTldK1xcLikrW2EtekEtWl17Mix9KSkkLztcclxuICAgICAgdmFyIGVtYWlsVmFsaWRhdGlvbiA9IHJlLnRlc3QoX2VtYWlsKTtcclxuICAgICAgdmFyIHJhbmRvbXN0cmluZyA9IE1hdGgucmFuZG9tKCkudG9TdHJpbmcoMzYpLnNsaWNlKC04KTtcclxuICAgICAgcmFuZG9tc3RyaW5nID0gcmFuZG9tc3RyaW5nLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgcmFuZG9tc3RyaW5nLnNsaWNlKDEpO1xyXG4gICAgICB2YXIgc2FsdCA9IGJjcnlwdC5nZW5TYWx0U3luYygxMCk7XHJcbiAgICAgIC8vIEhhc2ggdGhlIHBhc3N3b3JkIHdpdGggdGhlIHNhbHRcclxuICAgICAgdmFyIF9wYXNzd29yZCA9IGJjcnlwdC5oYXNoU3luYyhyYW5kb21zdHJpbmcsIHNhbHQpO1xyXG4gICAgICBpZiAoIWVtYWlsVmFsaWRhdGlvbikge1xyXG4gICAgICAgIHJlcy5zZW5kKHsgcmVzdWx0OiBcImludmFsaWRcIiwgdGl0bGU6IFwiSW52YWxpZFwiLCBtc2c6IFwiUGxlYXNlIGVudGVyIGEgcHJvcGVyIGVtYWlsIGFkZHJlc3MuIChleGFtcGxlQGVtYWlsLmNvbSlcIiwgc2VydmVyTXNnOiBcIlwiIH0pXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBzcWwuY29ubmVjdChkYikudGhlbihwb29sID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIHBvb2wucmVxdWVzdCgpXHJcbiAgICAgICAgICAgIC5pbnB1dCgncGFzc3dvcmQnLCBzcWwuVmFyQ2hhcigyNTApLCBfcGFzc3dvcmQpXHJcbiAgICAgICAgICAgIC5pbnB1dCgnZW1haWwnLCBzcWwuVmFyQ2hhcigxMDApLCBfZW1haWwpXHJcbiAgICAgICAgICAgIC5xdWVyeShcIlVQREFURSBVc2VycyBTRVQgcGFzc3dvcmQgPSBAcGFzc3dvcmQsIGFjdGl2ZSA9ICdmYWxzZScgV0hFUkUgZW1haWwgPSBAZW1haWw7IFNFTEVDVCBAQHJvd2NvdW50IGFzICdSb3dzQWZmZWN0ZWQnXCIpXHJcbiAgICAgICAgICB9KS50aGVuKHJlc3VsdCA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZGlyKHJlc3VsdCk7XHJcbiAgICAgICAgICAgIGlmIChyZXN1bHQgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgIC8vIHNldHVwIGVtYWlsIGRhdGEgd2l0aCB1bmljb2RlIHN5bWJvbHNcclxuICAgICAgICAgICAgICBsZXQgbWFpbE9wdGlvbnMgPSB7XHJcbiAgICAgICAgICAgICAgICBmcm9tOiBtYWlsLnVzZXIsIC8vIHNlbmRlciBhZGRyZXNzXHJcbiAgICAgICAgICAgICAgICB0bzogX2VtYWlsLCAvLyBsaXN0IG9mIHJlY2VpdmVyc1xyXG4gICAgICAgICAgICAgICAgc3ViamVjdDogJ1Bhc3N3b3JkIFJlc2V0JywgLy8gU3ViamVjdCBsaW5lXHJcbiAgICAgICAgICAgICAgICB0ZXh0OiAnJywgLy8gcGxhaW4gdGV4dCBib2R5XHJcbiAgICAgICAgICAgICAgICBodG1sOiAnSGVyZSBpcyB5b3VyIG5ldyB0ZW1wb3JhcnkgcGFzc3dvcmQ6IDxiPicgKyByYW5kb21zdHJpbmcgKyAnPC9iPjxiciAvPiBQbGVhc2UgbG9naW4gYXQgJyArIHNpdGVfc2V0dGluZ3MudXJsICsgJyA8YnIgLz48YnIgLz4gVGhhbmt5b3UnLy8gaHRtbCBib2R5XHJcbiAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICBuZXcgQWN0aXZpdHlTZXJ2aWNlKCkucmVwb3J0QWN0aXZpdHkoJ3VzZXInLCAnUmVxdWVzdCBQYXNzd29yZCBSZXNldCcsICdzdWNjZXNzJywgJycsICcnLCAnUGFzc3dvcmQgcmVzZXQgYWNjZXB0ZWQuIEluc3RydWN0aW9ucyBmb3IgbG9naW4gc2VudCB0byAnICsgX2VtYWlsICsgJy4nKTtcclxuICAgICAgICAgICAgICBuZXcgTWFpbFNlcnZpY2UoKS5zZW5kTWVzc2FnZShcIiBSZXNldCBQYXNzd29yZFwiLCBtYWlsT3B0aW9ucyk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgbmV3IEFjdGl2aXR5U2VydmljZSgpLnJlcG9ydEFjdGl2aXR5KCd1c2VyJywgJ1JlcXVlc3QgUGFzc3dvcmQgUmVzZXQnLCAnZmFpbCcsICcnLCAnJywgJ0NvdWxkIG5vdCBmaW5kIHVzZXIgd2l0aCBlbWFpbCAnICsgX2VtYWlsICsgJy4nKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXMuc2VuZCh7IHJlc3VsdDogXCJzdWNjZXNzXCIsIHRpdGxlOiBcIlN1Y2Nlc3MhXCIsIG1zZzogXCJDaGVjayB5b3VyIGVtYWlsIGZvciByZXNldCBpbnN0cnVjdGlvbnMuXCIsIHNlcnZlck1zZzogXCJcIiB9KTtcclxuICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGVycikge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xyXG4gICAgICAgICAgICByZXMuc2VuZCh7IHJlc3VsdDogXCJlcnJvclwiLCB0aXRsZTogXCJFcnJvclwiLCBtc2c6IFwiVGhlcmUgd2FzIGFuIGVycm9yIHdpdGggeW91ciByZXF1ZXN0LlwiLCBzZXJ2ZXJNc2c6IGVyci5tZXNzYWdlIH0pO1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICBjb25zb2xlLmxvZyhcIkVycm9yIC0gUmVxdWVzdCBwYXNzd29yZCByZXNldDogXCIgKyBlcnIpO1xyXG4gICAgICByZXMuc2VuZCh7IHJlc3VsdDogXCJlcnJvclwiLCB0aXRsZTogXCJFcnJvclwiLCBtc2c6IFwiVGhlcmUgd2FzIGFuIGVycm9yIHJlcXVlc3RpbmcgcGFzc3dvcmQgcmVzZXQuXCIsIHNlcnZlck1zZzogXCJcIiB9KTtcclxuICAgIH1cclxuICB9XHJcblxyXG59XHJcbmV4cG9ydCA9IEF1dGhDb250cm9sbGVyO1xyXG4iXX0=
