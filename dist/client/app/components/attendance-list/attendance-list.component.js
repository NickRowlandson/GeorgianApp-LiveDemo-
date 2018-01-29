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
var AttendanceListComponent = /** @class */ (function () {
    function AttendanceListComponent(router, CourseService, StudentService, StaffService) {
        this.router = router;
        this.CourseService = CourseService;
        this.StudentService = StudentService;
        this.StaffService = StaffService;
        this.attendanceView = false;
        this.loading = false;
        this.absentStudents = [];
        this.attendanceDates = [];
        this.instructorOptions = {};
        this.date = new Date();
    }
    AttendanceListComponent.prototype.ngOnInit = function () {
        var _this = this;
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        var userID = currentUser.userID;
        if (currentUser.userType !== 'Instructor') {
            this.StaffService
                .getUsers()
                .then(function (instructors) {
                _this.instructors = instructors.filter(function (x) { return x.userType === 'Instructor'; });
                for (var _i = 0, _a = _this.instructors; _i < _a.length; _i++) {
                    var item = _a[_i];
                    _this.instructorOptions[item.userID] = item.firstName + " " + item.lastName;
                }
            })
                .catch(function (error) {
                // do something
            });
            console.log(this.instructorOptions);
            swal({
                title: 'Attendance',
                text: 'Select an Instructor',
                input: "select",
                inputOptions: this.instructorOptions,
                showCancelButton: true,
                animation: "slide-from-top",
                confirmButtonColor: '#3085d6',
                allowOutsideClick: false,
                confirmButtonText: 'Continue',
                cancelButtonText: 'Back to Dashboard'
            }).then(function (isConfirm) {
                if (isConfirm.dismiss === "cancel" || isConfirm.dismiss === "overlay") {
                    console.log(isConfirm.dismiss);
                    _this.router.navigate(['/dashboard']);
                }
                else if (isConfirm) {
                    console.log(isConfirm.value);
                }
            }).catch(function (error) {
                console.log(error);
            });
        }
        else {
            this.getCourses(userID);
            this.StudentService
                .getAllAttendance()
                .then(function (attendance) {
                if (attendance.status === "403") {
                    _this.previousAttendance = null;
                }
                else {
                    _this.previousAttendance = attendance;
                    for (var _i = 0, _a = _this.previousAttendance; _i < _a.length; _i++) {
                        var item = _a[_i];
                        item.date = item.date[0] + " " + item.date[1];
                    }
                }
            })
                .catch(function (error) { return console.log(error); });
        }
    };
    AttendanceListComponent.prototype.getCourses = function (instructorID) {
        var _this = this;
        this.CourseService
            .getInstructorCourses(instructorID)
            .then(function (result) {
            var isEmpty = (result || []).length === 0;
            if (isEmpty) {
                console.log(result);
                _this.data = null;
            }
            else {
                _this.data = result;
            }
        })
            .catch(function (error) { return console.log(error); });
    };
    AttendanceListComponent.prototype.doAttendance = function (course) {
        var _this = this;
        this.loading = true;
        this.previousAttendance = this.previousAttendance.filter(function (x) { return x.courseID === course.courseID; });
        this.courseID = course.courseID;
        this.StudentService
            .getTimetablesByCourseId(course.courseID)
            .then(function (result) {
            var isEmpty = (result || []).length === 0;
            if (isEmpty) {
                _this.timetables = null;
                _this.attendanceStudents = null;
                _this.loading = false;
            }
            else {
                _this.timetables = result;
                _this.getStudentsById(_this.timetables);
            }
        })
            .catch(function (error) { return console.log(error); });
        this.attendanceCourse = course;
        var array = this.attendanceCourse.classTimeStr.split(',');
        var _loop_1 = function (item) {
            attendanceHistory = this_1.previousAttendance;
            attendanceHistory = attendanceHistory.filter(function (x) { return x.date === item; });
            console.log(attendanceHistory);
            if (attendanceHistory.length !== 0) {
                console.log("Attendance already taken");
            }
            else {
                date = item.split(' ');
                this_1.attendanceDates.push(date);
            }
        };
        var this_1 = this, attendanceHistory, date;
        for (var _i = 0, array_1 = array; _i < array_1.length; _i++) {
            var item = array_1[_i];
            _loop_1(item);
        }
        this.attendanceView = true;
        console.log(this.attendanceDates);
    };
    AttendanceListComponent.prototype.getStudentsById = function (timetables) {
        var _this = this;
        this.StudentService
            .getStudentsById(timetables)
            .then(function (result) {
            var isEmpty = (result || []).length === 0;
            if (isEmpty) {
                _this.attendanceStudents = null;
            }
            else {
                _this.attendanceStudents = result;
                for (var _i = 0, _a = _this.attendanceStudents; _i < _a.length; _i++) {
                    var student = _a[_i];
                    student.fullName = student.firstName + " " + student.lastName;
                }
                _this.loading = false;
            }
        })
            .catch(function (error) { return console.log(error); });
    };
    // markAbsent(student: Student) {
    //   if (student.absent) {
    //     student.absent = false;
    //     var index = this.absentStudents.indexOf(student.studentID);
    //     this.absentStudents.splice(index, 1);
    //   } else {
    //     student.absent = true;
    //     this.absentStudents.push(student.studentID);
    //   }
    //   console.log(this.absentStudents);
    // }
    AttendanceListComponent.prototype.submitAttendance = function () {
        var _this = this;
        var count = 0;
        for (var _i = 0, _a = this.attendanceStudents; _i < _a.length; _i++) {
            var student = _a[_i];
            if (student.attendanceValue) {
                count++;
            }
        }
        if (!this.attendanceCourse.attendanceDate) {
            console.log(this.attendanceCourse);
            swal('Attendance Incomplete', 'Please enter an attendance date', 'warning');
        }
        else if (count === this.attendanceStudents.length && this.attendanceCourse.attendanceDate) {
            swal({
                title: 'Submit Attendance?',
                text: "You won't be able to revert this!",
                type: 'info',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, submit!'
            }).then(function (isConfirm) {
                if (isConfirm.dismiss === "cancel" || isConfirm.dismiss === "overlay") {
                    console.log(isConfirm.dismiss);
                }
                else if (isConfirm) {
                    _this.attendance = {
                        students: _this.attendanceStudents,
                        courseID: _this.courseID,
                        date: _this.attendanceCourse.attendanceDate
                    };
                    _this.StudentService
                        .insertAttendance(_this.attendance)
                        .then(function (result) {
                        swal('Attendance submitted!', '', 'success');
                        _this.attendanceView = false;
                        _this.router.navigate(['/attendance-report']);
                    })
                        .catch(function (error) { return console.log(error); });
                }
            }).catch(function (error) {
                console.log(error);
            });
        }
        else {
            swal('Attendance Incomplete', 'Please enter attendance for all students', 'warning');
        }
    };
    AttendanceListComponent.prototype.goBack = function () {
        window.history.back();
    };
    AttendanceListComponent = __decorate([
        core_1.Component({
            selector: 'attendanceList',
            templateUrl: './app/components/attendance-list/attendance-list.component.html',
            styleUrls: ['./app/components/attendance-list/attendance-list.component.css']
        }),
        __metadata("design:paramtypes", [router_1.Router, course_service_1.CourseService, student_service_1.StudentService, staff_service_1.StaffService])
    ], AttendanceListComponent);
    return AttendanceListComponent;
}());
exports.AttendanceListComponent = AttendanceListComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NsaWVudC9hcHAvY29tcG9uZW50cy9hdHRlbmRhbmNlLWxpc3QvYXR0ZW5kYW5jZS1saXN0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLHNDQUFrRDtBQUNsRCwwQ0FBeUM7QUFDekMsZ0VBQThEO0FBRzlELGtFQUFnRTtBQUNoRSw4REFBNEQ7QUFTNUQ7SUFnQkksaUNBQW9CLE1BQWMsRUFBVSxhQUE0QixFQUFVLGNBQThCLEVBQVUsWUFBMEI7UUFBaEksV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUFVLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBQVUsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBQVUsaUJBQVksR0FBWixZQUFZLENBQWM7UUFacEosbUJBQWMsR0FBWSxLQUFLLENBQUM7UUFDaEMsWUFBTyxHQUFZLEtBQUssQ0FBQztRQUt6QixtQkFBYyxHQUFHLEVBQUUsQ0FBQztRQUNwQixvQkFBZSxHQUFVLEVBQUUsQ0FBQztRQUc1QixzQkFBaUIsR0FBUSxFQUFFLENBQUM7UUFHMUIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDO0lBQ3pCLENBQUM7SUFFRCwwQ0FBUSxHQUFSO1FBQUEsaUJBd0RDO1FBdkRDLElBQUksV0FBVyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDO1FBQ2xFLElBQUksTUFBTSxHQUFHLFdBQVcsQ0FBQyxNQUFNLENBQUM7UUFDaEMsRUFBRSxDQUFDLENBQUMsV0FBVyxDQUFDLFFBQVEsS0FBSyxZQUFZLENBQUMsQ0FBQyxDQUFDO1lBQzFDLElBQUksQ0FBQyxZQUFZO2lCQUNaLFFBQVEsRUFBRTtpQkFDVixJQUFJLENBQUMsVUFBQSxXQUFXO2dCQUNiLEtBQUksQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFDLE1BQU0sQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsQ0FBQyxRQUFRLEtBQUssWUFBWSxFQUEzQixDQUEyQixDQUFDLENBQUM7Z0JBQ3hFLEdBQUcsQ0FBQyxDQUFhLFVBQWdCLEVBQWhCLEtBQUEsS0FBSSxDQUFDLFdBQVcsRUFBaEIsY0FBZ0IsRUFBaEIsSUFBZ0I7b0JBQTVCLElBQUksSUFBSSxTQUFBO29CQUNYLEtBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLFNBQVMsR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztpQkFDNUU7WUFDTCxDQUFDLENBQUM7aUJBQ0QsS0FBSyxDQUFDLFVBQUEsS0FBSztnQkFDVixlQUFlO1lBQ2pCLENBQUMsQ0FBQyxDQUFDO1lBRUgsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQztZQUV4QyxJQUFJLENBQUM7Z0JBQ0QsS0FBSyxFQUFFLFlBQVk7Z0JBQ25CLElBQUksRUFBRSxzQkFBc0I7Z0JBQzVCLEtBQUssRUFBRSxRQUFRO2dCQUNmLFlBQVksRUFBRSxJQUFJLENBQUMsaUJBQWlCO2dCQUNwQyxnQkFBZ0IsRUFBRSxJQUFJO2dCQUN0QixTQUFTLEVBQUUsZ0JBQWdCO2dCQUMzQixrQkFBa0IsRUFBRSxTQUFTO2dCQUM3QixpQkFBaUIsRUFBRSxLQUFLO2dCQUN4QixpQkFBaUIsRUFBRSxVQUFVO2dCQUM3QixnQkFBZ0IsRUFBRSxtQkFBbUI7YUFDeEMsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFBLFNBQVM7Z0JBQ2YsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLE9BQU8sS0FBSyxRQUFRLElBQUksU0FBUyxDQUFDLE9BQU8sS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDO29CQUN0RSxPQUFPLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQztvQkFDL0IsS0FBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO2dCQUN2QyxDQUFDO2dCQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO29CQUNyQixPQUFPLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDL0IsQ0FBQztZQUNILENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxVQUFBLEtBQUs7Z0JBQ1osT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNyQixDQUFDLENBQUMsQ0FBQztRQUNMLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNOLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDeEIsSUFBSSxDQUFDLGNBQWM7aUJBQ2QsZ0JBQWdCLEVBQUU7aUJBQ2xCLElBQUksQ0FBQyxVQUFBLFVBQVU7Z0JBQ1osRUFBRSxDQUFDLENBQUMsVUFBVSxDQUFDLE1BQU0sS0FBSyxLQUFLLENBQUMsQ0FBQyxDQUFDO29CQUM5QixLQUFJLENBQUMsa0JBQWtCLEdBQUcsSUFBSSxDQUFDO2dCQUNuQyxDQUFDO2dCQUFDLElBQUksQ0FBQyxDQUFDO29CQUNKLEtBQUksQ0FBQyxrQkFBa0IsR0FBRyxVQUFVLENBQUM7b0JBQ3JDLEdBQUcsQ0FBQyxDQUFhLFVBQXVCLEVBQXZCLEtBQUEsS0FBSSxDQUFDLGtCQUFrQixFQUF2QixjQUF1QixFQUF2QixJQUF1Qjt3QkFBbkMsSUFBSSxJQUFJLFNBQUE7d0JBQ1gsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO3FCQUMvQztnQkFDTCxDQUFDO1lBQ0wsQ0FBQyxDQUFDO2lCQUNELEtBQUssQ0FBQyxVQUFBLEtBQUssSUFBSSxPQUFBLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEVBQWxCLENBQWtCLENBQUMsQ0FBQztRQUMxQyxDQUFDO0lBRUgsQ0FBQztJQUVELDRDQUFVLEdBQVYsVUFBVyxZQUFZO1FBQXZCLGlCQWFDO1FBWkcsSUFBSSxDQUFDLGFBQWE7YUFDYixvQkFBb0IsQ0FBQyxZQUFZLENBQUM7YUFDbEMsSUFBSSxDQUFDLFVBQUEsTUFBTTtZQUNSLElBQUksT0FBTyxHQUFHLENBQUMsTUFBTSxJQUFJLEVBQUUsQ0FBQyxDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUM7WUFDMUMsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztnQkFDVixPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUNwQixLQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztZQUNyQixDQUFDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ0osS0FBSSxDQUFDLElBQUksR0FBRyxNQUFNLENBQUM7WUFDdkIsQ0FBQztRQUNMLENBQUMsQ0FBQzthQUNELEtBQUssQ0FBQyxVQUFBLEtBQUssSUFBSSxPQUFBLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEVBQWxCLENBQWtCLENBQUMsQ0FBQztJQUM1QyxDQUFDO0lBRUQsOENBQVksR0FBWixVQUFhLE1BQWM7UUFBM0IsaUJBa0NDO1FBakNDLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO1FBQ3BCLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUMsTUFBTSxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxDQUFDLFFBQVEsS0FBSyxNQUFNLENBQUMsUUFBUSxFQUE5QixDQUE4QixDQUFDLENBQUM7UUFDOUYsSUFBSSxDQUFDLFFBQVEsR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDO1FBQ2hDLElBQUksQ0FBQyxjQUFjO2FBQ2QsdUJBQXVCLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQzthQUN4QyxJQUFJLENBQUMsVUFBQSxNQUFNO1lBQ1IsSUFBSSxPQUFPLEdBQUcsQ0FBQyxNQUFNLElBQUksRUFBRSxDQUFDLENBQUMsTUFBTSxLQUFLLENBQUMsQ0FBQztZQUMxQyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO2dCQUNWLEtBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDO2dCQUN2QixLQUFJLENBQUMsa0JBQWtCLEdBQUcsSUFBSSxDQUFDO2dCQUMvQixLQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztZQUN6QixDQUFDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ0osS0FBSSxDQUFDLFVBQVUsR0FBRyxNQUFNLENBQUM7Z0JBQ3pCLEtBQUksQ0FBQyxlQUFlLENBQUMsS0FBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQzFDLENBQUM7UUFDTCxDQUFDLENBQUM7YUFDRCxLQUFLLENBQUMsVUFBQSxLQUFLLElBQUksT0FBQSxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUFsQixDQUFrQixDQUFDLENBQUM7UUFFeEMsSUFBSSxDQUFDLGdCQUFnQixHQUFHLE1BQU0sQ0FBQztRQUMvQixJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztnQ0FDakQsSUFBSTtZQUNQLGlCQUFpQixHQUFHLE9BQUssa0JBQWtCLENBQUM7WUFDaEQsaUJBQWlCLEdBQUcsaUJBQWlCLENBQUMsTUFBTSxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxDQUFDLElBQUksS0FBSyxJQUFJLEVBQWYsQ0FBZSxDQUFDLENBQUM7WUFDbkUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1lBQy9CLEVBQUUsQ0FBQyxDQUFDLGlCQUFpQixDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNuQyxPQUFPLENBQUMsR0FBRyxDQUFDLDBCQUEwQixDQUFDLENBQUM7WUFDMUMsQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNGLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUMzQixPQUFLLGVBQWUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDbEMsQ0FBQztRQUNILENBQUM7MkJBVEssaUJBQWlCLEVBTWYsSUFBSTtRQVBaLEdBQUcsQ0FBQyxDQUFhLFVBQUssRUFBTCxlQUFLLEVBQUwsbUJBQUssRUFBTCxJQUFLO1lBQWpCLElBQUksSUFBSSxjQUFBO29CQUFKLElBQUk7U0FVWjtRQUNELElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDO1FBQzNCLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDO0lBQ3BDLENBQUM7SUFFRCxpREFBZSxHQUFmLFVBQWdCLFVBQVU7UUFBMUIsaUJBZ0JDO1FBZkMsSUFBSSxDQUFDLGNBQWM7YUFDZCxlQUFlLENBQUMsVUFBVSxDQUFDO2FBQzNCLElBQUksQ0FBQyxVQUFBLE1BQU07WUFDUixJQUFJLE9BQU8sR0FBRyxDQUFDLE1BQU0sSUFBSSxFQUFFLENBQUMsQ0FBQyxNQUFNLEtBQUssQ0FBQyxDQUFDO1lBQzFDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7Z0JBQ1YsS0FBSSxDQUFDLGtCQUFrQixHQUFHLElBQUksQ0FBQztZQUNuQyxDQUFDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ0osS0FBSSxDQUFDLGtCQUFrQixHQUFHLE1BQU0sQ0FBQztnQkFDakMsR0FBRyxDQUFDLENBQWdCLFVBQXVCLEVBQXZCLEtBQUEsS0FBSSxDQUFDLGtCQUFrQixFQUF2QixjQUF1QixFQUF2QixJQUF1QjtvQkFBdEMsSUFBSSxPQUFPLFNBQUE7b0JBQ2QsT0FBTyxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUMsU0FBUyxHQUFHLEdBQUcsR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDO2lCQUMvRDtnQkFDRCxLQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztZQUN6QixDQUFDO1FBQ0wsQ0FBQyxDQUFDO2FBQ0QsS0FBSyxDQUFDLFVBQUEsS0FBSyxJQUFJLE9BQUEsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsRUFBbEIsQ0FBa0IsQ0FBQyxDQUFDO0lBQzFDLENBQUM7SUFFRCxpQ0FBaUM7SUFDakMsMEJBQTBCO0lBQzFCLDhCQUE4QjtJQUM5QixrRUFBa0U7SUFDbEUsNENBQTRDO0lBQzVDLGFBQWE7SUFDYiw2QkFBNkI7SUFDN0IsbURBQW1EO0lBQ25ELE1BQU07SUFDTixzQ0FBc0M7SUFDdEMsSUFBSTtJQUVKLGtEQUFnQixHQUFoQjtRQUFBLGlCQXlEQztRQXhEQyxJQUFJLEtBQUssR0FBRyxDQUFDLENBQUM7UUFDZCxHQUFHLENBQUMsQ0FBZ0IsVUFBdUIsRUFBdkIsS0FBQSxJQUFJLENBQUMsa0JBQWtCLEVBQXZCLGNBQXVCLEVBQXZCLElBQXVCO1lBQXRDLElBQUksT0FBTyxTQUFBO1lBQ2QsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUM7Z0JBQzVCLEtBQUssRUFBRSxDQUFDO1lBQ1YsQ0FBQztTQUNGO1FBRUQsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQztZQUMxQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1lBQ25DLElBQUksQ0FDQSx1QkFBdUIsRUFDdkIsaUNBQWlDLEVBQ2pDLFNBQVMsQ0FDWixDQUFDO1FBQ0osQ0FBQztRQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLEtBQUssSUFBSSxDQUFDLGtCQUFrQixDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQztZQUM1RixJQUFJLENBQUM7Z0JBQ0QsS0FBSyxFQUFFLG9CQUFvQjtnQkFDM0IsSUFBSSxFQUFFLG1DQUFtQztnQkFDekMsSUFBSSxFQUFFLE1BQU07Z0JBQ1osZ0JBQWdCLEVBQUUsSUFBSTtnQkFDdEIsa0JBQWtCLEVBQUUsU0FBUztnQkFDN0IsaUJBQWlCLEVBQUUsTUFBTTtnQkFDekIsaUJBQWlCLEVBQUUsY0FBYzthQUNwQyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUEsU0FBUztnQkFDZixFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsT0FBTyxLQUFLLFFBQVEsSUFBSSxTQUFTLENBQUMsT0FBTyxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUM7b0JBQ3RFLE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUNqQyxDQUFDO2dCQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO29CQUNyQixLQUFJLENBQUMsVUFBVSxHQUFHO3dCQUNoQixRQUFRLEVBQUUsS0FBSSxDQUFDLGtCQUFrQjt3QkFDakMsUUFBUSxFQUFFLEtBQUksQ0FBQyxRQUFRO3dCQUN2QixJQUFJLEVBQUUsS0FBSSxDQUFDLGdCQUFnQixDQUFDLGNBQWM7cUJBQzNDLENBQUM7b0JBQ0YsS0FBSSxDQUFDLGNBQWM7eUJBQ2QsZ0JBQWdCLENBQUMsS0FBSSxDQUFDLFVBQVUsQ0FBQzt5QkFDakMsSUFBSSxDQUFDLFVBQUEsTUFBTTt3QkFDVixJQUFJLENBQ0EsdUJBQXVCLEVBQ3ZCLEVBQUUsRUFDRixTQUFTLENBQ1osQ0FBQzt3QkFDRixLQUFJLENBQUMsY0FBYyxHQUFHLEtBQUssQ0FBQzt3QkFDNUIsS0FBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLENBQUM7b0JBQy9DLENBQUMsQ0FBQzt5QkFDRCxLQUFLLENBQUMsVUFBQSxLQUFLLElBQUksT0FBQSxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUFsQixDQUFrQixDQUFDLENBQUM7Z0JBQzFDLENBQUM7WUFDSCxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsVUFBQSxLQUFLO2dCQUNaLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDckIsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDTixJQUFJLENBQ0EsdUJBQXVCLEVBQ3ZCLDBDQUEwQyxFQUMxQyxTQUFTLENBQ1osQ0FBQztRQUNKLENBQUM7SUFFSCxDQUFDO0lBRUQsd0NBQU0sR0FBTjtRQUNJLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDMUIsQ0FBQztJQTVOUSx1QkFBdUI7UUFObkMsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxnQkFBZ0I7WUFDMUIsV0FBVyxFQUFFLGlFQUFpRTtZQUM5RSxTQUFTLEVBQUUsQ0FBQyxnRUFBZ0UsQ0FBQztTQUNoRixDQUFDO3lDQWtCOEIsZUFBTSxFQUF5Qiw4QkFBYSxFQUEwQixnQ0FBYyxFQUF3Qiw0QkFBWTtPQWhCM0ksdUJBQXVCLENBNk5uQztJQUFELDhCQUFDO0NBN05ELEFBNk5DLElBQUE7QUE3TlksMERBQXVCIiwiZmlsZSI6ImFwcC9jb21wb25lbnRzL2F0dGVuZGFuY2UtbGlzdC9hdHRlbmRhbmNlLWxpc3QuY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuaW1wb3J0IHsgQ291cnNlU2VydmljZSB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9jb3Vyc2Uuc2VydmljZVwiO1xyXG5pbXBvcnQgeyBDb3Vyc2UgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL2NvdXJzZVwiO1xyXG5pbXBvcnQgeyBTdHVkZW50IH0gZnJvbSBcIi4uLy4uL21vZGVscy9TdHVkZW50XCI7XHJcbmltcG9ydCB7IFN0dWRlbnRTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL3N0dWRlbnQuc2VydmljZVwiO1xyXG5pbXBvcnQgeyBTdGFmZlNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvc3RhZmYuc2VydmljZVwiO1xyXG5kZWNsYXJlIHZhciBzd2FsOiBhbnk7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiAnYXR0ZW5kYW5jZUxpc3QnLFxyXG4gICAgdGVtcGxhdGVVcmw6ICcuL2FwcC9jb21wb25lbnRzL2F0dGVuZGFuY2UtbGlzdC9hdHRlbmRhbmNlLWxpc3QuY29tcG9uZW50Lmh0bWwnLFxyXG4gICAgc3R5bGVVcmxzOiBbJy4vYXBwL2NvbXBvbmVudHMvYXR0ZW5kYW5jZS1saXN0L2F0dGVuZGFuY2UtbGlzdC5jb21wb25lbnQuY3NzJ11cclxufSlcclxuXHJcbmV4cG9ydCBjbGFzcyBBdHRlbmRhbmNlTGlzdENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgICBkYXRhOiBhbnk7XHJcbiAgICBkYXRlOiBhbnk7XHJcbiAgICBjb3Vyc2VJRDogYW55O1xyXG4gICAgYXR0ZW5kYW5jZVZpZXc6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIGxvYWRpbmc6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIGF0dGVuZGFuY2VDb3Vyc2U6IGFueTtcclxuICAgIGF0dGVuZGFuY2VTdHVkZW50czogYW55O1xyXG4gICAgdGltZXRhYmxlczogYW55O1xyXG4gICAgYXR0ZW5kYW5jZTogYW55O1xyXG4gICAgYWJzZW50U3R1ZGVudHMgPSBbXTtcclxuICAgIGF0dGVuZGFuY2VEYXRlczogYW55W10gPSBbXTtcclxuICAgIHByZXZpb3VzQXR0ZW5kYW5jZTogYW55O1xyXG4gICAgaW5zdHJ1Y3RvcnM6IGFueTtcclxuICAgIGluc3RydWN0b3JPcHRpb25zOiBhbnkgPSB7fTtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJvdXRlcjogUm91dGVyLCBwcml2YXRlIENvdXJzZVNlcnZpY2U6IENvdXJzZVNlcnZpY2UsIHByaXZhdGUgU3R1ZGVudFNlcnZpY2U6IFN0dWRlbnRTZXJ2aWNlLCBwcml2YXRlIFN0YWZmU2VydmljZTogU3RhZmZTZXJ2aWNlKSB7XHJcbiAgICAgIHRoaXMuZGF0ZSA9IG5ldyBEYXRlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgbmdPbkluaXQoKSB7XHJcbiAgICAgIHZhciBjdXJyZW50VXNlciA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2N1cnJlbnRVc2VyJykpO1xyXG4gICAgICB2YXIgdXNlcklEID0gY3VycmVudFVzZXIudXNlcklEO1xyXG4gICAgICBpZiAoY3VycmVudFVzZXIudXNlclR5cGUgIT09ICdJbnN0cnVjdG9yJykge1xyXG4gICAgICAgIHRoaXMuU3RhZmZTZXJ2aWNlXHJcbiAgICAgICAgICAgIC5nZXRVc2VycygpXHJcbiAgICAgICAgICAgIC50aGVuKGluc3RydWN0b3JzID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuaW5zdHJ1Y3RvcnMgPSBpbnN0cnVjdG9ycy5maWx0ZXIoeCA9PiB4LnVzZXJUeXBlID09PSAnSW5zdHJ1Y3RvcicpO1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaXRlbSBvZiB0aGlzLmluc3RydWN0b3JzKSB7XHJcbiAgICAgICAgICAgICAgICAgIHRoaXMuaW5zdHJ1Y3Rvck9wdGlvbnNbaXRlbS51c2VySURdID0gaXRlbS5maXJzdE5hbWUgKyBcIiBcIiArIGl0ZW0ubGFzdE5hbWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5jYXRjaChlcnJvciA9PiB7XHJcbiAgICAgICAgICAgICAgLy8gZG8gc29tZXRoaW5nXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5pbnN0cnVjdG9yT3B0aW9ucyk7XHJcblxyXG4gICAgICAgIHN3YWwoe1xyXG4gICAgICAgICAgICB0aXRsZTogJ0F0dGVuZGFuY2UnLFxyXG4gICAgICAgICAgICB0ZXh0OiAnU2VsZWN0IGFuIEluc3RydWN0b3InLFxyXG4gICAgICAgICAgICBpbnB1dDogXCJzZWxlY3RcIixcclxuICAgICAgICAgICAgaW5wdXRPcHRpb25zOiB0aGlzLmluc3RydWN0b3JPcHRpb25zLFxyXG4gICAgICAgICAgICBzaG93Q2FuY2VsQnV0dG9uOiB0cnVlLFxyXG4gICAgICAgICAgICBhbmltYXRpb246IFwic2xpZGUtZnJvbS10b3BcIixcclxuICAgICAgICAgICAgY29uZmlybUJ1dHRvbkNvbG9yOiAnIzMwODVkNicsXHJcbiAgICAgICAgICAgIGFsbG93T3V0c2lkZUNsaWNrOiBmYWxzZSxcclxuICAgICAgICAgICAgY29uZmlybUJ1dHRvblRleHQ6ICdDb250aW51ZScsXHJcbiAgICAgICAgICAgIGNhbmNlbEJ1dHRvblRleHQ6ICdCYWNrIHRvIERhc2hib2FyZCdcclxuICAgICAgICB9KS50aGVuKGlzQ29uZmlybSA9PiB7XHJcbiAgICAgICAgICBpZiAoaXNDb25maXJtLmRpc21pc3MgPT09IFwiY2FuY2VsXCIgfHwgaXNDb25maXJtLmRpc21pc3MgPT09IFwib3ZlcmxheVwiKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGlzQ29uZmlybS5kaXNtaXNzKTtcclxuICAgICAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWycvZGFzaGJvYXJkJ10pO1xyXG4gICAgICAgICAgfSBlbHNlIGlmIChpc0NvbmZpcm0pIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coaXNDb25maXJtLnZhbHVlKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KS5jYXRjaChlcnJvciA9PiB7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5nZXRDb3Vyc2VzKHVzZXJJRCk7XHJcbiAgICAgICAgdGhpcy5TdHVkZW50U2VydmljZVxyXG4gICAgICAgICAgICAuZ2V0QWxsQXR0ZW5kYW5jZSgpXHJcbiAgICAgICAgICAgIC50aGVuKGF0dGVuZGFuY2UgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKGF0dGVuZGFuY2Uuc3RhdHVzID09PSBcIjQwM1wiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wcmV2aW91c0F0dGVuZGFuY2UgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnByZXZpb3VzQXR0ZW5kYW5jZSA9IGF0dGVuZGFuY2U7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaXRlbSBvZiB0aGlzLnByZXZpb3VzQXR0ZW5kYW5jZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgaXRlbS5kYXRlID0gaXRlbS5kYXRlWzBdICsgXCIgXCIgKyBpdGVtLmRhdGVbMV07XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuY2F0Y2goZXJyb3IgPT4gY29uc29sZS5sb2coZXJyb3IpKTtcclxuICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICBnZXRDb3Vyc2VzKGluc3RydWN0b3JJRCkge1xyXG4gICAgICAgIHRoaXMuQ291cnNlU2VydmljZVxyXG4gICAgICAgICAgICAuZ2V0SW5zdHJ1Y3RvckNvdXJzZXMoaW5zdHJ1Y3RvcklEKVxyXG4gICAgICAgICAgICAudGhlbihyZXN1bHQgPT4ge1xyXG4gICAgICAgICAgICAgICAgdmFyIGlzRW1wdHkgPSAocmVzdWx0IHx8IFtdKS5sZW5ndGggPT09IDA7XHJcbiAgICAgICAgICAgICAgICBpZiAoaXNFbXB0eSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3VsdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kYXRhID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kYXRhID0gcmVzdWx0O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuY2F0Y2goZXJyb3IgPT4gY29uc29sZS5sb2coZXJyb3IpKTtcclxuICAgIH1cclxuXHJcbiAgICBkb0F0dGVuZGFuY2UoY291cnNlOiBDb3Vyc2UpIHtcclxuICAgICAgdGhpcy5sb2FkaW5nID0gdHJ1ZTtcclxuICAgICAgdGhpcy5wcmV2aW91c0F0dGVuZGFuY2UgPSB0aGlzLnByZXZpb3VzQXR0ZW5kYW5jZS5maWx0ZXIoeCA9PiB4LmNvdXJzZUlEID09PSBjb3Vyc2UuY291cnNlSUQpO1xyXG4gICAgICB0aGlzLmNvdXJzZUlEID0gY291cnNlLmNvdXJzZUlEO1xyXG4gICAgICB0aGlzLlN0dWRlbnRTZXJ2aWNlXHJcbiAgICAgICAgICAuZ2V0VGltZXRhYmxlc0J5Q291cnNlSWQoY291cnNlLmNvdXJzZUlEKVxyXG4gICAgICAgICAgLnRoZW4ocmVzdWx0ID0+IHtcclxuICAgICAgICAgICAgICB2YXIgaXNFbXB0eSA9IChyZXN1bHQgfHwgW10pLmxlbmd0aCA9PT0gMDtcclxuICAgICAgICAgICAgICBpZiAoaXNFbXB0eSkge1xyXG4gICAgICAgICAgICAgICAgICB0aGlzLnRpbWV0YWJsZXMgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICB0aGlzLmF0dGVuZGFuY2VTdHVkZW50cyA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgIHRoaXMubG9hZGluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgIHRoaXMudGltZXRhYmxlcyA9IHJlc3VsdDtcclxuICAgICAgICAgICAgICAgICAgdGhpcy5nZXRTdHVkZW50c0J5SWQodGhpcy50aW1ldGFibGVzKTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgICAgLmNhdGNoKGVycm9yID0+IGNvbnNvbGUubG9nKGVycm9yKSk7XHJcblxyXG4gICAgICB0aGlzLmF0dGVuZGFuY2VDb3Vyc2UgPSBjb3Vyc2U7XHJcbiAgICAgIHZhciBhcnJheSA9IHRoaXMuYXR0ZW5kYW5jZUNvdXJzZS5jbGFzc1RpbWVTdHIuc3BsaXQoJywnKTtcclxuICAgICAgZm9yIChsZXQgaXRlbSBvZiBhcnJheSkge1xyXG4gICAgICAgIHZhciBhdHRlbmRhbmNlSGlzdG9yeSA9IHRoaXMucHJldmlvdXNBdHRlbmRhbmNlO1xyXG4gICAgICAgIGF0dGVuZGFuY2VIaXN0b3J5ID0gYXR0ZW5kYW5jZUhpc3RvcnkuZmlsdGVyKHggPT4geC5kYXRlID09PSBpdGVtKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhhdHRlbmRhbmNlSGlzdG9yeSk7XHJcbiAgICAgICAgaWYgKGF0dGVuZGFuY2VIaXN0b3J5Lmxlbmd0aCAhPT0gMCkge1xyXG4gICAgICAgICAgY29uc29sZS5sb2coXCJBdHRlbmRhbmNlIGFscmVhZHkgdGFrZW5cIik7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHZhciBkYXRlID0gaXRlbS5zcGxpdCgnICcpO1xyXG4gICAgICAgICAgdGhpcy5hdHRlbmRhbmNlRGF0ZXMucHVzaChkYXRlKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5hdHRlbmRhbmNlVmlldyA9IHRydWU7XHJcbiAgICAgIGNvbnNvbGUubG9nKHRoaXMuYXR0ZW5kYW5jZURhdGVzKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRTdHVkZW50c0J5SWQodGltZXRhYmxlcykge1xyXG4gICAgICB0aGlzLlN0dWRlbnRTZXJ2aWNlXHJcbiAgICAgICAgICAuZ2V0U3R1ZGVudHNCeUlkKHRpbWV0YWJsZXMpXHJcbiAgICAgICAgICAudGhlbihyZXN1bHQgPT4ge1xyXG4gICAgICAgICAgICAgIHZhciBpc0VtcHR5ID0gKHJlc3VsdCB8fCBbXSkubGVuZ3RoID09PSAwO1xyXG4gICAgICAgICAgICAgIGlmIChpc0VtcHR5KSB7XHJcbiAgICAgICAgICAgICAgICAgIHRoaXMuYXR0ZW5kYW5jZVN0dWRlbnRzID0gbnVsbDtcclxuICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICB0aGlzLmF0dGVuZGFuY2VTdHVkZW50cyA9IHJlc3VsdDtcclxuICAgICAgICAgICAgICAgICAgZm9yIChsZXQgc3R1ZGVudCBvZiB0aGlzLmF0dGVuZGFuY2VTdHVkZW50cykge1xyXG4gICAgICAgICAgICAgICAgICAgIHN0dWRlbnQuZnVsbE5hbWUgPSBzdHVkZW50LmZpcnN0TmFtZSArIFwiIFwiICsgc3R1ZGVudC5sYXN0TmFtZTtcclxuICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgICAgLmNhdGNoKGVycm9yID0+IGNvbnNvbGUubG9nKGVycm9yKSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gbWFya0Fic2VudChzdHVkZW50OiBTdHVkZW50KSB7XHJcbiAgICAvLyAgIGlmIChzdHVkZW50LmFic2VudCkge1xyXG4gICAgLy8gICAgIHN0dWRlbnQuYWJzZW50ID0gZmFsc2U7XHJcbiAgICAvLyAgICAgdmFyIGluZGV4ID0gdGhpcy5hYnNlbnRTdHVkZW50cy5pbmRleE9mKHN0dWRlbnQuc3R1ZGVudElEKTtcclxuICAgIC8vICAgICB0aGlzLmFic2VudFN0dWRlbnRzLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICAvLyAgIH0gZWxzZSB7XHJcbiAgICAvLyAgICAgc3R1ZGVudC5hYnNlbnQgPSB0cnVlO1xyXG4gICAgLy8gICAgIHRoaXMuYWJzZW50U3R1ZGVudHMucHVzaChzdHVkZW50LnN0dWRlbnRJRCk7XHJcbiAgICAvLyAgIH1cclxuICAgIC8vICAgY29uc29sZS5sb2codGhpcy5hYnNlbnRTdHVkZW50cyk7XHJcbiAgICAvLyB9XHJcblxyXG4gICAgc3VibWl0QXR0ZW5kYW5jZSgpIHtcclxuICAgICAgdmFyIGNvdW50ID0gMDtcclxuICAgICAgZm9yIChsZXQgc3R1ZGVudCBvZiB0aGlzLmF0dGVuZGFuY2VTdHVkZW50cykge1xyXG4gICAgICAgIGlmIChzdHVkZW50LmF0dGVuZGFuY2VWYWx1ZSkge1xyXG4gICAgICAgICAgY291bnQrKztcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmICghdGhpcy5hdHRlbmRhbmNlQ291cnNlLmF0dGVuZGFuY2VEYXRlKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5hdHRlbmRhbmNlQ291cnNlKTtcclxuICAgICAgICBzd2FsKFxyXG4gICAgICAgICAgICAnQXR0ZW5kYW5jZSBJbmNvbXBsZXRlJyxcclxuICAgICAgICAgICAgJ1BsZWFzZSBlbnRlciBhbiBhdHRlbmRhbmNlIGRhdGUnLFxyXG4gICAgICAgICAgICAnd2FybmluZydcclxuICAgICAgICApO1xyXG4gICAgICB9IGVsc2UgaWYgKGNvdW50ID09PSB0aGlzLmF0dGVuZGFuY2VTdHVkZW50cy5sZW5ndGggJiYgdGhpcy5hdHRlbmRhbmNlQ291cnNlLmF0dGVuZGFuY2VEYXRlKSB7XHJcbiAgICAgICAgc3dhbCh7XHJcbiAgICAgICAgICAgIHRpdGxlOiAnU3VibWl0IEF0dGVuZGFuY2U/JyxcclxuICAgICAgICAgICAgdGV4dDogXCJZb3Ugd29uJ3QgYmUgYWJsZSB0byByZXZlcnQgdGhpcyFcIixcclxuICAgICAgICAgICAgdHlwZTogJ2luZm8nLFxyXG4gICAgICAgICAgICBzaG93Q2FuY2VsQnV0dG9uOiB0cnVlLFxyXG4gICAgICAgICAgICBjb25maXJtQnV0dG9uQ29sb3I6ICcjMzA4NWQ2JyxcclxuICAgICAgICAgICAgY2FuY2VsQnV0dG9uQ29sb3I6ICcjZDMzJyxcclxuICAgICAgICAgICAgY29uZmlybUJ1dHRvblRleHQ6ICdZZXMsIHN1Ym1pdCEnXHJcbiAgICAgICAgfSkudGhlbihpc0NvbmZpcm0gPT4ge1xyXG4gICAgICAgICAgaWYgKGlzQ29uZmlybS5kaXNtaXNzID09PSBcImNhbmNlbFwiIHx8IGlzQ29uZmlybS5kaXNtaXNzID09PSBcIm92ZXJsYXlcIikge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhpc0NvbmZpcm0uZGlzbWlzcyk7XHJcbiAgICAgICAgICB9IGVsc2UgaWYgKGlzQ29uZmlybSkge1xyXG4gICAgICAgICAgICB0aGlzLmF0dGVuZGFuY2UgPSB7XHJcbiAgICAgICAgICAgICAgc3R1ZGVudHM6IHRoaXMuYXR0ZW5kYW5jZVN0dWRlbnRzLFxyXG4gICAgICAgICAgICAgIGNvdXJzZUlEOiB0aGlzLmNvdXJzZUlELFxyXG4gICAgICAgICAgICAgIGRhdGU6IHRoaXMuYXR0ZW5kYW5jZUNvdXJzZS5hdHRlbmRhbmNlRGF0ZVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB0aGlzLlN0dWRlbnRTZXJ2aWNlXHJcbiAgICAgICAgICAgICAgICAuaW5zZXJ0QXR0ZW5kYW5jZSh0aGlzLmF0dGVuZGFuY2UpXHJcbiAgICAgICAgICAgICAgICAudGhlbihyZXN1bHQgPT4ge1xyXG4gICAgICAgICAgICAgICAgICBzd2FsKFxyXG4gICAgICAgICAgICAgICAgICAgICAgJ0F0dGVuZGFuY2Ugc3VibWl0dGVkIScsXHJcbiAgICAgICAgICAgICAgICAgICAgICAnJyxcclxuICAgICAgICAgICAgICAgICAgICAgICdzdWNjZXNzJ1xyXG4gICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgICB0aGlzLmF0dGVuZGFuY2VWaWV3ID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFsnL2F0dGVuZGFuY2UtcmVwb3J0J10pO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5jYXRjaChlcnJvciA9PiBjb25zb2xlLmxvZyhlcnJvcikpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pLmNhdGNoKGVycm9yID0+IHtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcclxuICAgICAgICB9KTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBzd2FsKFxyXG4gICAgICAgICAgICAnQXR0ZW5kYW5jZSBJbmNvbXBsZXRlJyxcclxuICAgICAgICAgICAgJ1BsZWFzZSBlbnRlciBhdHRlbmRhbmNlIGZvciBhbGwgc3R1ZGVudHMnLFxyXG4gICAgICAgICAgICAnd2FybmluZydcclxuICAgICAgICApO1xyXG4gICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGdvQmFjaygpIHtcclxuICAgICAgICB3aW5kb3cuaGlzdG9yeS5iYWNrKCk7XHJcbiAgICB9XHJcbn1cclxuIl19
