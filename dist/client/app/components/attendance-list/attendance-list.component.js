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
const staff_service_1 = require("../../services/staff.service");
let AttendanceListComponent = class AttendanceListComponent {
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
AttendanceListComponent = __decorate([
    core_1.Component({
        selector: 'attendanceList',
        templateUrl: './app/components/attendance-list/attendance-list.component.html',
        styleUrls: ['./app/components/attendance-list/attendance-list.component.css']
    }),
    __metadata("design:paramtypes", [router_1.Router, course_service_1.CourseService, student_service_1.StudentService, staff_service_1.StaffService])
], AttendanceListComponent);
exports.AttendanceListComponent = AttendanceListComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NsaWVudC9hcHAvY29tcG9uZW50cy9hdHRlbmRhbmNlLWxpc3QvYXR0ZW5kYW5jZS1saXN0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLHdDQUFrRDtBQUNsRCw0Q0FBeUM7QUFDekMsa0VBQThEO0FBRzlELG9FQUFnRTtBQUNoRSxnRUFBNEQ7QUFVNUQsSUFBYSx1QkFBdUIsR0FBcEM7SUFpQkUsWUFBb0IsTUFBYyxFQUFVLGFBQTRCLEVBQVUsY0FBOEIsRUFBVSxZQUEwQjtRQUFoSSxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQVUsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFBVSxtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFBVSxpQkFBWSxHQUFaLFlBQVksQ0FBYztRQWJwSixtQkFBYyxHQUFZLEtBQUssQ0FBQztRQUNoQyxZQUFPLEdBQVksS0FBSyxDQUFDO1FBS3pCLG1CQUFjLEdBQUcsRUFBRSxDQUFDO1FBQ3BCLG9CQUFlLEdBQVUsRUFBRSxDQUFDO1FBRzVCLHNCQUFpQixHQUFRLEVBQUUsQ0FBQztRQUkxQixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksSUFBSSxFQUFFLENBQUM7SUFDekIsQ0FBQztJQUVELFFBQVE7UUFDTixJQUFJLENBQUM7WUFDSCxLQUFLLEVBQUUsWUFBWTtZQUNuQixpQkFBaUIsRUFBRSxLQUFLO1NBQ3pCLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNuQixJQUFJLFdBQVcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztRQUNsRSxJQUFJLE1BQU0sR0FBRyxXQUFXLENBQUMsTUFBTSxDQUFDO1FBQ2hDLElBQUksV0FBVyxDQUFDLFFBQVEsS0FBSyxZQUFZLEVBQUU7WUFDekMsSUFBSSxDQUFDLFlBQVk7aUJBQ2QsUUFBUSxFQUFFO2lCQUNWLElBQUksQ0FB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b21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBSb3V0ZXIgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xyXG5pbXBvcnQgeyBDb3Vyc2VTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL2NvdXJzZS5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IENvdXJzZSB9IGZyb20gXCIuLi8uLi9tb2RlbHMvY291cnNlXCI7XHJcbmltcG9ydCB7IFN0dWRlbnQgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL1N0dWRlbnRcIjtcclxuaW1wb3J0IHsgU3R1ZGVudFNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvc3R1ZGVudC5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IFN0YWZmU2VydmljZSB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9zdGFmZi5zZXJ2aWNlXCI7XHJcbmRlY2xhcmUgdmFyIHN3YWw6IGFueTtcclxuZGVjbGFyZSB2YXIgbW9tZW50O1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdhdHRlbmRhbmNlTGlzdCcsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL2FwcC9jb21wb25lbnRzL2F0dGVuZGFuY2UtbGlzdC9hdHRlbmRhbmNlLWxpc3QuY29tcG9uZW50Lmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL2FwcC9jb21wb25lbnRzL2F0dGVuZGFuY2UtbGlzdC9hdHRlbmRhbmNlLWxpc3QuY29tcG9uZW50LmNzcyddXHJcbn0pXHJcblxyXG5leHBvcnQgY2xhc3MgQXR0ZW5kYW5jZUxpc3RDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG4gIGRhdGE6IGFueTtcclxuICBkYXRlOiBhbnk7XHJcbiAgY291cnNlSUQ6IGFueTtcclxuICBhdHRlbmRhbmNlVmlldzogYm9vbGVhbiA9IGZhbHNlO1xyXG4gIGxvYWRpbmc6IGJvb2xlYW4gPSBmYWxzZTtcclxuICBhdHRlbmRhbmNlQ291cnNlOiBhbnk7XHJcbiAgYXR0ZW5kYW5jZVN0dWRlbnRzOiBhbnk7XHJcbiAgdGltZXRhYmxlczogYW55O1xyXG4gIGF0dGVuZGFuY2U6IGFueTtcclxuICBhYnNlbnRTdHVkZW50cyA9IFtdO1xyXG4gIGF0dGVuZGFuY2VEYXRlczogYW55W10gPSBbXTtcclxuICBwcmV2aW91c0F0dGVuZGFuY2U6IGFueTtcclxuICBpbnN0cnVjdG9yczogYW55O1xyXG4gIGluc3RydWN0b3JPcHRpb25zOiBhbnkgPSB7fTtcclxuICBzZWxlY3RlZEluc3RydWN0b3I6IG51bWJlcjtcclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSByb3V0ZXI6IFJvdXRlciwgcHJpdmF0ZSBDb3Vyc2VTZXJ2aWNlOiBDb3Vyc2VTZXJ2aWNlLCBwcml2YXRlIFN0dWRlbnRTZXJ2aWNlOiBTdHVkZW50U2VydmljZSwgcHJpdmF0ZSBTdGFmZlNlcnZpY2U6IFN0YWZmU2VydmljZSkge1xyXG4gICAgdGhpcy5kYXRlID0gbmV3IERhdGUoKTtcclxuICB9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgc3dhbCh7XHJcbiAgICAgIHRpdGxlOiAnTG9hZGluZy4uLicsXHJcbiAgICAgIGFsbG93T3V0c2lkZUNsaWNrOiBmYWxzZVxyXG4gICAgfSk7XHJcbiAgICBzd2FsLnNob3dMb2FkaW5nKCk7XHJcbiAgICB2YXIgY3VycmVudFVzZXIgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdjdXJyZW50VXNlcicpKTtcclxuICAgIHZhciB1c2VySUQgPSBjdXJyZW50VXNlci51c2VySUQ7XHJcbiAgICBpZiAoY3VycmVudFVzZXIudXNlclR5cGUgIT09ICdJbnN0cnVjdG9yJykge1xyXG4gICAgICB0aGlzLlN0YWZmU2VydmljZVxyXG4gICAgICAgIC5nZXRVc2VycygpXHJcbiAgICAgICAgLnRoZW4oaW5zdHJ1Y3RvcnMgPT4ge1xyXG4gICAgICAgICAgaWYgKChpbnN0cnVjdG9ycyBhcyBhbnkpLnJlc3VsdCA9PT0gJ2Vycm9yJykge1xyXG4gICAgICAgICAgICB0aGlzLmRpc3BsYXlFcnJvckFsZXJ0KGluc3RydWN0b3JzKTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuaW5zdHJ1Y3RvcnMgPSBpbnN0cnVjdG9ycy5maWx0ZXIoeCA9PiB4LnVzZXJUeXBlLmluZGV4T2YoXCJJbnN0cnVjdG9yXCIpICE9PSAtMSk7XHJcbiAgICAgICAgICAgIHN3YWwuY2xvc2UoKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiB7XHJcbiAgICAgICAgICAvLyBkbyBzb21ldGhpbmdcclxuICAgICAgICB9KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuZ2V0Q291cnNlcyh1c2VySUQpO1xyXG4gICAgICB0aGlzLlN0dWRlbnRTZXJ2aWNlXHJcbiAgICAgICAgLmdldEFsbEF0dGVuZGFuY2UoKVxyXG4gICAgICAgIC50aGVuKGF0dGVuZGFuY2UgPT4ge1xyXG4gICAgICAgICAgaWYgKChhdHRlbmRhbmNlIGFzIGFueSkucmVzdWx0ID09PSAnZXJyb3InKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZGlzcGxheUVycm9yQWxlcnQoYXR0ZW5kYW5jZSk7XHJcbiAgICAgICAgICAgIHRoaXMucHJldmlvdXNBdHRlbmRhbmNlID0gbnVsbDtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMucHJldmlvdXNBdHRlbmRhbmNlID0gYXR0ZW5kYW5jZTtcclxuICAgICAgICAgICAgZm9yIChsZXQgaXRlbSBvZiB0aGlzLnByZXZpb3VzQXR0ZW5kYW5jZSkge1xyXG4gICAgICAgICAgICAgIGl0ZW0uZGF0ZSA9IGl0ZW0uZGF0ZVswXSArIFwiIFwiICsgaXRlbS5kYXRlWzFdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4gY29uc29sZS5sb2coZXJyb3IpKTtcclxuICAgICAgc3dhbC5jbG9zZSgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgaW5zdHJ1Y3RvclNlbGVjdCgpIHtcclxuICAgIHRoaXMuYXR0ZW5kYW5jZURhdGVzID0gW107XHJcbiAgICB0aGlzLmF0dGVuZGFuY2VWaWV3ID0gbnVsbDtcclxuICAgIHN3YWwoe1xyXG4gICAgICB0aXRsZTogJ0xvYWRpbmcuLi4nLFxyXG4gICAgICBhbGxvd091dHNpZGVDbGljazogZmFsc2VcclxuICAgIH0pO1xyXG4gICAgc3dhbC5zaG93TG9hZGluZygpO1xyXG4gICAgdGhpcy5nZXRDb3Vyc2VzKHRoaXMuc2VsZWN0ZWRJbnN0cnVjdG9yKTtcclxuICAgIHRoaXMuU3R1ZGVudFNlcnZpY2VcclxuICAgICAgLmdldEFsbEF0dGVuZGFuY2UoKVxyXG4gICAgICAudGhlbihhdHRlbmRhbmNlID0+IHtcclxuICAgICAgICBpZiAoKGF0dGVuZGFuY2UgYXMgYW55KS5yZXN1bHQgPT09ICdlcnJvcicpIHtcclxuICAgICAgICAgIHRoaXMucHJldmlvdXNBdHRlbmRhbmNlID0gbnVsbDtcclxuICAgICAgICAgIHRoaXMuZGlzcGxheUVycm9yQWxlcnQoYXR0ZW5kYW5jZSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHRoaXMucHJldmlvdXNBdHRlbmRhbmNlID0gYXR0ZW5kYW5jZTtcclxuICAgICAgICAgIGZvciAobGV0IGl0ZW0gb2YgdGhpcy5wcmV2aW91c0F0dGVuZGFuY2UpIHtcclxuICAgICAgICAgICAgaXRlbS5kYXRlID0gaXRlbS5kYXRlWzBdICsgXCIgXCIgKyBpdGVtLmRhdGVbMV07XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHN3YWwuY2xvc2UoKTtcclxuICAgICAgfSlcclxuICAgICAgLmNhdGNoKGVycm9yID0+IGNvbnNvbGUubG9nKGVycm9yKSk7XHJcbiAgfVxyXG5cclxuICBnZXRDb3Vyc2VzKGluc3RydWN0b3JJRCkge1xyXG4gICAgdGhpcy5Db3Vyc2VTZXJ2aWNlXHJcbiAgICAgIC5nZXRJbnN0cnVjdG9yQ291cnNlcyhpbnN0cnVjdG9ySUQpXHJcbiAgICAgIC50aGVuKHJlc3VsdCA9PiB7XHJcbiAgICAgICAgdmFyIGlzRW1wdHkgPSAocmVzdWx0IHx8IFtdKS5sZW5ndGggPT09IDA7XHJcbiAgICAgICAgaWYgKChyZXN1bHQgYXMgYW55KS5yZXN1bHQgPT09ICdlcnJvcicpIHtcclxuICAgICAgICAgIHRoaXMuZGF0YSA9IG51bGw7XHJcbiAgICAgICAgICB0aGlzLmRpc3BsYXlFcnJvckFsZXJ0KHJlc3VsdCk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChpc0VtcHR5KSB7XHJcbiAgICAgICAgICB0aGlzLmRhdGEgPSBudWxsO1xyXG4gICAgICAgICAgc3dhbChcclxuICAgICAgICAgICAgJ05vIENvdXJzZXMnLFxyXG4gICAgICAgICAgICAnTm8gY291cnNlcyBhdHRhY2hlZCB0byB0aGlzIGluc3RydWN0b3IgaWQuJyxcclxuICAgICAgICAgICAgJ3dhcm5pbmcnXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB0aGlzLmRhdGEgPSByZXN1bHQ7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gICAgICAuY2F0Y2goZXJyb3IgPT4gY29uc29sZS5sb2coZXJyb3IpKTtcclxuICB9XHJcblxyXG4gIHRha2VBdHRlbmRhbmNlKGNvdXJzZTogQ291cnNlKSB7XHJcbiAgICB0aGlzLmF0dGVuZGFuY2VEYXRlcyA9IFtdO1xyXG4gICAgc3dhbCh7XHJcbiAgICAgIHRpdGxlOiAnTG9hZGluZy4uLicsXHJcbiAgICAgIGFsbG93T3V0c2lkZUNsaWNrOiBmYWxzZVxyXG4gICAgfSk7XHJcbiAgICBzd2FsLnNob3dMb2FkaW5nKCk7XHJcbiAgICB0aGlzLnByZXZpb3VzQXR0ZW5kYW5jZSA9IHRoaXMucHJldmlvdXNBdHRlbmRhbmNlLmZpbHRlcih4ID0+IHguY291cnNlSUQgPT09IGNvdXJzZS5jb3Vyc2VJRCk7XHJcbiAgICB0aGlzLmNvdXJzZUlEID0gY291cnNlLmNvdXJzZUlEO1xyXG4gICAgdGhpcy5TdHVkZW50U2VydmljZVxyXG4gICAgICAuZ2V0VGltZXRhYmxlc0J5Q291cnNlSWQoY291cnNlLmNvdXJzZUlEKVxyXG4gICAgICAudGhlbihyZXN1bHQgPT4ge1xyXG4gICAgICAgIHZhciBpc0VtcHR5ID0gKHJlc3VsdCB8fCBbXSkubGVuZ3RoID09PSAwO1xyXG4gICAgICAgIGlmICgocmVzdWx0IGFzIGFueSkucmVzdWx0ID09PSAnZXJyb3InKSB7XHJcbiAgICAgICAgICB0aGlzLnRpbWV0YWJsZXMgPSBudWxsO1xyXG4gICAgICAgICAgdGhpcy5hdHRlbmRhbmNlU3R1ZGVudHMgPSBudWxsO1xyXG4gICAgICAgICAgdGhpcy5kaXNwbGF5RXJyb3JBbGVydChyZXN1bHQpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoaXNFbXB0eSkge1xyXG4gICAgICAgICAgdGhpcy50aW1ldGFibGVzID0gbnVsbDtcclxuICAgICAgICAgIHRoaXMuYXR0ZW5kYW5jZVN0dWRlbnRzID0gbnVsbDtcclxuICAgICAgICAgIHN3YWwoXHJcbiAgICAgICAgICAgICdObyBTdHVkZW50cycsXHJcbiAgICAgICAgICAgICdObyBzdHVkZW50cyBhdHRhY2hlZCB0byB0aGlzIGNvdXJzZSBpZC4nLFxyXG4gICAgICAgICAgICAnd2FybmluZydcclxuICAgICAgICAgICk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHRoaXMudGltZXRhYmxlcyA9IHJlc3VsdDtcclxuICAgICAgICAgIHRoaXMuZ2V0U3R1ZGVudHNCeUlkKHRoaXMudGltZXRhYmxlcyk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gICAgICAuY2F0Y2goZXJyb3IgPT4gY29uc29sZS5sb2coZXJyb3IpKTtcclxuXHJcbiAgICB0aGlzLmF0dGVuZGFuY2VDb3Vyc2UgPSBjb3Vyc2U7XHJcbiAgICB2YXIgYXJyYXkgPSB0aGlzLmF0dGVuZGFuY2VDb3Vyc2UuY2xhc3NUaW1lU3RyLnNwbGl0KCcsJyk7XHJcbiAgICBmb3IgKGxldCBpdGVtIG9mIGFycmF5KSB7XHJcbiAgICAgIHZhciBhdHRlbmRhbmNlSGlzdG9yeSA9IHRoaXMucHJldmlvdXNBdHRlbmRhbmNlO1xyXG4gICAgICBhdHRlbmRhbmNlSGlzdG9yeSA9IGF0dGVuZGFuY2VIaXN0b3J5LmZpbHRlcih4ID0+IHguZGF0ZSA9PT0gaXRlbSk7XHJcbiAgICAgIGlmIChhdHRlbmRhbmNlSGlzdG9yeS5sZW5ndGggIT09IDApIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIkF0dGVuZGFuY2UgYWxyZWFkeSB0YWtlblwiKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB2YXIgZGF0ZSA9IGl0ZW0uc3BsaXQoJyAnKTtcclxuICAgICAgICB2YXIgZm9ybWF0dGVkRGF0ZSA9IG1vbWVudChkYXRlWzBdKS5mb3JtYXQoXCJkZGQsIE1NTSBEbyBZWVlZXCIpO1xyXG4gICAgICAgIHZhciBsaXN0ID0ge1xyXG4gICAgICAgICAgbGFiZWw6IGZvcm1hdHRlZERhdGUgKyAnIGZyb20gJyArIGRhdGVbMV0sXHJcbiAgICAgICAgICB2YWx1ZTogZGF0ZVswXSArICcgJyArIGRhdGVbMV1cclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMuYXR0ZW5kYW5jZURhdGVzLnB1c2gobGlzdCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHRoaXMuYXR0ZW5kYW5jZVZpZXcgPSB0cnVlO1xyXG4gIH1cclxuXHJcbiAgZ2V0U3R1ZGVudHNCeUlkKHRpbWV0YWJsZXMpIHtcclxuICAgIGNvbnNvbGUubG9nKHRpbWV0YWJsZXMpO1xyXG4gICAgdGhpcy5TdHVkZW50U2VydmljZVxyXG4gICAgICAuZ2V0U3R1ZGVudHNCeUlkKHRpbWV0YWJsZXMpXHJcbiAgICAgIC50aGVuKHJlc3VsdCA9PiB7XHJcbiAgICAgICAgdmFyIGlzRW1wdHkgPSAocmVzdWx0IHx8IFtdKS5sZW5ndGggPT09IDA7XHJcbiAgICAgICAgaWYgKChyZXN1bHQgYXMgYW55KS5yZXN1bHQgPT09ICdlcnJvcicpIHtcclxuICAgICAgICAgIHRoaXMuYXR0ZW5kYW5jZVN0dWRlbnRzID0gbnVsbDtcclxuICAgICAgICAgIHRoaXMuZGlzcGxheUVycm9yQWxlcnQocmVzdWx0KTtcclxuICAgICAgICB9IGVsc2UgaWYgKGlzRW1wdHkpIHtcclxuICAgICAgICAgIHRoaXMuYXR0ZW5kYW5jZVN0dWRlbnRzID0gbnVsbDtcclxuICAgICAgICAgIHN3YWwoXHJcbiAgICAgICAgICAgICdObyBTdHVkZW50cycsXHJcbiAgICAgICAgICAgICdObyBzdHVkZW50cyBhdHRhY2hlZCB0byB0aGlzIGNvdXJzZSBpZC4nLFxyXG4gICAgICAgICAgICAnd2FybmluZydcclxuICAgICAgICAgICk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHRoaXMuYXR0ZW5kYW5jZVN0dWRlbnRzID0gcmVzdWx0O1xyXG4gICAgICAgICAgZm9yIChsZXQgc3R1ZGVudCBvZiB0aGlzLmF0dGVuZGFuY2VTdHVkZW50cykge1xyXG4gICAgICAgICAgICBzdHVkZW50LmZ1bGxOYW1lID0gc3R1ZGVudC5maXJzdE5hbWUgKyBcIiBcIiArIHN0dWRlbnQubGFzdE5hbWU7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBzd2FsLmNsb3NlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gICAgICAuY2F0Y2goZXJyb3IgPT4gY29uc29sZS5sb2coZXJyb3IpKTtcclxuICB9XHJcblxyXG4gIHN1Ym1pdEF0dGVuZGFuY2UoKSB7XHJcbiAgICB2YXIgY291bnQgPSAwO1xyXG4gICAgZm9yIChsZXQgc3R1ZGVudCBvZiB0aGlzLmF0dGVuZGFuY2VTdHVkZW50cykge1xyXG4gICAgICBpZiAoc3R1ZGVudC5hdHRlbmRhbmNlVmFsdWUpIHtcclxuICAgICAgICBjb3VudCsrO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCF0aGlzLmF0dGVuZGFuY2VDb3Vyc2UuYXR0ZW5kYW5jZURhdGUpIHtcclxuICAgICAgY29uc29sZS5sb2codGhpcy5hdHRlbmRhbmNlQ291cnNlKTtcclxuICAgICAgc3dhbChcclxuICAgICAgICAnQXR0ZW5kYW5jZSBJbmNvbXBsZXRlJyxcclxuICAgICAgICAnUGxlYXNlIGVudGVyIGFuIGF0dGVuZGFuY2UgZGF0ZScsXHJcbiAgICAgICAgJ3dhcm5pbmcnXHJcbiAgICAgICk7XHJcbiAgICB9IGVsc2UgaWYgKGNvdW50ID09PSB0aGlzLmF0dGVuZGFuY2VTdHVkZW50cy5sZW5ndGggJiYgdGhpcy5hdHRlbmRhbmNlQ291cnNlLmF0dGVuZGFuY2VEYXRlKSB7XHJcbiAgICAgIHN3YWwoe1xyXG4gICAgICAgIHRpdGxlOiAnU3VibWl0IEF0dGVuZGFuY2U/JyxcclxuICAgICAgICB0ZXh0OiBcIllvdSB3b24ndCBiZSBhYmxlIHRvIHJldmVydCB0aGlzIVwiLFxyXG4gICAgICAgIHR5cGU6ICdpbmZvJyxcclxuICAgICAgICBzaG93Q2FuY2VsQnV0dG9uOiB0cnVlLFxyXG4gICAgICAgIGNvbmZpcm1CdXR0b25Db2xvcjogJyMzMDg1ZDYnLFxyXG4gICAgICAgIGNhbmNlbEJ1dHRvbkNvbG9yOiAnI2QzMycsXHJcbiAgICAgICAgY29uZmlybUJ1dHRvblRleHQ6ICdZZXMsIHN1Ym1pdCEnXHJcbiAgICAgIH0pLnRoZW4oaXNDb25maXJtID0+IHtcclxuICAgICAgICBpZiAoaXNDb25maXJtLmRpc21pc3MgPT09IFwiY2FuY2VsXCIgfHwgaXNDb25maXJtLmRpc21pc3MgPT09IFwib3ZlcmxheVwiKSB7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhpc0NvbmZpcm0uZGlzbWlzcyk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChpc0NvbmZpcm0pIHtcclxuICAgICAgICAgIHRoaXMuYXR0ZW5kYW5jZSA9IHtcclxuICAgICAgICAgICAgc3R1ZGVudHM6IHRoaXMuYXR0ZW5kYW5jZVN0dWRlbnRzLFxyXG4gICAgICAgICAgICBjb3Vyc2VJRDogdGhpcy5jb3Vyc2VJRCxcclxuICAgICAgICAgICAgZGF0ZTogdGhpcy5hdHRlbmRhbmNlQ291cnNlLmF0dGVuZGFuY2VEYXRlXHJcbiAgICAgICAgICB9O1xyXG4gICAgICAgICAgdGhpcy5TdHVkZW50U2VydmljZVxyXG4gICAgICAgICAgICAuaW5zZXJ0QXR0ZW5kYW5jZSh0aGlzLmF0dGVuZGFuY2UpXHJcbiAgICAgICAgICAgIC50aGVuKHJlc3VsdCA9PiB7XHJcbiAgICAgICAgICAgICAgaWYgKChyZXN1bHQgYXMgYW55KS5yZXN1bHQgPT09ICdlcnJvcicpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGlzcGxheUVycm9yQWxlcnQocmVzdWx0KTtcclxuICAgICAgICAgICAgICB9IGVsc2UgaWYgKChyZXN1bHQgYXMgYW55KS5yZXN1bHQgPT09ICdzdWNjZXNzJykge1xyXG4gICAgICAgICAgICAgICAgc3dhbChcclxuICAgICAgICAgICAgICAgICAgcmVzdWx0LnRpdGxlLFxyXG4gICAgICAgICAgICAgICAgICByZXN1bHQubXNnLFxyXG4gICAgICAgICAgICAgICAgICAnc3VjY2VzcydcclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmF0dGVuZGFuY2VWaWV3ID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJy9hdHRlbmRhbmNlLXJlcG9ydCddKTtcclxuICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgc3dhbChcclxuICAgICAgICAgICAgICAgICAgJ0Vycm9yJyxcclxuICAgICAgICAgICAgICAgICAgJ1NvbWV0aGluZyB3ZW50IHdyb25nLCBwbGVhc2UgdHJ5IGFnYWluLicsXHJcbiAgICAgICAgICAgICAgICAgICdlcnJvcidcclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuY2F0Y2goZXJyb3IgPT4gY29uc29sZS5sb2coZXJyb3IpKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pLmNhdGNoKGVycm9yID0+IHtcclxuICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XHJcbiAgICAgIH0pO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgc3dhbChcclxuICAgICAgICAnQXR0ZW5kYW5jZSBJbmNvbXBsZXRlJyxcclxuICAgICAgICAnUGxlYXNlIGVudGVyIGF0dGVuZGFuY2UgZm9yIGFsbCBzdHVkZW50cycsXHJcbiAgICAgICAgJ3dhcm5pbmcnXHJcbiAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gIH1cclxuXHJcbiAgZGlzcGxheUVycm9yQWxlcnQoZXJyb3IpIHtcclxuICAgIGlmIChlcnJvci50aXRsZSA9PT0gXCJBdXRoIEVycm9yXCIpIHtcclxuICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWycvbG9naW4nXSk7XHJcbiAgICAgIHN3YWwoXHJcbiAgICAgICAgZXJyb3IudGl0bGUsXHJcbiAgICAgICAgZXJyb3IubXNnLFxyXG4gICAgICAgICdpbmZvJ1xyXG4gICAgICApO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgc3dhbChcclxuICAgICAgICBlcnJvci50aXRsZSxcclxuICAgICAgICBlcnJvci5tc2csXHJcbiAgICAgICAgJ2Vycm9yJ1xyXG4gICAgICApO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZ29CYWNrKCkge1xyXG4gICAgd2luZG93Lmhpc3RvcnkuYmFjaygpO1xyXG4gIH1cclxufVxyXG4iXX0=
