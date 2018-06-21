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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NsaWVudC9hcHAvY29tcG9uZW50cy90aW1ldGFibGUvdGltZXRhYmxlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLHNDQUF5RDtBQUN6RCwwQ0FBeUM7QUFDekMsMENBQXlEO0FBRXpELGdEQUErQztBQUMvQyxrRUFBZ0U7QUFDaEUsZ0VBQThEO0FBVTlEO0lBU0UsNEJBQW9CLE1BQWMsRUFBVSxjQUE4QixFQUFVLGFBQTRCLEVBQVUsS0FBcUI7UUFBM0gsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUFVLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUFVLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBQVUsVUFBSyxHQUFMLEtBQUssQ0FBZ0I7UUFQL0ksV0FBTSxHQUFVLEVBQUUsQ0FBQztRQUtuQixZQUFPLEdBQVksS0FBSyxDQUFDO0lBSXpCLENBQUM7SUFFRCxxQ0FBUSxHQUFSO1FBQUEsaUJBK0JDO1FBOUJDLElBQUksV0FBVyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDO1FBQ2xFLElBQUksTUFBTSxHQUFHLFdBQVcsQ0FBQyxNQUFNLENBQUM7UUFFaEMsSUFBSSxXQUFXLENBQUMsUUFBUSxLQUFLLFNBQVMsRUFBRTtZQUN0QyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztZQUNwQixJQUFJLENBQUMsY0FBYztpQkFDaEIsV0FBVyxFQUFFO2lCQUNiLElBQUksQ0FBQyxVQUFBLFFBQVE7Z0JBQ1osSUFBSyxRQUFnQixDQUFDLE1BQU0sS0FBSyxPQUFPLEVBQUU7b0JBQ3hDLEtBQUksQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLENBQUMsQ0FBQztpQkFDbEM7cUJBQU07b0JBQ0wsS0FBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7b0JBQ3pCLEtBQUksQ0FBQyxhQUFhLENBQUMsS0FBSSxDQUFDLGVBQWUsQ0FBQyxD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QUEsS0FBSztZQUNaLE9BQU8sQ0FBQyxHQUFHLENBQUMsNEJBQTRCLENBQUMsQ0FBQztRQUM1QyxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCw4Q0FBaUIsR0FBakIsVUFBa0IsS0FBSztRQUNyQixJQUFJLENBQ0YsS0FBSyxDQUFDLEtBQUssRUFDWCxLQUFLLENBQUMsR0FBRyxFQUNULE9BQU8sQ0FDUixDQUFDO0lBQ0osQ0FBQztJQUVELG1DQUFNLEdBQU47UUFDRSxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ3hCLENBQUM7SUF6SVE7UUFBUixZQUFLLEVBQUU7a0NBQVUsaUJBQU87dURBQUM7SUFEZixrQkFBa0I7UUFOOUIsZ0JBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxXQUFXO1lBQ3JCLFdBQVcsRUFBRSxxREFBcUQ7WUFDbEUsU0FBUyxFQUFFLENBQUMsb0RBQW9ELENBQUM7U0FDbEUsQ0FBQzt5Q0FXNEIsZUFBTSxFQUEwQixnQ0FBYyxFQUF5Qiw4QkFBYSxFQUFpQix1QkFBYztPQVRwSSxrQkFBa0IsQ0EySTlCO0lBQUQseUJBQUM7Q0EzSUQsQUEySUMsSUFBQTtBQTNJWSxnREFBa0IiLCJmaWxlIjoiYXBwL2NvbXBvbmVudHMvdGltZXRhYmxlL3RpbWV0YWJsZS5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuaW1wb3J0IHsgQWN0aXZhdGVkUm91dGUsIFBhcmFtcyB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcbmltcG9ydCB7IENvdXJzZSB9IGZyb20gXCIuLi8uLi9tb2RlbHMvY291cnNlXCI7XHJcbmltcG9ydCB7IFN0dWRlbnQgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL1N0dWRlbnRcIjtcclxuaW1wb3J0IHsgU3R1ZGVudFNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvc3R1ZGVudC5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IENvdXJzZVNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9jb3Vyc2Uuc2VydmljZSc7XHJcbmRlY2xhcmUgdmFyIG1vbWVudDogYW55O1xyXG5kZWNsYXJlIHZhciBzd2FsOiBhbnk7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ3RpbWV0YWJsZScsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL2FwcC9jb21wb25lbnRzL3RpbWV0YWJsZS90aW1ldGFibGUuY29tcG9uZW50Lmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL2FwcC9jb21wb25lbnRzL3RpbWV0YWJsZS90aW1ldGFibGUuY29tcG9uZW50LmNzcyddXHJcbn0pXHJcblxyXG5leHBvcnQgY2xhc3MgVGltZXRhYmxlQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuICBASW5wdXQoKSBzdHVkZW50OiBTdHVkZW50O1xyXG4gIGV2ZW50czogYW55W10gPSBbXTtcclxuICBoZWFkZXI6IGFueTtcclxuICBvcHRpb25zOiBhbnk7XHJcbiAgc3R1ZGVudHM6IFN0dWRlbnRbXTtcclxuICBzZWxlY3RlZFN0dWRlbnQ6IG51bWJlcjtcclxuICBmYWN1bHR5OiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsIHByaXZhdGUgc3R1ZGVudFNlcnZpY2U6IFN0dWRlbnRTZXJ2aWNlLCBwcml2YXRlIGNvdXJzZVNlcnZpY2U6IENvdXJzZVNlcnZpY2UsIHByaXZhdGUgcm91dGU6IEFjdGl2YXRlZFJvdXRlKSB7XHJcblxyXG4gIH1cclxuXHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgICB2YXIgY3VycmVudFVzZXIgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdjdXJyZW50VXNlcicpKTtcclxuICAgIHZhciB1c2VySUQgPSBjdXJyZW50VXNlci51c2VySUQ7XHJcblxyXG4gICAgaWYgKGN1cnJlbnRVc2VyLnVzZXJUeXBlICE9PSBcIlN0dWRlbnRcIikge1xyXG4gICAgICB0aGlzLmZhY3VsdHkgPSB0cnVlO1xyXG4gICAgICB0aGlzLnN0dWRlbnRTZXJ2aWNlXHJcbiAgICAgICAgLmdldFN0dWRlbnRzKClcclxuICAgICAgICAudGhlbihzdHVkZW50cyA9PiB7XHJcbiAgICAgICAgICBpZiAoKHN0dWRlbnRzIGFzIGFueSkucmVzdWx0ID09PSAnZXJyb3InKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZGlzcGxheUVycm9yQWxlcnQoc3R1ZGVudHMpO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5zdHVkZW50cyA9IHN0dWRlbnRzO1xyXG4gICAgICAgICAgICB0aGlzLmdldEV2ZW50c0J5SWQodGhpcy5zZWxlY3RlZFN0dWRlbnRbMF0udXNlcklEKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiB7XHJcbiAgICAgICAgICAvLyBkbyBzb21ldGhpbmdcclxuICAgICAgICB9KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuZ2V0RXZlbnRzQnlJZCh1c2VySUQpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMub3B0aW9ucyA9IHtcclxuICAgICAgc2VsZWN0YWJsZTogdHJ1ZSxcclxuICAgICAgcHJldjogJ2NpcmNsZS10cmlhbmdsZS13JyxcclxuICAgICAgZGVmYXVsdFZpZXc6IFwiYWdlbmRhV2Vla1wiLFxyXG4gICAgICBtaW5UaW1lOiBcIjA4OjAwOjAwXCIsXHJcbiAgICAgIG1heFRpbWU6IFwiMjI6MDA6MDBcIixcclxuICAgICAgaGVpZ2h0OiBcImF1dG9cIlxyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIG9uUHJpbnQoKSB7XHJcbiAgICAod2luZG93IGFzIGFueSkucHJpbnQoKTtcclxuICB9XHJcblxyXG4gIHN0dWRlbnRTZWxlY3QoKSB7XHJcbiAgICBzd2FsKHtcclxuICAgICAgdGl0bGU6ICdMb2FkaW5nLi4uJyxcclxuICAgICAgYWxsb3dPdXRzaWRlQ2xpY2s6IGZhbHNlXHJcbiAgICB9KTtcclxuICAgIHN3YWwuc2hvd0xvYWRpbmcoKTtcclxuICAgIHRoaXMuZ2V0RXZlbnRzQnlJZCh0aGlzLnNlbGVjdGVkU3R1ZGVudCk7XHJcbiAgfVxyXG5cclxuICBnZXRFdmVudHNCeUlkKHVzZXJJRCkge1xyXG4gICAgdGhpcy5ldmVudHMgPSBbXTtcclxuICAgIHRoaXMuc3R1ZGVudFNlcnZpY2VcclxuICAgIC5nZXRFdmVudHNCeUlkKHVzZXJJRClcclxuICAgIC50aGVuKHJlc3VsdCA9PiB7XHJcbiAgICAgIGlmICgocmVzdWx0IGFzIGFueSkucmVzdWx0ID09PSAnZXJyb3InKSB7XHJcbiAgICAgICAgdGhpcy5kaXNwbGF5RXJyb3JBbGVydChyZXN1bHQpO1xyXG4gICAgICB9IGVsc2UgaWYgKChyZXN1bHQgYXMgYW55KS50aXRsZSA9PT0gJ05vIFRpbWV0YWJsZSBJbmZvJykge1xyXG4gICAgICAgIHZhciBjdXJyZW50VXNlciA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2N1cnJlbnRVc2VyJykpO1xyXG4gICAgICAgIGlmIChjdXJyZW50VXNlci51c2VyVHlwZSAhPT0gXCJTdHVkZW50XCIpIHtcclxuICAgICAgICAgIHN3YWwoXHJcbiAgICAgICAgICAgICdObyBUaW1ldGFibGUgSW5mbycsXHJcbiAgICAgICAgICAgICdUaGlzIHN0dWRlbnQgaGFzIG5vdCBiZWVuIGVucm9sbGVkIGluIGFueSBjbGFzc2VzIHlldC4nLFxyXG4gICAgICAgICAgICAnd2FybmluZydcclxuICAgICAgICAgICk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHN3YWwoXHJcbiAgICAgICAgICAgICdObyBUaW1ldGFibGUgSW5mbycsXHJcbiAgICAgICAgICAgICdZb3UgaGF2ZSBub3QgYmVlbiBlbnJvbGxlZCBpbiBhbnkgY2xhc3NlcyB5ZXQuJyxcclxuICAgICAgICAgICAgJ3dhcm5pbmcnXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICByZXN1bHQuZm9yRWFjaCgoaSkgPT4ge1xyXG4gICAgICAgICAgdmFyIGNsYXNzRGF5ID0gMDtcclxuXHJcbiAgICAgICAgICBpZiAoaS5jbGFzc0RheSA9PT0gXCJNb25kYXlcIikge1xyXG4gICAgICAgICAgICBjbGFzc0RheSA9IDE7XHJcbiAgICAgICAgICB9IGVsc2UgaWYgKGkuY2xhc3NEYXkgPT09IFwiVHVlc2RheVwiKSB7XHJcbiAgICAgICAgICAgIGNsYXNzRGF5ID0gMjtcclxuICAgICAgICAgIH0gZWxzZSBpZiAoaS5jbGFzc0RheSA9PT0gXCJXZWRuZXNkYXlcIikge1xyXG4gICAgICAgICAgICBjbGFzc0RheSA9IDM7XHJcbiAgICAgICAgICB9IGVsc2UgaWYgKGkuY2xhc3NEYXkgPT09IFwiVGh1cnNkYXlcIikge1xyXG4gICAgICAgICAgICBjbGFzc0RheSA9IDQ7XHJcbiAgICAgICAgICB9IGVsc2UgaWYgKGkuY2xhc3NEYXkgPT09IFwiRnJpZGF5XCIpIHtcclxuICAgICAgICAgICAgY2xhc3NEYXkgPSA1O1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGkuY291cnNlU3RhcnQgPSBtb21lbnQoaS5jb3Vyc2VTdGFydCkuZm9ybWF0KCdZWVlZLU1NLUREJyk7XHJcbiAgICAgICAgICBpLmNvdXJzZUVuZCA9IG1vbWVudChpLmNvdXJzZUVuZCkuZm9ybWF0KCdZWVlZLU1NLUREJyk7XHJcbiAgICAgICAgICBpLmNsYXNzU3RhcnRUaW1lID0gbW9tZW50KGkuY2xhc3NTdGFydFRpbWUpLmZvcm1hdCgnaGg6bW0gQScpO1xyXG4gICAgICAgICAgaS5jbGFzc0VuZFRpbWUgPSBtb21lbnQoaS5jbGFzc0VuZFRpbWUpLmZvcm1hdCgnaGg6bW0gQScpO1xyXG5cclxuICAgICAgICAgIGlmIChpLmNsYXNzVGltZVN0cikge1xyXG4gICAgICAgICAgICB2YXIgYXJyYXkgPSBpLmNsYXNzVGltZVN0ci5zcGxpdCgnLCcpO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpdGVtIG9mIGFycmF5KSB7XHJcbiAgICAgICAgICAgICAgdmFyIGRhdGUgPSBpdGVtLnNwbGl0KCcgJyk7XHJcbiAgICAgICAgICAgICAgdmFyIGRheSA9IGRhdGVbMF07XHJcbiAgICAgICAgICAgICAgdmFyIHRpbWUgPSBkYXRlWzFdO1xyXG4gICAgICAgICAgICAgIHZhciBzdGFydFRpbWUgPSB0aW1lLnNwbGl0KCctJylbMF07XHJcbiAgICAgICAgICAgICAgdmFyIGVuZFRpbWUgPSB0aW1lLnNwbGl0KCctJylbMV07XHJcbiAgICAgICAgICAgICAgdGhpcy5ldmVudHMucHVzaChcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgXCJ0aXRsZVwiOiBpLmNvdXJzZU5hbWUsXHJcbiAgICAgICAgICAgICAgICAgIFwic3RhcnRcIjogZGF5ICsgXCJUXCIgKyBzdGFydFRpbWUsXHJcbiAgICAgICAgICAgICAgICAgIFwiZW5kXCI6IGRheSArIFwiVFwiICsgZW5kVGltZVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiTm8gY2xhc3MgZGF0ZSBzdHJpbmcgYXZhaWxhYmxlXCIpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHN3YWwuY2xvc2UoKTtcclxuICAgICAgfVxyXG4gICAgfSkuY2F0Y2goZXJyb3IgPT4ge1xyXG4gICAgICBjb25zb2xlLmxvZyhcIkVycm9yIGdldHRpbmcgZXZlbnRzIGJ5IGlkXCIpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBkaXNwbGF5RXJyb3JBbGVydChlcnJvcikge1xyXG4gICAgc3dhbChcclxuICAgICAgZXJyb3IudGl0bGUsXHJcbiAgICAgIGVycm9yLm1zZyxcclxuICAgICAgJ2Vycm9yJ1xyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIGdvQmFjaygpIHtcclxuICAgIHdpbmRvdy5oaXN0b3J5LmJhY2soKTtcclxuICB9XHJcbn1cclxuIl19
