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
    var core_1, router_1, course_service_1, student_service_1, staff_service_1, WaitListComponent;
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
            WaitListComponent = /** @class */ (function () {
                function WaitListComponent(router, CourseService, StudentService, StaffService) {
                    this.router = router;
                    this.CourseService = CourseService;
                    this.StudentService = StudentService;
                    this.StaffService = StaffService;
                    this.studentsWaiting = [];
                    this.showForm = false;
                }
                WaitListComponent.prototype.ngOnInit = function () {
                    swal({
                        title: 'Loading...',
                        allowOutsideClick: false
                    });
                    swal.showLoading();
                    this.getStudents();
                    //this.getTimetables();
                };
                WaitListComponent.prototype.getStudents = function () {
                    var _this = this;
                    this.StudentService
                        .getStudents()
                        .then(function (students) {
                        if (students.result === 'error') {
                            _this.students = null;
                            _this.displayErrorAlert(students);
                        }
                        else {
                            _this.students = students;
                            for (var _i = 0, _a = _this.students; _i < _a.length; _i++) {
                                var student = _a[_i];
                                student.fullName = student.firstName + " " + student.lastName;
                            }
                            _this.getCourses();
                        }
                    })
                        .catch(function (error) { return console.log("Error - Get students: " + error); });
                };
                WaitListComponent.prototype.getCourses = function () {
                    var _this = this;
                    this.CourseService
                        .getCourses()
                        .then(function (result) {
                        if (result.result === 'error') {
                            _this.courses = null;
                            _this.displayErrorAlert(result);
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
                            _this.getWaitList();
                        }
                    })
                        .catch(function (error) { return console.log("Error - Get courses: " + error); });
                };
                WaitListComponent.prototype.getWaitList = function () {
                    var _this = this;
                    this.studentsWaiting = [];
                    this.CourseService
                        .getWaitList()
                        .then(function (result) {
                        if (result.result === 'error') {
                            _this.waitList = null;
                            _this.displayErrorAlert(result);
                        }
                        else {
                            _this.waitList = result;
                            var _loop_1 = function (item) {
                                student = _this.students.filter(function (x) { return x.userID === item.studentID; });
                                course = _this.courses.filter(function (x) { return x.courseID === item.courseID; });
                                //student[0].fullName = student[0].firstName + " " + student[0].lastName;
                                // student[0].courseID = course[0].courseID;
                                // student[0].professorId = course[0].professorId;
                                student[0].courseName = course[0].courseName;
                                studentRecord = {
                                    fullName: student[0].fullName,
                                    courseName: student[0].courseName,
                                    date: item.date
                                };
                                _this.studentsWaiting.push(studentRecord);
                            };
                            var student, course, studentRecord;
                            for (var _i = 0, _a = _this.waitList; _i < _a.length; _i++) {
                                var item = _a[_i];
                                _loop_1(item);
                            }
                            _this.getTimetables();
                        }
                    })
                        .catch(function (error) { return console.log("Error - Get wait list: " + error); });
                };
                WaitListComponent.prototype.getTimetables = function () {
                    var _this = this;
                    this.StudentService
                        .getTimetables()
                        .then(function (result) {
                        if (result.result === 'error') {
                            _this.timetables = null;
                            _this.displayErrorAlert(result);
                        }
                        else {
                            _this.timetables = result;
                            swal.close();
                        }
                    })
                        .catch(function (error) { return console.log("Error - Get timetables: " + error); });
                };
                WaitListComponent.prototype.showWaitListForm = function () {
                    this.showForm = true;
                };
                WaitListComponent.prototype.addStudentToWaitList = function () {
                    var _this = this;
                    var CurrentDate = moment().format();
                    var timetable = this.timetables.filter(function (x) { return x.courseID === _this.selectedCourse && x.userID === _this.selectedStudent; });
                    if (timetable[0] != null) {
                        swal('Whoops!', 'That student is already enrolled in the selected course.', 'warning');
                    }
                    else if (this.selectedStudent == null || this.selectedCourse == null) {
                        swal('Invalid Input', 'Please select both a student and a course.', 'warning');
                    }
                    else {
                        swal({
                            title: 'Saving...',
                            allowOutsideClick: false
                        });
                        swal.showLoading();
                        this.courseWaitList = null;
                        this.showForm = false;
                        this.CourseService
                            .addToWaitList(this.selectedStudent, this.selectedCourse, CurrentDate)
                            .then(function (result) {
                            if (result.result === 'error') {
                                _this.displayErrorAlert(result);
                            }
                            else if (result.result === 'success') {
                                _this.getWaitList();
                                swal.close();
                            }
                            else {
                                swal('Error', 'Something went wrong while adding student to wait list.', 'error');
                            }
                        })
                            .catch(function (error) { return console.log("Error - Add student to wait list: " + error); });
                    }
                };
                WaitListComponent.prototype.closeMenu = function () {
                    this.showForm = false;
                };
                WaitListComponent.prototype.gotoStudentEnrollment = function (course, data, event) {
                    if (course == null) {
                        course = this.courses.filter(function (x) { return x.courseName === data.courseName; });
                        course = course[0];
                    }
                    this.router.navigate(['/student-enrollment', course.courseID, course.professorId, course.courseName]);
                };
                WaitListComponent.prototype.viewCourseWaitList = function (data) {
                    this.viewingCourse = data;
                    this.studentsWaiting = [];
                    this.courseWaitList = this.waitList.filter(function (x) { return x.courseID === data.courseID; });
                    var _loop_2 = function (item) {
                        student = this_1.students.filter(function (x) { return x.userID === item.studentID; });
                        student[0].fullName = student[0].firstName + " " + student[0].lastName;
                        studentRecord = {
                            fullName: student[0].fullName,
                            date: item.date
                        };
                        this_1.studentsWaiting.push(studentRecord);
                    };
                    var this_1 = this, student, studentRecord;
                    for (var _i = 0, _a = this.courseWaitList; _i < _a.length; _i++) {
                        var item = _a[_i];
                        _loop_2(item);
                    }
                };
                WaitListComponent.prototype.onPrint = function () {
                    window.print();
                };
                WaitListComponent.prototype.displayErrorAlert = function (error) {
                    swal(error.title, error.msg, 'error');
                };
                WaitListComponent.prototype.goBack = function () {
                    window.history.back();
                };
                WaitListComponent = __decorate([
                    core_1.Component({
                        selector: 'waitList',
                        templateUrl: './app/components/wait-list/wait-list.component.html',
                        styleUrls: ['./app/components/wait-list/wait-list.component.css']
                    }),
                    __metadata("design:paramtypes", [router_1.Router, course_service_1.CourseService, student_service_1.StudentService, staff_service_1.StaffService])
                ], WaitListComponent);
                return WaitListComponent;
            }());
            exports_1("WaitListComponent", WaitListComponent);
        }
    };
});

//# sourceMappingURL=wait-list.component.js.map
