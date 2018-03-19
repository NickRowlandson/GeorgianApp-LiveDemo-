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
var student_service_1 = require("../../services/student.service");
var course_service_1 = require("../../services/course.service");
var AttendanceReportComponent = /** @class */ (function () {
    function AttendanceReportComponent(router, studentService, courseService) {
        this.router = router;
        this.studentService = studentService;
        this.courseService = courseService;
        this.studentAttendanceView = false;
        this.records = [];
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
            if (attendance.status === "403") {
                _this.data = null;
                swal.close();
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
            if (students.status === "403") {
                _this.students = null;
            }
            else {
                _this.students = students;
                for (var _i = 0, _a = _this.students; _i < _a.length; _i++) {
                    var student = _a[_i];
                    student.fullName = student.firstName + " " + student.lastName;
                }
            }
            _this.getCourses();
        })
            .catch(function (error) { return console.log(error); });
    };
    AttendanceReportComponent.prototype.getCourses = function () {
        var _this = this;
        this.courseService
            .getCourses()
            .then(function (result) {
            if (result.status === "403") {
                _this.courses = null;
                swal.close();
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
            if (result.status === "403") {
                _this.timetables = null;
                swal.close();
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
        }
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
    };
    AttendanceReportComponent.prototype.overallStatus = function () {
        this.courseAttendanceView = false;
        this.studentAttendanceView = false;
        this.noAttendance = false;
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
        __metadata("design:paramtypes", [router_1.Router, student_service_1.StudentService, course_service_1.CourseService])
    ], AttendanceReportComponent);
    return AttendanceReportComponent;
}());
exports.AttendanceReportComponent = AttendanceReportComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NsaWVudC9hcHAvY29tcG9uZW50cy9hdHRlbmRhbmNlLXJlcG9ydC9hdHRlbmRhbmNlLXJlcG9ydC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxzQ0FBa0Q7QUFDbEQsMENBQXlDO0FBQ3pDLGtFQUFnRTtBQUVoRSxnRUFBOEQ7QUFXOUQ7SUFnQ0ksbUNBQW9CLE1BQWMsRUFBVSxjQUE4QixFQUFVLGFBQTRCO1FBQTVGLFdBQU0sR0FBTixNQUFNLENBQVE7UUFBVSxtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFBVSxrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQTFCaEgsMEJBQXFCLEdBQVksS0FBSyxDQUFDO1FBR3ZDLFlBQU8sR0FBRyxFQUFFLENBQUM7UUFJYixpQkFBWSxHQUFZLEtBQUssQ0FBQztRQUU5QixrQkFBYSxHQUFZLEtBQUssQ0FBQztRQUkvQix5QkFBb0IsR0FBWSxLQUFLLENBQUM7UUFPdEMsdUJBQWtCLEdBQVksS0FBSyxDQUFDO0lBUXBDLENBQUM7SUFFRCw0Q0FBUSxHQUFSO1FBQUEsaUJBa0JDO1FBakJDLElBQUksQ0FBQztZQUNILEtBQUssRUFBRSxZQUFZO1lBQ25CLGlCQUFpQixFQUFFLEtBQUs7U0FDekIsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxjQUFjO2FBQ2QsZ0JBQWdCLEVBQUU7YUFDbEIsSUFBSSxDQUFDLFVBQUEsVUFBVTtZQUNaLEVBQUUsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxNQUFNLEtBQUssS0FBSyxDQUFDLENBQUMsQ0FBQztnQkFDOUIsS0FBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7Z0JBQ2pCLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUNqQixDQUFDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ0osS0FBSSxDQUFDLElBQUksR0FBRyxVQUFVLENBQUM7Z0JBQ3ZCLEtBQUksQ0FB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O1FBRUQsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNyQyxJQUFJLENBQUMsa0JBQWtCLEdBQUcsSUFBSSxDQUFDO1FBQ2pDLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNOLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxLQUFLLENBQUM7UUFDbEMsQ0FBQztJQUNMLENBQUM7SUFFRCxpREFBYSxHQUFiO1FBQ0ksSUFBSSxDQUFDLG9CQUFvQixHQUFHLEtBQUssQ0FBQztRQUNsQyxJQUFJLENBQUMscUJBQXFCLEdBQUcsS0FBSyxDQUFDO1FBQ25DLElBQUksQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDO0lBQzlCLENBQUM7SUFFRCwwQ0FBTSxHQUFOO1FBQ0ksTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUMxQixDQUFDO0lBbk1RLHlCQUF5QjtRQU5yQyxnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLDBCQUEwQjtZQUNwQyxXQUFXLEVBQUUscUVBQXFFO1lBQ2xGLFNBQVMsRUFBRSxDQUFDLG9FQUFvRSxDQUFDO1NBQ3BGLENBQUM7eUNBa0M4QixlQUFNLEVBQTBCLGdDQUFjLEVBQXlCLDhCQUFhO09BaEN2Ryx5QkFBeUIsQ0FvTXJDO0lBQUQsZ0NBQUM7Q0FwTUQsQUFvTUMsSUFBQTtBQXBNWSw4REFBeUIiLCJmaWxlIjoiYXBwL2NvbXBvbmVudHMvYXR0ZW5kYW5jZS1yZXBvcnQvYXR0ZW5kYW5jZS1yZXBvcnQuY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuaW1wb3J0IHsgU3R1ZGVudFNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvc3R1ZGVudC5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IFN0dWRlbnQgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL3N0dWRlbnRcIjtcclxuaW1wb3J0IHsgQ291cnNlU2VydmljZSB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9jb3Vyc2Uuc2VydmljZVwiO1xyXG5pbXBvcnQgeyBDb3Vyc2UgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL2NvdXJzZVwiO1xyXG5kZWNsYXJlIHZhciBtb21lbnQ6IGFueTtcclxuZGVjbGFyZSB2YXIgc3dhbDogYW55O1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogJ2F0dGVuZGFuY2VSZXBvcnRDb21wb25ldCcsXHJcbiAgICB0ZW1wbGF0ZVVybDogJy4vYXBwL2NvbXBvbmVudHMvYXR0ZW5kYW5jZS1yZXBvcnQvYXR0ZW5kYW5jZS1yZXBvcnQuY29tcG9uZW50Lmh0bWwnLFxyXG4gICAgc3R5bGVVcmxzOiBbJy4vYXBwL2NvbXBvbmVudHMvYXR0ZW5kYW5jZS1yZXBvcnQvYXR0ZW5kYW5jZS1yZXBvcnQuY29tcG9uZW50LmNzcyddXHJcbn0pXHJcblxyXG5leHBvcnQgY2xhc3MgQXR0ZW5kYW5jZVJlcG9ydENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgICBkYXRhOiBhbnk7XHJcbiAgICBjb3Vyc2VzOiBDb3Vyc2VbXTtcclxuICAgIHN0dWRlbnRzOiBTdHVkZW50W107XHJcbiAgICB0b3RhbEFic2VuY2VzOiBhbnk7XHJcblxyXG4gICAgc3R1ZGVudEF0dGVuZGFuY2VWaWV3OiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBzdHVkZW50OiBhbnlbXTtcclxuICAgIGF0dGVuZGFuY2U6IGFueVtdO1xyXG4gICAgcmVjb3JkcyA9IFtdO1xyXG4gICAgdG90YWxQcmVzZW50OiBhbnk7XHJcbiAgICB0b3RhbEFic2VudDogYW55O1xyXG4gICAgdG90YWxNYWRlQ29udGFjdDogYW55O1xyXG4gICAgbm9BdHRlbmRhbmNlOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gICAgc3R1ZGVudFJlcG9ydDogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICAgIHRpbWV0YWJsZXM6IGFueVtdO1xyXG5cclxuICAgIGNvdXJzZUF0dGVuZGFuY2VWaWV3OiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBjb3Vyc2U6IGFueTtcclxuICAgIGNsYXNzVGltZVN0cjogYW55O1xyXG4gICAgY291cnNlRGF0YTogYW55W107XHJcbiAgICBjb3Vyc2VTdHVkZW50czogYW55W107XHJcbiAgICBjb3Vyc2VUaW1ldGFibGVzOiBhbnlbXTtcclxuICAgIHN0dWRlbnRSZWNvcmQ6IGFueVtdO1xyXG4gICAgbm9TdHVkZW50c0Vucm9sbGVkOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gICAgY2xhc3NBYnNlbmNlVG90YWw6IGFueTtcclxuICAgIGNsYXNzUHJlc2VuY2VUb3RhbDogYW55O1xyXG4gICAgY2xhc3NNYWRlQ29udGFjdFRvdGFsOiBhbnk7XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSByb3V0ZXI6IFJvdXRlciwgcHJpdmF0ZSBzdHVkZW50U2VydmljZTogU3R1ZGVudFNlcnZpY2UsIHByaXZhdGUgY291cnNlU2VydmljZTogQ291cnNlU2VydmljZSkge1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBuZ09uSW5pdCgpIHtcclxuICAgICAgc3dhbCh7XHJcbiAgICAgICAgdGl0bGU6ICdMb2FkaW5nLi4uJyxcclxuICAgICAgICBhbGxvd091dHNpZGVDbGljazogZmFsc2VcclxuICAgICAgfSk7XHJcbiAgICAgIHN3YWwuc2hvd0xvYWRpbmcoKTtcclxuICAgICAgICB0aGlzLnN0dWRlbnRTZXJ2aWNlXHJcbiAgICAgICAgICAgIC5nZXRBbGxBdHRlbmRhbmNlKClcclxuICAgICAgICAgICAgLnRoZW4oYXR0ZW5kYW5jZSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoYXR0ZW5kYW5jZS5zdGF0dXMgPT09IFwiNDAzXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRhdGEgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgIHN3YWwuY2xvc2UoKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kYXRhID0gYXR0ZW5kYW5jZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmdldFN0dWRlbnRzKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5jYXRjaChlcnJvciA9PiBjb25zb2xlLmxvZyhlcnJvcikpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldFN0dWRlbnRzKCkge1xyXG4gICAgICAgIHRoaXMuc3R1ZGVudFNlcnZpY2VcclxuICAgICAgICAgICAgLmdldFN0dWRlbnRzKClcclxuICAgICAgICAgICAgLnRoZW4oc3R1ZGVudHMgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKChzdHVkZW50cyBhcyBhbnkpLnN0YXR1cyA9PT0gXCI0MDNcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3R1ZGVudHMgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0dWRlbnRzID0gc3R1ZGVudHM7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgc3R1ZGVudCBvZiB0aGlzLnN0dWRlbnRzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0dWRlbnQuZnVsbE5hbWUgPSBzdHVkZW50LmZpcnN0TmFtZSArIFwiIFwiICsgc3R1ZGVudC5sYXN0TmFtZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLmdldENvdXJzZXMoKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLmNhdGNoKGVycm9yID0+IGNvbnNvbGUubG9nKGVycm9yKSk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0Q291cnNlcygpIHtcclxuICAgICAgICB0aGlzLmNvdXJzZVNlcnZpY2VcclxuICAgICAgICAgICAgLmdldENvdXJzZXMoKVxyXG4gICAgICAgICAgICAudGhlbihyZXN1bHQgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKChyZXN1bHQgYXMgYW55KS5zdGF0dXMgPT09IFwiNDAzXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvdXJzZXMgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgIHN3YWwuY2xvc2UoKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9mb3JtYXQgZGF0ZXRpbWVcclxuICAgICAgICAgICAgICAgICAgICByZXN1bHQuZm9yRWFjaCgoaXRlbSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtLmNvdXJzZVN0YXJ0ID0gbW9tZW50KGl0ZW0uY291cnNlU3RhcnQpLmZvcm1hdCgnWVlZWS1NTS1ERCcpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtLmNvdXJzZUVuZCA9IG1vbWVudChpdGVtLmNvdXJzZUVuZCkuZm9ybWF0KCdZWVlZLU1NLUREJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGl0ZW0uY2xhc3NTdGFydFRpbWUgPSBtb21lbnQoaXRlbS5jbGFzc1N0YXJ0VGltZSkuZm9ybWF0KCdoaDptbSBBJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGl0ZW0uY2xhc3NFbmRUaW1lID0gbW9tZW50KGl0ZW0uY2xhc3NFbmRUaW1lKS5mb3JtYXQoJ2hoOm1tIEEnKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvdXJzZXMgPSByZXN1bHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5nZXRUaW1ldGFibGVzKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuY2F0Y2goZXJyb3IgPT4gY29uc29sZS5sb2coZXJyb3IpKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRUaW1ldGFibGVzKCkge1xyXG4gICAgICAgIHRoaXMuc3R1ZGVudFNlcnZpY2VcclxuICAgICAgICAgICAgLmdldFRpbWV0YWJsZXMoKVxyXG4gICAgICAgICAgICAudGhlbihyZXN1bHQgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHJlc3VsdC5zdGF0dXMgPT09IFwiNDAzXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnRpbWV0YWJsZXMgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgIHN3YWwuY2xvc2UoKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50aW1ldGFibGVzID0gcmVzdWx0O1xyXG4gICAgICAgICAgICAgICAgICAgIHN3YWwuY2xvc2UoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLmNhdGNoKGVycm9yID0+IGNvbnNvbGUubG9nKGVycm9yKSk7XHJcbiAgICB9XHJcblxyXG4gICAgdmlld1N0dWRlbnRSZXBvcnQoc3R1ZGVudDogU3R1ZGVudCkge1xyXG4gICAgICAgIHRoaXMucmVjb3JkcyA9IFtdO1xyXG4gICAgICAgIHRoaXMuc3R1ZGVudEF0dGVuZGFuY2VWaWV3ID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmF0dGVuZGFuY2UgPSB0aGlzLmRhdGEuZmlsdGVyKHggPT4geC51c2VySUQgPT09IHN0dWRlbnQudXNlcklEKTtcclxuICAgICAgICB0aGlzLnN0dWRlbnQgPSB0aGlzLnN0dWRlbnRzLmZpbHRlcih4ID0+IHguc3R1ZGVudElEID09PSBzdHVkZW50LnN0dWRlbnRJRCk7XHJcbiAgICAgICAgdGhpcy5zdHVkZW50ID0gdGhpcy5zdHVkZW50WzBdO1xyXG4gICAgICAgIHRoaXMudG90YWxQcmVzZW50ID0gdGhpcy5hdHRlbmRhbmNlLmZpbHRlcih4ID0+IHguYXR0ZW5kYW5jZVZhbHVlID09PSAnUCcpLmxlbmd0aDtcclxuICAgICAgICB0aGlzLnRvdGFsQWJzZW50ID0gdGhpcy5hdHRlbmRhbmNlLmZpbHRlcih4ID0+IHguYXR0ZW5kYW5jZVZhbHVlID09PSAnQScpLmxlbmd0aDtcclxuICAgICAgICB0aGlzLnRvdGFsTWFkZUNvbnRhY3QgPSB0aGlzLmF0dGVuZGFuY2UuZmlsdGVyKHggPT4geC5hdHRlbmRhbmNlVmFsdWUgPT09ICdNQycpLmxlbmd0aDtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuYXR0ZW5kYW5jZS5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgdGhpcy5ub0F0dGVuZGFuY2UgPSB0cnVlO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMubm9BdHRlbmRhbmNlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGl0ZW0gb2YgdGhpcy5hdHRlbmRhbmNlKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgY291cnNlID0gdGhpcy5jb3Vyc2VzLmZpbHRlcih4ID0+IHguY291cnNlSUQgPT09IGl0ZW0uY291cnNlSUQpO1xyXG4gICAgICAgICAgICAgICAgdmFyIGF0dGVuZGFuY2UgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY291cnNlOiBjb3Vyc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgZGF0ZTogaXRlbS5kYXRlLFxyXG4gICAgICAgICAgICAgICAgICAgIGF0dGVuZGFuY2VWYWx1ZTogaXRlbS5hdHRlbmRhbmNlVmFsdWVcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlY29yZHMucHVzaChhdHRlbmRhbmNlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgdmlld0NvdXJzZVJlcG9ydChjb3Vyc2U6IENvdXJzZSkge1xyXG4gICAgICAgIHRoaXMuY291cnNlVGltZXRhYmxlcyA9IFtdO1xyXG4gICAgICAgIHRoaXMuY291cnNlU3R1ZGVudHMgPSBbXTtcclxuICAgICAgICB0aGlzLmNvdXJzZUF0dGVuZGFuY2VWaWV3ID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmNvdXJzZSA9IGNvdXJzZTtcclxuICAgICAgICB0aGlzLmNsYXNzVGltZVN0ciA9IHRoaXMuY291cnNlLmNsYXNzVGltZVN0cjtcclxuXHJcbiAgICAgICAgdGhpcy5jbGFzc0Fic2VuY2VUb3RhbCA9IHRoaXMuZGF0YS5maWx0ZXIoeCA9PiB4LmNvdXJzZUlEID09PSBjb3Vyc2UuY291cnNlSUQgJiYgeC5hdHRlbmRhbmNlVmFsdWUgPT09ICdBJykubGVuZ3RoO1xyXG4gICAgICAgIHRoaXMuY2xhc3NQcmVzZW5jZVRvdGFsID0gdGhpcy5kYXRhLmZpbHRlcih4ID0+IHguY291cnNlSUQgPT09IGNvdXJzZS5jb3Vyc2VJRCAmJiB4LmF0dGVuZGFuY2VWYWx1ZSA9PT0gJ1AnKS5sZW5ndGg7XHJcbiAgICAgICAgdGhpcy5jbGFzc01hZGVDb250YWN0VG90YWwgPSB0aGlzLmRhdGEuZmlsdGVyKHggPT4geC5jb3Vyc2VJRCA9PT0gY291cnNlLmNvdXJzZUlEICYmIHguYXR0ZW5kYW5jZVZhbHVlID09PSAnTUMnKS5sZW5ndGg7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmNsYXNzVGltZVN0cikge1xyXG4gICAgICAgICAgdmFyIGFycmF5ID0gdGhpcy5jbGFzc1RpbWVTdHIuc3BsaXQoJywnKTtcclxuICAgICAgICAgIHRoaXMuY2xhc3NUaW1lU3RyID0gW107XHJcbiAgICAgICAgICBmb3IgKGxldCBpdGVtIG9mIGFycmF5KSB7XHJcbiAgICAgICAgICAgIHZhciBkYXRlID0gaXRlbS5zcGxpdCgnICcpO1xyXG4gICAgICAgICAgICAvLyB2YXIgZGF5ID0gZGF0ZVswXTtcclxuICAgICAgICAgICAgLy8gdmFyIHRpbWUgPSBkYXRlWzFdO1xyXG4gICAgICAgICAgICAvLyB2YXIgc3RhcnRUaW1lID0gdGltZS5zcGxpdCgnLScpWzBdO1xyXG4gICAgICAgICAgICAvLyB2YXIgZW5kVGltZSA9IHRpbWUuc3BsaXQoJy0nKVsxXTtcclxuICAgICAgICAgICAgdGhpcy5jbGFzc1RpbWVTdHIucHVzaChkYXRlKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZhciBzdHVkZW50SW5mbztcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuZGF0YS5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgdGhpcy5ub0F0dGVuZGFuY2UgPSB0cnVlO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMubm9BdHRlbmRhbmNlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuY291cnNlVGltZXRhYmxlcyA9IHRoaXMudGltZXRhYmxlcy5maWx0ZXIoeCA9PiB4LmNvdXJzZUlEID09PSBjb3Vyc2UuY291cnNlSUQpO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpdGVtIG9mIHRoaXMuY291cnNlVGltZXRhYmxlcykge1xyXG4gICAgICAgICAgICAgICAgc3R1ZGVudEluZm8gPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3R1ZGVudDogdGhpcy5zdHVkZW50cy5maWx0ZXIoeCA9PiB4LnVzZXJJRCA9PT0gaXRlbS51c2VySUQpWzBdLFxyXG4gICAgICAgICAgICAgICAgICAgIHN0YXJ0RGF0ZTogaXRlbS5zdGFydERhdGUsXHJcbiAgICAgICAgICAgICAgICAgICAgZW5kRGF0ZTogaXRlbS5lbmREYXRlLFxyXG4gICAgICAgICAgICAgICAgICAgIGF0dGVuZGFuY2VJbmZvOiB0aGlzLmRhdGEuZmlsdGVyKHggPT4geC51c2VySUQgPT09IGl0ZW0udXNlcklEICYmIHguY291cnNlSUQgPT09IGNvdXJzZS5jb3Vyc2VJRClcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvdXJzZVN0dWRlbnRzLnB1c2goc3R1ZGVudEluZm8pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy5jb3Vyc2VTdHVkZW50cy5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgIHRoaXMubm9TdHVkZW50c0Vucm9sbGVkID0gdHJ1ZTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdGhpcy5ub1N0dWRlbnRzRW5yb2xsZWQgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgb3ZlcmFsbFN0YXR1cygpIHtcclxuICAgICAgICB0aGlzLmNvdXJzZUF0dGVuZGFuY2VWaWV3ID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5zdHVkZW50QXR0ZW5kYW5jZVZpZXcgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLm5vQXR0ZW5kYW5jZSA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIGdvQmFjaygpIHtcclxuICAgICAgICB3aW5kb3cuaGlzdG9yeS5iYWNrKCk7XHJcbiAgICB9XHJcbn1cclxuIl19
