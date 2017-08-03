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
                    item.classStartTime = moment(item.classStartTime).format('hh:mm A');
                    item.classEndTime = moment(item.classEndTime).format('hh:mm A');
                });
                _this.courses = result;
            }
        })
            .catch(function (error) { return console.log(error); });
    };
    AttendanceReportComponent.prototype.viewStudentReport = function (student) {
        this.records = [];
        this.studentAttendanceView = true;
        this.attendance = this.data.filter(function (x) { return x.studentID === student.studentID; });
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
        this.courseAttendanceView = true;
        this.course = course;
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NsaWVudC9hcHAvY29tcG9uZW50cy9hdHRlbmRhbmNlLXJlcG9ydC9hdHRlbmRhbmNlLXJlcG9ydC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxzQ0FBa0Q7QUFDbEQsMENBQXlDO0FBQ3pDLGtFQUFnRTtBQUVoRSxnRUFBOEQ7QUFVOUQ7SUFvQkUsbUNBQW9CLE1BQWMsRUFBVSxjQUE4QixFQUFVLGFBQTRCO1FBQTVGLFdBQU0sR0FBTixNQUFNLENBQVE7UUFBVSxtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFBVSxrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQWRoSCwwQkFBcUIsR0FBWSxLQUFLLENBQUM7UUFHdkMsWUFBTyxHQUFHLEVBQUUsQ0FBQztRQUliLGlCQUFZLEdBQVksS0FBSyxDQUFDO1FBRTlCLGtCQUFhLEdBQVksS0FBSyxDQUFDO1FBRS9CLHlCQUFvQixHQUFZLEtBQUssQ0FBQztJQUt0QyxDQUFDO0lBRUQsNENBQVEsR0FBUjtRQUFBLGlCQVlDO1FBWEMsSUFBSSxDQUFDLGNBQWM7YUFDbEIsZ0JBQWdCLEVBQUU7YUFDbEIsSUFBSSxDQUFDLFVBQUEsVUFBVTtZQUNkLEVBQUUsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxNQUFNLEtBQUssS0FBSyxDQUFDLENBQUMsQ0FBQztnQkFDaEMsS0FBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7WUFDbkIsQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNOLEtBQUksQ0FBQyxJQUFJLEdBQUcsVUFBVSxDQUFDO2dCQUN2QixLQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDckIsQ0FBQztRQUNILENBQUMsQ0FBQzthQUNELEtBQUssQ0FBQyxVQUFBLEtBQUssSUFBSSxPQUFBLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEVBQWxCLENBQWtCLENBQUMsQ0FBQztJQUN0QyxDQUFDO0lBRUQsK0NBQVcsR0FBWDtRQUFBLGlCQVlD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QUNqQyxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztJQUN2QixDQUFDO0lBRUQsaURBQWEsR0FBYjtRQUNFLElBQUksQ0FBQyxvQkFBb0IsR0FBRyxLQUFLLENBQUM7UUFDbEMsSUFBSSxDQUFDLHFCQUFxQixHQUFHLEtBQUssQ0FBQztRQUNuQyxJQUFJLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQztJQUM1QixDQUFDO0lBRUQsMENBQU0sR0FBTjtRQUNFLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDeEIsQ0FBQztJQWpIVSx5QkFBeUI7UUFOckMsZ0JBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSwwQkFBMEI7WUFDcEMsV0FBVyxFQUFFLHFFQUFxRTtZQUNsRixTQUFTLEVBQUUsQ0FBQyxvRUFBb0UsQ0FBQztTQUNsRixDQUFDO3lDQXNCNEIsZUFBTSxFQUEwQixnQ0FBYyxFQUF5Qiw4QkFBYTtPQXBCckcseUJBQXlCLENBa0hyQztJQUFELGdDQUFDO0NBbEhELEFBa0hDLElBQUE7QUFsSFksOERBQXlCIiwiZmlsZSI6ImFwcC9jb21wb25lbnRzL2F0dGVuZGFuY2UtcmVwb3J0L2F0dGVuZGFuY2UtcmVwb3J0LmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcbmltcG9ydCB7IFN0dWRlbnRTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL3N0dWRlbnQuc2VydmljZVwiO1xyXG5pbXBvcnQgeyBTdHVkZW50IH0gZnJvbSBcIi4uLy4uL21vZGVscy9zdHVkZW50XCI7XHJcbmltcG9ydCB7IENvdXJzZVNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvY291cnNlLnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgQ291cnNlIH0gZnJvbSBcIi4uLy4uL21vZGVscy9jb3Vyc2VcIjtcclxuZGVjbGFyZSB2YXIgbW9tZW50OiBhbnk7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2F0dGVuZGFuY2VSZXBvcnRDb21wb25ldCcsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL2FwcC9jb21wb25lbnRzL2F0dGVuZGFuY2UtcmVwb3J0L2F0dGVuZGFuY2UtcmVwb3J0LmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9hcHAvY29tcG9uZW50cy9hdHRlbmRhbmNlLXJlcG9ydC9hdHRlbmRhbmNlLXJlcG9ydC5jb21wb25lbnQuY3NzJ11cclxufSlcclxuXHJcbmV4cG9ydCBjbGFzcyBBdHRlbmRhbmNlUmVwb3J0Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuICBkYXRhOiBhbnk7XHJcbiAgY291cnNlczogQ291cnNlW107XHJcbiAgc3R1ZGVudHM6IFN0dWRlbnRbXTtcclxuICB0b3RhbEFic2VuY2VzOiBhbnk7XHJcblxyXG4gIHN0dWRlbnRBdHRlbmRhbmNlVmlldzogYm9vbGVhbiA9IGZhbHNlO1xyXG4gIHN0dWRlbnQ6IGFueVtdO1xuICBhdHRlbmRhbmNlOiBhbnlbXTtcclxuICByZWNvcmRzID0gW107XHJcbiAgdG90YWxQcmVzZW50OiBhbnk7XG4gIHRvdGFsQWJzZW50OiBhbnk7XG4gIHRvdGFsTWFkZUNvbnRhY3Q6IGFueTtcclxuICBub0F0dGVuZGFuY2U6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgc3R1ZGVudFJlcG9ydDogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICBjb3Vyc2VBdHRlbmRhbmNlVmlldzogYm9vbGVhbiA9IGZhbHNlO1xyXG4gIGNvdXJzZTogYW55O1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJvdXRlcjogUm91dGVyLCBwcml2YXRlIHN0dWRlbnRTZXJ2aWNlOiBTdHVkZW50U2VydmljZSwgcHJpdmF0ZSBjb3Vyc2VTZXJ2aWNlOiBDb3Vyc2VTZXJ2aWNlKSB7XHJcblxyXG4gIH1cclxuXHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgICB0aGlzLnN0dWRlbnRTZXJ2aWNlXHJcbiAgICAuZ2V0QWxsQXR0ZW5kYW5jZSgpXHJcbiAgICAudGhlbihhdHRlbmRhbmNlID0+IHtcclxuICAgICAgaWYgKGF0dGVuZGFuY2Uuc3RhdHVzID09PSBcIjQwM1wiKSB7XHJcbiAgICAgICAgdGhpcy5kYXRhID0gbnVsbDtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLmRhdGEgPSBhdHRlbmRhbmNlO1xyXG4gICAgICAgIHRoaXMuZ2V0U3R1ZGVudHMoKTtcclxuICAgICAgfVxyXG4gICAgfSlcclxuICAgIC5jYXRjaChlcnJvciA9PiBjb25zb2xlLmxvZyhlcnJvcikpO1xyXG4gIH1cclxuXHJcbiAgZ2V0U3R1ZGVudHMoKSB7XHJcbiAgICB0aGlzLnN0dWRlbnRTZXJ2aWNlXHJcbiAgICAgIC5nZXRTdHVkZW50cygpXHJcbiAgICAgIC50aGVuKHN0dWRlbnRzID0+IHtcclxuICAgICAgICBpZiAoc3R1ZGVudHMuc3RhdHVzID09PSBcIjQwM1wiKSB7XHJcbiAgICAgICAgICB0aGlzLnN0dWRlbnRzID0gbnVsbDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdGhpcy5zdHVkZW50cyA9IHN0dWRlbnRzO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmdldENvdXJzZXMoKTtcclxuICAgICAgfSlcclxuICAgICAgLmNhdGNoKGVycm9yID0+IGNvbnNvbGUubG9nKGVycm9yKSk7XHJcbiAgfVxyXG5cclxuICBnZXRDb3Vyc2VzKCkge1xyXG4gICAgICB0aGlzLmNvdXJzZVNlcnZpY2VcclxuICAgICAgICAgIC5nZXRDb3Vyc2VzKClcclxuICAgICAgICAgIC50aGVuKHJlc3VsdCA9PiB7XHJcbiAgICAgICAgICAgICAgaWYgKHJlc3VsdC5zdGF0dXMgPT09IFwiNDAzXCIpIHtcclxuICAgICAgICAgICAgICAgICAgdGhpcy5jb3Vyc2VzID0gbnVsbDtcclxuICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAvL2Zvcm1hdCBkYXRldGltZVxyXG4gICAgICAgICAgICAgICAgICByZXN1bHQuZm9yRWFjaCgoaXRlbSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgaXRlbS5jb3Vyc2VTdGFydCA9IG1vbWVudChpdGVtLmNvdXJzZVN0YXJ0KS5mb3JtYXQoJ1lZWVktTU0tREQnKTtcclxuICAgICAgICAgICAgICAgICAgICAgIGl0ZW0uY291cnNlRW5kID0gbW9tZW50KGl0ZW0uY291cnNlRW5kKS5mb3JtYXQoJ1lZWVktTU0tREQnKTtcclxuICAgICAgICAgICAgICAgICAgICAgIGl0ZW0uY2xhc3NTdGFydFRpbWUgPSBtb21lbnQoaXRlbS5jbGFzc1N0YXJ0VGltZSkuZm9ybWF0KCdoaDptbSBBJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICBpdGVtLmNsYXNzRW5kVGltZSA9IG1vbWVudChpdGVtLmNsYXNzRW5kVGltZSkuZm9ybWF0KCdoaDptbSBBJyk7XHJcbiAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICB0aGlzLmNvdXJzZXMgPSByZXN1bHQ7XHJcbiAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgICAuY2F0Y2goZXJyb3IgPT4gY29uc29sZS5sb2coZXJyb3IpKTtcclxuICB9XHJcblxyXG4gIHZpZXdTdHVkZW50UmVwb3J0KHN0dWRlbnQ6IFN0dWRlbnQpIHtcbiAgICB0aGlzLnJlY29yZHMgPSBbXTtcclxuICAgIHRoaXMuc3R1ZGVudEF0dGVuZGFuY2VWaWV3ID0gdHJ1ZTtcbiAgICB0aGlzLmF0dGVuZGFuY2UgPSB0aGlzLmRhdGEuZmlsdGVyKHggPT4geC5zdHVkZW50SUQgPT09IHN0dWRlbnQuc3R1ZGVudElEKTtcbiAgICB0aGlzLnN0dWRlbnQgPSB0aGlzLnN0dWRlbnRzLmZpbHRlcih4ID0+IHguc3R1ZGVudElEID09PSBzdHVkZW50LnN0dWRlbnRJRCk7XHJcbiAgICB0aGlzLnN0dWRlbnQgPSB0aGlzLnN0dWRlbnRbMF07XHJcbiAgICB0aGlzLnRvdGFsUHJlc2VudCA9IHRoaXMuYXR0ZW5kYW5jZS5maWx0ZXIoeCA9PiB4LmF0dGVuZGFuY2VWYWx1ZSA9PT0gJ1AnKS5sZW5ndGg7XG4gICAgdGhpcy50b3RhbEFic2VudCA9IHRoaXMuYXR0ZW5kYW5jZS5maWx0ZXIoeCA9PiB4LmF0dGVuZGFuY2VWYWx1ZSA9PT0gJ0EnKS5sZW5ndGg7XG4gICAgdGhpcy50b3RhbE1hZGVDb250YWN0ID0gdGhpcy5hdHRlbmRhbmNlLmZpbHRlcih4ID0+IHguYXR0ZW5kYW5jZVZhbHVlID09PSAnTUMnKS5sZW5ndGg7XG5cbiAgICBpZiAodGhpcy5hdHRlbmRhbmNlLmxlbmd0aCA9PT0gMCkge1xuICAgICAgdGhpcy5ub0F0dGVuZGFuY2UgPSB0cnVlO1xyXG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMubm9BdHRlbmRhbmNlID0gZmFsc2U7XHJcbiAgICAgIGZvciAobGV0IGl0ZW0gb2YgdGhpcy5hdHRlbmRhbmNlKSB7XHJcbiAgICAgICAgdmFyIGNvdXJzZSA9IHRoaXMuY291cnNlcy5maWx0ZXIoeCA9PiB4LmNvdXJzZUlEID09PSBpdGVtLmNvdXJzZUlEKTtcclxuICAgICAgICB2YXIgYXR0ZW5kYW5jZSA9IHtcclxuICAgICAgICAgIGNvdXJzZTogY291cnNlLFxyXG4gICAgICAgICAgZGF0ZTogaXRlbS5kYXRlLFxyXG4gICAgICAgICAgYXR0ZW5kYW5jZVZhbHVlOiBpdGVtLmF0dGVuZGFuY2VWYWx1ZVxyXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMucmVjb3Jkcy5wdXNoKGF0dGVuZGFuY2UpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gIH1cclxuXHJcbiAgdmlld0NvdXJzZVJlcG9ydChjb3Vyc2U6IENvdXJzZSkge1xyXG4gICAgdGhpcy5jb3Vyc2VBdHRlbmRhbmNlVmlldyA9IHRydWU7XHJcbiAgICB0aGlzLmNvdXJzZSA9IGNvdXJzZTtcclxuICB9XHJcblxyXG4gIG92ZXJhbGxTdGF0dXMoKSB7XHJcbiAgICB0aGlzLmNvdXJzZUF0dGVuZGFuY2VWaWV3ID0gZmFsc2U7XHJcbiAgICB0aGlzLnN0dWRlbnRBdHRlbmRhbmNlVmlldyA9IGZhbHNlO1xyXG4gICAgdGhpcy5ub0F0dGVuZGFuY2UgPSBmYWxzZTtcclxuICB9XHJcblxyXG4gIGdvQmFjaygpIHtcclxuICAgIHdpbmRvdy5oaXN0b3J5LmJhY2soKTtcclxuICB9XHJcbn1cclxuIl19
