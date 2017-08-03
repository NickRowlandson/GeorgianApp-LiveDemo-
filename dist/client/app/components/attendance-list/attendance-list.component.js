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
        this.date = new Date();
    }
    AttendanceListComponent.prototype.ngOnInit = function () {
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        var userID = currentUser.userID;
        this.getCourses(userID);
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
        this.attendanceCourse = course.courseName;
        this.attendanceView = true;
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
        if (count === this.attendanceStudents.length) {
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
                        date: _this.date
                    };
                    _this.StudentService
                        .insertAttendance(_this.attendance)
                        .then(function (result) {
                        swal('Attendance submitted!', '', 'success');
                        _this.attendanceView = false;
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NsaWVudC9hcHAvY29tcG9uZW50cy9hdHRlbmRhbmNlLWxpc3QvYXR0ZW5kYW5jZS1saXN0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLHNDQUFrRDtBQUNsRCwwQ0FBeUM7QUFDekMsZ0VBQThEO0FBRzlELGtFQUFnRTtBQVNoRTtJQVlJLGlDQUFvQixNQUFjLEVBQVUsYUFBNEIsRUFBVSxjQUE4QjtRQUE1RixXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQVUsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFBVSxtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFSaEgsbUJBQWMsR0FBWSxLQUFLLENBQUM7UUFDaEMsWUFBTyxHQUFZLEtBQUssQ0FBQztRQUt6QixtQkFBYyxHQUFHLEVBQUUsQ0FBQztRQUdsQixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksSUFBSSxFQUFFLENBQUM7SUFDekIsQ0FBQztJQUVELDBDQUFRLEdBQVI7UUFDRSxJQUFJLFdBQVcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztRQUNsRSxJQUFJLE1BQU0sR0FBRyxXQUFXLENBQUMsTUFBTSxDQUFDO1FBQ2hDLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDMUIsQ0FBQztJQUVELDRDQUFVLEdBQVYsVUFBVyxZQUFZO1FBQXZCLGlCQWFDO1FBWkcsSUFBSSxDQUFDLGFBQWE7YUFDYixvQkFBb0IsQ0FBQyxZQUFZLENBQUM7YUFDbEMsSUFBSSxDQUFDLFVBQUEsTUFBTTtZQUNSLElBQUksT0FBTyxHQUFHLENBQUMsTUFBTSxJQUFJLEVBQUUsQ0FBQyxDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUM7WUFDMUMsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztnQkFDVixPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFD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QyxJQUFJLENBQUMsQ0FBQztZQUNOLElBQUksQ0FDQSx1QkFBdUIsRUFDdkIsMENBQTBDLEVBQzFDLFNBQVMsQ0FDWixDQUFDO1FBQ0osQ0FBQztJQUVILENBQUM7SUFFRCx3Q0FBTSxHQUFOO1FBQ0ksTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUMxQixDQUFDO0lBeklRLHVCQUF1QjtRQU5uQyxnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLGdCQUFnQjtZQUMxQixXQUFXLEVBQUUsaUVBQWlFO1lBQzlFLFNBQVMsRUFBRSxDQUFDLGdFQUFnRSxDQUFDO1NBQ2hGLENBQUM7eUNBYzhCLGVBQU0sRUFBeUIsOEJBQWEsRUFBMEIsZ0NBQWM7T0FadkcsdUJBQXVCLENBMEluQztJQUFELDhCQUFDO0NBMUlELEFBMElDLElBQUE7QUExSVksMERBQXVCIiwiZmlsZSI6ImFwcC9jb21wb25lbnRzL2F0dGVuZGFuY2UtbGlzdC9hdHRlbmRhbmNlLWxpc3QuY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuaW1wb3J0IHsgQ291cnNlU2VydmljZSB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9jb3Vyc2Uuc2VydmljZVwiO1xyXG5pbXBvcnQgeyBDb3Vyc2UgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL2NvdXJzZVwiO1xyXG5pbXBvcnQgeyBTdHVkZW50IH0gZnJvbSBcIi4uLy4uL21vZGVscy9TdHVkZW50XCI7XHJcbmltcG9ydCB7IFN0dWRlbnRTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL3N0dWRlbnQuc2VydmljZVwiO1xyXG5kZWNsYXJlIHZhciBzd2FsOiBhbnk7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiAnYXR0ZW5kYW5jZUxpc3QnLFxyXG4gICAgdGVtcGxhdGVVcmw6ICcuL2FwcC9jb21wb25lbnRzL2F0dGVuZGFuY2UtbGlzdC9hdHRlbmRhbmNlLWxpc3QuY29tcG9uZW50Lmh0bWwnLFxyXG4gICAgc3R5bGVVcmxzOiBbJy4vYXBwL2NvbXBvbmVudHMvYXR0ZW5kYW5jZS1saXN0L2F0dGVuZGFuY2UtbGlzdC5jb21wb25lbnQuY3NzJ11cclxufSlcclxuXHJcbmV4cG9ydCBjbGFzcyBBdHRlbmRhbmNlTGlzdENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgICBkYXRhOiBhbnk7XHJcbiAgICBkYXRlOiBhbnk7XHJcbiAgICBjb3Vyc2VJRDogYW55O1xyXG4gICAgYXR0ZW5kYW5jZVZpZXc6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIGxvYWRpbmc6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIGF0dGVuZGFuY2VDb3Vyc2U6IGFueTtcclxuICAgIGF0dGVuZGFuY2VTdHVkZW50czogYW55O1xyXG4gICAgdGltZXRhYmxlczogYW55O1xyXG4gICAgYXR0ZW5kYW5jZTogYW55O1xyXG4gICAgYWJzZW50U3R1ZGVudHMgPSBbXTtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJvdXRlcjogUm91dGVyLCBwcml2YXRlIENvdXJzZVNlcnZpY2U6IENvdXJzZVNlcnZpY2UsIHByaXZhdGUgU3R1ZGVudFNlcnZpY2U6IFN0dWRlbnRTZXJ2aWNlKSB7XHJcbiAgICAgIHRoaXMuZGF0ZSA9IG5ldyBEYXRlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgbmdPbkluaXQoKSB7XHJcbiAgICAgIHZhciBjdXJyZW50VXNlciA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2N1cnJlbnRVc2VyJykpO1xyXG4gICAgICB2YXIgdXNlcklEID0gY3VycmVudFVzZXIudXNlcklEO1xyXG4gICAgICB0aGlzLmdldENvdXJzZXModXNlcklEKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRDb3Vyc2VzKGluc3RydWN0b3JJRCkge1xyXG4gICAgICAgIHRoaXMuQ291cnNlU2VydmljZVxyXG4gICAgICAgICAgICAuZ2V0SW5zdHJ1Y3RvckNvdXJzZXMoaW5zdHJ1Y3RvcklEKVxyXG4gICAgICAgICAgICAudGhlbihyZXN1bHQgPT4ge1xyXG4gICAgICAgICAgICAgICAgdmFyIGlzRW1wdHkgPSAocmVzdWx0IHx8IFtdKS5sZW5ndGggPT09IDA7XHJcbiAgICAgICAgICAgICAgICBpZiAoaXNFbXB0eSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3VsdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kYXRhID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kYXRhID0gcmVzdWx0O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuY2F0Y2goZXJyb3IgPT4gY29uc29sZS5sb2coZXJyb3IpKTtcclxuICAgIH1cclxuXHJcbiAgICBkb0F0dGVuZGFuY2UoY291cnNlOiBDb3Vyc2UpIHtcclxuICAgICAgdGhpcy5sb2FkaW5nID0gdHJ1ZTtcclxuICAgICAgdGhpcy5jb3Vyc2VJRCA9IGNvdXJzZS5jb3Vyc2VJRDtcclxuICAgICAgdGhpcy5TdHVkZW50U2VydmljZVxyXG4gICAgICAgICAgLmdldFRpbWV0YWJsZXNCeUNvdXJzZUlkKGNvdXJzZS5jb3Vyc2VJRClcclxuICAgICAgICAgIC50aGVuKHJlc3VsdCA9PiB7XHJcbiAgICAgICAgICAgICAgdmFyIGlzRW1wdHkgPSAocmVzdWx0IHx8IFtdKS5sZW5ndGggPT09IDA7XHJcbiAgICAgICAgICAgICAgaWYgKGlzRW1wdHkpIHtcclxuICAgICAgICAgICAgICAgICAgdGhpcy50aW1ldGFibGVzID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgdGhpcy5hdHRlbmRhbmNlU3R1ZGVudHMgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICB0aGlzLnRpbWV0YWJsZXMgPSByZXN1bHQ7XHJcbiAgICAgICAgICAgICAgICAgIHRoaXMuZ2V0U3R1ZGVudHNCeUlkKHRoaXMudGltZXRhYmxlcyk7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSlcclxuICAgICAgICAgIC5jYXRjaChlcnJvciA9PiBjb25zb2xlLmxvZyhlcnJvcikpO1xyXG5cclxuICAgICAgdGhpcy5hdHRlbmRhbmNlQ291cnNlID0gY291cnNlLmNvdXJzZU5hbWU7XHJcbiAgICAgIHRoaXMuYXR0ZW5kYW5jZVZpZXcgPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIGdldFN0dWRlbnRzQnlJZCh0aW1ldGFibGVzKSB7XHJcbiAgICAgIHRoaXMuU3R1ZGVudFNlcnZpY2VcclxuICAgICAgICAgIC5nZXRTdHVkZW50c0J5SWQodGltZXRhYmxlcylcclxuICAgICAgICAgIC50aGVuKHJlc3VsdCA9PiB7XHJcbiAgICAgICAgICAgICAgdmFyIGlzRW1wdHkgPSAocmVzdWx0IHx8IFtdKS5sZW5ndGggPT09IDA7XHJcbiAgICAgICAgICAgICAgaWYgKGlzRW1wdHkpIHtcclxuICAgICAgICAgICAgICAgICAgdGhpcy5hdHRlbmRhbmNlU3R1ZGVudHMgPSBudWxsO1xyXG4gICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgIHRoaXMuYXR0ZW5kYW5jZVN0dWRlbnRzID0gcmVzdWx0O1xyXG4gICAgICAgICAgICAgICAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgICAgLmNhdGNoKGVycm9yID0+IGNvbnNvbGUubG9nKGVycm9yKSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gbWFya0Fic2VudChzdHVkZW50OiBTdHVkZW50KSB7XHJcbiAgICAvLyAgIGlmIChzdHVkZW50LmFic2VudCkge1xyXG4gICAgLy8gICAgIHN0dWRlbnQuYWJzZW50ID0gZmFsc2U7XHJcbiAgICAvLyAgICAgdmFyIGluZGV4ID0gdGhpcy5hYnNlbnRTdHVkZW50cy5pbmRleE9mKHN0dWRlbnQuc3R1ZGVudElEKTtcclxuICAgIC8vICAgICB0aGlzLmFic2VudFN0dWRlbnRzLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICAvLyAgIH0gZWxzZSB7XHJcbiAgICAvLyAgICAgc3R1ZGVudC5hYnNlbnQgPSB0cnVlO1xyXG4gICAgLy8gICAgIHRoaXMuYWJzZW50U3R1ZGVudHMucHVzaChzdHVkZW50LnN0dWRlbnRJRCk7XHJcbiAgICAvLyAgIH1cclxuICAgIC8vICAgY29uc29sZS5sb2codGhpcy5hYnNlbnRTdHVkZW50cyk7XHJcbiAgICAvLyB9XHJcblxyXG4gICAgc3VibWl0QXR0ZW5kYW5jZSgpIHtcclxuICAgICAgdmFyIGNvdW50ID0gMDtcclxuICAgICAgZm9yIChsZXQgc3R1ZGVudCBvZiB0aGlzLmF0dGVuZGFuY2VTdHVkZW50cykge1xyXG4gICAgICAgIGlmIChzdHVkZW50LmF0dGVuZGFuY2VWYWx1ZSkge1xyXG4gICAgICAgICAgY291bnQrKztcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChjb3VudCA9PT0gdGhpcy5hdHRlbmRhbmNlU3R1ZGVudHMubGVuZ3RoKSB7XHJcbiAgICAgICAgc3dhbCh7XHJcbiAgICAgICAgICAgIHRpdGxlOiAnU3VibWl0IEF0dGVuZGFuY2U/JyxcclxuICAgICAgICAgICAgdGV4dDogXCJZb3Ugd29uJ3QgYmUgYWJsZSB0byByZXZlcnQgdGhpcyFcIixcclxuICAgICAgICAgICAgdHlwZTogJ2luZm8nLFxyXG4gICAgICAgICAgICBzaG93Q2FuY2VsQnV0dG9uOiB0cnVlLFxyXG4gICAgICAgICAgICBjb25maXJtQnV0dG9uQ29sb3I6ICcjMzA4NWQ2JyxcclxuICAgICAgICAgICAgY2FuY2VsQnV0dG9uQ29sb3I6ICcjZDMzJyxcclxuICAgICAgICAgICAgY29uZmlybUJ1dHRvblRleHQ6ICdZZXMsIHN1Ym1pdCEnXHJcbiAgICAgICAgfSkudGhlbihpc0NvbmZpcm0gPT4ge1xyXG4gICAgICAgICAgaWYgKGlzQ29uZmlybSkge1xyXG4gICAgICAgICAgICB0aGlzLmF0dGVuZGFuY2UgPSB7XHJcbiAgICAgICAgICAgICAgc3R1ZGVudHM6IHRoaXMuYXR0ZW5kYW5jZVN0dWRlbnRzLFxyXG4gICAgICAgICAgICAgIGNvdXJzZUlEOiB0aGlzLmNvdXJzZUlELFxyXG4gICAgICAgICAgICAgIGRhdGU6IHRoaXMuZGF0ZVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB0aGlzLlN0dWRlbnRTZXJ2aWNlXHJcbiAgICAgICAgICAgICAgICAuaW5zZXJ0QXR0ZW5kYW5jZSh0aGlzLmF0dGVuZGFuY2UpXHJcbiAgICAgICAgICAgICAgICAudGhlbihyZXN1bHQgPT4ge1xyXG4gICAgICAgICAgICAgICAgICBzd2FsKFxyXG4gICAgICAgICAgICAgICAgICAgICAgJ0F0dGVuZGFuY2Ugc3VibWl0dGVkIScsXHJcbiAgICAgICAgICAgICAgICAgICAgICAnJyxcclxuICAgICAgICAgICAgICAgICAgICAgICdzdWNjZXNzJ1xyXG4gICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgICB0aGlzLmF0dGVuZGFuY2VWaWV3ID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmNhdGNoKGVycm9yID0+IGNvbnNvbGUubG9nKGVycm9yKSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSkuY2F0Y2goZXJyb3IgPT4ge1xyXG4gICAgICAgICAgLy9jb25zb2xlLmxvZyhcIkNhbmNlbGVkXCIpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHN3YWwoXHJcbiAgICAgICAgICAgICdBdHRlbmRhbmNlIEluY29tcGxldGUnLFxyXG4gICAgICAgICAgICAnUGxlYXNlIGVudGVyIGF0dGVuZGFuY2UgZm9yIGFsbCBzdHVkZW50cycsXHJcbiAgICAgICAgICAgICd3YXJuaW5nJ1xyXG4gICAgICAgICk7XHJcbiAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgZ29CYWNrKCkge1xyXG4gICAgICAgIHdpbmRvdy5oaXN0b3J5LmJhY2soKTtcclxuICAgIH1cclxufVxyXG4iXX0=
