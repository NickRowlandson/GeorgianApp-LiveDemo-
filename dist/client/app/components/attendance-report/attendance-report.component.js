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
const core_1 = require("@angular/core");
const router_1 = require("@angular/router");
const student_service_1 = require("../../services/student.service");
const course_service_1 = require("../../services/course.service");
const platform_browser_1 = require("@angular/platform-browser");
let AttendanceReportComponent = class AttendanceReportComponent {
    constructor(document, router, studentService, courseService) {
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
    ngOnInit() {
        swal({
            title: 'Loading...',
            allowOutsideClick: false
        });
        swal.showLoading();
        this.studentService
            .getAllAttendance()
            .then(attendance => {
            if (attendance.result === 'error') {
                this.data = null;
                this.displayErrorAlert(attendance);
            }
            else {
                this.data = attendance;
                this.getStudents();
            }
        })
            .catch(error => console.log(error));
    }
    getStudents() {
        this.studentService
            .getStudents()
            .then(students => {
            if (students.result === 'error') {
                this.students = null;
                this.displayErrorAlert(students);
            }
            else {
                this.students = students;
                for (let student of this.students) {
                    student.fullName = student.firstName + " " + student.lastName;
                }
                this.getCourses();
            }
        })
            .catch(error => console.log(error));
    }
    getCourses() {
        this.courseService
            .getCourses()
            .then(result => {
            if (result.result === 'error') {
                this.courses = null;
                this.displayErrorAlert(result);
            }
            else {
                //format datetime
                result.forEach((item) => {
                    item.courseStart = moment(item.courseStart).format('YYYY-MM-DD');
                    item.courseEnd = moment(item.courseEnd).format('YYYY-MM-DD');
                    // item.classStartTime = moment(item.classStartTime).format('hh:mm A');
                    // item.classEndTime = moment(item.classEndTime).format('hh:mm A');
                });
                this.courses = result;
                this.getTimetables();
            }
        })
            .catch(error => console.log(error));
    }
    getTimetables() {
        this.studentService
            .getTimetables()
            .then(result => {
            if (result.result === 'error') {
                this.timetables = null;
                this.displayErrorAlert(result);
            }
            else {
                this.timetables = result;
                swal.close();
            }
        })
            .catch(error => console.log(error));
    }
    viewStudentReport(student) {
        this.records = [];
        this.studentAttendanceView = true;
        this.attendance = this.data.filter(x => x.userID === student.userID);
        this.attendance.sort(function (a, b) {
            a = new Date(a.date);
            b = new Date(b.date);
            return a > b ? -1 : a < b ? 1 : 0;
        });
        this.student = this.students.filter(x => x.studentID === student.studentID);
        this.student = this.student[0];
        this.totalPresent = this.attendance.filter(x => x.attendanceValue === 'P').length;
        this.totalAbsent = this.attendance.filter(x => x.attendanceValue === 'A').length;
        this.totalMadeContact = this.attendance.filter(x => x.attendanceValue === 'MC').length;
        if (this.attendance.length === 0) {
            this.noAttendance = true;
        }
        else {
            this.noAttendance = false;
            for (let item of this.attendance) {
                var course = this.courses.filter(x => x.courseID === item.courseID);
                var attendance = {
                    course: course,
                    date: item.date,
                    attendanceValue: item.attendanceValue
                };
                this.records.push(attendance);
            }
            this.recordsBackup = this.records;
        }
        this.document.body.scrollTop = 0;
    }
    viewCourseReport(course) {
        this.courseTimetables = [];
        this.courseStudents = [];
        this.courseAttendanceView = true;
        this.course = course;
        this.classTimeStr = this.course.classTimeStr;
        this.classAbsenceTotal = this.data.filter(x => x.courseID === course.courseID && x.attendanceValue === 'A').length;
        this.classPresenceTotal = this.data.filter(x => x.courseID === course.courseID && x.attendanceValue === 'P').length;
        this.classMadeContactTotal = this.data.filter(x => x.courseID === course.courseID && x.attendanceValue === 'MC').length;
        if (this.classTimeStr) {
            var array = this.classTimeStr.split(',');
            this.classTimeStr = [];
            for (let item of array) {
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
            this.courseTimetables = this.timetables.filter(x => x.courseID === course.courseID);
            for (let item of this.courseTimetables) {
                studentInfo = {
                    student: this.students.filter(x => x.userID === item.userID)[0],
                    startDate: item.startDate,
                    endDate: item.endDate,
                    attendanceInfo: this.data.filter(x => x.userID === item.userID && x.courseID === course.courseID)
                };
                this.courseStudents.push(studentInfo);
            }
        }
        if (this.courseStudents.length === 0) {
            this.noStudentsEnrolled = true;
        }
        else {
            this.noStudentsEnrolled = false;
        }
        this.document.body.scrollTop = 0;
    }
    filterAttendance(filterBy) {
        this.records = this.recordsBackup;
        if (filterBy === 'absence') {
            this.records = this.records.filter(x => x.attendanceValue === 'A');
        }
        else if (filterBy === 'presence') {
            this.records = this.records.filter(x => x.attendanceValue === 'P');
        }
        else if (filterBy === 'madeContact') {
            this.records = this.records.filter(x => x.attendanceValue === 'MC');
        }
    }
    overallStatus() {
        this.courseAttendanceView = false;
        this.studentAttendanceView = false;
        this.noAttendance = false;
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
AttendanceReportComponent = __decorate([
    core_1.Component({
        selector: 'attendanceReportComponet',
        templateUrl: './app/components/attendance-report/attendance-report.component.html',
        styleUrls: ['./app/components/attendance-report/attendance-report.component.css']
    }),
    __param(0, core_1.Inject(platform_browser_1.DOCUMENT)),
    __metadata("design:paramtypes", [Document, router_1.Router, student_service_1.StudentService, course_service_1.CourseService])
], AttendanceReportComponent);
exports.AttendanceReportComponent = AttendanceReportComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NsaWVudC9hcHAvY29tcG9uZW50cy9hdHRlbmRhbmNlLXJlcG9ydC9hdHRlbmRhbmNlLXJlcG9ydC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBQSx3Q0FBMEQ7QUFDMUQsNENBQXlDO0FBQ3pDLG9FQUFnRTtBQUVoRSxrRUFBOEQ7QUFFOUQsZ0VBQXFEO0FBVXJELElBQWEseUJBQXlCLEdBQXRDO0lBNEJFLFlBQXVDLFFBQWtCLEVBQVUsTUFBYyxFQUFVLGNBQThCLEVBQVUsYUFBNEI7UUFBeEgsYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQUFVLFdBQU0sR0FBTixNQUFNLENBQVE7UUFBVSxtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFBVSxrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQXZCL0osMEJBQXFCLEdBQVksS0FBSyxDQUFDO1FBR3ZDLFlBQU8sR0FBRyxFQUFFLENBQUM7UUFDYixrQkFBYSxHQUFHLEVBQUUsQ0FBQztRQUluQixpQkFBWSxHQUFZLEtBQUssQ0FBQztRQUM5QixrQkFBYSxHQUFZLEtBQUssQ0FBQztRQUUvQix5QkFBb0IsR0FBWSxLQUFLLENBQUM7UUFPdEMsdUJBQWtCLEdBQVksS0FBSyxDQUFDO0lBT3BDLENBQUM7SUFFRCxRQUFRO1FBQ04sSUFBSSxDQUFDO1lBQ0gsS0FBSyxFQUFFLFlBQVk7WUFDbkIsaUJBQWlCLEVBQUUsS0FBSztTQUN6QixDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDbkIsSUFBSSxDQUFDLGNBQWM7YUFDaEIsZ0JBQWdCLEVBQUU7YUFDbEIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFO1lBQ2pCLElBQUssVUFBa0IsQ0FBQyxNQUFNLEtBQUssT0FBTyxFQUFFO2dCQUMxQyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztnQkFDakIsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFVBQVUsQ0FBQyxDQUFDO2FBQ3BD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S0FBSyxDQUFDLEtBQUssRUFDWCxLQUFLLENBQUMsR0FBRyxFQUNULE9BQU8sQ0FDUixDQUFDO1NBQ0g7SUFDSCxDQUFDO0lBRUQsTUFBTTtRQUNKLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDeEIsQ0FBQztDQUNGLENBQUE7QUFuT1kseUJBQXlCO0lBTnJDLGdCQUFTLENBQUM7UUFDVCxRQUFRLEVBQUUsMEJBQTBCO1FBQ3BDLFdBQVcsRUFBRSxxRUFBcUU7UUFDbEYsU0FBUyxFQUFFLENBQUMsb0VBQW9FLENBQUM7S0FDbEYsQ0FBQztJQThCYyxXQUFBLGFBQU0sQ0FBQywyQkFBUSxDQUFDLENBQUE7cUNBQW1CLFFBQVEsRUFBa0IsZUFBTSxFQUEwQixnQ0FBYyxFQUF5Qiw4QkFBYTtHQTVCcEoseUJBQXlCLENBbU9yQztBQW5PWSw4REFBeUIiLCJmaWxlIjoiYXBwL2NvbXBvbmVudHMvYXR0ZW5kYW5jZS1yZXBvcnQvYXR0ZW5kYW5jZS1yZXBvcnQuY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIEluamVjdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBSb3V0ZXIgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xyXG5pbXBvcnQgeyBTdHVkZW50U2VydmljZSB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9zdHVkZW50LnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgU3R1ZGVudCB9IGZyb20gXCIuLi8uLi9tb2RlbHMvc3R1ZGVudFwiO1xyXG5pbXBvcnQgeyBDb3Vyc2VTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL2NvdXJzZS5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IENvdXJzZSB9IGZyb20gXCIuLi8uLi9tb2RlbHMvY291cnNlXCI7XHJcbmltcG9ydCB7IERPQ1VNRU5UIH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XHJcbmRlY2xhcmUgdmFyIG1vbWVudDogYW55O1xyXG5kZWNsYXJlIHZhciBzd2FsOiBhbnk7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2F0dGVuZGFuY2VSZXBvcnRDb21wb25ldCcsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL2FwcC9jb21wb25lbnRzL2F0dGVuZGFuY2UtcmVwb3J0L2F0dGVuZGFuY2UtcmVwb3J0LmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9hcHAvY29tcG9uZW50cy9hdHRlbmRhbmNlLXJlcG9ydC9hdHRlbmRhbmNlLXJlcG9ydC5jb21wb25lbnQuY3NzJ11cclxufSlcclxuXHJcbmV4cG9ydCBjbGFzcyBBdHRlbmRhbmNlUmVwb3J0Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuICBkYXRhOiBhbnk7XHJcbiAgY291cnNlczogQ291cnNlW107XHJcbiAgc3R1ZGVudHM6IFN0dWRlbnRbXTtcclxuICB0b3RhbEFic2VuY2VzOiBhbnk7XHJcbiAgc3R1ZGVudEF0dGVuZGFuY2VWaWV3OiBib29sZWFuID0gZmFsc2U7XHJcbiAgc3R1ZGVudDogYW55W107XHJcbiAgYXR0ZW5kYW5jZTogYW55W107XHJcbiAgcmVjb3JkcyA9IFtdO1xyXG4gIHJlY29yZHNCYWNrdXAgPSBbXTtcclxuICB0b3RhbFByZXNlbnQ6IGFueTtcclxuICB0b3RhbEFic2VudDogYW55O1xyXG4gIHRvdGFsTWFkZUNvbnRhY3Q6IGFueTtcclxuICBub0F0dGVuZGFuY2U6IGJvb2xlYW4gPSBmYWxzZTtcclxuICBzdHVkZW50UmVwb3J0OiBib29sZWFuID0gZmFsc2U7XHJcbiAgdGltZXRhYmxlczogYW55W107XHJcbiAgY291cnNlQXR0ZW5kYW5jZVZpZXc6IGJvb2xlYW4gPSBmYWxzZTtcclxuICBjb3Vyc2U6IGFueTtcclxuICBjbGFzc1RpbWVTdHI6IGFueTtcclxuICBjb3Vyc2VEYXRhOiBhbnlbXTtcclxuICBjb3Vyc2VTdHVkZW50czogYW55W107XHJcbiAgY291cnNlVGltZXRhYmxlczogYW55W107XHJcbiAgc3R1ZGVudFJlY29yZDogYW55W107XHJcbiAgbm9TdHVkZW50c0Vucm9sbGVkOiBib29sZWFuID0gZmFsc2U7XHJcbiAgY2xhc3NBYnNlbmNlVG90YWw6IGFueTtcclxuICBjbGFzc1ByZXNlbmNlVG90YWw6IGFueTtcclxuICBjbGFzc01hZGVDb250YWN0VG90YWw6IGFueTtcclxuXHJcbiAgY29uc3RydWN0b3IoIEBJbmplY3QoRE9DVU1FTlQpIHByaXZhdGUgZG9jdW1lbnQ6IERvY3VtZW50LCBwcml2YXRlIHJvdXRlcjogUm91dGVyLCBwcml2YXRlIHN0dWRlbnRTZXJ2aWNlOiBTdHVkZW50U2VydmljZSwgcHJpdmF0ZSBjb3Vyc2VTZXJ2aWNlOiBDb3Vyc2VTZXJ2aWNlKSB7XHJcblxyXG4gIH1cclxuXHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgICBzd2FsKHtcclxuICAgICAgdGl0bGU6ICdMb2FkaW5nLi4uJyxcclxuICAgICAgYWxsb3dPdXRzaWRlQ2xpY2s6IGZhbHNlXHJcbiAgICB9KTtcclxuICAgIHN3YWwuc2hvd0xvYWRpbmcoKTtcclxuICAgIHRoaXMuc3R1ZGVudFNlcnZpY2VcclxuICAgICAgLmdldEFsbEF0dGVuZGFuY2UoKVxyXG4gICAgICAudGhlbihhdHRlbmRhbmNlID0+IHtcclxuICAgICAgICBpZiAoKGF0dGVuZGFuY2UgYXMgYW55KS5yZXN1bHQgPT09ICdlcnJvcicpIHtcclxuICAgICAgICAgIHRoaXMuZGF0YSA9IG51bGw7XHJcbiAgICAgICAgICB0aGlzLmRpc3BsYXlFcnJvckFsZXJ0KGF0dGVuZGFuY2UpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB0aGlzLmRhdGEgPSBhdHRlbmRhbmNlO1xyXG4gICAgICAgICAgdGhpcy5nZXRTdHVkZW50cygpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuICAgICAgLmNhdGNoKGVycm9yID0+IGNvbnNvbGUubG9nKGVycm9yKSk7XHJcbiAgfVxyXG5cclxuICBnZXRTdHVkZW50cygpIHtcclxuICAgIHRoaXMuc3R1ZGVudFNlcnZpY2VcclxuICAgICAgLmdldFN0dWRlbnRzKClcclxuICAgICAgLnRoZW4oc3R1ZGVudHMgPT4ge1xyXG4gICAgICAgIGlmICgoc3R1ZGVudHMgYXMgYW55KS5yZXN1bHQgPT09ICdlcnJvcicpIHtcclxuICAgICAgICAgIHRoaXMuc3R1ZGVudHMgPSBudWxsO1xyXG4gICAgICAgICAgdGhpcy5kaXNwbGF5RXJyb3JBbGVydChzdHVkZW50cyk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHRoaXMuc3R1ZGVudHMgPSBzdHVkZW50cztcclxuICAgICAgICAgIGZvciAobGV0IHN0dWRlbnQgb2YgdGhpcy5zdHVkZW50cykge1xyXG4gICAgICAgICAgICBzdHVkZW50LmZ1bGxOYW1lID0gc3R1ZGVudC5maXJzdE5hbWUgKyBcIiBcIiArIHN0dWRlbnQubGFzdE5hbWU7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICB0aGlzLmdldENvdXJzZXMoKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pXHJcbiAgICAgIC5jYXRjaChlcnJvciA9PiBjb25zb2xlLmxvZyhlcnJvcikpO1xyXG4gIH1cclxuXHJcbiAgZ2V0Q291cnNlcygpIHtcclxuICAgIHRoaXMuY291cnNlU2VydmljZVxyXG4gICAgICAuZ2V0Q291cnNlcygpXHJcbiAgICAgIC50aGVuKHJlc3VsdCA9PiB7XHJcbiAgICAgICAgaWYgKChyZXN1bHQgYXMgYW55KS5yZXN1bHQgPT09ICdlcnJvcicpIHtcclxuICAgICAgICAgIHRoaXMuY291cnNlcyA9IG51bGw7XHJcbiAgICAgICAgICB0aGlzLmRpc3BsYXlFcnJvckFsZXJ0KHJlc3VsdCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIC8vZm9ybWF0IGRhdGV0aW1lXHJcbiAgICAgICAgICByZXN1bHQuZm9yRWFjaCgoaXRlbSkgPT4ge1xyXG4gICAgICAgICAgICBpdGVtLmNvdXJzZVN0YXJ0ID0gbW9tZW50KGl0ZW0uY291cnNlU3RhcnQpLmZvcm1hdCgnWVlZWS1NTS1ERCcpO1xyXG4gICAgICAgICAgICBpdGVtLmNvdXJzZUVuZCA9IG1vbWVudChpdGVtLmNvdXJzZUVuZCkuZm9ybWF0KCdZWVlZLU1NLUREJyk7XHJcbiAgICAgICAgICAgIC8vIGl0ZW0uY2xhc3NTdGFydFRpbWUgPSBtb21lbnQoaXRlbS5jbGFzc1N0YXJ0VGltZSkuZm9ybWF0KCdoaDptbSBBJyk7XHJcbiAgICAgICAgICAgIC8vIGl0ZW0uY2xhc3NFbmRUaW1lID0gbW9tZW50KGl0ZW0uY2xhc3NFbmRUaW1lKS5mb3JtYXQoJ2hoOm1tIEEnKTtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgdGhpcy5jb3Vyc2VzID0gcmVzdWx0O1xyXG4gICAgICAgICAgdGhpcy5nZXRUaW1ldGFibGVzKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gICAgICAuY2F0Y2goZXJyb3IgPT4gY29uc29sZS5sb2coZXJyb3IpKTtcclxuICB9XHJcblxyXG4gIGdldFRpbWV0YWJsZXMoKSB7XHJcbiAgICB0aGlzLnN0dWRlbnRTZXJ2aWNlXHJcbiAgICAgIC5nZXRUaW1ldGFibGVzKClcclxuICAgICAgLnRoZW4ocmVzdWx0ID0+IHtcclxuICAgICAgICBpZiAoKHJlc3VsdCBhcyBhbnkpLnJlc3VsdCA9PT0gJ2Vycm9yJykge1xyXG4gICAgICAgICAgdGhpcy50aW1ldGFibGVzID0gbnVsbDtcclxuICAgICAgICAgIHRoaXMuZGlzcGxheUVycm9yQWxlcnQocmVzdWx0KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdGhpcy50aW1ldGFibGVzID0gcmVzdWx0O1xyXG4gICAgICAgICAgc3dhbC5jbG9zZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuICAgICAgLmNhdGNoKGVycm9yID0+IGNvbnNvbGUubG9nKGVycm9yKSk7XHJcbiAgfVxyXG5cclxuICB2aWV3U3R1ZGVudFJlcG9ydChzdHVkZW50OiBTdHVkZW50KSB7XHJcbiAgICB0aGlzLnJlY29yZHMgPSBbXTtcclxuICAgIHRoaXMuc3R1ZGVudEF0dGVuZGFuY2VWaWV3ID0gdHJ1ZTtcclxuICAgIHRoaXMuYXR0ZW5kYW5jZSA9IHRoaXMuZGF0YS5maWx0ZXIoeCA9PiB4LnVzZXJJRCA9PT0gc3R1ZGVudC51c2VySUQpO1xyXG4gICAgdGhpcy5hdHRlbmRhbmNlLnNvcnQoZnVuY3Rpb24oYSwgYikge1xyXG4gICAgICBhID0gbmV3IERhdGUoYS5kYXRlKTtcclxuICAgICAgYiA9IG5ldyBEYXRlKGIuZGF0ZSk7XHJcbiAgICAgIHJldHVybiBhID4gYiA/IC0xIDogYSA8IGIgPyAxIDogMDtcclxuICAgIH0pO1xyXG4gICAgdGhpcy5zdHVkZW50ID0gdGhpcy5zdHVkZW50cy5maWx0ZXIoeCA9PiB4LnN0dWRlbnRJRCA9PT0gc3R1ZGVudC5zdHVkZW50SUQpO1xyXG4gICAgdGhpcy5zdHVkZW50ID0gdGhpcy5zdHVkZW50WzBdO1xyXG4gICAgdGhpcy50b3RhbFByZXNlbnQgPSB0aGlzLmF0dGVuZGFuY2UuZmlsdGVyKHggPT4geC5hdHRlbmRhbmNlVmFsdWUgPT09ICdQJykubGVuZ3RoO1xyXG4gICAgdGhpcy50b3RhbEFic2VudCA9IHRoaXMuYXR0ZW5kYW5jZS5maWx0ZXIoeCA9PiB4LmF0dGVuZGFuY2VWYWx1ZSA9PT0gJ0EnKS5sZW5ndGg7XHJcbiAgICB0aGlzLnRvdGFsTWFkZUNvbnRhY3QgPSB0aGlzLmF0dGVuZGFuY2UuZmlsdGVyKHggPT4geC5hdHRlbmRhbmNlVmFsdWUgPT09ICdNQycpLmxlbmd0aDtcclxuXHJcbiAgICBpZiAodGhpcy5hdHRlbmRhbmNlLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICB0aGlzLm5vQXR0ZW5kYW5jZSA9IHRydWU7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLm5vQXR0ZW5kYW5jZSA9IGZhbHNlO1xyXG4gICAgICBmb3IgKGxldCBpdGVtIG9mIHRoaXMuYXR0ZW5kYW5jZSkge1xyXG4gICAgICAgIHZhciBjb3Vyc2UgPSB0aGlzLmNvdXJzZXMuZmlsdGVyKHggPT4geC5jb3Vyc2VJRCA9PT0gaXRlbS5jb3Vyc2VJRCk7XHJcbiAgICAgICAgdmFyIGF0dGVuZGFuY2UgPSB7XHJcbiAgICAgICAgICBjb3Vyc2U6IGNvdXJzZSxcclxuICAgICAgICAgIGRhdGU6IGl0ZW0uZGF0ZSxcclxuICAgICAgICAgIGF0dGVuZGFuY2VWYWx1ZTogaXRlbS5hdHRlbmRhbmNlVmFsdWVcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMucmVjb3Jkcy5wdXNoKGF0dGVuZGFuY2UpO1xyXG4gICAgICB9XHJcbiAgICAgIHRoaXMucmVjb3Jkc0JhY2t1cCA9IHRoaXMucmVjb3JkcztcclxuICAgIH1cclxuICAgIHRoaXMuZG9jdW1lbnQuYm9keS5zY3JvbGxUb3AgPSAwO1xyXG4gIH1cclxuXHJcbiAgdmlld0NvdXJzZVJlcG9ydChjb3Vyc2U6IENvdXJzZSkge1xyXG4gICAgdGhpcy5jb3Vyc2VUaW1ldGFibGVzID0gW107XHJcbiAgICB0aGlzLmNvdXJzZVN0dWRlbnRzID0gW107XHJcbiAgICB0aGlzLmNvdXJzZUF0dGVuZGFuY2VWaWV3ID0gdHJ1ZTtcclxuICAgIHRoaXMuY291cnNlID0gY291cnNlO1xyXG4gICAgdGhpcy5jbGFzc1RpbWVTdHIgPSB0aGlzLmNvdXJzZS5jbGFzc1RpbWVTdHI7XHJcblxyXG4gICAgdGhpcy5jbGFzc0Fic2VuY2VUb3RhbCA9IHRoaXMuZGF0YS5maWx0ZXIoeCA9PiB4LmNvdXJzZUlEID09PSBjb3Vyc2UuY291cnNlSUQgJiYgeC5hdHRlbmRhbmNlVmFsdWUgPT09ICdBJykubGVuZ3RoO1xyXG4gICAgdGhpcy5jbGFzc1ByZXNlbmNlVG90YWwgPSB0aGlzLmRhdGEuZmlsdGVyKHggPT4geC5jb3Vyc2VJRCA9PT0gY291cnNlLmNvdXJzZUlEICYmIHguYXR0ZW5kYW5jZVZhbHVlID09PSAnUCcpLmxlbmd0aDtcclxuICAgIHRoaXMuY2xhc3NNYWRlQ29udGFjdFRvdGFsID0gdGhpcy5kYXRhLmZpbHRlcih4ID0+IHguY291cnNlSUQgPT09IGNvdXJzZS5jb3Vyc2VJRCAmJiB4LmF0dGVuZGFuY2VWYWx1ZSA9PT0gJ01DJykubGVuZ3RoO1xyXG5cclxuICAgIGlmICh0aGlzLmNsYXNzVGltZVN0cikge1xyXG4gICAgICB2YXIgYXJyYXkgPSB0aGlzLmNsYXNzVGltZVN0ci5zcGxpdCgnLCcpO1xyXG4gICAgICB0aGlzLmNsYXNzVGltZVN0ciA9IFtdO1xyXG4gICAgICBmb3IgKGxldCBpdGVtIG9mIGFycmF5KSB7XHJcbiAgICAgICAgdmFyIGRhdGUgPSBpdGVtLnNwbGl0KCcgJyk7XHJcbiAgICAgICAgLy8gdmFyIGRheSA9IGRhdGVbMF07XHJcbiAgICAgICAgLy8gdmFyIHRpbWUgPSBkYXRlWzFdO1xyXG4gICAgICAgIC8vIHZhciBzdGFydFRpbWUgPSB0aW1lLnNwbGl0KCctJylbMF07XHJcbiAgICAgICAgLy8gdmFyIGVuZFRpbWUgPSB0aW1lLnNwbGl0KCctJylbMV07XHJcbiAgICAgICAgdGhpcy5jbGFzc1RpbWVTdHIucHVzaChkYXRlKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHZhciBzdHVkZW50SW5mbztcclxuXHJcbiAgICBpZiAodGhpcy5kYXRhLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICB0aGlzLm5vQXR0ZW5kYW5jZSA9IHRydWU7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLm5vQXR0ZW5kYW5jZSA9IGZhbHNlO1xyXG4gICAgICB0aGlzLmNvdXJzZVRpbWV0YWJsZXMgPSB0aGlzLnRpbWV0YWJsZXMuZmlsdGVyKHggPT4geC5jb3Vyc2VJRCA9PT0gY291cnNlLmNvdXJzZUlEKTtcclxuICAgICAgZm9yIChsZXQgaXRlbSBvZiB0aGlzLmNvdXJzZVRpbWV0YWJsZXMpIHtcclxuICAgICAgICBzdHVkZW50SW5mbyA9IHtcclxuICAgICAgICAgIHN0dWRlbnQ6IHRoaXMuc3R1ZGVudHMuZmlsdGVyKHggPT4geC51c2VySUQgPT09IGl0ZW0udXNlcklEKVswXSxcclxuICAgICAgICAgIHN0YXJ0RGF0ZTogaXRlbS5zdGFydERhdGUsXHJcbiAgICAgICAgICBlbmREYXRlOiBpdGVtLmVuZERhdGUsXHJcbiAgICAgICAgICBhdHRlbmRhbmNlSW5mbzogdGhpcy5kYXRhLmZpbHRlcih4ID0+IHgudXNlcklEID09PSBpdGVtLnVzZXJJRCAmJiB4LmNvdXJzZUlEID09PSBjb3Vyc2UuY291cnNlSUQpXHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLmNvdXJzZVN0dWRlbnRzLnB1c2goc3R1ZGVudEluZm8pO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMuY291cnNlU3R1ZGVudHMubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgIHRoaXMubm9TdHVkZW50c0Vucm9sbGVkID0gdHJ1ZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMubm9TdHVkZW50c0Vucm9sbGVkID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgICB0aGlzLmRvY3VtZW50LmJvZHkuc2Nyb2xsVG9wID0gMDtcclxuICB9XHJcblxyXG4gIGZpbHRlckF0dGVuZGFuY2UoZmlsdGVyQnkpIHtcclxuICAgIHRoaXMucmVjb3JkcyA9IHRoaXMucmVjb3Jkc0JhY2t1cDtcclxuICAgIGlmIChmaWx0ZXJCeSA9PT0gJ2Fic2VuY2UnKSB7XHJcbiAgICAgIHRoaXMucmVjb3JkcyA9IHRoaXMucmVjb3Jkcy5maWx0ZXIoeCA9PiB4LmF0dGVuZGFuY2VWYWx1ZSA9PT0gJ0EnKTtcclxuICAgIH0gZWxzZSBpZiAoZmlsdGVyQnkgPT09ICdwcmVzZW5jZScpIHtcclxuICAgICAgdGhpcy5yZWNvcmRzID0gdGhpcy5yZWNvcmRzLmZpbHRlcih4ID0+IHguYXR0ZW5kYW5jZVZhbHVlID09PSAnUCcpO1xyXG4gICAgfSBlbHNlIGlmIChmaWx0ZXJCeSA9PT0gJ21hZGVDb250YWN0Jykge1xyXG4gICAgICB0aGlzLnJlY29yZHMgPSB0aGlzLnJlY29yZHMuZmlsdGVyKHggPT4geC5hdHRlbmRhbmNlVmFsdWUgPT09ICdNQycpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgb3ZlcmFsbFN0YXR1cygpIHtcclxuICAgIHRoaXMuY291cnNlQXR0ZW5kYW5jZVZpZXcgPSBmYWxzZTtcclxuICAgIHRoaXMuc3R1ZGVudEF0dGVuZGFuY2VWaWV3ID0gZmFsc2U7XHJcbiAgICB0aGlzLm5vQXR0ZW5kYW5jZSA9IGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgZGlzcGxheUVycm9yQWxlcnQoZXJyb3IpIHtcclxuICAgIGlmIChlcnJvci50aXRsZSA9PT0gXCJBdXRoIEVycm9yXCIpIHtcclxuICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWycvbG9naW4nXSk7XHJcbiAgICAgIHN3YWwoXHJcbiAgICAgICAgZXJyb3IudGl0bGUsXHJcbiAgICAgICAgZXJyb3IubXNnLFxyXG4gICAgICAgICdpbmZvJ1xyXG4gICAgICApO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgc3dhbChcclxuICAgICAgICBlcnJvci50aXRsZSxcclxuICAgICAgICBlcnJvci5tc2csXHJcbiAgICAgICAgJ2Vycm9yJ1xyXG4gICAgICApO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZ29CYWNrKCkge1xyXG4gICAgd2luZG93Lmhpc3RvcnkuYmFjaygpO1xyXG4gIH1cclxufVxyXG4iXX0=
