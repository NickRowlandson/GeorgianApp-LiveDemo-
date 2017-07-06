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
var Student_1 = require("../../models/Student");
var course_service_1 = require("../../services/course.service");
var student_service_1 = require("../../services/student.service");
var CourseSelectionComponent = (function () {
    function CourseSelectionComponent(studentService, courseService, route) {
        this.studentService = studentService;
        this.courseService = courseService;
        this.route = route;
    }
    CourseSelectionComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.forEach(function (params) {
            _this.studentID = params['id'];
            _this.studentService.getStudent(_this.studentID)
                .then(function (student) { return _this.student = student; });
        });
        this.getCourses();
        this.checkTimetable();
    };
    CourseSelectionComponent.prototype.getCourses = function () {
        var _this = this;
        this.courseService
            .getCourses()
            .then(function (result) {
            if (result.error === 'error') {
                _this.courses = null;
            }
            else {
                _this.courses = result;
            }
        }).catch(function (error) { return error; });
    };
    CourseSelectionComponent.prototype.courseEnroll = function (course, $event) {
        var _this = this;
        this.studentService
            .courseEnroll(this.studentID, course.courseID)
            .then(function (result) {
            _this.checkTimetable();
            console.log("Enrolled");
        })
            .catch(function (error) { return error; });
    };
    CourseSelectionComponent.prototype.checkTimetable = function () {
        var _this = this;
        this.studentService
            .checkStudentTimetable(this.studentID)
            .then(function (result) {
            _this.studentTimetable = result;
        })
            .catch(function (error) { return error; });
    };
    CourseSelectionComponent.prototype.removeCourse = function (course, $event) {
        // this.studentService
        // .removeCourse()
        // .then(result => {
        //
        // })
        // .catch(error => error);
    };
    CourseSelectionComponent.prototype.checkStatus = function () {
    };
    CourseSelectionComponent.prototype.goBack = function () {
        window.history.back();
    };
    return CourseSelectionComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Student_1.Student)
], CourseSelectionComponent.prototype, "student", void 0);
CourseSelectionComponent = __decorate([
    core_1.Component({
        selector: 'course-selection',
        templateUrl: './app/components/course-selection/course-selection.component.html',
        styleUrls: ['./app/components/course-selection/course-selection.component.css']
    }),
    __metadata("design:paramtypes", [student_service_1.StudentService, course_service_1.CourseService, router_1.ActivatedRoute])
], CourseSelectionComponent);
exports.CourseSelectionComponent = CourseSelectionComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NsaWVudC9hcHAvY29tcG9uZW50cy9jb3Vyc2Utc2VsZWN0aW9uL2NvdXJzZS1zZWxlY3Rpb24uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsc0NBQXlEO0FBRXpELDBDQUF5RDtBQUV6RCxnREFBK0M7QUFDL0MsZ0VBQThEO0FBQzlELGtFQUFnRTtBQVNoRSxJQUFhLHdCQUF3QjtJQU1qQyxrQ0FBb0IsY0FBOEIsRUFBVSxhQUE0QixFQUFVLEtBQXFCO1FBQW5HLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUFVLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBQVUsVUFBSyxHQUFMLEtBQUssQ0FBZ0I7SUFFdkgsQ0FBQztJQUVELDJDQUFRLEdBQVI7UUFBQSxpQkFRQztRQVBHLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxVQUFDLE1BQWM7WUFDckMsS0FBSSxDQUFDLFNBQVMsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDOUIsS0FBSSxDQUFDLGNBQWMsQ0FBQyxVQUFVLENBQUMsS0FBSSxDQUFDLFNBQVMsQ0FBQztpQkFDekMsSUFBSSxDQUFDLFVBQUEsT0FBTyxJQUFJLE9BQUEsS0FBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLEVBQXRCLENBQXNCLENBQUMsQ0FBQztRQUNqRCxDQUFDLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUNsQixJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7SUFDMUIsQ0FBQztJQUVELDZDQUFVLEdBQVY7UUFBQSxpQkFVQztRQVRHLElBQUksQ0FBQyxhQUFhO2FBQ2IsVUFBVSxFQUFFO2FBQ1osSUFBSSxDQUFDLFVBQUEsTUFBTTtZQUNSLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEtBQUssT0FBTyxDQUFDLENBQUMsQ0FBQztnQkFDM0IsS0FBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7WUFDeEIsQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNKLEtBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDO1lBQzFCLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsVUFBQSxLQUFLLElBQUksT0FBQSxLQUFLLEVBQUwsQ0FBSyxDQUFDLENBQUM7SUFDakMsQ0FBQztJQUVELCtDQUFZLEdBQVosVUFBYSxNQUFjLEVBQUUsTUFBTTtRQUFuQyxpQkFRQztRQVBHLElBQUksQ0FBQyxjQUFjO2FBQ2QsWUFBWSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsTUFBTSxDQUFDLFFBQVEsQ0FBQzthQUM3QyxJQUFJLENBQUMsVUFBQSxNQUFNO1lBQ1IsS0FBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1lBQ3RCLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDNUIsQ0FBQyxDQUFDO2FBQ0QsS0FBSyxDQUFDLFVBQUEsS0FBSyxJQUFJLE9BQUEsS0FBSyxFQUFMLENBQUssQ0FBQyxDQUFDO0lBQy9CLENBQUM7SUFFRCxpREFBYyxHQUFkO1FBQUEsaUJBT0M7UUFORyxJQUFJLENBQUMsY0FBYzthQUNkLHFCQUFxQixDQUFDLElBQUksQ0FBQyxTQUFTLENBQUM7YUFDckMsSUFBSSxDQUFDLFVBQUEsTUFBTTtZQUNSLEtBQUksQ0FBQyxnQkFBZ0IsR0FBRyxNQUFNLENBQUM7UUFDbkMsQ0FBQyxDQUFDO2FBQ0QsS0FBSyxDQUFDLFVBQUEsS0FBSyxJQUFJLE9BQUEsS0FBSyxFQUFMLENBQUssQ0FBQyxDQUFDO0lBQy9CLENBQUM7SUFFRCwrQ0FBWSxHQUFaLFVBQWEsTUFBYyxFQUFFLE1BQU07UUFDL0Isc0JBQXNCO1FBQ3RCLGtCQUFrQjtRQUNsQixvQkFBb0I7UUFDcEIsRUFBRTtRQUNGLEtBQUs7UUFDTCwwQkFBMEI7SUFDOUIsQ0FBQztJQUVELDhDQUFXLEdBQVg7SUFDQSxDQUFDO0lBRUQseUNBQU0sR0FBTjtRQUNJLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDMUIsQ0FBQztJQUNMLCtCQUFDO0FBQUQsQ0FsRUEsQUFrRUMsSUFBQTtBQWpFWTtJQUFSLFlBQUssRUFBRTs4QkFBVSxpQkFBTzt5REFBQztBQURqQix3QkFBd0I7SUFOcEMsZ0JBQVMsQ0FBQztRQUNQLFFBQVEsRUFBRSxrQkFBa0I7UUFDNUIsV0FBVyxFQUFFLG1FQUFtRTtRQUNoRixTQUFTLEVBQUUsQ0FBQyxrRUFBa0UsQ0FBQztLQUNsRixDQUFDO3FDQVFzQyxnQ0FBYyxFQUF5Qiw4QkFBYSxFQUFpQix1QkFBYztHQU45Ryx3QkFBd0IsQ0FrRXBDO0FBbEVZLDREQUF3QiIsImZpbGUiOiJhcHAvY29tcG9uZW50cy9jb3Vyc2Utc2VsZWN0aW9uL2NvdXJzZS1zZWxlY3Rpb24uY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcbmltcG9ydCB7IEFjdGl2YXRlZFJvdXRlLCBQYXJhbXMgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xyXG5pbXBvcnQgeyBDb3Vyc2UgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL2NvdXJzZVwiO1xyXG5pbXBvcnQgeyBTdHVkZW50IH0gZnJvbSBcIi4uLy4uL21vZGVscy9TdHVkZW50XCI7XHJcbmltcG9ydCB7IENvdXJzZVNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvY291cnNlLnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgU3R1ZGVudFNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvc3R1ZGVudC5zZXJ2aWNlXCI7XHJcbmRlY2xhcmUgdmFyIHZpcztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6ICdjb3Vyc2Utc2VsZWN0aW9uJyxcclxuICAgIHRlbXBsYXRlVXJsOiAnLi9hcHAvY29tcG9uZW50cy9jb3Vyc2Utc2VsZWN0aW9uL2NvdXJzZS1zZWxlY3Rpb24uY29tcG9uZW50Lmh0bWwnLFxyXG4gICAgc3R5bGVVcmxzOiBbJy4vYXBwL2NvbXBvbmVudHMvY291cnNlLXNlbGVjdGlvbi9jb3Vyc2Utc2VsZWN0aW9uLmNvbXBvbmVudC5jc3MnXVxyXG59KVxyXG5cclxuZXhwb3J0IGNsYXNzIENvdXJzZVNlbGVjdGlvbkNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgICBASW5wdXQoKSBzdHVkZW50OiBTdHVkZW50O1xyXG4gICAgY291cnNlczogQ291cnNlW107XHJcbiAgICBzdHVkZW50SUQ6IGFueTtcclxuICAgIHN0dWRlbnRUaW1ldGFibGU6IFtdO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgc3R1ZGVudFNlcnZpY2U6IFN0dWRlbnRTZXJ2aWNlLCBwcml2YXRlIGNvdXJzZVNlcnZpY2U6IENvdXJzZVNlcnZpY2UsIHByaXZhdGUgcm91dGU6IEFjdGl2YXRlZFJvdXRlKSB7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIG5nT25Jbml0KCkge1xyXG4gICAgICAgIHRoaXMucm91dGUucGFyYW1zLmZvckVhY2goKHBhcmFtczogUGFyYW1zKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuc3R1ZGVudElEID0gcGFyYW1zWydpZCddO1xyXG4gICAgICAgICAgICB0aGlzLnN0dWRlbnRTZXJ2aWNlLmdldFN0dWRlbnQodGhpcy5zdHVkZW50SUQpXHJcbiAgICAgICAgICAgICAgICAudGhlbihzdHVkZW50ID0+IHRoaXMuc3R1ZGVudCA9IHN0dWRlbnQpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuZ2V0Q291cnNlcygpO1xyXG4gICAgICAgIHRoaXMuY2hlY2tUaW1ldGFibGUoKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRDb3Vyc2VzKCkge1xyXG4gICAgICAgIHRoaXMuY291cnNlU2VydmljZVxyXG4gICAgICAgICAgICAuZ2V0Q291cnNlcygpXHJcbiAgICAgICAgICAgIC50aGVuKHJlc3VsdCA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAocmVzdWx0LmVycm9yID09PSAnZXJyb3InKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb3Vyc2VzID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb3Vyc2VzID0gcmVzdWx0O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KS5jYXRjaChlcnJvciA9PiBlcnJvcik7XHJcbiAgICB9XHJcblxyXG4gICAgY291cnNlRW5yb2xsKGNvdXJzZTogQ291cnNlLCAkZXZlbnQpIHtcclxuICAgICAgICB0aGlzLnN0dWRlbnRTZXJ2aWNlXHJcbiAgICAgICAgICAgIC5jb3Vyc2VFbnJvbGwodGhpcy5zdHVkZW50SUQsIGNvdXJzZS5jb3Vyc2VJRClcclxuICAgICAgICAgICAgLnRoZW4ocmVzdWx0ID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2hlY2tUaW1ldGFibGUoKTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRW5yb2xsZWRcIik7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5jYXRjaChlcnJvciA9PiBlcnJvcik7XHJcbiAgICB9XHJcblxyXG4gICAgY2hlY2tUaW1ldGFibGUoKSB7XHJcbiAgICAgICAgdGhpcy5zdHVkZW50U2VydmljZVxyXG4gICAgICAgICAgICAuY2hlY2tTdHVkZW50VGltZXRhYmxlKHRoaXMuc3R1ZGVudElEKVxyXG4gICAgICAgICAgICAudGhlbihyZXN1bHQgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zdHVkZW50VGltZXRhYmxlID0gcmVzdWx0O1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuY2F0Y2goZXJyb3IgPT4gZXJyb3IpO1xyXG4gICAgfVxyXG5cclxuICAgIHJlbW92ZUNvdXJzZShjb3Vyc2U6IENvdXJzZSwgJGV2ZW50KSB7XHJcbiAgICAgICAgLy8gdGhpcy5zdHVkZW50U2VydmljZVxyXG4gICAgICAgIC8vIC5yZW1vdmVDb3Vyc2UoKVxyXG4gICAgICAgIC8vIC50aGVuKHJlc3VsdCA9PiB7XHJcbiAgICAgICAgLy9cclxuICAgICAgICAvLyB9KVxyXG4gICAgICAgIC8vIC5jYXRjaChlcnJvciA9PiBlcnJvcik7XHJcbiAgICB9XHJcblxyXG4gICAgY2hlY2tTdGF0dXMoKSB7XHJcbiAgICB9XHJcblxyXG4gICAgZ29CYWNrKCkge1xyXG4gICAgICAgIHdpbmRvdy5oaXN0b3J5LmJhY2soKTtcclxuICAgIH1cclxufVxyXG4iXX0=
