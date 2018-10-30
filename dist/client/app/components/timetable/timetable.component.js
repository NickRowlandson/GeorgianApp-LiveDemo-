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
const core_1 = require("@angular/core");
const router_1 = require("@angular/router");
const router_2 = require("@angular/router");
const Student_1 = require("../../models/Student");
const student_service_1 = require("../../services/student.service");
const course_service_1 = require("../../services/course.service");
let TimetableComponent = class TimetableComponent {
    constructor(router, studentService, courseService, route) {
        this.router = router;
        this.studentService = studentService;
        this.courseService = courseService;
        this.route = route;
        this.events = [];
        this.faculty = false;
    }
    ngOnInit() {
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        var userID = currentUser.userID;
        if (currentUser.userType !== "Student") {
            this.faculty = true;
            this.studentService
                .getStudents()
                .then(students => {
                if (students.result === 'error') {
                    this.displayErrorAlert(students);
                }
                else {
                    this.students = students;
                    this.getEventsById(this.selectedStudent[0].userID);
                }
            })
                .catch(error => {
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
    }
    onPrint() {
        window.print();
    }
    studentSelect() {
        swal({
            title: 'Loading...',
            allowOutsideClick: false
        });
        swal.showLoading();
        this.getEventsById(this.selectedStudent);
    }
    getEventsById(userID) {
        this.events = [];
        this.studentService
            .getEventsById(userID)
            .then(result => {
            if (result.result === 'error') {
                this.displayErrorAlert(result);
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
                result.forEach((i) => {
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
                        for (let item of array) {
                            var date = item.split(' ');
                            var day = date[0];
                            var time = date[1];
                            var startTime = time.split('-')[0];
                            var endTime = time.split('-')[1];
                            this.events.push({
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
        }).catch(error => {
            console.log("Error getting events by id");
        });
    }
    displayErrorAlert(error) {
        if (error.title === "Auth Error") {
            this.router.navigate(['/login']);
            swal(error.title, error.msg, 'info');
        }
        else {
            swal(error.title, error.msg, 'error');
        }
    }
    goBack() {
        window.history.back();
    }
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
exports.TimetableComponent = TimetableComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NsaWVudC9hcHAvY29tcG9uZW50cy90aW1ldGFibGUvdGltZXRhYmxlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLHdDQUF5RDtBQUN6RCw0Q0FBeUM7QUFDekMsNENBQXlEO0FBRXpELGtEQUErQztBQUMvQyxvRUFBZ0U7QUFDaEUsa0VBQThEO0FBVTlELElBQWEsa0JBQWtCLEdBQS9CO0lBU0UsWUFBb0IsTUFBYyxFQUFVLGNBQThCLEVBQVUsYUFBNEIsRUFBVSxLQUFxQjtRQUEzSCxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQVUsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBQVUsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFBVSxVQUFLLEdBQUwsS0FBSyxDQUFnQjtRQVAvSSxXQUFNLEdBQVUsRUFBRSxDQUFDO1FBS25CLFlBQU8sR0FBWSxLQUFLLENBQUM7SUFJekIsQ0FBQztJQUVELFFBQVE7UUFDTixJQUFJLFdBQVcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztRQUNsRSxJQUFJLE1BQU0sR0FBRyxXQUFXLENBQUMsTUFBTSxDQUFDO1FBRWhDLElBQUksV0FBVyxDQUFDLFFBQVEsS0FBSyxTQUFTLEVBQUU7WUFDdEMsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7WUFDcEIsSUFBSSxDQUFDLGNBQWM7aUJBQ2hCLFdBQVcsRUFBRTtpQkFDYixJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUU7Z0JBQ2YsSUFBSyxRQUFnQixDQUFDLE1BQU0sS0FBSyxPQUFPLEVBQUU7b0JBQ3hDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLENBQUMsQ0FBQztpQkFDbEM7cUJBQU07b0JBQ0wsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7b0JBQ3pCLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FB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QUE0QixDQUFDLENBQUM7UUFDNUMsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsaUJBQWlCLENBQUMsS0FBSztRQUNyQixJQUFJLEtBQUssQ0FBQyxLQUFLLEtBQUssWUFBWSxFQUFFO1lBQ2hDLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztZQUNqQyxJQUFJLENBQ0YsS0FBSyxDQUFDLEtBQUssRUFDWCxLQUFLLENBQUMsR0FBRyxFQUNULE1BQU0sQ0FDUCxDQUFDO1NBQ0g7YUFBTTtZQUNMLElBQUksQ0FDRixLQUFLLENBQUMsS0FBSyxFQUNYLEtBQUssQ0FBQyxHQUFHLEVBQ1QsT0FBTyxDQUNSLENBQUM7U0FDSDtJQUNILENBQUM7SUFFRCxNQUFNO1FBQ0osTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUN4QixDQUFDO0NBQ0YsQ0FBQTtBQW5KVTtJQUFSLFlBQUssRUFBRTs4QkFBVSxpQkFBTzttREFBQztBQURmLGtCQUFrQjtJQU45QixnQkFBUyxDQUFDO1FBQ1QsUUFBUSxFQUFFLFdBQVc7UUFDckIsV0FBVyxFQUFFLHFEQUFxRDtRQUNsRSxTQUFTLEVBQUUsQ0FBQyxvREFBb0QsQ0FBQztLQUNsRSxDQUFDO3FDQVc0QixlQUFNLEVBQTBCLGdDQUFjLEVBQXlCLDhCQUFhLEVBQWlCLHVCQUFjO0dBVHBJLGtCQUFrQixDQW9KOUI7QUFwSlksZ0RBQWtCIiwiZmlsZSI6ImFwcC9jb21wb25lbnRzL3RpbWV0YWJsZS90aW1ldGFibGUuY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcbmltcG9ydCB7IEFjdGl2YXRlZFJvdXRlLCBQYXJhbXMgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xyXG5pbXBvcnQgeyBDb3Vyc2UgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL2NvdXJzZVwiO1xyXG5pbXBvcnQgeyBTdHVkZW50IH0gZnJvbSBcIi4uLy4uL21vZGVscy9TdHVkZW50XCI7XHJcbmltcG9ydCB7IFN0dWRlbnRTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL3N0dWRlbnQuc2VydmljZVwiO1xyXG5pbXBvcnQgeyBDb3Vyc2VTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvY291cnNlLnNlcnZpY2UnO1xyXG5kZWNsYXJlIHZhciBtb21lbnQ6IGFueTtcclxuZGVjbGFyZSB2YXIgc3dhbDogYW55O1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICd0aW1ldGFibGUnLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9hcHAvY29tcG9uZW50cy90aW1ldGFibGUvdGltZXRhYmxlLmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9hcHAvY29tcG9uZW50cy90aW1ldGFibGUvdGltZXRhYmxlLmNvbXBvbmVudC5jc3MnXVxyXG59KVxyXG5cclxuZXhwb3J0IGNsYXNzIFRpbWV0YWJsZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgQElucHV0KCkgc3R1ZGVudDogU3R1ZGVudDtcclxuICBldmVudHM6IGFueVtdID0gW107XHJcbiAgaGVhZGVyOiBhbnk7XHJcbiAgb3B0aW9uczogYW55O1xyXG4gIHN0dWRlbnRzOiBTdHVkZW50W107XHJcbiAgc2VsZWN0ZWRTdHVkZW50OiBudW1iZXI7XHJcbiAgZmFjdWx0eTogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJvdXRlcjogUm91dGVyLCBwcml2YXRlIHN0dWRlbnRTZXJ2aWNlOiBTdHVkZW50U2VydmljZSwgcHJpdmF0ZSBjb3Vyc2VTZXJ2aWNlOiBDb3Vyc2VTZXJ2aWNlLCBwcml2YXRlIHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSkge1xyXG5cclxuICB9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgdmFyIGN1cnJlbnRVc2VyID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnY3VycmVudFVzZXInKSk7XHJcbiAgICB2YXIgdXNlcklEID0gY3VycmVudFVzZXIudXNlcklEO1xyXG5cclxuICAgIGlmIChjdXJyZW50VXNlci51c2VyVHlwZSAhPT0gXCJTdHVkZW50XCIpIHtcclxuICAgICAgdGhpcy5mYWN1bHR5ID0gdHJ1ZTtcclxuICAgICAgdGhpcy5zdHVkZW50U2VydmljZVxyXG4gICAgICAgIC5nZXRTdHVkZW50cygpXHJcbiAgICAgICAgLnRoZW4oc3R1ZGVudHMgPT4ge1xyXG4gICAgICAgICAgaWYgKChzdHVkZW50cyBhcyBhbnkpLnJlc3VsdCA9PT0gJ2Vycm9yJykge1xyXG4gICAgICAgICAgICB0aGlzLmRpc3BsYXlFcnJvckFsZXJ0KHN0dWRlbnRzKTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuc3R1ZGVudHMgPSBzdHVkZW50cztcclxuICAgICAgICAgICAgdGhpcy5nZXRFdmVudHNCeUlkKHRoaXMuc2VsZWN0ZWRTdHVkZW50WzBdLnVzZXJJRCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xyXG4gICAgICAgICAgLy8gZG8gc29tZXRoaW5nXHJcbiAgICAgICAgfSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmdldEV2ZW50c0J5SWQodXNlcklEKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLm9wdGlvbnMgPSB7XHJcbiAgICAgIHNlbGVjdGFibGU6IHRydWUsXHJcbiAgICAgIHByZXY6ICdjaXJjbGUtdHJpYW5nbGUtdycsXHJcbiAgICAgIGRlZmF1bHRWaWV3OiBcImFnZW5kYVdlZWtcIixcclxuICAgICAgbWluVGltZTogXCIwODowMDowMFwiLFxyXG4gICAgICBtYXhUaW1lOiBcIjIyOjAwOjAwXCIsXHJcbiAgICAgIGhlaWdodDogXCJhdXRvXCJcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICBvblByaW50KCkge1xyXG4gICAgKHdpbmRvdyBhcyBhbnkpLnByaW50KCk7XHJcbiAgfVxyXG5cclxuICBzdHVkZW50U2VsZWN0KCkge1xyXG4gICAgc3dhbCh7XHJcbiAgICAgIHRpdGxlOiAnTG9hZGluZy4uLicsXHJcbiAgICAgIGFsbG93T3V0c2lkZUNsaWNrOiBmYWxzZVxyXG4gICAgfSk7XHJcbiAgICBzd2FsLnNob3dMb2FkaW5nKCk7XHJcbiAgICB0aGlzLmdldEV2ZW50c0J5SWQodGhpcy5zZWxlY3RlZFN0dWRlbnQpO1xyXG4gIH1cclxuXHJcbiAgZ2V0RXZlbnRzQnlJZCh1c2VySUQpIHtcclxuICAgIHRoaXMuZXZlbnRzID0gW107XHJcbiAgICB0aGlzLnN0dWRlbnRTZXJ2aWNlXHJcbiAgICAuZ2V0RXZlbnRzQnlJZCh1c2VySUQpXHJcbiAgICAudGhlbihyZXN1bHQgPT4ge1xyXG4gICAgICBpZiAoKHJlc3VsdCBhcyBhbnkpLnJlc3VsdCA9PT0gJ2Vycm9yJykge1xyXG4gICAgICAgIHRoaXMuZGlzcGxheUVycm9yQWxlcnQocmVzdWx0KTtcclxuICAgICAgfSBlbHNlIGlmICgocmVzdWx0IGFzIGFueSkudGl0bGUgPT09ICdObyBUaW1ldGFibGUgSW5mbycpIHtcclxuICAgICAgICB2YXIgY3VycmVudFVzZXIgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdjdXJyZW50VXNlcicpKTtcclxuICAgICAgICBpZiAoY3VycmVudFVzZXIudXNlclR5cGUgIT09IFwiU3R1ZGVudFwiKSB7XHJcbiAgICAgICAgICBzd2FsKFxyXG4gICAgICAgICAgICAnTm8gVGltZXRhYmxlIEluZm8nLFxyXG4gICAgICAgICAgICAnVGhpcyBzdHVkZW50IGhhcyBub3QgYmVlbiBlbnJvbGxlZCBpbiBhbnkgY2xhc3NlcyB5ZXQuJyxcclxuICAgICAgICAgICAgJ3dhcm5pbmcnXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBzd2FsKFxyXG4gICAgICAgICAgICAnTm8gVGltZXRhYmxlIEluZm8nLFxyXG4gICAgICAgICAgICAnWW91IGhhdmUgbm90IGJlZW4gZW5yb2xsZWQgaW4gYW55IGNsYXNzZXMgeWV0LicsXHJcbiAgICAgICAgICAgICd3YXJuaW5nJ1xyXG4gICAgICAgICAgKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmVzdWx0LmZvckVhY2goKGkpID0+IHtcclxuICAgICAgICAgIHZhciBjbGFzc0RheSA9IDA7XHJcblxyXG4gICAgICAgICAgaWYgKGkuY2xhc3NEYXkgPT09IFwiTW9uZGF5XCIpIHtcclxuICAgICAgICAgICAgY2xhc3NEYXkgPSAxO1xyXG4gICAgICAgICAgfSBlbHNlIGlmIChpLmNsYXNzRGF5ID09PSBcIlR1ZXNkYXlcIikge1xyXG4gICAgICAgICAgICBjbGFzc0RheSA9IDI7XHJcbiAgICAgICAgICB9IGVsc2UgaWYgKGkuY2xhc3NEYXkgPT09IFwiV2VkbmVzZGF5XCIpIHtcclxuICAgICAgICAgICAgY2xhc3NEYXkgPSAzO1xyXG4gICAgICAgICAgfSBlbHNlIGlmIChpLmNsYXNzRGF5ID09PSBcIlRodXJzZGF5XCIpIHtcclxuICAgICAgICAgICAgY2xhc3NEYXkgPSA0O1xyXG4gICAgICAgICAgfSBlbHNlIGlmIChpLmNsYXNzRGF5ID09PSBcIkZyaWRheVwiKSB7XHJcbiAgICAgICAgICAgIGNsYXNzRGF5ID0gNTtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBpLmNvdXJzZVN0YXJ0ID0gbW9tZW50KGkuY291cnNlU3RhcnQpLmZvcm1hdCgnWVlZWS1NTS1ERCcpO1xyXG4gICAgICAgICAgaS5jb3Vyc2VFbmQgPSBtb21lbnQoaS5jb3Vyc2VFbmQpLmZvcm1hdCgnWVlZWS1NTS1ERCcpO1xyXG4gICAgICAgICAgaS5jbGFzc1N0YXJ0VGltZSA9IG1vbWVudChpLmNsYXNzU3RhcnRUaW1lKS5mb3JtYXQoJ2hoOm1tIEEnKTtcclxuICAgICAgICAgIGkuY2xhc3NFbmRUaW1lID0gbW9tZW50KGkuY2xhc3NFbmRUaW1lKS5mb3JtYXQoJ2hoOm1tIEEnKTtcclxuXHJcbiAgICAgICAgICBpZiAoaS5jbGFzc1RpbWVTdHIpIHtcclxuICAgICAgICAgICAgdmFyIGFycmF5ID0gaS5jbGFzc1RpbWVTdHIuc3BsaXQoJywnKTtcclxuICAgICAgICAgICAgZm9yIChsZXQgaXRlbSBvZiBhcnJheSkge1xyXG4gICAgICAgICAgICAgIHZhciBkYXRlID0gaXRlbS5zcGxpdCgnICcpO1xyXG4gICAgICAgICAgICAgIHZhciBkYXkgPSBkYXRlWzBdO1xyXG4gICAgICAgICAgICAgIHZhciB0aW1lID0gZGF0ZVsxXTtcclxuICAgICAgICAgICAgICB2YXIgc3RhcnRUaW1lID0gdGltZS5zcGxpdCgnLScpWzBdO1xyXG4gICAgICAgICAgICAgIHZhciBlbmRUaW1lID0gdGltZS5zcGxpdCgnLScpWzFdO1xyXG4gICAgICAgICAgICAgIHRoaXMuZXZlbnRzLnB1c2goXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgIFwidGl0bGVcIjogaS5jb3Vyc2VOYW1lLFxyXG4gICAgICAgICAgICAgICAgICBcInN0YXJ0XCI6IGRheSArIFwiVFwiICsgc3RhcnRUaW1lLFxyXG4gICAgICAgICAgICAgICAgICBcImVuZFwiOiBkYXkgKyBcIlRcIiArIGVuZFRpbWVcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIk5vIGNsYXNzIGRhdGUgc3RyaW5nIGF2YWlsYWJsZVwiKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICBzd2FsLmNsb3NlKCk7XHJcbiAgICAgIH1cclxuICAgIH0pLmNhdGNoKGVycm9yID0+IHtcclxuICAgICAgY29uc29sZS5sb2coXCJFcnJvciBnZXR0aW5nIGV2ZW50cyBieSBpZFwiKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgZGlzcGxheUVycm9yQWxlcnQoZXJyb3IpIHtcclxuICAgIGlmIChlcnJvci50aXRsZSA9PT0gXCJBdXRoIEVycm9yXCIpIHtcclxuICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWycvbG9naW4nXSk7XHJcbiAgICAgIHN3YWwoXHJcbiAgICAgICAgZXJyb3IudGl0bGUsXHJcbiAgICAgICAgZXJyb3IubXNnLFxyXG4gICAgICAgICdpbmZvJ1xyXG4gICAgICApO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgc3dhbChcclxuICAgICAgICBlcnJvci50aXRsZSxcclxuICAgICAgICBlcnJvci5tc2csXHJcbiAgICAgICAgJ2Vycm9yJ1xyXG4gICAgICApO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZ29CYWNrKCkge1xyXG4gICAgd2luZG93Lmhpc3RvcnkuYmFjaygpO1xyXG4gIH1cclxufVxyXG4iXX0=
