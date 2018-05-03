"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var AuthController = require("../controllers/AuthController");
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
                        sql.query(templateObject_3 || (templateObject_3 = __makeTemplateObject(["UPDATE Course SET courseName = ", ",professorId = ", ",\n          campusId = ", ",classroom = ", ",courseStart = ", ",\n          courseEnd = ", ",classTimeStr = ", " WHERE courseID = ", ""], ["UPDATE Course SET courseName = ", ",professorId = ", ",\n          campusId = ", ",classroom = ", ",courseStart = ", ",\n          courseEnd = ", ",classTimeStr = ", " WHERE courseID = ", ""])), course.courseName, course.professorId, course.campusId, course.classroom, course.courseStart, course.courseEnd, course.classTimeStr, _id).then(function (result) {
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
                        sql.query(templateObject_4 || (templateObject_4 = __makeTemplateObject(["INSERT INTO Course (courseName, professorId, campusId, classroom, classTimeStr,courseStart,courseEnd)\n        VALUES(", ", ", ", ", ", ", ", ", ",\n          ", ",", ")"], ["INSERT INTO Course (courseName, professorId, campusId, classroom, classTimeStr,courseStart,courseEnd)\n        VALUES(", ", ", ", ", ", ", ", ", ",\n          ", ",", ")"])), course.courseName, course.professorId, course.campusId, course.classroom, course.classTimeStr, course.courseStart, course.courseEnd).then(function (result) {
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
    return CourseController;
}());
var templateObject_1, templateObject_2, templateObject_3, templateObject_4;
module.exports = CourseController;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NlcnZlci9zcmMvY29udHJvbGxlcnMvQ291cnNlQ29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUdBLDhEQUFpRTtBQUNqRSxJQUFNLEdBQUcsR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDN0IsSUFBSSxJQUFJLEdBQUcsQ0FBQyxPQUFPLEVBQUUsT0FBTyxFQUFFLFlBQVksQ0FBQyxDQUFDO0FBQzVDLElBQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQztBQUNwQyxJQUFNLEVBQUUsR0FBRyxNQUFNLENBQUMsRUFBRSxDQUFDO0FBQ3JCLElBQU0sSUFBSSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUM7QUFDekIsSUFBTSxhQUFhLEdBQUcsTUFBTSxDQUFDLGFBQWEsQ0FBQztBQUUzQztJQUFBO0lBOFBBLENBQUM7SUE1UEMsU0FBUztJQUNULG1DQUFRLEdBQVIsVUFBUyxHQUFvQixFQUFFLEdBQXFCO1FBQ2xELElBQUk7WUFDRixJQUFJLGNBQWMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFO2dCQUN0QyxZQUFZLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRTtvQkFFeEIsR0FBRyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUM7eUJBQ1osSUFBSSxDQUFDLFVBQVMsVUFBVTt3QkFDdkIsSUFBSSxHQUFHLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQzs2QkFDeEIsS0FBSyxDQUFDLHlTQUd3QyxDQUFDOzZCQUMvQyxJQUFJLENBQUMsVUFBUyxTQUFTOzRCQUN0QixHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO3dCQUN0QixDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsVUFBUyxHQUFHOzRCQUNuQixPQUFPLENBQUMsR0FBRyxDQUFDLHNCQUFzQixHQUFHLEdBQUcsQ0FBQyxDQUFDOzRCQUMxQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUs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LEVBQUUsR0FBRyxFQUFFLGdEQUFnRCxFQUFFLFNBQVMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDO1NBQ3RIO0lBQ0gsQ0FBQztJQUVILHVCQUFDO0FBQUQsQ0E5UEEsQUE4UEMsSUFBQTs7QUFFRCxpQkFBUyxnQkFBZ0IsQ0FBQyIsImZpbGUiOiJjb250cm9sbGVycy9Db3Vyc2VDb250cm9sbGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGV4cHJlc3MgPSByZXF1aXJlKFwiZXhwcmVzc1wiKTtcclxuaW1wb3J0IGp3dCA9IHJlcXVpcmUoJ2pzb253ZWJ0b2tlbicpO1xyXG5pbXBvcnQgYmNyeXB0ID0gcmVxdWlyZSgnYmNyeXB0Jyk7XHJcbmltcG9ydCBBdXRoQ29udHJvbGxlciA9IHJlcXVpcmUoXCIuLi9jb250cm9sbGVycy9BdXRoQ29udHJvbGxlclwiKTtcclxuY29uc3Qgc3FsID0gcmVxdWlyZSgnbXNzcWwnKTtcclxudmFyIGF1dGggPSBbXCJBZG1pblwiLCBcIlN0YWZmXCIsIFwiSW5zdHJ1Y3RvclwiXTtcclxuY29uc3QgY29uZmlnID0gcmVxdWlyZSgnLi4vY29uZmlnJyk7XHJcbmNvbnN0IGRiID0gY29uZmlnLmRiO1xyXG5jb25zdCBtYWlsID0gY29uZmlnLm1haWw7XHJcbmNvbnN0IHNpdGVfc2V0dGluZ3MgPSBjb25maWcuc2l0ZV9zZXR0aW5ncztcclxuXHJcbmNsYXNzIENvdXJzZUNvbnRyb2xsZXIge1xyXG5cclxuICAvLyBzZWxlY3RcclxuICByZXRyaWV2ZShyZXE6IGV4cHJlc3MuUmVxdWVzdCwgcmVzOiBleHByZXNzLlJlc3BvbnNlKTogdm9pZCB7XHJcbiAgICB0cnkge1xyXG4gICAgICBuZXcgQXV0aENvbnRyb2xsZXIoKS5hdXRoVXNlcihyZXEsIHJlcywge1xyXG4gICAgICAgIHJlcXVpcmVkQXV0aDogYXV0aCwgZG9uZTogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgc3FsLmNvbm5lY3QoZGIpXHJcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKGNvbm5lY3Rpb24pIHtcclxuICAgICAgICAgICAgICBuZXcgc3FsLlJlcXVlc3QoY29ubmVjdGlvbilcclxuICAgICAgICAgICAgICAgIC5xdWVyeShgU0VMRUNUIGNvdXJzZS4qLGNvbmNhdChjb25jYXQoc3RhZmYuZmlyc3ROYW1lLCcgJyksc3RhZmYubGFzdE5hbWUpW3Byb2Zlc3Nvck5hbWVdLGNhbXB1c05hbWUgRlJPTSBDb3Vyc2VcclxuICAgICAgICAgIGxlZnQgam9pbiB1c2VycyBvbiB1c2Vycy51c2VySUQ9Y291cnNlLnByb2Zlc3NvcklkXHJcbiAgICAgICAgICBsZWZ0IGpvaW4gY2FtcHVzIG9uIGNhbXB1cy5jYW1wdXNJZCA9IGNvdXJzZS5jYW1wdXNJZFxyXG4gICAgICAgICAgbGVmdCBqb2luIHN0YWZmIG9uIHN0YWZmLnVzZXJJRCA9IGNvdXJzZS5wcm9mZXNzb3JJZGApXHJcbiAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbihyZWNvcmRzZXQpIHtcclxuICAgICAgICAgICAgICAgICAgcmVzLnNlbmQocmVjb3Jkc2V0KTtcclxuICAgICAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGVycikge1xyXG4gICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlJldHJpZXZlIGFsbCBjb3Vyc2UgXCIgKyBlcnIpO1xyXG4gICAgICAgICAgICAgICAgICByZXMuc2VuZCh7IHJlc3VsdDogXCJlcnJvclwiLCB0aXRsZTogXCJFcnJvclwiLCBtc2c6IFwiVGhlcmUgd2FzIGFuIGVycm9yIHJldHJpZXZpbmcgYWxsIGNvdXJzZXMuXCIsIHNlcnZlck1zZzogZXJyIH0pO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGVycikge1xyXG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiREIgQ29ubmVjdGlvbiBlcnJvciAtIFJldHJpZXZlIGFsbCBjb3Vyc2VzOiBcIiArIGVycik7XHJcbiAgICAgICAgICAgICAgcmVzLnNlbmQoeyByZXN1bHQ6IFwiZXJyb3JcIiwgdGl0bGU6IFwiQ29ubmVjdGlvbiBFcnJvclwiLCBtc2c6IFwiVGhlcmUgd2FzIGFuIGVycm9yIGNvbm5lY3RpbmcgdG8gdGhlIGRhdGFiYXNlLlwiLCBzZXJ2ZXJNc2c6IGVyciB9KTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgY29uc29sZS5sb2coXCJFcnJvciAtIFJldHJpZXZlIGFsbCBjb3Vyc2VzOiBcIiArIGVycik7XHJcbiAgICAgIHJlcy5zZW5kKHsgcmVzdWx0OiBcImVycm9yXCIsIHRpdGxlOiBcIkVycm9yXCIsIG1zZzogXCJUaGVyZSB3YXMgYW4gZXJyb3IgcmV0cmlldmluZyBhbGwgY291cnNlcy5cIiwgc2VydmVyTXNnOiBlcnIgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBnZXRJbnN0cnVjdG9yQ291cnNlcyhyZXE6IGV4cHJlc3MuUmVxdWVzdCwgcmVzOiBleHByZXNzLlJlc3BvbnNlKTogdm9pZCB7XHJcbiAgICB0cnkge1xyXG4gICAgICBuZXcgQXV0aENvbnRyb2xsZXIoKS5hdXRoVXNlcihyZXEsIHJlcywge1xyXG4gICAgICAgIHJlcXVpcmVkQXV0aDogYXV0aCwgZG9uZTogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgdmFyIF9pZDogc3RyaW5nID0gcmVxLnBhcmFtcy5faWQ7XHJcblxyXG4gICAgICAgICAgc3FsLmNvbm5lY3QoZGIpXHJcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKGNvbm5lY3Rpb24pIHtcclxuICAgICAgICAgICAgICBuZXcgc3FsLlJlcXVlc3QoY29ubmVjdGlvbilcclxuICAgICAgICAgICAgICBzcWwucXVlcnlcclxuICAgICAgICAgICAgICAgIGBTRUxFQ1QgKiBGUk9NIENvdXJzZSBXSEVSRSBwcm9mZXNzb3JJZCA9ICR7X2lkfWBcclxuICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKHJlY29yZHNldCkge1xyXG4gICAgICAgICAgICAgICAgICByZXMuc2VuZChyZWNvcmRzZXQpO1xyXG4gICAgICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiU2VsZWN0IGluc3RydWN0b3JzIGNvdXJzZXMgXCIgKyBlcnIpO1xyXG4gICAgICAgICAgICAgICAgICByZXMuc2VuZCh7IHJlc3VsdDogXCJlcnJvclwiLCB0aXRsZTogXCJFcnJvclwiLCBtc2c6IFwiVGhlcmUgd2FzIGFuIGVycm9yIHJldHJpZXZpbmcgYWxsIGluc3RydWN0b3IgY291cnNlcy5cIiwgc2VydmVyTXNnOiBlcnIgfSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XHJcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJEQiBDb25uZWN0aW9uIGVycm9yIC0gR2V0IGluc3RydWN0b3JzIGNvdXJzZXM6IFwiICsgZXJyKTtcclxuICAgICAgICAgICAgICByZXMuc2VuZCh7IHJlc3VsdDogXCJlcnJvclwiLCB0aXRsZTogXCJDb25uZWN0aW9uIEVycm9yXCIsIG1zZzogXCJUaGVyZSB3YXMgYW4gZXJyb3IgY29ubmVjdGluZyB0byB0aGUgZGF0YWJhc2UuXCIsIHNlcnZlck1zZzogZXJyIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICBjb25zb2xlLmxvZyhcIkVycm9yIC0gR2V0IGluc3RydWN0b3JzIGNvdXJzZXM6IFwiICsgZXJyKTtcclxuICAgICAgcmVzLnNlbmQoeyByZXN1bHQ6IFwiZXJyb3JcIiwgdGl0bGU6IFwiRXJyb3JcIiwgbXNnOiBcIlRoZXJlIHdhcyBhbiBlcnJvciByZXRyaWV2aW5nIGFsbCBpbnN0cnVjdG9yIGNvdXJzZXMuXCIsIHNlcnZlck1zZzogZXJyIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZGVsZXRlKHJlcTogZXhwcmVzcy5SZXF1ZXN0LCByZXM6IGV4cHJlc3MuUmVzcG9uc2UpOiB2b2lkIHtcclxuICAgIHRyeSB7XHJcbiAgICAgIG5ldyBBdXRoQ29udHJvbGxlcigpLmF1dGhVc2VyKHJlcSwgcmVzLCB7XHJcbiAgICAgICAgcmVxdWlyZWRBdXRoOiBhdXRoLCBkb25lOiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICB2YXIgX2lkOiBzdHJpbmcgPSByZXEucGFyYW1zLl9pZDtcclxuXHJcbiAgICAgICAgICBzcWwuY29ubmVjdChkYilcclxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24oY29ubmVjdGlvbikge1xyXG4gICAgICAgICAgICAgIHNxbC5xdWVyeVxyXG4gICAgICAgICAgICAgICAgYERFTEVURSBGUk9NIENvdXJzZSBXSEVSRSBjb3Vyc2VJRCA9ICR7X2lkfWBcclxuICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgICByZXMuc2VuZCh7IHJlc3VsdDogXCJzdWNjZXNzXCIsIHRpdGxlOiBcIkNvdXJzZSBEZWxldGVkXCIsIG1zZzogXCJDb3Vyc2UgaGFzIGJlZW4gZGVsZXRlZCBzdWNjZXNzZnVsbHkuXCIsIHNlcnZlck1zZzogXCJcIiB9KTtcclxuICAgICAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGVycikge1xyXG4gICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlVwZGF0ZSBjb3Vyc2UgXCIgKyBlcnIpO1xyXG4gICAgICAgICAgICAgICAgICByZXMuc2VuZCh7IHJlc3VsdDogXCJlcnJvclwiLCB0aXRsZTogXCJFcnJvclwiLCBtc2c6IFwiVGhlcmUgd2FzIGFuIGVycm9yIGRlbGV0aW5nIHRoZSBjb3Vyc2UuXCIsIHNlcnZlck1zZzogZXJyIH0pO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGVycikge1xyXG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiREIgQ29ubmVjdGlvbiBlcnJvciAtIERlbGV0ZSBjb3Vyc2U6IFwiICsgZXJyKTtcclxuICAgICAgICAgICAgICByZXMuc2VuZCh7IHJlc3VsdDogXCJlcnJvclwiLCB0aXRsZTogXCJDb25uZWN0aW9uIEVycm9yXCIsIG1zZzogXCJUaGVyZSB3YXMgYW4gZXJyb3IgY29ubmVjdGluZyB0byB0aGUgZGF0YWJhc2UuXCIsIHNlcnZlck1zZzogZXJyIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICBjb25zb2xlLmxvZyhcIkVycm9yIC0gRGVsZXRlIGNvdXJzZTogXCIgKyBlcnIpO1xyXG4gICAgICByZXMuc2VuZCh7IHJlc3VsdDogXCJlcnJvclwiLCB0aXRsZTogXCJFcnJvclwiLCBtc2c6IFwiVGhlcmUgd2FzIGFuIGVycm9yIGRlbGV0aW5nIHRoZSBjb3Vyc2UuXCIsIHNlcnZlck1zZzogZXJyIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgdXBkYXRlKHJlcTogZXhwcmVzcy5SZXF1ZXN0LCByZXM6IGV4cHJlc3MuUmVzcG9uc2UpOiB2b2lkIHtcclxuICAgIHRyeSB7XHJcbiAgICAgIG5ldyBBdXRoQ29udHJvbGxlcigpLmF1dGhVc2VyKHJlcSwgcmVzLCB7XHJcbiAgICAgICAgcmVxdWlyZWRBdXRoOiBhdXRoLCBkb25lOiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICB2YXIgY291cnNlID0gcmVxLmJvZHk7XHJcbiAgICAgICAgICB2YXIgX2lkOiBzdHJpbmcgPSByZXEucGFyYW1zLl9pZDtcclxuXHJcbiAgICAgICAgICBzcWwuY29ubmVjdChkYilcclxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24oY29ubmVjdGlvbikge1xyXG4gICAgICAgICAgICAgIHNxbC5xdWVyeVxyXG4gICAgICAgICAgICAgICAgYFVQREFURSBDb3Vyc2UgU0VUIGNvdXJzZU5hbWUgPSAke2NvdXJzZS5jb3Vyc2VOYW1lfSxwcm9mZXNzb3JJZCA9ICR7Y291cnNlLnByb2Zlc3NvcklkfSxcclxuICAgICAgICAgIGNhbXB1c0lkID0gJHtjb3Vyc2UuY2FtcHVzSWR9LGNsYXNzcm9vbSA9ICR7Y291cnNlLmNsYXNzcm9vbX0sY291cnNlU3RhcnQgPSAke2NvdXJzZS5jb3Vyc2VTdGFydH0sXHJcbiAgICAgICAgICBjb3Vyc2VFbmQgPSAke2NvdXJzZS5jb3Vyc2VFbmR9LGNsYXNzVGltZVN0ciA9ICR7Y291cnNlLmNsYXNzVGltZVN0cn0gV0hFUkUgY291cnNlSUQgPSAke19pZH1gXHJcbiAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgICAgcmVzLnNlbmQoeyByZXN1bHQ6IFwic3VjY2Vzc1wiLCB0aXRsZTogXCJDb3Vyc2UgVXBkYXRlZCFcIiwgbXNnOiBcIkNvdXJzZSBoYXMgYmVlbiB1cGRhdGVkIHN1Y2Nlc3NmdWxseS5cIiwgc2VydmVyTXNnOiBcIlwiIH0pO1xyXG4gICAgICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiVXBkYXRlIGNvdXJzZSBcIiArIGVycik7XHJcbiAgICAgICAgICAgICAgICAgIHJlcy5zZW5kKHsgcmVzdWx0OiBcImVycm9yXCIsIHRpdGxlOiBcIkVycm9yXCIsIG1zZzogXCJUaGVyZSB3YXMgYW4gZXJyb3IgdXBkYXRpbmcgdGhlIGNvdXJzZS5cIiwgc2VydmVyTXNnOiBlcnIgfSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XHJcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJEQiBDb25uZWN0aW9uIGVycm9yIC0gVXBkYXRlIGNvdXJzZTogXCIgKyBlcnIpO1xyXG4gICAgICAgICAgICAgIHJlcy5zZW5kKHsgcmVzdWx0OiBcImVycm9yXCIsIHRpdGxlOiBcIkNvbm5lY3Rpb24gRXJyb3JcIiwgbXNnOiBcIlRoZXJlIHdhcyBhbiBlcnJvciBjb25uZWN0aW5nIHRvIHRoZSBkYXRhYmFzZS5cIiwgc2VydmVyTXNnOiBlcnIgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3IgLSBVcGRhdGUgY291cnNlOiBcIiArIGVycik7XHJcbiAgICAgIHJlcy5zZW5kKHsgcmVzdWx0OiBcImVycm9yXCIsIHRpdGxlOiBcIkVycm9yXCIsIG1zZzogXCJUaGVyZSB3YXMgYW4gZXJyb3IgdXBkYXRpbmcgdGhlIGNvdXJzZS5cIiwgc2VydmVyTXNnOiBlcnIgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBmaW5kQnlJZChyZXE6IGV4cHJlc3MuUmVxdWVzdCwgcmVzOiBleHByZXNzLlJlc3BvbnNlKTogdm9pZCB7XHJcbiAgICB0cnkge1xyXG4gICAgICBuZXcgQXV0aENvbnRyb2xsZXIoKS5hdXRoVXNlcihyZXEsIHJlcywge1xyXG4gICAgICAgIHJlcXVpcmVkQXV0aDogYXV0aCwgZG9uZTogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgdmFyIF9pZDogc3RyaW5nID0gcmVxLnBhcmFtcy5faWQ7XHJcblxyXG4gICAgICAgICAgc3FsLmNvbm5lY3QoZGIpXHJcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKGNvbm5lY3Rpb24pIHtcclxuICAgICAgICAgICAgICBuZXcgc3FsLlJlcXVlc3QoY29ubmVjdGlvbilcclxuICAgICAgICAgICAgICAucXVlcnkoYFNFTEVDVCBjb3Vyc2UuKix1c2VybmFtZVtwcm9mZXNzb3JOYW1lXSxjYW1wdXNOYW1lIEZST00gQ291cnNlXHJcbiAgICAgICAgICBsZWZ0IGpvaW4gdXNlcnMgb24gdXNlcnMudXNlcklEPWNvdXJzZS5wcm9mZXNzb3JJZFxyXG4gICAgICAgICAgbGVmdCBqb2luIGNhbXB1cyBvbiBjYW1wdXMuY2FtcHVzSWQgPSBjb3Vyc2UuY2FtcHVzSWRcclxuICAgICAgICAgIHdoZXJlIGNvdXJzZUlkPSR7X2lkfWApXHJcbiAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbihyZWNvcmRzZXQpIHtcclxuICAgICAgICAgICAgICAgICAgcmVzLnNlbmQocmVjb3Jkc2V0KTtcclxuICAgICAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGVycikge1xyXG4gICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yIC0gRmluZCBjb3Vyc2UgYnkgaWQ6IFwiICsgZXJyKTtcclxuICAgICAgICAgICAgICAgICAgcmVzLnNlbmQoeyByZXN1bHQ6IFwiZXJyb3JcIiwgdGl0bGU6IFwiRXJyb3JcIiwgbXNnOiBcIlRoZXJlIHdhcyBhbiBlcnJvciBmaW5kaW5nIGNvdXJzZSBieSBpZC5cIiwgc2VydmVyTXNnOiBlcnIgfSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XHJcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJEQiBDb25uZWN0aW9uIGVycm9yIC0gRmluZCBjb3Vyc2UgYnkgaWQ6IFwiICsgZXJyKTtcclxuICAgICAgICAgICAgICByZXMuc2VuZCh7IHJlc3VsdDogXCJlcnJvclwiLCB0aXRsZTogXCJDb25uZWN0aW9uIEVycm9yXCIsIG1zZzogXCJUaGVyZSB3YXMgYW4gZXJyb3IgY29ubmVjdGluZyB0byB0aGUgZGF0YWJhc2UuXCIsIHNlcnZlck1zZzogZXJyIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICBjb25zb2xlLmxvZyhcIkVycm9yIC0gRmluZCBjb3Vyc2UgYnkgaWQ6IFwiICsgZXJyKTtcclxuICAgICAgcmVzLnNlbmQoeyByZXN1bHQ6IFwiZXJyb3JcIiwgdGl0bGU6IFwiRXJyb3JcIiwgbXNnOiBcIlRoZXJlIHdhcyBhbiBlcnJvciBmaW5kaW5nIGNvdXJzZSBieSBpZC5cIiwgc2VydmVyTXNnOiBlcnIgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvLyBpbnNlcnRcclxuICBjcmVhdGUocmVxOiBleHByZXNzLlJlcXVlc3QsIHJlczogZXhwcmVzcy5SZXNwb25zZSk6IHZvaWQge1xyXG4gICAgdHJ5IHtcclxuICAgICAgbmV3IEF1dGhDb250cm9sbGVyKCkuYXV0aFVzZXIocmVxLCByZXMsIHtcclxuICAgICAgICByZXF1aXJlZEF1dGg6IGF1dGgsIGRvbmU6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgIC8vIGdldCBjb3Vyc2UgZnJvbSByZXEgdXJsXHJcbiAgICAgICAgICB2YXIgY291cnNlID0gcmVxLmJvZHk7XHJcblxyXG4gICAgICAgICAgc3FsLmNvbm5lY3QoZGIpXHJcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgIHNxbC5xdWVyeVxyXG4gICAgICAgICAgICAgICAgYElOU0VSVCBJTlRPIENvdXJzZSAoY291cnNlTmFtZSwgcHJvZmVzc29ySWQsIGNhbXB1c0lkLCBjbGFzc3Jvb20sIGNsYXNzVGltZVN0cixjb3Vyc2VTdGFydCxjb3Vyc2VFbmQpXHJcbiAgICAgICAgVkFMVUVTKCR7Y291cnNlLmNvdXJzZU5hbWV9LCAke2NvdXJzZS5wcm9mZXNzb3JJZH0sICR7Y291cnNlLmNhbXB1c0lkfSwgJHtjb3Vyc2UuY2xhc3Nyb29tfSwgJHtjb3Vyc2UuY2xhc3NUaW1lU3RyfSxcclxuICAgICAgICAgICR7Y291cnNlLmNvdXJzZVN0YXJ0fSwke2NvdXJzZS5jb3Vyc2VFbmR9KWBcclxuICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgICByZXMuc2VuZCh7IHJlc3VsdDogXCJzdWNjZXNzXCIsIHRpdGxlOiBcIkNvdXJzZSBDcmVhdGVkIVwiLCBtc2c6IFwiQ291cnNlIGhhcyBiZWVuIGNyZWF0ZWQgc3VjY2Vzc2Z1bGx5LlwiLCBzZXJ2ZXJNc2c6IFwiXCIgfSk7XHJcbiAgICAgICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbihlcnIpIHtcclxuICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJFcnJvciAtIENyZWF0ZSBjb3Vyc2U6IFwiICsgZXJyKTtcclxuICAgICAgICAgICAgICAgICAgcmVzLnNlbmQoeyByZXN1bHQ6IFwiZXJyb3JcIiwgdGl0bGU6IFwiRXJyb3JcIiwgbXNnOiBcIlRoZXJlIHdhcyBhbiBlcnJvciBjcmVhdGluZyBjb3Vyc2UuXCIsIHNlcnZlck1zZzogZXJyIH0pO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGVycikge1xyXG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiREIgQ29ubmVjdGlvbiBlcnJvciAtIENyZWF0ZSBjb3Vyc2U6IFwiICsgZXJyKTtcclxuICAgICAgICAgICAgICByZXMuc2VuZCh7IHJlc3VsdDogXCJlcnJvclwiLCB0aXRsZTogXCJDb25uZWN0aW9uIEVycm9yXCIsIG1zZzogXCJUaGVyZSB3YXMgYW4gZXJyb3IgY29ubmVjdGluZyB0byB0aGUgZGF0YWJhc2UuXCIsIHNlcnZlck1zZzogZXJyIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICBjb25zb2xlLmxvZyhcIkVycm9yIC0gQ3JlYXRlIGNvdXJzZTogXCIgKyBlcnIpO1xyXG4gICAgICByZXMuc2VuZCh7IHJlc3VsdDogXCJlcnJvclwiLCB0aXRsZTogXCJFcnJvclwiLCBtc2c6IFwiVGhlcmUgd2FzIGFuIGVycm9yIGNyZWF0aW5nIGNvdXJzZS5cIiwgc2VydmVyTXNnOiBlcnIgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBnZXRDYW1wdXNlcyhyZXE6IGV4cHJlc3MuUmVxdWVzdCwgcmVzOiBleHByZXNzLlJlc3BvbnNlKTogdm9pZCB7XHJcbiAgICB0cnkge1xyXG5cclxuICAgICAgbmV3IEF1dGhDb250cm9sbGVyKCkuYXV0aFVzZXIocmVxLCByZXMsIHtcclxuICAgICAgICByZXF1aXJlZEF1dGg6IGF1dGgsIGRvbmU6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgIHNxbC5jb25uZWN0KGRiKVxyXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbihjb25uZWN0aW9uKSB7XHJcbiAgICAgICAgICAgICAgbmV3IHNxbC5SZXF1ZXN0KGNvbm5lY3Rpb24pXHJcbiAgICAgICAgICAgICAgICAucXVlcnkoYFNFTEVDVCAqIEZST00gQ2FtcHVzYClcclxuICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKHJlY29yZHNldCkge1xyXG4gICAgICAgICAgICAgICAgICByZXMuc2VuZChyZWNvcmRzZXQpO1xyXG4gICAgICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3IgLSBHZXQgY2FtcHVzZXM6IFwiICsgZXJyKTtcclxuICAgICAgICAgICAgICAgICAgcmVzLnNlbmQoeyByZXN1bHQ6IFwiZXJyb3JcIiwgdGl0bGU6IFwiRXJyb3JcIiwgbXNnOiBcIlRoZXJlIHdhcyBhbiBlcnJvciByZXRyaWV2aW5nIGNhbXB1cyBsaXN0LlwiLCBzZXJ2ZXJNc2c6IGVyciB9KTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbihlcnIpIHtcclxuICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkRCIENvbm5lY3Rpb24gZXJyb3IgLSBHZXQgY2FtcHVzZXM6IFwiICsgZXJyKTtcclxuICAgICAgICAgICAgICByZXMuc2VuZCh7IHJlc3VsdDogXCJlcnJvclwiLCB0aXRsZTogXCJDb25uZWN0aW9uIEVycm9yXCIsIG1zZzogXCJUaGVyZSB3YXMgYW4gZXJyb3IgY29ubmVjdGluZyB0byB0aGUgZGF0YWJhc2UuXCIsIHNlcnZlck1zZzogZXJyIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICBjb25zb2xlLmxvZyhcIkVycm9yIC0gR2V0IENhbXB1c2VzOiBcIiArIGVycik7XHJcbiAgICAgIHJlcy5zZW5kKHsgcmVzdWx0OiBcImVycm9yXCIsIHRpdGxlOiBcIkVycm9yXCIsIG1zZzogXCJUaGVyZSB3YXMgYW4gZXJyb3IgcmV0cmlldmluZyBjYW1wdXMgbGlzdC5cIiwgc2VydmVyTXNnOiBlcnIgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBnZXRJbnN0cnVjdG9ycyhyZXE6IGV4cHJlc3MuUmVxdWVzdCwgcmVzOiBleHByZXNzLlJlc3BvbnNlKTogdm9pZCB7XHJcbiAgICB0cnkge1xyXG4gICAgICBuZXcgQXV0aENvbnRyb2xsZXIoKS5hdXRoVXNlcihyZXEsIHJlcywge1xyXG4gICAgICAgIHJlcXVpcmVkQXV0aDogYXV0aCwgZG9uZTogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgc3FsLmNvbm5lY3QoZGIpXHJcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKGNvbm5lY3Rpb24pIHtcclxuICAgICAgICAgICAgICBuZXcgc3FsLlJlcXVlc3QoY29ubmVjdGlvbilcclxuICAgICAgICAgICAgICAgIC5xdWVyeShgU0VMRUNUIHVzZXJzLiosY29uY2F0KGNvbmNhdChzdGFmZi5maXJzdE5hbWUsJyAnKSxzdGFmZi5sYXN0TmFtZSlbcHJvZmVzc29yTmFtZV0gRlJPTSB1c2Vyc1xyXG4gICAgICAgICAgbGVmdCBqb2luICBzdGFmZiBvbiBzdGFmZi51c2VySUQgPSB1c2Vycy51c2VySURcclxuICAgICAgICAgIHdoZXJlIHVzZXJUeXBlIExJS0UgJyVpbnN0cnVjdG9yJSdgKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24ocmVjb3Jkc2V0KSB7XHJcbiAgICAgICAgICAgICAgICAgIHJlcy5zZW5kKHJlY29yZHNldCk7XHJcbiAgICAgICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbihlcnIpIHtcclxuICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJFcnJvciAtIEdldCBJbnN0cnVjdG9yczogXCIgKyBlcnIpO1xyXG4gICAgICAgICAgICAgICAgICByZXMuc2VuZCh7IHJlc3VsdDogXCJlcnJvclwiLCB0aXRsZTogXCJFcnJvclwiLCBtc2c6IFwiVGhlcmUgd2FzIGFuIGVycm9yIHJldHJpZXZpbmcgYWxsIGluc3RydWN0b3JzLlwiLCBzZXJ2ZXJNc2c6IGVyciB9KTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbihlcnIpIHtcclxuICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkRCIENvbm5lY3Rpb24gZXJyb3IgLSBHZXQgaW5zdHJ1Y3RvcnM6IFwiICsgZXJyKTtcclxuICAgICAgICAgICAgICByZXMuc2VuZCh7IHJlc3VsdDogXCJlcnJvclwiLCB0aXRsZTogXCJDb25uZWN0aW9uIEVycm9yXCIsIG1zZzogXCJUaGVyZSB3YXMgYW4gZXJyb3IgY29ubmVjdGluZyB0byB0aGUgZGF0YWJhc2UuXCIsIHNlcnZlck1zZzogZXJyIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICBjb25zb2xlLmxvZyhcIkVycm9yIC0gR2V0IEluc3RydWN0b3JzOiBcIiArIGVycik7XHJcbiAgICAgIHJlcy5zZW5kKHsgcmVzdWx0OiBcImVycm9yXCIsIHRpdGxlOiBcIkVycm9yXCIsIG1zZzogXCJUaGVyZSB3YXMgYW4gZXJyb3IgcmV0cmlldmluZyBhbGwgaW5zdHJ1Y3RvcnMuXCIsIHNlcnZlck1zZzogZXJyIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbn1cclxuXHJcbmV4cG9ydCA9IENvdXJzZUNvbnRyb2xsZXI7XHJcbiJdfQ==
