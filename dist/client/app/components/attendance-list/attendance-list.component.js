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
                _this.instructors = instructors.filter(function (x) { return x.userType === 'Instructor'; });
            })
                .catch(function (error) {
                // do something
            });
            swal.close();
        }
        else {
            this.getCourses(userID);
            this.StudentService
                .getAllAttendance()
                .then(function (attendance) {
                if (attendance.status === "403") {
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
            if (attendance.status === "403") {
                _this.previousAttendance = null;
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
            if (isEmpty || result.status === "403") {
                console.log(result);
                _this.data = null;
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
            if (isEmpty || result.status === "403") {
                _this.timetables = null;
                _this.attendanceStudents = null;
                swal.close();
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
            if (isEmpty || result.status === "error") {
                _this.attendanceStudents = null;
            }
            else {
                _this.attendanceStudents = result;
                for (var _i = 0, _a = _this.attendanceStudents; _i < _a.length; _i++) {
                    var student = _a[_i];
                    student.fullName = student.firstName + " " + student.lastName;
                }
            }
            swal.close();
        })
            .catch(function (error) { return console.log(error); });
    };
    // markAbsent(student: Student) {
    //   if (student.absent) {
    //     student.absent = false;
    //     var index = this.absentStudents.indexOf(student.studentID);
    //     this.absentStudents.splice(index, 1);
    //   } else {
    //     student.absent = true;
    //     this.absentStudents.push(student.studentID);
    //   }
    //   console.log(this.absentStudents);
    // }
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
                        swal('Attendance submitted!', '', 'success');
                        _this.attendanceView = false;
                        _this.router.navigate(['/attendance-report']);
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NsaWVudC9hcHAvY29tcG9uZW50cy9hdHRlbmRhbmNlLWxpc3QvYXR0ZW5kYW5jZS1saXN0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLHNDQUFrRDtBQUNsRCwwQ0FBeUM7QUFDekMsZ0VBQThEO0FBRzlELGtFQUFnRTtBQUNoRSw4REFBNEQ7QUFVNUQ7SUFpQkksaUNBQW9CLE1BQWMsRUFBVSxhQUE0QixFQUFVLGNBQThCLEVBQVUsWUFBMEI7UUFBaEksV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUFVLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBQVUsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBQVUsaUJBQVksR0FBWixZQUFZLENBQWM7UUFicEosbUJBQWMsR0FBWSxLQUFLLENBQUM7UUFDaEMsWUFBTyxHQUFZLEtBQUssQ0FBQztRQUt6QixtQkFBYyxHQUFHLEVBQUUsQ0FBQztRQUNwQixvQkFBZSxHQUFVLEVBQUUsQ0FBQztRQUc1QixzQkFBaUIsR0FBUSxFQUFFLENBQUM7UUFJMUIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDO0lBQ3pCLENBQUM7SUFFRCwwQ0FBUSxHQUFSO1FBQUEsaUJBbUNDO1FBbENDLElBQUksQ0FBQztZQUNILEtBQUssRUFBRSxZQUFZO1lBQ25CLGlCQUFpQixFQUFFLEtBQUs7U0FDekIsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ25CLElBQUksV0FBVyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDO1FBQ2xFLElBQUksTUFBTSxHQUFHLFdBQVcsQ0FBQyxNQUFNLENBQUM7UUFDaEMsRUFBRSxDQUFDLENBQUMsV0FBVyxDQUFDLFFBQVEsS0FBSyxZQUFZLENBQUMsQ0FBQyxDQUFDO1lBQzFDLElBQUksQ0FBQyxZQUFZO2lCQUNaLFFB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QixFQUN2QixFQUFFLEVBQ0YsU0FBUyxDQUNaLENBQUM7d0JBQ0YsS0FBSSxDQUFDLGNBQWMsR0FBRyxLQUFLLENBQUM7d0JBQzVCLEtBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxDQUFDO29CQUMvQyxDQUFDLENBQUM7eUJBQ0QsS0FBSyxDQUFDLFVBQUEsS0FBSyxJQUFJLE9BQUEsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsRUFBbEIsQ0FBa0IsQ0FBQyxDQUFDO2dCQUMxQyxDQUFDO1lBQ0gsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLFVBQUEsS0FBSztnQkFDWixPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3JCLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ04sSUFBSSxDQUNBLHVCQUF1QixFQUN2QiwwQ0FBMEMsRUFDMUMsU0FBUyxDQUNaLENBQUM7UUFDSixDQUFDO0lBRUgsQ0FBQztJQUVELHdDQUFNLEdBQU47UUFDSSxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDO0lBQzFCLENBQUM7SUExT1EsdUJBQXVCO1FBTm5DLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsZ0JBQWdCO1lBQzFCLFdBQVcsRUFBRSxpRUFBaUU7WUFDOUUsU0FBUyxFQUFFLENBQUMsZ0VBQWdFLENBQUM7U0FDaEYsQ0FBQzt5Q0FtQjhCLGVBQU0sRUFBeUIsOEJBQWEsRUFBMEIsZ0NBQWMsRUFBd0IsNEJBQVk7T0FqQjNJLHVCQUF1QixDQTJPbkM7SUFBRCw4QkFBQztDQTNPRCxBQTJPQyxJQUFBO0FBM09ZLDBEQUF1QiIsImZpbGUiOiJhcHAvY29tcG9uZW50cy9hdHRlbmRhbmNlLWxpc3QvYXR0ZW5kYW5jZS1saXN0LmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcbmltcG9ydCB7IENvdXJzZVNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvY291cnNlLnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgQ291cnNlIH0gZnJvbSBcIi4uLy4uL21vZGVscy9jb3Vyc2VcIjtcclxuaW1wb3J0IHsgU3R1ZGVudCB9IGZyb20gXCIuLi8uLi9tb2RlbHMvU3R1ZGVudFwiO1xyXG5pbXBvcnQgeyBTdHVkZW50U2VydmljZSB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9zdHVkZW50LnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgU3RhZmZTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL3N0YWZmLnNlcnZpY2VcIjtcclxuZGVjbGFyZSB2YXIgc3dhbDogYW55O1xyXG5kZWNsYXJlIHZhciBtb21lbnQ7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiAnYXR0ZW5kYW5jZUxpc3QnLFxyXG4gICAgdGVtcGxhdGVVcmw6ICcuL2FwcC9jb21wb25lbnRzL2F0dGVuZGFuY2UtbGlzdC9hdHRlbmRhbmNlLWxpc3QuY29tcG9uZW50Lmh0bWwnLFxyXG4gICAgc3R5bGVVcmxzOiBbJy4vYXBwL2NvbXBvbmVudHMvYXR0ZW5kYW5jZS1saXN0L2F0dGVuZGFuY2UtbGlzdC5jb21wb25lbnQuY3NzJ11cclxufSlcclxuXHJcbmV4cG9ydCBjbGFzcyBBdHRlbmRhbmNlTGlzdENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgICBkYXRhOiBhbnk7XHJcbiAgICBkYXRlOiBhbnk7XHJcbiAgICBjb3Vyc2VJRDogYW55O1xyXG4gICAgYXR0ZW5kYW5jZVZpZXc6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIGxvYWRpbmc6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIGF0dGVuZGFuY2VDb3Vyc2U6IGFueTtcclxuICAgIGF0dGVuZGFuY2VTdHVkZW50czogYW55O1xyXG4gICAgdGltZXRhYmxlczogYW55O1xyXG4gICAgYXR0ZW5kYW5jZTogYW55O1xyXG4gICAgYWJzZW50U3R1ZGVudHMgPSBbXTtcclxuICAgIGF0dGVuZGFuY2VEYXRlczogYW55W10gPSBbXTtcclxuICAgIHByZXZpb3VzQXR0ZW5kYW5jZTogYW55O1xyXG4gICAgaW5zdHJ1Y3RvcnM6IGFueTtcclxuICAgIGluc3RydWN0b3JPcHRpb25zOiBhbnkgPSB7fTtcclxuICAgIHNlbGVjdGVkSW5zdHJ1Y3RvcjogbnVtYmVyO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsIHByaXZhdGUgQ291cnNlU2VydmljZTogQ291cnNlU2VydmljZSwgcHJpdmF0ZSBTdHVkZW50U2VydmljZTogU3R1ZGVudFNlcnZpY2UsIHByaXZhdGUgU3RhZmZTZXJ2aWNlOiBTdGFmZlNlcnZpY2UpIHtcclxuICAgICAgdGhpcy5kYXRlID0gbmV3IERhdGUoKTtcclxuICAgIH1cclxuXHJcbiAgICBuZ09uSW5pdCgpIHtcclxuICAgICAgc3dhbCh7XHJcbiAgICAgICAgdGl0bGU6ICdMb2FkaW5nLi4uJyxcclxuICAgICAgICBhbGxvd091dHNpZGVDbGljazogZmFsc2VcclxuICAgICAgfSk7XHJcbiAgICAgIHN3YWwuc2hvd0xvYWRpbmcoKTtcclxuICAgICAgdmFyIGN1cnJlbnRVc2VyID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnY3VycmVudFVzZXInKSk7XHJcbiAgICAgIHZhciB1c2VySUQgPSBjdXJyZW50VXNlci51c2VySUQ7XHJcbiAgICAgIGlmIChjdXJyZW50VXNlci51c2VyVHlwZSAhPT0gJ0luc3RydWN0b3InKSB7XHJcbiAgICAgICAgdGhpcy5TdGFmZlNlcnZpY2VcclxuICAgICAgICAgICAgLmdldFVzZXJzKClcclxuICAgICAgICAgICAgLnRoZW4oaW5zdHJ1Y3RvcnMgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pbnN0cnVjdG9ycyA9IGluc3RydWN0b3JzLmZpbHRlcih4ID0+IHgudXNlclR5cGUgPT09ICdJbnN0cnVjdG9yJyk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5jYXRjaChlcnJvciA9PiB7XHJcbiAgICAgICAgICAgICAgLy8gZG8gc29tZXRoaW5nXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBzd2FsLmNsb3NlKCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5nZXRDb3Vyc2VzKHVzZXJJRCk7XHJcbiAgICAgICAgdGhpcy5TdHVkZW50U2VydmljZVxyXG4gICAgICAgICAgICAuZ2V0QWxsQXR0ZW5kYW5jZSgpXHJcbiAgICAgICAgICAgIC50aGVuKGF0dGVuZGFuY2UgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKGF0dGVuZGFuY2Uuc3RhdHVzID09PSBcIjQwM1wiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wcmV2aW91c0F0dGVuZGFuY2UgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnByZXZpb3VzQXR0ZW5kYW5jZSA9IGF0dGVuZGFuY2U7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaXRlbSBvZiB0aGlzLnByZXZpb3VzQXR0ZW5kYW5jZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgaXRlbS5kYXRlID0gaXRlbS5kYXRlWzBdICsgXCIgXCIgKyBpdGVtLmRhdGVbMV07XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuY2F0Y2goZXJyb3IgPT4gY29uc29sZS5sb2coZXJyb3IpKTtcclxuICAgICAgICAgICAgc3dhbC5jbG9zZSgpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaW5zdHJ1Y3RvclNlbGVjdCgpIHtcclxuICAgICAgdGhpcy5hdHRlbmRhbmNlRGF0ZXMgPSBbXTtcclxuICAgICAgdGhpcy5hdHRlbmRhbmNlVmlldyA9IG51bGw7XHJcbiAgICAgIHN3YWwoe1xyXG4gICAgICAgIHRpdGxlOiAnTG9hZGluZy4uLicsXHJcbiAgICAgICAgYWxsb3dPdXRzaWRlQ2xpY2s6IGZhbHNlXHJcbiAgICAgIH0pO1xyXG4gICAgICBzd2FsLnNob3dMb2FkaW5nKCk7XHJcbiAgICAgIHRoaXMuZ2V0Q291cnNlcyh0aGlzLnNlbGVjdGVkSW5zdHJ1Y3Rvcik7XHJcbiAgICAgIHRoaXMuU3R1ZGVudFNlcnZpY2VcclxuICAgICAgICAgIC5nZXRBbGxBdHRlbmRhbmNlKClcclxuICAgICAgICAgIC50aGVuKGF0dGVuZGFuY2UgPT4ge1xyXG4gICAgICAgICAgICAgIGlmIChhdHRlbmRhbmNlLnN0YXR1cyA9PT0gXCI0MDNcIikge1xyXG4gICAgICAgICAgICAgICAgICB0aGlzLnByZXZpb3VzQXR0ZW5kYW5jZSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgdGhpcy5wcmV2aW91c0F0dGVuZGFuY2UgPSBhdHRlbmRhbmNlO1xyXG4gICAgICAgICAgICAgICAgICBmb3IgKGxldCBpdGVtIG9mIHRoaXMucHJldmlvdXNBdHRlbmRhbmNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5kYXRlID0gaXRlbS5kYXRlWzBdICsgXCIgXCIgKyBpdGVtLmRhdGVbMV07XHJcbiAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgc3dhbC5jbG9zZSgpO1xyXG4gICAgICAgICAgfSlcclxuICAgICAgICAgIC5jYXRjaChlcnJvciA9PiBjb25zb2xlLmxvZyhlcnJvcikpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldENvdXJzZXMoaW5zdHJ1Y3RvcklEKSB7XHJcbiAgICAgICAgdGhpcy5Db3Vyc2VTZXJ2aWNlXHJcbiAgICAgICAgICAgIC5nZXRJbnN0cnVjdG9yQ291cnNlcyhpbnN0cnVjdG9ySUQpXHJcbiAgICAgICAgICAgIC50aGVuKHJlc3VsdCA9PiB7XHJcbiAgICAgICAgICAgICAgICB2YXIgaXNFbXB0eSA9IChyZXN1bHQgfHwgW10pLmxlbmd0aCA9PT0gMDtcclxuICAgICAgICAgICAgICAgIGlmIChpc0VtcHR5IHx8IHJlc3VsdC5zdGF0dXMgPT09IFwiNDAzXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXN1bHQpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGF0YSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGF0YSA9IHJlc3VsdDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLmNhdGNoKGVycm9yID0+IGNvbnNvbGUubG9nKGVycm9yKSk7XHJcbiAgICB9XHJcblxyXG4gICAgZG9BdHRlbmRhbmNlKGNvdXJzZTogQ291cnNlKSB7XHJcbiAgICAgIHRoaXMuYXR0ZW5kYW5jZURhdGVzID0gW107XHJcbiAgICAgIHN3YWwoe1xyXG4gICAgICAgIHRpdGxlOiAnTG9hZGluZy4uLicsXHJcbiAgICAgICAgYWxsb3dPdXRzaWRlQ2xpY2s6IGZhbHNlXHJcbiAgICAgIH0pO1xyXG4gICAgICBzd2FsLnNob3dMb2FkaW5nKCk7XHJcbiAgICAgIHRoaXMucHJldmlvdXNBdHRlbmRhbmNlID0gdGhpcy5wcmV2aW91c0F0dGVuZGFuY2UuZmlsdGVyKHggPT4geC5jb3Vyc2VJRCA9PT0gY291cnNlLmNvdXJzZUlEKTtcclxuICAgICAgdGhpcy5jb3Vyc2VJRCA9IGNvdXJzZS5jb3Vyc2VJRDtcclxuICAgICAgdGhpcy5TdHVkZW50U2VydmljZVxyXG4gICAgICAgICAgLmdldFRpbWV0YWJsZXNCeUNvdXJzZUlkKGNvdXJzZS5jb3Vyc2VJRClcclxuICAgICAgICAgIC50aGVuKHJlc3VsdCA9PiB7XHJcbiAgICAgICAgICAgICAgdmFyIGlzRW1wdHkgPSAocmVzdWx0IHx8IFtdKS5sZW5ndGggPT09IDA7XHJcbiAgICAgICAgICAgICAgaWYgKGlzRW1wdHkgfHwgcmVzdWx0LnN0YXR1cyA9PT0gXCI0MDNcIikge1xyXG4gICAgICAgICAgICAgICAgICB0aGlzLnRpbWV0YWJsZXMgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICB0aGlzLmF0dGVuZGFuY2VTdHVkZW50cyA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgIHN3YWwuY2xvc2UoKTtcclxuICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICB0aGlzLnRpbWV0YWJsZXMgPSByZXN1bHQ7XHJcbiAgICAgICAgICAgICAgICAgIHRoaXMuZ2V0U3R1ZGVudHNCeUlkKHRoaXMudGltZXRhYmxlcyk7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSlcclxuICAgICAgICAgIC5jYXRjaChlcnJvciA9PiBjb25zb2xlLmxvZyhlcnJvcikpO1xyXG5cclxuICAgICAgdGhpcy5hdHRlbmRhbmNlQ291cnNlID0gY291cnNlO1xyXG4gICAgICB2YXIgYXJyYXkgPSB0aGlzLmF0dGVuZGFuY2VDb3Vyc2UuY2xhc3NUaW1lU3RyLnNwbGl0KCcsJyk7XHJcbiAgICAgIGZvciAobGV0IGl0ZW0gb2YgYXJyYXkpIHtcclxuICAgICAgICB2YXIgYXR0ZW5kYW5jZUhpc3RvcnkgPSB0aGlzLnByZXZpb3VzQXR0ZW5kYW5jZTtcclxuICAgICAgICBhdHRlbmRhbmNlSGlzdG9yeSA9IGF0dGVuZGFuY2VIaXN0b3J5LmZpbHRlcih4ID0+IHguZGF0ZSA9PT0gaXRlbSk7XHJcbiAgICAgICAgaWYgKGF0dGVuZGFuY2VIaXN0b3J5Lmxlbmd0aCAhPT0gMCkge1xyXG4gICAgICAgICAgY29uc29sZS5sb2coXCJBdHRlbmRhbmNlIGFscmVhZHkgdGFrZW5cIik7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHZhciBkYXRlID0gaXRlbS5zcGxpdCgnICcpO1xyXG4gICAgICAgICAgdmFyIGZvcm1hdHRlZERhdGUgPSBtb21lbnQoZGF0ZVswXSkuZm9ybWF0KFwiZGRkLCBNTU0gRG8gWVlZWVwiKTtcclxuICAgICAgICAgIHZhciBsaXN0ID0ge1xyXG4gICAgICAgICAgICBsYWJlbDogZm9ybWF0dGVkRGF0ZSArICcgZnJvbSAnICsgZGF0ZVsxXSxcclxuICAgICAgICAgICAgdmFsdWU6IGRhdGVbMF0gKyAnICcgKyBkYXRlWzFdXHJcbiAgICAgICAgICB9O1xyXG4gICAgICAgICAgdGhpcy5hdHRlbmRhbmNlRGF0ZXMucHVzaChsaXN0KTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5hdHRlbmRhbmNlVmlldyA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0U3R1ZGVudHNCeUlkKHRpbWV0YWJsZXMpIHtcclxuICAgICAgY29uc29sZS5sb2codGltZXRhYmxlcyk7XHJcbiAgICAgIHRoaXMuU3R1ZGVudFNlcnZpY2VcclxuICAgICAgICAgIC5nZXRTdHVkZW50c0J5SWQodGltZXRhYmxlcylcclxuICAgICAgICAgIC50aGVuKHJlc3VsdCA9PiB7XHJcbiAgICAgICAgICAgICAgdmFyIGlzRW1wdHkgPSAocmVzdWx0IHx8IFtdKS5sZW5ndGggPT09IDA7XHJcbiAgICAgICAgICAgICAgaWYgKGlzRW1wdHkgfHwgcmVzdWx0LnN0YXR1cyA9PT0gXCJlcnJvclwiKSB7XHJcbiAgICAgICAgICAgICAgICAgIHRoaXMuYXR0ZW5kYW5jZVN0dWRlbnRzID0gbnVsbDtcclxuICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICB0aGlzLmF0dGVuZGFuY2VTdHVkZW50cyA9IHJlc3VsdDtcclxuICAgICAgICAgICAgICAgICAgZm9yIChsZXQgc3R1ZGVudCBvZiB0aGlzLmF0dGVuZGFuY2VTdHVkZW50cykge1xyXG4gICAgICAgICAgICAgICAgICAgIHN0dWRlbnQuZnVsbE5hbWUgPSBzdHVkZW50LmZpcnN0TmFtZSArIFwiIFwiICsgc3R1ZGVudC5sYXN0TmFtZTtcclxuICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICBzd2FsLmNsb3NlKCk7XHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgICAgLmNhdGNoKGVycm9yID0+IGNvbnNvbGUubG9nKGVycm9yKSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gbWFya0Fic2VudChzdHVkZW50OiBTdHVkZW50KSB7XHJcbiAgICAvLyAgIGlmIChzdHVkZW50LmFic2VudCkge1xyXG4gICAgLy8gICAgIHN0dWRlbnQuYWJzZW50ID0gZmFsc2U7XHJcbiAgICAvLyAgICAgdmFyIGluZGV4ID0gdGhpcy5hYnNlbnRTdHVkZW50cy5pbmRleE9mKHN0dWRlbnQuc3R1ZGVudElEKTtcclxuICAgIC8vICAgICB0aGlzLmFic2VudFN0dWRlbnRzLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICAvLyAgIH0gZWxzZSB7XHJcbiAgICAvLyAgICAgc3R1ZGVudC5hYnNlbnQgPSB0cnVlO1xyXG4gICAgLy8gICAgIHRoaXMuYWJzZW50U3R1ZGVudHMucHVzaChzdHVkZW50LnN0dWRlbnRJRCk7XHJcbiAgICAvLyAgIH1cclxuICAgIC8vICAgY29uc29sZS5sb2codGhpcy5hYnNlbnRTdHVkZW50cyk7XHJcbiAgICAvLyB9XHJcblxyXG4gICAgc3VibWl0QXR0ZW5kYW5jZSgpIHtcclxuICAgICAgdmFyIGNvdW50ID0gMDtcclxuICAgICAgZm9yIChsZXQgc3R1ZGVudCBvZiB0aGlzLmF0dGVuZGFuY2VTdHVkZW50cykge1xyXG4gICAgICAgIGlmIChzdHVkZW50LmF0dGVuZGFuY2VWYWx1ZSkge1xyXG4gICAgICAgICAgY291bnQrKztcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmICghdGhpcy5hdHRlbmRhbmNlQ291cnNlLmF0dGVuZGFuY2VEYXRlKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5hdHRlbmRhbmNlQ291cnNlKTtcclxuICAgICAgICBzd2FsKFxyXG4gICAgICAgICAgICAnQXR0ZW5kYW5jZSBJbmNvbXBsZXRlJyxcclxuICAgICAgICAgICAgJ1BsZWFzZSBlbnRlciBhbiBhdHRlbmRhbmNlIGRhdGUnLFxyXG4gICAgICAgICAgICAnd2FybmluZydcclxuICAgICAgICApO1xyXG4gICAgICB9IGVsc2UgaWYgKGNvdW50ID09PSB0aGlzLmF0dGVuZGFuY2VTdHVkZW50cy5sZW5ndGggJiYgdGhpcy5hdHRlbmRhbmNlQ291cnNlLmF0dGVuZGFuY2VEYXRlKSB7XHJcbiAgICAgICAgc3dhbCh7XHJcbiAgICAgICAgICAgIHRpdGxlOiAnU3VibWl0IEF0dGVuZGFuY2U/JyxcclxuICAgICAgICAgICAgdGV4dDogXCJZb3Ugd29uJ3QgYmUgYWJsZSB0byByZXZlcnQgdGhpcyFcIixcclxuICAgICAgICAgICAgdHlwZTogJ2luZm8nLFxyXG4gICAgICAgICAgICBzaG93Q2FuY2VsQnV0dG9uOiB0cnVlLFxyXG4gICAgICAgICAgICBjb25maXJtQnV0dG9uQ29sb3I6ICcjMzA4NWQ2JyxcclxuICAgICAgICAgICAgY2FuY2VsQnV0dG9uQ29sb3I6ICcjZDMzJyxcclxuICAgICAgICAgICAgY29uZmlybUJ1dHRvblRleHQ6ICdZZXMsIHN1Ym1pdCEnXHJcbiAgICAgICAgfSkudGhlbihpc0NvbmZpcm0gPT4ge1xyXG4gICAgICAgICAgaWYgKGlzQ29uZmlybS5kaXNtaXNzID09PSBcImNhbmNlbFwiIHx8IGlzQ29uZmlybS5kaXNtaXNzID09PSBcIm92ZXJsYXlcIikge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhpc0NvbmZpcm0uZGlzbWlzcyk7XHJcbiAgICAgICAgICB9IGVsc2UgaWYgKGlzQ29uZmlybSkge1xyXG4gICAgICAgICAgICB0aGlzLmF0dGVuZGFuY2UgPSB7XHJcbiAgICAgICAgICAgICAgc3R1ZGVudHM6IHRoaXMuYXR0ZW5kYW5jZVN0dWRlbnRzLFxyXG4gICAgICAgICAgICAgIGNvdXJzZUlEOiB0aGlzLmNvdXJzZUlELFxyXG4gICAgICAgICAgICAgIGRhdGU6IHRoaXMuYXR0ZW5kYW5jZUNvdXJzZS5hdHRlbmRhbmNlRGF0ZVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB0aGlzLlN0dWRlbnRTZXJ2aWNlXHJcbiAgICAgICAgICAgICAgICAuaW5zZXJ0QXR0ZW5kYW5jZSh0aGlzLmF0dGVuZGFuY2UpXHJcbiAgICAgICAgICAgICAgICAudGhlbihyZXN1bHQgPT4ge1xyXG4gICAgICAgICAgICAgICAgICBzd2FsKFxyXG4gICAgICAgICAgICAgICAgICAgICAgJ0F0dGVuZGFuY2Ugc3VibWl0dGVkIScsXHJcbiAgICAgICAgICAgICAgICAgICAgICAnJyxcclxuICAgICAgICAgICAgICAgICAgICAgICdzdWNjZXNzJ1xyXG4gICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgICB0aGlzLmF0dGVuZGFuY2VWaWV3ID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFsnL2F0dGVuZGFuY2UtcmVwb3J0J10pO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5jYXRjaChlcnJvciA9PiBjb25zb2xlLmxvZyhlcnJvcikpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pLmNhdGNoKGVycm9yID0+IHtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcclxuICAgICAgICB9KTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBzd2FsKFxyXG4gICAgICAgICAgICAnQXR0ZW5kYW5jZSBJbmNvbXBsZXRlJyxcclxuICAgICAgICAgICAgJ1BsZWFzZSBlbnRlciBhdHRlbmRhbmNlIGZvciBhbGwgc3R1ZGVudHMnLFxyXG4gICAgICAgICAgICAnd2FybmluZydcclxuICAgICAgICApO1xyXG4gICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGdvQmFjaygpIHtcclxuICAgICAgICB3aW5kb3cuaGlzdG9yeS5iYWNrKCk7XHJcbiAgICB9XHJcbn1cclxuIl19
