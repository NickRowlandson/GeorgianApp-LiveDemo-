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
    var core_1, router_1, course_service_1, student_service_1, staff_service_1, AttendanceListComponent;
    var __moduleName = context_1 && context_1.id;
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
            AttendanceListComponent = class AttendanceListComponent {
                constructor(router, CourseService, StudentService, StaffService) {
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
                ngOnInit() {
                    swal({
                        title: 'Loading...',
                        allowOutsideClick: false
                    });
                    swal.showLoading();
                    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
                    var userID = currentUser.userID;
                    if (currentUser.userType !== 'Instructor') {
                        this.StaffService
                            .getUsers()
                            .then(instructors => {
                            if (instructors.result === 'error') {
                                this.displayErrorAlert(instructors);
                            }
                            else {
                                this.instructors = instructors.filter(x => x.userType.indexOf("Instructor") !== -1);
                                swal.close();
                            }
                        })
                            .catch(error => {
                            // do something
                        });
                    }
                    else {
                        this.getCourses(userID);
                        this.StudentService
                            .getAllAttendance()
                            .then(attendance => {
                            if (attendance.result === 'error') {
                                this.displayErrorAlert(attendance);
                                this.previousAttendance = null;
                            }
                            else {
                                this.previousAttendance = attendance;
                                for (let item of this.previousAttendance) {
                                    item.date = item.date[0] + " " + item.date[1];
                                }
                            }
                        })
                            .catch(error => console.log(error));
                        swal.close();
                    }
                }
                instructorSelect() {
                    this.attendanceDates = [];
                    this.attendanceView = null;
                    swal({
                        title: 'Loading...',
                        allowOutsideClick: false
                    });
                    swal.showLoading();
                    this.getCourses(this.selectedInstructor);
                    this.StudentService
                        .getAllAttendance()
                        .then(attendance => {
                        if (attendance.result === 'error') {
                            this.previousAttendance = null;
                            this.displayErrorAlert(attendance);
                        }
                        else {
                            this.previousAttendance = attendance;
                            for (let item of this.previousAttendance) {
                                item.date = item.date[0] + " " + item.date[1];
                            }
                        }
                        swal.close();
                    })
                        .catch(error => console.log(error));
                }
                getCourses(instructorID) {
                    this.CourseService
                        .getInstructorCourses(instructorID)
                        .then(result => {
                        var isEmpty = (result || []).length === 0;
                        if (result.result === 'error') {
                            this.data = null;
                            this.displayErrorAlert(result);
                        }
                        else if (isEmpty) {
                            this.data = null;
                            swal('No Courses', 'No courses attached to this instructor id.', 'warning');
                        }
                        else {
                            this.data = result;
                        }
                    })
                        .catch(error => console.log(error));
                }
                takeAttendance(course) {
                    this.attendanceDates = [];
                    swal({
                        title: 'Loading...',
                        allowOutsideClick: false
                    });
                    swal.showLoading();
                    this.previousAttendance = this.previousAttendance.filter(x => x.courseID === course.courseID);
                    this.courseID = course.courseID;
                    this.StudentService
                        .getTimetablesByCourseId(course.courseID)
                        .then(result => {
                        var isEmpty = (result || []).length === 0;
                        if (result.result === 'error') {
                            this.timetables = null;
                            this.attendanceStudents = null;
                            this.displayErrorAlert(result);
                        }
                        else if (isEmpty) {
                            this.timetables = null;
                            this.attendanceStudents = null;
                            swal('No Students', 'No students attached to this course id.', 'warning');
                        }
                        else {
                            this.timetables = result;
                            this.getStudentsById(this.timetables);
                        }
                    })
                        .catch(error => console.log(error));
                    this.attendanceCourse = course;
                    var array = this.attendanceCourse.classTimeStr.split(',');
                    for (let item of array) {
                        var attendanceHistory = this.previousAttendance;
                        attendanceHistory = attendanceHistory.filter(x => x.date === item);
                        if (attendanceHistory.length !== 0) {
                            console.log("Attendance already taken");
                        }
                        else {
                            var date = item.split(' ');
                            var formattedDate = moment(date[0]).format("ddd, MMM Do YYYY");
                            var list = {
                                label: formattedDate + ' from ' + date[1],
                                value: date[0] + ' ' + date[1]
                            };
                            this.attendanceDates.push(list);
                        }
                    }
                    this.attendanceView = true;
                }
                getStudentsById(timetables) {
                    console.log(timetables);
                    this.StudentService
                        .getStudentsById(timetables)
                        .then(result => {
                        var isEmpty = (result || []).length === 0;
                        if (result.result === 'error') {
                            this.attendanceStudents = null;
                            this.displayErrorAlert(result);
                        }
                        else if (isEmpty) {
                            this.attendanceStudents = null;
                            swal('No Students', 'No students attached to this course id.', 'warning');
                        }
                        else {
                            this.attendanceStudents = result;
                            for (let student of this.attendanceStudents) {
                                student.fullName = student.firstName + " " + student.lastName;
                            }
                            swal.close();
                        }
                    })
                        .catch(error => console.log(error));
                }
                submitAttendance() {
                    var count = 0;
                    for (let student of this.attendanceStudents) {
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
                        }).then(isConfirm => {
                            if (isConfirm.dismiss === "cancel" || isConfirm.dismiss === "overlay") {
                                console.log(isConfirm.dismiss);
                            }
                            else if (isConfirm) {
                                this.attendance = {
                                    students: this.attendanceStudents,
                                    courseID: this.courseID,
                                    date: this.attendanceCourse.attendanceDate
                                };
                                this.StudentService
                                    .insertAttendance(this.attendance)
                                    .then(result => {
                                    if (result.result === 'error') {
                                        this.displayErrorAlert(result);
                                    }
                                    else if (result.result === 'success') {
                                        swal(result.title, result.msg, 'success');
                                        this.attendanceView = false;
                                        this.router.navigate(['/attendance-report']);
                                    }
                                    else {
                                        swal('Error', 'Something went wrong, please try again.', 'error');
                                    }
                                })
                                    .catch(error => console.log(error));
                            }
                        }).catch(error => {
                            console.log(error);
                        });
                    }
                    else {
                        swal('Attendance Incomplete', 'Please enter attendance for all students', 'warning');
                    }
                }
                displayErrorAlert(error) {
                    swal(error.title, error.msg, 'error');
                }
                goBack() {
                    window.history.back();
                }
            };
            AttendanceListComponent = __decorate([
                core_1.Component({
                    selector: 'attendanceList',
                    templateUrl: './app/components/attendance-list/attendance-list.component.html',
                    styleUrls: ['./app/components/attendance-list/attendance-list.component.css']
                }),
                __metadata("design:paramtypes", [router_1.Router, course_service_1.CourseService, student_service_1.StudentService, staff_service_1.StaffService])
            ], AttendanceListComponent);
            exports_1("AttendanceListComponent", AttendanceListComponent);
        }
    };
});

//# sourceMappingURL=attendance-list.component.js.map
