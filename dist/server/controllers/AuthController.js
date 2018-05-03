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
                            new ActivityService().reportActivity('login', 'success', user[0].userID);
                            var token = jwt.sign({ userid: user[0].userID }, "f9b574a2fc0d77986cb7ebe21a0dea480f5f21931abfa5cf329a45ecc0c8e1ff");
                            var statusToken = { status: 200, body: { token: token, userID: user[0].userID, username: user[0].username, userType: user[0].userType, active: user[0].active } };
                            response = JSON.stringify(statusToken);
                        }
                        else {
                            new ActivityService().reportActivity('login', 'fail', '');
                            response = false;
                        }
                    }
                    else {
                        new ActivityService().reportActivity('login', 'fail', '');
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
                            res.send({ "error": "error" });
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
                    res.send({ "success": "success" });
                }).catch(function (err) {
                    res.send({ "error": "error" });
                    console.log("Update user password " + err);
                });
            }).catch(function (err) {
                console.log(err);
                res.send({ "error": "error" });
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
            var randomstring = Math.random().toString(36).slice(-8);
            randomstring = randomstring.charAt(0).toUpperCase() + randomstring.slice(1);
            var salt = bcrypt.genSaltSync(10);
            // Hash the password with the salt
            var _password = bcrypt.hashSync(randomstring, salt);
            sql.connect(db)
                .then(function (connection) {
                sql.query(templateObject_3 || (templateObject_3 = __makeTemplateObject(["UPDATE Users SET password = ", ", active='false' WHERE email = ", ""], ["UPDATE Users SET password = ", ", active='false' WHERE email = ", ""])), _password, _email).then(function (recordset) {
                    // setup email data with unicode symbols
                    var mailOptions = {
                        from: mail.user,
                        to: _email,
                        subject: 'Password Reset',
                        text: '',
                        html: 'Here is your new temporary password: <b>' + randomstring + '</b><br /> Please login at ' + site_settings.url + ' <br /><br /> Thankyou' // html body
                    };
                    new MailService().sendMessage(" Reset Password", mailOptions);
                    res.send({ "success": "success" });
                }).catch(function (err) {
                    console.log("Update user password " + err);
                    res.send({ "error": "error" });
                });
            }).catch(function (err) {
                console.log(err);
                res.send({ "error": "error" });
            });
        }
        catch (err) {
            console.log("Error - Request password reset: " + err);
            res.send({ result: "error", title: "Error", msg: "There was an error requesting password reset.", serverMsg: "" });
        }
    };
    return AuthController;
}());
var templateObject_1, templateObject_2, templateObject_3;
module.exports = AuthController;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NlcnZlci9zcmMvY29udHJvbGxlcnMvQXV0aENvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFDQSxrQ0FBcUM7QUFDckMsK0JBQWtDO0FBQ2xDLElBQU0sV0FBVyxHQUFHLE9BQU8sQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDO0FBQ3ZELElBQU0sZUFBZSxHQUFHLE9BQU8sQ0FBQyw2QkFBNkIsQ0FBQyxDQUFDO0FBQy9ELElBQUksR0FBRyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUMzQixJQUFNLE1BQU0sR0FBRyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUM7QUFDcEMsSUFBTSxFQUFFLEdBQUcsTUFBTSxDQUFDLEVBQUUsQ0FBQztBQUNyQixJQUFNLElBQUksR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDO0FBQ3pCLElBQU0sYUFBYSxHQUFHLE1BQU0sQ0FBQyxhQUFhLENBQUM7QUFFM0M7SUFBQTtJQW9LQSxDQUFDO0lBbEtDLHVCQUF1QjtJQUN2Qiw2QkFBSSxHQUFKLFVBQUssR0FBb0IsRUFBRSxHQUFxQjtRQUM5QyxJQUFJO1lBQ0YsSUFBSSxTQUFTLEdBQVcsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7WUFDMUMsSUFBSSxTQUFTLEdBQVcsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7WUFDMUMsSUFBSSxRQUFRLENBQUM7WUFFYixHQUFHLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQztpQkFDZCxJQUFJLENBQUMsVUFBUyxVQUFVO2dCQUN2QixHQUFHLENBQUMsS0FBSyw4R0FDVCx1Q0FBd0MsRUFBUyxFQUFFLEtBQVgsU0FBUyxFQUNoRCxJQUFJLENBQUMsVUFBUyxJQUFJO29CQUNmLElBQUksSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUc7d0JBQ3BCLElBQUcsTUFBTSxDQUFDLFdBQVcsQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLFFB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RSxTQUFTLEVBQUUsQ0FBQyxDQUFDO2dCQUNyQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsVUFBUyxHQUFHO29CQUNuQixPQUFPLENBQUMsR0FBRyxDQUFDLHVCQUF1QixHQUFHLEdBQUcsQ0FBQyxDQUFDO29CQUMzQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxDQUFDLENBQUM7Z0JBQ2pDLENBQUMsQ0FBQyxDQUFDO1lBQ1AsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLFVBQVMsR0FBRztnQkFDbkIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDakIsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsQ0FBQyxDQUFDO1lBQ2pDLENBQUMsQ0FBQyxDQUFDO1NBRU47UUFBQyxPQUFNLEdBQUcsRUFBRTtZQUNYLE9BQU8sQ0FBQyxHQUFHLENBQUMsa0NBQWtDLEdBQUcsR0FBRyxDQUFDLENBQUM7WUFDdEQsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxHQUFHLEVBQUUsK0NBQStDLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7U0FDcEg7SUFDSCxDQUFDO0lBRUgscUJBQUM7QUFBRCxDQXBLQSxBQW9LQyxJQUFBOztBQUNELGlCQUFTLGNBQWMsQ0FBQyIsImZpbGUiOiJjb250cm9sbGVycy9BdXRoQ29udHJvbGxlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBleHByZXNzID0gcmVxdWlyZShcImV4cHJlc3NcIik7XHJcbmltcG9ydCBqd3QgPSByZXF1aXJlKCdqc29ud2VidG9rZW4nKTtcclxuaW1wb3J0IGJjcnlwdCA9IHJlcXVpcmUoJ2JjcnlwdCcpO1xyXG5jb25zdCBNYWlsU2VydmljZSA9IHJlcXVpcmUoXCIuLi9zZXJ2aWNlcy9NYWlsU2VydmljZVwiKTtcclxuY29uc3QgQWN0aXZpdHlTZXJ2aWNlID0gcmVxdWlyZShcIi4uL3NlcnZpY2VzL0FjdGl2aXR5U2VydmljZVwiKTtcclxudmFyIHNxbCA9IHJlcXVpcmUoJ21zc3FsJyk7XHJcbmNvbnN0IGNvbmZpZyA9IHJlcXVpcmUoJy4uL2NvbmZpZycpO1xyXG5jb25zdCBkYiA9IGNvbmZpZy5kYjtcclxuY29uc3QgbWFpbCA9IGNvbmZpZy5tYWlsO1xyXG5jb25zdCBzaXRlX3NldHRpbmdzID0gY29uZmlnLnNpdGVfc2V0dGluZ3M7XHJcblxyXG5jbGFzcyBBdXRoQ29udHJvbGxlciB7XHJcblxyXG4gIC8vIExvZ2luIEF1dGhlbnRpY2F0aW9uXHJcbiAgYXV0aChyZXE6IGV4cHJlc3MuUmVxdWVzdCwgcmVzOiBleHByZXNzLlJlc3BvbnNlKTogdm9pZCB7XHJcbiAgICB0cnkge1xyXG4gICAgICB2YXIgX3VzZXJuYW1lOiBzdHJpbmcgPSByZXEuYm9keS51c2VybmFtZTtcclxuICAgICAgdmFyIF9wYXNzd29yZDogc3RyaW5nID0gcmVxLmJvZHkucGFzc3dvcmQ7XHJcbiAgICAgIHZhciByZXNwb25zZTtcclxuXHJcbiAgICAgIHNxbC5jb25uZWN0KGRiKVxyXG4gICAgICAudGhlbihmdW5jdGlvbihjb25uZWN0aW9uKSB7XHJcbiAgICAgICAgc3FsLnF1ZXJ5XHJcbiAgICAgICAgYFNFTEVDVCAqIEZST00gVXNlcnMgV0hFUkUgdXNlcm5hbWUgPSAke191c2VybmFtZX1gXHJcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24odXNlcikge1xyXG4gICAgICAgICAgICBpZiAodXNlci5sZW5ndGggPiAwICkge1xyXG4gICAgICAgICAgICAgIGlmKGJjcnlwdC5jb21wYXJlU3luYyhfcGFzc3dvcmQsIHVzZXJbMF0ucGFzc3dvcmQpKXtcclxuICAgICAgICAgICAgICAgIG5ldyBBY3Rpdml0eVNlcnZpY2UoKS5yZXBvcnRBY3Rpdml0eSgnbG9naW4nLCAnc3VjY2VzcycsIHVzZXJbMF0udXNlcklEKTtcclxuICAgICAgICAgICAgICAgIHZhciB0b2tlbiA9IGp3dC5zaWduKHsgdXNlcmlkOiB1c2VyWzBdLnVzZXJJRCB9LCBcImY5YjU3NGEyZmMwZDc3OTg2Y2I3ZWJlMjFhMGRlYTQ4MGY1ZjIxOTMxYWJmYTVjZjMyOWE0NWVjYzBjOGUxZmZcIik7XHJcbiAgICAgICAgICAgICAgICB2YXIgc3RhdHVzVG9rZW4gPSB7IHN0YXR1czogMjAwLCBib2R5OiB7IHRva2VuOiB0b2tlbiwgdXNlcklEOiB1c2VyWzBdLnVzZXJJRCwgdXNlcm5hbWU6IHVzZXJbMF0udXNlcm5hbWUsIHVzZXJUeXBlOiB1c2VyWzBdLnVzZXJUeXBlLCBhY3RpdmU6IHVzZXJbMF0uYWN0aXZlIH0gfTtcclxuICAgICAgICAgICAgICAgIHJlc3BvbnNlID0gSlNPTi5zdHJpbmdpZnkoc3RhdHVzVG9rZW4pO1xyXG4gICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBuZXcgQWN0aXZpdHlTZXJ2aWNlKCkucmVwb3J0QWN0aXZpdHkoJ2xvZ2luJywgJ2ZhaWwnLCAnJyk7XHJcbiAgICAgICAgICAgICAgICByZXNwb25zZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICBuZXcgQWN0aXZpdHlTZXJ2aWNlKCkucmVwb3J0QWN0aXZpdHkoJ2xvZ2luJywgJ2ZhaWwnLCAnJyk7XHJcbiAgICAgICAgICAgICAgcmVzcG9uc2UgPSBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXMuc2VuZChyZXNwb25zZSk7XHJcbiAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbihlcnIpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJFcnJvciAtIExvZ2luOiBcIiArIGVycik7XHJcbiAgICAgICAgICAgIHJlcy5zZW5kKHsgcmVzdWx0OiBcImVycm9yXCIsIHRpdGxlOiBcIkVycm9yXCIsIG1zZzogXCJUaGVyZSB3YXMgYW4gZXJyb3IgbG9nZ2luZyBpbi5cIiwgc2VydmVyTXNnOiBcIlwiIH0pO1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGVycikge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiREIgQ29ubmVjdGlvbiBlcnJvciAtIExvZ2luOiBcIiArIGVycik7XHJcbiAgICAgICAgcmVzLnNlbmQoeyByZXN1bHQ6IFwiZXJyb3JcIiwgdGl0bGU6IFwiQ29ubmVjdGlvbiBFcnJvclwiLCBtc2c6IFwiVGhlcmUgd2FzIGFuIGVycm9yIGNvbm5lY3RpbmcgdG8gdGhlIGRhdGFiYXNlLlwiLCBzZXJ2ZXJNc2c6IGVyciB9KTtcclxuICAgICAgfSk7XHJcblxyXG4gICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3IgLSBMb2dpbjogXCIgKyBlcnIpO1xyXG4gICAgICByZXMuc2VuZCh7IHJlc3VsdDogXCJlcnJvclwiLCB0aXRsZTogXCJFcnJvclwiLCBtc2c6IFwiVGhlcmUgd2FzIGFuIGVycm9yIGxvZ2dpbmcgaW4uXCIsIHNlcnZlck1zZzogXCJcIiB9KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8vRGVjb2RlIHRva2VuIGFuZCBjaGVjayBpZiB1c2VyIGlzIGF1dGhvcml6ZWRcclxuICBhdXRoVXNlcihyZXE6IGV4cHJlc3MuUmVxdWVzdCwgcmVzOiBleHByZXNzLlJlc3BvbnNlLCBkYXRhKTogdm9pZCB7XHJcbiAgICB0cnkge1xyXG4gICAgICBpZiAocmVxLmhlYWRlcnMgJiYgcmVxLmhlYWRlcnMuYXV0aG9yaXphdGlvbikge1xyXG4gICAgICAgIGp3dC52ZXJpZnkocmVxLmhlYWRlcnMuYXV0aG9yaXphdGlvbiwgJ2Y5YjU3NGEyZmMwZDc3OTg2Y2I3ZWJlMjFhMGRlYTQ4MGY1ZjIxOTMxYWJmYTVjZjMyOWE0NWVjYzBjOGUxZmYnLCBmdW5jdGlvbihlcnIsIGRlY29kZWQpIHtcclxuICAgICAgICAgIGlmIChlcnIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHJlcy5zZW5kKHsgZXJyb3I6IFwiVGhlcmUgd2FzIGFuIGVycm9yXCIgfSk7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAoZGVjb2RlZCA9PT0gbnVsbCB8fCBPYmplY3Qua2V5cyhkZWNvZGVkKS5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgICByZXR1cm4gcmVzLnNlbmQoeyBlcnJvcjogXCJObyB2YWx1ZXMgaW4gdG9rZW5cIiB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgdmFyIF9pZCA9IGRlY29kZWQudXNlcmlkO1xyXG5cclxuICAgICAgICAgIHNxbC5jb25uZWN0KGRiKVxyXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbihjb25uZWN0aW9uKSB7XHJcbiAgICAgICAgICAgICAgbmV3IHNxbC5SZXF1ZXN0KGNvbm5lY3Rpb24pXHJcbiAgICAgICAgICAgICAgLnF1ZXJ5KGBTRUxFQ1QgKiBGUk9NIFVzZXJzIFdIRVJFIHVzZXJJRCA9ICR7X2lkfWApXHJcbiAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbih1c2VyKSB7XHJcbiAgICAgICAgICAgICAgICAgIHZhciBoYXNTb21lID0gZGF0YS5yZXF1aXJlZEF1dGguc29tZShmdW5jdGlvbih2KXtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdXNlclswXS51c2VyVHlwZS5pbmRleE9mKHYpID49IDA7XHJcbiAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgIGlmIChoYXNTb21lKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgICAgICAgIGRhdGEuZG9uZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyLnN0YWNrKTtcclxuICAgICAgICAgICAgICAgICAgICAgIHRocm93IFwiVGhlcmUgd2FzIGFuIGlzc3VlIGluIHRoZSBsb2dpYyBkb25lIGFmdGVyIHRoZSBhdXRoZW50aWNhdGlvblwiOyAvLyBUaGlzIHdpbGwgdGhyb3cgdG8gY2F0Y2ggb24gbGluZSA4M1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICByZXMuc2VuZCh7IHN0YXR1czogJzQwMycgfSk7XHJcbiAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGVycikge1xyXG4gICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yIC0gR2V0IHVzZXIgYnkgaWQ6IFwiICsgZXJyKTtcclxuICAgICAgICAgICAgICAgICAgcmVzLnNlbmQoeyBcImVycm9yXCI6IFwiZXJyb3JcIiB9KTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbihlcnIpIHtcclxuICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkRCIENvbm5lY3Rpb24gZXJyb3IgLSBBdXRoZW50aWNhdGUgdXNlcjogXCIgKyBlcnIpO1xyXG4gICAgICAgICAgICAgIHJlcy5zZW5kKHsgcmVzdWx0OiBcImVycm9yXCIsIHRpdGxlOiBcIkNvbm5lY3Rpb24gRXJyb3JcIiwgbXNnOiBcIlRoZXJlIHdhcyBhbiBlcnJvciBjb25uZWN0aW5nIHRvIHRoZSBkYXRhYmFzZS5cIiwgc2VydmVyTXNnOiBlcnIgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9KTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICByZXMuc2VuZCh7IGVycm9yOiBcIk5vIGF1dGggaGVhZGVyXCIgfSk7XHJcbiAgICAgIH1cclxuICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICBjb25zb2xlLmxvZyhcIkVycm9yIC0gQXV0aGVudGljYXRlIHVzZXI6IFwiICsgZXJyKTtcclxuICAgICAgcmVzLnNlbmQoeyByZXN1bHQ6IFwiZXJyb3JcIiwgdGl0bGU6IFwiRXJyb3JcIiwgbXNnOiBcIlRoZXJlIHdhcyBhbiBlcnJvciBhdXRoZW50aWNhdGluZyB0aGUgY3VycmVudCB1c2VyLlwiLCBzZXJ2ZXJNc2c6IFwiXCIgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICByZXNldFBhc3N3b3JkKHJlcTogZXhwcmVzcy5SZXF1ZXN0LCByZXM6IGV4cHJlc3MuUmVzcG9uc2UpOiB2b2lkIHtcclxuICAgIHRyeSB7XHJcbiAgICAgIHZhciBfdXNlcklEOiBzdHJpbmcgPSByZXEuYm9keS51c2VySUQ7XHJcbiAgICAgIHZhciBfcGFzc3dvcmQ6IHN0cmluZyA9IHJlcS5ib2R5LnBhc3N3b3JkO1xyXG4gICAgICB2YXIgc2FsdCA9IGJjcnlwdC5nZW5TYWx0U3luYygxMCk7XHJcbiAgICAgIC8vIEhhc2ggdGhlIHBhc3N3b3JkIHdpdGggdGhlIHNhbHRcclxuICAgICAgX3Bhc3N3b3JkID0gYmNyeXB0Lmhhc2hTeW5jKF9wYXNzd29yZCwgc2FsdCk7XHJcblxyXG4gICAgICBzcWwuY29ubmVjdChkYilcclxuICAgICAgLnRoZW4oZnVuY3Rpb24oY29ubmVjdGlvbikge1xyXG4gICAgICAgICAgICBzcWwucXVlcnlcclxuICAgICAgICAgICAgYFVQREFURSBVc2VycyBTRVQgcGFzc3dvcmQ9JHtfcGFzc3dvcmR9LCBhY3RpdmU9J3RydWUnIFdIRVJFIHVzZXJJRCA9ICR7X3VzZXJJRH1gXHJcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKHJlY29yZHNldCkge1xyXG4gICAgICAgICAgICAgIHJlcy5zZW5kKHsgXCJzdWNjZXNzXCI6IFwic3VjY2Vzc1wiIH0pO1xyXG4gICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbihlcnIpIHtcclxuICAgICAgICAgICAgICByZXMuc2VuZCh7IFwiZXJyb3JcIjogXCJlcnJvclwiIH0pO1xyXG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiVXBkYXRlIHVzZXIgcGFzc3dvcmQgXCIgKyBlcnIpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KS5jYXRjaChmdW5jdGlvbihlcnIpIHtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XHJcbiAgICAgICAgICByZXMuc2VuZCh7IFwiZXJyb3JcIjogXCJlcnJvclwiIH0pO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICBjb25zb2xlLmxvZyhcIkVycm9yIC0gUmVzZXQgcGFzc3dvcmQ6IFwiICsgZXJyKTtcclxuICAgICAgcmVzLnNlbmQoeyByZXN1bHQ6IFwiZXJyb3JcIiwgdGl0bGU6IFwiRXJyb3JcIiwgbXNnOiBcIlRoZXJlIHdhcyBhbiBlcnJvciByZXNldHRpbmcgeW91ciBwYXNzd29yZC5cIiwgc2VydmVyTXNnOiBcIlwiIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcmVxdWVzdFJlc2V0KHJlcTogZXhwcmVzcy5SZXF1ZXN0LCByZXM6IGV4cHJlc3MuUmVzcG9uc2UpOiB2b2lkIHtcclxuICAgIHRyeSB7XHJcbiAgICAgIHZhciBfZW1haWw6IHN0cmluZyA9IHJlcS5wYXJhbXMuX2VtYWlsO1xyXG4gICAgICB2YXIgcmFuZG9tc3RyaW5nID0gTWF0aC5yYW5kb20oKS50b1N0cmluZygzNikuc2xpY2UoLTgpO1xyXG4gICAgICByYW5kb21zdHJpbmcgPSByYW5kb21zdHJpbmcuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyByYW5kb21zdHJpbmcuc2xpY2UoMSk7XHJcbiAgICAgIHZhciBzYWx0ID0gYmNyeXB0LmdlblNhbHRTeW5jKDEwKTtcclxuICAgICAgLy8gSGFzaCB0aGUgcGFzc3dvcmQgd2l0aCB0aGUgc2FsdFxyXG4gICAgICB2YXIgX3Bhc3N3b3JkID0gYmNyeXB0Lmhhc2hTeW5jKHJhbmRvbXN0cmluZywgc2FsdCk7XHJcblxyXG4gICAgICBzcWwuY29ubmVjdChkYilcclxuICAgICAgLnRoZW4oZnVuY3Rpb24oY29ubmVjdGlvbikge1xyXG4gICAgICAgICAgc3FsLnF1ZXJ5XHJcbiAgICAgICAgICBgVVBEQVRFIFVzZXJzIFNFVCBwYXNzd29yZCA9ICR7X3Bhc3N3b3JkfSwgYWN0aXZlPSdmYWxzZScgV0hFUkUgZW1haWwgPSAke19lbWFpbH1gXHJcbiAgICAgICAgICAudGhlbihmdW5jdGlvbihyZWNvcmRzZXQpIHtcclxuICAgICAgICAgICAgICAvLyBzZXR1cCBlbWFpbCBkYXRhIHdpdGggdW5pY29kZSBzeW1ib2xzXHJcbiAgICAgICAgICAgICAgbGV0IG1haWxPcHRpb25zID0ge1xyXG4gICAgICAgICAgICAgICAgZnJvbTogbWFpbC51c2VyLCAvLyBzZW5kZXIgYWRkcmVzc1xyXG4gICAgICAgICAgICAgICAgdG86IF9lbWFpbCwgLy8gbGlzdCBvZiByZWNlaXZlcnNcclxuICAgICAgICAgICAgICAgIHN1YmplY3Q6ICdQYXNzd29yZCBSZXNldCcsIC8vIFN1YmplY3QgbGluZVxyXG4gICAgICAgICAgICAgICAgdGV4dDogJycsIC8vIHBsYWluIHRleHQgYm9keVxyXG4gICAgICAgICAgICAgICAgaHRtbDogJ0hlcmUgaXMgeW91ciBuZXcgdGVtcG9yYXJ5IHBhc3N3b3JkOiA8Yj4nICsgcmFuZG9tc3RyaW5nICsgJzwvYj48YnIgLz4gUGxlYXNlIGxvZ2luIGF0ICcgKyBzaXRlX3NldHRpbmdzLnVybCArICcgPGJyIC8+PGJyIC8+IFRoYW5reW91Jy8vIGh0bWwgYm9keVxyXG4gICAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAgIG5ldyBNYWlsU2VydmljZSgpLnNlbmRNZXNzYWdlKFwiIFJlc2V0IFBhc3N3b3JkXCIsIG1haWxPcHRpb25zKTtcclxuICAgICAgICAgICAgICByZXMuc2VuZCh7IFwic3VjY2Vzc1wiOiBcInN1Y2Nlc3NcIiB9KTtcclxuICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XHJcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJVcGRhdGUgdXNlciBwYXNzd29yZCBcIiArIGVycik7XHJcbiAgICAgICAgICAgICAgcmVzLnNlbmQoeyBcImVycm9yXCI6IFwiZXJyb3JcIiB9KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xyXG4gICAgICAgICAgcmVzLnNlbmQoeyBcImVycm9yXCI6IFwiZXJyb3JcIiB9KTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICB9IGNhdGNoKGVycikge1xyXG4gICAgICBjb25zb2xlLmxvZyhcIkVycm9yIC0gUmVxdWVzdCBwYXNzd29yZCByZXNldDogXCIgKyBlcnIpO1xyXG4gICAgICByZXMuc2VuZCh7IHJlc3VsdDogXCJlcnJvclwiLCB0aXRsZTogXCJFcnJvclwiLCBtc2c6IFwiVGhlcmUgd2FzIGFuIGVycm9yIHJlcXVlc3RpbmcgcGFzc3dvcmQgcmVzZXQuXCIsIHNlcnZlck1zZzogXCJcIiB9KTtcclxuICAgIH1cclxuICB9XHJcblxyXG59XHJcbmV4cG9ydCA9IEF1dGhDb250cm9sbGVyO1xyXG4iXX0=
