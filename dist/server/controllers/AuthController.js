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
            sql.connect(config)
                .then(function (connection) {
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
                console.log("AUTHORIZING USER");
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
                sql.query(templateObject_2 || (templateObject_2 = __makeTemplateObject(["UPDATE Users SET password= $ {_password}, active='false' WHERE email = ", ""], ["UPDATE Users SET password= $ {_password}, active='false' WHERE email = ", ""])), _email).then(function (recordset) {
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
var templateObject_1, templateObject_2;
module.exports = AuthController;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NlcnZlci9zcmMvY29udHJvbGxlcnMvQXV0aENvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFDQSxrQ0FBcUM7QUFDckMsK0JBQWtDO0FBQ2xDLElBQU0sV0FBVyxHQUFHLE9BQU8sQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDO0FBQ3ZELElBQUksR0FBRyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUUzQixJQUFJLE1BQU0sR0FBRyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUM7QUFDbEMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxFQUFFLENBQUM7QUFFbkI7SUFBQTtJQXNKQSxDQUFDO0lBcEpDLHVCQUF1QjtJQUN2Qiw2QkFBSSxHQUFKLFVBQUssR0FBb0IsRUFBRSxHQUFxQjtRQUM5QyxJQUFJLENBQUM7WUFDSCxJQUFJLFNBQVMsR0FBVyxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQztZQUMxQyxJQUFJLFNBQVMsR0FBVyxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQztZQUMxQyxJQUFJLFFBQVEsQ0FBQztZQUViLEdBQUcsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDO2lCQUNsQixJQUFJLENBQUMsVUFBUyxVQUFVO2dCQUN2QixHQUFHLENBQUMsS0FBSyw4R0FBQSx1Q0FBd0MsRUFBUyxFQUFFLEtBQVgsU0FBUyxFQUFHLElBQUksQ0FBQyxVQUFTLElBQUk7b0JBQzNFLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQ3BELElBQUksS0FBSyxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sRUFBRSxFQUFFLGtFQUFrRSxDQUFDLENBQUM7d0JBQ3JILElBQUksV0FBVyxHQUFHLEVB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cG9ydCBleHByZXNzID0gcmVxdWlyZShcImV4cHJlc3NcIik7XHJcbmltcG9ydCBqd3QgPSByZXF1aXJlKCdqc29ud2VidG9rZW4nKTtcclxuaW1wb3J0IGJjcnlwdCA9IHJlcXVpcmUoJ2JjcnlwdCcpO1xyXG5jb25zdCBNYWlsU2VydmljZSA9IHJlcXVpcmUoXCIuLi9zZXJ2aWNlcy9NYWlsU2VydmljZVwiKTtcclxudmFyIHNxbCA9IHJlcXVpcmUoJ21zc3FsJyk7XHJcblxyXG52YXIgY29uZmlnID0gcmVxdWlyZSgnLi4vY29uZmlnJyk7XHJcbmNvbmZpZyA9IGNvbmZpZy5kYjtcclxuXHJcbmNsYXNzIEF1dGhDb250cm9sbGVyIHtcclxuXHJcbiAgLy8gTG9naW4gQXV0aGVudGljYXRpb25cclxuICBhdXRoKHJlcTogZXhwcmVzcy5SZXF1ZXN0LCByZXM6IGV4cHJlc3MuUmVzcG9uc2UpOiB2b2lkIHtcclxuICAgIHRyeSB7XHJcbiAgICAgIHZhciBfdXNlcm5hbWU6IHN0cmluZyA9IHJlcS5ib2R5LnVzZXJuYW1lO1xyXG4gICAgICB2YXIgX3Bhc3N3b3JkOiBzdHJpbmcgPSByZXEuYm9keS5wYXNzd29yZDtcclxuICAgICAgdmFyIHJlc3BvbnNlO1xyXG5cclxuICAgICAgc3FsLmNvbm5lY3QoY29uZmlnKVxyXG4gICAgICAudGhlbihmdW5jdGlvbihjb25uZWN0aW9uKSB7XHJcbiAgICAgICAgc3FsLnF1ZXJ5YFNFTEVDVCAqIEZST00gVXNlcnMgV0hFUkUgdXNlcm5hbWUgPSAke191c2VybmFtZX1gLnRoZW4oZnVuY3Rpb24odXNlcikge1xyXG4gICAgICAgICAgICBpZiAoYmNyeXB0LmNvbXBhcmVTeW5jKF9wYXNzd29yZCwgdXNlclswXS5wYXNzd29yZCkpIHtcclxuICAgICAgICAgICAgICB2YXIgdG9rZW4gPSBqd3Quc2lnbih7IHVzZXJpZDogdXNlclswXS51c2VySUQgfSwgXCJmOWI1NzRhMmZjMGQ3Nzk4NmNiN2ViZTIxYTBkZWE0ODBmNWYyMTkzMWFiZmE1Y2YzMjlhNDVlY2MwYzhlMWZmXCIpO1xyXG4gICAgICAgICAgICAgIHZhciBzdGF0dXNUb2tlbiA9IHsgc3RhdHVzOiAyMDAsIGJvZHk6IHsgdG9rZW46IHRva2VuLCB1c2VySUQ6IHVzZXJbMF0udXNlcklELCB1c2VybmFtZTogdXNlclswXS51c2VybmFtZSwgdXNlclR5cGU6IHVzZXJbMF0udXNlclR5cGUsIGFjdGl2ZTogdXNlclswXS5hY3RpdmUgfSB9O1xyXG4gICAgICAgICAgICAgIHJlc3BvbnNlID0gSlNPTi5zdHJpbmdpZnkoc3RhdHVzVG9rZW4pO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIHJlc3BvbnNlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmVzLnNlbmQocmVzcG9uc2UpO1xyXG4gICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XHJcbiAgICAgICAgICAgIHJlc3BvbnNlID0geyBcImVycm9yXCI6IGVyciB9O1xyXG4gICAgICAgICAgICByZXMuc2VuZChyZXNwb25zZSk7XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgfSkuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XHJcbiAgICAgICAgcmVzcG9uc2UgPSB7IFwiZXJyb3JcIjogZXJyIH07XHJcbiAgICAgICAgcmVzLnNlbmQocmVzcG9uc2UpO1xyXG4gICAgICB9KTtcclxuXHJcbiAgICB9XHJcbiAgICBjYXRjaCAoZSkge1xyXG4gICAgICBjb25zb2xlLmxvZyhlKTtcclxuICAgICAgcmVzLnNlbmQoeyBcImVycm9yXCI6IFwiZXJyb3IgaW4geW91ciByZXF1ZXN0XCIgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvL0RlY29kZSB0b2tlbiBhbmQgY2hlY2sgaWYgdXNlciBpcyBhdXRob3JpemVkXHJcbiAgYXV0aFVzZXIocmVxOiBleHByZXNzLlJlcXVlc3QsIHJlczogZXhwcmVzcy5SZXNwb25zZSwgZGF0YSk6IHZvaWQge1xyXG4gICAgdHJ5IHtcclxuICAgICAgaWYgKHJlcS5oZWFkZXJzICYmIHJlcS5oZWFkZXJzLmF1dGhvcml6YXRpb24pIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIkFVVEhPUklaSU5HIFVTRVJcIiApO1xyXG4gICAgICAgIGp3dC52ZXJpZnkocmVxLmhlYWRlcnMuYXV0aG9yaXphdGlvbiwgJ2Y5YjU3NGEyZmMwZDc3OTg2Y2I3ZWJlMjFhMGRlYTQ4MGY1ZjIxOTMxYWJmYTVjZjMyOWE0NWVjYzBjOGUxZmYnLCBmdW5jdGlvbihlcnIsIGRlY29kZWQpIHtcclxuICAgICAgICAgIGlmIChlcnIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHJlcy5zZW5kKHsgZXJyb3I6IFwiVGhlcmUgd2FzIGFuIGVycm9yXCIgfSk7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAoZGVjb2RlZCA9PT0gbnVsbCB8fCBPYmplY3Qua2V5cyhkZWNvZGVkKS5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgICByZXR1cm4gcmVzLnNlbmQoeyBlcnJvcjogXCJObyB2YWx1ZXMgaW4gdG9rZW5cIiB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgdmFyIF9pZCA9IGRlY29kZWQudXNlcmlkO1xyXG4gICAgICAgICAgdmFyIHF1ZXJ5ID0gXCJTRUxFQ1QgKiBGUk9NIFVzZXJzIFdIRVJFIHVzZXJJRCA9ICdcIiArIF9pZCArIFwiJ1wiO1xyXG4gICAgICAgICAgc3FsLmNvbm5lY3QoY29uZmlnKVxyXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbihjb25uZWN0aW9uKSB7XHJcbiAgICAgICAgICAgICAgbmV3IHNxbC5SZXF1ZXN0KGNvbm5lY3Rpb24pXHJcbiAgICAgICAgICAgICAgICAucXVlcnkocXVlcnkpXHJcbiAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbih1c2VyKSB7XHJcbiAgICAgICAgICAgICAgICAgIHZhciBoYXNTb21lID0gZGF0YS5yZXF1aXJlZEF1dGguc29tZShmdW5jdGlvbih2KXtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdXNlclswXS51c2VyVHlwZS5pbmRleE9mKHYpID49IDA7XHJcbiAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgIGlmIChoYXNTb21lKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgICAgICAgIGRhdGEuZG9uZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyLnN0YWNrKTtcclxuICAgICAgICAgICAgICAgICAgICAgIHRocm93IFwiVGhlcmUgd2FzIGFuIGlzc3VlIGluIHRoZSBsb2dpYyBkb25lIGFmdGVyIHRoZSBhdXRoZW50aWNhdGlvblwiOyAvLyBUaGlzIHdpbGwgdGhyb3cgdG8gY2F0Y2ggb24gbGluZSA4M1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICByZXMuc2VuZCh7IHN0YXR1czogJzQwMycgfSk7XHJcbiAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pLmNhdGNoKGVyciA9PiB7XHJcbiAgICAgICAgICAgICAgICAgIHJlcy5zZW5kKHsgXCJlcnJvclwiOiBcImVycm9yXCIgfSk7XHJcbiAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiIFwiICsgZXJyKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICByZXMuc2VuZCh7IGVycm9yOiBcIk5vIGF1dGggaGVhZGVyXCIgfSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGNhdGNoIChlKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKGUpO1xyXG4gICAgICByZXMuc2VuZCh7IFwiZXJyb3JcIjogXCJlcnJvciBpbiB5b3VyIHJlcXVlc3RcIiB9KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHJlc2V0UGFzc3dvcmQocmVxOiBleHByZXNzLlJlcXVlc3QsIHJlczogZXhwcmVzcy5SZXNwb25zZSk6IHZvaWQge1xyXG4gICAgdHJ5IHtcclxuICAgICAgdmFyIF91c2VySUQ6IHN0cmluZyA9IHJlcS5ib2R5LnVzZXJJRDtcclxuICAgICAgdmFyIF9wYXNzd29yZDogc3RyaW5nID0gcmVxLmJvZHkucGFzc3dvcmQ7XHJcbiAgICAgIHZhciBzYWx0ID0gYmNyeXB0LmdlblNhbHRTeW5jKDEwKTtcclxuICAgICAgLy8gSGFzaCB0aGUgcGFzc3dvcmQgd2l0aCB0aGUgc2FsdFxyXG4gICAgICBfcGFzc3dvcmQgPSBiY3J5cHQuaGFzaFN5bmMoX3Bhc3N3b3JkLCBzYWx0KTtcclxuXHJcbiAgICAgIHNxbC5jb25uZWN0KGNvbmZpZylcclxuICAgICAgLnRoZW4oZnVuY3Rpb24oY29ubmVjdGlvbikge1xyXG4gICAgICAgICAgbmV3IHNxbC5SZXF1ZXN0KGNvbm5lY3Rpb24pXHJcbiAgICAgICAgICAgIC5xdWVyeShcIlVQREFURSBVc2VycyBTRVQgcGFzc3dvcmQ9J1wiICsgX3Bhc3N3b3JkICsgXCInLCBhY3RpdmU9J3RydWUnIFdIRVJFIHVzZXJJRD0nXCIgKyBfdXNlcklEICsgXCInXCIpXHJcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKHJlY29yZHNldCkge1xyXG4gICAgICAgICAgICAgIHJlcy5zZW5kKHsgXCJzdWNjZXNzXCI6IFwic3VjY2Vzc1wiIH0pO1xyXG4gICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbihlcnIpIHtcclxuICAgICAgICAgICAgICByZXMuc2VuZCh7IFwiZXJyb3JcIjogXCJlcnJvclwiIH0pO1xyXG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiVXBkYXRlIHVzZXIgcGFzc3dvcmQgXCIgKyBlcnIpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KS5jYXRjaChmdW5jdGlvbihlcnIpIHtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XHJcbiAgICAgICAgICByZXMuc2VuZCh7IFwiZXJyb3JcIjogXCJlcnJvclwiIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKGVycik7XHJcbiAgICAgIHJlcy5zZW5kKHsgXCJlcnJvclwiOiBcImVycm9yIGluIHlvdXIgcmVxdWVzdFwiIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcmVxdWVzdFJlc2V0KHJlcTogZXhwcmVzcy5SZXF1ZXN0LCByZXM6IGV4cHJlc3MuUmVzcG9uc2UpOiB2b2lkIHtcclxuICAgIHRyeSB7XHJcbiAgICAgIHZhciBfZW1haWw6IHN0cmluZyA9IHJlcS5wYXJhbXMuX2VtYWlsO1xyXG4gICAgICB2YXIgcmFuZG9tc3RyaW5nID0gTWF0aC5yYW5kb20oKS50b1N0cmluZygzNikuc2xpY2UoLTgpO1xyXG4gICAgICByYW5kb21zdHJpbmcgPSByYW5kb21zdHJpbmcuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyByYW5kb21zdHJpbmcuc2xpY2UoMSk7XHJcbiAgICAgIHZhciBzYWx0ID0gYmNyeXB0LmdlblNhbHRTeW5jKDEwKTtcclxuICAgICAgLy8gSGFzaCB0aGUgcGFzc3dvcmQgd2l0aCB0aGUgc2FsdFxyXG4gICAgICB2YXIgX3Bhc3N3b3JkID0gYmNyeXB0Lmhhc2hTeW5jKHJhbmRvbXN0cmluZywgc2FsdCk7XHJcblxyXG4gICAgICBzcWwuY29ubmVjdChjb25maWcpXHJcbiAgICAgIC50aGVuKGZ1bmN0aW9uKGNvbm5lY3Rpb24pIHtcclxuICAgICAgICAgIHNxbC5xdWVyeWBVUERBVEUgVXNlcnMgU0VUIHBhc3N3b3JkPSAkIHtfcGFzc3dvcmR9LCBhY3RpdmU9J2ZhbHNlJyBXSEVSRSBlbWFpbCA9ICR7X2VtYWlsfWAudGhlbihmdW5jdGlvbihyZWNvcmRzZXQpIHtcclxuICAgICAgICAgICAgICAvLyBzZXR1cCBlbWFpbCBkYXRhIHdpdGggdW5pY29kZSBzeW1ib2xzXHJcbiAgICAgICAgICAgICAgbGV0IG1haWxPcHRpb25zID0ge1xyXG4gICAgICAgICAgICAgICAgZnJvbTogJ1wiR2VvcmdpYW4gQWNhZGVtaWMgJiBDYXJlZXIgUHJlcFwiJywgLy8gc2VuZGVyIGFkZHJlc3NcclxuICAgICAgICAgICAgICAgIHRvOiBfZW1haWwsIC8vIGxpc3Qgb2YgcmVjZWl2ZXJzXHJcbiAgICAgICAgICAgICAgICBzdWJqZWN0OiAnUGFzc3dvcmQgUmVzZXQnLCAvLyBTdWJqZWN0IGxpbmVcclxuICAgICAgICAgICAgICAgIHRleHQ6ICcnLCAvLyBwbGFpbiB0ZXh0IGJvZHlcclxuICAgICAgICAgICAgICAgIGh0bWw6ICdIZXJlIGlzIHlvdXIgbmV3IHRlbXBvcmFyeSBwYXNzd29yZDogPGI+JyArIHJhbmRvbXN0cmluZyArICc8L2I+PGJyIC8+IFBsZWFzZSBsb2dpbiBhdCBodHRwOi8vZ2VvcmdpYW5hcHAuYXp1cmV3ZWJzaXRlcy5uZXQgPGJyIC8+PGJyIC8+IFRoYW5reW91Jy8vIGh0bWwgYm9keVxyXG4gICAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAgIG5ldyBNYWlsU2VydmljZSgpLnNlbmRNZXNzYWdlKFwiIFJlc2V0IFBhc3N3b3JkXCIsIG1haWxPcHRpb25zKTtcclxuICAgICAgICAgICAgICByZXMuc2VuZCh7IFwic3VjY2Vzc1wiOiBcInN1Y2Nlc3NcIiB9KTtcclxuICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XHJcbiAgICAgICAgICAgICAgcmVzLnNlbmQoeyBcImVycm9yXCI6IFwiZXJyb3JcIiB9KTtcclxuICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlVwZGF0ZSB1c2VyIHBhc3N3b3JkIFwiICsgZXJyKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xyXG4gICAgICAgICAgcmVzLnNlbmQoeyBcImVycm9yXCI6IFwiZXJyb3JcIiB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH0gY2F0Y2goZXJyKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKGVycik7XHJcbiAgICAgIHJlcy5zZW5kKHsgXCJlcnJvclwiOiBcImVycm9yIGluIHlvdXIgcmVxdWVzdFwiIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbn1cclxuZXhwb3J0ID0gQXV0aENvbnRyb2xsZXI7XHJcbiJdfQ==
