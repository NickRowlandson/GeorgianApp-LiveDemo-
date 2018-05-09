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
var WaitListComponent = /** @class */ (function () {
    function WaitListComponent(router, CourseService, StudentService, StaffService) {
        this.router = router;
        this.CourseService = CourseService;
        this.StudentService = StudentService;
        this.StaffService = StaffService;
        this.studentsWaiting = [];
        this.showForm = false;
    }
    WaitListComponent.prototype.ngOnInit = function () {
        swal({
            title: 'Loading...',
            allowOutsideClick: false
        });
        swal.showLoading();
        this.getStudents();
        //this.getTimetables();
    };
    WaitListComponent.prototype.getStudents = function () {
        var _this = this;
        this.StudentService
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
            .catch(function (error) { return console.log("Error - Get students: " + error); });
    };
    WaitListComponent.prototype.getCourses = function () {
        var _this = this;
        this.CourseService
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
                _this.getWaitList();
            }
        })
            .catch(function (error) { return console.log("Error - Get courses: " + error); });
    };
    WaitListComponent.prototype.getWaitList = function () {
        var _this = this;
        this.studentsWaiting = [];
        this.CourseService
            .getWaitList()
            .then(function (result) {
            if (result.result === 'error') {
                _this.waitList = null;
                _this.displayErrorAlert(result);
            }
            else {
                _this.waitList = result;
                var _loop_1 = function (item) {
                    student = _this.students.filter(function (x) { return x.userID === item.studentID; });
                    course = _this.courses.filter(function (x) { return x.courseID === item.courseID; });
                    //student[0].fullName = student[0].firstName + " " + student[0].lastName;
                    // student[0].courseID = course[0].courseID;
                    // student[0].professorId = course[0].professorId;
                    student[0].courseName = course[0].courseName;
                    studentRecord = {
                        fullName: student[0].fullName,
                        courseName: student[0].courseName,
                        date: item.date
                    };
                    _this.studentsWaiting.push(studentRecord);
                };
                var student, course, studentRecord;
                for (var _i = 0, _a = _this.waitList; _i < _a.length; _i++) {
                    var item = _a[_i];
                    _loop_1(item);
                }
                _this.getTimetables();
            }
        })
            .catch(function (error) { return console.log("Error - Get wait list: " + error); });
    };
    WaitListComponent.prototype.getTimetables = function () {
        var _this = this;
        this.StudentService
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
            .catch(function (error) { return console.log("Error - Get timetables: " + error); });
    };
    WaitListComponent.prototype.showWaitListForm = function () {
        this.showForm = true;
    };
    WaitListComponent.prototype.addStudentToWaitList = function () {
        var _this = this;
        var CurrentDate = moment().format();
        var timetable = this.timetables.filter(function (x) { return x.courseID === _this.selectedCourse && x.userID === _this.selectedStudent; });
        if (timetable[0] != null) {
            swal('Whoops!', 'That student is already enrolled in the selected course.', 'warning');
        }
        else if (this.selectedStudent == null || this.selectedCourse == null) {
            swal('Invalid Input', 'Please select both a student and a course.', 'warning');
        }
        else {
            swal({
                title: 'Saving...',
                allowOutsideClick: false
            });
            swal.showLoading();
            this.courseWaitList = null;
            this.showForm = false;
            this.CourseService
                .addToWaitList(this.selectedStudent, this.selectedCourse, CurrentDate)
                .then(function (result) {
                if (result.result === 'error') {
                    _this.displayErrorAlert(result);
                }
                else if (result.result === 'success') {
                    _this.getWaitList();
                    swal.close();
                }
                else {
                    swal('Error', 'Something went wrong while adding student to wait list.', 'error');
                }
            })
                .catch(function (error) { return console.log("Error - Add student to wait list: " + error); });
        }
    };
    WaitListComponent.prototype.closeMenu = function () {
        this.showForm = false;
    };
    WaitListComponent.prototype.gotoStudentEnrollment = function (course, data, event) {
        if (course == null) {
            course = this.courses.filter(function (x) { return x.courseName === data.courseName; });
            course = course[0];
        }
        this.router.navigate(['/student-enrollment', course.courseID, course.professorId, course.courseName]);
    };
    WaitListComponent.prototype.viewCourseWaitList = function (data) {
        this.viewingCourse = data;
        this.studentsWaiting = [];
        this.courseWaitList = this.waitList.filter(function (x) { return x.courseID === data.courseID; });
        var _loop_2 = function (item) {
            student = this_1.students.filter(function (x) { return x.userID === item.studentID; });
            student[0].fullName = student[0].firstName + " " + student[0].lastName;
            studentRecord = {
                fullName: student[0].fullName,
                date: item.date
            };
            this_1.studentsWaiting.push(studentRecord);
        };
        var this_1 = this, student, studentRecord;
        for (var _i = 0, _a = this.courseWaitList; _i < _a.length; _i++) {
            var item = _a[_i];
            _loop_2(item);
        }
    };
    WaitListComponent.prototype.onPrint = function () {
        window.print();
    };
    WaitListComponent.prototype.displayErrorAlert = function (error) {
        swal(error.title, error.msg, 'error');
    };
    WaitListComponent.prototype.goBack = function () {
        window.history.back();
    };
    WaitListComponent = __decorate([
        core_1.Component({
            selector: 'waitList',
            templateUrl: './app/components/wait-list/wait-list.component.html',
            styleUrls: ['./app/components/wait-list/wait-list.component.css']
        }),
        __metadata("design:paramtypes", [router_1.Router, course_service_1.CourseService, student_service_1.StudentService, staff_service_1.StaffService])
    ], WaitListComponent);
    return WaitListComponent;
}());
exports.WaitListComponent = WaitListComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NsaWVudC9hcHAvY29tcG9uZW50cy93YWl0LWxpc3Qvd2FpdC1saXN0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLHNDQUFrRDtBQUNsRCwwQ0FBeUM7QUFDekMsZ0VBQThEO0FBRzlELGtFQUFnRTtBQUNoRSw4REFBNEQ7QUFVNUQ7SUFhRSwyQkFBb0IsTUFBYyxFQUFVLGFBQTRCLEVBQVUsY0FBOEIsRUFBVSxZQUEwQjtRQUFoSSxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQVUsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFBVSxtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFBVSxpQkFBWSxHQUFaLFlBQVksQ0FBYztRQU5wSixvQkFBZSxHQUFPLEVBQUUsQ0FBQztRQUl6QixhQUFRLEdBQVksS0FBSyxDQUFDO0lBSTFCLENBQUM7SUFFRCxvQ0FBUSxHQUFSO1FBQ0UsSUFBSSxDQUFDO1lBQ0gsS0FBSyxFQUFFLFlBQVk7WUFDbkIsaUJBQWlCLEVBQUUsS0FBSztTQUN6QixDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDbkIsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ25CLHVCQUF1QjtJQUN6QixDQUFDO0lBRUQsdUNBQVcsR0FBWDtRQUFBLGlCQWdCQztRQWZDLElBQUksQ0FBQyxjQUFjO2FBQ2hCLFdBQVcsRUFBRTthQUNiLElBQUksQ0FBQyxVQUFBLFFBQVE7WUFDWixJQUFLLFFBQWdCLENBQUMsTUFBTSxLQUFLLE9BQU8sRUFBRTtnQkFDeEMsS0FBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7Z0JBQ3JCLEtBQUksQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLENBQUMsQ0FBQzthQUNsQztpQkFBTTtnQkFDTCxLQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztnQkFDekIsS0FBb0IsVUFBYSxFQUFiLEtBQUEsS0FBSSxDQUFDLFFBQVEsRUFBYixjQUFh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QWU0QixlQUFNLEVBQXlCLDhCQUFhLEVBQTBCLGdDQUFjLEVBQXdCLDRCQUFZO09BYnpJLGlCQUFpQixDQXlNN0I7SUFBRCx3QkFBQztDQXpNRCxBQXlNQyxJQUFBO0FBek1ZLDhDQUFpQiIsImZpbGUiOiJhcHAvY29tcG9uZW50cy93YWl0LWxpc3Qvd2FpdC1saXN0LmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcbmltcG9ydCB7IENvdXJzZVNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvY291cnNlLnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgQ291cnNlIH0gZnJvbSBcIi4uLy4uL21vZGVscy9jb3Vyc2VcIjtcclxuaW1wb3J0IHsgU3R1ZGVudCB9IGZyb20gXCIuLi8uLi9tb2RlbHMvc3R1ZGVudFwiO1xyXG5pbXBvcnQgeyBTdHVkZW50U2VydmljZSB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9zdHVkZW50LnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgU3RhZmZTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL3N0YWZmLnNlcnZpY2VcIjtcclxuZGVjbGFyZSB2YXIgc3dhbDogYW55O1xyXG5kZWNsYXJlIHZhciBtb21lbnQ7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ3dhaXRMaXN0JyxcclxuICB0ZW1wbGF0ZVVybDogJy4vYXBwL2NvbXBvbmVudHMvd2FpdC1saXN0L3dhaXQtbGlzdC5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vYXBwL2NvbXBvbmVudHMvd2FpdC1saXN0L3dhaXQtbGlzdC5jb21wb25lbnQuY3NzJ11cclxufSlcclxuXHJcbmV4cG9ydCBjbGFzcyBXYWl0TGlzdENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgZGF0YTogYW55O1xyXG4gIHN0dWRlbnRzOiBTdHVkZW50W107XHJcbiAgY291cnNlczogQ291cnNlW107XHJcbiAgd2FpdExpc3Q6IGFueVtdO1xyXG4gIHRpbWV0YWJsZXM6IGFueVtdO1xyXG4gIGNvdXJzZVdhaXRMaXN0OiBhbnlbXTtcclxuICBzdHVkZW50c1dhaXRpbmc6YW55ID0gW107XHJcbiAgdmlld2luZ0NvdXJzZTogQ291cnNlW107XHJcbiAgc2VsZWN0ZWRDb3Vyc2U6IENvdXJzZVtdO1xyXG4gIHNlbGVjdGVkU3R1ZGVudDogU3R1ZGVudFtdO1xyXG4gIHNob3dGb3JtOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsIHByaXZhdGUgQ291cnNlU2VydmljZTogQ291cnNlU2VydmljZSwgcHJpdmF0ZSBTdHVkZW50U2VydmljZTogU3R1ZGVudFNlcnZpY2UsIHByaXZhdGUgU3RhZmZTZXJ2aWNlOiBTdGFmZlNlcnZpY2UpIHtcclxuXHJcbiAgfVxyXG5cclxuICBuZ09uSW5pdCgpIHtcclxuICAgIHN3YWwoe1xyXG4gICAgICB0aXRsZTogJ0xvYWRpbmcuLi4nLFxyXG4gICAgICBhbGxvd091dHNpZGVDbGljazogZmFsc2VcclxuICAgIH0pO1xyXG4gICAgc3dhbC5zaG93TG9hZGluZygpO1xyXG4gICAgdGhpcy5nZXRTdHVkZW50cygpO1xyXG4gICAgLy90aGlzLmdldFRpbWV0YWJsZXMoKTtcclxuICB9XHJcblxyXG4gIGdldFN0dWRlbnRzKCkge1xyXG4gICAgdGhpcy5TdHVkZW50U2VydmljZVxyXG4gICAgICAuZ2V0U3R1ZGVudHMoKVxyXG4gICAgICAudGhlbihzdHVkZW50cyA9PiB7XHJcbiAgICAgICAgaWYgKChzdHVkZW50cyBhcyBhbnkpLnJlc3VsdCA9PT0gJ2Vycm9yJykge1xyXG4gICAgICAgICAgdGhpcy5zdHVkZW50cyA9IG51bGw7XHJcbiAgICAgICAgICB0aGlzLmRpc3BsYXlFcnJvckFsZXJ0KHN0dWRlbnRzKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdGhpcy5zdHVkZW50cyA9IHN0dWRlbnRzO1xyXG4gICAgICAgICAgZm9yIChsZXQgc3R1ZGVudCBvZiB0aGlzLnN0dWRlbnRzKSB7XHJcbiAgICAgICAgICAgIHN0dWRlbnQuZnVsbE5hbWUgPSBzdHVkZW50LmZpcnN0TmFtZSArIFwiIFwiICsgc3R1ZGVudC5sYXN0TmFtZTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHRoaXMuZ2V0Q291cnNlcygpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuICAgICAgLmNhdGNoKGVycm9yID0+IGNvbnNvbGUubG9nKFwiRXJyb3IgLSBHZXQgc3R1ZGVudHM6IFwiICsgZXJyb3IpKTtcclxuICB9XHJcblxyXG4gIGdldENvdXJzZXMoKSB7XHJcbiAgICB0aGlzLkNvdXJzZVNlcnZpY2VcclxuICAgICAgLmdldENvdXJzZXMoKVxyXG4gICAgICAudGhlbihyZXN1bHQgPT4ge1xyXG4gICAgICAgIGlmICgocmVzdWx0IGFzIGFueSkucmVzdWx0ID09PSAnZXJyb3InKSB7XHJcbiAgICAgICAgICB0aGlzLmNvdXJzZXMgPSBudWxsO1xyXG4gICAgICAgICAgdGhpcy5kaXNwbGF5RXJyb3JBbGVydChyZXN1bHQpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAvL2Zvcm1hdCBkYXRldGltZVxyXG4gICAgICAgICAgcmVzdWx0LmZvckVhY2goKGl0ZW0pID0+IHtcclxuICAgICAgICAgICAgaXRlbS5jb3Vyc2VTdGFydCA9IG1vbWVudChpdGVtLmNvdXJzZVN0YXJ0KS5mb3JtYXQoJ1lZWVktTU0tREQnKTtcclxuICAgICAgICAgICAgaXRlbS5jb3Vyc2VFbmQgPSBtb21lbnQoaXRlbS5jb3Vyc2VFbmQpLmZvcm1hdCgnWVlZWS1NTS1ERCcpO1xyXG4gICAgICAgICAgICAvLyBpdGVtLmNsYXNzU3RhcnRUaW1lID0gbW9tZW50KGl0ZW0uY2xhc3NTdGFydFRpbWUpLmZvcm1hdCgnaGg6bW0gQScpO1xyXG4gICAgICAgICAgICAvLyBpdGVtLmNsYXNzRW5kVGltZSA9IG1vbWVudChpdGVtLmNsYXNzRW5kVGltZSkuZm9ybWF0KCdoaDptbSBBJyk7XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICAgIHRoaXMuY291cnNlcyA9IHJlc3VsdDtcclxuICAgICAgICAgIHRoaXMuZ2V0V2FpdExpc3QoKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pXHJcbiAgICAgIC5jYXRjaChlcnJvciA9PiBjb25zb2xlLmxvZyhcIkVycm9yIC0gR2V0IGNvdXJzZXM6IFwiICsgZXJyb3IpKTtcclxuICB9XHJcblxyXG4gIGdldFdhaXRMaXN0KCkge1xyXG4gICAgdGhpcy5zdHVkZW50c1dhaXRpbmcgPSBbXTtcclxuICAgIHRoaXMuQ291cnNlU2VydmljZVxyXG4gICAgICAuZ2V0V2FpdExpc3QoKVxyXG4gICAgICAudGhlbihyZXN1bHQgPT4ge1xyXG4gICAgICAgIGlmICgocmVzdWx0IGFzIGFueSkucmVzdWx0ID09PSAnZXJyb3InKSB7XHJcbiAgICAgICAgICB0aGlzLndhaXRMaXN0ID0gbnVsbDtcclxuICAgICAgICAgIHRoaXMuZGlzcGxheUVycm9yQWxlcnQocmVzdWx0KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdGhpcy53YWl0TGlzdCA9IHJlc3VsdDtcclxuICAgICAgICAgIGZvciAobGV0IGl0ZW0gb2YgdGhpcy53YWl0TGlzdCkge1xyXG4gICAgICAgICAgICAgdmFyIHN0dWRlbnQgPSB0aGlzLnN0dWRlbnRzLmZpbHRlcih4ID0+IHgudXNlcklEID09PSBpdGVtLnN0dWRlbnRJRCk7XHJcbiAgICAgICAgICAgICB2YXIgY291cnNlID0gdGhpcy5jb3Vyc2VzLmZpbHRlcih4ID0+IHguY291cnNlSUQgPT09IGl0ZW0uY291cnNlSUQpO1xyXG4gICAgICAgICAgICAgLy9zdHVkZW50WzBdLmZ1bGxOYW1lID0gc3R1ZGVudFswXS5maXJzdE5hbWUgKyBcIiBcIiArIHN0dWRlbnRbMF0ubGFzdE5hbWU7XHJcbiAgICAgICAgICAgICAvLyBzdHVkZW50WzBdLmNvdXJzZUlEID0gY291cnNlWzBdLmNvdXJzZUlEO1xyXG4gICAgICAgICAgICAgLy8gc3R1ZGVudFswXS5wcm9mZXNzb3JJZCA9IGNvdXJzZVswXS5wcm9mZXNzb3JJZDtcclxuICAgICAgICAgICAgIHN0dWRlbnRbMF0uY291cnNlTmFtZSA9IGNvdXJzZVswXS5jb3Vyc2VOYW1lO1xyXG4gICAgICAgICAgICAgdmFyIHN0dWRlbnRSZWNvcmQgPSB7XHJcbiAgICAgICAgICAgICAgIGZ1bGxOYW1lOiBzdHVkZW50WzBdLmZ1bGxOYW1lLFxyXG4gICAgICAgICAgICAgICBjb3Vyc2VOYW1lOiBzdHVkZW50WzBdLmNvdXJzZU5hbWUsXHJcbiAgICAgICAgICAgICAgIGRhdGU6IGl0ZW0uZGF0ZVxyXG4gICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgIHRoaXMuc3R1ZGVudHNXYWl0aW5nLnB1c2goc3R1ZGVudFJlY29yZCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICB0aGlzLmdldFRpbWV0YWJsZXMoKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pXHJcbiAgICAgIC5jYXRjaChlcnJvciA9PiBjb25zb2xlLmxvZyhcIkVycm9yIC0gR2V0IHdhaXQgbGlzdDogXCIgKyBlcnJvcikpO1xyXG4gIH1cclxuXHJcbiAgZ2V0VGltZXRhYmxlcygpIHtcclxuICAgIHRoaXMuU3R1ZGVudFNlcnZpY2VcclxuICAgICAgLmdldFRpbWV0YWJsZXMoKVxyXG4gICAgICAudGhlbihyZXN1bHQgPT4ge1xyXG4gICAgICAgIGlmICgocmVzdWx0IGFzIGFueSkucmVzdWx0ID09PSAnZXJyb3InKSB7XHJcbiAgICAgICAgICB0aGlzLnRpbWV0YWJsZXMgPSBudWxsO1xyXG4gICAgICAgICAgdGhpcy5kaXNwbGF5RXJyb3JBbGVydChyZXN1bHQpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB0aGlzLnRpbWV0YWJsZXMgPSByZXN1bHQ7XHJcbiAgICAgICAgICBzd2FsLmNsb3NlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gICAgICAuY2F0Y2goZXJyb3IgPT4gY29uc29sZS5sb2coXCJFcnJvciAtIEdldCB0aW1ldGFibGVzOiBcIiArIGVycm9yKSk7XHJcbiAgfVxyXG5cclxuICBzaG93V2FpdExpc3RGb3JtKCkge1xyXG4gICAgdGhpcy5zaG93Rm9ybSA9IHRydWU7XHJcbiAgfVxyXG5cclxuICBhZGRTdHVkZW50VG9XYWl0TGlzdCgpIHtcclxuICAgIHZhciBDdXJyZW50RGF0ZSA9IG1vbWVudCgpLmZvcm1hdCgpO1xyXG4gICAgdmFyIHRpbWV0YWJsZSA9IHRoaXMudGltZXRhYmxlcy5maWx0ZXIoeCA9PiB4LmNvdXJzZUlEID09PSB0aGlzLnNlbGVjdGVkQ291cnNlICYmIHgudXNlcklEID09PSB0aGlzLnNlbGVjdGVkU3R1ZGVudCk7XHJcbiAgICBpZiAodGltZXRhYmxlWzBdICE9IG51bGwpIHtcclxuICAgICAgICBzd2FsKFxyXG4gICAgICAgICAgJ1dob29wcyEnLFxyXG4gICAgICAgICAgJ1RoYXQgc3R1ZGVudCBpcyBhbHJlYWR5IGVucm9sbGVkIGluIHRoZSBzZWxlY3RlZCBjb3Vyc2UuJyxcclxuICAgICAgICAgICd3YXJuaW5nJ1xyXG4gICAgICAgICk7XHJcbiAgICB9IGVsc2UgaWYgKHRoaXMuc2VsZWN0ZWRTdHVkZW50ID09IG51bGwgfHwgdGhpcy5zZWxlY3RlZENvdXJzZSA9PSBudWxsKSB7XHJcbiAgICAgIHN3YWwoXHJcbiAgICAgICAgJ0ludmFsaWQgSW5wdXQnLFxyXG4gICAgICAgICdQbGVhc2Ugc2VsZWN0IGJvdGggYSBzdHVkZW50IGFuZCBhIGNvdXJzZS4nLFxyXG4gICAgICAgICd3YXJuaW5nJ1xyXG4gICAgICApO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgc3dhbCh7XHJcbiAgICAgICAgdGl0bGU6ICdTYXZpbmcuLi4nLFxyXG4gICAgICAgIGFsbG93T3V0c2lkZUNsaWNrOiBmYWxzZVxyXG4gICAgICB9KTtcclxuICAgICAgc3dhbC5zaG93TG9hZGluZygpO1xyXG4gICAgICB0aGlzLmNvdXJzZVdhaXRMaXN0ID0gbnVsbDtcclxuICAgICAgdGhpcy5zaG93Rm9ybSA9IGZhbHNlO1xyXG4gICAgICB0aGlzLkNvdXJzZVNlcnZpY2VcclxuICAgICAgICAuYWRkVG9XYWl0TGlzdCh0aGlzLnNlbGVjdGVkU3R1ZGVudCwgdGhpcy5zZWxlY3RlZENvdXJzZSwgQ3VycmVudERhdGUpXHJcbiAgICAgICAgLnRoZW4ocmVzdWx0ID0+IHtcclxuICAgICAgICAgIGlmICgocmVzdWx0IGFzIGFueSkucmVzdWx0ID09PSAnZXJyb3InKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZGlzcGxheUVycm9yQWxlcnQocmVzdWx0KTtcclxuICAgICAgICAgIH0gZWxzZSBpZiAoKHJlc3VsdCBhcyBhbnkpLnJlc3VsdCA9PT0gJ3N1Y2Nlc3MnKSAge1xyXG4gICAgICAgICAgICB0aGlzLmdldFdhaXRMaXN0KCk7XHJcbiAgICAgICAgICAgIHN3YWwuY2xvc2UoKTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHN3YWwoXHJcbiAgICAgICAgICAgICAgJ0Vycm9yJyxcclxuICAgICAgICAgICAgICAnU29tZXRoaW5nIHdlbnQgd3Jvbmcgd2hpbGUgYWRkaW5nIHN0dWRlbnQgdG8gd2FpdCBsaXN0LicsXHJcbiAgICAgICAgICAgICAgJ2Vycm9yJ1xyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLmNhdGNoKGVycm9yID0+IGNvbnNvbGUubG9nKFwiRXJyb3IgLSBBZGQgc3R1ZGVudCB0byB3YWl0IGxpc3Q6IFwiICsgZXJyb3IpKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGNsb3NlTWVudSgpIHtcclxuICAgIHRoaXMuc2hvd0Zvcm0gPSBmYWxzZTtcclxuICB9XHJcblxyXG4gIGdvdG9TdHVkZW50RW5yb2xsbWVudChjb3Vyc2UsIGRhdGEsIGV2ZW50OiBhbnkpIHtcclxuICAgIGlmIChjb3Vyc2UgPT0gbnVsbCkge1xyXG4gICAgICBjb3Vyc2UgPSB0aGlzLmNvdXJzZXMuZmlsdGVyKHggPT4geC5jb3Vyc2VOYW1lID09PSBkYXRhLmNvdXJzZU5hbWUpO1xyXG4gICAgICBjb3Vyc2UgPSBjb3Vyc2VbMF07XHJcbiAgICB9XHJcbiAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJy9zdHVkZW50LWVucm9sbG1lbnQnLCBjb3Vyc2UuY291cnNlSUQsIGNvdXJzZS5wcm9mZXNzb3JJZCwgY291cnNlLmNvdXJzZU5hbWVdKTtcclxuICB9XHJcblxyXG4gIHZpZXdDb3Vyc2VXYWl0TGlzdChkYXRhKSB7XHJcbiAgICB0aGlzLnZpZXdpbmdDb3Vyc2UgPSBkYXRhO1xyXG4gICAgdGhpcy5zdHVkZW50c1dhaXRpbmcgPSBbXTtcclxuICAgIHRoaXMuY291cnNlV2FpdExpc3QgPSB0aGlzLndhaXRMaXN0LmZpbHRlcih4ID0+IHguY291cnNlSUQgPT09IGRhdGEuY291cnNlSUQpO1xyXG4gICAgZm9yIChsZXQgaXRlbSBvZiB0aGlzLmNvdXJzZVdhaXRMaXN0KSB7XHJcbiAgICAgICB2YXIgc3R1ZGVudCA9IHRoaXMuc3R1ZGVudHMuZmlsdGVyKHggPT4geC51c2VySUQgPT09IGl0ZW0uc3R1ZGVudElEKTtcclxuICAgICAgIHN0dWRlbnRbMF0uZnVsbE5hbWUgPSBzdHVkZW50WzBdLmZpcnN0TmFtZSArIFwiIFwiICsgc3R1ZGVudFswXS5sYXN0TmFtZTtcclxuICAgICAgIHZhciBzdHVkZW50UmVjb3JkID0ge1xyXG4gICAgICAgICBmdWxsTmFtZTogc3R1ZGVudFswXS5mdWxsTmFtZSxcclxuICAgICAgICAgZGF0ZTogaXRlbS5kYXRlXHJcbiAgICAgICB9O1xyXG4gICAgICAgdGhpcy5zdHVkZW50c1dhaXRpbmcucHVzaChzdHVkZW50UmVjb3JkKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIG9uUHJpbnQoKSB7XHJcbiAgICAod2luZG93IGFzIGFueSkucHJpbnQoKTtcclxuICB9XHJcblxyXG4gIGRpc3BsYXlFcnJvckFsZXJ0KGVycm9yKSB7XHJcbiAgICBzd2FsKFxyXG4gICAgICBlcnJvci50aXRsZSxcclxuICAgICAgZXJyb3IubXNnLFxyXG4gICAgICAnZXJyb3InXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgZ29CYWNrKCkge1xyXG4gICAgd2luZG93Lmhpc3RvcnkuYmFjaygpO1xyXG4gIH1cclxufVxyXG4iXX0=
