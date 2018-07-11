System.register(["@angular/core", "@angular/router", "../../services/course.service", "../../services/student.service", "../../services/client.service", "../../services/staff.service"], function (exports_1, context_1) {
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
    var core_1, router_1, course_service_1, student_service_1, client_service_1, staff_service_1, WaitListComponent;
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
            function (client_service_1_1) {
                client_service_1 = client_service_1_1;
            },
            function (staff_service_1_1) {
                staff_service_1 = staff_service_1_1;
            }
        ],
        execute: function () {
            WaitListComponent = /** @class */ (function () {
                function WaitListComponent(router, CourseService, StudentService, ClientService, StaffService) {
                    this.router = router;
                    this.CourseService = CourseService;
                    this.StudentService = StudentService;
                    this.ClientService = ClientService;
                    this.StaffService = StaffService;
                    this.users = [];
                    this.usersWaiting = [];
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
                                _this.users.push(student);
                            }
                            _this.getClients();
                        }
                    })
                        .catch(function (error) { return console.log("Error - Get students: " + error); });
                };
                WaitListComponent.prototype.getClients = function () {
                    var _this = this;
                    this.ClientService
                        .getClients()
                        .then(function (clients) {
                        if (clients.result === 'error') {
                            _this.clients = null;
                            _this.displayErrorAlert(clients);
                        }
                        else {
                            _this.clients = clients.clients;
                            for (var _i = 0, _a = _this.clients; _i < _a.length; _i++) {
                                var client = _a[_i];
                                client.fullName = client.firstName + " " + client.lastName;
                                _this.users.push(client);
                            }
                            _this.getCourses();
                        }
                    })
                        .catch(function (error) { return console.log("Error - Get clients: " + error); });
                };
                WaitListComponent.prototype.getCourses = function () {
                    var _this = this;
                    this.CourseService
                        .getCourseTypes()
                        .then(function (result) {
                        if (result.result === 'error') {
                            _this.courseTypes = null;
                            _this.displayErrorAlert(result);
                        }
                        else {
                            _this.courseTypes = result;
                            _this.getWaitList();
                        }
                    })
                        .catch(function (error) { return console.log("Error - Get courses: " + error); });
                };
                WaitListComponent.prototype.getWaitList = function () {
                    var _this = this;
                    this.usersWaiting = [];
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
                                user = _this.users.filter(function (x) { return x.userID === item.userID; });
                                //student[0].fullName = student[0].firstName + " " + student[0].lastName;
                                // student[0].courseID = course[0].courseID;
                                // student[0].professorId = course[0].professorId;
                                user[0].courseName = item.courseType;
                                userRecord = {
                                    fullName: user[0].fullName,
                                    courseType: item.courseType,
                                    date: item.date
                                };
                                _this.usersWaiting.push(userRecord);
                            };
                            var user, userRecord;
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
                    if (this.selectedUser == null || this.selectedCourseType == null) {
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
                            .addToWaitList(this.selectedUser, this.selectedCourseType, CurrentDate)
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
                    this.usersWaiting = [];
                    this.courseWaitList = this.waitList.filter(function (x) { return x.courseType === data.courseType; });
                    var _loop_2 = function (item) {
                        user = this_1.users.filter(function (x) { return x.userID === item.userID; });
                        user[0].fullName = user[0].firstName + " " + user[0].lastName;
                        userRecord = {
                            fullName: user[0].fullName,
                            date: item.date
                        };
                        this_1.usersWaiting.push(userRecord);
                    };
                    var this_1 = this, user, userRecord;
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
                    __metadata("design:paramtypes", [router_1.Router, course_service_1.CourseService, student_service_1.StudentService, client_service_1.ClientService, staff_service_1.StaffService])
                ], WaitListComponent);
                return WaitListComponent;
            }());
            exports_1("WaitListComponent", WaitListComponent);
        }
    };
});

//# sourceMappingURL=wait-list.component.js.map
