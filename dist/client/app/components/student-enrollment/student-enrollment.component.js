System.register(["@angular/core", "@angular/router", "../../services/course.service", "../../services/student.service"], function (exports_1, context_1) {
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
    var core_1, router_1, course_service_1, student_service_1, StudentEnrollmentComponent;
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
            }
        ],
        execute: function () {
            StudentEnrollmentComponent = /** @class */ (function () {
                function StudentEnrollmentComponent(studentService, courseService, route) {
                    this.studentService = studentService;
                    this.courseService = courseService;
                    this.route = route;
                    this.loading = true;
                    this.tempTimetableArry = [];
                }
                StudentEnrollmentComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    this.route.params.forEach(function (params) {
                        _this.courseID = params['courseID'];
                        _this.instructorID = params['instructorID'];
                        _this.courseName = params['courseName'];
                    });
                    this.getStudents();
                };
                StudentEnrollmentComponent.prototype.getStudents = function () {
                    var _this = this;
                    this.studentService
                        .getStudents()
                        .then(function (result) {
                        if (result.error === 'error') {
                            _this.students = null;
                        }
                        else {
                            _this.students = result;
                            for (var _i = 0, _a = _this.students; _i < _a.length; _i++) {
                                var student = _a[_i];
                                student.fullName = student.firstName + " " + student.lastName;
                            }
                            _this.getTimetables();
                        }
                    }).catch(function (error) { return error; });
                };
                StudentEnrollmentComponent.prototype.getTimetables = function () {
                    var _this = this;
                    this.studentService
                        .getTimetables()
                        .then(function (result) {
                        _this.studentTimetables = result;
                        _this.compareTimetables();
                    })
                        .catch(function (error) { return error; });
                };
                StudentEnrollmentComponent.prototype.compareTimetables = function () {
                    var _loop_1 = function (student) {
                        timetable = this_1.studentTimetables.filter(function (x) { return x.userID === student.userID; });
                        for (var _i = 0, timetable_1 = timetable; _i < timetable_1.length; _i++) {
                            var item = timetable_1[_i];
                            itemCourseID = item.courseID.toString();
                            if (itemCourseID === this_1.courseID) {
                                student.enrolled = true;
                            }
                        }
                    };
                    var this_1 = this, timetable, itemCourseID;
                    for (var _i = 0, _a = this.students; _i < _a.length; _i++) {
                        var student = _a[_i];
                        _loop_1(student);
                    }
                    this.loading = false;
                };
                StudentEnrollmentComponent.prototype.checkEnrolled = function (student) {
                    var _this = this;
                    if (student.enrolled) {
                        swal({
                            title: 'Remove ' + student.firstName + ' ' + student.lastName + ' from ' + this.courseName + '?',
                            text: "",
                            type: 'warning',
                            showCancelButton: true,
                            confirmButtonColor: '#3085d6',
                            cancelButtonColor: '#d33',
                            confirmButtonText: 'Yes, remove!'
                        }).then(function (isConfirm) {
                            if (isConfirm) {
                                _this.drop(student);
                            }
                        }).catch(function (error) {
                            //console.log("Canceled");
                        });
                    }
                    else {
                        this.enroll(student);
                    }
                };
                StudentEnrollmentComponent.prototype.enroll = function (student) {
                    var _this = this;
                    var startDate = moment(student.studentStartDate, "DDD MMM YYYY h:mm:ss LT").isValid();
                    var endDate = moment(student.studentEndDate, "DDD MMM YYYY h:mm:ss LT").isValid();
                    if (startDate && endDate) {
                        this.studentService
                            .courseEnroll(student.userID, student.studentStartDate, student.studentEndDate, this.courseID, this.instructorID)
                            .then(function (result) {
                            student.enrolled = true;
                            swal(_this.courseName, '' + student.firstName + ' ' + student.lastName + ' has been succesfully enrolled.', 'success');
                        })
                            .catch(function (error) { return error; });
                    }
                    else {
                        swal('Whoops', 'Please input a valid start and end date for the student.', 'warning');
                    }
                };
                StudentEnrollmentComponent.prototype.drop = function (student) {
                    this.studentService
                        .courseDrop(student.userID, this.courseID)
                        .then(function (result) {
                        student.enrolled = false;
                    })
                        .catch(function (error) { return error; });
                };
                StudentEnrollmentComponent.prototype.checkStatus = function () {
                };
                StudentEnrollmentComponent.prototype.goBack = function () {
                    window.history.back();
                };
                StudentEnrollmentComponent = __decorate([
                    core_1.Component({
                        selector: 'course-selection',
                        templateUrl: './app/components/student-enrollment/student-enrollment.component.html',
                        styleUrls: ['./app/components/student-enrollment/student-enrollment.component.css']
                    }),
                    __metadata("design:paramtypes", [student_service_1.StudentService, course_service_1.CourseService, router_1.ActivatedRoute])
                ], StudentEnrollmentComponent);
                return StudentEnrollmentComponent;
            }());
            exports_1("StudentEnrollmentComponent", StudentEnrollmentComponent);
        }
    };
});

//# sourceMappingURL=student-enrollment.component.js.map
