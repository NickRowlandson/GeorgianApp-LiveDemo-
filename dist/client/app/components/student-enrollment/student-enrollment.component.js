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
            if (result.error === 'error') {
                _this.students = null;
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
        var _this = this;
        var startDate = moment(student.studentStartDate, "DDD MMM YYYY h:mm:ss LT").isValid();
        var endDate = moment(student.studentEndDate, "DDD MMM YYYY h:mm:ss LT").isValid();
        if (startDate && endDate) {
            this.studentService
                .courseEnroll(student.userID, student.studentStartDate, student.studentEndDate, this.courseID, this.instructorID)
                .then(function (result) {
                student.enrolled = true;
                swal(_this.courseName, '' + student.firstName + ' ' + student.lastName + ' has been succesfully enrolled.', 'success');
            })
                .catch(function (error) { return error; });
        }
        else {
            swal('Whoops', 'Please input a valid start and end date for the student.', 'warning');
        }
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NsaWVudC9hcHAvY29tcG9uZW50cy9zdHVkZW50LWVucm9sbG1lbnQvc3R1ZGVudC1lbnJvbGxtZW50LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLHNDQUF5RDtBQUV6RCwwQ0FBeUQ7QUFHekQsZ0VBQThEO0FBQzlELGtFQUFnRTtBQVVoRTtJQVNJLG9DQUFvQixjQUE4QixFQUFVLGFBQTRCLEVBQVUsS0FBcUI7UUFBbkcsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBQVUsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFBVSxVQUFLLEdBQUwsS0FBSyxDQUFnQjtRQUh2SCxZQUFPLEdBQVksSUFBSSxDQUFDO1FBQ3hCLHNCQUFpQixHQUFVLEVBQUUsQ0FBQztJQUk5QixDQUFDO0lBRUQsNkNBQVEsR0FBUjtRQUFBLGlCQU9DO1FBTkcsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLFVBQUMsTUFBYztZQUNyQyxLQUFJLENBQUMsUUFBUSxHQUFHLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUNuQyxLQUFJLENBQUMsWUFBWSxHQUFHLE1BQU0sQ0FBQyxjQUFjLENBQUMsQ0FBQztZQUMzQyxLQUFJLENBQUMsVUFBVSxHQUFHLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUMzQyxDQUFDLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUN2QixDQUFDO0lBRUQsZ0RBQVcsR0FBWDtRQUFBLGlCQWNDO1FBYkcsSUFBSSxDQUFDLGNBQWM7YUFDZCxXQUFXLEVBQUU7YUFDYixJQUFJLENBQUMsVUFBQSxNQUFNO1lBQ1IsRUFBRSxDQUFDLENBQUUsTUFBYyxDQUFDLEtBQUssS0FBSyxPQUFPLENBQUMsQ0FBQyxDQUFDO2dCQUNwQyxLQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztZQUN6QixDQUFDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JB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LE1BQU07WUFDUixPQUFPLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztRQUM3QixDQUFDLENBQUM7YUFDRCxLQUFLLENBQUMsVUFBQSxLQUFLLElBQUksT0FBQSxLQUFLLEVBQUwsQ0FBSyxDQUFDLENBQUM7SUFDL0IsQ0FBQztJQUVELGdEQUFXLEdBQVg7SUFDQSxDQUFDO0lBRUQsMkNBQU0sR0FBTjtRQUNJLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDMUIsQ0FBQztJQXpIUSwwQkFBMEI7UUFOdEMsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxrQkFBa0I7WUFDNUIsV0FBVyxFQUFFLHVFQUF1RTtZQUNwRixTQUFTLEVBQUUsQ0FBQyxzRUFBc0UsQ0FBQztTQUN0RixDQUFDO3lDQVdzQyxnQ0FBYyxFQUF5Qiw4QkFBYSxFQUFpQix1QkFBYztPQVQ5RywwQkFBMEIsQ0EwSHRDO0lBQUQsaUNBQUM7Q0ExSEQsQUEwSEMsSUFBQTtBQTFIWSxnRUFBMEIiLCJmaWxlIjoiYXBwL2NvbXBvbmVudHMvc3R1ZGVudC1lbnJvbGxtZW50L3N0dWRlbnQtZW5yb2xsbWVudC5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuaW1wb3J0IHsgQWN0aXZhdGVkUm91dGUsIFBhcmFtcyB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcbmltcG9ydCB7IENvdXJzZSB9IGZyb20gXCIuLi8uLi9tb2RlbHMvY291cnNlXCI7XHJcbmltcG9ydCB7IFN0dWRlbnQgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL1N0dWRlbnRcIjtcclxuaW1wb3J0IHsgQ291cnNlU2VydmljZSB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9jb3Vyc2Uuc2VydmljZVwiO1xyXG5pbXBvcnQgeyBTdHVkZW50U2VydmljZSB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9zdHVkZW50LnNlcnZpY2VcIjtcclxuZGVjbGFyZSB2YXIgc3dhbDogYW55O1xyXG5kZWNsYXJlIHZhciBtb21lbnQ6IGFueTtcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6ICdjb3Vyc2Utc2VsZWN0aW9uJyxcclxuICAgIHRlbXBsYXRlVXJsOiAnLi9hcHAvY29tcG9uZW50cy9zdHVkZW50LWVucm9sbG1lbnQvc3R1ZGVudC1lbnJvbGxtZW50LmNvbXBvbmVudC5odG1sJyxcclxuICAgIHN0eWxlVXJsczogWycuL2FwcC9jb21wb25lbnRzL3N0dWRlbnQtZW5yb2xsbWVudC9zdHVkZW50LWVucm9sbG1lbnQuY29tcG9uZW50LmNzcyddXHJcbn0pXHJcblxyXG5leHBvcnQgY2xhc3MgU3R1ZGVudEVucm9sbG1lbnRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG4gICAgc3R1ZGVudHM6IFN0dWRlbnRbXTtcclxuICAgIGNvdXJzZUlEOiBhbnk7XHJcbiAgICBpbnN0cnVjdG9ySUQ6IGFueTtcclxuICAgIGNvdXJzZU5hbWU6IGFueTtcclxuICAgIHN0dWRlbnRUaW1ldGFibGVzOiBhbnlbXTtcclxuICAgIGxvYWRpbmc6IGJvb2xlYW4gPSB0cnVlO1xyXG4gICAgdGVtcFRpbWV0YWJsZUFycnk6IGFueVtdID0gW107XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBzdHVkZW50U2VydmljZTogU3R1ZGVudFNlcnZpY2UsIHByaXZhdGUgY291cnNlU2VydmljZTogQ291cnNlU2VydmljZSwgcHJpdmF0ZSByb3V0ZTogQWN0aXZhdGVkUm91dGUpIHtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgbmdPbkluaXQoKSB7XHJcbiAgICAgICAgdGhpcy5yb3V0ZS5wYXJhbXMuZm9yRWFjaCgocGFyYW1zOiBQYXJhbXMpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5jb3Vyc2VJRCA9IHBhcmFtc1snY291cnNlSUQnXTtcclxuICAgICAgICAgICAgdGhpcy5pbnN0cnVjdG9ySUQgPSBwYXJhbXNbJ2luc3RydWN0b3JJRCddO1xyXG4gICAgICAgICAgICB0aGlzLmNvdXJzZU5hbWUgPSBwYXJhbXNbJ2NvdXJzZU5hbWUnXTtcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLmdldFN0dWRlbnRzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0U3R1ZGVudHMoKSB7XHJcbiAgICAgICAgdGhpcy5zdHVkZW50U2VydmljZVxyXG4gICAgICAgICAgICAuZ2V0U3R1ZGVudHMoKVxyXG4gICAgICAgICAgICAudGhlbihyZXN1bHQgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKChyZXN1bHQgYXMgYW55KS5lcnJvciA9PT0gJ2Vycm9yJykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3R1ZGVudHMgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0dWRlbnRzID0gcmVzdWx0O1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IHN0dWRlbnQgb2YgdGhpcy5zdHVkZW50cykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgc3R1ZGVudC5mdWxsTmFtZSA9IHN0dWRlbnQuZmlyc3ROYW1lICsgXCIgXCIgKyBzdHVkZW50Lmxhc3ROYW1lO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmdldFRpbWV0YWJsZXMoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSkuY2F0Y2goZXJyb3IgPT4gZXJyb3IpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldFRpbWV0YWJsZXMoKSB7XHJcbiAgICAgICAgdGhpcy5zdHVkZW50U2VydmljZVxyXG4gICAgICAgICAgICAuZ2V0VGltZXRhYmxlcygpXHJcbiAgICAgICAgICAgIC50aGVuKHJlc3VsdCA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0dWRlbnRUaW1ldGFibGVzID0gcmVzdWx0O1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jb21wYXJlVGltZXRhYmxlcygpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuY2F0Y2goZXJyb3IgPT4gZXJyb3IpO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbXBhcmVUaW1ldGFibGVzKCkge1xyXG4gICAgICAgIGZvciAobGV0IHN0dWRlbnQgb2YgdGhpcy5zdHVkZW50cykge1xyXG4gICAgICAgICAgICB2YXIgdGltZXRhYmxlID0gdGhpcy5zdHVkZW50VGltZXRhYmxlcy5maWx0ZXIoeCA9PiB4LnVzZXJJRCA9PT0gc3R1ZGVudC51c2VySUQpO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpdGVtIG9mIHRpbWV0YWJsZSkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGl0ZW1Db3Vyc2VJRCA9IGl0ZW0uY291cnNlSUQudG9TdHJpbmcoKTtcclxuICAgICAgICAgICAgICAgIGlmIChpdGVtQ291cnNlSUQgPT09IHRoaXMuY291cnNlSUQpIHtcclxuICAgICAgICAgICAgICAgICAgICBzdHVkZW50LmVucm9sbGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBjaGVja0Vucm9sbGVkKHN0dWRlbnQ6IFN0dWRlbnQpIHtcclxuICAgICAgICBpZiAoc3R1ZGVudC5lbnJvbGxlZCkge1xyXG4gICAgICAgICAgICBzd2FsKHtcclxuICAgICAgICAgICAgICAgIHRpdGxlOiAnUmVtb3ZlICcgKyBzdHVkZW50LmZpcnN0TmFtZSArICcgJyArIHN0dWRlbnQubGFzdE5hbWUgKyAnIGZyb20gJyArIHRoaXMuY291cnNlTmFtZSArICc/JyxcclxuICAgICAgICAgICAgICAgIHRleHQ6IFwiXCIsXHJcbiAgICAgICAgICAgICAgICB0eXBlOiAnd2FybmluZycsXHJcbiAgICAgICAgICAgICAgICBzaG93Q2FuY2VsQnV0dG9uOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgY29uZmlybUJ1dHRvbkNvbG9yOiAnIzMwODVkNicsXHJcbiAgICAgICAgICAgICAgICBjYW5jZWxCdXR0b25Db2xvcjogJyNkMzMnLFxyXG4gICAgICAgICAgICAgICAgY29uZmlybUJ1dHRvblRleHQ6ICdZZXMsIHJlbW92ZSEnXHJcbiAgICAgICAgICAgIH0pLnRoZW4oaXNDb25maXJtID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChpc0NvbmZpcm0pIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRyb3Aoc3R1ZGVudCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pLmNhdGNoKGVycm9yID0+IHtcclxuICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJDYW5jZWxlZFwiKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5lbnJvbGwoc3R1ZGVudCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGVucm9sbChzdHVkZW50OiBTdHVkZW50KSB7XHJcbiAgICAgIHZhciBzdGFydERhdGUgPSBtb21lbnQoc3R1ZGVudC5zdHVkZW50U3RhcnREYXRlLCBcIkRERCBNTU0gWVlZWSBoOm1tOnNzIExUXCIpLmlzVmFsaWQoKTtcclxuICAgICAgdmFyIGVuZERhdGUgPSBtb21lbnQoc3R1ZGVudC5zdHVkZW50RW5kRGF0ZSwgXCJEREQgTU1NIFlZWVkgaDptbTpzcyBMVFwiKS5pc1ZhbGlkKCk7XHJcbiAgICAgICAgaWYgKHN0YXJ0RGF0ZSAmJiBlbmREYXRlKSB7XHJcbiAgICAgICAgICB0aGlzLnN0dWRlbnRTZXJ2aWNlXHJcbiAgICAgICAgICAgICAgLmNvdXJzZUVucm9sbChzdHVkZW50LnVzZXJJRCwgc3R1ZGVudC5zdHVkZW50U3RhcnREYXRlLCBzdHVkZW50LnN0dWRlbnRFbmREYXRlLCB0aGlzLmNvdXJzZUlELCB0aGlzLmluc3RydWN0b3JJRClcclxuICAgICAgICAgICAgICAudGhlbihyZXN1bHQgPT4ge1xyXG4gICAgICAgICAgICAgICAgICBzdHVkZW50LmVucm9sbGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgc3dhbChcclxuICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY291cnNlTmFtZSxcclxuICAgICAgICAgICAgICAgICAgICAgICcnICsgc3R1ZGVudC5maXJzdE5hbWUgKyAnICcgKyBzdHVkZW50Lmxhc3ROYW1lICsgJyBoYXMgYmVlbiBzdWNjZXNmdWxseSBlbnJvbGxlZC4nLFxyXG4gICAgICAgICAgICAgICAgICAgICAgJ3N1Y2Nlc3MnXHJcbiAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAuY2F0Y2goZXJyb3IgPT4gZXJyb3IpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBzd2FsKFxyXG4gICAgICAgICAgICAgICdXaG9vcHMnLFxyXG4gICAgICAgICAgICAgICdQbGVhc2UgaW5wdXQgYSB2YWxpZCBzdGFydCBhbmQgZW5kIGRhdGUgZm9yIHRoZSBzdHVkZW50LicsXHJcbiAgICAgICAgICAgICAgJ3dhcm5pbmcnXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBkcm9wKHN0dWRlbnQ6IFN0dWRlbnQpIHtcclxuICAgICAgICB0aGlzLnN0dWRlbnRTZXJ2aWNlXHJcbiAgICAgICAgICAgIC5jb3Vyc2VEcm9wKHN0dWRlbnQudXNlcklELCB0aGlzLmNvdXJzZUlEKVxyXG4gICAgICAgICAgICAudGhlbihyZXN1bHQgPT4ge1xyXG4gICAgICAgICAgICAgICAgc3R1ZGVudC5lbnJvbGxlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuY2F0Y2goZXJyb3IgPT4gZXJyb3IpO1xyXG4gICAgfVxyXG5cclxuICAgIGNoZWNrU3RhdHVzKCkge1xyXG4gICAgfVxyXG5cclxuICAgIGdvQmFjaygpIHtcclxuICAgICAgICB3aW5kb3cuaGlzdG9yeS5iYWNrKCk7XHJcbiAgICB9XHJcbn1cclxuIl19
