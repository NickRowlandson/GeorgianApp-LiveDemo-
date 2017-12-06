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
        this.studentService
            .getAllAttendance()
            .then(function (attendance) {
            if (attendance.status === "403") {
                _this.data = null;
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
            }
            else {
                _this.timetables = result;
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NsaWVudC9hcHAvY29tcG9uZW50cy9hdHRlbmRhbmNlLXJlcG9ydC9hdHRlbmRhbmNlLXJlcG9ydC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxzQ0FBa0Q7QUFDbEQsMENBQXlDO0FBQ3pDLGtFQUFnRTtBQUVoRSxnRUFBOEQ7QUFVOUQ7SUFnQ0ksbUNBQW9CLE1BQWMsRUFBVSxjQUE4QixFQUFVLGFBQTRCO1FBQTVGLFdBQU0sR0FBTixNQUFNLENBQVE7UUFBVSxtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFBVSxrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQTFCaEgsMEJBQXFCLEdBQVksS0FBSyxDQUFDO1FBR3ZDLFlBQU8sR0FBRyxFQUFFLENBQUM7UUFJYixpQkFBWSxHQUFZLEtBQUssQ0FBQztRQUU5QixrQkFBYSxHQUFZLEtBQUssQ0FBQztRQUkvQix5QkFBb0IsR0FBWSxLQUFLLENBQUM7UUFPdEMsdUJBQWtCLEdBQVksS0FBSyxDQUFDO0lBUXBDLENBQUM7SUFFRCw0Q0FBUSxHQUFSO1FBQUEsaUJBWUM7UUFYRyxJQUFJLENBQUMsY0FBYzthQUNkLGdCQUFnQixFQUFFO2FBQ2xCLElBQUksQ0FBQyxVQUFBLFVBQVU7WUFDWixFQUFFLENBQUMsQ0FBQyxVQUFVLENBQUMsTUFBTSxLQUFLLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQzlCLEtBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1lBQ3JCLENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDSixLQUFJLENBQUMsSUFBSSxHQUFHLFVBQVUsQ0FBQztnQkFDdkIsS0FBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1lBQ3ZCLENBQUM7UUFDTCxDQUFDLENBQUM7YUFDRCxLQUFLLENBQUMsVUFBQSxLQUFLLElBQUksT0FBQSxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUFsQixDQUFrQixDQUFDLENBQUM7SUFDNUMsQ0FB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LEdBQUcsS0FBSyxDQUFDO1FBQ2xDLElBQUksQ0FBQyxxQkFBcUIsR0FBRyxLQUFLLENBQUM7UUFDbkMsSUFBSSxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUM7SUFDOUIsQ0FBQztJQUVELDBDQUFNLEdBQU47UUFDSSxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDO0lBQzFCLENBQUM7SUExTFEseUJBQXlCO1FBTnJDLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsMEJBQTBCO1lBQ3BDLFdBQVcsRUFBRSxxRUFBcUU7WUFDbEYsU0FBUyxFQUFFLENBQUMsb0VBQW9FLENBQUM7U0FDcEYsQ0FBQzt5Q0FrQzhCLGVBQU0sRUFBMEIsZ0NBQWMsRUFBeUIsOEJBQWE7T0FoQ3ZHLHlCQUF5QixDQTJMckM7SUFBRCxnQ0FBQztDQTNMRCxBQTJMQyxJQUFBO0FBM0xZLDhEQUF5QiIsImZpbGUiOiJhcHAvY29tcG9uZW50cy9hdHRlbmRhbmNlLXJlcG9ydC9hdHRlbmRhbmNlLXJlcG9ydC5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBSb3V0ZXIgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xyXG5pbXBvcnQgeyBTdHVkZW50U2VydmljZSB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9zdHVkZW50LnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgU3R1ZGVudCB9IGZyb20gXCIuLi8uLi9tb2RlbHMvc3R1ZGVudFwiO1xyXG5pbXBvcnQgeyBDb3Vyc2VTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL2NvdXJzZS5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IENvdXJzZSB9IGZyb20gXCIuLi8uLi9tb2RlbHMvY291cnNlXCI7XHJcbmRlY2xhcmUgdmFyIG1vbWVudDogYW55O1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogJ2F0dGVuZGFuY2VSZXBvcnRDb21wb25ldCcsXHJcbiAgICB0ZW1wbGF0ZVVybDogJy4vYXBwL2NvbXBvbmVudHMvYXR0ZW5kYW5jZS1yZXBvcnQvYXR0ZW5kYW5jZS1yZXBvcnQuY29tcG9uZW50Lmh0bWwnLFxyXG4gICAgc3R5bGVVcmxzOiBbJy4vYXBwL2NvbXBvbmVudHMvYXR0ZW5kYW5jZS1yZXBvcnQvYXR0ZW5kYW5jZS1yZXBvcnQuY29tcG9uZW50LmNzcyddXHJcbn0pXHJcblxyXG5leHBvcnQgY2xhc3MgQXR0ZW5kYW5jZVJlcG9ydENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgICBkYXRhOiBhbnk7XHJcbiAgICBjb3Vyc2VzOiBDb3Vyc2VbXTtcclxuICAgIHN0dWRlbnRzOiBTdHVkZW50W107XHJcbiAgICB0b3RhbEFic2VuY2VzOiBhbnk7XHJcblxyXG4gICAgc3R1ZGVudEF0dGVuZGFuY2VWaWV3OiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBzdHVkZW50OiBhbnlbXTtcclxuICAgIGF0dGVuZGFuY2U6IGFueVtdO1xyXG4gICAgcmVjb3JkcyA9IFtdO1xyXG4gICAgdG90YWxQcmVzZW50OiBhbnk7XHJcbiAgICB0b3RhbEFic2VudDogYW55O1xyXG4gICAgdG90YWxNYWRlQ29udGFjdDogYW55O1xyXG4gICAgbm9BdHRlbmRhbmNlOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gICAgc3R1ZGVudFJlcG9ydDogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICAgIHRpbWV0YWJsZXM6IGFueVtdO1xyXG5cclxuICAgIGNvdXJzZUF0dGVuZGFuY2VWaWV3OiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBjb3Vyc2U6IGFueTtcclxuICAgIGNsYXNzVGltZVN0cjogYW55O1xyXG4gICAgY291cnNlRGF0YTogYW55W107XHJcbiAgICBjb3Vyc2VTdHVkZW50czogYW55W107XHJcbiAgICBjb3Vyc2VUaW1ldGFibGVzOiBhbnlbXTtcclxuICAgIHN0dWRlbnRSZWNvcmQ6IGFueVtdO1xyXG4gICAgbm9TdHVkZW50c0Vucm9sbGVkOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gICAgY2xhc3NBYnNlbmNlVG90YWw6IGFueTtcclxuICAgIGNsYXNzUHJlc2VuY2VUb3RhbDogYW55O1xyXG4gICAgY2xhc3NNYWRlQ29udGFjdFRvdGFsOiBhbnk7XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSByb3V0ZXI6IFJvdXRlciwgcHJpdmF0ZSBzdHVkZW50U2VydmljZTogU3R1ZGVudFNlcnZpY2UsIHByaXZhdGUgY291cnNlU2VydmljZTogQ291cnNlU2VydmljZSkge1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBuZ09uSW5pdCgpIHtcclxuICAgICAgICB0aGlzLnN0dWRlbnRTZXJ2aWNlXHJcbiAgICAgICAgICAgIC5nZXRBbGxBdHRlbmRhbmNlKClcclxuICAgICAgICAgICAgLnRoZW4oYXR0ZW5kYW5jZSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoYXR0ZW5kYW5jZS5zdGF0dXMgPT09IFwiNDAzXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRhdGEgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRhdGEgPSBhdHRlbmRhbmNlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ2V0U3R1ZGVudHMoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLmNhdGNoKGVycm9yID0+IGNvbnNvbGUubG9nKGVycm9yKSk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0U3R1ZGVudHMoKSB7XHJcbiAgICAgICAgdGhpcy5zdHVkZW50U2VydmljZVxyXG4gICAgICAgICAgICAuZ2V0U3R1ZGVudHMoKVxyXG4gICAgICAgICAgICAudGhlbihzdHVkZW50cyA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoKHN0dWRlbnRzIGFzIGFueSkuc3RhdHVzID09PSBcIjQwM1wiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdHVkZW50cyA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3R1ZGVudHMgPSBzdHVkZW50cztcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBzdHVkZW50IG9mIHRoaXMuc3R1ZGVudHMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3R1ZGVudC5mdWxsTmFtZSA9IHN0dWRlbnQuZmlyc3ROYW1lICsgXCIgXCIgKyBzdHVkZW50Lmxhc3ROYW1lO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMuZ2V0Q291cnNlcygpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuY2F0Y2goZXJyb3IgPT4gY29uc29sZS5sb2coZXJyb3IpKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRDb3Vyc2VzKCkge1xyXG4gICAgICAgIHRoaXMuY291cnNlU2VydmljZVxyXG4gICAgICAgICAgICAuZ2V0Q291cnNlcygpXHJcbiAgICAgICAgICAgIC50aGVuKHJlc3VsdCA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoKHJlc3VsdCBhcyBhbnkpLnN0YXR1cyA9PT0gXCI0MDNcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY291cnNlcyA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vZm9ybWF0IGRhdGV0aW1lXHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0LmZvckVhY2goKGl0ZW0pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5jb3Vyc2VTdGFydCA9IG1vbWVudChpdGVtLmNvdXJzZVN0YXJ0KS5mb3JtYXQoJ1lZWVktTU0tREQnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5jb3Vyc2VFbmQgPSBtb21lbnQoaXRlbS5jb3Vyc2VFbmQpLmZvcm1hdCgnWVlZWS1NTS1ERCcpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBpdGVtLmNsYXNzU3RhcnRUaW1lID0gbW9tZW50KGl0ZW0uY2xhc3NTdGFydFRpbWUpLmZvcm1hdCgnaGg6bW0gQScpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBpdGVtLmNsYXNzRW5kVGltZSA9IG1vbWVudChpdGVtLmNsYXNzRW5kVGltZSkuZm9ybWF0KCdoaDptbSBBJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb3Vyc2VzID0gcmVzdWx0O1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ2V0VGltZXRhYmxlcygpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLmNhdGNoKGVycm9yID0+IGNvbnNvbGUubG9nKGVycm9yKSk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0VGltZXRhYmxlcygpIHtcclxuICAgICAgICB0aGlzLnN0dWRlbnRTZXJ2aWNlXHJcbiAgICAgICAgICAgIC5nZXRUaW1ldGFibGVzKClcclxuICAgICAgICAgICAgLnRoZW4ocmVzdWx0ID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChyZXN1bHQuc3RhdHVzID09PSBcIjQwM1wiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50aW1ldGFibGVzID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50aW1ldGFibGVzID0gcmVzdWx0O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuY2F0Y2goZXJyb3IgPT4gY29uc29sZS5sb2coZXJyb3IpKTtcclxuICAgIH1cclxuXHJcbiAgICB2aWV3U3R1ZGVudFJlcG9ydChzdHVkZW50OiBTdHVkZW50KSB7XHJcbiAgICAgICAgdGhpcy5yZWNvcmRzID0gW107XHJcbiAgICAgICAgdGhpcy5zdHVkZW50QXR0ZW5kYW5jZVZpZXcgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuYXR0ZW5kYW5jZSA9IHRoaXMuZGF0YS5maWx0ZXIoeCA9PiB4LnVzZXJJRCA9PT0gc3R1ZGVudC51c2VySUQpO1xyXG4gICAgICAgIHRoaXMuc3R1ZGVudCA9IHRoaXMuc3R1ZGVudHMuZmlsdGVyKHggPT4geC5zdHVkZW50SUQgPT09IHN0dWRlbnQuc3R1ZGVudElEKTtcclxuICAgICAgICB0aGlzLnN0dWRlbnQgPSB0aGlzLnN0dWRlbnRbMF07XHJcbiAgICAgICAgdGhpcy50b3RhbFByZXNlbnQgPSB0aGlzLmF0dGVuZGFuY2UuZmlsdGVyKHggPT4geC5hdHRlbmRhbmNlVmFsdWUgPT09ICdQJykubGVuZ3RoO1xyXG4gICAgICAgIHRoaXMudG90YWxBYnNlbnQgPSB0aGlzLmF0dGVuZGFuY2UuZmlsdGVyKHggPT4geC5hdHRlbmRhbmNlVmFsdWUgPT09ICdBJykubGVuZ3RoO1xyXG4gICAgICAgIHRoaXMudG90YWxNYWRlQ29udGFjdCA9IHRoaXMuYXR0ZW5kYW5jZS5maWx0ZXIoeCA9PiB4LmF0dGVuZGFuY2VWYWx1ZSA9PT0gJ01DJykubGVuZ3RoO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5hdHRlbmRhbmNlLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICB0aGlzLm5vQXR0ZW5kYW5jZSA9IHRydWU7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5ub0F0dGVuZGFuY2UgPSBmYWxzZTtcclxuICAgICAgICAgICAgZm9yIChsZXQgaXRlbSBvZiB0aGlzLmF0dGVuZGFuY2UpIHtcclxuICAgICAgICAgICAgICAgIHZhciBjb3Vyc2UgPSB0aGlzLmNvdXJzZXMuZmlsdGVyKHggPT4geC5jb3Vyc2VJRCA9PT0gaXRlbS5jb3Vyc2VJRCk7XHJcbiAgICAgICAgICAgICAgICB2YXIgYXR0ZW5kYW5jZSA9IHtcclxuICAgICAgICAgICAgICAgICAgICBjb3Vyc2U6IGNvdXJzZSxcclxuICAgICAgICAgICAgICAgICAgICBkYXRlOiBpdGVtLmRhdGUsXHJcbiAgICAgICAgICAgICAgICAgICAgYXR0ZW5kYW5jZVZhbHVlOiBpdGVtLmF0dGVuZGFuY2VWYWx1ZVxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIHRoaXMucmVjb3Jkcy5wdXNoKGF0dGVuZGFuY2UpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICB2aWV3Q291cnNlUmVwb3J0KGNvdXJzZTogQ291cnNlKSB7XHJcbiAgICAgICAgdGhpcy5jb3Vyc2VUaW1ldGFibGVzID0gW107XHJcbiAgICAgICAgdGhpcy5jb3Vyc2VTdHVkZW50cyA9IFtdO1xyXG4gICAgICAgIHRoaXMuY291cnNlQXR0ZW5kYW5jZVZpZXcgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuY291cnNlID0gY291cnNlO1xyXG4gICAgICAgIHRoaXMuY2xhc3NUaW1lU3RyID0gdGhpcy5jb3Vyc2UuY2xhc3NUaW1lU3RyO1xyXG5cclxuICAgICAgICB0aGlzLmNsYXNzQWJzZW5jZVRvdGFsID0gdGhpcy5kYXRhLmZpbHRlcih4ID0+IHguY291cnNlSUQgPT09IGNvdXJzZS5jb3Vyc2VJRCAmJiB4LmF0dGVuZGFuY2VWYWx1ZSA9PT0gJ0EnKS5sZW5ndGg7XHJcbiAgICAgICAgdGhpcy5jbGFzc1ByZXNlbmNlVG90YWwgPSB0aGlzLmRhdGEuZmlsdGVyKHggPT4geC5jb3Vyc2VJRCA9PT0gY291cnNlLmNvdXJzZUlEICYmIHguYXR0ZW5kYW5jZVZhbHVlID09PSAnUCcpLmxlbmd0aDtcclxuICAgICAgICB0aGlzLmNsYXNzTWFkZUNvbnRhY3RUb3RhbCA9IHRoaXMuZGF0YS5maWx0ZXIoeCA9PiB4LmNvdXJzZUlEID09PSBjb3Vyc2UuY291cnNlSUQgJiYgeC5hdHRlbmRhbmNlVmFsdWUgPT09ICdNQycpLmxlbmd0aDtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuY2xhc3NUaW1lU3RyKSB7XHJcbiAgICAgICAgICB2YXIgYXJyYXkgPSB0aGlzLmNsYXNzVGltZVN0ci5zcGxpdCgnLCcpO1xyXG4gICAgICAgICAgdGhpcy5jbGFzc1RpbWVTdHIgPSBbXTtcclxuICAgICAgICAgIGZvciAobGV0IGl0ZW0gb2YgYXJyYXkpIHtcclxuICAgICAgICAgICAgdmFyIGRhdGUgPSBpdGVtLnNwbGl0KCcgJyk7XHJcbiAgICAgICAgICAgIC8vIHZhciBkYXkgPSBkYXRlWzBdO1xyXG4gICAgICAgICAgICAvLyB2YXIgdGltZSA9IGRhdGVbMV07XHJcbiAgICAgICAgICAgIC8vIHZhciBzdGFydFRpbWUgPSB0aW1lLnNwbGl0KCctJylbMF07XHJcbiAgICAgICAgICAgIC8vIHZhciBlbmRUaW1lID0gdGltZS5zcGxpdCgnLScpWzFdO1xyXG4gICAgICAgICAgICB0aGlzLmNsYXNzVGltZVN0ci5wdXNoKGRhdGUpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdmFyIHN0dWRlbnRJbmZvO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5kYXRhLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICB0aGlzLm5vQXR0ZW5kYW5jZSA9IHRydWU7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5ub0F0dGVuZGFuY2UgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5jb3Vyc2VUaW1ldGFibGVzID0gdGhpcy50aW1ldGFibGVzLmZpbHRlcih4ID0+IHguY291cnNlSUQgPT09IGNvdXJzZS5jb3Vyc2VJRCk7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGl0ZW0gb2YgdGhpcy5jb3Vyc2VUaW1ldGFibGVzKSB7XHJcbiAgICAgICAgICAgICAgICBzdHVkZW50SW5mbyA9IHtcclxuICAgICAgICAgICAgICAgICAgICBzdHVkZW50OiB0aGlzLnN0dWRlbnRzLmZpbHRlcih4ID0+IHgudXNlcklEID09PSBpdGVtLnVzZXJJRClbMF0sXHJcbiAgICAgICAgICAgICAgICAgICAgc3RhcnREYXRlOiBpdGVtLnN0YXJ0RGF0ZSxcclxuICAgICAgICAgICAgICAgICAgICBlbmREYXRlOiBpdGVtLmVuZERhdGUsXHJcbiAgICAgICAgICAgICAgICAgICAgYXR0ZW5kYW5jZUluZm86IHRoaXMuZGF0YS5maWx0ZXIoeCA9PiB4LnVzZXJJRCA9PT0gaXRlbS51c2VySUQgJiYgeC5jb3Vyc2VJRCA9PT0gY291cnNlLmNvdXJzZUlEKVxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY291cnNlU3R1ZGVudHMucHVzaChzdHVkZW50SW5mbyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmNvdXJzZVN0dWRlbnRzLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgdGhpcy5ub1N0dWRlbnRzRW5yb2xsZWQgPSB0cnVlO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB0aGlzLm5vU3R1ZGVudHNFbnJvbGxlZCA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBvdmVyYWxsU3RhdHVzKCkge1xyXG4gICAgICAgIHRoaXMuY291cnNlQXR0ZW5kYW5jZVZpZXcgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnN0dWRlbnRBdHRlbmRhbmNlVmlldyA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMubm9BdHRlbmRhbmNlID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgZ29CYWNrKCkge1xyXG4gICAgICAgIHdpbmRvdy5oaXN0b3J5LmJhY2soKTtcclxuICAgIH1cclxufVxyXG4iXX0=
