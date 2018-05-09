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
                requiredAuth: ["Admin", "Staff", "Client", "Student"], done: function () {
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
                requiredAuth: ["Admin", "Staff", "Client", "Student"], done: function () {
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
                requiredAuth: auth, done: function () {
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
                requiredAuth: auth, done: function () {
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NlcnZlci9zcmMvY29udHJvbGxlcnMvQ2xpZW50Rm9ybXNDb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFHQSw4REFBaUU7QUFFakUsSUFBTSxXQUFXLEdBQUcsT0FBTyxDQUFDLHlCQUF5QixDQUFDLENBQUM7QUFDdkQsSUFBTSxVQUFVLEdBQUcsT0FBTyxDQUFDLHdCQUF3QixDQUFDLENBQUM7QUFDckQsSUFBTSxlQUFlLEdBQUcsT0FBTyxDQUFDLDZCQUE2QixDQUFDLENBQUM7QUFDL0QsSUFBSSxHQUFHLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQzNCLElBQUksSUFBSSxHQUFHLENBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxRQUFRLENBQUMsQ0FBQztBQUN4QyxJQUFNLE1BQU0sR0FBRyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUM7QUFDcEMsSUFBTSxFQUFFLEdBQUcsTUFBTSxDQUFDLEVBQUUsQ0FBQztBQUNyQixJQUFNLElBQUksR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDO0FBQ3pCLElBQU0sYUFBYSxHQUFHLE1BQU0sQ0FBQyxhQUFhLENBQUM7QUFFM0M7SUFBQTtJQW9SQSxDQUFDO0lBblJDLDJDQUFXLEdBQVgsVUFBWSxHQUFvQixFQUFFLEdBQXFCO1FBQ3JELElBQUk7WUFDRixJQUFJLGNBQWMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFO2dCQUN0QyxZQUFZLEVBQUUsQ0FBQyxPQUFPLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxTQUFTLENBQUMsRUFBRSxJQUFJLEVBQUU7b0JBQzNELElBQUksV0FBVyxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDO29CQUN2QyxJQUFJLEdBQUcsR0FBVyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQztvQkFDakMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUM7eUJBQ1osSUFBSSxDQUFD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RyxDQUFDLHlCQUF5QixHQUFHLEdBQUcsQ0FBQyxDQUFDO2dDQUMvQyxDQUFDLENBQUMsQ0FBQzs0QkFDUCxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsVUFBUyxHQUFHO2dDQUNuQixHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxDQUFDLENBQUM7Z0NBQy9CLE9BQU8sQ0FBQyxHQUFHLENBQUMsbUJBQW1CLEdBQUcsR0FBRyxDQUFDLENBQUM7NEJBQ3pDLENBQUMsQ0FBQyxDQUFDO3dCQUNQLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxVQUFTLEdBQUc7NEJBQ25CLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLENBQUMsQ0FBQzs0QkFDL0IsT0FBTyxDQUFDLEdBQUcsQ0FBQyx1QkFBdUIsR0FBRyxHQUFHLENBQUMsQ0FBQzt3QkFDN0MsQ0FBQyxDQUFDLENBQUM7b0JBQ1AsQ0FBQyxDQUFDLENBQUM7Z0JBQ1AsQ0FBQzthQUNGLENBQUMsQ0FBQztTQUNKO1FBQUMsT0FBTyxDQUFDLEVBQUU7WUFDVixPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2YsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxDQUFDLENBQUM7U0FDaEQ7SUFDSCxDQUFDO0lBRUgsNEJBQUM7QUFBRCxDQXBSQSxBQW9SQyxJQUFBO0FBQ0QsaUJBQVMscUJBQXFCLENBQUMiLCJmaWxlIjoiY29udHJvbGxlcnMvQ2xpZW50Rm9ybXNDb250cm9sbGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGV4cHJlc3MgPSByZXF1aXJlKFwiZXhwcmVzc1wiKTtcclxuaW1wb3J0IGp3dCA9IHJlcXVpcmUoJ2pzb253ZWJ0b2tlbicpO1xyXG5pbXBvcnQgYmNyeXB0ID0gcmVxdWlyZSgnYmNyeXB0Jyk7XHJcbmltcG9ydCBBdXRoQ29udHJvbGxlciA9IHJlcXVpcmUoXCIuLi9jb250cm9sbGVycy9BdXRoQ29udHJvbGxlclwiKTtcclxuaW1wb3J0IENsaWVudENvbnRyb2xsZXIgPSByZXF1aXJlKFwiLi4vY29udHJvbGxlcnMvQ2xpZW50Q29udHJvbGxlclwiKTtcclxuY29uc3QgTWFpbFNlcnZpY2UgPSByZXF1aXJlKFwiLi4vc2VydmljZXMvTWFpbFNlcnZpY2VcIik7XHJcbmNvbnN0IFBSRlNlcnZpY2UgPSByZXF1aXJlKFwiLi4vc2VydmljZXMvUFJGU2VydmljZVwiKTtcclxuY29uc3QgQWN0aXZpdHlTZXJ2aWNlID0gcmVxdWlyZShcIi4uL3NlcnZpY2VzL0FjdGl2aXR5U2VydmljZVwiKTtcclxudmFyIHNxbCA9IHJlcXVpcmUoJ21zc3FsJyk7XHJcbnZhciBhdXRoID0gW1wiQWRtaW5cIiwgXCJTdGFmZlwiLCBcIkNsaWVudFwiXTtcclxuY29uc3QgY29uZmlnID0gcmVxdWlyZSgnLi4vY29uZmlnJyk7XHJcbmNvbnN0IGRiID0gY29uZmlnLmRiO1xyXG5jb25zdCBtYWlsID0gY29uZmlnLm1haWw7XHJcbmNvbnN0IHNpdGVfc2V0dGluZ3MgPSBjb25maWcuc2l0ZV9zZXR0aW5ncztcclxuXHJcbmNsYXNzIENsaWVudEZvcm1zQ29udHJvbGxlciB7XHJcbiAgY29uc2VudEZvcm0ocmVxOiBleHByZXNzLlJlcXVlc3QsIHJlczogZXhwcmVzcy5SZXNwb25zZSk6IHZvaWQge1xyXG4gICAgdHJ5IHtcclxuICAgICAgbmV3IEF1dGhDb250cm9sbGVyKCkuYXV0aFVzZXIocmVxLCByZXMsIHtcclxuICAgICAgICByZXF1aXJlZEF1dGg6IFtcIkFkbWluXCIsIFwiU3RhZmZcIiwgXCJDbGllbnRcIiwgXCJTdHVkZW50XCJdLCBkb25lOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgIHZhciBjb25zZW50Rm9ybSA9IHJlcS5ib2R5LmNvbnNlbnRGb3JtO1xyXG4gICAgICAgICAgdmFyIF9pZDogc3RyaW5nID0gcmVxLnBhcmFtcy5faWQ7XHJcbiAgICAgICAgICBzcWwuY29ubmVjdChkYilcclxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24oY29ubmVjdGlvbikge1xyXG4gICAgICAgICAgICAgIHZhciBjb25zZW50UXVlcnkgPSBcIidcIiArIF9pZCArIFwiJywgJ1wiICtcclxuICAgICAgICAgICAgICAgIGNvbnNlbnRGb3JtLmRhdGUgKyBcIicsICdcIiArXHJcbiAgICAgICAgICAgICAgICBjb25zZW50Rm9ybS5vbnRhcmlvV29ya3MgKyBcIicsICdcIiArXHJcbiAgICAgICAgICAgICAgICBjb25zZW50Rm9ybS5vd0Nhc2VXb3JrZXJOYW1lICsgXCInLCAnXCIgK1xyXG4gICAgICAgICAgICAgICAgY29uc2VudEZvcm0ub3dDYXNlV29ya2VyUGhvbmUgKyBcIicsICdcIiArXHJcbiAgICAgICAgICAgICAgICBjb25zZW50Rm9ybS5vd0Nhc2VXb3JrZXJFbWFpbCArIFwiJywgJ1wiICtcclxuICAgICAgICAgICAgICAgIGNvbnNlbnRGb3JtLm9udGFyaW9EaXNhYmlsaXR5UHJvZ3JhbSArIFwiJywgJ1wiICtcclxuICAgICAgICAgICAgICAgIGNvbnNlbnRGb3JtLm9kc3BBZ2VuY3lOYW1lICsgXCInLCAnXCIgK1xyXG4gICAgICAgICAgICAgICAgY29uc2VudEZvcm0ub2RzcENvbnRhY3ROYW1lICsgXCInLCAnXCIgK1xyXG4gICAgICAgICAgICAgICAgY29uc2VudEZvcm0ub2RzcFBob25lICsgXCInLCAnXCIgK1xyXG4gICAgICAgICAgICAgICAgY29uc2VudEZvcm0ub2RzcEVtYWlsICsgXCInLCAnXCIgK1xyXG4gICAgICAgICAgICAgICAgY29uc2VudEZvcm0uZW1wbG95bWVudEluc3VyYW5jZSArIFwiJywgJ1wiICtcclxuICAgICAgICAgICAgICAgIGNvbnNlbnRGb3JtLmVtcGxveW1lbnRTZXJ2aWNlcyArIFwiJywgJ1wiICtcclxuICAgICAgICAgICAgICAgIGNvbnNlbnRGb3JtLmVzQWdlbmN5TmFtZSArIFwiJywgJ1wiICtcclxuICAgICAgICAgICAgICAgIGNvbnNlbnRGb3JtLmVzQ29udGFjdE5hbWUgKyBcIicsICdcIiArXHJcbiAgICAgICAgICAgICAgICBjb25zZW50Rm9ybS5lc1Bob25lICsgXCInLCAnXCIgK1xyXG4gICAgICAgICAgICAgICAgY29uc2VudEZvcm0uZXNFbWFpbCArIFwiJywgJ1wiICtcclxuICAgICAgICAgICAgICAgIGNvbnNlbnRGb3JtLndzaWIgKyBcIicsICdcIiArXHJcbiAgICAgICAgICAgICAgICBjb25zZW50Rm9ybS53c2liV3RzTmFtZSArIFwiJywgJ1wiICtcclxuICAgICAgICAgICAgICAgIGNvbnNlbnRGb3JtLndzaWJXdHNQaG9uZSArIFwiJywgJ1wiICtcclxuICAgICAgICAgICAgICAgIGNvbnNlbnRGb3JtLm90aGVyICsgXCInLCAnXCIgK1xyXG4gICAgICAgICAgICAgICAgY29uc2VudEZvcm0uY29udGFjdE5hbWUgKyBcIicsICdcIiArXHJcbiAgICAgICAgICAgICAgICBjb25zZW50Rm9ybS5jb250YWN0TnVtICsgXCInLCAnXCIgK1xyXG4gICAgICAgICAgICAgICAgY29uc2VudEZvcm0ubGl0ZXJhY3lBZ2VuY2llcyArIFwiJywgJ1wiICtcclxuICAgICAgICAgICAgICAgIGNvbnNlbnRGb3JtLmxpdGVyYWN5V2l0bmVzcyArIFwiJ1wiO1xyXG4gICAgICAgICAgICAgIG5ldyBzcWwuUmVxdWVzdChjb25uZWN0aW9uKVxyXG4gICAgICAgICAgICAgICAgLnF1ZXJ5KFwiSU5TRVJUIElOVE8gQ29uc2VudCBWQUxVRVMgKFwiICsgY29uc2VudFF1ZXJ5ICsgXCIpXCIpXHJcbiAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgbmV3IHNxbC5SZXF1ZXN0KGNvbm5lY3Rpb24pXHJcbiAgICAgICAgICAgICAgICAgICAgLnF1ZXJ5KFwiVVBEQVRFIENsaWVudHMgU0VUIGNvbnNlbnQ9J2ZhbHNlJywgZWRpdENvbnNlbnRQZXJtaXNzaW9uPSdmYWxzZScgV0hFUkUgdXNlcklEID0gJ1wiICsgX2lkICsgXCInXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICBuZXcgc3FsLlJlcXVlc3QoY29ubmVjdGlvbilcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnF1ZXJ5KFwiVVBEQVRFIFN0dWRlbnRzIFNFVCBlZGl0Q29uc2VudFBlcm1pc3Npb249J2ZhbHNlJyBXSEVSRSB1c2VySUQgPSAnXCIgKyBfaWQgKyBcIidcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzLnNlbmQoeyBcInN1Y2Nlc3NcIjogXCJzdWNjZXNzXCIgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGVycikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHJlcy5zZW5kKHsgXCJlcnJvclwiOiBcImVycm9yXCIgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJVcGRhdGUgc3R1ZGVudCBcIiArIGVycik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGVycikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgcmVzLnNlbmQoeyBcImVycm9yXCI6IFwiZXJyb3JcIiB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiVXBkYXRlIGNsaWVudCBcIiArIGVycik7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbihlcnIpIHtcclxuICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJTYXZlIGNvbnNlbnQgZm9ybSBcIiArIGNvbnNlbnRRdWVyeSk7XHJcbiAgICAgICAgICAgICAgICAgIHJlcy5zZW5kKHsgXCJlcnJvclwiOiBcImVycm9yXCIgfSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgY29uc29sZS5sb2coZSk7XHJcbiAgICAgIHJlcy5zZW5kKHsgXCJlcnJvclwiOiBcImVycm9yIGluIHlvdXIgcmVxdWVzdFwiIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZ2V0Q29uc2VudEJ5SWQocmVxOiBleHByZXNzLlJlcXVlc3QsIHJlczogZXhwcmVzcy5SZXNwb25zZSkge1xyXG4gICAgdHJ5IHtcclxuICAgICAgbmV3IEF1dGhDb250cm9sbGVyKCkuYXV0aFVzZXIocmVxLCByZXMsIHtcclxuICAgICAgICByZXF1aXJlZEF1dGg6IFtcIkFkbWluXCIsIFwiU3RhZmZcIiwgXCJDbGllbnRcIiwgXCJTdHVkZW50XCJdLCBkb25lOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgIHZhciBfaWQ6IHN0cmluZyA9IHJlcS5wYXJhbXMuX2lkO1xyXG4gICAgICAgICAgc3FsLmNvbm5lY3QoZGIpXHJcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKGNvbm5lY3Rpb24pIHtcclxuICAgICAgICAgICAgICBuZXcgc3FsLlJlcXVlc3QoY29ubmVjdGlvbilcclxuICAgICAgICAgICAgICAgIC5xdWVyeSgnU0VMRUNUICogRlJPTSBDb25zZW50IFdIRVJFIHVzZXJJRCA9ICcgKyBfaWQgKyAnJylcclxuICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKGNvbnNlbnRGb3JtKSB7XHJcbiAgICAgICAgICAgICAgICAgIHJlcy5zZW5kKGNvbnNlbnRGb3JtKTtcclxuICAgICAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGVycikge1xyXG4gICAgICAgICAgICAgICAgICByZXMuc2VuZCh7IFwiZXJyb3JcIjogXCJlcnJvclwiIH0pO1xyXG4gICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkdldCBjb25zZW50IGJ5IGlkIFwiICsgZXJyKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICBjb25zb2xlLmxvZyhlKTtcclxuICAgICAgcmVzLnNlbmQoeyBcImVycm9yXCI6IFwiZXJyb3IgaW4geW91ciByZXF1ZXN0XCIgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBlZGl0Q29uc2VudFJlcXVlc3QocmVxOiBleHByZXNzLlJlcXVlc3QsIHJlczogZXhwcmVzcy5SZXNwb25zZSkge1xyXG4gICAgdmFyIF9pZDogc3RyaW5nID0gcmVxLnBhcmFtcy5faWQ7XHJcbiAgICBzcWwuY29ubmVjdChkYilcclxuICAgICAgLnRoZW4oZnVuY3Rpb24oY29ubmVjdGlvbikge1xyXG4gICAgICAgIG5ldyBzcWwuUmVxdWVzdChjb25uZWN0aW9uKVxyXG4gICAgICAgICAgLnF1ZXJ5KCdTRUxFQ1QgZmlyc3ROYW1lLCBsYXN0TmFtZSBGUk9NIENsaWVudHMgV0hFUkUgdXNlcklEID0gJyArIF9pZCArICcnKVxyXG4gICAgICAgICAgLnRoZW4oZnVuY3Rpb24oY2xpZW50KSB7XHJcbiAgICAgICAgICAgIG5ldyBzcWwuUmVxdWVzdChjb25uZWN0aW9uKVxyXG4gICAgICAgICAgICAgIC5xdWVyeShcIlVQREFURSBDbGllbnRzIFNFVCBlZGl0Q29uc2VudFJlcXVlc3QgPSAndHJ1ZScgV0hFUkUgdXNlcklEID0gXCIgKyBfaWQgKyBcIlwiKVxyXG4gICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgY2xpZW50ID0gY2xpZW50WzBdO1xyXG4gICAgICAgICAgICAgICAgdmFyIG1haWxPcHRpb25zID0ge1xyXG4gICAgICAgICAgICAgICAgICBmcm9tOiBtYWlsLnVzZXIsIC8vIHNlbmRlciBhZGRyZXNzXHJcbiAgICAgICAgICAgICAgICAgIHRvOiBtYWlsLnVzZXIsIC8vIHJlY2VpdmVyIFRCRFxyXG4gICAgICAgICAgICAgICAgICBzdWJqZWN0OiBjbGllbnQuZmlyc3ROYW1lICsgJyAnICsgY2xpZW50Lmxhc3ROYW1lICsgJyBSZXF1ZXN0IHRvIEVkaXQgQ29uc2VudCAoQ2xpZW50KScsIC8vIFN1YmplY3QgbGluZVxyXG4gICAgICAgICAgICAgICAgICB0ZXh0OiAnJywgLy8gcGxhaW4gdGV4dCBib2R5XHJcbiAgICAgICAgICAgICAgICAgIGh0bWw6ICdDbGllbnQgJyArIGNsaWVudC5maXJzdE5hbWUgKyAnICcgKyBjbGllbnQubGFzdE5hbWUgKyAnIHdhbnRzIHRvIGVkaXQgdGhlaXIgY29uc2VudCBmb3JtLjxici8+IFBsZWFzZSBsb2dpbiB0byB0aGUgY2xpZW50cyBwYWdlIGF0OiAnICsgc2l0ZV9zZXR0aW5ncy51cmwgKyAnLyMvY2xpZW50cy4gU2VhcmNoIGZvciAnKyBjbGllbnQuZmlyc3ROYW1lICsgJyAnICsgY2xpZW50Lmxhc3ROYW1lICsgJyBpbiB0aGUgY2xpZW50cyB0YWJsZSwgc2VsZWN0IFZpZXcgSW5mbyBmcm9tIHRoZSBkcm9wZG93biB0aGVuIHNlbGVjdCBDb25zZW50IHRvIGdyYW50IG9yIGRlbnkgYWNjZXNzLicvLyBodG1sIGJvZHlcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICBuZXcgTWFpbFNlcnZpY2UoKS5zZW5kTWVzc2FnZShcIlJlcXVlc3QgdG8gRWRpdCBDb25zZW50XCIsIG1haWxPcHRpb25zKTtcclxuICAgICAgICAgICAgICAgIHJlcy5zZW5kKHsgc3RhdHVzOiBcInN1Y2Nlc3NcIiB9KTtcclxuICAgICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbihlcnIpIHtcclxuICAgICAgICAgICAgICAgIHJlcy5zZW5kKHsgc3RhdHVzOiBcImVycm9yXCIgfSk7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImVkaXRDb25zZW50UmVxdWVzdDogVXBkYXRlIHJlcXVlc3QgdG8gZWRpdFwiICsgZXJyKTtcclxuICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGVycikge1xyXG4gICAgICAgICAgICByZXMuc2VuZCh7IHN0YXR1czogXCJlcnJvclwiIH0pO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImVkaXRDb25zZW50UmVxdWVzdDogU2VsZWN0IGZpcnN0IGFuZCBsYXN0IG5hbWVcIiArIGVycik7XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgfSk7XHJcblxyXG4gIH1cclxuXHJcbiAgZ3JhbnRDb25zZW50RWRpdFBlcm1pc3Npb24ocmVxOiBleHByZXNzLlJlcXVlc3QsIHJlczogZXhwcmVzcy5SZXNwb25zZSkge1xyXG4gICAgdHJ5IHtcclxuICAgICAgbmV3IEF1dGhDb250cm9sbGVyKCkuYXV0aFVzZXIocmVxLCByZXMsIHtcclxuICAgICAgICByZXF1aXJlZEF1dGg6IGF1dGgsIGRvbmU6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgdmFyIHBlcm1pc3Npb24gPSByZXEuYm9keS5wZXJtaXNzaW9uO1xyXG4gICAgICAgICAgdmFyIGNsaWVudCA9IHJlcS5ib2R5LmNsaWVudDtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKFwiVmFsdWU6IFwiICsgcGVybWlzc2lvbiArICcsICcgKyBcIlVzZXJJRDogXCIgKyBjbGllbnQudXNlcklEICk7XHJcbiAgICAgICAgICBpZiAocGVybWlzc2lvbikge1xyXG4gICAgICAgICAgICBzcWwuY29ubmVjdChkYilcclxuICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbihjb25uZWN0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICBuZXcgc3FsLlJlcXVlc3QoY29ubmVjdGlvbilcclxuICAgICAgICAgICAgICAgICAgLnF1ZXJ5KFwiVVBEQVRFIENsaWVudHMgU0VUIGVkaXRDb25zZW50UmVxdWVzdCA9ICdmYWxzZScgV0hFUkUgdXNlcklEID0gXCIgKyBjbGllbnQudXNlcklEKVxyXG4gICAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbihyZXN1bHQxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmV3IHNxbC5SZXF1ZXN0KGNvbm5lY3Rpb24pXHJcbiAgICAgICAgICAgICAgICAgICAgICAucXVlcnkoXCJVUERBVEUgQ2xpZW50cyBTRVQgZWRpdENvbnNlbnRQZXJtaXNzaW9uID0gJ3RydWUnIFdIRVJFIHVzZXJJRCA9IFwiICsgY2xpZW50LnVzZXJJRClcclxuICAgICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKHJlc3VsdDIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmV3IHNxbC5SZXF1ZXN0KGNvbm5lY3Rpb24pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLnF1ZXJ5KFwiU0VMRUNUIGVtYWlsIEZST00gdXNlcnMgV0hFUkUgdXNlcklEID0gXCIgKyBjbGllbnQudXNlcklEKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKGNsaWVudEVtYWlsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgbWFpbE9wdGlvbnMgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZyb206IG1haWwudXNlciwgLy8gc2VuZGVyIGFkZHJlc3NcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdG86IGNsaWVudEVtYWlsWzBdLmVtYWlsLCAvLyBjbGllbnQuZW1haWxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3ViamVjdDogJ1JlcXVlc3QgR3JhbnRlZCEnLCAvLyBTdWJqZWN0IGxpbmVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dDogJycsIC8vIHBsYWluIHRleHQgYm9keVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBodG1sOiAnWW91IGNhbiBub3cgbG9naW4gYXQ6ICcgKyBzaXRlX3NldHRpbmdzLnVybCArICcgYW5kIG1ha2UgY2hhbmdlcyB0byB5b3VyIGNvbnNlbnQgZm9ybS4nLy8gaHRtbCBib2R5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3IE1haWxTZXJ2aWNlKCkuc2VuZE1lc3NhZ2UoXCJDb25zZW50IEVkaXQgUmVxdWVzdCBHcmFudGVkXCIsIG1haWxPcHRpb25zKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcy5zZW5kKHtyZXN1bHQ6IFwiZ3JhbnRlZFwifSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXMuc2VuZCh7IFwiZXJyb3JcIjogXCJlcnJvclwiIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJncmFudENvbnNlbnRFZGl0UGVybWlzc2lvbjogR2V0IGVtYWlsIGZvciB1c2VyLiBcIiArIGVycik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbihlcnIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzLnNlbmQoeyBcImVycm9yXCI6IFwiZXJyb3JcIiB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJncmFudENvbnNlbnRFZGl0UGVybWlzc2lvbjogU2V0IGNvbnNlbnQgZXF1YWwgdG8gdHJ1ZShuZWVkcyB0byBiZSBjb21wbGV0ZWQpLiBcIiArIGVycik7XHJcbiAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzLnNlbmQoeyBcImVycm9yXCI6IFwiZXJyb3JcIiB9KTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImdyYW50Q29uc2VudEVkaXRQZXJtaXNzaW9uOiBTZXQgZWRpdENvbnNlbnRSZXF1ZXN0IGVxdWFsIHRvIGZhbHNlLiBcIiArIGVycik7XHJcbiAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmVzLnNlbmQoe3Jlc3VsdDogXCJkZW5pZWRcIn0pO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKGUpO1xyXG4gICAgICByZXMuc2VuZCh7IFwiZXJyb3JcIjogXCJlcnJvciBpbiB5b3VyIHJlcXVlc3RcIiB9KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGdldExlYXJuaW5nU3R5bGVCeUlkKHJlcTogZXhwcmVzcy5SZXF1ZXN0LCByZXM6IGV4cHJlc3MuUmVzcG9uc2UpIHtcclxuICAgIHRyeSB7XHJcbiAgICAgIG5ldyBBdXRoQ29udHJvbGxlcigpLmF1dGhVc2VyKHJlcSwgcmVzLCB7XHJcbiAgICAgICAgcmVxdWlyZWRBdXRoOiBhdXRoLCBkb25lOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgIHZhciBfaWQ6IHN0cmluZyA9IHJlcS5wYXJhbXMuX2lkO1xyXG4gICAgICAgICAgc3FsLmNvbm5lY3QoZGIpXHJcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKGNvbm5lY3Rpb24pIHtcclxuICAgICAgICAgICAgICBuZXcgc3FsLlJlcXVlc3QoY29ubmVjdGlvbilcclxuICAgICAgICAgICAgICAgIC5xdWVyeSgnU0VMRUNUICogRlJPTSBMZWFybmluZ1N0eWxlIFdIRVJFIHVzZXJJRCA9ICcgKyBfaWQgKyAnJylcclxuICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKGxlYXJuaW5nU3RseWVGb3JtKSB7XHJcbiAgICAgICAgICAgICAgICAgIHJlcy5zZW5kKGxlYXJuaW5nU3RseWVGb3JtKTtcclxuICAgICAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGVycikge1xyXG4gICAgICAgICAgICAgICAgICByZXMuc2VuZCh7IFwiZXJyb3JcIjogXCJlcnJvclwiIH0pO1xyXG4gICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkdldCBjb25zZW50IGJ5IGlkIFwiICsgZXJyKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICBjb25zb2xlLmxvZyhlKTtcclxuICAgICAgcmVzLnNlbmQoeyBcImVycm9yXCI6IFwiZXJyb3IgaW4geW91ciByZXF1ZXN0XCIgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBsZWFybmluZ1N0eWxlRm9ybShyZXE6IGV4cHJlc3MuUmVxdWVzdCwgcmVzOiBleHByZXNzLlJlc3BvbnNlKTogdm9pZCB7XHJcbiAgICB0cnkge1xyXG4gICAgICBuZXcgQXV0aENvbnRyb2xsZXIoKS5hdXRoVXNlcihyZXEsIHJlcywge1xyXG4gICAgICAgIHJlcXVpcmVkQXV0aDogYXV0aCwgZG9uZTogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICB2YXIgbGVhcm5pbmdTdHlsZUZvcm0gPSByZXEuYm9keS5sZWFybmluZ1N0eWxlRm9ybTtcclxuICAgICAgICAgIHZhciBfaWQ6IHN0cmluZyA9IHJlcS5wYXJhbXMuX2lkO1xyXG4gICAgICAgICAgc3FsLmNvbm5lY3QoZGIpXHJcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKGNvbm5lY3Rpb24pIHtcclxuICAgICAgICAgICAgICB2YXIgbGVhcm5pbmdTdHlsZVF1ZXJ5ID0gXCInXCIgKyBfaWQgKyBcIicsICdcIiArXHJcbiAgICAgICAgICAgICAgICBsZWFybmluZ1N0eWxlRm9ybS5zZWVpbmcgKyBcIicsICdcIiArXHJcbiAgICAgICAgICAgICAgICBsZWFybmluZ1N0eWxlRm9ybS5oZWFyaW5nICsgXCInLCAnXCIgK1xyXG4gICAgICAgICAgICAgICAgbGVhcm5pbmdTdHlsZUZvcm0uZG9pbmcgKyBcIicsICdcIiArXHJcbiAgICAgICAgICAgICAgICBsZWFybmluZ1N0eWxlRm9ybS5sZWFybkJ5ICsgXCInXCI7XHJcbiAgICAgICAgICAgICAgbmV3IHNxbC5SZXF1ZXN0KGNvbm5lY3Rpb24pXHJcbiAgICAgICAgICAgICAgICAucXVlcnkoXCJJTlNFUlQgSU5UTyBMZWFybmluZ1N0eWxlIFZBTFVFUyAoXCIgKyBsZWFybmluZ1N0eWxlUXVlcnkgKyBcIilcIilcclxuICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICBuZXcgc3FsLlJlcXVlc3QoKVxyXG4gICAgICAgICAgICAgICAgICAgIC5xdWVyeShcIlVQREFURSBDbGllbnRzIFNFVCBsZWFybmluZ1N0eWxlPSAnZmFsc2UnIFdIRVJFIHVzZXJJRCA9ICdcIiArIF9pZCArIFwiJ1wiKVxyXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgcmVzLnNlbmQoeyBcInN1Y2Nlc3NcIjogXCJzdWNjZXNzXCIgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICByZXMuc2VuZCh7IFwiZXJyb3JcIjogXCJlcnJvclwiIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJVcGRhdGUgY2xpZW50IFwiICsgZXJyKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGVycikge1xyXG4gICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlNhdmUgbGVhcm5pbmcgc3R5bGUgZm9ybSBcIiArIGVycik7XHJcbiAgICAgICAgICAgICAgICAgIHJlcy5zZW5kKHsgXCJlcnJvclwiOiBcImVycm9yXCIgfSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgY29uc29sZS5sb2coZSk7XHJcbiAgICAgIHJlcy5zZW5kKHsgXCJlcnJvclwiOiBcImVycm9yIGluIHlvdXIgcmVxdWVzdFwiIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZ2V0QWxsRm9ybXNCeUlEKHJlcTogZXhwcmVzcy5SZXF1ZXN0LCByZXM6IGV4cHJlc3MuUmVzcG9uc2UpIHtcclxuICAgIHRyeSB7XHJcbiAgICAgIG5ldyBBdXRoQ29udHJvbGxlcigpLmF1dGhVc2VyKHJlcSwgcmVzLCB7XHJcbiAgICAgICAgcmVxdWlyZWRBdXRoOiBhdXRoLCBkb25lOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgIHZhciBfaWQ6IHN0cmluZyA9IHJlcS5wYXJhbXMuX2lkO1xyXG4gICAgICAgICAgc3FsLmNvbm5lY3QoZGIpXHJcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKGNvbm5lY3Rpb24pIHtcclxuICAgICAgICAgICAgICBuZXcgc3FsLlJlcXVlc3QoY29ubmVjdGlvbilcclxuICAgICAgICAgICAgICAgIC5xdWVyeSgnU0VMRUNUICogRlJPTSBTdWl0YWJpbGl0eUZvcm0gV0hFUkUgdXNlcklEID0gJyArIF9pZCArICcnKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24oc3VpdGFiaWxpdHlGb3JtKSB7XHJcbiAgICAgICAgICAgICAgICAgIG5ldyBzcWwuUmVxdWVzdChjb25uZWN0aW9uKVxyXG4gICAgICAgICAgICAgICAgICAgIC5xdWVyeSgnU0VMRUNUICogRlJPTSBDb25zZW50IFdIRVJFIHVzZXJJRCA9ICcgKyBfaWQgKyAnJylcclxuICAgICAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbihjb25zZW50Rm9ybSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgbmV3IHNxbC5SZXF1ZXN0KGNvbm5lY3Rpb24pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5xdWVyeSgnU0VMRUNUICogRlJPTSBMZWFybmluZ1N0eWxlIFdIRVJFIHVzZXJJRCA9ICcgKyBfaWQgKyAnJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24obGVhcm5pbmdTdHlsZUZvcm0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICByZXMuc2VuZCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdWl0YWJpbGl0eUZvcm06IHN1aXRhYmlsaXR5Rm9ybSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNlbnRGb3JtOiBjb25zZW50Rm9ybSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxlYXJuaW5nU3R5bGVGb3JtOiBsZWFybmluZ1N0eWxlRm9ybVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbihlcnIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICByZXMuc2VuZCh7IFwiZXJyb3JcIjogXCJlcnJvclwiIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiR2V0IGxlYXJuaW5nU3R5bGVGb3JtcyBcIiArIGVycik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGVycikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgcmVzLnNlbmQoeyBcImVycm9yXCI6IFwiZXJyb3JcIiB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiR2V0IGNvbnNlbnRGb3JtcyBcIiArIGVycik7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbihlcnIpIHtcclxuICAgICAgICAgICAgICAgICAgcmVzLnNlbmQoeyBcImVycm9yXCI6IFwiZXJyb3JcIiB9KTtcclxuICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJHZXQgc3VpdGFiaWxpdHlGb3JtcyBcIiArIGVycik7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgY29uc29sZS5sb2coZSk7XHJcbiAgICAgIHJlcy5zZW5kKHsgXCJlcnJvclwiOiBcImVycm9yIGluIHlvdXIgcmVxdWVzdFwiIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbn1cclxuZXhwb3J0ID0gQ2xpZW50Rm9ybXNDb250cm9sbGVyO1xyXG4iXX0=
