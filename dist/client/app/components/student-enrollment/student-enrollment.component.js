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
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const router_1 = require("@angular/router");
const course_service_1 = require("../../services/course.service");
const student_service_1 = require("../../services/student.service");
let StudentEnrollmentComponent = class StudentEnrollmentComponent {
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
exports.StudentEnrollmentComponent = StudentEnrollmentComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NsaWVudC9hcHAvY29tcG9uZW50cy9zdHVkZW50LWVucm9sbG1lbnQvc3R1ZGVudC1lbnJvbGxtZW50LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLHdDQUF5RDtBQUV6RCw0Q0FBeUQ7QUFHekQsa0VBQThEO0FBQzlELG9FQUFnRTtBQVVoRSxJQUFhLDBCQUEwQixHQUF2QztJQWdCRSxZQUFvQixjQUE4QixFQUFVLGFBQTRCLEVBQVUsS0FBcUI7UUFBbkcsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBQVUsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFBVSxVQUFLLEdBQUwsS0FBSyxDQUFnQjtRQWR2SCxZQUFPLEdBQVksSUFBSSxDQUFDO1FBQ3hCLHNCQUFpQixHQUFVLEVBQUUsQ0FBQztJQWU5QixDQUFDO0lBRUQsUUFBUTtRQUNOLElBQUksQ0FBQztZQUNILEtBQUssRUFBRSxZQUFZO1lBQ25CLGlCQUFpQixFQUFFLEtBQUs7U0FDekIsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ25CLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLE1BQWMsRUFBRSxFQUFFO1lBQzNDLElBQUksTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxjQUFjLENBQUMsSUFBSSxNQUFNLENBQUMsWUFBWSxDQUFDLEVBQUU7Z0JBQ3hFLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDO2dCQUMzQixJQUFJLENBQUMsUUFBUSxHQUFHLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQztnQkFDbkMsSUFBSSxDQUFDLFlBQVksR0FBRyxNQUFNLENBQUMsY0FBYyxDQUFDLENBQUM7Z0JBQzNDLElBQUksQ0FBQyxVQUFVLEdBQUcsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDO2dCQUN2QyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7YUFDcEI7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QUFJLENBQUMsY0FBYzthQUNoQixVQUFVLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDO2FBQ3pDLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRTtZQUNiLElBQUssTUFBYyxDQUFDLE1BQU0sS0FBSyxPQUFPLEVBQUU7Z0JBQ3RDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLENBQUMsQ0FBQzthQUNoQztpQkFBTSxJQUFLLE1BQWMsQ0FBQyxNQUFNLEtBQUssU0FBUyxFQUFFO2dCQUMvQyxPQUFPLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQzthQUMxQjtpQkFBTTtnQkFDTCxJQUFJLENBQ0YsT0FBTyxFQUNQLHlDQUF5QyxFQUN6QyxPQUFPLENBQ1IsQ0FBQzthQUNIO1FBQ0gsQ0FBQyxDQUFDO2FBQ0QsS0FBSyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDM0IsQ0FBQztJQUVELGlCQUFpQixDQUFDLEtBQUs7UUFDckIsSUFBSSxDQUNGLEtBQUssQ0FBQyxLQUFLLEVBQ1gsS0FBSyxDQUFDLEdBQUcsRUFDVCxPQUFPLENBQ1IsQ0FBQztJQUNKLENBQUM7SUFFRCxNQUFNO1FBQ0osTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUN4QixDQUFDO0NBQ0YsQ0FBQTtBQXRQWSwwQkFBMEI7SUFOdEMsZ0JBQVMsQ0FBQztRQUNULFFBQVEsRUFBRSxrQkFBa0I7UUFDNUIsV0FBVyxFQUFFLHVFQUF1RTtRQUNwRixTQUFTLEVBQUUsQ0FBQyxzRUFBc0UsQ0FBQztLQUNwRixDQUFDO3FDQWtCb0MsZ0NBQWMsRUFBeUIsOEJBQWEsRUFBaUIsdUJBQWM7R0FoQjVHLDBCQUEwQixDQXNQdEM7QUF0UFksZ0VBQTBCIiwiZmlsZSI6ImFwcC9jb21wb25lbnRzL3N0dWRlbnQtZW5yb2xsbWVudC9zdHVkZW50LWVucm9sbG1lbnQuY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcbmltcG9ydCB7IEFjdGl2YXRlZFJvdXRlLCBQYXJhbXMgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xyXG5pbXBvcnQgeyBDb3Vyc2UgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL2NvdXJzZVwiO1xyXG5pbXBvcnQgeyBTdHVkZW50IH0gZnJvbSBcIi4uLy4uL21vZGVscy9TdHVkZW50XCI7XHJcbmltcG9ydCB7IENvdXJzZVNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvY291cnNlLnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgU3R1ZGVudFNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvc3R1ZGVudC5zZXJ2aWNlXCI7XHJcbmRlY2xhcmUgdmFyIHN3YWw6IGFueTtcclxuZGVjbGFyZSB2YXIgbW9tZW50OiBhbnk7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2NvdXJzZS1zZWxlY3Rpb24nLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9hcHAvY29tcG9uZW50cy9zdHVkZW50LWVucm9sbG1lbnQvc3R1ZGVudC1lbnJvbGxtZW50LmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9hcHAvY29tcG9uZW50cy9zdHVkZW50LWVucm9sbG1lbnQvc3R1ZGVudC1lbnJvbGxtZW50LmNvbXBvbmVudC5jc3MnXVxyXG59KVxyXG5cclxuZXhwb3J0IGNsYXNzIFN0dWRlbnRFbnJvbGxtZW50Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuICBzdHVkZW50VGltZXRhYmxlczogYW55W107XHJcbiAgbG9hZGluZzogYm9vbGVhbiA9IHRydWU7XHJcbiAgdGVtcFRpbWV0YWJsZUFycnk6IGFueVtdID0gW107XHJcbiAgZW5yb2xsTXVsdGlwbGU6IGJvb2xlYW47XHJcbiAgLy8gaWYgZW5yb2xsaW5nIG11bHRpcGxlIHN0dWRlbnRzXHJcbiAgc3R1ZGVudHM6IFN0dWRlbnRbXTtcclxuICBjb3Vyc2VJRDogYW55O1xyXG4gIGluc3RydWN0b3JJRDogYW55O1xyXG4gIGNvdXJzZU5hbWU6IGFueTtcclxuICAvLyBpZiBlbnJvbGxpbmcgc3BlY2lmaWMgc3R1ZGVudFxyXG4gIHN0dWRlbnQ6IFN0dWRlbnRbXTtcclxuICBjb3Vyc2VUeXBlOiBhbnk7XHJcbiAgc3R1ZGVudElEOiBhbnk7XHJcbiAgY291cnNlczogYW55W107XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgc3R1ZGVudFNlcnZpY2U6IFN0dWRlbnRTZXJ2aWNlLCBwcml2YXRlIGNvdXJzZVNlcnZpY2U6IENvdXJzZVNlcnZpY2UsIHByaXZhdGUgcm91dGU6IEFjdGl2YXRlZFJvdXRlKSB7XHJcblxyXG4gIH1cclxuXHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgICBzd2FsKHtcclxuICAgICAgdGl0bGU6ICdMb2FkaW5nLi4uJyxcclxuICAgICAgYWxsb3dPdXRzaWRlQ2xpY2s6IGZhbHNlXHJcbiAgICB9KTtcclxuICAgIHN3YWwuc2hvd0xvYWRpbmcoKTtcclxuICAgIHRoaXMucm91dGUucGFyYW1zLmZvckVhY2goKHBhcmFtczogUGFyYW1zKSA9PiB7XHJcbiAgICAgIGlmIChwYXJhbXNbJ2NvdXJzZUlEJ10gJiYgcGFyYW1zWydpbnN0cnVjdG9ySUQnXSAmJiBwYXJhbXNbJ2NvdXJzZU5hbWUnXSkge1xyXG4gICAgICAgIHRoaXMuZW5yb2xsTXVsdGlwbGUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuY291cnNlSUQgPSBwYXJhbXNbJ2NvdXJzZUlEJ107XHJcbiAgICAgICAgdGhpcy5pbnN0cnVjdG9ySUQgPSBwYXJhbXNbJ2luc3RydWN0b3JJRCddO1xyXG4gICAgICAgIHRoaXMuY291cnNlTmFtZSA9IHBhcmFtc1snY291cnNlTmFtZSddO1xyXG4gICAgICAgIHRoaXMuZ2V0U3R1ZGVudHMoKTtcclxuICAgICAgfSBlbHNlIGlmIChwYXJhbXNbJ2NvdXJzZVR5cGUnXSAmJiBwYXJhbXNbJ3N0dWRlbnRJRCddKSB7XHJcbiAgICAgICAgdGhpcy5lbnJvbGxNdWx0aXBsZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuY291cnNlVHlwZSA9IHBhcmFtc1snY291cnNlVHlwZSddO1xyXG4gICAgICAgIHRoaXMuc3R1ZGVudElEID0gcGFyYW1zWydzdHVkZW50SUQnXTtcclxuICAgICAgICB0aGlzLmdldFN0dWRlbnRCeUlkKHRoaXMuc3R1ZGVudElEKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBnZXRTdHVkZW50cygpIHtcclxuICAgIHRoaXMuc3R1ZGVudFNlcnZpY2VcclxuICAgICAgLmdldFN0dWRlbnRzKClcclxuICAgICAgLnRoZW4ocmVzdWx0ID0+IHtcclxuICAgICAgICBpZiAoKHJlc3VsdCBhcyBhbnkpLnJlc3VsdCA9PT0gJ2Vycm9yJykge1xyXG4gICAgICAgICAgdGhpcy5zdHVkZW50cyA9IG51bGw7XHJcbiAgICAgICAgICB0aGlzLmRpc3BsYXlFcnJvckFsZXJ0KHJlc3VsdCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHRoaXMuc3R1ZGVudHMgPSByZXN1bHQ7XHJcbiAgICAgICAgICBmb3IgKGxldCBzdHVkZW50IG9mIHRoaXMuc3R1ZGVudHMpIHtcclxuICAgICAgICAgICAgc3R1ZGVudC5mdWxsTmFtZSA9IHN0dWRlbnQuZmlyc3ROYW1lICsgXCIgXCIgKyBzdHVkZW50Lmxhc3ROYW1lO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgdGhpcy5nZXRUaW1ldGFibGVzKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KS5jYXRjaChlcnJvciA9PiBlcnJvcik7XHJcbiAgfVxyXG5cclxuICBnZXRTdHVkZW50QnlJZChpZCkge1xyXG4gICAgdGhpcy5zdHVkZW50U2VydmljZVxyXG4gICAgICAuZ2V0U3R1ZGVudChpZClcclxuICAgICAgLnRoZW4ocmVzdWx0ID0+IHtcclxuICAgICAgICBpZiAoKHJlc3VsdCBhcyBhbnkpLnJlc3VsdCA9PT0gJ2Vycm9yJykge1xyXG4gICAgICAgICAgdGhpcy5zdHVkZW50ID0gbnVsbDtcclxuICAgICAgICAgIHRoaXMuZGlzcGxheUVycm9yQWxlcnQocmVzdWx0KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdGhpcy5zdHVkZW50ID0gcmVzdWx0O1xyXG4gICAgICAgICAgdGhpcy5nZXRDb3Vyc2VzKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KS5jYXRjaChlcnJvciA9PiBlcnJvcik7XHJcbiAgfVxyXG5cclxuICBnZXRDb3Vyc2VzKCkge1xyXG4gICAgdGhpcy5jb3Vyc2VTZXJ2aWNlXHJcbiAgICAgIC5nZXRDb3Vyc2VzKClcclxuICAgICAgLnRoZW4ocmVzdWx0ID0+IHtcclxuICAgICAgICBpZiAoKHJlc3VsdCBhcyBhbnkpLnJlc3VsdCA9PT0gJ2Vycm9yJykge1xyXG4gICAgICAgICAgdGhpcy5kaXNwbGF5RXJyb3JBbGVydChyZXN1bHQpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB0aGlzLmNvdXJzZXMgPSByZXN1bHQ7XHJcbiAgICAgICAgICB0aGlzLmNvdXJzZXMgPSB0aGlzLmNvdXJzZXMuZmlsdGVyKHggPT4geC5jb3Vyc2VUeXBlID09PSB0aGlzLmNvdXJzZVR5cGUpO1xyXG4gICAgICAgICAgdGhpcy5nZXRUaW1ldGFibGVzKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gICAgICAuY2F0Y2goZXJyb3IgPT4gZXJyb3IpO1xyXG4gIH1cclxuXHJcbiAgZ2V0VGltZXRhYmxlcygpIHtcclxuICAgIHRoaXMuc3R1ZGVudFNlcnZpY2VcclxuICAgICAgLmdldFRpbWV0YWJsZXMoKVxyXG4gICAgICAudGhlbihyZXN1bHQgPT4ge1xyXG4gICAgICAgIGlmICgocmVzdWx0IGFzIGFueSkucmVzdWx0ID09PSAnZXJyb3InKSB7XHJcbiAgICAgICAgICB0aGlzLmRpc3BsYXlFcnJvckFsZXJ0KHJlc3VsdCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHRoaXMuc3R1ZGVudFRpbWV0YWJsZXMgPSByZXN1bHQ7XHJcbiAgICAgICAgICB0aGlzLmNvbXBhcmVUaW1ldGFibGVzKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gICAgICAuY2F0Y2goZXJyb3IgPT4gZXJyb3IpO1xyXG4gIH1cclxuXHJcbiAgY29tcGFyZVRpbWV0YWJsZXMoKSB7XHJcbiAgICBpZiAodGhpcy5zdHVkZW50cyA9PSBudWxsKSB7XHJcbiAgICAgIGZvciAobGV0IGNvdXJzZSBvZiB0aGlzLmNvdXJzZXMpIHtcclxuICAgICAgICB2YXIgdGltZXRhYmxlID0gdGhpcy5zdHVkZW50VGltZXRhYmxlcy5maWx0ZXIoeCA9PiB4LnVzZXJJRCA9PT0gKHRoaXMuc3R1ZGVudCBhcyBhbnkpLnVzZXJJRCk7XHJcbiAgICAgICAgZm9yIChsZXQgaXRlbSBvZiB0aW1ldGFibGUpIHtcclxuICAgICAgICAgIHZhciBpdGVtQ291cnNlSUQgPSBpdGVtLmNvdXJzZUlEO1xyXG4gICAgICAgICAgaWYgKGl0ZW1Db3Vyc2VJRCA9PT0gY291cnNlLmNvdXJzZUlEKSB7XHJcbiAgICAgICAgICAgIGNvdXJzZS5lbnJvbGxlZCA9IHRydWU7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjb3Vyc2UuZW5yb2xsZWQgPSBmYWxzZTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGZvciAobGV0IHN0dWRlbnQgb2YgdGhpcy5zdHVkZW50cykge1xyXG4gICAgICAgIHZhciB0aW1ldGFibGUgPSB0aGlzLnN0dWRlbnRUaW1ldGFibGVzLmZpbHRlcih4ID0+IHgudXNlcklEID09PSBzdHVkZW50LnVzZXJJRCk7XHJcbiAgICAgICAgZm9yIChsZXQgaXRlbSBvZiB0aW1ldGFibGUpIHtcclxuICAgICAgICAgIHZhciBpdGVtQ291cnNlSUQgPSBpdGVtLmNvdXJzZUlELnRvU3RyaW5nKCk7XHJcbiAgICAgICAgICBpZiAoaXRlbUNvdXJzZUlEID09PSB0aGlzLmNvdXJzZUlEKSB7XHJcbiAgICAgICAgICAgIHN0dWRlbnQuZW5yb2xsZWQgPSB0cnVlO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgdGhpcy5sb2FkaW5nID0gZmFsc2U7XHJcbiAgICBzd2FsLmNsb3NlKCk7XHJcbiAgfVxyXG5cclxuICBjaGVja0Vucm9sbGVkKGRhdGEpIHtcclxuICAgIGlmICh0aGlzLnN0dWRlbnRzID09IG51bGwgJiYgZGF0YS5lbnJvbGxlZCkge1xyXG4gICAgICBzd2FsKHtcclxuICAgICAgICB0aXRsZTogJ1JlbW92ZSAnICsgZGF0YS5maXJzdE5hbWUgKyAnICcgKyBkYXRhLmxhc3ROYW1lICsgJyBmcm9tICcgKyB0aGlzLmNvdXJzZU5hbWUgKyAnPycsXHJcbiAgICAgICAgdGV4dDogXCJcIixcclxuICAgICAgICB0eXBlOiAnd2FybmluZycsXHJcbiAgICAgICAgc2hvd0NhbmNlbEJ1dHRvbjogdHJ1ZSxcclxuICAgICAgICBjb25maXJtQnV0dG9uQ29sb3I6ICcjMzA4NWQ2JyxcclxuICAgICAgICBjYW5jZWxCdXR0b25Db2xvcjogJyNkMzMnLFxyXG4gICAgICAgIGNvbmZpcm1CdXR0b25UZXh0OiAnWWVzLCByZW1vdmUhJ1xyXG4gICAgICB9KS50aGVuKGlzQ29uZmlybSA9PiB7XHJcbiAgICAgICAgaWYgKGlzQ29uZmlybS5kaXNtaXNzID09PSBcImNhbmNlbFwiIHx8IGlzQ29uZmlybS5kaXNtaXNzID09PSBcIm92ZXJsYXlcIikge1xyXG4gICAgICAgICAgY29uc29sZS5sb2coaXNDb25maXJtLmRpc21pc3MpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoaXNDb25maXJtKSB7XHJcbiAgICAgICAgICB0aGlzLmRyb3AoZGF0YSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KS5jYXRjaChlcnJvciA9PiB7XHJcbiAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xyXG4gICAgICB9KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuZW5yb2xsKGRhdGEpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZW5yb2xsKGRhdGEpIHtcclxuICAgIHZhciBzdGFydERhdGUgPSBtb21lbnQoZGF0YS5zdHVkZW50U3RhcnREYXRlLCBcIkRERCBNTU0gWVlZWSBoOm1tOnNzIExUXCIpLmlzVmFsaWQoKTtcclxuICAgIHZhciBlbmREYXRlID0gbW9tZW50KGRhdGEuc3R1ZGVudEVuZERhdGUsIFwiREREIE1NTSBZWVlZIGg6bW06c3MgTFRcIikuaXNWYWxpZCgpO1xyXG4gICAgaWYgKHN0YXJ0RGF0ZSAmJiBlbmREYXRlKSB7XHJcbiAgICAgIGlmICh0aGlzLnN0dWRlbnRzICE9IG51bGwpIHtcclxuICAgICAgICB0aGlzLnN0dWRlbnRTZXJ2aWNlXHJcbiAgICAgICAgICAuY291cnNlRW5yb2xsKGRhdGEudXNlcklELCBkYXRhLnN0dWRlbnRTdGFydERhdGUsIGRhdGEuc3R1ZGVudEVuZERhdGUsIHRoaXMuY291cnNlSUQsIHRoaXMuaW5zdHJ1Y3RvcklEKVxyXG4gICAgICAgICAgLnRoZW4ocmVzdWx0ID0+IHtcclxuICAgICAgICAgICAgaWYgKChyZXN1bHQgYXMgYW55KS5yZXN1bHQgPT09ICdlcnJvcicpIHtcclxuICAgICAgICAgICAgICB0aGlzLmRpc3BsYXlFcnJvckFsZXJ0KHJlc3VsdCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoKHJlc3VsdCBhcyBhbnkpLnJlc3VsdCA9PT0gJ3N1Y2Nlc3MnKSB7XHJcbiAgICAgICAgICAgICAgZGF0YS5lbnJvbGxlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgc3dhbChcclxuICAgICAgICAgICAgICAgIHRoaXMuY291cnNlTmFtZSxcclxuICAgICAgICAgICAgICAgICcnICsgZGF0YS5maXJzdE5hbWUgKyAnICcgKyBkYXRhLmxhc3ROYW1lICsgJyBoYXMgYmVlbiBzdWNjZXNmdWxseSBlbnJvbGxlZC4nLFxyXG4gICAgICAgICAgICAgICAgJ3N1Y2Nlc3MnXHJcbiAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICBzd2FsKFxyXG4gICAgICAgICAgICAgICAgJ0Vycm9yJyxcclxuICAgICAgICAgICAgICAgICdTb21ldGhpbmcgd2VudCB3cm9uZyB3aGlsZSBlbnJvbGxpbmcgc3R1ZGVudC4nLFxyXG4gICAgICAgICAgICAgICAgJ2Vycm9yJ1xyXG4gICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgICAuY2F0Y2goZXJyb3IgPT4gZXJyb3IpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuc3R1ZGVudFNlcnZpY2VcclxuICAgICAgICAgIC5jb3Vyc2VFbnJvbGwoKHRoaXMuc3R1ZGVudCBhcyBhbnkpLnVzZXJJRCwgZGF0YS5zdHVkZW50U3RhcnREYXRlLCBkYXRhLnN0dWRlbnRFbmREYXRlLCBkYXRhLmNvdXJzZUlELCBkYXRhLnByb2Zlc3NvcklkKVxyXG4gICAgICAgICAgLnRoZW4ocmVzdWx0ID0+IHtcclxuICAgICAgICAgICAgaWYgKChyZXN1bHQgYXMgYW55KS5yZXN1bHQgPT09ICdlcnJvcicpIHtcclxuICAgICAgICAgICAgICB0aGlzLmRpc3BsYXlFcnJvckFsZXJ0KHJlc3VsdCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoKHJlc3VsdCBhcyBhbnkpLnJlc3VsdCA9PT0gJ3N1Y2Nlc3MnKSB7XHJcbiAgICAgICAgICAgICAgdGhpcy5jb3Vyc2VTZXJ2aWNlXHJcbiAgICAgICAgICAgICAgICAucmVtb3ZlRnJvbVdhaXRMaXN0KCh0aGlzLnN0dWRlbnQgYXMgYW55KS51c2VySUQsIGRhdGEuY291cnNlVHlwZSlcclxuICAgICAgICAgICAgICAgIC50aGVuKHJlc3VsdCA9PiB7XHJcbiAgICAgICAgICAgICAgICAgIGRhdGEuZW5yb2xsZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICBzd2FsKFxyXG4gICAgICAgICAgICAgICAgICAgIGRhdGEuY291cnNlTmFtZSxcclxuICAgICAgICAgICAgICAgICAgICAnJyArICh0aGlzLnN0dWRlbnQgYXMgYW55KS5maXJzdE5hbWUgKyAnICcgKyAodGhpcy5zdHVkZW50IGFzIGFueSkubGFzdE5hbWUgKyAnIGhhcyBiZWVuIHN1Y2Nlc2Z1bGx5IGVucm9sbGVkLicsXHJcbiAgICAgICAgICAgICAgICAgICAgJ3N1Y2Nlc3MnXHJcbiAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICB9KS5jYXRjaChlcnJvciA9PiBlcnJvcik7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgc3dhbChcclxuICAgICAgICAgICAgICAgICdFcnJvcicsXHJcbiAgICAgICAgICAgICAgICAnU29tZXRoaW5nIHdlbnQgd3Jvbmcgd2hpbGUgZW5yb2xsaW5nIHN0dWRlbnQuJyxcclxuICAgICAgICAgICAgICAgICdlcnJvcidcclxuICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgICAgLmNhdGNoKGVycm9yID0+IGVycm9yKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgc3dhbChcclxuICAgICAgICAnV2hvb3BzJyxcclxuICAgICAgICAnUGxlYXNlIGlucHV0IGEgdmFsaWQgc3RhcnQgYW5kIGVuZCBkYXRlIGZvciB0aGUgc3R1ZGVudC4nLFxyXG4gICAgICAgICd3YXJuaW5nJ1xyXG4gICAgICApO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZHJvcChzdHVkZW50OiBTdHVkZW50KSB7XHJcbiAgICB0aGlzLnN0dWRlbnRTZXJ2aWNlXHJcbiAgICAgIC5jb3Vyc2VEcm9wKHN0dWRlbnQudXNlcklELCB0aGlzLmNvdXJzZUlEKVxyXG4gICAgICAudGhlbihyZXN1bHQgPT4ge1xyXG4gICAgICAgIGlmICgocmVzdWx0IGFzIGFueSkucmVzdWx0ID09PSAnZXJyb3InKSB7XHJcbiAgICAgICAgICB0aGlzLmRpc3BsYXlFcnJvckFsZXJ0KHJlc3VsdCk7XHJcbiAgICAgICAgfSBlbHNlIGlmICgocmVzdWx0IGFzIGFueSkucmVzdWx0ID09PSAnc3VjY2VzcycpIHtcclxuICAgICAgICAgIHN0dWRlbnQuZW5yb2xsZWQgPSBmYWxzZTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgc3dhbChcclxuICAgICAgICAgICAgJ0Vycm9yJyxcclxuICAgICAgICAgICAgJ1NvbWV0aGluZyB3ZW50IHdyb25nLCBwbGVhc2UgdHJ5IGFnYWluLicsXHJcbiAgICAgICAgICAgICdlcnJvcidcclxuICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gICAgICAuY2F0Y2goZXJyb3IgPT4gZXJyb3IpO1xyXG4gIH1cclxuXHJcbiAgZGlzcGxheUVycm9yQWxlcnQoZXJyb3IpIHtcclxuICAgIHN3YWwoXHJcbiAgICAgIGVycm9yLnRpdGxlLFxyXG4gICAgICBlcnJvci5tc2csXHJcbiAgICAgICdlcnJvcidcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBnb0JhY2soKSB7XHJcbiAgICB3aW5kb3cuaGlzdG9yeS5iYWNrKCk7XHJcbiAgfVxyXG59XHJcbiJdfQ==
