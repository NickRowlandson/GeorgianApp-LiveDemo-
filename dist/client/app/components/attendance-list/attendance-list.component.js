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
        this.attendanceCourse = course.courseName;
        this.attendanceView = true;
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
                _this.loading = false;
            }
        })
            .catch(function (error) { return console.log(error); });
    };
    AttendanceListComponent.prototype.markAbsent = function (student) {
        if (student.absent) {
            student.absent = false;
            var index = this.absentStudents.indexOf(student.studentID);
            this.absentStudents.splice(index, 1);
        }
        else {
            student.absent = true;
            this.absentStudents.push(student.studentID);
        }
        console.log(this.absentStudents);
    };
    AttendanceListComponent.prototype.submitAttendance = function () {
        var _this = this;
        swal({
            title: 'Submit Attendance?',
            text: "You won't be able to revert this!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, submit!'
        }).then(function (isConfirm) {
            if (isConfirm) {
                _this.attendance = {
                    studentsAbsent: _this.absentStudents,
                    courseID: _this.courseID,
                    date: _this.date
                };
                console.log(_this.attendance);
                _this.StudentService
                    .insertAttendance(_this.attendance)
                    .then(function (result) {
                    swal('Attendance submitted!', '', 'success');
                })
                    .catch(function (error) { return console.log(error); });
            }
        }).catch(function (error) {
            //console.log("Canceled");
        });
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NsaWVudC9hcHAvY29tcG9uZW50cy9hdHRlbmRhbmNlLWxpc3QvYXR0ZW5kYW5jZS1saXN0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLHNDQUFrRDtBQUNsRCwwQ0FBeUM7QUFDekMsZ0VBQThEO0FBRzlELGtFQUFnRTtBQVNoRTtJQVlJLGlDQUFvQixNQUFjLEVBQVUsYUFBNEIsRUFBVSxjQUE4QjtRQUE1RixXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQVUsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFBVSxtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFSaEgsbUJBQWMsR0FBWSxLQUFLLENBQUM7UUFDaEMsWUFBTyxHQUFZLEtBQUssQ0FBQztRQUt6QixtQkFBYyxHQUFHLEVBQUUsQ0FBQztRQUdsQixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksSUFBSSxFQUFFLENBQUM7SUFDekIsQ0FBQztJQUVELDBDQUFRLEdBQVI7UUFDRSxJQUFJLFdBQVcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztRQUNsRSxJQUFJLE1BQU0sR0FBRyxXQUFXLENBQUMsTUFBTSxDQUFDO1FBQ2hDLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDMUIsQ0FBQztJQUVELDRDQUFVLEdBQVYsVUFBVyxZQUFZO1FBQXZCLGlCQWFDO1FBWkcsSUFBSSxDQUFDLGFBQWE7YUFDYixvQkFBb0IsQ0FBQyxZQUFZLENBQUM7YUFDbEMsSUFBSSxDQUFDLFVBQUEsTUFBTTtZQUNSLElBQUksT0FBTyxHQUFHLENBQUMsTUFBTSxJQUFJLEVBQUUsQ0FBQyxDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUM7WUFDMUMsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztnQkFDVixPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFD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LENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELHdDQUFNLEdBQU47UUFDSSxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDO0lBQzFCLENBQUM7SUF6SFEsdUJBQXVCO1FBTm5DLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsZ0JBQWdCO1lBQzFCLFdBQVcsRUFBRSxpRUFBaUU7WUFDOUUsU0FBUyxFQUFFLENBQUMsZ0VBQWdFLENBQUM7U0FDaEYsQ0FBQzt5Q0FjOEIsZUFBTSxFQUF5Qiw4QkFBYSxFQUEwQixnQ0FBYztPQVp2Ryx1QkFBdUIsQ0EwSG5DO0lBQUQsOEJBQUM7Q0ExSEQsQUEwSEMsSUFBQTtBQTFIWSwwREFBdUIiLCJmaWxlIjoiYXBwL2NvbXBvbmVudHMvYXR0ZW5kYW5jZS1saXN0L2F0dGVuZGFuY2UtbGlzdC5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBSb3V0ZXIgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xyXG5pbXBvcnQgeyBDb3Vyc2VTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL2NvdXJzZS5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IENvdXJzZSB9IGZyb20gXCIuLi8uLi9tb2RlbHMvY291cnNlXCI7XHJcbmltcG9ydCB7IFN0dWRlbnQgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL1N0dWRlbnRcIjtcclxuaW1wb3J0IHsgU3R1ZGVudFNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvc3R1ZGVudC5zZXJ2aWNlXCI7XHJcbmRlY2xhcmUgdmFyIHN3YWw6IGFueTtcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6ICdhdHRlbmRhbmNlTGlzdCcsXHJcbiAgICB0ZW1wbGF0ZVVybDogJy4vYXBwL2NvbXBvbmVudHMvYXR0ZW5kYW5jZS1saXN0L2F0dGVuZGFuY2UtbGlzdC5jb21wb25lbnQuaHRtbCcsXHJcbiAgICBzdHlsZVVybHM6IFsnLi9hcHAvY29tcG9uZW50cy9hdHRlbmRhbmNlLWxpc3QvYXR0ZW5kYW5jZS1saXN0LmNvbXBvbmVudC5jc3MnXVxyXG59KVxyXG5cclxuZXhwb3J0IGNsYXNzIEF0dGVuZGFuY2VMaXN0Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuICAgIGRhdGE6IGFueTtcclxuICAgIGRhdGU6IGFueTtcclxuICAgIGNvdXJzZUlEOiBhbnk7XHJcbiAgICBhdHRlbmRhbmNlVmlldzogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgbG9hZGluZzogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgYXR0ZW5kYW5jZUNvdXJzZTogYW55O1xyXG4gICAgYXR0ZW5kYW5jZVN0dWRlbnRzOiBhbnk7XHJcbiAgICB0aW1ldGFibGVzOiBhbnk7XHJcbiAgICBhdHRlbmRhbmNlOiBhbnk7XHJcbiAgICBhYnNlbnRTdHVkZW50cyA9IFtdO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsIHByaXZhdGUgQ291cnNlU2VydmljZTogQ291cnNlU2VydmljZSwgcHJpdmF0ZSBTdHVkZW50U2VydmljZTogU3R1ZGVudFNlcnZpY2UpIHtcclxuICAgICAgdGhpcy5kYXRlID0gbmV3IERhdGUoKTtcclxuICAgIH1cclxuXHJcbiAgICBuZ09uSW5pdCgpIHtcclxuICAgICAgdmFyIGN1cnJlbnRVc2VyID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnY3VycmVudFVzZXInKSk7XHJcbiAgICAgIHZhciB1c2VySUQgPSBjdXJyZW50VXNlci51c2VySUQ7XHJcbiAgICAgIHRoaXMuZ2V0Q291cnNlcyh1c2VySUQpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldENvdXJzZXMoaW5zdHJ1Y3RvcklEKSB7XHJcbiAgICAgICAgdGhpcy5Db3Vyc2VTZXJ2aWNlXHJcbiAgICAgICAgICAgIC5nZXRJbnN0cnVjdG9yQ291cnNlcyhpbnN0cnVjdG9ySUQpXHJcbiAgICAgICAgICAgIC50aGVuKHJlc3VsdCA9PiB7XHJcbiAgICAgICAgICAgICAgICB2YXIgaXNFbXB0eSA9IChyZXN1bHQgfHwgW10pLmxlbmd0aCA9PT0gMDtcclxuICAgICAgICAgICAgICAgIGlmIChpc0VtcHR5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzdWx0KTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRhdGEgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRhdGEgPSByZXN1bHQ7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5jYXRjaChlcnJvciA9PiBjb25zb2xlLmxvZyhlcnJvcikpO1xyXG4gICAgfVxyXG5cclxuICAgIGRvQXR0ZW5kYW5jZShjb3Vyc2U6IENvdXJzZSkge1xyXG4gICAgICB0aGlzLmxvYWRpbmcgPSB0cnVlO1xyXG4gICAgICB0aGlzLmNvdXJzZUlEID0gY291cnNlLmNvdXJzZUlEO1xyXG4gICAgICB0aGlzLlN0dWRlbnRTZXJ2aWNlXHJcbiAgICAgICAgICAuZ2V0VGltZXRhYmxlc0J5Q291cnNlSWQoY291cnNlLmNvdXJzZUlEKVxyXG4gICAgICAgICAgLnRoZW4ocmVzdWx0ID0+IHtcclxuICAgICAgICAgICAgICB2YXIgaXNFbXB0eSA9IChyZXN1bHQgfHwgW10pLmxlbmd0aCA9PT0gMDtcclxuICAgICAgICAgICAgICBpZiAoaXNFbXB0eSkge1xyXG4gICAgICAgICAgICAgICAgICB0aGlzLnRpbWV0YWJsZXMgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICB0aGlzLmF0dGVuZGFuY2VTdHVkZW50cyA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgIHRoaXMubG9hZGluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgIHRoaXMudGltZXRhYmxlcyA9IHJlc3VsdDtcclxuICAgICAgICAgICAgICAgICAgdGhpcy5nZXRTdHVkZW50c0J5SWQodGhpcy50aW1ldGFibGVzKTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgICAgLmNhdGNoKGVycm9yID0+IGNvbnNvbGUubG9nKGVycm9yKSk7XHJcblxyXG4gICAgICB0aGlzLmF0dGVuZGFuY2VDb3Vyc2UgPSBjb3Vyc2UuY291cnNlTmFtZTtcclxuICAgICAgdGhpcy5hdHRlbmRhbmNlVmlldyA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0U3R1ZGVudHNCeUlkKHRpbWV0YWJsZXMpIHtcclxuICAgICAgdGhpcy5TdHVkZW50U2VydmljZVxyXG4gICAgICAgICAgLmdldFN0dWRlbnRzQnlJZCh0aW1ldGFibGVzKVxyXG4gICAgICAgICAgLnRoZW4ocmVzdWx0ID0+IHtcclxuICAgICAgICAgICAgICB2YXIgaXNFbXB0eSA9IChyZXN1bHQgfHwgW10pLmxlbmd0aCA9PT0gMDtcclxuICAgICAgICAgICAgICBpZiAoaXNFbXB0eSkge1xyXG4gICAgICAgICAgICAgICAgICB0aGlzLmF0dGVuZGFuY2VTdHVkZW50cyA9IG51bGw7XHJcbiAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgdGhpcy5hdHRlbmRhbmNlU3R1ZGVudHMgPSByZXN1bHQ7XHJcbiAgICAgICAgICAgICAgICAgIHRoaXMubG9hZGluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgICAuY2F0Y2goZXJyb3IgPT4gY29uc29sZS5sb2coZXJyb3IpKTtcclxuICAgIH1cclxuXHJcbiAgICBtYXJrQWJzZW50KHN0dWRlbnQ6IFN0dWRlbnQpIHtcclxuICAgICAgaWYgKHN0dWRlbnQuYWJzZW50KSB7XHJcbiAgICAgICAgc3R1ZGVudC5hYnNlbnQgPSBmYWxzZTtcclxuICAgICAgICB2YXIgaW5kZXggPSB0aGlzLmFic2VudFN0dWRlbnRzLmluZGV4T2Yoc3R1ZGVudC5zdHVkZW50SUQpO1xyXG4gICAgICAgIHRoaXMuYWJzZW50U3R1ZGVudHMuc3BsaWNlKGluZGV4LCAxKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBzdHVkZW50LmFic2VudCA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5hYnNlbnRTdHVkZW50cy5wdXNoKHN0dWRlbnQuc3R1ZGVudElEKTtcclxuICAgICAgfVxyXG4gICAgICBjb25zb2xlLmxvZyh0aGlzLmFic2VudFN0dWRlbnRzKTtcclxuICAgIH1cclxuXHJcbiAgICBzdWJtaXRBdHRlbmRhbmNlKCkge1xyXG4gICAgICBzd2FsKHtcclxuICAgICAgICAgIHRpdGxlOiAnU3VibWl0IEF0dGVuZGFuY2U/JyxcclxuICAgICAgICAgIHRleHQ6IFwiWW91IHdvbid0IGJlIGFibGUgdG8gcmV2ZXJ0IHRoaXMhXCIsXHJcbiAgICAgICAgICB0eXBlOiAnd2FybmluZycsXHJcbiAgICAgICAgICBzaG93Q2FuY2VsQnV0dG9uOiB0cnVlLFxyXG4gICAgICAgICAgY29uZmlybUJ1dHRvbkNvbG9yOiAnIzMwODVkNicsXHJcbiAgICAgICAgICBjYW5jZWxCdXR0b25Db2xvcjogJyNkMzMnLFxyXG4gICAgICAgICAgY29uZmlybUJ1dHRvblRleHQ6ICdZZXMsIHN1Ym1pdCEnXHJcbiAgICAgIH0pLnRoZW4oaXNDb25maXJtID0+IHtcclxuICAgICAgICBpZiAoaXNDb25maXJtKSB7XHJcbiAgICAgICAgICB0aGlzLmF0dGVuZGFuY2UgPSB7XHJcbiAgICAgICAgICAgIHN0dWRlbnRzQWJzZW50OiB0aGlzLmFic2VudFN0dWRlbnRzLFxyXG4gICAgICAgICAgICBjb3Vyc2VJRDogdGhpcy5jb3Vyc2VJRCxcclxuICAgICAgICAgICAgZGF0ZTogdGhpcy5kYXRlXHJcbiAgICAgICAgICB9O1xyXG4gICAgICAgICAgY29uc29sZS5sb2codGhpcy5hdHRlbmRhbmNlKTtcclxuICAgICAgICAgIHRoaXMuU3R1ZGVudFNlcnZpY2VcclxuICAgICAgICAgICAgICAuaW5zZXJ0QXR0ZW5kYW5jZSh0aGlzLmF0dGVuZGFuY2UpXHJcbiAgICAgICAgICAgICAgLnRoZW4ocmVzdWx0ID0+IHtcclxuICAgICAgICAgICAgICAgIHN3YWwoXHJcbiAgICAgICAgICAgICAgICAgICAgJ0F0dGVuZGFuY2Ugc3VibWl0dGVkIScsXHJcbiAgICAgICAgICAgICAgICAgICAgJycsXHJcbiAgICAgICAgICAgICAgICAgICAgJ3N1Y2Nlc3MnXHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgLmNhdGNoKGVycm9yID0+IGNvbnNvbGUubG9nKGVycm9yKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KS5jYXRjaChlcnJvciA9PiB7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyhcIkNhbmNlbGVkXCIpO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBnb0JhY2soKSB7XHJcbiAgICAgICAgd2luZG93Lmhpc3RvcnkuYmFjaygpO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==
