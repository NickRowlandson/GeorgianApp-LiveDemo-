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
        swal({
            title: 'Loading...',
            allowOutsideClick: false
        });
        swal.showLoading();
        this.route.params.forEach(function (params) {
            if (params['courseID'] && params['instructorID'] && params['courseName']) {
                _this.enrollMultiple = true;
                _this.courseID = params['courseID'];
                _this.instructorID = params['instructorID'];
                _this.courseName = params['courseName'];
                _this.getStudents();
            }
            else if (params['courseType'] && params['studentID']) {
                _this.enrollMultiple = false;
                _this.courseType = params['courseType'];
                _this.studentID = params['studentID'];
                _this.getStudentById(_this.studentID);
            }
        });
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
    StudentEnrollmentComponent.prototype.getStudentById = function (id) {
        var _this = this;
        this.studentService
            .getStudent(id)
            .then(function (result) {
            if (result.result === 'error') {
                _this.student = null;
                _this.displayErrorAlert(result);
            }
            else {
                _this.student = result;
                _this.getCourses();
            }
        }).catch(function (error) { return error; });
    };
    StudentEnrollmentComponent.prototype.getCourses = function () {
        var _this = this;
        this.courseService
            .getCourses()
            .then(function (result) {
            if (result.result === 'error') {
                _this.displayErrorAlert(result);
            }
            else {
                _this.courses = result;
                _this.courses = _this.courses.filter(function (x) { return x.courseType === _this.courseType; });
                _this.getTimetables();
            }
        })
            .catch(function (error) { return error; });
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
        var _this = this;
        if (this.students == null) {
            for (var _i = 0, _a = this.courses; _i < _a.length; _i++) {
                var course = _a[_i];
                var timetable = this.studentTimetables.filter(function (x) { return x.userID === _this.student.userID; });
                for (var _b = 0, timetable_1 = timetable; _b < timetable_1.length; _b++) {
                    var item = timetable_1[_b];
                    var itemCourseID = item.courseID;
                    if (itemCourseID === course.courseID) {
                        course.enrolled = true;
                    }
                    else {
                        course.enrolled = false;
                    }
                }
            }
        }
        else {
            var _loop_1 = function (student) {
                timetable = this_1.studentTimetables.filter(function (x) { return x.userID === student.userID; });
                for (var _i = 0, timetable_2 = timetable; _i < timetable_2.length; _i++) {
                    var item = timetable_2[_i];
                    itemCourseID = item.courseID.toString();
                    if (itemCourseID === this_1.courseID) {
                        student.enrolled = true;
                    }
                }
            };
            var this_1 = this, timetable, itemCourseID;
            for (var _c = 0, _d = this.students; _c < _d.length; _c++) {
                var student = _d[_c];
                _loop_1(student);
            }
        }
        this.loading = false;
        swal.close();
    };
    StudentEnrollmentComponent.prototype.checkEnrolled = function (data) {
        var _this = this;
        if (this.students == null && data.enrolled) {
            swal({
                title: 'Remove ' + data.firstName + ' ' + data.lastName + ' from ' + this.courseName + '?',
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
                    _this.drop(data);
                }
            }).catch(function (error) {
                console.log(error);
            });
        }
        else {
            this.enroll(data);
        }
    };
    StudentEnrollmentComponent.prototype.enroll = function (data) {
        var _this = this;
        var startDate = moment(data.studentStartDate, "DDD MMM YYYY h:mm:ss LT").isValid();
        var endDate = moment(data.studentEndDate, "DDD MMM YYYY h:mm:ss LT").isValid();
        if (startDate && endDate) {
            if (this.students != null) {
                this.studentService
                    .courseEnroll(data.userID, data.studentStartDate, data.studentEndDate, this.courseID, this.instructorID)
                    .then(function (result) {
                    if (result.result === 'error') {
                        _this.displayErrorAlert(result);
                    }
                    else if (result.result === 'success') {
                        data.enrolled = true;
                        swal(_this.courseName, '' + data.firstName + ' ' + data.lastName + ' has been succesfully enrolled.', 'success');
                    }
                    else {
                        swal('Error', 'Something went wrong while enrolling student.', 'error');
                    }
                })
                    .catch(function (error) { return error; });
            }
            else {
                this.studentService
                    .courseEnroll(this.student.userID, data.studentStartDate, data.studentEndDate, data.courseID, data.professorId)
                    .then(function (result) {
                    if (result.result === 'error') {
                        _this.displayErrorAlert(result);
                    }
                    else if (result.result === 'success') {
                        _this.courseService
                            .removeFromWaitList(_this.student.userID, data.courseType)
                            .then(function (result) {
                            data.enrolled = true;
                            swal(data.courseName, '' + _this.student.firstName + ' ' + _this.student.lastName + ' has been succesfully enrolled.', 'success');
                        }).catch(function (error) { return error; });
                    }
                    else {
                        swal('Error', 'Something went wrong while enrolling student.', 'error');
                    }
                })
                    .catch(function (error) { return error; });
            }
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NsaWVudC9hcHAvY29tcG9uZW50cy9zdHVkZW50LWVucm9sbG1lbnQvc3R1ZGVudC1lbnJvbGxtZW50LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLHNDQUF5RDtBQUV6RCwwQ0FBeUQ7QUFHekQsZ0VBQThEO0FBQzlELGtFQUFnRTtBQVVoRTtJQWdCRSxvQ0FBb0IsY0FBOEIsRUFBVSxhQUE0QixFQUFVLEtBQXFCO1FBQW5HLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUFVLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBQVUsVUFBSyxHQUFMLEtBQUssQ0FBZ0I7UUFkdkgsWUFBTyxHQUFZLElBQUksQ0FBQztRQUN4QixzQkFBaUIsR0FBVSxFQUFFLENBQUM7SUFlOUIsQ0FBQztJQUVELDZDQUFRLEdBQVI7UUFBQSxpQkFvQkM7UUFuQkMsSUFBSSxDQUFDO1lBQ0gsS0FBSyxFQUFFLFlBQVk7WUFDbkIsaUJBQWlCLEVBQUUsS0FBSztTQUN6QixDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDbkIsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLFVBQUMsTUFBYztZQUN2QyxJQUFJLE1BQU0sQ0FBQyxVQUFVLENBQUMsSUFBSSxNQUFNLENBQUMsY0FBYyxDQUFDLElBQUksTUFBTSxDQUFDLFlBQVksQ0FBQyxFQUFFO2dCQUN4RSxLQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQztnQkFDM0IsS0FBSSxDQUFDLFFBQVEsR0FBRyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUM7Z0JBQ25DLEtBQUksQ0FBQyxZQUFZLEdBQUcsTUFBTSxDQUFDLGNBQWMsQ0FBQyxDQUFDO2dCQUMzQyxLQUFJLENBQUMsVUFBVSxHQUFHLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQztnQkFDdkMsS0FBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO2FBQ3BCO2lCQUFNLElB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QUssQ0FBQyxLQUFLLEVBQ1gsS0FBSyxDQUFDLEdBQUcsRUFDVCxPQUFPLENBQ1IsQ0FBQztJQUNKLENBQUM7SUFFRCwyQ0FBTSxHQUFOO1FBQ0UsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUN4QixDQUFDO0lBclBVLDBCQUEwQjtRQU50QyxnQkFBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLGtCQUFrQjtZQUM1QixXQUFXLEVBQUUsdUVBQXVFO1lBQ3BGLFNBQVMsRUFBRSxDQUFDLHNFQUFzRSxDQUFDO1NBQ3BGLENBQUM7eUNBa0JvQyxnQ0FBYyxFQUF5Qiw4QkFBYSxFQUFpQix1QkFBYztPQWhCNUcsMEJBQTBCLENBc1B0QztJQUFELGlDQUFDO0NBdFBELEFBc1BDLElBQUE7QUF0UFksZ0VBQTBCIiwiZmlsZSI6ImFwcC9jb21wb25lbnRzL3N0dWRlbnQtZW5yb2xsbWVudC9zdHVkZW50LWVucm9sbG1lbnQuY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcbmltcG9ydCB7IEFjdGl2YXRlZFJvdXRlLCBQYXJhbXMgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xyXG5pbXBvcnQgeyBDb3Vyc2UgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL2NvdXJzZVwiO1xyXG5pbXBvcnQgeyBTdHVkZW50IH0gZnJvbSBcIi4uLy4uL21vZGVscy9TdHVkZW50XCI7XHJcbmltcG9ydCB7IENvdXJzZVNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvY291cnNlLnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgU3R1ZGVudFNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvc3R1ZGVudC5zZXJ2aWNlXCI7XHJcbmRlY2xhcmUgdmFyIHN3YWw6IGFueTtcclxuZGVjbGFyZSB2YXIgbW9tZW50OiBhbnk7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2NvdXJzZS1zZWxlY3Rpb24nLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9hcHAvY29tcG9uZW50cy9zdHVkZW50LWVucm9sbG1lbnQvc3R1ZGVudC1lbnJvbGxtZW50LmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9hcHAvY29tcG9uZW50cy9zdHVkZW50LWVucm9sbG1lbnQvc3R1ZGVudC1lbnJvbGxtZW50LmNvbXBvbmVudC5jc3MnXVxyXG59KVxyXG5cclxuZXhwb3J0IGNsYXNzIFN0dWRlbnRFbnJvbGxtZW50Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuICBzdHVkZW50VGltZXRhYmxlczogYW55W107XHJcbiAgbG9hZGluZzogYm9vbGVhbiA9IHRydWU7XHJcbiAgdGVtcFRpbWV0YWJsZUFycnk6IGFueVtdID0gW107XHJcbiAgZW5yb2xsTXVsdGlwbGU6IGJvb2xlYW47XHJcbiAgLy8gaWYgZW5yb2xsaW5nIG11bHRpcGxlIHN0dWRlbnRzXHJcbiAgc3R1ZGVudHM6IFN0dWRlbnRbXTtcclxuICBjb3Vyc2VJRDogYW55O1xyXG4gIGluc3RydWN0b3JJRDogYW55O1xyXG4gIGNvdXJzZU5hbWU6IGFueTtcclxuICAvLyBpZiBlbnJvbGxpbmcgc3BlY2lmaWMgc3R1ZGVudFxyXG4gIHN0dWRlbnQ6IFN0dWRlbnRbXTtcclxuICBjb3Vyc2VUeXBlOiBhbnk7XHJcbiAgc3R1ZGVudElEOiBhbnk7XHJcbiAgY291cnNlczogYW55W107XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgc3R1ZGVudFNlcnZpY2U6IFN0dWRlbnRTZXJ2aWNlLCBwcml2YXRlIGNvdXJzZVNlcnZpY2U6IENvdXJzZVNlcnZpY2UsIHByaXZhdGUgcm91dGU6IEFjdGl2YXRlZFJvdXRlKSB7XHJcblxyXG4gIH1cclxuXHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgICBzd2FsKHtcclxuICAgICAgdGl0bGU6ICdMb2FkaW5nLi4uJyxcclxuICAgICAgYWxsb3dPdXRzaWRlQ2xpY2s6IGZhbHNlXHJcbiAgICB9KTtcclxuICAgIHN3YWwuc2hvd0xvYWRpbmcoKTtcclxuICAgIHRoaXMucm91dGUucGFyYW1zLmZvckVhY2goKHBhcmFtczogUGFyYW1zKSA9PiB7XHJcbiAgICAgIGlmIChwYXJhbXNbJ2NvdXJzZUlEJ10gJiYgcGFyYW1zWydpbnN0cnVjdG9ySUQnXSAmJiBwYXJhbXNbJ2NvdXJzZU5hbWUnXSkge1xyXG4gICAgICAgIHRoaXMuZW5yb2xsTXVsdGlwbGUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuY291cnNlSUQgPSBwYXJhbXNbJ2NvdXJzZUlEJ107XHJcbiAgICAgICAgdGhpcy5pbnN0cnVjdG9ySUQgPSBwYXJhbXNbJ2luc3RydWN0b3JJRCddO1xyXG4gICAgICAgIHRoaXMuY291cnNlTmFtZSA9IHBhcmFtc1snY291cnNlTmFtZSddO1xyXG4gICAgICAgIHRoaXMuZ2V0U3R1ZGVudHMoKTtcclxuICAgICAgfSBlbHNlIGlmIChwYXJhbXNbJ2NvdXJzZVR5cGUnXSAmJiBwYXJhbXNbJ3N0dWRlbnRJRCddKSB7XHJcbiAgICAgICAgdGhpcy5lbnJvbGxNdWx0aXBsZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuY291cnNlVHlwZSA9IHBhcmFtc1snY291cnNlVHlwZSddO1xyXG4gICAgICAgIHRoaXMuc3R1ZGVudElEID0gcGFyYW1zWydzdHVkZW50SUQnXTtcclxuICAgICAgICB0aGlzLmdldFN0dWRlbnRCeUlkKHRoaXMuc3R1ZGVudElEKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBnZXRTdHVkZW50cygpIHtcclxuICAgIHRoaXMuc3R1ZGVudFNlcnZpY2VcclxuICAgICAgLmdldFN0dWRlbnRzKClcclxuICAgICAgLnRoZW4ocmVzdWx0ID0+IHtcclxuICAgICAgICBpZiAoKHJlc3VsdCBhcyBhbnkpLnJlc3VsdCA9PT0gJ2Vycm9yJykge1xyXG4gICAgICAgICAgdGhpcy5zdHVkZW50cyA9IG51bGw7XHJcbiAgICAgICAgICB0aGlzLmRpc3BsYXlFcnJvckFsZXJ0KHJlc3VsdCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHRoaXMuc3R1ZGVudHMgPSByZXN1bHQ7XHJcbiAgICAgICAgICBmb3IgKGxldCBzdHVkZW50IG9mIHRoaXMuc3R1ZGVudHMpIHtcclxuICAgICAgICAgICAgc3R1ZGVudC5mdWxsTmFtZSA9IHN0dWRlbnQuZmlyc3ROYW1lICsgXCIgXCIgKyBzdHVkZW50Lmxhc3ROYW1lO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgdGhpcy5nZXRUaW1ldGFibGVzKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KS5jYXRjaChlcnJvciA9PiBlcnJvcik7XHJcbiAgfVxyXG5cclxuICBnZXRTdHVkZW50QnlJZChpZCkge1xyXG4gICAgdGhpcy5zdHVkZW50U2VydmljZVxyXG4gICAgICAuZ2V0U3R1ZGVudChpZClcclxuICAgICAgLnRoZW4ocmVzdWx0ID0+IHtcclxuICAgICAgICBpZiAoKHJlc3VsdCBhcyBhbnkpLnJlc3VsdCA9PT0gJ2Vycm9yJykge1xyXG4gICAgICAgICAgdGhpcy5zdHVkZW50ID0gbnVsbDtcclxuICAgICAgICAgIHRoaXMuZGlzcGxheUVycm9yQWxlcnQocmVzdWx0KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdGhpcy5zdHVkZW50ID0gcmVzdWx0O1xyXG4gICAgICAgICAgdGhpcy5nZXRDb3Vyc2VzKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KS5jYXRjaChlcnJvciA9PiBlcnJvcik7XHJcbiAgfVxyXG5cclxuICBnZXRDb3Vyc2VzKCkge1xyXG4gICAgdGhpcy5jb3Vyc2VTZXJ2aWNlXHJcbiAgICAgIC5nZXRDb3Vyc2VzKClcclxuICAgICAgLnRoZW4ocmVzdWx0ID0+IHtcclxuICAgICAgICBpZiAoKHJlc3VsdCBhcyBhbnkpLnJlc3VsdCA9PT0gJ2Vycm9yJykge1xyXG4gICAgICAgICAgdGhpcy5kaXNwbGF5RXJyb3JBbGVydChyZXN1bHQpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB0aGlzLmNvdXJzZXMgPSByZXN1bHQ7XHJcbiAgICAgICAgICB0aGlzLmNvdXJzZXMgPSB0aGlzLmNvdXJzZXMuZmlsdGVyKHggPT4geC5jb3Vyc2VUeXBlID09PSB0aGlzLmNvdXJzZVR5cGUpO1xyXG4gICAgICAgICAgdGhpcy5nZXRUaW1ldGFibGVzKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gICAgICAuY2F0Y2goZXJyb3IgPT4gZXJyb3IpO1xyXG4gIH1cclxuXHJcbiAgZ2V0VGltZXRhYmxlcygpIHtcclxuICAgIHRoaXMuc3R1ZGVudFNlcnZpY2VcclxuICAgICAgLmdldFRpbWV0YWJsZXMoKVxyXG4gICAgICAudGhlbihyZXN1bHQgPT4ge1xyXG4gICAgICAgIGlmICgocmVzdWx0IGFzIGFueSkucmVzdWx0ID09PSAnZXJyb3InKSB7XHJcbiAgICAgICAgICB0aGlzLmRpc3BsYXlFcnJvckFsZXJ0KHJlc3VsdCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHRoaXMuc3R1ZGVudFRpbWV0YWJsZXMgPSByZXN1bHQ7XHJcbiAgICAgICAgICB0aGlzLmNvbXBhcmVUaW1ldGFibGVzKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gICAgICAuY2F0Y2goZXJyb3IgPT4gZXJyb3IpO1xyXG4gIH1cclxuXHJcbiAgY29tcGFyZVRpbWV0YWJsZXMoKSB7XHJcbiAgICBpZiAodGhpcy5zdHVkZW50cyA9PSBudWxsKSB7XHJcbiAgICAgIGZvciAobGV0IGNvdXJzZSBvZiB0aGlzLmNvdXJzZXMpIHtcclxuICAgICAgICB2YXIgdGltZXRhYmxlID0gdGhpcy5zdHVkZW50VGltZXRhYmxlcy5maWx0ZXIoeCA9PiB4LnVzZXJJRCA9PT0gKHRoaXMuc3R1ZGVudCBhcyBhbnkpLnVzZXJJRCk7XHJcbiAgICAgICAgZm9yIChsZXQgaXRlbSBvZiB0aW1ldGFibGUpIHtcclxuICAgICAgICAgIHZhciBpdGVtQ291cnNlSUQgPSBpdGVtLmNvdXJzZUlEO1xyXG4gICAgICAgICAgaWYgKGl0ZW1Db3Vyc2VJRCA9PT0gY291cnNlLmNvdXJzZUlEKSB7XHJcbiAgICAgICAgICAgIGNvdXJzZS5lbnJvbGxlZCA9IHRydWU7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjb3Vyc2UuZW5yb2xsZWQgPSBmYWxzZTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGZvciAobGV0IHN0dWRlbnQgb2YgdGhpcy5zdHVkZW50cykge1xyXG4gICAgICAgIHZhciB0aW1ldGFibGUgPSB0aGlzLnN0dWRlbnRUaW1ldGFibGVzLmZpbHRlcih4ID0+IHgudXNlcklEID09PSBzdHVkZW50LnVzZXJJRCk7XHJcbiAgICAgICAgZm9yIChsZXQgaXRlbSBvZiB0aW1ldGFibGUpIHtcclxuICAgICAgICAgIHZhciBpdGVtQ291cnNlSUQgPSBpdGVtLmNvdXJzZUlELnRvU3RyaW5nKCk7XHJcbiAgICAgICAgICBpZiAoaXRlbUNvdXJzZUlEID09PSB0aGlzLmNvdXJzZUlEKSB7XHJcbiAgICAgICAgICAgIHN0dWRlbnQuZW5yb2xsZWQgPSB0cnVlO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgdGhpcy5sb2FkaW5nID0gZmFsc2U7XHJcbiAgICBzd2FsLmNsb3NlKCk7XHJcbiAgfVxyXG5cclxuICBjaGVja0Vucm9sbGVkKGRhdGEpIHtcclxuICAgIGlmICh0aGlzLnN0dWRlbnRzID09IG51bGwgJiYgZGF0YS5lbnJvbGxlZCkge1xyXG4gICAgICBzd2FsKHtcclxuICAgICAgICB0aXRsZTogJ1JlbW92ZSAnICsgZGF0YS5maXJzdE5hbWUgKyAnICcgKyBkYXRhLmxhc3ROYW1lICsgJyBmcm9tICcgKyB0aGlzLmNvdXJzZU5hbWUgKyAnPycsXHJcbiAgICAgICAgdGV4dDogXCJcIixcclxuICAgICAgICB0eXBlOiAnd2FybmluZycsXHJcbiAgICAgICAgc2hvd0NhbmNlbEJ1dHRvbjogdHJ1ZSxcclxuICAgICAgICBjb25maXJtQnV0dG9uQ29sb3I6ICcjMzA4NWQ2JyxcclxuICAgICAgICBjYW5jZWxCdXR0b25Db2xvcjogJyNkMzMnLFxyXG4gICAgICAgIGNvbmZpcm1CdXR0b25UZXh0OiAnWWVzLCByZW1vdmUhJ1xyXG4gICAgICB9KS50aGVuKGlzQ29uZmlybSA9PiB7XHJcbiAgICAgICAgaWYgKGlzQ29uZmlybS5kaXNtaXNzID09PSBcImNhbmNlbFwiIHx8IGlzQ29uZmlybS5kaXNtaXNzID09PSBcIm92ZXJsYXlcIikge1xyXG4gICAgICAgICAgY29uc29sZS5sb2coaXNDb25maXJtLmRpc21pc3MpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoaXNDb25maXJtKSB7XHJcbiAgICAgICAgICB0aGlzLmRyb3AoZGF0YSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KS5jYXRjaChlcnJvciA9PiB7XHJcbiAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xyXG4gICAgICB9KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuZW5yb2xsKGRhdGEpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZW5yb2xsKGRhdGEpIHtcclxuICAgIHZhciBzdGFydERhdGUgPSBtb21lbnQoZGF0YS5zdHVkZW50U3RhcnREYXRlLCBcIkRERCBNTU0gWVlZWSBoOm1tOnNzIExUXCIpLmlzVmFsaWQoKTtcclxuICAgIHZhciBlbmREYXRlID0gbW9tZW50KGRhdGEuc3R1ZGVudEVuZERhdGUsIFwiREREIE1NTSBZWVlZIGg6bW06c3MgTFRcIikuaXNWYWxpZCgpO1xyXG4gICAgaWYgKHN0YXJ0RGF0ZSAmJiBlbmREYXRlKSB7XHJcbiAgICAgIGlmICh0aGlzLnN0dWRlbnRzICE9IG51bGwpIHtcclxuICAgICAgICB0aGlzLnN0dWRlbnRTZXJ2aWNlXHJcbiAgICAgICAgICAuY291cnNlRW5yb2xsKGRhdGEudXNlcklELCBkYXRhLnN0dWRlbnRTdGFydERhdGUsIGRhdGEuc3R1ZGVudEVuZERhdGUsIHRoaXMuY291cnNlSUQsIHRoaXMuaW5zdHJ1Y3RvcklEKVxyXG4gICAgICAgICAgLnRoZW4ocmVzdWx0ID0+IHtcclxuICAgICAgICAgICAgaWYgKChyZXN1bHQgYXMgYW55KS5yZXN1bHQgPT09ICdlcnJvcicpIHtcclxuICAgICAgICAgICAgICB0aGlzLmRpc3BsYXlFcnJvckFsZXJ0KHJlc3VsdCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoKHJlc3VsdCBhcyBhbnkpLnJlc3VsdCA9PT0gJ3N1Y2Nlc3MnKSB7XHJcbiAgICAgICAgICAgICAgZGF0YS5lbnJvbGxlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgc3dhbChcclxuICAgICAgICAgICAgICAgIHRoaXMuY291cnNlTmFtZSxcclxuICAgICAgICAgICAgICAgICcnICsgZGF0YS5maXJzdE5hbWUgKyAnICcgKyBkYXRhLmxhc3ROYW1lICsgJyBoYXMgYmVlbiBzdWNjZXNmdWxseSBlbnJvbGxlZC4nLFxyXG4gICAgICAgICAgICAgICAgJ3N1Y2Nlc3MnXHJcbiAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICBzd2FsKFxyXG4gICAgICAgICAgICAgICAgJ0Vycm9yJyxcclxuICAgICAgICAgICAgICAgICdTb21ldGhpbmcgd2VudCB3cm9uZyB3aGlsZSBlbnJvbGxpbmcgc3R1ZGVudC4nLFxyXG4gICAgICAgICAgICAgICAgJ2Vycm9yJ1xyXG4gICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgICAuY2F0Y2goZXJyb3IgPT4gZXJyb3IpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuc3R1ZGVudFNlcnZpY2VcclxuICAgICAgICAgIC5jb3Vyc2VFbnJvbGwoKHRoaXMuc3R1ZGVudCBhcyBhbnkpLnVzZXJJRCwgZGF0YS5zdHVkZW50U3RhcnREYXRlLCBkYXRhLnN0dWRlbnRFbmREYXRlLCBkYXRhLmNvdXJzZUlELCBkYXRhLnByb2Zlc3NvcklkKVxyXG4gICAgICAgICAgLnRoZW4ocmVzdWx0ID0+IHtcclxuICAgICAgICAgICAgaWYgKChyZXN1bHQgYXMgYW55KS5yZXN1bHQgPT09ICdlcnJvcicpIHtcclxuICAgICAgICAgICAgICB0aGlzLmRpc3BsYXlFcnJvckFsZXJ0KHJlc3VsdCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoKHJlc3VsdCBhcyBhbnkpLnJlc3VsdCA9PT0gJ3N1Y2Nlc3MnKSB7XHJcbiAgICAgICAgICAgICAgdGhpcy5jb3Vyc2VTZXJ2aWNlXHJcbiAgICAgICAgICAgICAgICAucmVtb3ZlRnJvbVdhaXRMaXN0KCh0aGlzLnN0dWRlbnQgYXMgYW55KS51c2VySUQsIGRhdGEuY291cnNlVHlwZSlcclxuICAgICAgICAgICAgICAgIC50aGVuKHJlc3VsdCA9PiB7XHJcbiAgICAgICAgICAgICAgICAgIGRhdGEuZW5yb2xsZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICBzd2FsKFxyXG4gICAgICAgICAgICAgICAgICAgIGRhdGEuY291cnNlTmFtZSxcclxuICAgICAgICAgICAgICAgICAgICAnJyArICh0aGlzLnN0dWRlbnQgYXMgYW55KS5maXJzdE5hbWUgKyAnICcgKyAodGhpcy5zdHVkZW50IGFzIGFueSkubGFzdE5hbWUgKyAnIGhhcyBiZWVuIHN1Y2Nlc2Z1bGx5IGVucm9sbGVkLicsXHJcbiAgICAgICAgICAgICAgICAgICAgJ3N1Y2Nlc3MnXHJcbiAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICB9KS5jYXRjaChlcnJvciA9PiBlcnJvcik7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgc3dhbChcclxuICAgICAgICAgICAgICAgICdFcnJvcicsXHJcbiAgICAgICAgICAgICAgICAnU29tZXRoaW5nIHdlbnQgd3Jvbmcgd2hpbGUgZW5yb2xsaW5nIHN0dWRlbnQuJyxcclxuICAgICAgICAgICAgICAgICdlcnJvcidcclxuICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgICAgLmNhdGNoKGVycm9yID0+IGVycm9yKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgc3dhbChcclxuICAgICAgICAnV2hvb3BzJyxcclxuICAgICAgICAnUGxlYXNlIGlucHV0IGEgdmFsaWQgc3RhcnQgYW5kIGVuZCBkYXRlIGZvciB0aGUgc3R1ZGVudC4nLFxyXG4gICAgICAgICd3YXJuaW5nJ1xyXG4gICAgICApO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZHJvcChzdHVkZW50OiBTdHVkZW50KSB7XHJcbiAgICB0aGlzLnN0dWRlbnRTZXJ2aWNlXHJcbiAgICAgIC5jb3Vyc2VEcm9wKHN0dWRlbnQudXNlcklELCB0aGlzLmNvdXJzZUlEKVxyXG4gICAgICAudGhlbihyZXN1bHQgPT4ge1xyXG4gICAgICAgIGlmICgocmVzdWx0IGFzIGFueSkucmVzdWx0ID09PSAnZXJyb3InKSB7XHJcbiAgICAgICAgICB0aGlzLmRpc3BsYXlFcnJvckFsZXJ0KHJlc3VsdCk7XHJcbiAgICAgICAgfSBlbHNlIGlmICgocmVzdWx0IGFzIGFueSkucmVzdWx0ID09PSAnc3VjY2VzcycpIHtcclxuICAgICAgICAgIHN0dWRlbnQuZW5yb2xsZWQgPSBmYWxzZTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgc3dhbChcclxuICAgICAgICAgICAgJ0Vycm9yJyxcclxuICAgICAgICAgICAgJ1NvbWV0aGluZyB3ZW50IHdyb25nLCBwbGVhc2UgdHJ5IGFnYWluLicsXHJcbiAgICAgICAgICAgICdlcnJvcidcclxuICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gICAgICAuY2F0Y2goZXJyb3IgPT4gZXJyb3IpO1xyXG4gIH1cclxuXHJcbiAgZGlzcGxheUVycm9yQWxlcnQoZXJyb3IpIHtcclxuICAgIHN3YWwoXHJcbiAgICAgIGVycm9yLnRpdGxlLFxyXG4gICAgICBlcnJvci5tc2csXHJcbiAgICAgICdlcnJvcidcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBnb0JhY2soKSB7XHJcbiAgICB3aW5kb3cuaGlzdG9yeS5iYWNrKCk7XHJcbiAgfVxyXG59XHJcbiJdfQ==
