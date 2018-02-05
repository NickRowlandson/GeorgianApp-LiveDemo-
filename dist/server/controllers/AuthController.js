"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");
var MailService = require("../services/MailService");
var sql = require('mssql');
var config = require('../config');
config = config.db;
var AuthController = /** @class */ (function () {
    function AuthController() {
    }
    // Login Authentication
    AuthController.prototype.auth = function (req, res) {
        try {
            var _username = req.body.username;
            var _password = req.body.password;
            var response;
            sql.connect(config).then(function (connection) {
                sql.query(templateObject_1 || (templateObject_1 = __makeTemplateObject(["SELECT * FROM Users WHERE username = ", ""], ["SELECT * FROM Users WHERE username = ", ""])), _username).then(function (user) {
                    if (bcrypt.compareSync(_password, user[0].password)) {
                        var token = jwt.sign({ userid: user[0].userID }, "f9b574a2fc0d77986cb7ebe21a0dea480f5f21931abfa5cf329a45ecc0c8e1ff");
                        var statusToken = { status: 200, body: { token: token, userID: user[0].userID, username: user[0].username, userType: user[0].userType, active: user[0].active } };
                        response = JSON.stringify(statusToken);
                    }
                    else {
                        response = false;
                    }
                    res.send(response);
                }).catch(function (err) {
                    response = { "error": err };
                    res.send(response);
                });
            }).catch(function (err) {
                response = { "error": err };
                res.send(response);
            });
        }
        catch (e) {
            console.log(e);
            res.send({ "error": "error in your request" });
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
                    var query = "SELECT * FROM Users WHERE userID = '" + _id + "'";
                    sql.connect(config)
                        .then(function (connection) {
                        new sql.Request(connection)
                            .query(query)
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
                            res.send({ "error": "error" });
                            console.log(" " + err);
                        });
                    });
                });
            }
            else {
                res.send({ error: "No auth header" });
            }
        }
        catch (e) {
            console.log(e);
            res.send({ "error": "error in your request" });
        }
    };
    AuthController.prototype.resetPassword = function (req, res) {
        try {
            var _userID = req.body.userID;
            var _password = req.body.password;
            var salt = bcrypt.genSaltSync(10);
            // Hash the password with the salt
            _password = bcrypt.hashSync(_password, salt);
            sql.connect(config)
                .then(function (connection) {
                new sql.Request(connection)
                    .query("UPDATE Users SET password='" + _password + "', active='true' WHERE userID='" + _userID + "'")
                    .then(function (recordset) {
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
            console.log(err);
            res.send({ "error": "error in your request" });
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
            sql.connect(config)
                .then(function (connection) {
                new sql.Request(connection)
                    .query("UPDATE Users SET password='" + _password + "', active='false' WHERE email='" + _email + "'")
                    .then(function (recordset) {
                    // setup email data with unicode symbols
                    var mailOptions = {
                        from: '"Georgian Academic & Career Prep"',
                        to: _email,
                        subject: 'Password Reset',
                        text: '',
                        html: 'Here is your new temporary password: <b>' + randomstring + '</b><br /> Please login at http://georgianapp.azurewebsites.net <br /><br /> Thankyou' // html body
                    };
                    new MailService().sendMessage(" Reset Password", mailOptions);
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
            console.log(err);
            res.send({ "error": "error in your request" });
        }
    };
    return AuthController;
}());
var templateObject_1;
module.exports = AuthController;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NlcnZlci9zcmMvY29udHJvbGxlcnMvQXV0aENvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFDQSxrQ0FBcUM7QUFDckMsK0JBQWtDO0FBQ2xDLElBQU0sV0FBVyxHQUFHLE9BQU8sQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDO0FBQ3ZELElBQUksR0FBRyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUUzQixJQUFJLE1BQU0sR0FBRyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUM7QUFDbEMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxFQUFFLENBQUM7QUFFbkI7SUFBQTtJQXNKQSxDQUFDO0lBcEpDLHVCQUF1QjtJQUN2Qiw2QkFBSSxHQUFKLFVBQUssR0FBb0IsRUFBRSxHQUFxQjtRQUM5QyxJQUFJLENBQUM7WUFDSCxJQUFJLFNBQVMsR0FBVyxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQztZQUMxQyxJQUFJLFNBQVMsR0FBVyxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQztZQUMxQyxJQUFJLFFBQVEsQ0FBQztZQUViLEdBQUcsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVMsVUFBVTtnQkFDMUMsR0FBRyxDQUFDLEtBQUssOEdBQUEsdUNBQXdDLEVBQVMsRUFBRSxLQUFYLFNBQVMsRUFBRyxJQUFJLENBQUMsVUFBUyxJQUFJO29CQUMzRSxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUNwRCxJQUFJLEtBQUssR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLEVBQUUsRUFBRSxrRUFBa0UsQ0FBQyxDQUFDO3dCQUNySCxJQUFJLFdBQVcsR0FBRyxFQUFF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c0NvbnRlbnQiOlsiaW1wb3J0IGV4cHJlc3MgPSByZXF1aXJlKFwiZXhwcmVzc1wiKTtcclxuaW1wb3J0IGp3dCA9IHJlcXVpcmUoJ2pzb253ZWJ0b2tlbicpO1xyXG5pbXBvcnQgYmNyeXB0ID0gcmVxdWlyZSgnYmNyeXB0Jyk7XHJcbmNvbnN0IE1haWxTZXJ2aWNlID0gcmVxdWlyZShcIi4uL3NlcnZpY2VzL01haWxTZXJ2aWNlXCIpO1xyXG52YXIgc3FsID0gcmVxdWlyZSgnbXNzcWwnKTtcclxuXHJcbnZhciBjb25maWcgPSByZXF1aXJlKCcuLi9jb25maWcnKTtcclxuY29uZmlnID0gY29uZmlnLmRiO1xyXG5cclxuY2xhc3MgQXV0aENvbnRyb2xsZXIge1xyXG5cclxuICAvLyBMb2dpbiBBdXRoZW50aWNhdGlvblxyXG4gIGF1dGgocmVxOiBleHByZXNzLlJlcXVlc3QsIHJlczogZXhwcmVzcy5SZXNwb25zZSk6IHZvaWQge1xyXG4gICAgdHJ5IHtcclxuICAgICAgdmFyIF91c2VybmFtZTogc3RyaW5nID0gcmVxLmJvZHkudXNlcm5hbWU7XHJcbiAgICAgIHZhciBfcGFzc3dvcmQ6IHN0cmluZyA9IHJlcS5ib2R5LnBhc3N3b3JkO1xyXG4gICAgICB2YXIgcmVzcG9uc2U7XHJcblxyXG4gICAgICBzcWwuY29ubmVjdChjb25maWcpLnRoZW4oZnVuY3Rpb24oY29ubmVjdGlvbikge1xyXG4gICAgICAgIHNxbC5xdWVyeWBTRUxFQ1QgKiBGUk9NIFVzZXJzIFdIRVJFIHVzZXJuYW1lID0gJHtfdXNlcm5hbWV9YC50aGVuKGZ1bmN0aW9uKHVzZXIpIHtcclxuICAgICAgICAgICAgaWYgKGJjcnlwdC5jb21wYXJlU3luYyhfcGFzc3dvcmQsIHVzZXJbMF0ucGFzc3dvcmQpKSB7XHJcbiAgICAgICAgICAgICAgdmFyIHRva2VuID0gand0LnNpZ24oeyB1c2VyaWQ6IHVzZXJbMF0udXNlcklEIH0sIFwiZjliNTc0YTJmYzBkNzc5ODZjYjdlYmUyMWEwZGVhNDgwZjVmMjE5MzFhYmZhNWNmMzI5YTQ1ZWNjMGM4ZTFmZlwiKTtcclxuICAgICAgICAgICAgICB2YXIgc3RhdHVzVG9rZW4gPSB7IHN0YXR1czogMjAwLCBib2R5OiB7IHRva2VuOiB0b2tlbiwgdXNlcklEOiB1c2VyWzBdLnVzZXJJRCwgdXNlcm5hbWU6IHVzZXJbMF0udXNlcm5hbWUsIHVzZXJUeXBlOiB1c2VyWzBdLnVzZXJUeXBlLCBhY3RpdmU6IHVzZXJbMF0uYWN0aXZlIH0gfTtcclxuICAgICAgICAgICAgICByZXNwb25zZSA9IEpTT04uc3RyaW5naWZ5KHN0YXR1c1Rva2VuKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICByZXNwb25zZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJlcy5zZW5kKHJlc3BvbnNlKTtcclxuICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGVycikge1xyXG4gICAgICAgICAgICByZXNwb25zZSA9IHsgXCJlcnJvclwiOiBlcnIgfTtcclxuICAgICAgICAgICAgcmVzLnNlbmQocmVzcG9uc2UpO1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGVycikge1xyXG4gICAgICAgIHJlc3BvbnNlID0geyBcImVycm9yXCI6IGVyciB9O1xyXG4gICAgICAgIHJlcy5zZW5kKHJlc3BvbnNlKTtcclxuICAgICAgfSk7XHJcblxyXG4gICAgfVxyXG4gICAgY2F0Y2ggKGUpIHtcclxuICAgICAgY29uc29sZS5sb2coZSk7XHJcbiAgICAgIHJlcy5zZW5kKHsgXCJlcnJvclwiOiBcImVycm9yIGluIHlvdXIgcmVxdWVzdFwiIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLy9EZWNvZGUgdG9rZW4gYW5kIGNoZWNrIGlmIHVzZXIgaXMgYXV0aG9yaXplZFxyXG4gIGF1dGhVc2VyKHJlcTogZXhwcmVzcy5SZXF1ZXN0LCByZXM6IGV4cHJlc3MuUmVzcG9uc2UsIGRhdGEpOiB2b2lkIHtcclxuICAgIHRyeSB7XHJcbiAgICAgIGlmIChyZXEuaGVhZGVycyAmJiByZXEuaGVhZGVycy5hdXRob3JpemF0aW9uKSB7XHJcbiAgICAgICAgand0LnZlcmlmeShyZXEuaGVhZGVycy5hdXRob3JpemF0aW9uLCAnZjliNTc0YTJmYzBkNzc5ODZjYjdlYmUyMWEwZGVhNDgwZjVmMjE5MzFhYmZhNWNmMzI5YTQ1ZWNjMGM4ZTFmZicsIGZ1bmN0aW9uKGVyciwgZGVjb2RlZCkge1xyXG4gICAgICAgICAgaWYgKGVycikge1xyXG4gICAgICAgICAgICByZXR1cm4gcmVzLnNlbmQoeyBlcnJvcjogXCJUaGVyZSB3YXMgYW4gZXJyb3JcIiB9KTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGlmIChkZWNvZGVkID09PSBudWxsIHx8IE9iamVjdC5rZXlzKGRlY29kZWQpLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICAgIHJldHVybiByZXMuc2VuZCh7IGVycm9yOiBcIk5vIHZhbHVlcyBpbiB0b2tlblwiIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICB2YXIgX2lkID0gZGVjb2RlZC51c2VyaWQ7XHJcbiAgICAgICAgICB2YXIgcXVlcnkgPSBcIlNFTEVDVCAqIEZST00gVXNlcnMgV0hFUkUgdXNlcklEID0gJ1wiICsgX2lkICsgXCInXCI7XHJcbiAgICAgICAgICBzcWwuY29ubmVjdChjb25maWcpXHJcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKGNvbm5lY3Rpb24pIHtcclxuICAgICAgICAgICAgICBuZXcgc3FsLlJlcXVlc3QoY29ubmVjdGlvbilcclxuICAgICAgICAgICAgICAgIC5xdWVyeShxdWVyeSlcclxuICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKHVzZXIpIHtcclxuICAgICAgICAgICAgICAgICAgdmFyIGhhc1NvbWUgPSBkYXRhLnJlcXVpcmVkQXV0aC5zb21lKGZ1bmN0aW9uKHYpe1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB1c2VyWzBdLnVzZXJUeXBlLmluZGV4T2YodikgPj0gMDtcclxuICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgaWYgKGhhc1NvbWUpIHtcclxuICAgICAgICAgICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgZGF0YS5kb25lKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIuc3RhY2spO1xyXG4gICAgICAgICAgICAgICAgICAgICAgdGhyb3cgXCJUaGVyZSB3YXMgYW4gaXNzdWUgaW4gdGhlIGxvZ2ljIGRvbmUgYWZ0ZXIgdGhlIGF1dGhlbnRpY2F0aW9uXCI7IC8vIFRoaXMgd2lsbCB0aHJvdyB0byBjYXRjaCBvbiBsaW5lIDgzXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlcy5zZW5kKHsgc3RhdHVzOiAnNDAzJyB9KTtcclxuICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSkuY2F0Y2goZXJyID0+IHtcclxuICAgICAgICAgICAgICAgICAgcmVzLnNlbmQoeyBcImVycm9yXCI6IFwiZXJyb3JcIiB9KTtcclxuICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCIgXCIgKyBlcnIpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJlcy5zZW5kKHsgZXJyb3I6IFwiTm8gYXV0aCBoZWFkZXJcIiB9KTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgY2F0Y2ggKGUpIHtcclxuICAgICAgY29uc29sZS5sb2coZSk7XHJcbiAgICAgIHJlcy5zZW5kKHsgXCJlcnJvclwiOiBcImVycm9yIGluIHlvdXIgcmVxdWVzdFwiIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcmVzZXRQYXNzd29yZChyZXE6IGV4cHJlc3MuUmVxdWVzdCwgcmVzOiBleHByZXNzLlJlc3BvbnNlKTogdm9pZCB7XHJcbiAgICB0cnkge1xyXG4gICAgICB2YXIgX3VzZXJJRDogc3RyaW5nID0gcmVxLmJvZHkudXNlcklEO1xyXG4gICAgICB2YXIgX3Bhc3N3b3JkOiBzdHJpbmcgPSByZXEuYm9keS5wYXNzd29yZDtcclxuICAgICAgdmFyIHNhbHQgPSBiY3J5cHQuZ2VuU2FsdFN5bmMoMTApO1xyXG4gICAgICAvLyBIYXNoIHRoZSBwYXNzd29yZCB3aXRoIHRoZSBzYWx0XHJcbiAgICAgIF9wYXNzd29yZCA9IGJjcnlwdC5oYXNoU3luYyhfcGFzc3dvcmQsIHNhbHQpO1xyXG5cclxuICAgICAgc3FsLmNvbm5lY3QoY29uZmlnKVxyXG4gICAgICAgIC50aGVuKGZ1bmN0aW9uKGNvbm5lY3Rpb24pIHtcclxuICAgICAgICAgIG5ldyBzcWwuUmVxdWVzdChjb25uZWN0aW9uKVxyXG4gICAgICAgICAgICAucXVlcnkoXCJVUERBVEUgVXNlcnMgU0VUIHBhc3N3b3JkPSdcIiArIF9wYXNzd29yZCArIFwiJywgYWN0aXZlPSd0cnVlJyBXSEVSRSB1c2VySUQ9J1wiICsgX3VzZXJJRCArIFwiJ1wiKVxyXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbihyZWNvcmRzZXQpIHtcclxuICAgICAgICAgICAgICByZXMuc2VuZCh7IFwic3VjY2Vzc1wiOiBcInN1Y2Nlc3NcIiB9KTtcclxuICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XHJcbiAgICAgICAgICAgICAgcmVzLnNlbmQoeyBcImVycm9yXCI6IFwiZXJyb3JcIiB9KTtcclxuICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlVwZGF0ZSB1c2VyIHBhc3N3b3JkIFwiICsgZXJyKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xyXG4gICAgICAgICAgcmVzLnNlbmQoeyBcImVycm9yXCI6IFwiZXJyb3JcIiB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICBjb25zb2xlLmxvZyhlcnIpO1xyXG4gICAgICByZXMuc2VuZCh7IFwiZXJyb3JcIjogXCJlcnJvciBpbiB5b3VyIHJlcXVlc3RcIiB9KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHJlcXVlc3RSZXNldChyZXE6IGV4cHJlc3MuUmVxdWVzdCwgcmVzOiBleHByZXNzLlJlc3BvbnNlKTogdm9pZCB7XHJcbiAgICB0cnkge1xyXG4gICAgICB2YXIgX2VtYWlsOiBzdHJpbmcgPSByZXEucGFyYW1zLl9lbWFpbDtcclxuICAgICAgdmFyIHJhbmRvbXN0cmluZyA9IE1hdGgucmFuZG9tKCkudG9TdHJpbmcoMzYpLnNsaWNlKC04KTtcclxuICAgICAgcmFuZG9tc3RyaW5nID0gcmFuZG9tc3RyaW5nLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgcmFuZG9tc3RyaW5nLnNsaWNlKDEpO1xyXG4gICAgICB2YXIgc2FsdCA9IGJjcnlwdC5nZW5TYWx0U3luYygxMCk7XHJcbiAgICAgIC8vIEhhc2ggdGhlIHBhc3N3b3JkIHdpdGggdGhlIHNhbHRcclxuICAgICAgdmFyIF9wYXNzd29yZCA9IGJjcnlwdC5oYXNoU3luYyhyYW5kb21zdHJpbmcsIHNhbHQpO1xyXG5cclxuICAgICAgc3FsLmNvbm5lY3QoY29uZmlnKVxyXG4gICAgICAgIC50aGVuKGZ1bmN0aW9uKGNvbm5lY3Rpb24pIHtcclxuICAgICAgICAgIG5ldyBzcWwuUmVxdWVzdChjb25uZWN0aW9uKVxyXG4gICAgICAgICAgICAucXVlcnkoXCJVUERBVEUgVXNlcnMgU0VUIHBhc3N3b3JkPSdcIiArIF9wYXNzd29yZCArIFwiJywgYWN0aXZlPSdmYWxzZScgV0hFUkUgZW1haWw9J1wiICsgX2VtYWlsICsgXCInXCIpXHJcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKHJlY29yZHNldCkge1xyXG4gICAgICAgICAgICAgIC8vIHNldHVwIGVtYWlsIGRhdGEgd2l0aCB1bmljb2RlIHN5bWJvbHNcclxuICAgICAgICAgICAgICBsZXQgbWFpbE9wdGlvbnMgPSB7XHJcbiAgICAgICAgICAgICAgICBmcm9tOiAnXCJHZW9yZ2lhbiBBY2FkZW1pYyAmIENhcmVlciBQcmVwXCInLCAvLyBzZW5kZXIgYWRkcmVzc1xyXG4gICAgICAgICAgICAgICAgdG86IF9lbWFpbCwgLy8gbGlzdCBvZiByZWNlaXZlcnNcclxuICAgICAgICAgICAgICAgIHN1YmplY3Q6ICdQYXNzd29yZCBSZXNldCcsIC8vIFN1YmplY3QgbGluZVxyXG4gICAgICAgICAgICAgICAgdGV4dDogJycsIC8vIHBsYWluIHRleHQgYm9keVxyXG4gICAgICAgICAgICAgICAgaHRtbDogJ0hlcmUgaXMgeW91ciBuZXcgdGVtcG9yYXJ5IHBhc3N3b3JkOiA8Yj4nICsgcmFuZG9tc3RyaW5nICsgJzwvYj48YnIgLz4gUGxlYXNlIGxvZ2luIGF0IGh0dHA6Ly9nZW9yZ2lhbmFwcC5henVyZXdlYnNpdGVzLm5ldCA8YnIgLz48YnIgLz4gVGhhbmt5b3UnLy8gaHRtbCBib2R5XHJcbiAgICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgICAgbmV3IE1haWxTZXJ2aWNlKCkuc2VuZE1lc3NhZ2UoXCIgUmVzZXQgUGFzc3dvcmRcIiwgbWFpbE9wdGlvbnMpO1xyXG4gICAgICAgICAgICAgIHJlcy5zZW5kKHsgXCJzdWNjZXNzXCI6IFwic3VjY2Vzc1wiIH0pO1xyXG4gICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbihlcnIpIHtcclxuICAgICAgICAgICAgICByZXMuc2VuZCh7IFwiZXJyb3JcIjogXCJlcnJvclwiIH0pO1xyXG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiVXBkYXRlIHVzZXIgcGFzc3dvcmQgXCIgKyBlcnIpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KS5jYXRjaChmdW5jdGlvbihlcnIpIHtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XHJcbiAgICAgICAgICByZXMuc2VuZCh7IFwiZXJyb3JcIjogXCJlcnJvclwiIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSBjYXRjaChlcnIpIHtcclxuICAgICAgY29uc29sZS5sb2coZXJyKTtcclxuICAgICAgcmVzLnNlbmQoeyBcImVycm9yXCI6IFwiZXJyb3IgaW4geW91ciByZXF1ZXN0XCIgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxufVxyXG5leHBvcnQgPSBBdXRoQ29udHJvbGxlcjtcclxuIl19
