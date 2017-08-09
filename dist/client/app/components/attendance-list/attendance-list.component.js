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
var AttendanceListComponent = (function () {
    function AttendanceListComponent(router, CourseService, StudentService) {
        this.router = router;
        this.CourseService = CourseService;
        this.StudentService = StudentService;
        this.attendanceView = false;
        this.loading = false;
        this.absentStudents = [];
        this.attendanceDates = [];
        this.date = new Date();
    }
    AttendanceListComponent.prototype.ngOnInit = function () {
        var _this = this;
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        var userID = currentUser.userID;
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
    };
    AttendanceListComponent.prototype.getCourses = function (instructorID) {
        var _this = this;
        this.CourseService
            .getInstructorCourses(instructorID)
            .then(function (result) {
            var isEmpty = (result || []).length === 0;
            if (isEmpty) {
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
        this.loading = true;
        this.previousAttendance = this.previousAttendance.filter(function (x) { return x.courseID === course.courseID; });
        this.courseID = course.courseID;
        this.StudentService
            .getTimetablesByCourseId(course.courseID)
            .then(function (result) {
            var isEmpty = (result || []).length === 0;
            if (isEmpty) {
                _this.timetables = null;
                _this.attendanceStudents = null;
                _this.loading = false;
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
            console.log(attendanceHistory);
            if (attendanceHistory.length !== 0) {
                console.log("Attendance already taken");
            }
            else {
                date = item.split(' ');
                this_1.attendanceDates.push(date);
            }
        };
        var this_1 = this, attendanceHistory, date;
        for (var _i = 0, array_1 = array; _i < array_1.length; _i++) {
            var item = array_1[_i];
            _loop_1(item);
        }
        this.attendanceView = true;
        console.log(this.attendanceDates);
    };
    AttendanceListComponent.prototype.getStudentsById = function (timetables) {
        var _this = this;
        this.StudentService
            .getStudentsById(timetables)
            .then(function (result) {
            var isEmpty = (result || []).length === 0;
            if (isEmpty) {
                _this.attendanceStudents = null;
            }
            else {
                _this.attendanceStudents = result;
                for (var _i = 0, _a = _this.attendanceStudents; _i < _a.length; _i++) {
                    var student = _a[_i];
                    student.fullName = student.firstName + " " + student.lastName;
                }
                _this.loading = false;
            }
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
                if (isConfirm) {
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
                //console.log("Canceled");
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
        __metadata("design:paramtypes", [router_1.Router, course_service_1.CourseService, student_service_1.StudentService])
    ], AttendanceListComponent);
    return AttendanceListComponent;
}());
exports.AttendanceListComponent = AttendanceListComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NsaWVudC9hcHAvY29tcG9uZW50cy9hdHRlbmRhbmNlLWxpc3QvYXR0ZW5kYW5jZS1saXN0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLHNDQUFrRDtBQUNsRCwwQ0FBeUM7QUFDekMsZ0VBQThEO0FBRzlELGtFQUFnRTtBQVNoRTtJQWNJLGlDQUFvQixNQUFjLEVBQVUsYUFBNEIsRUFBVSxjQUE4QjtRQUE1RixXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQVUsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFBVSxtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFWaEgsbUJBQWMsR0FBWSxLQUFLLENBQUM7UUFDaEMsWUFBTyxHQUFZLEtBQUssQ0FBQztRQUt6QixtQkFBYyxHQUFHLEVBQUUsQ0FBQztRQUNwQixvQkFBZSxHQUFVLEVBQUUsQ0FBQztRQUkxQixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksSUFBSSxFQUFFLENBQUM7SUFDekIsQ0FBQztJQUVELDBDQUFRLEdBQVI7UUFBQSxpQkFpQkM7UUFoQkMsSUFBSSxXQUFXLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7UUFDbEUsSUFBSSxNQUFNLEdBQUcsV0FBVyxDQUFDLE1BQU0sQ0FBQztRQUNoQyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3hCLElBQUksQ0FBQyxjQUFjO2FBQ2QsZ0JBQWdCLEVBQUU7YUFDbEIsSUFBSSxDQUFDLFVBQUEsVUFBVTtZQUNaLEVBQUUsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxNQUFNLEtBQUssS0FBSyxDQUFDLENBQUMsQ0FBQztnQkFDOUIsS0FBSSxDQUFDLGtCQUFrQixHQUFHLElBQUksQ0FBQztZQUNuQyxDQUFDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ0osS0FBSSxDQUFDLGtCQUFrQixHQUFHLFVBQVUsQ0FBQztn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a0IsQ0FBQyxDQUFDO2dCQUMxQyxDQUFDO1lBQ0gsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLFVBQUEsS0FBSztnQkFDWiwwQkFBMEI7WUFDNUIsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDTixJQUFJLENBQ0EsdUJBQXVCLEVBQ3ZCLDBDQUEwQyxFQUMxQyxTQUFTLENBQ1osQ0FBQztRQUNKLENBQUM7SUFFSCxDQUFDO0lBRUQsd0NBQU0sR0FBTjtRQUNJLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDMUIsQ0FBQztJQWpMUSx1QkFBdUI7UUFObkMsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxnQkFBZ0I7WUFDMUIsV0FBVyxFQUFFLGlFQUFpRTtZQUM5RSxTQUFTLEVBQUUsQ0FBQyxnRUFBZ0UsQ0FBQztTQUNoRixDQUFDO3lDQWdCOEIsZUFBTSxFQUF5Qiw4QkFBYSxFQUEwQixnQ0FBYztPQWR2Ryx1QkFBdUIsQ0FrTG5DO0lBQUQsOEJBQUM7Q0FsTEQsQUFrTEMsSUFBQTtBQWxMWSwwREFBdUIiLCJmaWxlIjoiYXBwL2NvbXBvbmVudHMvYXR0ZW5kYW5jZS1saXN0L2F0dGVuZGFuY2UtbGlzdC5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBSb3V0ZXIgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xyXG5pbXBvcnQgeyBDb3Vyc2VTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL2NvdXJzZS5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IENvdXJzZSB9IGZyb20gXCIuLi8uLi9tb2RlbHMvY291cnNlXCI7XHJcbmltcG9ydCB7IFN0dWRlbnQgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL1N0dWRlbnRcIjtcclxuaW1wb3J0IHsgU3R1ZGVudFNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvc3R1ZGVudC5zZXJ2aWNlXCI7XHJcbmRlY2xhcmUgdmFyIHN3YWw6IGFueTtcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6ICdhdHRlbmRhbmNlTGlzdCcsXHJcbiAgICB0ZW1wbGF0ZVVybDogJy4vYXBwL2NvbXBvbmVudHMvYXR0ZW5kYW5jZS1saXN0L2F0dGVuZGFuY2UtbGlzdC5jb21wb25lbnQuaHRtbCcsXHJcbiAgICBzdHlsZVVybHM6IFsnLi9hcHAvY29tcG9uZW50cy9hdHRlbmRhbmNlLWxpc3QvYXR0ZW5kYW5jZS1saXN0LmNvbXBvbmVudC5jc3MnXVxyXG59KVxyXG5cclxuZXhwb3J0IGNsYXNzIEF0dGVuZGFuY2VMaXN0Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuICAgIGRhdGE6IGFueTtcclxuICAgIGRhdGU6IGFueTtcclxuICAgIGNvdXJzZUlEOiBhbnk7XHJcbiAgICBhdHRlbmRhbmNlVmlldzogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgbG9hZGluZzogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgYXR0ZW5kYW5jZUNvdXJzZTogYW55O1xyXG4gICAgYXR0ZW5kYW5jZVN0dWRlbnRzOiBhbnk7XHJcbiAgICB0aW1ldGFibGVzOiBhbnk7XHJcbiAgICBhdHRlbmRhbmNlOiBhbnk7XHJcbiAgICBhYnNlbnRTdHVkZW50cyA9IFtdO1xyXG4gICAgYXR0ZW5kYW5jZURhdGVzOiBhbnlbXSA9IFtdO1xyXG4gICAgcHJldmlvdXNBdHRlbmRhbmNlOiBhbnk7XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSByb3V0ZXI6IFJvdXRlciwgcHJpdmF0ZSBDb3Vyc2VTZXJ2aWNlOiBDb3Vyc2VTZXJ2aWNlLCBwcml2YXRlIFN0dWRlbnRTZXJ2aWNlOiBTdHVkZW50U2VydmljZSkge1xyXG4gICAgICB0aGlzLmRhdGUgPSBuZXcgRGF0ZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIG5nT25Jbml0KCkge1xyXG4gICAgICB2YXIgY3VycmVudFVzZXIgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdjdXJyZW50VXNlcicpKTtcclxuICAgICAgdmFyIHVzZXJJRCA9IGN1cnJlbnRVc2VyLnVzZXJJRDtcclxuICAgICAgdGhpcy5nZXRDb3Vyc2VzKHVzZXJJRCk7XHJcbiAgICAgIHRoaXMuU3R1ZGVudFNlcnZpY2VcclxuICAgICAgICAgIC5nZXRBbGxBdHRlbmRhbmNlKClcclxuICAgICAgICAgIC50aGVuKGF0dGVuZGFuY2UgPT4ge1xyXG4gICAgICAgICAgICAgIGlmIChhdHRlbmRhbmNlLnN0YXR1cyA9PT0gXCI0MDNcIikge1xyXG4gICAgICAgICAgICAgICAgICB0aGlzLnByZXZpb3VzQXR0ZW5kYW5jZSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgdGhpcy5wcmV2aW91c0F0dGVuZGFuY2UgPSBhdHRlbmRhbmNlO1xyXG4gICAgICAgICAgICAgICAgICBmb3IgKGxldCBpdGVtIG9mIHRoaXMucHJldmlvdXNBdHRlbmRhbmNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5kYXRlID0gaXRlbS5kYXRlWzBdICsgXCIgXCIgKyBpdGVtLmRhdGVbMV07XHJcbiAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgICAgLmNhdGNoKGVycm9yID0+IGNvbnNvbGUubG9nKGVycm9yKSk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0Q291cnNlcyhpbnN0cnVjdG9ySUQpIHtcclxuICAgICAgICB0aGlzLkNvdXJzZVNlcnZpY2VcclxuICAgICAgICAgICAgLmdldEluc3RydWN0b3JDb3Vyc2VzKGluc3RydWN0b3JJRClcclxuICAgICAgICAgICAgLnRoZW4ocmVzdWx0ID0+IHtcclxuICAgICAgICAgICAgICAgIHZhciBpc0VtcHR5ID0gKHJlc3VsdCB8fCBbXSkubGVuZ3RoID09PSAwO1xyXG4gICAgICAgICAgICAgICAgaWYgKGlzRW1wdHkpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXN1bHQpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGF0YSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGF0YSA9IHJlc3VsdDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLmNhdGNoKGVycm9yID0+IGNvbnNvbGUubG9nKGVycm9yKSk7XHJcbiAgICB9XHJcblxyXG4gICAgZG9BdHRlbmRhbmNlKGNvdXJzZTogQ291cnNlKSB7XHJcbiAgICAgIHRoaXMubG9hZGluZyA9IHRydWU7XHJcbiAgICAgIHRoaXMucHJldmlvdXNBdHRlbmRhbmNlID0gdGhpcy5wcmV2aW91c0F0dGVuZGFuY2UuZmlsdGVyKHggPT4geC5jb3Vyc2VJRCA9PT0gY291cnNlLmNvdXJzZUlEKTtcclxuICAgICAgdGhpcy5jb3Vyc2VJRCA9IGNvdXJzZS5jb3Vyc2VJRDtcclxuICAgICAgdGhpcy5TdHVkZW50U2VydmljZVxyXG4gICAgICAgICAgLmdldFRpbWV0YWJsZXNCeUNvdXJzZUlkKGNvdXJzZS5jb3Vyc2VJRClcclxuICAgICAgICAgIC50aGVuKHJlc3VsdCA9PiB7XHJcbiAgICAgICAgICAgICAgdmFyIGlzRW1wdHkgPSAocmVzdWx0IHx8IFtdKS5sZW5ndGggPT09IDA7XHJcbiAgICAgICAgICAgICAgaWYgKGlzRW1wdHkpIHtcclxuICAgICAgICAgICAgICAgICAgdGhpcy50aW1ldGFibGVzID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgdGhpcy5hdHRlbmRhbmNlU3R1ZGVudHMgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICB0aGlzLnRpbWV0YWJsZXMgPSByZXN1bHQ7XHJcbiAgICAgICAgICAgICAgICAgIHRoaXMuZ2V0U3R1ZGVudHNCeUlkKHRoaXMudGltZXRhYmxlcyk7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSlcclxuICAgICAgICAgIC5jYXRjaChlcnJvciA9PiBjb25zb2xlLmxvZyhlcnJvcikpO1xyXG5cclxuICAgICAgdGhpcy5hdHRlbmRhbmNlQ291cnNlID0gY291cnNlO1xyXG4gICAgICB2YXIgYXJyYXkgPSB0aGlzLmF0dGVuZGFuY2VDb3Vyc2UuY2xhc3NUaW1lU3RyLnNwbGl0KCcsJyk7XHJcbiAgICAgIGZvciAobGV0IGl0ZW0gb2YgYXJyYXkpIHtcclxuICAgICAgICB2YXIgYXR0ZW5kYW5jZUhpc3RvcnkgPSB0aGlzLnByZXZpb3VzQXR0ZW5kYW5jZTtcclxuICAgICAgICBhdHRlbmRhbmNlSGlzdG9yeSA9IGF0dGVuZGFuY2VIaXN0b3J5LmZpbHRlcih4ID0+IHguZGF0ZSA9PT0gaXRlbSk7XHJcbiAgICAgICAgY29uc29sZS5sb2coYXR0ZW5kYW5jZUhpc3RvcnkpO1xyXG4gICAgICAgIGlmIChhdHRlbmRhbmNlSGlzdG9yeS5sZW5ndGggIT09IDApIHtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKFwiQXR0ZW5kYW5jZSBhbHJlYWR5IHRha2VuXCIpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB2YXIgZGF0ZSA9IGl0ZW0uc3BsaXQoJyAnKTtcclxuICAgICAgICAgIHRoaXMuYXR0ZW5kYW5jZURhdGVzLnB1c2goZGF0ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIHRoaXMuYXR0ZW5kYW5jZVZpZXcgPSB0cnVlO1xyXG4gICAgICBjb25zb2xlLmxvZyh0aGlzLmF0dGVuZGFuY2VEYXRlcyk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0U3R1ZGVudHNCeUlkKHRpbWV0YWJsZXMpIHtcclxuICAgICAgdGhpcy5TdHVkZW50U2VydmljZVxyXG4gICAgICAgICAgLmdldFN0dWRlbnRzQnlJZCh0aW1ldGFibGVzKVxyXG4gICAgICAgICAgLnRoZW4ocmVzdWx0ID0+IHtcclxuICAgICAgICAgICAgICB2YXIgaXNFbXB0eSA9IChyZXN1bHQgfHwgW10pLmxlbmd0aCA9PT0gMDtcclxuICAgICAgICAgICAgICBpZiAoaXNFbXB0eSkge1xyXG4gICAgICAgICAgICAgICAgICB0aGlzLmF0dGVuZGFuY2VTdHVkZW50cyA9IG51bGw7XHJcbiAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgdGhpcy5hdHRlbmRhbmNlU3R1ZGVudHMgPSByZXN1bHQ7XHJcbiAgICAgICAgICAgICAgICAgIGZvciAobGV0IHN0dWRlbnQgb2YgdGhpcy5hdHRlbmRhbmNlU3R1ZGVudHMpIHtcclxuICAgICAgICAgICAgICAgICAgICBzdHVkZW50LmZ1bGxOYW1lID0gc3R1ZGVudC5maXJzdE5hbWUgKyBcIiBcIiArIHN0dWRlbnQubGFzdE5hbWU7XHJcbiAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgdGhpcy5sb2FkaW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSlcclxuICAgICAgICAgIC5jYXRjaChlcnJvciA9PiBjb25zb2xlLmxvZyhlcnJvcikpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIG1hcmtBYnNlbnQoc3R1ZGVudDogU3R1ZGVudCkge1xyXG4gICAgLy8gICBpZiAoc3R1ZGVudC5hYnNlbnQpIHtcclxuICAgIC8vICAgICBzdHVkZW50LmFic2VudCA9IGZhbHNlO1xyXG4gICAgLy8gICAgIHZhciBpbmRleCA9IHRoaXMuYWJzZW50U3R1ZGVudHMuaW5kZXhPZihzdHVkZW50LnN0dWRlbnRJRCk7XHJcbiAgICAvLyAgICAgdGhpcy5hYnNlbnRTdHVkZW50cy5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgLy8gICB9IGVsc2Uge1xyXG4gICAgLy8gICAgIHN0dWRlbnQuYWJzZW50ID0gdHJ1ZTtcclxuICAgIC8vICAgICB0aGlzLmFic2VudFN0dWRlbnRzLnB1c2goc3R1ZGVudC5zdHVkZW50SUQpO1xyXG4gICAgLy8gICB9XHJcbiAgICAvLyAgIGNvbnNvbGUubG9nKHRoaXMuYWJzZW50U3R1ZGVudHMpO1xyXG4gICAgLy8gfVxyXG5cclxuICAgIHN1Ym1pdEF0dGVuZGFuY2UoKSB7XHJcbiAgICAgIHZhciBjb3VudCA9IDA7XHJcbiAgICAgIGZvciAobGV0IHN0dWRlbnQgb2YgdGhpcy5hdHRlbmRhbmNlU3R1ZGVudHMpIHtcclxuICAgICAgICBpZiAoc3R1ZGVudC5hdHRlbmRhbmNlVmFsdWUpIHtcclxuICAgICAgICAgIGNvdW50Kys7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoIXRoaXMuYXR0ZW5kYW5jZUNvdXJzZS5hdHRlbmRhbmNlRGF0ZSkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuYXR0ZW5kYW5jZUNvdXJzZSk7XHJcbiAgICAgICAgc3dhbChcclxuICAgICAgICAgICAgJ0F0dGVuZGFuY2UgSW5jb21wbGV0ZScsXHJcbiAgICAgICAgICAgICdQbGVhc2UgZW50ZXIgYW4gYXR0ZW5kYW5jZSBkYXRlJyxcclxuICAgICAgICAgICAgJ3dhcm5pbmcnXHJcbiAgICAgICAgKTtcclxuICAgICAgfSBlbHNlIGlmIChjb3VudCA9PT0gdGhpcy5hdHRlbmRhbmNlU3R1ZGVudHMubGVuZ3RoICYmIHRoaXMuYXR0ZW5kYW5jZUNvdXJzZS5hdHRlbmRhbmNlRGF0ZSkge1xyXG4gICAgICAgIHN3YWwoe1xyXG4gICAgICAgICAgICB0aXRsZTogJ1N1Ym1pdCBBdHRlbmRhbmNlPycsXHJcbiAgICAgICAgICAgIHRleHQ6IFwiWW91IHdvbid0IGJlIGFibGUgdG8gcmV2ZXJ0IHRoaXMhXCIsXHJcbiAgICAgICAgICAgIHR5cGU6ICdpbmZvJyxcclxuICAgICAgICAgICAgc2hvd0NhbmNlbEJ1dHRvbjogdHJ1ZSxcclxuICAgICAgICAgICAgY29uZmlybUJ1dHRvbkNvbG9yOiAnIzMwODVkNicsXHJcbiAgICAgICAgICAgIGNhbmNlbEJ1dHRvbkNvbG9yOiAnI2QzMycsXHJcbiAgICAgICAgICAgIGNvbmZpcm1CdXR0b25UZXh0OiAnWWVzLCBzdWJtaXQhJ1xyXG4gICAgICAgIH0pLnRoZW4oaXNDb25maXJtID0+IHtcclxuICAgICAgICAgIGlmIChpc0NvbmZpcm0pIHtcclxuICAgICAgICAgICAgdGhpcy5hdHRlbmRhbmNlID0ge1xyXG4gICAgICAgICAgICAgIHN0dWRlbnRzOiB0aGlzLmF0dGVuZGFuY2VTdHVkZW50cyxcclxuICAgICAgICAgICAgICBjb3Vyc2VJRDogdGhpcy5jb3Vyc2VJRCxcclxuICAgICAgICAgICAgICBkYXRlOiB0aGlzLmF0dGVuZGFuY2VDb3Vyc2UuYXR0ZW5kYW5jZURhdGVcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgdGhpcy5TdHVkZW50U2VydmljZVxyXG4gICAgICAgICAgICAgICAgLmluc2VydEF0dGVuZGFuY2UodGhpcy5hdHRlbmRhbmNlKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4ocmVzdWx0ID0+IHtcclxuICAgICAgICAgICAgICAgICAgc3dhbChcclxuICAgICAgICAgICAgICAgICAgICAgICdBdHRlbmRhbmNlIHN1Ym1pdHRlZCEnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgJycsXHJcbiAgICAgICAgICAgICAgICAgICAgICAnc3VjY2VzcydcclxuICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgICAgdGhpcy5hdHRlbmRhbmNlVmlldyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJy9hdHRlbmRhbmNlLXJlcG9ydCddKTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuY2F0Y2goZXJyb3IgPT4gY29uc29sZS5sb2coZXJyb3IpKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KS5jYXRjaChlcnJvciA9PiB7XHJcbiAgICAgICAgICAvL2NvbnNvbGUubG9nKFwiQ2FuY2VsZWRcIik7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgc3dhbChcclxuICAgICAgICAgICAgJ0F0dGVuZGFuY2UgSW5jb21wbGV0ZScsXHJcbiAgICAgICAgICAgICdQbGVhc2UgZW50ZXIgYXR0ZW5kYW5jZSBmb3IgYWxsIHN0dWRlbnRzJyxcclxuICAgICAgICAgICAgJ3dhcm5pbmcnXHJcbiAgICAgICAgKTtcclxuICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICBnb0JhY2soKSB7XHJcbiAgICAgICAgd2luZG93Lmhpc3RvcnkuYmFjaygpO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==
