System.register(["@angular/core", "@angular/router", "../../models/Student", "../../services/student.service", "../../services/course.service"], function (exports_1, context_1) {
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
    var core_1, router_1, router_2, Student_1, student_service_1, course_service_1, TimetableComponent;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
                router_2 = router_1_1;
            },
            function (Student_1_1) {
                Student_1 = Student_1_1;
            },
            function (student_service_1_1) {
                student_service_1 = student_service_1_1;
            },
            function (course_service_1_1) {
                course_service_1 = course_service_1_1;
            }
        ],
        execute: function () {
            TimetableComponent = /** @class */ (function () {
                function TimetableComponent(router, studentService, courseService, route) {
                    this.router = router;
                    this.studentService = studentService;
                    this.courseService = courseService;
                    this.route = route;
                    this.events = [];
                    this.faculty = false;
                    this.validInfo = false;
                }
                TimetableComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
                    var userID = currentUser.userID;
                    if (currentUser.userType !== "Student") {
                        this.faculty = true;
                        this.studentService
                            .getStudents()
                            .then(function (students) {
                            _this.students = students;
                        })
                            .catch(function (error) {
                            // do something
                        });
                        swal({
                            title: 'Timetable',
                            text: 'Enter a student name',
                            input: "text",
                            inputPlaceholder: "Student Name",
                            showCancelButton: true,
                            animation: "slide-from-top",
                            confirmButtonColor: '#3085d6',
                            allowOutsideClick: false,
                            confirmButtonText: 'Continue',
                            cancelButtonText: 'Back to Dashboard'
                        }).then(function (inputValue) {
                            if (inputValue) {
                                _this.studentSearchQuery = inputValue.value;
                                var name = _this.studentSearchQuery.split(" ");
                                var firstName = name[0];
                                var lastName = name[1];
                                if (firstName == null || lastName == null) {
                                    _this.alert();
                                }
                                else {
                                    try {
                                        _this.selectedStudent = _this.students.filter(function (x) { return x.firstName === firstName && x.lastName === lastName; });
                                        _this.getEventsById(_this.selectedStudent[0].userID);
                                        _this.validInfo = true;
                                    }
                                    catch (e) {
                                        _this.alert();
                                    }
                                }
                            }
                            else {
                                _this.alert();
                            }
                        }).catch(function (error) {
                            console.log(error);
                            _this.router.navigate(['/dashboard']);
                        });
                    }
                    else {
                        this.getEventsById(userID);
                    }
                    this.options = {
                        selectable: true,
                        prev: 'circle-triangle-w',
                        defaultView: "agendaWeek",
                        minTime: "08:00:00",
                        maxTime: "22:00:00",
                        height: "auto"
                    };
                };
                TimetableComponent.prototype.alert = function () {
                    var _this = this;
                    this.validInfo = false;
                    swal({
                        title: 'Timetable',
                        text: 'Enter a valid student name',
                        input: "text",
                        type: 'warning',
                        inputPlaceholder: "Student Name",
                        showCancelButton: true,
                        animation: "slide-from-top",
                        confirmButtonColor: '#3085d6',
                        allowOutsideClick: false,
                        confirmButtonText: 'Continue',
                        cancelButtonText: 'Back to Dashboard'
                    }).then(function (inputValue) {
                        if (inputValue) {
                            _this.studentSearchQuery = inputValue.value;
                            var name = _this.studentSearchQuery.split(" ");
                            var firstName = name[0];
                            var lastName = name[1];
                            if (firstName == null || lastName == null) {
                                _this.alert();
                            }
                            else {
                                _this.events = [];
                                try {
                                    _this.selectedStudent = _this.students.filter(function (x) { return x.firstName === firstName && x.lastName === lastName; });
                                    _this.getEventsById(_this.selectedStudent[0].userID);
                                    _this.validInfo = true;
                                }
                                catch (e) {
                                    _this.alert();
                                }
                            }
                        }
                        else {
                            _this.alert();
                        }
                    }).catch(function (error) {
                        _this.router.navigate(['/dashboard']);
                    });
                };
                TimetableComponent.prototype.getEventsById = function (userID) {
                    var _this = this;
                    this.studentService.getEventsById(userID).then(function (result) {
                        result.forEach(function (i) {
                            var classDay = 0;
                            if (i.classDay === "Monday") {
                                classDay = 1;
                            }
                            else if (i.classDay === "Tuesday") {
                                classDay = 2;
                            }
                            else if (i.classDay === "Wednesday") {
                                classDay = 3;
                            }
                            else if (i.classDay === "Thursday") {
                                classDay = 4;
                            }
                            else if (i.classDay === "Friday") {
                                classDay = 5;
                            }
                            i.courseStart = moment(i.courseStart).format('YYYY-MM-DD');
                            i.courseEnd = moment(i.courseEnd).format('YYYY-MM-DD');
                            i.classStartTime = moment(i.classStartTime).format('hh:mm A');
                            i.classEndTime = moment(i.classEndTime).format('hh:mm A');
                            if (i.classTimeStr) {
                                var array = i.classTimeStr.split(',');
                                for (var _i = 0, array_1 = array; _i < array_1.length; _i++) {
                                    var item = array_1[_i];
                                    var date = item.split(' ');
                                    var day = date[0];
                                    var time = date[1];
                                    var startTime = time.split('-')[0];
                                    var endTime = time.split('-')[1];
                                    _this.events.push({
                                        "title": i.courseName,
                                        "start": day + "T" + startTime,
                                        "end": day + "T" + endTime
                                    });
                                }
                            }
                            else {
                                console.log("No class date string available");
                            }
                        });
                    }).catch(function (error) {
                        console.log("Error getting events by id");
                    });
                };
                TimetableComponent.prototype.goBack = function () {
                    window.history.back();
                };
                __decorate([
                    core_1.Input(),
                    __metadata("design:type", Student_1.Student)
                ], TimetableComponent.prototype, "student", void 0);
                TimetableComponent = __decorate([
                    core_1.Component({
                        selector: 'timetable',
                        templateUrl: './app/components/timetable/timetable.component.html',
                        styleUrls: ['./app/components/timetable/timetable.component.css']
                    }),
                    __metadata("design:paramtypes", [router_1.Router, student_service_1.StudentService, course_service_1.CourseService, router_2.ActivatedRoute])
                ], TimetableComponent);
                return TimetableComponent;
            }());
            exports_1("TimetableComponent", TimetableComponent);
        }
    };
});

//# sourceMappingURL=timetable.component.js.map
