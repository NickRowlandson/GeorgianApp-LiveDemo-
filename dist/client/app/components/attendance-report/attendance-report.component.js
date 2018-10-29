System.register(["@angular/core", "@angular/router", "../../services/student.service", "../../services/course.service", "@angular/platform-browser"], function (exports_1, context_1) {
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
    var __param = (this && this.__param) || function (paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    };
    var core_1, router_1, student_service_1, course_service_1, platform_browser_1, AttendanceReportComponent;
    var __moduleName = context_1 && context_1.id;
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
            },
            function (platform_browser_1_1) {
                platform_browser_1 = platform_browser_1_1;
            }
        ],
        execute: function () {
            AttendanceReportComponent = class AttendanceReportComponent {
                constructor(document, router, studentService, courseService) {
                    this.document = document;
                    this.router = router;
                    this.studentService = studentService;
                    this.courseService = courseService;
                    this.studentAttendanceView = false;
                    this.records = [];
                    this.recordsBackup = [];
                    this.noAttendance = false;
                    this.studentReport = false;
                    this.courseAttendanceView = false;
                    this.noStudentsEnrolled = false;
                }
                ngOnInit() {
                    swal({
                        title: 'Loading...',
                        allowOutsideClick: false
                    });
                    swal.showLoading();
                    this.studentService
                        .getAllAttendance()
                        .then(attendance => {
                        if (attendance.result === 'error') {
                            this.data = null;
                            this.displayErrorAlert(attendance);
                        }
                        else {
                            this.data = attendance;
                            this.getStudents();
                        }
                    })
                        .catch(error => console.log(error));
                }
                getStudents() {
                    this.studentService
                        .getStudents()
                        .then(students => {
                        if (students.result === 'error') {
                            this.students = null;
                            this.displayErrorAlert(students);
                        }
                        else {
                            this.students = students;
                            for (let student of this.students) {
                                student.fullName = student.firstName + " " + student.lastName;
                            }
                            this.getCourses();
                        }
                    })
                        .catch(error => console.log(error));
                }
                getCourses() {
                    this.courseService
                        .getCourses()
                        .then(result => {
                        if (result.result === 'error') {
                            this.courses = null;
                            this.displayErrorAlert(result);
                        }
                        else {
                            //format datetime
                            result.forEach((item) => {
                                item.courseStart = moment(item.courseStart).format('YYYY-MM-DD');
                                item.courseEnd = moment(item.courseEnd).format('YYYY-MM-DD');
                                // item.classStartTime = moment(item.classStartTime).format('hh:mm A');
                                // item.classEndTime = moment(item.classEndTime).format('hh:mm A');
                            });
                            this.courses = result;
                            this.getTimetables();
                        }
                    })
                        .catch(error => console.log(error));
                }
                getTimetables() {
                    this.studentService
                        .getTimetables()
                        .then(result => {
                        if (result.result === 'error') {
                            this.timetables = null;
                            this.displayErrorAlert(result);
                        }
                        else {
                            this.timetables = result;
                            swal.close();
                        }
                    })
                        .catch(error => console.log(error));
                }
                viewStudentReport(student) {
                    this.records = [];
                    this.studentAttendanceView = true;
                    this.attendance = this.data.filter(x => x.userID === student.userID);
                    this.attendance.sort(function (a, b) {
                        a = new Date(a.date);
                        b = new Date(b.date);
                        return a > b ? -1 : a < b ? 1 : 0;
                    });
                    this.student = this.students.filter(x => x.studentID === student.studentID);
                    this.student = this.student[0];
                    this.totalPresent = this.attendance.filter(x => x.attendanceValue === 'P').length;
                    this.totalAbsent = this.attendance.filter(x => x.attendanceValue === 'A').length;
                    this.totalMadeContact = this.attendance.filter(x => x.attendanceValue === 'MC').length;
                    if (this.attendance.length === 0) {
                        this.noAttendance = true;
                    }
                    else {
                        this.noAttendance = false;
                        for (let item of this.attendance) {
                            var course = this.courses.filter(x => x.courseID === item.courseID);
                            var attendance = {
                                course: course,
                                date: item.date,
                                attendanceValue: item.attendanceValue
                            };
                            this.records.push(attendance);
                        }
                        this.recordsBackup = this.records;
                    }
                    this.document.body.scrollTop = 0;
                }
                viewCourseReport(course) {
                    this.courseTimetables = [];
                    this.courseStudents = [];
                    this.courseAttendanceView = true;
                    this.course = course;
                    this.classTimeStr = this.course.classTimeStr;
                    this.classAbsenceTotal = this.data.filter(x => x.courseID === course.courseID && x.attendanceValue === 'A').length;
                    this.classPresenceTotal = this.data.filter(x => x.courseID === course.courseID && x.attendanceValue === 'P').length;
                    this.classMadeContactTotal = this.data.filter(x => x.courseID === course.courseID && x.attendanceValue === 'MC').length;
                    if (this.classTimeStr) {
                        var array = this.classTimeStr.split(',');
                        this.classTimeStr = [];
                        for (let item of array) {
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
                        this.courseTimetables = this.timetables.filter(x => x.courseID === course.courseID);
                        for (let item of this.courseTimetables) {
                            studentInfo = {
                                student: this.students.filter(x => x.userID === item.userID)[0],
                                startDate: item.startDate,
                                endDate: item.endDate,
                                attendanceInfo: this.data.filter(x => x.userID === item.userID && x.courseID === course.courseID)
                            };
                            this.courseStudents.push(studentInfo);
                        }
                    }
                    if (this.courseStudents.length === 0) {
                        this.noStudentsEnrolled = true;
                    }
                    else {
                        this.noStudentsEnrolled = false;
                    }
                    this.document.body.scrollTop = 0;
                }
                filterAttendance(filterBy) {
                    this.records = this.recordsBackup;
                    if (filterBy === 'absence') {
                        this.records = this.records.filter(x => x.attendanceValue === 'A');
                    }
                    else if (filterBy === 'presence') {
                        this.records = this.records.filter(x => x.attendanceValue === 'P');
                    }
                    else if (filterBy === 'madeContact') {
                        this.records = this.records.filter(x => x.attendanceValue === 'MC');
                    }
                }
                overallStatus() {
                    this.courseAttendanceView = false;
                    this.studentAttendanceView = false;
                    this.noAttendance = false;
                }
                displayErrorAlert(error) {
                    if (error.title === "Auth Error") {
                        this.router.navigate(['/login']);
                        swal(error.title, error.msg, 'info');
                    }
                    else {
                        swal(error.title, error.msg, 'error');
                    }
                }
                goBack() {
                    window.history.back();
                }
            };
            AttendanceReportComponent = __decorate([
                core_1.Component({
                    selector: 'attendanceReportComponet',
                    templateUrl: './app/components/attendance-report/attendance-report.component.html',
                    styleUrls: ['./app/components/attendance-report/attendance-report.component.css']
                }),
                __param(0, core_1.Inject(platform_browser_1.DOCUMENT)),
                __metadata("design:paramtypes", [Document, router_1.Router, student_service_1.StudentService, course_service_1.CourseService])
            ], AttendanceReportComponent);
            exports_1("AttendanceReportComponent", AttendanceReportComponent);
        }
    };
});

//# sourceMappingURL=attendance-report.component.js.map
