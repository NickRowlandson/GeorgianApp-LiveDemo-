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
    var core_1, router_1, router_2, Student_1, student_service_1, course_service_1, TimetableComponent;
    var __moduleName = context_1 && context_1.id;
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
            TimetableComponent = class TimetableComponent {
                constructor(router, studentService, courseService, route) {
                    this.router = router;
                    this.studentService = studentService;
                    this.courseService = courseService;
                    this.route = route;
                    this.events = [];
                    this.faculty = false;
                }
                ngOnInit() {
                    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
                    var userID = currentUser.userID;
                    if (currentUser.userType !== "Student") {
                        this.faculty = true;
                        this.studentService
                            .getStudents()
                            .then(students => {
                            if (students.result === 'error') {
                                this.displayErrorAlert(students);
                            }
                            else {
                                this.students = students;
                                this.getEventsById(this.selectedStudent[0].userID);
                            }
                        })
                            .catch(error => {
                            // do something
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
                }
                onPrint() {
                    window.print();
                }
                studentSelect() {
                    swal({
                        title: 'Loading...',
                        allowOutsideClick: false
                    });
                    swal.showLoading();
                    this.getEventsById(this.selectedStudent);
                }
                getEventsById(userID) {
                    this.events = [];
                    this.studentService
                        .getEventsById(userID)
                        .then(result => {
                        if (result.result === 'error') {
                            this.displayErrorAlert(result);
                        }
                        else if (result.title === 'No Timetable Info') {
                            var currentUser = JSON.parse(localStorage.getItem('currentUser'));
                            if (currentUser.userType !== "Student") {
                                swal('No Timetable Info', 'This student has not been enrolled in any classes yet.', 'warning');
                            }
                            else {
                                swal('No Timetable Info', 'You have not been enrolled in any classes yet.', 'warning');
                            }
                        }
                        else {
                            result.forEach((i) => {
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
                                    for (let item of array) {
                                        var date = item.split(' ');
                                        var day = date[0];
                                        var time = date[1];
                                        var startTime = time.split('-')[0];
                                        var endTime = time.split('-')[1];
                                        this.events.push({
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
                            swal.close();
                        }
                    }).catch(error => {
                        console.log("Error getting events by id");
                    });
                }
                displayErrorAlert(error) {
                    swal(error.title, error.msg, 'error');
                }
                goBack() {
                    window.history.back();
                }
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
            exports_1("TimetableComponent", TimetableComponent);
        }
    };
});

//# sourceMappingURL=timetable.component.js.map
