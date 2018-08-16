"use strict";
var AuthController = require("../controllers/AuthController");
var MailService = require("../services/MailService");
var PRFService = require("../services/PRFService");
var ActivityService = require("../services/ActivityService");
var sql = require('mssql');
var auth = ["Admin", "Staff", "Client"];
var config = require('../config');
var db = config.db;
var mail = config.mail;
var site_settings = config.site_settings;
var ClientFormsController = /** @class */ (function () {
    function ClientFormsController() {
    }
    ClientFormsController.prototype.consentForm = function (req, res) {
        try {
            new AuthController().authUser(req, res, {
                requiredAuth: ["Admin", "Staff", "Client", "Student"], done: function (currentUserID) {
                    var consentForm = req.body.consentForm;
                    var _id = req.params._id;
                    sql.connect(db)
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
                                new sql.Request(connection)
                                    .query("UPDATE Students SET editConsentPermission='false' WHERE userID = '" + _id + "'")
                                    .then(function () {
                                    new ActivityService().reportActivity('client', 'Form Submitted', 'success', _id, currentUserID, 'Consent Form submitted by client.');
                                    res.send({ "success": "success" });
                                }).catch(function (err) {
                                    res.send({ "error": "error" });
                                    console.log("Update student " + err);
                                });
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
                requiredAuth: ["Admin", "Staff", "Client", "Student"], done: function (currentUserID) {
                    var _id = req.params._id;
                    sql.connect(db)
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
        sql.connect(db)
            .then(function (connection) {
            new sql.Request(connection)
                .query('SELECT firstName, lastName FROM Clients WHERE userID = ' + _id + '')
                .then(function (client) {
                new sql.Request(connection)
                    .query("UPDATE Clients SET editConsentRequest = 'true' WHERE userID = " + _id + "")
                    .then(function (result) {
                    client = client[0];
                    var mailOptions = {
                        from: mail.user,
                        to: mail.user,
                        subject: client.firstName + ' ' + client.lastName + ' Request to Edit Consent (Client)',
                        text: '',
                        html: 'Client ' + client.firstName + ' ' + client.lastName + ' wants to edit their consent form.<br/> Please login to the clients page at: ' + site_settings.url + '/#/clients. Search for ' + client.firstName + ' ' + client.lastName + ' in the clients table, select View Info from the dropdown then select Consent to grant or deny access.' // html body
                    };
                    new MailService().sendMessage("Request to Edit Consent", mailOptions);
                    new ActivityService().reportActivity('client', 'Form Edit Request', 'success', _id, '', 'Client is requesting permission to edit their consent form.');
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
                requiredAuth: auth, done: function (currentUserID) {
                    var permission = req.body.permission;
                    var client = req.body.client;
                    console.log("Value: " + permission + ', ' + "UserID: " + client.userID);
                    if (permission) {
                        sql.connect(db)
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
                                            from: mail.user,
                                            to: clientEmail[0].email,
                                            subject: 'Request Granted!',
                                            text: '',
                                            html: 'You can now login at: ' + site_settings.url + ' and make changes to your consent form.' // html body
                                        };
                                        new ActivityService().reportActivity('client', 'Permission Granted', 'success', client.userID, currentUserID, 'Client has been granted permission to edit their consent form.');
                                        new MailService().sendMessage("Consent Edit Request Granted", mailOptions);
                                        res.send({ result: "granted" });
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
                        res.send({ result: "denied" });
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
                requiredAuth: auth, done: function (currentUserID) {
                    var _id = req.params._id;
                    sql.connect(db)
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
                requiredAuth: auth, done: function (currentUserID) {
                    var learningStyleForm = req.body.learningStyleForm;
                    var _id = req.params._id;
                    sql.connect(db)
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
                                new ActivityService().reportActivity('client', 'Form Submitted', 'success', _id, currentUserID, 'Learning style submitted by client.');
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
                requiredAuth: auth, done: function (currentUserID) {
                    var _id = req.params._id;
                    sql.connect(db)
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
                                    new sql.Request(connection)
                                        .query('SELECT * FROM AssessmentResults WHERE userID = ' + _id + '')
                                        .then(function (assessmentResults) {
                                        res.send({
                                            suitabilityForm: suitabilityForm,
                                            consentForm: consentForm,
                                            learningStyleForm: learningStyleForm,
                                            assessmentResults: assessmentResults
                                        });
                                    }).catch(function (err) {
                                        res.send({ "error": "error" });
                                        console.log("Get assessmentResults " + err);
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NlcnZlci9zcmMvY29udHJvbGxlcnMvQ2xpZW50Rm9ybXNDb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFHQSw4REFBaUU7QUFFakUsSUFBTSxXQUFXLEdBQUcsT0FBTyxDQUFDLHlCQUF5QixDQUFDLENBQUM7QUFDdkQsSUFBTSxVQUFVLEdBQUcsT0FBTyxDQUFDLHdCQUF3QixDQUFDLENBQUM7QUFDckQsSUFBTSxlQUFlLEdBQUcsT0FBTyxDQUFDLDZCQUE2QixDQUFDLENBQUM7QUFDL0QsSUFBSSxHQUFHLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQzNCLElBQUksSUFBSSxHQUFHLENBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxRQUFRLENBQUMsQ0FBQztBQUN4QyxJQUFNLE1BQU0sR0FBRyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUM7QUFDcEMsSUFBTSxFQUFFLEdBQUcsTUFBTSxDQUFDLEVBQUUsQ0FBQztBQUNyQixJQUFNLElBQUksR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDO0FBQ3pCLElBQU0sYUFBYSxHQUFHLE1BQU0sQ0FBQyxhQUFhLENBQUM7QUFFM0M7SUFBQTtJQWdTQSxDQUFDO0lBL1JDLDJDQUFXLEdBQVgsVUFBWSxHQUFvQixFQUFFLEdBQXFCO1FBQ3JELElBQUk7WUFDRixJQUFJLGNBQWMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFO2dCQUN0QyxZQUFZLEVBQUUsQ0FBQyxPQUFPLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxTQUFTLENBQUMsRUFBRSxJQUFJLEVBQUUsVUFBUyxhQUFhO29CQUNqRixJQUFJLFdBQVcsR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQztvQkFDdkMsSUFBSSxHQUFHLEdBQVcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUM7b0JBQ2pDLEdBQUcsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDO3lCQUNa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LENBQUMsVUFBUyxHQUFHO2dDQUNuQixHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxDQUFDLENBQUM7Z0NBQy9CLE9BQU8sQ0FBQyxHQUFHLENBQUMsbUJBQW1CLEdBQUcsR0FBRyxDQUFDLENBQUM7NEJBQ3pDLENBQUMsQ0FBQyxDQUFDO3dCQUNQLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxVQUFTLEdBQUc7NEJBQ25CLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLENBQUMsQ0FBQzs0QkFDL0IsT0FBTyxDQUFDLEdBQUcsQ0FBQyx1QkFBdUIsR0FBRyxHQUFHLENBQUMsQ0FBQzt3QkFDN0MsQ0FBQyxDQUFDLENBQUM7b0JBQ1AsQ0FBQyxDQUFDLENBQUM7Z0JBQ1AsQ0FBQzthQUNGLENBQUMsQ0FBQztTQUNKO1FBQUMsT0FBTyxDQUFDLEVBQUU7WUFDVixPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2YsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxDQUFDLENBQUM7U0FDaEQ7SUFDSCxDQUFDO0lBRUgsNEJBQUM7QUFBRCxDQWhTQSxBQWdTQyxJQUFBO0FBQ0QsaUJBQVMscUJBQXFCLENBQUMiLCJmaWxlIjoiY29udHJvbGxlcnMvQ2xpZW50Rm9ybXNDb250cm9sbGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGV4cHJlc3MgPSByZXF1aXJlKFwiZXhwcmVzc1wiKTtcclxuaW1wb3J0IGp3dCA9IHJlcXVpcmUoJ2pzb253ZWJ0b2tlbicpO1xyXG5pbXBvcnQgYmNyeXB0ID0gcmVxdWlyZSgnYmNyeXB0Jyk7XHJcbmltcG9ydCBBdXRoQ29udHJvbGxlciA9IHJlcXVpcmUoXCIuLi9jb250cm9sbGVycy9BdXRoQ29udHJvbGxlclwiKTtcclxuaW1wb3J0IENsaWVudENvbnRyb2xsZXIgPSByZXF1aXJlKFwiLi4vY29udHJvbGxlcnMvQ2xpZW50Q29udHJvbGxlclwiKTtcclxuY29uc3QgTWFpbFNlcnZpY2UgPSByZXF1aXJlKFwiLi4vc2VydmljZXMvTWFpbFNlcnZpY2VcIik7XHJcbmNvbnN0IFBSRlNlcnZpY2UgPSByZXF1aXJlKFwiLi4vc2VydmljZXMvUFJGU2VydmljZVwiKTtcclxuY29uc3QgQWN0aXZpdHlTZXJ2aWNlID0gcmVxdWlyZShcIi4uL3NlcnZpY2VzL0FjdGl2aXR5U2VydmljZVwiKTtcclxudmFyIHNxbCA9IHJlcXVpcmUoJ21zc3FsJyk7XHJcbnZhciBhdXRoID0gW1wiQWRtaW5cIiwgXCJTdGFmZlwiLCBcIkNsaWVudFwiXTtcclxuY29uc3QgY29uZmlnID0gcmVxdWlyZSgnLi4vY29uZmlnJyk7XHJcbmNvbnN0IGRiID0gY29uZmlnLmRiO1xyXG5jb25zdCBtYWlsID0gY29uZmlnLm1haWw7XHJcbmNvbnN0IHNpdGVfc2V0dGluZ3MgPSBjb25maWcuc2l0ZV9zZXR0aW5ncztcclxuXHJcbmNsYXNzIENsaWVudEZvcm1zQ29udHJvbGxlciB7XHJcbiAgY29uc2VudEZvcm0ocmVxOiBleHByZXNzLlJlcXVlc3QsIHJlczogZXhwcmVzcy5SZXNwb25zZSk6IHZvaWQge1xyXG4gICAgdHJ5IHtcclxuICAgICAgbmV3IEF1dGhDb250cm9sbGVyKCkuYXV0aFVzZXIocmVxLCByZXMsIHtcclxuICAgICAgICByZXF1aXJlZEF1dGg6IFtcIkFkbWluXCIsIFwiU3RhZmZcIiwgXCJDbGllbnRcIiwgXCJTdHVkZW50XCJdLCBkb25lOiBmdW5jdGlvbihjdXJyZW50VXNlcklEKSB7XHJcbiAgICAgICAgICB2YXIgY29uc2VudEZvcm0gPSByZXEuYm9keS5jb25zZW50Rm9ybTtcclxuICAgICAgICAgIHZhciBfaWQ6IHN0cmluZyA9IHJlcS5wYXJhbXMuX2lkO1xyXG4gICAgICAgICAgc3FsLmNvbm5lY3QoZGIpXHJcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKGNvbm5lY3Rpb24pIHtcclxuICAgICAgICAgICAgICB2YXIgY29uc2VudFF1ZXJ5ID0gXCInXCIgKyBfaWQgKyBcIicsICdcIiArXHJcbiAgICAgICAgICAgICAgICBjb25zZW50Rm9ybS5kYXRlICsgXCInLCAnXCIgK1xyXG4gICAgICAgICAgICAgICAgY29uc2VudEZvcm0ub250YXJpb1dvcmtzICsgXCInLCAnXCIgK1xyXG4gICAgICAgICAgICAgICAgY29uc2VudEZvcm0ub3dDYXNlV29ya2VyTmFtZSArIFwiJywgJ1wiICtcclxuICAgICAgICAgICAgICAgIGNvbnNlbnRGb3JtLm93Q2FzZVdvcmtlclBob25lICsgXCInLCAnXCIgK1xyXG4gICAgICAgICAgICAgICAgY29uc2VudEZvcm0ub3dDYXNlV29ya2VyRW1haWwgKyBcIicsICdcIiArXHJcbiAgICAgICAgICAgICAgICBjb25zZW50Rm9ybS5vbnRhcmlvRGlzYWJpbGl0eVByb2dyYW0gKyBcIicsICdcIiArXHJcbiAgICAgICAgICAgICAgICBjb25zZW50Rm9ybS5vZHNwQWdlbmN5TmFtZSArIFwiJywgJ1wiICtcclxuICAgICAgICAgICAgICAgIGNvbnNlbnRGb3JtLm9kc3BDb250YWN0TmFtZSArIFwiJywgJ1wiICtcclxuICAgICAgICAgICAgICAgIGNvbnNlbnRGb3JtLm9kc3BQaG9uZSArIFwiJywgJ1wiICtcclxuICAgICAgICAgICAgICAgIGNvbnNlbnRGb3JtLm9kc3BFbWFpbCArIFwiJywgJ1wiICtcclxuICAgICAgICAgICAgICAgIGNvbnNlbnRGb3JtLmVtcGxveW1lbnRJbnN1cmFuY2UgKyBcIicsICdcIiArXHJcbiAgICAgICAgICAgICAgICBjb25zZW50Rm9ybS5lbXBsb3ltZW50U2VydmljZXMgKyBcIicsICdcIiArXHJcbiAgICAgICAgICAgICAgICBjb25zZW50Rm9ybS5lc0FnZW5jeU5hbWUgKyBcIicsICdcIiArXHJcbiAgICAgICAgICAgICAgICBjb25zZW50Rm9ybS5lc0NvbnRhY3ROYW1lICsgXCInLCAnXCIgK1xyXG4gICAgICAgICAgICAgICAgY29uc2VudEZvcm0uZXNQaG9uZSArIFwiJywgJ1wiICtcclxuICAgICAgICAgICAgICAgIGNvbnNlbnRGb3JtLmVzRW1haWwgKyBcIicsICdcIiArXHJcbiAgICAgICAgICAgICAgICBjb25zZW50Rm9ybS53c2liICsgXCInLCAnXCIgK1xyXG4gICAgICAgICAgICAgICAgY29uc2VudEZvcm0ud3NpYld0c05hbWUgKyBcIicsICdcIiArXHJcbiAgICAgICAgICAgICAgICBjb25zZW50Rm9ybS53c2liV3RzUGhvbmUgKyBcIicsICdcIiArXHJcbiAgICAgICAgICAgICAgICBjb25zZW50Rm9ybS5vdGhlciArIFwiJywgJ1wiICtcclxuICAgICAgICAgICAgICAgIGNvbnNlbnRGb3JtLmNvbnRhY3ROYW1lICsgXCInLCAnXCIgK1xyXG4gICAgICAgICAgICAgICAgY29uc2VudEZvcm0uY29udGFjdE51bSArIFwiJywgJ1wiICtcclxuICAgICAgICAgICAgICAgIGNvbnNlbnRGb3JtLmxpdGVyYWN5QWdlbmNpZXMgKyBcIicsICdcIiArXHJcbiAgICAgICAgICAgICAgICBjb25zZW50Rm9ybS5saXRlcmFjeVdpdG5lc3MgKyBcIidcIjtcclxuICAgICAgICAgICAgICBuZXcgc3FsLlJlcXVlc3QoY29ubmVjdGlvbilcclxuICAgICAgICAgICAgICAgIC5xdWVyeShcIklOU0VSVCBJTlRPIENvbnNlbnQgVkFMVUVTIChcIiArIGNvbnNlbnRRdWVyeSArIFwiKVwiKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgIG5ldyBzcWwuUmVxdWVzdChjb25uZWN0aW9uKVxyXG4gICAgICAgICAgICAgICAgICAgIC5xdWVyeShcIlVQREFURSBDbGllbnRzIFNFVCBjb25zZW50PSdmYWxzZScsIGVkaXRDb25zZW50UGVybWlzc2lvbj0nZmFsc2UnIFdIRVJFIHVzZXJJRCA9ICdcIiArIF9pZCArIFwiJ1wiKVxyXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgbmV3IHNxbC5SZXF1ZXN0KGNvbm5lY3Rpb24pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5xdWVyeShcIlVQREFURSBTdHVkZW50cyBTRVQgZWRpdENvbnNlbnRQZXJtaXNzaW9uPSdmYWxzZScgV0hFUkUgdXNlcklEID0gJ1wiICsgX2lkICsgXCInXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBBY3Rpdml0eVNlcnZpY2UoKS5yZXBvcnRBY3Rpdml0eSgnY2xpZW50JywgJ0Zvcm0gU3VibWl0dGVkJywgJ3N1Y2Nlc3MnLCBfaWQsIGN1cnJlbnRVc2VySUQsICdDb25zZW50IEZvcm0gc3VibWl0dGVkIGJ5IGNsaWVudC4nKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICByZXMuc2VuZCh7IFwic3VjY2Vzc1wiOiBcInN1Y2Nlc3NcIiB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzLnNlbmQoeyBcImVycm9yXCI6IFwiZXJyb3JcIiB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlVwZGF0ZSBzdHVkZW50IFwiICsgZXJyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICByZXMuc2VuZCh7IFwiZXJyb3JcIjogXCJlcnJvclwiIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJVcGRhdGUgY2xpZW50IFwiICsgZXJyKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGVycikge1xyXG4gICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlNhdmUgY29uc2VudCBmb3JtIFwiICsgY29uc2VudFF1ZXJ5KTtcclxuICAgICAgICAgICAgICAgICAgcmVzLnNlbmQoeyBcImVycm9yXCI6IFwiZXJyb3JcIiB9KTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICBjb25zb2xlLmxvZyhlKTtcclxuICAgICAgcmVzLnNlbmQoeyBcImVycm9yXCI6IFwiZXJyb3IgaW4geW91ciByZXF1ZXN0XCIgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBnZXRDb25zZW50QnlJZChyZXE6IGV4cHJlc3MuUmVxdWVzdCwgcmVzOiBleHByZXNzLlJlc3BvbnNlKSB7XHJcbiAgICB0cnkge1xyXG4gICAgICBuZXcgQXV0aENvbnRyb2xsZXIoKS5hdXRoVXNlcihyZXEsIHJlcywge1xyXG4gICAgICAgIHJlcXVpcmVkQXV0aDogW1wiQWRtaW5cIiwgXCJTdGFmZlwiLCBcIkNsaWVudFwiLCBcIlN0dWRlbnRcIl0sIGRvbmU6IGZ1bmN0aW9uKGN1cnJlbnRVc2VySUQpIHtcclxuICAgICAgICAgIHZhciBfaWQ6IHN0cmluZyA9IHJlcS5wYXJhbXMuX2lkO1xyXG4gICAgICAgICAgc3FsLmNvbm5lY3QoZGIpXHJcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKGNvbm5lY3Rpb24pIHtcclxuICAgICAgICAgICAgICBuZXcgc3FsLlJlcXVlc3QoY29ubmVjdGlvbilcclxuICAgICAgICAgICAgICAgIC5xdWVyeSgnU0VMRUNUICogRlJPTSBDb25zZW50IFdIRVJFIHVzZXJJRCA9ICcgKyBfaWQgKyAnJylcclxuICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKGNvbnNlbnRGb3JtKSB7XHJcbiAgICAgICAgICAgICAgICAgIHJlcy5zZW5kKGNvbnNlbnRGb3JtKTtcclxuICAgICAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGVycikge1xyXG4gICAgICAgICAgICAgICAgICByZXMuc2VuZCh7IFwiZXJyb3JcIjogXCJlcnJvclwiIH0pO1xyXG4gICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkdldCBjb25zZW50IGJ5IGlkIFwiICsgZXJyKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICBjb25zb2xlLmxvZyhlKTtcclxuICAgICAgcmVzLnNlbmQoeyBcImVycm9yXCI6IFwiZXJyb3IgaW4geW91ciByZXF1ZXN0XCIgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBlZGl0Q29uc2VudFJlcXVlc3QocmVxOiBleHByZXNzLlJlcXVlc3QsIHJlczogZXhwcmVzcy5SZXNwb25zZSkge1xyXG4gICAgdmFyIF9pZDogc3RyaW5nID0gcmVxLnBhcmFtcy5faWQ7XHJcbiAgICBzcWwuY29ubmVjdChkYilcclxuICAgICAgLnRoZW4oZnVuY3Rpb24oY29ubmVjdGlvbikge1xyXG4gICAgICAgIG5ldyBzcWwuUmVxdWVzdChjb25uZWN0aW9uKVxyXG4gICAgICAgICAgLnF1ZXJ5KCdTRUxFQ1QgZmlyc3ROYW1lLCBsYXN0TmFtZSBGUk9NIENsaWVudHMgV0hFUkUgdXNlcklEID0gJyArIF9pZCArICcnKVxyXG4gICAgICAgICAgLnRoZW4oZnVuY3Rpb24oY2xpZW50KSB7XHJcbiAgICAgICAgICAgIG5ldyBzcWwuUmVxdWVzdChjb25uZWN0aW9uKVxyXG4gICAgICAgICAgICAgIC5xdWVyeShcIlVQREFURSBDbGllbnRzIFNFVCBlZGl0Q29uc2VudFJlcXVlc3QgPSAndHJ1ZScgV0hFUkUgdXNlcklEID0gXCIgKyBfaWQgKyBcIlwiKVxyXG4gICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgY2xpZW50ID0gY2xpZW50WzBdO1xyXG4gICAgICAgICAgICAgICAgdmFyIG1haWxPcHRpb25zID0ge1xyXG4gICAgICAgICAgICAgICAgICBmcm9tOiBtYWlsLnVzZXIsIC8vIHNlbmRlciBhZGRyZXNzXHJcbiAgICAgICAgICAgICAgICAgIHRvOiBtYWlsLnVzZXIsIC8vIHJlY2VpdmVyIFRCRFxyXG4gICAgICAgICAgICAgICAgICBzdWJqZWN0OiBjbGllbnQuZmlyc3ROYW1lICsgJyAnICsgY2xpZW50Lmxhc3ROYW1lICsgJyBSZXF1ZXN0IHRvIEVkaXQgQ29uc2VudCAoQ2xpZW50KScsIC8vIFN1YmplY3QgbGluZVxyXG4gICAgICAgICAgICAgICAgICB0ZXh0OiAnJywgLy8gcGxhaW4gdGV4dCBib2R5XHJcbiAgICAgICAgICAgICAgICAgIGh0bWw6ICdDbGllbnQgJyArIGNsaWVudC5maXJzdE5hbWUgKyAnICcgKyBjbGllbnQubGFzdE5hbWUgKyAnIHdhbnRzIHRvIGVkaXQgdGhlaXIgY29uc2VudCBmb3JtLjxici8+IFBsZWFzZSBsb2dpbiB0byB0aGUgY2xpZW50cyBwYWdlIGF0OiAnICsgc2l0ZV9zZXR0aW5ncy51cmwgKyAnLyMvY2xpZW50cy4gU2VhcmNoIGZvciAnKyBjbGllbnQuZmlyc3ROYW1lICsgJyAnICsgY2xpZW50Lmxhc3ROYW1lICsgJyBpbiB0aGUgY2xpZW50cyB0YWJsZSwgc2VsZWN0IFZpZXcgSW5mbyBmcm9tIHRoZSBkcm9wZG93biB0aGVuIHNlbGVjdCBDb25zZW50IHRvIGdyYW50IG9yIGRlbnkgYWNjZXNzLicvLyBodG1sIGJvZHlcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICBuZXcgTWFpbFNlcnZpY2UoKS5zZW5kTWVzc2FnZShcIlJlcXVlc3QgdG8gRWRpdCBDb25zZW50XCIsIG1haWxPcHRpb25zKTtcclxuICAgICAgICAgICAgICAgIG5ldyBBY3Rpdml0eVNlcnZpY2UoKS5yZXBvcnRBY3Rpdml0eSgnY2xpZW50JywgJ0Zvcm0gRWRpdCBSZXF1ZXN0JywgJ3N1Y2Nlc3MnLCBfaWQsICcnLCAnQ2xpZW50IGlzIHJlcXVlc3RpbmcgcGVybWlzc2lvbiB0byBlZGl0IHRoZWlyIGNvbnNlbnQgZm9ybS4nKTtcclxuICAgICAgICAgICAgICAgIHJlcy5zZW5kKHsgc3RhdHVzOiBcInN1Y2Nlc3NcIiB9KTtcclxuICAgICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbihlcnIpIHtcclxuICAgICAgICAgICAgICAgIHJlcy5zZW5kKHsgc3RhdHVzOiBcImVycm9yXCIgfSk7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImVkaXRDb25zZW50UmVxdWVzdDogVXBkYXRlIHJlcXVlc3QgdG8gZWRpdFwiICsgZXJyKTtcclxuICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGVycikge1xyXG4gICAgICAgICAgICByZXMuc2VuZCh7IHN0YXR1czogXCJlcnJvclwiIH0pO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImVkaXRDb25zZW50UmVxdWVzdDogU2VsZWN0IGZpcnN0IGFuZCBsYXN0IG5hbWVcIiArIGVycik7XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgfSk7XHJcblxyXG4gIH1cclxuXHJcbiAgZ3JhbnRDb25zZW50RWRpdFBlcm1pc3Npb24ocmVxOiBleHByZXNzLlJlcXVlc3QsIHJlczogZXhwcmVzcy5SZXNwb25zZSkge1xyXG4gICAgdHJ5IHtcclxuICAgICAgbmV3IEF1dGhDb250cm9sbGVyKCkuYXV0aFVzZXIocmVxLCByZXMsIHtcclxuICAgICAgICByZXF1aXJlZEF1dGg6IGF1dGgsIGRvbmU6IGZ1bmN0aW9uKGN1cnJlbnRVc2VySUQpIHtcclxuICAgICAgICAgIHZhciBwZXJtaXNzaW9uID0gcmVxLmJvZHkucGVybWlzc2lvbjtcclxuICAgICAgICAgIHZhciBjbGllbnQgPSByZXEuYm9keS5jbGllbnQ7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhcIlZhbHVlOiBcIiArIHBlcm1pc3Npb24gKyAnLCAnICsgXCJVc2VySUQ6IFwiICsgY2xpZW50LnVzZXJJRCApO1xyXG4gICAgICAgICAgaWYgKHBlcm1pc3Npb24pIHtcclxuICAgICAgICAgICAgc3FsLmNvbm5lY3QoZGIpXHJcbiAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24oY29ubmVjdGlvbikge1xyXG4gICAgICAgICAgICAgICAgbmV3IHNxbC5SZXF1ZXN0KGNvbm5lY3Rpb24pXHJcbiAgICAgICAgICAgICAgICAgIC5xdWVyeShcIlVQREFURSBDbGllbnRzIFNFVCBlZGl0Q29uc2VudFJlcXVlc3QgPSAnZmFsc2UnIFdIRVJFIHVzZXJJRCA9IFwiICsgY2xpZW50LnVzZXJJRClcclxuICAgICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24ocmVzdWx0MSkge1xyXG4gICAgICAgICAgICAgICAgICAgIG5ldyBzcWwuUmVxdWVzdChjb25uZWN0aW9uKVxyXG4gICAgICAgICAgICAgICAgICAgICAgLnF1ZXJ5KFwiVVBEQVRFIENsaWVudHMgU0VUIGVkaXRDb25zZW50UGVybWlzc2lvbiA9ICd0cnVlJyBXSEVSRSB1c2VySUQgPSBcIiArIGNsaWVudC51c2VySUQpXHJcbiAgICAgICAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbihyZXN1bHQyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBzcWwuUmVxdWVzdChjb25uZWN0aW9uKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5xdWVyeShcIlNFTEVDVCBlbWFpbCBGUk9NIHVzZXJzIFdIRVJFIHVzZXJJRCA9IFwiICsgY2xpZW50LnVzZXJJRClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbihjbGllbnRFbWFpbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG1haWxPcHRpb25zID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmcm9tOiBtYWlsLnVzZXIsIC8vIHNlbmRlciBhZGRyZXNzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvOiBjbGllbnRFbWFpbFswXS5lbWFpbCwgLy8gY2xpZW50LmVtYWlsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1YmplY3Q6ICdSZXF1ZXN0IEdyYW50ZWQhJywgLy8gU3ViamVjdCBsaW5lXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRleHQ6ICcnLCAvLyBwbGFpbiB0ZXh0IGJvZHlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaHRtbDogJ1lvdSBjYW4gbm93IGxvZ2luIGF0OiAnICsgc2l0ZV9zZXR0aW5ncy51cmwgKyAnIGFuZCBtYWtlIGNoYW5nZXMgdG8geW91ciBjb25zZW50IGZvcm0uJy8vIGh0bWwgYm9keVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBBY3Rpdml0eVNlcnZpY2UoKS5yZXBvcnRBY3Rpdml0eSgnY2xpZW50JywgJ1Blcm1pc3Npb24gR3JhbnRlZCcsICdzdWNjZXNzJywgY2xpZW50LnVzZXJJRCwgY3VycmVudFVzZXJJRCwgJ0NsaWVudCBoYXMgYmVlbiBncmFudGVkIHBlcm1pc3Npb24gdG8gZWRpdCB0aGVpciBjb25zZW50IGZvcm0uJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXcgTWFpbFNlcnZpY2UoKS5zZW5kTWVzc2FnZShcIkNvbnNlbnQgRWRpdCBSZXF1ZXN0IEdyYW50ZWRcIiwgbWFpbE9wdGlvbnMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzLnNlbmQoe3Jlc3VsdDogXCJncmFudGVkXCJ9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbihlcnIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcy5zZW5kKHsgXCJlcnJvclwiOiBcImVycm9yXCIgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImdyYW50Q29uc2VudEVkaXRQZXJtaXNzaW9uOiBHZXQgZW1haWwgZm9yIHVzZXIuIFwiICsgZXJyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGVycikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXMuc2VuZCh7IFwiZXJyb3JcIjogXCJlcnJvclwiIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImdyYW50Q29uc2VudEVkaXRQZXJtaXNzaW9uOiBTZXQgY29uc2VudCBlcXVhbCB0byB0cnVlKG5lZWRzIHRvIGJlIGNvbXBsZXRlZCkuIFwiICsgZXJyKTtcclxuICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbihlcnIpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXMuc2VuZCh7IFwiZXJyb3JcIjogXCJlcnJvclwiIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZ3JhbnRDb25zZW50RWRpdFBlcm1pc3Npb246IFNldCBlZGl0Q29uc2VudFJlcXVlc3QgZXF1YWwgdG8gZmFsc2UuIFwiICsgZXJyKTtcclxuICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXMuc2VuZCh7cmVzdWx0OiBcImRlbmllZFwifSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgY29uc29sZS5sb2coZSk7XHJcbiAgICAgIHJlcy5zZW5kKHsgXCJlcnJvclwiOiBcImVycm9yIGluIHlvdXIgcmVxdWVzdFwiIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZ2V0TGVhcm5pbmdTdHlsZUJ5SWQocmVxOiBleHByZXNzLlJlcXVlc3QsIHJlczogZXhwcmVzcy5SZXNwb25zZSkge1xyXG4gICAgdHJ5IHtcclxuICAgICAgbmV3IEF1dGhDb250cm9sbGVyKCkuYXV0aFVzZXIocmVxLCByZXMsIHtcclxuICAgICAgICByZXF1aXJlZEF1dGg6IGF1dGgsIGRvbmU6IGZ1bmN0aW9uKGN1cnJlbnRVc2VySUQpIHtcclxuICAgICAgICAgIHZhciBfaWQ6IHN0cmluZyA9IHJlcS5wYXJhbXMuX2lkO1xyXG4gICAgICAgICAgc3FsLmNvbm5lY3QoZGIpXHJcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKGNvbm5lY3Rpb24pIHtcclxuICAgICAgICAgICAgICBuZXcgc3FsLlJlcXVlc3QoY29ubmVjdGlvbilcclxuICAgICAgICAgICAgICAgIC5xdWVyeSgnU0VMRUNUICogRlJPTSBMZWFybmluZ1N0eWxlIFdIRVJFIHVzZXJJRCA9ICcgKyBfaWQgKyAnJylcclxuICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKGxlYXJuaW5nU3RseWVGb3JtKSB7XHJcbiAgICAgICAgICAgICAgICAgIHJlcy5zZW5kKGxlYXJuaW5nU3RseWVGb3JtKTtcclxuICAgICAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGVycikge1xyXG4gICAgICAgICAgICAgICAgICByZXMuc2VuZCh7IFwiZXJyb3JcIjogXCJlcnJvclwiIH0pO1xyXG4gICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkdldCBjb25zZW50IGJ5IGlkIFwiICsgZXJyKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICBjb25zb2xlLmxvZyhlKTtcclxuICAgICAgcmVzLnNlbmQoeyBcImVycm9yXCI6IFwiZXJyb3IgaW4geW91ciByZXF1ZXN0XCIgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBsZWFybmluZ1N0eWxlRm9ybShyZXE6IGV4cHJlc3MuUmVxdWVzdCwgcmVzOiBleHByZXNzLlJlc3BvbnNlKTogdm9pZCB7XHJcbiAgICB0cnkge1xyXG4gICAgICBuZXcgQXV0aENvbnRyb2xsZXIoKS5hdXRoVXNlcihyZXEsIHJlcywge1xyXG4gICAgICAgIHJlcXVpcmVkQXV0aDogYXV0aCwgZG9uZTogZnVuY3Rpb24oY3VycmVudFVzZXJJRCkge1xyXG4gICAgICAgICAgdmFyIGxlYXJuaW5nU3R5bGVGb3JtID0gcmVxLmJvZHkubGVhcm5pbmdTdHlsZUZvcm07XHJcbiAgICAgICAgICB2YXIgX2lkOiBzdHJpbmcgPSByZXEucGFyYW1zLl9pZDtcclxuICAgICAgICAgIHNxbC5jb25uZWN0KGRiKVxyXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbihjb25uZWN0aW9uKSB7XHJcbiAgICAgICAgICAgICAgdmFyIGxlYXJuaW5nU3R5bGVRdWVyeSA9IFwiJ1wiICsgX2lkICsgXCInLCAnXCIgK1xyXG4gICAgICAgICAgICAgICAgbGVhcm5pbmdTdHlsZUZvcm0uc2VlaW5nICsgXCInLCAnXCIgK1xyXG4gICAgICAgICAgICAgICAgbGVhcm5pbmdTdHlsZUZvcm0uaGVhcmluZyArIFwiJywgJ1wiICtcclxuICAgICAgICAgICAgICAgIGxlYXJuaW5nU3R5bGVGb3JtLmRvaW5nICsgXCInLCAnXCIgK1xyXG4gICAgICAgICAgICAgICAgbGVhcm5pbmdTdHlsZUZvcm0ubGVhcm5CeSArIFwiJ1wiO1xyXG4gICAgICAgICAgICAgIG5ldyBzcWwuUmVxdWVzdChjb25uZWN0aW9uKVxyXG4gICAgICAgICAgICAgICAgLnF1ZXJ5KFwiSU5TRVJUIElOVE8gTGVhcm5pbmdTdHlsZSBWQUxVRVMgKFwiICsgbGVhcm5pbmdTdHlsZVF1ZXJ5ICsgXCIpXCIpXHJcbiAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgbmV3IHNxbC5SZXF1ZXN0KClcclxuICAgICAgICAgICAgICAgICAgICAucXVlcnkoXCJVUERBVEUgQ2xpZW50cyBTRVQgbGVhcm5pbmdTdHlsZT0gJ2ZhbHNlJyBXSEVSRSB1c2VySUQgPSAnXCIgKyBfaWQgKyBcIidcIilcclxuICAgICAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICAgIG5ldyBBY3Rpdml0eVNlcnZpY2UoKS5yZXBvcnRBY3Rpdml0eSgnY2xpZW50JywgJ0Zvcm0gU3VibWl0dGVkJywgJ3N1Y2Nlc3MnLCBfaWQsIGN1cnJlbnRVc2VySUQsICdMZWFybmluZyBzdHlsZSBzdWJtaXR0ZWQgYnkgY2xpZW50LicpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgcmVzLnNlbmQoeyBcInN1Y2Nlc3NcIjogXCJzdWNjZXNzXCIgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICByZXMuc2VuZCh7IFwiZXJyb3JcIjogXCJlcnJvclwiIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJVcGRhdGUgY2xpZW50IFwiICsgZXJyKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGVycikge1xyXG4gICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlNhdmUgbGVhcm5pbmcgc3R5bGUgZm9ybSBcIiArIGVycik7XHJcbiAgICAgICAgICAgICAgICAgIHJlcy5zZW5kKHsgXCJlcnJvclwiOiBcImVycm9yXCIgfSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgY29uc29sZS5sb2coZSk7XHJcbiAgICAgIHJlcy5zZW5kKHsgXCJlcnJvclwiOiBcImVycm9yIGluIHlvdXIgcmVxdWVzdFwiIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZ2V0QWxsRm9ybXNCeUlEKHJlcTogZXhwcmVzcy5SZXF1ZXN0LCByZXM6IGV4cHJlc3MuUmVzcG9uc2UpIHtcclxuICAgIHRyeSB7XHJcbiAgICAgIG5ldyBBdXRoQ29udHJvbGxlcigpLmF1dGhVc2VyKHJlcSwgcmVzLCB7XHJcbiAgICAgICAgcmVxdWlyZWRBdXRoOiBhdXRoLCBkb25lOiBmdW5jdGlvbihjdXJyZW50VXNlcklEKSB7XHJcbiAgICAgICAgICB2YXIgX2lkOiBzdHJpbmcgPSByZXEucGFyYW1zLl9pZDtcclxuICAgICAgICAgIHNxbC5jb25uZWN0KGRiKVxyXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbihjb25uZWN0aW9uKSB7XHJcbiAgICAgICAgICAgICAgbmV3IHNxbC5SZXF1ZXN0KGNvbm5lY3Rpb24pXHJcbiAgICAgICAgICAgICAgICAucXVlcnkoJ1NFTEVDVCAqIEZST00gU3VpdGFiaWxpdHlGb3JtIFdIRVJFIHVzZXJJRCA9ICcgKyBfaWQgKyAnJylcclxuICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKHN1aXRhYmlsaXR5Rm9ybSkge1xyXG4gICAgICAgICAgICAgICAgICBuZXcgc3FsLlJlcXVlc3QoY29ubmVjdGlvbilcclxuICAgICAgICAgICAgICAgICAgICAucXVlcnkoJ1NFTEVDVCAqIEZST00gQ29uc2VudCBXSEVSRSB1c2VySUQgPSAnICsgX2lkICsgJycpXHJcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24oY29uc2VudEZvcm0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgIG5ldyBzcWwuUmVxdWVzdChjb25uZWN0aW9uKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAucXVlcnkoJ1NFTEVDVCAqIEZST00gTGVhcm5pbmdTdHlsZSBXSEVSRSB1c2VySUQgPSAnICsgX2lkICsgJycpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKGxlYXJuaW5nU3R5bGVGb3JtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3IHNxbC5SZXF1ZXN0KGNvbm5lY3Rpb24pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAucXVlcnkoJ1NFTEVDVCAqIEZST00gQXNzZXNzbWVudFJlc3VsdHMgV0hFUkUgdXNlcklEID0gJyArIF9pZCArICcnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24oYXNzZXNzbWVudFJlc3VsdHMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzLnNlbmQoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1aXRhYmlsaXR5Rm9ybTogc3VpdGFiaWxpdHlGb3JtLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNlbnRGb3JtOiBjb25zZW50Rm9ybSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZWFybmluZ1N0eWxlRm9ybTogbGVhcm5pbmdTdHlsZUZvcm0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXNzZXNzbWVudFJlc3VsdHM6IGFzc2Vzc21lbnRSZXN1bHRzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcy5zZW5kKHsgXCJlcnJvclwiOiBcImVycm9yXCIgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiR2V0IGFzc2Vzc21lbnRSZXN1bHRzIFwiICsgZXJyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbihlcnIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICByZXMuc2VuZCh7IFwiZXJyb3JcIjogXCJlcnJvclwiIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiR2V0IGxlYXJuaW5nU3R5bGVGb3JtcyBcIiArIGVycik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGVycikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgcmVzLnNlbmQoeyBcImVycm9yXCI6IFwiZXJyb3JcIiB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiR2V0IGNvbnNlbnRGb3JtcyBcIiArIGVycik7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbihlcnIpIHtcclxuICAgICAgICAgICAgICAgICAgcmVzLnNlbmQoeyBcImVycm9yXCI6IFwiZXJyb3JcIiB9KTtcclxuICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJHZXQgc3VpdGFiaWxpdHlGb3JtcyBcIiArIGVycik7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgY29uc29sZS5sb2coZSk7XHJcbiAgICAgIHJlcy5zZW5kKHsgXCJlcnJvclwiOiBcImVycm9yIGluIHlvdXIgcmVxdWVzdFwiIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbn1cclxuZXhwb3J0ID0gQ2xpZW50Rm9ybXNDb250cm9sbGVyO1xyXG4iXX0=
