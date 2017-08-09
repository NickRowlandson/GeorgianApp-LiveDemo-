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
    var core_1, router_1, Student_1, student_service_1, course_service_1, TimetableComponent;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
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
            TimetableComponent = (function () {
                function TimetableComponent(studentService, courseService, route) {
                    this.studentService = studentService;
                    this.courseService = courseService;
                    this.route = route;
                    this.events = [];
                }
                TimetableComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
                    var userID = currentUser.userID;
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
                    });
                    // this.header = {
                    //   left: 'prev',
                    //   center: 'title',
                    //   right: 'next'
                    // };
                    this.options = {
                        selectable: true,
                        prev: 'circle-triangle-w',
                        defaultView: "agendaWeek",
                        minTime: "08:00:00",
                        maxTime: "22:00:00",
                        height: "auto"
                    };
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
                    __metadata("design:paramtypes", [student_service_1.StudentService, course_service_1.CourseService, router_1.ActivatedRoute])
                ], TimetableComponent);
                return TimetableComponent;
            }());
            exports_1("TimetableComponent", TimetableComponent);
        }
    };
});

//# sourceMappingURL=timetable.component.js.map
