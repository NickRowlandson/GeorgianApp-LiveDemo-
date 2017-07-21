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
var student_service_1 = require("../../services/student.service");
var course_service_1 = require("../../services/course.service");
var TimetableComponent = (function () {
    function TimetableComponent(studentService, courseService, route) {
        this.studentService = studentService;
        this.courseService = courseService;
        this.route = route;
        this.events = [];
    }
    TimetableComponent.prototype.ngOnInit = function () {
        var _this = this;
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        var userID = currentUser.userID;
        console.log(userID);
        this.studentService.getEventsById(userID).then(function (result) {
            console.log(result);
            result.forEach(function (i) {
                _this.events.push({
                    "title": i.courseName,
                    "start": i.courseStart,
                    "end": i.courseEnd
                });
            });
        });
        this.header = {
            left: 'prev',
            center: 'title',
            right: 'next'
        };
        this.options = {
            prev: 'circle-triangle-w',
            defaultView: "agendaWeek",
            minTime: "06:00:00",
            maxTime: "22:00:00",
            height: "auto"
        };
    };
    TimetableComponent.prototype.goBack = function () {
        window.history.back();
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Student_1.Student)
    ], TimetableComponent.prototype, "student", void 0);
    TimetableComponent = __decorate([
        core_1.Component({
            selector: 'timetable',
            templateUrl: './app/components/timetable/timetable.component.html',
            styleUrls: ['./app/components/timetable/timetable.component.css']
        }),
        __metadata("design:paramtypes", [student_service_1.StudentService, course_service_1.CourseService, router_1.ActivatedRoute])
    ], TimetableComponent);
    return TimetableComponent;
}());
exports.TimetableComponent = TimetableComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NsaWVudC9hcHAvY29tcG9uZW50cy90aW1ldGFibGUvdGltZXRhYmxlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLHNDQUF5RDtBQUN6RCwwQ0FBeUQ7QUFFekQsZ0RBQStDO0FBQy9DLGtFQUFnRTtBQUNoRSxnRUFBNkQ7QUFTN0Q7SUFPRSw0QkFBb0IsY0FBOEIsRUFBVSxhQUEyQixFQUFVLEtBQXFCO1FBQWxHLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUFVLGtCQUFhLEdBQWIsYUFBYSxDQUFjO1FBQVUsVUFBSyxHQUFMLEtBQUssQ0FBZ0I7UUFMdEgsV0FBTSxHQUFVLEVBQUUsQ0FBQztJQU9uQixDQUFDO0lBRUQscUNBQVEsR0FBUjtRQUFBLGlCQStCQztRQTlCQyxJQUFJLFdBQVcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztRQUNsRSxJQUFJLE1BQU0sR0FBRyxXQUFXLENBQUMsTUFBTSxDQUFDO1FBQ2hDLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7UUFFcEIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUEsTUFBTTtZQUNuRCxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ3BCLE1BQU0sQ0FBQyxPQUFPLENBQUMsVUFBQyxDQUFDO2dCQUNmLEtBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUNkO29CQUNFLE9BQU8sRUFBRSxDQUFDLENBQUMsVUFBVTtvQkFDckIsT0FBTyxFQUFFLENBQUMsQ0FBQyxXQUFXO29CQUN0QixLQUFLLEVBQUUsQ0FBQyxDQUFDLFNBQVM7aUJBQ25CLENBQUMsQ0FBQztZQUVQLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsTUFBTSxHQUFHO1lBQ1osSUFBSSxFQUFFLE1BQU07WUFDWixNQUFNLEVBQUUsT0FBTztZQUNmLEtBQUssRUFBRSxNQUFNO1NBQ2QsQ0FBQztRQUVGLElBQUksQ0FBQyxPQUFPLEdBQUc7WUFDYixJQUFJLEVBQUUsbUJBQW1CO1lBQ3pCLFdBQVcsRUFBRSxZQUFZO1lBQ3pCLE9BQU8sRUFBRSxVQUFVO1lBQ25CLE9BQU8sRUFBRSxVQUFVO1lBQ25CLE1BQU0sRUFBRSxNQUFNO1NBQ2YsQ0FBQztJQUNKLENBQUM7SUFFRCxtQ0FBTSxHQUFOO1FBQ0UsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUN4QixDQUFDO0lBN0NRO1FBQVIsWUFBSyxFQUFFO2tDQUFVLGlCQUFPO3VEQUFDO0lBRGYsa0JBQWtCO1FBTjlCLGdCQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsV0FBVztZQUNyQixXQUFXLEVBQUUscURBQXFEO1lBQ2xFLFNBQVMsRUFBRSxDQUFDLG9EQUFvRCxDQUFDO1NBQ2xFLENBQUM7eUNBU29DLGdDQUFjLEVBQXdCLDhCQUFhLEVBQWlCLHVCQUFjO09BUDNHLGtCQUFrQixDQStDOUI7SUFBRCx5QkFBQztDQS9DRCxBQStDQyxJQUFBO0FBL0NZLGdEQUFrQiIsImZpbGUiOiJhcHAvY29tcG9uZW50cy90aW1ldGFibGUvdGltZXRhYmxlLmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBBY3RpdmF0ZWRSb3V0ZSwgUGFyYW1zIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuaW1wb3J0IHsgQ291cnNlIH0gZnJvbSBcIi4uLy4uL21vZGVscy9jb3Vyc2VcIjtcclxuaW1wb3J0IHsgU3R1ZGVudCB9IGZyb20gXCIuLi8uLi9tb2RlbHMvU3R1ZGVudFwiO1xyXG5pbXBvcnQgeyBTdHVkZW50U2VydmljZSB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9zdHVkZW50LnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgQ291cnNlU2VydmljZX0gZnJvbSAnLi4vLi4vc2VydmljZXMvY291cnNlLnNlcnZpY2UnO1xyXG5cclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAndGltZXRhYmxlJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vYXBwL2NvbXBvbmVudHMvdGltZXRhYmxlL3RpbWV0YWJsZS5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vYXBwL2NvbXBvbmVudHMvdGltZXRhYmxlL3RpbWV0YWJsZS5jb21wb25lbnQuY3NzJ11cclxufSlcclxuXHJcbmV4cG9ydCBjbGFzcyBUaW1ldGFibGVDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG4gIEBJbnB1dCgpIHN0dWRlbnQ6IFN0dWRlbnQ7XHJcbiAgZXZlbnRzOiBhbnlbXSA9IFtdO1xyXG4gIGhlYWRlcjogYW55O1xyXG4gIG9wdGlvbnM6IGFueTtcclxuXHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgc3R1ZGVudFNlcnZpY2U6IFN0dWRlbnRTZXJ2aWNlLCBwcml2YXRlIGNvdXJzZVNlcnZpY2U6Q291cnNlU2VydmljZSwgcHJpdmF0ZSByb3V0ZTogQWN0aXZhdGVkUm91dGUpIHtcclxuXHJcbiAgfVxyXG5cclxuICBuZ09uSW5pdCgpIHtcclxuICAgIHZhciBjdXJyZW50VXNlciA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2N1cnJlbnRVc2VyJykpO1xyXG4gICAgdmFyIHVzZXJJRCA9IGN1cnJlbnRVc2VyLnVzZXJJRDtcclxuICAgIGNvbnNvbGUubG9nKHVzZXJJRCk7XHJcblxyXG4gICAgdGhpcy5zdHVkZW50U2VydmljZS5nZXRFdmVudHNCeUlkKHVzZXJJRCkudGhlbihyZXN1bHQgPT4ge1xyXG4gICAgICBjb25zb2xlLmxvZyhyZXN1bHQpO1xyXG4gICAgICByZXN1bHQuZm9yRWFjaCgoaSkgPT4ge1xyXG4gICAgICAgIHRoaXMuZXZlbnRzLnB1c2goXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIFwidGl0bGVcIjogaS5jb3Vyc2VOYW1lLFxyXG4gICAgICAgICAgICBcInN0YXJ0XCI6IGkuY291cnNlU3RhcnQsXHJcbiAgICAgICAgICAgIFwiZW5kXCI6IGkuY291cnNlRW5kXHJcbiAgICAgICAgICB9KTtcclxuXHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgdGhpcy5oZWFkZXIgPSB7XHJcbiAgICAgIGxlZnQ6ICdwcmV2JyxcclxuICAgICAgY2VudGVyOiAndGl0bGUnLFxyXG4gICAgICByaWdodDogJ25leHQnXHJcbiAgICB9O1xyXG5cclxuICAgIHRoaXMub3B0aW9ucyA9IHtcclxuICAgICAgcHJldjogJ2NpcmNsZS10cmlhbmdsZS13JyxcclxuICAgICAgZGVmYXVsdFZpZXc6IFwiYWdlbmRhV2Vla1wiLFxyXG4gICAgICBtaW5UaW1lOiBcIjA2OjAwOjAwXCIsXHJcbiAgICAgIG1heFRpbWU6IFwiMjI6MDA6MDBcIixcclxuICAgICAgaGVpZ2h0OiBcImF1dG9cIlxyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIGdvQmFjaygpIHtcclxuICAgIHdpbmRvdy5oaXN0b3J5LmJhY2soKTtcclxuICB9XHJcbn1cclxuIl19
