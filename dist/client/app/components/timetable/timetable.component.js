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
                if (students.result === 'error') {
                    _this.displayErrorAlert(students);
                }
                else {
                    _this.students = students;
                    _this.getEventsById(_this.selectedStudent[0].userID);
                }
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
    TimetableComponent.prototype.onPrint = function () {
        window.print();
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
        this.studentService
            .getEventsById(userID)
            .then(function (result) {
            if (result.result === 'error') {
                _this.displayErrorAlert(result);
            }
            else if (result.title === 'No Timetable Info') {
                var currentUser = JSON.parse(localStorage.getItem('currentUser'));
                if (currentUser.userType !== "Student") {
                    swal('No Timetable Info', 'This student has not been enrolled in any classes yet.', 'warning');
                }
                else {
                    swal('No Timetable Info', 'You have not been enrolled in any classes yet.', 'warning');
                }
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
    TimetableComponent.prototype.displayErrorAlert = function (error) {
        swal(error.title, error.msg, 'error');
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NsaWVudC9hcHAvY29tcG9uZW50cy90aW1ldGFibGUvdGltZXRhYmxlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLHNDQUF5RDtBQUN6RCwwQ0FBeUM7QUFDekMsMENBQXlEO0FBRXpELGdEQUErQztBQUMvQyxrRUFBZ0U7QUFDaEUsZ0VBQThEO0FBVTlEO0lBU0UsNEJBQW9CLE1BQWMsRUFBVSxjQUE4QixFQUFVLGFBQTRCLEVBQVUsS0FBcUI7UUFBM0gsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUFVLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUFVLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBQVUsVUFBSyxHQUFMLEtBQUssQ0FBZ0I7UUFQL0ksV0FBTSxHQUFVLEVBQUUsQ0FBQztRQUtuQixZQUFPLEdBQVksS0FBSyxDQUFDO0lBSXpCLENBQUM7SUFFRCxxQ0FBUSxHQUFSO1FBQUEsaUJBK0JDO1FBOUJDLElBQUksV0FBVyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDO1FBQ2xFLElBQUksTUFBTSxHQUFHLFdBQVcsQ0FBQyxNQUFNLENBQUM7UUFFaEMsSUFBSSxXQUFXLENBQUMsUUFBUSxLQUFLLFNBQVMsRUFBRTtZQUN0QyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztZQUNwQixJQUFJLENBQUMsY0FBYztpQkFDaEIsV0FBVyxFQUFFO2lCQUNiLElBQUksQ0FBQyxVQUFBLFFBQVE7Z0JBQ1osSUFBSyxRQUFnQixDQUFDLE1BQU0sS0FBSyxPQUFPLEVBQUU7b0JBQ3hDLEtBQUksQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLENBQUMsQ0FBQztpQkFDbEM7cUJBQU07b0JBQ0wsS0FBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7b0JBQ3pCLEtBQUksQ0FBQyxhQUFhLENBQUMsS0FBSSxDQUFDLGVBQWUsQ0FBQyxD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QUMsVUFBQSxLQUFLO1lBQ1osT0FBTyxDQUFDLEdBQUcsQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDO1FBQzVDLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELDhDQUFpQixHQUFqQixVQUFrQixLQUFLO1FBQ3JCLElBQUksQ0FDRixLQUFLLENBQUMsS0FBSyxFQUNYLEtBQUssQ0FBQyxHQUFHLEVBQ1QsT0FBTyxDQUNSLENBQUM7SUFDSixDQUFDO0lBRUQsbUNBQU0sR0FBTjtRQUNFLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDeEIsQ0FBQztJQXpJUTtRQUFSLFlBQUssRUFBRTtrQ0FBVSxpQkFBTzt1REFBQztJQURmLGtCQUFrQjtRQU45QixnQkFBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLFdBQVc7WUFDckIsV0FBVyxFQUFFLHFEQUFxRDtZQUNsRSxTQUFTLEVBQUUsQ0FBQyxvREFBb0QsQ0FBQztTQUNsRSxDQUFDO3lDQVc0QixlQUFNLEVBQTBCLGdDQUFjLEVBQXlCLDhCQUFhLEVBQWlCLHVCQUFjO09BVHBJLGtCQUFrQixDQTJJOUI7SUFBRCx5QkFBQztDQTNJRCxBQTJJQyxJQUFBO0FBM0lZLGdEQUFrQiIsImZpbGUiOiJhcHAvY29tcG9uZW50cy90aW1ldGFibGUvdGltZXRhYmxlLmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBSb3V0ZXIgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xyXG5pbXBvcnQgeyBBY3RpdmF0ZWRSb3V0ZSwgUGFyYW1zIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuaW1wb3J0IHsgQ291cnNlIH0gZnJvbSBcIi4uLy4uL21vZGVscy9jb3Vyc2VcIjtcclxuaW1wb3J0IHsgU3R1ZGVudCB9IGZyb20gXCIuLi8uLi9tb2RlbHMvU3R1ZGVudFwiO1xyXG5pbXBvcnQgeyBTdHVkZW50U2VydmljZSB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9zdHVkZW50LnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgQ291cnNlU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2NvdXJzZS5zZXJ2aWNlJztcclxuZGVjbGFyZSB2YXIgbW9tZW50OiBhbnk7XHJcbmRlY2xhcmUgdmFyIHN3YWw6IGFueTtcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAndGltZXRhYmxlJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vYXBwL2NvbXBvbmVudHMvdGltZXRhYmxlL3RpbWV0YWJsZS5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vYXBwL2NvbXBvbmVudHMvdGltZXRhYmxlL3RpbWV0YWJsZS5jb21wb25lbnQuY3NzJ11cclxufSlcclxuXHJcbmV4cG9ydCBjbGFzcyBUaW1ldGFibGVDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG4gIEBJbnB1dCgpIHN0dWRlbnQ6IFN0dWRlbnQ7XHJcbiAgZXZlbnRzOiBhbnlbXSA9IFtdO1xyXG4gIGhlYWRlcjogYW55O1xyXG4gIG9wdGlvbnM6IGFueTtcclxuICBzdHVkZW50czogU3R1ZGVudFtdO1xyXG4gIHNlbGVjdGVkU3R1ZGVudDogbnVtYmVyO1xyXG4gIGZhY3VsdHk6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSByb3V0ZXI6IFJvdXRlciwgcHJpdmF0ZSBzdHVkZW50U2VydmljZTogU3R1ZGVudFNlcnZpY2UsIHByaXZhdGUgY291cnNlU2VydmljZTogQ291cnNlU2VydmljZSwgcHJpdmF0ZSByb3V0ZTogQWN0aXZhdGVkUm91dGUpIHtcclxuXHJcbiAgfVxyXG5cclxuICBuZ09uSW5pdCgpIHtcclxuICAgIHZhciBjdXJyZW50VXNlciA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2N1cnJlbnRVc2VyJykpO1xyXG4gICAgdmFyIHVzZXJJRCA9IGN1cnJlbnRVc2VyLnVzZXJJRDtcclxuXHJcbiAgICBpZiAoY3VycmVudFVzZXIudXNlclR5cGUgIT09IFwiU3R1ZGVudFwiKSB7XHJcbiAgICAgIHRoaXMuZmFjdWx0eSA9IHRydWU7XHJcbiAgICAgIHRoaXMuc3R1ZGVudFNlcnZpY2VcclxuICAgICAgICAuZ2V0U3R1ZGVudHMoKVxyXG4gICAgICAgIC50aGVuKHN0dWRlbnRzID0+IHtcclxuICAgICAgICAgIGlmICgoc3R1ZGVudHMgYXMgYW55KS5yZXN1bHQgPT09ICdlcnJvcicpIHtcclxuICAgICAgICAgICAgdGhpcy5kaXNwbGF5RXJyb3JBbGVydChzdHVkZW50cyk7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnN0dWRlbnRzID0gc3R1ZGVudHM7XHJcbiAgICAgICAgICAgIHRoaXMuZ2V0RXZlbnRzQnlJZCh0aGlzLnNlbGVjdGVkU3R1ZGVudFswXS51c2VySUQpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcclxuICAgICAgICAgIC8vIGRvIHNvbWV0aGluZ1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5nZXRFdmVudHNCeUlkKHVzZXJJRCk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5vcHRpb25zID0ge1xyXG4gICAgICBzZWxlY3RhYmxlOiB0cnVlLFxyXG4gICAgICBwcmV2OiAnY2lyY2xlLXRyaWFuZ2xlLXcnLFxyXG4gICAgICBkZWZhdWx0VmlldzogXCJhZ2VuZGFXZWVrXCIsXHJcbiAgICAgIG1pblRpbWU6IFwiMDg6MDA6MDBcIixcclxuICAgICAgbWF4VGltZTogXCIyMjowMDowMFwiLFxyXG4gICAgICBoZWlnaHQ6IFwiYXV0b1wiXHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgb25QcmludCgpIHtcclxuICAgICh3aW5kb3cgYXMgYW55KS5wcmludCgpO1xyXG4gIH1cclxuXHJcbiAgc3R1ZGVudFNlbGVjdCgpIHtcclxuICAgIHN3YWwoe1xyXG4gICAgICB0aXRsZTogJ0xvYWRpbmcuLi4nLFxyXG4gICAgICBhbGxvd091dHNpZGVDbGljazogZmFsc2VcclxuICAgIH0pO1xyXG4gICAgc3dhbC5zaG93TG9hZGluZygpO1xyXG4gICAgdGhpcy5nZXRFdmVudHNCeUlkKHRoaXMuc2VsZWN0ZWRTdHVkZW50KTtcclxuICB9XHJcblxyXG4gIGdldEV2ZW50c0J5SWQodXNlcklEKSB7XHJcbiAgICB0aGlzLmV2ZW50cyA9IFtdO1xyXG4gICAgdGhpcy5zdHVkZW50U2VydmljZVxyXG4gICAgLmdldEV2ZW50c0J5SWQodXNlcklEKVxyXG4gICAgLnRoZW4ocmVzdWx0ID0+IHtcclxuICAgICAgaWYgKChyZXN1bHQgYXMgYW55KS5yZXN1bHQgPT09ICdlcnJvcicpIHtcclxuICAgICAgICB0aGlzLmRpc3BsYXlFcnJvckFsZXJ0KHJlc3VsdCk7XHJcbiAgICAgIH0gZWxzZSBpZiAoKHJlc3VsdCBhcyBhbnkpLnRpdGxlID09PSAnTm8gVGltZXRhYmxlIEluZm8nKSB7XHJcbiAgICAgICAgdmFyIGN1cnJlbnRVc2VyID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnY3VycmVudFVzZXInKSk7XHJcbiAgICAgICAgaWYgKGN1cnJlbnRVc2VyLnVzZXJUeXBlICE9PSBcIlN0dWRlbnRcIikge1xyXG4gICAgICAgICAgc3dhbChcclxuICAgICAgICAgICAgJ05vIFRpbWV0YWJsZSBJbmZvJyxcclxuICAgICAgICAgICAgJ1RoaXMgc3R1ZGVudCBoYXMgbm90IGJlZW4gZW5yb2xsZWQgaW4gYW55IGNsYXNzZXMgeWV0LicsXHJcbiAgICAgICAgICAgICd3YXJuaW5nJ1xyXG4gICAgICAgICAgKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgc3dhbChcclxuICAgICAgICAgICAgJ05vIFRpbWV0YWJsZSBJbmZvJyxcclxuICAgICAgICAgICAgJ1lvdSBoYXZlIG5vdCBiZWVuIGVucm9sbGVkIGluIGFueSBjbGFzc2VzIHlldC4nLFxyXG4gICAgICAgICAgICAnd2FybmluZydcclxuICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJlc3VsdC5mb3JFYWNoKChpKSA9PiB7XHJcbiAgICAgICAgICB2YXIgY2xhc3NEYXkgPSAwO1xyXG5cclxuICAgICAgICAgIGlmIChpLmNsYXNzRGF5ID09PSBcIk1vbmRheVwiKSB7XHJcbiAgICAgICAgICAgIGNsYXNzRGF5ID0gMTtcclxuICAgICAgICAgIH0gZWxzZSBpZiAoaS5jbGFzc0RheSA9PT0gXCJUdWVzZGF5XCIpIHtcclxuICAgICAgICAgICAgY2xhc3NEYXkgPSAyO1xyXG4gICAgICAgICAgfSBlbHNlIGlmIChpLmNsYXNzRGF5ID09PSBcIldlZG5lc2RheVwiKSB7XHJcbiAgICAgICAgICAgIGNsYXNzRGF5ID0gMztcclxuICAgICAgICAgIH0gZWxzZSBpZiAoaS5jbGFzc0RheSA9PT0gXCJUaHVyc2RheVwiKSB7XHJcbiAgICAgICAgICAgIGNsYXNzRGF5ID0gNDtcclxuICAgICAgICAgIH0gZWxzZSBpZiAoaS5jbGFzc0RheSA9PT0gXCJGcmlkYXlcIikge1xyXG4gICAgICAgICAgICBjbGFzc0RheSA9IDU7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgaS5jb3Vyc2VTdGFydCA9IG1vbWVudChpLmNvdXJzZVN0YXJ0KS5mb3JtYXQoJ1lZWVktTU0tREQnKTtcclxuICAgICAgICAgIGkuY291cnNlRW5kID0gbW9tZW50KGkuY291cnNlRW5kKS5mb3JtYXQoJ1lZWVktTU0tREQnKTtcclxuICAgICAgICAgIGkuY2xhc3NTdGFydFRpbWUgPSBtb21lbnQoaS5jbGFzc1N0YXJ0VGltZSkuZm9ybWF0KCdoaDptbSBBJyk7XHJcbiAgICAgICAgICBpLmNsYXNzRW5kVGltZSA9IG1vbWVudChpLmNsYXNzRW5kVGltZSkuZm9ybWF0KCdoaDptbSBBJyk7XHJcblxyXG4gICAgICAgICAgaWYgKGkuY2xhc3NUaW1lU3RyKSB7XHJcbiAgICAgICAgICAgIHZhciBhcnJheSA9IGkuY2xhc3NUaW1lU3RyLnNwbGl0KCcsJyk7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGl0ZW0gb2YgYXJyYXkpIHtcclxuICAgICAgICAgICAgICB2YXIgZGF0ZSA9IGl0ZW0uc3BsaXQoJyAnKTtcclxuICAgICAgICAgICAgICB2YXIgZGF5ID0gZGF0ZVswXTtcclxuICAgICAgICAgICAgICB2YXIgdGltZSA9IGRhdGVbMV07XHJcbiAgICAgICAgICAgICAgdmFyIHN0YXJ0VGltZSA9IHRpbWUuc3BsaXQoJy0nKVswXTtcclxuICAgICAgICAgICAgICB2YXIgZW5kVGltZSA9IHRpbWUuc3BsaXQoJy0nKVsxXTtcclxuICAgICAgICAgICAgICB0aGlzLmV2ZW50cy5wdXNoKFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICBcInRpdGxlXCI6IGkuY291cnNlTmFtZSxcclxuICAgICAgICAgICAgICAgICAgXCJzdGFydFwiOiBkYXkgKyBcIlRcIiArIHN0YXJ0VGltZSxcclxuICAgICAgICAgICAgICAgICAgXCJlbmRcIjogZGF5ICsgXCJUXCIgKyBlbmRUaW1lXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJObyBjbGFzcyBkYXRlIHN0cmluZyBhdmFpbGFibGVcIik7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgc3dhbC5jbG9zZSgpO1xyXG4gICAgICB9XHJcbiAgICB9KS5jYXRjaChlcnJvciA9PiB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3IgZ2V0dGluZyBldmVudHMgYnkgaWRcIik7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGRpc3BsYXlFcnJvckFsZXJ0KGVycm9yKSB7XHJcbiAgICBzd2FsKFxyXG4gICAgICBlcnJvci50aXRsZSxcclxuICAgICAgZXJyb3IubXNnLFxyXG4gICAgICAnZXJyb3InXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgZ29CYWNrKCkge1xyXG4gICAgd2luZG93Lmhpc3RvcnkuYmFjaygpO1xyXG4gIH1cclxufVxyXG4iXX0=
