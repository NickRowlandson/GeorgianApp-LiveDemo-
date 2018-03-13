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
var router_2 = require("@angular/router");
var Student_1 = require("../../models/Student");
var student_service_1 = require("../../services/student.service");
var course_service_1 = require("../../services/course.service");
var TimetableComponent = /** @class */ (function () {
    function TimetableComponent(router, studentService, courseService, route) {
        this.router = router;
        this.studentService = studentService;
        this.courseService = courseService;
        this.route = route;
        this.events = [];
        this.faculty = false;
    }
    TimetableComponent.prototype.ngOnInit = function () {
        var _this = this;
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        var userID = currentUser.userID;
        if (currentUser.userType !== "Student") {
            this.faculty = true;
            this.studentService
                .getStudents()
                .then(function (students) {
                _this.students = students;
                _this.getEventsById(_this.selectedStudent[0].userID);
            })
                .catch(function (error) {
                // do something
            });
        }
        else {
            this.getEventsById(userID);
        }
        this.options = {
            selectable: true,
            prev: 'circle-triangle-w',
            defaultView: "agendaWeek",
            minTime: "08:00:00",
            maxTime: "22:00:00",
            height: "auto"
        };
    };
    TimetableComponent.prototype.studentSelect = function () {
        swal({
            title: 'Loading...',
            allowOutsideClick: false
        });
        swal.showLoading();
        this.getEventsById(this.selectedStudent);
    };
    TimetableComponent.prototype.getEventsById = function (userID) {
        var _this = this;
        this.events = [];
        this.studentService.getEventsById(userID).then(function (result) {
            if (result.status === 'No Timetable Info') {
                swal.close();
                swal('No Timetable Info', 'This student has not been enrolled in a class yet.', 'warning');
            }
            else {
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
                swal.close();
            }
        }).catch(function (error) {
            console.log("Error getting events by id");
        });
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
        __metadata("design:paramtypes", [router_1.Router, student_service_1.StudentService, course_service_1.CourseService, router_2.ActivatedRoute])
    ], TimetableComponent);
    return TimetableComponent;
}());
exports.TimetableComponent = TimetableComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NsaWVudC9hcHAvY29tcG9uZW50cy90aW1ldGFibGUvdGltZXRhYmxlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLHNDQUF5RDtBQUN6RCwwQ0FBeUM7QUFDekMsMENBQXlEO0FBRXpELGdEQUErQztBQUMvQyxrRUFBZ0U7QUFDaEUsZ0VBQTZEO0FBVTdEO0lBU0UsNEJBQW9CLE1BQWMsRUFBVSxjQUE4QixFQUFVLGFBQTJCLEVBQVUsS0FBcUI7UUFBMUgsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUFVLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUFVLGtCQUFhLEdBQWIsYUFBYSxDQUFjO1FBQVUsVUFBSyxHQUFMLEtBQUssQ0FBZ0I7UUFQOUksV0FBTSxHQUFVLEVBQUUsQ0FBQztRQUtuQixZQUFPLEdBQVksS0FBSyxDQUFDO0lBSXpCLENBQUM7SUFFRCxxQ0FBUSxHQUFSO1FBQUEsaUJBMkJDO1FBMUJDLElBQUksV0FBVyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDO1FBQ2xFLElBQUksTUFBTSxHQUFHLFdBQVcsQ0FBQyxNQUFNLENBQUM7UUFFaEMsRUFBRSxDQUFDLENBQUMsV0FBVyxDQUFDLFFBQVEsS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDO1lBQ3ZDLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO1lBQ3BCLElBQUksQ0FBQyxjQUFjO2lCQUNkLFdBQVcsRUFBRTtpQkFDYixJQUFJLENBQUMsVUFBQSxRQUFRO2dCQUNWLEtBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO2dCQUN6QixLQUFJLENBQUMsYUFBYSxDQUFDLEtBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDdkQsQ0FBQyxDQUFDO2lCQUNELEtBQUssQ0FBQyxVQUFBLEtBQUs7Z0JBQ1YsZUFB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TyxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ3hCLENBQUM7SUE3R1E7UUFBUixZQUFLLEVBQUU7a0NBQVUsaUJBQU87dURBQUM7SUFEZixrQkFBa0I7UUFOOUIsZ0JBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxXQUFXO1lBQ3JCLFdBQVcsRUFBRSxxREFBcUQ7WUFDbEUsU0FBUyxFQUFFLENBQUMsb0RBQW9ELENBQUM7U0FDbEUsQ0FBQzt5Q0FXNEIsZUFBTSxFQUEwQixnQ0FBYyxFQUF3Qiw4QkFBYSxFQUFpQix1QkFBYztPQVRuSSxrQkFBa0IsQ0ErRzlCO0lBQUQseUJBQUM7Q0EvR0QsQUErR0MsSUFBQTtBQS9HWSxnREFBa0IiLCJmaWxlIjoiYXBwL2NvbXBvbmVudHMvdGltZXRhYmxlL3RpbWV0YWJsZS5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuaW1wb3J0IHsgQWN0aXZhdGVkUm91dGUsIFBhcmFtcyB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcbmltcG9ydCB7IENvdXJzZSB9IGZyb20gXCIuLi8uLi9tb2RlbHMvY291cnNlXCI7XHJcbmltcG9ydCB7IFN0dWRlbnQgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL1N0dWRlbnRcIjtcclxuaW1wb3J0IHsgU3R1ZGVudFNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvc3R1ZGVudC5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IENvdXJzZVNlcnZpY2V9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2NvdXJzZS5zZXJ2aWNlJztcclxuZGVjbGFyZSB2YXIgbW9tZW50OiBhbnk7XHJcbmRlY2xhcmUgdmFyIHN3YWw6IGFueTtcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAndGltZXRhYmxlJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vYXBwL2NvbXBvbmVudHMvdGltZXRhYmxlL3RpbWV0YWJsZS5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vYXBwL2NvbXBvbmVudHMvdGltZXRhYmxlL3RpbWV0YWJsZS5jb21wb25lbnQuY3NzJ11cclxufSlcclxuXHJcbmV4cG9ydCBjbGFzcyBUaW1ldGFibGVDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG4gIEBJbnB1dCgpIHN0dWRlbnQ6IFN0dWRlbnQ7XHJcbiAgZXZlbnRzOiBhbnlbXSA9IFtdO1xyXG4gIGhlYWRlcjogYW55O1xyXG4gIG9wdGlvbnM6IGFueTtcclxuICBzdHVkZW50czogU3R1ZGVudFtdO1xyXG4gIHNlbGVjdGVkU3R1ZGVudDogbnVtYmVyO1xyXG4gIGZhY3VsdHk6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSByb3V0ZXI6IFJvdXRlciwgcHJpdmF0ZSBzdHVkZW50U2VydmljZTogU3R1ZGVudFNlcnZpY2UsIHByaXZhdGUgY291cnNlU2VydmljZTpDb3Vyc2VTZXJ2aWNlLCBwcml2YXRlIHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSkge1xyXG5cclxuICB9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgdmFyIGN1cnJlbnRVc2VyID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnY3VycmVudFVzZXInKSk7XHJcbiAgICB2YXIgdXNlcklEID0gY3VycmVudFVzZXIudXNlcklEO1xyXG5cclxuICAgIGlmIChjdXJyZW50VXNlci51c2VyVHlwZSAhPT0gXCJTdHVkZW50XCIpIHtcclxuICAgICAgdGhpcy5mYWN1bHR5ID0gdHJ1ZTtcclxuICAgICAgdGhpcy5zdHVkZW50U2VydmljZVxyXG4gICAgICAgICAgLmdldFN0dWRlbnRzKClcclxuICAgICAgICAgIC50aGVuKHN0dWRlbnRzID0+IHtcclxuICAgICAgICAgICAgICB0aGlzLnN0dWRlbnRzID0gc3R1ZGVudHM7XHJcbiAgICAgICAgICAgICAgdGhpcy5nZXRFdmVudHNCeUlkKHRoaXMuc2VsZWN0ZWRTdHVkZW50WzBdLnVzZXJJRCk7XHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcclxuICAgICAgICAgICAgLy8gZG8gc29tZXRoaW5nXHJcbiAgICAgICAgICB9KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuZ2V0RXZlbnRzQnlJZCh1c2VySUQpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMub3B0aW9ucyA9IHtcclxuICAgICAgc2VsZWN0YWJsZTogdHJ1ZSxcclxuICAgICAgcHJldjogJ2NpcmNsZS10cmlhbmdsZS13JyxcclxuICAgICAgZGVmYXVsdFZpZXc6IFwiYWdlbmRhV2Vla1wiLFxyXG4gICAgICBtaW5UaW1lOiBcIjA4OjAwOjAwXCIsXHJcbiAgICAgIG1heFRpbWU6IFwiMjI6MDA6MDBcIixcclxuICAgICAgaGVpZ2h0OiBcImF1dG9cIlxyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIHN0dWRlbnRTZWxlY3QoKSB7XHJcbiAgICBzd2FsKHtcclxuICAgICAgdGl0bGU6ICdMb2FkaW5nLi4uJyxcclxuICAgICAgYWxsb3dPdXRzaWRlQ2xpY2s6IGZhbHNlXHJcbiAgICB9KTtcclxuICAgIHN3YWwuc2hvd0xvYWRpbmcoKTtcclxuICAgIHRoaXMuZ2V0RXZlbnRzQnlJZCh0aGlzLnNlbGVjdGVkU3R1ZGVudCk7XHJcbiAgfVxyXG5cclxuICBnZXRFdmVudHNCeUlkKHVzZXJJRCkge1xyXG4gICAgdGhpcy5ldmVudHMgPSBbXTtcclxuICAgIHRoaXMuc3R1ZGVudFNlcnZpY2UuZ2V0RXZlbnRzQnlJZCh1c2VySUQpLnRoZW4ocmVzdWx0ID0+IHtcclxuICAgICAgaWYgKHJlc3VsdC5zdGF0dXMgPT09ICdObyBUaW1ldGFibGUgSW5mbycpIHtcclxuICAgICAgICBzd2FsLmNsb3NlKCk7XHJcbiAgICAgICAgc3dhbChcclxuICAgICAgICAgICAgJ05vIFRpbWV0YWJsZSBJbmZvJyxcclxuICAgICAgICAgICAgJ1RoaXMgc3R1ZGVudCBoYXMgbm90IGJlZW4gZW5yb2xsZWQgaW4gYSBjbGFzcyB5ZXQuJyxcclxuICAgICAgICAgICAgJ3dhcm5pbmcnXHJcbiAgICAgICAgKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICByZXN1bHQuZm9yRWFjaCgoaSkgPT4ge1xyXG4gICAgICAgICAgdmFyIGNsYXNzRGF5ID0gMDtcclxuXHJcbiAgICAgICAgICBpZiAoaS5jbGFzc0RheSA9PT0gXCJNb25kYXlcIikge1xyXG4gICAgICAgICAgICBjbGFzc0RheSA9IDE7XHJcbiAgICAgICAgICB9IGVsc2UgaWYgKGkuY2xhc3NEYXkgPT09IFwiVHVlc2RheVwiKSB7XHJcbiAgICAgICAgICAgIGNsYXNzRGF5ID0gMjtcclxuICAgICAgICAgIH0gZWxzZSBpZiAoaS5jbGFzc0RheSA9PT0gXCJXZWRuZXNkYXlcIikge1xyXG4gICAgICAgICAgICBjbGFzc0RheSA9IDM7XHJcbiAgICAgICAgICB9IGVsc2UgaWYgKGkuY2xhc3NEYXkgPT09IFwiVGh1cnNkYXlcIikge1xyXG4gICAgICAgICAgICBjbGFzc0RheSA9IDQ7XHJcbiAgICAgICAgICB9IGVsc2UgaWYgKGkuY2xhc3NEYXkgPT09IFwiRnJpZGF5XCIpIHtcclxuICAgICAgICAgICAgY2xhc3NEYXkgPSA1O1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGkuY291cnNlU3RhcnQgPSBtb21lbnQoaS5jb3Vyc2VTdGFydCkuZm9ybWF0KCdZWVlZLU1NLUREJyk7XHJcbiAgICAgICAgICBpLmNvdXJzZUVuZCA9IG1vbWVudChpLmNvdXJzZUVuZCkuZm9ybWF0KCdZWVlZLU1NLUREJyk7XHJcbiAgICAgICAgICBpLmNsYXNzU3RhcnRUaW1lID0gbW9tZW50KGkuY2xhc3NTdGFydFRpbWUpLmZvcm1hdCgnaGg6bW0gQScpO1xyXG4gICAgICAgICAgaS5jbGFzc0VuZFRpbWUgPSBtb21lbnQoaS5jbGFzc0VuZFRpbWUpLmZvcm1hdCgnaGg6bW0gQScpO1xyXG5cclxuICAgICAgICAgIGlmIChpLmNsYXNzVGltZVN0cikge1xyXG4gICAgICAgICAgICB2YXIgYXJyYXkgPSBpLmNsYXNzVGltZVN0ci5zcGxpdCgnLCcpO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpdGVtIG9mIGFycmF5KSB7XHJcbiAgICAgICAgICAgICAgdmFyIGRhdGUgPSBpdGVtLnNwbGl0KCcgJyk7XHJcbiAgICAgICAgICAgICAgdmFyIGRheSA9IGRhdGVbMF07XHJcbiAgICAgICAgICAgICAgdmFyIHRpbWUgPSBkYXRlWzFdO1xyXG4gICAgICAgICAgICAgIHZhciBzdGFydFRpbWUgPSB0aW1lLnNwbGl0KCctJylbMF07XHJcbiAgICAgICAgICAgICAgdmFyIGVuZFRpbWUgPSB0aW1lLnNwbGl0KCctJylbMV07XHJcbiAgICAgICAgICAgICAgdGhpcy5ldmVudHMucHVzaChcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgXCJ0aXRsZVwiOiBpLmNvdXJzZU5hbWUsXHJcbiAgICAgICAgICAgICAgICAgIFwic3RhcnRcIjogZGF5ICsgXCJUXCIgKyBzdGFydFRpbWUsXHJcbiAgICAgICAgICAgICAgICAgIFwiZW5kXCI6IGRheSArIFwiVFwiICsgZW5kVGltZVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiTm8gY2xhc3MgZGF0ZSBzdHJpbmcgYXZhaWxhYmxlXCIpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHN3YWwuY2xvc2UoKTtcclxuICAgICAgfVxyXG4gICAgfSkuY2F0Y2goZXJyb3IgPT4ge1xyXG4gICAgICBjb25zb2xlLmxvZyhcIkVycm9yIGdldHRpbmcgZXZlbnRzIGJ5IGlkXCIpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBnb0JhY2soKSB7XHJcbiAgICB3aW5kb3cuaGlzdG9yeS5iYWNrKCk7XHJcbiAgfVxyXG59XHJcbiJdfQ==
