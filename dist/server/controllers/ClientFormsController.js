"use strict";
const AuthController = require("../controllers/AuthController");
const MailService = require("../services/MailService");
const PRFService = require("../services/PRFService");
const ActivityService = require("../services/ActivityService");
var sql = require('mssql');
var auth = ["Admin", "Staff", "Client"];
const config = require('../config');
const db = config.db;
const mail = config.mail;
const site_settings = config.site_settings;
class ClientFormsController {
    consentForm(req, res) {
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
    }
    getConsentById(req, res) {
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
    }
    editConsentRequest(req, res) {
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
    }
    grantConsentEditPermission(req, res) {
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
    }
    getLearningStyleById(req, res) {
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
    }
    learningStyleForm(req, res) {
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
    }
    getAllFormsByID(req, res) {
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
    }
}
module.exports = ClientFormsController;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NlcnZlci9zcmMvY29udHJvbGxlcnMvQ2xpZW50Rm9ybXNDb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFHQSxnRUFBaUU7QUFFakUsTUFBTSxXQUFXLEdBQUcsT0FBTyxDQUFDLHlCQUF5QixDQUFDLENBQUM7QUFDdkQsTUFBTSxVQUFVLEdBQUcsT0FBTyxDQUFDLHdCQUF3QixDQUFDLENBQUM7QUFDckQsTUFBTSxlQUFlLEdBQUcsT0FBTyxDQUFDLDZCQUE2QixDQUFDLENBQUM7QUFDL0QsSUFBSSxHQUFHLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQzNCLElBQUksSUFBSSxHQUFHLENBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxRQUFRLENBQUMsQ0FBQztBQUN4QyxNQUFNLE1BQU0sR0FBRyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUM7QUFDcEMsTUFBTSxFQUFFLEdBQUcsTUFBTSxDQUFDLEVBQUUsQ0FBQztBQUNyQixNQUFNLElBQUksR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDO0FBQ3pCLE1BQU0sYUFBYSxHQUFHLE1BQU0sQ0FBQyxhQUFhLENBQUM7QUFFM0M7SUFDRSxXQUFXLENBQUMsR0FBb0IsRUFBRSxHQUFxQjtRQUNyRCxJQUFJO1lBQ0YsSUFBSSxjQUFjLEVBQUUsQ0FBQyxRQUFRLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRTtnQkFDdEMsWUFBWSxFQUFFLENBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsU0FBUyxDQUFDLEVBQUUsSUFBSSxFQUFFLFVBQVMsYUFBYTtvQkFDakYsSUFBSSxXQUFXLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUM7b0JBQ3ZDLElBQUksR0FBRyxHQUFXLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDO29CQUNqQyxHQUFHLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQzt5QkFDWixJQUFJLENBQUMsVUFBUyxVQUFVO3dC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QUFFLENBQUMsQ0FBQztnQ0FDL0IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsR0FBRyxHQUFHLENBQUMsQ0FBQzs0QkFDekMsQ0FBQyxDQUFDLENBQUM7d0JBQ1AsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLFVBQVMsR0FBRzs0QkFDbkIsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsQ0FBQyxDQUFDOzRCQUMvQixPQUFPLENBQUMsR0FBRyxDQUFDLHVCQUF1QixHQUFHLEdBQUcsQ0FBQyxDQUFDO3dCQUM3QyxDQUFDLENBQUMsQ0FBQztvQkFDUCxDQUFDLENBQUMsQ0FBQztnQkFDUCxDQUFDO2FBQ0YsQ0FBQyxDQUFDO1NBQ0o7UUFBQyxPQUFPLENBQUMsRUFBRTtZQUNWLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDZixHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsT0FBTyxFQUFFLHVCQUF1QixFQUFFLENBQUMsQ0FBQztTQUNoRDtJQUNILENBQUM7Q0FFRjtBQUNELGlCQUFTLHFCQUFxQixDQUFDIiwiZmlsZSI6ImNvbnRyb2xsZXJzL0NsaWVudEZvcm1zQ29udHJvbGxlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBleHByZXNzID0gcmVxdWlyZShcImV4cHJlc3NcIik7XHJcbmltcG9ydCBqd3QgPSByZXF1aXJlKCdqc29ud2VidG9rZW4nKTtcclxuaW1wb3J0IGJjcnlwdCA9IHJlcXVpcmUoJ2JjcnlwdCcpO1xyXG5pbXBvcnQgQXV0aENvbnRyb2xsZXIgPSByZXF1aXJlKFwiLi4vY29udHJvbGxlcnMvQXV0aENvbnRyb2xsZXJcIik7XHJcbmltcG9ydCBDbGllbnRDb250cm9sbGVyID0gcmVxdWlyZShcIi4uL2NvbnRyb2xsZXJzL0NsaWVudENvbnRyb2xsZXJcIik7XHJcbmNvbnN0IE1haWxTZXJ2aWNlID0gcmVxdWlyZShcIi4uL3NlcnZpY2VzL01haWxTZXJ2aWNlXCIpO1xyXG5jb25zdCBQUkZTZXJ2aWNlID0gcmVxdWlyZShcIi4uL3NlcnZpY2VzL1BSRlNlcnZpY2VcIik7XHJcbmNvbnN0IEFjdGl2aXR5U2VydmljZSA9IHJlcXVpcmUoXCIuLi9zZXJ2aWNlcy9BY3Rpdml0eVNlcnZpY2VcIik7XHJcbnZhciBzcWwgPSByZXF1aXJlKCdtc3NxbCcpO1xyXG52YXIgYXV0aCA9IFtcIkFkbWluXCIsIFwiU3RhZmZcIiwgXCJDbGllbnRcIl07XHJcbmNvbnN0IGNvbmZpZyA9IHJlcXVpcmUoJy4uL2NvbmZpZycpO1xyXG5jb25zdCBkYiA9IGNvbmZpZy5kYjtcclxuY29uc3QgbWFpbCA9IGNvbmZpZy5tYWlsO1xyXG5jb25zdCBzaXRlX3NldHRpbmdzID0gY29uZmlnLnNpdGVfc2V0dGluZ3M7XHJcblxyXG5jbGFzcyBDbGllbnRGb3Jtc0NvbnRyb2xsZXIge1xyXG4gIGNvbnNlbnRGb3JtKHJlcTogZXhwcmVzcy5SZXF1ZXN0LCByZXM6IGV4cHJlc3MuUmVzcG9uc2UpOiB2b2lkIHtcclxuICAgIHRyeSB7XHJcbiAgICAgIG5ldyBBdXRoQ29udHJvbGxlcigpLmF1dGhVc2VyKHJlcSwgcmVzLCB7XHJcbiAgICAgICAgcmVxdWlyZWRBdXRoOiBbXCJBZG1pblwiLCBcIlN0YWZmXCIsIFwiQ2xpZW50XCIsIFwiU3R1ZGVudFwiXSwgZG9uZTogZnVuY3Rpb24oY3VycmVudFVzZXJJRCkge1xyXG4gICAgICAgICAgdmFyIGNvbnNlbnRGb3JtID0gcmVxLmJvZHkuY29uc2VudEZvcm07XHJcbiAgICAgICAgICB2YXIgX2lkOiBzdHJpbmcgPSByZXEucGFyYW1zLl9pZDtcclxuICAgICAgICAgIHNxbC5jb25uZWN0KGRiKVxyXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbihjb25uZWN0aW9uKSB7XHJcbiAgICAgICAgICAgICAgdmFyIGNvbnNlbnRRdWVyeSA9IFwiJ1wiICsgX2lkICsgXCInLCAnXCIgK1xyXG4gICAgICAgICAgICAgICAgY29uc2VudEZvcm0uZGF0ZSArIFwiJywgJ1wiICtcclxuICAgICAgICAgICAgICAgIGNvbnNlbnRGb3JtLm9udGFyaW9Xb3JrcyArIFwiJywgJ1wiICtcclxuICAgICAgICAgICAgICAgIGNvbnNlbnRGb3JtLm93Q2FzZVdvcmtlck5hbWUgKyBcIicsICdcIiArXHJcbiAgICAgICAgICAgICAgICBjb25zZW50Rm9ybS5vd0Nhc2VXb3JrZXJQaG9uZSArIFwiJywgJ1wiICtcclxuICAgICAgICAgICAgICAgIGNvbnNlbnRGb3JtLm93Q2FzZVdvcmtlckVtYWlsICsgXCInLCAnXCIgK1xyXG4gICAgICAgICAgICAgICAgY29uc2VudEZvcm0ub250YXJpb0Rpc2FiaWxpdHlQcm9ncmFtICsgXCInLCAnXCIgK1xyXG4gICAgICAgICAgICAgICAgY29uc2VudEZvcm0ub2RzcEFnZW5jeU5hbWUgKyBcIicsICdcIiArXHJcbiAgICAgICAgICAgICAgICBjb25zZW50Rm9ybS5vZHNwQ29udGFjdE5hbWUgKyBcIicsICdcIiArXHJcbiAgICAgICAgICAgICAgICBjb25zZW50Rm9ybS5vZHNwUGhvbmUgKyBcIicsICdcIiArXHJcbiAgICAgICAgICAgICAgICBjb25zZW50Rm9ybS5vZHNwRW1haWwgKyBcIicsICdcIiArXHJcbiAgICAgICAgICAgICAgICBjb25zZW50Rm9ybS5lbXBsb3ltZW50SW5zdXJhbmNlICsgXCInLCAnXCIgK1xyXG4gICAgICAgICAgICAgICAgY29uc2VudEZvcm0uZW1wbG95bWVudFNlcnZpY2VzICsgXCInLCAnXCIgK1xyXG4gICAgICAgICAgICAgICAgY29uc2VudEZvcm0uZXNBZ2VuY3lOYW1lICsgXCInLCAnXCIgK1xyXG4gICAgICAgICAgICAgICAgY29uc2VudEZvcm0uZXNDb250YWN0TmFtZSArIFwiJywgJ1wiICtcclxuICAgICAgICAgICAgICAgIGNvbnNlbnRGb3JtLmVzUGhvbmUgKyBcIicsICdcIiArXHJcbiAgICAgICAgICAgICAgICBjb25zZW50Rm9ybS5lc0VtYWlsICsgXCInLCAnXCIgK1xyXG4gICAgICAgICAgICAgICAgY29uc2VudEZvcm0ud3NpYiArIFwiJywgJ1wiICtcclxuICAgICAgICAgICAgICAgIGNvbnNlbnRGb3JtLndzaWJXdHNOYW1lICsgXCInLCAnXCIgK1xyXG4gICAgICAgICAgICAgICAgY29uc2VudEZvcm0ud3NpYld0c1Bob25lICsgXCInLCAnXCIgK1xyXG4gICAgICAgICAgICAgICAgY29uc2VudEZvcm0ub3RoZXIgKyBcIicsICdcIiArXHJcbiAgICAgICAgICAgICAgICBjb25zZW50Rm9ybS5jb250YWN0TmFtZSArIFwiJywgJ1wiICtcclxuICAgICAgICAgICAgICAgIGNvbnNlbnRGb3JtLmNvbnRhY3ROdW0gKyBcIicsICdcIiArXHJcbiAgICAgICAgICAgICAgICBjb25zZW50Rm9ybS5saXRlcmFjeUFnZW5jaWVzICsgXCInLCAnXCIgK1xyXG4gICAgICAgICAgICAgICAgY29uc2VudEZvcm0ubGl0ZXJhY3lXaXRuZXNzICsgXCInXCI7XHJcbiAgICAgICAgICAgICAgbmV3IHNxbC5SZXF1ZXN0KGNvbm5lY3Rpb24pXHJcbiAgICAgICAgICAgICAgICAucXVlcnkoXCJJTlNFUlQgSU5UTyBDb25zZW50IFZBTFVFUyAoXCIgKyBjb25zZW50UXVlcnkgKyBcIilcIilcclxuICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICBuZXcgc3FsLlJlcXVlc3QoY29ubmVjdGlvbilcclxuICAgICAgICAgICAgICAgICAgICAucXVlcnkoXCJVUERBVEUgQ2xpZW50cyBTRVQgY29uc2VudD0nZmFsc2UnLCBlZGl0Q29uc2VudFBlcm1pc3Npb249J2ZhbHNlJyBXSEVSRSB1c2VySUQgPSAnXCIgKyBfaWQgKyBcIidcIilcclxuICAgICAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICAgIG5ldyBzcWwuUmVxdWVzdChjb25uZWN0aW9uKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAucXVlcnkoXCJVUERBVEUgU3R1ZGVudHMgU0VUIGVkaXRDb25zZW50UGVybWlzc2lvbj0nZmFsc2UnIFdIRVJFIHVzZXJJRCA9ICdcIiArIF9pZCArIFwiJ1wiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICBuZXcgQWN0aXZpdHlTZXJ2aWNlKCkucmVwb3J0QWN0aXZpdHkoJ2NsaWVudCcsICdGb3JtIFN1Ym1pdHRlZCcsICdzdWNjZXNzJywgX2lkLCBjdXJyZW50VXNlcklELCAnQ29uc2VudCBGb3JtIHN1Ym1pdHRlZCBieSBjbGllbnQuJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzLnNlbmQoeyBcInN1Y2Nlc3NcIjogXCJzdWNjZXNzXCIgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGVycikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHJlcy5zZW5kKHsgXCJlcnJvclwiOiBcImVycm9yXCIgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJVcGRhdGUgc3R1ZGVudCBcIiArIGVycik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGVycikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgcmVzLnNlbmQoeyBcImVycm9yXCI6IFwiZXJyb3JcIiB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiVXBkYXRlIGNsaWVudCBcIiArIGVycik7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbihlcnIpIHtcclxuICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJTYXZlIGNvbnNlbnQgZm9ybSBcIiArIGNvbnNlbnRRdWVyeSk7XHJcbiAgICAgICAgICAgICAgICAgIHJlcy5zZW5kKHsgXCJlcnJvclwiOiBcImVycm9yXCIgfSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgY29uc29sZS5sb2coZSk7XHJcbiAgICAgIHJlcy5zZW5kKHsgXCJlcnJvclwiOiBcImVycm9yIGluIHlvdXIgcmVxdWVzdFwiIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZ2V0Q29uc2VudEJ5SWQocmVxOiBleHByZXNzLlJlcXVlc3QsIHJlczogZXhwcmVzcy5SZXNwb25zZSkge1xyXG4gICAgdHJ5IHtcclxuICAgICAgbmV3IEF1dGhDb250cm9sbGVyKCkuYXV0aFVzZXIocmVxLCByZXMsIHtcclxuICAgICAgICByZXF1aXJlZEF1dGg6IFtcIkFkbWluXCIsIFwiU3RhZmZcIiwgXCJDbGllbnRcIiwgXCJTdHVkZW50XCJdLCBkb25lOiBmdW5jdGlvbihjdXJyZW50VXNlcklEKSB7XHJcbiAgICAgICAgICB2YXIgX2lkOiBzdHJpbmcgPSByZXEucGFyYW1zLl9pZDtcclxuICAgICAgICAgIHNxbC5jb25uZWN0KGRiKVxyXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbihjb25uZWN0aW9uKSB7XHJcbiAgICAgICAgICAgICAgbmV3IHNxbC5SZXF1ZXN0KGNvbm5lY3Rpb24pXHJcbiAgICAgICAgICAgICAgICAucXVlcnkoJ1NFTEVDVCAqIEZST00gQ29uc2VudCBXSEVSRSB1c2VySUQgPSAnICsgX2lkICsgJycpXHJcbiAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbihjb25zZW50Rm9ybSkge1xyXG4gICAgICAgICAgICAgICAgICByZXMuc2VuZChjb25zZW50Rm9ybSk7XHJcbiAgICAgICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbihlcnIpIHtcclxuICAgICAgICAgICAgICAgICAgcmVzLnNlbmQoeyBcImVycm9yXCI6IFwiZXJyb3JcIiB9KTtcclxuICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJHZXQgY29uc2VudCBieSBpZCBcIiArIGVycik7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgY29uc29sZS5sb2coZSk7XHJcbiAgICAgIHJlcy5zZW5kKHsgXCJlcnJvclwiOiBcImVycm9yIGluIHlvdXIgcmVxdWVzdFwiIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZWRpdENvbnNlbnRSZXF1ZXN0KHJlcTogZXhwcmVzcy5SZXF1ZXN0LCByZXM6IGV4cHJlc3MuUmVzcG9uc2UpIHtcclxuICAgIHZhciBfaWQ6IHN0cmluZyA9IHJlcS5wYXJhbXMuX2lkO1xyXG4gICAgc3FsLmNvbm5lY3QoZGIpXHJcbiAgICAgIC50aGVuKGZ1bmN0aW9uKGNvbm5lY3Rpb24pIHtcclxuICAgICAgICBuZXcgc3FsLlJlcXVlc3QoY29ubmVjdGlvbilcclxuICAgICAgICAgIC5xdWVyeSgnU0VMRUNUIGZpcnN0TmFtZSwgbGFzdE5hbWUgRlJPTSBDbGllbnRzIFdIRVJFIHVzZXJJRCA9ICcgKyBfaWQgKyAnJylcclxuICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKGNsaWVudCkge1xyXG4gICAgICAgICAgICBuZXcgc3FsLlJlcXVlc3QoY29ubmVjdGlvbilcclxuICAgICAgICAgICAgICAucXVlcnkoXCJVUERBVEUgQ2xpZW50cyBTRVQgZWRpdENvbnNlbnRSZXF1ZXN0ID0gJ3RydWUnIFdIRVJFIHVzZXJJRCA9IFwiICsgX2lkICsgXCJcIilcclxuICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgIGNsaWVudCA9IGNsaWVudFswXTtcclxuICAgICAgICAgICAgICAgIHZhciBtYWlsT3B0aW9ucyA9IHtcclxuICAgICAgICAgICAgICAgICAgZnJvbTogbWFpbC51c2VyLCAvLyBzZW5kZXIgYWRkcmVzc1xyXG4gICAgICAgICAgICAgICAgICB0bzogbWFpbC51c2VyLCAvLyByZWNlaXZlciBUQkRcclxuICAgICAgICAgICAgICAgICAgc3ViamVjdDogY2xpZW50LmZpcnN0TmFtZSArICcgJyArIGNsaWVudC5sYXN0TmFtZSArICcgUmVxdWVzdCB0byBFZGl0IENvbnNlbnQgKENsaWVudCknLCAvLyBTdWJqZWN0IGxpbmVcclxuICAgICAgICAgICAgICAgICAgdGV4dDogJycsIC8vIHBsYWluIHRleHQgYm9keVxyXG4gICAgICAgICAgICAgICAgICBodG1sOiAnQ2xpZW50ICcgKyBjbGllbnQuZmlyc3ROYW1lICsgJyAnICsgY2xpZW50Lmxhc3ROYW1lICsgJyB3YW50cyB0byBlZGl0IHRoZWlyIGNvbnNlbnQgZm9ybS48YnIvPiBQbGVhc2UgbG9naW4gdG8gdGhlIGNsaWVudHMgcGFnZSBhdDogJyArIHNpdGVfc2V0dGluZ3MudXJsICsgJy8jL2NsaWVudHMuIFNlYXJjaCBmb3IgJysgY2xpZW50LmZpcnN0TmFtZSArICcgJyArIGNsaWVudC5sYXN0TmFtZSArICcgaW4gdGhlIGNsaWVudHMgdGFibGUsIHNlbGVjdCBWaWV3IEluZm8gZnJvbSB0aGUgZHJvcGRvd24gdGhlbiBzZWxlY3QgQ29uc2VudCB0byBncmFudCBvciBkZW55IGFjY2Vzcy4nLy8gaHRtbCBib2R5XHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgbmV3IE1haWxTZXJ2aWNlKCkuc2VuZE1lc3NhZ2UoXCJSZXF1ZXN0IHRvIEVkaXQgQ29uc2VudFwiLCBtYWlsT3B0aW9ucyk7XHJcbiAgICAgICAgICAgICAgICBuZXcgQWN0aXZpdHlTZXJ2aWNlKCkucmVwb3J0QWN0aXZpdHkoJ2NsaWVudCcsICdGb3JtIEVkaXQgUmVxdWVzdCcsICdzdWNjZXNzJywgX2lkLCAnJywgJ0NsaWVudCBpcyByZXF1ZXN0aW5nIHBlcm1pc3Npb24gdG8gZWRpdCB0aGVpciBjb25zZW50IGZvcm0uJyk7XHJcbiAgICAgICAgICAgICAgICByZXMuc2VuZCh7IHN0YXR1czogXCJzdWNjZXNzXCIgfSk7XHJcbiAgICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XHJcbiAgICAgICAgICAgICAgICByZXMuc2VuZCh7IHN0YXR1czogXCJlcnJvclwiIH0pO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJlZGl0Q29uc2VudFJlcXVlc3Q6IFVwZGF0ZSByZXF1ZXN0IHRvIGVkaXRcIiArIGVycik7XHJcbiAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbihlcnIpIHtcclxuICAgICAgICAgICAgcmVzLnNlbmQoeyBzdGF0dXM6IFwiZXJyb3JcIiB9KTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJlZGl0Q29uc2VudFJlcXVlc3Q6IFNlbGVjdCBmaXJzdCBhbmQgbGFzdCBuYW1lXCIgKyBlcnIpO1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgIH0pO1xyXG5cclxuICB9XHJcblxyXG4gIGdyYW50Q29uc2VudEVkaXRQZXJtaXNzaW9uKHJlcTogZXhwcmVzcy5SZXF1ZXN0LCByZXM6IGV4cHJlc3MuUmVzcG9uc2UpIHtcclxuICAgIHRyeSB7XHJcbiAgICAgIG5ldyBBdXRoQ29udHJvbGxlcigpLmF1dGhVc2VyKHJlcSwgcmVzLCB7XHJcbiAgICAgICAgcmVxdWlyZWRBdXRoOiBhdXRoLCBkb25lOiBmdW5jdGlvbihjdXJyZW50VXNlcklEKSB7XHJcbiAgICAgICAgICB2YXIgcGVybWlzc2lvbiA9IHJlcS5ib2R5LnBlcm1pc3Npb247XHJcbiAgICAgICAgICB2YXIgY2xpZW50ID0gcmVxLmJvZHkuY2xpZW50O1xyXG4gICAgICAgICAgY29uc29sZS5sb2coXCJWYWx1ZTogXCIgKyBwZXJtaXNzaW9uICsgJywgJyArIFwiVXNlcklEOiBcIiArIGNsaWVudC51c2VySUQgKTtcclxuICAgICAgICAgIGlmIChwZXJtaXNzaW9uKSB7XHJcbiAgICAgICAgICAgIHNxbC5jb25uZWN0KGRiKVxyXG4gICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKGNvbm5lY3Rpb24pIHtcclxuICAgICAgICAgICAgICAgIG5ldyBzcWwuUmVxdWVzdChjb25uZWN0aW9uKVxyXG4gICAgICAgICAgICAgICAgICAucXVlcnkoXCJVUERBVEUgQ2xpZW50cyBTRVQgZWRpdENvbnNlbnRSZXF1ZXN0ID0gJ2ZhbHNlJyBXSEVSRSB1c2VySUQgPSBcIiArIGNsaWVudC51c2VySUQpXHJcbiAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKHJlc3VsdDEpIHtcclxuICAgICAgICAgICAgICAgICAgICBuZXcgc3FsLlJlcXVlc3QoY29ubmVjdGlvbilcclxuICAgICAgICAgICAgICAgICAgICAgIC5xdWVyeShcIlVQREFURSBDbGllbnRzIFNFVCBlZGl0Q29uc2VudFBlcm1pc3Npb24gPSAndHJ1ZScgV0hFUkUgdXNlcklEID0gXCIgKyBjbGllbnQudXNlcklEKVxyXG4gICAgICAgICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24ocmVzdWx0Mikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXcgc3FsLlJlcXVlc3QoY29ubmVjdGlvbilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAucXVlcnkoXCJTRUxFQ1QgZW1haWwgRlJPTSB1c2VycyBXSEVSRSB1c2VySUQgPSBcIiArIGNsaWVudC51c2VySUQpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24oY2xpZW50RW1haWwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBtYWlsT3B0aW9ucyA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZnJvbTogbWFpbC51c2VyLCAvLyBzZW5kZXIgYWRkcmVzc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0bzogY2xpZW50RW1haWxbMF0uZW1haWwsIC8vIGNsaWVudC5lbWFpbFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdWJqZWN0OiAnUmVxdWVzdCBHcmFudGVkIScsIC8vIFN1YmplY3QgbGluZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0OiAnJywgLy8gcGxhaW4gdGV4dCBib2R5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGh0bWw6ICdZb3UgY2FuIG5vdyBsb2dpbiBhdDogJyArIHNpdGVfc2V0dGluZ3MudXJsICsgJyBhbmQgbWFrZSBjaGFuZ2VzIHRvIHlvdXIgY29uc2VudCBmb3JtLicvLyBodG1sIGJvZHlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXcgQWN0aXZpdHlTZXJ2aWNlKCkucmVwb3J0QWN0aXZpdHkoJ2NsaWVudCcsICdQZXJtaXNzaW9uIEdyYW50ZWQnLCAnc3VjY2VzcycsIGNsaWVudC51c2VySUQsIGN1cnJlbnRVc2VySUQsICdDbGllbnQgaGFzIGJlZW4gZ3JhbnRlZCBwZXJtaXNzaW9uIHRvIGVkaXQgdGhlaXIgY29uc2VudCBmb3JtLicpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3IE1haWxTZXJ2aWNlKCkuc2VuZE1lc3NhZ2UoXCJDb25zZW50IEVkaXQgUmVxdWVzdCBHcmFudGVkXCIsIG1haWxPcHRpb25zKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcy5zZW5kKHtyZXN1bHQ6IFwiZ3JhbnRlZFwifSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXMuc2VuZCh7IFwiZXJyb3JcIjogXCJlcnJvclwiIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJncmFudENvbnNlbnRFZGl0UGVybWlzc2lvbjogR2V0IGVtYWlsIGZvciB1c2VyLiBcIiArIGVycik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbihlcnIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzLnNlbmQoeyBcImVycm9yXCI6IFwiZXJyb3JcIiB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJncmFudENvbnNlbnRFZGl0UGVybWlzc2lvbjogU2V0IGNvbnNlbnQgZXF1YWwgdG8gdHJ1ZShuZWVkcyB0byBiZSBjb21wbGV0ZWQpLiBcIiArIGVycik7XHJcbiAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzLnNlbmQoeyBcImVycm9yXCI6IFwiZXJyb3JcIiB9KTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImdyYW50Q29uc2VudEVkaXRQZXJtaXNzaW9uOiBTZXQgZWRpdENvbnNlbnRSZXF1ZXN0IGVxdWFsIHRvIGZhbHNlLiBcIiArIGVycik7XHJcbiAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmVzLnNlbmQoe3Jlc3VsdDogXCJkZW5pZWRcIn0pO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKGUpO1xyXG4gICAgICByZXMuc2VuZCh7IFwiZXJyb3JcIjogXCJlcnJvciBpbiB5b3VyIHJlcXVlc3RcIiB9KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGdldExlYXJuaW5nU3R5bGVCeUlkKHJlcTogZXhwcmVzcy5SZXF1ZXN0LCByZXM6IGV4cHJlc3MuUmVzcG9uc2UpIHtcclxuICAgIHRyeSB7XHJcbiAgICAgIG5ldyBBdXRoQ29udHJvbGxlcigpLmF1dGhVc2VyKHJlcSwgcmVzLCB7XHJcbiAgICAgICAgcmVxdWlyZWRBdXRoOiBhdXRoLCBkb25lOiBmdW5jdGlvbihjdXJyZW50VXNlcklEKSB7XHJcbiAgICAgICAgICB2YXIgX2lkOiBzdHJpbmcgPSByZXEucGFyYW1zLl9pZDtcclxuICAgICAgICAgIHNxbC5jb25uZWN0KGRiKVxyXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbihjb25uZWN0aW9uKSB7XHJcbiAgICAgICAgICAgICAgbmV3IHNxbC5SZXF1ZXN0KGNvbm5lY3Rpb24pXHJcbiAgICAgICAgICAgICAgICAucXVlcnkoJ1NFTEVDVCAqIEZST00gTGVhcm5pbmdTdHlsZSBXSEVSRSB1c2VySUQgPSAnICsgX2lkICsgJycpXHJcbiAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbihsZWFybmluZ1N0bHllRm9ybSkge1xyXG4gICAgICAgICAgICAgICAgICByZXMuc2VuZChsZWFybmluZ1N0bHllRm9ybSk7XHJcbiAgICAgICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbihlcnIpIHtcclxuICAgICAgICAgICAgICAgICAgcmVzLnNlbmQoeyBcImVycm9yXCI6IFwiZXJyb3JcIiB9KTtcclxuICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJHZXQgY29uc2VudCBieSBpZCBcIiArIGVycik7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgY29uc29sZS5sb2coZSk7XHJcbiAgICAgIHJlcy5zZW5kKHsgXCJlcnJvclwiOiBcImVycm9yIGluIHlvdXIgcmVxdWVzdFwiIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgbGVhcm5pbmdTdHlsZUZvcm0ocmVxOiBleHByZXNzLlJlcXVlc3QsIHJlczogZXhwcmVzcy5SZXNwb25zZSk6IHZvaWQge1xyXG4gICAgdHJ5IHtcclxuICAgICAgbmV3IEF1dGhDb250cm9sbGVyKCkuYXV0aFVzZXIocmVxLCByZXMsIHtcclxuICAgICAgICByZXF1aXJlZEF1dGg6IGF1dGgsIGRvbmU6IGZ1bmN0aW9uKGN1cnJlbnRVc2VySUQpIHtcclxuICAgICAgICAgIHZhciBsZWFybmluZ1N0eWxlRm9ybSA9IHJlcS5ib2R5LmxlYXJuaW5nU3R5bGVGb3JtO1xyXG4gICAgICAgICAgdmFyIF9pZDogc3RyaW5nID0gcmVxLnBhcmFtcy5faWQ7XHJcbiAgICAgICAgICBzcWwuY29ubmVjdChkYilcclxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24oY29ubmVjdGlvbikge1xyXG4gICAgICAgICAgICAgIHZhciBsZWFybmluZ1N0eWxlUXVlcnkgPSBcIidcIiArIF9pZCArIFwiJywgJ1wiICtcclxuICAgICAgICAgICAgICAgIGxlYXJuaW5nU3R5bGVGb3JtLnNlZWluZyArIFwiJywgJ1wiICtcclxuICAgICAgICAgICAgICAgIGxlYXJuaW5nU3R5bGVGb3JtLmhlYXJpbmcgKyBcIicsICdcIiArXHJcbiAgICAgICAgICAgICAgICBsZWFybmluZ1N0eWxlRm9ybS5kb2luZyArIFwiJywgJ1wiICtcclxuICAgICAgICAgICAgICAgIGxlYXJuaW5nU3R5bGVGb3JtLmxlYXJuQnkgKyBcIidcIjtcclxuICAgICAgICAgICAgICBuZXcgc3FsLlJlcXVlc3QoY29ubmVjdGlvbilcclxuICAgICAgICAgICAgICAgIC5xdWVyeShcIklOU0VSVCBJTlRPIExlYXJuaW5nU3R5bGUgVkFMVUVTIChcIiArIGxlYXJuaW5nU3R5bGVRdWVyeSArIFwiKVwiKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgIG5ldyBzcWwuUmVxdWVzdCgpXHJcbiAgICAgICAgICAgICAgICAgICAgLnF1ZXJ5KFwiVVBEQVRFIENsaWVudHMgU0VUIGxlYXJuaW5nU3R5bGU9ICdmYWxzZScgV0hFUkUgdXNlcklEID0gJ1wiICsgX2lkICsgXCInXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICBuZXcgQWN0aXZpdHlTZXJ2aWNlKCkucmVwb3J0QWN0aXZpdHkoJ2NsaWVudCcsICdGb3JtIFN1Ym1pdHRlZCcsICdzdWNjZXNzJywgX2lkLCBjdXJyZW50VXNlcklELCAnTGVhcm5pbmcgc3R5bGUgc3VibWl0dGVkIGJ5IGNsaWVudC4nKTtcclxuICAgICAgICAgICAgICAgICAgICAgIHJlcy5zZW5kKHsgXCJzdWNjZXNzXCI6IFwic3VjY2Vzc1wiIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGVycikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgcmVzLnNlbmQoeyBcImVycm9yXCI6IFwiZXJyb3JcIiB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiVXBkYXRlIGNsaWVudCBcIiArIGVycik7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbihlcnIpIHtcclxuICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJTYXZlIGxlYXJuaW5nIHN0eWxlIGZvcm0gXCIgKyBlcnIpO1xyXG4gICAgICAgICAgICAgICAgICByZXMuc2VuZCh7IFwiZXJyb3JcIjogXCJlcnJvclwiIH0pO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKGUpO1xyXG4gICAgICByZXMuc2VuZCh7IFwiZXJyb3JcIjogXCJlcnJvciBpbiB5b3VyIHJlcXVlc3RcIiB9KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGdldEFsbEZvcm1zQnlJRChyZXE6IGV4cHJlc3MuUmVxdWVzdCwgcmVzOiBleHByZXNzLlJlc3BvbnNlKSB7XHJcbiAgICB0cnkge1xyXG4gICAgICBuZXcgQXV0aENvbnRyb2xsZXIoKS5hdXRoVXNlcihyZXEsIHJlcywge1xyXG4gICAgICAgIHJlcXVpcmVkQXV0aDogYXV0aCwgZG9uZTogZnVuY3Rpb24oY3VycmVudFVzZXJJRCkge1xyXG4gICAgICAgICAgdmFyIF9pZDogc3RyaW5nID0gcmVxLnBhcmFtcy5faWQ7XHJcbiAgICAgICAgICBzcWwuY29ubmVjdChkYilcclxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24oY29ubmVjdGlvbikge1xyXG4gICAgICAgICAgICAgIG5ldyBzcWwuUmVxdWVzdChjb25uZWN0aW9uKVxyXG4gICAgICAgICAgICAgICAgLnF1ZXJ5KCdTRUxFQ1QgKiBGUk9NIFN1aXRhYmlsaXR5Rm9ybSBXSEVSRSB1c2VySUQgPSAnICsgX2lkICsgJycpXHJcbiAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbihzdWl0YWJpbGl0eUZvcm0pIHtcclxuICAgICAgICAgICAgICAgICAgbmV3IHNxbC5SZXF1ZXN0KGNvbm5lY3Rpb24pXHJcbiAgICAgICAgICAgICAgICAgICAgLnF1ZXJ5KCdTRUxFQ1QgKiBGUk9NIENvbnNlbnQgV0hFUkUgdXNlcklEID0gJyArIF9pZCArICcnKVxyXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKGNvbnNlbnRGb3JtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICBuZXcgc3FsLlJlcXVlc3QoY29ubmVjdGlvbilcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnF1ZXJ5KCdTRUxFQ1QgKiBGUk9NIExlYXJuaW5nU3R5bGUgV0hFUkUgdXNlcklEID0gJyArIF9pZCArICcnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbihsZWFybmluZ1N0eWxlRm9ybSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBzcWwuUmVxdWVzdChjb25uZWN0aW9uKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnF1ZXJ5KCdTRUxFQ1QgKiBGUk9NIEFzc2Vzc21lbnRSZXN1bHRzIFdIRVJFIHVzZXJJRCA9ICcgKyBfaWQgKyAnJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKGFzc2Vzc21lbnRSZXN1bHRzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcy5zZW5kKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdWl0YWJpbGl0eUZvcm06IHN1aXRhYmlsaXR5Rm9ybSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zZW50Rm9ybTogY29uc2VudEZvcm0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGVhcm5pbmdTdHlsZUZvcm06IGxlYXJuaW5nU3R5bGVGb3JtLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFzc2Vzc21lbnRSZXN1bHRzOiBhc3Nlc3NtZW50UmVzdWx0c1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGVycikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXMuc2VuZCh7IFwiZXJyb3JcIjogXCJlcnJvclwiIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkdldCBhc3Nlc3NtZW50UmVzdWx0cyBcIiArIGVycik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzLnNlbmQoeyBcImVycm9yXCI6IFwiZXJyb3JcIiB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkdldCBsZWFybmluZ1N0eWxlRm9ybXMgXCIgKyBlcnIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbihlcnIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgIHJlcy5zZW5kKHsgXCJlcnJvclwiOiBcImVycm9yXCIgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkdldCBjb25zZW50Rm9ybXMgXCIgKyBlcnIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgIHJlcy5zZW5kKHsgXCJlcnJvclwiOiBcImVycm9yXCIgfSk7XHJcbiAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiR2V0IHN1aXRhYmlsaXR5Rm9ybXMgXCIgKyBlcnIpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKGUpO1xyXG4gICAgICByZXMuc2VuZCh7IFwiZXJyb3JcIjogXCJlcnJvciBpbiB5b3VyIHJlcXVlc3RcIiB9KTtcclxuICAgIH1cclxuICB9XHJcblxyXG59XHJcbmV4cG9ydCA9IENsaWVudEZvcm1zQ29udHJvbGxlcjtcclxuIl19
