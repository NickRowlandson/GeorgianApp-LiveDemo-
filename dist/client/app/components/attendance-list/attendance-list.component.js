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
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var course_service_1 = require("../../services/course.service");
var student_service_1 = require("../../services/student.service");
var staff_service_1 = require("../../services/staff.service");
var AttendanceListComponent = /** @class */ (function () {
    function AttendanceListComponent(router, CourseService, StudentService, StaffService) {
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
    AttendanceListComponent.prototype.ngOnInit = function () {
        var _this = this;
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
                .then(function (instructors) {
                if (instructors.result === 'error') {
                    _this.displayErrorAlert(instructors);
                }
                else {
                    _this.instructors = instructors.filter(function (x) { return x.userType.indexOf("Instructor") !== -1; });
                    swal.close();
                }
            })
                .catch(function (error) {
                // do something
            });
        }
        else {
            this.getCourses(userID);
            this.StudentService
                .getAllAttendance()
                .then(function (attendance) {
                if (attendance.result === 'error') {
                    _this.displayErrorAlert(attendance);
                    _this.previousAttendance = null;
                }
                else {
                    _this.previousAttendance = attendance;
                    for (var _i = 0, _a = _this.previousAttendance; _i < _a.length; _i++) {
                        var item = _a[_i];
                        item.date = item.date[0] + " " + item.date[1];
                    }
                }
            })
                .catch(function (error) { return console.log(error); });
            swal.close();
        }
    };
    AttendanceListComponent.prototype.instructorSelect = function () {
        var _this = this;
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
            .then(function (attendance) {
            if (attendance.result === 'error') {
                _this.previousAttendance = null;
                _this.displayErrorAlert(attendance);
            }
            else {
                _this.previousAttendance = attendance;
                for (var _i = 0, _a = _this.previousAttendance; _i < _a.length; _i++) {
                    var item = _a[_i];
                    item.date = item.date[0] + " " + item.date[1];
                }
            }
            swal.close();
        })
            .catch(function (error) { return console.log(error); });
    };
    AttendanceListComponent.prototype.getCourses = function (instructorID) {
        var _this = this;
        this.CourseService
            .getInstructorCourses(instructorID)
            .then(function (result) {
            var isEmpty = (result || []).length === 0;
            if (result.result === 'error') {
                _this.data = null;
                _this.displayErrorAlert(result);
            }
            else if (isEmpty) {
                _this.data = null;
                swal('No Courses', 'No courses attached to this instructor id.', 'warning');
            }
            else {
                _this.data = result;
            }
        })
            .catch(function (error) { return console.log(error); });
    };
    AttendanceListComponent.prototype.doAttendance = function (course) {
        var _this = this;
        this.attendanceDates = [];
        swal({
            title: 'Loading...',
            allowOutsideClick: false
        });
        swal.showLoading();
        this.previousAttendance = this.previousAttendance.filter(function (x) { return x.courseID === course.courseID; });
        this.courseID = course.courseID;
        this.StudentService
            .getTimetablesByCourseId(course.courseID)
            .then(function (result) {
            var isEmpty = (result || []).length === 0;
            if (result.result === 'error') {
                _this.timetables = null;
                _this.attendanceStudents = null;
                _this.displayErrorAlert(result);
            }
            else if (isEmpty) {
                _this.timetables = null;
                _this.attendanceStudents = null;
                swal('No Students', 'No students attached to this course id.', 'warning');
            }
            else {
                _this.timetables = result;
                _this.getStudentsById(_this.timetables);
            }
        })
            .catch(function (error) { return console.log(error); });
        this.attendanceCourse = course;
        var array = this.attendanceCourse.classTimeStr.split(',');
        var _loop_1 = function (item) {
            attendanceHistory = this_1.previousAttendance;
            attendanceHistory = attendanceHistory.filter(function (x) { return x.date === item; });
            if (attendanceHistory.length !== 0) {
                console.log("Attendance already taken");
            }
            else {
                date = item.split(' ');
                formattedDate = moment(date[0]).format("ddd, MMM Do YYYY");
                list = {
                    label: formattedDate + ' from ' + date[1],
                    value: date[0] + ' ' + date[1]
                };
                this_1.attendanceDates.push(list);
            }
        };
        var this_1 = this, attendanceHistory, date, formattedDate, list;
        for (var _i = 0, array_1 = array; _i < array_1.length; _i++) {
            var item = array_1[_i];
            _loop_1(item);
        }
        this.attendanceView = true;
    };
    AttendanceListComponent.prototype.getStudentsById = function (timetables) {
        var _this = this;
        console.log(timetables);
        this.StudentService
            .getStudentsById(timetables)
            .then(function (result) {
            var isEmpty = (result || []).length === 0;
            if (result.result === 'error') {
                _this.attendanceStudents = null;
                _this.displayErrorAlert(result);
            }
            else if (isEmpty) {
                _this.attendanceStudents = null;
                swal('No Students', 'No students attached to this course id.', 'warning');
            }
            else {
                _this.attendanceStudents = result;
                for (var _i = 0, _a = _this.attendanceStudents; _i < _a.length; _i++) {
                    var student = _a[_i];
                    student.fullName = student.firstName + " " + student.lastName;
                }
                swal.close();
            }
        })
            .catch(function (error) { return console.log(error); });
    };
    AttendanceListComponent.prototype.submitAttendance = function () {
        var _this = this;
        var count = 0;
        for (var _i = 0, _a = this.attendanceStudents; _i < _a.length; _i++) {
            var student = _a[_i];
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
            }).then(function (isConfirm) {
                if (isConfirm.dismiss === "cancel" || isConfirm.dismiss === "overlay") {
                    console.log(isConfirm.dismiss);
                }
                else if (isConfirm) {
                    _this.attendance = {
                        students: _this.attendanceStudents,
                        courseID: _this.courseID,
                        date: _this.attendanceCourse.attendanceDate
                    };
                    _this.StudentService
                        .insertAttendance(_this.attendance)
                        .then(function (result) {
                        if (result.result === 'error') {
                            _this.displayErrorAlert(result);
                        }
                        else if (result.result === 'success') {
                            swal('Attendance submitted!', '', 'success');
                            _this.attendanceView = false;
                            _this.router.navigate(['/attendance-report']);
                        }
                        else {
                            swal('Error', 'Something went wrong, please try again.', 'error');
                        }
                    })
                        .catch(function (error) { return console.log(error); });
                }
            }).catch(function (error) {
                console.log(error);
            });
        }
        else {
            swal('Attendance Incomplete', 'Please enter attendance for all students', 'warning');
        }
    };
    AttendanceListComponent.prototype.displayErrorAlert = function (error) {
        swal(error.title, error.msg, 'error');
    };
    AttendanceListComponent.prototype.goBack = function () {
        window.history.back();
    };
    AttendanceListComponent = __decorate([
        core_1.Component({
            selector: 'attendanceList',
            templateUrl: './app/components/attendance-list/attendance-list.component.html',
            styleUrls: ['./app/components/attendance-list/attendance-list.component.css']
        }),
        __metadata("design:paramtypes", [router_1.Router, course_service_1.CourseService, student_service_1.StudentService, staff_service_1.StaffService])
    ], AttendanceListComponent);
    return AttendanceListComponent;
}());
exports.AttendanceListComponent = AttendanceListComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NsaWVudC9hcHAvY29tcG9uZW50cy9hdHRlbmRhbmNlLWxpc3QvYXR0ZW5kYW5jZS1saXN0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLHNDQUFrRDtBQUNsRCwwQ0FBeUM7QUFDekMsZ0VBQThEO0FBRzlELGtFQUFnRTtBQUNoRSw4REFBNEQ7QUFVNUQ7SUFpQkUsaUNBQW9CLE1BQWMsRUFBVSxhQUE0QixFQUFVLGNBQThCLEVBQVUsWUFBMEI7UUFBaEksV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUFVLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBQVUsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBQVUsaUJBQVksR0FBWixZQUFZLENBQWM7UUFicEosbUJBQWMsR0FBWSxLQUFLLENBQUM7UUFDaEMsWUFBTyxHQUFZLEtBQUssQ0FBQztRQUt6QixtQkFBYyxHQUFHLEVBQUUsQ0FBQztRQUNwQixvQkFBZSxHQUFVLEVBQUUsQ0FBQztRQUc1QixzQkFBaUIsR0FBUSxFQUFFLENBQUM7UUFJMUIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDO0lBQ3pCLENBQUM7SUFFRCwwQ0FBUSxHQUFSO1FBQUEsaUJBd0NDO1FBdkNDLElBQUksQ0FBQztZQUNILEtBQUssRUFBRSxZQUFZO1lBQ25CLGlCQUFpQixFQUFFLEtBQUs7U0FDekIsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ25CLElBQUksV0FBVyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDO1FBQ2xFLElBQUksTUFBTSxHQUFHLFdBQVcsQ0FBQyxNQUFNLENBQUM7UUFDaEMsSUFBSSxXQUFXLENBQUMsUUFBUSxLQUFLLFlBQVksRUFBRTtZQUN6QyxJQUFJLENBQUMsWUFBWTtpQkFDZCxRQUFRLEVBQUU7aUJBQ1YsSUFBSSxD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LEVBQUUsaUVBQWlFO1lBQzlFLFNBQVMsRUFBRSxDQUFDLGdFQUFnRSxDQUFDO1NBQzlFLENBQUM7eUNBbUI0QixlQUFNLEVBQXlCLDhCQUFhLEVBQTBCLGdDQUFjLEVBQXdCLDRCQUFZO09BakJ6SSx1QkFBdUIsQ0E4UW5DO0lBQUQsOEJBQUM7Q0E5UUQsQUE4UUMsSUFBQTtBQTlRWSwwREFBdUIiLCJmaWxlIjoiYXBwL2NvbXBvbmVudHMvYXR0ZW5kYW5jZS1saXN0L2F0dGVuZGFuY2UtbGlzdC5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBSb3V0ZXIgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xyXG5pbXBvcnQgeyBDb3Vyc2VTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL2NvdXJzZS5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IENvdXJzZSB9IGZyb20gXCIuLi8uLi9tb2RlbHMvY291cnNlXCI7XHJcbmltcG9ydCB7IFN0dWRlbnQgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL1N0dWRlbnRcIjtcclxuaW1wb3J0IHsgU3R1ZGVudFNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvc3R1ZGVudC5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IFN0YWZmU2VydmljZSB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9zdGFmZi5zZXJ2aWNlXCI7XHJcbmRlY2xhcmUgdmFyIHN3YWw6IGFueTtcclxuZGVjbGFyZSB2YXIgbW9tZW50O1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdhdHRlbmRhbmNlTGlzdCcsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL2FwcC9jb21wb25lbnRzL2F0dGVuZGFuY2UtbGlzdC9hdHRlbmRhbmNlLWxpc3QuY29tcG9uZW50Lmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL2FwcC9jb21wb25lbnRzL2F0dGVuZGFuY2UtbGlzdC9hdHRlbmRhbmNlLWxpc3QuY29tcG9uZW50LmNzcyddXHJcbn0pXHJcblxyXG5leHBvcnQgY2xhc3MgQXR0ZW5kYW5jZUxpc3RDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG4gIGRhdGE6IGFueTtcclxuICBkYXRlOiBhbnk7XHJcbiAgY291cnNlSUQ6IGFueTtcclxuICBhdHRlbmRhbmNlVmlldzogYm9vbGVhbiA9IGZhbHNlO1xyXG4gIGxvYWRpbmc6IGJvb2xlYW4gPSBmYWxzZTtcclxuICBhdHRlbmRhbmNlQ291cnNlOiBhbnk7XHJcbiAgYXR0ZW5kYW5jZVN0dWRlbnRzOiBhbnk7XHJcbiAgdGltZXRhYmxlczogYW55O1xyXG4gIGF0dGVuZGFuY2U6IGFueTtcclxuICBhYnNlbnRTdHVkZW50cyA9IFtdO1xyXG4gIGF0dGVuZGFuY2VEYXRlczogYW55W10gPSBbXTtcclxuICBwcmV2aW91c0F0dGVuZGFuY2U6IGFueTtcclxuICBpbnN0cnVjdG9yczogYW55O1xyXG4gIGluc3RydWN0b3JPcHRpb25zOiBhbnkgPSB7fTtcclxuICBzZWxlY3RlZEluc3RydWN0b3I6IG51bWJlcjtcclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSByb3V0ZXI6IFJvdXRlciwgcHJpdmF0ZSBDb3Vyc2VTZXJ2aWNlOiBDb3Vyc2VTZXJ2aWNlLCBwcml2YXRlIFN0dWRlbnRTZXJ2aWNlOiBTdHVkZW50U2VydmljZSwgcHJpdmF0ZSBTdGFmZlNlcnZpY2U6IFN0YWZmU2VydmljZSkge1xyXG4gICAgdGhpcy5kYXRlID0gbmV3IERhdGUoKTtcclxuICB9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgc3dhbCh7XHJcbiAgICAgIHRpdGxlOiAnTG9hZGluZy4uLicsXHJcbiAgICAgIGFsbG93T3V0c2lkZUNsaWNrOiBmYWxzZVxyXG4gICAgfSk7XHJcbiAgICBzd2FsLnNob3dMb2FkaW5nKCk7XHJcbiAgICB2YXIgY3VycmVudFVzZXIgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdjdXJyZW50VXNlcicpKTtcclxuICAgIHZhciB1c2VySUQgPSBjdXJyZW50VXNlci51c2VySUQ7XHJcbiAgICBpZiAoY3VycmVudFVzZXIudXNlclR5cGUgIT09ICdJbnN0cnVjdG9yJykge1xyXG4gICAgICB0aGlzLlN0YWZmU2VydmljZVxyXG4gICAgICAgIC5nZXRVc2VycygpXHJcbiAgICAgICAgLnRoZW4oaW5zdHJ1Y3RvcnMgPT4ge1xyXG4gICAgICAgICAgaWYgKChpbnN0cnVjdG9ycyBhcyBhbnkpLnJlc3VsdCA9PT0gJ2Vycm9yJykge1xyXG4gICAgICAgICAgICB0aGlzLmRpc3BsYXlFcnJvckFsZXJ0KGluc3RydWN0b3JzKTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuaW5zdHJ1Y3RvcnMgPSBpbnN0cnVjdG9ycy5maWx0ZXIoeCA9PiB4LnVzZXJUeXBlLmluZGV4T2YoXCJJbnN0cnVjdG9yXCIpICE9PSAtMSk7XHJcbiAgICAgICAgICAgIHN3YWwuY2xvc2UoKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiB7XHJcbiAgICAgICAgICAvLyBkbyBzb21ldGhpbmdcclxuICAgICAgICB9KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuZ2V0Q291cnNlcyh1c2VySUQpO1xyXG4gICAgICB0aGlzLlN0dWRlbnRTZXJ2aWNlXHJcbiAgICAgICAgLmdldEFsbEF0dGVuZGFuY2UoKVxyXG4gICAgICAgIC50aGVuKGF0dGVuZGFuY2UgPT4ge1xyXG4gICAgICAgICAgaWYgKChhdHRlbmRhbmNlIGFzIGFueSkucmVzdWx0ID09PSAnZXJyb3InKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZGlzcGxheUVycm9yQWxlcnQoYXR0ZW5kYW5jZSk7XHJcbiAgICAgICAgICAgIHRoaXMucHJldmlvdXNBdHRlbmRhbmNlID0gbnVsbDtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMucHJldmlvdXNBdHRlbmRhbmNlID0gYXR0ZW5kYW5jZTtcclxuICAgICAgICAgICAgZm9yIChsZXQgaXRlbSBvZiB0aGlzLnByZXZpb3VzQXR0ZW5kYW5jZSkge1xyXG4gICAgICAgICAgICAgIGl0ZW0uZGF0ZSA9IGl0ZW0uZGF0ZVswXSArIFwiIFwiICsgaXRlbS5kYXRlWzFdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4gY29uc29sZS5sb2coZXJyb3IpKTtcclxuICAgICAgc3dhbC5jbG9zZSgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgaW5zdHJ1Y3RvclNlbGVjdCgpIHtcclxuICAgIHRoaXMuYXR0ZW5kYW5jZURhdGVzID0gW107XHJcbiAgICB0aGlzLmF0dGVuZGFuY2VWaWV3ID0gbnVsbDtcclxuICAgIHN3YWwoe1xyXG4gICAgICB0aXRsZTogJ0xvYWRpbmcuLi4nLFxyXG4gICAgICBhbGxvd091dHNpZGVDbGljazogZmFsc2VcclxuICAgIH0pO1xyXG4gICAgc3dhbC5zaG93TG9hZGluZygpO1xyXG4gICAgdGhpcy5nZXRDb3Vyc2VzKHRoaXMuc2VsZWN0ZWRJbnN0cnVjdG9yKTtcclxuICAgIHRoaXMuU3R1ZGVudFNlcnZpY2VcclxuICAgICAgLmdldEFsbEF0dGVuZGFuY2UoKVxyXG4gICAgICAudGhlbihhdHRlbmRhbmNlID0+IHtcclxuICAgICAgICBpZiAoKGF0dGVuZGFuY2UgYXMgYW55KS5yZXN1bHQgPT09ICdlcnJvcicpIHtcclxuICAgICAgICAgIHRoaXMucHJldmlvdXNBdHRlbmRhbmNlID0gbnVsbDtcclxuICAgICAgICAgIHRoaXMuZGlzcGxheUVycm9yQWxlcnQoYXR0ZW5kYW5jZSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHRoaXMucHJldmlvdXNBdHRlbmRhbmNlID0gYXR0ZW5kYW5jZTtcclxuICAgICAgICAgIGZvciAobGV0IGl0ZW0gb2YgdGhpcy5wcmV2aW91c0F0dGVuZGFuY2UpIHtcclxuICAgICAgICAgICAgaXRlbS5kYXRlID0gaXRlbS5kYXRlWzBdICsgXCIgXCIgKyBpdGVtLmRhdGVbMV07XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHN3YWwuY2xvc2UoKTtcclxuICAgICAgfSlcclxuICAgICAgLmNhdGNoKGVycm9yID0+IGNvbnNvbGUubG9nKGVycm9yKSk7XHJcbiAgfVxyXG5cclxuICBnZXRDb3Vyc2VzKGluc3RydWN0b3JJRCkge1xyXG4gICAgdGhpcy5Db3Vyc2VTZXJ2aWNlXHJcbiAgICAgIC5nZXRJbnN0cnVjdG9yQ291cnNlcyhpbnN0cnVjdG9ySUQpXHJcbiAgICAgIC50aGVuKHJlc3VsdCA9PiB7XHJcbiAgICAgICAgdmFyIGlzRW1wdHkgPSAocmVzdWx0IHx8IFtdKS5sZW5ndGggPT09IDA7XHJcbiAgICAgICAgaWYgKChyZXN1bHQgYXMgYW55KS5yZXN1bHQgPT09ICdlcnJvcicpIHtcclxuICAgICAgICAgIHRoaXMuZGF0YSA9IG51bGw7XHJcbiAgICAgICAgICB0aGlzLmRpc3BsYXlFcnJvckFsZXJ0KHJlc3VsdCk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChpc0VtcHR5KSB7XHJcbiAgICAgICAgICB0aGlzLmRhdGEgPSBudWxsO1xyXG4gICAgICAgICAgc3dhbChcclxuICAgICAgICAgICAgJ05vIENvdXJzZXMnLFxyXG4gICAgICAgICAgICAnTm8gY291cnNlcyBhdHRhY2hlZCB0byB0aGlzIGluc3RydWN0b3IgaWQuJyxcclxuICAgICAgICAgICAgJ3dhcm5pbmcnXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB0aGlzLmRhdGEgPSByZXN1bHQ7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gICAgICAuY2F0Y2goZXJyb3IgPT4gY29uc29sZS5sb2coZXJyb3IpKTtcclxuICB9XHJcblxyXG4gIGRvQXR0ZW5kYW5jZShjb3Vyc2U6IENvdXJzZSkge1xyXG4gICAgdGhpcy5hdHRlbmRhbmNlRGF0ZXMgPSBbXTtcclxuICAgIHN3YWwoe1xyXG4gICAgICB0aXRsZTogJ0xvYWRpbmcuLi4nLFxyXG4gICAgICBhbGxvd091dHNpZGVDbGljazogZmFsc2VcclxuICAgIH0pO1xyXG4gICAgc3dhbC5zaG93TG9hZGluZygpO1xyXG4gICAgdGhpcy5wcmV2aW91c0F0dGVuZGFuY2UgPSB0aGlzLnByZXZpb3VzQXR0ZW5kYW5jZS5maWx0ZXIoeCA9PiB4LmNvdXJzZUlEID09PSBjb3Vyc2UuY291cnNlSUQpO1xyXG4gICAgdGhpcy5jb3Vyc2VJRCA9IGNvdXJzZS5jb3Vyc2VJRDtcclxuICAgIHRoaXMuU3R1ZGVudFNlcnZpY2VcclxuICAgICAgLmdldFRpbWV0YWJsZXNCeUNvdXJzZUlkKGNvdXJzZS5jb3Vyc2VJRClcclxuICAgICAgLnRoZW4ocmVzdWx0ID0+IHtcclxuICAgICAgICB2YXIgaXNFbXB0eSA9IChyZXN1bHQgfHwgW10pLmxlbmd0aCA9PT0gMDtcclxuICAgICAgICBpZiAoKHJlc3VsdCBhcyBhbnkpLnJlc3VsdCA9PT0gJ2Vycm9yJykge1xyXG4gICAgICAgICAgdGhpcy50aW1ldGFibGVzID0gbnVsbDtcclxuICAgICAgICAgIHRoaXMuYXR0ZW5kYW5jZVN0dWRlbnRzID0gbnVsbDtcclxuICAgICAgICAgIHRoaXMuZGlzcGxheUVycm9yQWxlcnQocmVzdWx0KTtcclxuICAgICAgICB9IGVsc2UgaWYgKGlzRW1wdHkpIHtcclxuICAgICAgICAgIHRoaXMudGltZXRhYmxlcyA9IG51bGw7XHJcbiAgICAgICAgICB0aGlzLmF0dGVuZGFuY2VTdHVkZW50cyA9IG51bGw7XHJcbiAgICAgICAgICBzd2FsKFxyXG4gICAgICAgICAgICAnTm8gU3R1ZGVudHMnLFxyXG4gICAgICAgICAgICAnTm8gc3R1ZGVudHMgYXR0YWNoZWQgdG8gdGhpcyBjb3Vyc2UgaWQuJyxcclxuICAgICAgICAgICAgJ3dhcm5pbmcnXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB0aGlzLnRpbWV0YWJsZXMgPSByZXN1bHQ7XHJcbiAgICAgICAgICB0aGlzLmdldFN0dWRlbnRzQnlJZCh0aGlzLnRpbWV0YWJsZXMpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuICAgICAgLmNhdGNoKGVycm9yID0+IGNvbnNvbGUubG9nKGVycm9yKSk7XHJcblxyXG4gICAgdGhpcy5hdHRlbmRhbmNlQ291cnNlID0gY291cnNlO1xyXG4gICAgdmFyIGFycmF5ID0gdGhpcy5hdHRlbmRhbmNlQ291cnNlLmNsYXNzVGltZVN0ci5zcGxpdCgnLCcpO1xyXG4gICAgZm9yIChsZXQgaXRlbSBvZiBhcnJheSkge1xyXG4gICAgICB2YXIgYXR0ZW5kYW5jZUhpc3RvcnkgPSB0aGlzLnByZXZpb3VzQXR0ZW5kYW5jZTtcclxuICAgICAgYXR0ZW5kYW5jZUhpc3RvcnkgPSBhdHRlbmRhbmNlSGlzdG9yeS5maWx0ZXIoeCA9PiB4LmRhdGUgPT09IGl0ZW0pO1xyXG4gICAgICBpZiAoYXR0ZW5kYW5jZUhpc3RvcnkubGVuZ3RoICE9PSAwKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJBdHRlbmRhbmNlIGFscmVhZHkgdGFrZW5cIik7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdmFyIGRhdGUgPSBpdGVtLnNwbGl0KCcgJyk7XHJcbiAgICAgICAgdmFyIGZvcm1hdHRlZERhdGUgPSBtb21lbnQoZGF0ZVswXSkuZm9ybWF0KFwiZGRkLCBNTU0gRG8gWVlZWVwiKTtcclxuICAgICAgICB2YXIgbGlzdCA9IHtcclxuICAgICAgICAgIGxhYmVsOiBmb3JtYXR0ZWREYXRlICsgJyBmcm9tICcgKyBkYXRlWzFdLFxyXG4gICAgICAgICAgdmFsdWU6IGRhdGVbMF0gKyAnICcgKyBkYXRlWzFdXHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLmF0dGVuZGFuY2VEYXRlcy5wdXNoKGxpc3QpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICB0aGlzLmF0dGVuZGFuY2VWaWV3ID0gdHJ1ZTtcclxuICB9XHJcblxyXG4gIGdldFN0dWRlbnRzQnlJZCh0aW1ldGFibGVzKSB7XHJcbiAgICBjb25zb2xlLmxvZyh0aW1ldGFibGVzKTtcclxuICAgIHRoaXMuU3R1ZGVudFNlcnZpY2VcclxuICAgICAgLmdldFN0dWRlbnRzQnlJZCh0aW1ldGFibGVzKVxyXG4gICAgICAudGhlbihyZXN1bHQgPT4ge1xyXG4gICAgICAgIHZhciBpc0VtcHR5ID0gKHJlc3VsdCB8fCBbXSkubGVuZ3RoID09PSAwO1xyXG4gICAgICAgIGlmICgocmVzdWx0IGFzIGFueSkucmVzdWx0ID09PSAnZXJyb3InKSB7XHJcbiAgICAgICAgICB0aGlzLmF0dGVuZGFuY2VTdHVkZW50cyA9IG51bGw7XHJcbiAgICAgICAgICB0aGlzLmRpc3BsYXlFcnJvckFsZXJ0KHJlc3VsdCk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChpc0VtcHR5KSB7XHJcbiAgICAgICAgICB0aGlzLmF0dGVuZGFuY2VTdHVkZW50cyA9IG51bGw7XHJcbiAgICAgICAgICBzd2FsKFxyXG4gICAgICAgICAgICAnTm8gU3R1ZGVudHMnLFxyXG4gICAgICAgICAgICAnTm8gc3R1ZGVudHMgYXR0YWNoZWQgdG8gdGhpcyBjb3Vyc2UgaWQuJyxcclxuICAgICAgICAgICAgJ3dhcm5pbmcnXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB0aGlzLmF0dGVuZGFuY2VTdHVkZW50cyA9IHJlc3VsdDtcclxuICAgICAgICAgIGZvciAobGV0IHN0dWRlbnQgb2YgdGhpcy5hdHRlbmRhbmNlU3R1ZGVudHMpIHtcclxuICAgICAgICAgICAgc3R1ZGVudC5mdWxsTmFtZSA9IHN0dWRlbnQuZmlyc3ROYW1lICsgXCIgXCIgKyBzdHVkZW50Lmxhc3ROYW1lO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgc3dhbC5jbG9zZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuICAgICAgLmNhdGNoKGVycm9yID0+IGNvbnNvbGUubG9nKGVycm9yKSk7XHJcbiAgfVxyXG5cclxuICBzdWJtaXRBdHRlbmRhbmNlKCkge1xyXG4gICAgdmFyIGNvdW50ID0gMDtcclxuICAgIGZvciAobGV0IHN0dWRlbnQgb2YgdGhpcy5hdHRlbmRhbmNlU3R1ZGVudHMpIHtcclxuICAgICAgaWYgKHN0dWRlbnQuYXR0ZW5kYW5jZVZhbHVlKSB7XHJcbiAgICAgICAgY291bnQrKztcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGlmICghdGhpcy5hdHRlbmRhbmNlQ291cnNlLmF0dGVuZGFuY2VEYXRlKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKHRoaXMuYXR0ZW5kYW5jZUNvdXJzZSk7XHJcbiAgICAgIHN3YWwoXHJcbiAgICAgICAgJ0F0dGVuZGFuY2UgSW5jb21wbGV0ZScsXHJcbiAgICAgICAgJ1BsZWFzZSBlbnRlciBhbiBhdHRlbmRhbmNlIGRhdGUnLFxyXG4gICAgICAgICd3YXJuaW5nJ1xyXG4gICAgICApO1xyXG4gICAgfSBlbHNlIGlmIChjb3VudCA9PT0gdGhpcy5hdHRlbmRhbmNlU3R1ZGVudHMubGVuZ3RoICYmIHRoaXMuYXR0ZW5kYW5jZUNvdXJzZS5hdHRlbmRhbmNlRGF0ZSkge1xyXG4gICAgICBzd2FsKHtcclxuICAgICAgICB0aXRsZTogJ1N1Ym1pdCBBdHRlbmRhbmNlPycsXHJcbiAgICAgICAgdGV4dDogXCJZb3Ugd29uJ3QgYmUgYWJsZSB0byByZXZlcnQgdGhpcyFcIixcclxuICAgICAgICB0eXBlOiAnaW5mbycsXHJcbiAgICAgICAgc2hvd0NhbmNlbEJ1dHRvbjogdHJ1ZSxcclxuICAgICAgICBjb25maXJtQnV0dG9uQ29sb3I6ICcjMzA4NWQ2JyxcclxuICAgICAgICBjYW5jZWxCdXR0b25Db2xvcjogJyNkMzMnLFxyXG4gICAgICAgIGNvbmZpcm1CdXR0b25UZXh0OiAnWWVzLCBzdWJtaXQhJ1xyXG4gICAgICB9KS50aGVuKGlzQ29uZmlybSA9PiB7XHJcbiAgICAgICAgaWYgKGlzQ29uZmlybS5kaXNtaXNzID09PSBcImNhbmNlbFwiIHx8IGlzQ29uZmlybS5kaXNtaXNzID09PSBcIm92ZXJsYXlcIikge1xyXG4gICAgICAgICAgY29uc29sZS5sb2coaXNDb25maXJtLmRpc21pc3MpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoaXNDb25maXJtKSB7XHJcbiAgICAgICAgICB0aGlzLmF0dGVuZGFuY2UgPSB7XHJcbiAgICAgICAgICAgIHN0dWRlbnRzOiB0aGlzLmF0dGVuZGFuY2VTdHVkZW50cyxcclxuICAgICAgICAgICAgY291cnNlSUQ6IHRoaXMuY291cnNlSUQsXHJcbiAgICAgICAgICAgIGRhdGU6IHRoaXMuYXR0ZW5kYW5jZUNvdXJzZS5hdHRlbmRhbmNlRGF0ZVxyXG4gICAgICAgICAgfTtcclxuICAgICAgICAgIHRoaXMuU3R1ZGVudFNlcnZpY2VcclxuICAgICAgICAgICAgLmluc2VydEF0dGVuZGFuY2UodGhpcy5hdHRlbmRhbmNlKVxyXG4gICAgICAgICAgICAudGhlbihyZXN1bHQgPT4ge1xyXG4gICAgICAgICAgICAgIGlmICgocmVzdWx0IGFzIGFueSkucmVzdWx0ID09PSAnZXJyb3InKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRpc3BsYXlFcnJvckFsZXJ0KHJlc3VsdCk7XHJcbiAgICAgICAgICAgICAgfSBlbHNlIGlmICgocmVzdWx0IGFzIGFueSkucmVzdWx0ID09PSAnc3VjY2VzcycpIHtcclxuICAgICAgICAgICAgICAgIHN3YWwoXHJcbiAgICAgICAgICAgICAgICAgICdBdHRlbmRhbmNlIHN1Ym1pdHRlZCEnLFxyXG4gICAgICAgICAgICAgICAgICAnJyxcclxuICAgICAgICAgICAgICAgICAgJ3N1Y2Nlc3MnXHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hdHRlbmRhbmNlVmlldyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWycvYXR0ZW5kYW5jZS1yZXBvcnQnXSk7XHJcbiAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHN3YWwoXHJcbiAgICAgICAgICAgICAgICAgICdFcnJvcicsXHJcbiAgICAgICAgICAgICAgICAgICdTb21ldGhpbmcgd2VudCB3cm9uZywgcGxlYXNlIHRyeSBhZ2Fpbi4nLFxyXG4gICAgICAgICAgICAgICAgICAnZXJyb3InXHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLmNhdGNoKGVycm9yID0+IGNvbnNvbGUubG9nKGVycm9yKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KS5jYXRjaChlcnJvciA9PiB7XHJcbiAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xyXG4gICAgICB9KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHN3YWwoXHJcbiAgICAgICAgJ0F0dGVuZGFuY2UgSW5jb21wbGV0ZScsXHJcbiAgICAgICAgJ1BsZWFzZSBlbnRlciBhdHRlbmRhbmNlIGZvciBhbGwgc3R1ZGVudHMnLFxyXG4gICAgICAgICd3YXJuaW5nJ1xyXG4gICAgICApO1xyXG4gICAgfVxyXG5cclxuICB9XHJcblxyXG4gIGRpc3BsYXlFcnJvckFsZXJ0KGVycm9yKSB7XHJcbiAgICBzd2FsKFxyXG4gICAgICBlcnJvci50aXRsZSxcclxuICAgICAgZXJyb3IubXNnLFxyXG4gICAgICAnZXJyb3InXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgZ29CYWNrKCkge1xyXG4gICAgd2luZG93Lmhpc3RvcnkuYmFjaygpO1xyXG4gIH1cclxufVxyXG4iXX0=
