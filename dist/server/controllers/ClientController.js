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
                    var active = false;
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
                                    client.password = bcrypt.hashSync("Georgian2018", salt);
                                    active = true;
                                    // setup email data with unicode symbols
                                    var mailOptions = {
                                        from: '"Georgian Academic & Career Prep"',
                                        to: '',
                                        subject: 'New Client Created',
                                        text: '',
                                        html: 'A new client has been created. Username is <b>' + client.username + '</b> and password is <b>Georgian2018</b><br />. Please assist the client when logging in for the first time at http://georgianapp.azurewebsites.net. <br /><br /> Thankyou' // html body
                                    };
                                }
                                else {
                                    // setup email data with unicode symbols
                                    var mailOptions = {
                                        from: '"Georgian Academic & Career Prep"',
                                        to: client.email,
                                        subject: 'Welcome, ' + client.firstName,
                                        text: '',
                                        html: 'Your username is <b>' + client.username + '</b> and your temporary password is: <b>' + randomstring + '</b><br /> Please login at http://georgianapp.azurewebsites.net and complete the required forms. <br /><br /> Thankyou' // html body
                                    };
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NlcnZlci9zcmMvY29udHJvbGxlcnMvQ2xpZW50Q29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBRUEsK0JBQWtDO0FBQ2xDLDhEQUFpRTtBQUNqRSxJQUFNLFdBQVcsR0FBRyxPQUFPLENBQUMseUJBQXlCLENBQUMsQ0FBQztBQUN2RCxJQUFJLEdBQUcsR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDM0IsSUFBSSxJQUFJLEdBQUcsQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUM7QUFFOUIsSUFBSSxNQUFNLEdBQUcsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDO0FBQ2xDLE1BQU0sR0FBRyxNQUFNLENBQUMsRUFBRSxDQUFDO0FBRW5CO0lBQUE7SUEyaEJBLENBQUM7SUF6aEJDLGlDQUFNLEdBQU4sVUFBTyxHQUFvQixFQUFFLEdBQXFCO1FBQ2hELElBQUksQ0FBQztZQUNILElBQUksY0FBYyxFQUFFLENBQUMsUUFBUSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUU7Z0JBQ3RDLFlBQVksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFO29CQUN4QixJQUFJLFlBQVksR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUN4RCxZQUFZLEdBQUcsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLEVBQUUsR0FBRyxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUM1RSxJQUFJLElBQUksR0FBRyxNQUFNLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxDQUFDO29CQUNsQyxrQ0FBa0M7b0JBQ2xDLElBQUksUUFBUSxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxDQUFDO29CQUNuRCxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0s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bkIsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUFDO3dCQUMvQixDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsVUFBUyxHQUFHOzRCQUNuQixPQUFPLENBQUMsR0FBRyxDQUFDLG1CQUFtQixHQUFHLEdBQUcsQ0FBQyxDQUFDOzRCQUN2QyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxDQUFDLENBQUM7d0JBQ2pDLENBQUMsQ0FBQyxDQUFDO29CQUNQLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxVQUFTLEdBQUc7d0JBQ25CLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7d0JBQ2pCLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLENBQUMsQ0FBQztvQkFDakMsQ0FBQyxDQUFDLENBQUM7Z0JBQ1AsQ0FBQzthQUNGLENBQUMsQ0FBQztRQUNMLENBQUM7UUFDRCxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ1QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNmLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsQ0FBQyxDQUFDO1FBQ2pELENBQUM7SUFDSCxDQUFDO0lBRUgsdUJBQUM7QUFBRCxDQTNoQkEsQUEyaEJDLElBQUE7QUFDRCxpQkFBUyxnQkFBZ0IsQ0FBQyIsImZpbGUiOiJjb250cm9sbGVycy9DbGllbnRDb250cm9sbGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGV4cHJlc3MgPSByZXF1aXJlKFwiZXhwcmVzc1wiKTtcclxuaW1wb3J0IGp3dCA9IHJlcXVpcmUoJ2pzb253ZWJ0b2tlbicpO1xyXG5pbXBvcnQgYmNyeXB0ID0gcmVxdWlyZSgnYmNyeXB0Jyk7XHJcbmltcG9ydCBBdXRoQ29udHJvbGxlciA9IHJlcXVpcmUoXCIuLi9jb250cm9sbGVycy9BdXRoQ29udHJvbGxlclwiKTtcclxuY29uc3QgTWFpbFNlcnZpY2UgPSByZXF1aXJlKFwiLi4vc2VydmljZXMvTWFpbFNlcnZpY2VcIik7XHJcbnZhciBzcWwgPSByZXF1aXJlKCdtc3NxbCcpO1xyXG52YXIgYXV0aCA9IFtcIkFkbWluXCIsIFwiU3RhZmZcIl07XHJcblxyXG52YXIgY29uZmlnID0gcmVxdWlyZSgnLi4vY29uZmlnJyk7XHJcbmNvbmZpZyA9IGNvbmZpZy5kYjtcclxuXHJcbmNsYXNzIENsaWVudENvbnRyb2xsZXIge1xyXG5cclxuICBjcmVhdGUocmVxOiBleHByZXNzLlJlcXVlc3QsIHJlczogZXhwcmVzcy5SZXNwb25zZSk6IHZvaWQge1xyXG4gICAgdHJ5IHtcclxuICAgICAgbmV3IEF1dGhDb250cm9sbGVyKCkuYXV0aFVzZXIocmVxLCByZXMsIHtcclxuICAgICAgICByZXF1aXJlZEF1dGg6IGF1dGgsIGRvbmU6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgdmFyIHJhbmRvbXN0cmluZyA9IE1hdGgucmFuZG9tKCkudG9TdHJpbmcoMzYpLnNsaWNlKC04KTtcclxuICAgICAgICAgIHJhbmRvbXN0cmluZyA9IHJhbmRvbXN0cmluZy5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHJhbmRvbXN0cmluZy5zbGljZSgxKTtcclxuICAgICAgICAgIHZhciBzYWx0ID0gYmNyeXB0LmdlblNhbHRTeW5jKDEwKTtcclxuICAgICAgICAgIC8vIEhhc2ggdGhlIHBhc3N3b3JkIHdpdGggdGhlIHNhbHRcclxuICAgICAgICAgIHZhciBwYXNzd29yZCA9IGJjcnlwdC5oYXNoU3luYyhyYW5kb21zdHJpbmcsIHNhbHQpO1xyXG4gICAgICAgICAgcmVxLmJvZHkuY2xpZW50LnBhc3N3b3JkID0gcGFzc3dvcmQ7XHJcbiAgICAgICAgICB2YXIgY2xpZW50ID0gcmVxLmJvZHkuY2xpZW50O1xyXG4gICAgICAgICAgY2xpZW50LnVzZXJuYW1lID0gY2xpZW50LmZpcnN0TmFtZSArIGNsaWVudC5sYXN0TmFtZTtcclxuICAgICAgICAgIGNsaWVudC51c2VybmFtZSA9IGNsaWVudC51c2VybmFtZS50b0xvd2VyQ2FzZSgpO1xyXG4gICAgICAgICAgY2xpZW50LnVzZXJuYW1lID0gY2xpZW50LnVzZXJuYW1lLnJlcGxhY2UoL1xccysvZywgJycpO1xyXG4gICAgICAgICAgdmFyIHN1aXRhYmlsaXR5Rm9ybSA9IHJlcS5ib2R5LnN1aXRhYmlsaXR5Rm9ybTtcclxuICAgICAgICAgIHZhciBhY3RpdmUgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgICBzcWwuY29ubmVjdChjb25maWcpXHJcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKGNvbm5lY3Rpb24pIHtcclxuICAgICAgICAgICAgICBuZXcgc3FsLlJlcXVlc3QoY29ubmVjdGlvbilcclxuICAgICAgICAgICAgICAgIC5xdWVyeShcIlNFTEVDVCAqIEZST00gVXNlcnNcIilcclxuICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKHVzZXJzKSB7XHJcbiAgICAgICAgICAgICAgICAgIHZhciB2YWxpZGF0ZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICB2YXIgZXJyb3I7XHJcbiAgICAgICAgICAgICAgICAgIHZhciByZSA9IC9eKChbXjw+KClbXFxdXFxcXC4sOzpcXHNAXFxcIl0rKFxcLltePD4oKVtcXF1cXFxcLiw7Olxcc0BcXFwiXSspKil8KFxcXCIuK1xcXCIpKUAoKFxcW1swLTldezEsM31cXC5bMC05XXsxLDN9XFwuWzAtOV17MSwzfVxcLlswLTldezEsM31cXF0pfCgoW2EtekEtWlxcLTAtOV0rXFwuKStbYS16QS1aXXsyLH0pKSQvO1xyXG4gICAgICAgICAgICAgICAgICB2YXIgZW1haWxWYWxpZGF0aW9uID0gcmUudGVzdChjbGllbnQuZW1haWwpO1xyXG4gICAgICAgICAgICAgICAgICBmb3IgKGxldCB1c2VyIG9mIHVzZXJzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHVzZXIudXNlcm5hbWUgPT09IGNsaWVudC51c2VybmFtZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgdmFsaWRhdGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICBlcnJvciA9IFwidXNlcm5hbWUgaW4gdXNlXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNsaWVudC5lbWFpbCA9PT0gXCJCQS5BQ1BAZ2VvcmdpYW5jb2xsZWdlLmNhXCIgfHwgY2xpZW50LmVtYWlsID09PSBcIk9SLkFDUEBnZW9yZ2lhbmNvbGxlZ2UuY2FcIiB8fCBjbGllbnQuZW1haWwgPT09IFwiT1MuQUNQQGdlb3JnaWFuY29sbGVnZS5jYVwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICBjbGllbnQucGFzc3dvcmQgPSBiY3J5cHQuaGFzaFN5bmMoXCJHZW9yZ2lhbjIwMThcIiwgc2FsdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICBhY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgLy8gc2V0dXAgZW1haWwgZGF0YSB3aXRoIHVuaWNvZGUgc3ltYm9sc1xyXG4gICAgICAgICAgICAgICAgICAgICAgbGV0IG1haWxPcHRpb25zID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmcm9tOiAnXCJHZW9yZ2lhbiBBY2FkZW1pYyAmIENhcmVlciBQcmVwXCInLCAvLyBzZW5kZXIgYWRkcmVzc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0bzogJycsIC8vIGNsaWVudC5lbWFpbFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdWJqZWN0OiAnTmV3IENsaWVudCBDcmVhdGVkJywgLy8gU3ViamVjdCBsaW5lXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRleHQ6ICcnLCAvLyBwbGFpbiB0ZXh0IGJvZHlcclxuICAgICAgICAgICAgICAgICAgICAgICAgaHRtbDogJ0EgbmV3IGNsaWVudCBoYXMgYmVlbiBjcmVhdGVkLiBVc2VybmFtZSBpcyA8Yj4nICsgY2xpZW50LnVzZXJuYW1lICsgJzwvYj4gYW5kIHBhc3N3b3JkIGlzIDxiPkdlb3JnaWFuMjAxODwvYj48YnIgLz4uIFBsZWFzZSBhc3Npc3QgdGhlIGNsaWVudCB3aGVuIGxvZ2dpbmcgaW4gZm9yIHRoZSBmaXJzdCB0aW1lIGF0IGh0dHA6Ly9nZW9yZ2lhbmFwcC5henVyZXdlYnNpdGVzLm5ldC4gPGJyIC8+PGJyIC8+IFRoYW5reW91JyAvLyBodG1sIGJvZHlcclxuICAgICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgIC8vIHNldHVwIGVtYWlsIGRhdGEgd2l0aCB1bmljb2RlIHN5bWJvbHNcclxuICAgICAgICAgICAgICAgICAgICAgIGxldCBtYWlsT3B0aW9ucyA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZnJvbTogJ1wiR2VvcmdpYW4gQWNhZGVtaWMgJiBDYXJlZXIgUHJlcFwiJywgLy8gc2VuZGVyIGFkZHJlc3NcclxuICAgICAgICAgICAgICAgICAgICAgICAgdG86IGNsaWVudC5lbWFpbCwgLy8gbGlzdCBvZiByZWNlaXZlcnNcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3ViamVjdDogJ1dlbGNvbWUsICcgKyBjbGllbnQuZmlyc3ROYW1lLCAvLyBTdWJqZWN0IGxpbmVcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGV4dDogJycsIC8vIHBsYWluIHRleHQgYm9keVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBodG1sOiAnWW91ciB1c2VybmFtZSBpcyA8Yj4nICsgY2xpZW50LnVzZXJuYW1lICsgJzwvYj4gYW5kIHlvdXIgdGVtcG9yYXJ5IHBhc3N3b3JkIGlzOiA8Yj4nICsgcmFuZG9tc3RyaW5nICsgJzwvYj48YnIgLz4gUGxlYXNlIGxvZ2luIGF0IGh0dHA6Ly9nZW9yZ2lhbmFwcC5henVyZXdlYnNpdGVzLm5ldCBhbmQgY29tcGxldGUgdGhlIHJlcXVpcmVkIGZvcm1zLiA8YnIgLz48YnIgLz4gVGhhbmt5b3UnIC8vIGh0bWwgYm9keVxyXG4gICAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICAgIGlmICh1c2VyLmVtYWlsID09PSBjbGllbnQuZW1haWwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsaWRhdGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yID0gXCJlbWFpbCBpbiB1c2VcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgIGlmICghZW1haWxWYWxpZGF0aW9uICYmIHZhbGlkYXRlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbGlkYXRlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIGVycm9yID0gXCJpbmNvcnJlY3QgZW1haWwgZm9ybWF0XCI7XHJcbiAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgaWYgKHZhbGlkYXRlZCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBuZXcgc3FsLlJlcXVlc3QoY29ubmVjdGlvbilcclxuICAgICAgICAgICAgICAgICAgICAgIC5xdWVyeShcIklOU0VSVCBJTlRPIFVzZXJzIFZBTFVFUyAoJ1wiICsgY2xpZW50LnVzZXJuYW1lICsgXCInLCdcIiArIGNsaWVudC5lbWFpbCArIFwiJywnXCIgKyBjbGllbnQucGFzc3dvcmQgKyBcIicsJ0NsaWVudCcsJ1wiICsgYWN0aXZlICsgXCInKVwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBzcWwuUmVxdWVzdChjb25uZWN0aW9uKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5xdWVyeShcIlNFTEVDVCB1c2VySUQgRlJPTSBVc2VycyBXSEVSRSB1c2VybmFtZSA9ICdcIiArIGNsaWVudC51c2VybmFtZSArIFwiJyBBTkQgcGFzc3dvcmQgPSAnXCIgKyBjbGllbnQucGFzc3dvcmQgKyBcIidcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbihpZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNsaWVudC5va2F5VG9UZXh0ID09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xpZW50Lm9rYXlUb1RleHQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoY2xpZW50LmFsdGVybmF0ZU51bWJlciA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsaWVudC5hbHRlcm5hdGVOdW1iZXIgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjbGllbnRRdWVyeSA9IFwiJ1wiICsgaWRbMF0udXNlcklEICsgXCInLCAnXCIgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGllbnQuZmlyc3ROYW1lICsgXCInLCAnXCIgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGllbnQubGFzdE5hbWUgKyBcIicsICdcIiArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsaWVudC5pbnF1aXJ5RGF0ZSArIFwiJywgJ1wiICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xpZW50LmJpcnRoZGF5ICsgXCInLCAnXCIgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGllbnQucGhvbmUgKyBcIicsICdcIiArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsaWVudC5hbGxvd0RldGFpbGVkTWVzc2FnZSArIFwiJywgJ1wiICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xpZW50Lm9rYXlUb1RleHQgKyBcIicsICdcIiArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsaWVudC5hbHRlcm5hdGVOdW1iZXIgKyBcIicsICdcIiArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsaWVudC5hbGxvd0RldGFpbGVkTWVzc2FnZUFsdGVybmF0ZSArIFwiJywgJ1wiICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xpZW50Lm9rYXlUb1RleHRBbHRlcm5hdGUgKyBcIicsICdcIiArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRydWUgKyBcIicsICdcIiArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRydWUgKyBcIicsICdcIiArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRydWUgKyBcIicsICdcIiArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZhbHNlICsgXCInLCAnXCIgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmYWxzZSArIFwiJywgJ1wiICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xpZW50LmNvbW1lbnRzICsgXCInLCAnXCIgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGllbnQuc3R1ZGVudE51bWJlciArIFwiJ1wiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3IE1haWxTZXJ2aWNlKCkuc2VuZE1lc3NhZ2UoXCJXZWxjb21lIE1lc3NhZ2VcIiwgbWFpbE9wdGlvbnMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXcgc3FsLlJlcXVlc3QoKS5xdWVyeShcIklOU0VSVCBJTlRPIENsaWVudHMgVkFMVUVTIChcIiArIGNsaWVudFF1ZXJ5ICsgXCIpXCIpLnRoZW4oZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChPYmplY3Qua2V5cyhzdWl0YWJpbGl0eUZvcm0pLmxlbmd0aCAhPSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHN1aXRhYmlsaXR5Rm9ybVF1ZXJ5ID0gXCInXCIgKyBpZFswXS51c2VySURcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICsgXCInLCAnXCIgKyBzdWl0YWJpbGl0eUZvcm0udHJhbnNjcmlwdFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKyBcIicsICdcIiArIHN1aXRhYmlsaXR5Rm9ybS5jb3Vyc2VzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICArIFwiJywgJ1wiICsgc3VpdGFiaWxpdHlGb3JtLmdvYWxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICsgXCInLCAnXCIgKyBzdWl0YWJpbGl0eUZvcm0udHJhbnNpdGlvbkRhdGVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICsgXCInLCAnXCIgKyBzdWl0YWJpbGl0eUZvcm0uZ292ZXJubWVudElEXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICArIFwiJywgJ1wiICsgc3VpdGFiaWxpdHlGb3JtLmFwcHJvcHJpYXRlR29hbFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKyBcIicsICdcIiArIHN1aXRhYmlsaXR5Rm9ybS5pc1ZhbGlkQWdlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICArIFwiJywgJ1wiICsgc3VpdGFiaWxpdHlGb3JtLnNjaG9vbFJlZ2lzdHJhdGlvblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKyBcIicsICdcIiArIHN1aXRhYmlsaXR5Rm9ybS5hdmFpbGFibGVEdXJpbmdDbGFzc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKyBcIicsICdcIiArIHN1aXRhYmlsaXR5Rm9ybS5sYXN0R3JhZGVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICsgXCInLCAnXCIgKyBzdWl0YWJpbGl0eUZvcm0ubGV2ZWxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICsgXCInLCAnXCIgKyBzdWl0YWJpbGl0eUZvcm0ub2ZmZXJTdGFydERhdGVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICsgXCInLCAnXCIgKyBzdWl0YWJpbGl0eUZvcm0ubWVldHNHb2FsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICArIFwiJywgJ1wiICsgc3VpdGFiaWxpdHlGb3JtLnRpbWVPdXRPZlNjaG9vbFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKyBcIicsICdcIiArIHN1aXRhYmlsaXR5Rm9ybS5pblByb2dyYW1CZWZvcmVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICsgXCInLCAnXCIgKyBzdWl0YWJpbGl0eUZvcm0uZW1wbG95bWVudFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKyBcIicsICdcIiArIHN1aXRhYmlsaXR5Rm9ybS5pbmNvbWVTb3VyY2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICsgXCInLCAnXCIgKyBzdWl0YWJpbGl0eUZvcm0uYWdlUmFuZ2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICsgXCInLCAnXCIgKyBzdWl0YWJpbGl0eUZvcm0uaG91cnNQZXJXZWVrXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICArIFwiJywgJ1wiICsgc3VpdGFiaWxpdHlGb3JtLndvcmtIaXN0b3J5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICArIFwiJywgJ1wiICsgc3VpdGFiaWxpdHlGb3JtLmZhY3RvckhlYWx0aFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKyBcIicsICdcIiArIHN1aXRhYmlsaXR5Rm9ybS5mYWN0b3JJbnN0cnVjdGlvbnNcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICsgXCInLCAnXCIgKyBzdWl0YWJpbGl0eUZvcm0uZmFjdG9yQ29tbXVuaWNhdGlvblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKyBcIicsICdcIiArIHN1aXRhYmlsaXR5Rm9ybS5mYWN0b3JMYW5ndWFnZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKyBcIicsICdcIiArIHN1aXRhYmlsaXR5Rm9ybS5mYWN0b3JDb21wdXRlclxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKyBcIicsICdcIiArIHN1aXRhYmlsaXR5Rm9ybS5mYWN0b3JIb3VzaW5nXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICArIFwiJywgJ1wiICsgc3VpdGFiaWxpdHlGb3JtLmZhY3RvclRyYW5zcG9ydGF0aW9uXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICArIFwiJywgJ1wiICsgc3VpdGFiaWxpdHlGb3JtLmZhY3RvckRheWNhcmVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICsgXCInLCAnXCIgKyBzdWl0YWJpbGl0eUZvcm0uZmFjdG9ySW50ZXJuZXRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICsgXCInLCAnXCIgKyBzdWl0YWJpbGl0eUZvcm0uZmFjdG9yUGVyc29uYWxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICsgXCInLCAnXCIgKyBzdWl0YWJpbGl0eUZvcm0uZmFjdG9yT3RoZXJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICsgXCInLCAnXCIgKyBzdWl0YWJpbGl0eUZvcm0uc3VtbWFyeVRyYW5zcG9ydGF0aW9uXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICArIFwiJywgJ1wiICsgc3VpdGFiaWxpdHlGb3JtLnN1bW1hcnlIb3VzaW5nXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICArIFwiJywgJ1wiICsgc3VpdGFiaWxpdHlGb3JtLnN1bW1hcnlDaGlsZGNhcmVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICsgXCInLCAnXCIgKyBzdWl0YWJpbGl0eUZvcm0uc3VtbWFyeUhlYWx0aFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKyBcIicsICdcIiArIHN1aXRhYmlsaXR5Rm9ybS5zdW1tYXJ5T3RoZXJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICsgXCInLCAnXCIgKyBzdWl0YWJpbGl0eUZvcm0uZGJUb3RhbFBvaW50c1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKyBcIicsICdcIiArIHN1aXRhYmlsaXR5Rm9ybS5nZW5lcmFsSW5mb0NvbW1lbnRzICsgXCInXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3IHNxbC5SZXF1ZXN0KGNvbm5lY3Rpb24pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucXVlcnkoXCJJTlNFUlQgSU5UTyBTdWl0YWJpbGl0eUZvcm0gVkFMVUVTIChcIiArIHN1aXRhYmlsaXR5Rm9ybVF1ZXJ5ICsgXCIpXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJTdWl0YWJpbGl0eSBpbnNlcnRlZFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3IHNxbC5SZXF1ZXN0KGNvbm5lY3Rpb24pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnF1ZXJ5KFwiVVBEQVRFIENsaWVudHMgU0VUIHN1aXRhYmlsaXR5PSAnZmFsc2UnIFdIRVJFIHVzZXJJRCA9ICdcIiArIGlkWzBdLnVzZXJJRCArIFwiJ1wiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzLnNlbmQoeyBcInN1Y2Nlc3NcIjogXCJzdWNjZXNzXCIgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXMuc2VuZCh7IFwiZXJyb3JcIjogXCJlcnJvclwiIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJVcGRhdGUgY2xpZW50IFwiICsgZXJyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGVycikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXMuc2VuZCh7IFwiZXJyb3JcIjogXCJlcnJvclwiIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImluc2VydCBzdWl0YWJpbGl0eUZvcm0gXCIgKyBlcnIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzLnNlbmQoeyBcInN1Y2Nlc3NcIjogXCJzdWNjZXNzXCIgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJTdWl0YWJpbGl0eSBub3QgcHJvdmlkZWQuXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbihlcnIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzLnNlbmQoeyBcImVycm9yXCI6IFwiZXJyb3JcIiB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJpbnNlcnQgY2xpZW50IFwiICsgZXJyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3IHNxbC5SZXF1ZXN0KGNvbm5lY3Rpb24pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnF1ZXJ5KFwiREVMRVRFIEZST00gVXNlcnMgV0hFUkUgdXNlcklEID0gJ1wiICsgaWRbMF0udXNlcklEICsgXCInXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXMuc2VuZCh7IFwic3VjY2Vzc1wiOiBcInN1Y2Nlc3NcIiB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbihlcnIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcy5zZW5kKHsgXCJlcnJvclwiOiBcImVycm9yXCIgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkRlbGV0ZSB1c2VyIHdpdGggaWQgXCIgKyBpZFswXS51c2VySUQgKyBcIi4gXCIgKyBlcnIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXMuc2VuZCh7IFwiZXJyb3JcIjogXCJlcnJvciBzZWxlY3RpbmcgdXNlciBmcm9tIHVzZXJzXCIgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImdldCB1c2VyIFwiICsgZXJyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGVycikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXMuc2VuZCh7IFwiZXJyb3JcIjogXCJlcnJvciBpbnNlcnRpbmcgdXNlclwiIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImluc2VydCB1c2VyIFwiICsgZXJyKTtcclxuICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlcy5zZW5kKHsgXCJlcnJvclwiOiBlcnJvciB9KTtcclxuICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XHJcbiAgICAgICAgICAgICAgICAgIHJlcy5zZW5kKHsgXCJlcnJvclwiOiBcImVycm9yIHNlbGVjdGluZyBhbGwgdXNlcnNcIiB9KTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbihlcnIpIHtcclxuICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xyXG4gICAgICAgICAgICAgIHJlcy5zZW5kKHsgXCJlcnJvclwiOiBcImVycm9yXCIgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBjYXRjaCAoZSkge1xyXG4gICAgICBjb25zb2xlLmxvZyhlKTtcclxuICAgICAgcmVzLnNlbmQoeyBcImVycm9yXCI6IFwiZXJyb3IgaW4geW91ciByZXF1ZXN0XCIgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBhZGRTdWl0YWJpbGl0eShyZXE6IGV4cHJlc3MuUmVxdWVzdCwgcmVzOiBleHByZXNzLlJlc3BvbnNlKTogdm9pZCB7XHJcbiAgICB0cnkge1xyXG4gICAgICBuZXcgQXV0aENvbnRyb2xsZXIoKS5hdXRoVXNlcihyZXEsIHJlcywge1xyXG4gICAgICAgIHJlcXVpcmVkQXV0aDogYXV0aCwgZG9uZTogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICB2YXIgX2lkOiBzdHJpbmcgPSByZXEucGFyYW1zLl9pZDtcclxuICAgICAgICAgIHZhciBzdWl0YWJpbGl0eUZvcm0gPSByZXEuYm9keTtcclxuXHJcbiAgICAgICAgICBzcWwuY29ubmVjdChjb25maWcpXHJcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKGNvbm5lY3Rpb24pIHtcclxuXHJcbiAgICAgICAgICAgICAgdmFyIHN1aXRhYmlsaXR5Rm9ybVF1ZXJ5ID0gXCInXCIgKyBfaWRcclxuICAgICAgICAgICAgICAgICsgXCInLCAnXCIgKyBzdWl0YWJpbGl0eUZvcm0udHJhbnNjcmlwdFxyXG4gICAgICAgICAgICAgICAgKyBcIicsICdcIiArIHN1aXRhYmlsaXR5Rm9ybS5jb3Vyc2VzXHJcbiAgICAgICAgICAgICAgICArIFwiJywgJ1wiICsgc3VpdGFiaWxpdHlGb3JtLmdvYWxcclxuICAgICAgICAgICAgICAgICsgXCInLCAnXCIgKyBzdWl0YWJpbGl0eUZvcm0udHJhbnNpdGlvbkRhdGVcclxuICAgICAgICAgICAgICAgICsgXCInLCAnXCIgKyBzdWl0YWJpbGl0eUZvcm0uZ292ZXJubWVudElEXHJcbiAgICAgICAgICAgICAgICArIFwiJywgJ1wiICsgc3VpdGFiaWxpdHlGb3JtLmFwcHJvcHJpYXRlR29hbFxyXG4gICAgICAgICAgICAgICAgKyBcIicsICdcIiArIHN1aXRhYmlsaXR5Rm9ybS5pc1ZhbGlkQWdlXHJcbiAgICAgICAgICAgICAgICArIFwiJywgJ1wiICsgc3VpdGFiaWxpdHlGb3JtLnNjaG9vbFJlZ2lzdHJhdGlvblxyXG4gICAgICAgICAgICAgICAgKyBcIicsICdcIiArIHN1aXRhYmlsaXR5Rm9ybS5hdmFpbGFibGVEdXJpbmdDbGFzc1xyXG4gICAgICAgICAgICAgICAgKyBcIicsICdcIiArIHN1aXRhYmlsaXR5Rm9ybS5sYXN0R3JhZGVcclxuICAgICAgICAgICAgICAgICsgXCInLCAnXCIgKyBzdWl0YWJpbGl0eUZvcm0ubGV2ZWxcclxuICAgICAgICAgICAgICAgICsgXCInLCAnXCIgKyBzdWl0YWJpbGl0eUZvcm0ub2ZmZXJTdGFydERhdGVcclxuICAgICAgICAgICAgICAgICsgXCInLCAnXCIgKyBzdWl0YWJpbGl0eUZvcm0ubWVldHNHb2FsXHJcbiAgICAgICAgICAgICAgICArIFwiJywgJ1wiICsgc3VpdGFiaWxpdHlGb3JtLnRpbWVPdXRPZlNjaG9vbFxyXG4gICAgICAgICAgICAgICAgKyBcIicsICdcIiArIHN1aXRhYmlsaXR5Rm9ybS5pblByb2dyYW1CZWZvcmVcclxuICAgICAgICAgICAgICAgICsgXCInLCAnXCIgKyBzdWl0YWJpbGl0eUZvcm0uZW1wbG95bWVudFxyXG4gICAgICAgICAgICAgICAgKyBcIicsICdcIiArIHN1aXRhYmlsaXR5Rm9ybS5pbmNvbWVTb3VyY2VcclxuICAgICAgICAgICAgICAgICsgXCInLCAnXCIgKyBzdWl0YWJpbGl0eUZvcm0uYWdlUmFuZ2VcclxuICAgICAgICAgICAgICAgICsgXCInLCAnXCIgKyBzdWl0YWJpbGl0eUZvcm0uaG91cnNQZXJXZWVrXHJcbiAgICAgICAgICAgICAgICArIFwiJywgJ1wiICsgc3VpdGFiaWxpdHlGb3JtLndvcmtIaXN0b3J5XHJcbiAgICAgICAgICAgICAgICArIFwiJywgJ1wiICsgc3VpdGFiaWxpdHlGb3JtLmZhY3RvckhlYWx0aFxyXG4gICAgICAgICAgICAgICAgKyBcIicsICdcIiArIHN1aXRhYmlsaXR5Rm9ybS5mYWN0b3JJbnN0cnVjdGlvbnNcclxuICAgICAgICAgICAgICAgICsgXCInLCAnXCIgKyBzdWl0YWJpbGl0eUZvcm0uZmFjdG9yQ29tbXVuaWNhdGlvblxyXG4gICAgICAgICAgICAgICAgKyBcIicsICdcIiArIHN1aXRhYmlsaXR5Rm9ybS5mYWN0b3JMYW5ndWFnZVxyXG4gICAgICAgICAgICAgICAgKyBcIicsICdcIiArIHN1aXRhYmlsaXR5Rm9ybS5mYWN0b3JDb21wdXRlclxyXG4gICAgICAgICAgICAgICAgKyBcIicsICdcIiArIHN1aXRhYmlsaXR5Rm9ybS5mYWN0b3JIb3VzaW5nXHJcbiAgICAgICAgICAgICAgICArIFwiJywgJ1wiICsgc3VpdGFiaWxpdHlGb3JtLmZhY3RvclRyYW5zcG9ydGF0aW9uXHJcbiAgICAgICAgICAgICAgICArIFwiJywgJ1wiICsgc3VpdGFiaWxpdHlGb3JtLmZhY3RvckRheWNhcmVcclxuICAgICAgICAgICAgICAgICsgXCInLCAnXCIgKyBzdWl0YWJpbGl0eUZvcm0uZmFjdG9ySW50ZXJuZXRcclxuICAgICAgICAgICAgICAgICsgXCInLCAnXCIgKyBzdWl0YWJpbGl0eUZvcm0uZmFjdG9yUGVyc29uYWxcclxuICAgICAgICAgICAgICAgICsgXCInLCAnXCIgKyBzdWl0YWJpbGl0eUZvcm0uZmFjdG9yT3RoZXJcclxuICAgICAgICAgICAgICAgICsgXCInLCAnXCIgKyBzdWl0YWJpbGl0eUZvcm0uc3VtbWFyeVRyYW5zcG9ydGF0aW9uXHJcbiAgICAgICAgICAgICAgICArIFwiJywgJ1wiICsgc3VpdGFiaWxpdHlGb3JtLnN1bW1hcnlIb3VzaW5nXHJcbiAgICAgICAgICAgICAgICArIFwiJywgJ1wiICsgc3VpdGFiaWxpdHlGb3JtLnN1bW1hcnlDaGlsZGNhcmVcclxuICAgICAgICAgICAgICAgICsgXCInLCAnXCIgKyBzdWl0YWJpbGl0eUZvcm0uc3VtbWFyeUhlYWx0aFxyXG4gICAgICAgICAgICAgICAgKyBcIicsICdcIiArIHN1aXRhYmlsaXR5Rm9ybS5zdW1tYXJ5T3RoZXJcclxuICAgICAgICAgICAgICAgICsgXCInLCAnXCIgKyBzdWl0YWJpbGl0eUZvcm0uZGJUb3RhbFBvaW50c1xyXG4gICAgICAgICAgICAgICAgKyBcIicsICdcIiArIHN1aXRhYmlsaXR5Rm9ybS5nZW5lcmFsSW5mb0NvbW1lbnRzICsgXCInXCI7XHJcbiAgICAgICAgICAgICAgbmV3IHNxbC5SZXF1ZXN0KGNvbm5lY3Rpb24pXHJcbiAgICAgICAgICAgICAgICAucXVlcnkoXCJJTlNFUlQgSU5UTyBTdWl0YWJpbGl0eUZvcm0gVkFMVUVTIChcIiArIHN1aXRhYmlsaXR5Rm9ybVF1ZXJ5ICsgXCIpXCIpXHJcbiAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgbmV3IHNxbC5SZXF1ZXN0KGNvbm5lY3Rpb24pXHJcbiAgICAgICAgICAgICAgICAgICAgLnF1ZXJ5KFwiVVBEQVRFIENsaWVudHMgU0VUIHN1aXRhYmlsaXR5ID0gJ2ZhbHNlJyBXSEVSRSB1c2VySUQgPSBcIiArIF9pZCArIFwiXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICByZXMuc2VuZCh7IFwic3VjY2Vzc1wiOiBcInN1Y2Nlc3NcIiB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9KS5jYXRjaCgpO1xyXG4gICAgICAgICAgICAgICAgfSkuY2F0Y2goKTtcclxuICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XHJcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyKTtcclxuICAgICAgICAgICAgICByZXMuc2VuZCh7IFwiZXJyb3JcIjogXCJlcnJvclwiIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgY2F0Y2ggKGUpIHtcclxuICAgICAgY29uc29sZS5sb2coZSk7XHJcbiAgICAgIHJlcy5zZW5kKHsgXCJlcnJvclwiOiBcImVycm9yIGluIHlvdXIgcmVxdWVzdFwiIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgdXBkYXRlKHJlcTogZXhwcmVzcy5SZXF1ZXN0LCByZXM6IGV4cHJlc3MuUmVzcG9uc2UpOiB2b2lkIHtcclxuICAgIHRyeSB7XHJcbiAgICAgIG5ldyBBdXRoQ29udHJvbGxlcigpLmF1dGhVc2VyKHJlcSwgcmVzLCB7XHJcbiAgICAgICAgcmVxdWlyZWRBdXRoOiBhdXRoLCBkb25lOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgIHZhciBjbGllbnQgPSByZXEuYm9keTtcclxuICAgICAgICAgIHZhciBfaWQ6IHN0cmluZyA9IHJlcS5wYXJhbXMuX2lkO1xyXG4gICAgICAgICAgc3FsLmNvbm5lY3QoY29uZmlnKVxyXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbihjb25uZWN0aW9uKSB7XHJcbiAgICAgICAgICAgICAgbmV3IHNxbC5SZXF1ZXN0KGNvbm5lY3Rpb24pXHJcbiAgICAgICAgICAgICAgICAucXVlcnkoXCJVUERBVEUgQ2xpZW50cyBTRVQgZmlyc3ROYW1lPSdcIiArIGNsaWVudC5maXJzdE5hbWUgKyBcIicsIGxhc3ROYW1lPSdcIiArIGNsaWVudC5sYXN0TmFtZSArIFwiJywgYmlydGhkYXRlPSdcIiArIGNsaWVudC5iaXJ0aGRheSArIFwiJywgcGhvbmU9J1wiICsgY2xpZW50LnBob25lICsgXCInIFdIRVJFIGNsaWVudElEID0gJ1wiICsgX2lkICsgXCInXCIpXHJcbiAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbihyZWNvcmRzZXQpIHtcclxuICAgICAgICAgICAgICAgICAgcmVzLnNlbmQoeyBcInN1Y2Nlc3NcIjogXCJzdWNjZXNzXCIgfSk7XHJcbiAgICAgICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbihlcnIpIHtcclxuICAgICAgICAgICAgICAgICAgcmVzLnNlbmQoeyBcImVycm9yXCI6IFwiZXJyb3JcIiB9KTsgY29uc29sZS5sb2coXCJVcGRhdGUgY2xpZW50IFwiICsgZXJyKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbihlcnIpIHtcclxuICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xyXG4gICAgICAgICAgICAgIHJlcy5zZW5kKHsgXCJlcnJvclwiOiBcImVycm9yXCIgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBjYXRjaCAoZSkge1xyXG4gICAgICBjb25zb2xlLmxvZyhlKTtcclxuICAgICAgcmVzLnNlbmQoeyBcImVycm9yXCI6IFwiZXJyb3IgaW4geW91ciByZXF1ZXN0XCIgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICB1cGRhdGVCYW5uZXJDYW1Cb29sKHJlcTogZXhwcmVzcy5SZXF1ZXN0LCByZXM6IGV4cHJlc3MuUmVzcG9uc2UpOiB2b2lkIHtcclxuICAgIHRyeSB7XHJcbiAgICAgIG5ldyBBdXRoQ29udHJvbGxlcigpLmF1dGhVc2VyKHJlcSwgcmVzLCB7XHJcbiAgICAgICAgcmVxdWlyZWRBdXRoOiBhdXRoLCBkb25lOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgIHZhciBjbGllbnQgPSByZXEuYm9keTtcclxuICAgICAgICAgIHNxbC5jb25uZWN0KGNvbmZpZylcclxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24oY29ubmVjdGlvbikge1xyXG4gICAgICAgICAgICAgIG5ldyBzcWwuUmVxdWVzdChjb25uZWN0aW9uKVxyXG4gICAgICAgICAgICAgICAgLnF1ZXJ5KFwiVVBEQVRFIENsaWVudHMgU0VUIGJhbm5lcj0nXCIgKyBjbGllbnQuYmFubmVyICsgXCInLCBjYW09J1wiICsgY2xpZW50LmNhbSArIFwiJyBXSEVSRSBjbGllbnRJRCA9ICdcIiArIGNsaWVudC5jbGllbnRJRCArIFwiJ1wiKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24ocmVjb3Jkc2V0KSB7XHJcbiAgICAgICAgICAgICAgICAgIHJlcy5zZW5kKHsgXCJzdWNjZXNzXCI6IFwic3VjY2Vzc1wiIH0pO1xyXG4gICAgICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgIHJlcy5zZW5kKHsgXCJlcnJvclwiOiBcImVycm9yXCIgfSk7XHJcbiAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiVXBkYXRlIGJhbm5lciBhbmQgY2FtIGJvb2xlYW5zIFwiICsgZXJyKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbihlcnIpIHtcclxuICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xyXG4gICAgICAgICAgICAgIHJlcy5zZW5kKHsgXCJlcnJvclwiOiBcImVycm9yXCIgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBjYXRjaCAoZSkge1xyXG4gICAgICBjb25zb2xlLmxvZyhlKTtcclxuICAgICAgcmVzLnNlbmQoeyBcImVycm9yXCI6IFwiZXJyb3IgaW4geW91ciByZXF1ZXN0XCIgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICB1cGRhdGVTdWl0YWJpbGl0eShyZXE6IGV4cHJlc3MuUmVxdWVzdCwgcmVzOiBleHByZXNzLlJlc3BvbnNlKTogdm9pZCB7XHJcbiAgICB0cnkge1xyXG4gICAgICBuZXcgQXV0aENvbnRyb2xsZXIoKS5hdXRoVXNlcihyZXEsIHJlcywge1xyXG4gICAgICAgIHJlcXVpcmVkQXV0aDogYXV0aCwgZG9uZTogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICB2YXIgc3VpdGFiaWxpdHkgPSByZXEuYm9keTtcclxuICAgICAgICAgIHNxbC5jb25uZWN0KGNvbmZpZylcclxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24oY29ubmVjdGlvbikge1xyXG4gICAgICAgICAgICAgIHZhciBxdWVyeSA9IFwiVVBEQVRFIFN1aXRhYmlsaXR5Rm9ybSBTRVQgdHJhbnNjcmlwdD0nXCIgKyBzdWl0YWJpbGl0eS50cmFuc2NyaXB0XHJcbiAgICAgICAgICAgICAgICArIFwiJywgY291cnNlcz0nXCIgKyBzdWl0YWJpbGl0eS5jb3Vyc2VzXHJcbiAgICAgICAgICAgICAgICArIFwiJywgZ29hbD0nXCIgKyBzdWl0YWJpbGl0eS5nb2FsXHJcbiAgICAgICAgICAgICAgICArIFwiJywgdHJhbnNpdGlvbkRhdGU9J1wiICsgc3VpdGFiaWxpdHkudHJhbnNpdGlvbkRhdGVcclxuICAgICAgICAgICAgICAgICsgXCInLCBnb3Zlcm5tZW50SUQ9J1wiICsgc3VpdGFiaWxpdHkuZ292ZXJubWVudElEXHJcbiAgICAgICAgICAgICAgICArIFwiJywgYXBwcm9wcmlhdGVHb2FsPSdcIiArIHN1aXRhYmlsaXR5LmFwcHJvcHJpYXRlR29hbFxyXG4gICAgICAgICAgICAgICAgKyBcIicsIGlzVmFsaWRBZ2U9J1wiICsgc3VpdGFiaWxpdHkuaXNWYWxpZEFnZVxyXG4gICAgICAgICAgICAgICAgKyBcIicsIHNjaG9vbFJlZ2lzdHJhdGlvbj0nXCIgKyBzdWl0YWJpbGl0eS5zY2hvb2xSZWdpc3RyYXRpb25cclxuICAgICAgICAgICAgICAgICsgXCInLCBhdmFpbGFibGVEdXJpbmdDbGFzcz0nXCIgKyBzdWl0YWJpbGl0eS5hdmFpbGFibGVEdXJpbmdDbGFzc1xyXG4gICAgICAgICAgICAgICAgKyBcIicsIGxhc3RHcmFkZT0nXCIgKyBzdWl0YWJpbGl0eS5sYXN0R3JhZGVcclxuICAgICAgICAgICAgICAgICsgXCInLCBsZXZlbD0nXCIgKyBzdWl0YWJpbGl0eS5sZXZlbFxyXG4gICAgICAgICAgICAgICAgKyBcIicsIG9mZmVyU3RhcnREYXRlPSdcIiArIHN1aXRhYmlsaXR5Lm9mZmVyU3RhcnREYXRlXHJcbiAgICAgICAgICAgICAgICArIFwiJywgbWVldHNHb2FsPSdcIiArIHN1aXRhYmlsaXR5Lm1lZXRzR29hbFxyXG4gICAgICAgICAgICAgICAgKyBcIicsIHRpbWVPdXRPZlNjaG9vbD0nXCIgKyBzdWl0YWJpbGl0eS50aW1lT3V0T2ZTY2hvb2xcclxuICAgICAgICAgICAgICAgICsgXCInLCBpblByb2dyYW1CZWZvcmU9J1wiICsgc3VpdGFiaWxpdHkuaW5Qcm9ncmFtQmVmb3JlXHJcbiAgICAgICAgICAgICAgICArIFwiJywgZW1wbG95bWVudD0nXCIgKyBzdWl0YWJpbGl0eS5lbXBsb3ltZW50XHJcbiAgICAgICAgICAgICAgICArIFwiJywgaW5jb21lU291cmNlPSdcIiArIHN1aXRhYmlsaXR5LmluY29tZVNvdXJjZVxyXG4gICAgICAgICAgICAgICAgKyBcIicsIGFnZVJhbmdlPSdcIiArIHN1aXRhYmlsaXR5LmFnZVJhbmdlXHJcbiAgICAgICAgICAgICAgICArIFwiJywgaG91cnNQZXJXZWVrPSdcIiArIHN1aXRhYmlsaXR5LmhvdXJzUGVyV2Vla1xyXG4gICAgICAgICAgICAgICAgKyBcIicsIHdvcmtIaXN0b3J5PSdcIiArIHN1aXRhYmlsaXR5LndvcmtIaXN0b3J5XHJcbiAgICAgICAgICAgICAgICArIFwiJywgZmFjdG9ySGVhbHRoPSdcIiArIHN1aXRhYmlsaXR5LmZhY3RvckhlYWx0aFxyXG4gICAgICAgICAgICAgICAgKyBcIicsIGZhY3Rvckluc3RydWN0aW9ucz0nXCIgKyBzdWl0YWJpbGl0eS5mYWN0b3JJbnN0cnVjdGlvbnNcclxuICAgICAgICAgICAgICAgICsgXCInLCBmYWN0b3JDb21tdW5pY2F0aW9uPSdcIiArIHN1aXRhYmlsaXR5LmZhY3RvckNvbW11bmljYXRpb25cclxuICAgICAgICAgICAgICAgICsgXCInLCBmYWN0b3JMYW5ndWFnZT0nXCIgKyBzdWl0YWJpbGl0eS5mYWN0b3JMYW5ndWFnZVxyXG4gICAgICAgICAgICAgICAgKyBcIicsIGZhY3RvckNvbXB1dGVyPSdcIiArIHN1aXRhYmlsaXR5LmZhY3RvckNvbXB1dGVyXHJcbiAgICAgICAgICAgICAgICArIFwiJywgZmFjdG9ySG91c2luZz0nXCIgKyBzdWl0YWJpbGl0eS5mYWN0b3JIb3VzaW5nXHJcbiAgICAgICAgICAgICAgICArIFwiJywgZmFjdG9yVHJhbnNwb3J0YXRpb249J1wiICsgc3VpdGFiaWxpdHkuZmFjdG9yVHJhbnNwb3J0YXRpb25cclxuICAgICAgICAgICAgICAgICsgXCInLCBmYWN0b3JEYXljYXJlPSdcIiArIHN1aXRhYmlsaXR5LmZhY3RvckRheWNhcmVcclxuICAgICAgICAgICAgICAgICsgXCInLCBmYWN0b3JJbnRlcm5ldD0nXCIgKyBzdWl0YWJpbGl0eS5mYWN0b3JJbnRlcm5ldFxyXG4gICAgICAgICAgICAgICAgKyBcIicsIGZhY3RvclBlcnNvbmFsPSdcIiArIHN1aXRhYmlsaXR5LmZhY3RvclBlcnNvbmFsXHJcbiAgICAgICAgICAgICAgICArIFwiJywgZmFjdG9yT3RoZXI9J1wiICsgc3VpdGFiaWxpdHkuZmFjdG9yT3RoZXJcclxuICAgICAgICAgICAgICAgICsgXCInLCBzdW1tYXJ5VHJhbnNwb3J0YXRpb249J1wiICsgc3VpdGFiaWxpdHkuc3VtbWFyeVRyYW5zcG9ydGF0aW9uXHJcbiAgICAgICAgICAgICAgICArIFwiJywgc3VtbWFyeUNoaWxkY2FyZT0nXCIgKyBzdWl0YWJpbGl0eS5zdW1tYXJ5Q2hpbGRjYXJlXHJcbiAgICAgICAgICAgICAgICArIFwiJywgc3VtbWFyeUhlYWx0aD0nXCIgKyBzdWl0YWJpbGl0eS5zdW1tYXJ5SGVhbHRoXHJcbiAgICAgICAgICAgICAgICArIFwiJywgc3VtbWFyeU90aGVyPSdcIiArIHN1aXRhYmlsaXR5LnN1bW1hcnlPdGhlclxyXG4gICAgICAgICAgICAgICAgKyBcIicsIHBvaW50cz0nXCIgKyBzdWl0YWJpbGl0eS5wb2ludHNcclxuICAgICAgICAgICAgICAgICsgXCInIFdIRVJFIHN1aXRhYmlsaXR5SUQgPSAnXCIgKyBzdWl0YWJpbGl0eS5zdWl0YWJpbGl0eUlEICsgXCInXCJcclxuICAgICAgICAgICAgICBuZXcgc3FsLlJlcXVlc3QoY29ubmVjdGlvbilcclxuICAgICAgICAgICAgICAgIC5xdWVyeShxdWVyeSlcclxuICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKHJlY29yZHNldCkge1xyXG4gICAgICAgICAgICAgICAgICByZXMuc2VuZCh7IFwic3VjY2Vzc1wiOiBcInN1Y2Nlc3NcIiB9KTtcclxuICAgICAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGVycikge1xyXG4gICAgICAgICAgICAgICAgICByZXMuc2VuZCh7IFwiZXJyb3JcIjogXCJlcnJvclwiIH0pOyBjb25zb2xlLmxvZyhcIlVwZGF0ZSBzdWl0YWJpbGl0eSBcIiArIGVycik7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XHJcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyKTtcclxuICAgICAgICAgICAgICByZXMuc2VuZCh7IFwiZXJyb3JcIjogXCJlcnJvclwiIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgY2F0Y2ggKGUpIHtcclxuICAgICAgY29uc29sZS5sb2coZSk7XHJcbiAgICAgIHJlcy5zZW5kKHsgXCJlcnJvclwiOiBcImVycm9yIGluIHlvdXIgcmVxdWVzdFwiIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZGVsZXRlKHJlcTogZXhwcmVzcy5SZXF1ZXN0LCByZXM6IGV4cHJlc3MuUmVzcG9uc2UpOiB2b2lkIHtcclxuICAgIHRyeSB7XHJcbiAgICAgIG5ldyBBdXRoQ29udHJvbGxlcigpLmF1dGhVc2VyKHJlcSwgcmVzLCB7XHJcbiAgICAgICAgcmVxdWlyZWRBdXRoOiBhdXRoLCBkb25lOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgIHZhciBfaWQ6IHN0cmluZyA9IHJlcS5wYXJhbXMuX2lkO1xyXG4gICAgICAgICAgc3FsLmNvbm5lY3QoY29uZmlnKVxyXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbihjb25uZWN0aW9uKSB7XHJcbiAgICAgICAgICAgICAgbmV3IHNxbC5SZXF1ZXN0KGNvbm5lY3Rpb24pXHJcbiAgICAgICAgICAgICAgICAucXVlcnkoXCJERUxFVEUgRlJPTSBDbGllbnRzIFdIRVJFIHVzZXJJRCA9ICdcIiArIF9pZCArIFwiJ1wiKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgIG5ldyBzcWwuUmVxdWVzdChjb25uZWN0aW9uKVxyXG4gICAgICAgICAgICAgICAgICAgIC5xdWVyeShcIkRFTEVURSBGUk9NIFVzZXJzIFdIRVJFIHVzZXJJRCA9ICdcIiArIF9pZCArIFwiJ1wiKVxyXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgcmVzLnNlbmQoeyBcInN1Y2Nlc3NcIjogXCJzdWNjZXNzXCIgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICByZXMuc2VuZCh7IFwiZXJyb3JcIjogXCJlcnJvclwiIH0pOyBjb25zb2xlLmxvZyhcIkRlbGV0ZSB1c2VyIHdpdGggaWQgXCIgKyBfaWQgKyBcIi4gXCIgKyBlcnIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgIHJlcy5zZW5kKHsgXCJlcnJvclwiOiBcImVycm9yXCIgfSk7IGNvbnNvbGUubG9nKFwiRGVsZXRlIGNsaWVudCB3aXRoIGlkIFwiICsgX2lkICsgXCIuIFwiICsgZXJyKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XHJcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyKTtcclxuICAgICAgICAgICAgICByZXMuc2VuZCh7IFwiZXJyb3JcIjogXCJlcnJvclwiIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgY2F0Y2ggKGUpIHtcclxuICAgICAgY29uc29sZS5sb2coZSk7XHJcbiAgICAgIHJlcy5zZW5kKHsgXCJlcnJvclwiOiBcImVycm9yIGluIHlvdXIgcmVxdWVzdFwiIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcmVtb3ZlRnJvbVRhYmxlKHJlcTogZXhwcmVzcy5SZXF1ZXN0LCByZXM6IGV4cHJlc3MuUmVzcG9uc2UpOiB2b2lkIHtcclxuICAgIHRyeSB7XHJcbiAgICAgIG5ldyBBdXRoQ29udHJvbGxlcigpLmF1dGhVc2VyKHJlcSwgcmVzLCB7XHJcbiAgICAgICAgcmVxdWlyZWRBdXRoOiBhdXRoLCBkb25lOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgIHZhciBfaWQ6IHN0cmluZyA9IHJlcS5wYXJhbXMuX2lkO1xyXG4gICAgICAgICAgc3FsLmNvbm5lY3QoY29uZmlnKVxyXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbihjb25uZWN0aW9uKSB7XHJcbiAgICAgICAgICAgICAgbmV3IHNxbC5SZXF1ZXN0KGNvbm5lY3Rpb24pXHJcbiAgICAgICAgICAgICAgICAucXVlcnkoXCJERUxFVEUgRlJPTSBDbGllbnRzIFdIRVJFIHVzZXJJRCA9ICdcIiArIF9pZCArIFwiJ1wiKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgIG5ldyBzcWwuUmVxdWVzdChjb25uZWN0aW9uKVxyXG4gICAgICAgICAgICAgICAgICAgIC5xdWVyeShcIlVQREFURSBVc2VycyBTRVQgdXNlclR5cGU9ICdTdHVkZW50JyBXSEVSRSB1c2VySUQgPSAnXCIgKyBfaWQgKyBcIidcIilcclxuICAgICAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICAgIHJlcy5zZW5kKHsgXCJzdWNjZXNzXCI6IFwic3VjY2Vzc1wiIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGVycikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgcmVzLnNlbmQoeyBcImVycm9yXCI6IFwiZXJyb3JcIiB9KTsgY29uc29sZS5sb2coXCJVcGRhdGUgdXNlciB1c2VyVHlwZSBcIiArIGVycik7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbihlcnIpIHtcclxuICAgICAgICAgICAgICAgICAgcmVzLnNlbmQoeyBcImVycm9yXCI6IFwiZXJyb3JcIiB9KTsgY29uc29sZS5sb2coXCJEZWxldGUgZm9ybSBjbGllbnQgdGFibGUgd2l0aCBpZCBcIiArIF9pZCArIFwiLiBcIiArIGVycik7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XHJcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyKTtcclxuICAgICAgICAgICAgICByZXMuc2VuZCh7IFwiZXJyb3JcIjogXCJlcnJvclwiIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgY2F0Y2ggKGUpIHtcclxuICAgICAgY29uc29sZS5sb2coZSk7XHJcbiAgICAgIHJlcy5zZW5kKHsgXCJlcnJvclwiOiBcImVycm9yIGluIHlvdXIgcmVxdWVzdFwiIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcmV0cmlldmUocmVxOiBleHByZXNzLlJlcXVlc3QsIHJlczogZXhwcmVzcy5SZXNwb25zZSk6IHZvaWQge1xyXG4gICAgdHJ5IHtcclxuICAgICAgbmV3IEF1dGhDb250cm9sbGVyKCkuYXV0aFVzZXIocmVxLCByZXMsIHtcclxuICAgICAgICByZXF1aXJlZEF1dGg6IGF1dGgsIGRvbmU6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgc3FsLmNvbm5lY3QoY29uZmlnKVxyXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbihjb25uZWN0aW9uKSB7XHJcbiAgICAgICAgICAgICAgbmV3IHNxbC5SZXF1ZXN0KGNvbm5lY3Rpb24pXHJcbiAgICAgICAgICAgICAgICAucXVlcnkoJ1NFTEVDVCBDbGllbnRzLiosIFVzZXJzLmVtYWlsLCBVc2Vycy5hY3RpdmUgZnJvbSBDbGllbnRzIExlZnQgSk9JTiBVc2VycyBPTiBDbGllbnRzLnVzZXJJRCA9IFVzZXJzLnVzZXJJRCcpXHJcbiAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbihjbGllbnRzKSB7XHJcbiAgICAgICAgICAgICAgICAgIG5ldyBzcWwuUmVxdWVzdChjb25uZWN0aW9uKVxyXG4gICAgICAgICAgICAgICAgICAgIC5xdWVyeSgnU0VMRUNUICogRlJPTSBTdWl0YWJpbGl0eUZvcm0nKVxyXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKHN1aXRhYmlsaXR5Rm9ybXMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgIG5ldyBzcWwuUmVxdWVzdChjb25uZWN0aW9uKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAucXVlcnkoJ1NFTEVDVCAqIEZST00gQ29uc2VudCcpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKGNvbnNlbnRGb3Jtcykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBzcWwuUmVxdWVzdChjb25uZWN0aW9uKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnF1ZXJ5KCdTRUxFQ1QgKiBGUk9NIExlYXJuaW5nU3R5bGUnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24obGVhcm5pbmdTdHlsZUZvcm1zKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcy5zZW5kKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGllbnRzOiBjbGllbnRzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1aXRhYmlsaXR5Rm9ybXM6IHN1aXRhYmlsaXR5Rm9ybXMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc2VudEZvcm1zOiBjb25zZW50Rm9ybXMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGVhcm5pbmdTdHlsZUZvcm1zOiBsZWFybmluZ1N0eWxlRm9ybXNcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbihlcnIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzLnNlbmQoeyBcImVycm9yXCI6IFwiZXJyb3JcIiB9KTsgY29uc29sZS5sb2coXCJHZXQgbGVhcm5pbmdTdHlsZUZvcm1zIFwiICsgZXJyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbihlcnIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICByZXMuc2VuZCh7IFwiZXJyb3JcIjogXCJlcnJvclwiIH0pOyBjb25zb2xlLmxvZyhcIkdldCBjb25zZW50Rm9ybXMgXCIgKyBlcnIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbihlcnIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgIHJlcy5zZW5kKHsgXCJlcnJvclwiOiBcImVycm9yXCIgfSk7IGNvbnNvbGUubG9nKFwiR2V0IHN1aXRhYmlsaXR5Rm9ybXMgXCIgKyBlcnIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgIHJlcy5zZW5kKHsgXCJlcnJvclwiOiBcImVycm9yXCIgfSk7IGNvbnNvbGUubG9nKFwiR2V0IGNsaWVudHMgXCIgKyBlcnIpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGVycikge1xyXG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XHJcbiAgICAgICAgICAgICAgcmVzLnNlbmQoeyBcImVycm9yXCI6IFwiZXJyb3JcIiB9KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICAgIGNhdGNoIChlKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKGUpO1xyXG4gICAgICByZXMuc2VuZCh7IFwiZXJyb3JcIjogXCJlcnJvciBpbiB5b3VyIHJlcXVlc3RcIiB9KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGZpbmRCeUlkKHJlcTogZXhwcmVzcy5SZXF1ZXN0LCByZXM6IGV4cHJlc3MuUmVzcG9uc2UpOiB2b2lkIHtcclxuICAgIHRyeSB7XHJcbiAgICAgIG5ldyBBdXRoQ29udHJvbGxlcigpLmF1dGhVc2VyKHJlcSwgcmVzLCB7XHJcbiAgICAgICAgcmVxdWlyZWRBdXRoOiBbXCJBZG1pblwiLCBcIlN0YWZmXCIsIFwiQ2xpZW50XCJdLCBkb25lOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgIHZhciBfaWQ6IHN0cmluZyA9IHJlcS5wYXJhbXMuX2lkO1xyXG4gICAgICAgICAgc3FsLmNvbm5lY3QoY29uZmlnKVxyXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbihjb25uZWN0aW9uKSB7XHJcbiAgICAgICAgICAgICAgbmV3IHNxbC5SZXF1ZXN0KGNvbm5lY3Rpb24pXHJcbiAgICAgICAgICAgICAgICAucXVlcnkoXCJTRUxFQ1QgKiBGUk9NIENsaWVudHMgV0hFUkUgdXNlcklEID0gJ1wiICsgX2lkICsgXCInXCIpXHJcbiAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbihjbGllbnQpIHtcclxuICAgICAgICAgICAgICAgICAgcmVzLnNlbmQoeyBjbGllbnQ6IGNsaWVudCB9KTtcclxuICAgICAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGVycikge1xyXG4gICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkdldCBjbGllbnQgYnkgaWQgXCIgKyBlcnIpO1xyXG4gICAgICAgICAgICAgICAgICByZXMuc2VuZCh7IFwiZXJyb3JcIjogXCJlcnJvclwiIH0pO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGVycikge1xyXG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XHJcbiAgICAgICAgICAgICAgcmVzLnNlbmQoeyBcImVycm9yXCI6IFwiZXJyb3JcIiB9KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICAgIGNhdGNoIChlKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKGUpO1xyXG4gICAgICByZXMuc2VuZCh7IFwiZXJyb3JcIjogXCJlcnJvciBpbiB5b3VyIHJlcXVlc3RcIiB9KTtcclxuICAgIH1cclxuICB9XHJcblxyXG59XHJcbmV4cG9ydCA9IENsaWVudENvbnRyb2xsZXI7XHJcbiJdfQ==
