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
        this.studentService.getEventsById(userID).then(function (result) {
            result.forEach(function (i) {
                var classDay = 0;
                if (i.classDay === "Monday") {
                    classDay = 1;
                }
                else if (i.classDay === "Tuesday") {
                    classDay = 2;
                }
                else if (i.classDay === "Wednesday") {
                    classDay = 3;
                }
                else if (i.classDay === "Thursday") {
                    classDay = 4;
                }
                else if (i.classDay === "Friday") {
                    classDay = 5;
                }
                i.courseStart = moment(i.courseStart).format('YYYY-MM-DD');
                i.courseEnd = moment(i.courseEnd).format('YYYY-MM-DD');
                i.classStartTime = moment(i.classStartTime).format('hh:mm A');
                i.classEndTime = moment(i.classEndTime).format('hh:mm A');
                if (i.classTimeStr) {
                    var array = i.classTimeStr.split(',');
                    for (var _i = 0, array_1 = array; _i < array_1.length; _i++) {
                        var item = array_1[_i];
                        var date = item.split(' ');
                        var day = date[0];
                        var time = date[1];
                        var startTime = time.split('-')[0];
                        var endTime = time.split('-')[1];
                        _this.events.push({
                            "title": i.courseName,
                            "start": day + "T" + startTime,
                            "end": day + "T" + endTime
                        });
                    }
                }
                else {
                    console.log("No class date string available");
                }
            });
        });
        // this.header = {
        //   left: 'prev',
        //   center: 'title',
        //   right: 'next'
        // };
        this.options = {
            selectable: true,
            prev: 'circle-triangle-w',
            defaultView: "agendaWeek",
            minTime: "08:00:00",
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NsaWVudC9hcHAvY29tcG9uZW50cy90aW1ldGFibGUvdGltZXRhYmxlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLHNDQUF5RDtBQUN6RCwwQ0FBeUQ7QUFFekQsZ0RBQStDO0FBQy9DLGtFQUFnRTtBQUNoRSxnRUFBNkQ7QUFTN0Q7SUFPRSw0QkFBb0IsY0FBOEIsRUFBVSxhQUEyQixFQUFVLEtBQXFCO1FBQWxHLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUFVLGtCQUFhLEdBQWIsYUFBYSxDQUFjO1FBQVUsVUFBSyxHQUFMLEtBQUssQ0FBZ0I7UUFMdEgsV0FBTSxHQUFVLEVBQUUsQ0FBQztJQU9uQixDQUFDO0lBRUQscUNBQVEsR0FBUjtRQUFBLGlCQTREQztRQTNEQyxJQUFJLFdBQVcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztRQUNsRSxJQUFJLE1BQU0sR0FBRyxXQUFXLENBQUMsTUFBTSxDQUFDO1FBRWhDLElBQUksQ0FBQyxjQUFjLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFBLE1BQU07WUFDbkQsTUFBTSxDQUFDLE9BQU8sQ0FBQyxVQUFDLENBQUM7Z0JBQ2YsSUFBSSxRQUFRLEdBQUcsQ0FBQyxDQUFDO2dCQUVqQixFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUM7b0JBQzVCLFFBQVEsR0FBRyxDQUFDLENBQUM7Z0JBQ2YsQ0FBQztnQkFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDO29CQUNwQyxRQUFRLEdBQUcsQ0FBQyxDQUFDO2dCQUNmLENBQUM7Z0JBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLEtBQUss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LFdBQVc7WUFDckIsV0FBVyxFQUFFLHFEQUFxRDtZQUNsRSxTQUFTLEVBQUUsQ0FBQyxvREFBb0QsQ0FBQztTQUNsRSxDQUFDO3lDQVNvQyxnQ0FBYyxFQUF3Qiw4QkFBYSxFQUFpQix1QkFBYztPQVAzRyxrQkFBa0IsQ0E0RTlCO0lBQUQseUJBQUM7Q0E1RUQsQUE0RUMsSUFBQTtBQTVFWSxnREFBa0IiLCJmaWxlIjoiYXBwL2NvbXBvbmVudHMvdGltZXRhYmxlL3RpbWV0YWJsZS5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQWN0aXZhdGVkUm91dGUsIFBhcmFtcyB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcbmltcG9ydCB7IENvdXJzZSB9IGZyb20gXCIuLi8uLi9tb2RlbHMvY291cnNlXCI7XHJcbmltcG9ydCB7IFN0dWRlbnQgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL1N0dWRlbnRcIjtcclxuaW1wb3J0IHsgU3R1ZGVudFNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvc3R1ZGVudC5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IENvdXJzZVNlcnZpY2V9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2NvdXJzZS5zZXJ2aWNlJztcclxuZGVjbGFyZSB2YXIgbW9tZW50OiBhbnk7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ3RpbWV0YWJsZScsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL2FwcC9jb21wb25lbnRzL3RpbWV0YWJsZS90aW1ldGFibGUuY29tcG9uZW50Lmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL2FwcC9jb21wb25lbnRzL3RpbWV0YWJsZS90aW1ldGFibGUuY29tcG9uZW50LmNzcyddXHJcbn0pXHJcblxyXG5leHBvcnQgY2xhc3MgVGltZXRhYmxlQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuICBASW5wdXQoKSBzdHVkZW50OiBTdHVkZW50O1xyXG4gIGV2ZW50czogYW55W10gPSBbXTtcclxuICBoZWFkZXI6IGFueTtcclxuICBvcHRpb25zOiBhbnk7XHJcblxyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHN0dWRlbnRTZXJ2aWNlOiBTdHVkZW50U2VydmljZSwgcHJpdmF0ZSBjb3Vyc2VTZXJ2aWNlOkNvdXJzZVNlcnZpY2UsIHByaXZhdGUgcm91dGU6IEFjdGl2YXRlZFJvdXRlKSB7XHJcblxyXG4gIH1cclxuXHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgICB2YXIgY3VycmVudFVzZXIgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdjdXJyZW50VXNlcicpKTtcclxuICAgIHZhciB1c2VySUQgPSBjdXJyZW50VXNlci51c2VySUQ7XHJcblxyXG4gICAgdGhpcy5zdHVkZW50U2VydmljZS5nZXRFdmVudHNCeUlkKHVzZXJJRCkudGhlbihyZXN1bHQgPT4ge1xyXG4gICAgICByZXN1bHQuZm9yRWFjaCgoaSkgPT4ge1xyXG4gICAgICAgIHZhciBjbGFzc0RheSA9IDA7XHJcblxyXG4gICAgICAgIGlmIChpLmNsYXNzRGF5ID09PSBcIk1vbmRheVwiKSB7XHJcbiAgICAgICAgICBjbGFzc0RheSA9IDE7XHJcbiAgICAgICAgfSBlbHNlIGlmIChpLmNsYXNzRGF5ID09PSBcIlR1ZXNkYXlcIikge1xyXG4gICAgICAgICAgY2xhc3NEYXkgPSAyO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoaS5jbGFzc0RheSA9PT0gXCJXZWRuZXNkYXlcIikge1xyXG4gICAgICAgICAgY2xhc3NEYXkgPSAzO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoaS5jbGFzc0RheSA9PT0gXCJUaHVyc2RheVwiKSB7XHJcbiAgICAgICAgICBjbGFzc0RheSA9IDQ7XHJcbiAgICAgICAgfSBlbHNlIGlmIChpLmNsYXNzRGF5ID09PSBcIkZyaWRheVwiKSB7XHJcbiAgICAgICAgICBjbGFzc0RheSA9IDU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpLmNvdXJzZVN0YXJ0ID0gbW9tZW50KGkuY291cnNlU3RhcnQpLmZvcm1hdCgnWVlZWS1NTS1ERCcpO1xyXG4gICAgICAgIGkuY291cnNlRW5kID0gbW9tZW50KGkuY291cnNlRW5kKS5mb3JtYXQoJ1lZWVktTU0tREQnKTtcclxuICAgICAgICBpLmNsYXNzU3RhcnRUaW1lID0gbW9tZW50KGkuY2xhc3NTdGFydFRpbWUpLmZvcm1hdCgnaGg6bW0gQScpO1xyXG4gICAgICAgIGkuY2xhc3NFbmRUaW1lID0gbW9tZW50KGkuY2xhc3NFbmRUaW1lKS5mb3JtYXQoJ2hoOm1tIEEnKTtcclxuXHJcbiAgICAgICAgaWYgKGkuY2xhc3NUaW1lU3RyKSB7XHJcbiAgICAgICAgICB2YXIgYXJyYXkgPSBpLmNsYXNzVGltZVN0ci5zcGxpdCgnLCcpO1xyXG4gICAgICAgICAgZm9yIChsZXQgaXRlbSBvZiBhcnJheSkge1xyXG4gICAgICAgICAgICB2YXIgZGF0ZSA9IGl0ZW0uc3BsaXQoJyAnKTtcclxuICAgICAgICAgICAgdmFyIGRheSA9IGRhdGVbMF07XHJcbiAgICAgICAgICAgIHZhciB0aW1lID0gZGF0ZVsxXTtcclxuICAgICAgICAgICAgdmFyIHN0YXJ0VGltZSA9IHRpbWUuc3BsaXQoJy0nKVswXTtcclxuICAgICAgICAgICAgdmFyIGVuZFRpbWUgPSB0aW1lLnNwbGl0KCctJylbMV07XHJcbiAgICAgICAgICAgIHRoaXMuZXZlbnRzLnB1c2goXHJcbiAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgXCJ0aXRsZVwiOiBpLmNvdXJzZU5hbWUsXHJcbiAgICAgICAgICAgICAgICBcInN0YXJ0XCI6IGRheSArIFwiVFwiICsgc3RhcnRUaW1lLFxyXG4gICAgICAgICAgICAgICAgXCJlbmRcIjogZGF5ICsgXCJUXCIgKyBlbmRUaW1lXHJcbiAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKFwiTm8gY2xhc3MgZGF0ZSBzdHJpbmcgYXZhaWxhYmxlXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyB0aGlzLmhlYWRlciA9IHtcclxuICAgIC8vICAgbGVmdDogJ3ByZXYnLFxyXG4gICAgLy8gICBjZW50ZXI6ICd0aXRsZScsXHJcbiAgICAvLyAgIHJpZ2h0OiAnbmV4dCdcclxuICAgIC8vIH07XHJcblxyXG4gICAgdGhpcy5vcHRpb25zID0ge1xyXG4gICAgICBzZWxlY3RhYmxlOnRydWUsXHJcbiAgICAgIHByZXY6ICdjaXJjbGUtdHJpYW5nbGUtdycsXHJcbiAgICAgIGRlZmF1bHRWaWV3OiBcImFnZW5kYVdlZWtcIixcclxuICAgICAgbWluVGltZTogXCIwODowMDowMFwiLFxyXG4gICAgICBtYXhUaW1lOiBcIjIyOjAwOjAwXCIsXHJcbiAgICAgIGhlaWdodDogXCJhdXRvXCJcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICBnb0JhY2soKSB7XHJcbiAgICB3aW5kb3cuaGlzdG9yeS5iYWNrKCk7XHJcbiAgfVxyXG59XHJcbiJdfQ==
