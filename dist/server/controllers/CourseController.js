"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var AuthController = require("../controllers/AuthController");
var ActivityService = require("../services/ActivityService");
var sql = require('mssql');
var auth = ["Admin", "Staff", "Instructor"];
var config = require('../config');
var db = config.db;
var mail = config.mail;
var site_settings = config.site_settings;
var CourseController = /** @class */ (function () {
    function CourseController() {
    }
    // select
    CourseController.prototype.retrieve = function (req, res) {
        try {
            new AuthController().authUser(req, res, {
                requiredAuth: auth, done: function () {
                    sql.connect(db)
                        .then(function (connection) {
                        new sql.Request(connection)
                            .query("SELECT course.*,concat(concat(staff.firstName,' '),staff.lastName)[professorName],campusName FROM Course\n          left join users on users.userID=course.professorId\n          left join campus on campus.campusId = course.campusId\n          left join staff on staff.userID = course.professorId")
                            .then(function (recordset) {
                            res.send(recordset);
                        }).catch(function (err) {
                            console.log("Retrieve all course " + err);
                            res.send({ result: "error", title: "Error", msg: "There was an error retrieving all courses.", serverMsg: err });
                        });
                    }).catch(function (err) {
                        console.log("DB Connection error - Retrieve all courses: " + err);
                        res.send({ result: "error", title: "Connection Error", msg: "There was an error connecting to the database.", serverMsg: err });
                    });
                }
            });
        }
        catch (err) {
            console.log("Error - Retrieve all courses: " + err);
            res.send({ result: "error", title: "Error", msg: "There was an error retrieving all courses.", serverMsg: err });
        }
    };
    CourseController.prototype.getInstructorCourses = function (req, res) {
        try {
            new AuthController().authUser(req, res, {
                requiredAuth: auth, done: function () {
                    var _id = req.params._id;
                    sql.connect(db)
                        .then(function (connection) {
                        new sql.Request(connection)
                            .query("SELECT * FROM Course WHERE professorId = " + _id)
                            .then(function (recordset) {
                            res.send(recordset);
                        }).catch(function (err) {
                            console.log("Select instructors courses " + err);
                            res.send({ result: "error", title: "Error", msg: "There was an error retrieving all instructor courses.", serverMsg: err });
                        });
                    }).catch(function (err) {
                        console.log("DB Connection error - Get instructors courses: " + err);
                        res.send({ result: "error", title: "Connection Error", msg: "There was an error connecting to the database.", serverMsg: err });
                    });
                }
            });
        }
        catch (err) {
            console.log("Error - Get instructors courses: " + err);
            res.send({ result: "error", title: "Error", msg: "There was an error retrieving all instructor courses.", serverMsg: err });
        }
    };
    CourseController.prototype.delete = function (req, res) {
        try {
            new AuthController().authUser(req, res, {
                requiredAuth: auth, done: function () {
                    var _id = req.params._id;
                    sql.connect(db)
                        .then(function (connection) {
                        sql.query(templateObject_1 || (templateObject_1 = __makeTemplateObject(["DELETE FROM Course WHERE courseID = ", ""], ["DELETE FROM Course WHERE courseID = ", ""])), _id).then(function (result) {
                            new ActivityService().reportActivity('Course Deleted', 'success', _id, 'Course has been deleted.');
                            res.send({ result: "success", title: "Course Deleted", msg: "Course has been deleted successfully.", serverMsg: "" });
                        }).catch(function (err) {
                            console.log("Update course " + err);
                            res.send({ result: "error", title: "Error", msg: "There was an error deleting the course.", serverMsg: err });
                        });
                    }).catch(function (err) {
                        console.log("DB Connection error - Delete course: " + err);
                        res.send({ result: "error", title: "Connection Error", msg: "There was an error connecting to the database.", serverMsg: err });
                    });
                }
            });
        }
        catch (err) {
            console.log("Error - Delete course: " + err);
            res.send({ result: "error", title: "Error", msg: "There was an error deleting the course.", serverMsg: err });
        }
    };
    CourseController.prototype.update = function (req, res) {
        try {
            new AuthController().authUser(req, res, {
                requiredAuth: auth, done: function () {
                    var course = req.body;
                    var _id = req.params._id;
                    sql.connect(db)
                        .then(function (connection) {
                        sql.query(templateObject_2 || (templateObject_2 = __makeTemplateObject(["UPDATE Course SET courseName = ", ",courseType = ", ",professorId = ", ",\n          campusId = ", ",classroom = ", ",courseStart = ", ",\n          courseEnd = ", ",classTimeStr = ", " WHERE courseID = ", ""], ["UPDATE Course SET courseName = ", ",courseType = ", ",professorId = ", ",\n          campusId = ", ",classroom = ", ",courseStart = ", ",\n          courseEnd = ", ",classTimeStr = ", " WHERE courseID = ", ""])), course.courseName, course.courseType, course.professorId, course.campusId, course.classroom, course.courseStart, course.courseEnd, course.classTimeStr, _id).then(function (result) {
                            new ActivityService().reportActivity('Course Updated', 'success', _id, 'Course has been updated.');
                            res.send({ result: "success", title: "Course Updated!", msg: "Course has been updated successfully.", serverMsg: "" });
                        }).catch(function (err) {
                            console.log("Update course " + err);
                            res.send({ result: "error", title: "Error", msg: "There was an error updating the course.", serverMsg: err });
                        });
                    }).catch(function (err) {
                        console.log("DB Connection error - Update course: " + err);
                        res.send({ result: "error", title: "Connection Error", msg: "There was an error connecting to the database.", serverMsg: err });
                    });
                }
            });
        }
        catch (err) {
            console.log("Error - Update course: " + err);
            res.send({ result: "error", title: "Error", msg: "There was an error updating the course.", serverMsg: err });
        }
    };
    CourseController.prototype.findById = function (req, res) {
        try {
            new AuthController().authUser(req, res, {
                requiredAuth: auth, done: function () {
                    var _id = req.params._id;
                    sql.connect(db)
                        .then(function (connection) {
                        new sql.Request(connection)
                            .query("SELECT course.*,username[professorName],campusName FROM Course\n          left join users on users.userID=course.professorId\n          left join campus on campus.campusId = course.campusId\n          where courseId=" + _id)
                            .then(function (recordset) {
                            res.send(recordset);
                        }).catch(function (err) {
                            console.log("Error - Find course by id: " + err);
                            res.send({ result: "error", title: "Error", msg: "There was an error finding course by id.", serverMsg: err });
                        });
                    }).catch(function (err) {
                        console.log("DB Connection error - Find course by id: " + err);
                        res.send({ result: "error", title: "Connection Error", msg: "There was an error connecting to the database.", serverMsg: err });
                    });
                }
            });
        }
        catch (err) {
            console.log("Error - Find course by id: " + err);
            res.send({ result: "error", title: "Error", msg: "There was an error finding course by id.", serverMsg: err });
        }
    };
    // insert
    CourseController.prototype.create = function (req, res) {
        try {
            new AuthController().authUser(req, res, {
                requiredAuth: auth, done: function () {
                    // get course from req url
                    var course = req.body;
                    sql.connect(db)
                        .then(function () {
                        sql.query(templateObject_3 || (templateObject_3 = __makeTemplateObject(["INSERT INTO Course (courseName, professorId, campusId, classroom, classTimeStr,courseStart,courseEnd)\n        VALUES(", ", ", ", ", ", ", ", ", ", ", ",\n          ", ",", ")"], ["INSERT INTO Course (courseName, professorId, campusId, classroom, classTimeStr,courseStart,courseEnd)\n        VALUES(", ", ", ", ", ", ", ", ", ", ", ",\n          ", ",", ")"])), course.courseName, course.courseType, course.professorId, course.campusId, course.classroom, course.classTimeStr, course.courseStart, course.courseEnd).then(function (result) {
                            new ActivityService().reportActivity('Course Created', 'success', '', "Course name '" + course.courseName + "' has been successfully created.");
                            res.send({ result: "success", title: "Course Created!", msg: "Course has been created successfully.", serverMsg: "" });
                        }).catch(function (err) {
                            console.log("Error - Create course: " + err);
                            res.send({ result: "error", title: "Error", msg: "There was an error creating course.", serverMsg: err });
                        });
                    }).catch(function (err) {
                        console.log("DB Connection error - Create course: " + err);
                        res.send({ result: "error", title: "Connection Error", msg: "There was an error connecting to the database.", serverMsg: err });
                    });
                }
            });
        }
        catch (err) {
            console.log("Error - Create course: " + err);
            res.send({ result: "error", title: "Error", msg: "There was an error creating course.", serverMsg: err });
        }
    };
    CourseController.prototype.getCourseTypes = function (req, res) {
        try {
            new AuthController().authUser(req, res, {
                requiredAuth: auth, done: function () {
                    sql.connect(db)
                        .then(function (connection) {
                        new sql.Request(connection)
                            .query("SELECT * FROM CourseTypes")
                            .then(function (recordset) {
                            res.send(recordset);
                        }).catch(function (err) {
                            console.log("Error - Get course types: " + err);
                            res.send({ result: "error", title: "Error", msg: "There was an error retrieving course types.", serverMsg: err });
                        });
                    }).catch(function (err) {
                        console.log("DB Connection error - Get campuses: " + err);
                        res.send({ result: "error", title: "Connection Error", msg: "There was an error connecting to the database.", serverMsg: err });
                    });
                }
            });
        }
        catch (err) {
            console.log("Error - Get Course Types: " + err);
            res.send({ result: "error", title: "Error", msg: "There was an error retrieving course types.", serverMsg: err });
        }
    };
    CourseController.prototype.getCampuses = function (req, res) {
        try {
            new AuthController().authUser(req, res, {
                requiredAuth: auth, done: function () {
                    sql.connect(db)
                        .then(function (connection) {
                        new sql.Request(connection)
                            .query("SELECT * FROM Campus")
                            .then(function (recordset) {
                            res.send(recordset);
                        }).catch(function (err) {
                            console.log("Error - Get campuses: " + err);
                            res.send({ result: "error", title: "Error", msg: "There was an error retrieving campus list.", serverMsg: err });
                        });
                    }).catch(function (err) {
                        console.log("DB Connection error - Get campuses: " + err);
                        res.send({ result: "error", title: "Connection Error", msg: "There was an error connecting to the database.", serverMsg: err });
                    });
                }
            });
        }
        catch (err) {
            console.log("Error - Get Campuses: " + err);
            res.send({ result: "error", title: "Error", msg: "There was an error retrieving campus list.", serverMsg: err });
        }
    };
    CourseController.prototype.getInstructors = function (req, res) {
        try {
            new AuthController().authUser(req, res, {
                requiredAuth: auth, done: function () {
                    sql.connect(db)
                        .then(function (connection) {
                        new sql.Request(connection)
                            .query("SELECT users.*,concat(concat(staff.firstName,' '),staff.lastName)[professorName] FROM users\n          left join  staff on staff.userID = users.userID\n          where userType LIKE '%instructor%'")
                            .then(function (recordset) {
                            res.send(recordset);
                        }).catch(function (err) {
                            console.log("Error - Get Instructors: " + err);
                            res.send({ result: "error", title: "Error", msg: "There was an error retrieving all instructors.", serverMsg: err });
                        });
                    }).catch(function (err) {
                        console.log("DB Connection error - Get instructors: " + err);
                        res.send({ result: "error", title: "Connection Error", msg: "There was an error connecting to the database.", serverMsg: err });
                    });
                }
            });
        }
        catch (err) {
            console.log("Error - Get Instructors: " + err);
            res.send({ result: "error", title: "Error", msg: "There was an error retrieving all instructors.", serverMsg: err });
        }
    };
    CourseController.prototype.getWaitList = function (req, res) {
        try {
            new AuthController().authUser(req, res, {
                requiredAuth: auth, done: function () {
                    sql.connect(db)
                        .then(function (connection) {
                        new sql.Request(connection)
                            .query("SELECT * FROM WaitList")
                            .then(function (recordset) {
                            res.send(recordset);
                        }).catch(function (err) {
                            console.log("Error - Get wait list: " + err);
                            res.send({ result: "error", title: "Error", msg: "There was an error retrieving wait list information.", serverMsg: err });
                        });
                    }).catch(function (err) {
                        console.log("DB Connection error - Get instructors: " + err);
                        res.send({ result: "error", title: "Connection Error", msg: "There was an error connecting to the database.", serverMsg: err });
                    });
                }
            });
        }
        catch (err) {
            console.log("Error - Get wait list: " + err);
            res.send({ result: "error", title: "Error", msg: "There was an error retrieving wait list information.", serverMsg: err });
        }
    };
    CourseController.prototype.getWaitListById = function (req, res) {
        try {
            new AuthController().authUser(req, res, {
                requiredAuth: auth, done: function () {
                    var _id = req.params._id;
                    sql.connect(db)
                        .then(function (connection) {
                        new sql.Request(connection)
                            .query("SELECT * FROM WaitList WHERE userID = " + _id)
                            .then(function (result) {
                            res.send(result);
                        }).catch(function (err) {
                            console.log("Error - Get wait list: " + err);
                            res.send({ result: "error", title: "Error", msg: "There was an error retrieving wait list information.", serverMsg: err });
                        });
                    }).catch(function (err) {
                        console.log("DB Connection error - Get instructors: " + err);
                        res.send({ result: "error", title: "Connection Error", msg: "There was an error connecting to the database.", serverMsg: err });
                    });
                }
            });
        }
        catch (err) {
            console.log("Error - Get wait list: " + err);
            res.send({ result: "error", title: "Error", msg: "There was an error retrieving wait list information.", serverMsg: err });
        }
    };
    CourseController.prototype.addToWaitList = function (req, res) {
        try {
            new AuthController().authUser(req, res, {
                requiredAuth: auth, done: function () {
                    // get course from req url
                    var course = req.body;
                    var userID = course.userID;
                    var courseType = course.courseType;
                    var date = course.date;
                    sql.connect(db)
                        .then(function (connection) {
                        new sql.Request(connection)
                            .query("INSERT INTO WaitList (courseType, userID, date) VALUES ('" + courseType + "', '" + userID + "', '" + date + "')")
                            .then(function (result) {
                            new ActivityService().reportActivity('Course Wait List', 'success', userID, 'User has been added to the course wait list.');
                            res.send({ result: "success", title: "Success!", msg: "User has been added to the wait list.", serverMsg: "" });
                        }).catch(function (err) {
                            console.log("Error - Add to wait list: " + err);
                            res.send({ result: "error", title: "Error", msg: "There was an error while adding student to the wait list.", serverMsg: err });
                        });
                    }).catch(function (err) {
                        console.log("DB Connection error - Create course: " + err);
                        res.send({ result: "error", title: "Connection Error", msg: "There was an error connecting to the database.", serverMsg: err });
                    });
                }
            });
        }
        catch (err) {
            console.log("Error - Add to wait list: " + err);
            res.send({ result: "error", title: "Error", msg: "There was an error while adding student to the wait list.", serverMsg: err });
        }
    };
    return CourseController;
}());
var templateObject_1, templateObject_2, templateObject_3;
module.exports = CourseController;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NlcnZlci9zcmMvY29udHJvbGxlcnMvQ291cnNlQ29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUdBLDhEQUFpRTtBQUNqRSxJQUFNLGVBQWUsR0FBRyxPQUFPLENBQUMsNkJBQTZCLENBQUMsQ0FBQztBQUMvRCxJQUFNLEdBQUcsR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDN0IsSUFBSSxJQUFJLEdBQUcsQ0FBQyxPQUFPLEVBQUUsT0FBTyxFQUFFLFlBQVksQ0FBQyxDQUFDO0FBQzVDLElBQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQztBQUNwQyxJQUFNLEVBQUUsR0FBRyxNQUFNLENBQUMsRUFBRSxDQUFDO0FBQ3JCLElBQU0sSUFBSSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUM7QUFDekIsSUFBTSxhQUFhLEdBQUcsTUFBTSxDQUFDLGFBQWEsQ0FBQztBQUUzQztJQUFBO0lBeVhBLENBQUM7SUF2WEMsU0FBUztJQUNULG1DQUFRLEdBQVIsVUFBUyxHQUFvQixFQUFFLEdBQXFCO1FBQ2xELElBQUk7WUFDRixJQUFJLGNBQWMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFO2dCQUN0QyxZQUFZLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRTtvQkFFeEIsR0FBRyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUM7eUJBQ1osSUFBSSxDQUFDLFVBQVMsVUFBVTt3QkFDdkIsSUFBSSxHQUFHLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQzs2QkFDeEIsS0FBSyxDQUFDLHlTQUd3QyxDQUFDOzZCQUMvQyxJQUFJLENBQUMsVUFBUyxTQUFTOzRCQUN0QixHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO3dCQUN0QixDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsVUFBUyxHQUFHOzRCQUNuQixPQUFPLENBQUMsR0FBRyxDQUFDLHNCQUFzQixHQUFH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SyxDQUFDLFVBQVMsR0FBRzs0QkFDbkIsT0FBTyxDQUFDLEdBQUcsQ0FBQyw0QkFBNEIsR0FBRyxHQUFHLENBQUMsQ0FBQzs0QkFDaEQsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxHQUFHLEVBQUUsMkRBQTJELEVBQUUsU0FBUyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUM7d0JBQ2xJLENBQUMsQ0FBQyxDQUFDO29CQUNQLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxVQUFTLEdBQUc7d0JBQ25CLE9BQU8sQ0FBQyxHQUFHLENBQUMsdUNBQXVDLEdBQUcsR0FBRyxDQUFDLENBQUM7d0JBQzNELEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxrQkFBa0IsRUFBRSxHQUFHLEVBQUUsZ0RBQWdELEVBQUUsU0FBUyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUM7b0JBQ2xJLENBQUMsQ0FBQyxDQUFDO2dCQUVQLENBQUM7YUFDRixDQUFDLENBQUM7U0FDSjtRQUFDLE9BQU8sR0FBRyxFQUFFO1lBQ1osT0FBTyxDQUFDLEdBQUcsQ0FBQyw0QkFBNEIsR0FBRyxHQUFHLENBQUMsQ0FBQztZQUNoRCxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLEdBQUcsRUFBRSwyREFBMkQsRUFBRSxTQUFTLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQztTQUNqSTtJQUNILENBQUM7SUFFSCx1QkFBQztBQUFELENBelhBLEFBeVhDLElBQUE7O0FBRUQsaUJBQVMsZ0JBQWdCLENBQUMiLCJmaWxlIjoiY29udHJvbGxlcnMvQ291cnNlQ29udHJvbGxlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBleHByZXNzID0gcmVxdWlyZShcImV4cHJlc3NcIik7XHJcbmltcG9ydCBqd3QgPSByZXF1aXJlKCdqc29ud2VidG9rZW4nKTtcclxuaW1wb3J0IGJjcnlwdCA9IHJlcXVpcmUoJ2JjcnlwdCcpO1xyXG5pbXBvcnQgQXV0aENvbnRyb2xsZXIgPSByZXF1aXJlKFwiLi4vY29udHJvbGxlcnMvQXV0aENvbnRyb2xsZXJcIik7XHJcbmNvbnN0IEFjdGl2aXR5U2VydmljZSA9IHJlcXVpcmUoXCIuLi9zZXJ2aWNlcy9BY3Rpdml0eVNlcnZpY2VcIik7XHJcbmNvbnN0IHNxbCA9IHJlcXVpcmUoJ21zc3FsJyk7XHJcbnZhciBhdXRoID0gW1wiQWRtaW5cIiwgXCJTdGFmZlwiLCBcIkluc3RydWN0b3JcIl07XHJcbmNvbnN0IGNvbmZpZyA9IHJlcXVpcmUoJy4uL2NvbmZpZycpO1xyXG5jb25zdCBkYiA9IGNvbmZpZy5kYjtcclxuY29uc3QgbWFpbCA9IGNvbmZpZy5tYWlsO1xyXG5jb25zdCBzaXRlX3NldHRpbmdzID0gY29uZmlnLnNpdGVfc2V0dGluZ3M7XHJcblxyXG5jbGFzcyBDb3Vyc2VDb250cm9sbGVyIHtcclxuXHJcbiAgLy8gc2VsZWN0XHJcbiAgcmV0cmlldmUocmVxOiBleHByZXNzLlJlcXVlc3QsIHJlczogZXhwcmVzcy5SZXNwb25zZSk6IHZvaWQge1xyXG4gICAgdHJ5IHtcclxuICAgICAgbmV3IEF1dGhDb250cm9sbGVyKCkuYXV0aFVzZXIocmVxLCByZXMsIHtcclxuICAgICAgICByZXF1aXJlZEF1dGg6IGF1dGgsIGRvbmU6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgIHNxbC5jb25uZWN0KGRiKVxyXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbihjb25uZWN0aW9uKSB7XHJcbiAgICAgICAgICAgICAgbmV3IHNxbC5SZXF1ZXN0KGNvbm5lY3Rpb24pXHJcbiAgICAgICAgICAgICAgICAucXVlcnkoYFNFTEVDVCBjb3Vyc2UuKixjb25jYXQoY29uY2F0KHN0YWZmLmZpcnN0TmFtZSwnICcpLHN0YWZmLmxhc3ROYW1lKVtwcm9mZXNzb3JOYW1lXSxjYW1wdXNOYW1lIEZST00gQ291cnNlXHJcbiAgICAgICAgICBsZWZ0IGpvaW4gdXNlcnMgb24gdXNlcnMudXNlcklEPWNvdXJzZS5wcm9mZXNzb3JJZFxyXG4gICAgICAgICAgbGVmdCBqb2luIGNhbXB1cyBvbiBjYW1wdXMuY2FtcHVzSWQgPSBjb3Vyc2UuY2FtcHVzSWRcclxuICAgICAgICAgIGxlZnQgam9pbiBzdGFmZiBvbiBzdGFmZi51c2VySUQgPSBjb3Vyc2UucHJvZmVzc29ySWRgKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24ocmVjb3Jkc2V0KSB7XHJcbiAgICAgICAgICAgICAgICAgIHJlcy5zZW5kKHJlY29yZHNldCk7XHJcbiAgICAgICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbihlcnIpIHtcclxuICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJSZXRyaWV2ZSBhbGwgY291cnNlIFwiICsgZXJyKTtcclxuICAgICAgICAgICAgICAgICAgcmVzLnNlbmQoeyByZXN1bHQ6IFwiZXJyb3JcIiwgdGl0bGU6IFwiRXJyb3JcIiwgbXNnOiBcIlRoZXJlIHdhcyBhbiBlcnJvciByZXRyaWV2aW5nIGFsbCBjb3Vyc2VzLlwiLCBzZXJ2ZXJNc2c6IGVyciB9KTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbihlcnIpIHtcclxuICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkRCIENvbm5lY3Rpb24gZXJyb3IgLSBSZXRyaWV2ZSBhbGwgY291cnNlczogXCIgKyBlcnIpO1xyXG4gICAgICAgICAgICAgIHJlcy5zZW5kKHsgcmVzdWx0OiBcImVycm9yXCIsIHRpdGxlOiBcIkNvbm5lY3Rpb24gRXJyb3JcIiwgbXNnOiBcIlRoZXJlIHdhcyBhbiBlcnJvciBjb25uZWN0aW5nIHRvIHRoZSBkYXRhYmFzZS5cIiwgc2VydmVyTXNnOiBlcnIgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3IgLSBSZXRyaWV2ZSBhbGwgY291cnNlczogXCIgKyBlcnIpO1xyXG4gICAgICByZXMuc2VuZCh7IHJlc3VsdDogXCJlcnJvclwiLCB0aXRsZTogXCJFcnJvclwiLCBtc2c6IFwiVGhlcmUgd2FzIGFuIGVycm9yIHJldHJpZXZpbmcgYWxsIGNvdXJzZXMuXCIsIHNlcnZlck1zZzogZXJyIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZ2V0SW5zdHJ1Y3RvckNvdXJzZXMocmVxOiBleHByZXNzLlJlcXVlc3QsIHJlczogZXhwcmVzcy5SZXNwb25zZSk6IHZvaWQge1xyXG4gICAgdHJ5IHtcclxuICAgICAgbmV3IEF1dGhDb250cm9sbGVyKCkuYXV0aFVzZXIocmVxLCByZXMsIHtcclxuICAgICAgICByZXF1aXJlZEF1dGg6IGF1dGgsIGRvbmU6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgIHZhciBfaWQ6IHN0cmluZyA9IHJlcS5wYXJhbXMuX2lkO1xyXG5cclxuICAgICAgICAgIHNxbC5jb25uZWN0KGRiKVxyXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbihjb25uZWN0aW9uKSB7XHJcbiAgICAgICAgICAgICAgbmV3IHNxbC5SZXF1ZXN0KGNvbm5lY3Rpb24pXHJcbiAgICAgICAgICAgICAgICAucXVlcnkoYFNFTEVDVCAqIEZST00gQ291cnNlIFdIRVJFIHByb2Zlc3NvcklkID0gJHtfaWR9YClcclxuICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKHJlY29yZHNldCkge1xyXG4gICAgICAgICAgICAgICAgICByZXMuc2VuZChyZWNvcmRzZXQpO1xyXG4gICAgICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiU2VsZWN0IGluc3RydWN0b3JzIGNvdXJzZXMgXCIgKyBlcnIpO1xyXG4gICAgICAgICAgICAgICAgICByZXMuc2VuZCh7IHJlc3VsdDogXCJlcnJvclwiLCB0aXRsZTogXCJFcnJvclwiLCBtc2c6IFwiVGhlcmUgd2FzIGFuIGVycm9yIHJldHJpZXZpbmcgYWxsIGluc3RydWN0b3IgY291cnNlcy5cIiwgc2VydmVyTXNnOiBlcnIgfSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XHJcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJEQiBDb25uZWN0aW9uIGVycm9yIC0gR2V0IGluc3RydWN0b3JzIGNvdXJzZXM6IFwiICsgZXJyKTtcclxuICAgICAgICAgICAgICByZXMuc2VuZCh7IHJlc3VsdDogXCJlcnJvclwiLCB0aXRsZTogXCJDb25uZWN0aW9uIEVycm9yXCIsIG1zZzogXCJUaGVyZSB3YXMgYW4gZXJyb3IgY29ubmVjdGluZyB0byB0aGUgZGF0YWJhc2UuXCIsIHNlcnZlck1zZzogZXJyIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICBjb25zb2xlLmxvZyhcIkVycm9yIC0gR2V0IGluc3RydWN0b3JzIGNvdXJzZXM6IFwiICsgZXJyKTtcclxuICAgICAgcmVzLnNlbmQoeyByZXN1bHQ6IFwiZXJyb3JcIiwgdGl0bGU6IFwiRXJyb3JcIiwgbXNnOiBcIlRoZXJlIHdhcyBhbiBlcnJvciByZXRyaWV2aW5nIGFsbCBpbnN0cnVjdG9yIGNvdXJzZXMuXCIsIHNlcnZlck1zZzogZXJyIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZGVsZXRlKHJlcTogZXhwcmVzcy5SZXF1ZXN0LCByZXM6IGV4cHJlc3MuUmVzcG9uc2UpOiB2b2lkIHtcclxuICAgIHRyeSB7XHJcbiAgICAgIG5ldyBBdXRoQ29udHJvbGxlcigpLmF1dGhVc2VyKHJlcSwgcmVzLCB7XHJcbiAgICAgICAgcmVxdWlyZWRBdXRoOiBhdXRoLCBkb25lOiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICB2YXIgX2lkOiBzdHJpbmcgPSByZXEucGFyYW1zLl9pZDtcclxuXHJcbiAgICAgICAgICBzcWwuY29ubmVjdChkYilcclxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24oY29ubmVjdGlvbikge1xyXG4gICAgICAgICAgICAgIHNxbC5xdWVyeVxyXG4gICAgICAgICAgICAgICAgYERFTEVURSBGUk9NIENvdXJzZSBXSEVSRSBjb3Vyc2VJRCA9ICR7X2lkfWBcclxuICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgICBuZXcgQWN0aXZpdHlTZXJ2aWNlKCkucmVwb3J0QWN0aXZpdHkoJ0NvdXJzZSBEZWxldGVkJywgJ3N1Y2Nlc3MnLCBfaWQsICdDb3Vyc2UgaGFzIGJlZW4gZGVsZXRlZC4nKTtcclxuICAgICAgICAgICAgICAgICAgcmVzLnNlbmQoeyByZXN1bHQ6IFwic3VjY2Vzc1wiLCB0aXRsZTogXCJDb3Vyc2UgRGVsZXRlZFwiLCBtc2c6IFwiQ291cnNlIGhhcyBiZWVuIGRlbGV0ZWQgc3VjY2Vzc2Z1bGx5LlwiLCBzZXJ2ZXJNc2c6IFwiXCIgfSk7XHJcbiAgICAgICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbihlcnIpIHtcclxuICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJVcGRhdGUgY291cnNlIFwiICsgZXJyKTtcclxuICAgICAgICAgICAgICAgICAgcmVzLnNlbmQoeyByZXN1bHQ6IFwiZXJyb3JcIiwgdGl0bGU6IFwiRXJyb3JcIiwgbXNnOiBcIlRoZXJlIHdhcyBhbiBlcnJvciBkZWxldGluZyB0aGUgY291cnNlLlwiLCBzZXJ2ZXJNc2c6IGVyciB9KTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbihlcnIpIHtcclxuICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkRCIENvbm5lY3Rpb24gZXJyb3IgLSBEZWxldGUgY291cnNlOiBcIiArIGVycik7XHJcbiAgICAgICAgICAgICAgcmVzLnNlbmQoeyByZXN1bHQ6IFwiZXJyb3JcIiwgdGl0bGU6IFwiQ29ubmVjdGlvbiBFcnJvclwiLCBtc2c6IFwiVGhlcmUgd2FzIGFuIGVycm9yIGNvbm5lY3RpbmcgdG8gdGhlIGRhdGFiYXNlLlwiLCBzZXJ2ZXJNc2c6IGVyciB9KTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgY29uc29sZS5sb2coXCJFcnJvciAtIERlbGV0ZSBjb3Vyc2U6IFwiICsgZXJyKTtcclxuICAgICAgcmVzLnNlbmQoeyByZXN1bHQ6IFwiZXJyb3JcIiwgdGl0bGU6IFwiRXJyb3JcIiwgbXNnOiBcIlRoZXJlIHdhcyBhbiBlcnJvciBkZWxldGluZyB0aGUgY291cnNlLlwiLCBzZXJ2ZXJNc2c6IGVyciB9KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHVwZGF0ZShyZXE6IGV4cHJlc3MuUmVxdWVzdCwgcmVzOiBleHByZXNzLlJlc3BvbnNlKTogdm9pZCB7XHJcbiAgICB0cnkge1xyXG4gICAgICBuZXcgQXV0aENvbnRyb2xsZXIoKS5hdXRoVXNlcihyZXEsIHJlcywge1xyXG4gICAgICAgIHJlcXVpcmVkQXV0aDogYXV0aCwgZG9uZTogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgdmFyIGNvdXJzZSA9IHJlcS5ib2R5O1xyXG4gICAgICAgICAgdmFyIF9pZDogc3RyaW5nID0gcmVxLnBhcmFtcy5faWQ7XHJcblxyXG4gICAgICAgICAgc3FsLmNvbm5lY3QoZGIpXHJcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKGNvbm5lY3Rpb24pIHtcclxuICAgICAgICAgICAgICBzcWwucXVlcnlcclxuICAgICAgICAgICAgICAgIGBVUERBVEUgQ291cnNlIFNFVCBjb3Vyc2VOYW1lID0gJHtjb3Vyc2UuY291cnNlTmFtZX0sY291cnNlVHlwZSA9ICR7Y291cnNlLmNvdXJzZVR5cGV9LHByb2Zlc3NvcklkID0gJHtjb3Vyc2UucHJvZmVzc29ySWR9LFxyXG4gICAgICAgICAgY2FtcHVzSWQgPSAke2NvdXJzZS5jYW1wdXNJZH0sY2xhc3Nyb29tID0gJHtjb3Vyc2UuY2xhc3Nyb29tfSxjb3Vyc2VTdGFydCA9ICR7Y291cnNlLmNvdXJzZVN0YXJ0fSxcclxuICAgICAgICAgIGNvdXJzZUVuZCA9ICR7Y291cnNlLmNvdXJzZUVuZH0sY2xhc3NUaW1lU3RyID0gJHtjb3Vyc2UuY2xhc3NUaW1lU3RyfSBXSEVSRSBjb3Vyc2VJRCA9ICR7X2lkfWBcclxuICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgICBuZXcgQWN0aXZpdHlTZXJ2aWNlKCkucmVwb3J0QWN0aXZpdHkoJ0NvdXJzZSBVcGRhdGVkJywgJ3N1Y2Nlc3MnLCBfaWQsICdDb3Vyc2UgaGFzIGJlZW4gdXBkYXRlZC4nKTtcclxuICAgICAgICAgICAgICAgICAgcmVzLnNlbmQoeyByZXN1bHQ6IFwic3VjY2Vzc1wiLCB0aXRsZTogXCJDb3Vyc2UgVXBkYXRlZCFcIiwgbXNnOiBcIkNvdXJzZSBoYXMgYmVlbiB1cGRhdGVkIHN1Y2Nlc3NmdWxseS5cIiwgc2VydmVyTXNnOiBcIlwiIH0pO1xyXG4gICAgICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiVXBkYXRlIGNvdXJzZSBcIiArIGVycik7XHJcbiAgICAgICAgICAgICAgICAgIHJlcy5zZW5kKHsgcmVzdWx0OiBcImVycm9yXCIsIHRpdGxlOiBcIkVycm9yXCIsIG1zZzogXCJUaGVyZSB3YXMgYW4gZXJyb3IgdXBkYXRpbmcgdGhlIGNvdXJzZS5cIiwgc2VydmVyTXNnOiBlcnIgfSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XHJcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJEQiBDb25uZWN0aW9uIGVycm9yIC0gVXBkYXRlIGNvdXJzZTogXCIgKyBlcnIpO1xyXG4gICAgICAgICAgICAgIHJlcy5zZW5kKHsgcmVzdWx0OiBcImVycm9yXCIsIHRpdGxlOiBcIkNvbm5lY3Rpb24gRXJyb3JcIiwgbXNnOiBcIlRoZXJlIHdhcyBhbiBlcnJvciBjb25uZWN0aW5nIHRvIHRoZSBkYXRhYmFzZS5cIiwgc2VydmVyTXNnOiBlcnIgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3IgLSBVcGRhdGUgY291cnNlOiBcIiArIGVycik7XHJcbiAgICAgIHJlcy5zZW5kKHsgcmVzdWx0OiBcImVycm9yXCIsIHRpdGxlOiBcIkVycm9yXCIsIG1zZzogXCJUaGVyZSB3YXMgYW4gZXJyb3IgdXBkYXRpbmcgdGhlIGNvdXJzZS5cIiwgc2VydmVyTXNnOiBlcnIgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBmaW5kQnlJZChyZXE6IGV4cHJlc3MuUmVxdWVzdCwgcmVzOiBleHByZXNzLlJlc3BvbnNlKTogdm9pZCB7XHJcbiAgICB0cnkge1xyXG4gICAgICBuZXcgQXV0aENvbnRyb2xsZXIoKS5hdXRoVXNlcihyZXEsIHJlcywge1xyXG4gICAgICAgIHJlcXVpcmVkQXV0aDogYXV0aCwgZG9uZTogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgdmFyIF9pZDogc3RyaW5nID0gcmVxLnBhcmFtcy5faWQ7XHJcblxyXG4gICAgICAgICAgc3FsLmNvbm5lY3QoZGIpXHJcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKGNvbm5lY3Rpb24pIHtcclxuICAgICAgICAgICAgICBuZXcgc3FsLlJlcXVlc3QoY29ubmVjdGlvbilcclxuICAgICAgICAgICAgICAucXVlcnkoYFNFTEVDVCBjb3Vyc2UuKix1c2VybmFtZVtwcm9mZXNzb3JOYW1lXSxjYW1wdXNOYW1lIEZST00gQ291cnNlXHJcbiAgICAgICAgICBsZWZ0IGpvaW4gdXNlcnMgb24gdXNlcnMudXNlcklEPWNvdXJzZS5wcm9mZXNzb3JJZFxyXG4gICAgICAgICAgbGVmdCBqb2luIGNhbXB1cyBvbiBjYW1wdXMuY2FtcHVzSWQgPSBjb3Vyc2UuY2FtcHVzSWRcclxuICAgICAgICAgIHdoZXJlIGNvdXJzZUlkPSR7X2lkfWApXHJcbiAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbihyZWNvcmRzZXQpIHtcclxuICAgICAgICAgICAgICAgICAgcmVzLnNlbmQocmVjb3Jkc2V0KTtcclxuICAgICAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGVycikge1xyXG4gICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yIC0gRmluZCBjb3Vyc2UgYnkgaWQ6IFwiICsgZXJyKTtcclxuICAgICAgICAgICAgICAgICAgcmVzLnNlbmQoeyByZXN1bHQ6IFwiZXJyb3JcIiwgdGl0bGU6IFwiRXJyb3JcIiwgbXNnOiBcIlRoZXJlIHdhcyBhbiBlcnJvciBmaW5kaW5nIGNvdXJzZSBieSBpZC5cIiwgc2VydmVyTXNnOiBlcnIgfSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XHJcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJEQiBDb25uZWN0aW9uIGVycm9yIC0gRmluZCBjb3Vyc2UgYnkgaWQ6IFwiICsgZXJyKTtcclxuICAgICAgICAgICAgICByZXMuc2VuZCh7IHJlc3VsdDogXCJlcnJvclwiLCB0aXRsZTogXCJDb25uZWN0aW9uIEVycm9yXCIsIG1zZzogXCJUaGVyZSB3YXMgYW4gZXJyb3IgY29ubmVjdGluZyB0byB0aGUgZGF0YWJhc2UuXCIsIHNlcnZlck1zZzogZXJyIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICBjb25zb2xlLmxvZyhcIkVycm9yIC0gRmluZCBjb3Vyc2UgYnkgaWQ6IFwiICsgZXJyKTtcclxuICAgICAgcmVzLnNlbmQoeyByZXN1bHQ6IFwiZXJyb3JcIiwgdGl0bGU6IFwiRXJyb3JcIiwgbXNnOiBcIlRoZXJlIHdhcyBhbiBlcnJvciBmaW5kaW5nIGNvdXJzZSBieSBpZC5cIiwgc2VydmVyTXNnOiBlcnIgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvLyBpbnNlcnRcclxuICBjcmVhdGUocmVxOiBleHByZXNzLlJlcXVlc3QsIHJlczogZXhwcmVzcy5SZXNwb25zZSk6IHZvaWQge1xyXG4gICAgdHJ5IHtcclxuICAgICAgbmV3IEF1dGhDb250cm9sbGVyKCkuYXV0aFVzZXIocmVxLCByZXMsIHtcclxuICAgICAgICByZXF1aXJlZEF1dGg6IGF1dGgsIGRvbmU6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgIC8vIGdldCBjb3Vyc2UgZnJvbSByZXEgdXJsXHJcbiAgICAgICAgICB2YXIgY291cnNlID0gcmVxLmJvZHk7XHJcblxyXG4gICAgICAgICAgc3FsLmNvbm5lY3QoZGIpXHJcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgIHNxbC5xdWVyeVxyXG4gICAgICAgICAgICAgICAgYElOU0VSVCBJTlRPIENvdXJzZSAoY291cnNlTmFtZSwgcHJvZmVzc29ySWQsIGNhbXB1c0lkLCBjbGFzc3Jvb20sIGNsYXNzVGltZVN0cixjb3Vyc2VTdGFydCxjb3Vyc2VFbmQpXHJcbiAgICAgICAgVkFMVUVTKCR7Y291cnNlLmNvdXJzZU5hbWV9LCAke2NvdXJzZS5jb3Vyc2VUeXBlfSwgJHtjb3Vyc2UucHJvZmVzc29ySWR9LCAke2NvdXJzZS5jYW1wdXNJZH0sICR7Y291cnNlLmNsYXNzcm9vbX0sICR7Y291cnNlLmNsYXNzVGltZVN0cn0sXHJcbiAgICAgICAgICAke2NvdXJzZS5jb3Vyc2VTdGFydH0sJHtjb3Vyc2UuY291cnNlRW5kfSlgXHJcbiAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgICAgbmV3IEFjdGl2aXR5U2VydmljZSgpLnJlcG9ydEFjdGl2aXR5KCdDb3Vyc2UgQ3JlYXRlZCcsICdzdWNjZXNzJywgJycsIFwiQ291cnNlIG5hbWUgJ1wiICsgY291cnNlLmNvdXJzZU5hbWUgKyBcIicgaGFzIGJlZW4gc3VjY2Vzc2Z1bGx5IGNyZWF0ZWQuXCIgKTtcclxuICAgICAgICAgICAgICAgICAgcmVzLnNlbmQoeyByZXN1bHQ6IFwic3VjY2Vzc1wiLCB0aXRsZTogXCJDb3Vyc2UgQ3JlYXRlZCFcIiwgbXNnOiBcIkNvdXJzZSBoYXMgYmVlbiBjcmVhdGVkIHN1Y2Nlc3NmdWxseS5cIiwgc2VydmVyTXNnOiBcIlwiIH0pO1xyXG4gICAgICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3IgLSBDcmVhdGUgY291cnNlOiBcIiArIGVycik7XHJcbiAgICAgICAgICAgICAgICAgIHJlcy5zZW5kKHsgcmVzdWx0OiBcImVycm9yXCIsIHRpdGxlOiBcIkVycm9yXCIsIG1zZzogXCJUaGVyZSB3YXMgYW4gZXJyb3IgY3JlYXRpbmcgY291cnNlLlwiLCBzZXJ2ZXJNc2c6IGVyciB9KTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbihlcnIpIHtcclxuICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkRCIENvbm5lY3Rpb24gZXJyb3IgLSBDcmVhdGUgY291cnNlOiBcIiArIGVycik7XHJcbiAgICAgICAgICAgICAgcmVzLnNlbmQoeyByZXN1bHQ6IFwiZXJyb3JcIiwgdGl0bGU6IFwiQ29ubmVjdGlvbiBFcnJvclwiLCBtc2c6IFwiVGhlcmUgd2FzIGFuIGVycm9yIGNvbm5lY3RpbmcgdG8gdGhlIGRhdGFiYXNlLlwiLCBzZXJ2ZXJNc2c6IGVyciB9KTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgY29uc29sZS5sb2coXCJFcnJvciAtIENyZWF0ZSBjb3Vyc2U6IFwiICsgZXJyKTtcclxuICAgICAgcmVzLnNlbmQoeyByZXN1bHQ6IFwiZXJyb3JcIiwgdGl0bGU6IFwiRXJyb3JcIiwgbXNnOiBcIlRoZXJlIHdhcyBhbiBlcnJvciBjcmVhdGluZyBjb3Vyc2UuXCIsIHNlcnZlck1zZzogZXJyIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZ2V0Q291cnNlVHlwZXMocmVxOiBleHByZXNzLlJlcXVlc3QsIHJlczogZXhwcmVzcy5SZXNwb25zZSk6IHZvaWQge1xyXG4gICAgdHJ5IHtcclxuXHJcbiAgICAgIG5ldyBBdXRoQ29udHJvbGxlcigpLmF1dGhVc2VyKHJlcSwgcmVzLCB7XHJcbiAgICAgICAgcmVxdWlyZWRBdXRoOiBhdXRoLCBkb25lOiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICBzcWwuY29ubmVjdChkYilcclxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24oY29ubmVjdGlvbikge1xyXG4gICAgICAgICAgICAgIG5ldyBzcWwuUmVxdWVzdChjb25uZWN0aW9uKVxyXG4gICAgICAgICAgICAgICAgLnF1ZXJ5KGBTRUxFQ1QgKiBGUk9NIENvdXJzZVR5cGVzYClcclxuICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKHJlY29yZHNldCkge1xyXG4gICAgICAgICAgICAgICAgICByZXMuc2VuZChyZWNvcmRzZXQpO1xyXG4gICAgICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3IgLSBHZXQgY291cnNlIHR5cGVzOiBcIiArIGVycik7XHJcbiAgICAgICAgICAgICAgICAgIHJlcy5zZW5kKHsgcmVzdWx0OiBcImVycm9yXCIsIHRpdGxlOiBcIkVycm9yXCIsIG1zZzogXCJUaGVyZSB3YXMgYW4gZXJyb3IgcmV0cmlldmluZyBjb3Vyc2UgdHlwZXMuXCIsIHNlcnZlck1zZzogZXJyIH0pO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGVycikge1xyXG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiREIgQ29ubmVjdGlvbiBlcnJvciAtIEdldCBjYW1wdXNlczogXCIgKyBlcnIpO1xyXG4gICAgICAgICAgICAgIHJlcy5zZW5kKHsgcmVzdWx0OiBcImVycm9yXCIsIHRpdGxlOiBcIkNvbm5lY3Rpb24gRXJyb3JcIiwgbXNnOiBcIlRoZXJlIHdhcyBhbiBlcnJvciBjb25uZWN0aW5nIHRvIHRoZSBkYXRhYmFzZS5cIiwgc2VydmVyTXNnOiBlcnIgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3IgLSBHZXQgQ291cnNlIFR5cGVzOiBcIiArIGVycik7XHJcbiAgICAgIHJlcy5zZW5kKHsgcmVzdWx0OiBcImVycm9yXCIsIHRpdGxlOiBcIkVycm9yXCIsIG1zZzogXCJUaGVyZSB3YXMgYW4gZXJyb3IgcmV0cmlldmluZyBjb3Vyc2UgdHlwZXMuXCIsIHNlcnZlck1zZzogZXJyIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZ2V0Q2FtcHVzZXMocmVxOiBleHByZXNzLlJlcXVlc3QsIHJlczogZXhwcmVzcy5SZXNwb25zZSk6IHZvaWQge1xyXG4gICAgdHJ5IHtcclxuXHJcbiAgICAgIG5ldyBBdXRoQ29udHJvbGxlcigpLmF1dGhVc2VyKHJlcSwgcmVzLCB7XHJcbiAgICAgICAgcmVxdWlyZWRBdXRoOiBhdXRoLCBkb25lOiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICBzcWwuY29ubmVjdChkYilcclxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24oY29ubmVjdGlvbikge1xyXG4gICAgICAgICAgICAgIG5ldyBzcWwuUmVxdWVzdChjb25uZWN0aW9uKVxyXG4gICAgICAgICAgICAgICAgLnF1ZXJ5KGBTRUxFQ1QgKiBGUk9NIENhbXB1c2ApXHJcbiAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbihyZWNvcmRzZXQpIHtcclxuICAgICAgICAgICAgICAgICAgcmVzLnNlbmQocmVjb3Jkc2V0KTtcclxuICAgICAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGVycikge1xyXG4gICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yIC0gR2V0IGNhbXB1c2VzOiBcIiArIGVycik7XHJcbiAgICAgICAgICAgICAgICAgIHJlcy5zZW5kKHsgcmVzdWx0OiBcImVycm9yXCIsIHRpdGxlOiBcIkVycm9yXCIsIG1zZzogXCJUaGVyZSB3YXMgYW4gZXJyb3IgcmV0cmlldmluZyBjYW1wdXMgbGlzdC5cIiwgc2VydmVyTXNnOiBlcnIgfSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XHJcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJEQiBDb25uZWN0aW9uIGVycm9yIC0gR2V0IGNhbXB1c2VzOiBcIiArIGVycik7XHJcbiAgICAgICAgICAgICAgcmVzLnNlbmQoeyByZXN1bHQ6IFwiZXJyb3JcIiwgdGl0bGU6IFwiQ29ubmVjdGlvbiBFcnJvclwiLCBtc2c6IFwiVGhlcmUgd2FzIGFuIGVycm9yIGNvbm5lY3RpbmcgdG8gdGhlIGRhdGFiYXNlLlwiLCBzZXJ2ZXJNc2c6IGVyciB9KTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgY29uc29sZS5sb2coXCJFcnJvciAtIEdldCBDYW1wdXNlczogXCIgKyBlcnIpO1xyXG4gICAgICByZXMuc2VuZCh7IHJlc3VsdDogXCJlcnJvclwiLCB0aXRsZTogXCJFcnJvclwiLCBtc2c6IFwiVGhlcmUgd2FzIGFuIGVycm9yIHJldHJpZXZpbmcgY2FtcHVzIGxpc3QuXCIsIHNlcnZlck1zZzogZXJyIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZ2V0SW5zdHJ1Y3RvcnMocmVxOiBleHByZXNzLlJlcXVlc3QsIHJlczogZXhwcmVzcy5SZXNwb25zZSk6IHZvaWQge1xyXG4gICAgdHJ5IHtcclxuICAgICAgbmV3IEF1dGhDb250cm9sbGVyKCkuYXV0aFVzZXIocmVxLCByZXMsIHtcclxuICAgICAgICByZXF1aXJlZEF1dGg6IGF1dGgsIGRvbmU6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgIHNxbC5jb25uZWN0KGRiKVxyXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbihjb25uZWN0aW9uKSB7XHJcbiAgICAgICAgICAgICAgbmV3IHNxbC5SZXF1ZXN0KGNvbm5lY3Rpb24pXHJcbiAgICAgICAgICAgICAgICAucXVlcnkoYFNFTEVDVCB1c2Vycy4qLGNvbmNhdChjb25jYXQoc3RhZmYuZmlyc3ROYW1lLCcgJyksc3RhZmYubGFzdE5hbWUpW3Byb2Zlc3Nvck5hbWVdIEZST00gdXNlcnNcclxuICAgICAgICAgIGxlZnQgam9pbiAgc3RhZmYgb24gc3RhZmYudXNlcklEID0gdXNlcnMudXNlcklEXHJcbiAgICAgICAgICB3aGVyZSB1c2VyVHlwZSBMSUtFICclaW5zdHJ1Y3RvciUnYClcclxuICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKHJlY29yZHNldCkge1xyXG4gICAgICAgICAgICAgICAgICByZXMuc2VuZChyZWNvcmRzZXQpO1xyXG4gICAgICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3IgLSBHZXQgSW5zdHJ1Y3RvcnM6IFwiICsgZXJyKTtcclxuICAgICAgICAgICAgICAgICAgcmVzLnNlbmQoeyByZXN1bHQ6IFwiZXJyb3JcIiwgdGl0bGU6IFwiRXJyb3JcIiwgbXNnOiBcIlRoZXJlIHdhcyBhbiBlcnJvciByZXRyaWV2aW5nIGFsbCBpbnN0cnVjdG9ycy5cIiwgc2VydmVyTXNnOiBlcnIgfSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XHJcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJEQiBDb25uZWN0aW9uIGVycm9yIC0gR2V0IGluc3RydWN0b3JzOiBcIiArIGVycik7XHJcbiAgICAgICAgICAgICAgcmVzLnNlbmQoeyByZXN1bHQ6IFwiZXJyb3JcIiwgdGl0bGU6IFwiQ29ubmVjdGlvbiBFcnJvclwiLCBtc2c6IFwiVGhlcmUgd2FzIGFuIGVycm9yIGNvbm5lY3RpbmcgdG8gdGhlIGRhdGFiYXNlLlwiLCBzZXJ2ZXJNc2c6IGVyciB9KTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgY29uc29sZS5sb2coXCJFcnJvciAtIEdldCBJbnN0cnVjdG9yczogXCIgKyBlcnIpO1xyXG4gICAgICByZXMuc2VuZCh7IHJlc3VsdDogXCJlcnJvclwiLCB0aXRsZTogXCJFcnJvclwiLCBtc2c6IFwiVGhlcmUgd2FzIGFuIGVycm9yIHJldHJpZXZpbmcgYWxsIGluc3RydWN0b3JzLlwiLCBzZXJ2ZXJNc2c6IGVyciB9KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGdldFdhaXRMaXN0KHJlcTogZXhwcmVzcy5SZXF1ZXN0LCByZXM6IGV4cHJlc3MuUmVzcG9uc2UpOiB2b2lkIHtcclxuICAgIHRyeSB7XHJcbiAgICAgIG5ldyBBdXRoQ29udHJvbGxlcigpLmF1dGhVc2VyKHJlcSwgcmVzLCB7XHJcbiAgICAgICAgcmVxdWlyZWRBdXRoOiBhdXRoLCBkb25lOiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICBzcWwuY29ubmVjdChkYilcclxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24oY29ubmVjdGlvbikge1xyXG4gICAgICAgICAgICAgIG5ldyBzcWwuUmVxdWVzdChjb25uZWN0aW9uKVxyXG4gICAgICAgICAgICAgICAgLnF1ZXJ5KGBTRUxFQ1QgKiBGUk9NIFdhaXRMaXN0YClcclxuICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKHJlY29yZHNldCkge1xyXG4gICAgICAgICAgICAgICAgICByZXMuc2VuZChyZWNvcmRzZXQpO1xyXG4gICAgICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3IgLSBHZXQgd2FpdCBsaXN0OiBcIiArIGVycik7XHJcbiAgICAgICAgICAgICAgICAgIHJlcy5zZW5kKHsgcmVzdWx0OiBcImVycm9yXCIsIHRpdGxlOiBcIkVycm9yXCIsIG1zZzogXCJUaGVyZSB3YXMgYW4gZXJyb3IgcmV0cmlldmluZyB3YWl0IGxpc3QgaW5mb3JtYXRpb24uXCIsIHNlcnZlck1zZzogZXJyIH0pO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGVycikge1xyXG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiREIgQ29ubmVjdGlvbiBlcnJvciAtIEdldCBpbnN0cnVjdG9yczogXCIgKyBlcnIpO1xyXG4gICAgICAgICAgICAgIHJlcy5zZW5kKHsgcmVzdWx0OiBcImVycm9yXCIsIHRpdGxlOiBcIkNvbm5lY3Rpb24gRXJyb3JcIiwgbXNnOiBcIlRoZXJlIHdhcyBhbiBlcnJvciBjb25uZWN0aW5nIHRvIHRoZSBkYXRhYmFzZS5cIiwgc2VydmVyTXNnOiBlcnIgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3IgLSBHZXQgd2FpdCBsaXN0OiBcIiArIGVycik7XHJcbiAgICAgIHJlcy5zZW5kKHsgcmVzdWx0OiBcImVycm9yXCIsIHRpdGxlOiBcIkVycm9yXCIsIG1zZzogXCJUaGVyZSB3YXMgYW4gZXJyb3IgcmV0cmlldmluZyB3YWl0IGxpc3QgaW5mb3JtYXRpb24uXCIsIHNlcnZlck1zZzogZXJyIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZ2V0V2FpdExpc3RCeUlkKHJlcTogZXhwcmVzcy5SZXF1ZXN0LCByZXM6IGV4cHJlc3MuUmVzcG9uc2UpOiB2b2lkIHtcclxuICAgIHRyeSB7XHJcbiAgICAgIG5ldyBBdXRoQ29udHJvbGxlcigpLmF1dGhVc2VyKHJlcSwgcmVzLCB7XHJcbiAgICAgICAgcmVxdWlyZWRBdXRoOiBhdXRoLCBkb25lOiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICB2YXIgX2lkOiBzdHJpbmcgPSByZXEucGFyYW1zLl9pZDtcclxuXHJcbiAgICAgICAgICBzcWwuY29ubmVjdChkYilcclxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24oY29ubmVjdGlvbikge1xyXG4gICAgICAgICAgICAgIG5ldyBzcWwuUmVxdWVzdChjb25uZWN0aW9uKVxyXG4gICAgICAgICAgICAgICAgLnF1ZXJ5KGBTRUxFQ1QgKiBGUk9NIFdhaXRMaXN0IFdIRVJFIHVzZXJJRCA9ICR7X2lkfWApXHJcbiAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgICAgcmVzLnNlbmQocmVzdWx0KTtcclxuICAgICAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGVycikge1xyXG4gICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yIC0gR2V0IHdhaXQgbGlzdDogXCIgKyBlcnIpO1xyXG4gICAgICAgICAgICAgICAgICByZXMuc2VuZCh7IHJlc3VsdDogXCJlcnJvclwiLCB0aXRsZTogXCJFcnJvclwiLCBtc2c6IFwiVGhlcmUgd2FzIGFuIGVycm9yIHJldHJpZXZpbmcgd2FpdCBsaXN0IGluZm9ybWF0aW9uLlwiLCBzZXJ2ZXJNc2c6IGVyciB9KTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbihlcnIpIHtcclxuICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkRCIENvbm5lY3Rpb24gZXJyb3IgLSBHZXQgaW5zdHJ1Y3RvcnM6IFwiICsgZXJyKTtcclxuICAgICAgICAgICAgICByZXMuc2VuZCh7IHJlc3VsdDogXCJlcnJvclwiLCB0aXRsZTogXCJDb25uZWN0aW9uIEVycm9yXCIsIG1zZzogXCJUaGVyZSB3YXMgYW4gZXJyb3IgY29ubmVjdGluZyB0byB0aGUgZGF0YWJhc2UuXCIsIHNlcnZlck1zZzogZXJyIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICBjb25zb2xlLmxvZyhcIkVycm9yIC0gR2V0IHdhaXQgbGlzdDogXCIgKyBlcnIpO1xyXG4gICAgICByZXMuc2VuZCh7IHJlc3VsdDogXCJlcnJvclwiLCB0aXRsZTogXCJFcnJvclwiLCBtc2c6IFwiVGhlcmUgd2FzIGFuIGVycm9yIHJldHJpZXZpbmcgd2FpdCBsaXN0IGluZm9ybWF0aW9uLlwiLCBzZXJ2ZXJNc2c6IGVyciB9KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGFkZFRvV2FpdExpc3QocmVxOiBleHByZXNzLlJlcXVlc3QsIHJlczogZXhwcmVzcy5SZXNwb25zZSk6IHZvaWQge1xyXG4gICAgdHJ5IHtcclxuICAgICAgbmV3IEF1dGhDb250cm9sbGVyKCkuYXV0aFVzZXIocmVxLCByZXMsIHtcclxuICAgICAgICByZXF1aXJlZEF1dGg6IGF1dGgsIGRvbmU6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgIC8vIGdldCBjb3Vyc2UgZnJvbSByZXEgdXJsXHJcbiAgICAgICAgICB2YXIgY291cnNlID0gcmVxLmJvZHk7XHJcbiAgICAgICAgICB2YXIgdXNlcklEID0gY291cnNlLnVzZXJJRDtcclxuICAgICAgICAgIHZhciBjb3Vyc2VUeXBlID0gY291cnNlLmNvdXJzZVR5cGU7XHJcbiAgICAgICAgICB2YXIgZGF0ZSA9IGNvdXJzZS5kYXRlO1xyXG4gICAgICAgICAgc3FsLmNvbm5lY3QoZGIpXHJcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKGNvbm5lY3Rpb24pIHtcclxuICAgICAgICAgICAgICBuZXcgc3FsLlJlcXVlc3QoY29ubmVjdGlvbilcclxuICAgICAgICAgICAgICAgIC5xdWVyeShcIklOU0VSVCBJTlRPIFdhaXRMaXN0IChjb3Vyc2VUeXBlLCB1c2VySUQsIGRhdGUpIFZBTFVFUyAoJ1wiICsgY291cnNlVHlwZSArIFwiJywgJ1wiICsgdXNlcklEICsgXCInLCAnXCIgKyBkYXRlICsgXCInKVwiKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICAgIG5ldyBBY3Rpdml0eVNlcnZpY2UoKS5yZXBvcnRBY3Rpdml0eSgnQ291cnNlIFdhaXQgTGlzdCcsICdzdWNjZXNzJywgdXNlcklELCAnVXNlciBoYXMgYmVlbiBhZGRlZCB0byB0aGUgY291cnNlIHdhaXQgbGlzdC4nKTtcclxuICAgICAgICAgICAgICAgICAgcmVzLnNlbmQoeyByZXN1bHQ6IFwic3VjY2Vzc1wiLCB0aXRsZTogXCJTdWNjZXNzIVwiLCBtc2c6IFwiVXNlciBoYXMgYmVlbiBhZGRlZCB0byB0aGUgd2FpdCBsaXN0LlwiLCBzZXJ2ZXJNc2c6IFwiXCIgfSk7XHJcbiAgICAgICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbihlcnIpIHtcclxuICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJFcnJvciAtIEFkZCB0byB3YWl0IGxpc3Q6IFwiICsgZXJyKTtcclxuICAgICAgICAgICAgICAgICAgcmVzLnNlbmQoeyByZXN1bHQ6IFwiZXJyb3JcIiwgdGl0bGU6IFwiRXJyb3JcIiwgbXNnOiBcIlRoZXJlIHdhcyBhbiBlcnJvciB3aGlsZSBhZGRpbmcgc3R1ZGVudCB0byB0aGUgd2FpdCBsaXN0LlwiLCBzZXJ2ZXJNc2c6IGVyciB9KTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbihlcnIpIHtcclxuICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkRCIENvbm5lY3Rpb24gZXJyb3IgLSBDcmVhdGUgY291cnNlOiBcIiArIGVycik7XHJcbiAgICAgICAgICAgICAgcmVzLnNlbmQoeyByZXN1bHQ6IFwiZXJyb3JcIiwgdGl0bGU6IFwiQ29ubmVjdGlvbiBFcnJvclwiLCBtc2c6IFwiVGhlcmUgd2FzIGFuIGVycm9yIGNvbm5lY3RpbmcgdG8gdGhlIGRhdGFiYXNlLlwiLCBzZXJ2ZXJNc2c6IGVyciB9KTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgY29uc29sZS5sb2coXCJFcnJvciAtIEFkZCB0byB3YWl0IGxpc3Q6IFwiICsgZXJyKTtcclxuICAgICAgcmVzLnNlbmQoeyByZXN1bHQ6IFwiZXJyb3JcIiwgdGl0bGU6IFwiRXJyb3JcIiwgbXNnOiBcIlRoZXJlIHdhcyBhbiBlcnJvciB3aGlsZSBhZGRpbmcgc3R1ZGVudCB0byB0aGUgd2FpdCBsaXN0LlwiLCBzZXJ2ZXJNc2c6IGVyciB9KTtcclxuICAgIH1cclxuICB9XHJcblxyXG59XHJcblxyXG5leHBvcnQgPSBDb3Vyc2VDb250cm9sbGVyO1xyXG4iXX0=
