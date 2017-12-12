System.register(["@angular/core", "@angular/router", "../../services/student.service", "../../services/course.service"], function (exports_1, context_1) {
    "use strict";
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var __moduleName = context_1 && context_1.id;
    var core_1, router_1, student_service_1, course_service_1, AttendanceReportComponent;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (student_service_1_1) {
                student_service_1 = student_service_1_1;
            },
            function (course_service_1_1) {
                course_service_1 = course_service_1_1;
            }
        ],
        execute: function () {
            AttendanceReportComponent = /** @class */ (function () {
                function AttendanceReportComponent(router, studentService, courseService) {
                    this.router = router;
                    this.studentService = studentService;
                    this.courseService = courseService;
                    this.studentAttendanceView = false;
                    this.records = [];
                    this.noAttendance = false;
                    this.studentReport = false;
                    this.courseAttendanceView = false;
                    this.noStudentsEnrolled = false;
                }
                AttendanceReportComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    this.studentService
                        .getAllAttendance()
                        .then(function (attendance) {
                        if (attendance.status === "403") {
                            _this.data = null;
                        }
                        else {
                            _this.data = attendance;
                            _this.getStudents();
                        }
                    })
                        .catch(function (error) { return console.log(error); });
                };
                AttendanceReportComponent.prototype.getStudents = function () {
                    var _this = this;
                    this.studentService
                        .getStudents()
                        .then(function (students) {
                        if (students.status === "403") {
                            _this.students = null;
                        }
                        else {
                            _this.students = students;
                            for (var _i = 0, _a = _this.students; _i < _a.length; _i++) {
                                var student = _a[_i];
                                student.fullName = student.firstName + " " + student.lastName;
                            }
                        }
                        _this.getCourses();
                    })
                        .catch(function (error) { return console.log(error); });
                };
                AttendanceReportComponent.prototype.getCourses = function () {
                    var _this = this;
                    this.courseService
                        .getCourses()
                        .then(function (result) {
                        if (result.status === "403") {
                            _this.courses = null;
                        }
                        else {
                            //format datetime
                            result.forEach(function (item) {
                                item.courseStart = moment(item.courseStart).format('YYYY-MM-DD');
                                item.courseEnd = moment(item.courseEnd).format('YYYY-MM-DD');
                                // item.classStartTime = moment(item.classStartTime).format('hh:mm A');
                                // item.classEndTime = moment(item.classEndTime).format('hh:mm A');
                            });
                            _this.courses = result;
                            _this.getTimetables();
                        }
                    })
                        .catch(function (error) { return console.log(error); });
                };
                AttendanceReportComponent.prototype.getTimetables = function () {
                    var _this = this;
                    this.studentService
                        .getTimetables()
                        .then(function (result) {
                        if (result.status === "403") {
                            _this.timetables = null;
                        }
                        else {
                            _this.timetables = result;
                        }
                    })
                        .catch(function (error) { return console.log(error); });
                };
                AttendanceReportComponent.prototype.viewStudentReport = function (student) {
                    this.records = [];
                    this.studentAttendanceView = true;
                    this.attendance = this.data.filter(function (x) { return x.userID === student.userID; });
                    this.student = this.students.filter(function (x) { return x.studentID === student.studentID; });
                    this.student = this.student[0];
                    this.totalPresent = this.attendance.filter(function (x) { return x.attendanceValue === 'P'; }).length;
                    this.totalAbsent = this.attendance.filter(function (x) { return x.attendanceValue === 'A'; }).length;
                    this.totalMadeContact = this.attendance.filter(function (x) { return x.attendanceValue === 'MC'; }).length;
                    if (this.attendance.length === 0) {
                        this.noAttendance = true;
                    }
                    else {
                        this.noAttendance = false;
                        var _loop_1 = function (item) {
                            course = this_1.courses.filter(function (x) { return x.courseID === item.courseID; });
                            attendance = {
                                course: course,
                                date: item.date,
                                attendanceValue: item.attendanceValue
                            };
                            this_1.records.push(attendance);
                        };
                        var this_1 = this, course, attendance;
                        for (var _i = 0, _a = this.attendance; _i < _a.length; _i++) {
                            var item = _a[_i];
                            _loop_1(item);
                        }
                    }
                };
                AttendanceReportComponent.prototype.viewCourseReport = function (course) {
                    this.courseTimetables = [];
                    this.courseStudents = [];
                    this.courseAttendanceView = true;
                    this.course = course;
                    this.classTimeStr = this.course.classTimeStr;
                    this.classAbsenceTotal = this.data.filter(function (x) { return x.courseID === course.courseID && x.attendanceValue === 'A'; }).length;
                    this.classPresenceTotal = this.data.filter(function (x) { return x.courseID === course.courseID && x.attendanceValue === 'P'; }).length;
                    this.classMadeContactTotal = this.data.filter(function (x) { return x.courseID === course.courseID && x.attendanceValue === 'MC'; }).length;
                    if (this.classTimeStr) {
                        var array = this.classTimeStr.split(',');
                        this.classTimeStr = [];
                        for (var _i = 0, array_1 = array; _i < array_1.length; _i++) {
                            var item = array_1[_i];
                            var date = item.split(' ');
                            // var day = date[0];
                            // var time = date[1];
                            // var startTime = time.split('-')[0];
                            // var endTime = time.split('-')[1];
                            this.classTimeStr.push(date);
                        }
                    }
                    var studentInfo;
                    if (this.data.length === 0) {
                        this.noAttendance = true;
                    }
                    else {
                        this.noAttendance = false;
                        this.courseTimetables = this.timetables.filter(function (x) { return x.courseID === course.courseID; });
                        var _loop_2 = function (item) {
                            studentInfo = {
                                student: this_2.students.filter(function (x) { return x.userID === item.userID; })[0],
                                startDate: item.startDate,
                                endDate: item.endDate,
                                attendanceInfo: this_2.data.filter(function (x) { return x.userID === item.userID && x.courseID === course.courseID; })
                            };
                            this_2.courseStudents.push(studentInfo);
                        };
                        var this_2 = this;
                        for (var _a = 0, _b = this.courseTimetables; _a < _b.length; _a++) {
                            var item = _b[_a];
                            _loop_2(item);
                        }
                    }
                    if (this.courseStudents.length === 0) {
                        this.noStudentsEnrolled = true;
                    }
                    else {
                        this.noStudentsEnrolled = false;
                    }
                };
                AttendanceReportComponent.prototype.overallStatus = function () {
                    this.courseAttendanceView = false;
                    this.studentAttendanceView = false;
                    this.noAttendance = false;
                };
                AttendanceReportComponent.prototype.goBack = function () {
                    window.history.back();
                };
                AttendanceReportComponent = __decorate([
                    core_1.Component({
                        selector: 'attendanceReportComponet',
                        templateUrl: './app/components/attendance-report/attendance-report.component.html',
                        styleUrls: ['./app/components/attendance-report/attendance-report.component.css']
                    }),
                    __metadata("design:paramtypes", [router_1.Router, student_service_1.StudentService, course_service_1.CourseService])
                ], AttendanceReportComponent);
                return AttendanceReportComponent;
            }());
            exports_1("AttendanceReportComponent", AttendanceReportComponent);
        }
    };
});

//# sourceMappingURL=attendance-report.component.js.map
