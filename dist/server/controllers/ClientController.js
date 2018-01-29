"use strict";
var bcrypt = require("bcrypt");
var AuthController = require("../controllers/AuthController");
var MailService = require("../services/MailService");
var sql = require('mssql');
var auth = ["Admin", "Staff"];
var config = require('../config');
config = config.db;
var ClientController = /** @class */ (function () {
    function ClientController() {
    }
    ClientController.prototype.create = function (req, res) {
        try {
            new AuthController().authUser(req, res, {
                requiredAuth: auth, done: function () {
                    var randomstring = Math.random().toString(36).slice(-8);
                    randomstring = randomstring.charAt(0).toUpperCase() + randomstring.slice(1);
                    var salt = bcrypt.genSaltSync(10);
                    // Hash the password with the salt
                    var password = bcrypt.hashSync(randomstring, salt);
                    req.body.client.password = password;
                    var client = req.body.client;
                    client.username = client.firstName + client.lastName;
                    client.username = client.username.toLowerCase();
                    client.username = client.username.replace(/\s+/g, '');
                    var suitabilityForm = req.body.suitabilityForm;
                    sql.connect(config)
                        .then(function (connection) {
                        new sql.Request(connection)
                            .query("SELECT * FROM Users")
                            .then(function (users) {
                            var validated = true;
                            var error;
                            var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                            var emailValidation = re.test(client.email);
                            for (var _i = 0, users_1 = users; _i < users_1.length; _i++) {
                                var user = users_1[_i];
                                if (user.username === client.username) {
                                    validated = false;
                                    error = "username in use";
                                    break;
                                }
                                if (user.email === client.email) {
                                    validated = false;
                                    error = "email in use";
                                    break;
                                }
                            }
                            if (!emailValidation && validated) {
                                validated = false;
                                error = "incorrect email format";
                            }
                            if (validated) {
                                var active = false;
                                new sql.Request(connection)
                                    .query("INSERT INTO Users VALUES ('" + client.username + "','" + client.email + "','" + client.password + "','Client','" + active + "')")
                                    .then(function () {
                                    new sql.Request(connection)
                                        .query("SELECT userID FROM Users WHERE username = '" + client.username + "' AND password = '" + client.password + "'")
                                        .then(function (id) {
                                        if (client.okayToText == null) {
                                            client.okayToText = false;
                                            console.log();
                                        }
                                        else if (client.alternateNumber == null) {
                                            client.alternateNumber = false;
                                        }
                                        var clientQuery = "'" + id[0].userID + "', '" +
                                            client.firstName + "', '" +
                                            client.lastName + "', '" +
                                            client.inquiryDate + "', '" +
                                            client.birthday + "', '" +
                                            client.phone + "', '" +
                                            client.allowDetailedMessage + "', '" +
                                            client.okayToText + "', '" +
                                            client.alternateNumber + "', '" +
                                            client.allowDetailedMessageAlternate + "', '" +
                                            client.okayToTextAlternate + "', '" +
                                            true + "', '" +
                                            true + "', '" +
                                            true + "', '" +
                                            false + "', '" +
                                            false + "', '" +
                                            client.comments + "', '" +
                                            client.studentNumber + "'";
                                        try {
                                            // setup email data with unicode symbols
                                            var mailOptions = {
                                                from: '"Georgian Academic & Career Prep"',
                                                to: client.email,
                                                subject: 'Welcome, ' + client.firstName,
                                                text: '',
                                                html: 'Your username is <b>' + client.username + '</b> and your temporary password is: <b>' + randomstring + '</b><br /> Please login at http://georgianapp.azurewebsites.net and complete the required forms. <br /><br /> Thankyou' // html body
                                            };
                                            new MailService().sendMessage("Welcome Message", mailOptions);
                                        }
                                        catch (err) {
                                            console.log(err);
                                        }
                                        new sql.Request().query("INSERT INTO Clients VALUES (" + clientQuery + ")").then(function () {
                                            if (Object.keys(suitabilityForm).length != 0) {
                                                var suitabilityFormQuery = "'" + id[0].userID
                                                    + "', '" + suitabilityForm.transcript
                                                    + "', '" + suitabilityForm.courses
                                                    + "', '" + suitabilityForm.goal
                                                    + "', '" + suitabilityForm.transitionDate
                                                    + "', '" + suitabilityForm.governmentID
                                                    + "', '" + suitabilityForm.appropriateGoal
                                                    + "', '" + suitabilityForm.isValidAge
                                                    + "', '" + suitabilityForm.schoolRegistration
                                                    + "', '" + suitabilityForm.availableDuringClass
                                                    + "', '" + suitabilityForm.lastGrade
                                                    + "', '" + suitabilityForm.level
                                                    + "', '" + suitabilityForm.offerStartDate
                                                    + "', '" + suitabilityForm.meetsGoal
                                                    + "', '" + suitabilityForm.timeOutOfSchool
                                                    + "', '" + suitabilityForm.inProgramBefore
                                                    + "', '" + suitabilityForm.employment
                                                    + "', '" + suitabilityForm.incomeSource
                                                    + "', '" + suitabilityForm.ageRange
                                                    + "', '" + suitabilityForm.hoursPerWeek
                                                    + "', '" + suitabilityForm.workHistory
                                                    + "', '" + suitabilityForm.factorHealth
                                                    + "', '" + suitabilityForm.factorInstructions
                                                    + "', '" + suitabilityForm.factorCommunication
                                                    + "', '" + suitabilityForm.factorLanguage
                                                    + "', '" + suitabilityForm.factorComputer
                                                    + "', '" + suitabilityForm.factorHousing
                                                    + "', '" + suitabilityForm.factorTransportation
                                                    + "', '" + suitabilityForm.factorDaycare
                                                    + "', '" + suitabilityForm.factorInternet
                                                    + "', '" + suitabilityForm.factorPersonal
                                                    + "', '" + suitabilityForm.factorOther
                                                    + "', '" + suitabilityForm.summaryTransportation
                                                    + "', '" + suitabilityForm.summaryHousing
                                                    + "', '" + suitabilityForm.summaryChildcare
                                                    + "', '" + suitabilityForm.summaryHealth
                                                    + "', '" + suitabilityForm.summaryOther
                                                    + "', '" + suitabilityForm.dbTotalPoints
                                                    + "', '" + suitabilityForm.generalInfoComments + "'";
                                                new sql.Request(connection)
                                                    .query("INSERT INTO SuitabilityForm VALUES (" + suitabilityFormQuery + ")")
                                                    .then(function () {
                                                    console.log("Suitability inserted");
                                                    new sql.Request(connection)
                                                        .query("UPDATE Clients SET suitability= 'false' WHERE userID = '" + id[0].userID + "'")
                                                        .then(function () {
                                                        res.send({ "success": "success" });
                                                    }).catch(function (err) {
                                                        res.send({ "error": "error" });
                                                        console.log("Update client " + err);
                                                    });
                                                }).catch(function (err) {
                                                    res.send({ "error": "error" });
                                                    console.log("insert suitabilityForm " + err);
                                                });
                                            }
                                            else {
                                                res.send({ "success": "success" });
                                                console.log("Suitability not provided.");
                                            }
                                        }).catch(function (err) {
                                            res.send({ "error": "error" });
                                            console.log("insert client " + err);
                                            new sql.Request(connection)
                                                .query("DELETE FROM Users WHERE userID = '" + id[0].userID + "'")
                                                .then(function () {
                                                res.send({ "success": "success" });
                                                console.log();
                                            }).catch(function (err) {
                                                res.send({ "error": "error" });
                                                console.log("Delete user with id " + id[0].userID + ". " + err);
                                            });
                                        });
                                    }).catch(function (err) {
                                        res.send({ "error": "error selecting user from users" });
                                        console.log("get user " + err);
                                    });
                                }).catch(function (err) {
                                    res.send({ "error": "error inserting user" });
                                    console.log("insert user " + err);
                                });
                            }
                            else {
                                res.send({ "error": error });
                            }
                        }).catch(function (err) {
                            console.log(err);
                            res.send({ "error": "error selecting all users" });
                        });
                    }).catch(function (err) {
                        console.log(err);
                        res.send({ "error": "error" });
                    });
                }
            });
        }
        catch (e) {
            console.log(e);
            res.send({ "error": "error in your request" });
        }
    };
    ClientController.prototype.addSuitability = function (req, res) {
        try {
            new AuthController().authUser(req, res, {
                requiredAuth: auth, done: function () {
                    var _id = req.params._id;
                    var suitabilityForm = req.body;
                    sql.connect(config)
                        .then(function (connection) {
                        var suitabilityFormQuery = "'" + _id
                            + "', '" + suitabilityForm.transcript
                            + "', '" + suitabilityForm.courses
                            + "', '" + suitabilityForm.goal
                            + "', '" + suitabilityForm.transitionDate
                            + "', '" + suitabilityForm.governmentID
                            + "', '" + suitabilityForm.appropriateGoal
                            + "', '" + suitabilityForm.isValidAge
                            + "', '" + suitabilityForm.schoolRegistration
                            + "', '" + suitabilityForm.availableDuringClass
                            + "', '" + suitabilityForm.lastGrade
                            + "', '" + suitabilityForm.level
                            + "', '" + suitabilityForm.offerStartDate
                            + "', '" + suitabilityForm.meetsGoal
                            + "', '" + suitabilityForm.timeOutOfSchool
                            + "', '" + suitabilityForm.inProgramBefore
                            + "', '" + suitabilityForm.employment
                            + "', '" + suitabilityForm.incomeSource
                            + "', '" + suitabilityForm.ageRange
                            + "', '" + suitabilityForm.hoursPerWeek
                            + "', '" + suitabilityForm.workHistory
                            + "', '" + suitabilityForm.factorHealth
                            + "', '" + suitabilityForm.factorInstructions
                            + "', '" + suitabilityForm.factorCommunication
                            + "', '" + suitabilityForm.factorLanguage
                            + "', '" + suitabilityForm.factorComputer
                            + "', '" + suitabilityForm.factorHousing
                            + "', '" + suitabilityForm.factorTransportation
                            + "', '" + suitabilityForm.factorDaycare
                            + "', '" + suitabilityForm.factorInternet
                            + "', '" + suitabilityForm.factorPersonal
                            + "', '" + suitabilityForm.factorOther
                            + "', '" + suitabilityForm.summaryTransportation
                            + "', '" + suitabilityForm.summaryHousing
                            + "', '" + suitabilityForm.summaryChildcare
                            + "', '" + suitabilityForm.summaryHealth
                            + "', '" + suitabilityForm.summaryOther
                            + "', '" + suitabilityForm.dbTotalPoints
                            + "', '" + suitabilityForm.generalInfoComments + "'";
                        new sql.Request(connection)
                            .query("INSERT INTO SuitabilityForm VALUES (" + suitabilityFormQuery + ")")
                            .then(function () {
                            new sql.Request(connection)
                                .query("UPDATE Clients SET suitability = 'false' WHERE userID = " + _id + "")
                                .then(function () {
                                res.send({ "success": "success" });
                            }).catch();
                        }).catch();
                    }).catch(function (err) {
                        console.log(err);
                        res.send({ "error": "error" });
                    });
                }
            });
        }
        catch (e) {
            console.log(e);
            res.send({ "error": "error in your request" });
        }
    };
    ClientController.prototype.update = function (req, res) {
        try {
            new AuthController().authUser(req, res, {
                requiredAuth: auth, done: function () {
                    var client = req.body;
                    var _id = req.params._id;
                    sql.connect(config)
                        .then(function (connection) {
                        new sql.Request(connection)
                            .query("UPDATE Clients SET firstName='" + client.firstName + "', lastName='" + client.lastName + "', birthdate='" + client.birthday + "', phone='" + client.phone + "' WHERE clientID = '" + _id + "'")
                            .then(function (recordset) {
                            res.send({ "success": "success" });
                        }).catch(function (err) {
                            res.send({ "error": "error" });
                            console.log("Update client " + err);
                        });
                    }).catch(function (err) {
                        console.log(err);
                        res.send({ "error": "error" });
                    });
                }
            });
        }
        catch (e) {
            console.log(e);
            res.send({ "error": "error in your request" });
        }
    };
    ClientController.prototype.updateBannerCamBool = function (req, res) {
        try {
            new AuthController().authUser(req, res, {
                requiredAuth: auth, done: function () {
                    var client = req.body;
                    sql.connect(config)
                        .then(function (connection) {
                        new sql.Request(connection)
                            .query("UPDATE Clients SET banner='" + client.banner + "', cam='" + client.cam + "' WHERE clientID = '" + client.clientID + "'")
                            .then(function (recordset) {
                            res.send({ "success": "success" });
                        }).catch(function (err) {
                            res.send({ "error": "error" });
                            console.log("Update banner and cam booleans " + err);
                        });
                    }).catch(function (err) {
                        console.log(err);
                        res.send({ "error": "error" });
                    });
                }
            });
        }
        catch (e) {
            console.log(e);
            res.send({ "error": "error in your request" });
        }
    };
    ClientController.prototype.updateSuitability = function (req, res) {
        try {
            new AuthController().authUser(req, res, {
                requiredAuth: auth, done: function () {
                    var suitability = req.body;
                    sql.connect(config)
                        .then(function (connection) {
                        var query = "UPDATE SuitabilityForm SET transcript='" + suitability.transcript
                            + "', courses='" + suitability.courses
                            + "', goal='" + suitability.goal
                            + "', transitionDate='" + suitability.transitionDate
                            + "', governmentID='" + suitability.governmentID
                            + "', appropriateGoal='" + suitability.appropriateGoal
                            + "', isValidAge='" + suitability.isValidAge
                            + "', schoolRegistration='" + suitability.schoolRegistration
                            + "', availableDuringClass='" + suitability.availableDuringClass
                            + "', lastGrade='" + suitability.lastGrade
                            + "', level='" + suitability.level
                            + "', offerStartDate='" + suitability.offerStartDate
                            + "', meetsGoal='" + suitability.meetsGoal
                            + "', timeOutOfSchool='" + suitability.timeOutOfSchool
                            + "', inProgramBefore='" + suitability.inProgramBefore
                            + "', employment='" + suitability.employment
                            + "', incomeSource='" + suitability.incomeSource
                            + "', ageRange='" + suitability.ageRange
                            + "', hoursPerWeek='" + suitability.hoursPerWeek
                            + "', workHistory='" + suitability.workHistory
                            + "', factorHealth='" + suitability.factorHealth
                            + "', factorInstructions='" + suitability.factorInstructions
                            + "', factorCommunication='" + suitability.factorCommunication
                            + "', factorLanguage='" + suitability.factorLanguage
                            + "', factorComputer='" + suitability.factorComputer
                            + "', factorHousing='" + suitability.factorHousing
                            + "', factorTransportation='" + suitability.factorTransportation
                            + "', factorDaycare='" + suitability.factorDaycare
                            + "', factorInternet='" + suitability.factorInternet
                            + "', factorPersonal='" + suitability.factorPersonal
                            + "', factorOther='" + suitability.factorOther
                            + "', summaryTransportation='" + suitability.summaryTransportation
                            + "', summaryChildcare='" + suitability.summaryChildcare
                            + "', summaryHealth='" + suitability.summaryHealth
                            + "', summaryOther='" + suitability.summaryOther
                            + "', points='" + suitability.points
                            + "' WHERE suitabilityID = '" + suitability.suitabilityID + "'";
                        new sql.Request(connection)
                            .query(query)
                            .then(function (recordset) {
                            res.send({ "success": "success" });
                        }).catch(function (err) {
                            res.send({ "error": "error" });
                            console.log("Update suitability " + err);
                        });
                    }).catch(function (err) {
                        console.log(err);
                        res.send({ "error": "error" });
                    });
                }
            });
        }
        catch (e) {
            console.log(e);
            res.send({ "error": "error in your request" });
        }
    };
    ClientController.prototype.delete = function (req, res) {
        try {
            new AuthController().authUser(req, res, {
                requiredAuth: auth, done: function () {
                    var _id = req.params._id;
                    sql.connect(config)
                        .then(function (connection) {
                        new sql.Request(connection)
                            .query("DELETE FROM Clients WHERE userID = '" + _id + "'")
                            .then(function () {
                            new sql.Request(connection)
                                .query("DELETE FROM Users WHERE userID = '" + _id + "'")
                                .then(function () {
                                res.send({ "success": "success" });
                            }).catch(function (err) {
                                res.send({ "error": "error" });
                                console.log("Delete user with id " + _id + ". " + err);
                            });
                        }).catch(function (err) {
                            res.send({ "error": "error" });
                            console.log("Delete client with id " + _id + ". " + err);
                        });
                    }).catch(function (err) {
                        console.log(err);
                        res.send({ "error": "error" });
                    });
                }
            });
        }
        catch (e) {
            console.log(e);
            res.send({ "error": "error in your request" });
        }
    };
    ClientController.prototype.removeFromTable = function (req, res) {
        try {
            new AuthController().authUser(req, res, {
                requiredAuth: auth, done: function () {
                    var _id = req.params._id;
                    sql.connect(config)
                        .then(function (connection) {
                        new sql.Request(connection)
                            .query("DELETE FROM Clients WHERE userID = '" + _id + "'")
                            .then(function () {
                            new sql.Request(connection)
                                .query("UPDATE Users SET userType= 'Student' WHERE userID = '" + _id + "'")
                                .then(function () {
                                res.send({ "success": "success" });
                            }).catch(function (err) {
                                res.send({ "error": "error" });
                                console.log("Update user userType " + err);
                            });
                        }).catch(function (err) {
                            res.send({ "error": "error" });
                            console.log("Delete form client table with id " + _id + ". " + err);
                        });
                    }).catch(function (err) {
                        console.log(err);
                        res.send({ "error": "error" });
                    });
                }
            });
        }
        catch (e) {
            console.log(e);
            res.send({ "error": "error in your request" });
        }
    };
    ClientController.prototype.retrieve = function (req, res) {
        try {
            new AuthController().authUser(req, res, {
                requiredAuth: auth, done: function () {
                    sql.connect(config)
                        .then(function (connection) {
                        new sql.Request(connection)
                            .query('SELECT Clients.*, Users.email, Users.active from Clients Left JOIN Users ON Clients.userID = Users.userID')
                            .then(function (clients) {
                            new sql.Request(connection)
                                .query('SELECT * FROM SuitabilityForm')
                                .then(function (suitabilityForms) {
                                new sql.Request(connection)
                                    .query('SELECT * FROM Consent')
                                    .then(function (consentForms) {
                                    new sql.Request(connection)
                                        .query('SELECT * FROM LearningStyle')
                                        .then(function (learningStyleForms) {
                                        res.send({
                                            clients: clients,
                                            suitabilityForms: suitabilityForms,
                                            consentForms: consentForms,
                                            learningStyleForms: learningStyleForms
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
                        }).catch(function (err) {
                            res.send({ "error": "error" });
                            console.log("Get clients " + err);
                        });
                    }).catch(function (err) {
                        console.log(err);
                        res.send({ "error": "error" });
                    });
                }
            });
        }
        catch (e) {
            console.log(e);
            res.send({ "error": "error in your request" });
        }
    };
    ClientController.prototype.findById = function (req, res) {
        try {
            new AuthController().authUser(req, res, {
                requiredAuth: ["Admin", "Staff", "Client"], done: function () {
                    var _id = req.params._id;
                    sql.connect(config)
                        .then(function (connection) {
                        new sql.Request(connection)
                            .query("SELECT * FROM Clients WHERE userID = '" + _id + "'")
                            .then(function (client) {
                            res.send({ client: client });
                        }).catch(function (err) {
                            console.log("Get client by id " + err);
                            res.send({ "error": "error" });
                        });
                    }).catch(function (err) {
                        console.log(err);
                        res.send({ "error": "error" });
                    });
                }
            });
        }
        catch (e) {
            console.log(e);
            res.send({ "error": "error in your request" });
        }
    };
    return ClientController;
}());
module.exports = ClientController;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NlcnZlci9zcmMvY29udHJvbGxlcnMvQ2xpZW50Q29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBRUEsK0JBQWtDO0FBQ2xDLDhEQUFpRTtBQUNqRSxJQUFNLFdBQVcsR0FBRyxPQUFPLENBQUMseUJBQXlCLENBQUMsQ0FBQztBQUN2RCxJQUFJLEdBQUcsR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDM0IsSUFBSSxJQUFJLEdBQUcsQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUM7QUFFOUIsSUFBSSxNQUFNLEdBQUcsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDO0FBQ2xDLE1BQU0sR0FBRyxNQUFNLENBQUMsRUFBRSxDQUFDO0FBRW5CO0lBQUE7SUE4Z0JBLENBQUM7SUE1Z0JHLGlDQUFNLEdBQU4sVUFBTyxHQUFvQixFQUFFLEdBQXFCO1FBQzlDLElBQUksQ0FBQztZQUNELElBQUksY0FBYyxFQUFFLENBQUMsUUFBUSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUU7Z0JBQ3BDLFlBQVksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFO29CQUN0QixJQUFJLFlBQVksR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUN4RCxZQUFZLEdBQUcsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLEVBQUUsR0FBRyxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUM1RSxJQUFJLElBQUksR0FBRyxNQUFNLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxDQUFDO29CQUNsQyxrQ0FBa0M7b0JBQ2xDLElBQUksUUFBUSxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxDQUFDO29CQUNuRCxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0s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QztZQUNQLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDZixHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsT0FBTyxFQUFFLHVCQUF1QixFQUFFLENBQUMsQ0FBQztRQUNuRCxDQUFDO0lBQ0wsQ0FBQztJQUVMLHVCQUFDO0FBQUQsQ0E5Z0JBLEFBOGdCQyxJQUFBO0FBQ0QsaUJBQVMsZ0JBQWdCLENBQUMiLCJmaWxlIjoiY29udHJvbGxlcnMvQ2xpZW50Q29udHJvbGxlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBleHByZXNzID0gcmVxdWlyZShcImV4cHJlc3NcIik7XHJcbmltcG9ydCBqd3QgPSByZXF1aXJlKCdqc29ud2VidG9rZW4nKTtcclxuaW1wb3J0IGJjcnlwdCA9IHJlcXVpcmUoJ2JjcnlwdCcpO1xyXG5pbXBvcnQgQXV0aENvbnRyb2xsZXIgPSByZXF1aXJlKFwiLi4vY29udHJvbGxlcnMvQXV0aENvbnRyb2xsZXJcIik7XHJcbmNvbnN0IE1haWxTZXJ2aWNlID0gcmVxdWlyZShcIi4uL3NlcnZpY2VzL01haWxTZXJ2aWNlXCIpO1xyXG52YXIgc3FsID0gcmVxdWlyZSgnbXNzcWwnKTtcclxudmFyIGF1dGggPSBbXCJBZG1pblwiLCBcIlN0YWZmXCJdO1xyXG5cclxudmFyIGNvbmZpZyA9IHJlcXVpcmUoJy4uL2NvbmZpZycpO1xyXG5jb25maWcgPSBjb25maWcuZGI7XHJcblxyXG5jbGFzcyBDbGllbnRDb250cm9sbGVyIHtcclxuXHJcbiAgICBjcmVhdGUocmVxOiBleHByZXNzLlJlcXVlc3QsIHJlczogZXhwcmVzcy5SZXNwb25zZSk6IHZvaWQge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIG5ldyBBdXRoQ29udHJvbGxlcigpLmF1dGhVc2VyKHJlcSwgcmVzLCB7XHJcbiAgICAgICAgICAgICAgICByZXF1aXJlZEF1dGg6IGF1dGgsIGRvbmU6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciByYW5kb21zdHJpbmcgPSBNYXRoLnJhbmRvbSgpLnRvU3RyaW5nKDM2KS5zbGljZSgtOCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmFuZG9tc3RyaW5nID0gcmFuZG9tc3RyaW5nLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgcmFuZG9tc3RyaW5nLnNsaWNlKDEpO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBzYWx0ID0gYmNyeXB0LmdlblNhbHRTeW5jKDEwKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyBIYXNoIHRoZSBwYXNzd29yZCB3aXRoIHRoZSBzYWx0XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHBhc3N3b3JkID0gYmNyeXB0Lmhhc2hTeW5jKHJhbmRvbXN0cmluZywgc2FsdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVxLmJvZHkuY2xpZW50LnBhc3N3b3JkID0gcGFzc3dvcmQ7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGNsaWVudCA9IHJlcS5ib2R5LmNsaWVudDtcclxuICAgICAgICAgICAgICAgICAgICBjbGllbnQudXNlcm5hbWUgPSBjbGllbnQuZmlyc3ROYW1lICsgY2xpZW50Lmxhc3ROYW1lO1xyXG4gICAgICAgICAgICAgICAgICAgIGNsaWVudC51c2VybmFtZSA9IGNsaWVudC51c2VybmFtZS50b0xvd2VyQ2FzZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNsaWVudC51c2VybmFtZSA9IGNsaWVudC51c2VybmFtZS5yZXBsYWNlKC9cXHMrL2csICcnKTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgc3VpdGFiaWxpdHlGb3JtID0gcmVxLmJvZHkuc3VpdGFiaWxpdHlGb3JtO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBzcWwuY29ubmVjdChjb25maWcpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKGNvbm5lY3Rpb24pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBzcWwuUmVxdWVzdChjb25uZWN0aW9uKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5xdWVyeShcIlNFTEVDVCAqIEZST00gVXNlcnNcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbih1c2Vycykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgdmFsaWRhdGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGVycm9yO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgcmUgPSAvXigoW148PigpW1xcXVxcXFwuLDs6XFxzQFxcXCJdKyhcXC5bXjw+KClbXFxdXFxcXC4sOzpcXHNAXFxcIl0rKSopfChcXFwiLitcXFwiKSlAKChcXFtbMC05XXsxLDN9XFwuWzAtOV17MSwzfVxcLlswLTldezEsM31cXC5bMC05XXsxLDN9XFxdKXwoKFthLXpBLVpcXC0wLTldK1xcLikrW2EtekEtWl17Mix9KSkkLztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGVtYWlsVmFsaWRhdGlvbiA9IHJlLnRlc3QoY2xpZW50LmVtYWlsKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgdXNlciBvZiB1c2Vycykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHVzZXIudXNlcm5hbWUgPT09IGNsaWVudC51c2VybmFtZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbGlkYXRlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yID0gXCJ1c2VybmFtZSBpbiB1c2VcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh1c2VyLmVtYWlsID09PSBjbGllbnQuZW1haWwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWxpZGF0ZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlcnJvciA9IFwiZW1haWwgaW4gdXNlXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFlbWFpbFZhbGlkYXRpb24gJiYgdmFsaWRhdGVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWxpZGF0ZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yID0gXCJpbmNvcnJlY3QgZW1haWwgZm9ybWF0XCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHZhbGlkYXRlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3IHNxbC5SZXF1ZXN0KGNvbm5lY3Rpb24pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnF1ZXJ5KFwiSU5TRVJUIElOVE8gVXNlcnMgVkFMVUVTICgnXCIgKyBjbGllbnQudXNlcm5hbWUgKyBcIicsJ1wiICsgY2xpZW50LmVtYWlsICsgXCInLCdcIiArIGNsaWVudC5wYXNzd29yZCArIFwiJywnQ2xpZW50JywnXCIgKyBhY3RpdmUgKyBcIicpXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBzcWwuUmVxdWVzdChjb25uZWN0aW9uKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnF1ZXJ5KFwiU0VMRUNUIHVzZXJJRCBGUk9NIFVzZXJzIFdIRVJFIHVzZXJuYW1lID0gJ1wiICsgY2xpZW50LnVzZXJuYW1lICsgXCInIEFORCBwYXNzd29yZCA9ICdcIiArIGNsaWVudC5wYXNzd29yZCArIFwiJ1wiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24oaWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2xpZW50Lm9rYXlUb1RleHQgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xpZW50Lm9rYXlUb1RleHQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChjbGllbnQuYWx0ZXJuYXRlTnVtYmVyID09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsaWVudC5hbHRlcm5hdGVOdW1iZXIgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGNsaWVudFF1ZXJ5ID0gXCInXCIgKyBpZFswXS51c2VySUQgKyBcIicsICdcIiArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsaWVudC5maXJzdE5hbWUgKyBcIicsICdcIiArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsaWVudC5sYXN0TmFtZSArIFwiJywgJ1wiICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xpZW50LmlucXVpcnlEYXRlICsgXCInLCAnXCIgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGllbnQuYmlydGhkYXkgKyBcIicsICdcIiArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsaWVudC5waG9uZSArIFwiJywgJ1wiICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xpZW50LmFsbG93RGV0YWlsZWRNZXNzYWdlICsgXCInLCAnXCIgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGllbnQub2theVRvVGV4dCArIFwiJywgJ1wiICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xpZW50LmFsdGVybmF0ZU51bWJlciArIFwiJywgJ1wiICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xpZW50LmFsbG93RGV0YWlsZWRNZXNzYWdlQWx0ZXJuYXRlICsgXCInLCAnXCIgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGllbnQub2theVRvVGV4dEFsdGVybmF0ZSArIFwiJywgJ1wiICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJ1ZSArIFwiJywgJ1wiICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJ1ZSArIFwiJywgJ1wiICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJ1ZSArIFwiJywgJ1wiICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmFsc2UgKyBcIicsICdcIiArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZhbHNlICsgXCInLCAnXCIgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGllbnQuY29tbWVudHMgKyBcIicsICdcIiArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsaWVudC5zdHVkZW50TnVtYmVyICsgXCInXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gc2V0dXAgZW1haWwgZGF0YSB3aXRoIHVuaWNvZGUgc3ltYm9sc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgbWFpbE9wdGlvbnMgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZnJvbTogJ1wiR2VvcmdpYW4gQWNhZGVtaWMgJiBDYXJlZXIgUHJlcFwiJywgLy8gc2VuZGVyIGFkZHJlc3NcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0bzogY2xpZW50LmVtYWlsLCAvLyBsaXN0IG9mIHJlY2VpdmVyc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1YmplY3Q6ICdXZWxjb21lLCAnICsgY2xpZW50LmZpcnN0TmFtZSwgLy8gU3ViamVjdCBsaW5lXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dDogJycsIC8vIHBsYWluIHRleHQgYm9keVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGh0bWw6ICdZb3VyIHVzZXJuYW1lIGlzIDxiPicgKyBjbGllbnQudXNlcm5hbWUgKyAnPC9iPiBhbmQgeW91ciB0ZW1wb3JhcnkgcGFzc3dvcmQgaXM6IDxiPicgKyByYW5kb21zdHJpbmcgKyAnPC9iPjxiciAvPiBQbGVhc2UgbG9naW4gYXQgaHR0cDovL2dlb3JnaWFuYXBwLmF6dXJld2Vic2l0ZXMubmV0IGFuZCBjb21wbGV0ZSB0aGUgcmVxdWlyZWQgZm9ybXMuIDxiciAvPjxiciAvPiBUaGFua3lvdScgLy8gaHRtbCBib2R5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXcgTWFpbFNlcnZpY2UoKS5zZW5kTWVzc2FnZShcIldlbGNvbWUgTWVzc2FnZVwiLCBtYWlsT3B0aW9ucyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBzcWwuUmVxdWVzdCgpLnF1ZXJ5KFwiSU5TRVJUIElOVE8gQ2xpZW50cyBWQUxVRVMgKFwiICsgY2xpZW50UXVlcnkgKyBcIilcIikudGhlbihmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKE9iamVjdC5rZXlzKHN1aXRhYmlsaXR5Rm9ybSkubGVuZ3RoICE9IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzdWl0YWJpbGl0eUZvcm1RdWVyeSA9IFwiJ1wiICsgaWRbMF0udXNlcklEXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKyBcIicsICdcIiArIHN1aXRhYmlsaXR5Rm9ybS50cmFuc2NyaXB0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKyBcIicsICdcIiArIHN1aXRhYmlsaXR5Rm9ybS5jb3Vyc2VzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKyBcIicsICdcIiArIHN1aXRhYmlsaXR5Rm9ybS5nb2FsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKyBcIicsICdcIiArIHN1aXRhYmlsaXR5Rm9ybS50cmFuc2l0aW9uRGF0ZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICsgXCInLCAnXCIgKyBzdWl0YWJpbGl0eUZvcm0uZ292ZXJubWVudElEXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKyBcIicsICdcIiArIHN1aXRhYmlsaXR5Rm9ybS5hcHByb3ByaWF0ZUdvYWxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICArIFwiJywgJ1wiICsgc3VpdGFiaWxpdHlGb3JtLmlzVmFsaWRBZ2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICArIFwiJywgJ1wiICsgc3VpdGFiaWxpdHlGb3JtLnNjaG9vbFJlZ2lzdHJhdGlvblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICsgXCInLCAnXCIgKyBzdWl0YWJpbGl0eUZvcm0uYXZhaWxhYmxlRHVyaW5nQ2xhc3NcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICArIFwiJywgJ1wiICsgc3VpdGFiaWxpdHlGb3JtLmxhc3RHcmFkZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICsgXCInLCAnXCIgKyBzdWl0YWJpbGl0eUZvcm0ubGV2ZWxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICArIFwiJywgJ1wiICsgc3VpdGFiaWxpdHlGb3JtLm9mZmVyU3RhcnREYXRlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKyBcIicsICdcIiArIHN1aXRhYmlsaXR5Rm9ybS5tZWV0c0dvYWxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICArIFwiJywgJ1wiICsgc3VpdGFiaWxpdHlGb3JtLnRpbWVPdXRPZlNjaG9vbFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICsgXCInLCAnXCIgKyBzdWl0YWJpbGl0eUZvcm0uaW5Qcm9ncmFtQmVmb3JlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKyBcIicsICdcIiArIHN1aXRhYmlsaXR5Rm9ybS5lbXBsb3ltZW50XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKyBcIicsICdcIiArIHN1aXRhYmlsaXR5Rm9ybS5pbmNvbWVTb3VyY2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICArIFwiJywgJ1wiICsgc3VpdGFiaWxpdHlGb3JtLmFnZVJhbmdlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKyBcIicsICdcIiArIHN1aXRhYmlsaXR5Rm9ybS5ob3Vyc1BlcldlZWtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICArIFwiJywgJ1wiICsgc3VpdGFiaWxpdHlGb3JtLndvcmtIaXN0b3J5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKyBcIicsICdcIiArIHN1aXRhYmlsaXR5Rm9ybS5mYWN0b3JIZWFsdGhcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICArIFwiJywgJ1wiICsgc3VpdGFiaWxpdHlGb3JtLmZhY3Rvckluc3RydWN0aW9uc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICsgXCInLCAnXCIgKyBzdWl0YWJpbGl0eUZvcm0uZmFjdG9yQ29tbXVuaWNhdGlvblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICsgXCInLCAnXCIgKyBzdWl0YWJpbGl0eUZvcm0uZmFjdG9yTGFuZ3VhZ2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICArIFwiJywgJ1wiICsgc3VpdGFiaWxpdHlGb3JtLmZhY3RvckNvbXB1dGVyXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKyBcIicsICdcIiArIHN1aXRhYmlsaXR5Rm9ybS5mYWN0b3JIb3VzaW5nXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKyBcIicsICdcIiArIHN1aXRhYmlsaXR5Rm9ybS5mYWN0b3JUcmFuc3BvcnRhdGlvblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICsgXCInLCAnXCIgKyBzdWl0YWJpbGl0eUZvcm0uZmFjdG9yRGF5Y2FyZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICsgXCInLCAnXCIgKyBzdWl0YWJpbGl0eUZvcm0uZmFjdG9ySW50ZXJuZXRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICArIFwiJywgJ1wiICsgc3VpdGFiaWxpdHlGb3JtLmZhY3RvclBlcnNvbmFsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKyBcIicsICdcIiArIHN1aXRhYmlsaXR5Rm9ybS5mYWN0b3JPdGhlclxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICsgXCInLCAnXCIgKyBzdWl0YWJpbGl0eUZvcm0uc3VtbWFyeVRyYW5zcG9ydGF0aW9uXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKyBcIicsICdcIiArIHN1aXRhYmlsaXR5Rm9ybS5zdW1tYXJ5SG91c2luZ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICsgXCInLCAnXCIgKyBzdWl0YWJpbGl0eUZvcm0uc3VtbWFyeUNoaWxkY2FyZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICsgXCInLCAnXCIgKyBzdWl0YWJpbGl0eUZvcm0uc3VtbWFyeUhlYWx0aFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICsgXCInLCAnXCIgKyBzdWl0YWJpbGl0eUZvcm0uc3VtbWFyeU90aGVyXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKyBcIicsICdcIiArIHN1aXRhYmlsaXR5Rm9ybS5kYlRvdGFsUG9pbnRzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKyBcIicsICdcIiArIHN1aXRhYmlsaXR5Rm9ybS5nZW5lcmFsSW5mb0NvbW1lbnRzICsgXCInXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXcgc3FsLlJlcXVlc3QoY29ubmVjdGlvbilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucXVlcnkoXCJJTlNFUlQgSU5UTyBTdWl0YWJpbGl0eUZvcm0gVkFMVUVTIChcIiArIHN1aXRhYmlsaXR5Rm9ybVF1ZXJ5ICsgXCIpXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiU3VpdGFiaWxpdHkgaW5zZXJ0ZWRcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBzcWwuUmVxdWVzdChjb25uZWN0aW9uKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnF1ZXJ5KFwiVVBEQVRFIENsaWVudHMgU0VUIHN1aXRhYmlsaXR5PSAnZmFsc2UnIFdIRVJFIHVzZXJJRCA9ICdcIiArIGlkWzBdLnVzZXJJRCArIFwiJ1wiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzLnNlbmQoeyBcInN1Y2Nlc3NcIjogXCJzdWNjZXNzXCIgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbihlcnIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXMuc2VuZCh7IFwiZXJyb3JcIjogXCJlcnJvclwiIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiVXBkYXRlIGNsaWVudCBcIiArIGVycik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbihlcnIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzLnNlbmQoeyBcImVycm9yXCI6IFwiZXJyb3JcIiB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJpbnNlcnQgc3VpdGFiaWxpdHlGb3JtIFwiICsgZXJyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcy5zZW5kKHsgXCJzdWNjZXNzXCI6IFwic3VjY2Vzc1wiIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJTdWl0YWJpbGl0eSBub3QgcHJvdmlkZWQuXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcy5zZW5kKHsgXCJlcnJvclwiOiBcImVycm9yXCIgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiaW5zZXJ0IGNsaWVudCBcIiArIGVycik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBzcWwuUmVxdWVzdChjb25uZWN0aW9uKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnF1ZXJ5KFwiREVMRVRFIEZST00gVXNlcnMgV0hFUkUgdXNlcklEID0gJ1wiICsgaWRbMF0udXNlcklEICsgXCInXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXMuc2VuZCh7IFwic3VjY2Vzc1wiOiBcInN1Y2Nlc3NcIiB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbihlcnIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXMuc2VuZCh7IFwiZXJyb3JcIjogXCJlcnJvclwiIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRGVsZXRlIHVzZXIgd2l0aCBpZCBcIiArIGlkWzBdLnVzZXJJRCArIFwiLiBcIiArIGVycik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGVycikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcy5zZW5kKHsgXCJlcnJvclwiOiBcImVycm9yIHNlbGVjdGluZyB1c2VyIGZyb20gdXNlcnNcIiB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImdldCB1c2VyIFwiICsgZXJyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGVycikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXMuc2VuZCh7IFwiZXJyb3JcIjogXCJlcnJvciBpbnNlcnRpbmcgdXNlclwiIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImluc2VydCB1c2VyIFwiICsgZXJyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcy5zZW5kKHsgXCJlcnJvclwiOiBlcnJvciB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGVycikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXMuc2VuZCh7IFwiZXJyb3JcIjogXCJlcnJvciBzZWxlY3RpbmcgYWxsIHVzZXJzXCIgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGVycikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcy5zZW5kKHsgXCJlcnJvclwiOiBcImVycm9yXCIgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coZSk7XHJcbiAgICAgICAgICAgIHJlcy5zZW5kKHsgXCJlcnJvclwiOiBcImVycm9yIGluIHlvdXIgcmVxdWVzdFwiIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBhZGRTdWl0YWJpbGl0eShyZXE6IGV4cHJlc3MuUmVxdWVzdCwgcmVzOiBleHByZXNzLlJlc3BvbnNlKTogdm9pZCB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgbmV3IEF1dGhDb250cm9sbGVyKCkuYXV0aFVzZXIocmVxLCByZXMsIHtcclxuICAgICAgICAgICAgICAgIHJlcXVpcmVkQXV0aDogYXV0aCwgZG9uZTogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIF9pZDogc3RyaW5nID0gcmVxLnBhcmFtcy5faWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHN1aXRhYmlsaXR5Rm9ybSA9IHJlcS5ib2R5O1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBzcWwuY29ubmVjdChjb25maWcpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKGNvbm5lY3Rpb24pIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHN1aXRhYmlsaXR5Rm9ybVF1ZXJ5ID0gXCInXCIgKyBfaWRcclxuICAgICAgICAgICAgICAgICAgICAgICAgKyBcIicsICdcIiArIHN1aXRhYmlsaXR5Rm9ybS50cmFuc2NyaXB0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICsgXCInLCAnXCIgKyBzdWl0YWJpbGl0eUZvcm0uY291cnNlc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICArIFwiJywgJ1wiICsgc3VpdGFiaWxpdHlGb3JtLmdvYWxcclxuICAgICAgICAgICAgICAgICAgICAgICAgKyBcIicsICdcIiArIHN1aXRhYmlsaXR5Rm9ybS50cmFuc2l0aW9uRGF0ZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICArIFwiJywgJ1wiICsgc3VpdGFiaWxpdHlGb3JtLmdvdmVybm1lbnRJRFxyXG4gICAgICAgICAgICAgICAgICAgICAgICArIFwiJywgJ1wiICsgc3VpdGFiaWxpdHlGb3JtLmFwcHJvcHJpYXRlR29hbFxyXG4gICAgICAgICAgICAgICAgICAgICAgICArIFwiJywgJ1wiICsgc3VpdGFiaWxpdHlGb3JtLmlzVmFsaWRBZ2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgKyBcIicsICdcIiArIHN1aXRhYmlsaXR5Rm9ybS5zY2hvb2xSZWdpc3RyYXRpb25cclxuICAgICAgICAgICAgICAgICAgICAgICAgKyBcIicsICdcIiArIHN1aXRhYmlsaXR5Rm9ybS5hdmFpbGFibGVEdXJpbmdDbGFzc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICArIFwiJywgJ1wiICsgc3VpdGFiaWxpdHlGb3JtLmxhc3RHcmFkZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICArIFwiJywgJ1wiICsgc3VpdGFiaWxpdHlGb3JtLmxldmVsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICsgXCInLCAnXCIgKyBzdWl0YWJpbGl0eUZvcm0ub2ZmZXJTdGFydERhdGVcclxuICAgICAgICAgICAgICAgICAgICAgICAgKyBcIicsICdcIiArIHN1aXRhYmlsaXR5Rm9ybS5tZWV0c0dvYWxcclxuICAgICAgICAgICAgICAgICAgICAgICAgKyBcIicsICdcIiArIHN1aXRhYmlsaXR5Rm9ybS50aW1lT3V0T2ZTY2hvb2xcclxuICAgICAgICAgICAgICAgICAgICAgICAgKyBcIicsICdcIiArIHN1aXRhYmlsaXR5Rm9ybS5pblByb2dyYW1CZWZvcmVcclxuICAgICAgICAgICAgICAgICAgICAgICAgKyBcIicsICdcIiArIHN1aXRhYmlsaXR5Rm9ybS5lbXBsb3ltZW50XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICsgXCInLCAnXCIgKyBzdWl0YWJpbGl0eUZvcm0uaW5jb21lU291cmNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICsgXCInLCAnXCIgKyBzdWl0YWJpbGl0eUZvcm0uYWdlUmFuZ2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgKyBcIicsICdcIiArIHN1aXRhYmlsaXR5Rm9ybS5ob3Vyc1BlcldlZWtcclxuICAgICAgICAgICAgICAgICAgICAgICAgKyBcIicsICdcIiArIHN1aXRhYmlsaXR5Rm9ybS53b3JrSGlzdG9yeVxyXG4gICAgICAgICAgICAgICAgICAgICAgICArIFwiJywgJ1wiICsgc3VpdGFiaWxpdHlGb3JtLmZhY3RvckhlYWx0aFxyXG4gICAgICAgICAgICAgICAgICAgICAgICArIFwiJywgJ1wiICsgc3VpdGFiaWxpdHlGb3JtLmZhY3Rvckluc3RydWN0aW9uc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICArIFwiJywgJ1wiICsgc3VpdGFiaWxpdHlGb3JtLmZhY3RvckNvbW11bmljYXRpb25cclxuICAgICAgICAgICAgICAgICAgICAgICAgKyBcIicsICdcIiArIHN1aXRhYmlsaXR5Rm9ybS5mYWN0b3JMYW5ndWFnZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICArIFwiJywgJ1wiICsgc3VpdGFiaWxpdHlGb3JtLmZhY3RvckNvbXB1dGVyXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICsgXCInLCAnXCIgKyBzdWl0YWJpbGl0eUZvcm0uZmFjdG9ySG91c2luZ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICArIFwiJywgJ1wiICsgc3VpdGFiaWxpdHlGb3JtLmZhY3RvclRyYW5zcG9ydGF0aW9uXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICsgXCInLCAnXCIgKyBzdWl0YWJpbGl0eUZvcm0uZmFjdG9yRGF5Y2FyZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICArIFwiJywgJ1wiICsgc3VpdGFiaWxpdHlGb3JtLmZhY3RvckludGVybmV0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICsgXCInLCAnXCIgKyBzdWl0YWJpbGl0eUZvcm0uZmFjdG9yUGVyc29uYWxcclxuICAgICAgICAgICAgICAgICAgICAgICAgKyBcIicsICdcIiArIHN1aXRhYmlsaXR5Rm9ybS5mYWN0b3JPdGhlclxyXG4gICAgICAgICAgICAgICAgICAgICAgICArIFwiJywgJ1wiICsgc3VpdGFiaWxpdHlGb3JtLnN1bW1hcnlUcmFuc3BvcnRhdGlvblxyXG4gICAgICAgICAgICAgICAgICAgICAgICArIFwiJywgJ1wiICsgc3VpdGFiaWxpdHlGb3JtLnN1bW1hcnlIb3VzaW5nXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICsgXCInLCAnXCIgKyBzdWl0YWJpbGl0eUZvcm0uc3VtbWFyeUNoaWxkY2FyZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICArIFwiJywgJ1wiICsgc3VpdGFiaWxpdHlGb3JtLnN1bW1hcnlIZWFsdGhcclxuICAgICAgICAgICAgICAgICAgICAgICAgKyBcIicsICdcIiArIHN1aXRhYmlsaXR5Rm9ybS5zdW1tYXJ5T3RoZXJcclxuICAgICAgICAgICAgICAgICAgICAgICAgKyBcIicsICdcIiArIHN1aXRhYmlsaXR5Rm9ybS5kYlRvdGFsUG9pbnRzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICsgXCInLCAnXCIgKyBzdWl0YWJpbGl0eUZvcm0uZ2VuZXJhbEluZm9Db21tZW50cyArIFwiJ1wiO1xyXG4gICAgICAgICAgICAgICAgICAgIG5ldyBzcWwuUmVxdWVzdChjb25uZWN0aW9uKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAucXVlcnkoXCJJTlNFUlQgSU5UTyBTdWl0YWJpbGl0eUZvcm0gVkFMVUVTIChcIiArIHN1aXRhYmlsaXR5Rm9ybVF1ZXJ5ICsgXCIpXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBzcWwuUmVxdWVzdChjb25uZWN0aW9uKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucXVlcnkoXCJVUERBVEUgQ2xpZW50cyBTRVQgc3VpdGFiaWxpdHkgPSAnZmFsc2UnIFdIRVJFIHVzZXJJRCA9IFwiICsgX2lkICsgXCJcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzLnNlbmQoe1wic3VjY2Vzc1wiOiBcInN1Y2Nlc3NcIn0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KS5jYXRjaCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KS5jYXRjaCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICByZXMuc2VuZCh7IFwiZXJyb3JcIjogXCJlcnJvclwiIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGUpO1xyXG4gICAgICAgICAgICAgICAgICByZXMuc2VuZCh7IFwiZXJyb3JcIjogXCJlcnJvciBpbiB5b3VyIHJlcXVlc3RcIiB9KTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgdXBkYXRlKHJlcTogZXhwcmVzcy5SZXF1ZXN0LCByZXM6IGV4cHJlc3MuUmVzcG9uc2UpOiB2b2lkIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBuZXcgQXV0aENvbnRyb2xsZXIoKS5hdXRoVXNlcihyZXEsIHJlcywge1xyXG4gICAgICAgICAgICAgICAgcmVxdWlyZWRBdXRoOiBhdXRoLCBkb25lOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgY2xpZW50ID0gcmVxLmJvZHk7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIF9pZDogc3RyaW5nID0gcmVxLnBhcmFtcy5faWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgc3FsLmNvbm5lY3QoY29uZmlnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbihjb25uZWN0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXcgc3FsLlJlcXVlc3QoY29ubmVjdGlvbilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucXVlcnkoXCJVUERBVEUgQ2xpZW50cyBTRVQgZmlyc3ROYW1lPSdcIiArIGNsaWVudC5maXJzdE5hbWUgKyBcIicsIGxhc3ROYW1lPSdcIiArIGNsaWVudC5sYXN0TmFtZSArIFwiJywgYmlydGhkYXRlPSdcIiArIGNsaWVudC5iaXJ0aGRheSArIFwiJywgcGhvbmU9J1wiICsgY2xpZW50LnBob25lICsgXCInIFdIRVJFIGNsaWVudElEID0gJ1wiICsgX2lkICsgXCInXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24ocmVjb3Jkc2V0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcy5zZW5kKHsgXCJzdWNjZXNzXCI6IFwic3VjY2Vzc1wiIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGVycikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXMuc2VuZCh7IFwiZXJyb3JcIjogXCJlcnJvclwiIH0pOyBjb25zb2xlLmxvZyhcIlVwZGF0ZSBjbGllbnQgXCIgKyBlcnIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbihlcnIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXMuc2VuZCh7IFwiZXJyb3JcIjogXCJlcnJvclwiIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGUpO1xyXG4gICAgICAgICAgICByZXMuc2VuZCh7IFwiZXJyb3JcIjogXCJlcnJvciBpbiB5b3VyIHJlcXVlc3RcIiB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlQmFubmVyQ2FtQm9vbChyZXE6IGV4cHJlc3MuUmVxdWVzdCwgcmVzOiBleHByZXNzLlJlc3BvbnNlKTogdm9pZCB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgbmV3IEF1dGhDb250cm9sbGVyKCkuYXV0aFVzZXIocmVxLCByZXMsIHtcclxuICAgICAgICAgICAgICAgIHJlcXVpcmVkQXV0aDogYXV0aCwgZG9uZTogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGNsaWVudCA9IHJlcS5ib2R5O1xyXG4gICAgICAgICAgICAgICAgICAgIHNxbC5jb25uZWN0KGNvbmZpZylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24oY29ubmVjdGlvbikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3IHNxbC5SZXF1ZXN0KGNvbm5lY3Rpb24pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnF1ZXJ5KFwiVVBEQVRFIENsaWVudHMgU0VUIGJhbm5lcj0nXCIgKyBjbGllbnQuYmFubmVyICsgXCInLCBjYW09J1wiICsgY2xpZW50LmNhbSArIFwiJyBXSEVSRSBjbGllbnRJRCA9ICdcIiArIGNsaWVudC5jbGllbnRJRCArIFwiJ1wiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKHJlY29yZHNldCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXMuc2VuZCh7IFwic3VjY2Vzc1wiOiBcInN1Y2Nlc3NcIiB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbihlcnIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzLnNlbmQoeyBcImVycm9yXCI6IFwiZXJyb3JcIiB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJVcGRhdGUgYmFubmVyIGFuZCBjYW0gYm9vbGVhbnMgXCIgKyBlcnIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbihlcnIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXMuc2VuZCh7IFwiZXJyb3JcIjogXCJlcnJvclwiIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGUpO1xyXG4gICAgICAgICAgICByZXMuc2VuZCh7IFwiZXJyb3JcIjogXCJlcnJvciBpbiB5b3VyIHJlcXVlc3RcIiB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlU3VpdGFiaWxpdHkocmVxOiBleHByZXNzLlJlcXVlc3QsIHJlczogZXhwcmVzcy5SZXNwb25zZSk6IHZvaWQge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIG5ldyBBdXRoQ29udHJvbGxlcigpLmF1dGhVc2VyKHJlcSwgcmVzLCB7XHJcbiAgICAgICAgICAgICAgICByZXF1aXJlZEF1dGg6IGF1dGgsIGRvbmU6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBzdWl0YWJpbGl0eSA9IHJlcS5ib2R5O1xyXG4gICAgICAgICAgICAgICAgICAgIHNxbC5jb25uZWN0KGNvbmZpZylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24oY29ubmVjdGlvbikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBxdWVyeSA9IFwiVVBEQVRFIFN1aXRhYmlsaXR5Rm9ybSBTRVQgdHJhbnNjcmlwdD0nXCIgKyBzdWl0YWJpbGl0eS50cmFuc2NyaXB0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKyBcIicsIGNvdXJzZXM9J1wiICsgc3VpdGFiaWxpdHkuY291cnNlc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICsgXCInLCBnb2FsPSdcIiArIHN1aXRhYmlsaXR5LmdvYWxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICArIFwiJywgdHJhbnNpdGlvbkRhdGU9J1wiICsgc3VpdGFiaWxpdHkudHJhbnNpdGlvbkRhdGVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICArIFwiJywgZ292ZXJubWVudElEPSdcIiArIHN1aXRhYmlsaXR5LmdvdmVybm1lbnRJRFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICsgXCInLCBhcHByb3ByaWF0ZUdvYWw9J1wiICsgc3VpdGFiaWxpdHkuYXBwcm9wcmlhdGVHb2FsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKyBcIicsIGlzVmFsaWRBZ2U9J1wiICsgc3VpdGFiaWxpdHkuaXNWYWxpZEFnZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICsgXCInLCBzY2hvb2xSZWdpc3RyYXRpb249J1wiICsgc3VpdGFiaWxpdHkuc2Nob29sUmVnaXN0cmF0aW9uXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKyBcIicsIGF2YWlsYWJsZUR1cmluZ0NsYXNzPSdcIiArIHN1aXRhYmlsaXR5LmF2YWlsYWJsZUR1cmluZ0NsYXNzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKyBcIicsIGxhc3RHcmFkZT0nXCIgKyBzdWl0YWJpbGl0eS5sYXN0R3JhZGVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICArIFwiJywgbGV2ZWw9J1wiICsgc3VpdGFiaWxpdHkubGV2ZWxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICArIFwiJywgb2ZmZXJTdGFydERhdGU9J1wiICsgc3VpdGFiaWxpdHkub2ZmZXJTdGFydERhdGVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICArIFwiJywgbWVldHNHb2FsPSdcIiArIHN1aXRhYmlsaXR5Lm1lZXRzR29hbFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICsgXCInLCB0aW1lT3V0T2ZTY2hvb2w9J1wiICsgc3VpdGFiaWxpdHkudGltZU91dE9mU2Nob29sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKyBcIicsIGluUHJvZ3JhbUJlZm9yZT0nXCIgKyBzdWl0YWJpbGl0eS5pblByb2dyYW1CZWZvcmVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICArIFwiJywgZW1wbG95bWVudD0nXCIgKyBzdWl0YWJpbGl0eS5lbXBsb3ltZW50XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKyBcIicsIGluY29tZVNvdXJjZT0nXCIgKyBzdWl0YWJpbGl0eS5pbmNvbWVTb3VyY2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICArIFwiJywgYWdlUmFuZ2U9J1wiICsgc3VpdGFiaWxpdHkuYWdlUmFuZ2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICArIFwiJywgaG91cnNQZXJXZWVrPSdcIiArIHN1aXRhYmlsaXR5LmhvdXJzUGVyV2Vla1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICsgXCInLCB3b3JrSGlzdG9yeT0nXCIgKyBzdWl0YWJpbGl0eS53b3JrSGlzdG9yeVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICsgXCInLCBmYWN0b3JIZWFsdGg9J1wiICsgc3VpdGFiaWxpdHkuZmFjdG9ySGVhbHRoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKyBcIicsIGZhY3Rvckluc3RydWN0aW9ucz0nXCIgKyBzdWl0YWJpbGl0eS5mYWN0b3JJbnN0cnVjdGlvbnNcclxuICAgICAgICAgICAgICAgICAgICAgICAgICArIFwiJywgZmFjdG9yQ29tbXVuaWNhdGlvbj0nXCIgKyBzdWl0YWJpbGl0eS5mYWN0b3JDb21tdW5pY2F0aW9uXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKyBcIicsIGZhY3Rvckxhbmd1YWdlPSdcIiArIHN1aXRhYmlsaXR5LmZhY3Rvckxhbmd1YWdlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKyBcIicsIGZhY3RvckNvbXB1dGVyPSdcIiArIHN1aXRhYmlsaXR5LmZhY3RvckNvbXB1dGVyXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKyBcIicsIGZhY3RvckhvdXNpbmc9J1wiICsgc3VpdGFiaWxpdHkuZmFjdG9ySG91c2luZ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICsgXCInLCBmYWN0b3JUcmFuc3BvcnRhdGlvbj0nXCIgKyBzdWl0YWJpbGl0eS5mYWN0b3JUcmFuc3BvcnRhdGlvblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICsgXCInLCBmYWN0b3JEYXljYXJlPSdcIiArIHN1aXRhYmlsaXR5LmZhY3RvckRheWNhcmVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICArIFwiJywgZmFjdG9ySW50ZXJuZXQ9J1wiICsgc3VpdGFiaWxpdHkuZmFjdG9ySW50ZXJuZXRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICArIFwiJywgZmFjdG9yUGVyc29uYWw9J1wiICsgc3VpdGFiaWxpdHkuZmFjdG9yUGVyc29uYWxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICArIFwiJywgZmFjdG9yT3RoZXI9J1wiICsgc3VpdGFiaWxpdHkuZmFjdG9yT3RoZXJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICArIFwiJywgc3VtbWFyeVRyYW5zcG9ydGF0aW9uPSdcIiArIHN1aXRhYmlsaXR5LnN1bW1hcnlUcmFuc3BvcnRhdGlvblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICsgXCInLCBzdW1tYXJ5Q2hpbGRjYXJlPSdcIiArIHN1aXRhYmlsaXR5LnN1bW1hcnlDaGlsZGNhcmVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICArIFwiJywgc3VtbWFyeUhlYWx0aD0nXCIgKyBzdWl0YWJpbGl0eS5zdW1tYXJ5SGVhbHRoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKyBcIicsIHN1bW1hcnlPdGhlcj0nXCIgKyBzdWl0YWJpbGl0eS5zdW1tYXJ5T3RoZXJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICArIFwiJywgcG9pbnRzPSdcIiArIHN1aXRhYmlsaXR5LnBvaW50c1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICsgXCInIFdIRVJFIHN1aXRhYmlsaXR5SUQgPSAnXCIgKyBzdWl0YWJpbGl0eS5zdWl0YWJpbGl0eUlEICtcIidcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3IHNxbC5SZXF1ZXN0KGNvbm5lY3Rpb24pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnF1ZXJ5KHF1ZXJ5KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKHJlY29yZHNldCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXMuc2VuZCh7IFwic3VjY2Vzc1wiOiBcInN1Y2Nlc3NcIiB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbihlcnIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzLnNlbmQoeyBcImVycm9yXCI6IFwiZXJyb3JcIiB9KTsgY29uc29sZS5sb2coXCJVcGRhdGUgc3VpdGFiaWxpdHkgXCIgKyBlcnIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbihlcnIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXMuc2VuZCh7IFwiZXJyb3JcIjogXCJlcnJvclwiIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGUpO1xyXG4gICAgICAgICAgICByZXMuc2VuZCh7IFwiZXJyb3JcIjogXCJlcnJvciBpbiB5b3VyIHJlcXVlc3RcIiB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZGVsZXRlKHJlcTogZXhwcmVzcy5SZXF1ZXN0LCByZXM6IGV4cHJlc3MuUmVzcG9uc2UpOiB2b2lkIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBuZXcgQXV0aENvbnRyb2xsZXIoKS5hdXRoVXNlcihyZXEsIHJlcywge1xyXG4gICAgICAgICAgICAgICAgcmVxdWlyZWRBdXRoOiBhdXRoLCBkb25lOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgX2lkOiBzdHJpbmcgPSByZXEucGFyYW1zLl9pZDtcclxuICAgICAgICAgICAgICAgICAgICBzcWwuY29ubmVjdChjb25maWcpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKGNvbm5lY3Rpb24pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBzcWwuUmVxdWVzdChjb25uZWN0aW9uKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5xdWVyeShcIkRFTEVURSBGUk9NIENsaWVudHMgV0hFUkUgdXNlcklEID0gJ1wiICsgX2lkICsgXCInXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBzcWwuUmVxdWVzdChjb25uZWN0aW9uKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnF1ZXJ5KFwiREVMRVRFIEZST00gVXNlcnMgV0hFUkUgdXNlcklEID0gJ1wiICsgX2lkICsgXCInXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXMuc2VuZCh7IFwic3VjY2Vzc1wiOiBcInN1Y2Nlc3NcIiB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGVycikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcy5zZW5kKHsgXCJlcnJvclwiOiBcImVycm9yXCIgfSk7IGNvbnNvbGUubG9nKFwiRGVsZXRlIHVzZXIgd2l0aCBpZCBcIiArIF9pZCArIFwiLiBcIiArIGVycik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbihlcnIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzLnNlbmQoeyBcImVycm9yXCI6IFwiZXJyb3JcIiB9KTsgY29uc29sZS5sb2coXCJEZWxldGUgY2xpZW50IHdpdGggaWQgXCIgKyBfaWQgKyBcIi4gXCIgKyBlcnIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzLnNlbmQoeyBcImVycm9yXCI6IFwiZXJyb3JcIiB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlKTtcclxuICAgICAgICAgICAgcmVzLnNlbmQoeyBcImVycm9yXCI6IFwiZXJyb3IgaW4geW91ciByZXF1ZXN0XCIgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJlbW92ZUZyb21UYWJsZShyZXE6IGV4cHJlc3MuUmVxdWVzdCwgcmVzOiBleHByZXNzLlJlc3BvbnNlKTogdm9pZCB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgbmV3IEF1dGhDb250cm9sbGVyKCkuYXV0aFVzZXIocmVxLCByZXMsIHtcclxuICAgICAgICAgICAgICAgIHJlcXVpcmVkQXV0aDogYXV0aCwgZG9uZTogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIF9pZDogc3RyaW5nID0gcmVxLnBhcmFtcy5faWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgc3FsLmNvbm5lY3QoY29uZmlnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbihjb25uZWN0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXcgc3FsLlJlcXVlc3QoY29ubmVjdGlvbilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucXVlcnkoXCJERUxFVEUgRlJPTSBDbGllbnRzIFdIRVJFIHVzZXJJRCA9ICdcIiArIF9pZCArIFwiJ1wiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXcgc3FsLlJlcXVlc3QoY29ubmVjdGlvbilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5xdWVyeShcIlVQREFURSBVc2VycyBTRVQgdXNlclR5cGU9ICdTdHVkZW50JyBXSEVSRSB1c2VySUQgPSAnXCIgKyBfaWQgKyBcIidcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcy5zZW5kKHsgXCJzdWNjZXNzXCI6IFwic3VjY2Vzc1wiIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzLnNlbmQoeyBcImVycm9yXCI6IFwiZXJyb3JcIiB9KTsgY29uc29sZS5sb2coXCJVcGRhdGUgdXNlciB1c2VyVHlwZSBcIiArIGVycik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbihlcnIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzLnNlbmQoeyBcImVycm9yXCI6IFwiZXJyb3JcIiB9KTsgY29uc29sZS5sb2coXCJEZWxldGUgZm9ybSBjbGllbnQgdGFibGUgd2l0aCBpZCBcIiArIF9pZCArIFwiLiBcIiArIGVycik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGVycikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcy5zZW5kKHsgXCJlcnJvclwiOiBcImVycm9yXCIgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coZSk7XHJcbiAgICAgICAgICAgIHJlcy5zZW5kKHsgXCJlcnJvclwiOiBcImVycm9yIGluIHlvdXIgcmVxdWVzdFwiIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXRyaWV2ZShyZXE6IGV4cHJlc3MuUmVxdWVzdCwgcmVzOiBleHByZXNzLlJlc3BvbnNlKTogdm9pZCB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgbmV3IEF1dGhDb250cm9sbGVyKCkuYXV0aFVzZXIocmVxLCByZXMsIHtcclxuICAgICAgICAgICAgICAgIHJlcXVpcmVkQXV0aDogYXV0aCwgZG9uZTogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3FsLmNvbm5lY3QoY29uZmlnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbihjb25uZWN0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXcgc3FsLlJlcXVlc3QoY29ubmVjdGlvbilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucXVlcnkoJ1NFTEVDVCBDbGllbnRzLiosIFVzZXJzLmVtYWlsLCBVc2Vycy5hY3RpdmUgZnJvbSBDbGllbnRzIExlZnQgSk9JTiBVc2VycyBPTiBDbGllbnRzLnVzZXJJRCA9IFVzZXJzLnVzZXJJRCcpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24oY2xpZW50cykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXcgc3FsLlJlcXVlc3QoY29ubmVjdGlvbilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5xdWVyeSgnU0VMRUNUICogRlJPTSBTdWl0YWJpbGl0eUZvcm0nKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24oc3VpdGFiaWxpdHlGb3Jtcykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBzcWwuUmVxdWVzdChjb25uZWN0aW9uKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucXVlcnkoJ1NFTEVDVCAqIEZST00gQ29uc2VudCcpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKGNvbnNlbnRGb3Jtcykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3IHNxbC5SZXF1ZXN0KGNvbm5lY3Rpb24pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnF1ZXJ5KCdTRUxFQ1QgKiBGUk9NIExlYXJuaW5nU3R5bGUnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKGxlYXJuaW5nU3R5bGVGb3Jtcykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXMuc2VuZCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGllbnRzOiBjbGllbnRzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3VpdGFiaWxpdHlGb3Jtczogc3VpdGFiaWxpdHlGb3JtcyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNlbnRGb3JtczogY29uc2VudEZvcm1zLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGVhcm5pbmdTdHlsZUZvcm1zOiBsZWFybmluZ1N0eWxlRm9ybXNcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcy5zZW5kKHsgXCJlcnJvclwiOiBcImVycm9yXCIgfSk7IGNvbnNvbGUubG9nKFwiR2V0IGxlYXJuaW5nU3R5bGVGb3JtcyBcIiArIGVycik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGVycikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzLnNlbmQoeyBcImVycm9yXCI6IFwiZXJyb3JcIiB9KTsgY29uc29sZS5sb2coXCJHZXQgY29uc2VudEZvcm1zIFwiICsgZXJyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbihlcnIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXMuc2VuZCh7IFwiZXJyb3JcIjogXCJlcnJvclwiIH0pOyBjb25zb2xlLmxvZyhcIkdldCBzdWl0YWJpbGl0eUZvcm1zIFwiICsgZXJyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGVycikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXMuc2VuZCh7IFwiZXJyb3JcIjogXCJlcnJvclwiIH0pOyBjb25zb2xlLmxvZyhcIkdldCBjbGllbnRzIFwiICsgZXJyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzLnNlbmQoeyBcImVycm9yXCI6IFwiZXJyb3JcIiB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlKTtcclxuICAgICAgICAgICAgcmVzLnNlbmQoeyBcImVycm9yXCI6IFwiZXJyb3IgaW4geW91ciByZXF1ZXN0XCIgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZpbmRCeUlkKHJlcTogZXhwcmVzcy5SZXF1ZXN0LCByZXM6IGV4cHJlc3MuUmVzcG9uc2UpOiB2b2lkIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBuZXcgQXV0aENvbnRyb2xsZXIoKS5hdXRoVXNlcihyZXEsIHJlcywge1xyXG4gICAgICAgICAgICAgICAgcmVxdWlyZWRBdXRoOiBbXCJBZG1pblwiLCBcIlN0YWZmXCIsIFwiQ2xpZW50XCJdLCBkb25lOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgX2lkOiBzdHJpbmcgPSByZXEucGFyYW1zLl9pZDtcclxuICAgICAgICAgICAgICAgICAgICBzcWwuY29ubmVjdChjb25maWcpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKGNvbm5lY3Rpb24pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBzcWwuUmVxdWVzdChjb25uZWN0aW9uKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5xdWVyeShcIlNFTEVDVCAqIEZST00gQ2xpZW50cyBXSEVSRSB1c2VySUQgPSAnXCIgKyBfaWQgKyBcIidcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbihjbGllbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzLnNlbmQoeyBjbGllbnQ6IGNsaWVudCB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbihlcnIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJHZXQgY2xpZW50IGJ5IGlkIFwiICsgZXJyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzLnNlbmQoeyBcImVycm9yXCI6IFwiZXJyb3JcIiB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzLnNlbmQoeyBcImVycm9yXCI6IFwiZXJyb3JcIiB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlKTtcclxuICAgICAgICAgICAgcmVzLnNlbmQoeyBcImVycm9yXCI6IFwiZXJyb3IgaW4geW91ciByZXF1ZXN0XCIgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxufVxyXG5leHBvcnQgPSBDbGllbnRDb250cm9sbGVyO1xyXG4iXX0=
