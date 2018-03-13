"use strict";
var AuthController = require("../controllers/AuthController");
var MailService = require("../services/MailService");
var PRFService = require("../services/PRFService");
var sql = require('mssql');
var auth = ["Admin", "Staff", "Client"];
var config = require('../config');
config = config.db;
var ClientFormsController = /** @class */ (function () {
    function ClientFormsController() {
    }
    ClientFormsController.prototype.consentForm = function (req, res) {
        try {
            new AuthController().authUser(req, res, {
                requiredAuth: auth, done: function () {
                    var consentForm = req.body.consentForm;
                    var _id = req.params._id;
                    sql.connect(config)
                        .then(function (connection) {
                        var consentQuery = "'" + _id + "', '" +
                            consentForm.date + "', '" +
                            consentForm.ontarioWorks + "', '" +
                            consentForm.owCaseWorkerName + "', '" +
                            consentForm.owCaseWorkerPhone + "', '" +
                            consentForm.owCaseWorkerEmail + "', '" +
                            consentForm.ontarioDisabilityProgram + "', '" +
                            consentForm.odspAgencyName + "', '" +
                            consentForm.odspContactName + "', '" +
                            consentForm.odspPhone + "', '" +
                            consentForm.odspEmail + "', '" +
                            consentForm.employmentInsurance + "', '" +
                            consentForm.employmentServices + "', '" +
                            consentForm.esAgencyName + "', '" +
                            consentForm.esContactName + "', '" +
                            consentForm.esPhone + "', '" +
                            consentForm.esEmail + "', '" +
                            consentForm.wsib + "', '" +
                            consentForm.wsibWtsName + "', '" +
                            consentForm.wsibWtsPhone + "', '" +
                            consentForm.other + "', '" +
                            consentForm.contactName + "', '" +
                            consentForm.contactNum + "', '" +
                            consentForm.literacyAgencies + "', '" +
                            consentForm.literacyWitness + "'";
                        new sql.Request(connection)
                            .query("INSERT INTO Consent VALUES (" + consentQuery + ")")
                            .then(function () {
                            new sql.Request(connection)
                                .query("UPDATE Clients SET consent='false', editConsentPermission='false' WHERE userID = '" + _id + "'")
                                .then(function () {
                                res.send({ "success": "success" });
                            }).catch(function (err) {
                                res.send({ "error": "error" });
                                console.log("Update client " + err);
                            });
                        }).catch(function (err) {
                            console.log("Save consent form " + consentQuery);
                            res.send({ "error": "error" });
                        });
                    });
                }
            });
        }
        catch (e) {
            console.log(e);
            res.send({ "error": "error in your request" });
        }
    };
    ClientFormsController.prototype.getConsentById = function (req, res) {
        try {
            new AuthController().authUser(req, res, {
                requiredAuth: auth, done: function () {
                    var _id = req.params._id;
                    sql.connect(config)
                        .then(function (connection) {
                        new sql.Request(connection)
                            .query('SELECT * FROM Consent WHERE userID = ' + _id + '')
                            .then(function (consentForm) {
                            res.send(consentForm);
                        }).catch(function (err) {
                            res.send({ "error": "error" });
                            console.log("Get consent by id " + err);
                        });
                    });
                }
            });
        }
        catch (e) {
            console.log(e);
            res.send({ "error": "error in your request" });
        }
    };
    ClientFormsController.prototype.editConsentRequest = function (req, res) {
        var _id = req.params._id;
        sql.connect(config)
            .then(function (connection) {
            new sql.Request(connection)
                .query('SELECT firstName, lastName FROM Clients WHERE userID = ' + _id + '')
                .then(function (client) {
                new sql.Request(connection)
                    .query("UPDATE Clients SET editConsentRequest = 'true' WHERE userID = " + _id + "")
                    .then(function (result) {
                    client = client[0];
                    var mailOptions = {
                        from: 'Georgian Academic & Career Prep',
                        to: 'academic.career.prep@gmail.com',
                        subject: client.firstName + ' ' + client.lastName + ' Request to Edit Consent',
                        text: '',
                        html: client.firstName + ' ' + client.lastName + ' wants to edit their consent form.<br/> Please login to the clients page at: http://georgianapp.azurewebsites.net/#/clients. Search for ' + client.firstName + ' ' + client.lastName + ' in the clients table, select View Info from the dropdown then select Consent to grant or deny access.' // html body
                    };
                    new MailService().sendMessage("Request to Edit Consent", mailOptions);
                    res.send({ status: "success" });
                }).catch(function (err) {
                    res.send({ status: "error" });
                    console.log("editConsentRequest: Update request to edit" + err);
                });
            }).catch(function (err) {
                res.send({ status: "error" });
                console.log("editConsentRequest: Select first and last name" + err);
            });
        });
    };
    ClientFormsController.prototype.grantConsentEditPermission = function (req, res) {
        try {
            new AuthController().authUser(req, res, {
                requiredAuth: auth, done: function () {
                    var permission = req.body.permission;
                    var client = req.body.client;
                    console.log("Value: " + permission + ', ' + "UserID: " + client.userID);
                    if (permission) {
                        sql.connect(config)
                            .then(function (connection) {
                            new sql.Request(connection)
                                .query("UPDATE Clients SET editConsentRequest = 'false' WHERE userID = " + client.userID)
                                .then(function (result1) {
                                new sql.Request(connection)
                                    .query("UPDATE Clients SET editConsentPermission = 'true' WHERE userID = " + client.userID)
                                    .then(function (result2) {
                                    new sql.Request(connection)
                                        .query("SELECT email FROM users WHERE userID = " + client.userID)
                                        .then(function (clientEmail) {
                                        var mailOptions = {
                                            from: 'Georgian Academic & Career Prep',
                                            to: clientEmail[0].email,
                                            subject: 'Request Granted!',
                                            text: '',
                                            html: 'You can now login at: http://georgianapp.azurewebsites.net/ and make changes to your consent form.' // html body
                                        };
                                        new MailService().sendMessage("Consent Edit Request Granted", mailOptions);
                                        res.send({ status: "granted" });
                                    }).catch(function (err) {
                                        res.send({ "error": "error" });
                                        console.log("grantConsentEditPermission: Get email for user. " + err);
                                    });
                                }).catch(function (err) {
                                    res.send({ "error": "error" });
                                    console.log("grantConsentEditPermission: Set consent equal to true(needs to be completed). " + err);
                                });
                            }).catch(function (err) {
                                res.send({ "error": "error" });
                                console.log("grantConsentEditPermission: Set editConsentRequest equal to false. " + err);
                            });
                        });
                    }
                    else {
                        res.send({ status: "denied" });
                    }
                }
            });
        }
        catch (e) {
            console.log(e);
            res.send({ "error": "error in your request" });
        }
    };
    ClientFormsController.prototype.getLearningStyleById = function (req, res) {
        try {
            new AuthController().authUser(req, res, {
                requiredAuth: auth, done: function () {
                    var _id = req.params._id;
                    sql.connect(config)
                        .then(function (connection) {
                        new sql.Request(connection)
                            .query('SELECT * FROM LearningStyle WHERE userID = ' + _id + '')
                            .then(function (learningStlyeForm) {
                            res.send(learningStlyeForm);
                        }).catch(function (err) {
                            res.send({ "error": "error" });
                            console.log("Get consent by id " + err);
                        });
                    });
                }
            });
        }
        catch (e) {
            console.log(e);
            res.send({ "error": "error in your request" });
        }
    };
    ClientFormsController.prototype.learningStyleForm = function (req, res) {
        try {
            new AuthController().authUser(req, res, {
                requiredAuth: auth, done: function () {
                    var learningStyleForm = req.body.learningStyleForm;
                    var _id = req.params._id;
                    sql.connect(config)
                        .then(function (connection) {
                        var learningStyleQuery = "'" + _id + "', '" +
                            learningStyleForm.seeing + "', '" +
                            learningStyleForm.hearing + "', '" +
                            learningStyleForm.doing + "', '" +
                            learningStyleForm.learnBy + "'";
                        new sql.Request(connection)
                            .query("INSERT INTO LearningStyle VALUES (" + learningStyleQuery + ")")
                            .then(function () {
                            new sql.Request()
                                .query("UPDATE Clients SET learningStyle= 'false' WHERE userID = '" + _id + "'")
                                .then(function () {
                                res.send({ "success": "success" });
                            }).catch(function (err) {
                                res.send({ "error": "error" });
                                console.log("Update client " + err);
                            });
                        }).catch(function (err) {
                            console.log("Save learning style form " + err);
                            res.send({ "error": "error" });
                        });
                    });
                }
            });
        }
        catch (e) {
            console.log(e);
            res.send({ "error": "error in your request" });
        }
    };
    ClientFormsController.prototype.getAllFormsByID = function (req, res) {
        try {
            new AuthController().authUser(req, res, {
                requiredAuth: auth, done: function () {
                    var _id = req.params._id;
                    sql.connect(config)
                        .then(function (connection) {
                        new sql.Request(connection)
                            .query('SELECT * FROM SuitabilityForm WHERE userID = ' + _id + '')
                            .then(function (suitabilityForm) {
                            new sql.Request(connection)
                                .query('SELECT * FROM Consent WHERE userID = ' + _id + '')
                                .then(function (consentForm) {
                                new sql.Request(connection)
                                    .query('SELECT * FROM LearningStyle WHERE userID = ' + _id + '')
                                    .then(function (learningStyleForm) {
                                    res.send({
                                        suitabilityForm: suitabilityForm,
                                        consentForm: consentForm,
                                        learningStyleForm: learningStyleForm
                                    });
                                }).catch(function (err) {
                                    res.send({ "error": "error" });
                                    console.log("Get learningStyleForms " + err);
                                });
                            }).catch(function (err) {
                                res.send({ "error": "error" });
                                console.log("Get consentForms " + err);
                            });
                        }).catch(function (err) {
                            res.send({ "error": "error" });
                            console.log("Get suitabilityForms " + err);
                        });
                    });
                }
            });
        }
        catch (e) {
            console.log(e);
            res.send({ "error": "error in your request" });
        }
    };
    return ClientFormsController;
}());
module.exports = ClientFormsController;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NlcnZlci9zcmMvY29udHJvbGxlcnMvQ2xpZW50Rm9ybXNDb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFHQSw4REFBaUU7QUFFakUsSUFBTSxXQUFXLEdBQUcsT0FBTyxDQUFDLHlCQUF5QixDQUFDLENBQUM7QUFDdkQsSUFBTSxVQUFVLEdBQUcsT0FBTyxDQUFDLHdCQUF3QixDQUFDLENBQUM7QUFDckQsSUFBSSxHQUFHLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQzNCLElBQUksSUFBSSxHQUFHLENBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxRQUFRLENBQUMsQ0FBQztBQUV4QyxJQUFJLE1BQU0sR0FBRyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUM7QUFDbEMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxFQUFFLENBQUM7QUFFbkI7SUFBQTtJQTZRQSxDQUFDO0lBNVFDLDJDQUFXLEdBQVgsVUFBWSxHQUFvQixFQUFFLEdBQXFCO1FBQ3JELElBQUksQ0FBQztZQUNILElBQUksY0FBYyxFQUFFLENBQUMsUUFBUSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUU7Z0JBQ3RDLFlBQVksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFO29CQUN4QixJQUFJLFdBQVcsR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQztvQkFDdkMsSUFBSSxHQUFHLEdBQVcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUM7b0JBQ2pDLEdBQUcsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDO3lCQUNoQixJQUFJLENBQUMsVUFBUyxVQUFVO3dCQUN2QixJQUFJLFlBQVksR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLE1BQU07NEJBQ25DLFdBQVcsQ0FBQyxJQUFJLEdBQUcsTUFBTTs0QkFDekIsV0FBVyxDQUFDLFlBQVksR0FBRyxNQUFNOzRCQUNqQyxXQUFXLENBQUMsZ0JBQWdCLEdBQUcsTUFBTTs0QkFDckMsV0FBVyxD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LHVCQUF1QixHQUFHLEdBQUcsQ0FBQyxDQUFDO3dCQUM3QyxDQUFDLENBQUMsQ0FBQztvQkFDUCxDQUFDLENBQUMsQ0FBQztnQkFDUCxDQUFDO2FBQ0YsQ0FBQyxDQUFDO1FBQ0wsQ0FBQztRQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDWCxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2YsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxDQUFDLENBQUM7UUFDakQsQ0FBQztJQUNILENBQUM7SUFFSCw0QkFBQztBQUFELENBN1FBLEFBNlFDLElBQUE7QUFDRCxpQkFBUyxxQkFBcUIsQ0FBQyIsImZpbGUiOiJjb250cm9sbGVycy9DbGllbnRGb3Jtc0NvbnRyb2xsZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgZXhwcmVzcyA9IHJlcXVpcmUoXCJleHByZXNzXCIpO1xyXG5pbXBvcnQgand0ID0gcmVxdWlyZSgnanNvbndlYnRva2VuJyk7XHJcbmltcG9ydCBiY3J5cHQgPSByZXF1aXJlKCdiY3J5cHQnKTtcclxuaW1wb3J0IEF1dGhDb250cm9sbGVyID0gcmVxdWlyZShcIi4uL2NvbnRyb2xsZXJzL0F1dGhDb250cm9sbGVyXCIpO1xyXG5pbXBvcnQgQ2xpZW50Q29udHJvbGxlciA9IHJlcXVpcmUoXCIuLi9jb250cm9sbGVycy9DbGllbnRDb250cm9sbGVyXCIpO1xyXG5jb25zdCBNYWlsU2VydmljZSA9IHJlcXVpcmUoXCIuLi9zZXJ2aWNlcy9NYWlsU2VydmljZVwiKTtcclxuY29uc3QgUFJGU2VydmljZSA9IHJlcXVpcmUoXCIuLi9zZXJ2aWNlcy9QUkZTZXJ2aWNlXCIpO1xyXG52YXIgc3FsID0gcmVxdWlyZSgnbXNzcWwnKTtcclxudmFyIGF1dGggPSBbXCJBZG1pblwiLCBcIlN0YWZmXCIsIFwiQ2xpZW50XCJdO1xyXG5cclxudmFyIGNvbmZpZyA9IHJlcXVpcmUoJy4uL2NvbmZpZycpO1xyXG5jb25maWcgPSBjb25maWcuZGI7XHJcblxyXG5jbGFzcyBDbGllbnRGb3Jtc0NvbnRyb2xsZXIge1xyXG4gIGNvbnNlbnRGb3JtKHJlcTogZXhwcmVzcy5SZXF1ZXN0LCByZXM6IGV4cHJlc3MuUmVzcG9uc2UpOiB2b2lkIHtcclxuICAgIHRyeSB7XHJcbiAgICAgIG5ldyBBdXRoQ29udHJvbGxlcigpLmF1dGhVc2VyKHJlcSwgcmVzLCB7XHJcbiAgICAgICAgcmVxdWlyZWRBdXRoOiBhdXRoLCBkb25lOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgIHZhciBjb25zZW50Rm9ybSA9IHJlcS5ib2R5LmNvbnNlbnRGb3JtO1xyXG4gICAgICAgICAgdmFyIF9pZDogc3RyaW5nID0gcmVxLnBhcmFtcy5faWQ7XHJcbiAgICAgICAgICBzcWwuY29ubmVjdChjb25maWcpXHJcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKGNvbm5lY3Rpb24pIHtcclxuICAgICAgICAgICAgICB2YXIgY29uc2VudFF1ZXJ5ID0gXCInXCIgKyBfaWQgKyBcIicsICdcIiArXHJcbiAgICAgICAgICAgICAgICBjb25zZW50Rm9ybS5kYXRlICsgXCInLCAnXCIgK1xyXG4gICAgICAgICAgICAgICAgY29uc2VudEZvcm0ub250YXJpb1dvcmtzICsgXCInLCAnXCIgK1xyXG4gICAgICAgICAgICAgICAgY29uc2VudEZvcm0ub3dDYXNlV29ya2VyTmFtZSArIFwiJywgJ1wiICtcclxuICAgICAgICAgICAgICAgIGNvbnNlbnRGb3JtLm93Q2FzZVdvcmtlclBob25lICsgXCInLCAnXCIgK1xyXG4gICAgICAgICAgICAgICAgY29uc2VudEZvcm0ub3dDYXNlV29ya2VyRW1haWwgKyBcIicsICdcIiArXHJcbiAgICAgICAgICAgICAgICBjb25zZW50Rm9ybS5vbnRhcmlvRGlzYWJpbGl0eVByb2dyYW0gKyBcIicsICdcIiArXHJcbiAgICAgICAgICAgICAgICBjb25zZW50Rm9ybS5vZHNwQWdlbmN5TmFtZSArIFwiJywgJ1wiICtcclxuICAgICAgICAgICAgICAgIGNvbnNlbnRGb3JtLm9kc3BDb250YWN0TmFtZSArIFwiJywgJ1wiICtcclxuICAgICAgICAgICAgICAgIGNvbnNlbnRGb3JtLm9kc3BQaG9uZSArIFwiJywgJ1wiICtcclxuICAgICAgICAgICAgICAgIGNvbnNlbnRGb3JtLm9kc3BFbWFpbCArIFwiJywgJ1wiICtcclxuICAgICAgICAgICAgICAgIGNvbnNlbnRGb3JtLmVtcGxveW1lbnRJbnN1cmFuY2UgKyBcIicsICdcIiArXHJcbiAgICAgICAgICAgICAgICBjb25zZW50Rm9ybS5lbXBsb3ltZW50U2VydmljZXMgKyBcIicsICdcIiArXHJcbiAgICAgICAgICAgICAgICBjb25zZW50Rm9ybS5lc0FnZW5jeU5hbWUgKyBcIicsICdcIiArXHJcbiAgICAgICAgICAgICAgICBjb25zZW50Rm9ybS5lc0NvbnRhY3ROYW1lICsgXCInLCAnXCIgK1xyXG4gICAgICAgICAgICAgICAgY29uc2VudEZvcm0uZXNQaG9uZSArIFwiJywgJ1wiICtcclxuICAgICAgICAgICAgICAgIGNvbnNlbnRGb3JtLmVzRW1haWwgKyBcIicsICdcIiArXHJcbiAgICAgICAgICAgICAgICBjb25zZW50Rm9ybS53c2liICsgXCInLCAnXCIgK1xyXG4gICAgICAgICAgICAgICAgY29uc2VudEZvcm0ud3NpYld0c05hbWUgKyBcIicsICdcIiArXHJcbiAgICAgICAgICAgICAgICBjb25zZW50Rm9ybS53c2liV3RzUGhvbmUgKyBcIicsICdcIiArXHJcbiAgICAgICAgICAgICAgICBjb25zZW50Rm9ybS5vdGhlciArIFwiJywgJ1wiICtcclxuICAgICAgICAgICAgICAgIGNvbnNlbnRGb3JtLmNvbnRhY3ROYW1lICsgXCInLCAnXCIgK1xyXG4gICAgICAgICAgICAgICAgY29uc2VudEZvcm0uY29udGFjdE51bSArIFwiJywgJ1wiICtcclxuICAgICAgICAgICAgICAgIGNvbnNlbnRGb3JtLmxpdGVyYWN5QWdlbmNpZXMgKyBcIicsICdcIiArXHJcbiAgICAgICAgICAgICAgICBjb25zZW50Rm9ybS5saXRlcmFjeVdpdG5lc3MgKyBcIidcIjtcclxuICAgICAgICAgICAgICBuZXcgc3FsLlJlcXVlc3QoY29ubmVjdGlvbilcclxuICAgICAgICAgICAgICAgIC5xdWVyeShcIklOU0VSVCBJTlRPIENvbnNlbnQgVkFMVUVTIChcIiArIGNvbnNlbnRRdWVyeSArIFwiKVwiKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgIG5ldyBzcWwuUmVxdWVzdChjb25uZWN0aW9uKVxyXG4gICAgICAgICAgICAgICAgICAgIC5xdWVyeShcIlVQREFURSBDbGllbnRzIFNFVCBjb25zZW50PSdmYWxzZScsIGVkaXRDb25zZW50UGVybWlzc2lvbj0nZmFsc2UnIFdIRVJFIHVzZXJJRCA9ICdcIiArIF9pZCArIFwiJ1wiKVxyXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgcmVzLnNlbmQoeyBcInN1Y2Nlc3NcIjogXCJzdWNjZXNzXCIgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICByZXMuc2VuZCh7IFwiZXJyb3JcIjogXCJlcnJvclwiIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJVcGRhdGUgY2xpZW50IFwiICsgZXJyKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGVycikge1xyXG4gICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlNhdmUgY29uc2VudCBmb3JtIFwiICsgY29uc2VudFF1ZXJ5KTtcclxuICAgICAgICAgICAgICAgICAgcmVzLnNlbmQoeyBcImVycm9yXCI6IFwiZXJyb3JcIiB9KTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICBjb25zb2xlLmxvZyhlKTtcclxuICAgICAgcmVzLnNlbmQoeyBcImVycm9yXCI6IFwiZXJyb3IgaW4geW91ciByZXF1ZXN0XCIgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBnZXRDb25zZW50QnlJZChyZXE6IGV4cHJlc3MuUmVxdWVzdCwgcmVzOiBleHByZXNzLlJlc3BvbnNlKSB7XHJcbiAgICB0cnkge1xyXG4gICAgICBuZXcgQXV0aENvbnRyb2xsZXIoKS5hdXRoVXNlcihyZXEsIHJlcywge1xyXG4gICAgICAgIHJlcXVpcmVkQXV0aDogYXV0aCwgZG9uZTogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICB2YXIgX2lkOiBzdHJpbmcgPSByZXEucGFyYW1zLl9pZDtcclxuICAgICAgICAgIHNxbC5jb25uZWN0KGNvbmZpZylcclxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24oY29ubmVjdGlvbikge1xyXG4gICAgICAgICAgICAgIG5ldyBzcWwuUmVxdWVzdChjb25uZWN0aW9uKVxyXG4gICAgICAgICAgICAgICAgLnF1ZXJ5KCdTRUxFQ1QgKiBGUk9NIENvbnNlbnQgV0hFUkUgdXNlcklEID0gJyArIF9pZCArICcnKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24oY29uc2VudEZvcm0pIHtcclxuICAgICAgICAgICAgICAgICAgcmVzLnNlbmQoY29uc2VudEZvcm0pO1xyXG4gICAgICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgIHJlcy5zZW5kKHsgXCJlcnJvclwiOiBcImVycm9yXCIgfSk7XHJcbiAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiR2V0IGNvbnNlbnQgYnkgaWQgXCIgKyBlcnIpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKGUpO1xyXG4gICAgICByZXMuc2VuZCh7IFwiZXJyb3JcIjogXCJlcnJvciBpbiB5b3VyIHJlcXVlc3RcIiB9KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGVkaXRDb25zZW50UmVxdWVzdChyZXE6IGV4cHJlc3MuUmVxdWVzdCwgcmVzOiBleHByZXNzLlJlc3BvbnNlKSB7XHJcbiAgICB2YXIgX2lkOiBzdHJpbmcgPSByZXEucGFyYW1zLl9pZDtcclxuICAgIHNxbC5jb25uZWN0KGNvbmZpZylcclxuICAgICAgLnRoZW4oZnVuY3Rpb24oY29ubmVjdGlvbikge1xyXG4gICAgICAgIG5ldyBzcWwuUmVxdWVzdChjb25uZWN0aW9uKVxyXG4gICAgICAgICAgLnF1ZXJ5KCdTRUxFQ1QgZmlyc3ROYW1lLCBsYXN0TmFtZSBGUk9NIENsaWVudHMgV0hFUkUgdXNlcklEID0gJyArIF9pZCArICcnKVxyXG4gICAgICAgICAgLnRoZW4oZnVuY3Rpb24oY2xpZW50KSB7XHJcbiAgICAgICAgICAgIG5ldyBzcWwuUmVxdWVzdChjb25uZWN0aW9uKVxyXG4gICAgICAgICAgICAgIC5xdWVyeShcIlVQREFURSBDbGllbnRzIFNFVCBlZGl0Q29uc2VudFJlcXVlc3QgPSAndHJ1ZScgV0hFUkUgdXNlcklEID0gXCIgKyBfaWQgKyBcIlwiKVxyXG4gICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgY2xpZW50ID0gY2xpZW50WzBdO1xyXG4gICAgICAgICAgICAgICAgdmFyIG1haWxPcHRpb25zID0ge1xyXG4gICAgICAgICAgICAgICAgICBmcm9tOiAnR2VvcmdpYW4gQWNhZGVtaWMgJiBDYXJlZXIgUHJlcCcsIC8vIHNlbmRlciBhZGRyZXNzXHJcbiAgICAgICAgICAgICAgICAgIHRvOiAnYWNhZGVtaWMuY2FyZWVyLnByZXBAZ21haWwuY29tJywgLy8gY2xpZW50LmVtYWlsXHJcbiAgICAgICAgICAgICAgICAgIHN1YmplY3Q6IGNsaWVudC5maXJzdE5hbWUgKyAnICcgKyBjbGllbnQubGFzdE5hbWUgKyAnIFJlcXVlc3QgdG8gRWRpdCBDb25zZW50JywgLy8gU3ViamVjdCBsaW5lXHJcbiAgICAgICAgICAgICAgICAgIHRleHQ6ICcnLCAvLyBwbGFpbiB0ZXh0IGJvZHlcclxuICAgICAgICAgICAgICAgICAgaHRtbDogY2xpZW50LmZpcnN0TmFtZSArICcgJyArIGNsaWVudC5sYXN0TmFtZSArICcgd2FudHMgdG8gZWRpdCB0aGVpciBjb25zZW50IGZvcm0uPGJyLz4gUGxlYXNlIGxvZ2luIHRvIHRoZSBjbGllbnRzIHBhZ2UgYXQ6IGh0dHA6Ly9nZW9yZ2lhbmFwcC5henVyZXdlYnNpdGVzLm5ldC8jL2NsaWVudHMuIFNlYXJjaCBmb3IgJysgY2xpZW50LmZpcnN0TmFtZSArICcgJyArIGNsaWVudC5sYXN0TmFtZSArICcgaW4gdGhlIGNsaWVudHMgdGFibGUsIHNlbGVjdCBWaWV3IEluZm8gZnJvbSB0aGUgZHJvcGRvd24gdGhlbiBzZWxlY3QgQ29uc2VudCB0byBncmFudCBvciBkZW55IGFjY2Vzcy4nLy8gaHRtbCBib2R5XHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgbmV3IE1haWxTZXJ2aWNlKCkuc2VuZE1lc3NhZ2UoXCJSZXF1ZXN0IHRvIEVkaXQgQ29uc2VudFwiLCBtYWlsT3B0aW9ucyk7XHJcbiAgICAgICAgICAgICAgICByZXMuc2VuZCh7IHN0YXR1czogXCJzdWNjZXNzXCIgfSk7XHJcbiAgICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XHJcbiAgICAgICAgICAgICAgICByZXMuc2VuZCh7IHN0YXR1czogXCJlcnJvclwiIH0pO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJlZGl0Q29uc2VudFJlcXVlc3Q6IFVwZGF0ZSByZXF1ZXN0IHRvIGVkaXRcIiArIGVycik7XHJcbiAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbihlcnIpIHtcclxuICAgICAgICAgICAgcmVzLnNlbmQoeyBzdGF0dXM6IFwiZXJyb3JcIiB9KTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJlZGl0Q29uc2VudFJlcXVlc3Q6IFNlbGVjdCBmaXJzdCBhbmQgbGFzdCBuYW1lXCIgKyBlcnIpO1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgIH0pO1xyXG5cclxuICB9XHJcblxyXG4gIGdyYW50Q29uc2VudEVkaXRQZXJtaXNzaW9uKHJlcTogZXhwcmVzcy5SZXF1ZXN0LCByZXM6IGV4cHJlc3MuUmVzcG9uc2UpIHtcclxuICAgIHRyeSB7XHJcbiAgICAgIG5ldyBBdXRoQ29udHJvbGxlcigpLmF1dGhVc2VyKHJlcSwgcmVzLCB7XHJcbiAgICAgICAgcmVxdWlyZWRBdXRoOiBhdXRoLCBkb25lOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgIHZhciBwZXJtaXNzaW9uID0gcmVxLmJvZHkucGVybWlzc2lvbjtcclxuICAgICAgICAgIHZhciBjbGllbnQgPSByZXEuYm9keS5jbGllbnQ7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhcIlZhbHVlOiBcIiArIHBlcm1pc3Npb24gKyAnLCAnICsgXCJVc2VySUQ6IFwiICsgY2xpZW50LnVzZXJJRCApO1xyXG4gICAgICAgICAgaWYgKHBlcm1pc3Npb24pIHtcclxuICAgICAgICAgICAgc3FsLmNvbm5lY3QoY29uZmlnKVxyXG4gICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKGNvbm5lY3Rpb24pIHtcclxuICAgICAgICAgICAgICAgIG5ldyBzcWwuUmVxdWVzdChjb25uZWN0aW9uKVxyXG4gICAgICAgICAgICAgICAgICAucXVlcnkoXCJVUERBVEUgQ2xpZW50cyBTRVQgZWRpdENvbnNlbnRSZXF1ZXN0ID0gJ2ZhbHNlJyBXSEVSRSB1c2VySUQgPSBcIiArIGNsaWVudC51c2VySUQpXHJcbiAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKHJlc3VsdDEpIHtcclxuICAgICAgICAgICAgICAgICAgICBuZXcgc3FsLlJlcXVlc3QoY29ubmVjdGlvbilcclxuICAgICAgICAgICAgICAgICAgICAgIC5xdWVyeShcIlVQREFURSBDbGllbnRzIFNFVCBlZGl0Q29uc2VudFBlcm1pc3Npb24gPSAndHJ1ZScgV0hFUkUgdXNlcklEID0gXCIgKyBjbGllbnQudXNlcklEKVxyXG4gICAgICAgICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24ocmVzdWx0Mikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXcgc3FsLlJlcXVlc3QoY29ubmVjdGlvbilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAucXVlcnkoXCJTRUxFQ1QgZW1haWwgRlJPTSB1c2VycyBXSEVSRSB1c2VySUQgPSBcIiArIGNsaWVudC51c2VySUQpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24oY2xpZW50RW1haWwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBtYWlsT3B0aW9ucyA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZnJvbTogJ0dlb3JnaWFuIEFjYWRlbWljICYgQ2FyZWVyIFByZXAnLCAvLyBzZW5kZXIgYWRkcmVzc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0bzogY2xpZW50RW1haWxbMF0uZW1haWwsIC8vIGNsaWVudC5lbWFpbFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdWJqZWN0OiAnUmVxdWVzdCBHcmFudGVkIScsIC8vIFN1YmplY3QgbGluZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0OiAnJywgLy8gcGxhaW4gdGV4dCBib2R5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGh0bWw6ICdZb3UgY2FuIG5vdyBsb2dpbiBhdDogaHR0cDovL2dlb3JnaWFuYXBwLmF6dXJld2Vic2l0ZXMubmV0LyBhbmQgbWFrZSBjaGFuZ2VzIHRvIHlvdXIgY29uc2VudCBmb3JtLicvLyBodG1sIGJvZHlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXcgTWFpbFNlcnZpY2UoKS5zZW5kTWVzc2FnZShcIkNvbnNlbnQgRWRpdCBSZXF1ZXN0IEdyYW50ZWRcIiwgbWFpbE9wdGlvbnMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzLnNlbmQoe3N0YXR1czogXCJncmFudGVkXCJ9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbihlcnIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcy5zZW5kKHsgXCJlcnJvclwiOiBcImVycm9yXCIgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImdyYW50Q29uc2VudEVkaXRQZXJtaXNzaW9uOiBHZXQgZW1haWwgZm9yIHVzZXIuIFwiICsgZXJyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGVycikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXMuc2VuZCh7IFwiZXJyb3JcIjogXCJlcnJvclwiIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImdyYW50Q29uc2VudEVkaXRQZXJtaXNzaW9uOiBTZXQgY29uc2VudCBlcXVhbCB0byB0cnVlKG5lZWRzIHRvIGJlIGNvbXBsZXRlZCkuIFwiICsgZXJyKTtcclxuICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbihlcnIpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXMuc2VuZCh7IFwiZXJyb3JcIjogXCJlcnJvclwiIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZ3JhbnRDb25zZW50RWRpdFBlcm1pc3Npb246IFNldCBlZGl0Q29uc2VudFJlcXVlc3QgZXF1YWwgdG8gZmFsc2UuIFwiICsgZXJyKTtcclxuICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXMuc2VuZCh7c3RhdHVzOiBcImRlbmllZFwifSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgY29uc29sZS5sb2coZSk7XHJcbiAgICAgIHJlcy5zZW5kKHsgXCJlcnJvclwiOiBcImVycm9yIGluIHlvdXIgcmVxdWVzdFwiIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZ2V0TGVhcm5pbmdTdHlsZUJ5SWQocmVxOiBleHByZXNzLlJlcXVlc3QsIHJlczogZXhwcmVzcy5SZXNwb25zZSkge1xyXG4gICAgdHJ5IHtcclxuICAgICAgbmV3IEF1dGhDb250cm9sbGVyKCkuYXV0aFVzZXIocmVxLCByZXMsIHtcclxuICAgICAgICByZXF1aXJlZEF1dGg6IGF1dGgsIGRvbmU6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgdmFyIF9pZDogc3RyaW5nID0gcmVxLnBhcmFtcy5faWQ7XHJcbiAgICAgICAgICBzcWwuY29ubmVjdChjb25maWcpXHJcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKGNvbm5lY3Rpb24pIHtcclxuICAgICAgICAgICAgICBuZXcgc3FsLlJlcXVlc3QoY29ubmVjdGlvbilcclxuICAgICAgICAgICAgICAgIC5xdWVyeSgnU0VMRUNUICogRlJPTSBMZWFybmluZ1N0eWxlIFdIRVJFIHVzZXJJRCA9ICcgKyBfaWQgKyAnJylcclxuICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKGxlYXJuaW5nU3RseWVGb3JtKSB7XHJcbiAgICAgICAgICAgICAgICAgIHJlcy5zZW5kKGxlYXJuaW5nU3RseWVGb3JtKTtcclxuICAgICAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGVycikge1xyXG4gICAgICAgICAgICAgICAgICByZXMuc2VuZCh7IFwiZXJyb3JcIjogXCJlcnJvclwiIH0pO1xyXG4gICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkdldCBjb25zZW50IGJ5IGlkIFwiICsgZXJyKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICBjb25zb2xlLmxvZyhlKTtcclxuICAgICAgcmVzLnNlbmQoeyBcImVycm9yXCI6IFwiZXJyb3IgaW4geW91ciByZXF1ZXN0XCIgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBsZWFybmluZ1N0eWxlRm9ybShyZXE6IGV4cHJlc3MuUmVxdWVzdCwgcmVzOiBleHByZXNzLlJlc3BvbnNlKTogdm9pZCB7XHJcbiAgICB0cnkge1xyXG4gICAgICBuZXcgQXV0aENvbnRyb2xsZXIoKS5hdXRoVXNlcihyZXEsIHJlcywge1xyXG4gICAgICAgIHJlcXVpcmVkQXV0aDogYXV0aCwgZG9uZTogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICB2YXIgbGVhcm5pbmdTdHlsZUZvcm0gPSByZXEuYm9keS5sZWFybmluZ1N0eWxlRm9ybTtcclxuICAgICAgICAgIHZhciBfaWQ6IHN0cmluZyA9IHJlcS5wYXJhbXMuX2lkO1xyXG4gICAgICAgICAgc3FsLmNvbm5lY3QoY29uZmlnKVxyXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbihjb25uZWN0aW9uKSB7XHJcbiAgICAgICAgICAgICAgdmFyIGxlYXJuaW5nU3R5bGVRdWVyeSA9IFwiJ1wiICsgX2lkICsgXCInLCAnXCIgK1xyXG4gICAgICAgICAgICAgICAgbGVhcm5pbmdTdHlsZUZvcm0uc2VlaW5nICsgXCInLCAnXCIgK1xyXG4gICAgICAgICAgICAgICAgbGVhcm5pbmdTdHlsZUZvcm0uaGVhcmluZyArIFwiJywgJ1wiICtcclxuICAgICAgICAgICAgICAgIGxlYXJuaW5nU3R5bGVGb3JtLmRvaW5nICsgXCInLCAnXCIgK1xyXG4gICAgICAgICAgICAgICAgbGVhcm5pbmdTdHlsZUZvcm0ubGVhcm5CeSArIFwiJ1wiO1xyXG4gICAgICAgICAgICAgIG5ldyBzcWwuUmVxdWVzdChjb25uZWN0aW9uKVxyXG4gICAgICAgICAgICAgICAgLnF1ZXJ5KFwiSU5TRVJUIElOVE8gTGVhcm5pbmdTdHlsZSBWQUxVRVMgKFwiICsgbGVhcm5pbmdTdHlsZVF1ZXJ5ICsgXCIpXCIpXHJcbiAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgbmV3IHNxbC5SZXF1ZXN0KClcclxuICAgICAgICAgICAgICAgICAgICAucXVlcnkoXCJVUERBVEUgQ2xpZW50cyBTRVQgbGVhcm5pbmdTdHlsZT0gJ2ZhbHNlJyBXSEVSRSB1c2VySUQgPSAnXCIgKyBfaWQgKyBcIidcIilcclxuICAgICAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICAgIHJlcy5zZW5kKHsgXCJzdWNjZXNzXCI6IFwic3VjY2Vzc1wiIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGVycikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgcmVzLnNlbmQoeyBcImVycm9yXCI6IFwiZXJyb3JcIiB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiVXBkYXRlIGNsaWVudCBcIiArIGVycik7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbihlcnIpIHtcclxuICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJTYXZlIGxlYXJuaW5nIHN0eWxlIGZvcm0gXCIgKyBlcnIpO1xyXG4gICAgICAgICAgICAgICAgICByZXMuc2VuZCh7IFwiZXJyb3JcIjogXCJlcnJvclwiIH0pO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKGUpO1xyXG4gICAgICByZXMuc2VuZCh7IFwiZXJyb3JcIjogXCJlcnJvciBpbiB5b3VyIHJlcXVlc3RcIiB9KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGdldEFsbEZvcm1zQnlJRChyZXE6IGV4cHJlc3MuUmVxdWVzdCwgcmVzOiBleHByZXNzLlJlc3BvbnNlKSB7XHJcbiAgICB0cnkge1xyXG4gICAgICBuZXcgQXV0aENvbnRyb2xsZXIoKS5hdXRoVXNlcihyZXEsIHJlcywge1xyXG4gICAgICAgIHJlcXVpcmVkQXV0aDogYXV0aCwgZG9uZTogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICB2YXIgX2lkOiBzdHJpbmcgPSByZXEucGFyYW1zLl9pZDtcclxuICAgICAgICAgIHNxbC5jb25uZWN0KGNvbmZpZylcclxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24oY29ubmVjdGlvbikge1xyXG4gICAgICAgICAgICAgIG5ldyBzcWwuUmVxdWVzdChjb25uZWN0aW9uKVxyXG4gICAgICAgICAgICAgICAgLnF1ZXJ5KCdTRUxFQ1QgKiBGUk9NIFN1aXRhYmlsaXR5Rm9ybSBXSEVSRSB1c2VySUQgPSAnICsgX2lkICsgJycpXHJcbiAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbihzdWl0YWJpbGl0eUZvcm0pIHtcclxuICAgICAgICAgICAgICAgICAgbmV3IHNxbC5SZXF1ZXN0KGNvbm5lY3Rpb24pXHJcbiAgICAgICAgICAgICAgICAgICAgLnF1ZXJ5KCdTRUxFQ1QgKiBGUk9NIENvbnNlbnQgV0hFUkUgdXNlcklEID0gJyArIF9pZCArICcnKVxyXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKGNvbnNlbnRGb3JtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICBuZXcgc3FsLlJlcXVlc3QoY29ubmVjdGlvbilcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnF1ZXJ5KCdTRUxFQ1QgKiBGUk9NIExlYXJuaW5nU3R5bGUgV0hFUkUgdXNlcklEID0gJyArIF9pZCArICcnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbihsZWFybmluZ1N0eWxlRm9ybSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHJlcy5zZW5kKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1aXRhYmlsaXR5Rm9ybTogc3VpdGFiaWxpdHlGb3JtLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc2VudEZvcm06IGNvbnNlbnRGb3JtLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGVhcm5pbmdTdHlsZUZvcm06IGxlYXJuaW5nU3R5bGVGb3JtXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGVycikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHJlcy5zZW5kKHsgXCJlcnJvclwiOiBcImVycm9yXCIgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJHZXQgbGVhcm5pbmdTdHlsZUZvcm1zIFwiICsgZXJyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICByZXMuc2VuZCh7IFwiZXJyb3JcIjogXCJlcnJvclwiIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJHZXQgY29uc2VudEZvcm1zIFwiICsgZXJyKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGVycikge1xyXG4gICAgICAgICAgICAgICAgICByZXMuc2VuZCh7IFwiZXJyb3JcIjogXCJlcnJvclwiIH0pO1xyXG4gICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkdldCBzdWl0YWJpbGl0eUZvcm1zIFwiICsgZXJyKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICBjb25zb2xlLmxvZyhlKTtcclxuICAgICAgcmVzLnNlbmQoeyBcImVycm9yXCI6IFwiZXJyb3IgaW4geW91ciByZXF1ZXN0XCIgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxufVxyXG5leHBvcnQgPSBDbGllbnRGb3Jtc0NvbnRyb2xsZXI7XHJcbiJdfQ==
