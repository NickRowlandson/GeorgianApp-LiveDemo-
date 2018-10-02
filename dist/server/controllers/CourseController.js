"use strict";
const AuthController = require("../controllers/AuthController");
const ActivityService = require("../services/ActivityService");
const sql = require('mssql');
var auth = ["Admin", "Staff", "Instructor"];
const config = require('../config');
const db = config.db;
const mail = config.mail;
const site_settings = config.site_settings;
class CourseController {
    // select
    retrieve(req, res) {
        try {
            new AuthController().authUser(req, res, {
                requiredAuth: auth, done: function (currentUserID) {
                    sql.connect(db)
                        .then(function (connection) {
                        new sql.Request(connection)
                            .query(`SELECT course.*,concat(concat(staff.firstName,' '),staff.lastName)[professorName],campusName FROM Course
          left join users on users.userID=course.professorId
          left join campus on campus.campusId = course.campusId
          left join staff on staff.userID = course.professorId`)
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
    }
    getInstructorCourses(req, res) {
        try {
            new AuthController().authUser(req, res, {
                requiredAuth: auth, done: function (currentUserID) {
                    var _id = req.params._id;
                    sql.connect(db)
                        .then(function (connection) {
                        new sql.Request(connection)
                            .query(`SELECT * FROM Course WHERE professorId = ${_id}`)
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
    }
    delete(req, res) {
        try {
            new AuthController().authUser(req, res, {
                requiredAuth: auth, done: function (currentUserID) {
                    var _id = req.params._id;
                    sql.connect(db)
                        .then(function (connection) {
                        sql.query `DELETE FROM Course WHERE courseID = ${_id}`
                            .then(function (result) {
                            new ActivityService().reportActivity('course', 'Course Deleted', 'success', _id, currentUserID, 'Course has been deleted.');
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
    }
    update(req, res) {
        try {
            new AuthController().authUser(req, res, {
                requiredAuth: auth, done: function (currentUserID) {
                    var course = req.body;
                    var _id = req.params._id;
                    sql.connect(db)
                        .then(function (connection) {
                        sql.query `UPDATE Course SET courseName = ${course.courseName},courseType = ${course.courseType},professorId = ${course.professorId},
          campusId = ${course.campusId},classroom = ${course.classroom},courseStart = ${course.courseStart},
          courseEnd = ${course.courseEnd},classTimeStr = ${course.classTimeStr} WHERE courseID = ${_id}`
                            .then(function (result) {
                            new ActivityService().reportActivity('course', 'Course Updated', 'success', _id, currentUserID, 'Course has been updated.');
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
    }
    findById(req, res) {
        try {
            new AuthController().authUser(req, res, {
                requiredAuth: auth, done: function (currentUserID) {
                    var _id = req.params._id;
                    sql.connect(db)
                        .then(function (connection) {
                        new sql.Request(connection)
                            .query(`SELECT course.*,username[professorName],campusName FROM Course
          left join users on users.userID=course.professorId
          left join campus on campus.campusId = course.campusId
          where courseId=${_id}`)
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
    }
    // insert
    create(req, res) {
        try {
            new AuthController().authUser(req, res, {
                requiredAuth: auth, done: function (currentUserID) {
                    // get course from req url
                    var course = req.body;
                    sql.connect(db)
                        .then(function () {
                        sql.query `INSERT INTO Course (courseName, courseType, professorId, campusId, classroom, classTimeStr, courseStart, courseEnd)
        VALUES(${course.courseName}, ${course.courseType}, ${course.professorId}, ${course.campusId}, ${course.classroom}, ${course.classTimeStr},
          ${course.courseStart},${course.courseEnd})`
                            .then(function (result) {
                            new ActivityService().reportActivity('course', 'Course Created', 'success', '', currentUserID, "Course name '" + course.courseName + "' has been successfully created.");
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
    }
    getCourseTypes(req, res) {
        try {
            new AuthController().authUser(req, res, {
                requiredAuth: auth, done: function (currentUserID) {
                    sql.connect(db)
                        .then(function (connection) {
                        new sql.Request(connection)
                            .query(`SELECT * FROM CourseTypes`)
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
    }
    getCampuses(req, res) {
        try {
            new AuthController().authUser(req, res, {
                requiredAuth: auth, done: function (currentUserID) {
                    sql.connect(db)
                        .then(function (connection) {
                        new sql.Request(connection)
                            .query(`SELECT * FROM Campus`)
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
    }
    getInstructors(req, res) {
        try {
            new AuthController().authUser(req, res, {
                requiredAuth: auth, done: function (currentUserID) {
                    sql.connect(db)
                        .then(function (connection) {
                        new sql.Request(connection)
                            .query(`SELECT users.*,concat(concat(staff.firstName,' '),staff.lastName)[professorName] FROM users
          left join  staff on staff.userID = users.userID
          where userType LIKE '%instructor%'`)
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
    }
    getWaitList(req, res) {
        try {
            new AuthController().authUser(req, res, {
                requiredAuth: auth, done: function (currentUserID) {
                    sql.connect(db)
                        .then(function (connection) {
                        new sql.Request(connection)
                            .query(`SELECT * FROM WaitList`)
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
    }
    getWaitListById(req, res) {
        try {
            new AuthController().authUser(req, res, {
                requiredAuth: auth, done: function (currentUserID) {
                    var _id = req.params._id;
                    sql.connect(db)
                        .then(function (connection) {
                        new sql.Request(connection)
                            .query(`SELECT * FROM WaitList WHERE userID = ${_id}`)
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
    }
    addToWaitList(req, res) {
        try {
            new AuthController().authUser(req, res, {
                requiredAuth: auth, done: function (currentUserID) {
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
                            new ActivityService().reportActivity('client', 'Course Wait List', 'success', userID, currentUserID, 'User has been added to the course wait list.');
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
    }
    removeFromWaitList(req, res) {
        try {
            new AuthController().authUser(req, res, {
                requiredAuth: auth, done: function (currentUserID) {
                    var _studentId = req.params._studentId;
                    var _courseType = req.params._courseType;
                    sql.connect(db)
                        .then(function (connection) {
                        sql.query `DELETE FROM WaitList WHERE userID = ${_studentId} AND courseType = ${_courseType}`
                            .then(function (result) {
                            new ActivityService().reportActivity('wait list', 'Course Wait List', 'success', _studentId, currentUserID, 'Student has been removed from the ' + _courseType + ' wait list.');
                            res.send({ result: "success", title: "Student Removed", msg: "Student successfully removed from wait list.", serverMsg: "" });
                        }).catch(function (err) {
                            console.log("Remove from wait list " + err);
                            res.send({ result: "error", title: "Error", msg: "There was an error removing student from wait list.", serverMsg: err });
                        });
                    }).catch(function (err) {
                        console.log("DB Connection error - Delete course: " + err);
                        res.send({ result: "error", title: "Connection Error", msg: "There was an error connecting to the database.", serverMsg: err });
                    });
                }
            });
        }
        catch (err) {
            console.log("Error - Remove from wait list: " + err);
            res.send({ result: "error", title: "Error", msg: "There was an error removing student from wait list.", serverMsg: err });
        }
    }
    addToCourseTypes(req, res) {
        try {
            new AuthController().authUser(req, res, {
                requiredAuth: auth, done: function (currentUserID) {
                    // get course from req url
                    console.log(req.body);
                    var courseType = req.body.courseType;
                    sql.connect(db)
                        .then(function (connection) {
                        new sql.Request(connection)
                            .query("INSERT INTO CourseTypes (courseType) VALUES ('" + courseType + "')")
                            .then(function (result) {
                            new ActivityService().reportActivity('course', 'Manage Courses', 'success', '', currentUserID, "New course type named: " + courseType + " has been added. ");
                            res.send({ result: "success", title: "Success!", msg: "New course type has been added.", serverMsg: "" });
                        }).catch(function (err) {
                            console.log("Error - Add new course type: " + err);
                            res.send({ result: "error", title: "Error", msg: "There was an error while adding the new course type.", serverMsg: err });
                        });
                    }).catch(function (err) {
                        console.log("DB Connection error - Add new course type: " + err);
                        res.send({ result: "error", title: "Connection Error", msg: "There was an error connecting to the database.", serverMsg: err });
                    });
                }
            });
        }
        catch (err) {
            console.log("Error - Add new course type: " + err);
            res.send({ result: "error", title: "Error", msg: "There was an error while adding the new course type.", serverMsg: err });
        }
    }
}
module.exports = CourseController;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NlcnZlci9zcmMvY29udHJvbGxlcnMvQ291cnNlQ29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBR0EsZ0VBQWlFO0FBQ2pFLE1BQU0sZUFBZSxHQUFHLE9BQU8sQ0FBQyw2QkFBNkIsQ0FBQyxDQUFDO0FBQy9ELE1BQU0sR0FBRyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUM3QixJQUFJLElBQUksR0FBRyxDQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUUsWUFBWSxDQUFDLENBQUM7QUFDNUMsTUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDO0FBQ3BDLE1BQU0sRUFBRSxHQUFHLE1BQU0sQ0FBQyxFQUFFLENBQUM7QUFDckIsTUFBTSxJQUFJLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQztBQUN6QixNQUFNLGFBQWEsR0FBRyxNQUFNLENBQUMsYUFBYSxDQUFDO0FBRTNDO0lBRUUsU0FBUztJQUNULFFBQVEsQ0FBQyxHQUFvQixFQUFFLEdBQXFCO1FBQ2xELElBQUk7WUFDRixJQUFJLGNBQWMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFO2dCQUN0QyxZQUFZLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxVQUFTLGFBQWE7b0JBRTlDLEdBQUcsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDO3lCQUNaLElBQUksQ0FBQyxVQUFTLFVBQVU7d0JBQ3ZCLElBQUksR0FBRyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUM7NkJBQ3hCLEtBQUssQ0FBQzs7OytEQUd3QyxDQUFDOzZCQUMvQyxJQUFJLENBQUMsVUFBUyxTQUFTOzRCQUN0QixHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO3dCQUN0QixDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsVUFBUyxHQUFHOzRCQUNuQixPQUFPLENBQUMsR0FBRyxDQUFDLHNCQUFzQixHQUFHLEdBQUcsQ0FBQyxDQUFD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QzVHLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxVQUFTLEdBQUc7NEJBQ25CLE9BQU8sQ0FBQyxHQUFHLENBQUMsK0JBQStCLEdBQUcsR0FBRyxDQUFDLENBQUM7NEJBQ25ELEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsR0FBRyxFQUFFLHNEQUFzRCxFQUFFLFNBQVMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDO3dCQUM3SCxDQUFDLENBQUMsQ0FBQztvQkFDUCxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsVUFBUyxHQUFHO3dCQUNuQixPQUFPLENBQUMsR0FBRyxDQUFDLDZDQUE2QyxHQUFHLEdBQUcsQ0FBQyxDQUFDO3dCQUNqRSxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsa0JBQWtCLEVBQUUsR0FBRyxFQUFFLGdEQUFnRCxFQUFFLFNBQVMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDO29CQUNsSSxDQUFDLENBQUMsQ0FBQztnQkFFUCxDQUFDO2FBQ0YsQ0FBQyxDQUFDO1NBQ0o7UUFBQyxPQUFPLEdBQUcsRUFBRTtZQUNaLE9BQU8sQ0FBQyxHQUFHLENBQUMsK0JBQStCLEdBQUcsR0FBRyxDQUFDLENBQUM7WUFDbkQsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxHQUFHLEVBQUUsc0RBQXNELEVBQUUsU0FBUyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUM7U0FDNUg7SUFDSCxDQUFDO0NBRUY7QUFFRCxpQkFBUyxnQkFBZ0IsQ0FBQyIsImZpbGUiOiJjb250cm9sbGVycy9Db3Vyc2VDb250cm9sbGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGV4cHJlc3MgPSByZXF1aXJlKFwiZXhwcmVzc1wiKTtcclxuaW1wb3J0IGp3dCA9IHJlcXVpcmUoJ2pzb253ZWJ0b2tlbicpO1xyXG5pbXBvcnQgYmNyeXB0ID0gcmVxdWlyZSgnYmNyeXB0Jyk7XHJcbmltcG9ydCBBdXRoQ29udHJvbGxlciA9IHJlcXVpcmUoXCIuLi9jb250cm9sbGVycy9BdXRoQ29udHJvbGxlclwiKTtcclxuY29uc3QgQWN0aXZpdHlTZXJ2aWNlID0gcmVxdWlyZShcIi4uL3NlcnZpY2VzL0FjdGl2aXR5U2VydmljZVwiKTtcclxuY29uc3Qgc3FsID0gcmVxdWlyZSgnbXNzcWwnKTtcclxudmFyIGF1dGggPSBbXCJBZG1pblwiLCBcIlN0YWZmXCIsIFwiSW5zdHJ1Y3RvclwiXTtcclxuY29uc3QgY29uZmlnID0gcmVxdWlyZSgnLi4vY29uZmlnJyk7XHJcbmNvbnN0IGRiID0gY29uZmlnLmRiO1xyXG5jb25zdCBtYWlsID0gY29uZmlnLm1haWw7XHJcbmNvbnN0IHNpdGVfc2V0dGluZ3MgPSBjb25maWcuc2l0ZV9zZXR0aW5ncztcclxuXHJcbmNsYXNzIENvdXJzZUNvbnRyb2xsZXIge1xyXG5cclxuICAvLyBzZWxlY3RcclxuICByZXRyaWV2ZShyZXE6IGV4cHJlc3MuUmVxdWVzdCwgcmVzOiBleHByZXNzLlJlc3BvbnNlKTogdm9pZCB7XHJcbiAgICB0cnkge1xyXG4gICAgICBuZXcgQXV0aENvbnRyb2xsZXIoKS5hdXRoVXNlcihyZXEsIHJlcywge1xyXG4gICAgICAgIHJlcXVpcmVkQXV0aDogYXV0aCwgZG9uZTogZnVuY3Rpb24oY3VycmVudFVzZXJJRCkge1xyXG5cclxuICAgICAgICAgIHNxbC5jb25uZWN0KGRiKVxyXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbihjb25uZWN0aW9uKSB7XHJcbiAgICAgICAgICAgICAgbmV3IHNxbC5SZXF1ZXN0KGNvbm5lY3Rpb24pXHJcbiAgICAgICAgICAgICAgICAucXVlcnkoYFNFTEVDVCBjb3Vyc2UuKixjb25jYXQoY29uY2F0KHN0YWZmLmZpcnN0TmFtZSwnICcpLHN0YWZmLmxhc3ROYW1lKVtwcm9mZXNzb3JOYW1lXSxjYW1wdXNOYW1lIEZST00gQ291cnNlXHJcbiAgICAgICAgICBsZWZ0IGpvaW4gdXNlcnMgb24gdXNlcnMudXNlcklEPWNvdXJzZS5wcm9mZXNzb3JJZFxyXG4gICAgICAgICAgbGVmdCBqb2luIGNhbXB1cyBvbiBjYW1wdXMuY2FtcHVzSWQgPSBjb3Vyc2UuY2FtcHVzSWRcclxuICAgICAgICAgIGxlZnQgam9pbiBzdGFmZiBvbiBzdGFmZi51c2VySUQgPSBjb3Vyc2UucHJvZmVzc29ySWRgKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24ocmVjb3Jkc2V0KSB7XHJcbiAgICAgICAgICAgICAgICAgIHJlcy5zZW5kKHJlY29yZHNldCk7XHJcbiAgICAgICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbihlcnIpIHtcclxuICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJSZXRyaWV2ZSBhbGwgY291cnNlIFwiICsgZXJyKTtcclxuICAgICAgICAgICAgICAgICAgcmVzLnNlbmQoeyByZXN1bHQ6IFwiZXJyb3JcIiwgdGl0bGU6IFwiRXJyb3JcIiwgbXNnOiBcIlRoZXJlIHdhcyBhbiBlcnJvciByZXRyaWV2aW5nIGFsbCBjb3Vyc2VzLlwiLCBzZXJ2ZXJNc2c6IGVyciB9KTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbihlcnIpIHtcclxuICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkRCIENvbm5lY3Rpb24gZXJyb3IgLSBSZXRyaWV2ZSBhbGwgY291cnNlczogXCIgKyBlcnIpO1xyXG4gICAgICAgICAgICAgIHJlcy5zZW5kKHsgcmVzdWx0OiBcImVycm9yXCIsIHRpdGxlOiBcIkNvbm5lY3Rpb24gRXJyb3JcIiwgbXNnOiBcIlRoZXJlIHdhcyBhbiBlcnJvciBjb25uZWN0aW5nIHRvIHRoZSBkYXRhYmFzZS5cIiwgc2VydmVyTXNnOiBlcnIgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3IgLSBSZXRyaWV2ZSBhbGwgY291cnNlczogXCIgKyBlcnIpO1xyXG4gICAgICByZXMuc2VuZCh7IHJlc3VsdDogXCJlcnJvclwiLCB0aXRsZTogXCJFcnJvclwiLCBtc2c6IFwiVGhlcmUgd2FzIGFuIGVycm9yIHJldHJpZXZpbmcgYWxsIGNvdXJzZXMuXCIsIHNlcnZlck1zZzogZXJyIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZ2V0SW5zdHJ1Y3RvckNvdXJzZXMocmVxOiBleHByZXNzLlJlcXVlc3QsIHJlczogZXhwcmVzcy5SZXNwb25zZSk6IHZvaWQge1xyXG4gICAgdHJ5IHtcclxuICAgICAgbmV3IEF1dGhDb250cm9sbGVyKCkuYXV0aFVzZXIocmVxLCByZXMsIHtcclxuICAgICAgICByZXF1aXJlZEF1dGg6IGF1dGgsIGRvbmU6IGZ1bmN0aW9uKGN1cnJlbnRVc2VySUQpIHtcclxuXHJcbiAgICAgICAgICB2YXIgX2lkOiBzdHJpbmcgPSByZXEucGFyYW1zLl9pZDtcclxuXHJcbiAgICAgICAgICBzcWwuY29ubmVjdChkYilcclxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24oY29ubmVjdGlvbikge1xyXG4gICAgICAgICAgICAgIG5ldyBzcWwuUmVxdWVzdChjb25uZWN0aW9uKVxyXG4gICAgICAgICAgICAgICAgLnF1ZXJ5KGBTRUxFQ1QgKiBGUk9NIENvdXJzZSBXSEVSRSBwcm9mZXNzb3JJZCA9ICR7X2lkfWApXHJcbiAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbihyZWNvcmRzZXQpIHtcclxuICAgICAgICAgICAgICAgICAgcmVzLnNlbmQocmVjb3Jkc2V0KTtcclxuICAgICAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGVycikge1xyXG4gICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlNlbGVjdCBpbnN0cnVjdG9ycyBjb3Vyc2VzIFwiICsgZXJyKTtcclxuICAgICAgICAgICAgICAgICAgcmVzLnNlbmQoeyByZXN1bHQ6IFwiZXJyb3JcIiwgdGl0bGU6IFwiRXJyb3JcIiwgbXNnOiBcIlRoZXJlIHdhcyBhbiBlcnJvciByZXRyaWV2aW5nIGFsbCBpbnN0cnVjdG9yIGNvdXJzZXMuXCIsIHNlcnZlck1zZzogZXJyIH0pO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGVycikge1xyXG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiREIgQ29ubmVjdGlvbiBlcnJvciAtIEdldCBpbnN0cnVjdG9ycyBjb3Vyc2VzOiBcIiArIGVycik7XHJcbiAgICAgICAgICAgICAgcmVzLnNlbmQoeyByZXN1bHQ6IFwiZXJyb3JcIiwgdGl0bGU6IFwiQ29ubmVjdGlvbiBFcnJvclwiLCBtc2c6IFwiVGhlcmUgd2FzIGFuIGVycm9yIGNvbm5lY3RpbmcgdG8gdGhlIGRhdGFiYXNlLlwiLCBzZXJ2ZXJNc2c6IGVyciB9KTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgY29uc29sZS5sb2coXCJFcnJvciAtIEdldCBpbnN0cnVjdG9ycyBjb3Vyc2VzOiBcIiArIGVycik7XHJcbiAgICAgIHJlcy5zZW5kKHsgcmVzdWx0OiBcImVycm9yXCIsIHRpdGxlOiBcIkVycm9yXCIsIG1zZzogXCJUaGVyZSB3YXMgYW4gZXJyb3IgcmV0cmlldmluZyBhbGwgaW5zdHJ1Y3RvciBjb3Vyc2VzLlwiLCBzZXJ2ZXJNc2c6IGVyciB9KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGRlbGV0ZShyZXE6IGV4cHJlc3MuUmVxdWVzdCwgcmVzOiBleHByZXNzLlJlc3BvbnNlKTogdm9pZCB7XHJcbiAgICB0cnkge1xyXG4gICAgICBuZXcgQXV0aENvbnRyb2xsZXIoKS5hdXRoVXNlcihyZXEsIHJlcywge1xyXG4gICAgICAgIHJlcXVpcmVkQXV0aDogYXV0aCwgZG9uZTogZnVuY3Rpb24oY3VycmVudFVzZXJJRCkge1xyXG5cclxuICAgICAgICAgIHZhciBfaWQ6IHN0cmluZyA9IHJlcS5wYXJhbXMuX2lkO1xyXG5cclxuICAgICAgICAgIHNxbC5jb25uZWN0KGRiKVxyXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbihjb25uZWN0aW9uKSB7XHJcbiAgICAgICAgICAgICAgc3FsLnF1ZXJ5XHJcbiAgICAgICAgICAgICAgICBgREVMRVRFIEZST00gQ291cnNlIFdIRVJFIGNvdXJzZUlEID0gJHtfaWR9YFxyXG4gICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICAgIG5ldyBBY3Rpdml0eVNlcnZpY2UoKS5yZXBvcnRBY3Rpdml0eSgnY291cnNlJywgJ0NvdXJzZSBEZWxldGVkJywgJ3N1Y2Nlc3MnLCBfaWQsIGN1cnJlbnRVc2VySUQsICdDb3Vyc2UgaGFzIGJlZW4gZGVsZXRlZC4nKTtcclxuICAgICAgICAgICAgICAgICAgcmVzLnNlbmQoeyByZXN1bHQ6IFwic3VjY2Vzc1wiLCB0aXRsZTogXCJDb3Vyc2UgRGVsZXRlZFwiLCBtc2c6IFwiQ291cnNlIGhhcyBiZWVuIGRlbGV0ZWQgc3VjY2Vzc2Z1bGx5LlwiLCBzZXJ2ZXJNc2c6IFwiXCIgfSk7XHJcbiAgICAgICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbihlcnIpIHtcclxuICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJVcGRhdGUgY291cnNlIFwiICsgZXJyKTtcclxuICAgICAgICAgICAgICAgICAgcmVzLnNlbmQoeyByZXN1bHQ6IFwiZXJyb3JcIiwgdGl0bGU6IFwiRXJyb3JcIiwgbXNnOiBcIlRoZXJlIHdhcyBhbiBlcnJvciBkZWxldGluZyB0aGUgY291cnNlLlwiLCBzZXJ2ZXJNc2c6IGVyciB9KTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbihlcnIpIHtcclxuICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkRCIENvbm5lY3Rpb24gZXJyb3IgLSBEZWxldGUgY291cnNlOiBcIiArIGVycik7XHJcbiAgICAgICAgICAgICAgcmVzLnNlbmQoeyByZXN1bHQ6IFwiZXJyb3JcIiwgdGl0bGU6IFwiQ29ubmVjdGlvbiBFcnJvclwiLCBtc2c6IFwiVGhlcmUgd2FzIGFuIGVycm9yIGNvbm5lY3RpbmcgdG8gdGhlIGRhdGFiYXNlLlwiLCBzZXJ2ZXJNc2c6IGVyciB9KTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgY29uc29sZS5sb2coXCJFcnJvciAtIERlbGV0ZSBjb3Vyc2U6IFwiICsgZXJyKTtcclxuICAgICAgcmVzLnNlbmQoeyByZXN1bHQ6IFwiZXJyb3JcIiwgdGl0bGU6IFwiRXJyb3JcIiwgbXNnOiBcIlRoZXJlIHdhcyBhbiBlcnJvciBkZWxldGluZyB0aGUgY291cnNlLlwiLCBzZXJ2ZXJNc2c6IGVyciB9KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHVwZGF0ZShyZXE6IGV4cHJlc3MuUmVxdWVzdCwgcmVzOiBleHByZXNzLlJlc3BvbnNlKTogdm9pZCB7XHJcbiAgICB0cnkge1xyXG4gICAgICBuZXcgQXV0aENvbnRyb2xsZXIoKS5hdXRoVXNlcihyZXEsIHJlcywge1xyXG4gICAgICAgIHJlcXVpcmVkQXV0aDogYXV0aCwgZG9uZTogZnVuY3Rpb24oY3VycmVudFVzZXJJRCkge1xyXG5cclxuICAgICAgICAgIHZhciBjb3Vyc2UgPSByZXEuYm9keTtcclxuICAgICAgICAgIHZhciBfaWQ6IHN0cmluZyA9IHJlcS5wYXJhbXMuX2lkO1xyXG5cclxuICAgICAgICAgIHNxbC5jb25uZWN0KGRiKVxyXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbihjb25uZWN0aW9uKSB7XHJcbiAgICAgICAgICAgICAgc3FsLnF1ZXJ5XHJcbiAgICAgICAgICAgICAgICBgVVBEQVRFIENvdXJzZSBTRVQgY291cnNlTmFtZSA9ICR7Y291cnNlLmNvdXJzZU5hbWV9LGNvdXJzZVR5cGUgPSAke2NvdXJzZS5jb3Vyc2VUeXBlfSxwcm9mZXNzb3JJZCA9ICR7Y291cnNlLnByb2Zlc3NvcklkfSxcclxuICAgICAgICAgIGNhbXB1c0lkID0gJHtjb3Vyc2UuY2FtcHVzSWR9LGNsYXNzcm9vbSA9ICR7Y291cnNlLmNsYXNzcm9vbX0sY291cnNlU3RhcnQgPSAke2NvdXJzZS5jb3Vyc2VTdGFydH0sXHJcbiAgICAgICAgICBjb3Vyc2VFbmQgPSAke2NvdXJzZS5jb3Vyc2VFbmR9LGNsYXNzVGltZVN0ciA9ICR7Y291cnNlLmNsYXNzVGltZVN0cn0gV0hFUkUgY291cnNlSUQgPSAke19pZH1gXHJcbiAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgICAgbmV3IEFjdGl2aXR5U2VydmljZSgpLnJlcG9ydEFjdGl2aXR5KCdjb3Vyc2UnLCAnQ291cnNlIFVwZGF0ZWQnLCAnc3VjY2VzcycsIF9pZCwgY3VycmVudFVzZXJJRCwgJ0NvdXJzZSBoYXMgYmVlbiB1cGRhdGVkLicpO1xyXG4gICAgICAgICAgICAgICAgICByZXMuc2VuZCh7IHJlc3VsdDogXCJzdWNjZXNzXCIsIHRpdGxlOiBcIkNvdXJzZSBVcGRhdGVkIVwiLCBtc2c6IFwiQ291cnNlIGhhcyBiZWVuIHVwZGF0ZWQgc3VjY2Vzc2Z1bGx5LlwiLCBzZXJ2ZXJNc2c6IFwiXCIgfSk7XHJcbiAgICAgICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbihlcnIpIHtcclxuICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJVcGRhdGUgY291cnNlIFwiICsgZXJyKTtcclxuICAgICAgICAgICAgICAgICAgcmVzLnNlbmQoeyByZXN1bHQ6IFwiZXJyb3JcIiwgdGl0bGU6IFwiRXJyb3JcIiwgbXNnOiBcIlRoZXJlIHdhcyBhbiBlcnJvciB1cGRhdGluZyB0aGUgY291cnNlLlwiLCBzZXJ2ZXJNc2c6IGVyciB9KTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbihlcnIpIHtcclxuICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkRCIENvbm5lY3Rpb24gZXJyb3IgLSBVcGRhdGUgY291cnNlOiBcIiArIGVycik7XHJcbiAgICAgICAgICAgICAgcmVzLnNlbmQoeyByZXN1bHQ6IFwiZXJyb3JcIiwgdGl0bGU6IFwiQ29ubmVjdGlvbiBFcnJvclwiLCBtc2c6IFwiVGhlcmUgd2FzIGFuIGVycm9yIGNvbm5lY3RpbmcgdG8gdGhlIGRhdGFiYXNlLlwiLCBzZXJ2ZXJNc2c6IGVyciB9KTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgY29uc29sZS5sb2coXCJFcnJvciAtIFVwZGF0ZSBjb3Vyc2U6IFwiICsgZXJyKTtcclxuICAgICAgcmVzLnNlbmQoeyByZXN1bHQ6IFwiZXJyb3JcIiwgdGl0bGU6IFwiRXJyb3JcIiwgbXNnOiBcIlRoZXJlIHdhcyBhbiBlcnJvciB1cGRhdGluZyB0aGUgY291cnNlLlwiLCBzZXJ2ZXJNc2c6IGVyciB9KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGZpbmRCeUlkKHJlcTogZXhwcmVzcy5SZXF1ZXN0LCByZXM6IGV4cHJlc3MuUmVzcG9uc2UpOiB2b2lkIHtcclxuICAgIHRyeSB7XHJcbiAgICAgIG5ldyBBdXRoQ29udHJvbGxlcigpLmF1dGhVc2VyKHJlcSwgcmVzLCB7XHJcbiAgICAgICAgcmVxdWlyZWRBdXRoOiBhdXRoLCBkb25lOiBmdW5jdGlvbihjdXJyZW50VXNlcklEKSB7XHJcblxyXG4gICAgICAgICAgdmFyIF9pZDogc3RyaW5nID0gcmVxLnBhcmFtcy5faWQ7XHJcblxyXG4gICAgICAgICAgc3FsLmNvbm5lY3QoZGIpXHJcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKGNvbm5lY3Rpb24pIHtcclxuICAgICAgICAgICAgICBuZXcgc3FsLlJlcXVlc3QoY29ubmVjdGlvbilcclxuICAgICAgICAgICAgICAucXVlcnkoYFNFTEVDVCBjb3Vyc2UuKix1c2VybmFtZVtwcm9mZXNzb3JOYW1lXSxjYW1wdXNOYW1lIEZST00gQ291cnNlXHJcbiAgICAgICAgICBsZWZ0IGpvaW4gdXNlcnMgb24gdXNlcnMudXNlcklEPWNvdXJzZS5wcm9mZXNzb3JJZFxyXG4gICAgICAgICAgbGVmdCBqb2luIGNhbXB1cyBvbiBjYW1wdXMuY2FtcHVzSWQgPSBjb3Vyc2UuY2FtcHVzSWRcclxuICAgICAgICAgIHdoZXJlIGNvdXJzZUlkPSR7X2lkfWApXHJcbiAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbihyZWNvcmRzZXQpIHtcclxuICAgICAgICAgICAgICAgICAgcmVzLnNlbmQocmVjb3Jkc2V0KTtcclxuICAgICAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGVycikge1xyXG4gICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yIC0gRmluZCBjb3Vyc2UgYnkgaWQ6IFwiICsgZXJyKTtcclxuICAgICAgICAgICAgICAgICAgcmVzLnNlbmQoeyByZXN1bHQ6IFwiZXJyb3JcIiwgdGl0bGU6IFwiRXJyb3JcIiwgbXNnOiBcIlRoZXJlIHdhcyBhbiBlcnJvciBmaW5kaW5nIGNvdXJzZSBieSBpZC5cIiwgc2VydmVyTXNnOiBlcnIgfSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XHJcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJEQiBDb25uZWN0aW9uIGVycm9yIC0gRmluZCBjb3Vyc2UgYnkgaWQ6IFwiICsgZXJyKTtcclxuICAgICAgICAgICAgICByZXMuc2VuZCh7IHJlc3VsdDogXCJlcnJvclwiLCB0aXRsZTogXCJDb25uZWN0aW9uIEVycm9yXCIsIG1zZzogXCJUaGVyZSB3YXMgYW4gZXJyb3IgY29ubmVjdGluZyB0byB0aGUgZGF0YWJhc2UuXCIsIHNlcnZlck1zZzogZXJyIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICBjb25zb2xlLmxvZyhcIkVycm9yIC0gRmluZCBjb3Vyc2UgYnkgaWQ6IFwiICsgZXJyKTtcclxuICAgICAgcmVzLnNlbmQoeyByZXN1bHQ6IFwiZXJyb3JcIiwgdGl0bGU6IFwiRXJyb3JcIiwgbXNnOiBcIlRoZXJlIHdhcyBhbiBlcnJvciBmaW5kaW5nIGNvdXJzZSBieSBpZC5cIiwgc2VydmVyTXNnOiBlcnIgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvLyBpbnNlcnRcclxuICBjcmVhdGUocmVxOiBleHByZXNzLlJlcXVlc3QsIHJlczogZXhwcmVzcy5SZXNwb25zZSk6IHZvaWQge1xyXG4gICAgdHJ5IHtcclxuICAgICAgbmV3IEF1dGhDb250cm9sbGVyKCkuYXV0aFVzZXIocmVxLCByZXMsIHtcclxuICAgICAgICByZXF1aXJlZEF1dGg6IGF1dGgsIGRvbmU6IGZ1bmN0aW9uKGN1cnJlbnRVc2VySUQpIHtcclxuXHJcbiAgICAgICAgICAvLyBnZXQgY291cnNlIGZyb20gcmVxIHVybFxyXG4gICAgICAgICAgdmFyIGNvdXJzZSA9IHJlcS5ib2R5O1xyXG5cclxuICAgICAgICAgIHNxbC5jb25uZWN0KGRiKVxyXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICBzcWwucXVlcnlcclxuICAgICAgICAgICAgICAgIGBJTlNFUlQgSU5UTyBDb3Vyc2UgKGNvdXJzZU5hbWUsIGNvdXJzZVR5cGUsIHByb2Zlc3NvcklkLCBjYW1wdXNJZCwgY2xhc3Nyb29tLCBjbGFzc1RpbWVTdHIsIGNvdXJzZVN0YXJ0LCBjb3Vyc2VFbmQpXHJcbiAgICAgICAgVkFMVUVTKCR7Y291cnNlLmNvdXJzZU5hbWV9LCAke2NvdXJzZS5jb3Vyc2VUeXBlfSwgJHtjb3Vyc2UucHJvZmVzc29ySWR9LCAke2NvdXJzZS5jYW1wdXNJZH0sICR7Y291cnNlLmNsYXNzcm9vbX0sICR7Y291cnNlLmNsYXNzVGltZVN0cn0sXHJcbiAgICAgICAgICAke2NvdXJzZS5jb3Vyc2VTdGFydH0sJHtjb3Vyc2UuY291cnNlRW5kfSlgXHJcbiAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgICAgbmV3IEFjdGl2aXR5U2VydmljZSgpLnJlcG9ydEFjdGl2aXR5KCdjb3Vyc2UnLCAnQ291cnNlIENyZWF0ZWQnLCAnc3VjY2VzcycsICcnLCBjdXJyZW50VXNlcklELCBcIkNvdXJzZSBuYW1lICdcIiArIGNvdXJzZS5jb3Vyc2VOYW1lICsgXCInIGhhcyBiZWVuIHN1Y2Nlc3NmdWxseSBjcmVhdGVkLlwiICk7XHJcbiAgICAgICAgICAgICAgICAgIHJlcy5zZW5kKHsgcmVzdWx0OiBcInN1Y2Nlc3NcIiwgdGl0bGU6IFwiQ291cnNlIENyZWF0ZWQhXCIsIG1zZzogXCJDb3Vyc2UgaGFzIGJlZW4gY3JlYXRlZCBzdWNjZXNzZnVsbHkuXCIsIHNlcnZlck1zZzogXCJcIiB9KTtcclxuICAgICAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGVycikge1xyXG4gICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yIC0gQ3JlYXRlIGNvdXJzZTogXCIgKyBlcnIpO1xyXG4gICAgICAgICAgICAgICAgICByZXMuc2VuZCh7IHJlc3VsdDogXCJlcnJvclwiLCB0aXRsZTogXCJFcnJvclwiLCBtc2c6IFwiVGhlcmUgd2FzIGFuIGVycm9yIGNyZWF0aW5nIGNvdXJzZS5cIiwgc2VydmVyTXNnOiBlcnIgfSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XHJcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJEQiBDb25uZWN0aW9uIGVycm9yIC0gQ3JlYXRlIGNvdXJzZTogXCIgKyBlcnIpO1xyXG4gICAgICAgICAgICAgIHJlcy5zZW5kKHsgcmVzdWx0OiBcImVycm9yXCIsIHRpdGxlOiBcIkNvbm5lY3Rpb24gRXJyb3JcIiwgbXNnOiBcIlRoZXJlIHdhcyBhbiBlcnJvciBjb25uZWN0aW5nIHRvIHRoZSBkYXRhYmFzZS5cIiwgc2VydmVyTXNnOiBlcnIgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3IgLSBDcmVhdGUgY291cnNlOiBcIiArIGVycik7XHJcbiAgICAgIHJlcy5zZW5kKHsgcmVzdWx0OiBcImVycm9yXCIsIHRpdGxlOiBcIkVycm9yXCIsIG1zZzogXCJUaGVyZSB3YXMgYW4gZXJyb3IgY3JlYXRpbmcgY291cnNlLlwiLCBzZXJ2ZXJNc2c6IGVyciB9KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGdldENvdXJzZVR5cGVzKHJlcTogZXhwcmVzcy5SZXF1ZXN0LCByZXM6IGV4cHJlc3MuUmVzcG9uc2UpOiB2b2lkIHtcclxuICAgIHRyeSB7XHJcblxyXG4gICAgICBuZXcgQXV0aENvbnRyb2xsZXIoKS5hdXRoVXNlcihyZXEsIHJlcywge1xyXG4gICAgICAgIHJlcXVpcmVkQXV0aDogYXV0aCwgZG9uZTogZnVuY3Rpb24oY3VycmVudFVzZXJJRCkge1xyXG5cclxuICAgICAgICAgIHNxbC5jb25uZWN0KGRiKVxyXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbihjb25uZWN0aW9uKSB7XHJcbiAgICAgICAgICAgICAgbmV3IHNxbC5SZXF1ZXN0KGNvbm5lY3Rpb24pXHJcbiAgICAgICAgICAgICAgICAucXVlcnkoYFNFTEVDVCAqIEZST00gQ291cnNlVHlwZXNgKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24ocmVjb3Jkc2V0KSB7XHJcbiAgICAgICAgICAgICAgICAgIHJlcy5zZW5kKHJlY29yZHNldCk7XHJcbiAgICAgICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbihlcnIpIHtcclxuICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJFcnJvciAtIEdldCBjb3Vyc2UgdHlwZXM6IFwiICsgZXJyKTtcclxuICAgICAgICAgICAgICAgICAgcmVzLnNlbmQoeyByZXN1bHQ6IFwiZXJyb3JcIiwgdGl0bGU6IFwiRXJyb3JcIiwgbXNnOiBcIlRoZXJlIHdhcyBhbiBlcnJvciByZXRyaWV2aW5nIGNvdXJzZSB0eXBlcy5cIiwgc2VydmVyTXNnOiBlcnIgfSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XHJcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJEQiBDb25uZWN0aW9uIGVycm9yIC0gR2V0IGNhbXB1c2VzOiBcIiArIGVycik7XHJcbiAgICAgICAgICAgICAgcmVzLnNlbmQoeyByZXN1bHQ6IFwiZXJyb3JcIiwgdGl0bGU6IFwiQ29ubmVjdGlvbiBFcnJvclwiLCBtc2c6IFwiVGhlcmUgd2FzIGFuIGVycm9yIGNvbm5lY3RpbmcgdG8gdGhlIGRhdGFiYXNlLlwiLCBzZXJ2ZXJNc2c6IGVyciB9KTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgY29uc29sZS5sb2coXCJFcnJvciAtIEdldCBDb3Vyc2UgVHlwZXM6IFwiICsgZXJyKTtcclxuICAgICAgcmVzLnNlbmQoeyByZXN1bHQ6IFwiZXJyb3JcIiwgdGl0bGU6IFwiRXJyb3JcIiwgbXNnOiBcIlRoZXJlIHdhcyBhbiBlcnJvciByZXRyaWV2aW5nIGNvdXJzZSB0eXBlcy5cIiwgc2VydmVyTXNnOiBlcnIgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBnZXRDYW1wdXNlcyhyZXE6IGV4cHJlc3MuUmVxdWVzdCwgcmVzOiBleHByZXNzLlJlc3BvbnNlKTogdm9pZCB7XHJcbiAgICB0cnkge1xyXG5cclxuICAgICAgbmV3IEF1dGhDb250cm9sbGVyKCkuYXV0aFVzZXIocmVxLCByZXMsIHtcclxuICAgICAgICByZXF1aXJlZEF1dGg6IGF1dGgsIGRvbmU6IGZ1bmN0aW9uKGN1cnJlbnRVc2VySUQpIHtcclxuXHJcbiAgICAgICAgICBzcWwuY29ubmVjdChkYilcclxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24oY29ubmVjdGlvbikge1xyXG4gICAgICAgICAgICAgIG5ldyBzcWwuUmVxdWVzdChjb25uZWN0aW9uKVxyXG4gICAgICAgICAgICAgICAgLnF1ZXJ5KGBTRUxFQ1QgKiBGUk9NIENhbXB1c2ApXHJcbiAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbihyZWNvcmRzZXQpIHtcclxuICAgICAgICAgICAgICAgICAgcmVzLnNlbmQocmVjb3Jkc2V0KTtcclxuICAgICAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGVycikge1xyXG4gICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yIC0gR2V0IGNhbXB1c2VzOiBcIiArIGVycik7XHJcbiAgICAgICAgICAgICAgICAgIHJlcy5zZW5kKHsgcmVzdWx0OiBcImVycm9yXCIsIHRpdGxlOiBcIkVycm9yXCIsIG1zZzogXCJUaGVyZSB3YXMgYW4gZXJyb3IgcmV0cmlldmluZyBjYW1wdXMgbGlzdC5cIiwgc2VydmVyTXNnOiBlcnIgfSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XHJcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJEQiBDb25uZWN0aW9uIGVycm9yIC0gR2V0IGNhbXB1c2VzOiBcIiArIGVycik7XHJcbiAgICAgICAgICAgICAgcmVzLnNlbmQoeyByZXN1bHQ6IFwiZXJyb3JcIiwgdGl0bGU6IFwiQ29ubmVjdGlvbiBFcnJvclwiLCBtc2c6IFwiVGhlcmUgd2FzIGFuIGVycm9yIGNvbm5lY3RpbmcgdG8gdGhlIGRhdGFiYXNlLlwiLCBzZXJ2ZXJNc2c6IGVyciB9KTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgY29uc29sZS5sb2coXCJFcnJvciAtIEdldCBDYW1wdXNlczogXCIgKyBlcnIpO1xyXG4gICAgICByZXMuc2VuZCh7IHJlc3VsdDogXCJlcnJvclwiLCB0aXRsZTogXCJFcnJvclwiLCBtc2c6IFwiVGhlcmUgd2FzIGFuIGVycm9yIHJldHJpZXZpbmcgY2FtcHVzIGxpc3QuXCIsIHNlcnZlck1zZzogZXJyIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZ2V0SW5zdHJ1Y3RvcnMocmVxOiBleHByZXNzLlJlcXVlc3QsIHJlczogZXhwcmVzcy5SZXNwb25zZSk6IHZvaWQge1xyXG4gICAgdHJ5IHtcclxuICAgICAgbmV3IEF1dGhDb250cm9sbGVyKCkuYXV0aFVzZXIocmVxLCByZXMsIHtcclxuICAgICAgICByZXF1aXJlZEF1dGg6IGF1dGgsIGRvbmU6IGZ1bmN0aW9uKGN1cnJlbnRVc2VySUQpIHtcclxuXHJcbiAgICAgICAgICBzcWwuY29ubmVjdChkYilcclxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24oY29ubmVjdGlvbikge1xyXG4gICAgICAgICAgICAgIG5ldyBzcWwuUmVxdWVzdChjb25uZWN0aW9uKVxyXG4gICAgICAgICAgICAgICAgLnF1ZXJ5KGBTRUxFQ1QgdXNlcnMuKixjb25jYXQoY29uY2F0KHN0YWZmLmZpcnN0TmFtZSwnICcpLHN0YWZmLmxhc3ROYW1lKVtwcm9mZXNzb3JOYW1lXSBGUk9NIHVzZXJzXHJcbiAgICAgICAgICBsZWZ0IGpvaW4gIHN0YWZmIG9uIHN0YWZmLnVzZXJJRCA9IHVzZXJzLnVzZXJJRFxyXG4gICAgICAgICAgd2hlcmUgdXNlclR5cGUgTElLRSAnJWluc3RydWN0b3IlJ2ApXHJcbiAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbihyZWNvcmRzZXQpIHtcclxuICAgICAgICAgICAgICAgICAgcmVzLnNlbmQocmVjb3Jkc2V0KTtcclxuICAgICAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGVycikge1xyXG4gICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yIC0gR2V0IEluc3RydWN0b3JzOiBcIiArIGVycik7XHJcbiAgICAgICAgICAgICAgICAgIHJlcy5zZW5kKHsgcmVzdWx0OiBcImVycm9yXCIsIHRpdGxlOiBcIkVycm9yXCIsIG1zZzogXCJUaGVyZSB3YXMgYW4gZXJyb3IgcmV0cmlldmluZyBhbGwgaW5zdHJ1Y3RvcnMuXCIsIHNlcnZlck1zZzogZXJyIH0pO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGVycikge1xyXG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiREIgQ29ubmVjdGlvbiBlcnJvciAtIEdldCBpbnN0cnVjdG9yczogXCIgKyBlcnIpO1xyXG4gICAgICAgICAgICAgIHJlcy5zZW5kKHsgcmVzdWx0OiBcImVycm9yXCIsIHRpdGxlOiBcIkNvbm5lY3Rpb24gRXJyb3JcIiwgbXNnOiBcIlRoZXJlIHdhcyBhbiBlcnJvciBjb25uZWN0aW5nIHRvIHRoZSBkYXRhYmFzZS5cIiwgc2VydmVyTXNnOiBlcnIgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3IgLSBHZXQgSW5zdHJ1Y3RvcnM6IFwiICsgZXJyKTtcclxuICAgICAgcmVzLnNlbmQoeyByZXN1bHQ6IFwiZXJyb3JcIiwgdGl0bGU6IFwiRXJyb3JcIiwgbXNnOiBcIlRoZXJlIHdhcyBhbiBlcnJvciByZXRyaWV2aW5nIGFsbCBpbnN0cnVjdG9ycy5cIiwgc2VydmVyTXNnOiBlcnIgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBnZXRXYWl0TGlzdChyZXE6IGV4cHJlc3MuUmVxdWVzdCwgcmVzOiBleHByZXNzLlJlc3BvbnNlKTogdm9pZCB7XHJcbiAgICB0cnkge1xyXG4gICAgICBuZXcgQXV0aENvbnRyb2xsZXIoKS5hdXRoVXNlcihyZXEsIHJlcywge1xyXG4gICAgICAgIHJlcXVpcmVkQXV0aDogYXV0aCwgZG9uZTogZnVuY3Rpb24oY3VycmVudFVzZXJJRCkge1xyXG5cclxuICAgICAgICAgIHNxbC5jb25uZWN0KGRiKVxyXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbihjb25uZWN0aW9uKSB7XHJcbiAgICAgICAgICAgICAgbmV3IHNxbC5SZXF1ZXN0KGNvbm5lY3Rpb24pXHJcbiAgICAgICAgICAgICAgICAucXVlcnkoYFNFTEVDVCAqIEZST00gV2FpdExpc3RgKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24ocmVjb3Jkc2V0KSB7XHJcbiAgICAgICAgICAgICAgICAgIHJlcy5zZW5kKHJlY29yZHNldCk7XHJcbiAgICAgICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbihlcnIpIHtcclxuICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJFcnJvciAtIEdldCB3YWl0IGxpc3Q6IFwiICsgZXJyKTtcclxuICAgICAgICAgICAgICAgICAgcmVzLnNlbmQoeyByZXN1bHQ6IFwiZXJyb3JcIiwgdGl0bGU6IFwiRXJyb3JcIiwgbXNnOiBcIlRoZXJlIHdhcyBhbiBlcnJvciByZXRyaWV2aW5nIHdhaXQgbGlzdCBpbmZvcm1hdGlvbi5cIiwgc2VydmVyTXNnOiBlcnIgfSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XHJcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJEQiBDb25uZWN0aW9uIGVycm9yIC0gR2V0IGluc3RydWN0b3JzOiBcIiArIGVycik7XHJcbiAgICAgICAgICAgICAgcmVzLnNlbmQoeyByZXN1bHQ6IFwiZXJyb3JcIiwgdGl0bGU6IFwiQ29ubmVjdGlvbiBFcnJvclwiLCBtc2c6IFwiVGhlcmUgd2FzIGFuIGVycm9yIGNvbm5lY3RpbmcgdG8gdGhlIGRhdGFiYXNlLlwiLCBzZXJ2ZXJNc2c6IGVyciB9KTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgY29uc29sZS5sb2coXCJFcnJvciAtIEdldCB3YWl0IGxpc3Q6IFwiICsgZXJyKTtcclxuICAgICAgcmVzLnNlbmQoeyByZXN1bHQ6IFwiZXJyb3JcIiwgdGl0bGU6IFwiRXJyb3JcIiwgbXNnOiBcIlRoZXJlIHdhcyBhbiBlcnJvciByZXRyaWV2aW5nIHdhaXQgbGlzdCBpbmZvcm1hdGlvbi5cIiwgc2VydmVyTXNnOiBlcnIgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBnZXRXYWl0TGlzdEJ5SWQocmVxOiBleHByZXNzLlJlcXVlc3QsIHJlczogZXhwcmVzcy5SZXNwb25zZSk6IHZvaWQge1xyXG4gICAgdHJ5IHtcclxuICAgICAgbmV3IEF1dGhDb250cm9sbGVyKCkuYXV0aFVzZXIocmVxLCByZXMsIHtcclxuICAgICAgICByZXF1aXJlZEF1dGg6IGF1dGgsIGRvbmU6IGZ1bmN0aW9uKGN1cnJlbnRVc2VySUQpIHtcclxuXHJcbiAgICAgICAgICB2YXIgX2lkOiBzdHJpbmcgPSByZXEucGFyYW1zLl9pZDtcclxuXHJcbiAgICAgICAgICBzcWwuY29ubmVjdChkYilcclxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24oY29ubmVjdGlvbikge1xyXG4gICAgICAgICAgICAgIG5ldyBzcWwuUmVxdWVzdChjb25uZWN0aW9uKVxyXG4gICAgICAgICAgICAgICAgLnF1ZXJ5KGBTRUxFQ1QgKiBGUk9NIFdhaXRMaXN0IFdIRVJFIHVzZXJJRCA9ICR7X2lkfWApXHJcbiAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgICAgcmVzLnNlbmQocmVzdWx0KTtcclxuICAgICAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGVycikge1xyXG4gICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yIC0gR2V0IHdhaXQgbGlzdDogXCIgKyBlcnIpO1xyXG4gICAgICAgICAgICAgICAgICByZXMuc2VuZCh7IHJlc3VsdDogXCJlcnJvclwiLCB0aXRsZTogXCJFcnJvclwiLCBtc2c6IFwiVGhlcmUgd2FzIGFuIGVycm9yIHJldHJpZXZpbmcgd2FpdCBsaXN0IGluZm9ybWF0aW9uLlwiLCBzZXJ2ZXJNc2c6IGVyciB9KTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbihlcnIpIHtcclxuICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkRCIENvbm5lY3Rpb24gZXJyb3IgLSBHZXQgaW5zdHJ1Y3RvcnM6IFwiICsgZXJyKTtcclxuICAgICAgICAgICAgICByZXMuc2VuZCh7IHJlc3VsdDogXCJlcnJvclwiLCB0aXRsZTogXCJDb25uZWN0aW9uIEVycm9yXCIsIG1zZzogXCJUaGVyZSB3YXMgYW4gZXJyb3IgY29ubmVjdGluZyB0byB0aGUgZGF0YWJhc2UuXCIsIHNlcnZlck1zZzogZXJyIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICBjb25zb2xlLmxvZyhcIkVycm9yIC0gR2V0IHdhaXQgbGlzdDogXCIgKyBlcnIpO1xyXG4gICAgICByZXMuc2VuZCh7IHJlc3VsdDogXCJlcnJvclwiLCB0aXRsZTogXCJFcnJvclwiLCBtc2c6IFwiVGhlcmUgd2FzIGFuIGVycm9yIHJldHJpZXZpbmcgd2FpdCBsaXN0IGluZm9ybWF0aW9uLlwiLCBzZXJ2ZXJNc2c6IGVyciB9KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGFkZFRvV2FpdExpc3QocmVxOiBleHByZXNzLlJlcXVlc3QsIHJlczogZXhwcmVzcy5SZXNwb25zZSk6IHZvaWQge1xyXG4gICAgdHJ5IHtcclxuICAgICAgbmV3IEF1dGhDb250cm9sbGVyKCkuYXV0aFVzZXIocmVxLCByZXMsIHtcclxuICAgICAgICByZXF1aXJlZEF1dGg6IGF1dGgsIGRvbmU6IGZ1bmN0aW9uKGN1cnJlbnRVc2VySUQpIHtcclxuXHJcbiAgICAgICAgICAvLyBnZXQgY291cnNlIGZyb20gcmVxIHVybFxyXG4gICAgICAgICAgdmFyIGNvdXJzZSA9IHJlcS5ib2R5O1xyXG4gICAgICAgICAgdmFyIHVzZXJJRCA9IGNvdXJzZS51c2VySUQ7XHJcbiAgICAgICAgICB2YXIgY291cnNlVHlwZSA9IGNvdXJzZS5jb3Vyc2VUeXBlO1xyXG4gICAgICAgICAgdmFyIGRhdGUgPSBjb3Vyc2UuZGF0ZTtcclxuICAgICAgICAgIHNxbC5jb25uZWN0KGRiKVxyXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbihjb25uZWN0aW9uKSB7XHJcbiAgICAgICAgICAgICAgbmV3IHNxbC5SZXF1ZXN0KGNvbm5lY3Rpb24pXHJcbiAgICAgICAgICAgICAgICAucXVlcnkoXCJJTlNFUlQgSU5UTyBXYWl0TGlzdCAoY291cnNlVHlwZSwgdXNlcklELCBkYXRlKSBWQUxVRVMgKCdcIiArIGNvdXJzZVR5cGUgKyBcIicsICdcIiArIHVzZXJJRCArIFwiJywgJ1wiICsgZGF0ZSArIFwiJylcIilcclxuICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgICBuZXcgQWN0aXZpdHlTZXJ2aWNlKCkucmVwb3J0QWN0aXZpdHkoJ2NsaWVudCcsICdDb3Vyc2UgV2FpdCBMaXN0JywgJ3N1Y2Nlc3MnLCB1c2VySUQsIGN1cnJlbnRVc2VySUQsICdVc2VyIGhhcyBiZWVuIGFkZGVkIHRvIHRoZSBjb3Vyc2Ugd2FpdCBsaXN0LicpO1xyXG4gICAgICAgICAgICAgICAgICByZXMuc2VuZCh7IHJlc3VsdDogXCJzdWNjZXNzXCIsIHRpdGxlOiBcIlN1Y2Nlc3MhXCIsIG1zZzogXCJVc2VyIGhhcyBiZWVuIGFkZGVkIHRvIHRoZSB3YWl0IGxpc3QuXCIsIHNlcnZlck1zZzogXCJcIiB9KTtcclxuICAgICAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGVycikge1xyXG4gICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yIC0gQWRkIHRvIHdhaXQgbGlzdDogXCIgKyBlcnIpO1xyXG4gICAgICAgICAgICAgICAgICByZXMuc2VuZCh7IHJlc3VsdDogXCJlcnJvclwiLCB0aXRsZTogXCJFcnJvclwiLCBtc2c6IFwiVGhlcmUgd2FzIGFuIGVycm9yIHdoaWxlIGFkZGluZyBzdHVkZW50IHRvIHRoZSB3YWl0IGxpc3QuXCIsIHNlcnZlck1zZzogZXJyIH0pO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGVycikge1xyXG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiREIgQ29ubmVjdGlvbiBlcnJvciAtIENyZWF0ZSBjb3Vyc2U6IFwiICsgZXJyKTtcclxuICAgICAgICAgICAgICByZXMuc2VuZCh7IHJlc3VsdDogXCJlcnJvclwiLCB0aXRsZTogXCJDb25uZWN0aW9uIEVycm9yXCIsIG1zZzogXCJUaGVyZSB3YXMgYW4gZXJyb3IgY29ubmVjdGluZyB0byB0aGUgZGF0YWJhc2UuXCIsIHNlcnZlck1zZzogZXJyIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICBjb25zb2xlLmxvZyhcIkVycm9yIC0gQWRkIHRvIHdhaXQgbGlzdDogXCIgKyBlcnIpO1xyXG4gICAgICByZXMuc2VuZCh7IHJlc3VsdDogXCJlcnJvclwiLCB0aXRsZTogXCJFcnJvclwiLCBtc2c6IFwiVGhlcmUgd2FzIGFuIGVycm9yIHdoaWxlIGFkZGluZyBzdHVkZW50IHRvIHRoZSB3YWl0IGxpc3QuXCIsIHNlcnZlck1zZzogZXJyIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcmVtb3ZlRnJvbVdhaXRMaXN0KHJlcTogZXhwcmVzcy5SZXF1ZXN0LCByZXM6IGV4cHJlc3MuUmVzcG9uc2UpOiB2b2lkIHtcclxuICAgIHRyeSB7XHJcbiAgICAgIG5ldyBBdXRoQ29udHJvbGxlcigpLmF1dGhVc2VyKHJlcSwgcmVzLCB7XHJcbiAgICAgICAgcmVxdWlyZWRBdXRoOiBhdXRoLCBkb25lOiBmdW5jdGlvbihjdXJyZW50VXNlcklEKSB7XHJcblxyXG4gICAgICAgICAgdmFyIF9zdHVkZW50SWQ6IHN0cmluZyA9IHJlcS5wYXJhbXMuX3N0dWRlbnRJZDtcclxuICAgICAgICAgIHZhciBfY291cnNlVHlwZTogc3RyaW5nID0gcmVxLnBhcmFtcy5fY291cnNlVHlwZTtcclxuXHJcbiAgICAgICAgICBzcWwuY29ubmVjdChkYilcclxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24oY29ubmVjdGlvbikge1xyXG4gICAgICAgICAgICAgIHNxbC5xdWVyeVxyXG4gICAgICAgICAgICAgICAgYERFTEVURSBGUk9NIFdhaXRMaXN0IFdIRVJFIHVzZXJJRCA9ICR7X3N0dWRlbnRJZH0gQU5EIGNvdXJzZVR5cGUgPSAke19jb3Vyc2VUeXBlfWBcclxuICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgICBuZXcgQWN0aXZpdHlTZXJ2aWNlKCkucmVwb3J0QWN0aXZpdHkoJ3dhaXQgbGlzdCcsICdDb3Vyc2UgV2FpdCBMaXN0JywgJ3N1Y2Nlc3MnLCBfc3R1ZGVudElkLCBjdXJyZW50VXNlcklELCAnU3R1ZGVudCBoYXMgYmVlbiByZW1vdmVkIGZyb20gdGhlICcgKyBfY291cnNlVHlwZSArICcgd2FpdCBsaXN0LicpO1xyXG4gICAgICAgICAgICAgICAgICByZXMuc2VuZCh7IHJlc3VsdDogXCJzdWNjZXNzXCIsIHRpdGxlOiBcIlN0dWRlbnQgUmVtb3ZlZFwiLCBtc2c6IFwiU3R1ZGVudCBzdWNjZXNzZnVsbHkgcmVtb3ZlZCBmcm9tIHdhaXQgbGlzdC5cIiwgc2VydmVyTXNnOiBcIlwiIH0pO1xyXG4gICAgICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiUmVtb3ZlIGZyb20gd2FpdCBsaXN0IFwiICsgZXJyKTtcclxuICAgICAgICAgICAgICAgICAgcmVzLnNlbmQoeyByZXN1bHQ6IFwiZXJyb3JcIiwgdGl0bGU6IFwiRXJyb3JcIiwgbXNnOiBcIlRoZXJlIHdhcyBhbiBlcnJvciByZW1vdmluZyBzdHVkZW50IGZyb20gd2FpdCBsaXN0LlwiLCBzZXJ2ZXJNc2c6IGVyciB9KTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbihlcnIpIHtcclxuICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkRCIENvbm5lY3Rpb24gZXJyb3IgLSBEZWxldGUgY291cnNlOiBcIiArIGVycik7XHJcbiAgICAgICAgICAgICAgcmVzLnNlbmQoeyByZXN1bHQ6IFwiZXJyb3JcIiwgdGl0bGU6IFwiQ29ubmVjdGlvbiBFcnJvclwiLCBtc2c6IFwiVGhlcmUgd2FzIGFuIGVycm9yIGNvbm5lY3RpbmcgdG8gdGhlIGRhdGFiYXNlLlwiLCBzZXJ2ZXJNc2c6IGVyciB9KTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgY29uc29sZS5sb2coXCJFcnJvciAtIFJlbW92ZSBmcm9tIHdhaXQgbGlzdDogXCIgKyBlcnIpO1xyXG4gICAgICByZXMuc2VuZCh7IHJlc3VsdDogXCJlcnJvclwiLCB0aXRsZTogXCJFcnJvclwiLCBtc2c6IFwiVGhlcmUgd2FzIGFuIGVycm9yIHJlbW92aW5nIHN0dWRlbnQgZnJvbSB3YWl0IGxpc3QuXCIsIHNlcnZlck1zZzogZXJyIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgYWRkVG9Db3Vyc2VUeXBlcyhyZXE6IGV4cHJlc3MuUmVxdWVzdCwgcmVzOiBleHByZXNzLlJlc3BvbnNlKTogdm9pZCB7XHJcbiAgICB0cnkge1xyXG4gICAgICBuZXcgQXV0aENvbnRyb2xsZXIoKS5hdXRoVXNlcihyZXEsIHJlcywge1xyXG4gICAgICAgIHJlcXVpcmVkQXV0aDogYXV0aCwgZG9uZTogZnVuY3Rpb24oY3VycmVudFVzZXJJRCkge1xyXG5cclxuICAgICAgICAgIC8vIGdldCBjb3Vyc2UgZnJvbSByZXEgdXJsXHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhyZXEuYm9keSk7XHJcbiAgICAgICAgICB2YXIgY291cnNlVHlwZSA9IHJlcS5ib2R5LmNvdXJzZVR5cGU7XHJcbiAgICAgICAgICBzcWwuY29ubmVjdChkYilcclxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24oY29ubmVjdGlvbikge1xyXG4gICAgICAgICAgICAgIG5ldyBzcWwuUmVxdWVzdChjb25uZWN0aW9uKVxyXG4gICAgICAgICAgICAgICAgLnF1ZXJ5KFwiSU5TRVJUIElOVE8gQ291cnNlVHlwZXMgKGNvdXJzZVR5cGUpIFZBTFVFUyAoJ1wiICsgY291cnNlVHlwZSArIFwiJylcIilcclxuICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgICBuZXcgQWN0aXZpdHlTZXJ2aWNlKCkucmVwb3J0QWN0aXZpdHkoJ2NvdXJzZScsICdNYW5hZ2UgQ291cnNlcycsICdzdWNjZXNzJywgJycsIGN1cnJlbnRVc2VySUQsIFwiTmV3IGNvdXJzZSB0eXBlIG5hbWVkOiBcIiArIGNvdXJzZVR5cGUgKyBcIiBoYXMgYmVlbiBhZGRlZC4gXCIpO1xyXG4gICAgICAgICAgICAgICAgICByZXMuc2VuZCh7IHJlc3VsdDogXCJzdWNjZXNzXCIsIHRpdGxlOiBcIlN1Y2Nlc3MhXCIsIG1zZzogXCJOZXcgY291cnNlIHR5cGUgaGFzIGJlZW4gYWRkZWQuXCIsIHNlcnZlck1zZzogXCJcIiB9KTtcclxuICAgICAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGVycikge1xyXG4gICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yIC0gQWRkIG5ldyBjb3Vyc2UgdHlwZTogXCIgKyBlcnIpO1xyXG4gICAgICAgICAgICAgICAgICByZXMuc2VuZCh7IHJlc3VsdDogXCJlcnJvclwiLCB0aXRsZTogXCJFcnJvclwiLCBtc2c6IFwiVGhlcmUgd2FzIGFuIGVycm9yIHdoaWxlIGFkZGluZyB0aGUgbmV3IGNvdXJzZSB0eXBlLlwiLCBzZXJ2ZXJNc2c6IGVyciB9KTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbihlcnIpIHtcclxuICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkRCIENvbm5lY3Rpb24gZXJyb3IgLSBBZGQgbmV3IGNvdXJzZSB0eXBlOiBcIiArIGVycik7XHJcbiAgICAgICAgICAgICAgcmVzLnNlbmQoeyByZXN1bHQ6IFwiZXJyb3JcIiwgdGl0bGU6IFwiQ29ubmVjdGlvbiBFcnJvclwiLCBtc2c6IFwiVGhlcmUgd2FzIGFuIGVycm9yIGNvbm5lY3RpbmcgdG8gdGhlIGRhdGFiYXNlLlwiLCBzZXJ2ZXJNc2c6IGVyciB9KTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgY29uc29sZS5sb2coXCJFcnJvciAtIEFkZCBuZXcgY291cnNlIHR5cGU6IFwiICsgZXJyKTtcclxuICAgICAgcmVzLnNlbmQoeyByZXN1bHQ6IFwiZXJyb3JcIiwgdGl0bGU6IFwiRXJyb3JcIiwgbXNnOiBcIlRoZXJlIHdhcyBhbiBlcnJvciB3aGlsZSBhZGRpbmcgdGhlIG5ldyBjb3Vyc2UgdHlwZS5cIiwgc2VydmVyTXNnOiBlcnIgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxufVxyXG5cclxuZXhwb3J0ID0gQ291cnNlQ29udHJvbGxlcjtcclxuIl19
