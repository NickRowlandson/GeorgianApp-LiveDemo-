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
    var core_1, router_1, course_service_1, student_service_1, StudentEnrollmentComponent;
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
            }
        ],
        execute: function () {
            StudentEnrollmentComponent = class StudentEnrollmentComponent {
                constructor(studentService, courseService, route) {
                    this.studentService = studentService;
                    this.courseService = courseService;
                    this.route = route;
                    this.loading = true;
                    this.tempTimetableArry = [];
                }
                ngOnInit() {
                    swal({
                        title: 'Loading...',
                        allowOutsideClick: false
                    });
                    swal.showLoading();
                    this.route.params.forEach((params) => {
                        if (params['courseID'] && params['instructorID'] && params['courseName']) {
                            this.enrollMultiple = true;
                            this.courseID = params['courseID'];
                            this.instructorID = params['instructorID'];
                            this.courseName = params['courseName'];
                            this.getStudents();
                        }
                        else if (params['courseType'] && params['studentID']) {
                            this.enrollMultiple = false;
                            this.courseType = params['courseType'];
                            this.studentID = params['studentID'];
                            this.getStudentById(this.studentID);
                        }
                    });
                }
                getStudents() {
                    this.studentService
                        .getStudents()
                        .then(result => {
                        if (result.result === 'error') {
                            this.students = null;
                            this.displayErrorAlert(result);
                        }
                        else {
                            this.students = result;
                            for (let student of this.students) {
                                student.fullName = student.firstName + " " + student.lastName;
                            }
                            this.getTimetables();
                        }
                    }).catch(error => error);
                }
                getStudentById(id) {
                    this.studentService
                        .getStudent(id)
                        .then(result => {
                        if (result.result === 'error') {
                            this.student = null;
                            this.displayErrorAlert(result);
                        }
                        else {
                            this.student = result;
                            this.getCourses();
                        }
                    }).catch(error => error);
                }
                getCourses() {
                    this.courseService
                        .getCourses()
                        .then(result => {
                        if (result.result === 'error') {
                            this.displayErrorAlert(result);
                        }
                        else {
                            this.courses = result;
                            this.courses = this.courses.filter(x => x.courseType === this.courseType);
                            this.getTimetables();
                        }
                    })
                        .catch(error => error);
                }
                getTimetables() {
                    this.studentService
                        .getTimetables()
                        .then(result => {
                        if (result.result === 'error') {
                            this.displayErrorAlert(result);
                        }
                        else {
                            this.studentTimetables = result;
                            this.compareTimetables();
                        }
                    })
                        .catch(error => error);
                }
                compareTimetables() {
                    if (this.students == null) {
                        for (let course of this.courses) {
                            var timetable = this.studentTimetables.filter(x => x.userID === this.student.userID);
                            for (let item of timetable) {
                                var itemCourseID = item.courseID;
                                if (itemCourseID === course.courseID) {
                                    course.enrolled = true;
                                }
                                else {
                                    course.enrolled = false;
                                }
                            }
                        }
                    }
                    else {
                        for (let student of this.students) {
                            var timetable = this.studentTimetables.filter(x => x.userID === student.userID);
                            for (let item of timetable) {
                                var itemCourseID = item.courseID.toString();
                                if (itemCourseID === this.courseID) {
                                    student.enrolled = true;
                                }
                            }
                        }
                    }
                    this.loading = false;
                    swal.close();
                }
                checkEnrolled(data) {
                    if (this.students == null && data.enrolled) {
                        swal({
                            title: 'Remove ' + data.firstName + ' ' + data.lastName + ' from ' + this.courseName + '?',
                            text: "",
                            type: 'warning',
                            showCancelButton: true,
                            confirmButtonColor: '#3085d6',
                            cancelButtonColor: '#d33',
                            confirmButtonText: 'Yes, remove!'
                        }).then(isConfirm => {
                            if (isConfirm.dismiss === "cancel" || isConfirm.dismiss === "overlay") {
                                console.log(isConfirm.dismiss);
                            }
                            else if (isConfirm) {
                                this.drop(data);
                            }
                        }).catch(error => {
                            console.log(error);
                        });
                    }
                    else {
                        this.enroll(data);
                    }
                }
                enroll(data) {
                    var startDate = moment(data.studentStartDate, "DDD MMM YYYY h:mm:ss LT").isValid();
                    var endDate = moment(data.studentEndDate, "DDD MMM YYYY h:mm:ss LT").isValid();
                    if (startDate && endDate) {
                        if (this.students != null) {
                            this.studentService
                                .courseEnroll(data.userID, data.studentStartDate, data.studentEndDate, this.courseID, this.instructorID)
                                .then(result => {
                                if (result.result === 'error') {
                                    this.displayErrorAlert(result);
                                }
                                else if (result.result === 'success') {
                                    data.enrolled = true;
                                    swal(this.courseName, '' + data.firstName + ' ' + data.lastName + ' has been succesfully enrolled.', 'success');
                                }
                                else {
                                    swal('Error', 'Something went wrong while enrolling student.', 'error');
                                }
                            })
                                .catch(error => error);
                        }
                        else {
                            this.studentService
                                .courseEnroll(this.student.userID, data.studentStartDate, data.studentEndDate, data.courseID, data.professorId)
                                .then(result => {
                                if (result.result === 'error') {
                                    this.displayErrorAlert(result);
                                }
                                else if (result.result === 'success') {
                                    this.courseService
                                        .removeFromWaitList(this.student.userID, data.courseType)
                                        .then(result => {
                                        data.enrolled = true;
                                        swal(data.courseName, '' + this.student.firstName + ' ' + this.student.lastName + ' has been succesfully enrolled.', 'success');
                                    }).catch(error => error);
                                }
                                else {
                                    swal('Error', 'Something went wrong while enrolling student.', 'error');
                                }
                            })
                                .catch(error => error);
                        }
                    }
                    else {
                        swal('Whoops', 'Please input a valid start and end date for the student.', 'warning');
                    }
                }
                drop(student) {
                    this.studentService
                        .courseDrop(student.userID, this.courseID)
                        .then(result => {
                        if (result.result === 'error') {
                            this.displayErrorAlert(result);
                        }
                        else if (result.result === 'success') {
                            student.enrolled = false;
                        }
                        else {
                            swal('Error', 'Something went wrong, please try again.', 'error');
                        }
                    })
                        .catch(error => error);
                }
                displayErrorAlert(error) {
                    swal(error.title, error.msg, 'error');
                }
                goBack() {
                    window.history.back();
                }
            };
            StudentEnrollmentComponent = __decorate([
                core_1.Component({
                    selector: 'course-selection',
                    templateUrl: './app/components/student-enrollment/student-enrollment.component.html',
                    styleUrls: ['./app/components/student-enrollment/student-enrollment.component.css']
                }),
                __metadata("design:paramtypes", [student_service_1.StudentService, course_service_1.CourseService, router_1.ActivatedRoute])
            ], StudentEnrollmentComponent);
            exports_1("StudentEnrollmentComponent", StudentEnrollmentComponent);
        }
    };
});

//# sourceMappingURL=student-enrollment.component.js.map
