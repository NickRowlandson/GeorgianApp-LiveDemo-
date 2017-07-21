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
var StudentEnrollmentComponent = (function () {
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
            if (result.error === 'error') {
                _this.students = null;
            }
            else {
                _this.students = result;
                _this.getTimetables();
            }
        }).catch(function (error) { return error; });
    };
    StudentEnrollmentComponent.prototype.getTimetables = function () {
        var _this = this;
        this.studentService
            .getTimetables()
            .then(function (result) {
            _this.studentTimetables = result;
            _this.compareTimetables();
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
                if (isConfirm) {
                    _this.drop(student);
                }
            }).catch(function (error) {
                //console.log("Canceled");
            });
        }
        else {
            this.enroll(student);
        }
    };
    StudentEnrollmentComponent.prototype.enroll = function (student) {
        this.studentService
            .courseEnroll(student.userID, this.courseID, this.instructorID)
            .then(function (result) {
            student.enrolled = true;
        })
            .catch(function (error) { return error; });
    };
    StudentEnrollmentComponent.prototype.drop = function (student) {
        this.studentService
            .courseDrop(student.userID, this.courseID)
            .then(function (result) {
            student.enrolled = false;
        })
            .catch(function (error) { return error; });
    };
    StudentEnrollmentComponent.prototype.checkStatus = function () {
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NsaWVudC9hcHAvY29tcG9uZW50cy9zdHVkZW50LWVucm9sbG1lbnQvc3R1ZGVudC1lbnJvbGxtZW50LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLHNDQUF5RDtBQUV6RCwwQ0FBeUQ7QUFHekQsZ0VBQThEO0FBQzlELGtFQUFnRTtBQVNoRTtJQVNJLG9DQUFvQixjQUE4QixFQUFVLGFBQTRCLEVBQVUsS0FBcUI7UUFBbkcsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBQVUsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFBVSxVQUFLLEdBQUwsS0FBSyxDQUFnQjtRQUh2SCxZQUFPLEdBQVksSUFBSSxDQUFDO1FBQ3hCLHNCQUFpQixHQUFVLEVBQUUsQ0FBQztJQUk5QixDQUFDO0lBRUQsNkNBQVEsR0FBUjtRQUFBLGlCQU9DO1FBTkcsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLFVBQUMsTUFBYztZQUNyQyxLQUFJLENBQUMsUUFBUSxHQUFHLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUNuQyxLQUFJLENBQUMsWUFBWSxHQUFHLE1BQU0sQ0FBQyxjQUFjLENBQUMsQ0FBQztZQUMzQyxLQUFJLENBQUMsVUFBVSxHQUFHLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUMzQyxDQUFDLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUN2QixDQUFDO0lBRUQsZ0RBQVcsR0FBWDtRQUFBLGlCQVdDO1FBVkcsSUFBSSxDQUFDLGNBQWM7YUFDZCxXQUFXLEVBQUU7YUFDYixJQUFJLENBQUMsVUFBQSxNQUFNO1lBQ1IsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssS0FBSyxPQUFPLENBQUMsQ0FBQyxDQUFDO2dCQUMzQixLQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztZQUN6QixDQUFDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JB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QVEsR0FBRyxJQUFJLENBQUM7UUFDNUIsQ0FBQyxDQUFDO2FBQ0QsS0FBSyxDQUFDLFVBQUEsS0FBSyxJQUFJLE9BQUEsS0FBSyxFQUFMLENBQUssQ0FBQyxDQUFDO0lBQy9CLENBQUM7SUFFRCx5Q0FBSSxHQUFKLFVBQUssT0FBZ0I7UUFDakIsSUFBSSxDQUFDLGNBQWM7YUFDZCxVQUFVLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDO2FBQ3pDLElBQUksQ0FBQyxVQUFBLE1BQU07WUFDUixPQUFPLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztRQUM3QixDQUFDLENBQUM7YUFDRCxLQUFLLENBQUMsVUFBQSxLQUFLLElBQUksT0FBQSxLQUFLLEVBQUwsQ0FBSyxDQUFDLENBQUM7SUFDL0IsQ0FBQztJQUVELGdEQUFXLEdBQVg7SUFDQSxDQUFDO0lBRUQsMkNBQU0sR0FBTjtRQUNJLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDMUIsQ0FBQztJQXZHUSwwQkFBMEI7UUFOdEMsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxrQkFBa0I7WUFDNUIsV0FBVyxFQUFFLHVFQUF1RTtZQUNwRixTQUFTLEVBQUUsQ0FBQyxzRUFBc0UsQ0FBQztTQUN0RixDQUFDO3lDQVdzQyxnQ0FBYyxFQUF5Qiw4QkFBYSxFQUFpQix1QkFBYztPQVQ5RywwQkFBMEIsQ0F3R3RDO0lBQUQsaUNBQUM7Q0F4R0QsQUF3R0MsSUFBQTtBQXhHWSxnRUFBMEIiLCJmaWxlIjoiYXBwL2NvbXBvbmVudHMvc3R1ZGVudC1lbnJvbGxtZW50L3N0dWRlbnQtZW5yb2xsbWVudC5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuaW1wb3J0IHsgQWN0aXZhdGVkUm91dGUsIFBhcmFtcyB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcbmltcG9ydCB7IENvdXJzZSB9IGZyb20gXCIuLi8uLi9tb2RlbHMvY291cnNlXCI7XHJcbmltcG9ydCB7IFN0dWRlbnQgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL1N0dWRlbnRcIjtcclxuaW1wb3J0IHsgQ291cnNlU2VydmljZSB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9jb3Vyc2Uuc2VydmljZVwiO1xyXG5pbXBvcnQgeyBTdHVkZW50U2VydmljZSB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9zdHVkZW50LnNlcnZpY2VcIjtcclxuZGVjbGFyZSB2YXIgc3dhbDogYW55O1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogJ2NvdXJzZS1zZWxlY3Rpb24nLFxyXG4gICAgdGVtcGxhdGVVcmw6ICcuL2FwcC9jb21wb25lbnRzL3N0dWRlbnQtZW5yb2xsbWVudC9zdHVkZW50LWVucm9sbG1lbnQuY29tcG9uZW50Lmh0bWwnLFxyXG4gICAgc3R5bGVVcmxzOiBbJy4vYXBwL2NvbXBvbmVudHMvc3R1ZGVudC1lbnJvbGxtZW50L3N0dWRlbnQtZW5yb2xsbWVudC5jb21wb25lbnQuY3NzJ11cclxufSlcclxuXHJcbmV4cG9ydCBjbGFzcyBTdHVkZW50RW5yb2xsbWVudENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgICBzdHVkZW50czogU3R1ZGVudFtdO1xyXG4gICAgY291cnNlSUQ6IGFueTtcclxuICAgIGluc3RydWN0b3JJRDogYW55O1xyXG4gICAgY291cnNlTmFtZTogYW55O1xyXG4gICAgc3R1ZGVudFRpbWV0YWJsZXM6IGFueVtdO1xyXG4gICAgbG9hZGluZzogYm9vbGVhbiA9IHRydWU7XHJcbiAgICB0ZW1wVGltZXRhYmxlQXJyeTogYW55W10gPSBbXTtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHN0dWRlbnRTZXJ2aWNlOiBTdHVkZW50U2VydmljZSwgcHJpdmF0ZSBjb3Vyc2VTZXJ2aWNlOiBDb3Vyc2VTZXJ2aWNlLCBwcml2YXRlIHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSkge1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBuZ09uSW5pdCgpIHtcclxuICAgICAgICB0aGlzLnJvdXRlLnBhcmFtcy5mb3JFYWNoKChwYXJhbXM6IFBhcmFtcykgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmNvdXJzZUlEID0gcGFyYW1zWydjb3Vyc2VJRCddO1xyXG4gICAgICAgICAgICB0aGlzLmluc3RydWN0b3JJRCA9IHBhcmFtc1snaW5zdHJ1Y3RvcklEJ107XHJcbiAgICAgICAgICAgIHRoaXMuY291cnNlTmFtZSA9IHBhcmFtc1snY291cnNlTmFtZSddO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuZ2V0U3R1ZGVudHMoKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRTdHVkZW50cygpIHtcclxuICAgICAgICB0aGlzLnN0dWRlbnRTZXJ2aWNlXHJcbiAgICAgICAgICAgIC5nZXRTdHVkZW50cygpXHJcbiAgICAgICAgICAgIC50aGVuKHJlc3VsdCA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAocmVzdWx0LmVycm9yID09PSAnZXJyb3InKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdHVkZW50cyA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3R1ZGVudHMgPSByZXN1bHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5nZXRUaW1ldGFibGVzKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pLmNhdGNoKGVycm9yID0+IGVycm9yKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRUaW1ldGFibGVzKCkge1xyXG4gICAgICAgIHRoaXMuc3R1ZGVudFNlcnZpY2VcclxuICAgICAgICAgICAgLmdldFRpbWV0YWJsZXMoKVxyXG4gICAgICAgICAgICAudGhlbihyZXN1bHQgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zdHVkZW50VGltZXRhYmxlcyA9IHJlc3VsdDtcclxuICAgICAgICAgICAgICAgIHRoaXMuY29tcGFyZVRpbWV0YWJsZXMoKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLmNhdGNoKGVycm9yID0+IGVycm9yKTtcclxuICAgIH1cclxuXHJcbiAgICBjb21wYXJlVGltZXRhYmxlcygpIHtcclxuICAgICAgICBmb3IgKGxldCBzdHVkZW50IG9mIHRoaXMuc3R1ZGVudHMpIHtcclxuICAgICAgICAgICAgdmFyIHRpbWV0YWJsZSA9IHRoaXMuc3R1ZGVudFRpbWV0YWJsZXMuZmlsdGVyKHggPT4geC51c2VySUQgPT09IHN0dWRlbnQudXNlcklEKTtcclxuICAgICAgICAgICAgZm9yIChsZXQgaXRlbSBvZiB0aW1ldGFibGUpIHtcclxuICAgICAgICAgICAgICAgIHZhciBpdGVtQ291cnNlSUQgPSBpdGVtLmNvdXJzZUlELnRvU3RyaW5nKCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoaXRlbUNvdXJzZUlEID09PSB0aGlzLmNvdXJzZUlEKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3R1ZGVudC5lbnJvbGxlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5sb2FkaW5nID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgY2hlY2tFbnJvbGxlZChzdHVkZW50OiBTdHVkZW50KSB7XHJcbiAgICAgICAgaWYgKHN0dWRlbnQuZW5yb2xsZWQpIHtcclxuICAgICAgICAgICAgc3dhbCh7XHJcbiAgICAgICAgICAgICAgICB0aXRsZTogJ1JlbW92ZSAnICsgc3R1ZGVudC5maXJzdE5hbWUgKyAnICcgKyBzdHVkZW50Lmxhc3ROYW1lICsgJyBmcm9tICcgKyB0aGlzLmNvdXJzZU5hbWUgKyAnPycsXHJcbiAgICAgICAgICAgICAgICB0ZXh0OiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgdHlwZTogJ3dhcm5pbmcnLFxyXG4gICAgICAgICAgICAgICAgc2hvd0NhbmNlbEJ1dHRvbjogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIGNvbmZpcm1CdXR0b25Db2xvcjogJyMzMDg1ZDYnLFxyXG4gICAgICAgICAgICAgICAgY2FuY2VsQnV0dG9uQ29sb3I6ICcjZDMzJyxcclxuICAgICAgICAgICAgICAgIGNvbmZpcm1CdXR0b25UZXh0OiAnWWVzLCByZW1vdmUhJ1xyXG4gICAgICAgICAgICB9KS50aGVuKGlzQ29uZmlybSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoaXNDb25maXJtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kcm9wKHN0dWRlbnQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KS5jYXRjaChlcnJvciA9PiB7XHJcbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwiQ2FuY2VsZWRcIik7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuZW5yb2xsKHN0dWRlbnQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBlbnJvbGwoc3R1ZGVudDogU3R1ZGVudCkge1xyXG4gICAgICAgIHRoaXMuc3R1ZGVudFNlcnZpY2VcclxuICAgICAgICAgICAgLmNvdXJzZUVucm9sbChzdHVkZW50LnVzZXJJRCwgdGhpcy5jb3Vyc2VJRCwgdGhpcy5pbnN0cnVjdG9ySUQpXHJcbiAgICAgICAgICAgIC50aGVuKHJlc3VsdCA9PiB7XHJcbiAgICAgICAgICAgICAgICBzdHVkZW50LmVucm9sbGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLmNhdGNoKGVycm9yID0+IGVycm9yKTtcclxuICAgIH1cclxuXHJcbiAgICBkcm9wKHN0dWRlbnQ6IFN0dWRlbnQpIHtcclxuICAgICAgICB0aGlzLnN0dWRlbnRTZXJ2aWNlXHJcbiAgICAgICAgICAgIC5jb3Vyc2VEcm9wKHN0dWRlbnQudXNlcklELCB0aGlzLmNvdXJzZUlEKVxyXG4gICAgICAgICAgICAudGhlbihyZXN1bHQgPT4ge1xyXG4gICAgICAgICAgICAgICAgc3R1ZGVudC5lbnJvbGxlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuY2F0Y2goZXJyb3IgPT4gZXJyb3IpO1xyXG4gICAgfVxyXG5cclxuICAgIGNoZWNrU3RhdHVzKCkge1xyXG4gICAgfVxyXG5cclxuICAgIGdvQmFjaygpIHtcclxuICAgICAgICB3aW5kb3cuaGlzdG9yeS5iYWNrKCk7XHJcbiAgICB9XHJcbn1cclxuIl19
