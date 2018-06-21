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
var StudentEnrollmentComponent = /** @class */ (function () {
    function StudentEnrollmentComponent(studentService, courseService, route) {
        this.studentService = studentService;
        this.courseService = courseService;
        this.route = route;
        this.loading = true;
        this.tempTimetableArry = [];
    }
    StudentEnrollmentComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.forEach(function (params) {
            _this.courseID = params['courseID'];
            _this.instructorID = params['instructorID'];
            _this.courseName = params['courseName'];
        });
        this.getStudents();
    };
    StudentEnrollmentComponent.prototype.getStudents = function () {
        var _this = this;
        this.studentService
            .getStudents()
            .then(function (result) {
            if (result.result === 'error') {
                _this.students = null;
                _this.displayErrorAlert(result);
            }
            else {
                _this.students = result;
                for (var _i = 0, _a = _this.students; _i < _a.length; _i++) {
                    var student = _a[_i];
                    student.fullName = student.firstName + " " + student.lastName;
                }
                _this.getTimetables();
            }
        }).catch(function (error) { return error; });
    };
    StudentEnrollmentComponent.prototype.getTimetables = function () {
        var _this = this;
        this.studentService
            .getTimetables()
            .then(function (result) {
            if (result.result === 'error') {
                _this.displayErrorAlert(result);
            }
            else {
                _this.studentTimetables = result;
                _this.compareTimetables();
            }
        })
            .catch(function (error) { return error; });
    };
    StudentEnrollmentComponent.prototype.compareTimetables = function () {
        var _loop_1 = function (student) {
            timetable = this_1.studentTimetables.filter(function (x) { return x.userID === student.userID; });
            for (var _i = 0, timetable_1 = timetable; _i < timetable_1.length; _i++) {
                var item = timetable_1[_i];
                itemCourseID = item.courseID.toString();
                if (itemCourseID === this_1.courseID) {
                    student.enrolled = true;
                }
            }
        };
        var this_1 = this, timetable, itemCourseID;
        for (var _i = 0, _a = this.students; _i < _a.length; _i++) {
            var student = _a[_i];
            _loop_1(student);
        }
        this.loading = false;
    };
    StudentEnrollmentComponent.prototype.checkEnrolled = function (student) {
        var _this = this;
        if (student.enrolled) {
            swal({
                title: 'Remove ' + student.firstName + ' ' + student.lastName + ' from ' + this.courseName + '?',
                text: "",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, remove!'
            }).then(function (isConfirm) {
                if (isConfirm.dismiss === "cancel" || isConfirm.dismiss === "overlay") {
                    console.log(isConfirm.dismiss);
                }
                else if (isConfirm) {
                    _this.drop(student);
                }
            }).catch(function (error) {
                console.log(error);
            });
        }
        else {
            this.enroll(student);
        }
    };
    StudentEnrollmentComponent.prototype.enroll = function (student) {
        var _this = this;
        var startDate = moment(student.studentStartDate, "DDD MMM YYYY h:mm:ss LT").isValid();
        var endDate = moment(student.studentEndDate, "DDD MMM YYYY h:mm:ss LT").isValid();
        if (startDate && endDate) {
            this.studentService
                .courseEnroll(student.userID, student.studentStartDate, student.studentEndDate, this.courseID, this.instructorID)
                .then(function (result) {
                if (result.result === 'error') {
                    _this.displayErrorAlert(result);
                }
                else if (result.result === 'success') {
                    student.enrolled = true;
                    swal(_this.courseName, '' + student.firstName + ' ' + student.lastName + ' has been succesfully enrolled.', 'success');
                }
                else {
                    swal('Error', 'Something went wrong while enrolling student.', 'error');
                }
            })
                .catch(function (error) { return error; });
        }
        else {
            swal('Whoops', 'Please input a valid start and end date for the student.', 'warning');
        }
    };
    StudentEnrollmentComponent.prototype.drop = function (student) {
        var _this = this;
        this.studentService
            .courseDrop(student.userID, this.courseID)
            .then(function (result) {
            if (result.result === 'error') {
                _this.displayErrorAlert(result);
            }
            else if (result.result === 'success') {
                student.enrolled = false;
            }
            else {
                swal('Error', 'Something went wrong, please try again.', 'error');
            }
        })
            .catch(function (error) { return error; });
    };
    StudentEnrollmentComponent.prototype.displayErrorAlert = function (error) {
        swal(error.title, error.msg, 'error');
    };
    StudentEnrollmentComponent.prototype.goBack = function () {
        window.history.back();
    };
    StudentEnrollmentComponent = __decorate([
        core_1.Component({
            selector: 'course-selection',
            templateUrl: './app/components/student-enrollment/student-enrollment.component.html',
            styleUrls: ['./app/components/student-enrollment/student-enrollment.component.css']
        }),
        __metadata("design:paramtypes", [student_service_1.StudentService, course_service_1.CourseService, router_1.ActivatedRoute])
    ], StudentEnrollmentComponent);
    return StudentEnrollmentComponent;
}());
exports.StudentEnrollmentComponent = StudentEnrollmentComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NsaWVudC9hcHAvY29tcG9uZW50cy9zdHVkZW50LWVucm9sbG1lbnQvc3R1ZGVudC1lbnJvbGxtZW50LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLHNDQUF5RDtBQUV6RCwwQ0FBeUQ7QUFHekQsZ0VBQThEO0FBQzlELGtFQUFnRTtBQVVoRTtJQVNFLG9DQUFvQixjQUE4QixFQUFVLGFBQTRCLEVBQVUsS0FBcUI7UUFBbkcsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBQVUsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFBVSxVQUFLLEdBQUwsS0FBSyxDQUFnQjtRQUh2SCxZQUFPLEdBQVksSUFBSSxDQUFDO1FBQ3hCLHNCQUFpQixHQUFVLEVBQUUsQ0FBQztJQUk5QixDQUFDO0lBRUQsNkNBQVEsR0FBUjtRQUFBLGlCQU9DO1FBTkMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLFVBQUMsTUFBYztZQUN2QyxLQUFJLENBQUMsUUFBUSxHQUFHLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUNuQyxLQUFJLENBQUMsWUFBWSxHQUFHLE1BQU0sQ0FBQyxjQUFjLENBQUMsQ0FBQztZQUMzQyxLQUFJLENBQUMsVUFBVSxHQUFHLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUN6QyxDQUFDLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUNyQixDQUFDO0lBRUQsZ0RBQVcsR0FBWDtRQUFBLGlCQWVDO1FBZEMsSUFBSSxDQUFDLGNBQWM7YUFDaEIsV0FBVyxFQUFFO2FBQ2IsSUFBSSxDQUFDLFVBQUEsTUFBTTtZQUNWLElBQUssTUFBYyxDQUFDLE1BQU0sS0FBSyxPQUFPLEVBQUU7Z0JBQ3RDLEtBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO2dCQUNyQixLQUFJLENBQUMsaUJBQWlCLENBQUMsTUFBTSxDQUFDLENBQUM7YUFDaEM7aUJB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QUNwRixTQUFTLEVBQUUsQ0FBQyxzRUFBc0UsQ0FBQztTQUNwRixDQUFDO3lDQVdvQyxnQ0FBYyxFQUF5Qiw4QkFBYSxFQUFpQix1QkFBYztPQVQ1RywwQkFBMEIsQ0EwSnRDO0lBQUQsaUNBQUM7Q0ExSkQsQUEwSkMsSUFBQTtBQTFKWSxnRUFBMEIiLCJmaWxlIjoiYXBwL2NvbXBvbmVudHMvc3R1ZGVudC1lbnJvbGxtZW50L3N0dWRlbnQtZW5yb2xsbWVudC5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuaW1wb3J0IHsgQWN0aXZhdGVkUm91dGUsIFBhcmFtcyB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcbmltcG9ydCB7IENvdXJzZSB9IGZyb20gXCIuLi8uLi9tb2RlbHMvY291cnNlXCI7XHJcbmltcG9ydCB7IFN0dWRlbnQgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL1N0dWRlbnRcIjtcclxuaW1wb3J0IHsgQ291cnNlU2VydmljZSB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9jb3Vyc2Uuc2VydmljZVwiO1xyXG5pbXBvcnQgeyBTdHVkZW50U2VydmljZSB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9zdHVkZW50LnNlcnZpY2VcIjtcclxuZGVjbGFyZSB2YXIgc3dhbDogYW55O1xyXG5kZWNsYXJlIHZhciBtb21lbnQ6IGFueTtcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnY291cnNlLXNlbGVjdGlvbicsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL2FwcC9jb21wb25lbnRzL3N0dWRlbnQtZW5yb2xsbWVudC9zdHVkZW50LWVucm9sbG1lbnQuY29tcG9uZW50Lmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL2FwcC9jb21wb25lbnRzL3N0dWRlbnQtZW5yb2xsbWVudC9zdHVkZW50LWVucm9sbG1lbnQuY29tcG9uZW50LmNzcyddXHJcbn0pXHJcblxyXG5leHBvcnQgY2xhc3MgU3R1ZGVudEVucm9sbG1lbnRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG4gIHN0dWRlbnRzOiBTdHVkZW50W107XHJcbiAgY291cnNlSUQ6IGFueTtcclxuICBpbnN0cnVjdG9ySUQ6IGFueTtcclxuICBjb3Vyc2VOYW1lOiBhbnk7XHJcbiAgc3R1ZGVudFRpbWV0YWJsZXM6IGFueVtdO1xyXG4gIGxvYWRpbmc6IGJvb2xlYW4gPSB0cnVlO1xyXG4gIHRlbXBUaW1ldGFibGVBcnJ5OiBhbnlbXSA9IFtdO1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHN0dWRlbnRTZXJ2aWNlOiBTdHVkZW50U2VydmljZSwgcHJpdmF0ZSBjb3Vyc2VTZXJ2aWNlOiBDb3Vyc2VTZXJ2aWNlLCBwcml2YXRlIHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSkge1xyXG5cclxuICB9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgdGhpcy5yb3V0ZS5wYXJhbXMuZm9yRWFjaCgocGFyYW1zOiBQYXJhbXMpID0+IHtcclxuICAgICAgdGhpcy5jb3Vyc2VJRCA9IHBhcmFtc1snY291cnNlSUQnXTtcclxuICAgICAgdGhpcy5pbnN0cnVjdG9ySUQgPSBwYXJhbXNbJ2luc3RydWN0b3JJRCddO1xyXG4gICAgICB0aGlzLmNvdXJzZU5hbWUgPSBwYXJhbXNbJ2NvdXJzZU5hbWUnXTtcclxuICAgIH0pO1xyXG4gICAgdGhpcy5nZXRTdHVkZW50cygpO1xyXG4gIH1cclxuXHJcbiAgZ2V0U3R1ZGVudHMoKSB7XHJcbiAgICB0aGlzLnN0dWRlbnRTZXJ2aWNlXHJcbiAgICAgIC5nZXRTdHVkZW50cygpXHJcbiAgICAgIC50aGVuKHJlc3VsdCA9PiB7XHJcbiAgICAgICAgaWYgKChyZXN1bHQgYXMgYW55KS5yZXN1bHQgPT09ICdlcnJvcicpIHtcclxuICAgICAgICAgIHRoaXMuc3R1ZGVudHMgPSBudWxsO1xyXG4gICAgICAgICAgdGhpcy5kaXNwbGF5RXJyb3JBbGVydChyZXN1bHQpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB0aGlzLnN0dWRlbnRzID0gcmVzdWx0O1xyXG4gICAgICAgICAgZm9yIChsZXQgc3R1ZGVudCBvZiB0aGlzLnN0dWRlbnRzKSB7XHJcbiAgICAgICAgICAgIHN0dWRlbnQuZnVsbE5hbWUgPSBzdHVkZW50LmZpcnN0TmFtZSArIFwiIFwiICsgc3R1ZGVudC5sYXN0TmFtZTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHRoaXMuZ2V0VGltZXRhYmxlcygpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSkuY2F0Y2goZXJyb3IgPT4gZXJyb3IpO1xyXG4gIH1cclxuXHJcbiAgZ2V0VGltZXRhYmxlcygpIHtcclxuICAgIHRoaXMuc3R1ZGVudFNlcnZpY2VcclxuICAgICAgLmdldFRpbWV0YWJsZXMoKVxyXG4gICAgICAudGhlbihyZXN1bHQgPT4ge1xyXG4gICAgICAgIGlmICgocmVzdWx0IGFzIGFueSkucmVzdWx0ID09PSAnZXJyb3InKSB7XHJcbiAgICAgICAgICB0aGlzLmRpc3BsYXlFcnJvckFsZXJ0KHJlc3VsdCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHRoaXMuc3R1ZGVudFRpbWV0YWJsZXMgPSByZXN1bHQ7XHJcbiAgICAgICAgICB0aGlzLmNvbXBhcmVUaW1ldGFibGVzKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gICAgICAuY2F0Y2goZXJyb3IgPT4gZXJyb3IpO1xyXG4gIH1cclxuXHJcbiAgY29tcGFyZVRpbWV0YWJsZXMoKSB7XHJcbiAgICBmb3IgKGxldCBzdHVkZW50IG9mIHRoaXMuc3R1ZGVudHMpIHtcclxuICAgICAgdmFyIHRpbWV0YWJsZSA9IHRoaXMuc3R1ZGVudFRpbWV0YWJsZXMuZmlsdGVyKHggPT4geC51c2VySUQgPT09IHN0dWRlbnQudXNlcklEKTtcclxuICAgICAgZm9yIChsZXQgaXRlbSBvZiB0aW1ldGFibGUpIHtcclxuICAgICAgICB2YXIgaXRlbUNvdXJzZUlEID0gaXRlbS5jb3Vyc2VJRC50b1N0cmluZygpO1xyXG4gICAgICAgIGlmIChpdGVtQ291cnNlSUQgPT09IHRoaXMuY291cnNlSUQpIHtcclxuICAgICAgICAgIHN0dWRlbnQuZW5yb2xsZWQgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgdGhpcy5sb2FkaW5nID0gZmFsc2U7XHJcbiAgfVxyXG5cclxuICBjaGVja0Vucm9sbGVkKHN0dWRlbnQ6IFN0dWRlbnQpIHtcclxuICAgIGlmIChzdHVkZW50LmVucm9sbGVkKSB7XHJcbiAgICAgIHN3YWwoe1xyXG4gICAgICAgIHRpdGxlOiAnUmVtb3ZlICcgKyBzdHVkZW50LmZpcnN0TmFtZSArICcgJyArIHN0dWRlbnQubGFzdE5hbWUgKyAnIGZyb20gJyArIHRoaXMuY291cnNlTmFtZSArICc/JyxcclxuICAgICAgICB0ZXh0OiBcIlwiLFxyXG4gICAgICAgIHR5cGU6ICd3YXJuaW5nJyxcclxuICAgICAgICBzaG93Q2FuY2VsQnV0dG9uOiB0cnVlLFxyXG4gICAgICAgIGNvbmZpcm1CdXR0b25Db2xvcjogJyMzMDg1ZDYnLFxyXG4gICAgICAgIGNhbmNlbEJ1dHRvbkNvbG9yOiAnI2QzMycsXHJcbiAgICAgICAgY29uZmlybUJ1dHRvblRleHQ6ICdZZXMsIHJlbW92ZSEnXHJcbiAgICAgIH0pLnRoZW4oaXNDb25maXJtID0+IHtcclxuICAgICAgICBpZiAoaXNDb25maXJtLmRpc21pc3MgPT09IFwiY2FuY2VsXCIgfHwgaXNDb25maXJtLmRpc21pc3MgPT09IFwib3ZlcmxheVwiKSB7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhpc0NvbmZpcm0uZGlzbWlzcyk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChpc0NvbmZpcm0pIHtcclxuICAgICAgICAgIHRoaXMuZHJvcChzdHVkZW50KTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pLmNhdGNoKGVycm9yID0+IHtcclxuICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XHJcbiAgICAgIH0pO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5lbnJvbGwoc3R1ZGVudCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBlbnJvbGwoc3R1ZGVudDogU3R1ZGVudCkge1xyXG4gICAgdmFyIHN0YXJ0RGF0ZSA9IG1vbWVudChzdHVkZW50LnN0dWRlbnRTdGFydERhdGUsIFwiREREIE1NTSBZWVlZIGg6bW06c3MgTFRcIikuaXNWYWxpZCgpO1xyXG4gICAgdmFyIGVuZERhdGUgPSBtb21lbnQoc3R1ZGVudC5zdHVkZW50RW5kRGF0ZSwgXCJEREQgTU1NIFlZWVkgaDptbTpzcyBMVFwiKS5pc1ZhbGlkKCk7XHJcbiAgICBpZiAoc3RhcnREYXRlICYmIGVuZERhdGUpIHtcclxuICAgICAgdGhpcy5zdHVkZW50U2VydmljZVxyXG4gICAgICAgIC5jb3Vyc2VFbnJvbGwoc3R1ZGVudC51c2VySUQsIHN0dWRlbnQuc3R1ZGVudFN0YXJ0RGF0ZSwgc3R1ZGVudC5zdHVkZW50RW5kRGF0ZSwgdGhpcy5jb3Vyc2VJRCwgdGhpcy5pbnN0cnVjdG9ySUQpXHJcbiAgICAgICAgLnRoZW4ocmVzdWx0ID0+IHtcclxuICAgICAgICAgIGlmICgocmVzdWx0IGFzIGFueSkucmVzdWx0ID09PSAnZXJyb3InKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZGlzcGxheUVycm9yQWxlcnQocmVzdWx0KTtcclxuICAgICAgICAgIH0gZWxzZSBpZiAoKHJlc3VsdCBhcyBhbnkpLnJlc3VsdCA9PT0gJ3N1Y2Nlc3MnKSB7XHJcbiAgICAgICAgICAgIHN0dWRlbnQuZW5yb2xsZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICBzd2FsKFxyXG4gICAgICAgICAgICAgIHRoaXMuY291cnNlTmFtZSxcclxuICAgICAgICAgICAgICAnJyArIHN0dWRlbnQuZmlyc3ROYW1lICsgJyAnICsgc3R1ZGVudC5sYXN0TmFtZSArICcgaGFzIGJlZW4gc3VjY2VzZnVsbHkgZW5yb2xsZWQuJyxcclxuICAgICAgICAgICAgICAnc3VjY2VzcydcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHN3YWwoXHJcbiAgICAgICAgICAgICAgJ0Vycm9yJyxcclxuICAgICAgICAgICAgICAnU29tZXRoaW5nIHdlbnQgd3Jvbmcgd2hpbGUgZW5yb2xsaW5nIHN0dWRlbnQuJyxcclxuICAgICAgICAgICAgICAnZXJyb3InXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4gZXJyb3IpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgc3dhbChcclxuICAgICAgICAnV2hvb3BzJyxcclxuICAgICAgICAnUGxlYXNlIGlucHV0IGEgdmFsaWQgc3RhcnQgYW5kIGVuZCBkYXRlIGZvciB0aGUgc3R1ZGVudC4nLFxyXG4gICAgICAgICd3YXJuaW5nJ1xyXG4gICAgICApO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZHJvcChzdHVkZW50OiBTdHVkZW50KSB7XHJcbiAgICB0aGlzLnN0dWRlbnRTZXJ2aWNlXHJcbiAgICAgIC5jb3Vyc2VEcm9wKHN0dWRlbnQudXNlcklELCB0aGlzLmNvdXJzZUlEKVxyXG4gICAgICAudGhlbihyZXN1bHQgPT4ge1xyXG4gICAgICAgIGlmICgocmVzdWx0IGFzIGFueSkucmVzdWx0ID09PSAnZXJyb3InKSB7XHJcbiAgICAgICAgICB0aGlzLmRpc3BsYXlFcnJvckFsZXJ0KHJlc3VsdCk7XHJcbiAgICAgICAgfSBlbHNlIGlmICgocmVzdWx0IGFzIGFueSkucmVzdWx0ID09PSAnc3VjY2VzcycpIHtcclxuICAgICAgICAgIHN0dWRlbnQuZW5yb2xsZWQgPSBmYWxzZTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgc3dhbChcclxuICAgICAgICAgICAgJ0Vycm9yJyxcclxuICAgICAgICAgICAgJ1NvbWV0aGluZyB3ZW50IHdyb25nLCBwbGVhc2UgdHJ5IGFnYWluLicsXHJcbiAgICAgICAgICAgICdlcnJvcidcclxuICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gICAgICAuY2F0Y2goZXJyb3IgPT4gZXJyb3IpO1xyXG4gIH1cclxuXHJcbiAgZGlzcGxheUVycm9yQWxlcnQoZXJyb3IpIHtcclxuICAgIHN3YWwoXHJcbiAgICAgIGVycm9yLnRpdGxlLFxyXG4gICAgICBlcnJvci5tc2csXHJcbiAgICAgICdlcnJvcidcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBnb0JhY2soKSB7XHJcbiAgICB3aW5kb3cuaGlzdG9yeS5iYWNrKCk7XHJcbiAgfVxyXG59XHJcbiJdfQ==
