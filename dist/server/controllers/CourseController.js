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
                        new sql.Request(connection);
                        sql.query(templateObject_1 || (templateObject_1 = __makeTemplateObject(["SELECT * FROM Course WHERE professorId = ", ""], ["SELECT * FROM Course WHERE professorId = ", ""])), _id).then(function (recordset) {
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
                        sql.query(templateObject_2 || (templateObject_2 = __makeTemplateObject(["DELETE FROM Course WHERE courseID = ", ""], ["DELETE FROM Course WHERE courseID = ", ""])), _id).then(function (result) {
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
                        sql.query(templateObject_3 || (templateObject_3 = __makeTemplateObject(["UPDATE Course SET courseName = ", ",courseType = ", ",professorId = ", ",\n          campusId = ", ",classroom = ", ",courseStart = ", ",\n          courseEnd = ", ",classTimeStr = ", " WHERE courseID = ", ""], ["UPDATE Course SET courseName = ", ",courseType = ", ",professorId = ", ",\n          campusId = ", ",classroom = ", ",courseStart = ", ",\n          courseEnd = ", ",classTimeStr = ", " WHERE courseID = ", ""])), course.courseName, course.courseType, course.professorId, course.campusId, course.classroom, course.courseStart, course.courseEnd, course.classTimeStr, _id).then(function (result) {
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
                        sql.query(templateObject_4 || (templateObject_4 = __makeTemplateObject(["INSERT INTO Course (courseName, professorId, campusId, classroom, classTimeStr,courseStart,courseEnd)\n        VALUES(", ", ", ", ", ", ", ", ", ", ", ",\n          ", ",", ")"], ["INSERT INTO Course (courseName, professorId, campusId, classroom, classTimeStr,courseStart,courseEnd)\n        VALUES(", ", ", ", ", ", ", ", ", ", ", ",\n          ", ",", ")"])), course.courseName, course.courseType, course.professorId, course.campusId, course.classroom, course.classTimeStr, course.courseStart, course.courseEnd).then(function (result) {
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
var templateObject_1, templateObject_2, templateObject_3, templateObject_4;
module.exports = CourseController;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NlcnZlci9zcmMvY29udHJvbGxlcnMvQ291cnNlQ29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUdBLDhEQUFpRTtBQUNqRSxJQUFNLGVBQWUsR0FBRyxPQUFPLENBQUMsNkJBQTZCLENBQUMsQ0FBQztBQUMvRCxJQUFNLEdBQUcsR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDN0IsSUFBSSxJQUFJLEdBQUcsQ0FBQyxPQUFPLEVBQUUsT0FBTyxFQUFFLFlBQVksQ0FBQyxDQUFDO0FBQzVDLElBQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQztBQUNwQyxJQUFNLEVBQUUsR0FBRyxNQUFNLENBQUMsRUFBRSxDQUFDO0FBQ3JCLElBQU0sSUFBSSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUM7QUFDekIsSUFBTSxhQUFhLEdBQUcsTUFBTSxDQUFDLGFBQWEsQ0FBQztBQUUzQztJQUFBO0lBMFhBLENBQUM7SUF4WEMsU0FBUztJQUNULG1DQUFRLEdBQVIsVUFBUyxHQUFvQixFQUFFLEdBQXFCO1FBQ2xELElBQUk7WUFDRixJQUFJLGNBQWMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFO2dCQUN0QyxZQUFZLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRTtvQkFFeEIsR0FBRyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUM7eUJBQ1osSUFBSSxDQUFDLFVBQVMsVUFBVTt3QkFDdkIsSUFBSSxHQUFHLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQzs2QkFDeEIsS0FBSyxDQUFDLHlTQUd3QyxDQUFDOzZCQUMvQyxJQUFJLENBQUMsVUFBUyxTQUFTOzRCQUN0QixHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO3dCQUN0QixDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsVUFBUyxHQUFHOzRCQUNuQixPQUFPLENBQUMsR0FBRyxDQUFDLHNCQUFzQixHQUFH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d0JBQ2xILENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxVQUFTLEdBQUc7NEJBQ25CLE9BQU8sQ0FBQyxHQUFHLENBQUMsNEJBQTRCLEdBQUcsR0FBRyxDQUFDLENBQUM7NEJBQ2hELEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsR0FBRyxFQUFFLDJEQUEyRCxFQUFFLFNBQVMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDO3dCQUNsSSxDQUFDLENBQUMsQ0FBQztvQkFDUCxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsVUFBUyxHQUFHO3dCQUNuQixPQUFPLENBQUMsR0FBRyxDQUFDLHVDQUF1QyxHQUFHLEdBQUcsQ0FBQyxDQUFDO3dCQUMzRCxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsa0JBQWtCLEVBQUUsR0FBRyxFQUFFLGdEQUFnRCxFQUFFLFNBQVMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDO29CQUNsSSxDQUFDLENBQUMsQ0FBQztnQkFFUCxDQUFDO2FBQ0YsQ0FBQyxDQUFDO1NBQ0o7UUFBQyxPQUFPLEdBQUcsRUFBRTtZQUNaLE9BQU8sQ0FBQyxHQUFHLENBQUMsNEJBQTRCLEdBQUcsR0FBRyxDQUFDLENBQUM7WUFDaEQsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxHQUFHLEVBQUUsMkRBQTJELEVBQUUsU0FBUyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUM7U0FDakk7SUFDSCxDQUFDO0lBRUgsdUJBQUM7QUFBRCxDQTFYQSxBQTBYQyxJQUFBOztBQUVELGlCQUFTLGdCQUFnQixDQUFDIiwiZmlsZSI6ImNvbnRyb2xsZXJzL0NvdXJzZUNvbnRyb2xsZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgZXhwcmVzcyA9IHJlcXVpcmUoXCJleHByZXNzXCIpO1xyXG5pbXBvcnQgand0ID0gcmVxdWlyZSgnanNvbndlYnRva2VuJyk7XHJcbmltcG9ydCBiY3J5cHQgPSByZXF1aXJlKCdiY3J5cHQnKTtcclxuaW1wb3J0IEF1dGhDb250cm9sbGVyID0gcmVxdWlyZShcIi4uL2NvbnRyb2xsZXJzL0F1dGhDb250cm9sbGVyXCIpO1xyXG5jb25zdCBBY3Rpdml0eVNlcnZpY2UgPSByZXF1aXJlKFwiLi4vc2VydmljZXMvQWN0aXZpdHlTZXJ2aWNlXCIpO1xyXG5jb25zdCBzcWwgPSByZXF1aXJlKCdtc3NxbCcpO1xyXG52YXIgYXV0aCA9IFtcIkFkbWluXCIsIFwiU3RhZmZcIiwgXCJJbnN0cnVjdG9yXCJdO1xyXG5jb25zdCBjb25maWcgPSByZXF1aXJlKCcuLi9jb25maWcnKTtcclxuY29uc3QgZGIgPSBjb25maWcuZGI7XHJcbmNvbnN0IG1haWwgPSBjb25maWcubWFpbDtcclxuY29uc3Qgc2l0ZV9zZXR0aW5ncyA9IGNvbmZpZy5zaXRlX3NldHRpbmdzO1xyXG5cclxuY2xhc3MgQ291cnNlQ29udHJvbGxlciB7XHJcblxyXG4gIC8vIHNlbGVjdFxyXG4gIHJldHJpZXZlKHJlcTogZXhwcmVzcy5SZXF1ZXN0LCByZXM6IGV4cHJlc3MuUmVzcG9uc2UpOiB2b2lkIHtcclxuICAgIHRyeSB7XHJcbiAgICAgIG5ldyBBdXRoQ29udHJvbGxlcigpLmF1dGhVc2VyKHJlcSwgcmVzLCB7XHJcbiAgICAgICAgcmVxdWlyZWRBdXRoOiBhdXRoLCBkb25lOiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICBzcWwuY29ubmVjdChkYilcclxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24oY29ubmVjdGlvbikge1xyXG4gICAgICAgICAgICAgIG5ldyBzcWwuUmVxdWVzdChjb25uZWN0aW9uKVxyXG4gICAgICAgICAgICAgICAgLnF1ZXJ5KGBTRUxFQ1QgY291cnNlLiosY29uY2F0KGNvbmNhdChzdGFmZi5maXJzdE5hbWUsJyAnKSxzdGFmZi5sYXN0TmFtZSlbcHJvZmVzc29yTmFtZV0sY2FtcHVzTmFtZSBGUk9NIENvdXJzZVxyXG4gICAgICAgICAgbGVmdCBqb2luIHVzZXJzIG9uIHVzZXJzLnVzZXJJRD1jb3Vyc2UucHJvZmVzc29ySWRcclxuICAgICAgICAgIGxlZnQgam9pbiBjYW1wdXMgb24gY2FtcHVzLmNhbXB1c0lkID0gY291cnNlLmNhbXB1c0lkXHJcbiAgICAgICAgICBsZWZ0IGpvaW4gc3RhZmYgb24gc3RhZmYudXNlcklEID0gY291cnNlLnByb2Zlc3NvcklkYClcclxuICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKHJlY29yZHNldCkge1xyXG4gICAgICAgICAgICAgICAgICByZXMuc2VuZChyZWNvcmRzZXQpO1xyXG4gICAgICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiUmV0cmlldmUgYWxsIGNvdXJzZSBcIiArIGVycik7XHJcbiAgICAgICAgICAgICAgICAgIHJlcy5zZW5kKHsgcmVzdWx0OiBcImVycm9yXCIsIHRpdGxlOiBcIkVycm9yXCIsIG1zZzogXCJUaGVyZSB3YXMgYW4gZXJyb3IgcmV0cmlldmluZyBhbGwgY291cnNlcy5cIiwgc2VydmVyTXNnOiBlcnIgfSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XHJcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJEQiBDb25uZWN0aW9uIGVycm9yIC0gUmV0cmlldmUgYWxsIGNvdXJzZXM6IFwiICsgZXJyKTtcclxuICAgICAgICAgICAgICByZXMuc2VuZCh7IHJlc3VsdDogXCJlcnJvclwiLCB0aXRsZTogXCJDb25uZWN0aW9uIEVycm9yXCIsIG1zZzogXCJUaGVyZSB3YXMgYW4gZXJyb3IgY29ubmVjdGluZyB0byB0aGUgZGF0YWJhc2UuXCIsIHNlcnZlck1zZzogZXJyIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICBjb25zb2xlLmxvZyhcIkVycm9yIC0gUmV0cmlldmUgYWxsIGNvdXJzZXM6IFwiICsgZXJyKTtcclxuICAgICAgcmVzLnNlbmQoeyByZXN1bHQ6IFwiZXJyb3JcIiwgdGl0bGU6IFwiRXJyb3JcIiwgbXNnOiBcIlRoZXJlIHdhcyBhbiBlcnJvciByZXRyaWV2aW5nIGFsbCBjb3Vyc2VzLlwiLCBzZXJ2ZXJNc2c6IGVyciB9KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGdldEluc3RydWN0b3JDb3Vyc2VzKHJlcTogZXhwcmVzcy5SZXF1ZXN0LCByZXM6IGV4cHJlc3MuUmVzcG9uc2UpOiB2b2lkIHtcclxuICAgIHRyeSB7XHJcbiAgICAgIG5ldyBBdXRoQ29udHJvbGxlcigpLmF1dGhVc2VyKHJlcSwgcmVzLCB7XHJcbiAgICAgICAgcmVxdWlyZWRBdXRoOiBhdXRoLCBkb25lOiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICB2YXIgX2lkOiBzdHJpbmcgPSByZXEucGFyYW1zLl9pZDtcclxuXHJcbiAgICAgICAgICBzcWwuY29ubmVjdChkYilcclxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24oY29ubmVjdGlvbikge1xyXG4gICAgICAgICAgICAgIG5ldyBzcWwuUmVxdWVzdChjb25uZWN0aW9uKVxyXG4gICAgICAgICAgICAgIHNxbC5xdWVyeVxyXG4gICAgICAgICAgICAgICAgYFNFTEVDVCAqIEZST00gQ291cnNlIFdIRVJFIHByb2Zlc3NvcklkID0gJHtfaWR9YFxyXG4gICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24ocmVjb3Jkc2V0KSB7XHJcbiAgICAgICAgICAgICAgICAgIHJlcy5zZW5kKHJlY29yZHNldCk7XHJcbiAgICAgICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbihlcnIpIHtcclxuICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJTZWxlY3QgaW5zdHJ1Y3RvcnMgY291cnNlcyBcIiArIGVycik7XHJcbiAgICAgICAgICAgICAgICAgIHJlcy5zZW5kKHsgcmVzdWx0OiBcImVycm9yXCIsIHRpdGxlOiBcIkVycm9yXCIsIG1zZzogXCJUaGVyZSB3YXMgYW4gZXJyb3IgcmV0cmlldmluZyBhbGwgaW5zdHJ1Y3RvciBjb3Vyc2VzLlwiLCBzZXJ2ZXJNc2c6IGVyciB9KTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbihlcnIpIHtcclxuICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkRCIENvbm5lY3Rpb24gZXJyb3IgLSBHZXQgaW5zdHJ1Y3RvcnMgY291cnNlczogXCIgKyBlcnIpO1xyXG4gICAgICAgICAgICAgIHJlcy5zZW5kKHsgcmVzdWx0OiBcImVycm9yXCIsIHRpdGxlOiBcIkNvbm5lY3Rpb24gRXJyb3JcIiwgbXNnOiBcIlRoZXJlIHdhcyBhbiBlcnJvciBjb25uZWN0aW5nIHRvIHRoZSBkYXRhYmFzZS5cIiwgc2VydmVyTXNnOiBlcnIgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3IgLSBHZXQgaW5zdHJ1Y3RvcnMgY291cnNlczogXCIgKyBlcnIpO1xyXG4gICAgICByZXMuc2VuZCh7IHJlc3VsdDogXCJlcnJvclwiLCB0aXRsZTogXCJFcnJvclwiLCBtc2c6IFwiVGhlcmUgd2FzIGFuIGVycm9yIHJldHJpZXZpbmcgYWxsIGluc3RydWN0b3IgY291cnNlcy5cIiwgc2VydmVyTXNnOiBlcnIgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBkZWxldGUocmVxOiBleHByZXNzLlJlcXVlc3QsIHJlczogZXhwcmVzcy5SZXNwb25zZSk6IHZvaWQge1xyXG4gICAgdHJ5IHtcclxuICAgICAgbmV3IEF1dGhDb250cm9sbGVyKCkuYXV0aFVzZXIocmVxLCByZXMsIHtcclxuICAgICAgICByZXF1aXJlZEF1dGg6IGF1dGgsIGRvbmU6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgIHZhciBfaWQ6IHN0cmluZyA9IHJlcS5wYXJhbXMuX2lkO1xyXG5cclxuICAgICAgICAgIHNxbC5jb25uZWN0KGRiKVxyXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbihjb25uZWN0aW9uKSB7XHJcbiAgICAgICAgICAgICAgc3FsLnF1ZXJ5XHJcbiAgICAgICAgICAgICAgICBgREVMRVRFIEZST00gQ291cnNlIFdIRVJFIGNvdXJzZUlEID0gJHtfaWR9YFxyXG4gICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICAgIG5ldyBBY3Rpdml0eVNlcnZpY2UoKS5yZXBvcnRBY3Rpdml0eSgnQ291cnNlIERlbGV0ZWQnLCAnc3VjY2VzcycsIF9pZCwgJ0NvdXJzZSBoYXMgYmVlbiBkZWxldGVkLicpO1xyXG4gICAgICAgICAgICAgICAgICByZXMuc2VuZCh7IHJlc3VsdDogXCJzdWNjZXNzXCIsIHRpdGxlOiBcIkNvdXJzZSBEZWxldGVkXCIsIG1zZzogXCJDb3Vyc2UgaGFzIGJlZW4gZGVsZXRlZCBzdWNjZXNzZnVsbHkuXCIsIHNlcnZlck1zZzogXCJcIiB9KTtcclxuICAgICAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGVycikge1xyXG4gICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlVwZGF0ZSBjb3Vyc2UgXCIgKyBlcnIpO1xyXG4gICAgICAgICAgICAgICAgICByZXMuc2VuZCh7IHJlc3VsdDogXCJlcnJvclwiLCB0aXRsZTogXCJFcnJvclwiLCBtc2c6IFwiVGhlcmUgd2FzIGFuIGVycm9yIGRlbGV0aW5nIHRoZSBjb3Vyc2UuXCIsIHNlcnZlck1zZzogZXJyIH0pO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGVycikge1xyXG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiREIgQ29ubmVjdGlvbiBlcnJvciAtIERlbGV0ZSBjb3Vyc2U6IFwiICsgZXJyKTtcclxuICAgICAgICAgICAgICByZXMuc2VuZCh7IHJlc3VsdDogXCJlcnJvclwiLCB0aXRsZTogXCJDb25uZWN0aW9uIEVycm9yXCIsIG1zZzogXCJUaGVyZSB3YXMgYW4gZXJyb3IgY29ubmVjdGluZyB0byB0aGUgZGF0YWJhc2UuXCIsIHNlcnZlck1zZzogZXJyIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICBjb25zb2xlLmxvZyhcIkVycm9yIC0gRGVsZXRlIGNvdXJzZTogXCIgKyBlcnIpO1xyXG4gICAgICByZXMuc2VuZCh7IHJlc3VsdDogXCJlcnJvclwiLCB0aXRsZTogXCJFcnJvclwiLCBtc2c6IFwiVGhlcmUgd2FzIGFuIGVycm9yIGRlbGV0aW5nIHRoZSBjb3Vyc2UuXCIsIHNlcnZlck1zZzogZXJyIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgdXBkYXRlKHJlcTogZXhwcmVzcy5SZXF1ZXN0LCByZXM6IGV4cHJlc3MuUmVzcG9uc2UpOiB2b2lkIHtcclxuICAgIHRyeSB7XHJcbiAgICAgIG5ldyBBdXRoQ29udHJvbGxlcigpLmF1dGhVc2VyKHJlcSwgcmVzLCB7XHJcbiAgICAgICAgcmVxdWlyZWRBdXRoOiBhdXRoLCBkb25lOiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICB2YXIgY291cnNlID0gcmVxLmJvZHk7XHJcbiAgICAgICAgICB2YXIgX2lkOiBzdHJpbmcgPSByZXEucGFyYW1zLl9pZDtcclxuXHJcbiAgICAgICAgICBzcWwuY29ubmVjdChkYilcclxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24oY29ubmVjdGlvbikge1xyXG4gICAgICAgICAgICAgIHNxbC5xdWVyeVxyXG4gICAgICAgICAgICAgICAgYFVQREFURSBDb3Vyc2UgU0VUIGNvdXJzZU5hbWUgPSAke2NvdXJzZS5jb3Vyc2VOYW1lfSxjb3Vyc2VUeXBlID0gJHtjb3Vyc2UuY291cnNlVHlwZX0scHJvZmVzc29ySWQgPSAke2NvdXJzZS5wcm9mZXNzb3JJZH0sXHJcbiAgICAgICAgICBjYW1wdXNJZCA9ICR7Y291cnNlLmNhbXB1c0lkfSxjbGFzc3Jvb20gPSAke2NvdXJzZS5jbGFzc3Jvb219LGNvdXJzZVN0YXJ0ID0gJHtjb3Vyc2UuY291cnNlU3RhcnR9LFxyXG4gICAgICAgICAgY291cnNlRW5kID0gJHtjb3Vyc2UuY291cnNlRW5kfSxjbGFzc1RpbWVTdHIgPSAke2NvdXJzZS5jbGFzc1RpbWVTdHJ9IFdIRVJFIGNvdXJzZUlEID0gJHtfaWR9YFxyXG4gICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICAgIG5ldyBBY3Rpdml0eVNlcnZpY2UoKS5yZXBvcnRBY3Rpdml0eSgnQ291cnNlIFVwZGF0ZWQnLCAnc3VjY2VzcycsIF9pZCwgJ0NvdXJzZSBoYXMgYmVlbiB1cGRhdGVkLicpO1xyXG4gICAgICAgICAgICAgICAgICByZXMuc2VuZCh7IHJlc3VsdDogXCJzdWNjZXNzXCIsIHRpdGxlOiBcIkNvdXJzZSBVcGRhdGVkIVwiLCBtc2c6IFwiQ291cnNlIGhhcyBiZWVuIHVwZGF0ZWQgc3VjY2Vzc2Z1bGx5LlwiLCBzZXJ2ZXJNc2c6IFwiXCIgfSk7XHJcbiAgICAgICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbihlcnIpIHtcclxuICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJVcGRhdGUgY291cnNlIFwiICsgZXJyKTtcclxuICAgICAgICAgICAgICAgICAgcmVzLnNlbmQoeyByZXN1bHQ6IFwiZXJyb3JcIiwgdGl0bGU6IFwiRXJyb3JcIiwgbXNnOiBcIlRoZXJlIHdhcyBhbiBlcnJvciB1cGRhdGluZyB0aGUgY291cnNlLlwiLCBzZXJ2ZXJNc2c6IGVyciB9KTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbihlcnIpIHtcclxuICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkRCIENvbm5lY3Rpb24gZXJyb3IgLSBVcGRhdGUgY291cnNlOiBcIiArIGVycik7XHJcbiAgICAgICAgICAgICAgcmVzLnNlbmQoeyByZXN1bHQ6IFwiZXJyb3JcIiwgdGl0bGU6IFwiQ29ubmVjdGlvbiBFcnJvclwiLCBtc2c6IFwiVGhlcmUgd2FzIGFuIGVycm9yIGNvbm5lY3RpbmcgdG8gdGhlIGRhdGFiYXNlLlwiLCBzZXJ2ZXJNc2c6IGVyciB9KTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgY29uc29sZS5sb2coXCJFcnJvciAtIFVwZGF0ZSBjb3Vyc2U6IFwiICsgZXJyKTtcclxuICAgICAgcmVzLnNlbmQoeyByZXN1bHQ6IFwiZXJyb3JcIiwgdGl0bGU6IFwiRXJyb3JcIiwgbXNnOiBcIlRoZXJlIHdhcyBhbiBlcnJvciB1cGRhdGluZyB0aGUgY291cnNlLlwiLCBzZXJ2ZXJNc2c6IGVyciB9KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGZpbmRCeUlkKHJlcTogZXhwcmVzcy5SZXF1ZXN0LCByZXM6IGV4cHJlc3MuUmVzcG9uc2UpOiB2b2lkIHtcclxuICAgIHRyeSB7XHJcbiAgICAgIG5ldyBBdXRoQ29udHJvbGxlcigpLmF1dGhVc2VyKHJlcSwgcmVzLCB7XHJcbiAgICAgICAgcmVxdWlyZWRBdXRoOiBhdXRoLCBkb25lOiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICB2YXIgX2lkOiBzdHJpbmcgPSByZXEucGFyYW1zLl9pZDtcclxuXHJcbiAgICAgICAgICBzcWwuY29ubmVjdChkYilcclxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24oY29ubmVjdGlvbikge1xyXG4gICAgICAgICAgICAgIG5ldyBzcWwuUmVxdWVzdChjb25uZWN0aW9uKVxyXG4gICAgICAgICAgICAgIC5xdWVyeShgU0VMRUNUIGNvdXJzZS4qLHVzZXJuYW1lW3Byb2Zlc3Nvck5hbWVdLGNhbXB1c05hbWUgRlJPTSBDb3Vyc2VcclxuICAgICAgICAgIGxlZnQgam9pbiB1c2VycyBvbiB1c2Vycy51c2VySUQ9Y291cnNlLnByb2Zlc3NvcklkXHJcbiAgICAgICAgICBsZWZ0IGpvaW4gY2FtcHVzIG9uIGNhbXB1cy5jYW1wdXNJZCA9IGNvdXJzZS5jYW1wdXNJZFxyXG4gICAgICAgICAgd2hlcmUgY291cnNlSWQ9JHtfaWR9YClcclxuICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKHJlY29yZHNldCkge1xyXG4gICAgICAgICAgICAgICAgICByZXMuc2VuZChyZWNvcmRzZXQpO1xyXG4gICAgICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3IgLSBGaW5kIGNvdXJzZSBieSBpZDogXCIgKyBlcnIpO1xyXG4gICAgICAgICAgICAgICAgICByZXMuc2VuZCh7IHJlc3VsdDogXCJlcnJvclwiLCB0aXRsZTogXCJFcnJvclwiLCBtc2c6IFwiVGhlcmUgd2FzIGFuIGVycm9yIGZpbmRpbmcgY291cnNlIGJ5IGlkLlwiLCBzZXJ2ZXJNc2c6IGVyciB9KTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbihlcnIpIHtcclxuICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkRCIENvbm5lY3Rpb24gZXJyb3IgLSBGaW5kIGNvdXJzZSBieSBpZDogXCIgKyBlcnIpO1xyXG4gICAgICAgICAgICAgIHJlcy5zZW5kKHsgcmVzdWx0OiBcImVycm9yXCIsIHRpdGxlOiBcIkNvbm5lY3Rpb24gRXJyb3JcIiwgbXNnOiBcIlRoZXJlIHdhcyBhbiBlcnJvciBjb25uZWN0aW5nIHRvIHRoZSBkYXRhYmFzZS5cIiwgc2VydmVyTXNnOiBlcnIgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3IgLSBGaW5kIGNvdXJzZSBieSBpZDogXCIgKyBlcnIpO1xyXG4gICAgICByZXMuc2VuZCh7IHJlc3VsdDogXCJlcnJvclwiLCB0aXRsZTogXCJFcnJvclwiLCBtc2c6IFwiVGhlcmUgd2FzIGFuIGVycm9yIGZpbmRpbmcgY291cnNlIGJ5IGlkLlwiLCBzZXJ2ZXJNc2c6IGVyciB9KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8vIGluc2VydFxyXG4gIGNyZWF0ZShyZXE6IGV4cHJlc3MuUmVxdWVzdCwgcmVzOiBleHByZXNzLlJlc3BvbnNlKTogdm9pZCB7XHJcbiAgICB0cnkge1xyXG4gICAgICBuZXcgQXV0aENvbnRyb2xsZXIoKS5hdXRoVXNlcihyZXEsIHJlcywge1xyXG4gICAgICAgIHJlcXVpcmVkQXV0aDogYXV0aCwgZG9uZTogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgLy8gZ2V0IGNvdXJzZSBmcm9tIHJlcSB1cmxcclxuICAgICAgICAgIHZhciBjb3Vyc2UgPSByZXEuYm9keTtcclxuXHJcbiAgICAgICAgICBzcWwuY29ubmVjdChkYilcclxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgc3FsLnF1ZXJ5XHJcbiAgICAgICAgICAgICAgICBgSU5TRVJUIElOVE8gQ291cnNlIChjb3Vyc2VOYW1lLCBwcm9mZXNzb3JJZCwgY2FtcHVzSWQsIGNsYXNzcm9vbSwgY2xhc3NUaW1lU3RyLGNvdXJzZVN0YXJ0LGNvdXJzZUVuZClcclxuICAgICAgICBWQUxVRVMoJHtjb3Vyc2UuY291cnNlTmFtZX0sICR7Y291cnNlLmNvdXJzZVR5cGV9LCAke2NvdXJzZS5wcm9mZXNzb3JJZH0sICR7Y291cnNlLmNhbXB1c0lkfSwgJHtjb3Vyc2UuY2xhc3Nyb29tfSwgJHtjb3Vyc2UuY2xhc3NUaW1lU3RyfSxcclxuICAgICAgICAgICR7Y291cnNlLmNvdXJzZVN0YXJ0fSwke2NvdXJzZS5jb3Vyc2VFbmR9KWBcclxuICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgICBuZXcgQWN0aXZpdHlTZXJ2aWNlKCkucmVwb3J0QWN0aXZpdHkoJ0NvdXJzZSBDcmVhdGVkJywgJ3N1Y2Nlc3MnLCAnJywgXCJDb3Vyc2UgbmFtZSAnXCIgKyBjb3Vyc2UuY291cnNlTmFtZSArIFwiJyBoYXMgYmVlbiBzdWNjZXNzZnVsbHkgY3JlYXRlZC5cIiApO1xyXG4gICAgICAgICAgICAgICAgICByZXMuc2VuZCh7IHJlc3VsdDogXCJzdWNjZXNzXCIsIHRpdGxlOiBcIkNvdXJzZSBDcmVhdGVkIVwiLCBtc2c6IFwiQ291cnNlIGhhcyBiZWVuIGNyZWF0ZWQgc3VjY2Vzc2Z1bGx5LlwiLCBzZXJ2ZXJNc2c6IFwiXCIgfSk7XHJcbiAgICAgICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbihlcnIpIHtcclxuICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJFcnJvciAtIENyZWF0ZSBjb3Vyc2U6IFwiICsgZXJyKTtcclxuICAgICAgICAgICAgICAgICAgcmVzLnNlbmQoeyByZXN1bHQ6IFwiZXJyb3JcIiwgdGl0bGU6IFwiRXJyb3JcIiwgbXNnOiBcIlRoZXJlIHdhcyBhbiBlcnJvciBjcmVhdGluZyBjb3Vyc2UuXCIsIHNlcnZlck1zZzogZXJyIH0pO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGVycikge1xyXG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiREIgQ29ubmVjdGlvbiBlcnJvciAtIENyZWF0ZSBjb3Vyc2U6IFwiICsgZXJyKTtcclxuICAgICAgICAgICAgICByZXMuc2VuZCh7IHJlc3VsdDogXCJlcnJvclwiLCB0aXRsZTogXCJDb25uZWN0aW9uIEVycm9yXCIsIG1zZzogXCJUaGVyZSB3YXMgYW4gZXJyb3IgY29ubmVjdGluZyB0byB0aGUgZGF0YWJhc2UuXCIsIHNlcnZlck1zZzogZXJyIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICBjb25zb2xlLmxvZyhcIkVycm9yIC0gQ3JlYXRlIGNvdXJzZTogXCIgKyBlcnIpO1xyXG4gICAgICByZXMuc2VuZCh7IHJlc3VsdDogXCJlcnJvclwiLCB0aXRsZTogXCJFcnJvclwiLCBtc2c6IFwiVGhlcmUgd2FzIGFuIGVycm9yIGNyZWF0aW5nIGNvdXJzZS5cIiwgc2VydmVyTXNnOiBlcnIgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBnZXRDb3Vyc2VUeXBlcyhyZXE6IGV4cHJlc3MuUmVxdWVzdCwgcmVzOiBleHByZXNzLlJlc3BvbnNlKTogdm9pZCB7XHJcbiAgICB0cnkge1xyXG5cclxuICAgICAgbmV3IEF1dGhDb250cm9sbGVyKCkuYXV0aFVzZXIocmVxLCByZXMsIHtcclxuICAgICAgICByZXF1aXJlZEF1dGg6IGF1dGgsIGRvbmU6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgIHNxbC5jb25uZWN0KGRiKVxyXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbihjb25uZWN0aW9uKSB7XHJcbiAgICAgICAgICAgICAgbmV3IHNxbC5SZXF1ZXN0KGNvbm5lY3Rpb24pXHJcbiAgICAgICAgICAgICAgICAucXVlcnkoYFNFTEVDVCAqIEZST00gQ291cnNlVHlwZXNgKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24ocmVjb3Jkc2V0KSB7XHJcbiAgICAgICAgICAgICAgICAgIHJlcy5zZW5kKHJlY29yZHNldCk7XHJcbiAgICAgICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbihlcnIpIHtcclxuICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJFcnJvciAtIEdldCBjb3Vyc2UgdHlwZXM6IFwiICsgZXJyKTtcclxuICAgICAgICAgICAgICAgICAgcmVzLnNlbmQoeyByZXN1bHQ6IFwiZXJyb3JcIiwgdGl0bGU6IFwiRXJyb3JcIiwgbXNnOiBcIlRoZXJlIHdhcyBhbiBlcnJvciByZXRyaWV2aW5nIGNvdXJzZSB0eXBlcy5cIiwgc2VydmVyTXNnOiBlcnIgfSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XHJcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJEQiBDb25uZWN0aW9uIGVycm9yIC0gR2V0IGNhbXB1c2VzOiBcIiArIGVycik7XHJcbiAgICAgICAgICAgICAgcmVzLnNlbmQoeyByZXN1bHQ6IFwiZXJyb3JcIiwgdGl0bGU6IFwiQ29ubmVjdGlvbiBFcnJvclwiLCBtc2c6IFwiVGhlcmUgd2FzIGFuIGVycm9yIGNvbm5lY3RpbmcgdG8gdGhlIGRhdGFiYXNlLlwiLCBzZXJ2ZXJNc2c6IGVyciB9KTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgY29uc29sZS5sb2coXCJFcnJvciAtIEdldCBDb3Vyc2UgVHlwZXM6IFwiICsgZXJyKTtcclxuICAgICAgcmVzLnNlbmQoeyByZXN1bHQ6IFwiZXJyb3JcIiwgdGl0bGU6IFwiRXJyb3JcIiwgbXNnOiBcIlRoZXJlIHdhcyBhbiBlcnJvciByZXRyaWV2aW5nIGNvdXJzZSB0eXBlcy5cIiwgc2VydmVyTXNnOiBlcnIgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBnZXRDYW1wdXNlcyhyZXE6IGV4cHJlc3MuUmVxdWVzdCwgcmVzOiBleHByZXNzLlJlc3BvbnNlKTogdm9pZCB7XHJcbiAgICB0cnkge1xyXG5cclxuICAgICAgbmV3IEF1dGhDb250cm9sbGVyKCkuYXV0aFVzZXIocmVxLCByZXMsIHtcclxuICAgICAgICByZXF1aXJlZEF1dGg6IGF1dGgsIGRvbmU6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgIHNxbC5jb25uZWN0KGRiKVxyXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbihjb25uZWN0aW9uKSB7XHJcbiAgICAgICAgICAgICAgbmV3IHNxbC5SZXF1ZXN0KGNvbm5lY3Rpb24pXHJcbiAgICAgICAgICAgICAgICAucXVlcnkoYFNFTEVDVCAqIEZST00gQ2FtcHVzYClcclxuICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKHJlY29yZHNldCkge1xyXG4gICAgICAgICAgICAgICAgICByZXMuc2VuZChyZWNvcmRzZXQpO1xyXG4gICAgICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3IgLSBHZXQgY2FtcHVzZXM6IFwiICsgZXJyKTtcclxuICAgICAgICAgICAgICAgICAgcmVzLnNlbmQoeyByZXN1bHQ6IFwiZXJyb3JcIiwgdGl0bGU6IFwiRXJyb3JcIiwgbXNnOiBcIlRoZXJlIHdhcyBhbiBlcnJvciByZXRyaWV2aW5nIGNhbXB1cyBsaXN0LlwiLCBzZXJ2ZXJNc2c6IGVyciB9KTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbihlcnIpIHtcclxuICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkRCIENvbm5lY3Rpb24gZXJyb3IgLSBHZXQgY2FtcHVzZXM6IFwiICsgZXJyKTtcclxuICAgICAgICAgICAgICByZXMuc2VuZCh7IHJlc3VsdDogXCJlcnJvclwiLCB0aXRsZTogXCJDb25uZWN0aW9uIEVycm9yXCIsIG1zZzogXCJUaGVyZSB3YXMgYW4gZXJyb3IgY29ubmVjdGluZyB0byB0aGUgZGF0YWJhc2UuXCIsIHNlcnZlck1zZzogZXJyIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICBjb25zb2xlLmxvZyhcIkVycm9yIC0gR2V0IENhbXB1c2VzOiBcIiArIGVycik7XHJcbiAgICAgIHJlcy5zZW5kKHsgcmVzdWx0OiBcImVycm9yXCIsIHRpdGxlOiBcIkVycm9yXCIsIG1zZzogXCJUaGVyZSB3YXMgYW4gZXJyb3IgcmV0cmlldmluZyBjYW1wdXMgbGlzdC5cIiwgc2VydmVyTXNnOiBlcnIgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBnZXRJbnN0cnVjdG9ycyhyZXE6IGV4cHJlc3MuUmVxdWVzdCwgcmVzOiBleHByZXNzLlJlc3BvbnNlKTogdm9pZCB7XHJcbiAgICB0cnkge1xyXG4gICAgICBuZXcgQXV0aENvbnRyb2xsZXIoKS5hdXRoVXNlcihyZXEsIHJlcywge1xyXG4gICAgICAgIHJlcXVpcmVkQXV0aDogYXV0aCwgZG9uZTogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgc3FsLmNvbm5lY3QoZGIpXHJcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKGNvbm5lY3Rpb24pIHtcclxuICAgICAgICAgICAgICBuZXcgc3FsLlJlcXVlc3QoY29ubmVjdGlvbilcclxuICAgICAgICAgICAgICAgIC5xdWVyeShgU0VMRUNUIHVzZXJzLiosY29uY2F0KGNvbmNhdChzdGFmZi5maXJzdE5hbWUsJyAnKSxzdGFmZi5sYXN0TmFtZSlbcHJvZmVzc29yTmFtZV0gRlJPTSB1c2Vyc1xyXG4gICAgICAgICAgbGVmdCBqb2luICBzdGFmZiBvbiBzdGFmZi51c2VySUQgPSB1c2Vycy51c2VySURcclxuICAgICAgICAgIHdoZXJlIHVzZXJUeXBlIExJS0UgJyVpbnN0cnVjdG9yJSdgKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24ocmVjb3Jkc2V0KSB7XHJcbiAgICAgICAgICAgICAgICAgIHJlcy5zZW5kKHJlY29yZHNldCk7XHJcbiAgICAgICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbihlcnIpIHtcclxuICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJFcnJvciAtIEdldCBJbnN0cnVjdG9yczogXCIgKyBlcnIpO1xyXG4gICAgICAgICAgICAgICAgICByZXMuc2VuZCh7IHJlc3VsdDogXCJlcnJvclwiLCB0aXRsZTogXCJFcnJvclwiLCBtc2c6IFwiVGhlcmUgd2FzIGFuIGVycm9yIHJldHJpZXZpbmcgYWxsIGluc3RydWN0b3JzLlwiLCBzZXJ2ZXJNc2c6IGVyciB9KTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbihlcnIpIHtcclxuICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkRCIENvbm5lY3Rpb24gZXJyb3IgLSBHZXQgaW5zdHJ1Y3RvcnM6IFwiICsgZXJyKTtcclxuICAgICAgICAgICAgICByZXMuc2VuZCh7IHJlc3VsdDogXCJlcnJvclwiLCB0aXRsZTogXCJDb25uZWN0aW9uIEVycm9yXCIsIG1zZzogXCJUaGVyZSB3YXMgYW4gZXJyb3IgY29ubmVjdGluZyB0byB0aGUgZGF0YWJhc2UuXCIsIHNlcnZlck1zZzogZXJyIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICBjb25zb2xlLmxvZyhcIkVycm9yIC0gR2V0IEluc3RydWN0b3JzOiBcIiArIGVycik7XHJcbiAgICAgIHJlcy5zZW5kKHsgcmVzdWx0OiBcImVycm9yXCIsIHRpdGxlOiBcIkVycm9yXCIsIG1zZzogXCJUaGVyZSB3YXMgYW4gZXJyb3IgcmV0cmlldmluZyBhbGwgaW5zdHJ1Y3RvcnMuXCIsIHNlcnZlck1zZzogZXJyIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZ2V0V2FpdExpc3QocmVxOiBleHByZXNzLlJlcXVlc3QsIHJlczogZXhwcmVzcy5SZXNwb25zZSk6IHZvaWQge1xyXG4gICAgdHJ5IHtcclxuICAgICAgbmV3IEF1dGhDb250cm9sbGVyKCkuYXV0aFVzZXIocmVxLCByZXMsIHtcclxuICAgICAgICByZXF1aXJlZEF1dGg6IGF1dGgsIGRvbmU6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgIHNxbC5jb25uZWN0KGRiKVxyXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbihjb25uZWN0aW9uKSB7XHJcbiAgICAgICAgICAgICAgbmV3IHNxbC5SZXF1ZXN0KGNvbm5lY3Rpb24pXHJcbiAgICAgICAgICAgICAgICAucXVlcnkoYFNFTEVDVCAqIEZST00gV2FpdExpc3RgKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24ocmVjb3Jkc2V0KSB7XHJcbiAgICAgICAgICAgICAgICAgIHJlcy5zZW5kKHJlY29yZHNldCk7XHJcbiAgICAgICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbihlcnIpIHtcclxuICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJFcnJvciAtIEdldCB3YWl0IGxpc3Q6IFwiICsgZXJyKTtcclxuICAgICAgICAgICAgICAgICAgcmVzLnNlbmQoeyByZXN1bHQ6IFwiZXJyb3JcIiwgdGl0bGU6IFwiRXJyb3JcIiwgbXNnOiBcIlRoZXJlIHdhcyBhbiBlcnJvciByZXRyaWV2aW5nIHdhaXQgbGlzdCBpbmZvcm1hdGlvbi5cIiwgc2VydmVyTXNnOiBlcnIgfSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XHJcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJEQiBDb25uZWN0aW9uIGVycm9yIC0gR2V0IGluc3RydWN0b3JzOiBcIiArIGVycik7XHJcbiAgICAgICAgICAgICAgcmVzLnNlbmQoeyByZXN1bHQ6IFwiZXJyb3JcIiwgdGl0bGU6IFwiQ29ubmVjdGlvbiBFcnJvclwiLCBtc2c6IFwiVGhlcmUgd2FzIGFuIGVycm9yIGNvbm5lY3RpbmcgdG8gdGhlIGRhdGFiYXNlLlwiLCBzZXJ2ZXJNc2c6IGVyciB9KTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgY29uc29sZS5sb2coXCJFcnJvciAtIEdldCB3YWl0IGxpc3Q6IFwiICsgZXJyKTtcclxuICAgICAgcmVzLnNlbmQoeyByZXN1bHQ6IFwiZXJyb3JcIiwgdGl0bGU6IFwiRXJyb3JcIiwgbXNnOiBcIlRoZXJlIHdhcyBhbiBlcnJvciByZXRyaWV2aW5nIHdhaXQgbGlzdCBpbmZvcm1hdGlvbi5cIiwgc2VydmVyTXNnOiBlcnIgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBnZXRXYWl0TGlzdEJ5SWQocmVxOiBleHByZXNzLlJlcXVlc3QsIHJlczogZXhwcmVzcy5SZXNwb25zZSk6IHZvaWQge1xyXG4gICAgdHJ5IHtcclxuICAgICAgbmV3IEF1dGhDb250cm9sbGVyKCkuYXV0aFVzZXIocmVxLCByZXMsIHtcclxuICAgICAgICByZXF1aXJlZEF1dGg6IGF1dGgsIGRvbmU6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgIHZhciBfaWQ6IHN0cmluZyA9IHJlcS5wYXJhbXMuX2lkO1xyXG5cclxuICAgICAgICAgIHNxbC5jb25uZWN0KGRiKVxyXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbihjb25uZWN0aW9uKSB7XHJcbiAgICAgICAgICAgICAgbmV3IHNxbC5SZXF1ZXN0KGNvbm5lY3Rpb24pXHJcbiAgICAgICAgICAgICAgICAucXVlcnkoYFNFTEVDVCAqIEZST00gV2FpdExpc3QgV0hFUkUgdXNlcklEID0gJHtfaWR9YClcclxuICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgICByZXMuc2VuZChyZXN1bHQpO1xyXG4gICAgICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3IgLSBHZXQgd2FpdCBsaXN0OiBcIiArIGVycik7XHJcbiAgICAgICAgICAgICAgICAgIHJlcy5zZW5kKHsgcmVzdWx0OiBcImVycm9yXCIsIHRpdGxlOiBcIkVycm9yXCIsIG1zZzogXCJUaGVyZSB3YXMgYW4gZXJyb3IgcmV0cmlldmluZyB3YWl0IGxpc3QgaW5mb3JtYXRpb24uXCIsIHNlcnZlck1zZzogZXJyIH0pO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGVycikge1xyXG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiREIgQ29ubmVjdGlvbiBlcnJvciAtIEdldCBpbnN0cnVjdG9yczogXCIgKyBlcnIpO1xyXG4gICAgICAgICAgICAgIHJlcy5zZW5kKHsgcmVzdWx0OiBcImVycm9yXCIsIHRpdGxlOiBcIkNvbm5lY3Rpb24gRXJyb3JcIiwgbXNnOiBcIlRoZXJlIHdhcyBhbiBlcnJvciBjb25uZWN0aW5nIHRvIHRoZSBkYXRhYmFzZS5cIiwgc2VydmVyTXNnOiBlcnIgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3IgLSBHZXQgd2FpdCBsaXN0OiBcIiArIGVycik7XHJcbiAgICAgIHJlcy5zZW5kKHsgcmVzdWx0OiBcImVycm9yXCIsIHRpdGxlOiBcIkVycm9yXCIsIG1zZzogXCJUaGVyZSB3YXMgYW4gZXJyb3IgcmV0cmlldmluZyB3YWl0IGxpc3QgaW5mb3JtYXRpb24uXCIsIHNlcnZlck1zZzogZXJyIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgYWRkVG9XYWl0TGlzdChyZXE6IGV4cHJlc3MuUmVxdWVzdCwgcmVzOiBleHByZXNzLlJlc3BvbnNlKTogdm9pZCB7XHJcbiAgICB0cnkge1xyXG4gICAgICBuZXcgQXV0aENvbnRyb2xsZXIoKS5hdXRoVXNlcihyZXEsIHJlcywge1xyXG4gICAgICAgIHJlcXVpcmVkQXV0aDogYXV0aCwgZG9uZTogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgLy8gZ2V0IGNvdXJzZSBmcm9tIHJlcSB1cmxcclxuICAgICAgICAgIHZhciBjb3Vyc2UgPSByZXEuYm9keTtcclxuICAgICAgICAgIHZhciB1c2VySUQgPSBjb3Vyc2UudXNlcklEO1xyXG4gICAgICAgICAgdmFyIGNvdXJzZVR5cGUgPSBjb3Vyc2UuY291cnNlVHlwZTtcclxuICAgICAgICAgIHZhciBkYXRlID0gY291cnNlLmRhdGU7XHJcbiAgICAgICAgICBzcWwuY29ubmVjdChkYilcclxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24oY29ubmVjdGlvbikge1xyXG4gICAgICAgICAgICAgIG5ldyBzcWwuUmVxdWVzdChjb25uZWN0aW9uKVxyXG4gICAgICAgICAgICAgICAgLnF1ZXJ5KFwiSU5TRVJUIElOVE8gV2FpdExpc3QgKGNvdXJzZVR5cGUsIHVzZXJJRCwgZGF0ZSkgVkFMVUVTICgnXCIgKyBjb3Vyc2VUeXBlICsgXCInLCAnXCIgKyB1c2VySUQgKyBcIicsICdcIiArIGRhdGUgKyBcIicpXCIpXHJcbiAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgICAgbmV3IEFjdGl2aXR5U2VydmljZSgpLnJlcG9ydEFjdGl2aXR5KCdDb3Vyc2UgV2FpdCBMaXN0JywgJ3N1Y2Nlc3MnLCB1c2VySUQsICdVc2VyIGhhcyBiZWVuIGFkZGVkIHRvIHRoZSBjb3Vyc2Ugd2FpdCBsaXN0LicpO1xyXG4gICAgICAgICAgICAgICAgICByZXMuc2VuZCh7IHJlc3VsdDogXCJzdWNjZXNzXCIsIHRpdGxlOiBcIlN1Y2Nlc3MhXCIsIG1zZzogXCJVc2VyIGhhcyBiZWVuIGFkZGVkIHRvIHRoZSB3YWl0IGxpc3QuXCIsIHNlcnZlck1zZzogXCJcIiB9KTtcclxuICAgICAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGVycikge1xyXG4gICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yIC0gQWRkIHRvIHdhaXQgbGlzdDogXCIgKyBlcnIpO1xyXG4gICAgICAgICAgICAgICAgICByZXMuc2VuZCh7IHJlc3VsdDogXCJlcnJvclwiLCB0aXRsZTogXCJFcnJvclwiLCBtc2c6IFwiVGhlcmUgd2FzIGFuIGVycm9yIHdoaWxlIGFkZGluZyBzdHVkZW50IHRvIHRoZSB3YWl0IGxpc3QuXCIsIHNlcnZlck1zZzogZXJyIH0pO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGVycikge1xyXG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiREIgQ29ubmVjdGlvbiBlcnJvciAtIENyZWF0ZSBjb3Vyc2U6IFwiICsgZXJyKTtcclxuICAgICAgICAgICAgICByZXMuc2VuZCh7IHJlc3VsdDogXCJlcnJvclwiLCB0aXRsZTogXCJDb25uZWN0aW9uIEVycm9yXCIsIG1zZzogXCJUaGVyZSB3YXMgYW4gZXJyb3IgY29ubmVjdGluZyB0byB0aGUgZGF0YWJhc2UuXCIsIHNlcnZlck1zZzogZXJyIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICBjb25zb2xlLmxvZyhcIkVycm9yIC0gQWRkIHRvIHdhaXQgbGlzdDogXCIgKyBlcnIpO1xyXG4gICAgICByZXMuc2VuZCh7IHJlc3VsdDogXCJlcnJvclwiLCB0aXRsZTogXCJFcnJvclwiLCBtc2c6IFwiVGhlcmUgd2FzIGFuIGVycm9yIHdoaWxlIGFkZGluZyBzdHVkZW50IHRvIHRoZSB3YWl0IGxpc3QuXCIsIHNlcnZlck1zZzogZXJyIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbn1cclxuXHJcbmV4cG9ydCA9IENvdXJzZUNvbnRyb2xsZXI7XHJcbiJdfQ==
