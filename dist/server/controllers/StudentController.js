"use strict";
var AuthController = require("../controllers/AuthController");
var PRFService = require("../services/PRFService");
var MailService = require("../services/MailService");
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
    StudentController.prototype.delete = function (req, res) {
        try {
            new AuthController().authUser(req, res, {
                requiredAuth: auth, done: function () {
                    var _id = req.params._id;
                    sql.connect(db)
                        .then(function (connection) {
                        new sql.Request(connection)
                            .query("DELETE FROM Students WHERE userID = '" + _id + "'")
                            .then(function () {
                            new sql.Request(connection)
                                .query("DELETE FROM Users WHERE userID = '" + _id + "'")
                                .then(function () {
                                res.send({ result: "success", title: "Student Deleted", msg: "Student user has been successfully deleted.", serverMsg: "" });
                            }).catch(function (err) {
                                console.log("Error - Delete user with id " + _id + ": " + err);
                                res.send({ result: "error", title: "Error", msg: "There was an error deleteing student from users table.", serverMsg: err });
                            });
                        }).catch(function (err) {
                            console.log("Error - Delete student with id " + _id + ": " + err);
                            res.send({ result: "error", title: "Error", msg: "There was an error deleteing student from students table.", serverMsg: err });
                        });
                    }).catch(function (err) {
                        console.log("DB Connection error: " + err);
                        res.send({ result: "error", title: "Connection Error", msg: "There was an error connecting to the database.", serverMsg: err });
                    });
                }
            });
        }
        catch (err) {
            console.log("Error - Delete student: " + err);
            res.send({ result: "error", title: "Error", msg: "There was an error deleteing student.", serverMsg: err });
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
module.exports = StudentController;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NlcnZlci9zcmMvY29udHJvbGxlcnMvU3R1ZGVudENvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUVBLDhEQUFpRTtBQUNqRSxJQUFNLFVBQVUsR0FBRyxPQUFPLENBQUMsd0JBQXdCLENBQUMsQ0FBQztBQUNyRCxJQUFNLFdBQVcsR0FBRyxPQUFPLENBQUMseUJBQXlCLENBQUMsQ0FBQztBQUN2RCxJQUFJLEdBQUcsR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDM0IsSUFBSSxJQUFJLEdBQUcsQ0FBQyxPQUFPLEVBQUUsT0FBTyxFQUFFLFlBQVksQ0FBQyxDQUFDO0FBQzVDLElBQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQztBQUNwQyxJQUFNLEVBQUUsR0FBRyxNQUFNLENBQUMsRUFBRSxDQUFDO0FBQ3JCLElBQU0sSUFBSSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUM7QUFDekIsSUFBTSxhQUFhLEdBQUcsTUFBTSxDQUFDLGFBQWEsQ0FBQztBQUUzQztJQUFBO0lBMHJCQSxDQUFDO0lBeHJCQyxrQ0FBTSxHQUFOLFVBQU8sR0FBb0IsRUFBRSxHQUFxQjtRQUNoRCxJQUFJO1lBQ0YsSUFBSSxjQUFjLEVBQUUsQ0FBQyxRQUFRLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRTtnQkFDdEMsWUFBWSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUU7b0JBQ3hCLElBQUksT0FBTyxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUM7b0JBQ3ZCLEdBQUcsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDO3lCQUNaLElBQUksQ0FBQyxVQUFTLFVBQVU7d0JBQ3ZCLElBQUksR0FBRyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUM7NkJBQ3hCLEtBQUssQ0FBQyxnQ0FBZ0MsR0FBRyxPQUFPLENBQUMsTUFBTSxHQUFHLEtBQUs7OEJBQzlELE9BQU8sQ0FBQyxhQUFhLEdBQUcsS0FBSzs4QkFDN0IsT0FBTyxD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QUQsQ0ExckJBLEFBMHJCQyxJQUFBO0FBQ0QsaUJBQVMsaUJBQWlCLENBQUMiLCJmaWxlIjoiY29udHJvbGxlcnMvU3R1ZGVudENvbnRyb2xsZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgZXhwcmVzcyA9IHJlcXVpcmUoXCJleHByZXNzXCIpO1xyXG5pbXBvcnQgand0ID0gcmVxdWlyZSgnanNvbndlYnRva2VuJyk7XHJcbmltcG9ydCBBdXRoQ29udHJvbGxlciA9IHJlcXVpcmUoXCIuLi9jb250cm9sbGVycy9BdXRoQ29udHJvbGxlclwiKTtcclxuY29uc3QgUFJGU2VydmljZSA9IHJlcXVpcmUoXCIuLi9zZXJ2aWNlcy9QUkZTZXJ2aWNlXCIpO1xyXG5jb25zdCBNYWlsU2VydmljZSA9IHJlcXVpcmUoXCIuLi9zZXJ2aWNlcy9NYWlsU2VydmljZVwiKTtcclxudmFyIHNxbCA9IHJlcXVpcmUoJ21zc3FsJyk7XHJcbnZhciBhdXRoID0gW1wiQWRtaW5cIiwgXCJTdGFmZlwiLCBcIkluc3RydWN0b3JcIl07XHJcbmNvbnN0IGNvbmZpZyA9IHJlcXVpcmUoJy4uL2NvbmZpZycpO1xyXG5jb25zdCBkYiA9IGNvbmZpZy5kYjtcclxuY29uc3QgbWFpbCA9IGNvbmZpZy5tYWlsO1xyXG5jb25zdCBzaXRlX3NldHRpbmdzID0gY29uZmlnLnNpdGVfc2V0dGluZ3M7XHJcblxyXG5jbGFzcyBTdHVkZW50Q29udHJvbGxlciB7XHJcblxyXG4gIGNyZWF0ZShyZXE6IGV4cHJlc3MuUmVxdWVzdCwgcmVzOiBleHByZXNzLlJlc3BvbnNlKTogdm9pZCB7XHJcbiAgICB0cnkge1xyXG4gICAgICBuZXcgQXV0aENvbnRyb2xsZXIoKS5hdXRoVXNlcihyZXEsIHJlcywge1xyXG4gICAgICAgIHJlcXVpcmVkQXV0aDogYXV0aCwgZG9uZTogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICB2YXIgc3R1ZGVudCA9IHJlcS5ib2R5O1xyXG4gICAgICAgICAgc3FsLmNvbm5lY3QoZGIpXHJcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKGNvbm5lY3Rpb24pIHtcclxuICAgICAgICAgICAgICBuZXcgc3FsLlJlcXVlc3QoY29ubmVjdGlvbilcclxuICAgICAgICAgICAgICAgIC5xdWVyeShcIklOU0VSVCBJTlRPIFN0dWRlbnRzIFZBTFVFUyAoJ1wiICsgc3R1ZGVudC51c2VySUQgKyBcIicsJ1wiXHJcbiAgICAgICAgICAgICAgICArIHN0dWRlbnQuc3R1ZGVudE51bWJlciArIFwiJywnXCJcclxuICAgICAgICAgICAgICAgICsgc3R1ZGVudC5maXJzdE5hbWUgKyBcIicsICdcIlxyXG4gICAgICAgICAgICAgICAgKyBzdHVkZW50Lmxhc3ROYW1lICsgXCInLCdcIlxyXG4gICAgICAgICAgICAgICAgKyBzdHVkZW50LmlucXVpcnlEYXRlICsgXCInLCdcIlxyXG4gICAgICAgICAgICAgICAgKyBzdHVkZW50LmJpcnRoZGF0ZSArIFwiJywnXCJcclxuICAgICAgICAgICAgICAgICsgc3R1ZGVudC5waG9uZSArIFwiJywnXCJcclxuICAgICAgICAgICAgICAgICsgc3R1ZGVudC5hbGxvd0RldGFpbGVkTWVzc2FnZSArIFwiJywnXCJcclxuICAgICAgICAgICAgICAgICsgc3R1ZGVudC5va2F5VG9UZXh0ICsgXCInLCdcIlxyXG4gICAgICAgICAgICAgICAgKyBzdHVkZW50LmFsdGVybmF0ZU51bWJlciArIFwiJywnXCJcclxuICAgICAgICAgICAgICAgICsgc3R1ZGVudC5hbGxvd0RldGFpbGVkTWVzc2FnZUFsdGVybmF0ZSArIFwiJywnXCJcclxuICAgICAgICAgICAgICAgICsgc3R1ZGVudC5va2F5VG9UZXh0QWx0ZXJuYXRlICsgXCInLCdcIlxyXG4gICAgICAgICAgICAgICAgKyBzdHVkZW50LmVkaXRDb25zZW50UmVxdWVzdCArIFwiJywnXCJcclxuICAgICAgICAgICAgICAgICsgc3R1ZGVudC5lZGl0Q29uc2VudFBlcm1pc3Npb24gKyBcIicsJ1wiXHJcbiAgICAgICAgICAgICAgICArIHN0dWRlbnQuY29tbWVudHMgKyBcIicpXCIpXHJcbiAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgcmVzLnNlbmQoeyByZXN1bHQ6IFwic3VjY2Vzc1wiLCB0aXRsZTogXCJOZXcgVXNlciBDcmVhdGVkIVwiLCBtc2c6IFwiU3R1ZGVudCB1c2VyIGhhcyBiZWVuIHN1Y2Nlc3NmdWxseSBjcmVhdGVkIVwiLCBzZXJ2ZXJNc2c6IFwiXCIgfSk7XHJcbiAgICAgICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbihlcnIpIHtcclxuICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJFcnJvciAtIENyZWF0ZSBuZXcgc3R1ZGVudDogXCIgKyBlcnIpO1xyXG4gICAgICAgICAgICAgICAgICByZXMuc2VuZCh7IHJlc3VsdDogXCJlcnJvclwiLCB0aXRsZTogXCJDb25uZWN0aW9uIEVycm9yXCIsIG1zZzogXCJUaGVyZSB3YXMgYW4gZXJyb3IgY3JlYXRpbmcgY2xpZW50IGFzIHN0dWRlbnQuXCIsIHNlcnZlck1zZzogZXJyIH0pO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGVycikge1xyXG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiREIgQ29ubmVjdGlvbiBlcnJvcjogXCIgKyBlcnIpO1xyXG4gICAgICAgICAgICAgIHJlcy5zZW5kKHsgcmVzdWx0OiBcImVycm9yXCIsIHRpdGxlOiBcIkNvbm5lY3Rpb24gRXJyb3JcIiwgbXNnOiBcIlRoZXJlIHdhcyBhbiBlcnJvciBjb25uZWN0aW5nIHRvIHRoZSBkYXRhYmFzZS5cIiwgc2VydmVyTXNnOiBlcnIgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgY29uc29sZS5sb2coXCJFcnJvciAtIENyZWF0ZSBzdHVkZW50OiBcIiArIGVycik7XHJcbiAgICAgIHJlcy5zZW5kKHsgcmVzdWx0OiBcImVycm9yXCIsIHRpdGxlOiBcIkVycm9yXCIsIG1zZzogXCJUaGVyZSB3YXMgYW4gZXJyb3IgY3JlYXRpbmcgY2xpZW50IGFzIHN0dWRlbnQuXCIsIHNlcnZlck1zZzogZXJyIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgdXBkYXRlR2VuZXJhbEluZm8ocmVxOiBleHByZXNzLlJlcXVlc3QsIHJlczogZXhwcmVzcy5SZXNwb25zZSk6IHZvaWQge1xyXG4gICAgdHJ5IHtcclxuICAgICAgbmV3IEF1dGhDb250cm9sbGVyKCkuYXV0aFVzZXIocmVxLCByZXMsIHtcclxuICAgICAgICByZXF1aXJlZEF1dGg6IGF1dGgsIGRvbmU6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgdmFyIHN0dWRlbnQgPSByZXEuYm9keTtcclxuICAgICAgICAgIHZhciByZSA9IC9eKChbXjw+KClbXFxdXFxcXC4sOzpcXHNAXFxcIl0rKFxcLltePD4oKVtcXF1cXFxcLiw7Olxcc0BcXFwiXSspKil8KFxcXCIuK1xcXCIpKUAoKFxcW1swLTldezEsM31cXC5bMC05XXsxLDN9XFwuWzAtOV17MSwzfVxcLlswLTldezEsM31cXF0pfCgoW2EtekEtWlxcLTAtOV0rXFwuKStbYS16QS1aXXsyLH0pKSQvO1xyXG4gICAgICAgICAgdmFyIGVtYWlsVmFsaWRhdGlvbiA9IHJlLnRlc3Qoc3R1ZGVudC5lbWFpbCk7XHJcbiAgICAgICAgICBpZiAoIWVtYWlsVmFsaWRhdGlvbikge1xyXG4gICAgICAgICAgICByZXMuc2VuZCh7IHJlc3VsdDogXCJpbnZhbGlkXCIsIHRpdGxlOiBcIkludmFsaWQgSW5wdXRcIiwgbXNnOiBcIkluY29ycmVjdCBlbWFpbCBmb3JtYXQuXCIsIHNlcnZlck1zZzogXCJcIiB9KTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHNxbC5jb25uZWN0KGRiKVxyXG4gICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKGNvbm5lY3Rpb24pIHtcclxuICAgICAgICAgICAgICAgIG5ldyBzcWwuUmVxdWVzdChjb25uZWN0aW9uKVxyXG4gICAgICAgICAgICAgICAgICAucXVlcnkoXCJTRUxFQ1QgdXNlcklELCB1c2VybmFtZSwgZW1haWwgRlJPTSBVc2Vyc1wiKVxyXG4gICAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbih1c2Vycykge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciB2YWxpZGF0ZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBlcnJvcjtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgY3VycmVudFVzZXJuYW1lID0gdXNlcnMuZmlsdGVyKHggPT4geC51c2VySUQgPT09IHN0dWRlbnQudXNlcklEKTtcclxuICAgICAgICAgICAgICAgICAgICBjdXJyZW50VXNlcm5hbWUgPSBjdXJyZW50VXNlcm5hbWVbMF0udXNlcm5hbWU7XHJcbiAgICAgICAgICAgICAgICAgICAgdXNlcnMgPSB1c2Vycy5maWx0ZXIoeCA9PiB4LnVzZXJJRCAhPT0gc3R1ZGVudC51c2VySUQpO1xyXG4gICAgICAgICAgICAgICAgICAgIHN0dWRlbnQudXNlcm5hbWUgPSBzdHVkZW50LmZpcnN0TmFtZSArIHN0dWRlbnQubGFzdE5hbWU7XHJcbiAgICAgICAgICAgICAgICAgICAgc3R1ZGVudC51c2VybmFtZSA9IHN0dWRlbnQudXNlcm5hbWUudG9Mb3dlckNhc2UoKTtcclxuICAgICAgICAgICAgICAgICAgICBzdHVkZW50LnVzZXJuYW1lID0gc3R1ZGVudC51c2VybmFtZS5yZXBsYWNlKC9cXHMrL2csICcnKTtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCByZWNvcmQgb2YgdXNlcnMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgIGlmIChyZWNvcmQudXNlcm5hbWUgPT09IHN0dWRlbnQudXNlcm5hbWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsaWRhdGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yID0gXCJVc2VybmFtZSBpcyBhbHJlYWR5IGluIHVzZS5cIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHJlY29yZC5lbWFpbCA9PT0gc3R1ZGVudC5lbWFpbCAmJiByZWNvcmQuZW1haWwgIT09IFwiQkEuQUNQQGdlb3JnaWFuY29sbGVnZS5jYVwiICYmIHJlY29yZC5lbWFpbCAhPT0gXCJPUi5BQ1BAZ2VvcmdpYW5jb2xsZWdlLmNhXCIgJiYgcmVjb3JkLmVtYWlsICE9PSBcIk9TLkFDUEBnZW9yZ2lhbmNvbGxlZ2UuY2FcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWxpZGF0ZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3IgPSBcIkVtYWlsIGlzIGFscmVhZHkgaW4gdXNlLlwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCF2YWxpZGF0ZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgIHJlcy5zZW5kKHsgcmVzdWx0OiBcImludmFsaWRcIiwgdGl0bGU6IFwiSW52YWxpZCBJbnB1dFwiLCBtc2c6IGVycm9yLCBzZXJ2ZXJNc2c6IFwiXCIgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgIHZhciBzdHVkZW50c1F1ZXJ5ID0gXCJVUERBVEUgU3R1ZGVudHMgU0VUIHN0dWRlbnROdW1iZXI9J1wiICsgc3R1ZGVudC5zdHVkZW50TnVtYmVyXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICsgXCInLCBmaXJzdE5hbWU9J1wiICsgc3R1ZGVudC5maXJzdE5hbWVcclxuICAgICAgICAgICAgICAgICAgICAgICAgKyBcIicsIGxhc3ROYW1lPSdcIiArIHN0dWRlbnQubGFzdE5hbWVcclxuICAgICAgICAgICAgICAgICAgICAgICAgKyBcIicsIHBob25lPSdcIiArIHN0dWRlbnQucGhvbmVcclxuICAgICAgICAgICAgICAgICAgICAgICAgKyBcIicsIG9rYXlUb1RleHQ9J1wiICsgc3R1ZGVudC5va2F5VG9UZXh0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICsgXCInLCBhbGxvd0RldGFpbGVkTWVzc2FnZT0nXCIgKyBzdHVkZW50LmFsbG93RGV0YWlsZWRNZXNzYWdlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICsgXCInLCBhbHRlcm5hdGVOdW1iZXI9J1wiICsgc3R1ZGVudC5hbHRlcm5hdGVOdW1iZXJcclxuICAgICAgICAgICAgICAgICAgICAgICAgKyBcIicsIG9rYXlUb1RleHRBbHRlcm5hdGU9J1wiICsgc3R1ZGVudC5va2F5VG9UZXh0QWx0ZXJuYXRlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICsgXCInLCBhbGxvd0RldGFpbGVkTWVzc2FnZUFsdGVybmF0ZT0nXCIgKyBzdHVkZW50LmFsbG93RGV0YWlsZWRNZXNzYWdlQWx0ZXJuYXRlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICsgXCInLCBjb21tZW50cz0nXCIgKyBzdHVkZW50LmNvbW1lbnRzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICsgXCInIFdIRVJFIHN0dWRlbnRJRCA9ICdcIiArIHN0dWRlbnQuc3R1ZGVudElEICsgXCInXCJcclxuICAgICAgICAgICAgICAgICAgICAgIG5ldyBzcWwuUmVxdWVzdChjb25uZWN0aW9uKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAucXVlcnkoc3R1ZGVudHNRdWVyeSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24oc3R1ZGVudHNSZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgdXNlcnNRdWVyeSA9IFwiVVBEQVRFIFVzZXJzIFNFVCBlbWFpbD0nXCIgKyBzdHVkZW50LmVtYWlsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICArIFwiJywgdXNlcm5hbWU9J1wiICsgc3R1ZGVudC51c2VybmFtZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKyBcIicgV0hFUkUgdXNlcklEID0gJ1wiICsgc3R1ZGVudC51c2VySUQgKyBcIidcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBzcWwuUmVxdWVzdChjb25uZWN0aW9uKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnF1ZXJ5KHVzZXJzUXVlcnkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbih1c2Vyc1Jlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY3VycmVudFVzZXJuYW1lICE9IHN0dWRlbnQudXNlcm5hbWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgbWFpbE9wdGlvbnMgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmcm9tOiBtYWlsLnVzZXIsIC8vIHNlbmRlciBhZGRyZXNzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0bzogc3R1ZGVudC5lbWFpbCwgLy8gcmVjaXBpZW50IGFkZHJlc3NcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1YmplY3Q6ICdVc2VybmFtZSBVcGRhdGUhJywgLy8gU3ViamVjdCBsaW5lXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0OiAnJywgLy8gcGxhaW4gdGV4dCBib2R5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBodG1sOiAnWW91ciB1c2VybmFtZSBoYXMgYmVlbiBjaGFuZ2VkIHRvIDxiPicgKyBzdHVkZW50LnVzZXJuYW1lICsgJzwvYj4uPGJyIC8+PGJyIC8+IExvZ2luIGF0ICcgKyBzaXRlX3NldHRpbmdzLnVybCArICcgIDxiciAvPjxiciAvPiBUaGFua3lvdScvLyBodG1sIGJvZHlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBNYWlsU2VydmljZSgpLnNlbmRNZXNzYWdlKFwiU3R1ZGVudCBVc2VybmFtZSBVcGRhdGVcIiwgbWFpbE9wdGlvbnMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcy5zZW5kKHsgcmVzdWx0OiBcInN1Y2Nlc3NcIiwgdGl0bGU6IFwiVXBkYXRlIFN1Y2Nlc3MhXCIsIG1zZzogXCJTdHVkZW50IHVzZXIgdXBkYXRlZCFcIiwgc2VydmVyTXNnOiBcIlwiIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3IgLSBVcGRhdGUgdXNlcjogXCIgKyBlcnIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXMuc2VuZCh7IHJlc3VsdDogXCJlcnJvclwiLCB0aXRsZTogXCJFcnJvclwiLCBtc2c6IFwiVGhlcmUgd2FzIGFuIGVycm9yIHVwZGF0aW5nIHVzZXIgaW5mb3JtYXRpb24uXCIsIHNlcnZlck1zZzogZXJyIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGVycikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3IgLSBVcGRhdGUgc3R1ZGVudDogXCIgKyBlcnIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHJlcy5zZW5kKHsgcmVzdWx0OiBcImVycm9yXCIsIHRpdGxlOiBcIkVycm9yXCIsIG1zZzogXCJUaGVyZSB3YXMgYW4gZXJyb3IgdXBkYXRpbmcgc3R1ZGVudCBpbmZvcm1hdGlvbi5cIiwgc2VydmVyTXNnOiBlcnIgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJFcnJvciAtIFNlbGVjdCB1c2VySUQsIHVzZWFybmFtZSBhbmQgZW1haWwgZnJvbSB1c2VyczogXCIgKyBlcnIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlcy5zZW5kKHsgcmVzdWx0OiBcImVycm9yXCIsIHRpdGxlOiBcIkVycm9yXCIsIG1zZzogXCJUaGVyZSB3YXMgYW4gZXJyb3IgcmV0cmlldmluZyB1c2VySUQsIHVzZWFybmFtZSBhbmQgZW1haWwgZnJvbSB0aGUgdXNlcnMgdGFibGUuXCIsIHNlcnZlck1zZzogZXJyIH0pO1xyXG4gICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbihlcnIpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiREIgQ29ubmVjdGlvbiBlcnJvcjogXCIgKyBlcnIpO1xyXG4gICAgICAgICAgICAgICAgcmVzLnNlbmQoeyByZXN1bHQ6IFwiZXJyb3JcIiwgdGl0bGU6IFwiQ29ubmVjdGlvbiBFcnJvclwiLCBtc2c6IFwiVGhlcmUgd2FzIGFuIGVycm9yIGNvbm5lY3RpbmcgdG8gdGhlIGRhdGFiYXNlLlwiLCBzZXJ2ZXJNc2c6IGVyciB9KTtcclxuICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3IgLSBVcGRhdGUgc3R1ZGVudCBpbmZvOiBcIiArIGVycik7XHJcbiAgICAgIHJlcy5zZW5kKHsgcmVzdWx0OiBcImVycm9yXCIsIHRpdGxlOiBcIkVycm9yXCIsIG1zZzogXCJUaGVyZSB3YXMgYW4gZXJyb3IgdXBkYXRpbmcgdGhpcyBzdHVkZW50cyBpbmZvcm1hdGlvbi5cIiwgc2VydmVyTXNnOiBlcnIgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBnZXRTdHVkZW50c0J5SWQocmVxOiBleHByZXNzLlJlcXVlc3QsIHJlczogZXhwcmVzcy5SZXNwb25zZSk6IHZvaWQge1xyXG4gICAgdHJ5IHtcclxuICAgICAgbmV3IEF1dGhDb250cm9sbGVyKCkuYXV0aFVzZXIocmVxLCByZXMsIHtcclxuICAgICAgICByZXF1aXJlZEF1dGg6IFtcIkFkbWluXCIsIFwiU3RhZmZcIiwgXCJJbnN0cnVjdG9yXCJdLCBkb25lOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgIHZhciB0aW1ldGFibGVzID0gcmVxLmJvZHk7XHJcbiAgICAgICAgICB2YXIgcXVlcnkgPSBcIlNFTEVDVCAqIEZST00gU3R1ZGVudHMgV0hFUkUgdXNlcklEID1cIjtcclxuICAgICAgICAgIHZhciBjb3VudCA9IDA7XHJcbiAgICAgICAgICBmb3IgKGxldCB0aW1ldGFibGUgb2YgdGltZXRhYmxlcykge1xyXG4gICAgICAgICAgICBpZiAoY291bnQgPT09IDApIHtcclxuICAgICAgICAgICAgICBxdWVyeSArPSBcIiBcIiArIHRpbWV0YWJsZS51c2VySUQ7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgcXVlcnkgKz0gXCIgT1IgdXNlcklEID0gXCIgKyB0aW1ldGFibGUudXNlcklEO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNvdW50Kys7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBzcWwuY29ubmVjdChkYilcclxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24oY29ubmVjdGlvbikge1xyXG4gICAgICAgICAgICAgIG5ldyBzcWwuUmVxdWVzdChjb25uZWN0aW9uKVxyXG4gICAgICAgICAgICAgICAgLnF1ZXJ5KHF1ZXJ5KVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24ocmVjb3Jkc2V0KSB7XHJcbiAgICAgICAgICAgICAgICAgIHJlcy5zZW5kKHJlY29yZHNldCk7XHJcbiAgICAgICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbihlcnIpIHtcclxuICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJFcnJvciAtIEdldCBzdHVkZW50IGJ5IGlkOiBcIiArIGVycik7XHJcbiAgICAgICAgICAgICAgICAgIHJlcy5zZW5kKHsgcmVzdWx0OiBcImVycm9yXCIsIHRpdGxlOiBcIkVycm9yXCIsIG1zZzogXCJUaGVyZSB3YXMgYW4gZXJyb3IgcmV0cmlldmluZyBzdHVkZW50IGJ5IElELlwiLCBzZXJ2ZXJNc2c6IGVyciB9KTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbihlcnIpIHtcclxuICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkRCIENvbm5lY3Rpb24gZXJyb3I6IFwiICsgZXJyKTtcclxuICAgICAgICAgICAgICByZXMuc2VuZCh7IHJlc3VsdDogXCJlcnJvclwiLCB0aXRsZTogXCJDb25uZWN0aW9uIEVycm9yXCIsIG1zZzogXCJUaGVyZSB3YXMgYW4gZXJyb3IgY29ubmVjdGluZyB0byB0aGUgZGF0YWJhc2UuXCIsIHNlcnZlck1zZzogZXJyIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3IgLSBHZXQgc3R1ZGVudHMgYnkgSUQ6IFwiICsgZXJyKTtcclxuICAgICAgcmVzLnNlbmQoeyByZXN1bHQ6IFwiZXJyb3JcIiwgdGl0bGU6IFwiRXJyb3JcIiwgbXNnOiBcIlRoZXJlIHdhcyBhbiBlcnJvciBnZXR0aW5nIHN0dWRlbnRzIGJ5IElELlwiLCBzZXJ2ZXJNc2c6IGVyciB9KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGRlbGV0ZShyZXE6IGV4cHJlc3MuUmVxdWVzdCwgcmVzOiBleHByZXNzLlJlc3BvbnNlKTogdm9pZCB7XHJcbiAgICB0cnkge1xyXG4gICAgICBuZXcgQXV0aENvbnRyb2xsZXIoKS5hdXRoVXNlcihyZXEsIHJlcywge1xyXG4gICAgICAgIHJlcXVpcmVkQXV0aDogYXV0aCwgZG9uZTogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICB2YXIgX2lkOiBzdHJpbmcgPSByZXEucGFyYW1zLl9pZDtcclxuICAgICAgICAgIHNxbC5jb25uZWN0KGRiKVxyXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbihjb25uZWN0aW9uKSB7XHJcbiAgICAgICAgICAgICAgbmV3IHNxbC5SZXF1ZXN0KGNvbm5lY3Rpb24pXHJcbiAgICAgICAgICAgICAgICAucXVlcnkoXCJERUxFVEUgRlJPTSBTdHVkZW50cyBXSEVSRSB1c2VySUQgPSAnXCIgKyBfaWQgKyBcIidcIilcclxuICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICBuZXcgc3FsLlJlcXVlc3QoY29ubmVjdGlvbilcclxuICAgICAgICAgICAgICAgICAgICAucXVlcnkoXCJERUxFVEUgRlJPTSBVc2VycyBXSEVSRSB1c2VySUQgPSAnXCIgKyBfaWQgKyBcIidcIilcclxuICAgICAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICAgIHJlcy5zZW5kKHsgcmVzdWx0OiBcInN1Y2Nlc3NcIiwgdGl0bGU6IFwiU3R1ZGVudCBEZWxldGVkXCIsIG1zZzogXCJTdHVkZW50IHVzZXIgaGFzIGJlZW4gc3VjY2Vzc2Z1bGx5IGRlbGV0ZWQuXCIsIHNlcnZlck1zZzogXCJcIiB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbihlcnIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3IgLSBEZWxldGUgdXNlciB3aXRoIGlkIFwiICsgX2lkICsgXCI6IFwiICsgZXJyKTtcclxuICAgICAgICAgICAgICAgICAgICAgIHJlcy5zZW5kKHsgcmVzdWx0OiBcImVycm9yXCIsIHRpdGxlOiBcIkVycm9yXCIsIG1zZzogXCJUaGVyZSB3YXMgYW4gZXJyb3IgZGVsZXRlaW5nIHN0dWRlbnQgZnJvbSB1c2VycyB0YWJsZS5cIiwgc2VydmVyTXNnOiBlcnIgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbihlcnIpIHtcclxuICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJFcnJvciAtIERlbGV0ZSBzdHVkZW50IHdpdGggaWQgXCIgKyBfaWQgKyBcIjogXCIgKyBlcnIpO1xyXG4gICAgICAgICAgICAgICAgICByZXMuc2VuZCh7IHJlc3VsdDogXCJlcnJvclwiLCB0aXRsZTogXCJFcnJvclwiLCBtc2c6IFwiVGhlcmUgd2FzIGFuIGVycm9yIGRlbGV0ZWluZyBzdHVkZW50IGZyb20gc3R1ZGVudHMgdGFibGUuXCIsIHNlcnZlck1zZzogZXJyIH0pO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGVycikge1xyXG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiREIgQ29ubmVjdGlvbiBlcnJvcjogXCIgKyBlcnIpO1xyXG4gICAgICAgICAgICAgIHJlcy5zZW5kKHsgcmVzdWx0OiBcImVycm9yXCIsIHRpdGxlOiBcIkNvbm5lY3Rpb24gRXJyb3JcIiwgbXNnOiBcIlRoZXJlIHdhcyBhbiBlcnJvciBjb25uZWN0aW5nIHRvIHRoZSBkYXRhYmFzZS5cIiwgc2VydmVyTXNnOiBlcnIgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgY29uc29sZS5sb2coXCJFcnJvciAtIERlbGV0ZSBzdHVkZW50OiBcIiArIGVycik7XHJcbiAgICAgIHJlcy5zZW5kKHsgcmVzdWx0OiBcImVycm9yXCIsIHRpdGxlOiBcIkVycm9yXCIsIG1zZzogXCJUaGVyZSB3YXMgYW4gZXJyb3IgZGVsZXRlaW5nIHN0dWRlbnQuXCIsIHNlcnZlck1zZzogZXJyIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcmV0cmlldmUocmVxOiBleHByZXNzLlJlcXVlc3QsIHJlczogZXhwcmVzcy5SZXNwb25zZSk6IHZvaWQge1xyXG4gICAgdHJ5IHtcclxuICAgICAgbmV3IEF1dGhDb250cm9sbGVyKCkuYXV0aFVzZXIocmVxLCByZXMsIHtcclxuICAgICAgICByZXF1aXJlZEF1dGg6IFtcIkFkbWluXCIsIFwiU3RhZmZcIiwgXCJJbnN0cnVjdG9yXCJdLCBkb25lOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgIHNxbC5jb25uZWN0KGRiKVxyXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbihjb25uZWN0aW9uKSB7XHJcbiAgICAgICAgICAgICAgbmV3IHNxbC5SZXF1ZXN0KGNvbm5lY3Rpb24pXHJcbiAgICAgICAgICAgICAgICAucXVlcnkoJ1NFTEVDVCBTdHVkZW50cy4qLCBVc2Vycy5lbWFpbCwgVXNlcnMuYWN0aXZlIEZST00gU3R1ZGVudHMgTEVGVCBKT0lOIFVzZXJzIE9OIFN0dWRlbnRzLnVzZXJJRCA9IFVzZXJzLlVzZXJJRCcpXHJcbiAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbihyZWNvcmRzZXQpIHtcclxuICAgICAgICAgICAgICAgICAgcmVzLnNlbmQocmVjb3Jkc2V0KTtcclxuICAgICAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGVycikge1xyXG4gICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yIC0gR2V0IGFsbCBzdHVkZW50czogXCIgKyBlcnIpO1xyXG4gICAgICAgICAgICAgICAgICByZXMuc2VuZCh7IHJlc3VsdDogXCJlcnJvclwiLCB0aXRsZTogXCJFcnJvclwiLCBtc2c6IFwiVGhlcmUgd2FzIGFuIGVycm9yIHJldHJpZXZpbmcgYWxsIHN0dWRlbnRzLlwiLCBzZXJ2ZXJNc2c6IGVyciB9KTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbihlcnIpIHtcclxuICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkRCIENvbm5lY3Rpb24gZXJyb3I6IFwiICsgZXJyKTtcclxuICAgICAgICAgICAgICByZXMuc2VuZCh7IHJlc3VsdDogXCJlcnJvclwiLCB0aXRsZTogXCJDb25uZWN0aW9uIEVycm9yXCIsIG1zZzogXCJUaGVyZSB3YXMgYW4gZXJyb3IgY29ubmVjdGluZyB0byB0aGUgZGF0YWJhc2UuXCIsIHNlcnZlck1zZzogZXJyIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3IgLSBSZXRyaWV2ZSBhbGwgc3R1ZGVudHM6IFwiICsgZXJyKTtcclxuICAgICAgcmVzLnNlbmQoeyByZXN1bHQ6IFwiZXJyb3JcIiwgdGl0bGU6IFwiRXJyb3JcIiwgbXNnOiBcIlRoZXJlIHdhcyBhbiBlcnJvciByZXRyaWV2aW5nIGFsbCBzdHVkZW50cy5cIiwgc2VydmVyTXNnOiBlcnIgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBmaW5kQnlJZChyZXE6IGV4cHJlc3MuUmVxdWVzdCwgcmVzOiBleHByZXNzLlJlc3BvbnNlKTogdm9pZCB7XHJcbiAgICB0cnkge1xyXG4gICAgICBuZXcgQXV0aENvbnRyb2xsZXIoKS5hdXRoVXNlcihyZXEsIHJlcywge1xyXG4gICAgICAgIHJlcXVpcmVkQXV0aDogW1wiQWRtaW5cIiwgXCJTdGFmZlwiLCBcIkluc3RydWN0b3JcIiwgXCJTdHVkZW50XCJdLCBkb25lOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgIHZhciBfaWQ6IHN0cmluZyA9IHJlcS5wYXJhbXMuX2lkO1xyXG4gICAgICAgICAgc3FsLmNvbm5lY3QoZGIpXHJcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKGNvbm5lY3Rpb24pIHtcclxuICAgICAgICAgICAgICBuZXcgc3FsLlJlcXVlc3QoY29ubmVjdGlvbilcclxuICAgICAgICAgICAgICAgIC5xdWVyeShcIlNFTEVDVCAqIEZST00gU3R1ZGVudHMgV0hFUkUgdXNlcklEID0gJ1wiICsgX2lkICsgXCInXCIpXHJcbiAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbihyZWNvcmRzZXQpIHtcclxuICAgICAgICAgICAgICAgICAgcmVzLnNlbmQocmVjb3Jkc2V0WzBdKTtcclxuICAgICAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGVycikge1xyXG4gICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yIC0gRmluZCBzdHVkZW50IGJ5IGlkOiBcIiArIGVycik7XHJcbiAgICAgICAgICAgICAgICAgIHJlcy5zZW5kKHsgcmVzdWx0OiBcImVycm9yXCIsIHRpdGxlOiBcIkVycm9yXCIsIG1zZzogXCJUaGVyZSB3YXMgYW4gZXJyb3IgcmV0cmlldmluZyBzdHVkZW50IGJ5IGlkLlwiLCBzZXJ2ZXJNc2c6IGVyciB9KTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbihlcnIpIHtcclxuICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkRCIENvbm5lY3Rpb24gZXJyb3I6IFwiICsgZXJyKTtcclxuICAgICAgICAgICAgICByZXMuc2VuZCh7IHJlc3VsdDogXCJlcnJvclwiLCB0aXRsZTogXCJDb25uZWN0aW9uIEVycm9yXCIsIG1zZzogXCJUaGVyZSB3YXMgYW4gZXJyb3IgY29ubmVjdGluZyB0byB0aGUgZGF0YWJhc2UuXCIsIHNlcnZlck1zZzogZXJyIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3IgLSBGaW5kIHN0dWRlbnQgYnkgaWQ6IFwiICsgZXJyKTtcclxuICAgICAgcmVzLnNlbmQoeyByZXN1bHQ6IFwiZXJyb3JcIiwgdGl0bGU6IFwiRXJyb3JcIiwgbXNnOiBcIlRoZXJlIHdhcyBhbiBlcnJvciByZXRyaWV2aW5nIHN0dWRlbnQgYnkgaWQuXCIsIHNlcnZlck1zZzogZXJyIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZWRpdENvbnNlbnRSZXF1ZXN0KHJlcTogZXhwcmVzcy5SZXF1ZXN0LCByZXM6IGV4cHJlc3MuUmVzcG9uc2UpIHtcclxuICAgIHRyeSB7XHJcbiAgICAgIG5ldyBBdXRoQ29udHJvbGxlcigpLmF1dGhVc2VyKHJlcSwgcmVzLCB7XHJcbiAgICAgICAgcmVxdWlyZWRBdXRoOiBbXCJBZG1pblwiLCBcIlN0YWZmXCIsIFwiSW5zdHJ1Y3RvclwiLCBcIlN0dWRlbnRcIiwgXCJDbGllbnRcIl0sIGRvbmU6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgdmFyIF9pZDogc3RyaW5nID0gcmVxLnBhcmFtcy5faWQ7XHJcbiAgICAgICAgICBzcWwuY29ubmVjdChkYilcclxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24oY29ubmVjdGlvbikge1xyXG4gICAgICAgICAgICAgIG5ldyBzcWwuUmVxdWVzdChjb25uZWN0aW9uKVxyXG4gICAgICAgICAgICAgICAgLnF1ZXJ5KCdTRUxFQ1QgZmlyc3ROYW1lLCBsYXN0TmFtZSBGUk9NIFN0dWRlbnRzIFdIRVJFIHVzZXJJRCA9ICcgKyBfaWQgKyAnJylcclxuICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKHN0dWRlbnQpIHtcclxuICAgICAgICAgICAgICAgICAgbmV3IHNxbC5SZXF1ZXN0KGNvbm5lY3Rpb24pXHJcbiAgICAgICAgICAgICAgICAgICAgLnF1ZXJ5KFwiVVBEQVRFIFN0dWRlbnRzIFNFVCBlZGl0Q29uc2VudFJlcXVlc3QgPSAndHJ1ZScgV0hFUkUgdXNlcklEID0gXCIgKyBfaWQgKyBcIlwiKVxyXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgc3R1ZGVudCA9IHN0dWRlbnRbMF07XHJcbiAgICAgICAgICAgICAgICAgICAgICB2YXIgbWFpbE9wdGlvbnMgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZyb206IG1haWwudXNlciwgLy8gc2VuZGVyIGFkZHJlc3NcclxuICAgICAgICAgICAgICAgICAgICAgICAgdG86IG1haWwudXNlciwgLy8gcmVjaWV2ZXIgVEJEXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1YmplY3Q6IHN0dWRlbnQuZmlyc3ROYW1lICsgJyAnICsgc3R1ZGVudC5sYXN0TmFtZSArICcgUmVxdWVzdCB0byBFZGl0IENvbnNlbnQgKFN0dWRlbnQpJywgLy8gU3ViamVjdCBsaW5lXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRleHQ6ICcnLCAvLyBwbGFpbiB0ZXh0IGJvZHlcclxuICAgICAgICAgICAgICAgICAgICAgICAgaHRtbDogJ1N0dWRlbnQgJyArIHN0dWRlbnQuZmlyc3ROYW1lICsgJyAnICsgc3R1ZGVudC5sYXN0TmFtZSArICcgd2FudHMgdG8gZWRpdCB0aGVpciBjb25zZW50IGZvcm0uPGJyLz4gUGxlYXNlIGxvZ2luIHRvIHRoZSBzdHVkZW50cyBwYWdlIGF0OiAnICsgc2l0ZV9zZXR0aW5ncy51cmwgKyAnLyMvc3R1ZGVudHMuIFNlYXJjaCBmb3IgJyArIHN0dWRlbnQuZmlyc3ROYW1lICsgJyAnICsgc3R1ZGVudC5sYXN0TmFtZSArICcgaW4gdGhlIHN0dWRlbnRzIHRhYmxlLCBzZWxlY3QgVmlldyBJbmZvIGZyb20gdGhlIGRyb3Bkb3duIHRoZW4gc2VsZWN0IENvbnNlbnQgdG8gZ3JhbnQgb3IgZGVueSBhY2Nlc3MuJy8vIGh0bWwgYm9keVxyXG4gICAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICAgIG5ldyBNYWlsU2VydmljZSgpLnNlbmRNZXNzYWdlKFwiUmVxdWVzdCB0byBFZGl0IENvbnNlbnRcIiwgbWFpbE9wdGlvbnMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgcmVzLnNlbmQoeyByZXN1bHQ6IFwic3VjY2Vzc1wiLCB0aXRsZTogXCJSZXF1ZXN0IFNlbnRcIiwgbXNnOiBcIllvdXIgcmVxdWVzdCB0byBlZGl0IGNvbnNlbnQgaGFzIGJlZW4gc2VudCFcIiwgc2VydmVyTXNnOiBcIlwiIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGVycikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJFcnJvciAtIFVwZGF0ZSByZXF1ZXN0IHRvIGVkaXRcIiArIGVycik7XHJcbiAgICAgICAgICAgICAgICAgICAgICByZXMuc2VuZCh7IHJlc3VsdDogXCJlcnJvclwiLCB0aXRsZTogXCJFcnJvclwiLCBtc2c6IFwiVGhlcmUgd2FzIGFuIGVycm9yIHNlbmRpbmcgZWRpdCByZXF1ZXN0LlwiLCBzZXJ2ZXJNc2c6IFwiXCIgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbihlcnIpIHtcclxuICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJFcnJvciAtICBTZWxlY3QgZmlyc3QgYW5kIGxhc3QgbmFtZSBmcm9tIHN0dWRlbnRzOiBcIiArIGVycik7XHJcbiAgICAgICAgICAgICAgICAgIHJlcy5zZW5kKHsgcmVzdWx0OiBcImVycm9yXCIsIHRpdGxlOiBcIkVycm9yXCIsIG1zZzogXCJUaGVyZSB3YXMgYW4gZXJyb3Igc2VuZGluZyBlZGl0IHJlcXVlc3QuXCIsIHNlcnZlck1zZzogXCJcIiB9KTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbihlcnIpIHtcclxuICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkRCIENvbm5lY3Rpb24gZXJyb3I6IFwiICsgZXJyKTtcclxuICAgICAgICAgICAgICByZXMuc2VuZCh7IHJlc3VsdDogXCJlcnJvclwiLCB0aXRsZTogXCJDb25uZWN0aW9uIEVycm9yXCIsIG1zZzogXCJUaGVyZSB3YXMgYW4gZXJyb3IgY29ubmVjdGluZyB0byB0aGUgZGF0YWJhc2UuXCIsIHNlcnZlck1zZzogXCJcIiB9KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICBjb25zb2xlLmxvZyhcIkVycm9yIC0gRWRpdCBjb25zZW50IHJlcXVlc3Q6IFwiICsgZXJyKTtcclxuICAgICAgcmVzLnNlbmQoeyByZXN1bHQ6IFwiZXJyb3JcIiwgdGl0bGU6IFwiRXJyb3JcIiwgbXNnOiBcIlRoZXJlIHdhcyBhbiBlcnJvciBzZW5kaW5nIGVkaXQgcmVxdWVzdC5cIiwgc2VydmVyTXNnOiBcIlwiIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZ3JhbnRDb25zZW50RWRpdFBlcm1pc3Npb24ocmVxOiBleHByZXNzLlJlcXVlc3QsIHJlczogZXhwcmVzcy5SZXNwb25zZSkge1xyXG4gICAgdHJ5IHtcclxuICAgICAgbmV3IEF1dGhDb250cm9sbGVyKCkuYXV0aFVzZXIocmVxLCByZXMsIHtcclxuICAgICAgICByZXF1aXJlZEF1dGg6IGF1dGgsIGRvbmU6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgdmFyIHBlcm1pc3Npb24gPSByZXEuYm9keS5wZXJtaXNzaW9uO1xyXG4gICAgICAgICAgdmFyIHN0dWRlbnQgPSByZXEuYm9keS5zdHVkZW50O1xyXG4gICAgICAgICAgY29uc29sZS5sb2coXCJ5YXlhXCIpO1xyXG4gICAgICAgICAgY29uc29sZS5sb2coXCJWYWx1ZTogXCIgKyBwZXJtaXNzaW9uICsgJywgJyArIFwiVXNlcklEOiBcIiArIHN0dWRlbnQudXNlcklEKTtcclxuICAgICAgICAgIGlmIChwZXJtaXNzaW9uKSB7XHJcbiAgICAgICAgICAgIHNxbC5jb25uZWN0KGRiKVxyXG4gICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKGNvbm5lY3Rpb24pIHtcclxuICAgICAgICAgICAgICAgIG5ldyBzcWwuUmVxdWVzdChjb25uZWN0aW9uKVxyXG4gICAgICAgICAgICAgICAgICAucXVlcnkoXCJVUERBVEUgU3R1ZGVudHMgU0VUIGVkaXRDb25zZW50UmVxdWVzdCA9ICdmYWxzZScgV0hFUkUgdXNlcklEID0gXCIgKyBzdHVkZW50LnVzZXJJRClcclxuICAgICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24ocmVzdWx0MSkge1xyXG4gICAgICAgICAgICAgICAgICAgIG5ldyBzcWwuUmVxdWVzdChjb25uZWN0aW9uKVxyXG4gICAgICAgICAgICAgICAgICAgICAgLnF1ZXJ5KFwiVVBEQVRFIFN0dWRlbnRzIFNFVCBlZGl0Q29uc2VudFBlcm1pc3Npb24gPSAndHJ1ZScgV0hFUkUgdXNlcklEID0gXCIgKyBzdHVkZW50LnVzZXJJRClcclxuICAgICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKHJlc3VsdDIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmV3IHNxbC5SZXF1ZXN0KGNvbm5lY3Rpb24pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLnF1ZXJ5KFwiU0VMRUNUIGVtYWlsIEZST00gdXNlcnMgV0hFUkUgdXNlcklEID0gXCIgKyBzdHVkZW50LnVzZXJJRClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbihzdHVkZW50RW1haWwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBtYWlsT3B0aW9ucyA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZnJvbTogbWFpbC51c2VyLCAvLyBzZW5kZXIgYWRkcmVzc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0bzogc3R1ZGVudEVtYWlsWzBdLmVtYWlsLCAvLyBzdHVkZW50LmVtYWlsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1YmplY3Q6ICdSZXF1ZXN0IEdyYW50ZWQhJywgLy8gU3ViamVjdCBsaW5lXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRleHQ6ICcnLCAvLyBwbGFpbiB0ZXh0IGJvZHlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaHRtbDogJ1lvdSBjYW4gbm93IGxvZ2luIGF0OiBodHRwczovL2djYWNhZGVtaWNwcmVwLmF6dXJld2Vic2l0ZXMubmV0IGFuZCBtYWtlIGNoYW5nZXMgdG8geW91ciBjb25zZW50IGZvcm0uJy8vIGh0bWwgYm9keVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBNYWlsU2VydmljZSgpLnNlbmRNZXNzYWdlKFwiQ29uc2VudCBFZGl0IFJlcXVlc3QgR3JhbnRlZFwiLCBtYWlsT3B0aW9ucyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXMuc2VuZCh7IHJlc3VsdDogXCJncmFudGVkXCIsIHRpdGxlOiBcIlJlcXVlc3QgR3JhbnRlZFwiLCBtc2c6IFwiU3R1ZGVudCBoYXMgYmVlbiBncmFudGVkIGFjY2VzcyB0byBlZGl0IHRoZWlyIGNvbnNlbnQgZm9ybS5cIiwgc2VydmVyTXNnOiBcIlwiIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGVycikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJFcnJvciAtIEdldCBlbWFpbCBmcm9tIHVzZXJzLiBcIiArIGVycik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXMuc2VuZCh7IHJlc3VsdDogXCJlcnJvclwiLCB0aXRsZTogXCJFcnJvclwiLCBtc2c6IFwiVGhlcmUgd2FzIGFuIGVycm9yIHJldHJpZXZpbmcgZW1haWwgZnJvbSB1c2VycyB0YWJsZS5cIiwgc2VydmVyTXNnOiBlcnIgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbihlcnIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJFcnJvciAtIFNldCBlZGl0Q29uc2VudFBlcm1pc3Npb24gZXF1YWwgdG8gdHJ1ZS4gXCIgKyBlcnIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXMuc2VuZCh7IHJlc3VsdDogXCJlcnJvclwiLCB0aXRsZTogXCJFcnJvclwiLCBtc2c6IFwiVGhlcmUgd2FzIGFuIGVycm9yIHNldHRpbmcgY29uc2VudCBlZGl0IHBlcm1pc3Npb24gdG8gdHJ1ZS5cIiwgc2VydmVyTXNnOiBlcnIgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJFcnJvciAtIFNldCBlZGl0Q29uc2VudFJlcXVlc3QgZXF1YWwgdG8gZmFsc2UuIFwiICsgZXJyKTtcclxuICAgICAgICAgICAgICAgICAgICByZXMuc2VuZCh7IHJlc3VsdDogXCJlcnJvclwiLCB0aXRsZTogXCJFcnJvclwiLCBtc2c6IFwiVGhlcmUgd2FzIGFuIGVycm9yIHNldHRpbmcgY29uc2VudCBlZGl0IHJlcXVlc3QgdG8gZmFsc2UuXCIsIHNlcnZlck1zZzogZXJyIH0pO1xyXG4gICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbihlcnIpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiREIgQ29ubmVjdGlvbiBlcnJvcjogXCIgKyBlcnIpO1xyXG4gICAgICAgICAgICAgICAgcmVzLnNlbmQoeyByZXN1bHQ6IFwiZXJyb3JcIiwgdGl0bGU6IFwiQ29ubmVjdGlvbiBFcnJvclwiLCBtc2c6IFwiVGhlcmUgd2FzIGFuIGVycm9yIGNvbm5lY3RpbmcgdG8gdGhlIGRhdGFiYXNlLlwiLCBzZXJ2ZXJNc2c6IGVyciB9KTtcclxuICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJlcy5zZW5kKHsgcmVzdWx0OiBcImRlbmllZFwiLCB0aXRsZTogXCJSZXF1ZXN0IERlbmllZFwiLCBtc2c6IFwiU3R1ZGVudCBoYXMgYmVlbiBkZW5pZWQgYWNjZXNzIHRvIGVkaXQgdGhlaXIgY29uc2VudCBmb3JtLlwiLCBzZXJ2ZXJNc2c6IFwiXCJ9KTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3IgLSBHcmFudCBjb25zZW50IGVkaXQgcGVybWlzc2lvbjogXCIgKyBlcnIpO1xyXG4gICAgICByZXMuc2VuZCh7IHJlc3VsdDogXCJlcnJvclwiLCB0aXRsZTogXCJFcnJvclwiLCBtc2c6IFwiVGhlcmUgd2FzIGFuIGVycm9yIGdyYW50aW5nIGNvbnNlbnQgZWRpdCBwZXJtaXNzaW9uLlwiLCBzZXJ2ZXJNc2c6IGVyciB9KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGFkZFRvVGltZXRhYmxlKHJlcTogZXhwcmVzcy5SZXF1ZXN0LCByZXM6IGV4cHJlc3MuUmVzcG9uc2UpOiB2b2lkIHtcclxuICAgIHRyeSB7XHJcbiAgICAgIHZhciBpbmZvID0gcmVxLmJvZHlbMF07XHJcbiAgICAgIHZhciBfdXNlcklEID0gaW5mby51c2VySUQ7XHJcbiAgICAgIHZhciBfc3RhcnREYXRlID0gaW5mby5zdGFydERhdGU7XHJcbiAgICAgIHZhciBfZW5kRGF0ZSA9IGluZm8uZW5kRGF0ZTtcclxuICAgICAgdmFyIF9jb3Vyc2VJRCA9IGluZm8uY291cnNlSUQ7XHJcbiAgICAgIHZhciBfaW5zdHJ1Y3RvcklEID0gaW5mby5pbnN0cnVjdG9ySUQ7XHJcbiAgICAgIHNxbC5jb25uZWN0KGRiKVxyXG4gICAgICAgIC50aGVuKGZ1bmN0aW9uKGNvbm5lY3Rpb24pIHtcclxuICAgICAgICAgIG5ldyBzcWwuUmVxdWVzdChjb25uZWN0aW9uKVxyXG4gICAgICAgICAgICAucXVlcnkoXCJJTlNFUlQgSU5UTyBUaW1ldGFibGVzICh1c2VySUQsc3RhcnREYXRlLGVuZERhdGUsY291cnNlSUQsaW5zdHJ1Y3RvcklEKSBWQUxVRVMgKCdcIiArIF91c2VySUQgKyBcIicsJ1wiICsgX3N0YXJ0RGF0ZSArIFwiJywnXCIgKyBfZW5kRGF0ZSArIFwiJywnXCIgKyBfY291cnNlSUQgKyBcIicsJ1wiICsgX2luc3RydWN0b3JJRCArIFwiJylcIilcclxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgcmVzLnNlbmQoeyByZXN1bHQ6IFwic3VjY2Vzc1wiLCB0aXRsZTogXCJTdHVkZW50IEVucm9sbGVkXCIsIG1zZzogXCJTdHVkZW50IHVzZXIgaGFzIGJlZW4gYWRkZWQgdG8gY291cnNlLlwiLCBzZXJ2ZXJNc2c6IFwiXCIgfSk7XHJcbiAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGVycikge1xyXG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3IgLSBJbnNlcnQgaW50byB0aW1ldGFibGU6IFwiICsgZXJyKTtcclxuICAgICAgICAgICAgICByZXMuc2VuZCh7IHJlc3VsdDogXCJlcnJvclwiLCB0aXRsZTogXCJFcnJvclwiLCBtc2c6IFwiVGhlcmUgd2FzIGFuIGVycm9yIGFkZGluZyBzdHVkZW50IHRvIHRpbWV0YWJsZS5cIiwgc2VydmVyTXNnOiBlcnIgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGVycikge1xyXG4gICAgICAgICAgY29uc29sZS5sb2coXCJEQiBDb25uZWN0aW9uIGVycm9yOiBcIiArIGVycik7XHJcbiAgICAgICAgICByZXMuc2VuZCh7IHJlc3VsdDogXCJlcnJvclwiLCB0aXRsZTogXCJDb25uZWN0aW9uIEVycm9yXCIsIG1zZzogXCJUaGVyZSB3YXMgYW4gZXJyb3IgY29ubmVjdGluZyB0byB0aGUgZGF0YWJhc2UuXCIsIHNlcnZlck1zZzogZXJyIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3IgLSBBZGQgc3R1ZGVudCB0byB0aW1ldGFibGU6IFwiICsgZXJyKTtcclxuICAgICAgcmVzLnNlbmQoeyByZXN1bHQ6IFwiZXJyb3JcIiwgdGl0bGU6IFwiRXJyb3JcIiwgbXNnOiBcIlRoZXJlIHdhcyBhbiBlcnJvciBhZGRpbmcgc3R1ZGVudCB0byB0aW1ldGFibGUuXCIsIHNlcnZlck1zZzogZXJyIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcmVtb3ZlRnJvbVRpbWV0YWJsZShyZXE6IGV4cHJlc3MuUmVxdWVzdCwgcmVzOiBleHByZXNzLlJlc3BvbnNlKTogdm9pZCB7XHJcbiAgICB0cnkge1xyXG4gICAgICB2YXIgX3VzZXJJRCA9IHJlcS5wYXJhbXMuX3VzZXJJRDtcclxuICAgICAgdmFyIF9jb3Vyc2VJRCA9IHJlcS5wYXJhbXMuX2NvdXJzZUlEO1xyXG4gICAgICBzcWwuY29ubmVjdChkYilcclxuICAgICAgICAudGhlbihmdW5jdGlvbihjb25uZWN0aW9uKSB7XHJcbiAgICAgICAgICBuZXcgc3FsLlJlcXVlc3QoY29ubmVjdGlvbilcclxuICAgICAgICAgICAgLnF1ZXJ5KFwiREVMRVRFIEZST00gVGltZXRhYmxlcyBXSEVSRSB1c2VySUQgPSAoJ1wiICsgX3VzZXJJRCArIFwiJykgQU5EIGNvdXJzZUlEID0gKCdcIiArIF9jb3Vyc2VJRCArIFwiJylcIilcclxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgcmVzLnNlbmQoeyByZXN1bHQ6IFwic3VjY2Vzc1wiLCB0aXRsZTogXCJTdHVkZW50IFJlbW92ZWRcIiwgbXNnOiBcIlN0dWRlbnQgaGFzIGJlZW4gcmVtb3ZlZCBmcm9tIGNvdXJzZS5cIiwgc2VydmVyTXNnOiBcIlwiIH0pO1xyXG4gICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbihlcnIpIHtcclxuICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yIC0gUmVtb3ZlIHN0dWRlbnQgZnJvbSB0aW1ldGFibGU6IFwiICsgZXJyKTtcclxuICAgICAgICAgICAgICByZXMuc2VuZCh7IHJlc3VsdDogXCJlcnJvclwiLCB0aXRsZTogXCJFcnJvclwiLCBtc2c6IFwiVGhlcmUgd2FzIGFuIGVycm9yIHJlbW92aW5nIHN0dWRlbnQgZnJvbSB0aW1ldGFibGUuXCIsIHNlcnZlck1zZzogZXJyIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KS5jYXRjaChmdW5jdGlvbihlcnIpIHtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKFwiREIgQ29ubmVjdGlvbiBlcnJvcjogXCIgKyBlcnIpO1xyXG4gICAgICAgICAgcmVzLnNlbmQoeyByZXN1bHQ6IFwiZXJyb3JcIiwgdGl0bGU6IFwiQ29ubmVjdGlvbiBFcnJvclwiLCBtc2c6IFwiVGhlcmUgd2FzIGFuIGVycm9yIGNvbm5lY3RpbmcgdG8gdGhlIGRhdGFiYXNlLlwiLCBzZXJ2ZXJNc2c6IGVyciB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICBjb25zb2xlLmxvZyhcIkVycm9yIC0gUmVtb3ZlIHN0dWRlbnQgZnJvbSB0aW1ldGFibGU6IFwiICsgZXJyKTtcclxuICAgICAgcmVzLnNlbmQoeyByZXN1bHQ6IFwiZXJyb3JcIiwgdGl0bGU6IFwiRXJyb3JcIiwgbXNnOiBcIlRoZXJlIHdhcyBhbiBlcnJvciByZW1vdmluZyBzdHVkZW50IGZyb20gdGltZXRhYmxlLlwiLCBzZXJ2ZXJNc2c6IGVyciB9KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGdldFRpbWV0YWJsZXMocmVxOiBleHByZXNzLlJlcXVlc3QsIHJlczogZXhwcmVzcy5SZXNwb25zZSk6IHZvaWQge1xyXG4gICAgdHJ5IHtcclxuICAgICAgbmV3IEF1dGhDb250cm9sbGVyKCkuYXV0aFVzZXIocmVxLCByZXMsIHtcclxuICAgICAgICByZXF1aXJlZEF1dGg6IFtcIkluc3RydWN0b3JcIiwgXCJBZG1pblwiLCBcIlN0YWZmXCJdLCBkb25lOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgIHNxbC5jb25uZWN0KGRiKVxyXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbihjb25uZWN0aW9uKSB7XHJcbiAgICAgICAgICAgICAgbmV3IHNxbC5SZXF1ZXN0KGNvbm5lY3Rpb24pXHJcbiAgICAgICAgICAgICAgICAucXVlcnkoXCJTRUxFQ1QgKiBGUk9NIFRpbWV0YWJsZXNcIilcclxuICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKHJlY29yZHNldCkge1xyXG4gICAgICAgICAgICAgICAgICByZXMuc2VuZChyZWNvcmRzZXQpO1xyXG4gICAgICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3IgLSBHZXQgc3R1ZGVudCB0aW1ldGFibGVzOiBcIiArIGVycik7XHJcbiAgICAgICAgICAgICAgICAgIHJlcy5zZW5kKHsgcmVzdWx0OiBcImVycm9yXCIsIHRpdGxlOiBcIkVycm9yXCIsIG1zZzogXCJUaGVyZSB3YXMgYW4gZXJyb3IgcmV0cmlldmluZyBzdHVkZW50IHRpbWV0YWJsZXMuXCIsIHNlcnZlck1zZzogZXJyIH0pO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGVycikge1xyXG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiREIgQ29ubmVjdGlvbiBlcnJvcjogXCIgKyBlcnIpO1xyXG4gICAgICAgICAgICAgIHJlcy5zZW5kKHsgcmVzdWx0OiBcImVycm9yXCIsIHRpdGxlOiBcIkNvbm5lY3Rpb24gRXJyb3JcIiwgbXNnOiBcIlRoZXJlIHdhcyBhbiBlcnJvciBjb25uZWN0aW5nIHRvIHRoZSBkYXRhYmFzZS5cIiwgc2VydmVyTXNnOiBlcnIgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgY29uc29sZS5sb2coXCJFcnJvciAtIEdldCBzdHVkZW50IHRpbWV0YWJsZXM6IFwiICsgZXJyKTtcclxuICAgICAgcmVzLnNlbmQoeyByZXN1bHQ6IFwiZXJyb3JcIiwgdGl0bGU6IFwiRXJyb3JcIiwgbXNnOiBcIlRoZXJlIHdhcyBhbiBlcnJvciByZXRyaWV2aW5nIHN0dWRlbnQgdGltZXRhYmxlcy5cIiwgc2VydmVyTXNnOiBlcnIgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBnZXRUaW1ldGFibGVzQnlDb3Vyc2VJZChyZXE6IGV4cHJlc3MuUmVxdWVzdCwgcmVzOiBleHByZXNzLlJlc3BvbnNlKTogdm9pZCB7XHJcbiAgICB0cnkge1xyXG4gICAgICBuZXcgQXV0aENvbnRyb2xsZXIoKS5hdXRoVXNlcihyZXEsIHJlcywge1xyXG4gICAgICAgIHJlcXVpcmVkQXV0aDogYXV0aCwgZG9uZTogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICB2YXIgX2lkOiBzdHJpbmcgPSByZXEucGFyYW1zLl9jb3Vyc2VJRDtcclxuICAgICAgICAgIHNxbC5jb25uZWN0KGRiKVxyXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbihjb25uZWN0aW9uKSB7XHJcbiAgICAgICAgICAgICAgbmV3IHNxbC5SZXF1ZXN0KGNvbm5lY3Rpb24pXHJcbiAgICAgICAgICAgICAgICAucXVlcnkoXCJTRUxFQ1QgKiBGUk9NIFRpbWV0YWJsZXMgV0hFUkUgY291cnNlSUQgPSAnXCIgKyBfaWQgKyBcIidcIilcclxuICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKHJlY29yZHNldCkge1xyXG4gICAgICAgICAgICAgICAgICByZXMuc2VuZChyZWNvcmRzZXQpO1xyXG4gICAgICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3IgLSBHZXQgdGltZXRhYmxlcyBieSBjb3Vyc2VJRDogXCIgKyBlcnIpO1xyXG4gICAgICAgICAgICAgICAgICByZXMuc2VuZCh7IHJlc3VsdDogXCJlcnJvclwiLCB0aXRsZTogXCJFcnJvclwiLCBtc2c6IFwiVGhlcmUgd2FzIGFuIGVycm9yIHJldHJpZXZpbmcgc3R1ZGVudCB0aW1ldGFibGVzIGJ5IGNvdXJzZSBpZC5cIiwgc2VydmVyTXNnOiBlcnIgfSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XHJcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJEQiBDb25uZWN0aW9uIGVycm9yOiBcIiArIGVycik7XHJcbiAgICAgICAgICAgICAgcmVzLnNlbmQoeyByZXN1bHQ6IFwiZXJyb3JcIiwgdGl0bGU6IFwiQ29ubmVjdGlvbiBFcnJvclwiLCBtc2c6IFwiVGhlcmUgd2FzIGFuIGVycm9yIGNvbm5lY3RpbmcgdG8gdGhlIGRhdGFiYXNlLlwiLCBzZXJ2ZXJNc2c6IGVyciB9KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICBjb25zb2xlLmxvZyhcIkVycm9yIC0gR2V0IHRpbWV0YWJsZXMgYnkgY291cnNlIGlkOiBcIiArIGVycik7XHJcbiAgICAgIHJlcy5zZW5kKHsgcmVzdWx0OiBcImVycm9yXCIsIHRpdGxlOiBcIkVycm9yXCIsIG1zZzogXCJUaGVyZSB3YXMgYW4gZXJyb3IgcmV0cmlldmluZyBzdHVkZW50IHRpbWV0YWJsZXMgYnkgY291cnNlIGlkLlwiLCBzZXJ2ZXJNc2c6IGVyciB9KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGdldFRpbWV0YWJsZXNCeVVzZXJJZChyZXE6IGV4cHJlc3MuUmVxdWVzdCwgcmVzOiBleHByZXNzLlJlc3BvbnNlKTogdm9pZCB7XHJcbiAgICB0cnkge1xyXG4gICAgICBuZXcgQXV0aENvbnRyb2xsZXIoKS5hdXRoVXNlcihyZXEsIHJlcywge1xyXG4gICAgICAgIHJlcXVpcmVkQXV0aDogW1wiU3R1ZGVudFwiLCBcIkFkbWluXCIsIFwiU3RhZmZcIiwgXCJJbnN0cnVjdG9yXCJdLCBkb25lOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgIHZhciBfaWQ6IHN0cmluZyA9IHJlcS5wYXJhbXMudXNlcklEO1xyXG4gICAgICAgICAgc3FsLmNvbm5lY3QoZGIpXHJcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKGNvbm5lY3Rpb24pIHtcclxuICAgICAgICAgICAgICBuZXcgc3FsLlJlcXVlc3QoY29ubmVjdGlvbilcclxuICAgICAgICAgICAgICAgIC5xdWVyeShgc2VsZWN0ICogRlJPTSBUaW1ldGFibGVzIFdIRVJFIHVzZXJJRCA9ICR7X2lkfWApXHJcbiAgICAgICAgICAgICAgICAudGhlbigocmVzdWx0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHQubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBxdWVyeSA9ICdzZWxlY3QgKiBmcm9tIGNvdXJzZSB3aGVyZSc7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCByZXN1bHQubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgIGlmIChpID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHF1ZXJ5ICs9ICcgY291cnNlSWQgPSAnICsgcmVzdWx0W2ldLmNvdXJzZUlEO1xyXG4gICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcXVlcnkgKz0gXCIgT1IgY291cnNlSWQgPSBcIiArIHJlc3VsdFtpXS5jb3Vyc2VJRDtcclxuICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgbmV3IHNxbC5SZXF1ZXN0KGNvbm5lY3Rpb24pXHJcbiAgICAgICAgICAgICAgICAgICAgICAucXVlcnkocXVlcnkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAudGhlbigocmVzdWx0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcy5zZW5kKHJlc3VsdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbihlcnIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJFcnJvciAtIFNlbGVjdCBmcm9tIGNvdXJzZXM6IFwiICsgZXJyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzLnNlbmQoeyByZXN1bHQ6IFwiZXJyb3JcIiwgdGl0bGU6IFwiRXJyb3JcIiwgbXNnOiBcIlRoZXJlIHdhcyBhbiBlcnJvciByZXRyaWV2aW5nIHN0dWRlbnQgdGltZXRhYmxlcyBieSB1c2VyIGlkLlwiLCBzZXJ2ZXJNc2c6IGVyciB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlcy5zZW5kKHsgcmVzdWx0OiBcInN1Y2Nlc3NcIiwgdGl0bGU6IFwiTm8gVGltZXRhYmxlIEluZm9cIiwgbXNnOiBcIk5vIHRpbXRhYmxlIGluZm8gZm9yIHRoaXMgc3R1ZGVudC5cIiwgc2VydmVyTXNnOiBcIlwiIH0pO1xyXG4gICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbihlcnIpIHtcclxuICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJFcnJvciAtIFNlbGVjdCBmcm9tIHRpbWV0YWJsZXM6IFwiICsgZXJyKTtcclxuICAgICAgICAgICAgICAgICAgcmVzLnNlbmQoeyByZXN1bHQ6IFwiZXJyb3JcIiwgdGl0bGU6IFwiRXJyb3JcIiwgbXNnOiBcIlRoZXJlIHdhcyBhbiBlcnJvciByZXRyaWV2aW5nIHN0dWRlbnQgdGltZXRhYmxlcyBieSB1c2VyIGlkLlwiLCBzZXJ2ZXJNc2c6IGVyciB9KTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbihlcnIpIHtcclxuICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkRCIENvbm5lY3Rpb24gZXJyb3I6IFwiICsgZXJyKTtcclxuICAgICAgICAgICAgICByZXMuc2VuZCh7IHJlc3VsdDogXCJlcnJvclwiLCB0aXRsZTogXCJDb25uZWN0aW9uIEVycm9yXCIsIG1zZzogXCJUaGVyZSB3YXMgYW4gZXJyb3IgY29ubmVjdGluZyB0byB0aGUgZGF0YWJhc2UuXCIsIHNlcnZlck1zZzogZXJyIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3IgLSBHZXQgdGltZXRhYmxlcyBieSB1c2VyIGlkOiBcIiArIGVycik7XHJcbiAgICAgIHJlcy5zZW5kKHsgcmVzdWx0OiBcImVycm9yXCIsIHRpdGxlOiBcIkVycm9yXCIsIG1zZzogXCJUaGVyZSB3YXMgYW4gZXJyb3IgcmV0cmlldmluZyBzdHVkZW50IHRpbWV0YWJsZXMgYnkgdXNlciBpZC5cIiwgc2VydmVyTXNnOiBlcnIgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBjcmVhdGVOb3RlKHJlcTogZXhwcmVzcy5SZXF1ZXN0LCByZXM6IGV4cHJlc3MuUmVzcG9uc2UpOiB2b2lkIHtcclxuICAgIHRyeSB7XHJcbiAgICAgIG5ldyBBdXRoQ29udHJvbGxlcigpLmF1dGhVc2VyKHJlcSwgcmVzLCB7XHJcbiAgICAgICAgcmVxdWlyZWRBdXRoOiBbXCJBZG1pblwiLCBcIlN0YWZmXCIsIFwiSW5zdHJ1Y3RvclwiXSwgZG9uZTogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICB2YXIgY2FzZU5vdGUgPSByZXEuYm9keS5jYXNlTm90ZTtcclxuICAgICAgICAgIHZhciBkYXRlVGltZSA9IHJlcS5ib2R5LmRhdGVUaW1lO1xyXG4gICAgICAgICAgdmFyIF9pZDogc3RyaW5nID0gcmVxLnBhcmFtcy5fc3R1ZGVudElEO1xyXG5cclxuICAgICAgICAgIHNxbC5jb25uZWN0KGRiKVxyXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbihjb25uZWN0aW9uKSB7XHJcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coZGF0ZVRpbWUpO1xyXG4gICAgICAgICAgICAgIG5ldyBzcWwuUmVxdWVzdChjb25uZWN0aW9uKVxyXG4gICAgICAgICAgICAgICAgLnF1ZXJ5KFwiSU5TRVJUIElOVE8gQ2FzZU5vdGVzIFZBTFVFUyAoJ1wiICsgX2lkICsgXCInLCAnXCIgKyBjYXNlTm90ZSArIFwiJywgJ1wiICsgZGF0ZVRpbWUgKyBcIicpXCIpXHJcbiAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgcmVzLnNlbmQoeyByZXN1bHQ6IFwic3VjY2Vzc1wiLCB0aXRsZTogXCJOb3RlIENyZWF0ZWQhXCIsIG1zZzogXCJOb3RlIGhhcyBiZWVuIGNyZWF0ZWQgZm9yIHRoaXMgc3R1ZGVudC5cIiwgc2VydmVyTXNnOiBcIlwiIH0pO1xyXG4gICAgICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3IgLSBJbnNlcnQgbmV3IG5vdGUgXCIgKyBlcnIpO1xyXG4gICAgICAgICAgICAgICAgICByZXMuc2VuZCh7IHJlc3VsdDogXCJlcnJvclwiLCB0aXRsZTogXCJFcnJvclwiLCBtc2c6IFwiVGhlcmUgd2FzIGFuIGVycm9yIGNyZWF0aW5nIG5vdGUgZm9yIHN0dWRlbnQuXCIsIHNlcnZlck1zZzogZXJyIH0pO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGVycikge1xyXG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiREIgQ29ubmVjdGlvbiBlcnJvcjogXCIgKyBlcnIpO1xyXG4gICAgICAgICAgICAgIHJlcy5zZW5kKHsgcmVzdWx0OiBcImVycm9yXCIsIHRpdGxlOiBcIkNvbm5lY3Rpb24gRXJyb3JcIiwgbXNnOiBcIlRoZXJlIHdhcyBhbiBlcnJvciBjb25uZWN0aW5nIHRvIHRoZSBkYXRhYmFzZS5cIiwgc2VydmVyTXNnOiBlcnIgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgY29uc29sZS5sb2coXCJFcnJvciAtIENyZWF0ZSBub3RlOiBcIiArIGVycik7XHJcbiAgICAgIHJlcy5zZW5kKHsgcmVzdWx0OiBcImVycm9yXCIsIHRpdGxlOiBcIkVycm9yXCIsIG1zZzogXCJUaGVyZSB3YXMgYW4gZXJyb3IgY3JlYXRpbmcgbm90ZSBmb3Igc3R1ZGVudC5cIiwgc2VydmVyTXNnOiBlcnIgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBnZXROb3RlKHJlcTogZXhwcmVzcy5SZXF1ZXN0LCByZXM6IGV4cHJlc3MuUmVzcG9uc2UpOiB2b2lkIHtcclxuICAgIHRyeSB7XHJcbiAgICAgIG5ldyBBdXRoQ29udHJvbGxlcigpLmF1dGhVc2VyKHJlcSwgcmVzLCB7XHJcbiAgICAgICAgcmVxdWlyZWRBdXRoOiBbXCJBZG1pblwiLCBcIlN0YWZmXCIsIFwiSW5zdHJ1Y3RvclwiXSwgZG9uZTogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICB2YXIgX2lkOiBzdHJpbmcgPSByZXEucGFyYW1zLl9zdHVkZW50SUQ7XHJcbiAgICAgICAgICBzcWwuY29ubmVjdChkYilcclxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24oY29ubmVjdGlvbikge1xyXG4gICAgICAgICAgICAgIG5ldyBzcWwuUmVxdWVzdChjb25uZWN0aW9uKVxyXG4gICAgICAgICAgICAgICAgLnF1ZXJ5KFwiU0VMRUNUICogIEZST00gQ2FzZU5vdGVzIFdIRVJFIHN0dWRlbnRJRCA9ICdcIiArIF9pZCArIFwiJyBPUkRFUiBCWSBkYXRlVGltZSBERVNDXCIpXHJcbiAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbihyZWNvcmRzZXQpIHtcclxuICAgICAgICAgICAgICAgICAgcmVzLnNlbmQocmVjb3Jkc2V0KTtcclxuICAgICAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGVycikge1xyXG4gICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yIC0gR2V0IGNhc2Ugbm90ZSBieSBpZDogXCIgKyBlcnIpO1xyXG4gICAgICAgICAgICAgICAgICByZXMuc2VuZCh7IHJlc3VsdDogXCJlcnJvclwiLCB0aXRsZTogXCJFcnJvclwiLCBtc2c6IFwiVGhlcmUgd2FzIGFuIGVycm9yIHJldHJpZXZpbmcgbm90ZXMgZm9yIHRoaXMgc3R1ZGVudC5cIiwgc2VydmVyTXNnOiBlcnIgfSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XHJcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJEQiBDb25uZWN0aW9uIGVycm9yOiBcIiArIGVycik7XHJcbiAgICAgICAgICAgICAgcmVzLnNlbmQoeyByZXN1bHQ6IFwiZXJyb3JcIiwgdGl0bGU6IFwiQ29ubmVjdGlvbiBFcnJvclwiLCBtc2c6IFwiVGhlcmUgd2FzIGFuIGVycm9yIGNvbm5lY3RpbmcgdG8gdGhlIGRhdGFiYXNlLlwiLCBzZXJ2ZXJNc2c6IGVyciB9KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICBjb25zb2xlLmxvZyhcIkVycm9yIC0gR2V0IHN0dWRlbnQgbm90ZXM6IFwiICsgZXJyKTtcclxuICAgICAgcmVzLnNlbmQoeyByZXN1bHQ6IFwiZXJyb3JcIiwgdGl0bGU6IFwiRXJyb3JcIiwgbXNnOiBcIlRoZXJlIHdhcyBhbiBlcnJvciByZXRyaWV2aW5nIG5vdGVzIGZvciB0aGlzIHN0dWRlbnQuXCIsIHNlcnZlck1zZzogZXJyIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZGVsZXRlTm90ZShyZXE6IGV4cHJlc3MuUmVxdWVzdCwgcmVzOiBleHByZXNzLlJlc3BvbnNlKTogdm9pZCB7XHJcbiAgICB0cnkge1xyXG4gICAgICBuZXcgQXV0aENvbnRyb2xsZXIoKS5hdXRoVXNlcihyZXEsIHJlcywge1xyXG4gICAgICAgIHJlcXVpcmVkQXV0aDogYXV0aCwgZG9uZTogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICB2YXIgX2lkOiBzdHJpbmcgPSByZXEucGFyYW1zLl9pZDtcclxuICAgICAgICAgIHNxbC5jb25uZWN0KGRiKVxyXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbihjb25uZWN0aW9uKSB7XHJcbiAgICAgICAgICAgICAgbmV3IHNxbC5SZXF1ZXN0KGNvbm5lY3Rpb24pXHJcbiAgICAgICAgICAgICAgICAucXVlcnkoXCJERUxFVEUgRlJPTSBjYXNlTm90ZXMgV0hFUkUgY2FzZU5vdGVJRCA9ICdcIiArIF9pZCArIFwiJ1wiKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgIHJlcy5zZW5kKHsgcmVzdWx0OiBcInN1Y2Nlc3NcIiwgdGl0bGU6IFwiTm90ZSBEZWxldGVkXCIsIG1zZzogXCJOb3RlIGhhcyBiZWVuIGRlbGV0ZWQgZm9yIHRoaXMgc3R1ZGVudC5cIiwgc2VydmVyTXNnOiBcIlwiIH0pO1xyXG4gICAgICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3IgLSBEZWxldGUgc3R1ZGVudCBub3RlOiBcIiArIGVycik7XHJcbiAgICAgICAgICAgICAgICAgIHJlcy5zZW5kKHsgcmVzdWx0OiBcImVycm9yXCIsIHRpdGxlOiBcIkVycm9yXCIsIG1zZzogXCJUaGVyZSB3YXMgYW4gZXJyb3IgZGVsZXRpbmcgdGhpcyBub3RlLlwiLCBzZXJ2ZXJNc2c6IGVyciB9KTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbihlcnIpIHtcclxuICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkRCIENvbm5lY3Rpb24gZXJyb3I6IFwiICsgZXJyKTtcclxuICAgICAgICAgICAgICByZXMuc2VuZCh7IHJlc3VsdDogXCJlcnJvclwiLCB0aXRsZTogXCJDb25uZWN0aW9uIEVycm9yXCIsIG1zZzogXCJUaGVyZSB3YXMgYW4gZXJyb3IgY29ubmVjdGluZyB0byB0aGUgZGF0YWJhc2UuXCIsIHNlcnZlck1zZzogZXJyIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3IgLSBEZWxldGUgc3R1ZGVudCBub3RlOiBcIiArIGVycik7XHJcbiAgICAgIHJlcy5zZW5kKHsgcmVzdWx0OiBcImVycm9yXCIsIHRpdGxlOiBcIkVycm9yXCIsIG1zZzogXCJUaGVyZSB3YXMgYW4gZXJyb3IgZGVsZXRpbmcgdGhpcyBub3RlLlwiLCBzZXJ2ZXJNc2c6IGVyciB9KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGluc2VydEF0dGVuZGFuY2UocmVxOiBleHByZXNzLlJlcXVlc3QsIHJlczogZXhwcmVzcy5SZXNwb25zZSk6IHZvaWQge1xyXG4gICAgdHJ5IHtcclxuICAgICAgbmV3IEF1dGhDb250cm9sbGVyKCkuYXV0aFVzZXIocmVxLCByZXMsIHtcclxuICAgICAgICByZXF1aXJlZEF1dGg6IFtcIkFkbWluXCIsIFwiU3RhZmZcIiwgXCJJbnN0cnVjdG9yXCJdLCBkb25lOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgIHZhciBhdHRlbmRhbmNlID0gcmVxLmJvZHk7XHJcbiAgICAgICAgICB2YXIgcXVlcnkgPSBcIklOU0VSVCBJTlRPIEF0dGVuZGFuY2UgKGNvdXJzZUlELCBkYXRlLCB1c2VySUQsIGF0dGVuZGFuY2VWYWx1ZSwgdHdvTWlzc2VkQ2xhc3NNc2csIGZvdXJNaXNzZWRDbGFzc01zZykgVkFMVUVTIFwiO1xyXG4gICAgICAgICAgdmFyIGNvdW50ID0gMDtcclxuICAgICAgICAgIGlmIChhdHRlbmRhbmNlLnN0dWRlbnRzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgdmFyIGRhdGUgPSBhdHRlbmRhbmNlLmRhdGU7XHJcbiAgICAgICAgICAgIGZvciAobGV0IHN0dWRlbnQgb2YgYXR0ZW5kYW5jZS5zdHVkZW50cykge1xyXG4gICAgICAgICAgICAgIGlmIChjb3VudCA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgcXVlcnkgKz0gXCIoJ1wiICsgYXR0ZW5kYW5jZS5jb3Vyc2VJRCArIFwiJywgJ1wiICsgZGF0ZSArIFwiJywgJ1wiICsgc3R1ZGVudC51c2VySUQgKyBcIicsICdcIiArIHN0dWRlbnQuYXR0ZW5kYW5jZVZhbHVlICsgXCInLCAnRmFsc2UnLCAnRmFsc2UnIClcIjtcclxuICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcXVlcnkgKz0gXCIsICgnXCIgKyBhdHRlbmRhbmNlLmNvdXJzZUlEICsgXCInLCAnXCIgKyBkYXRlICsgXCInLCAnXCIgKyBzdHVkZW50LnVzZXJJRCArIFwiJywgJ1wiICsgc3R1ZGVudC5hdHRlbmRhbmNlVmFsdWUgKyBcIicsICdGYWxzZScsICdGYWxzZScgKVwiO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICBjb3VudCsrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHNxbC5jb25uZWN0KGRiKVxyXG4gICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKGNvbm5lY3Rpb24pIHtcclxuICAgICAgICAgICAgICAgIG5ldyBzcWwuUmVxdWVzdChjb25uZWN0aW9uKVxyXG4gICAgICAgICAgICAgICAgICAucXVlcnkocXVlcnkpXHJcbiAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKHJlY29yZHNldCkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIHNldCBzY2hlZHVsZSBjaGVjayBvbiBEQlxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiYXR0ZW5kYW5jZSByZWNvcmQgaW5zZXJ0ZWRcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzLnNlbmQocmVjb3Jkc2V0KTtcclxuICAgICAgICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJFcnJvciAtIEluc2VydCBhdHRlbmRhbmNlOiBcIiArIGVycik7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzLnNlbmQoeyByZXN1bHQ6IFwiZXJyb3JcIiwgdGl0bGU6IFwiRXJyb3JcIiwgbXNnOiBcIlRoZXJlIHdhcyBhbiBlcnJvciBpbnNlcnRpbmcgYXR0ZW5kYW5jZSBmb3Igc3R1ZGVudC5cIiwgc2VydmVyTXNnOiBlcnIgfSk7XHJcbiAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGVycikge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJEQiBDb25uZWN0aW9uIGVycm9yOiBcIiArIGVycik7XHJcbiAgICAgICAgICAgICAgICByZXMuc2VuZCh7IHJlc3VsdDogXCJlcnJvclwiLCB0aXRsZTogXCJDb25uZWN0aW9uIEVycm9yXCIsIG1zZzogXCJUaGVyZSB3YXMgYW4gZXJyb3IgY29ubmVjdGluZyB0byB0aGUgZGF0YWJhc2UuXCIsIHNlcnZlck1zZzogZXJyIH0pO1xyXG4gICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJObyBhYnNlbnQgc3R1ZGVudHNcIik7XHJcbiAgICAgICAgICAgIHJlcy5zZW5kKHsgc3RhdHVzOiBcIk5vIGFic2VudCBzdHVkZW50c1wiIH0pO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgY29uc29sZS5sb2coXCJFcnJvciAtIEluc2VydCBhdHRlbmRhbmNlOiBcIiArIGVycik7XHJcbiAgICAgIHJlcy5zZW5kKHsgcmVzdWx0OiBcImVycm9yXCIsIHRpdGxlOiBcIkVycm9yXCIsIG1zZzogXCJUaGVyZSB3YXMgYW4gZXJyb3IgaW5zZXJ0aW5nIGF0dGVuZGFuY2UgZm9yIHN0dWRlbnQuXCIsIHNlcnZlck1zZzogZXJyIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZ2V0QWxsQXR0ZW5kYW5jZShyZXE6IGV4cHJlc3MuUmVxdWVzdCwgcmVzOiBleHByZXNzLlJlc3BvbnNlKTogdm9pZCB7XHJcbiAgICB0cnkge1xyXG4gICAgICBuZXcgQXV0aENvbnRyb2xsZXIoKS5hdXRoVXNlcihyZXEsIHJlcywge1xyXG4gICAgICAgIHJlcXVpcmVkQXV0aDogW1wiQWRtaW5cIiwgXCJTdGFmZlwiLCBcIkluc3RydWN0b3JcIl0sIGRvbmU6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgc3FsLmNvbm5lY3QoZGIpXHJcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKGNvbm5lY3Rpb24pIHtcclxuICAgICAgICAgICAgICBuZXcgc3FsLlJlcXVlc3QoY29ubmVjdGlvbilcclxuICAgICAgICAgICAgICAgIC5xdWVyeShcIlNFTEVDVCAqIEZST00gQXR0ZW5kYW5jZVwiKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24ocmVjb3Jkc2V0KSB7XHJcbiAgICAgICAgICAgICAgICAgIGZvciAobGV0IGl0ZW0gb2YgcmVjb3Jkc2V0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5kYXRlID0gaXRlbS5kYXRlLnNwbGl0KCcgJyk7XHJcbiAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgcmVzLnNlbmQocmVjb3Jkc2V0KTtcclxuICAgICAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGVycikge1xyXG4gICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yIC0gR2V0IGFsbCBhdHRlbmRhbmNlOiBcIiArIGVycik7XHJcbiAgICAgICAgICAgICAgICAgIHJlcy5zZW5kKHsgcmVzdWx0OiBcImVycm9yXCIsIHRpdGxlOiBcIkVycm9yXCIsIG1zZzogXCJUaGVyZSB3YXMgYW4gZXJyb3IgcmV0cmlldmluZyBhbGwgc3R1ZGVudCBhdHRlbmRhbmNlIHJlY29yZHMuXCIsIHNlcnZlck1zZzogZXJyIH0pO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGVycikge1xyXG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiREIgQ29ubmVjdGlvbiBlcnJvcjogXCIgKyBlcnIpO1xyXG4gICAgICAgICAgICAgIHJlcy5zZW5kKHsgcmVzdWx0OiBcImVycm9yXCIsIHRpdGxlOiBcIkNvbm5lY3Rpb24gRXJyb3JcIiwgbXNnOiBcIlRoZXJlIHdhcyBhbiBlcnJvciBjb25uZWN0aW5nIHRvIHRoZSBkYXRhYmFzZS5cIiwgc2VydmVyTXNnOiBlcnIgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgY29uc29sZS5sb2coXCJFcnJvciAtIEdldCBhbGwgYXR0ZW5kYW5jZTogXCIgKyBlcnIpO1xyXG4gICAgICByZXMuc2VuZCh7IHJlc3VsdDogXCJlcnJvclwiLCB0aXRsZTogXCJFcnJvclwiLCBtc2c6IFwiVGhlcmUgd2FzIGFuIGVycm9yIHJldHJpZXZpbmcgYWxsIHN0dWRlbnQgYXR0ZW5kYW5jZSByZWNvcmRzLlwiLCBzZXJ2ZXJNc2c6IGVyciB9KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHBvcHVsYXRlUFJGKHJlcTogZXhwcmVzcy5SZXF1ZXN0LCByZXM6IGV4cHJlc3MuUmVzcG9uc2UpOiB2b2lkIHtcclxuICAgIHRyeSB7XHJcbiAgICAgIG5ldyBBdXRoQ29udHJvbGxlcigpLmF1dGhVc2VyKHJlcSwgcmVzLCB7XHJcbiAgICAgICAgcmVxdWlyZWRBdXRoOiBhdXRoLCBkb25lOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgIHZhciBfaWQ6IHN0cmluZyA9IHJlcS5wYXJhbXMuX2lkO1xyXG4gICAgICAgICAgc3FsLmNvbm5lY3QoZGIpXHJcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKGNvbm5lY3Rpb24pIHtcclxuICAgICAgICAgICAgICBuZXcgc3FsLlJlcXVlc3QoY29ubmVjdGlvbilcclxuICAgICAgICAgICAgICAgIC5xdWVyeShcIlNFTEVDVCAqIEZST00gQ2xpZW50cyBDIElOTkVSIEpPSU4gU3VpdGFiaWxpdHlGb3JtIFMgT04gQy51c2VySUQgPSBTLnVzZXJJRCBXSEVSRSBDLnVzZXJJRCA9ICdcIiArIF9pZCArIFwiJyBBTkQgUy51c2VySUQgPSAnXCIgKyBfaWQgKyBcIidcIilcclxuICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKHJlY29yZHNldCkge1xyXG4gICAgICAgICAgICAgICAgICBuZXcgUFJGU2VydmljZSgpLnBvcHVsYXRlUFJGKHJlY29yZHNldFswXSk7XHJcbiAgICAgICAgICAgICAgICAgIHJlcy5zZW5kKHsgcmVzdWx0OiBcInN1Y2Nlc3NcIiwgdGl0bGU6IFwiUFJGIFBvcHVsYXRlZCFcIiwgbXNnOiBcIlBSRiBmb3JtIGhhcyBiZWVuIHBvcHVsYXRlZCB3aXRoIHN0dWRlbnQgaW5mby5cIiwgc2VydmVyTXNnOiBcIlwiIH0pO1xyXG4gICAgICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3IgLSBHZXQgY2xpZW50IGJ5IGlkIGZvciBwcmY6IFwiICsgZXJyKTtcclxuICAgICAgICAgICAgICAgICAgcmVzLnNlbmQoeyByZXN1bHQ6IFwiZXJyb3JcIiwgdGl0bGU6IFwiRXJyb3JcIiwgbXNnOiBcIlRoZXJlIHdhcyBhbiBlcnJvciBwb3B1bGF0aW5nIFBSRiB3aXRoIHN0dWRlbnQgaW5mby5cIiwgc2VydmVyTXNnOiBlcnIgfSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XHJcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJEQiBDb25uZWN0aW9uIGVycm9yOiBcIiArIGVycik7XHJcbiAgICAgICAgICAgICAgcmVzLnNlbmQoeyByZXN1bHQ6IFwiZXJyb3JcIiwgdGl0bGU6IFwiQ29ubmVjdGlvbiBFcnJvclwiLCBtc2c6IFwiVGhlcmUgd2FzIGFuIGVycm9yIGNvbm5lY3RpbmcgdG8gdGhlIGRhdGFiYXNlLlwiLCBzZXJ2ZXJNc2c6IGVyciB9KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICBjb25zb2xlLmxvZyhcIkVycm9yIC0gUG9wdWxhdGUgUFJGOiBcIiArIGVycik7XHJcbiAgICAgIHJlcy5zZW5kKHsgcmVzdWx0OiBcImVycm9yXCIsIHRpdGxlOiBcIkVycm9yXCIsIG1zZzogXCJUaGVyZSB3YXMgYW4gZXJyb3IgcG9wdWxhdGluZyBQUkYgd2l0aCBzdHVkZW50IGluZm8uXCIsIHNlcnZlck1zZzogZXJyIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbn1cclxuZXhwb3J0ID0gU3R1ZGVudENvbnRyb2xsZXI7XHJcbiJdfQ==
