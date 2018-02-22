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
            sql.connect(config).then(function (connection) {
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NlcnZlci9zcmMvY29udHJvbGxlcnMvQXV0aENvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFDQSxrQ0FBcUM7QUFDckMsK0JBQWtDO0FBQ2xDLElBQU0sV0FBVyxHQUFHLE9BQU8sQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDO0FBQ3ZELElBQUksR0FBRyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUUzQixJQUFJLE1BQU0sR0FBRyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUM7QUFDbEMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxFQUFFLENBQUM7QUFFbkI7SUFBQTtJQW1KQSxDQUFDO0lBakpDLHVCQUF1QjtJQUN2Qiw2QkFBSSxHQUFKLFVBQUssR0FBb0IsRUFBRSxHQUFxQjtRQUM5QyxJQUFJLENBQUM7WUFDSCxJQUFJLFNBQVMsR0FBVyxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQztZQUMxQyxJQUFJLFNBQVMsR0FBVyxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQztZQUMxQyxJQUFJLFFBQVEsQ0FBQztZQUViLEdBQUcsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVMsVUFBVTtnQkFDMUMsR0FBRyxDQUFDLEtBQUssOEdBQUEsdUNBQXdDLEVBQVMsRUFBRSxLQUFYLFNBQVMsRUFBRyxJQUFJLENBQUMsVUFBUyxJQUFJO29CQUMzRSxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUNwRCxJQUFJLEtBQUssR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLEVBQUUsRUFBRSxrRUFBa0UsQ0FBQyxDQUFDO3dCQUNySCxJQUFJLFdBQVcsR0FBRyxFQUFF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Z0I7d0JBQ3pCLElBQUksRUFBRSxFQUFFO3dCQUNSLElBQUksRUFBRSwwQ0FBMEMsR0FBRyxZQUFZLEdBQUcsdUZBQXVGLENBQUEsWUFBWTtxQkFDdEssQ0FBQztvQkFFRixJQUFJLFdBQVcsRUFBRSxDQUFDLFdBQVcsQ0FBQyxpQkFBaUIsRUFBRSxXQUFXLENBQUMsQ0FBQztvQkFDOUQsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsQ0FBQyxDQUFDO2dCQUNyQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsVUFBUyxHQUFHO29CQUNuQixHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxDQUFDLENBQUM7b0JBQy9CLE9BQU8sQ0FBQyxHQUFHLENBQUMsdUJBQXVCLEdBQUcsR0FBRyxDQUFDLENBQUM7Z0JBQzdDLENBQUMsQ0FBQyxDQUFDO1lBQ1AsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLFVBQVMsR0FBRztnQkFDbkIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDakIsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsQ0FBQyxDQUFDO1lBQ2pDLENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQztRQUFDLEtBQUssQ0FBQSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDWixPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ2pCLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsQ0FBQyxDQUFDO1FBQ2pELENBQUM7SUFDSCxDQUFDO0lBRUgscUJBQUM7QUFBRCxDQW5KQSxBQW1KQyxJQUFBOztBQUNELGlCQUFTLGNBQWMsQ0FBQyIsImZpbGUiOiJjb250cm9sbGVycy9BdXRoQ29udHJvbGxlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBleHByZXNzID0gcmVxdWlyZShcImV4cHJlc3NcIik7XHJcbmltcG9ydCBqd3QgPSByZXF1aXJlKCdqc29ud2VidG9rZW4nKTtcclxuaW1wb3J0IGJjcnlwdCA9IHJlcXVpcmUoJ2JjcnlwdCcpO1xyXG5jb25zdCBNYWlsU2VydmljZSA9IHJlcXVpcmUoXCIuLi9zZXJ2aWNlcy9NYWlsU2VydmljZVwiKTtcclxudmFyIHNxbCA9IHJlcXVpcmUoJ21zc3FsJyk7XHJcblxyXG52YXIgY29uZmlnID0gcmVxdWlyZSgnLi4vY29uZmlnJyk7XHJcbmNvbmZpZyA9IGNvbmZpZy5kYjtcclxuXHJcbmNsYXNzIEF1dGhDb250cm9sbGVyIHtcclxuXHJcbiAgLy8gTG9naW4gQXV0aGVudGljYXRpb25cclxuICBhdXRoKHJlcTogZXhwcmVzcy5SZXF1ZXN0LCByZXM6IGV4cHJlc3MuUmVzcG9uc2UpOiB2b2lkIHtcclxuICAgIHRyeSB7XHJcbiAgICAgIHZhciBfdXNlcm5hbWU6IHN0cmluZyA9IHJlcS5ib2R5LnVzZXJuYW1lO1xyXG4gICAgICB2YXIgX3Bhc3N3b3JkOiBzdHJpbmcgPSByZXEuYm9keS5wYXNzd29yZDtcclxuICAgICAgdmFyIHJlc3BvbnNlO1xyXG5cclxuICAgICAgc3FsLmNvbm5lY3QoY29uZmlnKS50aGVuKGZ1bmN0aW9uKGNvbm5lY3Rpb24pIHtcclxuICAgICAgICBzcWwucXVlcnlgU0VMRUNUICogRlJPTSBVc2VycyBXSEVSRSB1c2VybmFtZSA9ICR7X3VzZXJuYW1lfWAudGhlbihmdW5jdGlvbih1c2VyKSB7XHJcbiAgICAgICAgICAgIGlmIChiY3J5cHQuY29tcGFyZVN5bmMoX3Bhc3N3b3JkLCB1c2VyWzBdLnBhc3N3b3JkKSkge1xyXG4gICAgICAgICAgICAgIHZhciB0b2tlbiA9IGp3dC5zaWduKHsgdXNlcmlkOiB1c2VyWzBdLnVzZXJJRCB9LCBcImY5YjU3NGEyZmMwZDc3OTg2Y2I3ZWJlMjFhMGRlYTQ4MGY1ZjIxOTMxYWJmYTVjZjMyOWE0NWVjYzBjOGUxZmZcIik7XHJcbiAgICAgICAgICAgICAgdmFyIHN0YXR1c1Rva2VuID0geyBzdGF0dXM6IDIwMCwgYm9keTogeyB0b2tlbjogdG9rZW4sIHVzZXJJRDogdXNlclswXS51c2VySUQsIHVzZXJuYW1lOiB1c2VyWzBdLnVzZXJuYW1lLCB1c2VyVHlwZTogdXNlclswXS51c2VyVHlwZSwgYWN0aXZlOiB1c2VyWzBdLmFjdGl2ZSB9IH07XHJcbiAgICAgICAgICAgICAgcmVzcG9uc2UgPSBKU09OLnN0cmluZ2lmeShzdGF0dXNUb2tlbik7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgcmVzcG9uc2UgPSBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXMuc2VuZChyZXNwb25zZSk7XHJcbiAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbihlcnIpIHtcclxuICAgICAgICAgICAgcmVzcG9uc2UgPSB7IFwiZXJyb3JcIjogZXJyIH07XHJcbiAgICAgICAgICAgIHJlcy5zZW5kKHJlc3BvbnNlKTtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICB9KS5jYXRjaChmdW5jdGlvbihlcnIpIHtcclxuICAgICAgICByZXNwb25zZSA9IHsgXCJlcnJvclwiOiBlcnIgfTtcclxuICAgICAgICByZXMuc2VuZChyZXNwb25zZSk7XHJcbiAgICAgIH0pO1xyXG5cclxuICAgIH1cclxuICAgIGNhdGNoIChlKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKGUpO1xyXG4gICAgICByZXMuc2VuZCh7IFwiZXJyb3JcIjogXCJlcnJvciBpbiB5b3VyIHJlcXVlc3RcIiB9KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8vRGVjb2RlIHRva2VuIGFuZCBjaGVjayBpZiB1c2VyIGlzIGF1dGhvcml6ZWRcclxuICBhdXRoVXNlcihyZXE6IGV4cHJlc3MuUmVxdWVzdCwgcmVzOiBleHByZXNzLlJlc3BvbnNlLCBkYXRhKTogdm9pZCB7XHJcbiAgICB0cnkge1xyXG4gICAgICBpZiAocmVxLmhlYWRlcnMgJiYgcmVxLmhlYWRlcnMuYXV0aG9yaXphdGlvbikge1xyXG4gICAgICAgIGp3dC52ZXJpZnkocmVxLmhlYWRlcnMuYXV0aG9yaXphdGlvbiwgJ2Y5YjU3NGEyZmMwZDc3OTg2Y2I3ZWJlMjFhMGRlYTQ4MGY1ZjIxOTMxYWJmYTVjZjMyOWE0NWVjYzBjOGUxZmYnLCBmdW5jdGlvbihlcnIsIGRlY29kZWQpIHtcclxuICAgICAgICAgIGlmIChlcnIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHJlcy5zZW5kKHsgZXJyb3I6IFwiVGhlcmUgd2FzIGFuIGVycm9yXCIgfSk7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAoZGVjb2RlZCA9PT0gbnVsbCB8fCBPYmplY3Qua2V5cyhkZWNvZGVkKS5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgICByZXR1cm4gcmVzLnNlbmQoeyBlcnJvcjogXCJObyB2YWx1ZXMgaW4gdG9rZW5cIiB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgdmFyIF9pZCA9IGRlY29kZWQudXNlcmlkO1xyXG4gICAgICAgICAgdmFyIHF1ZXJ5ID0gXCJTRUxFQ1QgKiBGUk9NIFVzZXJzIFdIRVJFIHVzZXJJRCA9ICdcIiArIF9pZCArIFwiJ1wiO1xyXG4gICAgICAgICAgc3FsLmNvbm5lY3QoY29uZmlnKVxyXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbihjb25uZWN0aW9uKSB7XHJcbiAgICAgICAgICAgICAgbmV3IHNxbC5SZXF1ZXN0KGNvbm5lY3Rpb24pXHJcbiAgICAgICAgICAgICAgICAucXVlcnkocXVlcnkpXHJcbiAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbih1c2VyKSB7XHJcbiAgICAgICAgICAgICAgICAgIHZhciBoYXNTb21lID0gZGF0YS5yZXF1aXJlZEF1dGguc29tZShmdW5jdGlvbih2KXtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdXNlclswXS51c2VyVHlwZS5pbmRleE9mKHYpID49IDA7XHJcbiAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgIGlmIChoYXNTb21lKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgICAgICAgIGRhdGEuZG9uZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyLnN0YWNrKTtcclxuICAgICAgICAgICAgICAgICAgICAgIHRocm93IFwiVGhlcmUgd2FzIGFuIGlzc3VlIGluIHRoZSBsb2dpYyBkb25lIGFmdGVyIHRoZSBhdXRoZW50aWNhdGlvblwiOyAvLyBUaGlzIHdpbGwgdGhyb3cgdG8gY2F0Y2ggb24gbGluZSA4M1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICByZXMuc2VuZCh7IHN0YXR1czogJzQwMycgfSk7XHJcbiAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pLmNhdGNoKGVyciA9PiB7XHJcbiAgICAgICAgICAgICAgICAgIHJlcy5zZW5kKHsgXCJlcnJvclwiOiBcImVycm9yXCIgfSk7XHJcbiAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiIFwiICsgZXJyKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICByZXMuc2VuZCh7IGVycm9yOiBcIk5vIGF1dGggaGVhZGVyXCIgfSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGNhdGNoIChlKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKGUpO1xyXG4gICAgICByZXMuc2VuZCh7IFwiZXJyb3JcIjogXCJlcnJvciBpbiB5b3VyIHJlcXVlc3RcIiB9KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHJlc2V0UGFzc3dvcmQocmVxOiBleHByZXNzLlJlcXVlc3QsIHJlczogZXhwcmVzcy5SZXNwb25zZSk6IHZvaWQge1xyXG4gICAgdHJ5IHtcclxuICAgICAgdmFyIF91c2VySUQ6IHN0cmluZyA9IHJlcS5ib2R5LnVzZXJJRDtcclxuICAgICAgdmFyIF9wYXNzd29yZDogc3RyaW5nID0gcmVxLmJvZHkucGFzc3dvcmQ7XHJcbiAgICAgIHZhciBzYWx0ID0gYmNyeXB0LmdlblNhbHRTeW5jKDEwKTtcclxuICAgICAgLy8gSGFzaCB0aGUgcGFzc3dvcmQgd2l0aCB0aGUgc2FsdFxyXG4gICAgICBfcGFzc3dvcmQgPSBiY3J5cHQuaGFzaFN5bmMoX3Bhc3N3b3JkLCBzYWx0KTtcclxuXHJcbiAgICAgIHNxbC5jb25uZWN0KGNvbmZpZylcclxuICAgICAgICAudGhlbihmdW5jdGlvbihjb25uZWN0aW9uKSB7XHJcbiAgICAgICAgICBuZXcgc3FsLlJlcXVlc3QoY29ubmVjdGlvbilcclxuICAgICAgICAgICAgLnF1ZXJ5KFwiVVBEQVRFIFVzZXJzIFNFVCBwYXNzd29yZD0nXCIgKyBfcGFzc3dvcmQgKyBcIicsIGFjdGl2ZT0ndHJ1ZScgV0hFUkUgdXNlcklEPSdcIiArIF91c2VySUQgKyBcIidcIilcclxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24ocmVjb3Jkc2V0KSB7XHJcbiAgICAgICAgICAgICAgcmVzLnNlbmQoeyBcInN1Y2Nlc3NcIjogXCJzdWNjZXNzXCIgfSk7XHJcbiAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGVycikge1xyXG4gICAgICAgICAgICAgIHJlcy5zZW5kKHsgXCJlcnJvclwiOiBcImVycm9yXCIgfSk7XHJcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJVcGRhdGUgdXNlciBwYXNzd29yZCBcIiArIGVycik7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGVycikge1xyXG4gICAgICAgICAgY29uc29sZS5sb2coZXJyKTtcclxuICAgICAgICAgIHJlcy5zZW5kKHsgXCJlcnJvclwiOiBcImVycm9yXCIgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgY29uc29sZS5sb2coZXJyKTtcclxuICAgICAgcmVzLnNlbmQoeyBcImVycm9yXCI6IFwiZXJyb3IgaW4geW91ciByZXF1ZXN0XCIgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICByZXF1ZXN0UmVzZXQocmVxOiBleHByZXNzLlJlcXVlc3QsIHJlczogZXhwcmVzcy5SZXNwb25zZSk6IHZvaWQge1xyXG4gICAgdHJ5IHtcclxuICAgICAgdmFyIF9lbWFpbDogc3RyaW5nID0gcmVxLnBhcmFtcy5fZW1haWw7XHJcbiAgICAgIHZhciByYW5kb21zdHJpbmcgPSBNYXRoLnJhbmRvbSgpLnRvU3RyaW5nKDM2KS5zbGljZSgtOCk7XHJcbiAgICAgIHJhbmRvbXN0cmluZyA9IHJhbmRvbXN0cmluZy5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHJhbmRvbXN0cmluZy5zbGljZSgxKTtcclxuICAgICAgdmFyIHNhbHQgPSBiY3J5cHQuZ2VuU2FsdFN5bmMoMTApO1xyXG4gICAgICAvLyBIYXNoIHRoZSBwYXNzd29yZCB3aXRoIHRoZSBzYWx0XHJcbiAgICAgIHZhciBfcGFzc3dvcmQgPSBiY3J5cHQuaGFzaFN5bmMocmFuZG9tc3RyaW5nLCBzYWx0KTtcclxuXHJcbiAgICAgIHNxbC5jb25uZWN0KGNvbmZpZykudGhlbihmdW5jdGlvbihjb25uZWN0aW9uKSB7XHJcbiAgICAgICAgICBzcWwucXVlcnlgVVBEQVRFIFVzZXJzIFNFVCBwYXNzd29yZD0gJCB7X3Bhc3N3b3JkfSwgYWN0aXZlPSdmYWxzZScgV0hFUkUgZW1haWwgPSAke19lbWFpbH1gLnRoZW4oZnVuY3Rpb24ocmVjb3Jkc2V0KSB7XHJcbiAgICAgICAgICAgICAgLy8gc2V0dXAgZW1haWwgZGF0YSB3aXRoIHVuaWNvZGUgc3ltYm9sc1xyXG4gICAgICAgICAgICAgIGxldCBtYWlsT3B0aW9ucyA9IHtcclxuICAgICAgICAgICAgICAgIGZyb206ICdcIkdlb3JnaWFuIEFjYWRlbWljICYgQ2FyZWVyIFByZXBcIicsIC8vIHNlbmRlciBhZGRyZXNzXHJcbiAgICAgICAgICAgICAgICB0bzogX2VtYWlsLCAvLyBsaXN0IG9mIHJlY2VpdmVyc1xyXG4gICAgICAgICAgICAgICAgc3ViamVjdDogJ1Bhc3N3b3JkIFJlc2V0JywgLy8gU3ViamVjdCBsaW5lXHJcbiAgICAgICAgICAgICAgICB0ZXh0OiAnJywgLy8gcGxhaW4gdGV4dCBib2R5XHJcbiAgICAgICAgICAgICAgICBodG1sOiAnSGVyZSBpcyB5b3VyIG5ldyB0ZW1wb3JhcnkgcGFzc3dvcmQ6IDxiPicgKyByYW5kb21zdHJpbmcgKyAnPC9iPjxiciAvPiBQbGVhc2UgbG9naW4gYXQgaHR0cDovL2dlb3JnaWFuYXBwLmF6dXJld2Vic2l0ZXMubmV0IDxiciAvPjxiciAvPiBUaGFua3lvdScvLyBodG1sIGJvZHlcclxuICAgICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgICBuZXcgTWFpbFNlcnZpY2UoKS5zZW5kTWVzc2FnZShcIiBSZXNldCBQYXNzd29yZFwiLCBtYWlsT3B0aW9ucyk7XHJcbiAgICAgICAgICAgICAgcmVzLnNlbmQoeyBcInN1Y2Nlc3NcIjogXCJzdWNjZXNzXCIgfSk7XHJcbiAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGVycikge1xyXG4gICAgICAgICAgICAgIHJlcy5zZW5kKHsgXCJlcnJvclwiOiBcImVycm9yXCIgfSk7XHJcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJVcGRhdGUgdXNlciBwYXNzd29yZCBcIiArIGVycik7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGVycikge1xyXG4gICAgICAgICAgY29uc29sZS5sb2coZXJyKTtcclxuICAgICAgICAgIHJlcy5zZW5kKHsgXCJlcnJvclwiOiBcImVycm9yXCIgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9IGNhdGNoKGVycikge1xyXG4gICAgICBjb25zb2xlLmxvZyhlcnIpO1xyXG4gICAgICByZXMuc2VuZCh7IFwiZXJyb3JcIjogXCJlcnJvciBpbiB5b3VyIHJlcXVlc3RcIiB9KTtcclxuICAgIH1cclxuICB9XHJcblxyXG59XHJcbmV4cG9ydCA9IEF1dGhDb250cm9sbGVyO1xyXG4iXX0=
