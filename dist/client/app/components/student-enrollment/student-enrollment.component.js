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
            else if (result.result === 'success') {
                _this.students = result;
                for (var _i = 0, _a = _this.students; _i < _a.length; _i++) {
                    var student = _a[_i];
                    student.fullName = student.firstName + " " + student.lastName;
                }
                _this.getTimetables();
            }
            else {
                swal('Error', 'Something went wrong, please try again.', 'error');
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
            else if (result.result === 'success') {
                _this.studentTimetables = result;
                _this.compareTimetables();
            }
            else {
                swal('Error', 'Something went wrong, please try again.', 'error');
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
                    swal('Error', 'Something went wrong, please try again.', 'error');
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NsaWVudC9hcHAvY29tcG9uZW50cy9zdHVkZW50LWVucm9sbG1lbnQvc3R1ZGVudC1lbnJvbGxtZW50LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLHNDQUF5RDtBQUV6RCwwQ0FBeUQ7QUFHekQsZ0VBQThEO0FBQzlELGtFQUFnRTtBQVVoRTtJQVNFLG9DQUFvQixjQUE4QixFQUFVLGFBQTRCLEVBQVUsS0FBcUI7UUFBbkcsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBQVUsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFBVSxVQUFLLEdBQUwsS0FBSyxDQUFnQjtRQUh2SCxZQUFPLEdBQVksSUFBSSxDQUFDO1FBQ3hCLHNCQUFpQixHQUFVLEVBQUUsQ0FBQztJQUk5QixDQUFDO0lBRUQsNkNBQVEsR0FBUjtRQUFBLGlCQU9DO1FBTkMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLFVBQUMsTUFBYztZQUN2QyxLQUFJLENBQUMsUUFBUSxHQUFHLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUNuQyxLQUFJLENBQUMsWUFBWSxHQUFHLE1BQU0sQ0FBQyxjQUFjLENBQUMsQ0FBQztZQUMzQyxLQUFJLENBQUMsVUFBVSxHQUFHLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUN6QyxDQUFDLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUNyQixDQUFDO0lBRUQsZ0RBQVcsR0FBWDtRQUFBLGlCQXFCQztRQXBCQyxJQUFJLENBQUMsY0FBYzthQUNoQixXQUFXLEVBQUU7YUFDYixJQUFJLENBQUMsVUFBQSxNQUFNO1lBQ1YsSUFBSyxNQUFjLENBQUMsTUFBTSxLQUFLLE9BQU8sRUFBRTtnQkFDdEMsS0FBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7Z0JBQ3JCLEtBQUksQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLENBQUMsQ0FBQzthQUNoQztp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QUssQ0FBQyxLQUFLLEVBQ1gsS0FBSyxDQUFDLEdBQUcsRUFDVCxPQUFPLENBQ1IsQ0FBQztJQUNKLENBQUM7SUFFRCwyQ0FBTSxHQUFOO1FBQ0UsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUN4QixDQUFDO0lBcktVLDBCQUEwQjtRQU50QyxnQkFBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLGtCQUFrQjtZQUM1QixXQUFXLEVBQUUsdUVBQXVFO1lBQ3BGLFNBQVMsRUFBRSxDQUFDLHNFQUFzRSxDQUFDO1NBQ3BGLENBQUM7eUNBV29DLGdDQUFjLEVBQXlCLDhCQUFhLEVBQWlCLHVCQUFjO09BVDVHLDBCQUEwQixDQXNLdEM7SUFBRCxpQ0FBQztDQXRLRCxBQXNLQyxJQUFBO0FBdEtZLGdFQUEwQiIsImZpbGUiOiJhcHAvY29tcG9uZW50cy9zdHVkZW50LWVucm9sbG1lbnQvc3R1ZGVudC1lbnJvbGxtZW50LmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBSb3V0ZXIgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xyXG5pbXBvcnQgeyBBY3RpdmF0ZWRSb3V0ZSwgUGFyYW1zIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuaW1wb3J0IHsgQ291cnNlIH0gZnJvbSBcIi4uLy4uL21vZGVscy9jb3Vyc2VcIjtcclxuaW1wb3J0IHsgU3R1ZGVudCB9IGZyb20gXCIuLi8uLi9tb2RlbHMvU3R1ZGVudFwiO1xyXG5pbXBvcnQgeyBDb3Vyc2VTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL2NvdXJzZS5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IFN0dWRlbnRTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL3N0dWRlbnQuc2VydmljZVwiO1xyXG5kZWNsYXJlIHZhciBzd2FsOiBhbnk7XHJcbmRlY2xhcmUgdmFyIG1vbWVudDogYW55O1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdjb3Vyc2Utc2VsZWN0aW9uJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vYXBwL2NvbXBvbmVudHMvc3R1ZGVudC1lbnJvbGxtZW50L3N0dWRlbnQtZW5yb2xsbWVudC5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vYXBwL2NvbXBvbmVudHMvc3R1ZGVudC1lbnJvbGxtZW50L3N0dWRlbnQtZW5yb2xsbWVudC5jb21wb25lbnQuY3NzJ11cclxufSlcclxuXHJcbmV4cG9ydCBjbGFzcyBTdHVkZW50RW5yb2xsbWVudENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgc3R1ZGVudHM6IFN0dWRlbnRbXTtcclxuICBjb3Vyc2VJRDogYW55O1xyXG4gIGluc3RydWN0b3JJRDogYW55O1xyXG4gIGNvdXJzZU5hbWU6IGFueTtcclxuICBzdHVkZW50VGltZXRhYmxlczogYW55W107XHJcbiAgbG9hZGluZzogYm9vbGVhbiA9IHRydWU7XHJcbiAgdGVtcFRpbWV0YWJsZUFycnk6IGFueVtdID0gW107XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgc3R1ZGVudFNlcnZpY2U6IFN0dWRlbnRTZXJ2aWNlLCBwcml2YXRlIGNvdXJzZVNlcnZpY2U6IENvdXJzZVNlcnZpY2UsIHByaXZhdGUgcm91dGU6IEFjdGl2YXRlZFJvdXRlKSB7XHJcblxyXG4gIH1cclxuXHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgICB0aGlzLnJvdXRlLnBhcmFtcy5mb3JFYWNoKChwYXJhbXM6IFBhcmFtcykgPT4ge1xyXG4gICAgICB0aGlzLmNvdXJzZUlEID0gcGFyYW1zWydjb3Vyc2VJRCddO1xyXG4gICAgICB0aGlzLmluc3RydWN0b3JJRCA9IHBhcmFtc1snaW5zdHJ1Y3RvcklEJ107XHJcbiAgICAgIHRoaXMuY291cnNlTmFtZSA9IHBhcmFtc1snY291cnNlTmFtZSddO1xyXG4gICAgfSk7XHJcbiAgICB0aGlzLmdldFN0dWRlbnRzKCk7XHJcbiAgfVxyXG5cclxuICBnZXRTdHVkZW50cygpIHtcclxuICAgIHRoaXMuc3R1ZGVudFNlcnZpY2VcclxuICAgICAgLmdldFN0dWRlbnRzKClcclxuICAgICAgLnRoZW4ocmVzdWx0ID0+IHtcclxuICAgICAgICBpZiAoKHJlc3VsdCBhcyBhbnkpLnJlc3VsdCA9PT0gJ2Vycm9yJykge1xyXG4gICAgICAgICAgdGhpcy5zdHVkZW50cyA9IG51bGw7XHJcbiAgICAgICAgICB0aGlzLmRpc3BsYXlFcnJvckFsZXJ0KHJlc3VsdCk7XHJcbiAgICAgICAgfSBlbHNlIGlmICgocmVzdWx0IGFzIGFueSkucmVzdWx0ID09PSAnc3VjY2VzcycpIHtcclxuICAgICAgICAgIHRoaXMuc3R1ZGVudHMgPSByZXN1bHQ7XHJcbiAgICAgICAgICBmb3IgKGxldCBzdHVkZW50IG9mIHRoaXMuc3R1ZGVudHMpIHtcclxuICAgICAgICAgICAgc3R1ZGVudC5mdWxsTmFtZSA9IHN0dWRlbnQuZmlyc3ROYW1lICsgXCIgXCIgKyBzdHVkZW50Lmxhc3ROYW1lO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgdGhpcy5nZXRUaW1ldGFibGVzKCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHN3YWwoXHJcbiAgICAgICAgICAgICdFcnJvcicsXHJcbiAgICAgICAgICAgICdTb21ldGhpbmcgd2VudCB3cm9uZywgcGxlYXNlIHRyeSBhZ2Fpbi4nLFxyXG4gICAgICAgICAgICAnZXJyb3InXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuICAgICAgfSkuY2F0Y2goZXJyb3IgPT4gZXJyb3IpO1xyXG4gIH1cclxuXHJcbiAgZ2V0VGltZXRhYmxlcygpIHtcclxuICAgIHRoaXMuc3R1ZGVudFNlcnZpY2VcclxuICAgICAgLmdldFRpbWV0YWJsZXMoKVxyXG4gICAgICAudGhlbihyZXN1bHQgPT4ge1xyXG4gICAgICAgIGlmICgocmVzdWx0IGFzIGFueSkucmVzdWx0ID09PSAnZXJyb3InKSB7XHJcbiAgICAgICAgICB0aGlzLmRpc3BsYXlFcnJvckFsZXJ0KHJlc3VsdCk7XHJcbiAgICAgICAgfSBlbHNlIGlmICgocmVzdWx0IGFzIGFueSkucmVzdWx0ID09PSAnc3VjY2VzcycpIHtcclxuICAgICAgICAgIHRoaXMuc3R1ZGVudFRpbWV0YWJsZXMgPSByZXN1bHQ7XHJcbiAgICAgICAgICB0aGlzLmNvbXBhcmVUaW1ldGFibGVzKCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHN3YWwoXHJcbiAgICAgICAgICAgICdFcnJvcicsXHJcbiAgICAgICAgICAgICdTb21ldGhpbmcgd2VudCB3cm9uZywgcGxlYXNlIHRyeSBhZ2Fpbi4nLFxyXG4gICAgICAgICAgICAnZXJyb3InXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuICAgICAgLmNhdGNoKGVycm9yID0+IGVycm9yKTtcclxuICB9XHJcblxyXG4gIGNvbXBhcmVUaW1ldGFibGVzKCkge1xyXG4gICAgZm9yIChsZXQgc3R1ZGVudCBvZiB0aGlzLnN0dWRlbnRzKSB7XHJcbiAgICAgIHZhciB0aW1ldGFibGUgPSB0aGlzLnN0dWRlbnRUaW1ldGFibGVzLmZpbHRlcih4ID0+IHgudXNlcklEID09PSBzdHVkZW50LnVzZXJJRCk7XHJcbiAgICAgIGZvciAobGV0IGl0ZW0gb2YgdGltZXRhYmxlKSB7XHJcbiAgICAgICAgdmFyIGl0ZW1Db3Vyc2VJRCA9IGl0ZW0uY291cnNlSUQudG9TdHJpbmcoKTtcclxuICAgICAgICBpZiAoaXRlbUNvdXJzZUlEID09PSB0aGlzLmNvdXJzZUlEKSB7XHJcbiAgICAgICAgICBzdHVkZW50LmVucm9sbGVkID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHRoaXMubG9hZGluZyA9IGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgY2hlY2tFbnJvbGxlZChzdHVkZW50OiBTdHVkZW50KSB7XHJcbiAgICBpZiAoc3R1ZGVudC5lbnJvbGxlZCkge1xyXG4gICAgICBzd2FsKHtcclxuICAgICAgICB0aXRsZTogJ1JlbW92ZSAnICsgc3R1ZGVudC5maXJzdE5hbWUgKyAnICcgKyBzdHVkZW50Lmxhc3ROYW1lICsgJyBmcm9tICcgKyB0aGlzLmNvdXJzZU5hbWUgKyAnPycsXHJcbiAgICAgICAgdGV4dDogXCJcIixcclxuICAgICAgICB0eXBlOiAnd2FybmluZycsXHJcbiAgICAgICAgc2hvd0NhbmNlbEJ1dHRvbjogdHJ1ZSxcclxuICAgICAgICBjb25maXJtQnV0dG9uQ29sb3I6ICcjMzA4NWQ2JyxcclxuICAgICAgICBjYW5jZWxCdXR0b25Db2xvcjogJyNkMzMnLFxyXG4gICAgICAgIGNvbmZpcm1CdXR0b25UZXh0OiAnWWVzLCByZW1vdmUhJ1xyXG4gICAgICB9KS50aGVuKGlzQ29uZmlybSA9PiB7XHJcbiAgICAgICAgaWYgKGlzQ29uZmlybS5kaXNtaXNzID09PSBcImNhbmNlbFwiIHx8IGlzQ29uZmlybS5kaXNtaXNzID09PSBcIm92ZXJsYXlcIikge1xyXG4gICAgICAgICAgY29uc29sZS5sb2coaXNDb25maXJtLmRpc21pc3MpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoaXNDb25maXJtKSB7XHJcbiAgICAgICAgICB0aGlzLmRyb3Aoc3R1ZGVudCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KS5jYXRjaChlcnJvciA9PiB7XHJcbiAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xyXG4gICAgICB9KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuZW5yb2xsKHN0dWRlbnQpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZW5yb2xsKHN0dWRlbnQ6IFN0dWRlbnQpIHtcclxuICAgIHZhciBzdGFydERhdGUgPSBtb21lbnQoc3R1ZGVudC5zdHVkZW50U3RhcnREYXRlLCBcIkRERCBNTU0gWVlZWSBoOm1tOnNzIExUXCIpLmlzVmFsaWQoKTtcclxuICAgIHZhciBlbmREYXRlID0gbW9tZW50KHN0dWRlbnQuc3R1ZGVudEVuZERhdGUsIFwiREREIE1NTSBZWVlZIGg6bW06c3MgTFRcIikuaXNWYWxpZCgpO1xyXG4gICAgaWYgKHN0YXJ0RGF0ZSAmJiBlbmREYXRlKSB7XHJcbiAgICAgIHRoaXMuc3R1ZGVudFNlcnZpY2VcclxuICAgICAgICAuY291cnNlRW5yb2xsKHN0dWRlbnQudXNlcklELCBzdHVkZW50LnN0dWRlbnRTdGFydERhdGUsIHN0dWRlbnQuc3R1ZGVudEVuZERhdGUsIHRoaXMuY291cnNlSUQsIHRoaXMuaW5zdHJ1Y3RvcklEKVxyXG4gICAgICAgIC50aGVuKHJlc3VsdCA9PiB7XHJcbiAgICAgICAgICBpZiAoKHJlc3VsdCBhcyBhbnkpLnJlc3VsdCA9PT0gJ2Vycm9yJykge1xyXG4gICAgICAgICAgICB0aGlzLmRpc3BsYXlFcnJvckFsZXJ0KHJlc3VsdCk7XHJcbiAgICAgICAgICB9IGVsc2UgaWYgKChyZXN1bHQgYXMgYW55KS5yZXN1bHQgPT09ICdzdWNjZXNzJykge1xyXG4gICAgICAgICAgICBzdHVkZW50LmVucm9sbGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgc3dhbChcclxuICAgICAgICAgICAgICB0aGlzLmNvdXJzZU5hbWUsXHJcbiAgICAgICAgICAgICAgJycgKyBzdHVkZW50LmZpcnN0TmFtZSArICcgJyArIHN0dWRlbnQubGFzdE5hbWUgKyAnIGhhcyBiZWVuIHN1Y2Nlc2Z1bGx5IGVucm9sbGVkLicsXHJcbiAgICAgICAgICAgICAgJ3N1Y2Nlc3MnXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBzd2FsKFxyXG4gICAgICAgICAgICAgICdFcnJvcicsXHJcbiAgICAgICAgICAgICAgJ1NvbWV0aGluZyB3ZW50IHdyb25nLCBwbGVhc2UgdHJ5IGFnYWluLicsXHJcbiAgICAgICAgICAgICAgJ2Vycm9yJ1xyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLmNhdGNoKGVycm9yID0+IGVycm9yKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHN3YWwoXHJcbiAgICAgICAgJ1dob29wcycsXHJcbiAgICAgICAgJ1BsZWFzZSBpbnB1dCBhIHZhbGlkIHN0YXJ0IGFuZCBlbmQgZGF0ZSBmb3IgdGhlIHN0dWRlbnQuJyxcclxuICAgICAgICAnd2FybmluZydcclxuICAgICAgKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGRyb3Aoc3R1ZGVudDogU3R1ZGVudCkge1xyXG4gICAgdGhpcy5zdHVkZW50U2VydmljZVxyXG4gICAgICAuY291cnNlRHJvcChzdHVkZW50LnVzZXJJRCwgdGhpcy5jb3Vyc2VJRClcclxuICAgICAgLnRoZW4ocmVzdWx0ID0+IHtcclxuICAgICAgICBpZiAoKHJlc3VsdCBhcyBhbnkpLnJlc3VsdCA9PT0gJ2Vycm9yJykge1xyXG4gICAgICAgICAgdGhpcy5kaXNwbGF5RXJyb3JBbGVydChyZXN1bHQpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoKHJlc3VsdCBhcyBhbnkpLnJlc3VsdCA9PT0gJ3N1Y2Nlc3MnKSB7XHJcbiAgICAgICAgICBzdHVkZW50LmVucm9sbGVkID0gZmFsc2U7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHN3YWwoXHJcbiAgICAgICAgICAgICdFcnJvcicsXHJcbiAgICAgICAgICAgICdTb21ldGhpbmcgd2VudCB3cm9uZywgcGxlYXNlIHRyeSBhZ2Fpbi4nLFxyXG4gICAgICAgICAgICAnZXJyb3InXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuICAgICAgLmNhdGNoKGVycm9yID0+IGVycm9yKTtcclxuICB9XHJcblxyXG4gIGRpc3BsYXlFcnJvckFsZXJ0KGVycm9yKSB7XHJcbiAgICBzd2FsKFxyXG4gICAgICBlcnJvci50aXRsZSxcclxuICAgICAgZXJyb3IubXNnLFxyXG4gICAgICAnZXJyb3InXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgZ29CYWNrKCkge1xyXG4gICAgd2luZG93Lmhpc3RvcnkuYmFjaygpO1xyXG4gIH1cclxufVxyXG4iXX0=
