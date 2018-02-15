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
                                if (client.email === "BA.ACP@georgiancollege.ca" || client.email === "OR.ACP@georgiancollege.ca" || client.email === "OS.ACP@georgiancollege.ca") {
                                    //send message
                                }
                                else {
                                    if (user.email === client.email) {
                                        validated = false;
                                        error = "email in use";
                                        break;
                                    }
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NlcnZlci9zcmMvY29udHJvbGxlcnMvQ2xpZW50Q29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBRUEsK0JBQWtDO0FBQ2xDLDhEQUFpRTtBQUNqRSxJQUFNLFdBQVcsR0FBRyxPQUFPLENBQUMseUJBQXlCLENBQUMsQ0FBQztBQUN2RCxJQUFJLEdBQUcsR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDM0IsSUFBSSxJQUFJLEdBQUcsQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUM7QUFFOUIsSUFBSSxNQUFNLEdBQUcsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDO0FBQ2xDLE1BQU0sR0FBRyxNQUFNLENBQUMsRUFBRSxDQUFDO0FBRW5CO0lBQUE7SUFraEJBLENBQUM7SUFoaEJDLGlDQUFNLEdBQU4sVUFBTyxHQUFvQixFQUFFLEdBQXFCO1FBQ2hELElBQUksQ0FBQztZQUNILElBQUksY0FBYyxFQUFFLENBQUMsUUFBUSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUU7Z0JBQ3RDLFlBQVksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFO29CQUN4QixJQUFJLFlBQVksR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUN4RCxZQUFZLEdBQUcsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLEVBQUUsR0FBRyxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUM1RSxJQUFJLElBQUksR0FBRyxNQUFNLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxDQUFDO29CQUNsQyxrQ0FBa0M7b0JBQ2xDLElBQUksUUFBUSxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxDQUFDO29CQUNuRCxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0s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TyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQzt3QkFDakIsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsQ0FBQyxDQUFDO29CQUNqQyxDQUFDLENBQUMsQ0FBQztnQkFDUCxDQUFDO2FBQ0YsQ0FBQyxDQUFDO1FBQ0wsQ0FBQztRQUNELEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDVCxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2YsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxDQUFDLENBQUM7UUFDakQsQ0FBQztJQUNILENBQUM7SUFFSCx1QkFBQztBQUFELENBbGhCQSxBQWtoQkMsSUFBQTtBQUNELGlCQUFTLGdCQUFnQixDQUFDIiwiZmlsZSI6ImNvbnRyb2xsZXJzL0NsaWVudENvbnRyb2xsZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgZXhwcmVzcyA9IHJlcXVpcmUoXCJleHByZXNzXCIpO1xyXG5pbXBvcnQgand0ID0gcmVxdWlyZSgnanNvbndlYnRva2VuJyk7XHJcbmltcG9ydCBiY3J5cHQgPSByZXF1aXJlKCdiY3J5cHQnKTtcclxuaW1wb3J0IEF1dGhDb250cm9sbGVyID0gcmVxdWlyZShcIi4uL2NvbnRyb2xsZXJzL0F1dGhDb250cm9sbGVyXCIpO1xyXG5jb25zdCBNYWlsU2VydmljZSA9IHJlcXVpcmUoXCIuLi9zZXJ2aWNlcy9NYWlsU2VydmljZVwiKTtcclxudmFyIHNxbCA9IHJlcXVpcmUoJ21zc3FsJyk7XHJcbnZhciBhdXRoID0gW1wiQWRtaW5cIiwgXCJTdGFmZlwiXTtcclxuXHJcbnZhciBjb25maWcgPSByZXF1aXJlKCcuLi9jb25maWcnKTtcclxuY29uZmlnID0gY29uZmlnLmRiO1xyXG5cclxuY2xhc3MgQ2xpZW50Q29udHJvbGxlciB7XHJcblxyXG4gIGNyZWF0ZShyZXE6IGV4cHJlc3MuUmVxdWVzdCwgcmVzOiBleHByZXNzLlJlc3BvbnNlKTogdm9pZCB7XHJcbiAgICB0cnkge1xyXG4gICAgICBuZXcgQXV0aENvbnRyb2xsZXIoKS5hdXRoVXNlcihyZXEsIHJlcywge1xyXG4gICAgICAgIHJlcXVpcmVkQXV0aDogYXV0aCwgZG9uZTogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICB2YXIgcmFuZG9tc3RyaW5nID0gTWF0aC5yYW5kb20oKS50b1N0cmluZygzNikuc2xpY2UoLTgpO1xyXG4gICAgICAgICAgcmFuZG9tc3RyaW5nID0gcmFuZG9tc3RyaW5nLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgcmFuZG9tc3RyaW5nLnNsaWNlKDEpO1xyXG4gICAgICAgICAgdmFyIHNhbHQgPSBiY3J5cHQuZ2VuU2FsdFN5bmMoMTApO1xyXG4gICAgICAgICAgLy8gSGFzaCB0aGUgcGFzc3dvcmQgd2l0aCB0aGUgc2FsdFxyXG4gICAgICAgICAgdmFyIHBhc3N3b3JkID0gYmNyeXB0Lmhhc2hTeW5jKHJhbmRvbXN0cmluZywgc2FsdCk7XHJcbiAgICAgICAgICByZXEuYm9keS5jbGllbnQucGFzc3dvcmQgPSBwYXNzd29yZDtcclxuICAgICAgICAgIHZhciBjbGllbnQgPSByZXEuYm9keS5jbGllbnQ7XHJcbiAgICAgICAgICBjbGllbnQudXNlcm5hbWUgPSBjbGllbnQuZmlyc3ROYW1lICsgY2xpZW50Lmxhc3ROYW1lO1xyXG4gICAgICAgICAgY2xpZW50LnVzZXJuYW1lID0gY2xpZW50LnVzZXJuYW1lLnRvTG93ZXJDYXNlKCk7XHJcbiAgICAgICAgICBjbGllbnQudXNlcm5hbWUgPSBjbGllbnQudXNlcm5hbWUucmVwbGFjZSgvXFxzKy9nLCAnJyk7XHJcbiAgICAgICAgICB2YXIgc3VpdGFiaWxpdHlGb3JtID0gcmVxLmJvZHkuc3VpdGFiaWxpdHlGb3JtO1xyXG5cclxuICAgICAgICAgIHNxbC5jb25uZWN0KGNvbmZpZylcclxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24oY29ubmVjdGlvbikge1xyXG4gICAgICAgICAgICAgIG5ldyBzcWwuUmVxdWVzdChjb25uZWN0aW9uKVxyXG4gICAgICAgICAgICAgICAgLnF1ZXJ5KFwiU0VMRUNUICogRlJPTSBVc2Vyc1wiKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24odXNlcnMpIHtcclxuICAgICAgICAgICAgICAgICAgdmFyIHZhbGlkYXRlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgIHZhciBlcnJvcjtcclxuICAgICAgICAgICAgICAgICAgdmFyIHJlID0gL14oKFtePD4oKVtcXF1cXFxcLiw7Olxcc0BcXFwiXSsoXFwuW148PigpW1xcXVxcXFwuLDs6XFxzQFxcXCJdKykqKXwoXFxcIi4rXFxcIikpQCgoXFxbWzAtOV17MSwzfVxcLlswLTldezEsM31cXC5bMC05XXsxLDN9XFwuWzAtOV17MSwzfVxcXSl8KChbYS16QS1aXFwtMC05XStcXC4pK1thLXpBLVpdezIsfSkpJC87XHJcbiAgICAgICAgICAgICAgICAgIHZhciBlbWFpbFZhbGlkYXRpb24gPSByZS50ZXN0KGNsaWVudC5lbWFpbCk7XHJcbiAgICAgICAgICAgICAgICAgIGZvciAobGV0IHVzZXIgb2YgdXNlcnMpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodXNlci51c2VybmFtZSA9PT0gY2xpZW50LnVzZXJuYW1lKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICB2YWxpZGF0ZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgIGVycm9yID0gXCJ1c2VybmFtZSBpbiB1c2VcIjtcclxuICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAoY2xpZW50LmVtYWlsID09PSBcIkJBLkFDUEBnZW9yZ2lhbmNvbGxlZ2UuY2FcIiB8fCBjbGllbnQuZW1haWwgPT09IFwiT1IuQUNQQGdlb3JnaWFuY29sbGVnZS5jYVwiIHx8IGNsaWVudC5lbWFpbCA9PT0gXCJPUy5BQ1BAZ2VvcmdpYW5jb2xsZWdlLmNhXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgIC8vc2VuZCBtZXNzYWdlXHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgIGlmICh1c2VyLmVtYWlsID09PSBjbGllbnQuZW1haWwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsaWRhdGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yID0gXCJlbWFpbCBpbiB1c2VcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgIGlmICghZW1haWxWYWxpZGF0aW9uICYmIHZhbGlkYXRlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbGlkYXRlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIGVycm9yID0gXCJpbmNvcnJlY3QgZW1haWwgZm9ybWF0XCI7XHJcbiAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgaWYgKHZhbGlkYXRlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBhY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICBuZXcgc3FsLlJlcXVlc3QoY29ubmVjdGlvbilcclxuICAgICAgICAgICAgICAgICAgICAgIC5xdWVyeShcIklOU0VSVCBJTlRPIFVzZXJzIFZBTFVFUyAoJ1wiICsgY2xpZW50LnVzZXJuYW1lICsgXCInLCdcIiArIGNsaWVudC5lbWFpbCArIFwiJywnXCIgKyBjbGllbnQucGFzc3dvcmQgKyBcIicsJ0NsaWVudCcsJ1wiICsgYWN0aXZlICsgXCInKVwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBzcWwuUmVxdWVzdChjb25uZWN0aW9uKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5xdWVyeShcIlNFTEVDVCB1c2VySUQgRlJPTSBVc2VycyBXSEVSRSB1c2VybmFtZSA9ICdcIiArIGNsaWVudC51c2VybmFtZSArIFwiJyBBTkQgcGFzc3dvcmQgPSAnXCIgKyBjbGllbnQucGFzc3dvcmQgKyBcIidcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbihpZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNsaWVudC5va2F5VG9UZXh0ID09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xpZW50Lm9rYXlUb1RleHQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoY2xpZW50LmFsdGVybmF0ZU51bWJlciA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsaWVudC5hbHRlcm5hdGVOdW1iZXIgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjbGllbnRRdWVyeSA9IFwiJ1wiICsgaWRbMF0udXNlcklEICsgXCInLCAnXCIgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGllbnQuZmlyc3ROYW1lICsgXCInLCAnXCIgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGllbnQubGFzdE5hbWUgKyBcIicsICdcIiArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsaWVudC5pbnF1aXJ5RGF0ZSArIFwiJywgJ1wiICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xpZW50LmJpcnRoZGF5ICsgXCInLCAnXCIgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGllbnQucGhvbmUgKyBcIicsICdcIiArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsaWVudC5hbGxvd0RldGFpbGVkTWVzc2FnZSArIFwiJywgJ1wiICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xpZW50Lm9rYXlUb1RleHQgKyBcIicsICdcIiArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsaWVudC5hbHRlcm5hdGVOdW1iZXIgKyBcIicsICdcIiArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsaWVudC5hbGxvd0RldGFpbGVkTWVzc2FnZUFsdGVybmF0ZSArIFwiJywgJ1wiICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xpZW50Lm9rYXlUb1RleHRBbHRlcm5hdGUgKyBcIicsICdcIiArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRydWUgKyBcIicsICdcIiArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRydWUgKyBcIicsICdcIiArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRydWUgKyBcIicsICdcIiArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZhbHNlICsgXCInLCAnXCIgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmYWxzZSArIFwiJywgJ1wiICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xpZW50LmNvbW1lbnRzICsgXCInLCAnXCIgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGllbnQuc3R1ZGVudE51bWJlciArIFwiJ1wiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gc2V0dXAgZW1haWwgZGF0YSB3aXRoIHVuaWNvZGUgc3ltYm9sc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgbWFpbE9wdGlvbnMgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZnJvbTogJ1wiR2VvcmdpYW4gQWNhZGVtaWMgJiBDYXJlZXIgUHJlcFwiJywgLy8gc2VuZGVyIGFkZHJlc3NcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0bzogY2xpZW50LmVtYWlsLCAvLyBsaXN0IG9mIHJlY2VpdmVyc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1YmplY3Q6ICdXZWxjb21lLCAnICsgY2xpZW50LmZpcnN0TmFtZSwgLy8gU3ViamVjdCBsaW5lXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dDogJycsIC8vIHBsYWluIHRleHQgYm9keVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGh0bWw6ICdZb3VyIHVzZXJuYW1lIGlzIDxiPicgKyBjbGllbnQudXNlcm5hbWUgKyAnPC9iPiBhbmQgeW91ciB0ZW1wb3JhcnkgcGFzc3dvcmQgaXM6IDxiPicgKyByYW5kb21zdHJpbmcgKyAnPC9iPjxiciAvPiBQbGVhc2UgbG9naW4gYXQgaHR0cDovL2dlb3JnaWFuYXBwLmF6dXJld2Vic2l0ZXMubmV0IGFuZCBjb21wbGV0ZSB0aGUgcmVxdWlyZWQgZm9ybXMuIDxiciAvPjxiciAvPiBUaGFua3lvdScgLy8gaHRtbCBib2R5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXcgTWFpbFNlcnZpY2UoKS5zZW5kTWVzc2FnZShcIldlbGNvbWUgTWVzc2FnZVwiLCBtYWlsT3B0aW9ucyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBzcWwuUmVxdWVzdCgpLnF1ZXJ5KFwiSU5TRVJUIElOVE8gQ2xpZW50cyBWQUxVRVMgKFwiICsgY2xpZW50UXVlcnkgKyBcIilcIikudGhlbihmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKE9iamVjdC5rZXlzKHN1aXRhYmlsaXR5Rm9ybSkubGVuZ3RoICE9IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgc3VpdGFiaWxpdHlGb3JtUXVlcnkgPSBcIidcIiArIGlkWzBdLnVzZXJJRFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKyBcIicsICdcIiArIHN1aXRhYmlsaXR5Rm9ybS50cmFuc2NyaXB0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICArIFwiJywgJ1wiICsgc3VpdGFiaWxpdHlGb3JtLmNvdXJzZXNcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICsgXCInLCAnXCIgKyBzdWl0YWJpbGl0eUZvcm0uZ29hbFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKyBcIicsICdcIiArIHN1aXRhYmlsaXR5Rm9ybS50cmFuc2l0aW9uRGF0ZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKyBcIicsICdcIiArIHN1aXRhYmlsaXR5Rm9ybS5nb3Zlcm5tZW50SURcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICsgXCInLCAnXCIgKyBzdWl0YWJpbGl0eUZvcm0uYXBwcm9wcmlhdGVHb2FsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICArIFwiJywgJ1wiICsgc3VpdGFiaWxpdHlGb3JtLmlzVmFsaWRBZ2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICsgXCInLCAnXCIgKyBzdWl0YWJpbGl0eUZvcm0uc2Nob29sUmVnaXN0cmF0aW9uXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICArIFwiJywgJ1wiICsgc3VpdGFiaWxpdHlGb3JtLmF2YWlsYWJsZUR1cmluZ0NsYXNzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICArIFwiJywgJ1wiICsgc3VpdGFiaWxpdHlGb3JtLmxhc3RHcmFkZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKyBcIicsICdcIiArIHN1aXRhYmlsaXR5Rm9ybS5sZXZlbFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKyBcIicsICdcIiArIHN1aXRhYmlsaXR5Rm9ybS5vZmZlclN0YXJ0RGF0ZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKyBcIicsICdcIiArIHN1aXRhYmlsaXR5Rm9ybS5tZWV0c0dvYWxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICsgXCInLCAnXCIgKyBzdWl0YWJpbGl0eUZvcm0udGltZU91dE9mU2Nob29sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICArIFwiJywgJ1wiICsgc3VpdGFiaWxpdHlGb3JtLmluUHJvZ3JhbUJlZm9yZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKyBcIicsICdcIiArIHN1aXRhYmlsaXR5Rm9ybS5lbXBsb3ltZW50XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICArIFwiJywgJ1wiICsgc3VpdGFiaWxpdHlGb3JtLmluY29tZVNvdXJjZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKyBcIicsICdcIiArIHN1aXRhYmlsaXR5Rm9ybS5hZ2VSYW5nZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKyBcIicsICdcIiArIHN1aXRhYmlsaXR5Rm9ybS5ob3Vyc1BlcldlZWtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICsgXCInLCAnXCIgKyBzdWl0YWJpbGl0eUZvcm0ud29ya0hpc3RvcnlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICsgXCInLCAnXCIgKyBzdWl0YWJpbGl0eUZvcm0uZmFjdG9ySGVhbHRoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICArIFwiJywgJ1wiICsgc3VpdGFiaWxpdHlGb3JtLmZhY3Rvckluc3RydWN0aW9uc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKyBcIicsICdcIiArIHN1aXRhYmlsaXR5Rm9ybS5mYWN0b3JDb21tdW5pY2F0aW9uXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICArIFwiJywgJ1wiICsgc3VpdGFiaWxpdHlGb3JtLmZhY3Rvckxhbmd1YWdlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICArIFwiJywgJ1wiICsgc3VpdGFiaWxpdHlGb3JtLmZhY3RvckNvbXB1dGVyXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICArIFwiJywgJ1wiICsgc3VpdGFiaWxpdHlGb3JtLmZhY3RvckhvdXNpbmdcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICsgXCInLCAnXCIgKyBzdWl0YWJpbGl0eUZvcm0uZmFjdG9yVHJhbnNwb3J0YXRpb25cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICsgXCInLCAnXCIgKyBzdWl0YWJpbGl0eUZvcm0uZmFjdG9yRGF5Y2FyZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKyBcIicsICdcIiArIHN1aXRhYmlsaXR5Rm9ybS5mYWN0b3JJbnRlcm5ldFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKyBcIicsICdcIiArIHN1aXRhYmlsaXR5Rm9ybS5mYWN0b3JQZXJzb25hbFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKyBcIicsICdcIiArIHN1aXRhYmlsaXR5Rm9ybS5mYWN0b3JPdGhlclxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKyBcIicsICdcIiArIHN1aXRhYmlsaXR5Rm9ybS5zdW1tYXJ5VHJhbnNwb3J0YXRpb25cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICsgXCInLCAnXCIgKyBzdWl0YWJpbGl0eUZvcm0uc3VtbWFyeUhvdXNpbmdcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICsgXCInLCAnXCIgKyBzdWl0YWJpbGl0eUZvcm0uc3VtbWFyeUNoaWxkY2FyZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKyBcIicsICdcIiArIHN1aXRhYmlsaXR5Rm9ybS5zdW1tYXJ5SGVhbHRoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICArIFwiJywgJ1wiICsgc3VpdGFiaWxpdHlGb3JtLnN1bW1hcnlPdGhlclxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKyBcIicsICdcIiArIHN1aXRhYmlsaXR5Rm9ybS5kYlRvdGFsUG9pbnRzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICArIFwiJywgJ1wiICsgc3VpdGFiaWxpdHlGb3JtLmdlbmVyYWxJbmZvQ29tbWVudHMgKyBcIidcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXcgc3FsLlJlcXVlc3QoY29ubmVjdGlvbilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5xdWVyeShcIklOU0VSVCBJTlRPIFN1aXRhYmlsaXR5Rm9ybSBWQUxVRVMgKFwiICsgc3VpdGFiaWxpdHlGb3JtUXVlcnkgKyBcIilcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlN1aXRhYmlsaXR5IGluc2VydGVkXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXcgc3FsLlJlcXVlc3QoY29ubmVjdGlvbilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucXVlcnkoXCJVUERBVEUgQ2xpZW50cyBTRVQgc3VpdGFiaWxpdHk9ICdmYWxzZScgV0hFUkUgdXNlcklEID0gJ1wiICsgaWRbMF0udXNlcklEICsgXCInXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXMuc2VuZCh7IFwic3VjY2Vzc1wiOiBcInN1Y2Nlc3NcIiB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbihlcnIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcy5zZW5kKHsgXCJlcnJvclwiOiBcImVycm9yXCIgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlVwZGF0ZSBjbGllbnQgXCIgKyBlcnIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcy5zZW5kKHsgXCJlcnJvclwiOiBcImVycm9yXCIgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiaW5zZXJ0IHN1aXRhYmlsaXR5Rm9ybSBcIiArIGVycik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXMuc2VuZCh7IFwic3VjY2Vzc1wiOiBcInN1Y2Nlc3NcIiB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlN1aXRhYmlsaXR5IG5vdCBwcm92aWRlZC5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGVycikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXMuc2VuZCh7IFwiZXJyb3JcIjogXCJlcnJvclwiIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImluc2VydCBjbGllbnQgXCIgKyBlcnIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXcgc3FsLlJlcXVlc3QoY29ubmVjdGlvbilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucXVlcnkoXCJERUxFVEUgRlJPTSBVc2VycyBXSEVSRSB1c2VySUQgPSAnXCIgKyBpZFswXS51c2VySUQgKyBcIidcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcy5zZW5kKHsgXCJzdWNjZXNzXCI6IFwic3VjY2Vzc1wiIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGVycikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzLnNlbmQoeyBcImVycm9yXCI6IFwiZXJyb3JcIiB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRGVsZXRlIHVzZXIgd2l0aCBpZCBcIiArIGlkWzBdLnVzZXJJRCArIFwiLiBcIiArIGVycik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbihlcnIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcy5zZW5kKHsgXCJlcnJvclwiOiBcImVycm9yIHNlbGVjdGluZyB1c2VyIGZyb20gdXNlcnNcIiB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZ2V0IHVzZXIgXCIgKyBlcnIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcy5zZW5kKHsgXCJlcnJvclwiOiBcImVycm9yIGluc2VydGluZyB1c2VyXCIgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiaW5zZXJ0IHVzZXIgXCIgKyBlcnIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzLnNlbmQoeyBcImVycm9yXCI6IGVycm9yIH0pO1xyXG4gICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbihlcnIpIHtcclxuICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyKTtcclxuICAgICAgICAgICAgICAgICAgcmVzLnNlbmQoeyBcImVycm9yXCI6IFwiZXJyb3Igc2VsZWN0aW5nIGFsbCB1c2Vyc1wiIH0pO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGVycikge1xyXG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XHJcbiAgICAgICAgICAgICAgcmVzLnNlbmQoeyBcImVycm9yXCI6IFwiZXJyb3JcIiB9KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICAgIGNhdGNoIChlKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKGUpO1xyXG4gICAgICByZXMuc2VuZCh7IFwiZXJyb3JcIjogXCJlcnJvciBpbiB5b3VyIHJlcXVlc3RcIiB9KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGFkZFN1aXRhYmlsaXR5KHJlcTogZXhwcmVzcy5SZXF1ZXN0LCByZXM6IGV4cHJlc3MuUmVzcG9uc2UpOiB2b2lkIHtcclxuICAgIHRyeSB7XHJcbiAgICAgIG5ldyBBdXRoQ29udHJvbGxlcigpLmF1dGhVc2VyKHJlcSwgcmVzLCB7XHJcbiAgICAgICAgcmVxdWlyZWRBdXRoOiBhdXRoLCBkb25lOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgIHZhciBfaWQ6IHN0cmluZyA9IHJlcS5wYXJhbXMuX2lkO1xyXG4gICAgICAgICAgdmFyIHN1aXRhYmlsaXR5Rm9ybSA9IHJlcS5ib2R5O1xyXG5cclxuICAgICAgICAgIHNxbC5jb25uZWN0KGNvbmZpZylcclxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24oY29ubmVjdGlvbikge1xyXG5cclxuICAgICAgICAgICAgICB2YXIgc3VpdGFiaWxpdHlGb3JtUXVlcnkgPSBcIidcIiArIF9pZFxyXG4gICAgICAgICAgICAgICAgKyBcIicsICdcIiArIHN1aXRhYmlsaXR5Rm9ybS50cmFuc2NyaXB0XHJcbiAgICAgICAgICAgICAgICArIFwiJywgJ1wiICsgc3VpdGFiaWxpdHlGb3JtLmNvdXJzZXNcclxuICAgICAgICAgICAgICAgICsgXCInLCAnXCIgKyBzdWl0YWJpbGl0eUZvcm0uZ29hbFxyXG4gICAgICAgICAgICAgICAgKyBcIicsICdcIiArIHN1aXRhYmlsaXR5Rm9ybS50cmFuc2l0aW9uRGF0ZVxyXG4gICAgICAgICAgICAgICAgKyBcIicsICdcIiArIHN1aXRhYmlsaXR5Rm9ybS5nb3Zlcm5tZW50SURcclxuICAgICAgICAgICAgICAgICsgXCInLCAnXCIgKyBzdWl0YWJpbGl0eUZvcm0uYXBwcm9wcmlhdGVHb2FsXHJcbiAgICAgICAgICAgICAgICArIFwiJywgJ1wiICsgc3VpdGFiaWxpdHlGb3JtLmlzVmFsaWRBZ2VcclxuICAgICAgICAgICAgICAgICsgXCInLCAnXCIgKyBzdWl0YWJpbGl0eUZvcm0uc2Nob29sUmVnaXN0cmF0aW9uXHJcbiAgICAgICAgICAgICAgICArIFwiJywgJ1wiICsgc3VpdGFiaWxpdHlGb3JtLmF2YWlsYWJsZUR1cmluZ0NsYXNzXHJcbiAgICAgICAgICAgICAgICArIFwiJywgJ1wiICsgc3VpdGFiaWxpdHlGb3JtLmxhc3RHcmFkZVxyXG4gICAgICAgICAgICAgICAgKyBcIicsICdcIiArIHN1aXRhYmlsaXR5Rm9ybS5sZXZlbFxyXG4gICAgICAgICAgICAgICAgKyBcIicsICdcIiArIHN1aXRhYmlsaXR5Rm9ybS5vZmZlclN0YXJ0RGF0ZVxyXG4gICAgICAgICAgICAgICAgKyBcIicsICdcIiArIHN1aXRhYmlsaXR5Rm9ybS5tZWV0c0dvYWxcclxuICAgICAgICAgICAgICAgICsgXCInLCAnXCIgKyBzdWl0YWJpbGl0eUZvcm0udGltZU91dE9mU2Nob29sXHJcbiAgICAgICAgICAgICAgICArIFwiJywgJ1wiICsgc3VpdGFiaWxpdHlGb3JtLmluUHJvZ3JhbUJlZm9yZVxyXG4gICAgICAgICAgICAgICAgKyBcIicsICdcIiArIHN1aXRhYmlsaXR5Rm9ybS5lbXBsb3ltZW50XHJcbiAgICAgICAgICAgICAgICArIFwiJywgJ1wiICsgc3VpdGFiaWxpdHlGb3JtLmluY29tZVNvdXJjZVxyXG4gICAgICAgICAgICAgICAgKyBcIicsICdcIiArIHN1aXRhYmlsaXR5Rm9ybS5hZ2VSYW5nZVxyXG4gICAgICAgICAgICAgICAgKyBcIicsICdcIiArIHN1aXRhYmlsaXR5Rm9ybS5ob3Vyc1BlcldlZWtcclxuICAgICAgICAgICAgICAgICsgXCInLCAnXCIgKyBzdWl0YWJpbGl0eUZvcm0ud29ya0hpc3RvcnlcclxuICAgICAgICAgICAgICAgICsgXCInLCAnXCIgKyBzdWl0YWJpbGl0eUZvcm0uZmFjdG9ySGVhbHRoXHJcbiAgICAgICAgICAgICAgICArIFwiJywgJ1wiICsgc3VpdGFiaWxpdHlGb3JtLmZhY3Rvckluc3RydWN0aW9uc1xyXG4gICAgICAgICAgICAgICAgKyBcIicsICdcIiArIHN1aXRhYmlsaXR5Rm9ybS5mYWN0b3JDb21tdW5pY2F0aW9uXHJcbiAgICAgICAgICAgICAgICArIFwiJywgJ1wiICsgc3VpdGFiaWxpdHlGb3JtLmZhY3Rvckxhbmd1YWdlXHJcbiAgICAgICAgICAgICAgICArIFwiJywgJ1wiICsgc3VpdGFiaWxpdHlGb3JtLmZhY3RvckNvbXB1dGVyXHJcbiAgICAgICAgICAgICAgICArIFwiJywgJ1wiICsgc3VpdGFiaWxpdHlGb3JtLmZhY3RvckhvdXNpbmdcclxuICAgICAgICAgICAgICAgICsgXCInLCAnXCIgKyBzdWl0YWJpbGl0eUZvcm0uZmFjdG9yVHJhbnNwb3J0YXRpb25cclxuICAgICAgICAgICAgICAgICsgXCInLCAnXCIgKyBzdWl0YWJpbGl0eUZvcm0uZmFjdG9yRGF5Y2FyZVxyXG4gICAgICAgICAgICAgICAgKyBcIicsICdcIiArIHN1aXRhYmlsaXR5Rm9ybS5mYWN0b3JJbnRlcm5ldFxyXG4gICAgICAgICAgICAgICAgKyBcIicsICdcIiArIHN1aXRhYmlsaXR5Rm9ybS5mYWN0b3JQZXJzb25hbFxyXG4gICAgICAgICAgICAgICAgKyBcIicsICdcIiArIHN1aXRhYmlsaXR5Rm9ybS5mYWN0b3JPdGhlclxyXG4gICAgICAgICAgICAgICAgKyBcIicsICdcIiArIHN1aXRhYmlsaXR5Rm9ybS5zdW1tYXJ5VHJhbnNwb3J0YXRpb25cclxuICAgICAgICAgICAgICAgICsgXCInLCAnXCIgKyBzdWl0YWJpbGl0eUZvcm0uc3VtbWFyeUhvdXNpbmdcclxuICAgICAgICAgICAgICAgICsgXCInLCAnXCIgKyBzdWl0YWJpbGl0eUZvcm0uc3VtbWFyeUNoaWxkY2FyZVxyXG4gICAgICAgICAgICAgICAgKyBcIicsICdcIiArIHN1aXRhYmlsaXR5Rm9ybS5zdW1tYXJ5SGVhbHRoXHJcbiAgICAgICAgICAgICAgICArIFwiJywgJ1wiICsgc3VpdGFiaWxpdHlGb3JtLnN1bW1hcnlPdGhlclxyXG4gICAgICAgICAgICAgICAgKyBcIicsICdcIiArIHN1aXRhYmlsaXR5Rm9ybS5kYlRvdGFsUG9pbnRzXHJcbiAgICAgICAgICAgICAgICArIFwiJywgJ1wiICsgc3VpdGFiaWxpdHlGb3JtLmdlbmVyYWxJbmZvQ29tbWVudHMgKyBcIidcIjtcclxuICAgICAgICAgICAgICBuZXcgc3FsLlJlcXVlc3QoY29ubmVjdGlvbilcclxuICAgICAgICAgICAgICAgIC5xdWVyeShcIklOU0VSVCBJTlRPIFN1aXRhYmlsaXR5Rm9ybSBWQUxVRVMgKFwiICsgc3VpdGFiaWxpdHlGb3JtUXVlcnkgKyBcIilcIilcclxuICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICBuZXcgc3FsLlJlcXVlc3QoY29ubmVjdGlvbilcclxuICAgICAgICAgICAgICAgICAgICAucXVlcnkoXCJVUERBVEUgQ2xpZW50cyBTRVQgc3VpdGFiaWxpdHkgPSAnZmFsc2UnIFdIRVJFIHVzZXJJRCA9IFwiICsgX2lkICsgXCJcIilcclxuICAgICAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICAgIHJlcy5zZW5kKHsgXCJzdWNjZXNzXCI6IFwic3VjY2Vzc1wiIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pLmNhdGNoKCk7XHJcbiAgICAgICAgICAgICAgICB9KS5jYXRjaCgpO1xyXG4gICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbihlcnIpIHtcclxuICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xyXG4gICAgICAgICAgICAgIHJlcy5zZW5kKHsgXCJlcnJvclwiOiBcImVycm9yXCIgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBjYXRjaCAoZSkge1xyXG4gICAgICBjb25zb2xlLmxvZyhlKTtcclxuICAgICAgcmVzLnNlbmQoeyBcImVycm9yXCI6IFwiZXJyb3IgaW4geW91ciByZXF1ZXN0XCIgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICB1cGRhdGUocmVxOiBleHByZXNzLlJlcXVlc3QsIHJlczogZXhwcmVzcy5SZXNwb25zZSk6IHZvaWQge1xyXG4gICAgdHJ5IHtcclxuICAgICAgbmV3IEF1dGhDb250cm9sbGVyKCkuYXV0aFVzZXIocmVxLCByZXMsIHtcclxuICAgICAgICByZXF1aXJlZEF1dGg6IGF1dGgsIGRvbmU6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgdmFyIGNsaWVudCA9IHJlcS5ib2R5O1xyXG4gICAgICAgICAgdmFyIF9pZDogc3RyaW5nID0gcmVxLnBhcmFtcy5faWQ7XHJcbiAgICAgICAgICBzcWwuY29ubmVjdChjb25maWcpXHJcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKGNvbm5lY3Rpb24pIHtcclxuICAgICAgICAgICAgICBuZXcgc3FsLlJlcXVlc3QoY29ubmVjdGlvbilcclxuICAgICAgICAgICAgICAgIC5xdWVyeShcIlVQREFURSBDbGllbnRzIFNFVCBmaXJzdE5hbWU9J1wiICsgY2xpZW50LmZpcnN0TmFtZSArIFwiJywgbGFzdE5hbWU9J1wiICsgY2xpZW50Lmxhc3ROYW1lICsgXCInLCBiaXJ0aGRhdGU9J1wiICsgY2xpZW50LmJpcnRoZGF5ICsgXCInLCBwaG9uZT0nXCIgKyBjbGllbnQucGhvbmUgKyBcIicgV0hFUkUgY2xpZW50SUQgPSAnXCIgKyBfaWQgKyBcIidcIilcclxuICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKHJlY29yZHNldCkge1xyXG4gICAgICAgICAgICAgICAgICByZXMuc2VuZCh7IFwic3VjY2Vzc1wiOiBcInN1Y2Nlc3NcIiB9KTtcclxuICAgICAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGVycikge1xyXG4gICAgICAgICAgICAgICAgICByZXMuc2VuZCh7IFwiZXJyb3JcIjogXCJlcnJvclwiIH0pOyBjb25zb2xlLmxvZyhcIlVwZGF0ZSBjbGllbnQgXCIgKyBlcnIpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGVycikge1xyXG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XHJcbiAgICAgICAgICAgICAgcmVzLnNlbmQoeyBcImVycm9yXCI6IFwiZXJyb3JcIiB9KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICAgIGNhdGNoIChlKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKGUpO1xyXG4gICAgICByZXMuc2VuZCh7IFwiZXJyb3JcIjogXCJlcnJvciBpbiB5b3VyIHJlcXVlc3RcIiB9KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHVwZGF0ZUJhbm5lckNhbUJvb2wocmVxOiBleHByZXNzLlJlcXVlc3QsIHJlczogZXhwcmVzcy5SZXNwb25zZSk6IHZvaWQge1xyXG4gICAgdHJ5IHtcclxuICAgICAgbmV3IEF1dGhDb250cm9sbGVyKCkuYXV0aFVzZXIocmVxLCByZXMsIHtcclxuICAgICAgICByZXF1aXJlZEF1dGg6IGF1dGgsIGRvbmU6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgdmFyIGNsaWVudCA9IHJlcS5ib2R5O1xyXG4gICAgICAgICAgc3FsLmNvbm5lY3QoY29uZmlnKVxyXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbihjb25uZWN0aW9uKSB7XHJcbiAgICAgICAgICAgICAgbmV3IHNxbC5SZXF1ZXN0KGNvbm5lY3Rpb24pXHJcbiAgICAgICAgICAgICAgICAucXVlcnkoXCJVUERBVEUgQ2xpZW50cyBTRVQgYmFubmVyPSdcIiArIGNsaWVudC5iYW5uZXIgKyBcIicsIGNhbT0nXCIgKyBjbGllbnQuY2FtICsgXCInIFdIRVJFIGNsaWVudElEID0gJ1wiICsgY2xpZW50LmNsaWVudElEICsgXCInXCIpXHJcbiAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbihyZWNvcmRzZXQpIHtcclxuICAgICAgICAgICAgICAgICAgcmVzLnNlbmQoeyBcInN1Y2Nlc3NcIjogXCJzdWNjZXNzXCIgfSk7XHJcbiAgICAgICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbihlcnIpIHtcclxuICAgICAgICAgICAgICAgICAgcmVzLnNlbmQoeyBcImVycm9yXCI6IFwiZXJyb3JcIiB9KTtcclxuICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJVcGRhdGUgYmFubmVyIGFuZCBjYW0gYm9vbGVhbnMgXCIgKyBlcnIpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGVycikge1xyXG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XHJcbiAgICAgICAgICAgICAgcmVzLnNlbmQoeyBcImVycm9yXCI6IFwiZXJyb3JcIiB9KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICAgIGNhdGNoIChlKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKGUpO1xyXG4gICAgICByZXMuc2VuZCh7IFwiZXJyb3JcIjogXCJlcnJvciBpbiB5b3VyIHJlcXVlc3RcIiB9KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHVwZGF0ZVN1aXRhYmlsaXR5KHJlcTogZXhwcmVzcy5SZXF1ZXN0LCByZXM6IGV4cHJlc3MuUmVzcG9uc2UpOiB2b2lkIHtcclxuICAgIHRyeSB7XHJcbiAgICAgIG5ldyBBdXRoQ29udHJvbGxlcigpLmF1dGhVc2VyKHJlcSwgcmVzLCB7XHJcbiAgICAgICAgcmVxdWlyZWRBdXRoOiBhdXRoLCBkb25lOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgIHZhciBzdWl0YWJpbGl0eSA9IHJlcS5ib2R5O1xyXG4gICAgICAgICAgc3FsLmNvbm5lY3QoY29uZmlnKVxyXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbihjb25uZWN0aW9uKSB7XHJcbiAgICAgICAgICAgICAgdmFyIHF1ZXJ5ID0gXCJVUERBVEUgU3VpdGFiaWxpdHlGb3JtIFNFVCB0cmFuc2NyaXB0PSdcIiArIHN1aXRhYmlsaXR5LnRyYW5zY3JpcHRcclxuICAgICAgICAgICAgICAgICsgXCInLCBjb3Vyc2VzPSdcIiArIHN1aXRhYmlsaXR5LmNvdXJzZXNcclxuICAgICAgICAgICAgICAgICsgXCInLCBnb2FsPSdcIiArIHN1aXRhYmlsaXR5LmdvYWxcclxuICAgICAgICAgICAgICAgICsgXCInLCB0cmFuc2l0aW9uRGF0ZT0nXCIgKyBzdWl0YWJpbGl0eS50cmFuc2l0aW9uRGF0ZVxyXG4gICAgICAgICAgICAgICAgKyBcIicsIGdvdmVybm1lbnRJRD0nXCIgKyBzdWl0YWJpbGl0eS5nb3Zlcm5tZW50SURcclxuICAgICAgICAgICAgICAgICsgXCInLCBhcHByb3ByaWF0ZUdvYWw9J1wiICsgc3VpdGFiaWxpdHkuYXBwcm9wcmlhdGVHb2FsXHJcbiAgICAgICAgICAgICAgICArIFwiJywgaXNWYWxpZEFnZT0nXCIgKyBzdWl0YWJpbGl0eS5pc1ZhbGlkQWdlXHJcbiAgICAgICAgICAgICAgICArIFwiJywgc2Nob29sUmVnaXN0cmF0aW9uPSdcIiArIHN1aXRhYmlsaXR5LnNjaG9vbFJlZ2lzdHJhdGlvblxyXG4gICAgICAgICAgICAgICAgKyBcIicsIGF2YWlsYWJsZUR1cmluZ0NsYXNzPSdcIiArIHN1aXRhYmlsaXR5LmF2YWlsYWJsZUR1cmluZ0NsYXNzXHJcbiAgICAgICAgICAgICAgICArIFwiJywgbGFzdEdyYWRlPSdcIiArIHN1aXRhYmlsaXR5Lmxhc3RHcmFkZVxyXG4gICAgICAgICAgICAgICAgKyBcIicsIGxldmVsPSdcIiArIHN1aXRhYmlsaXR5LmxldmVsXHJcbiAgICAgICAgICAgICAgICArIFwiJywgb2ZmZXJTdGFydERhdGU9J1wiICsgc3VpdGFiaWxpdHkub2ZmZXJTdGFydERhdGVcclxuICAgICAgICAgICAgICAgICsgXCInLCBtZWV0c0dvYWw9J1wiICsgc3VpdGFiaWxpdHkubWVldHNHb2FsXHJcbiAgICAgICAgICAgICAgICArIFwiJywgdGltZU91dE9mU2Nob29sPSdcIiArIHN1aXRhYmlsaXR5LnRpbWVPdXRPZlNjaG9vbFxyXG4gICAgICAgICAgICAgICAgKyBcIicsIGluUHJvZ3JhbUJlZm9yZT0nXCIgKyBzdWl0YWJpbGl0eS5pblByb2dyYW1CZWZvcmVcclxuICAgICAgICAgICAgICAgICsgXCInLCBlbXBsb3ltZW50PSdcIiArIHN1aXRhYmlsaXR5LmVtcGxveW1lbnRcclxuICAgICAgICAgICAgICAgICsgXCInLCBpbmNvbWVTb3VyY2U9J1wiICsgc3VpdGFiaWxpdHkuaW5jb21lU291cmNlXHJcbiAgICAgICAgICAgICAgICArIFwiJywgYWdlUmFuZ2U9J1wiICsgc3VpdGFiaWxpdHkuYWdlUmFuZ2VcclxuICAgICAgICAgICAgICAgICsgXCInLCBob3Vyc1BlcldlZWs9J1wiICsgc3VpdGFiaWxpdHkuaG91cnNQZXJXZWVrXHJcbiAgICAgICAgICAgICAgICArIFwiJywgd29ya0hpc3Rvcnk9J1wiICsgc3VpdGFiaWxpdHkud29ya0hpc3RvcnlcclxuICAgICAgICAgICAgICAgICsgXCInLCBmYWN0b3JIZWFsdGg9J1wiICsgc3VpdGFiaWxpdHkuZmFjdG9ySGVhbHRoXHJcbiAgICAgICAgICAgICAgICArIFwiJywgZmFjdG9ySW5zdHJ1Y3Rpb25zPSdcIiArIHN1aXRhYmlsaXR5LmZhY3Rvckluc3RydWN0aW9uc1xyXG4gICAgICAgICAgICAgICAgKyBcIicsIGZhY3RvckNvbW11bmljYXRpb249J1wiICsgc3VpdGFiaWxpdHkuZmFjdG9yQ29tbXVuaWNhdGlvblxyXG4gICAgICAgICAgICAgICAgKyBcIicsIGZhY3Rvckxhbmd1YWdlPSdcIiArIHN1aXRhYmlsaXR5LmZhY3Rvckxhbmd1YWdlXHJcbiAgICAgICAgICAgICAgICArIFwiJywgZmFjdG9yQ29tcHV0ZXI9J1wiICsgc3VpdGFiaWxpdHkuZmFjdG9yQ29tcHV0ZXJcclxuICAgICAgICAgICAgICAgICsgXCInLCBmYWN0b3JIb3VzaW5nPSdcIiArIHN1aXRhYmlsaXR5LmZhY3RvckhvdXNpbmdcclxuICAgICAgICAgICAgICAgICsgXCInLCBmYWN0b3JUcmFuc3BvcnRhdGlvbj0nXCIgKyBzdWl0YWJpbGl0eS5mYWN0b3JUcmFuc3BvcnRhdGlvblxyXG4gICAgICAgICAgICAgICAgKyBcIicsIGZhY3RvckRheWNhcmU9J1wiICsgc3VpdGFiaWxpdHkuZmFjdG9yRGF5Y2FyZVxyXG4gICAgICAgICAgICAgICAgKyBcIicsIGZhY3RvckludGVybmV0PSdcIiArIHN1aXRhYmlsaXR5LmZhY3RvckludGVybmV0XHJcbiAgICAgICAgICAgICAgICArIFwiJywgZmFjdG9yUGVyc29uYWw9J1wiICsgc3VpdGFiaWxpdHkuZmFjdG9yUGVyc29uYWxcclxuICAgICAgICAgICAgICAgICsgXCInLCBmYWN0b3JPdGhlcj0nXCIgKyBzdWl0YWJpbGl0eS5mYWN0b3JPdGhlclxyXG4gICAgICAgICAgICAgICAgKyBcIicsIHN1bW1hcnlUcmFuc3BvcnRhdGlvbj0nXCIgKyBzdWl0YWJpbGl0eS5zdW1tYXJ5VHJhbnNwb3J0YXRpb25cclxuICAgICAgICAgICAgICAgICsgXCInLCBzdW1tYXJ5Q2hpbGRjYXJlPSdcIiArIHN1aXRhYmlsaXR5LnN1bW1hcnlDaGlsZGNhcmVcclxuICAgICAgICAgICAgICAgICsgXCInLCBzdW1tYXJ5SGVhbHRoPSdcIiArIHN1aXRhYmlsaXR5LnN1bW1hcnlIZWFsdGhcclxuICAgICAgICAgICAgICAgICsgXCInLCBzdW1tYXJ5T3RoZXI9J1wiICsgc3VpdGFiaWxpdHkuc3VtbWFyeU90aGVyXHJcbiAgICAgICAgICAgICAgICArIFwiJywgcG9pbnRzPSdcIiArIHN1aXRhYmlsaXR5LnBvaW50c1xyXG4gICAgICAgICAgICAgICAgKyBcIicgV0hFUkUgc3VpdGFiaWxpdHlJRCA9ICdcIiArIHN1aXRhYmlsaXR5LnN1aXRhYmlsaXR5SUQgKyBcIidcIlxyXG4gICAgICAgICAgICAgIG5ldyBzcWwuUmVxdWVzdChjb25uZWN0aW9uKVxyXG4gICAgICAgICAgICAgICAgLnF1ZXJ5KHF1ZXJ5KVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24ocmVjb3Jkc2V0KSB7XHJcbiAgICAgICAgICAgICAgICAgIHJlcy5zZW5kKHsgXCJzdWNjZXNzXCI6IFwic3VjY2Vzc1wiIH0pO1xyXG4gICAgICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgIHJlcy5zZW5kKHsgXCJlcnJvclwiOiBcImVycm9yXCIgfSk7IGNvbnNvbGUubG9nKFwiVXBkYXRlIHN1aXRhYmlsaXR5IFwiICsgZXJyKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbihlcnIpIHtcclxuICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xyXG4gICAgICAgICAgICAgIHJlcy5zZW5kKHsgXCJlcnJvclwiOiBcImVycm9yXCIgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBjYXRjaCAoZSkge1xyXG4gICAgICBjb25zb2xlLmxvZyhlKTtcclxuICAgICAgcmVzLnNlbmQoeyBcImVycm9yXCI6IFwiZXJyb3IgaW4geW91ciByZXF1ZXN0XCIgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBkZWxldGUocmVxOiBleHByZXNzLlJlcXVlc3QsIHJlczogZXhwcmVzcy5SZXNwb25zZSk6IHZvaWQge1xyXG4gICAgdHJ5IHtcclxuICAgICAgbmV3IEF1dGhDb250cm9sbGVyKCkuYXV0aFVzZXIocmVxLCByZXMsIHtcclxuICAgICAgICByZXF1aXJlZEF1dGg6IGF1dGgsIGRvbmU6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgdmFyIF9pZDogc3RyaW5nID0gcmVxLnBhcmFtcy5faWQ7XHJcbiAgICAgICAgICBzcWwuY29ubmVjdChjb25maWcpXHJcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKGNvbm5lY3Rpb24pIHtcclxuICAgICAgICAgICAgICBuZXcgc3FsLlJlcXVlc3QoY29ubmVjdGlvbilcclxuICAgICAgICAgICAgICAgIC5xdWVyeShcIkRFTEVURSBGUk9NIENsaWVudHMgV0hFUkUgdXNlcklEID0gJ1wiICsgX2lkICsgXCInXCIpXHJcbiAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgbmV3IHNxbC5SZXF1ZXN0KGNvbm5lY3Rpb24pXHJcbiAgICAgICAgICAgICAgICAgICAgLnF1ZXJ5KFwiREVMRVRFIEZST00gVXNlcnMgV0hFUkUgdXNlcklEID0gJ1wiICsgX2lkICsgXCInXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICByZXMuc2VuZCh7IFwic3VjY2Vzc1wiOiBcInN1Y2Nlc3NcIiB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbihlcnIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgIHJlcy5zZW5kKHsgXCJlcnJvclwiOiBcImVycm9yXCIgfSk7IGNvbnNvbGUubG9nKFwiRGVsZXRlIHVzZXIgd2l0aCBpZCBcIiArIF9pZCArIFwiLiBcIiArIGVycik7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbihlcnIpIHtcclxuICAgICAgICAgICAgICAgICAgcmVzLnNlbmQoeyBcImVycm9yXCI6IFwiZXJyb3JcIiB9KTsgY29uc29sZS5sb2coXCJEZWxldGUgY2xpZW50IHdpdGggaWQgXCIgKyBfaWQgKyBcIi4gXCIgKyBlcnIpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbihlcnIpIHtcclxuICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xyXG4gICAgICAgICAgICAgIHJlcy5zZW5kKHsgXCJlcnJvclwiOiBcImVycm9yXCIgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBjYXRjaCAoZSkge1xyXG4gICAgICBjb25zb2xlLmxvZyhlKTtcclxuICAgICAgcmVzLnNlbmQoeyBcImVycm9yXCI6IFwiZXJyb3IgaW4geW91ciByZXF1ZXN0XCIgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICByZW1vdmVGcm9tVGFibGUocmVxOiBleHByZXNzLlJlcXVlc3QsIHJlczogZXhwcmVzcy5SZXNwb25zZSk6IHZvaWQge1xyXG4gICAgdHJ5IHtcclxuICAgICAgbmV3IEF1dGhDb250cm9sbGVyKCkuYXV0aFVzZXIocmVxLCByZXMsIHtcclxuICAgICAgICByZXF1aXJlZEF1dGg6IGF1dGgsIGRvbmU6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgdmFyIF9pZDogc3RyaW5nID0gcmVxLnBhcmFtcy5faWQ7XHJcbiAgICAgICAgICBzcWwuY29ubmVjdChjb25maWcpXHJcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKGNvbm5lY3Rpb24pIHtcclxuICAgICAgICAgICAgICBuZXcgc3FsLlJlcXVlc3QoY29ubmVjdGlvbilcclxuICAgICAgICAgICAgICAgIC5xdWVyeShcIkRFTEVURSBGUk9NIENsaWVudHMgV0hFUkUgdXNlcklEID0gJ1wiICsgX2lkICsgXCInXCIpXHJcbiAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgbmV3IHNxbC5SZXF1ZXN0KGNvbm5lY3Rpb24pXHJcbiAgICAgICAgICAgICAgICAgICAgLnF1ZXJ5KFwiVVBEQVRFIFVzZXJzIFNFVCB1c2VyVHlwZT0gJ1N0dWRlbnQnIFdIRVJFIHVzZXJJRCA9ICdcIiArIF9pZCArIFwiJ1wiKVxyXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgcmVzLnNlbmQoeyBcInN1Y2Nlc3NcIjogXCJzdWNjZXNzXCIgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICByZXMuc2VuZCh7IFwiZXJyb3JcIjogXCJlcnJvclwiIH0pOyBjb25zb2xlLmxvZyhcIlVwZGF0ZSB1c2VyIHVzZXJUeXBlIFwiICsgZXJyKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGVycikge1xyXG4gICAgICAgICAgICAgICAgICByZXMuc2VuZCh7IFwiZXJyb3JcIjogXCJlcnJvclwiIH0pOyBjb25zb2xlLmxvZyhcIkRlbGV0ZSBmb3JtIGNsaWVudCB0YWJsZSB3aXRoIGlkIFwiICsgX2lkICsgXCIuIFwiICsgZXJyKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbihlcnIpIHtcclxuICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xyXG4gICAgICAgICAgICAgIHJlcy5zZW5kKHsgXCJlcnJvclwiOiBcImVycm9yXCIgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBjYXRjaCAoZSkge1xyXG4gICAgICBjb25zb2xlLmxvZyhlKTtcclxuICAgICAgcmVzLnNlbmQoeyBcImVycm9yXCI6IFwiZXJyb3IgaW4geW91ciByZXF1ZXN0XCIgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICByZXRyaWV2ZShyZXE6IGV4cHJlc3MuUmVxdWVzdCwgcmVzOiBleHByZXNzLlJlc3BvbnNlKTogdm9pZCB7XHJcbiAgICB0cnkge1xyXG4gICAgICBuZXcgQXV0aENvbnRyb2xsZXIoKS5hdXRoVXNlcihyZXEsIHJlcywge1xyXG4gICAgICAgIHJlcXVpcmVkQXV0aDogYXV0aCwgZG9uZTogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICBzcWwuY29ubmVjdChjb25maWcpXHJcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKGNvbm5lY3Rpb24pIHtcclxuICAgICAgICAgICAgICBuZXcgc3FsLlJlcXVlc3QoY29ubmVjdGlvbilcclxuICAgICAgICAgICAgICAgIC5xdWVyeSgnU0VMRUNUIENsaWVudHMuKiwgVXNlcnMuZW1haWwsIFVzZXJzLmFjdGl2ZSBmcm9tIENsaWVudHMgTGVmdCBKT0lOIFVzZXJzIE9OIENsaWVudHMudXNlcklEID0gVXNlcnMudXNlcklEJylcclxuICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKGNsaWVudHMpIHtcclxuICAgICAgICAgICAgICAgICAgbmV3IHNxbC5SZXF1ZXN0KGNvbm5lY3Rpb24pXHJcbiAgICAgICAgICAgICAgICAgICAgLnF1ZXJ5KCdTRUxFQ1QgKiBGUk9NIFN1aXRhYmlsaXR5Rm9ybScpXHJcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24oc3VpdGFiaWxpdHlGb3Jtcykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgbmV3IHNxbC5SZXF1ZXN0KGNvbm5lY3Rpb24pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5xdWVyeSgnU0VMRUNUICogRlJPTSBDb25zZW50JylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24oY29uc2VudEZvcm1zKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3IHNxbC5SZXF1ZXN0KGNvbm5lY3Rpb24pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAucXVlcnkoJ1NFTEVDVCAqIEZST00gTGVhcm5pbmdTdHlsZScpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbihsZWFybmluZ1N0eWxlRm9ybXMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzLnNlbmQoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsaWVudHM6IGNsaWVudHMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3VpdGFiaWxpdHlGb3Jtczogc3VpdGFiaWxpdHlGb3JtcyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zZW50Rm9ybXM6IGNvbnNlbnRGb3JtcyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZWFybmluZ1N0eWxlRm9ybXM6IGxlYXJuaW5nU3R5bGVGb3Jtc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGVycikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXMuc2VuZCh7IFwiZXJyb3JcIjogXCJlcnJvclwiIH0pOyBjb25zb2xlLmxvZyhcIkdldCBsZWFybmluZ1N0eWxlRm9ybXMgXCIgKyBlcnIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGVycikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHJlcy5zZW5kKHsgXCJlcnJvclwiOiBcImVycm9yXCIgfSk7IGNvbnNvbGUubG9nKFwiR2V0IGNvbnNlbnRGb3JtcyBcIiArIGVycik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGVycikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgcmVzLnNlbmQoeyBcImVycm9yXCI6IFwiZXJyb3JcIiB9KTsgY29uc29sZS5sb2coXCJHZXQgc3VpdGFiaWxpdHlGb3JtcyBcIiArIGVycik7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbihlcnIpIHtcclxuICAgICAgICAgICAgICAgICAgcmVzLnNlbmQoeyBcImVycm9yXCI6IFwiZXJyb3JcIiB9KTsgY29uc29sZS5sb2coXCJHZXQgY2xpZW50cyBcIiArIGVycik7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XHJcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyKTtcclxuICAgICAgICAgICAgICByZXMuc2VuZCh7IFwiZXJyb3JcIjogXCJlcnJvclwiIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgY2F0Y2ggKGUpIHtcclxuICAgICAgY29uc29sZS5sb2coZSk7XHJcbiAgICAgIHJlcy5zZW5kKHsgXCJlcnJvclwiOiBcImVycm9yIGluIHlvdXIgcmVxdWVzdFwiIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZmluZEJ5SWQocmVxOiBleHByZXNzLlJlcXVlc3QsIHJlczogZXhwcmVzcy5SZXNwb25zZSk6IHZvaWQge1xyXG4gICAgdHJ5IHtcclxuICAgICAgbmV3IEF1dGhDb250cm9sbGVyKCkuYXV0aFVzZXIocmVxLCByZXMsIHtcclxuICAgICAgICByZXF1aXJlZEF1dGg6IFtcIkFkbWluXCIsIFwiU3RhZmZcIiwgXCJDbGllbnRcIl0sIGRvbmU6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgdmFyIF9pZDogc3RyaW5nID0gcmVxLnBhcmFtcy5faWQ7XHJcbiAgICAgICAgICBzcWwuY29ubmVjdChjb25maWcpXHJcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKGNvbm5lY3Rpb24pIHtcclxuICAgICAgICAgICAgICBuZXcgc3FsLlJlcXVlc3QoY29ubmVjdGlvbilcclxuICAgICAgICAgICAgICAgIC5xdWVyeShcIlNFTEVDVCAqIEZST00gQ2xpZW50cyBXSEVSRSB1c2VySUQgPSAnXCIgKyBfaWQgKyBcIidcIilcclxuICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKGNsaWVudCkge1xyXG4gICAgICAgICAgICAgICAgICByZXMuc2VuZCh7IGNsaWVudDogY2xpZW50IH0pO1xyXG4gICAgICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiR2V0IGNsaWVudCBieSBpZCBcIiArIGVycik7XHJcbiAgICAgICAgICAgICAgICAgIHJlcy5zZW5kKHsgXCJlcnJvclwiOiBcImVycm9yXCIgfSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XHJcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyKTtcclxuICAgICAgICAgICAgICByZXMuc2VuZCh7IFwiZXJyb3JcIjogXCJlcnJvclwiIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgY2F0Y2ggKGUpIHtcclxuICAgICAgY29uc29sZS5sb2coZSk7XHJcbiAgICAgIHJlcy5zZW5kKHsgXCJlcnJvclwiOiBcImVycm9yIGluIHlvdXIgcmVxdWVzdFwiIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbn1cclxuZXhwb3J0ID0gQ2xpZW50Q29udHJvbGxlcjtcclxuIl19
