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
                                    new ActivityService().reportActivity('Form Submitted', 'success', _id, 'Consent Form submitted by client.');
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
                    new ActivityService().reportActivity('Form Edit Request', 'success', _id, 'Client is requesting permission to edit their consent form.');
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
                                        new ActivityService().reportActivity('Permission Granted', 'success', client.userID, 'Client has been granted permission to edit their consent form.');
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
                                new ActivityService().reportActivity('Form Submitted', 'success', _id, 'Learning style submitted by client.');
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NlcnZlci9zcmMvY29udHJvbGxlcnMvQ2xpZW50Rm9ybXNDb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFHQSw4REFBaUU7QUFFakUsSUFBTSxXQUFXLEdBQUcsT0FBTyxDQUFDLHlCQUF5QixDQUFDLENBQUM7QUFDdkQsSUFBTSxVQUFVLEdBQUcsT0FBTyxDQUFDLHdCQUF3QixDQUFDLENBQUM7QUFDckQsSUFBTSxlQUFlLEdBQUcsT0FBTyxDQUFDLDZCQUE2QixDQUFDLENBQUM7QUFDL0QsSUFBSSxHQUFHLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQzNCLElBQUksSUFBSSxHQUFHLENBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxRQUFRLENBQUMsQ0FBQztBQUN4QyxJQUFNLE1BQU0sR0FBRyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUM7QUFDcEMsSUFBTSxFQUFFLEdBQUcsTUFBTSxDQUFDLEVBQUUsQ0FBQztBQUNyQixJQUFNLElBQUksR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDO0FBQ3pCLElBQU0sYUFBYSxHQUFHLE1BQU0sQ0FBQyxhQUFhLENBQUM7QUFFM0M7SUFBQTtJQWdTQSxDQUFDO0lBL1JDLDJDQUFXLEdBQVgsVUFBWSxHQUFvQixFQUFFLEdBQXFCO1FBQ3JELElBQUk7WUFDRixJQUFJLGNBQWMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFO2dCQUN0QyxZQUFZLEVBQUUsQ0FBQyxPQUFPLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxTQUFTLENBQUMsRUFBRSxJQUFJLEVBQUU7b0JBQzNELElBQUksV0FBVyxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDO29CQUN2QyxJQUFJLEdBQUcsR0FBVyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQztvQkFDakMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUM7eUJBQ1osSUFBSSxDQUFD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QUFDLENBQUMsQ0FBQzt3QkFDUCxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsVUFBUyxHQUFHOzRCQUNuQixHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxDQUFDLENBQUM7NEJBQy9CLE9BQU8sQ0FBQyxHQUFHLENBQUMsdUJBQXVCLEdBQUcsR0FBRyxDQUFDLENBQUM7d0JBQzdDLENBQUMsQ0FBQyxDQUFDO29CQUNQLENBQUMsQ0FBQyxDQUFDO2dCQUNQLENBQUM7YUFDRixDQUFDLENBQUM7U0FDSjtRQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQ1YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNmLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsQ0FBQyxDQUFDO1NBQ2hEO0lBQ0gsQ0FBQztJQUVILDRCQUFDO0FBQUQsQ0FoU0EsQUFnU0MsSUFBQTtBQUNELGlCQUFTLHFCQUFxQixDQUFDIiwiZmlsZSI6ImNvbnRyb2xsZXJzL0NsaWVudEZvcm1zQ29udHJvbGxlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBleHByZXNzID0gcmVxdWlyZShcImV4cHJlc3NcIik7XHJcbmltcG9ydCBqd3QgPSByZXF1aXJlKCdqc29ud2VidG9rZW4nKTtcclxuaW1wb3J0IGJjcnlwdCA9IHJlcXVpcmUoJ2JjcnlwdCcpO1xyXG5pbXBvcnQgQXV0aENvbnRyb2xsZXIgPSByZXF1aXJlKFwiLi4vY29udHJvbGxlcnMvQXV0aENvbnRyb2xsZXJcIik7XHJcbmltcG9ydCBDbGllbnRDb250cm9sbGVyID0gcmVxdWlyZShcIi4uL2NvbnRyb2xsZXJzL0NsaWVudENvbnRyb2xsZXJcIik7XHJcbmNvbnN0IE1haWxTZXJ2aWNlID0gcmVxdWlyZShcIi4uL3NlcnZpY2VzL01haWxTZXJ2aWNlXCIpO1xyXG5jb25zdCBQUkZTZXJ2aWNlID0gcmVxdWlyZShcIi4uL3NlcnZpY2VzL1BSRlNlcnZpY2VcIik7XHJcbmNvbnN0IEFjdGl2aXR5U2VydmljZSA9IHJlcXVpcmUoXCIuLi9zZXJ2aWNlcy9BY3Rpdml0eVNlcnZpY2VcIik7XHJcbnZhciBzcWwgPSByZXF1aXJlKCdtc3NxbCcpO1xyXG52YXIgYXV0aCA9IFtcIkFkbWluXCIsIFwiU3RhZmZcIiwgXCJDbGllbnRcIl07XHJcbmNvbnN0IGNvbmZpZyA9IHJlcXVpcmUoJy4uL2NvbmZpZycpO1xyXG5jb25zdCBkYiA9IGNvbmZpZy5kYjtcclxuY29uc3QgbWFpbCA9IGNvbmZpZy5tYWlsO1xyXG5jb25zdCBzaXRlX3NldHRpbmdzID0gY29uZmlnLnNpdGVfc2V0dGluZ3M7XHJcblxyXG5jbGFzcyBDbGllbnRGb3Jtc0NvbnRyb2xsZXIge1xyXG4gIGNvbnNlbnRGb3JtKHJlcTogZXhwcmVzcy5SZXF1ZXN0LCByZXM6IGV4cHJlc3MuUmVzcG9uc2UpOiB2b2lkIHtcclxuICAgIHRyeSB7XHJcbiAgICAgIG5ldyBBdXRoQ29udHJvbGxlcigpLmF1dGhVc2VyKHJlcSwgcmVzLCB7XHJcbiAgICAgICAgcmVxdWlyZWRBdXRoOiBbXCJBZG1pblwiLCBcIlN0YWZmXCIsIFwiQ2xpZW50XCIsIFwiU3R1ZGVudFwiXSwgZG9uZTogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICB2YXIgY29uc2VudEZvcm0gPSByZXEuYm9keS5jb25zZW50Rm9ybTtcclxuICAgICAgICAgIHZhciBfaWQ6IHN0cmluZyA9IHJlcS5wYXJhbXMuX2lkO1xyXG4gICAgICAgICAgc3FsLmNvbm5lY3QoZGIpXHJcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKGNvbm5lY3Rpb24pIHtcclxuICAgICAgICAgICAgICB2YXIgY29uc2VudFF1ZXJ5ID0gXCInXCIgKyBfaWQgKyBcIicsICdcIiArXHJcbiAgICAgICAgICAgICAgICBjb25zZW50Rm9ybS5kYXRlICsgXCInLCAnXCIgK1xyXG4gICAgICAgICAgICAgICAgY29uc2VudEZvcm0ub250YXJpb1dvcmtzICsgXCInLCAnXCIgK1xyXG4gICAgICAgICAgICAgICAgY29uc2VudEZvcm0ub3dDYXNlV29ya2VyTmFtZSArIFwiJywgJ1wiICtcclxuICAgICAgICAgICAgICAgIGNvbnNlbnRGb3JtLm93Q2FzZVdvcmtlclBob25lICsgXCInLCAnXCIgK1xyXG4gICAgICAgICAgICAgICAgY29uc2VudEZvcm0ub3dDYXNlV29ya2VyRW1haWwgKyBcIicsICdcIiArXHJcbiAgICAgICAgICAgICAgICBjb25zZW50Rm9ybS5vbnRhcmlvRGlzYWJpbGl0eVByb2dyYW0gKyBcIicsICdcIiArXHJcbiAgICAgICAgICAgICAgICBjb25zZW50Rm9ybS5vZHNwQWdlbmN5TmFtZSArIFwiJywgJ1wiICtcclxuICAgICAgICAgICAgICAgIGNvbnNlbnRGb3JtLm9kc3BDb250YWN0TmFtZSArIFwiJywgJ1wiICtcclxuICAgICAgICAgICAgICAgIGNvbnNlbnRGb3JtLm9kc3BQaG9uZSArIFwiJywgJ1wiICtcclxuICAgICAgICAgICAgICAgIGNvbnNlbnRGb3JtLm9kc3BFbWFpbCArIFwiJywgJ1wiICtcclxuICAgICAgICAgICAgICAgIGNvbnNlbnRGb3JtLmVtcGxveW1lbnRJbnN1cmFuY2UgKyBcIicsICdcIiArXHJcbiAgICAgICAgICAgICAgICBjb25zZW50Rm9ybS5lbXBsb3ltZW50U2VydmljZXMgKyBcIicsICdcIiArXHJcbiAgICAgICAgICAgICAgICBjb25zZW50Rm9ybS5lc0FnZW5jeU5hbWUgKyBcIicsICdcIiArXHJcbiAgICAgICAgICAgICAgICBjb25zZW50Rm9ybS5lc0NvbnRhY3ROYW1lICsgXCInLCAnXCIgK1xyXG4gICAgICAgICAgICAgICAgY29uc2VudEZvcm0uZXNQaG9uZSArIFwiJywgJ1wiICtcclxuICAgICAgICAgICAgICAgIGNvbnNlbnRGb3JtLmVzRW1haWwgKyBcIicsICdcIiArXHJcbiAgICAgICAgICAgICAgICBjb25zZW50Rm9ybS53c2liICsgXCInLCAnXCIgK1xyXG4gICAgICAgICAgICAgICAgY29uc2VudEZvcm0ud3NpYld0c05hbWUgKyBcIicsICdcIiArXHJcbiAgICAgICAgICAgICAgICBjb25zZW50Rm9ybS53c2liV3RzUGhvbmUgKyBcIicsICdcIiArXHJcbiAgICAgICAgICAgICAgICBjb25zZW50Rm9ybS5vdGhlciArIFwiJywgJ1wiICtcclxuICAgICAgICAgICAgICAgIGNvbnNlbnRGb3JtLmNvbnRhY3ROYW1lICsgXCInLCAnXCIgK1xyXG4gICAgICAgICAgICAgICAgY29uc2VudEZvcm0uY29udGFjdE51bSArIFwiJywgJ1wiICtcclxuICAgICAgICAgICAgICAgIGNvbnNlbnRGb3JtLmxpdGVyYWN5QWdlbmNpZXMgKyBcIicsICdcIiArXHJcbiAgICAgICAgICAgICAgICBjb25zZW50Rm9ybS5saXRlcmFjeVdpdG5lc3MgKyBcIidcIjtcclxuICAgICAgICAgICAgICBuZXcgc3FsLlJlcXVlc3QoY29ubmVjdGlvbilcclxuICAgICAgICAgICAgICAgIC5xdWVyeShcIklOU0VSVCBJTlRPIENvbnNlbnQgVkFMVUVTIChcIiArIGNvbnNlbnRRdWVyeSArIFwiKVwiKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgIG5ldyBzcWwuUmVxdWVzdChjb25uZWN0aW9uKVxyXG4gICAgICAgICAgICAgICAgICAgIC5xdWVyeShcIlVQREFURSBDbGllbnRzIFNFVCBjb25zZW50PSdmYWxzZScsIGVkaXRDb25zZW50UGVybWlzc2lvbj0nZmFsc2UnIFdIRVJFIHVzZXJJRCA9ICdcIiArIF9pZCArIFwiJ1wiKVxyXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgbmV3IHNxbC5SZXF1ZXN0KGNvbm5lY3Rpb24pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5xdWVyeShcIlVQREFURSBTdHVkZW50cyBTRVQgZWRpdENvbnNlbnRQZXJtaXNzaW9uPSdmYWxzZScgV0hFUkUgdXNlcklEID0gJ1wiICsgX2lkICsgXCInXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBBY3Rpdml0eVNlcnZpY2UoKS5yZXBvcnRBY3Rpdml0eSgnRm9ybSBTdWJtaXR0ZWQnLCAnc3VjY2VzcycsIF9pZCwgJ0NvbnNlbnQgRm9ybSBzdWJtaXR0ZWQgYnkgY2xpZW50LicpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHJlcy5zZW5kKHsgXCJzdWNjZXNzXCI6IFwic3VjY2Vzc1wiIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbihlcnIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICByZXMuc2VuZCh7IFwiZXJyb3JcIjogXCJlcnJvclwiIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiVXBkYXRlIHN0dWRlbnQgXCIgKyBlcnIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbihlcnIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgIHJlcy5zZW5kKHsgXCJlcnJvclwiOiBcImVycm9yXCIgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlVwZGF0ZSBjbGllbnQgXCIgKyBlcnIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiU2F2ZSBjb25zZW50IGZvcm0gXCIgKyBjb25zZW50UXVlcnkpO1xyXG4gICAgICAgICAgICAgICAgICByZXMuc2VuZCh7IFwiZXJyb3JcIjogXCJlcnJvclwiIH0pO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKGUpO1xyXG4gICAgICByZXMuc2VuZCh7IFwiZXJyb3JcIjogXCJlcnJvciBpbiB5b3VyIHJlcXVlc3RcIiB9KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGdldENvbnNlbnRCeUlkKHJlcTogZXhwcmVzcy5SZXF1ZXN0LCByZXM6IGV4cHJlc3MuUmVzcG9uc2UpIHtcclxuICAgIHRyeSB7XHJcbiAgICAgIG5ldyBBdXRoQ29udHJvbGxlcigpLmF1dGhVc2VyKHJlcSwgcmVzLCB7XHJcbiAgICAgICAgcmVxdWlyZWRBdXRoOiBbXCJBZG1pblwiLCBcIlN0YWZmXCIsIFwiQ2xpZW50XCIsIFwiU3R1ZGVudFwiXSwgZG9uZTogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICB2YXIgX2lkOiBzdHJpbmcgPSByZXEucGFyYW1zLl9pZDtcclxuICAgICAgICAgIHNxbC5jb25uZWN0KGRiKVxyXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbihjb25uZWN0aW9uKSB7XHJcbiAgICAgICAgICAgICAgbmV3IHNxbC5SZXF1ZXN0KGNvbm5lY3Rpb24pXHJcbiAgICAgICAgICAgICAgICAucXVlcnkoJ1NFTEVDVCAqIEZST00gQ29uc2VudCBXSEVSRSB1c2VySUQgPSAnICsgX2lkICsgJycpXHJcbiAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbihjb25zZW50Rm9ybSkge1xyXG4gICAgICAgICAgICAgICAgICByZXMuc2VuZChjb25zZW50Rm9ybSk7XHJcbiAgICAgICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbihlcnIpIHtcclxuICAgICAgICAgICAgICAgICAgcmVzLnNlbmQoeyBcImVycm9yXCI6IFwiZXJyb3JcIiB9KTtcclxuICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJHZXQgY29uc2VudCBieSBpZCBcIiArIGVycik7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgY29uc29sZS5sb2coZSk7XHJcbiAgICAgIHJlcy5zZW5kKHsgXCJlcnJvclwiOiBcImVycm9yIGluIHlvdXIgcmVxdWVzdFwiIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZWRpdENvbnNlbnRSZXF1ZXN0KHJlcTogZXhwcmVzcy5SZXF1ZXN0LCByZXM6IGV4cHJlc3MuUmVzcG9uc2UpIHtcclxuICAgIHZhciBfaWQ6IHN0cmluZyA9IHJlcS5wYXJhbXMuX2lkO1xyXG4gICAgc3FsLmNvbm5lY3QoZGIpXHJcbiAgICAgIC50aGVuKGZ1bmN0aW9uKGNvbm5lY3Rpb24pIHtcclxuICAgICAgICBuZXcgc3FsLlJlcXVlc3QoY29ubmVjdGlvbilcclxuICAgICAgICAgIC5xdWVyeSgnU0VMRUNUIGZpcnN0TmFtZSwgbGFzdE5hbWUgRlJPTSBDbGllbnRzIFdIRVJFIHVzZXJJRCA9ICcgKyBfaWQgKyAnJylcclxuICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKGNsaWVudCkge1xyXG4gICAgICAgICAgICBuZXcgc3FsLlJlcXVlc3QoY29ubmVjdGlvbilcclxuICAgICAgICAgICAgICAucXVlcnkoXCJVUERBVEUgQ2xpZW50cyBTRVQgZWRpdENvbnNlbnRSZXF1ZXN0ID0gJ3RydWUnIFdIRVJFIHVzZXJJRCA9IFwiICsgX2lkICsgXCJcIilcclxuICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgIGNsaWVudCA9IGNsaWVudFswXTtcclxuICAgICAgICAgICAgICAgIHZhciBtYWlsT3B0aW9ucyA9IHtcclxuICAgICAgICAgICAgICAgICAgZnJvbTogbWFpbC51c2VyLCAvLyBzZW5kZXIgYWRkcmVzc1xyXG4gICAgICAgICAgICAgICAgICB0bzogbWFpbC51c2VyLCAvLyByZWNlaXZlciBUQkRcclxuICAgICAgICAgICAgICAgICAgc3ViamVjdDogY2xpZW50LmZpcnN0TmFtZSArICcgJyArIGNsaWVudC5sYXN0TmFtZSArICcgUmVxdWVzdCB0byBFZGl0IENvbnNlbnQgKENsaWVudCknLCAvLyBTdWJqZWN0IGxpbmVcclxuICAgICAgICAgICAgICAgICAgdGV4dDogJycsIC8vIHBsYWluIHRleHQgYm9keVxyXG4gICAgICAgICAgICAgICAgICBodG1sOiAnQ2xpZW50ICcgKyBjbGllbnQuZmlyc3ROYW1lICsgJyAnICsgY2xpZW50Lmxhc3ROYW1lICsgJyB3YW50cyB0byBlZGl0IHRoZWlyIGNvbnNlbnQgZm9ybS48YnIvPiBQbGVhc2UgbG9naW4gdG8gdGhlIGNsaWVudHMgcGFnZSBhdDogJyArIHNpdGVfc2V0dGluZ3MudXJsICsgJy8jL2NsaWVudHMuIFNlYXJjaCBmb3IgJysgY2xpZW50LmZpcnN0TmFtZSArICcgJyArIGNsaWVudC5sYXN0TmFtZSArICcgaW4gdGhlIGNsaWVudHMgdGFibGUsIHNlbGVjdCBWaWV3IEluZm8gZnJvbSB0aGUgZHJvcGRvd24gdGhlbiBzZWxlY3QgQ29uc2VudCB0byBncmFudCBvciBkZW55IGFjY2Vzcy4nLy8gaHRtbCBib2R5XHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgbmV3IE1haWxTZXJ2aWNlKCkuc2VuZE1lc3NhZ2UoXCJSZXF1ZXN0IHRvIEVkaXQgQ29uc2VudFwiLCBtYWlsT3B0aW9ucyk7XHJcbiAgICAgICAgICAgICAgICBuZXcgQWN0aXZpdHlTZXJ2aWNlKCkucmVwb3J0QWN0aXZpdHkoJ0Zvcm0gRWRpdCBSZXF1ZXN0JywgJ3N1Y2Nlc3MnLCBfaWQsICdDbGllbnQgaXMgcmVxdWVzdGluZyBwZXJtaXNzaW9uIHRvIGVkaXQgdGhlaXIgY29uc2VudCBmb3JtLicpO1xyXG4gICAgICAgICAgICAgICAgcmVzLnNlbmQoeyBzdGF0dXM6IFwic3VjY2Vzc1wiIH0pO1xyXG4gICAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGVycikge1xyXG4gICAgICAgICAgICAgICAgcmVzLnNlbmQoeyBzdGF0dXM6IFwiZXJyb3JcIiB9KTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZWRpdENvbnNlbnRSZXF1ZXN0OiBVcGRhdGUgcmVxdWVzdCB0byBlZGl0XCIgKyBlcnIpO1xyXG4gICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XHJcbiAgICAgICAgICAgIHJlcy5zZW5kKHsgc3RhdHVzOiBcImVycm9yXCIgfSk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZWRpdENvbnNlbnRSZXF1ZXN0OiBTZWxlY3QgZmlyc3QgYW5kIGxhc3QgbmFtZVwiICsgZXJyKTtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICB9KTtcclxuXHJcbiAgfVxyXG5cclxuICBncmFudENvbnNlbnRFZGl0UGVybWlzc2lvbihyZXE6IGV4cHJlc3MuUmVxdWVzdCwgcmVzOiBleHByZXNzLlJlc3BvbnNlKSB7XHJcbiAgICB0cnkge1xyXG4gICAgICBuZXcgQXV0aENvbnRyb2xsZXIoKS5hdXRoVXNlcihyZXEsIHJlcywge1xyXG4gICAgICAgIHJlcXVpcmVkQXV0aDogYXV0aCwgZG9uZTogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICB2YXIgcGVybWlzc2lvbiA9IHJlcS5ib2R5LnBlcm1pc3Npb247XHJcbiAgICAgICAgICB2YXIgY2xpZW50ID0gcmVxLmJvZHkuY2xpZW50O1xyXG4gICAgICAgICAgY29uc29sZS5sb2coXCJWYWx1ZTogXCIgKyBwZXJtaXNzaW9uICsgJywgJyArIFwiVXNlcklEOiBcIiArIGNsaWVudC51c2VySUQgKTtcclxuICAgICAgICAgIGlmIChwZXJtaXNzaW9uKSB7XHJcbiAgICAgICAgICAgIHNxbC5jb25uZWN0KGRiKVxyXG4gICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKGNvbm5lY3Rpb24pIHtcclxuICAgICAgICAgICAgICAgIG5ldyBzcWwuUmVxdWVzdChjb25uZWN0aW9uKVxyXG4gICAgICAgICAgICAgICAgICAucXVlcnkoXCJVUERBVEUgQ2xpZW50cyBTRVQgZWRpdENvbnNlbnRSZXF1ZXN0ID0gJ2ZhbHNlJyBXSEVSRSB1c2VySUQgPSBcIiArIGNsaWVudC51c2VySUQpXHJcbiAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKHJlc3VsdDEpIHtcclxuICAgICAgICAgICAgICAgICAgICBuZXcgc3FsLlJlcXVlc3QoY29ubmVjdGlvbilcclxuICAgICAgICAgICAgICAgICAgICAgIC5xdWVyeShcIlVQREFURSBDbGllbnRzIFNFVCBlZGl0Q29uc2VudFBlcm1pc3Npb24gPSAndHJ1ZScgV0hFUkUgdXNlcklEID0gXCIgKyBjbGllbnQudXNlcklEKVxyXG4gICAgICAgICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24ocmVzdWx0Mikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXcgc3FsLlJlcXVlc3QoY29ubmVjdGlvbilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAucXVlcnkoXCJTRUxFQ1QgZW1haWwgRlJPTSB1c2VycyBXSEVSRSB1c2VySUQgPSBcIiArIGNsaWVudC51c2VySUQpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24oY2xpZW50RW1haWwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBtYWlsT3B0aW9ucyA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZnJvbTogbWFpbC51c2VyLCAvLyBzZW5kZXIgYWRkcmVzc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0bzogY2xpZW50RW1haWxbMF0uZW1haWwsIC8vIGNsaWVudC5lbWFpbFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdWJqZWN0OiAnUmVxdWVzdCBHcmFudGVkIScsIC8vIFN1YmplY3QgbGluZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0OiAnJywgLy8gcGxhaW4gdGV4dCBib2R5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGh0bWw6ICdZb3UgY2FuIG5vdyBsb2dpbiBhdDogJyArIHNpdGVfc2V0dGluZ3MudXJsICsgJyBhbmQgbWFrZSBjaGFuZ2VzIHRvIHlvdXIgY29uc2VudCBmb3JtLicvLyBodG1sIGJvZHlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXcgQWN0aXZpdHlTZXJ2aWNlKCkucmVwb3J0QWN0aXZpdHkoJ1Blcm1pc3Npb24gR3JhbnRlZCcsICdzdWNjZXNzJywgY2xpZW50LnVzZXJJRCwgJ0NsaWVudCBoYXMgYmVlbiBncmFudGVkIHBlcm1pc3Npb24gdG8gZWRpdCB0aGVpciBjb25zZW50IGZvcm0uJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXcgTWFpbFNlcnZpY2UoKS5zZW5kTWVzc2FnZShcIkNvbnNlbnQgRWRpdCBSZXF1ZXN0IEdyYW50ZWRcIiwgbWFpbE9wdGlvbnMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzLnNlbmQoe3Jlc3VsdDogXCJncmFudGVkXCJ9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbihlcnIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcy5zZW5kKHsgXCJlcnJvclwiOiBcImVycm9yXCIgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImdyYW50Q29uc2VudEVkaXRQZXJtaXNzaW9uOiBHZXQgZW1haWwgZm9yIHVzZXIuIFwiICsgZXJyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGVycikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXMuc2VuZCh7IFwiZXJyb3JcIjogXCJlcnJvclwiIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImdyYW50Q29uc2VudEVkaXRQZXJtaXNzaW9uOiBTZXQgY29uc2VudCBlcXVhbCB0byB0cnVlKG5lZWRzIHRvIGJlIGNvbXBsZXRlZCkuIFwiICsgZXJyKTtcclxuICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbihlcnIpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXMuc2VuZCh7IFwiZXJyb3JcIjogXCJlcnJvclwiIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZ3JhbnRDb25zZW50RWRpdFBlcm1pc3Npb246IFNldCBlZGl0Q29uc2VudFJlcXVlc3QgZXF1YWwgdG8gZmFsc2UuIFwiICsgZXJyKTtcclxuICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXMuc2VuZCh7cmVzdWx0OiBcImRlbmllZFwifSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgY29uc29sZS5sb2coZSk7XHJcbiAgICAgIHJlcy5zZW5kKHsgXCJlcnJvclwiOiBcImVycm9yIGluIHlvdXIgcmVxdWVzdFwiIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZ2V0TGVhcm5pbmdTdHlsZUJ5SWQocmVxOiBleHByZXNzLlJlcXVlc3QsIHJlczogZXhwcmVzcy5SZXNwb25zZSkge1xyXG4gICAgdHJ5IHtcclxuICAgICAgbmV3IEF1dGhDb250cm9sbGVyKCkuYXV0aFVzZXIocmVxLCByZXMsIHtcclxuICAgICAgICByZXF1aXJlZEF1dGg6IGF1dGgsIGRvbmU6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgdmFyIF9pZDogc3RyaW5nID0gcmVxLnBhcmFtcy5faWQ7XHJcbiAgICAgICAgICBzcWwuY29ubmVjdChkYilcclxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24oY29ubmVjdGlvbikge1xyXG4gICAgICAgICAgICAgIG5ldyBzcWwuUmVxdWVzdChjb25uZWN0aW9uKVxyXG4gICAgICAgICAgICAgICAgLnF1ZXJ5KCdTRUxFQ1QgKiBGUk9NIExlYXJuaW5nU3R5bGUgV0hFUkUgdXNlcklEID0gJyArIF9pZCArICcnKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24obGVhcm5pbmdTdGx5ZUZvcm0pIHtcclxuICAgICAgICAgICAgICAgICAgcmVzLnNlbmQobGVhcm5pbmdTdGx5ZUZvcm0pO1xyXG4gICAgICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgIHJlcy5zZW5kKHsgXCJlcnJvclwiOiBcImVycm9yXCIgfSk7XHJcbiAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiR2V0IGNvbnNlbnQgYnkgaWQgXCIgKyBlcnIpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKGUpO1xyXG4gICAgICByZXMuc2VuZCh7IFwiZXJyb3JcIjogXCJlcnJvciBpbiB5b3VyIHJlcXVlc3RcIiB9KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGxlYXJuaW5nU3R5bGVGb3JtKHJlcTogZXhwcmVzcy5SZXF1ZXN0LCByZXM6IGV4cHJlc3MuUmVzcG9uc2UpOiB2b2lkIHtcclxuICAgIHRyeSB7XHJcbiAgICAgIG5ldyBBdXRoQ29udHJvbGxlcigpLmF1dGhVc2VyKHJlcSwgcmVzLCB7XHJcbiAgICAgICAgcmVxdWlyZWRBdXRoOiBhdXRoLCBkb25lOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgIHZhciBsZWFybmluZ1N0eWxlRm9ybSA9IHJlcS5ib2R5LmxlYXJuaW5nU3R5bGVGb3JtO1xyXG4gICAgICAgICAgdmFyIF9pZDogc3RyaW5nID0gcmVxLnBhcmFtcy5faWQ7XHJcbiAgICAgICAgICBzcWwuY29ubmVjdChkYilcclxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24oY29ubmVjdGlvbikge1xyXG4gICAgICAgICAgICAgIHZhciBsZWFybmluZ1N0eWxlUXVlcnkgPSBcIidcIiArIF9pZCArIFwiJywgJ1wiICtcclxuICAgICAgICAgICAgICAgIGxlYXJuaW5nU3R5bGVGb3JtLnNlZWluZyArIFwiJywgJ1wiICtcclxuICAgICAgICAgICAgICAgIGxlYXJuaW5nU3R5bGVGb3JtLmhlYXJpbmcgKyBcIicsICdcIiArXHJcbiAgICAgICAgICAgICAgICBsZWFybmluZ1N0eWxlRm9ybS5kb2luZyArIFwiJywgJ1wiICtcclxuICAgICAgICAgICAgICAgIGxlYXJuaW5nU3R5bGVGb3JtLmxlYXJuQnkgKyBcIidcIjtcclxuICAgICAgICAgICAgICBuZXcgc3FsLlJlcXVlc3QoY29ubmVjdGlvbilcclxuICAgICAgICAgICAgICAgIC5xdWVyeShcIklOU0VSVCBJTlRPIExlYXJuaW5nU3R5bGUgVkFMVUVTIChcIiArIGxlYXJuaW5nU3R5bGVRdWVyeSArIFwiKVwiKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgIG5ldyBzcWwuUmVxdWVzdCgpXHJcbiAgICAgICAgICAgICAgICAgICAgLnF1ZXJ5KFwiVVBEQVRFIENsaWVudHMgU0VUIGxlYXJuaW5nU3R5bGU9ICdmYWxzZScgV0hFUkUgdXNlcklEID0gJ1wiICsgX2lkICsgXCInXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICBuZXcgQWN0aXZpdHlTZXJ2aWNlKCkucmVwb3J0QWN0aXZpdHkoJ0Zvcm0gU3VibWl0dGVkJywgJ3N1Y2Nlc3MnLCBfaWQsICdMZWFybmluZyBzdHlsZSBzdWJtaXR0ZWQgYnkgY2xpZW50LicpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgcmVzLnNlbmQoeyBcInN1Y2Nlc3NcIjogXCJzdWNjZXNzXCIgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICByZXMuc2VuZCh7IFwiZXJyb3JcIjogXCJlcnJvclwiIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJVcGRhdGUgY2xpZW50IFwiICsgZXJyKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGVycikge1xyXG4gICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlNhdmUgbGVhcm5pbmcgc3R5bGUgZm9ybSBcIiArIGVycik7XHJcbiAgICAgICAgICAgICAgICAgIHJlcy5zZW5kKHsgXCJlcnJvclwiOiBcImVycm9yXCIgfSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgY29uc29sZS5sb2coZSk7XHJcbiAgICAgIHJlcy5zZW5kKHsgXCJlcnJvclwiOiBcImVycm9yIGluIHlvdXIgcmVxdWVzdFwiIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZ2V0QWxsRm9ybXNCeUlEKHJlcTogZXhwcmVzcy5SZXF1ZXN0LCByZXM6IGV4cHJlc3MuUmVzcG9uc2UpIHtcclxuICAgIHRyeSB7XHJcbiAgICAgIG5ldyBBdXRoQ29udHJvbGxlcigpLmF1dGhVc2VyKHJlcSwgcmVzLCB7XHJcbiAgICAgICAgcmVxdWlyZWRBdXRoOiBhdXRoLCBkb25lOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgIHZhciBfaWQ6IHN0cmluZyA9IHJlcS5wYXJhbXMuX2lkO1xyXG4gICAgICAgICAgc3FsLmNvbm5lY3QoZGIpXHJcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKGNvbm5lY3Rpb24pIHtcclxuICAgICAgICAgICAgICBuZXcgc3FsLlJlcXVlc3QoY29ubmVjdGlvbilcclxuICAgICAgICAgICAgICAgIC5xdWVyeSgnU0VMRUNUICogRlJPTSBTdWl0YWJpbGl0eUZvcm0gV0hFUkUgdXNlcklEID0gJyArIF9pZCArICcnKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24oc3VpdGFiaWxpdHlGb3JtKSB7XHJcbiAgICAgICAgICAgICAgICAgIG5ldyBzcWwuUmVxdWVzdChjb25uZWN0aW9uKVxyXG4gICAgICAgICAgICAgICAgICAgIC5xdWVyeSgnU0VMRUNUICogRlJPTSBDb25zZW50IFdIRVJFIHVzZXJJRCA9ICcgKyBfaWQgKyAnJylcclxuICAgICAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbihjb25zZW50Rm9ybSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgbmV3IHNxbC5SZXF1ZXN0KGNvbm5lY3Rpb24pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5xdWVyeSgnU0VMRUNUICogRlJPTSBMZWFybmluZ1N0eWxlIFdIRVJFIHVzZXJJRCA9ICcgKyBfaWQgKyAnJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24obGVhcm5pbmdTdHlsZUZvcm0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICBuZXcgc3FsLlJlcXVlc3QoY29ubmVjdGlvbilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5xdWVyeSgnU0VMRUNUICogRlJPTSBBc3Nlc3NtZW50UmVzdWx0cyBXSEVSRSB1c2VySUQgPSAnICsgX2lkICsgJycpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbihhc3Nlc3NtZW50UmVzdWx0cykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXMuc2VuZCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3VpdGFiaWxpdHlGb3JtOiBzdWl0YWJpbGl0eUZvcm0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc2VudEZvcm06IGNvbnNlbnRGb3JtLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxlYXJuaW5nU3R5bGVGb3JtOiBsZWFybmluZ1N0eWxlRm9ybSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhc3Nlc3NtZW50UmVzdWx0czogYXNzZXNzbWVudFJlc3VsdHNcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbihlcnIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzLnNlbmQoeyBcImVycm9yXCI6IFwiZXJyb3JcIiB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJHZXQgYXNzZXNzbWVudFJlc3VsdHMgXCIgKyBlcnIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGVycikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHJlcy5zZW5kKHsgXCJlcnJvclwiOiBcImVycm9yXCIgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJHZXQgbGVhcm5pbmdTdHlsZUZvcm1zIFwiICsgZXJyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICByZXMuc2VuZCh7IFwiZXJyb3JcIjogXCJlcnJvclwiIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJHZXQgY29uc2VudEZvcm1zIFwiICsgZXJyKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGVycikge1xyXG4gICAgICAgICAgICAgICAgICByZXMuc2VuZCh7IFwiZXJyb3JcIjogXCJlcnJvclwiIH0pO1xyXG4gICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkdldCBzdWl0YWJpbGl0eUZvcm1zIFwiICsgZXJyKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICBjb25zb2xlLmxvZyhlKTtcclxuICAgICAgcmVzLnNlbmQoeyBcImVycm9yXCI6IFwiZXJyb3IgaW4geW91ciByZXF1ZXN0XCIgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxufVxyXG5leHBvcnQgPSBDbGllbnRGb3Jtc0NvbnRyb2xsZXI7XHJcbiJdfQ==
