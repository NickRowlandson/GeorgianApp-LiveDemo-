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
    constructor(router, studentService, courseService, route) {
        this.router = router;
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
StudentEnrollmentComponent = __decorate([
    core_1.Component({
        selector: 'course-selection',
        templateUrl: './app/components/student-enrollment/student-enrollment.component.html',
        styleUrls: ['./app/components/student-enrollment/student-enrollment.component.css']
    }),
    __metadata("design:paramtypes", [router_1.Router, student_service_1.StudentService, course_service_1.CourseService, router_1.ActivatedRoute])
], StudentEnrollmentComponent);
exports.StudentEnrollmentComponent = StudentEnrollmentComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NsaWVudC9hcHAvY29tcG9uZW50cy9zdHVkZW50LWVucm9sbG1lbnQvc3R1ZGVudC1lbnJvbGxtZW50LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLHdDQUF5RDtBQUN6RCw0Q0FBaUU7QUFHakUsa0VBQThEO0FBQzlELG9FQUFnRTtBQVVoRSxJQUFhLDBCQUEwQixHQUF2QztJQWdCRSxZQUFvQixNQUFjLEVBQVUsY0FBOEIsRUFBVSxhQUE0QixFQUFVLEtBQXFCO1FBQTNILFdBQU0sR0FBTixNQUFNLENBQVE7UUFBVSxtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFBVSxrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQUFVLFVBQUssR0FBTCxLQUFLLENBQWdCO1FBZC9JLFlBQU8sR0FBWSxJQUFJLENBQUM7UUFDeEIsc0JBQWlCLEdBQVUsRUFBRSxDQUFDO0lBZTlCLENBQUM7SUFFRCxRQUFRO1FBQ04sSUFBSSxDQUFDO1lBQ0gsS0FBSyxFQUFFLFlBQVk7WUFDbkIsaUJBQWlCLEVBQUUsS0FBSztTQUN6QixDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDbkIsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsTUFBYyxFQUFFLEVBQUU7WUFDM0MsSUFBSSxNQUFNLENBQUMsVUFBVSxDQUFDLElBQUksTUFBTSxDQUFDLGNBQWMsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxZQUFZLENBQUMsRUFBRTtnQkFDeEUsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUM7Z0JBQzNCLElBQUksQ0FBQyxRQUFRLEdBQUcsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDO2dCQUNuQyxJQUFJLENBQUMsWUFBWSxHQUFHLE1BQU0sQ0FBQyxjQUFjLENBQUMsQ0FBQztnQkFDM0MsSUFBSSxDQUFDLFVBQVUsR0FBRyxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUM7Z0JBQ3ZDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQzthQUNwQjtpQkFBTSxJQUFJLE1BQU0sQ0FBQyxZQUFZLENBQUMsSUFBSSxNQUFNLENBQUMsV0FBVyxDQUFDLEVBQUU7Z0JBQ3RELElBQUksQ0FBQyxjQUFjLEdBQUcsS0FBSyxDQUFDO2dCQUM1QixJQUFJLENBQUMsVUFBVSxHQUFHLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQztnQkFDdkMsSUFBSSxDQUFDLFNBQVMsR0FBRyxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUM7Z0JBQ3JDLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO2FBQ3JDO1FBQ0gsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsV0FBVztRQUNULElBQUksQ0FBQyxjQUFjO2FBQ2hCLFdBQVcsRUFBRTthQUNiLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRTtZQUNiLElBQUssTUFBYyxDQUFDLE1BQU0sS0FBSyxPQUFPLEVBQUU7Z0JBQ3RDLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO2dCQUNyQixJQUFJLENBQUMsaUJBQWlCLENBQUMsTUFBTSxDQUFDLENBQUM7YUFDaEM7aUJBQU07Z0JBQ0wsSUFBSSxDQUFDLFFBQVEsR0FBRyxNQUFNLENBQUM7Z0JBQ3ZCLEtBQUssSUFBSSxPQUFPLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtvQkFDakMsT0FBTyxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUMsU0FBUyxHQUFHLEdBQUcsR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDO2lCQUMvRDtnQkFDRCxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7YUFDdEI7UUFDSCxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM3QixDQUFDO0lBRUQsY0FBYyxDQUFDLEVBQUU7UUFDZixJQUFJLENBQUMsY0FBYzthQUNoQixVQUFVLENBQUMsRUFBRSxDQUFDO2FBQ2QsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFO1lBQ2IsSUFBSyxNQUFjLENBQUMsTUFBTSxLQUFLLE9BQU8sRUFBRTtnQkFDdEMsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7Z0JBQ3BCLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLENBQUMsQ0FBQzthQUNoQztpQkFBTTtnQkFDTCxJQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQztnQkFDdEIsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO2FBQ25CO1FBQ0gsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDN0IsQ0FBQztJQUVELFVBQVU7UUFDUixJQUFJLENBQUMsYUFBYTthQUNmLFVBQVUsRUFBRTthQUNaLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRTtZQUNiLElBQUssTUFBYyxDQUFDLE1BQU0sS0FBSyxPQUFPLEVBQUU7Z0JBQ3RDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLENBQUMsQ0FBQzthQUNoQztpQkFBTTtnQkFDTCxJQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQztnQkFDdEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxVQUFVLEtBQUssSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO2dCQUMxRSxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7YUFDdEI7UUFDSCxDQUFDLENBQUM7YUFDRCxLQUFLLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUMzQixDQUFDO0lBRUQsYUFBYTtRQUNYLElBQUksQ0FBQyxjQUFjO2FBQ2hCLGFBQWEsRUFBRTthQUNmLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRTtZQUNiLElBQUssTUFBYyxDQUFDLE1BQU0sS0FBSyxPQUFPLEVBQUU7Z0JBQ3RDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLENBQUMsQ0FBQzthQUNoQztpQkFBTTtnQkFDTCxJQUFJLENBQUMsaUJBQWlCLEdBQUcsTUFBTSxDQUFDO2dCQUNoQyxJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQzthQUMxQjtRQUNILENBQUMsQ0FBQzthQUNELEtBQUssQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzNCLENBQUM7SUFFRCxpQkFBaUI7UUFDZixJQUFJLElBQUksQ0FBQyxRQUFRLElBQUksSUFBSSxFQUFFO1lBQ3pCLEtBQUssSUFBSSxNQUFNLElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRTtnQkFDL0IsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxNQUFNLEtBQU0sSUFBSSxDQUFDLE9BQWUsQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDOUYsS0FBSyxJQUFJLElBQUksSUFBSSxTQUFTLEVBQUU7b0JBQzFCLElBQUksWUFBWSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7b0JBQ2pDLElBQUksWUFBWSxLQUFLLE1BQU0sQ0FBQyxRQUFRLEVBQUU7d0JBQ3BDLE1BQU0sQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO3FCQUN4Qjt5QkFBTTt3QkFDTCxNQUFNLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztxQkFDekI7aUJBQ0Y7YUFDRjtTQUNGO2FBQU07WUFDTCxLQUFLLElBQUksT0FBTyxJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7Z0JBQ2pDLElBQUksU0FBUyxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxLQUFLLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDaEYsS0FBSyxJQUFJLElBQUksSUFBSSxTQUFTLEVBQUU7b0JBQzFCLElBQUksWUFBWSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLENBQUM7b0JBQzVDLElBQUksWUFBWSxLQUFLLElBQUksQ0FBQyxRQUFRLEVBQUU7d0JBQ2xDLE9BQU8sQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO3FCQUN6QjtpQkFDRjthQUNGO1NBQ0Y7UUFDRCxJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztRQUNyQixJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDZixDQUFDO0lBRUQsYUFBYSxDQUFDLElBQUk7UUFDaEIsSUFBSSxJQUFJLENBQUMsUUFBUSxJQUFJLElBQUksSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQzFDLElBQUksQ0FBQztnQkFDSCxLQUFLLEVBQUUsU0FBUyxHQUFHLElBQUksQ0FBQyxTQUFTLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxHQUFHLElBQUksQ0FBQyxVQUFVLEdBQUcsR0FBRztnQkFDMUYsSUFBSSxFQUFFLEVBQUU7Z0JBQ1IsSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsZ0JBQWdCLEVBQUUsSUFBSTtnQkFDdEIsa0JBQWtCLEVBQUUsU0FBUztnQkFDN0IsaUJBQWlCLEVBQUUsTUFBTTtnQkFDekIsaUJBQWlCLEVBQUUsY0FBYzthQUNsQyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFO2dCQUNsQixJQUFJLFNBQVMsQ0FBQyxPQUFPLEtBQUssUUFBUSxJQUFJLFNBQVMsQ0FBQyxPQUFPLEtBQUssU0FBUyxFQUFFO29CQUNyRSxPQUFPLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQztpQkFDaEM7cUJBQU0sSUFBSSxTQUFTLEVBQUU7b0JBQ3BCLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7aUJBQ2pCO1lBQ0gsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxFQUFFO2dCQUNmLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDckIsQ0FBQyxDQUFDLENBQUM7U0FDSjthQUFNO1lBQ0wsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUNuQjtJQUNILENBQUM7SUFFRCxNQUFNLENBQUMsSUFBSTtRQUNULElBQUksU0FBUyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUseUJBQXlCLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUNuRixJQUFJLE9BQU8sR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSx5QkFBeUIsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQy9FLElBQUksU0FBUyxJQUFJLE9BQU8sRUFBRTtZQUN4QixJQUFJLElBQUksQ0FBQyxRQUFRLElBQUksSUFBSSxFQUFFO2dCQUN6QixJQUFJLENBQUMsY0FBYztxQkFDaEIsWUFBWSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixFQUFFLElBQUksQ0FBQyxjQUFjLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDO3FCQUN2RyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUU7b0JBQ2IsSUFBSyxNQUFjLENBQUMsTUFBTSxLQUFLLE9BQU8sRUFBRTt3QkFDdEMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLE1BQU0sQ0FBQyxDQUFDO3FCQUNoQzt5QkFBTSxJQUFLLE1BQWMsQ0FBQyxNQUFNLEtBQUssU0FBUyxFQUFFO3dCQUMvQyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQzt3QkFDckIsSUFBSSxDQUNGLElBQUksQ0FBQyxVQUFVLEVBQ2YsRUFBRSxHQUFHLElBQUksQ0FBQyxTQUFTLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxRQUFRLEdBQUcsaUNBQWlDLEVBQzdFLFNBQVMsQ0FDVixDQUFDO3FCQUNIO3lCQUFNO3dCQUNMLElBQUksQ0FDRixPQUFPLEVBQ1AsK0NBQStDLEVBQy9DLE9BQU8sQ0FDUixDQUFDO3FCQUNIO2dCQUNILENBQUMsQ0FBQztxQkFDRCxLQUFLLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUMxQjtpQkFBTTtnQkFDTCxJQUFJLENBQUMsY0FBYztxQkFDaEIsWUFBWSxDQUFFLElBQUksQ0FBQyxPQUFlLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxJQUFJLENBQUMsY0FBYyxFQUFFLElBQUksQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQztxQkFDdkgsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFO29CQUNiLElBQUssTUFBYyxDQUFDLE1BQU0sS0FBSyxPQUFPLEVBQUU7d0JBQ3RDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLENBQUMsQ0FBQztxQkFDaEM7eUJBQU0sSUFBSyxNQUFjLENBQUMsTUFBTSxLQUFLLFNBQVMsRUFBRTt3QkFDL0MsSUFBSSxDQUFDLGFBQWE7NkJBQ2Ysa0JBQWtCLENBQUUsSUFBSSxDQUFDLE9BQWUsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQzs2QkFDakUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFOzRCQUNiLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDOzRCQUNyQixJQUFJLENBQ0YsSUFBSSxDQUFDLFVBQVUsRUFDZixFQUFFLEdBQUksSUFBSSxDQUFDLE9BQWUsQ0FBQyxTQUFTLEdBQUcsR0FBRyxHQUFJLElBQUksQ0FBQyxPQUFlLENBQUMsUUFBUSxHQUFHLGlDQUFpQyxFQUMvRyxTQUFTLENBQ1YsQ0FBQzt3QkFDSixDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQztxQkFDNUI7eUJBQU07d0JBQ0wsSUFBSSxDQUNGLE9BQU8sRUFDUCwrQ0FBK0MsRUFDL0MsT0FBTyxDQUNSLENBQUM7cUJBQ0g7Z0JBQ0gsQ0FBQyxDQUFDO3FCQUNELEtBQUssQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQzFCO1NBQ0Y7YUFBTTtZQUNMLElBQUksQ0FDRixRQUFRLEVBQ1IsMERBQTBELEVBQzFELFNBQVMsQ0FDVixDQUFDO1NBQ0g7SUFDSCxDQUFDO0lBRUQsSUFBSSxDQUFDLE9BQWdCO1FBQ25CLElBQUksQ0FBQyxjQUFjO2FBQ2hCLFVBQVUsQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUM7YUFDekMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFO1lBQ2IsSUFBSyxNQUFjLENBQUMsTUFBTSxLQUFLLE9BQU8sRUFBRTtnQkFDdEMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLE1BQU0sQ0FBQyxDQUFDO2FBQ2hDO2lCQUFNLElBQUssTUFBYyxDQUFDLE1BQU0sS0FBSyxTQUFTLEVBQUU7Z0JBQy9DLE9BQU8sQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO2FBQzFCO2lCQUFNO2dCQUNMLElBQUksQ0FDRixPQUFPLEVBQ1AseUNBQXlDLEVBQ3pDLE9BQU8sQ0FDUixDQUFDO2FBQ0g7UUFDSCxDQUFDLENBQUM7YUFDRCxLQUFLLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUMzQixDQUFDO0lBRUQsaUJBQWlCLENBQUMsS0FBSztRQUNyQixJQUFJLEtBQUssQ0FBQyxLQUFLLEtBQUssWUFBWSxFQUFFO1lBQ2hDLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztZQUNqQyxJQUFJLENBQ0YsS0FBSyxDQUFDLEtBQUssRUFDWCxLQUFLLENBQUMsR0FBRyxFQUNULE1BQU0sQ0FDUCxDQUFDO1NBQ0g7YUFBTTtZQUNMLElBQUksQ0FDRixLQUFLLENBQUMsS0FBSyxFQUNYLEtBQUssQ0FBQyxHQUFHLEVBQ1QsT0FBTyxDQUNSLENBQUM7U0FDSDtJQUNILENBQUM7SUFFRCxNQUFNO1FBQ0osTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUN4QixDQUFDO0NBQ0YsQ0FBQTtBQS9QWSwwQkFBMEI7SUFOdEMsZ0JBQVMsQ0FBQztRQUNULFFBQVEsRUFBRSxrQkFBa0I7UUFDNUIsV0FBVyxFQUFFLHVFQUF1RTtRQUNwRixTQUFTLEVBQUUsQ0FBQyxzRUFBc0UsQ0FBQztLQUNwRixDQUFDO3FDQWtCNEIsZUFBTSxFQUEwQixnQ0FBYyxFQUF5Qiw4QkFBYSxFQUFpQix1QkFBYztHQWhCcEksMEJBQTBCLENBK1B0QztBQS9QWSxnRUFBMEIiLCJmaWxlIjoiYXBwL2NvbXBvbmVudHMvc3R1ZGVudC1lbnJvbGxtZW50L3N0dWRlbnQtZW5yb2xsbWVudC5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgUm91dGVyLCBBY3RpdmF0ZWRSb3V0ZSwgUGFyYW1zIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuaW1wb3J0IHsgQ291cnNlIH0gZnJvbSBcIi4uLy4uL21vZGVscy9jb3Vyc2VcIjtcclxuaW1wb3J0IHsgU3R1ZGVudCB9IGZyb20gXCIuLi8uLi9tb2RlbHMvU3R1ZGVudFwiO1xyXG5pbXBvcnQgeyBDb3Vyc2VTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL2NvdXJzZS5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IFN0dWRlbnRTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL3N0dWRlbnQuc2VydmljZVwiO1xyXG5kZWNsYXJlIHZhciBzd2FsOiBhbnk7XHJcbmRlY2xhcmUgdmFyIG1vbWVudDogYW55O1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdjb3Vyc2Utc2VsZWN0aW9uJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vYXBwL2NvbXBvbmVudHMvc3R1ZGVudC1lbnJvbGxtZW50L3N0dWRlbnQtZW5yb2xsbWVudC5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vYXBwL2NvbXBvbmVudHMvc3R1ZGVudC1lbnJvbGxtZW50L3N0dWRlbnQtZW5yb2xsbWVudC5jb21wb25lbnQuY3NzJ11cclxufSlcclxuXHJcbmV4cG9ydCBjbGFzcyBTdHVkZW50RW5yb2xsbWVudENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgc3R1ZGVudFRpbWV0YWJsZXM6IGFueVtdO1xyXG4gIGxvYWRpbmc6IGJvb2xlYW4gPSB0cnVlO1xyXG4gIHRlbXBUaW1ldGFibGVBcnJ5OiBhbnlbXSA9IFtdO1xyXG4gIGVucm9sbE11bHRpcGxlOiBib29sZWFuO1xyXG4gIC8vIGlmIGVucm9sbGluZyBtdWx0aXBsZSBzdHVkZW50c1xyXG4gIHN0dWRlbnRzOiBTdHVkZW50W107XHJcbiAgY291cnNlSUQ6IGFueTtcclxuICBpbnN0cnVjdG9ySUQ6IGFueTtcclxuICBjb3Vyc2VOYW1lOiBhbnk7XHJcbiAgLy8gaWYgZW5yb2xsaW5nIHNwZWNpZmljIHN0dWRlbnRcclxuICBzdHVkZW50OiBTdHVkZW50W107XHJcbiAgY291cnNlVHlwZTogYW55O1xyXG4gIHN0dWRlbnRJRDogYW55O1xyXG4gIGNvdXJzZXM6IGFueVtdO1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJvdXRlcjogUm91dGVyLCBwcml2YXRlIHN0dWRlbnRTZXJ2aWNlOiBTdHVkZW50U2VydmljZSwgcHJpdmF0ZSBjb3Vyc2VTZXJ2aWNlOiBDb3Vyc2VTZXJ2aWNlLCBwcml2YXRlIHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSkge1xyXG5cclxuICB9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgc3dhbCh7XHJcbiAgICAgIHRpdGxlOiAnTG9hZGluZy4uLicsXHJcbiAgICAgIGFsbG93T3V0c2lkZUNsaWNrOiBmYWxzZVxyXG4gICAgfSk7XHJcbiAgICBzd2FsLnNob3dMb2FkaW5nKCk7XHJcbiAgICB0aGlzLnJvdXRlLnBhcmFtcy5mb3JFYWNoKChwYXJhbXM6IFBhcmFtcykgPT4ge1xyXG4gICAgICBpZiAocGFyYW1zWydjb3Vyc2VJRCddICYmIHBhcmFtc1snaW5zdHJ1Y3RvcklEJ10gJiYgcGFyYW1zWydjb3Vyc2VOYW1lJ10pIHtcclxuICAgICAgICB0aGlzLmVucm9sbE11bHRpcGxlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmNvdXJzZUlEID0gcGFyYW1zWydjb3Vyc2VJRCddO1xyXG4gICAgICAgIHRoaXMuaW5zdHJ1Y3RvcklEID0gcGFyYW1zWydpbnN0cnVjdG9ySUQnXTtcclxuICAgICAgICB0aGlzLmNvdXJzZU5hbWUgPSBwYXJhbXNbJ2NvdXJzZU5hbWUnXTtcclxuICAgICAgICB0aGlzLmdldFN0dWRlbnRzKCk7XHJcbiAgICAgIH0gZWxzZSBpZiAocGFyYW1zWydjb3Vyc2VUeXBlJ10gJiYgcGFyYW1zWydzdHVkZW50SUQnXSkge1xyXG4gICAgICAgIHRoaXMuZW5yb2xsTXVsdGlwbGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmNvdXJzZVR5cGUgPSBwYXJhbXNbJ2NvdXJzZVR5cGUnXTtcclxuICAgICAgICB0aGlzLnN0dWRlbnRJRCA9IHBhcmFtc1snc3R1ZGVudElEJ107XHJcbiAgICAgICAgdGhpcy5nZXRTdHVkZW50QnlJZCh0aGlzLnN0dWRlbnRJRCk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgZ2V0U3R1ZGVudHMoKSB7XHJcbiAgICB0aGlzLnN0dWRlbnRTZXJ2aWNlXHJcbiAgICAgIC5nZXRTdHVkZW50cygpXHJcbiAgICAgIC50aGVuKHJlc3VsdCA9PiB7XHJcbiAgICAgICAgaWYgKChyZXN1bHQgYXMgYW55KS5yZXN1bHQgPT09ICdlcnJvcicpIHtcclxuICAgICAgICAgIHRoaXMuc3R1ZGVudHMgPSBudWxsO1xyXG4gICAgICAgICAgdGhpcy5kaXNwbGF5RXJyb3JBbGVydChyZXN1bHQpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB0aGlzLnN0dWRlbnRzID0gcmVzdWx0O1xyXG4gICAgICAgICAgZm9yIChsZXQgc3R1ZGVudCBvZiB0aGlzLnN0dWRlbnRzKSB7XHJcbiAgICAgICAgICAgIHN0dWRlbnQuZnVsbE5hbWUgPSBzdHVkZW50LmZpcnN0TmFtZSArIFwiIFwiICsgc3R1ZGVudC5sYXN0TmFtZTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHRoaXMuZ2V0VGltZXRhYmxlcygpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSkuY2F0Y2goZXJyb3IgPT4gZXJyb3IpO1xyXG4gIH1cclxuXHJcbiAgZ2V0U3R1ZGVudEJ5SWQoaWQpIHtcclxuICAgIHRoaXMuc3R1ZGVudFNlcnZpY2VcclxuICAgICAgLmdldFN0dWRlbnQoaWQpXHJcbiAgICAgIC50aGVuKHJlc3VsdCA9PiB7XHJcbiAgICAgICAgaWYgKChyZXN1bHQgYXMgYW55KS5yZXN1bHQgPT09ICdlcnJvcicpIHtcclxuICAgICAgICAgIHRoaXMuc3R1ZGVudCA9IG51bGw7XHJcbiAgICAgICAgICB0aGlzLmRpc3BsYXlFcnJvckFsZXJ0KHJlc3VsdCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHRoaXMuc3R1ZGVudCA9IHJlc3VsdDtcclxuICAgICAgICAgIHRoaXMuZ2V0Q291cnNlcygpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSkuY2F0Y2goZXJyb3IgPT4gZXJyb3IpO1xyXG4gIH1cclxuXHJcbiAgZ2V0Q291cnNlcygpIHtcclxuICAgIHRoaXMuY291cnNlU2VydmljZVxyXG4gICAgICAuZ2V0Q291cnNlcygpXHJcbiAgICAgIC50aGVuKHJlc3VsdCA9PiB7XHJcbiAgICAgICAgaWYgKChyZXN1bHQgYXMgYW55KS5yZXN1bHQgPT09ICdlcnJvcicpIHtcclxuICAgICAgICAgIHRoaXMuZGlzcGxheUVycm9yQWxlcnQocmVzdWx0KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdGhpcy5jb3Vyc2VzID0gcmVzdWx0O1xyXG4gICAgICAgICAgdGhpcy5jb3Vyc2VzID0gdGhpcy5jb3Vyc2VzLmZpbHRlcih4ID0+IHguY291cnNlVHlwZSA9PT0gdGhpcy5jb3Vyc2VUeXBlKTtcclxuICAgICAgICAgIHRoaXMuZ2V0VGltZXRhYmxlcygpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuICAgICAgLmNhdGNoKGVycm9yID0+IGVycm9yKTtcclxuICB9XHJcblxyXG4gIGdldFRpbWV0YWJsZXMoKSB7XHJcbiAgICB0aGlzLnN0dWRlbnRTZXJ2aWNlXHJcbiAgICAgIC5nZXRUaW1ldGFibGVzKClcclxuICAgICAgLnRoZW4ocmVzdWx0ID0+IHtcclxuICAgICAgICBpZiAoKHJlc3VsdCBhcyBhbnkpLnJlc3VsdCA9PT0gJ2Vycm9yJykge1xyXG4gICAgICAgICAgdGhpcy5kaXNwbGF5RXJyb3JBbGVydChyZXN1bHQpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB0aGlzLnN0dWRlbnRUaW1ldGFibGVzID0gcmVzdWx0O1xyXG4gICAgICAgICAgdGhpcy5jb21wYXJlVGltZXRhYmxlcygpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuICAgICAgLmNhdGNoKGVycm9yID0+IGVycm9yKTtcclxuICB9XHJcblxyXG4gIGNvbXBhcmVUaW1ldGFibGVzKCkge1xyXG4gICAgaWYgKHRoaXMuc3R1ZGVudHMgPT0gbnVsbCkge1xyXG4gICAgICBmb3IgKGxldCBjb3Vyc2Ugb2YgdGhpcy5jb3Vyc2VzKSB7XHJcbiAgICAgICAgdmFyIHRpbWV0YWJsZSA9IHRoaXMuc3R1ZGVudFRpbWV0YWJsZXMuZmlsdGVyKHggPT4geC51c2VySUQgPT09ICh0aGlzLnN0dWRlbnQgYXMgYW55KS51c2VySUQpO1xyXG4gICAgICAgIGZvciAobGV0IGl0ZW0gb2YgdGltZXRhYmxlKSB7XHJcbiAgICAgICAgICB2YXIgaXRlbUNvdXJzZUlEID0gaXRlbS5jb3Vyc2VJRDtcclxuICAgICAgICAgIGlmIChpdGVtQ291cnNlSUQgPT09IGNvdXJzZS5jb3Vyc2VJRCkge1xyXG4gICAgICAgICAgICBjb3Vyc2UuZW5yb2xsZWQgPSB0cnVlO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY291cnNlLmVucm9sbGVkID0gZmFsc2U7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBmb3IgKGxldCBzdHVkZW50IG9mIHRoaXMuc3R1ZGVudHMpIHtcclxuICAgICAgICB2YXIgdGltZXRhYmxlID0gdGhpcy5zdHVkZW50VGltZXRhYmxlcy5maWx0ZXIoeCA9PiB4LnVzZXJJRCA9PT0gc3R1ZGVudC51c2VySUQpO1xyXG4gICAgICAgIGZvciAobGV0IGl0ZW0gb2YgdGltZXRhYmxlKSB7XHJcbiAgICAgICAgICB2YXIgaXRlbUNvdXJzZUlEID0gaXRlbS5jb3Vyc2VJRC50b1N0cmluZygpO1xyXG4gICAgICAgICAgaWYgKGl0ZW1Db3Vyc2VJRCA9PT0gdGhpcy5jb3Vyc2VJRCkge1xyXG4gICAgICAgICAgICBzdHVkZW50LmVucm9sbGVkID0gdHJ1ZTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHRoaXMubG9hZGluZyA9IGZhbHNlO1xyXG4gICAgc3dhbC5jbG9zZSgpO1xyXG4gIH1cclxuXHJcbiAgY2hlY2tFbnJvbGxlZChkYXRhKSB7XHJcbiAgICBpZiAodGhpcy5zdHVkZW50cyA9PSBudWxsICYmIGRhdGEuZW5yb2xsZWQpIHtcclxuICAgICAgc3dhbCh7XHJcbiAgICAgICAgdGl0bGU6ICdSZW1vdmUgJyArIGRhdGEuZmlyc3ROYW1lICsgJyAnICsgZGF0YS5sYXN0TmFtZSArICcgZnJvbSAnICsgdGhpcy5jb3Vyc2VOYW1lICsgJz8nLFxyXG4gICAgICAgIHRleHQ6IFwiXCIsXHJcbiAgICAgICAgdHlwZTogJ3dhcm5pbmcnLFxyXG4gICAgICAgIHNob3dDYW5jZWxCdXR0b246IHRydWUsXHJcbiAgICAgICAgY29uZmlybUJ1dHRvbkNvbG9yOiAnIzMwODVkNicsXHJcbiAgICAgICAgY2FuY2VsQnV0dG9uQ29sb3I6ICcjZDMzJyxcclxuICAgICAgICBjb25maXJtQnV0dG9uVGV4dDogJ1llcywgcmVtb3ZlISdcclxuICAgICAgfSkudGhlbihpc0NvbmZpcm0gPT4ge1xyXG4gICAgICAgIGlmIChpc0NvbmZpcm0uZGlzbWlzcyA9PT0gXCJjYW5jZWxcIiB8fCBpc0NvbmZpcm0uZGlzbWlzcyA9PT0gXCJvdmVybGF5XCIpIHtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKGlzQ29uZmlybS5kaXNtaXNzKTtcclxuICAgICAgICB9IGVsc2UgaWYgKGlzQ29uZmlybSkge1xyXG4gICAgICAgICAgdGhpcy5kcm9wKGRhdGEpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSkuY2F0Y2goZXJyb3IgPT4ge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcclxuICAgICAgfSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmVucm9sbChkYXRhKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGVucm9sbChkYXRhKSB7XHJcbiAgICB2YXIgc3RhcnREYXRlID0gbW9tZW50KGRhdGEuc3R1ZGVudFN0YXJ0RGF0ZSwgXCJEREQgTU1NIFlZWVkgaDptbTpzcyBMVFwiKS5pc1ZhbGlkKCk7XHJcbiAgICB2YXIgZW5kRGF0ZSA9IG1vbWVudChkYXRhLnN0dWRlbnRFbmREYXRlLCBcIkRERCBNTU0gWVlZWSBoOm1tOnNzIExUXCIpLmlzVmFsaWQoKTtcclxuICAgIGlmIChzdGFydERhdGUgJiYgZW5kRGF0ZSkge1xyXG4gICAgICBpZiAodGhpcy5zdHVkZW50cyAhPSBudWxsKSB7XHJcbiAgICAgICAgdGhpcy5zdHVkZW50U2VydmljZVxyXG4gICAgICAgICAgLmNvdXJzZUVucm9sbChkYXRhLnVzZXJJRCwgZGF0YS5zdHVkZW50U3RhcnREYXRlLCBkYXRhLnN0dWRlbnRFbmREYXRlLCB0aGlzLmNvdXJzZUlELCB0aGlzLmluc3RydWN0b3JJRClcclxuICAgICAgICAgIC50aGVuKHJlc3VsdCA9PiB7XHJcbiAgICAgICAgICAgIGlmICgocmVzdWx0IGFzIGFueSkucmVzdWx0ID09PSAnZXJyb3InKSB7XHJcbiAgICAgICAgICAgICAgdGhpcy5kaXNwbGF5RXJyb3JBbGVydChyZXN1bHQpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKChyZXN1bHQgYXMgYW55KS5yZXN1bHQgPT09ICdzdWNjZXNzJykge1xyXG4gICAgICAgICAgICAgIGRhdGEuZW5yb2xsZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgIHN3YWwoXHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvdXJzZU5hbWUsXHJcbiAgICAgICAgICAgICAgICAnJyArIGRhdGEuZmlyc3ROYW1lICsgJyAnICsgZGF0YS5sYXN0TmFtZSArICcgaGFzIGJlZW4gc3VjY2VzZnVsbHkgZW5yb2xsZWQuJyxcclxuICAgICAgICAgICAgICAgICdzdWNjZXNzJ1xyXG4gICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgc3dhbChcclxuICAgICAgICAgICAgICAgICdFcnJvcicsXHJcbiAgICAgICAgICAgICAgICAnU29tZXRoaW5nIHdlbnQgd3Jvbmcgd2hpbGUgZW5yb2xsaW5nIHN0dWRlbnQuJyxcclxuICAgICAgICAgICAgICAgICdlcnJvcidcclxuICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgICAgLmNhdGNoKGVycm9yID0+IGVycm9yKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLnN0dWRlbnRTZXJ2aWNlXHJcbiAgICAgICAgICAuY291cnNlRW5yb2xsKCh0aGlzLnN0dWRlbnQgYXMgYW55KS51c2VySUQsIGRhdGEuc3R1ZGVudFN0YXJ0RGF0ZSwgZGF0YS5zdHVkZW50RW5kRGF0ZSwgZGF0YS5jb3Vyc2VJRCwgZGF0YS5wcm9mZXNzb3JJZClcclxuICAgICAgICAgIC50aGVuKHJlc3VsdCA9PiB7XHJcbiAgICAgICAgICAgIGlmICgocmVzdWx0IGFzIGFueSkucmVzdWx0ID09PSAnZXJyb3InKSB7XHJcbiAgICAgICAgICAgICAgdGhpcy5kaXNwbGF5RXJyb3JBbGVydChyZXN1bHQpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKChyZXN1bHQgYXMgYW55KS5yZXN1bHQgPT09ICdzdWNjZXNzJykge1xyXG4gICAgICAgICAgICAgIHRoaXMuY291cnNlU2VydmljZVxyXG4gICAgICAgICAgICAgICAgLnJlbW92ZUZyb21XYWl0TGlzdCgodGhpcy5zdHVkZW50IGFzIGFueSkudXNlcklELCBkYXRhLmNvdXJzZVR5cGUpXHJcbiAgICAgICAgICAgICAgICAudGhlbihyZXN1bHQgPT4ge1xyXG4gICAgICAgICAgICAgICAgICBkYXRhLmVucm9sbGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgc3dhbChcclxuICAgICAgICAgICAgICAgICAgICBkYXRhLmNvdXJzZU5hbWUsXHJcbiAgICAgICAgICAgICAgICAgICAgJycgKyAodGhpcy5zdHVkZW50IGFzIGFueSkuZmlyc3ROYW1lICsgJyAnICsgKHRoaXMuc3R1ZGVudCBhcyBhbnkpLmxhc3ROYW1lICsgJyBoYXMgYmVlbiBzdWNjZXNmdWxseSBlbnJvbGxlZC4nLFxyXG4gICAgICAgICAgICAgICAgICAgICdzdWNjZXNzJ1xyXG4gICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgfSkuY2F0Y2goZXJyb3IgPT4gZXJyb3IpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIHN3YWwoXHJcbiAgICAgICAgICAgICAgICAnRXJyb3InLFxyXG4gICAgICAgICAgICAgICAgJ1NvbWV0aGluZyB3ZW50IHdyb25nIHdoaWxlIGVucm9sbGluZyBzdHVkZW50LicsXHJcbiAgICAgICAgICAgICAgICAnZXJyb3InXHJcbiAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSlcclxuICAgICAgICAgIC5jYXRjaChlcnJvciA9PiBlcnJvcik7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHN3YWwoXHJcbiAgICAgICAgJ1dob29wcycsXHJcbiAgICAgICAgJ1BsZWFzZSBpbnB1dCBhIHZhbGlkIHN0YXJ0IGFuZCBlbmQgZGF0ZSBmb3IgdGhlIHN0dWRlbnQuJyxcclxuICAgICAgICAnd2FybmluZydcclxuICAgICAgKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGRyb3Aoc3R1ZGVudDogU3R1ZGVudCkge1xyXG4gICAgdGhpcy5zdHVkZW50U2VydmljZVxyXG4gICAgICAuY291cnNlRHJvcChzdHVkZW50LnVzZXJJRCwgdGhpcy5jb3Vyc2VJRClcclxuICAgICAgLnRoZW4ocmVzdWx0ID0+IHtcclxuICAgICAgICBpZiAoKHJlc3VsdCBhcyBhbnkpLnJlc3VsdCA9PT0gJ2Vycm9yJykge1xyXG4gICAgICAgICAgdGhpcy5kaXNwbGF5RXJyb3JBbGVydChyZXN1bHQpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoKHJlc3VsdCBhcyBhbnkpLnJlc3VsdCA9PT0gJ3N1Y2Nlc3MnKSB7XHJcbiAgICAgICAgICBzdHVkZW50LmVucm9sbGVkID0gZmFsc2U7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHN3YWwoXHJcbiAgICAgICAgICAgICdFcnJvcicsXHJcbiAgICAgICAgICAgICdTb21ldGhpbmcgd2VudCB3cm9uZywgcGxlYXNlIHRyeSBhZ2Fpbi4nLFxyXG4gICAgICAgICAgICAnZXJyb3InXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuICAgICAgLmNhdGNoKGVycm9yID0+IGVycm9yKTtcclxuICB9XHJcblxyXG4gIGRpc3BsYXlFcnJvckFsZXJ0KGVycm9yKSB7XHJcbiAgICBpZiAoZXJyb3IudGl0bGUgPT09IFwiQXV0aCBFcnJvclwiKSB7XHJcbiAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFsnL2xvZ2luJ10pO1xyXG4gICAgICBzd2FsKFxyXG4gICAgICAgIGVycm9yLnRpdGxlLFxyXG4gICAgICAgIGVycm9yLm1zZyxcclxuICAgICAgICAnaW5mbydcclxuICAgICAgKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHN3YWwoXHJcbiAgICAgICAgZXJyb3IudGl0bGUsXHJcbiAgICAgICAgZXJyb3IubXNnLFxyXG4gICAgICAgICdlcnJvcidcclxuICAgICAgKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGdvQmFjaygpIHtcclxuICAgIHdpbmRvdy5oaXN0b3J5LmJhY2soKTtcclxuICB9XHJcbn1cclxuIl19
