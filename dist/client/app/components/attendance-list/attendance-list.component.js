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
var AttendanceListComponent = (function () {
    function AttendanceListComponent(router, CourseService, StudentService) {
        this.router = router;
        this.CourseService = CourseService;
        this.StudentService = StudentService;
        this.attendanceView = false;
        this.loading = false;
        this.absentStudents = [];
        this.attendanceDates = [];
        this.date = new Date();
    }
    AttendanceListComponent.prototype.ngOnInit = function () {
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        var userID = currentUser.userID;
        this.getCourses(userID);
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
        for (var _i = 0, array_1 = array; _i < array_1.length; _i++) {
            var item = array_1[_i];
            var date = item.split(' ');
            var day = date[0];
            var time = date[1];
            var startTime = time.split('-')[0];
            var endTime = time.split('-')[1];
            this.attendanceDates.push(date);
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
                if (isConfirm) {
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
                    })
                        .catch(function (error) { return console.log(error); });
                }
            }).catch(function (error) {
                //console.log("Canceled");
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
        __metadata("design:paramtypes", [router_1.Router, course_service_1.CourseService, student_service_1.StudentService])
    ], AttendanceListComponent);
    return AttendanceListComponent;
}());
exports.AttendanceListComponent = AttendanceListComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NsaWVudC9hcHAvY29tcG9uZW50cy9hdHRlbmRhbmNlLWxpc3QvYXR0ZW5kYW5jZS1saXN0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLHNDQUFrRDtBQUNsRCwwQ0FBeUM7QUFDekMsZ0VBQThEO0FBRzlELGtFQUFnRTtBQVNoRTtJQWFJLGlDQUFvQixNQUFjLEVBQVUsYUFBNEIsRUFBVSxjQUE4QjtRQUE1RixXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQVUsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFBVSxtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFUaEgsbUJBQWMsR0FBWSxLQUFLLENBQUM7UUFDaEMsWUFBTyxHQUFZLEtBQUssQ0FBQztRQUt6QixtQkFBYyxHQUFHLEVBQUUsQ0FBQztRQUNwQixvQkFBZSxHQUFVLEVBQUUsQ0FBQztRQUcxQixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksSUFBSSxFQUFFLENBQUM7SUFDekIsQ0FBQztJQUVELDBDQUFRLEdBQVI7UUFDRSxJQUFJLFdBQVcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztRQUNsRSxJQUFJLE1BQU0sR0FBRyxXQUFXLENBQUMsTUFBTSxDQUFDO1FBQ2hDLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDMUIsQ0FBQztJQUVELDRDQUFVLEdBQVYsVUFBVyxZQUFZO1FBQXZCLGlCQWFDO1FBWkcsSUFBSSxDQUFDLGFBQWE7YUFDYixvQkFBb0IsQ0FBQyxZQUFZLENBQUM7YUFDbEMsSUFBSSxDQUFDLFVBQUEsTUFBTTtZQUNSLElBQUksT0FBTyxHQUFHLENBQUMsTUFBTSxJQUFJLEVBQUUsQ0FBQyxDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUM7WUFDMUMsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztnQkFDVixPQUFPLENB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QzFDLENBQUM7WUFDSCxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsVUFBQSxLQUFLO2dCQUNaLDBCQUEwQjtZQUM1QixDQUFDLENBQUMsQ0FBQztRQUNMLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNOLElBQUksQ0FDQSx1QkFBdUIsRUFDdkIsMENBQTBDLEVBQzFDLFNBQVMsQ0FDWixDQUFDO1FBQ0osQ0FBQztJQUVILENBQUM7SUFFRCx3Q0FBTSxHQUFOO1FBQ0ksTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUMxQixDQUFDO0lBOUpRLHVCQUF1QjtRQU5uQyxnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLGdCQUFnQjtZQUMxQixXQUFXLEVBQUUsaUVBQWlFO1lBQzlFLFNBQVMsRUFBRSxDQUFDLGdFQUFnRSxDQUFDO1NBQ2hGLENBQUM7eUNBZThCLGVBQU0sRUFBeUIsOEJBQWEsRUFBMEIsZ0NBQWM7T0FidkcsdUJBQXVCLENBK0puQztJQUFELDhCQUFDO0NBL0pELEFBK0pDLElBQUE7QUEvSlksMERBQXVCIiwiZmlsZSI6ImFwcC9jb21wb25lbnRzL2F0dGVuZGFuY2UtbGlzdC9hdHRlbmRhbmNlLWxpc3QuY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuaW1wb3J0IHsgQ291cnNlU2VydmljZSB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9jb3Vyc2Uuc2VydmljZVwiO1xyXG5pbXBvcnQgeyBDb3Vyc2UgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL2NvdXJzZVwiO1xyXG5pbXBvcnQgeyBTdHVkZW50IH0gZnJvbSBcIi4uLy4uL21vZGVscy9TdHVkZW50XCI7XHJcbmltcG9ydCB7IFN0dWRlbnRTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL3N0dWRlbnQuc2VydmljZVwiO1xyXG5kZWNsYXJlIHZhciBzd2FsOiBhbnk7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiAnYXR0ZW5kYW5jZUxpc3QnLFxyXG4gICAgdGVtcGxhdGVVcmw6ICcuL2FwcC9jb21wb25lbnRzL2F0dGVuZGFuY2UtbGlzdC9hdHRlbmRhbmNlLWxpc3QuY29tcG9uZW50Lmh0bWwnLFxyXG4gICAgc3R5bGVVcmxzOiBbJy4vYXBwL2NvbXBvbmVudHMvYXR0ZW5kYW5jZS1saXN0L2F0dGVuZGFuY2UtbGlzdC5jb21wb25lbnQuY3NzJ11cclxufSlcclxuXHJcbmV4cG9ydCBjbGFzcyBBdHRlbmRhbmNlTGlzdENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgICBkYXRhOiBhbnk7XHJcbiAgICBkYXRlOiBhbnk7XHJcbiAgICBjb3Vyc2VJRDogYW55O1xyXG4gICAgYXR0ZW5kYW5jZVZpZXc6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIGxvYWRpbmc6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIGF0dGVuZGFuY2VDb3Vyc2U6IGFueTtcclxuICAgIGF0dGVuZGFuY2VTdHVkZW50czogYW55O1xyXG4gICAgdGltZXRhYmxlczogYW55O1xyXG4gICAgYXR0ZW5kYW5jZTogYW55O1xyXG4gICAgYWJzZW50U3R1ZGVudHMgPSBbXTtcclxuICAgIGF0dGVuZGFuY2VEYXRlczogYW55W10gPSBbXTtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJvdXRlcjogUm91dGVyLCBwcml2YXRlIENvdXJzZVNlcnZpY2U6IENvdXJzZVNlcnZpY2UsIHByaXZhdGUgU3R1ZGVudFNlcnZpY2U6IFN0dWRlbnRTZXJ2aWNlKSB7XHJcbiAgICAgIHRoaXMuZGF0ZSA9IG5ldyBEYXRlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgbmdPbkluaXQoKSB7XHJcbiAgICAgIHZhciBjdXJyZW50VXNlciA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2N1cnJlbnRVc2VyJykpO1xyXG4gICAgICB2YXIgdXNlcklEID0gY3VycmVudFVzZXIudXNlcklEO1xyXG4gICAgICB0aGlzLmdldENvdXJzZXModXNlcklEKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRDb3Vyc2VzKGluc3RydWN0b3JJRCkge1xyXG4gICAgICAgIHRoaXMuQ291cnNlU2VydmljZVxyXG4gICAgICAgICAgICAuZ2V0SW5zdHJ1Y3RvckNvdXJzZXMoaW5zdHJ1Y3RvcklEKVxyXG4gICAgICAgICAgICAudGhlbihyZXN1bHQgPT4ge1xyXG4gICAgICAgICAgICAgICAgdmFyIGlzRW1wdHkgPSAocmVzdWx0IHx8IFtdKS5sZW5ndGggPT09IDA7XHJcbiAgICAgICAgICAgICAgICBpZiAoaXNFbXB0eSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3VsdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kYXRhID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kYXRhID0gcmVzdWx0O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuY2F0Y2goZXJyb3IgPT4gY29uc29sZS5sb2coZXJyb3IpKTtcclxuICAgIH1cclxuXHJcbiAgICBkb0F0dGVuZGFuY2UoY291cnNlOiBDb3Vyc2UpIHtcclxuICAgICAgdGhpcy5sb2FkaW5nID0gdHJ1ZTtcclxuICAgICAgdGhpcy5jb3Vyc2VJRCA9IGNvdXJzZS5jb3Vyc2VJRDtcclxuICAgICAgdGhpcy5TdHVkZW50U2VydmljZVxyXG4gICAgICAgICAgLmdldFRpbWV0YWJsZXNCeUNvdXJzZUlkKGNvdXJzZS5jb3Vyc2VJRClcclxuICAgICAgICAgIC50aGVuKHJlc3VsdCA9PiB7XHJcbiAgICAgICAgICAgICAgdmFyIGlzRW1wdHkgPSAocmVzdWx0IHx8IFtdKS5sZW5ndGggPT09IDA7XHJcbiAgICAgICAgICAgICAgaWYgKGlzRW1wdHkpIHtcclxuICAgICAgICAgICAgICAgICAgdGhpcy50aW1ldGFibGVzID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgdGhpcy5hdHRlbmRhbmNlU3R1ZGVudHMgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICB0aGlzLnRpbWV0YWJsZXMgPSByZXN1bHQ7XHJcbiAgICAgICAgICAgICAgICAgIHRoaXMuZ2V0U3R1ZGVudHNCeUlkKHRoaXMudGltZXRhYmxlcyk7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSlcclxuICAgICAgICAgIC5jYXRjaChlcnJvciA9PiBjb25zb2xlLmxvZyhlcnJvcikpO1xyXG5cclxuICAgICAgdGhpcy5hdHRlbmRhbmNlQ291cnNlID0gY291cnNlO1xyXG4gICAgICB2YXIgYXJyYXkgPSB0aGlzLmF0dGVuZGFuY2VDb3Vyc2UuY2xhc3NUaW1lU3RyLnNwbGl0KCcsJyk7XHJcbiAgICAgIGZvciAobGV0IGl0ZW0gb2YgYXJyYXkpIHtcclxuICAgICAgICB2YXIgZGF0ZSA9IGl0ZW0uc3BsaXQoJyAnKTtcclxuICAgICAgICB2YXIgZGF5ID0gZGF0ZVswXTtcclxuICAgICAgICB2YXIgdGltZSA9IGRhdGVbMV07XHJcbiAgICAgICAgdmFyIHN0YXJ0VGltZSA9IHRpbWUuc3BsaXQoJy0nKVswXTtcclxuICAgICAgICB2YXIgZW5kVGltZSA9IHRpbWUuc3BsaXQoJy0nKVsxXTtcclxuICAgICAgICB0aGlzLmF0dGVuZGFuY2VEYXRlcy5wdXNoKGRhdGUpO1xyXG4gICAgICB9XHJcbiAgICAgIHRoaXMuYXR0ZW5kYW5jZVZpZXcgPSB0cnVlO1xyXG4gICAgICBjb25zb2xlLmxvZyh0aGlzLmF0dGVuZGFuY2VEYXRlcyk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0U3R1ZGVudHNCeUlkKHRpbWV0YWJsZXMpIHtcclxuICAgICAgdGhpcy5TdHVkZW50U2VydmljZVxyXG4gICAgICAgICAgLmdldFN0dWRlbnRzQnlJZCh0aW1ldGFibGVzKVxyXG4gICAgICAgICAgLnRoZW4ocmVzdWx0ID0+IHtcclxuICAgICAgICAgICAgICB2YXIgaXNFbXB0eSA9IChyZXN1bHQgfHwgW10pLmxlbmd0aCA9PT0gMDtcclxuICAgICAgICAgICAgICBpZiAoaXNFbXB0eSkge1xyXG4gICAgICAgICAgICAgICAgICB0aGlzLmF0dGVuZGFuY2VTdHVkZW50cyA9IG51bGw7XHJcbiAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgdGhpcy5hdHRlbmRhbmNlU3R1ZGVudHMgPSByZXN1bHQ7XHJcbiAgICAgICAgICAgICAgICAgIGZvciAobGV0IHN0dWRlbnQgb2YgdGhpcy5hdHRlbmRhbmNlU3R1ZGVudHMpIHtcclxuICAgICAgICAgICAgICAgICAgICBzdHVkZW50LmZ1bGxOYW1lID0gc3R1ZGVudC5maXJzdE5hbWUgKyBcIiBcIiArIHN0dWRlbnQubGFzdE5hbWU7XHJcbiAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgdGhpcy5sb2FkaW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSlcclxuICAgICAgICAgIC5jYXRjaChlcnJvciA9PiBjb25zb2xlLmxvZyhlcnJvcikpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIG1hcmtBYnNlbnQoc3R1ZGVudDogU3R1ZGVudCkge1xyXG4gICAgLy8gICBpZiAoc3R1ZGVudC5hYnNlbnQpIHtcclxuICAgIC8vICAgICBzdHVkZW50LmFic2VudCA9IGZhbHNlO1xyXG4gICAgLy8gICAgIHZhciBpbmRleCA9IHRoaXMuYWJzZW50U3R1ZGVudHMuaW5kZXhPZihzdHVkZW50LnN0dWRlbnRJRCk7XHJcbiAgICAvLyAgICAgdGhpcy5hYnNlbnRTdHVkZW50cy5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgLy8gICB9IGVsc2Uge1xyXG4gICAgLy8gICAgIHN0dWRlbnQuYWJzZW50ID0gdHJ1ZTtcclxuICAgIC8vICAgICB0aGlzLmFic2VudFN0dWRlbnRzLnB1c2goc3R1ZGVudC5zdHVkZW50SUQpO1xyXG4gICAgLy8gICB9XHJcbiAgICAvLyAgIGNvbnNvbGUubG9nKHRoaXMuYWJzZW50U3R1ZGVudHMpO1xyXG4gICAgLy8gfVxyXG5cclxuICAgIHN1Ym1pdEF0dGVuZGFuY2UoKSB7XHJcbiAgICAgIHZhciBjb3VudCA9IDA7XHJcbiAgICAgIGZvciAobGV0IHN0dWRlbnQgb2YgdGhpcy5hdHRlbmRhbmNlU3R1ZGVudHMpIHtcclxuICAgICAgICBpZiAoc3R1ZGVudC5hdHRlbmRhbmNlVmFsdWUpIHtcclxuICAgICAgICAgIGNvdW50Kys7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoIXRoaXMuYXR0ZW5kYW5jZUNvdXJzZS5hdHRlbmRhbmNlRGF0ZSkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuYXR0ZW5kYW5jZUNvdXJzZSk7XHJcbiAgICAgICAgc3dhbChcclxuICAgICAgICAgICAgJ0F0dGVuZGFuY2UgSW5jb21wbGV0ZScsXHJcbiAgICAgICAgICAgICdQbGVhc2UgZW50ZXIgYW4gYXR0ZW5kYW5jZSBkYXRlJyxcclxuICAgICAgICAgICAgJ3dhcm5pbmcnXHJcbiAgICAgICAgKTtcclxuICAgICAgfSBlbHNlIGlmIChjb3VudCA9PT0gdGhpcy5hdHRlbmRhbmNlU3R1ZGVudHMubGVuZ3RoICYmIHRoaXMuYXR0ZW5kYW5jZUNvdXJzZS5hdHRlbmRhbmNlRGF0ZSkge1xyXG4gICAgICAgIHN3YWwoe1xyXG4gICAgICAgICAgICB0aXRsZTogJ1N1Ym1pdCBBdHRlbmRhbmNlPycsXHJcbiAgICAgICAgICAgIHRleHQ6IFwiWW91IHdvbid0IGJlIGFibGUgdG8gcmV2ZXJ0IHRoaXMhXCIsXHJcbiAgICAgICAgICAgIHR5cGU6ICdpbmZvJyxcclxuICAgICAgICAgICAgc2hvd0NhbmNlbEJ1dHRvbjogdHJ1ZSxcclxuICAgICAgICAgICAgY29uZmlybUJ1dHRvbkNvbG9yOiAnIzMwODVkNicsXHJcbiAgICAgICAgICAgIGNhbmNlbEJ1dHRvbkNvbG9yOiAnI2QzMycsXHJcbiAgICAgICAgICAgIGNvbmZpcm1CdXR0b25UZXh0OiAnWWVzLCBzdWJtaXQhJ1xyXG4gICAgICAgIH0pLnRoZW4oaXNDb25maXJtID0+IHtcclxuICAgICAgICAgIGlmIChpc0NvbmZpcm0pIHtcclxuICAgICAgICAgICAgdGhpcy5hdHRlbmRhbmNlID0ge1xyXG4gICAgICAgICAgICAgIHN0dWRlbnRzOiB0aGlzLmF0dGVuZGFuY2VTdHVkZW50cyxcclxuICAgICAgICAgICAgICBjb3Vyc2VJRDogdGhpcy5jb3Vyc2VJRCxcclxuICAgICAgICAgICAgICBkYXRlOiB0aGlzLmF0dGVuZGFuY2VDb3Vyc2UuYXR0ZW5kYW5jZURhdGVcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgdGhpcy5TdHVkZW50U2VydmljZVxyXG4gICAgICAgICAgICAgICAgLmluc2VydEF0dGVuZGFuY2UodGhpcy5hdHRlbmRhbmNlKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4ocmVzdWx0ID0+IHtcclxuICAgICAgICAgICAgICAgICAgc3dhbChcclxuICAgICAgICAgICAgICAgICAgICAgICdBdHRlbmRhbmNlIHN1Ym1pdHRlZCEnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgJycsXHJcbiAgICAgICAgICAgICAgICAgICAgICAnc3VjY2VzcydcclxuICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgICAgdGhpcy5hdHRlbmRhbmNlVmlldyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5jYXRjaChlcnJvciA9PiBjb25zb2xlLmxvZyhlcnJvcikpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pLmNhdGNoKGVycm9yID0+IHtcclxuICAgICAgICAgIC8vY29uc29sZS5sb2coXCJDYW5jZWxlZFwiKTtcclxuICAgICAgICB9KTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBzd2FsKFxyXG4gICAgICAgICAgICAnQXR0ZW5kYW5jZSBJbmNvbXBsZXRlJyxcclxuICAgICAgICAgICAgJ1BsZWFzZSBlbnRlciBhdHRlbmRhbmNlIGZvciBhbGwgc3R1ZGVudHMnLFxyXG4gICAgICAgICAgICAnd2FybmluZydcclxuICAgICAgICApO1xyXG4gICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGdvQmFjaygpIHtcclxuICAgICAgICB3aW5kb3cuaGlzdG9yeS5iYWNrKCk7XHJcbiAgICB9XHJcbn1cclxuIl19
