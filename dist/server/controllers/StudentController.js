"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var AuthController = require("../controllers/AuthController");
var PRFService = require("../services/PRFService");
var MailService = require("../services/MailService");
var ActivityService = require("../services/ActivityService");
var sql = require('mssql');
var auth = ["Admin", "Staff", "Instructor"];
var config = require('../config');
var db = config.db;
var mail = config.mail;
var site_settings = config.site_settings;
var StudentController = /** @class */ (function () {
    function StudentController() {
    }
    StudentController.prototype.create = function (req, res) {
        try {
            new AuthController().authUser(req, res, {
                requiredAuth: auth, done: function () {
                    var student = req.body;
                    sql.connect(db)
                        .then(function (connection) {
                        new sql.Request(connection)
                            .query("INSERT INTO Students VALUES ('" + student.userID + "','"
                            + student.studentNumber + "','"
                            + student.firstName + "', '"
                            + student.lastName + "','"
                            + student.inquiryDate + "','"
                            + student.birthdate + "','"
                            + student.phone + "','"
                            + student.allowDetailedMessage + "','"
                            + student.okayToText + "','"
                            + student.alternateNumber + "','"
                            + student.allowDetailedMessageAlternate + "','"
                            + student.okayToTextAlternate + "','"
                            + student.editConsentRequest + "','"
                            + student.editConsentPermission + "','"
                            + student.comments + "')")
                            .then(function () {
                            res.send({ result: "success", title: "New User Created!", msg: "Student user has been successfully created!", serverMsg: "" });
                        }).catch(function (err) {
                            console.log("Error - Create new student: " + err);
                            res.send({ result: "error", title: "Connection Error", msg: "There was an error creating client as student.", serverMsg: err });
                        });
                    }).catch(function (err) {
                        console.log("DB Connection error: " + err);
                        res.send({ result: "error", title: "Connection Error", msg: "There was an error connecting to the database.", serverMsg: err });
                    });
                }
            });
        }
        catch (err) {
            console.log("Error - Create student: " + err);
            res.send({ result: "error", title: "Error", msg: "There was an error creating client as student.", serverMsg: err });
        }
    };
    StudentController.prototype.updateGeneralInfo = function (req, res) {
        try {
            new AuthController().authUser(req, res, {
                requiredAuth: auth, done: function () {
                    var student = req.body;
                    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                    var emailValidation = re.test(student.email);
                    if (!emailValidation) {
                        res.send({ result: "invalid", title: "Invalid Input", msg: "Incorrect email format.", serverMsg: "" });
                    }
                    else {
                        sql.connect(db)
                            .then(function (connection) {
                            new sql.Request(connection)
                                .query("SELECT userID, username, email FROM Users")
                                .then(function (users) {
                                var validated = true;
                                var error;
                                var currentUsername = users.filter(function (x) { return x.userID === student.userID; });
                                currentUsername = currentUsername[0].username;
                                users = users.filter(function (x) { return x.userID !== student.userID; });
                                student.username = student.firstName + student.lastName;
                                student.username = student.username.toLowerCase();
                                student.username = student.username.replace(/\s+/g, '');
                                for (var _i = 0, users_1 = users; _i < users_1.length; _i++) {
                                    var record = users_1[_i];
                                    if (record.username === student.username) {
                                        validated = false;
                                        error = "Username is already in use.";
                                        break;
                                    }
                                    else if (record.email === student.email && record.email !== "BA.ACP@georgiancollege.ca" && record.email !== "OR.ACP@georgiancollege.ca" && record.email !== "OS.ACP@georgiancollege.ca") {
                                        validated = false;
                                        error = "Email is already in use.";
                                        break;
                                    }
                                }
                                if (!validated) {
                                    res.send({ result: "invalid", title: "Invalid Input", msg: error, serverMsg: "" });
                                }
                                else {
                                    var studentsQuery = "UPDATE Students SET studentNumber='" + student.studentNumber
                                        + "', firstName='" + student.firstName
                                        + "', lastName='" + student.lastName
                                        + "', phone='" + student.phone
                                        + "', okayToText='" + student.okayToText
                                        + "', allowDetailedMessage='" + student.allowDetailedMessage
                                        + "', alternateNumber='" + student.alternateNumber
                                        + "', okayToTextAlternate='" + student.okayToTextAlternate
                                        + "', allowDetailedMessageAlternate='" + student.allowDetailedMessageAlternate
                                        + "', comments='" + student.comments
                                        + "' WHERE studentID = '" + student.studentID + "'";
                                    new sql.Request(connection)
                                        .query(studentsQuery)
                                        .then(function (studentsResult) {
                                        var usersQuery = "UPDATE Users SET email='" + student.email
                                            + "', username='" + student.username
                                            + "' WHERE userID = '" + student.userID + "'";
                                        new sql.Request(connection)
                                            .query(usersQuery)
                                            .then(function (usersResult) {
                                            if (currentUsername != student.username) {
                                                var mailOptions = {
                                                    from: mail.user,
                                                    to: student.email,
                                                    subject: 'Username Update!',
                                                    text: '',
                                                    html: 'Your username has been changed to <b>' + student.username + '</b>.<br /><br /> Login at ' + site_settings.url + '  <br /><br /> Thankyou' // html body
                                                };
                                                new MailService().sendMessage("Student Username Update", mailOptions);
                                            }
                                            res.send({ result: "success", title: "Update Success!", msg: "Student user updated!", serverMsg: "" });
                                        }).catch(function (err) {
                                            console.log("Error - Update user: " + err);
                                            res.send({ result: "error", title: "Error", msg: "There was an error updating user information.", serverMsg: err });
                                        });
                                    }).catch(function (err) {
                                        console.log("Error - Update student: " + err);
                                        res.send({ result: "error", title: "Error", msg: "There was an error updating student information.", serverMsg: err });
                                    });
                                }
                            }).catch(function (err) {
                                console.log("Error - Select userID, usearname and email from users: " + err);
                                res.send({ result: "error", title: "Error", msg: "There was an error retrieving userID, usearname and email from the users table.", serverMsg: err });
                            });
                        }).catch(function (err) {
                            console.log("DB Connection error: " + err);
                            res.send({ result: "error", title: "Connection Error", msg: "There was an error connecting to the database.", serverMsg: err });
                        });
                    }
                }
            });
        }
        catch (err) {
            console.log("Error - Update student info: " + err);
            res.send({ result: "error", title: "Error", msg: "There was an error updating this students information.", serverMsg: err });
        }
    };
    StudentController.prototype.getStudentsById = function (req, res) {
        try {
            new AuthController().authUser(req, res, {
                requiredAuth: ["Admin", "Staff", "Instructor"], done: function () {
                    var timetables = req.body;
                    var query = "SELECT * FROM Students WHERE userID =";
                    var count = 0;
                    for (var _i = 0, timetables_1 = timetables; _i < timetables_1.length; _i++) {
                        var timetable = timetables_1[_i];
                        if (count === 0) {
                            query += " " + timetable.userID;
                        }
                        else {
                            query += " OR userID = " + timetable.userID;
                        }
                        count++;
                    }
                    sql.connect(db)
                        .then(function (connection) {
                        new sql.Request(connection)
                            .query(query)
                            .then(function (recordset) {
                            res.send(recordset);
                        }).catch(function (err) {
                            console.log("Error - Get student by id: " + err);
                            res.send({ result: "error", title: "Error", msg: "There was an error retrieving student by ID.", serverMsg: err });
                        });
                    }).catch(function (err) {
                        console.log("DB Connection error: " + err);
                        res.send({ result: "error", title: "Connection Error", msg: "There was an error connecting to the database.", serverMsg: err });
                    });
                }
            });
        }
        catch (err) {
            console.log("Error - Get students by ID: " + err);
            res.send({ result: "error", title: "Error", msg: "There was an error getting students by ID.", serverMsg: err });
        }
    };
    StudentController.prototype.archiveStudent = function (req, res) {
        try {
            new AuthController().authUser(req, res, {
                requiredAuth: auth, done: function () {
                    var student = req.body;
                    sql.connect(db)
                        .then(function (connection) {
                        var userID = student.userID;
                        var email = student.email;
                        var studentNumber = student.studentNumber;
                        var firstName = student.firstName;
                        var lastName = student.lastName;
                        var inquiryDate = student.inquiryDate;
                        var birthdate = student.birthdate;
                        var phone = student.phone;
                        var allowDetailedMessage = student.allowDetailedMessage;
                        var okayToText = student.okayToText;
                        var alternateNumber = student.alternateNumber;
                        var allowDetailedMessageAlternate = student.allowDetailedMessageAlternate;
                        var okayToTextAlternate = student.okayToTextAlternate;
                        var editConsentRequest = student.editConsentRequest;
                        var editConsentPermission = student.editConsentPermission;
                        var comments = student.comments;
                        sql.query(templateObject_1 || (templateObject_1 = __makeTemplateObject(["INSERT INTO StudentArchive (userID, email, studentNumber, firstName, lastName, inquiryDate, birthdate, phone, allowDetailedMessage, okayToText, alternateNumber, allowDetailedMessageAlternate, okayToTextAlternate, editConsentRequest, editConsentPermission, comments)\n                VALUES(", ", ", ", ", ", ", ", ", ", ", ", ", ", ", ", ", ", ", ", ", ", ", ", ", ", ", ", ", ", ", ")"], ["INSERT INTO StudentArchive (userID, email, studentNumber, firstName, lastName, inquiryDate, birthdate, phone, allowDetailedMessage, okayToText, alternateNumber, allowDetailedMessageAlternate, okayToTextAlternate, editConsentRequest, editConsentPermission, comments)\n                VALUES(", ", ", ", ", ", ", ", ", ", ", ", ", ", ", ", ", ", ", ", ", ", ", ", ", ", ", ", ", ", ", ")"])), userID, email, studentNumber, firstName, lastName, inquiryDate, birthdate, phone, allowDetailedMessage, okayToText, alternateNumber, allowDetailedMessageAlternate, okayToTextAlternate, editConsentRequest, editConsentPermission, comments).then(function (result) {
                            console.log(result);
                            new sql.Request(connection)
                                .query("DELETE FROM Students WHERE userID = '" + student.userID + "'")
                                .then(function () {
                                new sql.Request(connection)
                                    .query("DELETE FROM Users WHERE userID = '" + student.userID + "'")
                                    .then(function () {
                                    res.send({ result: "success", title: "Student Archived", msg: "Student user has been successfully archived.", serverMsg: "" });
                                }).catch(function (err) {
                                    console.log("Error - Archive user with id " + student.userID + ": " + err);
                                    res.send({ result: "error", title: "Error", msg: "There was an error while archiving student.", serverMsg: err });
                                });
                            }).catch(function (err) {
                                console.log("Error - Archive student with id " + student.userID + ": " + err);
                                res.send({ result: "error", title: "Error", msg: "There was an error while removing student from students table.", serverMsg: err });
                            });
                        }).catch(function (err) {
                            console.log("Error - Archive user with id " + student.userID + ": " + err);
                            res.send({ result: "error", title: "Error", msg: "There was an error while adding student information to the archive table.", serverMsg: err });
                        });
                    }).catch(function (err) {
                        console.log("DB Connection error: " + err);
                        res.send({ result: "error", title: "Connection Error", msg: "There was an error while connecting to the database.", serverMsg: err });
                    });
                }
            });
        }
        catch (err) {
            console.log("Error - Archive student: " + err);
            res.send({ result: "error", title: "Error", msg: "There was an error while archiving student.", serverMsg: err });
        }
    };
    StudentController.prototype.getStudentArchive = function (req, res) {
        try {
            new AuthController().authUser(req, res, {
                requiredAuth: ["Admin", "Staff", "Instructor"], done: function () {
                    sql.connect(db)
                        .then(function (connection) {
                        new sql.Request(connection)
                            .query('SELECT * FROM StudentArchive')
                            .then(function (recordset) {
                            res.send(recordset);
                        }).catch(function (err) {
                            console.log("Error - Get all archived students: " + err);
                            res.send({ result: "error", title: "Error", msg: "There was an error retrieving all students from archive.", serverMsg: err });
                        });
                    }).catch(function (err) {
                        console.log("DB Connection error: " + err);
                        res.send({ result: "error", title: "Connection Error", msg: "There was an error connecting to the database.", serverMsg: err });
                    });
                }
            });
        }
        catch (err) {
            console.log("Error - Retrieve all students from archive: " + err);
            res.send({ result: "error", title: "Error", msg: "There was an error retrieving all students from archive.", serverMsg: err });
        }
    };
    StudentController.prototype.retrieve = function (req, res) {
        try {
            new AuthController().authUser(req, res, {
                requiredAuth: ["Admin", "Staff", "Instructor"], done: function () {
                    sql.connect(db)
                        .then(function (connection) {
                        new sql.Request(connection)
                            .query('SELECT Students.*, Users.email, Users.active FROM Students LEFT JOIN Users ON Students.userID = Users.UserID')
                            .then(function (recordset) {
                            res.send(recordset);
                        }).catch(function (err) {
                            console.log("Error - Get all students: " + err);
                            res.send({ result: "error", title: "Error", msg: "There was an error retrieving all students.", serverMsg: err });
                        });
                    }).catch(function (err) {
                        console.log("DB Connection error: " + err);
                        res.send({ result: "error", title: "Connection Error", msg: "There was an error connecting to the database.", serverMsg: err });
                    });
                }
            });
        }
        catch (err) {
            console.log("Error - Retrieve all students: " + err);
            res.send({ result: "error", title: "Error", msg: "There was an error retrieving all students.", serverMsg: err });
        }
    };
    StudentController.prototype.findById = function (req, res) {
        try {
            new AuthController().authUser(req, res, {
                requiredAuth: ["Admin", "Staff", "Instructor", "Student"], done: function () {
                    var _id = req.params._id;
                    sql.connect(db)
                        .then(function (connection) {
                        new sql.Request(connection)
                            .query("SELECT * FROM Students WHERE userID = '" + _id + "'")
                            .then(function (recordset) {
                            res.send(recordset[0]);
                        }).catch(function (err) {
                            console.log("Error - Find student by id: " + err);
                            res.send({ result: "error", title: "Error", msg: "There was an error retrieving student by id.", serverMsg: err });
                        });
                    }).catch(function (err) {
                        console.log("DB Connection error: " + err);
                        res.send({ result: "error", title: "Connection Error", msg: "There was an error connecting to the database.", serverMsg: err });
                    });
                }
            });
        }
        catch (err) {
            console.log("Error - Find student by id: " + err);
            res.send({ result: "error", title: "Error", msg: "There was an error retrieving student by id.", serverMsg: err });
        }
    };
    StudentController.prototype.editConsentRequest = function (req, res) {
        try {
            new AuthController().authUser(req, res, {
                requiredAuth: ["Admin", "Staff", "Instructor", "Student", "Client"], done: function () {
                    var _id = req.params._id;
                    sql.connect(db)
                        .then(function (connection) {
                        new sql.Request(connection)
                            .query('SELECT firstName, lastName FROM Students WHERE userID = ' + _id + '')
                            .then(function (student) {
                            new sql.Request(connection)
                                .query("UPDATE Students SET editConsentRequest = 'true' WHERE userID = " + _id + "")
                                .then(function (result) {
                                student = student[0];
                                var mailOptions = {
                                    from: mail.user,
                                    to: mail.user,
                                    subject: student.firstName + ' ' + student.lastName + ' Request to Edit Consent (Student)',
                                    text: '',
                                    html: 'Student ' + student.firstName + ' ' + student.lastName + ' wants to edit their consent form.<br/> Please login to the students page at: ' + site_settings.url + '/#/students. Search for ' + student.firstName + ' ' + student.lastName + ' in the students table, select View Info from the dropdown then select Consent to grant or deny access.' // html body
                                };
                                new MailService().sendMessage("Request to Edit Consent", mailOptions);
                                res.send({ result: "success", title: "Request Sent", msg: "Your request to edit consent has been sent!", serverMsg: "" });
                            }).catch(function (err) {
                                console.log("Error - Update request to edit" + err);
                                res.send({ result: "error", title: "Error", msg: "There was an error sending edit request.", serverMsg: "" });
                            });
                        }).catch(function (err) {
                            console.log("Error -  Select first and last name from students: " + err);
                            res.send({ result: "error", title: "Error", msg: "There was an error sending edit request.", serverMsg: "" });
                        });
                    }).catch(function (err) {
                        console.log("DB Connection error: " + err);
                        res.send({ result: "error", title: "Connection Error", msg: "There was an error connecting to the database.", serverMsg: "" });
                    });
                }
            });
        }
        catch (err) {
            console.log("Error - Edit consent request: " + err);
            res.send({ result: "error", title: "Error", msg: "There was an error sending edit request.", serverMsg: "" });
        }
    };
    StudentController.prototype.grantConsentEditPermission = function (req, res) {
        try {
            new AuthController().authUser(req, res, {
                requiredAuth: auth, done: function () {
                    var permission = req.body.permission;
                    var student = req.body.student;
                    console.log("yaya");
                    console.log("Value: " + permission + ', ' + "UserID: " + student.userID);
                    if (permission) {
                        sql.connect(db)
                            .then(function (connection) {
                            new sql.Request(connection)
                                .query("UPDATE Students SET editConsentRequest = 'false' WHERE userID = " + student.userID)
                                .then(function (result1) {
                                new sql.Request(connection)
                                    .query("UPDATE Students SET editConsentPermission = 'true' WHERE userID = " + student.userID)
                                    .then(function (result2) {
                                    new sql.Request(connection)
                                        .query("SELECT email FROM users WHERE userID = " + student.userID)
                                        .then(function (studentEmail) {
                                        var mailOptions = {
                                            from: mail.user,
                                            to: studentEmail[0].email,
                                            subject: 'Request Granted!',
                                            text: '',
                                            html: 'You can now login at: https://gcacademicprep.azurewebsites.net and make changes to your consent form.' // html body
                                        };
                                        new MailService().sendMessage("Consent Edit Request Granted", mailOptions);
                                        res.send({ result: "granted", title: "Request Granted", msg: "Student has been granted access to edit their consent form.", serverMsg: "" });
                                    }).catch(function (err) {
                                        console.log("Error - Get email from users. " + err);
                                        res.send({ result: "error", title: "Error", msg: "There was an error retrieving email from users table.", serverMsg: err });
                                    });
                                }).catch(function (err) {
                                    console.log("Error - Set editConsentPermission equal to true. " + err);
                                    res.send({ result: "error", title: "Error", msg: "There was an error setting consent edit permission to true.", serverMsg: err });
                                });
                            }).catch(function (err) {
                                console.log("Error - Set editConsentRequest equal to false. " + err);
                                res.send({ result: "error", title: "Error", msg: "There was an error setting consent edit request to false.", serverMsg: err });
                            });
                        }).catch(function (err) {
                            console.log("DB Connection error: " + err);
                            res.send({ result: "error", title: "Connection Error", msg: "There was an error connecting to the database.", serverMsg: err });
                        });
                    }
                    else {
                        res.send({ result: "denied", title: "Request Denied", msg: "Student has been denied access to edit their consent form.", serverMsg: "" });
                    }
                }
            });
        }
        catch (err) {
            console.log("Error - Grant consent edit permission: " + err);
            res.send({ result: "error", title: "Error", msg: "There was an error granting consent edit permission.", serverMsg: err });
        }
    };
    StudentController.prototype.addToTimetable = function (req, res) {
        try {
            var info = req.body[0];
            var _userID = info.userID;
            var _startDate = info.startDate;
            var _endDate = info.endDate;
            var _courseID = info.courseID;
            var _instructorID = info.instructorID;
            sql.connect(db)
                .then(function (connection) {
                new sql.Request(connection)
                    .query("INSERT INTO Timetables (userID,startDate,endDate,courseID,instructorID) VALUES ('" + _userID + "','" + _startDate + "','" + _endDate + "','" + _courseID + "','" + _instructorID + "')")
                    .then(function () {
                    res.send({ result: "success", title: "Student Enrolled", msg: "Student user has been added to course.", serverMsg: "" });
                }).catch(function (err) {
                    console.log("Error - Insert into timetable: " + err);
                    res.send({ result: "error", title: "Error", msg: "There was an error adding student to timetable.", serverMsg: err });
                });
            }).catch(function (err) {
                console.log("DB Connection error: " + err);
                res.send({ result: "error", title: "Connection Error", msg: "There was an error connecting to the database.", serverMsg: err });
            });
        }
        catch (err) {
            console.log("Error - Add student to timetable: " + err);
            res.send({ result: "error", title: "Error", msg: "There was an error adding student to timetable.", serverMsg: err });
        }
    };
    StudentController.prototype.removeFromTimetable = function (req, res) {
        try {
            var _userID = req.params._userID;
            var _courseID = req.params._courseID;
            sql.connect(db)
                .then(function (connection) {
                new sql.Request(connection)
                    .query("DELETE FROM Timetables WHERE userID = ('" + _userID + "') AND courseID = ('" + _courseID + "')")
                    .then(function () {
                    res.send({ result: "success", title: "Student Removed", msg: "Student has been removed from course.", serverMsg: "" });
                }).catch(function (err) {
                    console.log("Error - Remove student from timetable: " + err);
                    res.send({ result: "error", title: "Error", msg: "There was an error removing student from timetable.", serverMsg: err });
                });
            }).catch(function (err) {
                console.log("DB Connection error: " + err);
                res.send({ result: "error", title: "Connection Error", msg: "There was an error connecting to the database.", serverMsg: err });
            });
        }
        catch (err) {
            console.log("Error - Remove student from timetable: " + err);
            res.send({ result: "error", title: "Error", msg: "There was an error removing student from timetable.", serverMsg: err });
        }
    };
    StudentController.prototype.getTimetables = function (req, res) {
        try {
            new AuthController().authUser(req, res, {
                requiredAuth: ["Instructor", "Admin", "Staff"], done: function () {
                    sql.connect(db)
                        .then(function (connection) {
                        new sql.Request(connection)
                            .query("SELECT * FROM Timetables")
                            .then(function (recordset) {
                            res.send(recordset);
                        }).catch(function (err) {
                            console.log("Error - Get student timetables: " + err);
                            res.send({ result: "error", title: "Error", msg: "There was an error retrieving student timetables.", serverMsg: err });
                        });
                    }).catch(function (err) {
                        console.log("DB Connection error: " + err);
                        res.send({ result: "error", title: "Connection Error", msg: "There was an error connecting to the database.", serverMsg: err });
                    });
                }
            });
        }
        catch (err) {
            console.log("Error - Get student timetables: " + err);
            res.send({ result: "error", title: "Error", msg: "There was an error retrieving student timetables.", serverMsg: err });
        }
    };
    StudentController.prototype.getTimetablesByCourseId = function (req, res) {
        try {
            new AuthController().authUser(req, res, {
                requiredAuth: auth, done: function () {
                    var _id = req.params._courseID;
                    sql.connect(db)
                        .then(function (connection) {
                        new sql.Request(connection)
                            .query("SELECT * FROM Timetables WHERE courseID = '" + _id + "'")
                            .then(function (recordset) {
                            res.send(recordset);
                        }).catch(function (err) {
                            console.log("Error - Get timetables by courseID: " + err);
                            res.send({ result: "error", title: "Error", msg: "There was an error retrieving student timetables by course id.", serverMsg: err });
                        });
                    }).catch(function (err) {
                        console.log("DB Connection error: " + err);
                        res.send({ result: "error", title: "Connection Error", msg: "There was an error connecting to the database.", serverMsg: err });
                    });
                }
            });
        }
        catch (err) {
            console.log("Error - Get timetables by course id: " + err);
            res.send({ result: "error", title: "Error", msg: "There was an error retrieving student timetables by course id.", serverMsg: err });
        }
    };
    StudentController.prototype.getTimetablesByUserId = function (req, res) {
        try {
            new AuthController().authUser(req, res, {
                requiredAuth: ["Student", "Admin", "Staff", "Instructor"], done: function () {
                    var _id = req.params.userID;
                    sql.connect(db)
                        .then(function (connection) {
                        new sql.Request(connection)
                            .query("select * FROM Timetables WHERE userID = " + _id)
                            .then(function (result) {
                            if (result.length > 0) {
                                var query = 'select * from course where';
                                for (var i = 0; i < result.length; i++) {
                                    if (i === 0) {
                                        query += ' courseId = ' + result[i].courseID;
                                    }
                                    else {
                                        query += " OR courseId = " + result[i].courseID;
                                    }
                                }
                                new sql.Request(connection)
                                    .query(query)
                                    .then(function (result) {
                                    res.send(result);
                                }).catch(function (err) {
                                    console.log("Error - Select from courses: " + err);
                                    res.send({ result: "error", title: "Error", msg: "There was an error retrieving student timetables by user id.", serverMsg: err });
                                });
                            }
                            else {
                                res.send({ result: "success", title: "No Timetable Info", msg: "No timtable info for this student.", serverMsg: "" });
                            }
                        }).catch(function (err) {
                            console.log("Error - Select from timetables: " + err);
                            res.send({ result: "error", title: "Error", msg: "There was an error retrieving student timetables by user id.", serverMsg: err });
                        });
                    }).catch(function (err) {
                        console.log("DB Connection error: " + err);
                        res.send({ result: "error", title: "Connection Error", msg: "There was an error connecting to the database.", serverMsg: err });
                    });
                }
            });
        }
        catch (err) {
            console.log("Error - Get timetables by user id: " + err);
            res.send({ result: "error", title: "Error", msg: "There was an error retrieving student timetables by user id.", serverMsg: err });
        }
    };
    StudentController.prototype.createNote = function (req, res) {
        try {
            new AuthController().authUser(req, res, {
                requiredAuth: ["Admin", "Staff", "Instructor"], done: function () {
                    var caseNote = req.body.caseNote;
                    var dateTime = req.body.dateTime;
                    var _id = req.params._studentID;
                    sql.connect(db)
                        .then(function (connection) {
                        console.log(dateTime);
                        new sql.Request(connection)
                            .query("INSERT INTO CaseNotes VALUES ('" + _id + "', '" + caseNote + "', '" + dateTime + "')")
                            .then(function () {
                            res.send({ result: "success", title: "Note Created!", msg: "Note has been created for this student.", serverMsg: "" });
                        }).catch(function (err) {
                            console.log("Error - Insert new note " + err);
                            res.send({ result: "error", title: "Error", msg: "There was an error creating note for student.", serverMsg: err });
                        });
                    }).catch(function (err) {
                        console.log("DB Connection error: " + err);
                        res.send({ result: "error", title: "Connection Error", msg: "There was an error connecting to the database.", serverMsg: err });
                    });
                }
            });
        }
        catch (err) {
            console.log("Error - Create note: " + err);
            res.send({ result: "error", title: "Error", msg: "There was an error creating note for student.", serverMsg: err });
        }
    };
    StudentController.prototype.getNote = function (req, res) {
        try {
            new AuthController().authUser(req, res, {
                requiredAuth: ["Admin", "Staff", "Instructor"], done: function () {
                    var _id = req.params._studentID;
                    sql.connect(db)
                        .then(function (connection) {
                        new sql.Request(connection)
                            .query("SELECT *  FROM CaseNotes WHERE studentID = '" + _id + "' ORDER BY dateTime DESC")
                            .then(function (recordset) {
                            res.send(recordset);
                        }).catch(function (err) {
                            console.log("Error - Get case note by id: " + err);
                            res.send({ result: "error", title: "Error", msg: "There was an error retrieving notes for this student.", serverMsg: err });
                        });
                    }).catch(function (err) {
                        console.log("DB Connection error: " + err);
                        res.send({ result: "error", title: "Connection Error", msg: "There was an error connecting to the database.", serverMsg: err });
                    });
                }
            });
        }
        catch (err) {
            console.log("Error - Get student notes: " + err);
            res.send({ result: "error", title: "Error", msg: "There was an error retrieving notes for this student.", serverMsg: err });
        }
    };
    StudentController.prototype.deleteNote = function (req, res) {
        try {
            new AuthController().authUser(req, res, {
                requiredAuth: auth, done: function () {
                    var _id = req.params._id;
                    sql.connect(db)
                        .then(function (connection) {
                        new sql.Request(connection)
                            .query("DELETE FROM caseNotes WHERE caseNoteID = '" + _id + "'")
                            .then(function () {
                            res.send({ result: "success", title: "Note Deleted", msg: "Note has been deleted for this student.", serverMsg: "" });
                        }).catch(function (err) {
                            console.log("Error - Delete student note: " + err);
                            res.send({ result: "error", title: "Error", msg: "There was an error deleting this note.", serverMsg: err });
                        });
                    }).catch(function (err) {
                        console.log("DB Connection error: " + err);
                        res.send({ result: "error", title: "Connection Error", msg: "There was an error connecting to the database.", serverMsg: err });
                    });
                }
            });
        }
        catch (err) {
            console.log("Error - Delete student note: " + err);
            res.send({ result: "error", title: "Error", msg: "There was an error deleting this note.", serverMsg: err });
        }
    };
    StudentController.prototype.insertAttendance = function (req, res) {
        try {
            new AuthController().authUser(req, res, {
                requiredAuth: ["Admin", "Staff", "Instructor"], done: function () {
                    var attendance = req.body;
                    var query = "INSERT INTO Attendance (courseID, date, userID, attendanceValue, twoMissedClassMsg, fourMissedClassMsg) VALUES ";
                    var count = 0;
                    if (attendance.students.length > 0) {
                        var date = attendance.date;
                        for (var _i = 0, _a = attendance.students; _i < _a.length; _i++) {
                            var student = _a[_i];
                            if (count === 0) {
                                query += "('" + attendance.courseID + "', '" + date + "', '" + student.userID + "', '" + student.attendanceValue + "', 'False', 'False' )";
                            }
                            else {
                                query += ", ('" + attendance.courseID + "', '" + date + "', '" + student.userID + "', '" + student.attendanceValue + "', 'False', 'False' )";
                            }
                            count++;
                        }
                        sql.connect(db)
                            .then(function (connection) {
                            new sql.Request(connection)
                                .query(query)
                                .then(function (recordset) {
                                // set schedule check on DB
                                console.log("attendance record inserted");
                                res.send(recordset);
                            }).catch(function (err) {
                                console.log("Error - Insert attendance: " + err);
                                res.send({ result: "error", title: "Error", msg: "There was an error inserting attendance for student.", serverMsg: err });
                            });
                        }).catch(function (err) {
                            console.log("DB Connection error: " + err);
                            res.send({ result: "error", title: "Connection Error", msg: "There was an error connecting to the database.", serverMsg: err });
                        });
                    }
                    else {
                        console.log("No absent students");
                        res.send({ status: "No absent students" });
                    }
                }
            });
        }
        catch (err) {
            console.log("Error - Insert attendance: " + err);
            res.send({ result: "error", title: "Error", msg: "There was an error inserting attendance for student.", serverMsg: err });
        }
    };
    StudentController.prototype.getAllAttendance = function (req, res) {
        try {
            new AuthController().authUser(req, res, {
                requiredAuth: ["Admin", "Staff", "Instructor"], done: function () {
                    sql.connect(db)
                        .then(function (connection) {
                        new sql.Request(connection)
                            .query("SELECT * FROM Attendance")
                            .then(function (recordset) {
                            for (var _i = 0, recordset_1 = recordset; _i < recordset_1.length; _i++) {
                                var item = recordset_1[_i];
                                item.date = item.date.split(' ');
                            }
                            res.send(recordset);
                        }).catch(function (err) {
                            console.log("Error - Get all attendance: " + err);
                            res.send({ result: "error", title: "Error", msg: "There was an error retrieving all student attendance records.", serverMsg: err });
                        });
                    }).catch(function (err) {
                        console.log("DB Connection error: " + err);
                        res.send({ result: "error", title: "Connection Error", msg: "There was an error connecting to the database.", serverMsg: err });
                    });
                }
            });
        }
        catch (err) {
            console.log("Error - Get all attendance: " + err);
            res.send({ result: "error", title: "Error", msg: "There was an error retrieving all student attendance records.", serverMsg: err });
        }
    };
    StudentController.prototype.populatePRF = function (req, res) {
        try {
            new AuthController().authUser(req, res, {
                requiredAuth: auth, done: function () {
                    var _id = req.params._id;
                    sql.connect(db)
                        .then(function (connection) {
                        new sql.Request(connection)
                            .query("SELECT * FROM Clients C INNER JOIN SuitabilityForm S ON C.userID = S.userID WHERE C.userID = '" + _id + "' AND S.userID = '" + _id + "'")
                            .then(function (recordset) {
                            new PRFService().populatePRF(recordset[0]);
                            res.send({ result: "success", title: "PRF Populated!", msg: "PRF form has been populated with student info.", serverMsg: "" });
                        }).catch(function (err) {
                            console.log("Error - Get client by id for prf: " + err);
                            res.send({ result: "error", title: "Error", msg: "There was an error populating PRF with student info.", serverMsg: err });
                        });
                    }).catch(function (err) {
                        console.log("DB Connection error: " + err);
                        res.send({ result: "error", title: "Connection Error", msg: "There was an error connecting to the database.", serverMsg: err });
                    });
                }
            });
        }
        catch (err) {
            console.log("Error - Populate PRF: " + err);
            res.send({ result: "error", title: "Error", msg: "There was an error populating PRF with student info.", serverMsg: err });
        }
    };
    return StudentController;
}());
var templateObject_1;
module.exports = StudentController;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NlcnZlci9zcmMvY29udHJvbGxlcnMvU3R1ZGVudENvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFFQSw4REFBaUU7QUFDakUsSUFBTSxVQUFVLEdBQUcsT0FBTyxDQUFDLHdCQUF3QixDQUFDLENBQUM7QUFDckQsSUFBTSxXQUFXLEdBQUcsT0FBTyxDQUFDLHlCQUF5QixDQUFDLENBQUM7QUFDdkQsSUFBTSxlQUFlLEdBQUcsT0FBTyxDQUFDLDZCQUE2QixDQUFDLENBQUM7QUFDL0QsSUFBSSxHQUFHLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQzNCLElBQUksSUFBSSxHQUFHLENBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxZQUFZLENBQUMsQ0FBQztBQUM1QyxJQUFNLE1BQU0sR0FBRyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUM7QUFDcEMsSUFBTSxFQUFFLEdBQUcsTUFBTSxDQUFDLEVBQUUsQ0FBQztBQUNyQixJQUFNLElBQUksR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDO0FBQ3pCLElBQU0sYUFBYSxHQUFHLE1BQU0sQ0FBQyxhQUFhLENBQUM7QUFFM0M7SUFBQTtJQTR1QkEsQ0FBQztJQTF1QkMsa0NBQU0sR0FBTixVQUFPLEdBQW9CLEVBQUUsR0FBcUI7UUFDaEQsSUFBSTtZQUNGLElBQUksY0FBYyxFQUFFLENBQUMsUUFBUSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUU7Z0JBQ3RDLFlBQVksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFO29CQUN4QixJQUFJLE9BQU8sR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDO29CQUN2QixHQUFHLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQzt5QkFDWixJQUFJLENBQUMsVUFBUyxVQUFVO3dCQUN2QixJQUFJLEdBQUcsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDOzZCQUN4QixLQUFLLENBQUMsZ0NBQWdDLEdBQUcsT0FBTyxDQUFDLE1BQU0sR0FB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dCBleHByZXNzID0gcmVxdWlyZShcImV4cHJlc3NcIik7XHJcbmltcG9ydCBqd3QgPSByZXF1aXJlKCdqc29ud2VidG9rZW4nKTtcclxuaW1wb3J0IEF1dGhDb250cm9sbGVyID0gcmVxdWlyZShcIi4uL2NvbnRyb2xsZXJzL0F1dGhDb250cm9sbGVyXCIpO1xyXG5jb25zdCBQUkZTZXJ2aWNlID0gcmVxdWlyZShcIi4uL3NlcnZpY2VzL1BSRlNlcnZpY2VcIik7XHJcbmNvbnN0IE1haWxTZXJ2aWNlID0gcmVxdWlyZShcIi4uL3NlcnZpY2VzL01haWxTZXJ2aWNlXCIpO1xyXG5jb25zdCBBY3Rpdml0eVNlcnZpY2UgPSByZXF1aXJlKFwiLi4vc2VydmljZXMvQWN0aXZpdHlTZXJ2aWNlXCIpO1xyXG52YXIgc3FsID0gcmVxdWlyZSgnbXNzcWwnKTtcclxudmFyIGF1dGggPSBbXCJBZG1pblwiLCBcIlN0YWZmXCIsIFwiSW5zdHJ1Y3RvclwiXTtcclxuY29uc3QgY29uZmlnID0gcmVxdWlyZSgnLi4vY29uZmlnJyk7XHJcbmNvbnN0IGRiID0gY29uZmlnLmRiO1xyXG5jb25zdCBtYWlsID0gY29uZmlnLm1haWw7XHJcbmNvbnN0IHNpdGVfc2V0dGluZ3MgPSBjb25maWcuc2l0ZV9zZXR0aW5ncztcclxuXHJcbmNsYXNzIFN0dWRlbnRDb250cm9sbGVyIHtcclxuXHJcbiAgY3JlYXRlKHJlcTogZXhwcmVzcy5SZXF1ZXN0LCByZXM6IGV4cHJlc3MuUmVzcG9uc2UpOiB2b2lkIHtcclxuICAgIHRyeSB7XHJcbiAgICAgIG5ldyBBdXRoQ29udHJvbGxlcigpLmF1dGhVc2VyKHJlcSwgcmVzLCB7XHJcbiAgICAgICAgcmVxdWlyZWRBdXRoOiBhdXRoLCBkb25lOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgIHZhciBzdHVkZW50ID0gcmVxLmJvZHk7XHJcbiAgICAgICAgICBzcWwuY29ubmVjdChkYilcclxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24oY29ubmVjdGlvbikge1xyXG4gICAgICAgICAgICAgIG5ldyBzcWwuUmVxdWVzdChjb25uZWN0aW9uKVxyXG4gICAgICAgICAgICAgICAgLnF1ZXJ5KFwiSU5TRVJUIElOVE8gU3R1ZGVudHMgVkFMVUVTICgnXCIgKyBzdHVkZW50LnVzZXJJRCArIFwiJywnXCJcclxuICAgICAgICAgICAgICAgICsgc3R1ZGVudC5zdHVkZW50TnVtYmVyICsgXCInLCdcIlxyXG4gICAgICAgICAgICAgICAgKyBzdHVkZW50LmZpcnN0TmFtZSArIFwiJywgJ1wiXHJcbiAgICAgICAgICAgICAgICArIHN0dWRlbnQubGFzdE5hbWUgKyBcIicsJ1wiXHJcbiAgICAgICAgICAgICAgICArIHN0dWRlbnQuaW5xdWlyeURhdGUgKyBcIicsJ1wiXHJcbiAgICAgICAgICAgICAgICArIHN0dWRlbnQuYmlydGhkYXRlICsgXCInLCdcIlxyXG4gICAgICAgICAgICAgICAgKyBzdHVkZW50LnBob25lICsgXCInLCdcIlxyXG4gICAgICAgICAgICAgICAgKyBzdHVkZW50LmFsbG93RGV0YWlsZWRNZXNzYWdlICsgXCInLCdcIlxyXG4gICAgICAgICAgICAgICAgKyBzdHVkZW50Lm9rYXlUb1RleHQgKyBcIicsJ1wiXHJcbiAgICAgICAgICAgICAgICArIHN0dWRlbnQuYWx0ZXJuYXRlTnVtYmVyICsgXCInLCdcIlxyXG4gICAgICAgICAgICAgICAgKyBzdHVkZW50LmFsbG93RGV0YWlsZWRNZXNzYWdlQWx0ZXJuYXRlICsgXCInLCdcIlxyXG4gICAgICAgICAgICAgICAgKyBzdHVkZW50Lm9rYXlUb1RleHRBbHRlcm5hdGUgKyBcIicsJ1wiXHJcbiAgICAgICAgICAgICAgICArIHN0dWRlbnQuZWRpdENvbnNlbnRSZXF1ZXN0ICsgXCInLCdcIlxyXG4gICAgICAgICAgICAgICAgKyBzdHVkZW50LmVkaXRDb25zZW50UGVybWlzc2lvbiArIFwiJywnXCJcclxuICAgICAgICAgICAgICAgICsgc3R1ZGVudC5jb21tZW50cyArIFwiJylcIilcclxuICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICByZXMuc2VuZCh7IHJlc3VsdDogXCJzdWNjZXNzXCIsIHRpdGxlOiBcIk5ldyBVc2VyIENyZWF0ZWQhXCIsIG1zZzogXCJTdHVkZW50IHVzZXIgaGFzIGJlZW4gc3VjY2Vzc2Z1bGx5IGNyZWF0ZWQhXCIsIHNlcnZlck1zZzogXCJcIiB9KTtcclxuICAgICAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGVycikge1xyXG4gICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yIC0gQ3JlYXRlIG5ldyBzdHVkZW50OiBcIiArIGVycik7XHJcbiAgICAgICAgICAgICAgICAgIHJlcy5zZW5kKHsgcmVzdWx0OiBcImVycm9yXCIsIHRpdGxlOiBcIkNvbm5lY3Rpb24gRXJyb3JcIiwgbXNnOiBcIlRoZXJlIHdhcyBhbiBlcnJvciBjcmVhdGluZyBjbGllbnQgYXMgc3R1ZGVudC5cIiwgc2VydmVyTXNnOiBlcnIgfSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XHJcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJEQiBDb25uZWN0aW9uIGVycm9yOiBcIiArIGVycik7XHJcbiAgICAgICAgICAgICAgcmVzLnNlbmQoeyByZXN1bHQ6IFwiZXJyb3JcIiwgdGl0bGU6IFwiQ29ubmVjdGlvbiBFcnJvclwiLCBtc2c6IFwiVGhlcmUgd2FzIGFuIGVycm9yIGNvbm5lY3RpbmcgdG8gdGhlIGRhdGFiYXNlLlwiLCBzZXJ2ZXJNc2c6IGVyciB9KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICBjb25zb2xlLmxvZyhcIkVycm9yIC0gQ3JlYXRlIHN0dWRlbnQ6IFwiICsgZXJyKTtcclxuICAgICAgcmVzLnNlbmQoeyByZXN1bHQ6IFwiZXJyb3JcIiwgdGl0bGU6IFwiRXJyb3JcIiwgbXNnOiBcIlRoZXJlIHdhcyBhbiBlcnJvciBjcmVhdGluZyBjbGllbnQgYXMgc3R1ZGVudC5cIiwgc2VydmVyTXNnOiBlcnIgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICB1cGRhdGVHZW5lcmFsSW5mbyhyZXE6IGV4cHJlc3MuUmVxdWVzdCwgcmVzOiBleHByZXNzLlJlc3BvbnNlKTogdm9pZCB7XHJcbiAgICB0cnkge1xyXG4gICAgICBuZXcgQXV0aENvbnRyb2xsZXIoKS5hdXRoVXNlcihyZXEsIHJlcywge1xyXG4gICAgICAgIHJlcXVpcmVkQXV0aDogYXV0aCwgZG9uZTogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICB2YXIgc3R1ZGVudCA9IHJlcS5ib2R5O1xyXG4gICAgICAgICAgdmFyIHJlID0gL14oKFtePD4oKVtcXF1cXFxcLiw7Olxcc0BcXFwiXSsoXFwuW148PigpW1xcXVxcXFwuLDs6XFxzQFxcXCJdKykqKXwoXFxcIi4rXFxcIikpQCgoXFxbWzAtOV17MSwzfVxcLlswLTldezEsM31cXC5bMC05XXsxLDN9XFwuWzAtOV17MSwzfVxcXSl8KChbYS16QS1aXFwtMC05XStcXC4pK1thLXpBLVpdezIsfSkpJC87XHJcbiAgICAgICAgICB2YXIgZW1haWxWYWxpZGF0aW9uID0gcmUudGVzdChzdHVkZW50LmVtYWlsKTtcclxuICAgICAgICAgIGlmICghZW1haWxWYWxpZGF0aW9uKSB7XHJcbiAgICAgICAgICAgIHJlcy5zZW5kKHsgcmVzdWx0OiBcImludmFsaWRcIiwgdGl0bGU6IFwiSW52YWxpZCBJbnB1dFwiLCBtc2c6IFwiSW5jb3JyZWN0IGVtYWlsIGZvcm1hdC5cIiwgc2VydmVyTXNnOiBcIlwiIH0pO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgc3FsLmNvbm5lY3QoZGIpXHJcbiAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24oY29ubmVjdGlvbikge1xyXG4gICAgICAgICAgICAgICAgbmV3IHNxbC5SZXF1ZXN0KGNvbm5lY3Rpb24pXHJcbiAgICAgICAgICAgICAgICAgIC5xdWVyeShcIlNFTEVDVCB1c2VySUQsIHVzZXJuYW1lLCBlbWFpbCBGUk9NIFVzZXJzXCIpXHJcbiAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKHVzZXJzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHZhbGlkYXRlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGVycm9yO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBjdXJyZW50VXNlcm5hbWUgPSB1c2Vycy5maWx0ZXIoeCA9PiB4LnVzZXJJRCA9PT0gc3R1ZGVudC51c2VySUQpO1xyXG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRVc2VybmFtZSA9IGN1cnJlbnRVc2VybmFtZVswXS51c2VybmFtZTtcclxuICAgICAgICAgICAgICAgICAgICB1c2VycyA9IHVzZXJzLmZpbHRlcih4ID0+IHgudXNlcklEICE9PSBzdHVkZW50LnVzZXJJRCk7XHJcbiAgICAgICAgICAgICAgICAgICAgc3R1ZGVudC51c2VybmFtZSA9IHN0dWRlbnQuZmlyc3ROYW1lICsgc3R1ZGVudC5sYXN0TmFtZTtcclxuICAgICAgICAgICAgICAgICAgICBzdHVkZW50LnVzZXJuYW1lID0gc3R1ZGVudC51c2VybmFtZS50b0xvd2VyQ2FzZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHN0dWRlbnQudXNlcm5hbWUgPSBzdHVkZW50LnVzZXJuYW1lLnJlcGxhY2UoL1xccysvZywgJycpO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IHJlY29yZCBvZiB1c2Vycykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgaWYgKHJlY29yZC51c2VybmFtZSA9PT0gc3R1ZGVudC51c2VybmFtZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWxpZGF0ZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3IgPSBcIlVzZXJuYW1lIGlzIGFscmVhZHkgaW4gdXNlLlwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocmVjb3JkLmVtYWlsID09PSBzdHVkZW50LmVtYWlsICYmIHJlY29yZC5lbWFpbCAhPT0gXCJCQS5BQ1BAZ2VvcmdpYW5jb2xsZWdlLmNhXCIgJiYgcmVjb3JkLmVtYWlsICE9PSBcIk9SLkFDUEBnZW9yZ2lhbmNvbGxlZ2UuY2FcIiAmJiByZWNvcmQuZW1haWwgIT09IFwiT1MuQUNQQGdlb3JnaWFuY29sbGVnZS5jYVwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbGlkYXRlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBlcnJvciA9IFwiRW1haWwgaXMgYWxyZWFkeSBpbiB1c2UuXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAoIXZhbGlkYXRlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgcmVzLnNlbmQoeyByZXN1bHQ6IFwiaW52YWxpZFwiLCB0aXRsZTogXCJJbnZhbGlkIElucHV0XCIsIG1zZzogZXJyb3IsIHNlcnZlck1zZzogXCJcIiB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgdmFyIHN0dWRlbnRzUXVlcnkgPSBcIlVQREFURSBTdHVkZW50cyBTRVQgc3R1ZGVudE51bWJlcj0nXCIgKyBzdHVkZW50LnN0dWRlbnROdW1iZXJcclxuICAgICAgICAgICAgICAgICAgICAgICAgKyBcIicsIGZpcnN0TmFtZT0nXCIgKyBzdHVkZW50LmZpcnN0TmFtZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICArIFwiJywgbGFzdE5hbWU9J1wiICsgc3R1ZGVudC5sYXN0TmFtZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICArIFwiJywgcGhvbmU9J1wiICsgc3R1ZGVudC5waG9uZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICArIFwiJywgb2theVRvVGV4dD0nXCIgKyBzdHVkZW50Lm9rYXlUb1RleHRcclxuICAgICAgICAgICAgICAgICAgICAgICAgKyBcIicsIGFsbG93RGV0YWlsZWRNZXNzYWdlPSdcIiArIHN0dWRlbnQuYWxsb3dEZXRhaWxlZE1lc3NhZ2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgKyBcIicsIGFsdGVybmF0ZU51bWJlcj0nXCIgKyBzdHVkZW50LmFsdGVybmF0ZU51bWJlclxyXG4gICAgICAgICAgICAgICAgICAgICAgICArIFwiJywgb2theVRvVGV4dEFsdGVybmF0ZT0nXCIgKyBzdHVkZW50Lm9rYXlUb1RleHRBbHRlcm5hdGVcclxuICAgICAgICAgICAgICAgICAgICAgICAgKyBcIicsIGFsbG93RGV0YWlsZWRNZXNzYWdlQWx0ZXJuYXRlPSdcIiArIHN0dWRlbnQuYWxsb3dEZXRhaWxlZE1lc3NhZ2VBbHRlcm5hdGVcclxuICAgICAgICAgICAgICAgICAgICAgICAgKyBcIicsIGNvbW1lbnRzPSdcIiArIHN0dWRlbnQuY29tbWVudHNcclxuICAgICAgICAgICAgICAgICAgICAgICAgKyBcIicgV0hFUkUgc3R1ZGVudElEID0gJ1wiICsgc3R1ZGVudC5zdHVkZW50SUQgKyBcIidcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgbmV3IHNxbC5SZXF1ZXN0KGNvbm5lY3Rpb24pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5xdWVyeShzdHVkZW50c1F1ZXJ5KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbihzdHVkZW50c1Jlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHZhciB1c2Vyc1F1ZXJ5ID0gXCJVUERBVEUgVXNlcnMgU0VUIGVtYWlsPSdcIiArIHN0dWRlbnQuZW1haWxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICsgXCInLCB1c2VybmFtZT0nXCIgKyBzdHVkZW50LnVzZXJuYW1lXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICArIFwiJyBXSEVSRSB1c2VySUQgPSAnXCIgKyBzdHVkZW50LnVzZXJJRCArIFwiJ1wiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3IHNxbC5SZXF1ZXN0KGNvbm5lY3Rpb24pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAucXVlcnkodXNlcnNRdWVyeSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKHVzZXJzUmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjdXJyZW50VXNlcm5hbWUgIT0gc3R1ZGVudC51c2VybmFtZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBtYWlsT3B0aW9ucyA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZyb206IG1haWwudXNlciwgLy8gc2VuZGVyIGFkZHJlc3NcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvOiBzdHVkZW50LmVtYWlsLCAvLyByZWNpcGllbnQgYWRkcmVzc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3ViamVjdDogJ1VzZXJuYW1lIFVwZGF0ZSEnLCAvLyBTdWJqZWN0IGxpbmVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRleHQ6ICcnLCAvLyBwbGFpbiB0ZXh0IGJvZHlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGh0bWw6ICdZb3VyIHVzZXJuYW1lIGhhcyBiZWVuIGNoYW5nZWQgdG8gPGI+JyArIHN0dWRlbnQudXNlcm5hbWUgKyAnPC9iPi48YnIgLz48YnIgLz4gTG9naW4gYXQgJyArIHNpdGVfc2V0dGluZ3MudXJsICsgJyAgPGJyIC8+PGJyIC8+IFRoYW5reW91Jy8vIGh0bWwgYm9keVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3IE1haWxTZXJ2aWNlKCkuc2VuZE1lc3NhZ2UoXCJTdHVkZW50IFVzZXJuYW1lIFVwZGF0ZVwiLCBtYWlsT3B0aW9ucyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzLnNlbmQoeyByZXN1bHQ6IFwic3VjY2Vzc1wiLCB0aXRsZTogXCJVcGRhdGUgU3VjY2VzcyFcIiwgbXNnOiBcIlN0dWRlbnQgdXNlciB1cGRhdGVkIVwiLCBzZXJ2ZXJNc2c6IFwiXCIgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbihlcnIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJFcnJvciAtIFVwZGF0ZSB1c2VyOiBcIiArIGVycik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcy5zZW5kKHsgcmVzdWx0OiBcImVycm9yXCIsIHRpdGxlOiBcIkVycm9yXCIsIG1zZzogXCJUaGVyZSB3YXMgYW4gZXJyb3IgdXBkYXRpbmcgdXNlciBpbmZvcm1hdGlvbi5cIiwgc2VydmVyTXNnOiBlcnIgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJFcnJvciAtIFVwZGF0ZSBzdHVkZW50OiBcIiArIGVycik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzLnNlbmQoeyByZXN1bHQ6IFwiZXJyb3JcIiwgdGl0bGU6IFwiRXJyb3JcIiwgbXNnOiBcIlRoZXJlIHdhcyBhbiBlcnJvciB1cGRhdGluZyBzdHVkZW50IGluZm9ybWF0aW9uLlwiLCBzZXJ2ZXJNc2c6IGVyciB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbihlcnIpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yIC0gU2VsZWN0IHVzZXJJRCwgdXNlYXJuYW1lIGFuZCBlbWFpbCBmcm9tIHVzZXJzOiBcIiArIGVycik7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzLnNlbmQoeyByZXN1bHQ6IFwiZXJyb3JcIiwgdGl0bGU6IFwiRXJyb3JcIiwgbXNnOiBcIlRoZXJlIHdhcyBhbiBlcnJvciByZXRyaWV2aW5nIHVzZXJJRCwgdXNlYXJuYW1lIGFuZCBlbWFpbCBmcm9tIHRoZSB1c2VycyB0YWJsZS5cIiwgc2VydmVyTXNnOiBlcnIgfSk7XHJcbiAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGVycikge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJEQiBDb25uZWN0aW9uIGVycm9yOiBcIiArIGVycik7XHJcbiAgICAgICAgICAgICAgICByZXMuc2VuZCh7IHJlc3VsdDogXCJlcnJvclwiLCB0aXRsZTogXCJDb25uZWN0aW9uIEVycm9yXCIsIG1zZzogXCJUaGVyZSB3YXMgYW4gZXJyb3IgY29ubmVjdGluZyB0byB0aGUgZGF0YWJhc2UuXCIsIHNlcnZlck1zZzogZXJyIH0pO1xyXG4gICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgY29uc29sZS5sb2coXCJFcnJvciAtIFVwZGF0ZSBzdHVkZW50IGluZm86IFwiICsgZXJyKTtcclxuICAgICAgcmVzLnNlbmQoeyByZXN1bHQ6IFwiZXJyb3JcIiwgdGl0bGU6IFwiRXJyb3JcIiwgbXNnOiBcIlRoZXJlIHdhcyBhbiBlcnJvciB1cGRhdGluZyB0aGlzIHN0dWRlbnRzIGluZm9ybWF0aW9uLlwiLCBzZXJ2ZXJNc2c6IGVyciB9KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGdldFN0dWRlbnRzQnlJZChyZXE6IGV4cHJlc3MuUmVxdWVzdCwgcmVzOiBleHByZXNzLlJlc3BvbnNlKTogdm9pZCB7XHJcbiAgICB0cnkge1xyXG4gICAgICBuZXcgQXV0aENvbnRyb2xsZXIoKS5hdXRoVXNlcihyZXEsIHJlcywge1xyXG4gICAgICAgIHJlcXVpcmVkQXV0aDogW1wiQWRtaW5cIiwgXCJTdGFmZlwiLCBcIkluc3RydWN0b3JcIl0sIGRvbmU6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgdmFyIHRpbWV0YWJsZXMgPSByZXEuYm9keTtcclxuICAgICAgICAgIHZhciBxdWVyeSA9IFwiU0VMRUNUICogRlJPTSBTdHVkZW50cyBXSEVSRSB1c2VySUQgPVwiO1xyXG4gICAgICAgICAgdmFyIGNvdW50ID0gMDtcclxuICAgICAgICAgIGZvciAobGV0IHRpbWV0YWJsZSBvZiB0aW1ldGFibGVzKSB7XHJcbiAgICAgICAgICAgIGlmIChjb3VudCA9PT0gMCkge1xyXG4gICAgICAgICAgICAgIHF1ZXJ5ICs9IFwiIFwiICsgdGltZXRhYmxlLnVzZXJJRDtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICBxdWVyeSArPSBcIiBPUiB1c2VySUQgPSBcIiArIHRpbWV0YWJsZS51c2VySUQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY291bnQrKztcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHNxbC5jb25uZWN0KGRiKVxyXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbihjb25uZWN0aW9uKSB7XHJcbiAgICAgICAgICAgICAgbmV3IHNxbC5SZXF1ZXN0KGNvbm5lY3Rpb24pXHJcbiAgICAgICAgICAgICAgICAucXVlcnkocXVlcnkpXHJcbiAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbihyZWNvcmRzZXQpIHtcclxuICAgICAgICAgICAgICAgICAgcmVzLnNlbmQocmVjb3Jkc2V0KTtcclxuICAgICAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGVycikge1xyXG4gICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yIC0gR2V0IHN0dWRlbnQgYnkgaWQ6IFwiICsgZXJyKTtcclxuICAgICAgICAgICAgICAgICAgcmVzLnNlbmQoeyByZXN1bHQ6IFwiZXJyb3JcIiwgdGl0bGU6IFwiRXJyb3JcIiwgbXNnOiBcIlRoZXJlIHdhcyBhbiBlcnJvciByZXRyaWV2aW5nIHN0dWRlbnQgYnkgSUQuXCIsIHNlcnZlck1zZzogZXJyIH0pO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGVycikge1xyXG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiREIgQ29ubmVjdGlvbiBlcnJvcjogXCIgKyBlcnIpO1xyXG4gICAgICAgICAgICAgIHJlcy5zZW5kKHsgcmVzdWx0OiBcImVycm9yXCIsIHRpdGxlOiBcIkNvbm5lY3Rpb24gRXJyb3JcIiwgbXNnOiBcIlRoZXJlIHdhcyBhbiBlcnJvciBjb25uZWN0aW5nIHRvIHRoZSBkYXRhYmFzZS5cIiwgc2VydmVyTXNnOiBlcnIgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgY29uc29sZS5sb2coXCJFcnJvciAtIEdldCBzdHVkZW50cyBieSBJRDogXCIgKyBlcnIpO1xyXG4gICAgICByZXMuc2VuZCh7IHJlc3VsdDogXCJlcnJvclwiLCB0aXRsZTogXCJFcnJvclwiLCBtc2c6IFwiVGhlcmUgd2FzIGFuIGVycm9yIGdldHRpbmcgc3R1ZGVudHMgYnkgSUQuXCIsIHNlcnZlck1zZzogZXJyIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgYXJjaGl2ZVN0dWRlbnQocmVxOiBleHByZXNzLlJlcXVlc3QsIHJlczogZXhwcmVzcy5SZXNwb25zZSk6IHZvaWQge1xyXG4gICAgdHJ5IHtcclxuICAgICAgbmV3IEF1dGhDb250cm9sbGVyKCkuYXV0aFVzZXIocmVxLCByZXMsIHtcclxuICAgICAgICByZXF1aXJlZEF1dGg6IGF1dGgsIGRvbmU6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgdmFyIHN0dWRlbnQgPSByZXEuYm9keTtcclxuICAgICAgICAgIHNxbC5jb25uZWN0KGRiKVxyXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbihjb25uZWN0aW9uKSB7XHJcbiAgICAgICAgICAgICAgdmFyIHVzZXJJRCA9IHN0dWRlbnQudXNlcklEO1xyXG4gICAgICAgICAgICAgIHZhciBlbWFpbCA9IHN0dWRlbnQuZW1haWw7XHJcbiAgICAgICAgICAgICAgdmFyIHN0dWRlbnROdW1iZXIgPSBzdHVkZW50LnN0dWRlbnROdW1iZXI7XHJcbiAgICAgICAgICAgICAgdmFyIGZpcnN0TmFtZSA9IHN0dWRlbnQuZmlyc3ROYW1lO1xyXG4gICAgICAgICAgICAgIHZhciBsYXN0TmFtZSA9IHN0dWRlbnQubGFzdE5hbWU7XHJcbiAgICAgICAgICAgICAgdmFyIGlucXVpcnlEYXRlID0gc3R1ZGVudC5pbnF1aXJ5RGF0ZTtcclxuICAgICAgICAgICAgICB2YXIgYmlydGhkYXRlID0gc3R1ZGVudC5iaXJ0aGRhdGU7XHJcbiAgICAgICAgICAgICAgdmFyIHBob25lID0gc3R1ZGVudC5waG9uZTtcclxuICAgICAgICAgICAgICB2YXIgYWxsb3dEZXRhaWxlZE1lc3NhZ2UgPSBzdHVkZW50LmFsbG93RGV0YWlsZWRNZXNzYWdlO1xyXG4gICAgICAgICAgICAgIHZhciBva2F5VG9UZXh0ID0gc3R1ZGVudC5va2F5VG9UZXh0O1xyXG4gICAgICAgICAgICAgIHZhciBhbHRlcm5hdGVOdW1iZXIgPSBzdHVkZW50LmFsdGVybmF0ZU51bWJlcjtcclxuICAgICAgICAgICAgICB2YXIgYWxsb3dEZXRhaWxlZE1lc3NhZ2VBbHRlcm5hdGUgPSBzdHVkZW50LmFsbG93RGV0YWlsZWRNZXNzYWdlQWx0ZXJuYXRlO1xyXG4gICAgICAgICAgICAgIHZhciBva2F5VG9UZXh0QWx0ZXJuYXRlID0gc3R1ZGVudC5va2F5VG9UZXh0QWx0ZXJuYXRlO1xyXG4gICAgICAgICAgICAgIHZhciBlZGl0Q29uc2VudFJlcXVlc3QgPSBzdHVkZW50LmVkaXRDb25zZW50UmVxdWVzdDtcclxuICAgICAgICAgICAgICB2YXIgZWRpdENvbnNlbnRQZXJtaXNzaW9uID0gc3R1ZGVudC5lZGl0Q29uc2VudFBlcm1pc3Npb247XHJcbiAgICAgICAgICAgICAgdmFyIGNvbW1lbnRzID0gc3R1ZGVudC5jb21tZW50cztcclxuICAgICAgICAgICAgICAgIHNxbC5xdWVyeWBJTlNFUlQgSU5UTyBTdHVkZW50QXJjaGl2ZSAodXNlcklELCBlbWFpbCwgc3R1ZGVudE51bWJlciwgZmlyc3ROYW1lLCBsYXN0TmFtZSwgaW5xdWlyeURhdGUsIGJpcnRoZGF0ZSwgcGhvbmUsIGFsbG93RGV0YWlsZWRNZXNzYWdlLCBva2F5VG9UZXh0LCBhbHRlcm5hdGVOdW1iZXIsIGFsbG93RGV0YWlsZWRNZXNzYWdlQWx0ZXJuYXRlLCBva2F5VG9UZXh0QWx0ZXJuYXRlLCBlZGl0Q29uc2VudFJlcXVlc3QsIGVkaXRDb25zZW50UGVybWlzc2lvbiwgY29tbWVudHMpXHJcbiAgICAgICAgICAgICAgICBWQUxVRVMoJHt1c2VySUR9LCAke2VtYWlsfSwgJHtzdHVkZW50TnVtYmVyfSwgJHtmaXJzdE5hbWV9LCAke2xhc3ROYW1lfSwgJHtpbnF1aXJ5RGF0ZX0sICR7YmlydGhkYXRlfSwgJHtwaG9uZX0sICR7YWxsb3dEZXRhaWxlZE1lc3NhZ2V9LCAke29rYXlUb1RleHR9LCAke2FsdGVybmF0ZU51bWJlcn0sICR7YWxsb3dEZXRhaWxlZE1lc3NhZ2VBbHRlcm5hdGV9LCAke29rYXlUb1RleHRBbHRlcm5hdGV9LCAke2VkaXRDb25zZW50UmVxdWVzdH0sICR7ZWRpdENvbnNlbnRQZXJtaXNzaW9ufSwgJHtjb21tZW50c30pYFxyXG4gICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3VsdCk7XHJcbiAgICAgICAgICAgICAgICAgIG5ldyBzcWwuUmVxdWVzdChjb25uZWN0aW9uKVxyXG4gICAgICAgICAgICAgICAgICAgIC5xdWVyeShcIkRFTEVURSBGUk9NIFN0dWRlbnRzIFdIRVJFIHVzZXJJRCA9ICdcIiArIHN0dWRlbnQudXNlcklEICsgXCInXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICBuZXcgc3FsLlJlcXVlc3QoY29ubmVjdGlvbilcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnF1ZXJ5KFwiREVMRVRFIEZST00gVXNlcnMgV0hFUkUgdXNlcklEID0gJ1wiICsgc3R1ZGVudC51c2VySUQgKyBcIidcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzLnNlbmQoeyByZXN1bHQ6IFwic3VjY2Vzc1wiLCB0aXRsZTogXCJTdHVkZW50IEFyY2hpdmVkXCIsIG1zZzogXCJTdHVkZW50IHVzZXIgaGFzIGJlZW4gc3VjY2Vzc2Z1bGx5IGFyY2hpdmVkLlwiLCBzZXJ2ZXJNc2c6IFwiXCIgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGVycikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3IgLSBBcmNoaXZlIHVzZXIgd2l0aCBpZCBcIiArIHN0dWRlbnQudXNlcklEICsgXCI6IFwiICsgZXJyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICByZXMuc2VuZCh7IHJlc3VsdDogXCJlcnJvclwiLCB0aXRsZTogXCJFcnJvclwiLCBtc2c6IFwiVGhlcmUgd2FzIGFuIGVycm9yIHdoaWxlIGFyY2hpdmluZyBzdHVkZW50LlwiLCBzZXJ2ZXJNc2c6IGVyciB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yIC0gQXJjaGl2ZSBzdHVkZW50IHdpdGggaWQgXCIgKyBzdHVkZW50LnVzZXJJRCArIFwiOiBcIiArIGVycik7XHJcbiAgICAgICAgICAgICAgICAgICAgICByZXMuc2VuZCh7IHJlc3VsdDogXCJlcnJvclwiLCB0aXRsZTogXCJFcnJvclwiLCBtc2c6IFwiVGhlcmUgd2FzIGFuIGVycm9yIHdoaWxlIHJlbW92aW5nIHN0dWRlbnQgZnJvbSBzdHVkZW50cyB0YWJsZS5cIiwgc2VydmVyTXNnOiBlcnIgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbihlcnIpIHtcclxuICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJFcnJvciAtIEFyY2hpdmUgdXNlciB3aXRoIGlkIFwiICsgc3R1ZGVudC51c2VySUQgKyBcIjogXCIgKyBlcnIpO1xyXG4gICAgICAgICAgICAgICAgICByZXMuc2VuZCh7IHJlc3VsdDogXCJlcnJvclwiLCB0aXRsZTogXCJFcnJvclwiLCBtc2c6IFwiVGhlcmUgd2FzIGFuIGVycm9yIHdoaWxlIGFkZGluZyBzdHVkZW50IGluZm9ybWF0aW9uIHRvIHRoZSBhcmNoaXZlIHRhYmxlLlwiLCBzZXJ2ZXJNc2c6IGVyciB9KTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbihlcnIpIHtcclxuICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkRCIENvbm5lY3Rpb24gZXJyb3I6IFwiICsgZXJyKTtcclxuICAgICAgICAgICAgICByZXMuc2VuZCh7IHJlc3VsdDogXCJlcnJvclwiLCB0aXRsZTogXCJDb25uZWN0aW9uIEVycm9yXCIsIG1zZzogXCJUaGVyZSB3YXMgYW4gZXJyb3Igd2hpbGUgY29ubmVjdGluZyB0byB0aGUgZGF0YWJhc2UuXCIsIHNlcnZlck1zZzogZXJyIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3IgLSBBcmNoaXZlIHN0dWRlbnQ6IFwiICsgZXJyKTtcclxuICAgICAgcmVzLnNlbmQoeyByZXN1bHQ6IFwiZXJyb3JcIiwgdGl0bGU6IFwiRXJyb3JcIiwgbXNnOiBcIlRoZXJlIHdhcyBhbiBlcnJvciB3aGlsZSBhcmNoaXZpbmcgc3R1ZGVudC5cIiwgc2VydmVyTXNnOiBlcnIgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBnZXRTdHVkZW50QXJjaGl2ZShyZXE6IGV4cHJlc3MuUmVxdWVzdCwgcmVzOiBleHByZXNzLlJlc3BvbnNlKTogdm9pZCB7XHJcbiAgICB0cnkge1xyXG4gICAgICBuZXcgQXV0aENvbnRyb2xsZXIoKS5hdXRoVXNlcihyZXEsIHJlcywge1xyXG4gICAgICAgIHJlcXVpcmVkQXV0aDogW1wiQWRtaW5cIiwgXCJTdGFmZlwiLCBcIkluc3RydWN0b3JcIl0sIGRvbmU6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgc3FsLmNvbm5lY3QoZGIpXHJcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKGNvbm5lY3Rpb24pIHtcclxuICAgICAgICAgICAgICBuZXcgc3FsLlJlcXVlc3QoY29ubmVjdGlvbilcclxuICAgICAgICAgICAgICAgIC5xdWVyeSgnU0VMRUNUICogRlJPTSBTdHVkZW50QXJjaGl2ZScpXHJcbiAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbihyZWNvcmRzZXQpIHtcclxuICAgICAgICAgICAgICAgICAgcmVzLnNlbmQocmVjb3Jkc2V0KTtcclxuICAgICAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGVycikge1xyXG4gICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yIC0gR2V0IGFsbCBhcmNoaXZlZCBzdHVkZW50czogXCIgKyBlcnIpO1xyXG4gICAgICAgICAgICAgICAgICByZXMuc2VuZCh7IHJlc3VsdDogXCJlcnJvclwiLCB0aXRsZTogXCJFcnJvclwiLCBtc2c6IFwiVGhlcmUgd2FzIGFuIGVycm9yIHJldHJpZXZpbmcgYWxsIHN0dWRlbnRzIGZyb20gYXJjaGl2ZS5cIiwgc2VydmVyTXNnOiBlcnIgfSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XHJcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJEQiBDb25uZWN0aW9uIGVycm9yOiBcIiArIGVycik7XHJcbiAgICAgICAgICAgICAgcmVzLnNlbmQoeyByZXN1bHQ6IFwiZXJyb3JcIiwgdGl0bGU6IFwiQ29ubmVjdGlvbiBFcnJvclwiLCBtc2c6IFwiVGhlcmUgd2FzIGFuIGVycm9yIGNvbm5lY3RpbmcgdG8gdGhlIGRhdGFiYXNlLlwiLCBzZXJ2ZXJNc2c6IGVyciB9KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICBjb25zb2xlLmxvZyhcIkVycm9yIC0gUmV0cmlldmUgYWxsIHN0dWRlbnRzIGZyb20gYXJjaGl2ZTogXCIgKyBlcnIpO1xyXG4gICAgICByZXMuc2VuZCh7IHJlc3VsdDogXCJlcnJvclwiLCB0aXRsZTogXCJFcnJvclwiLCBtc2c6IFwiVGhlcmUgd2FzIGFuIGVycm9yIHJldHJpZXZpbmcgYWxsIHN0dWRlbnRzIGZyb20gYXJjaGl2ZS5cIiwgc2VydmVyTXNnOiBlcnIgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICByZXRyaWV2ZShyZXE6IGV4cHJlc3MuUmVxdWVzdCwgcmVzOiBleHByZXNzLlJlc3BvbnNlKTogdm9pZCB7XHJcbiAgICB0cnkge1xyXG4gICAgICBuZXcgQXV0aENvbnRyb2xsZXIoKS5hdXRoVXNlcihyZXEsIHJlcywge1xyXG4gICAgICAgIHJlcXVpcmVkQXV0aDogW1wiQWRtaW5cIiwgXCJTdGFmZlwiLCBcIkluc3RydWN0b3JcIl0sIGRvbmU6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgc3FsLmNvbm5lY3QoZGIpXHJcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKGNvbm5lY3Rpb24pIHtcclxuICAgICAgICAgICAgICBuZXcgc3FsLlJlcXVlc3QoY29ubmVjdGlvbilcclxuICAgICAgICAgICAgICAgIC5xdWVyeSgnU0VMRUNUIFN0dWRlbnRzLiosIFVzZXJzLmVtYWlsLCBVc2Vycy5hY3RpdmUgRlJPTSBTdHVkZW50cyBMRUZUIEpPSU4gVXNlcnMgT04gU3R1ZGVudHMudXNlcklEID0gVXNlcnMuVXNlcklEJylcclxuICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKHJlY29yZHNldCkge1xyXG4gICAgICAgICAgICAgICAgICByZXMuc2VuZChyZWNvcmRzZXQpO1xyXG4gICAgICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3IgLSBHZXQgYWxsIHN0dWRlbnRzOiBcIiArIGVycik7XHJcbiAgICAgICAgICAgICAgICAgIHJlcy5zZW5kKHsgcmVzdWx0OiBcImVycm9yXCIsIHRpdGxlOiBcIkVycm9yXCIsIG1zZzogXCJUaGVyZSB3YXMgYW4gZXJyb3IgcmV0cmlldmluZyBhbGwgc3R1ZGVudHMuXCIsIHNlcnZlck1zZzogZXJyIH0pO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGVycikge1xyXG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiREIgQ29ubmVjdGlvbiBlcnJvcjogXCIgKyBlcnIpO1xyXG4gICAgICAgICAgICAgIHJlcy5zZW5kKHsgcmVzdWx0OiBcImVycm9yXCIsIHRpdGxlOiBcIkNvbm5lY3Rpb24gRXJyb3JcIiwgbXNnOiBcIlRoZXJlIHdhcyBhbiBlcnJvciBjb25uZWN0aW5nIHRvIHRoZSBkYXRhYmFzZS5cIiwgc2VydmVyTXNnOiBlcnIgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgY29uc29sZS5sb2coXCJFcnJvciAtIFJldHJpZXZlIGFsbCBzdHVkZW50czogXCIgKyBlcnIpO1xyXG4gICAgICByZXMuc2VuZCh7IHJlc3VsdDogXCJlcnJvclwiLCB0aXRsZTogXCJFcnJvclwiLCBtc2c6IFwiVGhlcmUgd2FzIGFuIGVycm9yIHJldHJpZXZpbmcgYWxsIHN0dWRlbnRzLlwiLCBzZXJ2ZXJNc2c6IGVyciB9KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGZpbmRCeUlkKHJlcTogZXhwcmVzcy5SZXF1ZXN0LCByZXM6IGV4cHJlc3MuUmVzcG9uc2UpOiB2b2lkIHtcclxuICAgIHRyeSB7XHJcbiAgICAgIG5ldyBBdXRoQ29udHJvbGxlcigpLmF1dGhVc2VyKHJlcSwgcmVzLCB7XHJcbiAgICAgICAgcmVxdWlyZWRBdXRoOiBbXCJBZG1pblwiLCBcIlN0YWZmXCIsIFwiSW5zdHJ1Y3RvclwiLCBcIlN0dWRlbnRcIl0sIGRvbmU6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgdmFyIF9pZDogc3RyaW5nID0gcmVxLnBhcmFtcy5faWQ7XHJcbiAgICAgICAgICBzcWwuY29ubmVjdChkYilcclxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24oY29ubmVjdGlvbikge1xyXG4gICAgICAgICAgICAgIG5ldyBzcWwuUmVxdWVzdChjb25uZWN0aW9uKVxyXG4gICAgICAgICAgICAgICAgLnF1ZXJ5KFwiU0VMRUNUICogRlJPTSBTdHVkZW50cyBXSEVSRSB1c2VySUQgPSAnXCIgKyBfaWQgKyBcIidcIilcclxuICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKHJlY29yZHNldCkge1xyXG4gICAgICAgICAgICAgICAgICByZXMuc2VuZChyZWNvcmRzZXRbMF0pO1xyXG4gICAgICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3IgLSBGaW5kIHN0dWRlbnQgYnkgaWQ6IFwiICsgZXJyKTtcclxuICAgICAgICAgICAgICAgICAgcmVzLnNlbmQoeyByZXN1bHQ6IFwiZXJyb3JcIiwgdGl0bGU6IFwiRXJyb3JcIiwgbXNnOiBcIlRoZXJlIHdhcyBhbiBlcnJvciByZXRyaWV2aW5nIHN0dWRlbnQgYnkgaWQuXCIsIHNlcnZlck1zZzogZXJyIH0pO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGVycikge1xyXG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiREIgQ29ubmVjdGlvbiBlcnJvcjogXCIgKyBlcnIpO1xyXG4gICAgICAgICAgICAgIHJlcy5zZW5kKHsgcmVzdWx0OiBcImVycm9yXCIsIHRpdGxlOiBcIkNvbm5lY3Rpb24gRXJyb3JcIiwgbXNnOiBcIlRoZXJlIHdhcyBhbiBlcnJvciBjb25uZWN0aW5nIHRvIHRoZSBkYXRhYmFzZS5cIiwgc2VydmVyTXNnOiBlcnIgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgY29uc29sZS5sb2coXCJFcnJvciAtIEZpbmQgc3R1ZGVudCBieSBpZDogXCIgKyBlcnIpO1xyXG4gICAgICByZXMuc2VuZCh7IHJlc3VsdDogXCJlcnJvclwiLCB0aXRsZTogXCJFcnJvclwiLCBtc2c6IFwiVGhlcmUgd2FzIGFuIGVycm9yIHJldHJpZXZpbmcgc3R1ZGVudCBieSBpZC5cIiwgc2VydmVyTXNnOiBlcnIgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBlZGl0Q29uc2VudFJlcXVlc3QocmVxOiBleHByZXNzLlJlcXVlc3QsIHJlczogZXhwcmVzcy5SZXNwb25zZSkge1xyXG4gICAgdHJ5IHtcclxuICAgICAgbmV3IEF1dGhDb250cm9sbGVyKCkuYXV0aFVzZXIocmVxLCByZXMsIHtcclxuICAgICAgICByZXF1aXJlZEF1dGg6IFtcIkFkbWluXCIsIFwiU3RhZmZcIiwgXCJJbnN0cnVjdG9yXCIsIFwiU3R1ZGVudFwiLCBcIkNsaWVudFwiXSwgZG9uZTogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICB2YXIgX2lkOiBzdHJpbmcgPSByZXEucGFyYW1zLl9pZDtcclxuICAgICAgICAgIHNxbC5jb25uZWN0KGRiKVxyXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbihjb25uZWN0aW9uKSB7XHJcbiAgICAgICAgICAgICAgbmV3IHNxbC5SZXF1ZXN0KGNvbm5lY3Rpb24pXHJcbiAgICAgICAgICAgICAgICAucXVlcnkoJ1NFTEVDVCBmaXJzdE5hbWUsIGxhc3ROYW1lIEZST00gU3R1ZGVudHMgV0hFUkUgdXNlcklEID0gJyArIF9pZCArICcnKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24oc3R1ZGVudCkge1xyXG4gICAgICAgICAgICAgICAgICBuZXcgc3FsLlJlcXVlc3QoY29ubmVjdGlvbilcclxuICAgICAgICAgICAgICAgICAgICAucXVlcnkoXCJVUERBVEUgU3R1ZGVudHMgU0VUIGVkaXRDb25zZW50UmVxdWVzdCA9ICd0cnVlJyBXSEVSRSB1c2VySUQgPSBcIiArIF9pZCArIFwiXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICBzdHVkZW50ID0gc3R1ZGVudFswXTtcclxuICAgICAgICAgICAgICAgICAgICAgIHZhciBtYWlsT3B0aW9ucyA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZnJvbTogbWFpbC51c2VyLCAvLyBzZW5kZXIgYWRkcmVzc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0bzogbWFpbC51c2VyLCAvLyByZWNpZXZlciBUQkRcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3ViamVjdDogc3R1ZGVudC5maXJzdE5hbWUgKyAnICcgKyBzdHVkZW50Lmxhc3ROYW1lICsgJyBSZXF1ZXN0IHRvIEVkaXQgQ29uc2VudCAoU3R1ZGVudCknLCAvLyBTdWJqZWN0IGxpbmVcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGV4dDogJycsIC8vIHBsYWluIHRleHQgYm9keVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBodG1sOiAnU3R1ZGVudCAnICsgc3R1ZGVudC5maXJzdE5hbWUgKyAnICcgKyBzdHVkZW50Lmxhc3ROYW1lICsgJyB3YW50cyB0byBlZGl0IHRoZWlyIGNvbnNlbnQgZm9ybS48YnIvPiBQbGVhc2UgbG9naW4gdG8gdGhlIHN0dWRlbnRzIHBhZ2UgYXQ6ICcgKyBzaXRlX3NldHRpbmdzLnVybCArICcvIy9zdHVkZW50cy4gU2VhcmNoIGZvciAnICsgc3R1ZGVudC5maXJzdE5hbWUgKyAnICcgKyBzdHVkZW50Lmxhc3ROYW1lICsgJyBpbiB0aGUgc3R1ZGVudHMgdGFibGUsIHNlbGVjdCBWaWV3IEluZm8gZnJvbSB0aGUgZHJvcGRvd24gdGhlbiBzZWxlY3QgQ29uc2VudCB0byBncmFudCBvciBkZW55IGFjY2Vzcy4nLy8gaHRtbCBib2R5XHJcbiAgICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgbmV3IE1haWxTZXJ2aWNlKCkuc2VuZE1lc3NhZ2UoXCJSZXF1ZXN0IHRvIEVkaXQgQ29uc2VudFwiLCBtYWlsT3B0aW9ucyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICByZXMuc2VuZCh7IHJlc3VsdDogXCJzdWNjZXNzXCIsIHRpdGxlOiBcIlJlcXVlc3QgU2VudFwiLCBtc2c6IFwiWW91ciByZXF1ZXN0IHRvIGVkaXQgY29uc2VudCBoYXMgYmVlbiBzZW50IVwiLCBzZXJ2ZXJNc2c6IFwiXCIgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yIC0gVXBkYXRlIHJlcXVlc3QgdG8gZWRpdFwiICsgZXJyKTtcclxuICAgICAgICAgICAgICAgICAgICAgIHJlcy5zZW5kKHsgcmVzdWx0OiBcImVycm9yXCIsIHRpdGxlOiBcIkVycm9yXCIsIG1zZzogXCJUaGVyZSB3YXMgYW4gZXJyb3Igc2VuZGluZyBlZGl0IHJlcXVlc3QuXCIsIHNlcnZlck1zZzogXCJcIiB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGVycikge1xyXG4gICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yIC0gIFNlbGVjdCBmaXJzdCBhbmQgbGFzdCBuYW1lIGZyb20gc3R1ZGVudHM6IFwiICsgZXJyKTtcclxuICAgICAgICAgICAgICAgICAgcmVzLnNlbmQoeyByZXN1bHQ6IFwiZXJyb3JcIiwgdGl0bGU6IFwiRXJyb3JcIiwgbXNnOiBcIlRoZXJlIHdhcyBhbiBlcnJvciBzZW5kaW5nIGVkaXQgcmVxdWVzdC5cIiwgc2VydmVyTXNnOiBcIlwiIH0pO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGVycikge1xyXG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiREIgQ29ubmVjdGlvbiBlcnJvcjogXCIgKyBlcnIpO1xyXG4gICAgICAgICAgICAgIHJlcy5zZW5kKHsgcmVzdWx0OiBcImVycm9yXCIsIHRpdGxlOiBcIkNvbm5lY3Rpb24gRXJyb3JcIiwgbXNnOiBcIlRoZXJlIHdhcyBhbiBlcnJvciBjb25uZWN0aW5nIHRvIHRoZSBkYXRhYmFzZS5cIiwgc2VydmVyTXNnOiBcIlwiIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3IgLSBFZGl0IGNvbnNlbnQgcmVxdWVzdDogXCIgKyBlcnIpO1xyXG4gICAgICByZXMuc2VuZCh7IHJlc3VsdDogXCJlcnJvclwiLCB0aXRsZTogXCJFcnJvclwiLCBtc2c6IFwiVGhlcmUgd2FzIGFuIGVycm9yIHNlbmRpbmcgZWRpdCByZXF1ZXN0LlwiLCBzZXJ2ZXJNc2c6IFwiXCIgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBncmFudENvbnNlbnRFZGl0UGVybWlzc2lvbihyZXE6IGV4cHJlc3MuUmVxdWVzdCwgcmVzOiBleHByZXNzLlJlc3BvbnNlKSB7XHJcbiAgICB0cnkge1xyXG4gICAgICBuZXcgQXV0aENvbnRyb2xsZXIoKS5hdXRoVXNlcihyZXEsIHJlcywge1xyXG4gICAgICAgIHJlcXVpcmVkQXV0aDogYXV0aCwgZG9uZTogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICB2YXIgcGVybWlzc2lvbiA9IHJlcS5ib2R5LnBlcm1pc3Npb247XHJcbiAgICAgICAgICB2YXIgc3R1ZGVudCA9IHJlcS5ib2R5LnN0dWRlbnQ7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhcInlheWFcIik7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhcIlZhbHVlOiBcIiArIHBlcm1pc3Npb24gKyAnLCAnICsgXCJVc2VySUQ6IFwiICsgc3R1ZGVudC51c2VySUQpO1xyXG4gICAgICAgICAgaWYgKHBlcm1pc3Npb24pIHtcclxuICAgICAgICAgICAgc3FsLmNvbm5lY3QoZGIpXHJcbiAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24oY29ubmVjdGlvbikge1xyXG4gICAgICAgICAgICAgICAgbmV3IHNxbC5SZXF1ZXN0KGNvbm5lY3Rpb24pXHJcbiAgICAgICAgICAgICAgICAgIC5xdWVyeShcIlVQREFURSBTdHVkZW50cyBTRVQgZWRpdENvbnNlbnRSZXF1ZXN0ID0gJ2ZhbHNlJyBXSEVSRSB1c2VySUQgPSBcIiArIHN0dWRlbnQudXNlcklEKVxyXG4gICAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbihyZXN1bHQxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmV3IHNxbC5SZXF1ZXN0KGNvbm5lY3Rpb24pXHJcbiAgICAgICAgICAgICAgICAgICAgICAucXVlcnkoXCJVUERBVEUgU3R1ZGVudHMgU0VUIGVkaXRDb25zZW50UGVybWlzc2lvbiA9ICd0cnVlJyBXSEVSRSB1c2VySUQgPSBcIiArIHN0dWRlbnQudXNlcklEKVxyXG4gICAgICAgICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24ocmVzdWx0Mikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXcgc3FsLlJlcXVlc3QoY29ubmVjdGlvbilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAucXVlcnkoXCJTRUxFQ1QgZW1haWwgRlJPTSB1c2VycyBXSEVSRSB1c2VySUQgPSBcIiArIHN0dWRlbnQudXNlcklEKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKHN0dWRlbnRFbWFpbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG1haWxPcHRpb25zID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmcm9tOiBtYWlsLnVzZXIsIC8vIHNlbmRlciBhZGRyZXNzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvOiBzdHVkZW50RW1haWxbMF0uZW1haWwsIC8vIHN0dWRlbnQuZW1haWxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3ViamVjdDogJ1JlcXVlc3QgR3JhbnRlZCEnLCAvLyBTdWJqZWN0IGxpbmVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dDogJycsIC8vIHBsYWluIHRleHQgYm9keVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBodG1sOiAnWW91IGNhbiBub3cgbG9naW4gYXQ6IGh0dHBzOi8vZ2NhY2FkZW1pY3ByZXAuYXp1cmV3ZWJzaXRlcy5uZXQgYW5kIG1ha2UgY2hhbmdlcyB0byB5b3VyIGNvbnNlbnQgZm9ybS4nLy8gaHRtbCBib2R5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3IE1haWxTZXJ2aWNlKCkuc2VuZE1lc3NhZ2UoXCJDb25zZW50IEVkaXQgUmVxdWVzdCBHcmFudGVkXCIsIG1haWxPcHRpb25zKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcy5zZW5kKHsgcmVzdWx0OiBcImdyYW50ZWRcIiwgdGl0bGU6IFwiUmVxdWVzdCBHcmFudGVkXCIsIG1zZzogXCJTdHVkZW50IGhhcyBiZWVuIGdyYW50ZWQgYWNjZXNzIHRvIGVkaXQgdGhlaXIgY29uc2VudCBmb3JtLlwiLCBzZXJ2ZXJNc2c6IFwiXCIgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yIC0gR2V0IGVtYWlsIGZyb20gdXNlcnMuIFwiICsgZXJyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcy5zZW5kKHsgcmVzdWx0OiBcImVycm9yXCIsIHRpdGxlOiBcIkVycm9yXCIsIG1zZzogXCJUaGVyZSB3YXMgYW4gZXJyb3IgcmV0cmlldmluZyBlbWFpbCBmcm9tIHVzZXJzIHRhYmxlLlwiLCBzZXJ2ZXJNc2c6IGVyciB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGVycikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yIC0gU2V0IGVkaXRDb25zZW50UGVybWlzc2lvbiBlcXVhbCB0byB0cnVlLiBcIiArIGVycik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcy5zZW5kKHsgcmVzdWx0OiBcImVycm9yXCIsIHRpdGxlOiBcIkVycm9yXCIsIG1zZzogXCJUaGVyZSB3YXMgYW4gZXJyb3Igc2V0dGluZyBjb25zZW50IGVkaXQgcGVybWlzc2lvbiB0byB0cnVlLlwiLCBzZXJ2ZXJNc2c6IGVyciB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbihlcnIpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yIC0gU2V0IGVkaXRDb25zZW50UmVxdWVzdCBlcXVhbCB0byBmYWxzZS4gXCIgKyBlcnIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlcy5zZW5kKHsgcmVzdWx0OiBcImVycm9yXCIsIHRpdGxlOiBcIkVycm9yXCIsIG1zZzogXCJUaGVyZSB3YXMgYW4gZXJyb3Igc2V0dGluZyBjb25zZW50IGVkaXQgcmVxdWVzdCB0byBmYWxzZS5cIiwgc2VydmVyTXNnOiBlcnIgfSk7XHJcbiAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGVycikge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJEQiBDb25uZWN0aW9uIGVycm9yOiBcIiArIGVycik7XHJcbiAgICAgICAgICAgICAgICByZXMuc2VuZCh7IHJlc3VsdDogXCJlcnJvclwiLCB0aXRsZTogXCJDb25uZWN0aW9uIEVycm9yXCIsIG1zZzogXCJUaGVyZSB3YXMgYW4gZXJyb3IgY29ubmVjdGluZyB0byB0aGUgZGF0YWJhc2UuXCIsIHNlcnZlck1zZzogZXJyIH0pO1xyXG4gICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmVzLnNlbmQoeyByZXN1bHQ6IFwiZGVuaWVkXCIsIHRpdGxlOiBcIlJlcXVlc3QgRGVuaWVkXCIsIG1zZzogXCJTdHVkZW50IGhhcyBiZWVuIGRlbmllZCBhY2Nlc3MgdG8gZWRpdCB0aGVpciBjb25zZW50IGZvcm0uXCIsIHNlcnZlck1zZzogXCJcIiB9KTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3IgLSBHcmFudCBjb25zZW50IGVkaXQgcGVybWlzc2lvbjogXCIgKyBlcnIpO1xyXG4gICAgICByZXMuc2VuZCh7IHJlc3VsdDogXCJlcnJvclwiLCB0aXRsZTogXCJFcnJvclwiLCBtc2c6IFwiVGhlcmUgd2FzIGFuIGVycm9yIGdyYW50aW5nIGNvbnNlbnQgZWRpdCBwZXJtaXNzaW9uLlwiLCBzZXJ2ZXJNc2c6IGVyciB9KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGFkZFRvVGltZXRhYmxlKHJlcTogZXhwcmVzcy5SZXF1ZXN0LCByZXM6IGV4cHJlc3MuUmVzcG9uc2UpOiB2b2lkIHtcclxuICAgIHRyeSB7XHJcbiAgICAgIHZhciBpbmZvID0gcmVxLmJvZHlbMF07XHJcbiAgICAgIHZhciBfdXNlcklEID0gaW5mby51c2VySUQ7XHJcbiAgICAgIHZhciBfc3RhcnREYXRlID0gaW5mby5zdGFydERhdGU7XHJcbiAgICAgIHZhciBfZW5kRGF0ZSA9IGluZm8uZW5kRGF0ZTtcclxuICAgICAgdmFyIF9jb3Vyc2VJRCA9IGluZm8uY291cnNlSUQ7XHJcbiAgICAgIHZhciBfaW5zdHJ1Y3RvcklEID0gaW5mby5pbnN0cnVjdG9ySUQ7XHJcbiAgICAgIHNxbC5jb25uZWN0KGRiKVxyXG4gICAgICAgIC50aGVuKGZ1bmN0aW9uKGNvbm5lY3Rpb24pIHtcclxuICAgICAgICAgIG5ldyBzcWwuUmVxdWVzdChjb25uZWN0aW9uKVxyXG4gICAgICAgICAgICAucXVlcnkoXCJJTlNFUlQgSU5UTyBUaW1ldGFibGVzICh1c2VySUQsc3RhcnREYXRlLGVuZERhdGUsY291cnNlSUQsaW5zdHJ1Y3RvcklEKSBWQUxVRVMgKCdcIiArIF91c2VySUQgKyBcIicsJ1wiICsgX3N0YXJ0RGF0ZSArIFwiJywnXCIgKyBfZW5kRGF0ZSArIFwiJywnXCIgKyBfY291cnNlSUQgKyBcIicsJ1wiICsgX2luc3RydWN0b3JJRCArIFwiJylcIilcclxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgcmVzLnNlbmQoeyByZXN1bHQ6IFwic3VjY2Vzc1wiLCB0aXRsZTogXCJTdHVkZW50IEVucm9sbGVkXCIsIG1zZzogXCJTdHVkZW50IHVzZXIgaGFzIGJlZW4gYWRkZWQgdG8gY291cnNlLlwiLCBzZXJ2ZXJNc2c6IFwiXCIgfSk7XHJcbiAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGVycikge1xyXG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3IgLSBJbnNlcnQgaW50byB0aW1ldGFibGU6IFwiICsgZXJyKTtcclxuICAgICAgICAgICAgICByZXMuc2VuZCh7IHJlc3VsdDogXCJlcnJvclwiLCB0aXRsZTogXCJFcnJvclwiLCBtc2c6IFwiVGhlcmUgd2FzIGFuIGVycm9yIGFkZGluZyBzdHVkZW50IHRvIHRpbWV0YWJsZS5cIiwgc2VydmVyTXNnOiBlcnIgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGVycikge1xyXG4gICAgICAgICAgY29uc29sZS5sb2coXCJEQiBDb25uZWN0aW9uIGVycm9yOiBcIiArIGVycik7XHJcbiAgICAgICAgICByZXMuc2VuZCh7IHJlc3VsdDogXCJlcnJvclwiLCB0aXRsZTogXCJDb25uZWN0aW9uIEVycm9yXCIsIG1zZzogXCJUaGVyZSB3YXMgYW4gZXJyb3IgY29ubmVjdGluZyB0byB0aGUgZGF0YWJhc2UuXCIsIHNlcnZlck1zZzogZXJyIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3IgLSBBZGQgc3R1ZGVudCB0byB0aW1ldGFibGU6IFwiICsgZXJyKTtcclxuICAgICAgcmVzLnNlbmQoeyByZXN1bHQ6IFwiZXJyb3JcIiwgdGl0bGU6IFwiRXJyb3JcIiwgbXNnOiBcIlRoZXJlIHdhcyBhbiBlcnJvciBhZGRpbmcgc3R1ZGVudCB0byB0aW1ldGFibGUuXCIsIHNlcnZlck1zZzogZXJyIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcmVtb3ZlRnJvbVRpbWV0YWJsZShyZXE6IGV4cHJlc3MuUmVxdWVzdCwgcmVzOiBleHByZXNzLlJlc3BvbnNlKTogdm9pZCB7XHJcbiAgICB0cnkge1xyXG4gICAgICB2YXIgX3VzZXJJRCA9IHJlcS5wYXJhbXMuX3VzZXJJRDtcclxuICAgICAgdmFyIF9jb3Vyc2VJRCA9IHJlcS5wYXJhbXMuX2NvdXJzZUlEO1xyXG4gICAgICBzcWwuY29ubmVjdChkYilcclxuICAgICAgICAudGhlbihmdW5jdGlvbihjb25uZWN0aW9uKSB7XHJcbiAgICAgICAgICBuZXcgc3FsLlJlcXVlc3QoY29ubmVjdGlvbilcclxuICAgICAgICAgICAgLnF1ZXJ5KFwiREVMRVRFIEZST00gVGltZXRhYmxlcyBXSEVSRSB1c2VySUQgPSAoJ1wiICsgX3VzZXJJRCArIFwiJykgQU5EIGNvdXJzZUlEID0gKCdcIiArIF9jb3Vyc2VJRCArIFwiJylcIilcclxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgcmVzLnNlbmQoeyByZXN1bHQ6IFwic3VjY2Vzc1wiLCB0aXRsZTogXCJTdHVkZW50IFJlbW92ZWRcIiwgbXNnOiBcIlN0dWRlbnQgaGFzIGJlZW4gcmVtb3ZlZCBmcm9tIGNvdXJzZS5cIiwgc2VydmVyTXNnOiBcIlwiIH0pO1xyXG4gICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbihlcnIpIHtcclxuICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yIC0gUmVtb3ZlIHN0dWRlbnQgZnJvbSB0aW1ldGFibGU6IFwiICsgZXJyKTtcclxuICAgICAgICAgICAgICByZXMuc2VuZCh7IHJlc3VsdDogXCJlcnJvclwiLCB0aXRsZTogXCJFcnJvclwiLCBtc2c6IFwiVGhlcmUgd2FzIGFuIGVycm9yIHJlbW92aW5nIHN0dWRlbnQgZnJvbSB0aW1ldGFibGUuXCIsIHNlcnZlck1zZzogZXJyIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KS5jYXRjaChmdW5jdGlvbihlcnIpIHtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKFwiREIgQ29ubmVjdGlvbiBlcnJvcjogXCIgKyBlcnIpO1xyXG4gICAgICAgICAgcmVzLnNlbmQoeyByZXN1bHQ6IFwiZXJyb3JcIiwgdGl0bGU6IFwiQ29ubmVjdGlvbiBFcnJvclwiLCBtc2c6IFwiVGhlcmUgd2FzIGFuIGVycm9yIGNvbm5lY3RpbmcgdG8gdGhlIGRhdGFiYXNlLlwiLCBzZXJ2ZXJNc2c6IGVyciB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICBjb25zb2xlLmxvZyhcIkVycm9yIC0gUmVtb3ZlIHN0dWRlbnQgZnJvbSB0aW1ldGFibGU6IFwiICsgZXJyKTtcclxuICAgICAgcmVzLnNlbmQoeyByZXN1bHQ6IFwiZXJyb3JcIiwgdGl0bGU6IFwiRXJyb3JcIiwgbXNnOiBcIlRoZXJlIHdhcyBhbiBlcnJvciByZW1vdmluZyBzdHVkZW50IGZyb20gdGltZXRhYmxlLlwiLCBzZXJ2ZXJNc2c6IGVyciB9KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGdldFRpbWV0YWJsZXMocmVxOiBleHByZXNzLlJlcXVlc3QsIHJlczogZXhwcmVzcy5SZXNwb25zZSk6IHZvaWQge1xyXG4gICAgdHJ5IHtcclxuICAgICAgbmV3IEF1dGhDb250cm9sbGVyKCkuYXV0aFVzZXIocmVxLCByZXMsIHtcclxuICAgICAgICByZXF1aXJlZEF1dGg6IFtcIkluc3RydWN0b3JcIiwgXCJBZG1pblwiLCBcIlN0YWZmXCJdLCBkb25lOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgIHNxbC5jb25uZWN0KGRiKVxyXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbihjb25uZWN0aW9uKSB7XHJcbiAgICAgICAgICAgICAgbmV3IHNxbC5SZXF1ZXN0KGNvbm5lY3Rpb24pXHJcbiAgICAgICAgICAgICAgICAucXVlcnkoXCJTRUxFQ1QgKiBGUk9NIFRpbWV0YWJsZXNcIilcclxuICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKHJlY29yZHNldCkge1xyXG4gICAgICAgICAgICAgICAgICByZXMuc2VuZChyZWNvcmRzZXQpO1xyXG4gICAgICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3IgLSBHZXQgc3R1ZGVudCB0aW1ldGFibGVzOiBcIiArIGVycik7XHJcbiAgICAgICAgICAgICAgICAgIHJlcy5zZW5kKHsgcmVzdWx0OiBcImVycm9yXCIsIHRpdGxlOiBcIkVycm9yXCIsIG1zZzogXCJUaGVyZSB3YXMgYW4gZXJyb3IgcmV0cmlldmluZyBzdHVkZW50IHRpbWV0YWJsZXMuXCIsIHNlcnZlck1zZzogZXJyIH0pO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGVycikge1xyXG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiREIgQ29ubmVjdGlvbiBlcnJvcjogXCIgKyBlcnIpO1xyXG4gICAgICAgICAgICAgIHJlcy5zZW5kKHsgcmVzdWx0OiBcImVycm9yXCIsIHRpdGxlOiBcIkNvbm5lY3Rpb24gRXJyb3JcIiwgbXNnOiBcIlRoZXJlIHdhcyBhbiBlcnJvciBjb25uZWN0aW5nIHRvIHRoZSBkYXRhYmFzZS5cIiwgc2VydmVyTXNnOiBlcnIgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgY29uc29sZS5sb2coXCJFcnJvciAtIEdldCBzdHVkZW50IHRpbWV0YWJsZXM6IFwiICsgZXJyKTtcclxuICAgICAgcmVzLnNlbmQoeyByZXN1bHQ6IFwiZXJyb3JcIiwgdGl0bGU6IFwiRXJyb3JcIiwgbXNnOiBcIlRoZXJlIHdhcyBhbiBlcnJvciByZXRyaWV2aW5nIHN0dWRlbnQgdGltZXRhYmxlcy5cIiwgc2VydmVyTXNnOiBlcnIgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBnZXRUaW1ldGFibGVzQnlDb3Vyc2VJZChyZXE6IGV4cHJlc3MuUmVxdWVzdCwgcmVzOiBleHByZXNzLlJlc3BvbnNlKTogdm9pZCB7XHJcbiAgICB0cnkge1xyXG4gICAgICBuZXcgQXV0aENvbnRyb2xsZXIoKS5hdXRoVXNlcihyZXEsIHJlcywge1xyXG4gICAgICAgIHJlcXVpcmVkQXV0aDogYXV0aCwgZG9uZTogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICB2YXIgX2lkOiBzdHJpbmcgPSByZXEucGFyYW1zLl9jb3Vyc2VJRDtcclxuICAgICAgICAgIHNxbC5jb25uZWN0KGRiKVxyXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbihjb25uZWN0aW9uKSB7XHJcbiAgICAgICAgICAgICAgbmV3IHNxbC5SZXF1ZXN0KGNvbm5lY3Rpb24pXHJcbiAgICAgICAgICAgICAgICAucXVlcnkoXCJTRUxFQ1QgKiBGUk9NIFRpbWV0YWJsZXMgV0hFUkUgY291cnNlSUQgPSAnXCIgKyBfaWQgKyBcIidcIilcclxuICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKHJlY29yZHNldCkge1xyXG4gICAgICAgICAgICAgICAgICByZXMuc2VuZChyZWNvcmRzZXQpO1xyXG4gICAgICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3IgLSBHZXQgdGltZXRhYmxlcyBieSBjb3Vyc2VJRDogXCIgKyBlcnIpO1xyXG4gICAgICAgICAgICAgICAgICByZXMuc2VuZCh7IHJlc3VsdDogXCJlcnJvclwiLCB0aXRsZTogXCJFcnJvclwiLCBtc2c6IFwiVGhlcmUgd2FzIGFuIGVycm9yIHJldHJpZXZpbmcgc3R1ZGVudCB0aW1ldGFibGVzIGJ5IGNvdXJzZSBpZC5cIiwgc2VydmVyTXNnOiBlcnIgfSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XHJcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJEQiBDb25uZWN0aW9uIGVycm9yOiBcIiArIGVycik7XHJcbiAgICAgICAgICAgICAgcmVzLnNlbmQoeyByZXN1bHQ6IFwiZXJyb3JcIiwgdGl0bGU6IFwiQ29ubmVjdGlvbiBFcnJvclwiLCBtc2c6IFwiVGhlcmUgd2FzIGFuIGVycm9yIGNvbm5lY3RpbmcgdG8gdGhlIGRhdGFiYXNlLlwiLCBzZXJ2ZXJNc2c6IGVyciB9KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICBjb25zb2xlLmxvZyhcIkVycm9yIC0gR2V0IHRpbWV0YWJsZXMgYnkgY291cnNlIGlkOiBcIiArIGVycik7XHJcbiAgICAgIHJlcy5zZW5kKHsgcmVzdWx0OiBcImVycm9yXCIsIHRpdGxlOiBcIkVycm9yXCIsIG1zZzogXCJUaGVyZSB3YXMgYW4gZXJyb3IgcmV0cmlldmluZyBzdHVkZW50IHRpbWV0YWJsZXMgYnkgY291cnNlIGlkLlwiLCBzZXJ2ZXJNc2c6IGVyciB9KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGdldFRpbWV0YWJsZXNCeVVzZXJJZChyZXE6IGV4cHJlc3MuUmVxdWVzdCwgcmVzOiBleHByZXNzLlJlc3BvbnNlKTogdm9pZCB7XHJcbiAgICB0cnkge1xyXG4gICAgICBuZXcgQXV0aENvbnRyb2xsZXIoKS5hdXRoVXNlcihyZXEsIHJlcywge1xyXG4gICAgICAgIHJlcXVpcmVkQXV0aDogW1wiU3R1ZGVudFwiLCBcIkFkbWluXCIsIFwiU3RhZmZcIiwgXCJJbnN0cnVjdG9yXCJdLCBkb25lOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgIHZhciBfaWQ6IHN0cmluZyA9IHJlcS5wYXJhbXMudXNlcklEO1xyXG4gICAgICAgICAgc3FsLmNvbm5lY3QoZGIpXHJcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKGNvbm5lY3Rpb24pIHtcclxuICAgICAgICAgICAgICBuZXcgc3FsLlJlcXVlc3QoY29ubmVjdGlvbilcclxuICAgICAgICAgICAgICAgIC5xdWVyeShgc2VsZWN0ICogRlJPTSBUaW1ldGFibGVzIFdIRVJFIHVzZXJJRCA9ICR7X2lkfWApXHJcbiAgICAgICAgICAgICAgICAudGhlbigocmVzdWx0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHQubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBxdWVyeSA9ICdzZWxlY3QgKiBmcm9tIGNvdXJzZSB3aGVyZSc7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCByZXN1bHQubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgIGlmIChpID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHF1ZXJ5ICs9ICcgY291cnNlSWQgPSAnICsgcmVzdWx0W2ldLmNvdXJzZUlEO1xyXG4gICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcXVlcnkgKz0gXCIgT1IgY291cnNlSWQgPSBcIiArIHJlc3VsdFtpXS5jb3Vyc2VJRDtcclxuICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgbmV3IHNxbC5SZXF1ZXN0KGNvbm5lY3Rpb24pXHJcbiAgICAgICAgICAgICAgICAgICAgICAucXVlcnkocXVlcnkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAudGhlbigocmVzdWx0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcy5zZW5kKHJlc3VsdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbihlcnIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJFcnJvciAtIFNlbGVjdCBmcm9tIGNvdXJzZXM6IFwiICsgZXJyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzLnNlbmQoeyByZXN1bHQ6IFwiZXJyb3JcIiwgdGl0bGU6IFwiRXJyb3JcIiwgbXNnOiBcIlRoZXJlIHdhcyBhbiBlcnJvciByZXRyaWV2aW5nIHN0dWRlbnQgdGltZXRhYmxlcyBieSB1c2VyIGlkLlwiLCBzZXJ2ZXJNc2c6IGVyciB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlcy5zZW5kKHsgcmVzdWx0OiBcInN1Y2Nlc3NcIiwgdGl0bGU6IFwiTm8gVGltZXRhYmxlIEluZm9cIiwgbXNnOiBcIk5vIHRpbXRhYmxlIGluZm8gZm9yIHRoaXMgc3R1ZGVudC5cIiwgc2VydmVyTXNnOiBcIlwiIH0pO1xyXG4gICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbihlcnIpIHtcclxuICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJFcnJvciAtIFNlbGVjdCBmcm9tIHRpbWV0YWJsZXM6IFwiICsgZXJyKTtcclxuICAgICAgICAgICAgICAgICAgcmVzLnNlbmQoeyByZXN1bHQ6IFwiZXJyb3JcIiwgdGl0bGU6IFwiRXJyb3JcIiwgbXNnOiBcIlRoZXJlIHdhcyBhbiBlcnJvciByZXRyaWV2aW5nIHN0dWRlbnQgdGltZXRhYmxlcyBieSB1c2VyIGlkLlwiLCBzZXJ2ZXJNc2c6IGVyciB9KTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbihlcnIpIHtcclxuICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkRCIENvbm5lY3Rpb24gZXJyb3I6IFwiICsgZXJyKTtcclxuICAgICAgICAgICAgICByZXMuc2VuZCh7IHJlc3VsdDogXCJlcnJvclwiLCB0aXRsZTogXCJDb25uZWN0aW9uIEVycm9yXCIsIG1zZzogXCJUaGVyZSB3YXMgYW4gZXJyb3IgY29ubmVjdGluZyB0byB0aGUgZGF0YWJhc2UuXCIsIHNlcnZlck1zZzogZXJyIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3IgLSBHZXQgdGltZXRhYmxlcyBieSB1c2VyIGlkOiBcIiArIGVycik7XHJcbiAgICAgIHJlcy5zZW5kKHsgcmVzdWx0OiBcImVycm9yXCIsIHRpdGxlOiBcIkVycm9yXCIsIG1zZzogXCJUaGVyZSB3YXMgYW4gZXJyb3IgcmV0cmlldmluZyBzdHVkZW50IHRpbWV0YWJsZXMgYnkgdXNlciBpZC5cIiwgc2VydmVyTXNnOiBlcnIgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBjcmVhdGVOb3RlKHJlcTogZXhwcmVzcy5SZXF1ZXN0LCByZXM6IGV4cHJlc3MuUmVzcG9uc2UpOiB2b2lkIHtcclxuICAgIHRyeSB7XHJcbiAgICAgIG5ldyBBdXRoQ29udHJvbGxlcigpLmF1dGhVc2VyKHJlcSwgcmVzLCB7XHJcbiAgICAgICAgcmVxdWlyZWRBdXRoOiBbXCJBZG1pblwiLCBcIlN0YWZmXCIsIFwiSW5zdHJ1Y3RvclwiXSwgZG9uZTogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICB2YXIgY2FzZU5vdGUgPSByZXEuYm9keS5jYXNlTm90ZTtcclxuICAgICAgICAgIHZhciBkYXRlVGltZSA9IHJlcS5ib2R5LmRhdGVUaW1lO1xyXG4gICAgICAgICAgdmFyIF9pZDogc3RyaW5nID0gcmVxLnBhcmFtcy5fc3R1ZGVudElEO1xyXG5cclxuICAgICAgICAgIHNxbC5jb25uZWN0KGRiKVxyXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbihjb25uZWN0aW9uKSB7XHJcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coZGF0ZVRpbWUpO1xyXG4gICAgICAgICAgICAgIG5ldyBzcWwuUmVxdWVzdChjb25uZWN0aW9uKVxyXG4gICAgICAgICAgICAgICAgLnF1ZXJ5KFwiSU5TRVJUIElOVE8gQ2FzZU5vdGVzIFZBTFVFUyAoJ1wiICsgX2lkICsgXCInLCAnXCIgKyBjYXNlTm90ZSArIFwiJywgJ1wiICsgZGF0ZVRpbWUgKyBcIicpXCIpXHJcbiAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgcmVzLnNlbmQoeyByZXN1bHQ6IFwic3VjY2Vzc1wiLCB0aXRsZTogXCJOb3RlIENyZWF0ZWQhXCIsIG1zZzogXCJOb3RlIGhhcyBiZWVuIGNyZWF0ZWQgZm9yIHRoaXMgc3R1ZGVudC5cIiwgc2VydmVyTXNnOiBcIlwiIH0pO1xyXG4gICAgICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3IgLSBJbnNlcnQgbmV3IG5vdGUgXCIgKyBlcnIpO1xyXG4gICAgICAgICAgICAgICAgICByZXMuc2VuZCh7IHJlc3VsdDogXCJlcnJvclwiLCB0aXRsZTogXCJFcnJvclwiLCBtc2c6IFwiVGhlcmUgd2FzIGFuIGVycm9yIGNyZWF0aW5nIG5vdGUgZm9yIHN0dWRlbnQuXCIsIHNlcnZlck1zZzogZXJyIH0pO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGVycikge1xyXG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiREIgQ29ubmVjdGlvbiBlcnJvcjogXCIgKyBlcnIpO1xyXG4gICAgICAgICAgICAgIHJlcy5zZW5kKHsgcmVzdWx0OiBcImVycm9yXCIsIHRpdGxlOiBcIkNvbm5lY3Rpb24gRXJyb3JcIiwgbXNnOiBcIlRoZXJlIHdhcyBhbiBlcnJvciBjb25uZWN0aW5nIHRvIHRoZSBkYXRhYmFzZS5cIiwgc2VydmVyTXNnOiBlcnIgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgY29uc29sZS5sb2coXCJFcnJvciAtIENyZWF0ZSBub3RlOiBcIiArIGVycik7XHJcbiAgICAgIHJlcy5zZW5kKHsgcmVzdWx0OiBcImVycm9yXCIsIHRpdGxlOiBcIkVycm9yXCIsIG1zZzogXCJUaGVyZSB3YXMgYW4gZXJyb3IgY3JlYXRpbmcgbm90ZSBmb3Igc3R1ZGVudC5cIiwgc2VydmVyTXNnOiBlcnIgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBnZXROb3RlKHJlcTogZXhwcmVzcy5SZXF1ZXN0LCByZXM6IGV4cHJlc3MuUmVzcG9uc2UpOiB2b2lkIHtcclxuICAgIHRyeSB7XHJcbiAgICAgIG5ldyBBdXRoQ29udHJvbGxlcigpLmF1dGhVc2VyKHJlcSwgcmVzLCB7XHJcbiAgICAgICAgcmVxdWlyZWRBdXRoOiBbXCJBZG1pblwiLCBcIlN0YWZmXCIsIFwiSW5zdHJ1Y3RvclwiXSwgZG9uZTogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICB2YXIgX2lkOiBzdHJpbmcgPSByZXEucGFyYW1zLl9zdHVkZW50SUQ7XHJcbiAgICAgICAgICBzcWwuY29ubmVjdChkYilcclxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24oY29ubmVjdGlvbikge1xyXG4gICAgICAgICAgICAgIG5ldyBzcWwuUmVxdWVzdChjb25uZWN0aW9uKVxyXG4gICAgICAgICAgICAgICAgLnF1ZXJ5KFwiU0VMRUNUICogIEZST00gQ2FzZU5vdGVzIFdIRVJFIHN0dWRlbnRJRCA9ICdcIiArIF9pZCArIFwiJyBPUkRFUiBCWSBkYXRlVGltZSBERVNDXCIpXHJcbiAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbihyZWNvcmRzZXQpIHtcclxuICAgICAgICAgICAgICAgICAgcmVzLnNlbmQocmVjb3Jkc2V0KTtcclxuICAgICAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGVycikge1xyXG4gICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yIC0gR2V0IGNhc2Ugbm90ZSBieSBpZDogXCIgKyBlcnIpO1xyXG4gICAgICAgICAgICAgICAgICByZXMuc2VuZCh7IHJlc3VsdDogXCJlcnJvclwiLCB0aXRsZTogXCJFcnJvclwiLCBtc2c6IFwiVGhlcmUgd2FzIGFuIGVycm9yIHJldHJpZXZpbmcgbm90ZXMgZm9yIHRoaXMgc3R1ZGVudC5cIiwgc2VydmVyTXNnOiBlcnIgfSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XHJcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJEQiBDb25uZWN0aW9uIGVycm9yOiBcIiArIGVycik7XHJcbiAgICAgICAgICAgICAgcmVzLnNlbmQoeyByZXN1bHQ6IFwiZXJyb3JcIiwgdGl0bGU6IFwiQ29ubmVjdGlvbiBFcnJvclwiLCBtc2c6IFwiVGhlcmUgd2FzIGFuIGVycm9yIGNvbm5lY3RpbmcgdG8gdGhlIGRhdGFiYXNlLlwiLCBzZXJ2ZXJNc2c6IGVyciB9KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICBjb25zb2xlLmxvZyhcIkVycm9yIC0gR2V0IHN0dWRlbnQgbm90ZXM6IFwiICsgZXJyKTtcclxuICAgICAgcmVzLnNlbmQoeyByZXN1bHQ6IFwiZXJyb3JcIiwgdGl0bGU6IFwiRXJyb3JcIiwgbXNnOiBcIlRoZXJlIHdhcyBhbiBlcnJvciByZXRyaWV2aW5nIG5vdGVzIGZvciB0aGlzIHN0dWRlbnQuXCIsIHNlcnZlck1zZzogZXJyIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZGVsZXRlTm90ZShyZXE6IGV4cHJlc3MuUmVxdWVzdCwgcmVzOiBleHByZXNzLlJlc3BvbnNlKTogdm9pZCB7XHJcbiAgICB0cnkge1xyXG4gICAgICBuZXcgQXV0aENvbnRyb2xsZXIoKS5hdXRoVXNlcihyZXEsIHJlcywge1xyXG4gICAgICAgIHJlcXVpcmVkQXV0aDogYXV0aCwgZG9uZTogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICB2YXIgX2lkOiBzdHJpbmcgPSByZXEucGFyYW1zLl9pZDtcclxuICAgICAgICAgIHNxbC5jb25uZWN0KGRiKVxyXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbihjb25uZWN0aW9uKSB7XHJcbiAgICAgICAgICAgICAgbmV3IHNxbC5SZXF1ZXN0KGNvbm5lY3Rpb24pXHJcbiAgICAgICAgICAgICAgICAucXVlcnkoXCJERUxFVEUgRlJPTSBjYXNlTm90ZXMgV0hFUkUgY2FzZU5vdGVJRCA9ICdcIiArIF9pZCArIFwiJ1wiKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgIHJlcy5zZW5kKHsgcmVzdWx0OiBcInN1Y2Nlc3NcIiwgdGl0bGU6IFwiTm90ZSBEZWxldGVkXCIsIG1zZzogXCJOb3RlIGhhcyBiZWVuIGRlbGV0ZWQgZm9yIHRoaXMgc3R1ZGVudC5cIiwgc2VydmVyTXNnOiBcIlwiIH0pO1xyXG4gICAgICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3IgLSBEZWxldGUgc3R1ZGVudCBub3RlOiBcIiArIGVycik7XHJcbiAgICAgICAgICAgICAgICAgIHJlcy5zZW5kKHsgcmVzdWx0OiBcImVycm9yXCIsIHRpdGxlOiBcIkVycm9yXCIsIG1zZzogXCJUaGVyZSB3YXMgYW4gZXJyb3IgZGVsZXRpbmcgdGhpcyBub3RlLlwiLCBzZXJ2ZXJNc2c6IGVyciB9KTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbihlcnIpIHtcclxuICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkRCIENvbm5lY3Rpb24gZXJyb3I6IFwiICsgZXJyKTtcclxuICAgICAgICAgICAgICByZXMuc2VuZCh7IHJlc3VsdDogXCJlcnJvclwiLCB0aXRsZTogXCJDb25uZWN0aW9uIEVycm9yXCIsIG1zZzogXCJUaGVyZSB3YXMgYW4gZXJyb3IgY29ubmVjdGluZyB0byB0aGUgZGF0YWJhc2UuXCIsIHNlcnZlck1zZzogZXJyIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3IgLSBEZWxldGUgc3R1ZGVudCBub3RlOiBcIiArIGVycik7XHJcbiAgICAgIHJlcy5zZW5kKHsgcmVzdWx0OiBcImVycm9yXCIsIHRpdGxlOiBcIkVycm9yXCIsIG1zZzogXCJUaGVyZSB3YXMgYW4gZXJyb3IgZGVsZXRpbmcgdGhpcyBub3RlLlwiLCBzZXJ2ZXJNc2c6IGVyciB9KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGluc2VydEF0dGVuZGFuY2UocmVxOiBleHByZXNzLlJlcXVlc3QsIHJlczogZXhwcmVzcy5SZXNwb25zZSk6IHZvaWQge1xyXG4gICAgdHJ5IHtcclxuICAgICAgbmV3IEF1dGhDb250cm9sbGVyKCkuYXV0aFVzZXIocmVxLCByZXMsIHtcclxuICAgICAgICByZXF1aXJlZEF1dGg6IFtcIkFkbWluXCIsIFwiU3RhZmZcIiwgXCJJbnN0cnVjdG9yXCJdLCBkb25lOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgIHZhciBhdHRlbmRhbmNlID0gcmVxLmJvZHk7XHJcbiAgICAgICAgICB2YXIgcXVlcnkgPSBcIklOU0VSVCBJTlRPIEF0dGVuZGFuY2UgKGNvdXJzZUlELCBkYXRlLCB1c2VySUQsIGF0dGVuZGFuY2VWYWx1ZSwgdHdvTWlzc2VkQ2xhc3NNc2csIGZvdXJNaXNzZWRDbGFzc01zZykgVkFMVUVTIFwiO1xyXG4gICAgICAgICAgdmFyIGNvdW50ID0gMDtcclxuICAgICAgICAgIGlmIChhdHRlbmRhbmNlLnN0dWRlbnRzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgdmFyIGRhdGUgPSBhdHRlbmRhbmNlLmRhdGU7XHJcbiAgICAgICAgICAgIGZvciAobGV0IHN0dWRlbnQgb2YgYXR0ZW5kYW5jZS5zdHVkZW50cykge1xyXG4gICAgICAgICAgICAgIGlmIChjb3VudCA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgcXVlcnkgKz0gXCIoJ1wiICsgYXR0ZW5kYW5jZS5jb3Vyc2VJRCArIFwiJywgJ1wiICsgZGF0ZSArIFwiJywgJ1wiICsgc3R1ZGVudC51c2VySUQgKyBcIicsICdcIiArIHN0dWRlbnQuYXR0ZW5kYW5jZVZhbHVlICsgXCInLCAnRmFsc2UnLCAnRmFsc2UnIClcIjtcclxuICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcXVlcnkgKz0gXCIsICgnXCIgKyBhdHRlbmRhbmNlLmNvdXJzZUlEICsgXCInLCAnXCIgKyBkYXRlICsgXCInLCAnXCIgKyBzdHVkZW50LnVzZXJJRCArIFwiJywgJ1wiICsgc3R1ZGVudC5hdHRlbmRhbmNlVmFsdWUgKyBcIicsICdGYWxzZScsICdGYWxzZScgKVwiO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICBjb3VudCsrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHNxbC5jb25uZWN0KGRiKVxyXG4gICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKGNvbm5lY3Rpb24pIHtcclxuICAgICAgICAgICAgICAgIG5ldyBzcWwuUmVxdWVzdChjb25uZWN0aW9uKVxyXG4gICAgICAgICAgICAgICAgICAucXVlcnkocXVlcnkpXHJcbiAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKHJlY29yZHNldCkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIHNldCBzY2hlZHVsZSBjaGVjayBvbiBEQlxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiYXR0ZW5kYW5jZSByZWNvcmQgaW5zZXJ0ZWRcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzLnNlbmQocmVjb3Jkc2V0KTtcclxuICAgICAgICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJFcnJvciAtIEluc2VydCBhdHRlbmRhbmNlOiBcIiArIGVycik7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzLnNlbmQoeyByZXN1bHQ6IFwiZXJyb3JcIiwgdGl0bGU6IFwiRXJyb3JcIiwgbXNnOiBcIlRoZXJlIHdhcyBhbiBlcnJvciBpbnNlcnRpbmcgYXR0ZW5kYW5jZSBmb3Igc3R1ZGVudC5cIiwgc2VydmVyTXNnOiBlcnIgfSk7XHJcbiAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGVycikge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJEQiBDb25uZWN0aW9uIGVycm9yOiBcIiArIGVycik7XHJcbiAgICAgICAgICAgICAgICByZXMuc2VuZCh7IHJlc3VsdDogXCJlcnJvclwiLCB0aXRsZTogXCJDb25uZWN0aW9uIEVycm9yXCIsIG1zZzogXCJUaGVyZSB3YXMgYW4gZXJyb3IgY29ubmVjdGluZyB0byB0aGUgZGF0YWJhc2UuXCIsIHNlcnZlck1zZzogZXJyIH0pO1xyXG4gICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJObyBhYnNlbnQgc3R1ZGVudHNcIik7XHJcbiAgICAgICAgICAgIHJlcy5zZW5kKHsgc3RhdHVzOiBcIk5vIGFic2VudCBzdHVkZW50c1wiIH0pO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgY29uc29sZS5sb2coXCJFcnJvciAtIEluc2VydCBhdHRlbmRhbmNlOiBcIiArIGVycik7XHJcbiAgICAgIHJlcy5zZW5kKHsgcmVzdWx0OiBcImVycm9yXCIsIHRpdGxlOiBcIkVycm9yXCIsIG1zZzogXCJUaGVyZSB3YXMgYW4gZXJyb3IgaW5zZXJ0aW5nIGF0dGVuZGFuY2UgZm9yIHN0dWRlbnQuXCIsIHNlcnZlck1zZzogZXJyIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZ2V0QWxsQXR0ZW5kYW5jZShyZXE6IGV4cHJlc3MuUmVxdWVzdCwgcmVzOiBleHByZXNzLlJlc3BvbnNlKTogdm9pZCB7XHJcbiAgICB0cnkge1xyXG4gICAgICBuZXcgQXV0aENvbnRyb2xsZXIoKS5hdXRoVXNlcihyZXEsIHJlcywge1xyXG4gICAgICAgIHJlcXVpcmVkQXV0aDogW1wiQWRtaW5cIiwgXCJTdGFmZlwiLCBcIkluc3RydWN0b3JcIl0sIGRvbmU6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgc3FsLmNvbm5lY3QoZGIpXHJcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKGNvbm5lY3Rpb24pIHtcclxuICAgICAgICAgICAgICBuZXcgc3FsLlJlcXVlc3QoY29ubmVjdGlvbilcclxuICAgICAgICAgICAgICAgIC5xdWVyeShcIlNFTEVDVCAqIEZST00gQXR0ZW5kYW5jZVwiKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24ocmVjb3Jkc2V0KSB7XHJcbiAgICAgICAgICAgICAgICAgIGZvciAobGV0IGl0ZW0gb2YgcmVjb3Jkc2V0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5kYXRlID0gaXRlbS5kYXRlLnNwbGl0KCcgJyk7XHJcbiAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgcmVzLnNlbmQocmVjb3Jkc2V0KTtcclxuICAgICAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGVycikge1xyXG4gICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yIC0gR2V0IGFsbCBhdHRlbmRhbmNlOiBcIiArIGVycik7XHJcbiAgICAgICAgICAgICAgICAgIHJlcy5zZW5kKHsgcmVzdWx0OiBcImVycm9yXCIsIHRpdGxlOiBcIkVycm9yXCIsIG1zZzogXCJUaGVyZSB3YXMgYW4gZXJyb3IgcmV0cmlldmluZyBhbGwgc3R1ZGVudCBhdHRlbmRhbmNlIHJlY29yZHMuXCIsIHNlcnZlck1zZzogZXJyIH0pO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGVycikge1xyXG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiREIgQ29ubmVjdGlvbiBlcnJvcjogXCIgKyBlcnIpO1xyXG4gICAgICAgICAgICAgIHJlcy5zZW5kKHsgcmVzdWx0OiBcImVycm9yXCIsIHRpdGxlOiBcIkNvbm5lY3Rpb24gRXJyb3JcIiwgbXNnOiBcIlRoZXJlIHdhcyBhbiBlcnJvciBjb25uZWN0aW5nIHRvIHRoZSBkYXRhYmFzZS5cIiwgc2VydmVyTXNnOiBlcnIgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgY29uc29sZS5sb2coXCJFcnJvciAtIEdldCBhbGwgYXR0ZW5kYW5jZTogXCIgKyBlcnIpO1xyXG4gICAgICByZXMuc2VuZCh7IHJlc3VsdDogXCJlcnJvclwiLCB0aXRsZTogXCJFcnJvclwiLCBtc2c6IFwiVGhlcmUgd2FzIGFuIGVycm9yIHJldHJpZXZpbmcgYWxsIHN0dWRlbnQgYXR0ZW5kYW5jZSByZWNvcmRzLlwiLCBzZXJ2ZXJNc2c6IGVyciB9KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHBvcHVsYXRlUFJGKHJlcTogZXhwcmVzcy5SZXF1ZXN0LCByZXM6IGV4cHJlc3MuUmVzcG9uc2UpOiB2b2lkIHtcclxuICAgIHRyeSB7XHJcbiAgICAgIG5ldyBBdXRoQ29udHJvbGxlcigpLmF1dGhVc2VyKHJlcSwgcmVzLCB7XHJcbiAgICAgICAgcmVxdWlyZWRBdXRoOiBhdXRoLCBkb25lOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgIHZhciBfaWQ6IHN0cmluZyA9IHJlcS5wYXJhbXMuX2lkO1xyXG4gICAgICAgICAgc3FsLmNvbm5lY3QoZGIpXHJcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKGNvbm5lY3Rpb24pIHtcclxuICAgICAgICAgICAgICBuZXcgc3FsLlJlcXVlc3QoY29ubmVjdGlvbilcclxuICAgICAgICAgICAgICAgIC5xdWVyeShcIlNFTEVDVCAqIEZST00gQ2xpZW50cyBDIElOTkVSIEpPSU4gU3VpdGFiaWxpdHlGb3JtIFMgT04gQy51c2VySUQgPSBTLnVzZXJJRCBXSEVSRSBDLnVzZXJJRCA9ICdcIiArIF9pZCArIFwiJyBBTkQgUy51c2VySUQgPSAnXCIgKyBfaWQgKyBcIidcIilcclxuICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKHJlY29yZHNldCkge1xyXG4gICAgICAgICAgICAgICAgICBuZXcgUFJGU2VydmljZSgpLnBvcHVsYXRlUFJGKHJlY29yZHNldFswXSk7XHJcbiAgICAgICAgICAgICAgICAgIHJlcy5zZW5kKHsgcmVzdWx0OiBcInN1Y2Nlc3NcIiwgdGl0bGU6IFwiUFJGIFBvcHVsYXRlZCFcIiwgbXNnOiBcIlBSRiBmb3JtIGhhcyBiZWVuIHBvcHVsYXRlZCB3aXRoIHN0dWRlbnQgaW5mby5cIiwgc2VydmVyTXNnOiBcIlwiIH0pO1xyXG4gICAgICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3IgLSBHZXQgY2xpZW50IGJ5IGlkIGZvciBwcmY6IFwiICsgZXJyKTtcclxuICAgICAgICAgICAgICAgICAgcmVzLnNlbmQoeyByZXN1bHQ6IFwiZXJyb3JcIiwgdGl0bGU6IFwiRXJyb3JcIiwgbXNnOiBcIlRoZXJlIHdhcyBhbiBlcnJvciBwb3B1bGF0aW5nIFBSRiB3aXRoIHN0dWRlbnQgaW5mby5cIiwgc2VydmVyTXNnOiBlcnIgfSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XHJcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJEQiBDb25uZWN0aW9uIGVycm9yOiBcIiArIGVycik7XHJcbiAgICAgICAgICAgICAgcmVzLnNlbmQoeyByZXN1bHQ6IFwiZXJyb3JcIiwgdGl0bGU6IFwiQ29ubmVjdGlvbiBFcnJvclwiLCBtc2c6IFwiVGhlcmUgd2FzIGFuIGVycm9yIGNvbm5lY3RpbmcgdG8gdGhlIGRhdGFiYXNlLlwiLCBzZXJ2ZXJNc2c6IGVyciB9KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICBjb25zb2xlLmxvZyhcIkVycm9yIC0gUG9wdWxhdGUgUFJGOiBcIiArIGVycik7XHJcbiAgICAgIHJlcy5zZW5kKHsgcmVzdWx0OiBcImVycm9yXCIsIHRpdGxlOiBcIkVycm9yXCIsIG1zZzogXCJUaGVyZSB3YXMgYW4gZXJyb3IgcG9wdWxhdGluZyBQUkYgd2l0aCBzdHVkZW50IGluZm8uXCIsIHNlcnZlck1zZzogZXJyIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbn1cclxuZXhwb3J0ID0gU3R1ZGVudENvbnRyb2xsZXI7XHJcbiJdfQ==
