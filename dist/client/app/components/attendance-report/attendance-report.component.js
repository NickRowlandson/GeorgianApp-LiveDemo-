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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var student_service_1 = require("../../services/student.service");
var course_service_1 = require("../../services/course.service");
var platform_browser_1 = require("@angular/platform-browser");
var AttendanceReportComponent = /** @class */ (function () {
    function AttendanceReportComponent(document, router, studentService, courseService) {
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
    AttendanceReportComponent.prototype.ngOnInit = function () {
        var _this = this;
        swal({
            title: 'Loading...',
            allowOutsideClick: false
        });
        swal.showLoading();
        this.studentService
            .getAllAttendance()
            .then(function (attendance) {
            if (attendance.result === 'error') {
                _this.data = null;
                _this.displayErrorAlert(attendance);
            }
            else {
                _this.data = attendance;
                _this.getStudents();
            }
        })
            .catch(function (error) { return console.log(error); });
    };
    AttendanceReportComponent.prototype.getStudents = function () {
        var _this = this;
        this.studentService
            .getStudents()
            .then(function (students) {
            if (students.result === 'error') {
                _this.students = null;
                _this.displayErrorAlert(students);
            }
            else {
                _this.students = students;
                for (var _i = 0, _a = _this.students; _i < _a.length; _i++) {
                    var student = _a[_i];
                    student.fullName = student.firstName + " " + student.lastName;
                }
                _this.getCourses();
            }
        })
            .catch(function (error) { return console.log(error); });
    };
    AttendanceReportComponent.prototype.getCourses = function () {
        var _this = this;
        this.courseService
            .getCourses()
            .then(function (result) {
            if (result.result === 'error') {
                _this.courses = null;
                _this.displayErrorAlert(result);
            }
            else {
                //format datetime
                result.forEach(function (item) {
                    item.courseStart = moment(item.courseStart).format('YYYY-MM-DD');
                    item.courseEnd = moment(item.courseEnd).format('YYYY-MM-DD');
                    // item.classStartTime = moment(item.classStartTime).format('hh:mm A');
                    // item.classEndTime = moment(item.classEndTime).format('hh:mm A');
                });
                _this.courses = result;
                _this.getTimetables();
            }
        })
            .catch(function (error) { return console.log(error); });
    };
    AttendanceReportComponent.prototype.getTimetables = function () {
        var _this = this;
        this.studentService
            .getTimetables()
            .then(function (result) {
            if (result.result === 'error') {
                _this.timetables = null;
                _this.displayErrorAlert(result);
            }
            else {
                _this.timetables = result;
                swal.close();
            }
        })
            .catch(function (error) { return console.log(error); });
    };
    AttendanceReportComponent.prototype.viewStudentReport = function (student) {
        this.records = [];
        this.studentAttendanceView = true;
        this.attendance = this.data.filter(function (x) { return x.userID === student.userID; });
        this.attendance.sort(function (a, b) {
            a = new Date(a.date);
            b = new Date(b.date);
            return a > b ? -1 : a < b ? 1 : 0;
        });
        this.student = this.students.filter(function (x) { return x.studentID === student.studentID; });
        this.student = this.student[0];
        this.totalPresent = this.attendance.filter(function (x) { return x.attendanceValue === 'P'; }).length;
        this.totalAbsent = this.attendance.filter(function (x) { return x.attendanceValue === 'A'; }).length;
        this.totalMadeContact = this.attendance.filter(function (x) { return x.attendanceValue === 'MC'; }).length;
        if (this.attendance.length === 0) {
            this.noAttendance = true;
        }
        else {
            this.noAttendance = false;
            var _loop_1 = function (item) {
                course = this_1.courses.filter(function (x) { return x.courseID === item.courseID; });
                attendance = {
                    course: course,
                    date: item.date,
                    attendanceValue: item.attendanceValue
                };
                this_1.records.push(attendance);
            };
            var this_1 = this, course, attendance;
            for (var _i = 0, _a = this.attendance; _i < _a.length; _i++) {
                var item = _a[_i];
                _loop_1(item);
            }
            this.recordsBackup = this.records;
        }
        this.document.body.scrollTop = 0;
    };
    AttendanceReportComponent.prototype.viewCourseReport = function (course) {
        this.courseTimetables = [];
        this.courseStudents = [];
        this.courseAttendanceView = true;
        this.course = course;
        this.classTimeStr = this.course.classTimeStr;
        this.classAbsenceTotal = this.data.filter(function (x) { return x.courseID === course.courseID && x.attendanceValue === 'A'; }).length;
        this.classPresenceTotal = this.data.filter(function (x) { return x.courseID === course.courseID && x.attendanceValue === 'P'; }).length;
        this.classMadeContactTotal = this.data.filter(function (x) { return x.courseID === course.courseID && x.attendanceValue === 'MC'; }).length;
        if (this.classTimeStr) {
            var array = this.classTimeStr.split(',');
            this.classTimeStr = [];
            for (var _i = 0, array_1 = array; _i < array_1.length; _i++) {
                var item = array_1[_i];
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
            this.courseTimetables = this.timetables.filter(function (x) { return x.courseID === course.courseID; });
            var _loop_2 = function (item) {
                studentInfo = {
                    student: this_2.students.filter(function (x) { return x.userID === item.userID; })[0],
                    startDate: item.startDate,
                    endDate: item.endDate,
                    attendanceInfo: this_2.data.filter(function (x) { return x.userID === item.userID && x.courseID === course.courseID; })
                };
                this_2.courseStudents.push(studentInfo);
            };
            var this_2 = this;
            for (var _a = 0, _b = this.courseTimetables; _a < _b.length; _a++) {
                var item = _b[_a];
                _loop_2(item);
            }
        }
        if (this.courseStudents.length === 0) {
            this.noStudentsEnrolled = true;
        }
        else {
            this.noStudentsEnrolled = false;
        }
        this.document.body.scrollTop = 0;
    };
    AttendanceReportComponent.prototype.filterAttendance = function (filterBy) {
        this.records = this.recordsBackup;
        if (filterBy === 'absence') {
            this.records = this.records.filter(function (x) { return x.attendanceValue === 'A'; });
        }
        else if (filterBy === 'presence') {
            this.records = this.records.filter(function (x) { return x.attendanceValue === 'P'; });
        }
        else if (filterBy === 'madeContact') {
            this.records = this.records.filter(function (x) { return x.attendanceValue === 'MC'; });
        }
    };
    AttendanceReportComponent.prototype.overallStatus = function () {
        this.courseAttendanceView = false;
        this.studentAttendanceView = false;
        this.noAttendance = false;
    };
    AttendanceReportComponent.prototype.displayErrorAlert = function (error) {
        swal(error.title, error.msg, 'error');
    };
    AttendanceReportComponent.prototype.goBack = function () {
        window.history.back();
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
    return AttendanceReportComponent;
}());
exports.AttendanceReportComponent = AttendanceReportComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NsaWVudC9hcHAvY29tcG9uZW50cy9hdHRlbmRhbmNlLXJlcG9ydC9hdHRlbmRhbmNlLXJlcG9ydC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBQSxzQ0FBMEQ7QUFDMUQsMENBQXlDO0FBQ3pDLGtFQUFnRTtBQUVoRSxnRUFBOEQ7QUFFOUQsOERBQXFEO0FBVXJEO0lBaUNFLG1DQUF1QyxRQUFrQixFQUFVLE1BQWMsRUFBVSxjQUE4QixFQUFVLGFBQTRCO1FBQXhILGFBQVEsR0FBUixRQUFRLENBQVU7UUFBVSxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQVUsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBQVUsa0JBQWEsR0FBYixhQUFhLENBQWU7UUEzQi9KLDBCQUFxQixHQUFZLEtBQUssQ0FBQztRQUd2QyxZQUFPLEdBQUcsRUFBRSxDQUFDO1FBQ2Isa0JBQWEsR0FBRyxFQUFFLENBQUM7UUFJbkIsaUJBQVksR0FBWSxLQUFLLENBQUM7UUFFOUIsa0JBQWEsR0FBWSxLQUFLLENBQUM7UUFJL0IseUJBQW9CLEdBQVksS0FBSyxDQUFDO1FBT3RDLHVCQUFrQixHQUFZLEtBQUssQ0FBQztJQVFwQyxDQUFDO0lBRUQsNENBQVEsR0FBUjtRQUFBLGlCQWtCQztRQWpCQyxJQUFJLENBQUM7WUFDSCxLQUFLLEVBQUUsWUFBWTtZQUNuQixpQkFBaUIsRUFBRSxLQUFLO1NBQ3pCLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNuQixJQUFJLENBQUMsY0FBYzthQUNoQixnQkFBZ0IsRUFBRTthQUNsQixJQUFJLENBQUMsVUFBQSxVQUFVO1lBQ2QsSUFBSyxVQUFrQixDQUFDLE1BQU0sS0FBSyxPQUFPLEVBQUU7Z0JBQzFDLEtBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO2dCQUNqQixLQUFJLENBQUMsaUJBQWlCLENBQUMsVUFBVSxDQUFDLENBQUM7YUFDcEM7aUJB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LE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsQ0FBQyxlQUFlLEtBQUssSUFBSSxFQUExQixDQUEwQixDQUFDLENBQUM7U0FDckU7SUFDSCxDQUFDO0lBRUQsaURBQWEsR0FBYjtRQUNFLElBQUksQ0FBQyxvQkFBb0IsR0FBRyxLQUFLLENBQUM7UUFDbEMsSUFBSSxDQUFDLHFCQUFxQixHQUFHLEtBQUssQ0FBQztRQUNuQyxJQUFJLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQztJQUM1QixDQUFDO0lBRUQscURBQWlCLEdBQWpCLFVBQWtCLEtBQUs7UUFDckIsSUFBSSxDQUNGLEtBQUssQ0FBQyxLQUFLLEVBQ1gsS0FBSyxDQUFDLEdBQUcsRUFDVCxPQUFPLENBQ1IsQ0FBQztJQUNKLENBQUM7SUFFRCwwQ0FBTSxHQUFOO1FBQ0UsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUN4QixDQUFDO0lBOU5VLHlCQUF5QjtRQU5yQyxnQkFBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLDBCQUEwQjtZQUNwQyxXQUFXLEVBQUUscUVBQXFFO1lBQ2xGLFNBQVMsRUFBRSxDQUFDLG9FQUFvRSxDQUFDO1NBQ2xGLENBQUM7UUFtQ2MsV0FBQSxhQUFNLENBQUMsMkJBQVEsQ0FBQyxDQUFBO3lDQUFtQixRQUFRLEVBQWtCLGVBQU0sRUFBMEIsZ0NBQWMsRUFBeUIsOEJBQWE7T0FqQ3BKLHlCQUF5QixDQStOckM7SUFBRCxnQ0FBQztDQS9ORCxBQStOQyxJQUFBO0FBL05ZLDhEQUF5QiIsImZpbGUiOiJhcHAvY29tcG9uZW50cy9hdHRlbmRhbmNlLXJlcG9ydC9hdHRlbmRhbmNlLXJlcG9ydC5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5qZWN0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcbmltcG9ydCB7IFN0dWRlbnRTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL3N0dWRlbnQuc2VydmljZVwiO1xyXG5pbXBvcnQgeyBTdHVkZW50IH0gZnJvbSBcIi4uLy4uL21vZGVscy9zdHVkZW50XCI7XHJcbmltcG9ydCB7IENvdXJzZVNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvY291cnNlLnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgQ291cnNlIH0gZnJvbSBcIi4uLy4uL21vZGVscy9jb3Vyc2VcIjtcclxuaW1wb3J0IHsgRE9DVU1FTlQgfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcclxuZGVjbGFyZSB2YXIgbW9tZW50OiBhbnk7XHJcbmRlY2xhcmUgdmFyIHN3YWw6IGFueTtcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnYXR0ZW5kYW5jZVJlcG9ydENvbXBvbmV0JyxcclxuICB0ZW1wbGF0ZVVybDogJy4vYXBwL2NvbXBvbmVudHMvYXR0ZW5kYW5jZS1yZXBvcnQvYXR0ZW5kYW5jZS1yZXBvcnQuY29tcG9uZW50Lmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL2FwcC9jb21wb25lbnRzL2F0dGVuZGFuY2UtcmVwb3J0L2F0dGVuZGFuY2UtcmVwb3J0LmNvbXBvbmVudC5jc3MnXVxyXG59KVxyXG5cclxuZXhwb3J0IGNsYXNzIEF0dGVuZGFuY2VSZXBvcnRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG4gIGRhdGE6IGFueTtcclxuICBjb3Vyc2VzOiBDb3Vyc2VbXTtcclxuICBzdHVkZW50czogU3R1ZGVudFtdO1xyXG4gIHRvdGFsQWJzZW5jZXM6IGFueTtcclxuXHJcbiAgc3R1ZGVudEF0dGVuZGFuY2VWaWV3OiBib29sZWFuID0gZmFsc2U7XHJcbiAgc3R1ZGVudDogYW55W107XHJcbiAgYXR0ZW5kYW5jZTogYW55W107XHJcbiAgcmVjb3JkcyA9IFtdO1xyXG4gIHJlY29yZHNCYWNrdXAgPSBbXTtcclxuICB0b3RhbFByZXNlbnQ6IGFueTtcclxuICB0b3RhbEFic2VudDogYW55O1xyXG4gIHRvdGFsTWFkZUNvbnRhY3Q6IGFueTtcclxuICBub0F0dGVuZGFuY2U6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgc3R1ZGVudFJlcG9ydDogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICB0aW1ldGFibGVzOiBhbnlbXTtcclxuXHJcbiAgY291cnNlQXR0ZW5kYW5jZVZpZXc6IGJvb2xlYW4gPSBmYWxzZTtcclxuICBjb3Vyc2U6IGFueTtcclxuICBjbGFzc1RpbWVTdHI6IGFueTtcclxuICBjb3Vyc2VEYXRhOiBhbnlbXTtcclxuICBjb3Vyc2VTdHVkZW50czogYW55W107XHJcbiAgY291cnNlVGltZXRhYmxlczogYW55W107XHJcbiAgc3R1ZGVudFJlY29yZDogYW55W107XHJcbiAgbm9TdHVkZW50c0Vucm9sbGVkOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gIGNsYXNzQWJzZW5jZVRvdGFsOiBhbnk7XHJcbiAgY2xhc3NQcmVzZW5jZVRvdGFsOiBhbnk7XHJcbiAgY2xhc3NNYWRlQ29udGFjdFRvdGFsOiBhbnk7XHJcblxyXG4gIGNvbnN0cnVjdG9yKCBASW5qZWN0KERPQ1VNRU5UKSBwcml2YXRlIGRvY3VtZW50OiBEb2N1bWVudCwgcHJpdmF0ZSByb3V0ZXI6IFJvdXRlciwgcHJpdmF0ZSBzdHVkZW50U2VydmljZTogU3R1ZGVudFNlcnZpY2UsIHByaXZhdGUgY291cnNlU2VydmljZTogQ291cnNlU2VydmljZSkge1xyXG5cclxuICB9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgc3dhbCh7XHJcbiAgICAgIHRpdGxlOiAnTG9hZGluZy4uLicsXHJcbiAgICAgIGFsbG93T3V0c2lkZUNsaWNrOiBmYWxzZVxyXG4gICAgfSk7XHJcbiAgICBzd2FsLnNob3dMb2FkaW5nKCk7XHJcbiAgICB0aGlzLnN0dWRlbnRTZXJ2aWNlXHJcbiAgICAgIC5nZXRBbGxBdHRlbmRhbmNlKClcclxuICAgICAgLnRoZW4oYXR0ZW5kYW5jZSA9PiB7XHJcbiAgICAgICAgaWYgKChhdHRlbmRhbmNlIGFzIGFueSkucmVzdWx0ID09PSAnZXJyb3InKSB7XHJcbiAgICAgICAgICB0aGlzLmRhdGEgPSBudWxsO1xyXG4gICAgICAgICAgdGhpcy5kaXNwbGF5RXJyb3JBbGVydChhdHRlbmRhbmNlKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdGhpcy5kYXRhID0gYXR0ZW5kYW5jZTtcclxuICAgICAgICAgIHRoaXMuZ2V0U3R1ZGVudHMoKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pXHJcbiAgICAgIC5jYXRjaChlcnJvciA9PiBjb25zb2xlLmxvZyhlcnJvcikpO1xyXG4gIH1cclxuXHJcbiAgZ2V0U3R1ZGVudHMoKSB7XHJcbiAgICB0aGlzLnN0dWRlbnRTZXJ2aWNlXHJcbiAgICAgIC5nZXRTdHVkZW50cygpXHJcbiAgICAgIC50aGVuKHN0dWRlbnRzID0+IHtcclxuICAgICAgICBpZiAoKHN0dWRlbnRzIGFzIGFueSkucmVzdWx0ID09PSAnZXJyb3InKSB7XHJcbiAgICAgICAgICB0aGlzLnN0dWRlbnRzID0gbnVsbDtcclxuICAgICAgICAgIHRoaXMuZGlzcGxheUVycm9yQWxlcnQoc3R1ZGVudHMpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB0aGlzLnN0dWRlbnRzID0gc3R1ZGVudHM7XHJcbiAgICAgICAgICBmb3IgKGxldCBzdHVkZW50IG9mIHRoaXMuc3R1ZGVudHMpIHtcclxuICAgICAgICAgICAgc3R1ZGVudC5mdWxsTmFtZSA9IHN0dWRlbnQuZmlyc3ROYW1lICsgXCIgXCIgKyBzdHVkZW50Lmxhc3ROYW1lO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgdGhpcy5nZXRDb3Vyc2VzKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gICAgICAuY2F0Y2goZXJyb3IgPT4gY29uc29sZS5sb2coZXJyb3IpKTtcclxuICB9XHJcblxyXG4gIGdldENvdXJzZXMoKSB7XHJcbiAgICB0aGlzLmNvdXJzZVNlcnZpY2VcclxuICAgICAgLmdldENvdXJzZXMoKVxyXG4gICAgICAudGhlbihyZXN1bHQgPT4ge1xyXG4gICAgICAgIGlmICgocmVzdWx0IGFzIGFueSkucmVzdWx0ID09PSAnZXJyb3InKSB7XHJcbiAgICAgICAgICB0aGlzLmNvdXJzZXMgPSBudWxsO1xyXG4gICAgICAgICAgdGhpcy5kaXNwbGF5RXJyb3JBbGVydChyZXN1bHQpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAvL2Zvcm1hdCBkYXRldGltZVxyXG4gICAgICAgICAgcmVzdWx0LmZvckVhY2goKGl0ZW0pID0+IHtcclxuICAgICAgICAgICAgaXRlbS5jb3Vyc2VTdGFydCA9IG1vbWVudChpdGVtLmNvdXJzZVN0YXJ0KS5mb3JtYXQoJ1lZWVktTU0tREQnKTtcclxuICAgICAgICAgICAgaXRlbS5jb3Vyc2VFbmQgPSBtb21lbnQoaXRlbS5jb3Vyc2VFbmQpLmZvcm1hdCgnWVlZWS1NTS1ERCcpO1xyXG4gICAgICAgICAgICAvLyBpdGVtLmNsYXNzU3RhcnRUaW1lID0gbW9tZW50KGl0ZW0uY2xhc3NTdGFydFRpbWUpLmZvcm1hdCgnaGg6bW0gQScpO1xyXG4gICAgICAgICAgICAvLyBpdGVtLmNsYXNzRW5kVGltZSA9IG1vbWVudChpdGVtLmNsYXNzRW5kVGltZSkuZm9ybWF0KCdoaDptbSBBJyk7XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICAgIHRoaXMuY291cnNlcyA9IHJlc3VsdDtcclxuICAgICAgICAgIHRoaXMuZ2V0VGltZXRhYmxlcygpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuICAgICAgLmNhdGNoKGVycm9yID0+IGNvbnNvbGUubG9nKGVycm9yKSk7XHJcbiAgfVxyXG5cclxuICBnZXRUaW1ldGFibGVzKCkge1xyXG4gICAgdGhpcy5zdHVkZW50U2VydmljZVxyXG4gICAgICAuZ2V0VGltZXRhYmxlcygpXHJcbiAgICAgIC50aGVuKHJlc3VsdCA9PiB7XHJcbiAgICAgICAgaWYgKChyZXN1bHQgYXMgYW55KS5yZXN1bHQgPT09ICdlcnJvcicpIHtcclxuICAgICAgICAgIHRoaXMudGltZXRhYmxlcyA9IG51bGw7XHJcbiAgICAgICAgICB0aGlzLmRpc3BsYXlFcnJvckFsZXJ0KHJlc3VsdCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHRoaXMudGltZXRhYmxlcyA9IHJlc3VsdDtcclxuICAgICAgICAgIHN3YWwuY2xvc2UoKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pXHJcbiAgICAgIC5jYXRjaChlcnJvciA9PiBjb25zb2xlLmxvZyhlcnJvcikpO1xyXG4gIH1cclxuXHJcbiAgdmlld1N0dWRlbnRSZXBvcnQoc3R1ZGVudDogU3R1ZGVudCkge1xyXG4gICAgdGhpcy5yZWNvcmRzID0gW107XHJcbiAgICB0aGlzLnN0dWRlbnRBdHRlbmRhbmNlVmlldyA9IHRydWU7XHJcbiAgICB0aGlzLmF0dGVuZGFuY2UgPSB0aGlzLmRhdGEuZmlsdGVyKHggPT4geC51c2VySUQgPT09IHN0dWRlbnQudXNlcklEKTtcclxuICAgIHRoaXMuYXR0ZW5kYW5jZS5zb3J0KGZ1bmN0aW9uKGEsIGIpIHtcclxuICAgICAgYSA9IG5ldyBEYXRlKGEuZGF0ZSk7XHJcbiAgICAgIGIgPSBuZXcgRGF0ZShiLmRhdGUpO1xyXG4gICAgICByZXR1cm4gYSA+IGIgPyAtMSA6IGEgPCBiID8gMSA6IDA7XHJcbiAgICB9KTtcclxuICAgIHRoaXMuc3R1ZGVudCA9IHRoaXMuc3R1ZGVudHMuZmlsdGVyKHggPT4geC5zdHVkZW50SUQgPT09IHN0dWRlbnQuc3R1ZGVudElEKTtcclxuICAgIHRoaXMuc3R1ZGVudCA9IHRoaXMuc3R1ZGVudFswXTtcclxuICAgIHRoaXMudG90YWxQcmVzZW50ID0gdGhpcy5hdHRlbmRhbmNlLmZpbHRlcih4ID0+IHguYXR0ZW5kYW5jZVZhbHVlID09PSAnUCcpLmxlbmd0aDtcclxuICAgIHRoaXMudG90YWxBYnNlbnQgPSB0aGlzLmF0dGVuZGFuY2UuZmlsdGVyKHggPT4geC5hdHRlbmRhbmNlVmFsdWUgPT09ICdBJykubGVuZ3RoO1xyXG4gICAgdGhpcy50b3RhbE1hZGVDb250YWN0ID0gdGhpcy5hdHRlbmRhbmNlLmZpbHRlcih4ID0+IHguYXR0ZW5kYW5jZVZhbHVlID09PSAnTUMnKS5sZW5ndGg7XHJcblxyXG4gICAgaWYgKHRoaXMuYXR0ZW5kYW5jZS5sZW5ndGggPT09IDApIHtcclxuICAgICAgdGhpcy5ub0F0dGVuZGFuY2UgPSB0cnVlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5ub0F0dGVuZGFuY2UgPSBmYWxzZTtcclxuICAgICAgZm9yIChsZXQgaXRlbSBvZiB0aGlzLmF0dGVuZGFuY2UpIHtcclxuICAgICAgICB2YXIgY291cnNlID0gdGhpcy5jb3Vyc2VzLmZpbHRlcih4ID0+IHguY291cnNlSUQgPT09IGl0ZW0uY291cnNlSUQpO1xyXG4gICAgICAgIHZhciBhdHRlbmRhbmNlID0ge1xyXG4gICAgICAgICAgY291cnNlOiBjb3Vyc2UsXHJcbiAgICAgICAgICBkYXRlOiBpdGVtLmRhdGUsXHJcbiAgICAgICAgICBhdHRlbmRhbmNlVmFsdWU6IGl0ZW0uYXR0ZW5kYW5jZVZhbHVlXHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLnJlY29yZHMucHVzaChhdHRlbmRhbmNlKTtcclxuICAgICAgfVxyXG4gICAgICB0aGlzLnJlY29yZHNCYWNrdXAgPSB0aGlzLnJlY29yZHM7XHJcbiAgICB9XHJcbiAgICB0aGlzLmRvY3VtZW50LmJvZHkuc2Nyb2xsVG9wID0gMDtcclxuICB9XHJcblxyXG4gIHZpZXdDb3Vyc2VSZXBvcnQoY291cnNlOiBDb3Vyc2UpIHtcclxuICAgIHRoaXMuY291cnNlVGltZXRhYmxlcyA9IFtdO1xyXG4gICAgdGhpcy5jb3Vyc2VTdHVkZW50cyA9IFtdO1xyXG4gICAgdGhpcy5jb3Vyc2VBdHRlbmRhbmNlVmlldyA9IHRydWU7XHJcbiAgICB0aGlzLmNvdXJzZSA9IGNvdXJzZTtcclxuICAgIHRoaXMuY2xhc3NUaW1lU3RyID0gdGhpcy5jb3Vyc2UuY2xhc3NUaW1lU3RyO1xyXG5cclxuICAgIHRoaXMuY2xhc3NBYnNlbmNlVG90YWwgPSB0aGlzLmRhdGEuZmlsdGVyKHggPT4geC5jb3Vyc2VJRCA9PT0gY291cnNlLmNvdXJzZUlEICYmIHguYXR0ZW5kYW5jZVZhbHVlID09PSAnQScpLmxlbmd0aDtcclxuICAgIHRoaXMuY2xhc3NQcmVzZW5jZVRvdGFsID0gdGhpcy5kYXRhLmZpbHRlcih4ID0+IHguY291cnNlSUQgPT09IGNvdXJzZS5jb3Vyc2VJRCAmJiB4LmF0dGVuZGFuY2VWYWx1ZSA9PT0gJ1AnKS5sZW5ndGg7XHJcbiAgICB0aGlzLmNsYXNzTWFkZUNvbnRhY3RUb3RhbCA9IHRoaXMuZGF0YS5maWx0ZXIoeCA9PiB4LmNvdXJzZUlEID09PSBjb3Vyc2UuY291cnNlSUQgJiYgeC5hdHRlbmRhbmNlVmFsdWUgPT09ICdNQycpLmxlbmd0aDtcclxuXHJcbiAgICBpZiAodGhpcy5jbGFzc1RpbWVTdHIpIHtcclxuICAgICAgdmFyIGFycmF5ID0gdGhpcy5jbGFzc1RpbWVTdHIuc3BsaXQoJywnKTtcclxuICAgICAgdGhpcy5jbGFzc1RpbWVTdHIgPSBbXTtcclxuICAgICAgZm9yIChsZXQgaXRlbSBvZiBhcnJheSkge1xyXG4gICAgICAgIHZhciBkYXRlID0gaXRlbS5zcGxpdCgnICcpO1xyXG4gICAgICAgIC8vIHZhciBkYXkgPSBkYXRlWzBdO1xyXG4gICAgICAgIC8vIHZhciB0aW1lID0gZGF0ZVsxXTtcclxuICAgICAgICAvLyB2YXIgc3RhcnRUaW1lID0gdGltZS5zcGxpdCgnLScpWzBdO1xyXG4gICAgICAgIC8vIHZhciBlbmRUaW1lID0gdGltZS5zcGxpdCgnLScpWzFdO1xyXG4gICAgICAgIHRoaXMuY2xhc3NUaW1lU3RyLnB1c2goZGF0ZSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB2YXIgc3R1ZGVudEluZm87XHJcblxyXG4gICAgaWYgKHRoaXMuZGF0YS5sZW5ndGggPT09IDApIHtcclxuICAgICAgdGhpcy5ub0F0dGVuZGFuY2UgPSB0cnVlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5ub0F0dGVuZGFuY2UgPSBmYWxzZTtcclxuICAgICAgdGhpcy5jb3Vyc2VUaW1ldGFibGVzID0gdGhpcy50aW1ldGFibGVzLmZpbHRlcih4ID0+IHguY291cnNlSUQgPT09IGNvdXJzZS5jb3Vyc2VJRCk7XHJcbiAgICAgIGZvciAobGV0IGl0ZW0gb2YgdGhpcy5jb3Vyc2VUaW1ldGFibGVzKSB7XHJcbiAgICAgICAgc3R1ZGVudEluZm8gPSB7XHJcbiAgICAgICAgICBzdHVkZW50OiB0aGlzLnN0dWRlbnRzLmZpbHRlcih4ID0+IHgudXNlcklEID09PSBpdGVtLnVzZXJJRClbMF0sXHJcbiAgICAgICAgICBzdGFydERhdGU6IGl0ZW0uc3RhcnREYXRlLFxyXG4gICAgICAgICAgZW5kRGF0ZTogaXRlbS5lbmREYXRlLFxyXG4gICAgICAgICAgYXR0ZW5kYW5jZUluZm86IHRoaXMuZGF0YS5maWx0ZXIoeCA9PiB4LnVzZXJJRCA9PT0gaXRlbS51c2VySUQgJiYgeC5jb3Vyc2VJRCA9PT0gY291cnNlLmNvdXJzZUlEKVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5jb3Vyc2VTdHVkZW50cy5wdXNoKHN0dWRlbnRJbmZvKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLmNvdXJzZVN0dWRlbnRzLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICB0aGlzLm5vU3R1ZGVudHNFbnJvbGxlZCA9IHRydWU7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLm5vU3R1ZGVudHNFbnJvbGxlZCA9IGZhbHNlO1xyXG4gICAgfVxyXG4gICAgdGhpcy5kb2N1bWVudC5ib2R5LnNjcm9sbFRvcCA9IDA7XHJcbiAgfVxyXG5cclxuICBmaWx0ZXJBdHRlbmRhbmNlKGZpbHRlckJ5KSB7XHJcbiAgICB0aGlzLnJlY29yZHMgPSB0aGlzLnJlY29yZHNCYWNrdXA7XHJcbiAgICBpZiAoZmlsdGVyQnkgPT09ICdhYnNlbmNlJykge1xyXG4gICAgICB0aGlzLnJlY29yZHMgPSB0aGlzLnJlY29yZHMuZmlsdGVyKHggPT4geC5hdHRlbmRhbmNlVmFsdWUgPT09ICdBJyk7XHJcbiAgICB9IGVsc2UgaWYgKGZpbHRlckJ5ID09PSAncHJlc2VuY2UnKSB7XHJcbiAgICAgIHRoaXMucmVjb3JkcyA9IHRoaXMucmVjb3Jkcy5maWx0ZXIoeCA9PiB4LmF0dGVuZGFuY2VWYWx1ZSA9PT0gJ1AnKTtcclxuICAgIH0gZWxzZSBpZiAoZmlsdGVyQnkgPT09ICdtYWRlQ29udGFjdCcpIHtcclxuICAgICAgdGhpcy5yZWNvcmRzID0gdGhpcy5yZWNvcmRzLmZpbHRlcih4ID0+IHguYXR0ZW5kYW5jZVZhbHVlID09PSAnTUMnKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIG92ZXJhbGxTdGF0dXMoKSB7XHJcbiAgICB0aGlzLmNvdXJzZUF0dGVuZGFuY2VWaWV3ID0gZmFsc2U7XHJcbiAgICB0aGlzLnN0dWRlbnRBdHRlbmRhbmNlVmlldyA9IGZhbHNlO1xyXG4gICAgdGhpcy5ub0F0dGVuZGFuY2UgPSBmYWxzZTtcclxuICB9XHJcblxyXG4gIGRpc3BsYXlFcnJvckFsZXJ0KGVycm9yKSB7XHJcbiAgICBzd2FsKFxyXG4gICAgICBlcnJvci50aXRsZSxcclxuICAgICAgZXJyb3IubXNnLFxyXG4gICAgICAnZXJyb3InXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgZ29CYWNrKCkge1xyXG4gICAgd2luZG93Lmhpc3RvcnkuYmFjaygpO1xyXG4gIH1cclxufVxyXG4iXX0=
