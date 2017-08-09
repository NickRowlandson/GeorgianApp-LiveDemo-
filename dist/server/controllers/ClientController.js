"use strict";
var bcrypt = require("bcrypt");
var AuthController = require("../controllers/AuthController");
var MailService = require("../services/MailService");
var sql = require('mssql');
var auth = ["Admin", "Staff"];
var config = {
    user: 'NickRowlandson',
    password: 'georgianTest1',
    server: 'nr-comp2007.database.windows.net',
    database: 'GeorgianApp',
    options: {
        encrypt: true // Use this if you're on Windows Azure
    }
};
var ClientController = (function () {
    function ClientController() {
    }
    ClientController.prototype.create = function (req, res) {
        try {
            new AuthController().authUser(req, res, {
                requiredAuth: auth, done: function () {
                    var salt = bcrypt.genSaltSync(10);
                    var password = req.body.client.password;
                    // Hash the password with the salt
                    password = bcrypt.hashSync(password, salt);
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
                                new sql.Request(connection)
                                    .query("INSERT INTO Users VALUES ('" + client.username + "','" + client.password + "','Client')")
                                    .then(function () {
                                    new sql.Request(connection)
                                        .query("SELECT userID FROM Users WHERE username = '" + client.username + "' AND password = '" + client.password + "'")
                                        .then(function (id) {
                                        var clientQuery = "'" + id[0].userID + "', '" +
                                            client.firstName + "', '" +
                                            client.lastName + "', '" +
                                            client.email + "', '" +
                                            client.inquiryDate + "', '" +
                                            client.birthday + "', '" +
                                            client.phone + "', '" +
                                            true + "', '" +
                                            true + "', '" +
                                            true + "'";
                                        try {
                                            new MailService().welcomeMessage(client);
                                        }
                                        catch (e) {
                                            console.log("Invalid email address provided...");
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
                                                .query("DELETE FROM Users WHERE userID = '" + id[0] + "'")
                                                .then(function () {
                                                res.send({ "success": "success" });
                                            }).catch(function (err) {
                                                res.send({ "error": "error" });
                                                console.log("Delete user with id " + id[0] + ". " + err);
                                            });
                                        });
                                    }).catch(function (err) {
                                        res.send({ "error": "error" });
                                        console.log("get user " + err);
                                    });
                                }).catch(function (err) {
                                    res.send({ "error": "error" });
                                    console.log("insert user " + err);
                                });
                            }
                            else {
                                res.send({ "error": error });
                            }
                        }).catch(function (err) {
                            console.log(err);
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
                            .query("UPDATE Clients SET firstName='" + client.firstName + "', lastName='" + client.lastName + "', birthdate='" + client.birthday + "', email='" + client.email + "', phone='" + client.phone + "' WHERE studentID = '" + _id + "'")
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
                            .query('SELECT * FROM Clients')
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NlcnZlci9zcmMvY29udHJvbGxlcnMvQ2xpZW50Q29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBRUEsK0JBQWtDO0FBQ2xDLDhEQUFpRTtBQUNqRSxJQUFNLFdBQVcsR0FBRyxPQUFPLENBQUMseUJBQXlCLENBQUMsQ0FBQztBQUN2RCxJQUFJLEdBQUcsR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDM0IsSUFBSSxJQUFJLEdBQUcsQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUM7QUFFOUIsSUFBTSxNQUFNLEdBQUc7SUFDWCxJQUFJLEVBQUUsZ0JBQWdCO0lBQ3RCLFFBQVEsRUFBRSxlQUFlO0lBQ3pCLE1BQU0sRUFBRSxrQ0FBa0M7SUFDMUMsUUFBUSxFQUFFLGFBQWE7SUFDdkIsT0FBTyxFQUFFO1FBQ0wsT0FBTyxFQUFFLElBQUksQ0FBQyxzQ0FBc0M7S0FDdkQ7Q0FDSixDQUFBO0FBRUQ7SUFBQTtJQTBjQSxDQUFDO0lBeGNHLGlDQUFNLEdBQU4sVUFBTyxHQUFvQixFQUFFLEdBQXFCO1FBQzlDLElBQUksQ0FBQztZQUNELElBQUksY0FBYyxFQUFFLENBQUMsUUFBUSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUU7Z0JBQ3BDLFlBQVksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFO29CQUN0QixJQUFJLElBQUksR0FBRyxNQUFNLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxDQUFDO29CQUNsQyxJQUFJLFFBQVEsR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUM7b0JBQ3hDLGtDQUFrQztvQkFDbEMsUUFBUSxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxDQUFDO29CQUMzQyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO29CQUNwQyxJQUFJLE1BQU0sR0FBRyxHQUFHLENBQUMsSUFB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QUUsQ0FBQyxDQUFDO3dCQUNuQyxDQUFDLENBQUMsQ0FBQztvQkFDWCxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsVUFBUyxHQUFHO3dCQUNqQixPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO3dCQUNqQixHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxDQUFDLENBQUM7b0JBQ25DLENBQUMsQ0FBQyxDQUFDO2dCQUNYLENBQUM7YUFDSixDQUFDLENBQUM7UUFDUCxDQUFDO1FBQ0QsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNQLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDZixHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsT0FBTyxFQUFFLHVCQUF1QixFQUFFLENBQUMsQ0FBQztRQUNuRCxDQUFDO0lBQ0wsQ0FBQztJQUVMLHVCQUFDO0FBQUQsQ0ExY0EsQUEwY0MsSUFBQTtBQUNELGlCQUFTLGdCQUFnQixDQUFDIiwiZmlsZSI6ImNvbnRyb2xsZXJzL0NsaWVudENvbnRyb2xsZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgZXhwcmVzcyA9IHJlcXVpcmUoXCJleHByZXNzXCIpO1xyXG5pbXBvcnQgand0ID0gcmVxdWlyZSgnanNvbndlYnRva2VuJyk7XHJcbmltcG9ydCBiY3J5cHQgPSByZXF1aXJlKCdiY3J5cHQnKTtcclxuaW1wb3J0IEF1dGhDb250cm9sbGVyID0gcmVxdWlyZShcIi4uL2NvbnRyb2xsZXJzL0F1dGhDb250cm9sbGVyXCIpO1xyXG5jb25zdCBNYWlsU2VydmljZSA9IHJlcXVpcmUoXCIuLi9zZXJ2aWNlcy9NYWlsU2VydmljZVwiKTtcclxudmFyIHNxbCA9IHJlcXVpcmUoJ21zc3FsJyk7XHJcbnZhciBhdXRoID0gW1wiQWRtaW5cIiwgXCJTdGFmZlwiXTtcclxuXHJcbmNvbnN0IGNvbmZpZyA9IHtcclxuICAgIHVzZXI6ICdOaWNrUm93bGFuZHNvbicsXHJcbiAgICBwYXNzd29yZDogJ2dlb3JnaWFuVGVzdDEnLFxyXG4gICAgc2VydmVyOiAnbnItY29tcDIwMDcuZGF0YWJhc2Uud2luZG93cy5uZXQnLCAvLyBZb3UgY2FuIHVzZSAnbG9jYWxob3N0XFxcXGluc3RhbmNlJyB0byBjb25uZWN0IHRvIG5hbWVkIGluc3RhbmNlXHJcbiAgICBkYXRhYmFzZTogJ0dlb3JnaWFuQXBwJyxcclxuICAgIG9wdGlvbnM6IHtcclxuICAgICAgICBlbmNyeXB0OiB0cnVlIC8vIFVzZSB0aGlzIGlmIHlvdSdyZSBvbiBXaW5kb3dzIEF6dXJlXHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIENsaWVudENvbnRyb2xsZXIge1xyXG5cclxuICAgIGNyZWF0ZShyZXE6IGV4cHJlc3MuUmVxdWVzdCwgcmVzOiBleHByZXNzLlJlc3BvbnNlKTogdm9pZCB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgbmV3IEF1dGhDb250cm9sbGVyKCkuYXV0aFVzZXIocmVxLCByZXMsIHtcclxuICAgICAgICAgICAgICAgIHJlcXVpcmVkQXV0aDogYXV0aCwgZG9uZTogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNhbHQgPSBiY3J5cHQuZ2VuU2FsdFN5bmMoMTApO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBwYXNzd29yZCA9IHJlcS5ib2R5LmNsaWVudC5wYXNzd29yZDtcclxuICAgICAgICAgICAgICAgICAgICAvLyBIYXNoIHRoZSBwYXNzd29yZCB3aXRoIHRoZSBzYWx0XHJcbiAgICAgICAgICAgICAgICAgICAgcGFzc3dvcmQgPSBiY3J5cHQuaGFzaFN5bmMocGFzc3dvcmQsIHNhbHQpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlcS5ib2R5LmNsaWVudC5wYXNzd29yZCA9IHBhc3N3b3JkO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBjbGllbnQgPSByZXEuYm9keS5jbGllbnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHN1aXRhYmlsaXR5Rm9ybSA9IHJlcS5ib2R5LnN1aXRhYmlsaXR5Rm9ybTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgc3FsLmNvbm5lY3QoY29uZmlnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbihjb25uZWN0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXcgc3FsLlJlcXVlc3QoY29ubmVjdGlvbilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucXVlcnkoXCJTRUxFQ1QgKiBGUk9NIFVzZXJzXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24odXNlcnMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHZhbGlkYXRlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBlcnJvcjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJlID0gL14oKFtePD4oKVtcXF1cXFxcLiw7Olxcc0BcXFwiXSsoXFwuW148PigpW1xcXVxcXFwuLDs6XFxzQFxcXCJdKykqKXwoXFxcIi4rXFxcIikpQCgoXFxbWzAtOV17MSwzfVxcLlswLTldezEsM31cXC5bMC05XXsxLDN9XFwuWzAtOV17MSwzfVxcXSl8KChbYS16QS1aXFwtMC05XStcXC4pK1thLXpBLVpdezIsfSkpJC87XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBlbWFpbFZhbGlkYXRpb24gPSByZS50ZXN0KGNsaWVudC5lbWFpbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IHVzZXIgb2YgdXNlcnMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh1c2VyLnVzZXJuYW1lID09PSBjbGllbnQudXNlcm5hbWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWxpZGF0ZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlcnJvciA9IFwidXNlcm5hbWUgaW4gdXNlXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFlbWFpbFZhbGlkYXRpb24gJiYgdmFsaWRhdGVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWxpZGF0ZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yID0gXCJpbmNvcnJlY3QgZW1haWwgZm9ybWF0XCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHZhbGlkYXRlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3IHNxbC5SZXF1ZXN0KGNvbm5lY3Rpb24pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnF1ZXJ5KFwiSU5TRVJUIElOVE8gVXNlcnMgVkFMVUVTICgnXCIgKyBjbGllbnQudXNlcm5hbWUgKyBcIicsJ1wiICsgY2xpZW50LnBhc3N3b3JkICsgXCInLCdDbGllbnQnKVwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXcgc3FsLlJlcXVlc3QoY29ubmVjdGlvbilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5xdWVyeShcIlNFTEVDVCB1c2VySUQgRlJPTSBVc2VycyBXSEVSRSB1c2VybmFtZSA9ICdcIiArIGNsaWVudC51c2VybmFtZSArIFwiJyBBTkQgcGFzc3dvcmQgPSAnXCIgKyBjbGllbnQucGFzc3dvcmQgKyBcIidcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKGlkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGNsaWVudFF1ZXJ5ID0gXCInXCIgKyBpZFswXS51c2VySUQgKyBcIicsICdcIiArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsaWVudC5maXJzdE5hbWUgKyBcIicsICdcIiArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsaWVudC5sYXN0TmFtZSArIFwiJywgJ1wiICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xpZW50LmVtYWlsICsgXCInLCAnXCIgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGllbnQuaW5xdWlyeURhdGUgKyBcIicsICdcIiArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsaWVudC5iaXJ0aGRheSArIFwiJywgJ1wiICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xpZW50LnBob25lICsgXCInLCAnXCIgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cnVlICsgXCInLCAnXCIgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cnVlICsgXCInLCAnXCIgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cnVlICsgXCInXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3IE1haWxTZXJ2aWNlKCkud2VsY29tZU1lc3NhZ2UoY2xpZW50KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiSW52YWxpZCBlbWFpbCBhZGRyZXNzIHByb3ZpZGVkLi4uXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXcgc3FsLlJlcXVlc3QoKS5xdWVyeShcIklOU0VSVCBJTlRPIENsaWVudHMgVkFMVUVTIChcIiArIGNsaWVudFF1ZXJ5ICsgXCIpXCIpLnRoZW4oZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChPYmplY3Qua2V5cyhzdWl0YWJpbGl0eUZvcm0pLmxlbmd0aCAhPSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgc3VpdGFiaWxpdHlGb3JtUXVlcnkgPSBcIidcIiArIGlkWzBdLnVzZXJJRFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICsgXCInLCAnXCIgKyBzdWl0YWJpbGl0eUZvcm0udHJhbnNjcmlwdFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICsgXCInLCAnXCIgKyBzdWl0YWJpbGl0eUZvcm0uY291cnNlc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICsgXCInLCAnXCIgKyBzdWl0YWJpbGl0eUZvcm0uZ29hbFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICsgXCInLCAnXCIgKyBzdWl0YWJpbGl0eUZvcm0udHJhbnNpdGlvbkRhdGVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICArIFwiJywgJ1wiICsgc3VpdGFiaWxpdHlGb3JtLmdvdmVybm1lbnRJRFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICsgXCInLCAnXCIgKyBzdWl0YWJpbGl0eUZvcm0uYXBwcm9wcmlhdGVHb2FsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKyBcIicsICdcIiArIHN1aXRhYmlsaXR5Rm9ybS5pc1ZhbGlkQWdlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKyBcIicsICdcIiArIHN1aXRhYmlsaXR5Rm9ybS5zY2hvb2xSZWdpc3RyYXRpb25cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICArIFwiJywgJ1wiICsgc3VpdGFiaWxpdHlGb3JtLmF2YWlsYWJsZUR1cmluZ0NsYXNzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKyBcIicsICdcIiArIHN1aXRhYmlsaXR5Rm9ybS5sYXN0R3JhZGVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICArIFwiJywgJ1wiICsgc3VpdGFiaWxpdHlGb3JtLmxldmVsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKyBcIicsICdcIiArIHN1aXRhYmlsaXR5Rm9ybS5vZmZlclN0YXJ0RGF0ZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICsgXCInLCAnXCIgKyBzdWl0YWJpbGl0eUZvcm0ubWVldHNHb2FsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKyBcIicsICdcIiArIHN1aXRhYmlsaXR5Rm9ybS50aW1lT3V0T2ZTY2hvb2xcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICArIFwiJywgJ1wiICsgc3VpdGFiaWxpdHlGb3JtLmluUHJvZ3JhbUJlZm9yZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICsgXCInLCAnXCIgKyBzdWl0YWJpbGl0eUZvcm0uZW1wbG95bWVudFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICsgXCInLCAnXCIgKyBzdWl0YWJpbGl0eUZvcm0uaW5jb21lU291cmNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKyBcIicsICdcIiArIHN1aXRhYmlsaXR5Rm9ybS5hZ2VSYW5nZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICsgXCInLCAnXCIgKyBzdWl0YWJpbGl0eUZvcm0uaG91cnNQZXJXZWVrXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKyBcIicsICdcIiArIHN1aXRhYmlsaXR5Rm9ybS53b3JrSGlzdG9yeVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICsgXCInLCAnXCIgKyBzdWl0YWJpbGl0eUZvcm0uZmFjdG9ySGVhbHRoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKyBcIicsICdcIiArIHN1aXRhYmlsaXR5Rm9ybS5mYWN0b3JJbnN0cnVjdGlvbnNcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICArIFwiJywgJ1wiICsgc3VpdGFiaWxpdHlGb3JtLmZhY3RvckNvbW11bmljYXRpb25cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICArIFwiJywgJ1wiICsgc3VpdGFiaWxpdHlGb3JtLmZhY3Rvckxhbmd1YWdlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKyBcIicsICdcIiArIHN1aXRhYmlsaXR5Rm9ybS5mYWN0b3JDb21wdXRlclxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICsgXCInLCAnXCIgKyBzdWl0YWJpbGl0eUZvcm0uZmFjdG9ySG91c2luZ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICsgXCInLCAnXCIgKyBzdWl0YWJpbGl0eUZvcm0uZmFjdG9yVHJhbnNwb3J0YXRpb25cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICArIFwiJywgJ1wiICsgc3VpdGFiaWxpdHlGb3JtLmZhY3RvckRheWNhcmVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICArIFwiJywgJ1wiICsgc3VpdGFiaWxpdHlGb3JtLmZhY3RvckludGVybmV0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKyBcIicsICdcIiArIHN1aXRhYmlsaXR5Rm9ybS5mYWN0b3JQZXJzb25hbFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICsgXCInLCAnXCIgKyBzdWl0YWJpbGl0eUZvcm0uZmFjdG9yT3RoZXJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICArIFwiJywgJ1wiICsgc3VpdGFiaWxpdHlGb3JtLnN1bW1hcnlUcmFuc3BvcnRhdGlvblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICsgXCInLCAnXCIgKyBzdWl0YWJpbGl0eUZvcm0uc3VtbWFyeUhvdXNpbmdcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICArIFwiJywgJ1wiICsgc3VpdGFiaWxpdHlGb3JtLnN1bW1hcnlDaGlsZGNhcmVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICArIFwiJywgJ1wiICsgc3VpdGFiaWxpdHlGb3JtLnN1bW1hcnlIZWFsdGhcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICArIFwiJywgJ1wiICsgc3VpdGFiaWxpdHlGb3JtLnN1bW1hcnlPdGhlclxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICsgXCInLCAnXCIgKyBzdWl0YWJpbGl0eUZvcm0uZGJUb3RhbFBvaW50cyArIFwiJ1wiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3IHNxbC5SZXF1ZXN0KGNvbm5lY3Rpb24pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnF1ZXJ5KFwiSU5TRVJUIElOVE8gU3VpdGFiaWxpdHlGb3JtIFZBTFVFUyAoXCIgKyBzdWl0YWJpbGl0eUZvcm1RdWVyeSArIFwiKVwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlN1aXRhYmlsaXR5IGluc2VydGVkXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXcgc3FsLlJlcXVlc3QoY29ubmVjdGlvbilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5xdWVyeShcIlVQREFURSBDbGllbnRzIFNFVCBzdWl0YWJpbGl0eT0gJ2ZhbHNlJyBXSEVSRSB1c2VySUQgPSAnXCIgKyBpZFswXS51c2VySUQgKyBcIidcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcy5zZW5kKHsgXCJzdWNjZXNzXCI6IFwic3VjY2Vzc1wiIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzLnNlbmQoeyBcImVycm9yXCI6IFwiZXJyb3JcIiB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlVwZGF0ZSBjbGllbnQgXCIgKyBlcnIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcy5zZW5kKHsgXCJlcnJvclwiOiBcImVycm9yXCIgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiaW5zZXJ0IHN1aXRhYmlsaXR5Rm9ybSBcIiArIGVycik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXMuc2VuZCh7IFwic3VjY2Vzc1wiOiBcInN1Y2Nlc3NcIiB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiU3VpdGFiaWxpdHkgbm90IHByb3ZpZGVkLlwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGVycikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXMuc2VuZCh7IFwiZXJyb3JcIjogXCJlcnJvclwiIH0pOyBjb25zb2xlLmxvZyhcImluc2VydCBjbGllbnQgXCIgKyBlcnIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXcgc3FsLlJlcXVlc3QoY29ubmVjdGlvbilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5xdWVyeShcIkRFTEVURSBGUk9NIFVzZXJzIFdIRVJFIHVzZXJJRCA9ICdcIiArIGlkWzBdICsgXCInXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXMuc2VuZCh7IFwic3VjY2Vzc1wiOiBcInN1Y2Nlc3NcIiB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGVycikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcy5zZW5kKHsgXCJlcnJvclwiOiBcImVycm9yXCIgfSk7IGNvbnNvbGUubG9nKFwiRGVsZXRlIHVzZXIgd2l0aCBpZCBcIiArIGlkWzBdICsgXCIuIFwiICsgZXJyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzLnNlbmQoeyBcImVycm9yXCI6IFwiZXJyb3JcIiB9KTsgY29uc29sZS5sb2coXCJnZXQgdXNlciBcIiArIGVycik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbihlcnIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzLnNlbmQoeyBcImVycm9yXCI6IFwiZXJyb3JcIiB9KTsgY29uc29sZS5sb2coXCJpbnNlcnQgdXNlciBcIiArIGVycik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXMuc2VuZCh7IFwiZXJyb3JcIjogZXJyb3IgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGVycikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXMuc2VuZCh7IFwiZXJyb3JcIjogXCJlcnJvclwiIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbihlcnIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXMuc2VuZCh7IFwiZXJyb3JcIjogXCJlcnJvclwiIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGUpO1xyXG4gICAgICAgICAgICByZXMuc2VuZCh7IFwiZXJyb3JcIjogXCJlcnJvciBpbiB5b3VyIHJlcXVlc3RcIiB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgYWRkU3VpdGFiaWxpdHkocmVxOiBleHByZXNzLlJlcXVlc3QsIHJlczogZXhwcmVzcy5SZXNwb25zZSk6IHZvaWQge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIG5ldyBBdXRoQ29udHJvbGxlcigpLmF1dGhVc2VyKHJlcSwgcmVzLCB7XHJcbiAgICAgICAgICAgICAgICByZXF1aXJlZEF1dGg6IGF1dGgsIGRvbmU6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBfaWQ6IHN0cmluZyA9IHJlcS5wYXJhbXMuX2lkO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBzdWl0YWJpbGl0eUZvcm0gPSByZXEuYm9keTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgc3FsLmNvbm5lY3QoY29uZmlnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbihjb25uZWN0aW9uKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBzdWl0YWJpbGl0eUZvcm1RdWVyeSA9IFwiJ1wiICsgX2lkXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICsgXCInLCAnXCIgKyBzdWl0YWJpbGl0eUZvcm0udHJhbnNjcmlwdFxyXG4gICAgICAgICAgICAgICAgICAgICAgICArIFwiJywgJ1wiICsgc3VpdGFiaWxpdHlGb3JtLmNvdXJzZXNcclxuICAgICAgICAgICAgICAgICAgICAgICAgKyBcIicsICdcIiArIHN1aXRhYmlsaXR5Rm9ybS5nb2FsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICsgXCInLCAnXCIgKyBzdWl0YWJpbGl0eUZvcm0udHJhbnNpdGlvbkRhdGVcclxuICAgICAgICAgICAgICAgICAgICAgICAgKyBcIicsICdcIiArIHN1aXRhYmlsaXR5Rm9ybS5nb3Zlcm5tZW50SURcclxuICAgICAgICAgICAgICAgICAgICAgICAgKyBcIicsICdcIiArIHN1aXRhYmlsaXR5Rm9ybS5hcHByb3ByaWF0ZUdvYWxcclxuICAgICAgICAgICAgICAgICAgICAgICAgKyBcIicsICdcIiArIHN1aXRhYmlsaXR5Rm9ybS5pc1ZhbGlkQWdlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICsgXCInLCAnXCIgKyBzdWl0YWJpbGl0eUZvcm0uc2Nob29sUmVnaXN0cmF0aW9uXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICsgXCInLCAnXCIgKyBzdWl0YWJpbGl0eUZvcm0uYXZhaWxhYmxlRHVyaW5nQ2xhc3NcclxuICAgICAgICAgICAgICAgICAgICAgICAgKyBcIicsICdcIiArIHN1aXRhYmlsaXR5Rm9ybS5sYXN0R3JhZGVcclxuICAgICAgICAgICAgICAgICAgICAgICAgKyBcIicsICdcIiArIHN1aXRhYmlsaXR5Rm9ybS5sZXZlbFxyXG4gICAgICAgICAgICAgICAgICAgICAgICArIFwiJywgJ1wiICsgc3VpdGFiaWxpdHlGb3JtLm9mZmVyU3RhcnREYXRlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICsgXCInLCAnXCIgKyBzdWl0YWJpbGl0eUZvcm0ubWVldHNHb2FsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICsgXCInLCAnXCIgKyBzdWl0YWJpbGl0eUZvcm0udGltZU91dE9mU2Nob29sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICsgXCInLCAnXCIgKyBzdWl0YWJpbGl0eUZvcm0uaW5Qcm9ncmFtQmVmb3JlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICsgXCInLCAnXCIgKyBzdWl0YWJpbGl0eUZvcm0uZW1wbG95bWVudFxyXG4gICAgICAgICAgICAgICAgICAgICAgICArIFwiJywgJ1wiICsgc3VpdGFiaWxpdHlGb3JtLmluY29tZVNvdXJjZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICArIFwiJywgJ1wiICsgc3VpdGFiaWxpdHlGb3JtLmFnZVJhbmdlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICsgXCInLCAnXCIgKyBzdWl0YWJpbGl0eUZvcm0uaG91cnNQZXJXZWVrXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICsgXCInLCAnXCIgKyBzdWl0YWJpbGl0eUZvcm0ud29ya0hpc3RvcnlcclxuICAgICAgICAgICAgICAgICAgICAgICAgKyBcIicsICdcIiArIHN1aXRhYmlsaXR5Rm9ybS5mYWN0b3JIZWFsdGhcclxuICAgICAgICAgICAgICAgICAgICAgICAgKyBcIicsICdcIiArIHN1aXRhYmlsaXR5Rm9ybS5mYWN0b3JJbnN0cnVjdGlvbnNcclxuICAgICAgICAgICAgICAgICAgICAgICAgKyBcIicsICdcIiArIHN1aXRhYmlsaXR5Rm9ybS5mYWN0b3JDb21tdW5pY2F0aW9uXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICsgXCInLCAnXCIgKyBzdWl0YWJpbGl0eUZvcm0uZmFjdG9yTGFuZ3VhZ2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgKyBcIicsICdcIiArIHN1aXRhYmlsaXR5Rm9ybS5mYWN0b3JDb21wdXRlclxyXG4gICAgICAgICAgICAgICAgICAgICAgICArIFwiJywgJ1wiICsgc3VpdGFiaWxpdHlGb3JtLmZhY3RvckhvdXNpbmdcclxuICAgICAgICAgICAgICAgICAgICAgICAgKyBcIicsICdcIiArIHN1aXRhYmlsaXR5Rm9ybS5mYWN0b3JUcmFuc3BvcnRhdGlvblxyXG4gICAgICAgICAgICAgICAgICAgICAgICArIFwiJywgJ1wiICsgc3VpdGFiaWxpdHlGb3JtLmZhY3RvckRheWNhcmVcclxuICAgICAgICAgICAgICAgICAgICAgICAgKyBcIicsICdcIiArIHN1aXRhYmlsaXR5Rm9ybS5mYWN0b3JJbnRlcm5ldFxyXG4gICAgICAgICAgICAgICAgICAgICAgICArIFwiJywgJ1wiICsgc3VpdGFiaWxpdHlGb3JtLmZhY3RvclBlcnNvbmFsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICsgXCInLCAnXCIgKyBzdWl0YWJpbGl0eUZvcm0uZmFjdG9yT3RoZXJcclxuICAgICAgICAgICAgICAgICAgICAgICAgKyBcIicsICdcIiArIHN1aXRhYmlsaXR5Rm9ybS5zdW1tYXJ5VHJhbnNwb3J0YXRpb25cclxuICAgICAgICAgICAgICAgICAgICAgICAgKyBcIicsICdcIiArIHN1aXRhYmlsaXR5Rm9ybS5zdW1tYXJ5SG91c2luZ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICArIFwiJywgJ1wiICsgc3VpdGFiaWxpdHlGb3JtLnN1bW1hcnlDaGlsZGNhcmVcclxuICAgICAgICAgICAgICAgICAgICAgICAgKyBcIicsICdcIiArIHN1aXRhYmlsaXR5Rm9ybS5zdW1tYXJ5SGVhbHRoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICsgXCInLCAnXCIgKyBzdWl0YWJpbGl0eUZvcm0uc3VtbWFyeU90aGVyXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICsgXCInLCAnXCIgKyBzdWl0YWJpbGl0eUZvcm0uZGJUb3RhbFBvaW50cyArIFwiJ1wiO1xyXG4gICAgICAgICAgICAgICAgICAgIG5ldyBzcWwuUmVxdWVzdChjb25uZWN0aW9uKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAucXVlcnkoXCJJTlNFUlQgSU5UTyBTdWl0YWJpbGl0eUZvcm0gVkFMVUVTIChcIiArIHN1aXRhYmlsaXR5Rm9ybVF1ZXJ5ICsgXCIpXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBzcWwuUmVxdWVzdChjb25uZWN0aW9uKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucXVlcnkoXCJVUERBVEUgQ2xpZW50cyBTRVQgc3VpdGFiaWxpdHkgPSAnZmFsc2UnIFdIRVJFIHVzZXJJRCA9IFwiICsgX2lkICsgXCJcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzLnNlbmQoe1wic3VjY2Vzc1wiOiBcInN1Y2Nlc3NcIn0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KS5jYXRjaCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KS5jYXRjaCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICByZXMuc2VuZCh7IFwiZXJyb3JcIjogXCJlcnJvclwiIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGUpO1xyXG4gICAgICAgICAgICAgICAgICByZXMuc2VuZCh7IFwiZXJyb3JcIjogXCJlcnJvciBpbiB5b3VyIHJlcXVlc3RcIiB9KTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgdXBkYXRlKHJlcTogZXhwcmVzcy5SZXF1ZXN0LCByZXM6IGV4cHJlc3MuUmVzcG9uc2UpOiB2b2lkIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBuZXcgQXV0aENvbnRyb2xsZXIoKS5hdXRoVXNlcihyZXEsIHJlcywge1xyXG4gICAgICAgICAgICAgICAgcmVxdWlyZWRBdXRoOiBhdXRoLCBkb25lOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgY2xpZW50ID0gcmVxLmJvZHk7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIF9pZDogc3RyaW5nID0gcmVxLnBhcmFtcy5faWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgc3FsLmNvbm5lY3QoY29uZmlnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbihjb25uZWN0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXcgc3FsLlJlcXVlc3QoY29ubmVjdGlvbilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucXVlcnkoXCJVUERBVEUgQ2xpZW50cyBTRVQgZmlyc3ROYW1lPSdcIiArIGNsaWVudC5maXJzdE5hbWUgKyBcIicsIGxhc3ROYW1lPSdcIiArIGNsaWVudC5sYXN0TmFtZSArIFwiJywgYmlydGhkYXRlPSdcIiArIGNsaWVudC5iaXJ0aGRheSArIFwiJywgZW1haWw9J1wiICsgY2xpZW50LmVtYWlsICsgXCInLCBwaG9uZT0nXCIgKyBjbGllbnQucGhvbmUgKyBcIicgV0hFUkUgc3R1ZGVudElEID0gJ1wiICsgX2lkICsgXCInXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24ocmVjb3Jkc2V0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcy5zZW5kKHsgXCJzdWNjZXNzXCI6IFwic3VjY2Vzc1wiIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGVycikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXMuc2VuZCh7IFwiZXJyb3JcIjogXCJlcnJvclwiIH0pOyBjb25zb2xlLmxvZyhcIlVwZGF0ZSBjbGllbnQgXCIgKyBlcnIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbihlcnIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXMuc2VuZCh7IFwiZXJyb3JcIjogXCJlcnJvclwiIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGUpO1xyXG4gICAgICAgICAgICByZXMuc2VuZCh7IFwiZXJyb3JcIjogXCJlcnJvciBpbiB5b3VyIHJlcXVlc3RcIiB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlU3VpdGFiaWxpdHkocmVxOiBleHByZXNzLlJlcXVlc3QsIHJlczogZXhwcmVzcy5SZXNwb25zZSk6IHZvaWQge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIG5ldyBBdXRoQ29udHJvbGxlcigpLmF1dGhVc2VyKHJlcSwgcmVzLCB7XHJcbiAgICAgICAgICAgICAgICByZXF1aXJlZEF1dGg6IGF1dGgsIGRvbmU6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBzdWl0YWJpbGl0eSA9IHJlcS5ib2R5O1xyXG4gICAgICAgICAgICAgICAgICAgIHNxbC5jb25uZWN0KGNvbmZpZylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24oY29ubmVjdGlvbikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBxdWVyeSA9IFwiVVBEQVRFIFN1aXRhYmlsaXR5Rm9ybSBTRVQgdHJhbnNjcmlwdD0nXCIgKyBzdWl0YWJpbGl0eS50cmFuc2NyaXB0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKyBcIicsIGNvdXJzZXM9J1wiICsgc3VpdGFiaWxpdHkuY291cnNlc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICsgXCInLCBnb2FsPSdcIiArIHN1aXRhYmlsaXR5LmdvYWxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICArIFwiJywgdHJhbnNpdGlvbkRhdGU9J1wiICsgc3VpdGFiaWxpdHkudHJhbnNpdGlvbkRhdGVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICArIFwiJywgZ292ZXJubWVudElEPSdcIiArIHN1aXRhYmlsaXR5LmdvdmVybm1lbnRJRFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICsgXCInLCBhcHByb3ByaWF0ZUdvYWw9J1wiICsgc3VpdGFiaWxpdHkuYXBwcm9wcmlhdGVHb2FsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKyBcIicsIGlzVmFsaWRBZ2U9J1wiICsgc3VpdGFiaWxpdHkuaXNWYWxpZEFnZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICsgXCInLCBzY2hvb2xSZWdpc3RyYXRpb249J1wiICsgc3VpdGFiaWxpdHkuc2Nob29sUmVnaXN0cmF0aW9uXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKyBcIicsIGF2YWlsYWJsZUR1cmluZ0NsYXNzPSdcIiArIHN1aXRhYmlsaXR5LmF2YWlsYWJsZUR1cmluZ0NsYXNzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKyBcIicsIGxhc3RHcmFkZT0nXCIgKyBzdWl0YWJpbGl0eS5sYXN0R3JhZGVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICArIFwiJywgbGV2ZWw9J1wiICsgc3VpdGFiaWxpdHkubGV2ZWxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICArIFwiJywgb2ZmZXJTdGFydERhdGU9J1wiICsgc3VpdGFiaWxpdHkub2ZmZXJTdGFydERhdGVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICArIFwiJywgbWVldHNHb2FsPSdcIiArIHN1aXRhYmlsaXR5Lm1lZXRzR29hbFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICsgXCInLCB0aW1lT3V0T2ZTY2hvb2w9J1wiICsgc3VpdGFiaWxpdHkudGltZU91dE9mU2Nob29sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKyBcIicsIGluUHJvZ3JhbUJlZm9yZT0nXCIgKyBzdWl0YWJpbGl0eS5pblByb2dyYW1CZWZvcmVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICArIFwiJywgZW1wbG95bWVudD0nXCIgKyBzdWl0YWJpbGl0eS5lbXBsb3ltZW50XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKyBcIicsIGluY29tZVNvdXJjZT0nXCIgKyBzdWl0YWJpbGl0eS5pbmNvbWVTb3VyY2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICArIFwiJywgYWdlUmFuZ2U9J1wiICsgc3VpdGFiaWxpdHkuYWdlUmFuZ2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICArIFwiJywgaG91cnNQZXJXZWVrPSdcIiArIHN1aXRhYmlsaXR5LmhvdXJzUGVyV2Vla1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICsgXCInLCB3b3JrSGlzdG9yeT0nXCIgKyBzdWl0YWJpbGl0eS53b3JrSGlzdG9yeVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICsgXCInLCBmYWN0b3JIZWFsdGg9J1wiICsgc3VpdGFiaWxpdHkuZmFjdG9ySGVhbHRoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKyBcIicsIGZhY3Rvckluc3RydWN0aW9ucz0nXCIgKyBzdWl0YWJpbGl0eS5mYWN0b3JJbnN0cnVjdGlvbnNcclxuICAgICAgICAgICAgICAgICAgICAgICAgICArIFwiJywgZmFjdG9yQ29tbXVuaWNhdGlvbj0nXCIgKyBzdWl0YWJpbGl0eS5mYWN0b3JDb21tdW5pY2F0aW9uXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKyBcIicsIGZhY3Rvckxhbmd1YWdlPSdcIiArIHN1aXRhYmlsaXR5LmZhY3Rvckxhbmd1YWdlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKyBcIicsIGZhY3RvckNvbXB1dGVyPSdcIiArIHN1aXRhYmlsaXR5LmZhY3RvckNvbXB1dGVyXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKyBcIicsIGZhY3RvckhvdXNpbmc9J1wiICsgc3VpdGFiaWxpdHkuZmFjdG9ySG91c2luZ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICsgXCInLCBmYWN0b3JUcmFuc3BvcnRhdGlvbj0nXCIgKyBzdWl0YWJpbGl0eS5mYWN0b3JUcmFuc3BvcnRhdGlvblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICsgXCInLCBmYWN0b3JEYXljYXJlPSdcIiArIHN1aXRhYmlsaXR5LmZhY3RvckRheWNhcmVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICArIFwiJywgZmFjdG9ySW50ZXJuZXQ9J1wiICsgc3VpdGFiaWxpdHkuZmFjdG9ySW50ZXJuZXRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICArIFwiJywgZmFjdG9yUGVyc29uYWw9J1wiICsgc3VpdGFiaWxpdHkuZmFjdG9yUGVyc29uYWxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICArIFwiJywgZmFjdG9yT3RoZXI9J1wiICsgc3VpdGFiaWxpdHkuZmFjdG9yT3RoZXJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICArIFwiJywgc3VtbWFyeVRyYW5zcG9ydGF0aW9uPSdcIiArIHN1aXRhYmlsaXR5LnN1bW1hcnlUcmFuc3BvcnRhdGlvblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICsgXCInLCBzdW1tYXJ5Q2hpbGRjYXJlPSdcIiArIHN1aXRhYmlsaXR5LnN1bW1hcnlDaGlsZGNhcmVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICArIFwiJywgc3VtbWFyeUhlYWx0aD0nXCIgKyBzdWl0YWJpbGl0eS5zdW1tYXJ5SGVhbHRoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKyBcIicsIHN1bW1hcnlPdGhlcj0nXCIgKyBzdWl0YWJpbGl0eS5zdW1tYXJ5T3RoZXJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICArIFwiJywgcG9pbnRzPSdcIiArIHN1aXRhYmlsaXR5LnBvaW50c1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICsgXCInIFdIRVJFIHN1aXRhYmlsaXR5SUQgPSAnXCIgKyBzdWl0YWJpbGl0eS5zdWl0YWJpbGl0eUlEICtcIidcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3IHNxbC5SZXF1ZXN0KGNvbm5lY3Rpb24pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnF1ZXJ5KHF1ZXJ5KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKHJlY29yZHNldCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXMuc2VuZCh7IFwic3VjY2Vzc1wiOiBcInN1Y2Nlc3NcIiB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbihlcnIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzLnNlbmQoeyBcImVycm9yXCI6IFwiZXJyb3JcIiB9KTsgY29uc29sZS5sb2coXCJVcGRhdGUgc3VpdGFiaWxpdHkgXCIgKyBlcnIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbihlcnIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXMuc2VuZCh7IFwiZXJyb3JcIjogXCJlcnJvclwiIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGUpO1xyXG4gICAgICAgICAgICByZXMuc2VuZCh7IFwiZXJyb3JcIjogXCJlcnJvciBpbiB5b3VyIHJlcXVlc3RcIiB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZGVsZXRlKHJlcTogZXhwcmVzcy5SZXF1ZXN0LCByZXM6IGV4cHJlc3MuUmVzcG9uc2UpOiB2b2lkIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBuZXcgQXV0aENvbnRyb2xsZXIoKS5hdXRoVXNlcihyZXEsIHJlcywge1xyXG4gICAgICAgICAgICAgICAgcmVxdWlyZWRBdXRoOiBhdXRoLCBkb25lOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgX2lkOiBzdHJpbmcgPSByZXEucGFyYW1zLl9pZDtcclxuICAgICAgICAgICAgICAgICAgICBzcWwuY29ubmVjdChjb25maWcpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKGNvbm5lY3Rpb24pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBzcWwuUmVxdWVzdChjb25uZWN0aW9uKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5xdWVyeShcIkRFTEVURSBGUk9NIENsaWVudHMgV0hFUkUgdXNlcklEID0gJ1wiICsgX2lkICsgXCInXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBzcWwuUmVxdWVzdChjb25uZWN0aW9uKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnF1ZXJ5KFwiREVMRVRFIEZST00gVXNlcnMgV0hFUkUgdXNlcklEID0gJ1wiICsgX2lkICsgXCInXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXMuc2VuZCh7IFwic3VjY2Vzc1wiOiBcInN1Y2Nlc3NcIiB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGVycikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcy5zZW5kKHsgXCJlcnJvclwiOiBcImVycm9yXCIgfSk7IGNvbnNvbGUubG9nKFwiRGVsZXRlIHVzZXIgd2l0aCBpZCBcIiArIF9pZCArIFwiLiBcIiArIGVycik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbihlcnIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzLnNlbmQoeyBcImVycm9yXCI6IFwiZXJyb3JcIiB9KTsgY29uc29sZS5sb2coXCJEZWxldGUgY2xpZW50IHdpdGggaWQgXCIgKyBfaWQgKyBcIi4gXCIgKyBlcnIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzLnNlbmQoeyBcImVycm9yXCI6IFwiZXJyb3JcIiB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlKTtcclxuICAgICAgICAgICAgcmVzLnNlbmQoeyBcImVycm9yXCI6IFwiZXJyb3IgaW4geW91ciByZXF1ZXN0XCIgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJlbW92ZUZyb21UYWJsZShyZXE6IGV4cHJlc3MuUmVxdWVzdCwgcmVzOiBleHByZXNzLlJlc3BvbnNlKTogdm9pZCB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgbmV3IEF1dGhDb250cm9sbGVyKCkuYXV0aFVzZXIocmVxLCByZXMsIHtcclxuICAgICAgICAgICAgICAgIHJlcXVpcmVkQXV0aDogYXV0aCwgZG9uZTogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIF9pZDogc3RyaW5nID0gcmVxLnBhcmFtcy5faWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgc3FsLmNvbm5lY3QoY29uZmlnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbihjb25uZWN0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXcgc3FsLlJlcXVlc3QoY29ubmVjdGlvbilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucXVlcnkoXCJERUxFVEUgRlJPTSBDbGllbnRzIFdIRVJFIHVzZXJJRCA9ICdcIiArIF9pZCArIFwiJ1wiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXcgc3FsLlJlcXVlc3QoY29ubmVjdGlvbilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5xdWVyeShcIlVQREFURSBVc2VycyBTRVQgdXNlclR5cGU9ICdTdHVkZW50JyBXSEVSRSB1c2VySUQgPSAnXCIgKyBfaWQgKyBcIidcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcy5zZW5kKHsgXCJzdWNjZXNzXCI6IFwic3VjY2Vzc1wiIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzLnNlbmQoeyBcImVycm9yXCI6IFwiZXJyb3JcIiB9KTsgY29uc29sZS5sb2coXCJVcGRhdGUgdXNlciB1c2VyVHlwZSBcIiArIGVycik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbihlcnIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzLnNlbmQoeyBcImVycm9yXCI6IFwiZXJyb3JcIiB9KTsgY29uc29sZS5sb2coXCJEZWxldGUgZm9ybSBjbGllbnQgdGFibGUgd2l0aCBpZCBcIiArIF9pZCArIFwiLiBcIiArIGVycik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGVycikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcy5zZW5kKHsgXCJlcnJvclwiOiBcImVycm9yXCIgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coZSk7XHJcbiAgICAgICAgICAgIHJlcy5zZW5kKHsgXCJlcnJvclwiOiBcImVycm9yIGluIHlvdXIgcmVxdWVzdFwiIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXRyaWV2ZShyZXE6IGV4cHJlc3MuUmVxdWVzdCwgcmVzOiBleHByZXNzLlJlc3BvbnNlKTogdm9pZCB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgbmV3IEF1dGhDb250cm9sbGVyKCkuYXV0aFVzZXIocmVxLCByZXMsIHtcclxuICAgICAgICAgICAgICAgIHJlcXVpcmVkQXV0aDogYXV0aCwgZG9uZTogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3FsLmNvbm5lY3QoY29uZmlnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbihjb25uZWN0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXcgc3FsLlJlcXVlc3QoY29ubmVjdGlvbilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucXVlcnkoJ1NFTEVDVCAqIEZST00gQ2xpZW50cycpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24oY2xpZW50cykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXcgc3FsLlJlcXVlc3QoY29ubmVjdGlvbilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5xdWVyeSgnU0VMRUNUICogRlJPTSBTdWl0YWJpbGl0eUZvcm0nKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24oc3VpdGFiaWxpdHlGb3Jtcykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBzcWwuUmVxdWVzdChjb25uZWN0aW9uKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucXVlcnkoJ1NFTEVDVCAqIEZST00gQ29uc2VudCcpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKGNvbnNlbnRGb3Jtcykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3IHNxbC5SZXF1ZXN0KGNvbm5lY3Rpb24pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnF1ZXJ5KCdTRUxFQ1QgKiBGUk9NIExlYXJuaW5nU3R5bGUnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKGxlYXJuaW5nU3R5bGVGb3Jtcykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXMuc2VuZCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGllbnRzOiBjbGllbnRzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3VpdGFiaWxpdHlGb3Jtczogc3VpdGFiaWxpdHlGb3JtcyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNlbnRGb3JtczogY29uc2VudEZvcm1zLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGVhcm5pbmdTdHlsZUZvcm1zOiBsZWFybmluZ1N0eWxlRm9ybXNcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcy5zZW5kKHsgXCJlcnJvclwiOiBcImVycm9yXCIgfSk7IGNvbnNvbGUubG9nKFwiR2V0IGxlYXJuaW5nU3R5bGVGb3JtcyBcIiArIGVycik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGVycikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzLnNlbmQoeyBcImVycm9yXCI6IFwiZXJyb3JcIiB9KTsgY29uc29sZS5sb2coXCJHZXQgY29uc2VudEZvcm1zIFwiICsgZXJyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbihlcnIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXMuc2VuZCh7IFwiZXJyb3JcIjogXCJlcnJvclwiIH0pOyBjb25zb2xlLmxvZyhcIkdldCBzdWl0YWJpbGl0eUZvcm1zIFwiICsgZXJyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGVycikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXMuc2VuZCh7IFwiZXJyb3JcIjogXCJlcnJvclwiIH0pOyBjb25zb2xlLmxvZyhcIkdldCBjbGllbnRzIFwiICsgZXJyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzLnNlbmQoeyBcImVycm9yXCI6IFwiZXJyb3JcIiB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlKTtcclxuICAgICAgICAgICAgcmVzLnNlbmQoeyBcImVycm9yXCI6IFwiZXJyb3IgaW4geW91ciByZXF1ZXN0XCIgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZpbmRCeUlkKHJlcTogZXhwcmVzcy5SZXF1ZXN0LCByZXM6IGV4cHJlc3MuUmVzcG9uc2UpOiB2b2lkIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBuZXcgQXV0aENvbnRyb2xsZXIoKS5hdXRoVXNlcihyZXEsIHJlcywge1xyXG4gICAgICAgICAgICAgICAgcmVxdWlyZWRBdXRoOiBbXCJBZG1pblwiLCBcIlN0YWZmXCIsIFwiQ2xpZW50XCJdLCBkb25lOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgX2lkOiBzdHJpbmcgPSByZXEucGFyYW1zLl9pZDtcclxuICAgICAgICAgICAgICAgICAgICBzcWwuY29ubmVjdChjb25maWcpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKGNvbm5lY3Rpb24pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBzcWwuUmVxdWVzdChjb25uZWN0aW9uKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5xdWVyeShcIlNFTEVDVCAqIEZST00gQ2xpZW50cyBXSEVSRSB1c2VySUQgPSAnXCIgKyBfaWQgKyBcIidcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbihjbGllbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzLnNlbmQoeyBjbGllbnQ6IGNsaWVudCB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbihlcnIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJHZXQgY2xpZW50IGJ5IGlkIFwiICsgZXJyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzLnNlbmQoeyBcImVycm9yXCI6IFwiZXJyb3JcIiB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzLnNlbmQoeyBcImVycm9yXCI6IFwiZXJyb3JcIiB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlKTtcclxuICAgICAgICAgICAgcmVzLnNlbmQoeyBcImVycm9yXCI6IFwiZXJyb3IgaW4geW91ciByZXF1ZXN0XCIgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxufVxyXG5leHBvcnQgPSBDbGllbnRDb250cm9sbGVyO1xyXG4iXX0=
