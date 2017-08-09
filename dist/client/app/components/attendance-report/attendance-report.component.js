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
var AttendanceReportComponent = (function () {
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NsaWVudC9hcHAvY29tcG9uZW50cy9hdHRlbmRhbmNlLXJlcG9ydC9hdHRlbmRhbmNlLXJlcG9ydC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxzQ0FBa0Q7QUFDbEQsMENBQXlDO0FBQ3pDLGtFQUFnRTtBQUVoRSxnRUFBOEQ7QUFVOUQ7SUFnQ0ksbUNBQW9CLE1BQWMsRUFBVSxjQUE4QixFQUFVLGFBQTRCO1FBQTVGLFdBQU0sR0FBTixNQUFNLENBQVE7UUFBVSxtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFBVSxrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQTFCaEgsMEJBQXFCLEdBQVksS0FBSyxDQUFDO1FBR3ZDLFlBQU8sR0FBRyxFQUFFLENBQUM7UUFJYixpQkFBWSxHQUFZLEtBQUssQ0FBQztRQUU5QixrQkFBYSxHQUFZLEtBQUssQ0FBQztRQUkvQix5QkFBb0IsR0FBWSxLQUFLLENBQUM7UUFPdEMsdUJBQWtCLEdBQVksS0FBSyxDQUFDO0lBUXBDLENBQUM7SUFFRCw0Q0FBUSxHQUFSO1FBQUEsaUJBWUM7UUFYRyxJQUFJLENBQUMsY0FBYzthQUNkLGdCQUFnQixFQUFFO2FBQ2xCLElBQUksQ0FBQyxVQUFBLFVBQVU7WUFDWixFQUFFLENBQUMsQ0FBQyxVQUFVLENBQUMsTUFBTSxLQUFLLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQzlCLEtBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1lBQ3JCLENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDSixLQUFJLENBQUMsSUFBSSxHQUFHLFVBQVUsQ0FBQztnQkFDdkIsS0FBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1lBQ3ZCLENBQUM7UUFDTCxDQUFDLENBQUM7YUFDRCxLQUFLLENBQUMsVUFBQSxLQUFLLElBQUksT0FBQSxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUFsQixDQUFrQixDQUFDLENBQUM7SUFDNUMsQ0FB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R0FBRyxLQUFLLENBQUM7UUFDbEMsSUFBSSxDQUFDLHFCQUFxQixHQUFHLEtBQUssQ0FBQztRQUNuQyxJQUFJLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQztJQUM5QixDQUFDO0lBRUQsMENBQU0sR0FBTjtRQUNJLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDMUIsQ0FBQztJQTFMUSx5QkFBeUI7UUFOckMsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSwwQkFBMEI7WUFDcEMsV0FBVyxFQUFFLHFFQUFxRTtZQUNsRixTQUFTLEVBQUUsQ0FBQyxvRUFBb0UsQ0FBQztTQUNwRixDQUFDO3lDQWtDOEIsZUFBTSxFQUEwQixnQ0FBYyxFQUF5Qiw4QkFBYTtPQWhDdkcseUJBQXlCLENBMkxyQztJQUFELGdDQUFDO0NBM0xELEFBMkxDLElBQUE7QUEzTFksOERBQXlCIiwiZmlsZSI6ImFwcC9jb21wb25lbnRzL2F0dGVuZGFuY2UtcmVwb3J0L2F0dGVuZGFuY2UtcmVwb3J0LmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcbmltcG9ydCB7IFN0dWRlbnRTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL3N0dWRlbnQuc2VydmljZVwiO1xyXG5pbXBvcnQgeyBTdHVkZW50IH0gZnJvbSBcIi4uLy4uL21vZGVscy9zdHVkZW50XCI7XHJcbmltcG9ydCB7IENvdXJzZVNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvY291cnNlLnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgQ291cnNlIH0gZnJvbSBcIi4uLy4uL21vZGVscy9jb3Vyc2VcIjtcclxuZGVjbGFyZSB2YXIgbW9tZW50OiBhbnk7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiAnYXR0ZW5kYW5jZVJlcG9ydENvbXBvbmV0JyxcclxuICAgIHRlbXBsYXRlVXJsOiAnLi9hcHAvY29tcG9uZW50cy9hdHRlbmRhbmNlLXJlcG9ydC9hdHRlbmRhbmNlLXJlcG9ydC5jb21wb25lbnQuaHRtbCcsXHJcbiAgICBzdHlsZVVybHM6IFsnLi9hcHAvY29tcG9uZW50cy9hdHRlbmRhbmNlLXJlcG9ydC9hdHRlbmRhbmNlLXJlcG9ydC5jb21wb25lbnQuY3NzJ11cclxufSlcclxuXHJcbmV4cG9ydCBjbGFzcyBBdHRlbmRhbmNlUmVwb3J0Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuICAgIGRhdGE6IGFueTtcclxuICAgIGNvdXJzZXM6IENvdXJzZVtdO1xyXG4gICAgc3R1ZGVudHM6IFN0dWRlbnRbXTtcclxuICAgIHRvdGFsQWJzZW5jZXM6IGFueTtcclxuXHJcbiAgICBzdHVkZW50QXR0ZW5kYW5jZVZpZXc6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIHN0dWRlbnQ6IGFueVtdO1xyXG4gICAgYXR0ZW5kYW5jZTogYW55W107XHJcbiAgICByZWNvcmRzID0gW107XHJcbiAgICB0b3RhbFByZXNlbnQ6IGFueTtcclxuICAgIHRvdGFsQWJzZW50OiBhbnk7XHJcbiAgICB0b3RhbE1hZGVDb250YWN0OiBhbnk7XHJcbiAgICBub0F0dGVuZGFuY2U6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgICBzdHVkZW50UmVwb3J0OiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gICAgdGltZXRhYmxlczogYW55W107XHJcblxyXG4gICAgY291cnNlQXR0ZW5kYW5jZVZpZXc6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIGNvdXJzZTogYW55O1xyXG4gICAgY2xhc3NUaW1lU3RyOiBhbnk7XHJcbiAgICBjb3Vyc2VEYXRhOiBhbnlbXTtcclxuICAgIGNvdXJzZVN0dWRlbnRzOiBhbnlbXTtcclxuICAgIGNvdXJzZVRpbWV0YWJsZXM6IGFueVtdO1xyXG4gICAgc3R1ZGVudFJlY29yZDogYW55W107XHJcbiAgICBub1N0dWRlbnRzRW5yb2xsZWQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgICBjbGFzc0Fic2VuY2VUb3RhbDogYW55O1xyXG4gICAgY2xhc3NQcmVzZW5jZVRvdGFsOiBhbnk7XHJcbiAgICBjbGFzc01hZGVDb250YWN0VG90YWw6IGFueTtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJvdXRlcjogUm91dGVyLCBwcml2YXRlIHN0dWRlbnRTZXJ2aWNlOiBTdHVkZW50U2VydmljZSwgcHJpdmF0ZSBjb3Vyc2VTZXJ2aWNlOiBDb3Vyc2VTZXJ2aWNlKSB7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIG5nT25Jbml0KCkge1xyXG4gICAgICAgIHRoaXMuc3R1ZGVudFNlcnZpY2VcclxuICAgICAgICAgICAgLmdldEFsbEF0dGVuZGFuY2UoKVxyXG4gICAgICAgICAgICAudGhlbihhdHRlbmRhbmNlID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChhdHRlbmRhbmNlLnN0YXR1cyA9PT0gXCI0MDNcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGF0YSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGF0YSA9IGF0dGVuZGFuY2U7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5nZXRTdHVkZW50cygpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuY2F0Y2goZXJyb3IgPT4gY29uc29sZS5sb2coZXJyb3IpKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRTdHVkZW50cygpIHtcclxuICAgICAgICB0aGlzLnN0dWRlbnRTZXJ2aWNlXHJcbiAgICAgICAgICAgIC5nZXRTdHVkZW50cygpXHJcbiAgICAgICAgICAgIC50aGVuKHN0dWRlbnRzID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChzdHVkZW50cy5zdGF0dXMgPT09IFwiNDAzXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0dWRlbnRzID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdHVkZW50cyA9IHN0dWRlbnRzO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IHN0dWRlbnQgb2YgdGhpcy5zdHVkZW50cykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdHVkZW50LmZ1bGxOYW1lID0gc3R1ZGVudC5maXJzdE5hbWUgKyBcIiBcIiArIHN0dWRlbnQubGFzdE5hbWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5nZXRDb3Vyc2VzKCk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5jYXRjaChlcnJvciA9PiBjb25zb2xlLmxvZyhlcnJvcikpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldENvdXJzZXMoKSB7XHJcbiAgICAgICAgdGhpcy5jb3Vyc2VTZXJ2aWNlXHJcbiAgICAgICAgICAgIC5nZXRDb3Vyc2VzKClcclxuICAgICAgICAgICAgLnRoZW4ocmVzdWx0ID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChyZXN1bHQuc3RhdHVzID09PSBcIjQwM1wiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb3Vyc2VzID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9mb3JtYXQgZGF0ZXRpbWVcclxuICAgICAgICAgICAgICAgICAgICByZXN1bHQuZm9yRWFjaCgoaXRlbSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtLmNvdXJzZVN0YXJ0ID0gbW9tZW50KGl0ZW0uY291cnNlU3RhcnQpLmZvcm1hdCgnWVlZWS1NTS1ERCcpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtLmNvdXJzZUVuZCA9IG1vbWVudChpdGVtLmNvdXJzZUVuZCkuZm9ybWF0KCdZWVlZLU1NLUREJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGl0ZW0uY2xhc3NTdGFydFRpbWUgPSBtb21lbnQoaXRlbS5jbGFzc1N0YXJ0VGltZSkuZm9ybWF0KCdoaDptbSBBJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGl0ZW0uY2xhc3NFbmRUaW1lID0gbW9tZW50KGl0ZW0uY2xhc3NFbmRUaW1lKS5mb3JtYXQoJ2hoOm1tIEEnKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvdXJzZXMgPSByZXN1bHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5nZXRUaW1ldGFibGVzKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuY2F0Y2goZXJyb3IgPT4gY29uc29sZS5sb2coZXJyb3IpKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRUaW1ldGFibGVzKCkge1xyXG4gICAgICAgIHRoaXMuc3R1ZGVudFNlcnZpY2VcclxuICAgICAgICAgICAgLmdldFRpbWV0YWJsZXMoKVxyXG4gICAgICAgICAgICAudGhlbihyZXN1bHQgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHJlc3VsdC5zdGF0dXMgPT09IFwiNDAzXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnRpbWV0YWJsZXMgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnRpbWV0YWJsZXMgPSByZXN1bHQ7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5jYXRjaChlcnJvciA9PiBjb25zb2xlLmxvZyhlcnJvcikpO1xyXG4gICAgfVxyXG5cclxuICAgIHZpZXdTdHVkZW50UmVwb3J0KHN0dWRlbnQ6IFN0dWRlbnQpIHtcclxuICAgICAgICB0aGlzLnJlY29yZHMgPSBbXTtcclxuICAgICAgICB0aGlzLnN0dWRlbnRBdHRlbmRhbmNlVmlldyA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5hdHRlbmRhbmNlID0gdGhpcy5kYXRhLmZpbHRlcih4ID0+IHgudXNlcklEID09PSBzdHVkZW50LnVzZXJJRCk7XHJcbiAgICAgICAgdGhpcy5zdHVkZW50ID0gdGhpcy5zdHVkZW50cy5maWx0ZXIoeCA9PiB4LnN0dWRlbnRJRCA9PT0gc3R1ZGVudC5zdHVkZW50SUQpO1xyXG4gICAgICAgIHRoaXMuc3R1ZGVudCA9IHRoaXMuc3R1ZGVudFswXTtcclxuICAgICAgICB0aGlzLnRvdGFsUHJlc2VudCA9IHRoaXMuYXR0ZW5kYW5jZS5maWx0ZXIoeCA9PiB4LmF0dGVuZGFuY2VWYWx1ZSA9PT0gJ1AnKS5sZW5ndGg7XHJcbiAgICAgICAgdGhpcy50b3RhbEFic2VudCA9IHRoaXMuYXR0ZW5kYW5jZS5maWx0ZXIoeCA9PiB4LmF0dGVuZGFuY2VWYWx1ZSA9PT0gJ0EnKS5sZW5ndGg7XHJcbiAgICAgICAgdGhpcy50b3RhbE1hZGVDb250YWN0ID0gdGhpcy5hdHRlbmRhbmNlLmZpbHRlcih4ID0+IHguYXR0ZW5kYW5jZVZhbHVlID09PSAnTUMnKS5sZW5ndGg7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmF0dGVuZGFuY2UubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMubm9BdHRlbmRhbmNlID0gdHJ1ZTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLm5vQXR0ZW5kYW5jZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpdGVtIG9mIHRoaXMuYXR0ZW5kYW5jZSkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGNvdXJzZSA9IHRoaXMuY291cnNlcy5maWx0ZXIoeCA9PiB4LmNvdXJzZUlEID09PSBpdGVtLmNvdXJzZUlEKTtcclxuICAgICAgICAgICAgICAgIHZhciBhdHRlbmRhbmNlID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvdXJzZTogY291cnNlLFxyXG4gICAgICAgICAgICAgICAgICAgIGRhdGU6IGl0ZW0uZGF0ZSxcclxuICAgICAgICAgICAgICAgICAgICBhdHRlbmRhbmNlVmFsdWU6IGl0ZW0uYXR0ZW5kYW5jZVZhbHVlXHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZWNvcmRzLnB1c2goYXR0ZW5kYW5jZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHZpZXdDb3Vyc2VSZXBvcnQoY291cnNlOiBDb3Vyc2UpIHtcclxuICAgICAgICB0aGlzLmNvdXJzZVRpbWV0YWJsZXMgPSBbXTtcclxuICAgICAgICB0aGlzLmNvdXJzZVN0dWRlbnRzID0gW107XHJcbiAgICAgICAgdGhpcy5jb3Vyc2VBdHRlbmRhbmNlVmlldyA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5jb3Vyc2UgPSBjb3Vyc2U7XHJcbiAgICAgICAgdGhpcy5jbGFzc1RpbWVTdHIgPSB0aGlzLmNvdXJzZS5jbGFzc1RpbWVTdHI7XHJcblxyXG4gICAgICAgIHRoaXMuY2xhc3NBYnNlbmNlVG90YWwgPSB0aGlzLmRhdGEuZmlsdGVyKHggPT4geC5jb3Vyc2VJRCA9PT0gY291cnNlLmNvdXJzZUlEICYmIHguYXR0ZW5kYW5jZVZhbHVlID09PSAnQScpLmxlbmd0aDtcclxuICAgICAgICB0aGlzLmNsYXNzUHJlc2VuY2VUb3RhbCA9IHRoaXMuZGF0YS5maWx0ZXIoeCA9PiB4LmNvdXJzZUlEID09PSBjb3Vyc2UuY291cnNlSUQgJiYgeC5hdHRlbmRhbmNlVmFsdWUgPT09ICdQJykubGVuZ3RoO1xyXG4gICAgICAgIHRoaXMuY2xhc3NNYWRlQ29udGFjdFRvdGFsID0gdGhpcy5kYXRhLmZpbHRlcih4ID0+IHguY291cnNlSUQgPT09IGNvdXJzZS5jb3Vyc2VJRCAmJiB4LmF0dGVuZGFuY2VWYWx1ZSA9PT0gJ01DJykubGVuZ3RoO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5jbGFzc1RpbWVTdHIpIHtcclxuICAgICAgICAgIHZhciBhcnJheSA9IHRoaXMuY2xhc3NUaW1lU3RyLnNwbGl0KCcsJyk7XHJcbiAgICAgICAgICB0aGlzLmNsYXNzVGltZVN0ciA9IFtdO1xyXG4gICAgICAgICAgZm9yIChsZXQgaXRlbSBvZiBhcnJheSkge1xyXG4gICAgICAgICAgICB2YXIgZGF0ZSA9IGl0ZW0uc3BsaXQoJyAnKTtcclxuICAgICAgICAgICAgLy8gdmFyIGRheSA9IGRhdGVbMF07XHJcbiAgICAgICAgICAgIC8vIHZhciB0aW1lID0gZGF0ZVsxXTtcclxuICAgICAgICAgICAgLy8gdmFyIHN0YXJ0VGltZSA9IHRpbWUuc3BsaXQoJy0nKVswXTtcclxuICAgICAgICAgICAgLy8gdmFyIGVuZFRpbWUgPSB0aW1lLnNwbGl0KCctJylbMV07XHJcbiAgICAgICAgICAgIHRoaXMuY2xhc3NUaW1lU3RyLnB1c2goZGF0ZSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2YXIgc3R1ZGVudEluZm87XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmRhdGEubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMubm9BdHRlbmRhbmNlID0gdHJ1ZTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLm5vQXR0ZW5kYW5jZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLmNvdXJzZVRpbWV0YWJsZXMgPSB0aGlzLnRpbWV0YWJsZXMuZmlsdGVyKHggPT4geC5jb3Vyc2VJRCA9PT0gY291cnNlLmNvdXJzZUlEKTtcclxuICAgICAgICAgICAgZm9yIChsZXQgaXRlbSBvZiB0aGlzLmNvdXJzZVRpbWV0YWJsZXMpIHtcclxuICAgICAgICAgICAgICAgIHN0dWRlbnRJbmZvID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIHN0dWRlbnQ6IHRoaXMuc3R1ZGVudHMuZmlsdGVyKHggPT4geC51c2VySUQgPT09IGl0ZW0udXNlcklEKVswXSxcclxuICAgICAgICAgICAgICAgICAgICBzdGFydERhdGU6IGl0ZW0uc3RhcnREYXRlLFxyXG4gICAgICAgICAgICAgICAgICAgIGVuZERhdGU6IGl0ZW0uZW5kRGF0ZSxcclxuICAgICAgICAgICAgICAgICAgICBhdHRlbmRhbmNlSW5mbzogdGhpcy5kYXRhLmZpbHRlcih4ID0+IHgudXNlcklEID09PSBpdGVtLnVzZXJJRCAmJiB4LmNvdXJzZUlEID09PSBjb3Vyc2UuY291cnNlSUQpXHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jb3Vyc2VTdHVkZW50cy5wdXNoKHN0dWRlbnRJbmZvKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMuY291cnNlU3R1ZGVudHMubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICB0aGlzLm5vU3R1ZGVudHNFbnJvbGxlZCA9IHRydWU7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHRoaXMubm9TdHVkZW50c0Vucm9sbGVkID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG92ZXJhbGxTdGF0dXMoKSB7XHJcbiAgICAgICAgdGhpcy5jb3Vyc2VBdHRlbmRhbmNlVmlldyA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuc3R1ZGVudEF0dGVuZGFuY2VWaWV3ID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5ub0F0dGVuZGFuY2UgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBnb0JhY2soKSB7XHJcbiAgICAgICAgd2luZG93Lmhpc3RvcnkuYmFjaygpO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==
