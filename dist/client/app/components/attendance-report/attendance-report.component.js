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
        swal(error.title, error.msg, 'error');
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NsaWVudC9hcHAvY29tcG9uZW50cy9hdHRlbmRhbmNlLXJlcG9ydC9hdHRlbmRhbmNlLXJlcG9ydC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBQSx3Q0FBMEQ7QUFDMUQsNENBQXlDO0FBQ3pDLG9FQUFnRTtBQUVoRSxrRUFBOEQ7QUFFOUQsZ0VBQXFEO0FBVXJELElBQWEseUJBQXlCLEdBQXRDO0lBNEJFLFlBQXVDLFFBQWtCLEVBQVUsTUFBYyxFQUFVLGNBQThCLEVBQVUsYUFBNEI7UUFBeEgsYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQUFVLFdBQU0sR0FBTixNQUFNLENBQVE7UUFBVSxtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFBVSxrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQXZCL0osMEJBQXFCLEdBQVksS0FBSyxDQUFDO1FBR3ZDLFlBQU8sR0FBRyxFQUFFLENBQUM7UUFDYixrQkFBYSxHQUFHLEVBQUUsQ0FBQztRQUluQixpQkFBWSxHQUFZLEtBQUssQ0FBQztRQUM5QixrQkFBYSxHQUFZLEtBQUssQ0FBQztRQUUvQix5QkFBb0IsR0FBWSxLQUFLLENBQUM7UUFPdEMsdUJBQWtCLEdBQVksS0FBSyxDQUFDO0lBT3BDLENBQUM7SUFFRCxRQUFRO1FBQ04sSUFBSSxDQUFDO1lBQ0gsS0FBSyxFQUFFLFlBQVk7WUFDbkIsaUJBQWlCLEVBQUUsS0FBSztTQUN6QixDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDbkIsSUFBSSxDQUFDLGNBQWM7YUFDaEIsZ0JBQWdCLEVBQUU7YUFDbEIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFO1lBQ2pCLElBQUssVUFBa0IsQ0FBQyxNQUFNLEtBQUssT0FBTyxFQUFFO2dCQUMxQyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztnQkFDakIsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFVBQVUsQ0FBQyxDQUFDO2FBQ3BDO2lCQUFNO2dCQUNMLElBQUksQ0FBQyxJQUFJLEdBQUcsVUFBVSxDQUFDO2dCQUN2QixJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7YUFDcEI7UUFDSCxDQUFDLENBQUM7YUFDRCxLQUFLLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFDeEMsQ0FBQztJQUVELFdBQVc7UUFDVCxJQUFJLENBQUMsY0FBYzthQUNoQixXQUFXLEVBQUU7YUFDYixJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUU7WUFDZixJQUFLLFFBQWdCLENBQUMsTUFBTSxLQUFLLE9BQU8sRUFBRTtnQkFDeEMsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7Z0JBQ3JCLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLENBQUMsQ0FBQzthQUNsQztpQkFBTTtnQkFDTCxJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztnQkFDekIsS0FBSyxJQUFJLE9BQU8sSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO29CQUNqQyxPQUFPLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQyxTQUFTLEdBQUcsR0FBRyxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUM7aUJBQy9EO2dCQUNELElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQzthQUNuQjtRQUNILENBQUMsQ0FBQzthQUNELEtBQUssQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztJQUN4QyxDQUFDO0lBRUQsVUFBVTtRQUNSLElBQUksQ0FBQyxhQUFhO2FBQ2YsVUFBVSxFQUFFO2FBQ1osSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFO1lBQ2IsSUFBSyxNQUFjLENBQUMsTUFBTSxLQUFLLE9BQU8sRUFBRTtnQkFDdEMsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7Z0JBQ3BCLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLENBQUMsQ0FBQzthQUNoQztpQkFBTTtnQkFDTCxpQkFBaUI7Z0JBQ2pCLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtvQkFDdEIsSUFBSSxDQUFDLFdBQVcsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQztvQkFDakUsSUFBSSxDQUFDLFNBQVMsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQztvQkFDN0QsdUVBQXVFO29CQUN2RSxtRUFBbUU7Z0JBQ3JFLENBQUMsQ0FBQyxDQUFDO2dCQUNILElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDO2dCQUN0QixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7YUFDdEI7UUFDSCxDQUFDLENBQUM7YUFDRCxLQUFLLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFDeEMsQ0FBQztJQUVELGFBQWE7UUFDWCxJQUFJLENBQUMsY0FBYzthQUNoQixhQUFhLEVBQUU7YUFDZixJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUU7WUFDYixJQUFLLE1BQWMsQ0FBQyxNQUFNLEtBQUssT0FBTyxFQUFFO2dCQUN0QyxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQztnQkFDdkIsSUFBSSxDQUFDLGlCQUFpQixDQUFDLE1BQU0sQ0FBQyxDQUFDO2FBQ2hDO2lCQUFNO2dCQUNMLElBQUksQ0FBQyxVQUFVLEdBQUcsTUFBTSxDQUFDO2dCQUN6QixJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7YUFDZDtRQUNILENBQUMsQ0FBQzthQUNELEtBQUssQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztJQUN4QyxDQUFDO0lBRUQsaUJBQWlCLENBQUMsT0FBZ0I7UUFDaEMsSUFBSSxDQUFDLE9BQU8sR0FBRyxFQUFFLENBQUM7UUFDbEIsSUFBSSxDQUFDLHFCQUFxQixHQUFHLElBQUksQ0FBQztRQUNsQyxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU0sS0FBSyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDckUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsVUFBUyxDQUFDLEVBQUUsQ0FBQztZQUNoQyxDQUFDLEdBQUcsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3JCLENBQUMsR0FBRyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDckIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDcEMsQ0FBQyxDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLFNBQVMsS0FBSyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDNUUsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQy9CLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsZUFBZSxLQUFLLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQztRQUNsRixJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLGVBQWUsS0FBSyxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUM7UUFDakYsSUFBSSxDQUFDLGdCQUFnQixHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLGVBQWUsS0FBSyxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUM7UUFFdkYsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7WUFDaEMsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUM7U0FDMUI7YUFBTTtZQUNMLElBQUksQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDO1lBQzFCLEtBQUssSUFBSSxJQUFJLElBQUksSUFBSSxDQUFDLFVBQVUsRUFBRTtnQkFDaEMsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsUUFBUSxLQUFLLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFDcEUsSUFBSSxVQUFVLEdBQUc7b0JBQ2YsTUFBTSxFQUFFLE1BQU07b0JBQ2QsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJO29CQUNmLGVBQWUsRUFBRSxJQUFJLENBQUMsZUFBZTtpQkFDdEMsQ0FBQztnQkFDRixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQzthQUMvQjtZQUNELElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQztTQUNuQztRQUNELElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUM7SUFDbkMsQ0FBQztJQUVELGdCQUFnQixDQUFDLE1BQWM7UUFDN0IsSUFBSSxDQUFDLGdCQUFnQixHQUFHLEVBQUUsQ0FBQztRQUMzQixJQUFJLENBQUMsY0FBYyxHQUFHLEVBQUUsQ0FBQztRQUN6QixJQUFJLENBQUMsb0JBQW9CLEdBQUcsSUFBSSxDQUFDO1FBQ2pDLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUM7UUFFN0MsSUFBSSxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLFFBQVEsS0FBSyxNQUFNLENBQUMsUUFBUSxJQUFJLENBQUMsQ0FBQyxlQUFlLEtBQUssR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDO1FBQ25ILElBQUksQ0FBQyxrQkFBa0IsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxRQUFRLEtBQUssTUFBTSxDQUFDLFFBQVEsSUFBSSxDQUFDLENBQUMsZUFBZSxLQUFLLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQztRQUNwSCxJQUFJLENBQUMscUJBQXFCLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsUUFBUSxLQUFLLE1BQU0sQ0FBQyxRQUFRLElBQUksQ0FBQyxDQUFDLGVBQWUsS0FBSyxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUM7UUFFeEgsSUFBSSxJQUFJLENBQUMsWUFBWSxFQUFFO1lBQ3JCLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3pDLElBQUksQ0FBQyxZQUFZLEdBQUcsRUFBRSxDQUFDO1lBQ3ZCLEtBQUssSUFBSSxJQUFJLElBQUksS0FBSyxFQUFFO2dCQUN0QixJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUMzQixxQkFBcUI7Z0JBQ3JCLHNCQUFzQjtnQkFDdEIsc0NBQXNDO2dCQUN0QyxvQ0FBb0M7Z0JBQ3BDLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQzlCO1NBQ0Y7UUFFRCxJQUFJLFdBQVcsQ0FBQztRQUVoQixJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtZQUMxQixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQztTQUMxQjthQUFNO1lBQ0wsSUFBSSxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUM7WUFDMUIsSUFBSSxDQUFDLGdCQUFnQixHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLFFBQVEsS0FBSyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDcEYsS0FBSyxJQUFJLElBQUksSUFBSSxJQUFJLENBQUMsZ0JBQWdCLEVBQUU7Z0JBQ3RDLFdBQVcsR0FBRztvQkFDWixPQUFPLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxLQUFLLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQy9ELFNBQVMsRUFBRSxJQUFJLENBQUMsU0FBUztvQkFDekIsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPO29CQUNyQixjQUFjLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxLQUFLLElBQUksQ0FBQyxNQUFNLElBQUksQ0FBQyxDQUFDLFFBQVEsS0FBSyxNQUFNLENBQUMsUUFBUSxDQUFDO2lCQUNsRyxDQUFDO2dCQUNGLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO2FBQ3ZDO1NBQ0Y7UUFFRCxJQUFJLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtZQUNwQyxJQUFJLENBQUMsa0JBQWtCLEdBQUcsSUFBSSxDQUFDO1NBQ2hDO2FBQU07WUFDTCxJQUFJLENBQUMsa0JBQWtCLEdBQUcsS0FBSyxDQUFDO1NBQ2pDO1FBQ0QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQztJQUNuQyxDQUFDO0lBRUQsZ0JBQWdCLENBQUMsUUFBUTtRQUN2QixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUM7UUFDbEMsSUFBSSxRQUFRLEtBQUssU0FBUyxFQUFFO1lBQzFCLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsZUFBZSxLQUFLLEdBQUcsQ0FBQyxDQUFDO1NBQ3BFO2FBQU0sSUFBSSxRQUFRLEtBQUssVUFBVSxFQUFFO1lBQ2xDLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsZUFBZSxLQUFLLEdBQUcsQ0FBQyxDQUFDO1NBQ3BFO2FBQU0sSUFBSSxRQUFRLEtBQUssYUFBYSxFQUFFO1lBQ3JDLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsZUFBZSxLQUFLLElBQUksQ0FBQyxDQUFDO1NBQ3JFO0lBQ0gsQ0FBQztJQUVELGFBQWE7UUFDWCxJQUFJLENBQUMsb0JBQW9CLEdBQUcsS0FBSyxDQUFDO1FBQ2xDLElBQUksQ0FBQyxxQkFBcUIsR0FBRyxLQUFLLENBQUM7UUFDbkMsSUFBSSxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUM7SUFDNUIsQ0FBQztJQUVELGlCQUFpQixDQUFDLEtBQUs7UUFDckIsSUFBSSxDQUNGLEtBQUssQ0FBQyxLQUFLLEVBQ1gsS0FBSyxDQUFDLEdBQUcsRUFDVCxPQUFPLENBQ1IsQ0FBQztJQUNKLENBQUM7SUFFRCxNQUFNO1FBQ0osTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUN4QixDQUFDO0NBQ0YsQ0FBQTtBQTFOWSx5QkFBeUI7SUFOckMsZ0JBQVMsQ0FBQztRQUNULFFBQVEsRUFBRSwwQkFBMEI7UUFDcEMsV0FBVyxFQUFFLHFFQUFxRTtRQUNsRixTQUFTLEVBQUUsQ0FBQyxvRUFBb0UsQ0FBQztLQUNsRixDQUFDO0lBOEJjLFdBQUEsYUFBTSxDQUFDLDJCQUFRLENBQUMsQ0FBQTtxQ0FBbUIsUUFBUSxFQUFrQixlQUFNLEVBQTBCLGdDQUFjLEVBQXlCLDhCQUFhO0dBNUJwSix5QkFBeUIsQ0EwTnJDO0FBMU5ZLDhEQUF5QiIsImZpbGUiOiJhcHAvY29tcG9uZW50cy9hdHRlbmRhbmNlLXJlcG9ydC9hdHRlbmRhbmNlLXJlcG9ydC5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5qZWN0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcbmltcG9ydCB7IFN0dWRlbnRTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL3N0dWRlbnQuc2VydmljZVwiO1xyXG5pbXBvcnQgeyBTdHVkZW50IH0gZnJvbSBcIi4uLy4uL21vZGVscy9zdHVkZW50XCI7XHJcbmltcG9ydCB7IENvdXJzZVNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvY291cnNlLnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgQ291cnNlIH0gZnJvbSBcIi4uLy4uL21vZGVscy9jb3Vyc2VcIjtcclxuaW1wb3J0IHsgRE9DVU1FTlQgfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcclxuZGVjbGFyZSB2YXIgbW9tZW50OiBhbnk7XHJcbmRlY2xhcmUgdmFyIHN3YWw6IGFueTtcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnYXR0ZW5kYW5jZVJlcG9ydENvbXBvbmV0JyxcclxuICB0ZW1wbGF0ZVVybDogJy4vYXBwL2NvbXBvbmVudHMvYXR0ZW5kYW5jZS1yZXBvcnQvYXR0ZW5kYW5jZS1yZXBvcnQuY29tcG9uZW50Lmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL2FwcC9jb21wb25lbnRzL2F0dGVuZGFuY2UtcmVwb3J0L2F0dGVuZGFuY2UtcmVwb3J0LmNvbXBvbmVudC5jc3MnXVxyXG59KVxyXG5cclxuZXhwb3J0IGNsYXNzIEF0dGVuZGFuY2VSZXBvcnRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG4gIGRhdGE6IGFueTtcclxuICBjb3Vyc2VzOiBDb3Vyc2VbXTtcclxuICBzdHVkZW50czogU3R1ZGVudFtdO1xyXG4gIHRvdGFsQWJzZW5jZXM6IGFueTtcclxuICBzdHVkZW50QXR0ZW5kYW5jZVZpZXc6IGJvb2xlYW4gPSBmYWxzZTtcclxuICBzdHVkZW50OiBhbnlbXTtcclxuICBhdHRlbmRhbmNlOiBhbnlbXTtcclxuICByZWNvcmRzID0gW107XHJcbiAgcmVjb3Jkc0JhY2t1cCA9IFtdO1xyXG4gIHRvdGFsUHJlc2VudDogYW55O1xyXG4gIHRvdGFsQWJzZW50OiBhbnk7XHJcbiAgdG90YWxNYWRlQ29udGFjdDogYW55O1xyXG4gIG5vQXR0ZW5kYW5jZTogYm9vbGVhbiA9IGZhbHNlO1xyXG4gIHN0dWRlbnRSZXBvcnQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuICB0aW1ldGFibGVzOiBhbnlbXTtcclxuICBjb3Vyc2VBdHRlbmRhbmNlVmlldzogYm9vbGVhbiA9IGZhbHNlO1xyXG4gIGNvdXJzZTogYW55O1xyXG4gIGNsYXNzVGltZVN0cjogYW55O1xyXG4gIGNvdXJzZURhdGE6IGFueVtdO1xyXG4gIGNvdXJzZVN0dWRlbnRzOiBhbnlbXTtcclxuICBjb3Vyc2VUaW1ldGFibGVzOiBhbnlbXTtcclxuICBzdHVkZW50UmVjb3JkOiBhbnlbXTtcclxuICBub1N0dWRlbnRzRW5yb2xsZWQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuICBjbGFzc0Fic2VuY2VUb3RhbDogYW55O1xyXG4gIGNsYXNzUHJlc2VuY2VUb3RhbDogYW55O1xyXG4gIGNsYXNzTWFkZUNvbnRhY3RUb3RhbDogYW55O1xyXG5cclxuICBjb25zdHJ1Y3RvciggQEluamVjdChET0NVTUVOVCkgcHJpdmF0ZSBkb2N1bWVudDogRG9jdW1lbnQsIHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsIHByaXZhdGUgc3R1ZGVudFNlcnZpY2U6IFN0dWRlbnRTZXJ2aWNlLCBwcml2YXRlIGNvdXJzZVNlcnZpY2U6IENvdXJzZVNlcnZpY2UpIHtcclxuXHJcbiAgfVxyXG5cclxuICBuZ09uSW5pdCgpIHtcclxuICAgIHN3YWwoe1xyXG4gICAgICB0aXRsZTogJ0xvYWRpbmcuLi4nLFxyXG4gICAgICBhbGxvd091dHNpZGVDbGljazogZmFsc2VcclxuICAgIH0pO1xyXG4gICAgc3dhbC5zaG93TG9hZGluZygpO1xyXG4gICAgdGhpcy5zdHVkZW50U2VydmljZVxyXG4gICAgICAuZ2V0QWxsQXR0ZW5kYW5jZSgpXHJcbiAgICAgIC50aGVuKGF0dGVuZGFuY2UgPT4ge1xyXG4gICAgICAgIGlmICgoYXR0ZW5kYW5jZSBhcyBhbnkpLnJlc3VsdCA9PT0gJ2Vycm9yJykge1xyXG4gICAgICAgICAgdGhpcy5kYXRhID0gbnVsbDtcclxuICAgICAgICAgIHRoaXMuZGlzcGxheUVycm9yQWxlcnQoYXR0ZW5kYW5jZSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHRoaXMuZGF0YSA9IGF0dGVuZGFuY2U7XHJcbiAgICAgICAgICB0aGlzLmdldFN0dWRlbnRzKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gICAgICAuY2F0Y2goZXJyb3IgPT4gY29uc29sZS5sb2coZXJyb3IpKTtcclxuICB9XHJcblxyXG4gIGdldFN0dWRlbnRzKCkge1xyXG4gICAgdGhpcy5zdHVkZW50U2VydmljZVxyXG4gICAgICAuZ2V0U3R1ZGVudHMoKVxyXG4gICAgICAudGhlbihzdHVkZW50cyA9PiB7XHJcbiAgICAgICAgaWYgKChzdHVkZW50cyBhcyBhbnkpLnJlc3VsdCA9PT0gJ2Vycm9yJykge1xyXG4gICAgICAgICAgdGhpcy5zdHVkZW50cyA9IG51bGw7XHJcbiAgICAgICAgICB0aGlzLmRpc3BsYXlFcnJvckFsZXJ0KHN0dWRlbnRzKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdGhpcy5zdHVkZW50cyA9IHN0dWRlbnRzO1xyXG4gICAgICAgICAgZm9yIChsZXQgc3R1ZGVudCBvZiB0aGlzLnN0dWRlbnRzKSB7XHJcbiAgICAgICAgICAgIHN0dWRlbnQuZnVsbE5hbWUgPSBzdHVkZW50LmZpcnN0TmFtZSArIFwiIFwiICsgc3R1ZGVudC5sYXN0TmFtZTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHRoaXMuZ2V0Q291cnNlcygpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuICAgICAgLmNhdGNoKGVycm9yID0+IGNvbnNvbGUubG9nKGVycm9yKSk7XHJcbiAgfVxyXG5cclxuICBnZXRDb3Vyc2VzKCkge1xyXG4gICAgdGhpcy5jb3Vyc2VTZXJ2aWNlXHJcbiAgICAgIC5nZXRDb3Vyc2VzKClcclxuICAgICAgLnRoZW4ocmVzdWx0ID0+IHtcclxuICAgICAgICBpZiAoKHJlc3VsdCBhcyBhbnkpLnJlc3VsdCA9PT0gJ2Vycm9yJykge1xyXG4gICAgICAgICAgdGhpcy5jb3Vyc2VzID0gbnVsbDtcclxuICAgICAgICAgIHRoaXMuZGlzcGxheUVycm9yQWxlcnQocmVzdWx0KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgLy9mb3JtYXQgZGF0ZXRpbWVcclxuICAgICAgICAgIHJlc3VsdC5mb3JFYWNoKChpdGVtKSA9PiB7XHJcbiAgICAgICAgICAgIGl0ZW0uY291cnNlU3RhcnQgPSBtb21lbnQoaXRlbS5jb3Vyc2VTdGFydCkuZm9ybWF0KCdZWVlZLU1NLUREJyk7XHJcbiAgICAgICAgICAgIGl0ZW0uY291cnNlRW5kID0gbW9tZW50KGl0ZW0uY291cnNlRW5kKS5mb3JtYXQoJ1lZWVktTU0tREQnKTtcclxuICAgICAgICAgICAgLy8gaXRlbS5jbGFzc1N0YXJ0VGltZSA9IG1vbWVudChpdGVtLmNsYXNzU3RhcnRUaW1lKS5mb3JtYXQoJ2hoOm1tIEEnKTtcclxuICAgICAgICAgICAgLy8gaXRlbS5jbGFzc0VuZFRpbWUgPSBtb21lbnQoaXRlbS5jbGFzc0VuZFRpbWUpLmZvcm1hdCgnaGg6bW0gQScpO1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgICB0aGlzLmNvdXJzZXMgPSByZXN1bHQ7XHJcbiAgICAgICAgICB0aGlzLmdldFRpbWV0YWJsZXMoKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pXHJcbiAgICAgIC5jYXRjaChlcnJvciA9PiBjb25zb2xlLmxvZyhlcnJvcikpO1xyXG4gIH1cclxuXHJcbiAgZ2V0VGltZXRhYmxlcygpIHtcclxuICAgIHRoaXMuc3R1ZGVudFNlcnZpY2VcclxuICAgICAgLmdldFRpbWV0YWJsZXMoKVxyXG4gICAgICAudGhlbihyZXN1bHQgPT4ge1xyXG4gICAgICAgIGlmICgocmVzdWx0IGFzIGFueSkucmVzdWx0ID09PSAnZXJyb3InKSB7XHJcbiAgICAgICAgICB0aGlzLnRpbWV0YWJsZXMgPSBudWxsO1xyXG4gICAgICAgICAgdGhpcy5kaXNwbGF5RXJyb3JBbGVydChyZXN1bHQpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB0aGlzLnRpbWV0YWJsZXMgPSByZXN1bHQ7XHJcbiAgICAgICAgICBzd2FsLmNsb3NlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gICAgICAuY2F0Y2goZXJyb3IgPT4gY29uc29sZS5sb2coZXJyb3IpKTtcclxuICB9XHJcblxyXG4gIHZpZXdTdHVkZW50UmVwb3J0KHN0dWRlbnQ6IFN0dWRlbnQpIHtcclxuICAgIHRoaXMucmVjb3JkcyA9IFtdO1xyXG4gICAgdGhpcy5zdHVkZW50QXR0ZW5kYW5jZVZpZXcgPSB0cnVlO1xyXG4gICAgdGhpcy5hdHRlbmRhbmNlID0gdGhpcy5kYXRhLmZpbHRlcih4ID0+IHgudXNlcklEID09PSBzdHVkZW50LnVzZXJJRCk7XHJcbiAgICB0aGlzLmF0dGVuZGFuY2Uuc29ydChmdW5jdGlvbihhLCBiKSB7XHJcbiAgICAgIGEgPSBuZXcgRGF0ZShhLmRhdGUpO1xyXG4gICAgICBiID0gbmV3IERhdGUoYi5kYXRlKTtcclxuICAgICAgcmV0dXJuIGEgPiBiID8gLTEgOiBhIDwgYiA/IDEgOiAwO1xyXG4gICAgfSk7XHJcbiAgICB0aGlzLnN0dWRlbnQgPSB0aGlzLnN0dWRlbnRzLmZpbHRlcih4ID0+IHguc3R1ZGVudElEID09PSBzdHVkZW50LnN0dWRlbnRJRCk7XHJcbiAgICB0aGlzLnN0dWRlbnQgPSB0aGlzLnN0dWRlbnRbMF07XHJcbiAgICB0aGlzLnRvdGFsUHJlc2VudCA9IHRoaXMuYXR0ZW5kYW5jZS5maWx0ZXIoeCA9PiB4LmF0dGVuZGFuY2VWYWx1ZSA9PT0gJ1AnKS5sZW5ndGg7XHJcbiAgICB0aGlzLnRvdGFsQWJzZW50ID0gdGhpcy5hdHRlbmRhbmNlLmZpbHRlcih4ID0+IHguYXR0ZW5kYW5jZVZhbHVlID09PSAnQScpLmxlbmd0aDtcclxuICAgIHRoaXMudG90YWxNYWRlQ29udGFjdCA9IHRoaXMuYXR0ZW5kYW5jZS5maWx0ZXIoeCA9PiB4LmF0dGVuZGFuY2VWYWx1ZSA9PT0gJ01DJykubGVuZ3RoO1xyXG5cclxuICAgIGlmICh0aGlzLmF0dGVuZGFuY2UubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgIHRoaXMubm9BdHRlbmRhbmNlID0gdHJ1ZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMubm9BdHRlbmRhbmNlID0gZmFsc2U7XHJcbiAgICAgIGZvciAobGV0IGl0ZW0gb2YgdGhpcy5hdHRlbmRhbmNlKSB7XHJcbiAgICAgICAgdmFyIGNvdXJzZSA9IHRoaXMuY291cnNlcy5maWx0ZXIoeCA9PiB4LmNvdXJzZUlEID09PSBpdGVtLmNvdXJzZUlEKTtcclxuICAgICAgICB2YXIgYXR0ZW5kYW5jZSA9IHtcclxuICAgICAgICAgIGNvdXJzZTogY291cnNlLFxyXG4gICAgICAgICAgZGF0ZTogaXRlbS5kYXRlLFxyXG4gICAgICAgICAgYXR0ZW5kYW5jZVZhbHVlOiBpdGVtLmF0dGVuZGFuY2VWYWx1ZVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5yZWNvcmRzLnB1c2goYXR0ZW5kYW5jZSk7XHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5yZWNvcmRzQmFja3VwID0gdGhpcy5yZWNvcmRzO1xyXG4gICAgfVxyXG4gICAgdGhpcy5kb2N1bWVudC5ib2R5LnNjcm9sbFRvcCA9IDA7XHJcbiAgfVxyXG5cclxuICB2aWV3Q291cnNlUmVwb3J0KGNvdXJzZTogQ291cnNlKSB7XHJcbiAgICB0aGlzLmNvdXJzZVRpbWV0YWJsZXMgPSBbXTtcclxuICAgIHRoaXMuY291cnNlU3R1ZGVudHMgPSBbXTtcclxuICAgIHRoaXMuY291cnNlQXR0ZW5kYW5jZVZpZXcgPSB0cnVlO1xyXG4gICAgdGhpcy5jb3Vyc2UgPSBjb3Vyc2U7XHJcbiAgICB0aGlzLmNsYXNzVGltZVN0ciA9IHRoaXMuY291cnNlLmNsYXNzVGltZVN0cjtcclxuXHJcbiAgICB0aGlzLmNsYXNzQWJzZW5jZVRvdGFsID0gdGhpcy5kYXRhLmZpbHRlcih4ID0+IHguY291cnNlSUQgPT09IGNvdXJzZS5jb3Vyc2VJRCAmJiB4LmF0dGVuZGFuY2VWYWx1ZSA9PT0gJ0EnKS5sZW5ndGg7XHJcbiAgICB0aGlzLmNsYXNzUHJlc2VuY2VUb3RhbCA9IHRoaXMuZGF0YS5maWx0ZXIoeCA9PiB4LmNvdXJzZUlEID09PSBjb3Vyc2UuY291cnNlSUQgJiYgeC5hdHRlbmRhbmNlVmFsdWUgPT09ICdQJykubGVuZ3RoO1xyXG4gICAgdGhpcy5jbGFzc01hZGVDb250YWN0VG90YWwgPSB0aGlzLmRhdGEuZmlsdGVyKHggPT4geC5jb3Vyc2VJRCA9PT0gY291cnNlLmNvdXJzZUlEICYmIHguYXR0ZW5kYW5jZVZhbHVlID09PSAnTUMnKS5sZW5ndGg7XHJcblxyXG4gICAgaWYgKHRoaXMuY2xhc3NUaW1lU3RyKSB7XHJcbiAgICAgIHZhciBhcnJheSA9IHRoaXMuY2xhc3NUaW1lU3RyLnNwbGl0KCcsJyk7XHJcbiAgICAgIHRoaXMuY2xhc3NUaW1lU3RyID0gW107XHJcbiAgICAgIGZvciAobGV0IGl0ZW0gb2YgYXJyYXkpIHtcclxuICAgICAgICB2YXIgZGF0ZSA9IGl0ZW0uc3BsaXQoJyAnKTtcclxuICAgICAgICAvLyB2YXIgZGF5ID0gZGF0ZVswXTtcclxuICAgICAgICAvLyB2YXIgdGltZSA9IGRhdGVbMV07XHJcbiAgICAgICAgLy8gdmFyIHN0YXJ0VGltZSA9IHRpbWUuc3BsaXQoJy0nKVswXTtcclxuICAgICAgICAvLyB2YXIgZW5kVGltZSA9IHRpbWUuc3BsaXQoJy0nKVsxXTtcclxuICAgICAgICB0aGlzLmNsYXNzVGltZVN0ci5wdXNoKGRhdGUpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIHN0dWRlbnRJbmZvO1xyXG5cclxuICAgIGlmICh0aGlzLmRhdGEubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgIHRoaXMubm9BdHRlbmRhbmNlID0gdHJ1ZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMubm9BdHRlbmRhbmNlID0gZmFsc2U7XHJcbiAgICAgIHRoaXMuY291cnNlVGltZXRhYmxlcyA9IHRoaXMudGltZXRhYmxlcy5maWx0ZXIoeCA9PiB4LmNvdXJzZUlEID09PSBjb3Vyc2UuY291cnNlSUQpO1xyXG4gICAgICBmb3IgKGxldCBpdGVtIG9mIHRoaXMuY291cnNlVGltZXRhYmxlcykge1xyXG4gICAgICAgIHN0dWRlbnRJbmZvID0ge1xyXG4gICAgICAgICAgc3R1ZGVudDogdGhpcy5zdHVkZW50cy5maWx0ZXIoeCA9PiB4LnVzZXJJRCA9PT0gaXRlbS51c2VySUQpWzBdLFxyXG4gICAgICAgICAgc3RhcnREYXRlOiBpdGVtLnN0YXJ0RGF0ZSxcclxuICAgICAgICAgIGVuZERhdGU6IGl0ZW0uZW5kRGF0ZSxcclxuICAgICAgICAgIGF0dGVuZGFuY2VJbmZvOiB0aGlzLmRhdGEuZmlsdGVyKHggPT4geC51c2VySUQgPT09IGl0ZW0udXNlcklEICYmIHguY291cnNlSUQgPT09IGNvdXJzZS5jb3Vyc2VJRClcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMuY291cnNlU3R1ZGVudHMucHVzaChzdHVkZW50SW5mbyk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5jb3Vyc2VTdHVkZW50cy5sZW5ndGggPT09IDApIHtcclxuICAgICAgdGhpcy5ub1N0dWRlbnRzRW5yb2xsZWQgPSB0cnVlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5ub1N0dWRlbnRzRW5yb2xsZWQgPSBmYWxzZTtcclxuICAgIH1cclxuICAgIHRoaXMuZG9jdW1lbnQuYm9keS5zY3JvbGxUb3AgPSAwO1xyXG4gIH1cclxuXHJcbiAgZmlsdGVyQXR0ZW5kYW5jZShmaWx0ZXJCeSkge1xyXG4gICAgdGhpcy5yZWNvcmRzID0gdGhpcy5yZWNvcmRzQmFja3VwO1xyXG4gICAgaWYgKGZpbHRlckJ5ID09PSAnYWJzZW5jZScpIHtcclxuICAgICAgdGhpcy5yZWNvcmRzID0gdGhpcy5yZWNvcmRzLmZpbHRlcih4ID0+IHguYXR0ZW5kYW5jZVZhbHVlID09PSAnQScpO1xyXG4gICAgfSBlbHNlIGlmIChmaWx0ZXJCeSA9PT0gJ3ByZXNlbmNlJykge1xyXG4gICAgICB0aGlzLnJlY29yZHMgPSB0aGlzLnJlY29yZHMuZmlsdGVyKHggPT4geC5hdHRlbmRhbmNlVmFsdWUgPT09ICdQJyk7XHJcbiAgICB9IGVsc2UgaWYgKGZpbHRlckJ5ID09PSAnbWFkZUNvbnRhY3QnKSB7XHJcbiAgICAgIHRoaXMucmVjb3JkcyA9IHRoaXMucmVjb3Jkcy5maWx0ZXIoeCA9PiB4LmF0dGVuZGFuY2VWYWx1ZSA9PT0gJ01DJyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBvdmVyYWxsU3RhdHVzKCkge1xyXG4gICAgdGhpcy5jb3Vyc2VBdHRlbmRhbmNlVmlldyA9IGZhbHNlO1xyXG4gICAgdGhpcy5zdHVkZW50QXR0ZW5kYW5jZVZpZXcgPSBmYWxzZTtcclxuICAgIHRoaXMubm9BdHRlbmRhbmNlID0gZmFsc2U7XHJcbiAgfVxyXG5cclxuICBkaXNwbGF5RXJyb3JBbGVydChlcnJvcikge1xyXG4gICAgc3dhbChcclxuICAgICAgZXJyb3IudGl0bGUsXHJcbiAgICAgIGVycm9yLm1zZyxcclxuICAgICAgJ2Vycm9yJ1xyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIGdvQmFjaygpIHtcclxuICAgIHdpbmRvdy5oaXN0b3J5LmJhY2soKTtcclxuICB9XHJcbn1cclxuIl19
