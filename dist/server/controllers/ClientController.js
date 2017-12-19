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
                                            false + "'";
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
                                                    + "', '" + suitabilityForm.dbTotalPoints + "'";
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
                            + "', '" + suitabilityForm.dbTotalPoints + "'";
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NlcnZlci9zcmMvY29udHJvbGxlcnMvQ2xpZW50Q29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBRUEsK0JBQWtDO0FBQ2xDLDhEQUFpRTtBQUNqRSxJQUFNLFdBQVcsR0FBRyxPQUFPLENBQUMseUJBQXlCLENBQUMsQ0FBQztBQUN2RCxJQUFJLEdBQUcsR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDM0IsSUFBSSxJQUFJLEdBQUcsQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUM7QUFFOUIsSUFBSSxNQUFNLEdBQUcsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDO0FBQ2xDLE1BQU0sR0FBRyxNQUFNLENBQUMsRUFBRSxDQUFDO0FBRW5CO0lBQUE7SUFrZ0JBLENBQUM7SUFoZ0JHLGlDQUFNLEdBQU4sVUFBTyxHQUFvQixFQUFFLEdBQXFCO1FBQzlDLElBQUksQ0FBQztZQUNELElBQUksY0FBYyxFQUFFLENBQUMsUUFBUSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUU7Z0JBQ3BDLFlBQVksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFO29CQUN0QixJQUFJLFlBQVksR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUN4RCxZQUFZLEdBQUcsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLEVBQUUsR0FBRyxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUM1RSxJQUFJLElBQUksR0FBRyxNQUFNLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxDQUFDO29CQUNsQyxrQ0FBa0M7b0JBQ2xDLElBQUksUUFBUSxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxDQUFDO29CQUNuRCxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0s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LENBQUMsS0FBSyxDQUFDLFVBQVMsR0FBRzs0QkFDakIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsR0FBRyxHQUFHLENBQUMsQ0FBQzs0QkFDdkMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsQ0FBQyxDQUFDO3dCQUNuQyxDQUFDLENBQUMsQ0FBQztvQkFDWCxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsVUFBUyxHQUFHO3dCQUNqQixPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO3dCQUNqQixHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxDQUFDLENBQUM7b0JBQ25DLENBQUMsQ0FBQyxDQUFDO2dCQUNYLENBQUM7YUFDSixDQUFDLENBQUM7UUFDUCxDQUFDO1FBQ0QsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNQLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDZixHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsT0FBTyxFQUFFLHVCQUF1QixFQUFFLENBQUMsQ0FBQztRQUNuRCxDQUFDO0lBQ0wsQ0FBQztJQUVMLHVCQUFDO0FBQUQsQ0FsZ0JBLEFBa2dCQyxJQUFBO0FBQ0QsaUJBQVMsZ0JBQWdCLENBQUMiLCJmaWxlIjoiY29udHJvbGxlcnMvQ2xpZW50Q29udHJvbGxlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBleHByZXNzID0gcmVxdWlyZShcImV4cHJlc3NcIik7XHJcbmltcG9ydCBqd3QgPSByZXF1aXJlKCdqc29ud2VidG9rZW4nKTtcclxuaW1wb3J0IGJjcnlwdCA9IHJlcXVpcmUoJ2JjcnlwdCcpO1xyXG5pbXBvcnQgQXV0aENvbnRyb2xsZXIgPSByZXF1aXJlKFwiLi4vY29udHJvbGxlcnMvQXV0aENvbnRyb2xsZXJcIik7XHJcbmNvbnN0IE1haWxTZXJ2aWNlID0gcmVxdWlyZShcIi4uL3NlcnZpY2VzL01haWxTZXJ2aWNlXCIpO1xyXG52YXIgc3FsID0gcmVxdWlyZSgnbXNzcWwnKTtcclxudmFyIGF1dGggPSBbXCJBZG1pblwiLCBcIlN0YWZmXCJdO1xyXG5cclxudmFyIGNvbmZpZyA9IHJlcXVpcmUoJy4uL2NvbmZpZycpO1xyXG5jb25maWcgPSBjb25maWcuZGI7XHJcblxyXG5jbGFzcyBDbGllbnRDb250cm9sbGVyIHtcclxuXHJcbiAgICBjcmVhdGUocmVxOiBleHByZXNzLlJlcXVlc3QsIHJlczogZXhwcmVzcy5SZXNwb25zZSk6IHZvaWQge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIG5ldyBBdXRoQ29udHJvbGxlcigpLmF1dGhVc2VyKHJlcSwgcmVzLCB7XHJcbiAgICAgICAgICAgICAgICByZXF1aXJlZEF1dGg6IGF1dGgsIGRvbmU6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciByYW5kb21zdHJpbmcgPSBNYXRoLnJhbmRvbSgpLnRvU3RyaW5nKDM2KS5zbGljZSgtOCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmFuZG9tc3RyaW5nID0gcmFuZG9tc3RyaW5nLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgcmFuZG9tc3RyaW5nLnNsaWNlKDEpO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBzYWx0ID0gYmNyeXB0LmdlblNhbHRTeW5jKDEwKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyBIYXNoIHRoZSBwYXNzd29yZCB3aXRoIHRoZSBzYWx0XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHBhc3N3b3JkID0gYmNyeXB0Lmhhc2hTeW5jKHJhbmRvbXN0cmluZywgc2FsdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVxLmJvZHkuY2xpZW50LnBhc3N3b3JkID0gcGFzc3dvcmQ7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGNsaWVudCA9IHJlcS5ib2R5LmNsaWVudDtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgc3VpdGFiaWxpdHlGb3JtID0gcmVxLmJvZHkuc3VpdGFiaWxpdHlGb3JtO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBzcWwuY29ubmVjdChjb25maWcpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKGNvbm5lY3Rpb24pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBzcWwuUmVxdWVzdChjb25uZWN0aW9uKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5xdWVyeShcIlNFTEVDVCAqIEZST00gVXNlcnNcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbih1c2Vycykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgdmFsaWRhdGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGVycm9yO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgcmUgPSAvXigoW148PigpW1xcXVxcXFwuLDs6XFxzQFxcXCJdKyhcXC5bXjw+KClbXFxdXFxcXC4sOzpcXHNAXFxcIl0rKSopfChcXFwiLitcXFwiKSlAKChcXFtbMC05XXsxLDN9XFwuWzAtOV17MSwzfVxcLlswLTldezEsM31cXC5bMC05XXsxLDN9XFxdKXwoKFthLXpBLVpcXC0wLTldK1xcLikrW2EtekEtWl17Mix9KSkkLztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGVtYWlsVmFsaWRhdGlvbiA9IHJlLnRlc3QoY2xpZW50LmVtYWlsKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgdXNlciBvZiB1c2Vycykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHVzZXIudXNlcm5hbWUgPT09IGNsaWVudC51c2VybmFtZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbGlkYXRlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yID0gXCJ1c2VybmFtZSBpbiB1c2VcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWVtYWlsVmFsaWRhdGlvbiAmJiB2YWxpZGF0ZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbGlkYXRlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3IgPSBcImluY29ycmVjdCBlbWFpbCBmb3JtYXRcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodmFsaWRhdGVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXcgc3FsLlJlcXVlc3QoY29ubmVjdGlvbilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucXVlcnkoXCJJTlNFUlQgSU5UTyBVc2VycyBWQUxVRVMgKCdcIiArIGNsaWVudC51c2VybmFtZSArIFwiJywnXCIgKyBjbGllbnQuZW1haWwgKyBcIicsJ1wiICsgY2xpZW50LnBhc3N3b3JkICsgXCInLCdDbGllbnQnLCdcIiArIGFjdGl2ZSArIFwiJylcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3IHNxbC5SZXF1ZXN0KGNvbm5lY3Rpb24pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucXVlcnkoXCJTRUxFQ1QgdXNlcklEIEZST00gVXNlcnMgV0hFUkUgdXNlcm5hbWUgPSAnXCIgKyBjbGllbnQudXNlcm5hbWUgKyBcIicgQU5EIHBhc3N3b3JkID0gJ1wiICsgY2xpZW50LnBhc3N3b3JkICsgXCInXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbihpZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjbGllbnQub2theVRvVGV4dCA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGllbnQub2theVRvVGV4dCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGNsaWVudC5hbHRlcm5hdGVOdW1iZXIgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xpZW50LmFsdGVybmF0ZU51bWJlciA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgY2xpZW50UXVlcnkgPSBcIidcIiArIGlkWzBdLnVzZXJJRCArIFwiJywgJ1wiICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xpZW50LmZpcnN0TmFtZSArIFwiJywgJ1wiICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xpZW50Lmxhc3ROYW1lICsgXCInLCAnXCIgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGllbnQuaW5xdWlyeURhdGUgKyBcIicsICdcIiArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsaWVudC5iaXJ0aGRheSArIFwiJywgJ1wiICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xpZW50LnBob25lICsgXCInLCAnXCIgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGllbnQuYWxsb3dEZXRhaWxlZE1lc3NhZ2UgKyBcIicsICdcIiArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsaWVudC5va2F5VG9UZXh0ICsgXCInLCAnXCIgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGllbnQuYWx0ZXJuYXRlTnVtYmVyICsgXCInLCAnXCIgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGllbnQuYWxsb3dEZXRhaWxlZE1lc3NhZ2VBbHRlcm5hdGUgKyBcIicsICdcIiArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsaWVudC5va2F5VG9UZXh0QWx0ZXJuYXRlICsgXCInLCAnXCIgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cnVlICsgXCInLCAnXCIgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cnVlICsgXCInLCAnXCIgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cnVlICsgXCInLCAnXCIgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmYWxzZSArIFwiJywgJ1wiICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmFsc2UgKyBcIidcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBzZXR1cCBlbWFpbCBkYXRhIHdpdGggdW5pY29kZSBzeW1ib2xzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBtYWlsT3B0aW9ucyA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmcm9tOiAnXCJHZW9yZ2lhbiBBY2FkZW1pYyAmIENhcmVlciBQcmVwXCInLCAvLyBzZW5kZXIgYWRkcmVzc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvOiBjbGllbnQuZW1haWwsIC8vIGxpc3Qgb2YgcmVjZWl2ZXJzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3ViamVjdDogJ1dlbGNvbWUsICcgKyBjbGllbnQuZmlyc3ROYW1lLCAvLyBTdWJqZWN0IGxpbmVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0OiAnJywgLy8gcGxhaW4gdGV4dCBib2R5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaHRtbDogJ1lvdXIgdXNlcm5hbWUgaXMgPGI+JyArIGNsaWVudC51c2VybmFtZSArICc8L2I+IGFuZCB5b3VyIHRlbXBvcmFyeSBwYXNzd29yZCBpczogPGI+JyArIHJhbmRvbXN0cmluZyArICc8L2I+PGJyIC8+IFBsZWFzZSBsb2dpbiBhdCBodHRwOi8vZ2VvcmdpYW5hcHAuYXp1cmV3ZWJzaXRlcy5uZXQgYW5kIGNvbXBsZXRlIHRoZSByZXF1aXJlZCBmb3Jtcy4gPGJyIC8+PGJyIC8+IFRoYW5reW91JyAvLyBodG1sIGJvZHlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBNYWlsU2VydmljZSgpLnNlbmRNZXNzYWdlKFwiV2VsY29tZSBNZXNzYWdlXCIsIG1haWxPcHRpb25zKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3IHNxbC5SZXF1ZXN0KCkucXVlcnkoXCJJTlNFUlQgSU5UTyBDbGllbnRzIFZBTFVFUyAoXCIgKyBjbGllbnRRdWVyeSArIFwiKVwiKS50aGVuKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoT2JqZWN0LmtleXMoc3VpdGFiaWxpdHlGb3JtKS5sZW5ndGggIT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHN1aXRhYmlsaXR5Rm9ybVF1ZXJ5ID0gXCInXCIgKyBpZFswXS51c2VySURcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICArIFwiJywgJ1wiICsgc3VpdGFiaWxpdHlGb3JtLnRyYW5zY3JpcHRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICArIFwiJywgJ1wiICsgc3VpdGFiaWxpdHlGb3JtLmNvdXJzZXNcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICArIFwiJywgJ1wiICsgc3VpdGFiaWxpdHlGb3JtLmdvYWxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICArIFwiJywgJ1wiICsgc3VpdGFiaWxpdHlGb3JtLnRyYW5zaXRpb25EYXRlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKyBcIicsICdcIiArIHN1aXRhYmlsaXR5Rm9ybS5nb3Zlcm5tZW50SURcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICArIFwiJywgJ1wiICsgc3VpdGFiaWxpdHlGb3JtLmFwcHJvcHJpYXRlR29hbFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICsgXCInLCAnXCIgKyBzdWl0YWJpbGl0eUZvcm0uaXNWYWxpZEFnZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICsgXCInLCAnXCIgKyBzdWl0YWJpbGl0eUZvcm0uc2Nob29sUmVnaXN0cmF0aW9uXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKyBcIicsICdcIiArIHN1aXRhYmlsaXR5Rm9ybS5hdmFpbGFibGVEdXJpbmdDbGFzc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICsgXCInLCAnXCIgKyBzdWl0YWJpbGl0eUZvcm0ubGFzdEdyYWRlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKyBcIicsICdcIiArIHN1aXRhYmlsaXR5Rm9ybS5sZXZlbFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICsgXCInLCAnXCIgKyBzdWl0YWJpbGl0eUZvcm0ub2ZmZXJTdGFydERhdGVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICArIFwiJywgJ1wiICsgc3VpdGFiaWxpdHlGb3JtLm1lZXRzR29hbFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICsgXCInLCAnXCIgKyBzdWl0YWJpbGl0eUZvcm0udGltZU91dE9mU2Nob29sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKyBcIicsICdcIiArIHN1aXRhYmlsaXR5Rm9ybS5pblByb2dyYW1CZWZvcmVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICArIFwiJywgJ1wiICsgc3VpdGFiaWxpdHlGb3JtLmVtcGxveW1lbnRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICArIFwiJywgJ1wiICsgc3VpdGFiaWxpdHlGb3JtLmluY29tZVNvdXJjZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICsgXCInLCAnXCIgKyBzdWl0YWJpbGl0eUZvcm0uYWdlUmFuZ2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICArIFwiJywgJ1wiICsgc3VpdGFiaWxpdHlGb3JtLmhvdXJzUGVyV2Vla1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICsgXCInLCAnXCIgKyBzdWl0YWJpbGl0eUZvcm0ud29ya0hpc3RvcnlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICArIFwiJywgJ1wiICsgc3VpdGFiaWxpdHlGb3JtLmZhY3RvckhlYWx0aFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICsgXCInLCAnXCIgKyBzdWl0YWJpbGl0eUZvcm0uZmFjdG9ySW5zdHJ1Y3Rpb25zXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKyBcIicsICdcIiArIHN1aXRhYmlsaXR5Rm9ybS5mYWN0b3JDb21tdW5pY2F0aW9uXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKyBcIicsICdcIiArIHN1aXRhYmlsaXR5Rm9ybS5mYWN0b3JMYW5ndWFnZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICsgXCInLCAnXCIgKyBzdWl0YWJpbGl0eUZvcm0uZmFjdG9yQ29tcHV0ZXJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICArIFwiJywgJ1wiICsgc3VpdGFiaWxpdHlGb3JtLmZhY3RvckhvdXNpbmdcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICArIFwiJywgJ1wiICsgc3VpdGFiaWxpdHlGb3JtLmZhY3RvclRyYW5zcG9ydGF0aW9uXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKyBcIicsICdcIiArIHN1aXRhYmlsaXR5Rm9ybS5mYWN0b3JEYXljYXJlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKyBcIicsICdcIiArIHN1aXRhYmlsaXR5Rm9ybS5mYWN0b3JJbnRlcm5ldFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICsgXCInLCAnXCIgKyBzdWl0YWJpbGl0eUZvcm0uZmFjdG9yUGVyc29uYWxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICArIFwiJywgJ1wiICsgc3VpdGFiaWxpdHlGb3JtLmZhY3Rvck90aGVyXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKyBcIicsICdcIiArIHN1aXRhYmlsaXR5Rm9ybS5zdW1tYXJ5VHJhbnNwb3J0YXRpb25cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICArIFwiJywgJ1wiICsgc3VpdGFiaWxpdHlGb3JtLnN1bW1hcnlIb3VzaW5nXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKyBcIicsICdcIiArIHN1aXRhYmlsaXR5Rm9ybS5zdW1tYXJ5Q2hpbGRjYXJlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKyBcIicsICdcIiArIHN1aXRhYmlsaXR5Rm9ybS5zdW1tYXJ5SGVhbHRoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKyBcIicsICdcIiArIHN1aXRhYmlsaXR5Rm9ybS5zdW1tYXJ5T3RoZXJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICArIFwiJywgJ1wiICsgc3VpdGFiaWxpdHlGb3JtLmRiVG90YWxQb2ludHMgKyBcIidcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBzcWwuUmVxdWVzdChjb25uZWN0aW9uKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5xdWVyeShcIklOU0VSVCBJTlRPIFN1aXRhYmlsaXR5Rm9ybSBWQUxVRVMgKFwiICsgc3VpdGFiaWxpdHlGb3JtUXVlcnkgKyBcIilcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJTdWl0YWJpbGl0eSBpbnNlcnRlZFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3IHNxbC5SZXF1ZXN0KGNvbm5lY3Rpb24pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucXVlcnkoXCJVUERBVEUgQ2xpZW50cyBTRVQgc3VpdGFiaWxpdHk9ICdmYWxzZScgV0hFUkUgdXNlcklEID0gJ1wiICsgaWRbMF0udXNlcklEICsgXCInXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXMuc2VuZCh7IFwic3VjY2Vzc1wiOiBcInN1Y2Nlc3NcIiB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGVycikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcy5zZW5kKHsgXCJlcnJvclwiOiBcImVycm9yXCIgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJVcGRhdGUgY2xpZW50IFwiICsgZXJyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGVycikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXMuc2VuZCh7IFwiZXJyb3JcIjogXCJlcnJvclwiIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImluc2VydCBzdWl0YWJpbGl0eUZvcm0gXCIgKyBlcnIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzLnNlbmQoeyBcInN1Y2Nlc3NcIjogXCJzdWNjZXNzXCIgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlN1aXRhYmlsaXR5IG5vdCBwcm92aWRlZC5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbihlcnIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzLnNlbmQoeyBcImVycm9yXCI6IFwiZXJyb3JcIiB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJpbnNlcnQgY2xpZW50IFwiICsgZXJyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3IHNxbC5SZXF1ZXN0KGNvbm5lY3Rpb24pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucXVlcnkoXCJERUxFVEUgRlJPTSBVc2VycyBXSEVSRSB1c2VySUQgPSAnXCIgKyBpZFswXS51c2VySUQgKyBcIidcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcy5zZW5kKHsgXCJzdWNjZXNzXCI6IFwic3VjY2Vzc1wiIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGVycikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcy5zZW5kKHsgXCJlcnJvclwiOiBcImVycm9yXCIgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJEZWxldGUgdXNlciB3aXRoIGlkIFwiICsgaWRbMF0udXNlcklEICsgXCIuIFwiICsgZXJyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzLnNlbmQoeyBcImVycm9yXCI6IFwiZXJyb3Igc2VsZWN0aW5nIHVzZXIgZnJvbSB1c2Vyc1wiIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZ2V0IHVzZXIgXCIgKyBlcnIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcy5zZW5kKHsgXCJlcnJvclwiOiBcImVycm9yIGluc2VydGluZyB1c2VyXCIgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiaW5zZXJ0IHVzZXIgXCIgKyBlcnIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzLnNlbmQoeyBcImVycm9yXCI6IGVycm9yIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcy5zZW5kKHsgXCJlcnJvclwiOiBcImVycm9yIHNlbGVjdGluZyBhbGwgdXNlcnNcIiB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzLnNlbmQoeyBcImVycm9yXCI6IFwiZXJyb3JcIiB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlKTtcclxuICAgICAgICAgICAgcmVzLnNlbmQoeyBcImVycm9yXCI6IFwiZXJyb3IgaW4geW91ciByZXF1ZXN0XCIgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGFkZFN1aXRhYmlsaXR5KHJlcTogZXhwcmVzcy5SZXF1ZXN0LCByZXM6IGV4cHJlc3MuUmVzcG9uc2UpOiB2b2lkIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBuZXcgQXV0aENvbnRyb2xsZXIoKS5hdXRoVXNlcihyZXEsIHJlcywge1xyXG4gICAgICAgICAgICAgICAgcmVxdWlyZWRBdXRoOiBhdXRoLCBkb25lOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgX2lkOiBzdHJpbmcgPSByZXEucGFyYW1zLl9pZDtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgc3VpdGFiaWxpdHlGb3JtID0gcmVxLmJvZHk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHNxbC5jb25uZWN0KGNvbmZpZylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24oY29ubmVjdGlvbikge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB2YXIgc3VpdGFiaWxpdHlGb3JtUXVlcnkgPSBcIidcIiArIF9pZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICArIFwiJywgJ1wiICsgc3VpdGFiaWxpdHlGb3JtLnRyYW5zY3JpcHRcclxuICAgICAgICAgICAgICAgICAgICAgICAgKyBcIicsICdcIiArIHN1aXRhYmlsaXR5Rm9ybS5jb3Vyc2VzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICsgXCInLCAnXCIgKyBzdWl0YWJpbGl0eUZvcm0uZ29hbFxyXG4gICAgICAgICAgICAgICAgICAgICAgICArIFwiJywgJ1wiICsgc3VpdGFiaWxpdHlGb3JtLnRyYW5zaXRpb25EYXRlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICsgXCInLCAnXCIgKyBzdWl0YWJpbGl0eUZvcm0uZ292ZXJubWVudElEXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICsgXCInLCAnXCIgKyBzdWl0YWJpbGl0eUZvcm0uYXBwcm9wcmlhdGVHb2FsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICsgXCInLCAnXCIgKyBzdWl0YWJpbGl0eUZvcm0uaXNWYWxpZEFnZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICArIFwiJywgJ1wiICsgc3VpdGFiaWxpdHlGb3JtLnNjaG9vbFJlZ2lzdHJhdGlvblxyXG4gICAgICAgICAgICAgICAgICAgICAgICArIFwiJywgJ1wiICsgc3VpdGFiaWxpdHlGb3JtLmF2YWlsYWJsZUR1cmluZ0NsYXNzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICsgXCInLCAnXCIgKyBzdWl0YWJpbGl0eUZvcm0ubGFzdEdyYWRlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICsgXCInLCAnXCIgKyBzdWl0YWJpbGl0eUZvcm0ubGV2ZWxcclxuICAgICAgICAgICAgICAgICAgICAgICAgKyBcIicsICdcIiArIHN1aXRhYmlsaXR5Rm9ybS5vZmZlclN0YXJ0RGF0ZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICArIFwiJywgJ1wiICsgc3VpdGFiaWxpdHlGb3JtLm1lZXRzR29hbFxyXG4gICAgICAgICAgICAgICAgICAgICAgICArIFwiJywgJ1wiICsgc3VpdGFiaWxpdHlGb3JtLnRpbWVPdXRPZlNjaG9vbFxyXG4gICAgICAgICAgICAgICAgICAgICAgICArIFwiJywgJ1wiICsgc3VpdGFiaWxpdHlGb3JtLmluUHJvZ3JhbUJlZm9yZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICArIFwiJywgJ1wiICsgc3VpdGFiaWxpdHlGb3JtLmVtcGxveW1lbnRcclxuICAgICAgICAgICAgICAgICAgICAgICAgKyBcIicsICdcIiArIHN1aXRhYmlsaXR5Rm9ybS5pbmNvbWVTb3VyY2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgKyBcIicsICdcIiArIHN1aXRhYmlsaXR5Rm9ybS5hZ2VSYW5nZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICArIFwiJywgJ1wiICsgc3VpdGFiaWxpdHlGb3JtLmhvdXJzUGVyV2Vla1xyXG4gICAgICAgICAgICAgICAgICAgICAgICArIFwiJywgJ1wiICsgc3VpdGFiaWxpdHlGb3JtLndvcmtIaXN0b3J5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICsgXCInLCAnXCIgKyBzdWl0YWJpbGl0eUZvcm0uZmFjdG9ySGVhbHRoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICsgXCInLCAnXCIgKyBzdWl0YWJpbGl0eUZvcm0uZmFjdG9ySW5zdHJ1Y3Rpb25zXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICsgXCInLCAnXCIgKyBzdWl0YWJpbGl0eUZvcm0uZmFjdG9yQ29tbXVuaWNhdGlvblxyXG4gICAgICAgICAgICAgICAgICAgICAgICArIFwiJywgJ1wiICsgc3VpdGFiaWxpdHlGb3JtLmZhY3Rvckxhbmd1YWdlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICsgXCInLCAnXCIgKyBzdWl0YWJpbGl0eUZvcm0uZmFjdG9yQ29tcHV0ZXJcclxuICAgICAgICAgICAgICAgICAgICAgICAgKyBcIicsICdcIiArIHN1aXRhYmlsaXR5Rm9ybS5mYWN0b3JIb3VzaW5nXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICsgXCInLCAnXCIgKyBzdWl0YWJpbGl0eUZvcm0uZmFjdG9yVHJhbnNwb3J0YXRpb25cclxuICAgICAgICAgICAgICAgICAgICAgICAgKyBcIicsICdcIiArIHN1aXRhYmlsaXR5Rm9ybS5mYWN0b3JEYXljYXJlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICsgXCInLCAnXCIgKyBzdWl0YWJpbGl0eUZvcm0uZmFjdG9ySW50ZXJuZXRcclxuICAgICAgICAgICAgICAgICAgICAgICAgKyBcIicsICdcIiArIHN1aXRhYmlsaXR5Rm9ybS5mYWN0b3JQZXJzb25hbFxyXG4gICAgICAgICAgICAgICAgICAgICAgICArIFwiJywgJ1wiICsgc3VpdGFiaWxpdHlGb3JtLmZhY3Rvck90aGVyXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICsgXCInLCAnXCIgKyBzdWl0YWJpbGl0eUZvcm0uc3VtbWFyeVRyYW5zcG9ydGF0aW9uXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICsgXCInLCAnXCIgKyBzdWl0YWJpbGl0eUZvcm0uc3VtbWFyeUhvdXNpbmdcclxuICAgICAgICAgICAgICAgICAgICAgICAgKyBcIicsICdcIiArIHN1aXRhYmlsaXR5Rm9ybS5zdW1tYXJ5Q2hpbGRjYXJlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICsgXCInLCAnXCIgKyBzdWl0YWJpbGl0eUZvcm0uc3VtbWFyeUhlYWx0aFxyXG4gICAgICAgICAgICAgICAgICAgICAgICArIFwiJywgJ1wiICsgc3VpdGFiaWxpdHlGb3JtLnN1bW1hcnlPdGhlclxyXG4gICAgICAgICAgICAgICAgICAgICAgICArIFwiJywgJ1wiICsgc3VpdGFiaWxpdHlGb3JtLmRiVG90YWxQb2ludHMgKyBcIidcIjtcclxuICAgICAgICAgICAgICAgICAgICBuZXcgc3FsLlJlcXVlc3QoY29ubmVjdGlvbilcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnF1ZXJ5KFwiSU5TRVJUIElOVE8gU3VpdGFiaWxpdHlGb3JtIFZBTFVFUyAoXCIgKyBzdWl0YWJpbGl0eUZvcm1RdWVyeSArIFwiKVwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICBuZXcgc3FsLlJlcXVlc3QoY29ubmVjdGlvbilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnF1ZXJ5KFwiVVBEQVRFIENsaWVudHMgU0VUIHN1aXRhYmlsaXR5ID0gJ2ZhbHNlJyBXSEVSRSB1c2VySUQgPSBcIiArIF9pZCArIFwiXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcy5zZW5kKHtcInN1Y2Nlc3NcIjogXCJzdWNjZXNzXCJ9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkuY2F0Y2goKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSkuY2F0Y2goKTtcclxuICAgICAgICAgICAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGVycikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzLnNlbmQoeyBcImVycm9yXCI6IFwiZXJyb3JcIiB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlKTtcclxuICAgICAgICAgICAgICAgICAgcmVzLnNlbmQoeyBcImVycm9yXCI6IFwiZXJyb3IgaW4geW91ciByZXF1ZXN0XCIgfSk7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG5cclxuICAgIHVwZGF0ZShyZXE6IGV4cHJlc3MuUmVxdWVzdCwgcmVzOiBleHByZXNzLlJlc3BvbnNlKTogdm9pZCB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgbmV3IEF1dGhDb250cm9sbGVyKCkuYXV0aFVzZXIocmVxLCByZXMsIHtcclxuICAgICAgICAgICAgICAgIHJlcXVpcmVkQXV0aDogYXV0aCwgZG9uZTogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGNsaWVudCA9IHJlcS5ib2R5O1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBfaWQ6IHN0cmluZyA9IHJlcS5wYXJhbXMuX2lkO1xyXG4gICAgICAgICAgICAgICAgICAgIHNxbC5jb25uZWN0KGNvbmZpZylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24oY29ubmVjdGlvbikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3IHNxbC5SZXF1ZXN0KGNvbm5lY3Rpb24pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnF1ZXJ5KFwiVVBEQVRFIENsaWVudHMgU0VUIGZpcnN0TmFtZT0nXCIgKyBjbGllbnQuZmlyc3ROYW1lICsgXCInLCBsYXN0TmFtZT0nXCIgKyBjbGllbnQubGFzdE5hbWUgKyBcIicsIGJpcnRoZGF0ZT0nXCIgKyBjbGllbnQuYmlydGhkYXkgKyBcIicsIHBob25lPSdcIiArIGNsaWVudC5waG9uZSArIFwiJyBXSEVSRSBjbGllbnRJRCA9ICdcIiArIF9pZCArIFwiJ1wiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKHJlY29yZHNldCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXMuc2VuZCh7IFwic3VjY2Vzc1wiOiBcInN1Y2Nlc3NcIiB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbihlcnIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzLnNlbmQoeyBcImVycm9yXCI6IFwiZXJyb3JcIiB9KTsgY29uc29sZS5sb2coXCJVcGRhdGUgY2xpZW50IFwiICsgZXJyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzLnNlbmQoeyBcImVycm9yXCI6IFwiZXJyb3JcIiB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlKTtcclxuICAgICAgICAgICAgcmVzLnNlbmQoeyBcImVycm9yXCI6IFwiZXJyb3IgaW4geW91ciByZXF1ZXN0XCIgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZUJhbm5lckNhbUJvb2wocmVxOiBleHByZXNzLlJlcXVlc3QsIHJlczogZXhwcmVzcy5SZXNwb25zZSk6IHZvaWQge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIG5ldyBBdXRoQ29udHJvbGxlcigpLmF1dGhVc2VyKHJlcSwgcmVzLCB7XHJcbiAgICAgICAgICAgICAgICByZXF1aXJlZEF1dGg6IGF1dGgsIGRvbmU6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBjbGllbnQgPSByZXEuYm9keTtcclxuICAgICAgICAgICAgICAgICAgICBzcWwuY29ubmVjdChjb25maWcpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKGNvbm5lY3Rpb24pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBzcWwuUmVxdWVzdChjb25uZWN0aW9uKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5xdWVyeShcIlVQREFURSBDbGllbnRzIFNFVCBiYW5uZXI9J1wiICsgY2xpZW50LmJhbm5lciArIFwiJywgY2FtPSdcIiArIGNsaWVudC5jYW0gKyBcIicgV0hFUkUgY2xpZW50SUQgPSAnXCIgKyBjbGllbnQuY2xpZW50SUQgKyBcIidcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbihyZWNvcmRzZXQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzLnNlbmQoeyBcInN1Y2Nlc3NcIjogXCJzdWNjZXNzXCIgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcy5zZW5kKHsgXCJlcnJvclwiOiBcImVycm9yXCIgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiVXBkYXRlIGJhbm5lciBhbmQgY2FtIGJvb2xlYW5zIFwiICsgZXJyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzLnNlbmQoeyBcImVycm9yXCI6IFwiZXJyb3JcIiB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlKTtcclxuICAgICAgICAgICAgcmVzLnNlbmQoeyBcImVycm9yXCI6IFwiZXJyb3IgaW4geW91ciByZXF1ZXN0XCIgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZVN1aXRhYmlsaXR5KHJlcTogZXhwcmVzcy5SZXF1ZXN0LCByZXM6IGV4cHJlc3MuUmVzcG9uc2UpOiB2b2lkIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBuZXcgQXV0aENvbnRyb2xsZXIoKS5hdXRoVXNlcihyZXEsIHJlcywge1xyXG4gICAgICAgICAgICAgICAgcmVxdWlyZWRBdXRoOiBhdXRoLCBkb25lOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgc3VpdGFiaWxpdHkgPSByZXEuYm9keTtcclxuICAgICAgICAgICAgICAgICAgICBzcWwuY29ubmVjdChjb25maWcpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKGNvbm5lY3Rpb24pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgcXVlcnkgPSBcIlVQREFURSBTdWl0YWJpbGl0eUZvcm0gU0VUIHRyYW5zY3JpcHQ9J1wiICsgc3VpdGFiaWxpdHkudHJhbnNjcmlwdFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICsgXCInLCBjb3Vyc2VzPSdcIiArIHN1aXRhYmlsaXR5LmNvdXJzZXNcclxuICAgICAgICAgICAgICAgICAgICAgICAgICArIFwiJywgZ29hbD0nXCIgKyBzdWl0YWJpbGl0eS5nb2FsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKyBcIicsIHRyYW5zaXRpb25EYXRlPSdcIiArIHN1aXRhYmlsaXR5LnRyYW5zaXRpb25EYXRlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKyBcIicsIGdvdmVybm1lbnRJRD0nXCIgKyBzdWl0YWJpbGl0eS5nb3Zlcm5tZW50SURcclxuICAgICAgICAgICAgICAgICAgICAgICAgICArIFwiJywgYXBwcm9wcmlhdGVHb2FsPSdcIiArIHN1aXRhYmlsaXR5LmFwcHJvcHJpYXRlR29hbFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICsgXCInLCBpc1ZhbGlkQWdlPSdcIiArIHN1aXRhYmlsaXR5LmlzVmFsaWRBZ2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICArIFwiJywgc2Nob29sUmVnaXN0cmF0aW9uPSdcIiArIHN1aXRhYmlsaXR5LnNjaG9vbFJlZ2lzdHJhdGlvblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICsgXCInLCBhdmFpbGFibGVEdXJpbmdDbGFzcz0nXCIgKyBzdWl0YWJpbGl0eS5hdmFpbGFibGVEdXJpbmdDbGFzc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICsgXCInLCBsYXN0R3JhZGU9J1wiICsgc3VpdGFiaWxpdHkubGFzdEdyYWRlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKyBcIicsIGxldmVsPSdcIiArIHN1aXRhYmlsaXR5LmxldmVsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKyBcIicsIG9mZmVyU3RhcnREYXRlPSdcIiArIHN1aXRhYmlsaXR5Lm9mZmVyU3RhcnREYXRlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKyBcIicsIG1lZXRzR29hbD0nXCIgKyBzdWl0YWJpbGl0eS5tZWV0c0dvYWxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICArIFwiJywgdGltZU91dE9mU2Nob29sPSdcIiArIHN1aXRhYmlsaXR5LnRpbWVPdXRPZlNjaG9vbFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICsgXCInLCBpblByb2dyYW1CZWZvcmU9J1wiICsgc3VpdGFiaWxpdHkuaW5Qcm9ncmFtQmVmb3JlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKyBcIicsIGVtcGxveW1lbnQ9J1wiICsgc3VpdGFiaWxpdHkuZW1wbG95bWVudFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICsgXCInLCBpbmNvbWVTb3VyY2U9J1wiICsgc3VpdGFiaWxpdHkuaW5jb21lU291cmNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKyBcIicsIGFnZVJhbmdlPSdcIiArIHN1aXRhYmlsaXR5LmFnZVJhbmdlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKyBcIicsIGhvdXJzUGVyV2Vlaz0nXCIgKyBzdWl0YWJpbGl0eS5ob3Vyc1BlcldlZWtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICArIFwiJywgd29ya0hpc3Rvcnk9J1wiICsgc3VpdGFiaWxpdHkud29ya0hpc3RvcnlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICArIFwiJywgZmFjdG9ySGVhbHRoPSdcIiArIHN1aXRhYmlsaXR5LmZhY3RvckhlYWx0aFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICsgXCInLCBmYWN0b3JJbnN0cnVjdGlvbnM9J1wiICsgc3VpdGFiaWxpdHkuZmFjdG9ySW5zdHJ1Y3Rpb25zXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKyBcIicsIGZhY3RvckNvbW11bmljYXRpb249J1wiICsgc3VpdGFiaWxpdHkuZmFjdG9yQ29tbXVuaWNhdGlvblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICsgXCInLCBmYWN0b3JMYW5ndWFnZT0nXCIgKyBzdWl0YWJpbGl0eS5mYWN0b3JMYW5ndWFnZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICsgXCInLCBmYWN0b3JDb21wdXRlcj0nXCIgKyBzdWl0YWJpbGl0eS5mYWN0b3JDb21wdXRlclxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICsgXCInLCBmYWN0b3JIb3VzaW5nPSdcIiArIHN1aXRhYmlsaXR5LmZhY3RvckhvdXNpbmdcclxuICAgICAgICAgICAgICAgICAgICAgICAgICArIFwiJywgZmFjdG9yVHJhbnNwb3J0YXRpb249J1wiICsgc3VpdGFiaWxpdHkuZmFjdG9yVHJhbnNwb3J0YXRpb25cclxuICAgICAgICAgICAgICAgICAgICAgICAgICArIFwiJywgZmFjdG9yRGF5Y2FyZT0nXCIgKyBzdWl0YWJpbGl0eS5mYWN0b3JEYXljYXJlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKyBcIicsIGZhY3RvckludGVybmV0PSdcIiArIHN1aXRhYmlsaXR5LmZhY3RvckludGVybmV0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKyBcIicsIGZhY3RvclBlcnNvbmFsPSdcIiArIHN1aXRhYmlsaXR5LmZhY3RvclBlcnNvbmFsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKyBcIicsIGZhY3Rvck90aGVyPSdcIiArIHN1aXRhYmlsaXR5LmZhY3Rvck90aGVyXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKyBcIicsIHN1bW1hcnlUcmFuc3BvcnRhdGlvbj0nXCIgKyBzdWl0YWJpbGl0eS5zdW1tYXJ5VHJhbnNwb3J0YXRpb25cclxuICAgICAgICAgICAgICAgICAgICAgICAgICArIFwiJywgc3VtbWFyeUNoaWxkY2FyZT0nXCIgKyBzdWl0YWJpbGl0eS5zdW1tYXJ5Q2hpbGRjYXJlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKyBcIicsIHN1bW1hcnlIZWFsdGg9J1wiICsgc3VpdGFiaWxpdHkuc3VtbWFyeUhlYWx0aFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICsgXCInLCBzdW1tYXJ5T3RoZXI9J1wiICsgc3VpdGFiaWxpdHkuc3VtbWFyeU90aGVyXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKyBcIicsIHBvaW50cz0nXCIgKyBzdWl0YWJpbGl0eS5wb2ludHNcclxuICAgICAgICAgICAgICAgICAgICAgICAgICArIFwiJyBXSEVSRSBzdWl0YWJpbGl0eUlEID0gJ1wiICsgc3VpdGFiaWxpdHkuc3VpdGFiaWxpdHlJRCArXCInXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBzcWwuUmVxdWVzdChjb25uZWN0aW9uKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5xdWVyeShxdWVyeSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbihyZWNvcmRzZXQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzLnNlbmQoeyBcInN1Y2Nlc3NcIjogXCJzdWNjZXNzXCIgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcy5zZW5kKHsgXCJlcnJvclwiOiBcImVycm9yXCIgfSk7IGNvbnNvbGUubG9nKFwiVXBkYXRlIHN1aXRhYmlsaXR5IFwiICsgZXJyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzLnNlbmQoeyBcImVycm9yXCI6IFwiZXJyb3JcIiB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlKTtcclxuICAgICAgICAgICAgcmVzLnNlbmQoeyBcImVycm9yXCI6IFwiZXJyb3IgaW4geW91ciByZXF1ZXN0XCIgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGRlbGV0ZShyZXE6IGV4cHJlc3MuUmVxdWVzdCwgcmVzOiBleHByZXNzLlJlc3BvbnNlKTogdm9pZCB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgbmV3IEF1dGhDb250cm9sbGVyKCkuYXV0aFVzZXIocmVxLCByZXMsIHtcclxuICAgICAgICAgICAgICAgIHJlcXVpcmVkQXV0aDogYXV0aCwgZG9uZTogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIF9pZDogc3RyaW5nID0gcmVxLnBhcmFtcy5faWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgc3FsLmNvbm5lY3QoY29uZmlnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbihjb25uZWN0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXcgc3FsLlJlcXVlc3QoY29ubmVjdGlvbilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucXVlcnkoXCJERUxFVEUgRlJPTSBDbGllbnRzIFdIRVJFIHVzZXJJRCA9ICdcIiArIF9pZCArIFwiJ1wiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXcgc3FsLlJlcXVlc3QoY29ubmVjdGlvbilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5xdWVyeShcIkRFTEVURSBGUk9NIFVzZXJzIFdIRVJFIHVzZXJJRCA9ICdcIiArIF9pZCArIFwiJ1wiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzLnNlbmQoeyBcInN1Y2Nlc3NcIjogXCJzdWNjZXNzXCIgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbihlcnIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXMuc2VuZCh7IFwiZXJyb3JcIjogXCJlcnJvclwiIH0pOyBjb25zb2xlLmxvZyhcIkRlbGV0ZSB1c2VyIHdpdGggaWQgXCIgKyBfaWQgKyBcIi4gXCIgKyBlcnIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcy5zZW5kKHsgXCJlcnJvclwiOiBcImVycm9yXCIgfSk7IGNvbnNvbGUubG9nKFwiRGVsZXRlIGNsaWVudCB3aXRoIGlkIFwiICsgX2lkICsgXCIuIFwiICsgZXJyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGVycikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcy5zZW5kKHsgXCJlcnJvclwiOiBcImVycm9yXCIgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coZSk7XHJcbiAgICAgICAgICAgIHJlcy5zZW5kKHsgXCJlcnJvclwiOiBcImVycm9yIGluIHlvdXIgcmVxdWVzdFwiIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZW1vdmVGcm9tVGFibGUocmVxOiBleHByZXNzLlJlcXVlc3QsIHJlczogZXhwcmVzcy5SZXNwb25zZSk6IHZvaWQge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIG5ldyBBdXRoQ29udHJvbGxlcigpLmF1dGhVc2VyKHJlcSwgcmVzLCB7XHJcbiAgICAgICAgICAgICAgICByZXF1aXJlZEF1dGg6IGF1dGgsIGRvbmU6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBfaWQ6IHN0cmluZyA9IHJlcS5wYXJhbXMuX2lkO1xyXG4gICAgICAgICAgICAgICAgICAgIHNxbC5jb25uZWN0KGNvbmZpZylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24oY29ubmVjdGlvbikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3IHNxbC5SZXF1ZXN0KGNvbm5lY3Rpb24pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnF1ZXJ5KFwiREVMRVRFIEZST00gQ2xpZW50cyBXSEVSRSB1c2VySUQgPSAnXCIgKyBfaWQgKyBcIidcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3IHNxbC5SZXF1ZXN0KGNvbm5lY3Rpb24pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucXVlcnkoXCJVUERBVEUgVXNlcnMgU0VUIHVzZXJUeXBlPSAnU3R1ZGVudCcgV0hFUkUgdXNlcklEID0gJ1wiICsgX2lkICsgXCInXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXMuc2VuZCh7IFwic3VjY2Vzc1wiOiBcInN1Y2Nlc3NcIiB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGVycikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcy5zZW5kKHsgXCJlcnJvclwiOiBcImVycm9yXCIgfSk7IGNvbnNvbGUubG9nKFwiVXBkYXRlIHVzZXIgdXNlclR5cGUgXCIgKyBlcnIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcy5zZW5kKHsgXCJlcnJvclwiOiBcImVycm9yXCIgfSk7IGNvbnNvbGUubG9nKFwiRGVsZXRlIGZvcm0gY2xpZW50IHRhYmxlIHdpdGggaWQgXCIgKyBfaWQgKyBcIi4gXCIgKyBlcnIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbihlcnIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXMuc2VuZCh7IFwiZXJyb3JcIjogXCJlcnJvclwiIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGUpO1xyXG4gICAgICAgICAgICByZXMuc2VuZCh7IFwiZXJyb3JcIjogXCJlcnJvciBpbiB5b3VyIHJlcXVlc3RcIiB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0cmlldmUocmVxOiBleHByZXNzLlJlcXVlc3QsIHJlczogZXhwcmVzcy5SZXNwb25zZSk6IHZvaWQge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIG5ldyBBdXRoQ29udHJvbGxlcigpLmF1dGhVc2VyKHJlcSwgcmVzLCB7XHJcbiAgICAgICAgICAgICAgICByZXF1aXJlZEF1dGg6IGF1dGgsIGRvbmU6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHNxbC5jb25uZWN0KGNvbmZpZylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24oY29ubmVjdGlvbikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3IHNxbC5SZXF1ZXN0KGNvbm5lY3Rpb24pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnF1ZXJ5KCdTRUxFQ1QgQ2xpZW50cy4qLCBVc2Vycy5lbWFpbCwgVXNlcnMuYWN0aXZlIGZyb20gQ2xpZW50cyBMZWZ0IEpPSU4gVXNlcnMgT04gQ2xpZW50cy51c2VySUQgPSBVc2Vycy51c2VySUQnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKGNsaWVudHMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3IHNxbC5SZXF1ZXN0KGNvbm5lY3Rpb24pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucXVlcnkoJ1NFTEVDVCAqIEZST00gU3VpdGFiaWxpdHlGb3JtJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKHN1aXRhYmlsaXR5Rm9ybXMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXcgc3FsLlJlcXVlc3QoY29ubmVjdGlvbilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnF1ZXJ5KCdTRUxFQ1QgKiBGUk9NIENvbnNlbnQnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbihjb25zZW50Rm9ybXMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBzcWwuUmVxdWVzdChjb25uZWN0aW9uKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5xdWVyeSgnU0VMRUNUICogRlJPTSBMZWFybmluZ1N0eWxlJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbihsZWFybmluZ1N0eWxlRm9ybXMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzLnNlbmQoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xpZW50czogY2xpZW50cyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1aXRhYmlsaXR5Rm9ybXM6IHN1aXRhYmlsaXR5Rm9ybXMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zZW50Rm9ybXM6IGNvbnNlbnRGb3JtcyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxlYXJuaW5nU3R5bGVGb3JtczogbGVhcm5pbmdTdHlsZUZvcm1zXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGVycikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXMuc2VuZCh7IFwiZXJyb3JcIjogXCJlcnJvclwiIH0pOyBjb25zb2xlLmxvZyhcIkdldCBsZWFybmluZ1N0eWxlRm9ybXMgXCIgKyBlcnIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbihlcnIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcy5zZW5kKHsgXCJlcnJvclwiOiBcImVycm9yXCIgfSk7IGNvbnNvbGUubG9nKFwiR2V0IGNvbnNlbnRGb3JtcyBcIiArIGVycik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzLnNlbmQoeyBcImVycm9yXCI6IFwiZXJyb3JcIiB9KTsgY29uc29sZS5sb2coXCJHZXQgc3VpdGFiaWxpdHlGb3JtcyBcIiArIGVycik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbihlcnIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzLnNlbmQoeyBcImVycm9yXCI6IFwiZXJyb3JcIiB9KTsgY29uc29sZS5sb2coXCJHZXQgY2xpZW50cyBcIiArIGVycik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGVycikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcy5zZW5kKHsgXCJlcnJvclwiOiBcImVycm9yXCIgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coZSk7XHJcbiAgICAgICAgICAgIHJlcy5zZW5kKHsgXCJlcnJvclwiOiBcImVycm9yIGluIHlvdXIgcmVxdWVzdFwiIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmaW5kQnlJZChyZXE6IGV4cHJlc3MuUmVxdWVzdCwgcmVzOiBleHByZXNzLlJlc3BvbnNlKTogdm9pZCB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgbmV3IEF1dGhDb250cm9sbGVyKCkuYXV0aFVzZXIocmVxLCByZXMsIHtcclxuICAgICAgICAgICAgICAgIHJlcXVpcmVkQXV0aDogW1wiQWRtaW5cIiwgXCJTdGFmZlwiLCBcIkNsaWVudFwiXSwgZG9uZTogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIF9pZDogc3RyaW5nID0gcmVxLnBhcmFtcy5faWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgc3FsLmNvbm5lY3QoY29uZmlnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbihjb25uZWN0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXcgc3FsLlJlcXVlc3QoY29ubmVjdGlvbilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucXVlcnkoXCJTRUxFQ1QgKiBGUk9NIENsaWVudHMgV0hFUkUgdXNlcklEID0gJ1wiICsgX2lkICsgXCInXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24oY2xpZW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcy5zZW5kKHsgY2xpZW50OiBjbGllbnQgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiR2V0IGNsaWVudCBieSBpZCBcIiArIGVycik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcy5zZW5kKHsgXCJlcnJvclwiOiBcImVycm9yXCIgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGVycikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcy5zZW5kKHsgXCJlcnJvclwiOiBcImVycm9yXCIgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coZSk7XHJcbiAgICAgICAgICAgIHJlcy5zZW5kKHsgXCJlcnJvclwiOiBcImVycm9yIGluIHlvdXIgcmVxdWVzdFwiIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbn1cclxuZXhwb3J0ID0gQ2xpZW50Q29udHJvbGxlcjtcclxuIl19
