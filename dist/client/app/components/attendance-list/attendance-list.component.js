System.register(["@angular/core", "@angular/router", "../../services/course.service", "../../services/student.service", "../../services/staff.service"], function (exports_1, context_1) {
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
    var core_1, router_1, course_service_1, student_service_1, staff_service_1, AttendanceListComponent;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (course_service_1_1) {
                course_service_1 = course_service_1_1;
            },
            function (student_service_1_1) {
                student_service_1 = student_service_1_1;
            },
            function (staff_service_1_1) {
                staff_service_1 = staff_service_1_1;
            }
        ],
        execute: function () {
            AttendanceListComponent = /** @class */ (function () {
                function AttendanceListComponent(router, CourseService, StudentService, StaffService) {
                    this.router = router;
                    this.CourseService = CourseService;
                    this.StudentService = StudentService;
                    this.StaffService = StaffService;
                    this.attendanceView = false;
                    this.loading = false;
                    this.absentStudents = [];
                    this.attendanceDates = [];
                    this.instructorOptions = {};
                    this.date = new Date();
                }
                AttendanceListComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
                    var userID = currentUser.userID;
                    if (currentUser.userType !== 'Instructor') {
                        this.StaffService
                            .getUsers()
                            .then(function (instructors) {
                            _this.instructors = instructors.filter(function (x) { return x.userType === 'Instructor'; });
                            for (var _i = 0, _a = _this.instructors; _i < _a.length; _i++) {
                                var item = _a[_i];
                                _this.instructorOptions[item.userID] = item.firstName + " " + item.lastName;
                            }
                        })
                            .catch(function (error) {
                            // do something
                        });
                        console.log(this.instructorOptions);
                        swal({
                            title: 'Attendance',
                            text: 'Select an Instructor',
                            input: "select",
                            inputOptions: this.instructorOptions,
                            showCancelButton: true,
                            animation: "slide-from-top",
                            confirmButtonColor: '#3085d6',
                            allowOutsideClick: false,
                            confirmButtonText: 'Continue',
                            cancelButtonText: 'Back to Dashboard'
                        }).then(function (isConfirm) {
                            if (isConfirm.dismiss === "cancel" || isConfirm.dismiss === "overlay") {
                                console.log(isConfirm.dismiss);
                                _this.router.navigate(['/dashboard']);
                            }
                            else if (isConfirm) {
                                console.log(isConfirm.value);
                            }
                        }).catch(function (error) {
                            console.log(error);
                        });
                    }
                    else {
                        this.getCourses(userID);
                        this.StudentService
                            .getAllAttendance()
                            .then(function (attendance) {
                            if (attendance.status === "403") {
                                _this.previousAttendance = null;
                            }
                            else {
                                _this.previousAttendance = attendance;
                                for (var _i = 0, _a = _this.previousAttendance; _i < _a.length; _i++) {
                                    var item = _a[_i];
                                    item.date = item.date[0] + " " + item.date[1];
                                }
                            }
                        })
                            .catch(function (error) { return console.log(error); });
                    }
                };
                AttendanceListComponent.prototype.getCourses = function (instructorID) {
                    var _this = this;
                    this.CourseService
                        .getInstructorCourses(instructorID)
                        .then(function (result) {
                        var isEmpty = (result || []).length === 0;
                        if (isEmpty) {
                            console.log(result);
                            _this.data = null;
                        }
                        else {
                            _this.data = result;
                        }
                    })
                        .catch(function (error) { return console.log(error); });
                };
                AttendanceListComponent.prototype.doAttendance = function (course) {
                    var _this = this;
                    this.loading = true;
                    this.previousAttendance = this.previousAttendance.filter(function (x) { return x.courseID === course.courseID; });
                    this.courseID = course.courseID;
                    this.StudentService
                        .getTimetablesByCourseId(course.courseID)
                        .then(function (result) {
                        var isEmpty = (result || []).length === 0;
                        if (isEmpty) {
                            _this.timetables = null;
                            _this.attendanceStudents = null;
                            _this.loading = false;
                        }
                        else {
                            _this.timetables = result;
                            _this.getStudentsById(_this.timetables);
                        }
                    })
                        .catch(function (error) { return console.log(error); });
                    this.attendanceCourse = course;
                    var array = this.attendanceCourse.classTimeStr.split(',');
                    var _loop_1 = function (item) {
                        attendanceHistory = this_1.previousAttendance;
                        attendanceHistory = attendanceHistory.filter(function (x) { return x.date === item; });
                        console.log(attendanceHistory);
                        if (attendanceHistory.length !== 0) {
                            console.log("Attendance already taken");
                        }
                        else {
                            date = item.split(' ');
                            this_1.attendanceDates.push(date);
                        }
                    };
                    var this_1 = this, attendanceHistory, date;
                    for (var _i = 0, array_1 = array; _i < array_1.length; _i++) {
                        var item = array_1[_i];
                        _loop_1(item);
                    }
                    this.attendanceView = true;
                    console.log(this.attendanceDates);
                };
                AttendanceListComponent.prototype.getStudentsById = function (timetables) {
                    var _this = this;
                    this.StudentService
                        .getStudentsById(timetables)
                        .then(function (result) {
                        var isEmpty = (result || []).length === 0;
                        if (isEmpty) {
                            _this.attendanceStudents = null;
                        }
                        else {
                            _this.attendanceStudents = result;
                            for (var _i = 0, _a = _this.attendanceStudents; _i < _a.length; _i++) {
                                var student = _a[_i];
                                student.fullName = student.firstName + " " + student.lastName;
                            }
                            _this.loading = false;
                        }
                    })
                        .catch(function (error) { return console.log(error); });
                };
                // markAbsent(student: Student) {
                //   if (student.absent) {
                //     student.absent = false;
                //     var index = this.absentStudents.indexOf(student.studentID);
                //     this.absentStudents.splice(index, 1);
                //   } else {
                //     student.absent = true;
                //     this.absentStudents.push(student.studentID);
                //   }
                //   console.log(this.absentStudents);
                // }
                AttendanceListComponent.prototype.submitAttendance = function () {
                    var _this = this;
                    var count = 0;
                    for (var _i = 0, _a = this.attendanceStudents; _i < _a.length; _i++) {
                        var student = _a[_i];
                        if (student.attendanceValue) {
                            count++;
                        }
                    }
                    if (!this.attendanceCourse.attendanceDate) {
                        console.log(this.attendanceCourse);
                        swal('Attendance Incomplete', 'Please enter an attendance date', 'warning');
                    }
                    else if (count === this.attendanceStudents.length && this.attendanceCourse.attendanceDate) {
                        swal({
                            title: 'Submit Attendance?',
                            text: "You won't be able to revert this!",
                            type: 'info',
                            showCancelButton: true,
                            confirmButtonColor: '#3085d6',
                            cancelButtonColor: '#d33',
                            confirmButtonText: 'Yes, submit!'
                        }).then(function (isConfirm) {
                            if (isConfirm.dismiss === "cancel" || isConfirm.dismiss === "overlay") {
                                console.log(isConfirm.dismiss);
                            }
                            else if (isConfirm) {
                                _this.attendance = {
                                    students: _this.attendanceStudents,
                                    courseID: _this.courseID,
                                    date: _this.attendanceCourse.attendanceDate
                                };
                                _this.StudentService
                                    .insertAttendance(_this.attendance)
                                    .then(function (result) {
                                    swal('Attendance submitted!', '', 'success');
                                    _this.attendanceView = false;
                                    _this.router.navigate(['/attendance-report']);
                                })
                                    .catch(function (error) { return console.log(error); });
                            }
                        }).catch(function (error) {
                            console.log(error);
                        });
                    }
                    else {
                        swal('Attendance Incomplete', 'Please enter attendance for all students', 'warning');
                    }
                };
                AttendanceListComponent.prototype.goBack = function () {
                    window.history.back();
                };
                AttendanceListComponent = __decorate([
                    core_1.Component({
                        selector: 'attendanceList',
                        templateUrl: './app/components/attendance-list/attendance-list.component.html',
                        styleUrls: ['./app/components/attendance-list/attendance-list.component.css']
                    }),
                    __metadata("design:paramtypes", [router_1.Router, course_service_1.CourseService, student_service_1.StudentService, staff_service_1.StaffService])
                ], AttendanceListComponent);
                return AttendanceListComponent;
            }());
            exports_1("AttendanceListComponent", AttendanceListComponent);
        }
    };
});

//# sourceMappingURL=attendance-list.component.js.map
