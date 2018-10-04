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
        swal(error.title, error.msg, 'error');
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NsaWVudC9hcHAvY29tcG9uZW50cy90aW1ldGFibGUvdGltZXRhYmxlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLHdDQUF5RDtBQUN6RCw0Q0FBeUM7QUFDekMsNENBQXlEO0FBRXpELGtEQUErQztBQUMvQyxvRUFBZ0U7QUFDaEUsa0VBQThEO0FBVTlELElBQWEsa0JBQWtCLEdBQS9CO0lBU0UsWUFBb0IsTUFBYyxFQUFVLGNBQThCLEVBQVUsYUFBNEIsRUFBVSxLQUFxQjtRQUEzSCxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQVUsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBQVUsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFBVSxVQUFLLEdBQUwsS0FBSyxDQUFnQjtRQVAvSSxXQUFNLEdBQVUsRUFBRSxDQUFDO1FBS25CLFlBQU8sR0FBWSxLQUFLLENBQUM7SUFJekIsQ0FBQztJQUVELFFBQVE7UUFDTixJQUFJLFdBQVcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztRQUNsRSxJQUFJLE1BQU0sR0FBRyxXQUFXLENBQUMsTUFBTSxDQUFDO1FBRWhDLElBQUksV0FBVyxDQUFDLFFBQVEsS0FBSyxTQUFTLEVBQUU7WUFDdEMsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7WUFDcEIsSUFBSSxDQUFDLGNBQWM7aUJBQ2hCLFdBQVcsRUFBRTtpQkFDYixJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUU7Z0JBQ2YsSUFBSyxRQUFnQixDQUFDLE1BQU0sS0FBSyxPQUFPLEVBQUU7b0JBQ3hDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLENBQUMsQ0FBQztpQkFDbEM7cUJBQU07b0JBQ0wsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7b0JBQ3pCLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FB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QUE0QixDQUFDLENBQUM7UUFDNUMsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsaUJBQWlCLENBQUMsS0FBSztRQUNyQixJQUFJLENBQ0YsS0FBSyxDQUFDLEtBQUssRUFDWCxLQUFLLENBQUMsR0FBRyxFQUNULE9BQU8sQ0FDUixDQUFDO0lBQ0osQ0FBQztJQUVELE1BQU07UUFDSixNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ3hCLENBQUM7Q0FDRixDQUFBO0FBMUlVO0lBQVIsWUFBSyxFQUFFOzhCQUFVLGlCQUFPO21EQUFDO0FBRGYsa0JBQWtCO0lBTjlCLGdCQUFTLENBQUM7UUFDVCxRQUFRLEVBQUUsV0FBVztRQUNyQixXQUFXLEVBQUUscURBQXFEO1FBQ2xFLFNBQVMsRUFBRSxDQUFDLG9EQUFvRCxDQUFDO0tBQ2xFLENBQUM7cUNBVzRCLGVBQU0sRUFBMEIsZ0NBQWMsRUFBeUIsOEJBQWEsRUFBaUIsdUJBQWM7R0FUcEksa0JBQWtCLENBMkk5QjtBQTNJWSxnREFBa0IiLCJmaWxlIjoiYXBwL2NvbXBvbmVudHMvdGltZXRhYmxlL3RpbWV0YWJsZS5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuaW1wb3J0IHsgQWN0aXZhdGVkUm91dGUsIFBhcmFtcyB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcbmltcG9ydCB7IENvdXJzZSB9IGZyb20gXCIuLi8uLi9tb2RlbHMvY291cnNlXCI7XHJcbmltcG9ydCB7IFN0dWRlbnQgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL1N0dWRlbnRcIjtcclxuaW1wb3J0IHsgU3R1ZGVudFNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvc3R1ZGVudC5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IENvdXJzZVNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9jb3Vyc2Uuc2VydmljZSc7XHJcbmRlY2xhcmUgdmFyIG1vbWVudDogYW55O1xyXG5kZWNsYXJlIHZhciBzd2FsOiBhbnk7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ3RpbWV0YWJsZScsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL2FwcC9jb21wb25lbnRzL3RpbWV0YWJsZS90aW1ldGFibGUuY29tcG9uZW50Lmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL2FwcC9jb21wb25lbnRzL3RpbWV0YWJsZS90aW1ldGFibGUuY29tcG9uZW50LmNzcyddXHJcbn0pXHJcblxyXG5leHBvcnQgY2xhc3MgVGltZXRhYmxlQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuICBASW5wdXQoKSBzdHVkZW50OiBTdHVkZW50O1xyXG4gIGV2ZW50czogYW55W10gPSBbXTtcclxuICBoZWFkZXI6IGFueTtcclxuICBvcHRpb25zOiBhbnk7XHJcbiAgc3R1ZGVudHM6IFN0dWRlbnRbXTtcclxuICBzZWxlY3RlZFN0dWRlbnQ6IG51bWJlcjtcclxuICBmYWN1bHR5OiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsIHByaXZhdGUgc3R1ZGVudFNlcnZpY2U6IFN0dWRlbnRTZXJ2aWNlLCBwcml2YXRlIGNvdXJzZVNlcnZpY2U6IENvdXJzZVNlcnZpY2UsIHByaXZhdGUgcm91dGU6IEFjdGl2YXRlZFJvdXRlKSB7XHJcblxyXG4gIH1cclxuXHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgICB2YXIgY3VycmVudFVzZXIgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdjdXJyZW50VXNlcicpKTtcclxuICAgIHZhciB1c2VySUQgPSBjdXJyZW50VXNlci51c2VySUQ7XHJcblxyXG4gICAgaWYgKGN1cnJlbnRVc2VyLnVzZXJUeXBlICE9PSBcIlN0dWRlbnRcIikge1xyXG4gICAgICB0aGlzLmZhY3VsdHkgPSB0cnVlO1xyXG4gICAgICB0aGlzLnN0dWRlbnRTZXJ2aWNlXHJcbiAgICAgICAgLmdldFN0dWRlbnRzKClcclxuICAgICAgICAudGhlbihzdHVkZW50cyA9PiB7XHJcbiAgICAgICAgICBpZiAoKHN0dWRlbnRzIGFzIGFueSkucmVzdWx0ID09PSAnZXJyb3InKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZGlzcGxheUVycm9yQWxlcnQoc3R1ZGVudHMpO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5zdHVkZW50cyA9IHN0dWRlbnRzO1xyXG4gICAgICAgICAgICB0aGlzLmdldEV2ZW50c0J5SWQodGhpcy5zZWxlY3RlZFN0dWRlbnRbMF0udXNlcklEKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiB7XHJcbiAgICAgICAgICAvLyBkbyBzb21ldGhpbmdcclxuICAgICAgICB9KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuZ2V0RXZlbnRzQnlJZCh1c2VySUQpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMub3B0aW9ucyA9IHtcclxuICAgICAgc2VsZWN0YWJsZTogdHJ1ZSxcclxuICAgICAgcHJldjogJ2NpcmNsZS10cmlhbmdsZS13JyxcclxuICAgICAgZGVmYXVsdFZpZXc6IFwiYWdlbmRhV2Vla1wiLFxyXG4gICAgICBtaW5UaW1lOiBcIjA4OjAwOjAwXCIsXHJcbiAgICAgIG1heFRpbWU6IFwiMjI6MDA6MDBcIixcclxuICAgICAgaGVpZ2h0OiBcImF1dG9cIlxyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIG9uUHJpbnQoKSB7XHJcbiAgICAod2luZG93IGFzIGFueSkucHJpbnQoKTtcclxuICB9XHJcblxyXG4gIHN0dWRlbnRTZWxlY3QoKSB7XHJcbiAgICBzd2FsKHtcclxuICAgICAgdGl0bGU6ICdMb2FkaW5nLi4uJyxcclxuICAgICAgYWxsb3dPdXRzaWRlQ2xpY2s6IGZhbHNlXHJcbiAgICB9KTtcclxuICAgIHN3YWwuc2hvd0xvYWRpbmcoKTtcclxuICAgIHRoaXMuZ2V0RXZlbnRzQnlJZCh0aGlzLnNlbGVjdGVkU3R1ZGVudCk7XHJcbiAgfVxyXG5cclxuICBnZXRFdmVudHNCeUlkKHVzZXJJRCkge1xyXG4gICAgdGhpcy5ldmVudHMgPSBbXTtcclxuICAgIHRoaXMuc3R1ZGVudFNlcnZpY2VcclxuICAgIC5nZXRFdmVudHNCeUlkKHVzZXJJRClcclxuICAgIC50aGVuKHJlc3VsdCA9PiB7XHJcbiAgICAgIGlmICgocmVzdWx0IGFzIGFueSkucmVzdWx0ID09PSAnZXJyb3InKSB7XHJcbiAgICAgICAgdGhpcy5kaXNwbGF5RXJyb3JBbGVydChyZXN1bHQpO1xyXG4gICAgICB9IGVsc2UgaWYgKChyZXN1bHQgYXMgYW55KS50aXRsZSA9PT0gJ05vIFRpbWV0YWJsZSBJbmZvJykge1xyXG4gICAgICAgIHZhciBjdXJyZW50VXNlciA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2N1cnJlbnRVc2VyJykpO1xyXG4gICAgICAgIGlmIChjdXJyZW50VXNlci51c2VyVHlwZSAhPT0gXCJTdHVkZW50XCIpIHtcclxuICAgICAgICAgIHN3YWwoXHJcbiAgICAgICAgICAgICdObyBUaW1ldGFibGUgSW5mbycsXHJcbiAgICAgICAgICAgICdUaGlzIHN0dWRlbnQgaGFzIG5vdCBiZWVuIGVucm9sbGVkIGluIGFueSBjbGFzc2VzIHlldC4nLFxyXG4gICAgICAgICAgICAnd2FybmluZydcclxuICAgICAgICAgICk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHN3YWwoXHJcbiAgICAgICAgICAgICdObyBUaW1ldGFibGUgSW5mbycsXHJcbiAgICAgICAgICAgICdZb3UgaGF2ZSBub3QgYmVlbiBlbnJvbGxlZCBpbiBhbnkgY2xhc3NlcyB5ZXQuJyxcclxuICAgICAgICAgICAgJ3dhcm5pbmcnXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICByZXN1bHQuZm9yRWFjaCgoaSkgPT4ge1xyXG4gICAgICAgICAgdmFyIGNsYXNzRGF5ID0gMDtcclxuXHJcbiAgICAgICAgICBpZiAoaS5jbGFzc0RheSA9PT0gXCJNb25kYXlcIikge1xyXG4gICAgICAgICAgICBjbGFzc0RheSA9IDE7XHJcbiAgICAgICAgICB9IGVsc2UgaWYgKGkuY2xhc3NEYXkgPT09IFwiVHVlc2RheVwiKSB7XHJcbiAgICAgICAgICAgIGNsYXNzRGF5ID0gMjtcclxuICAgICAgICAgIH0gZWxzZSBpZiAoaS5jbGFzc0RheSA9PT0gXCJXZWRuZXNkYXlcIikge1xyXG4gICAgICAgICAgICBjbGFzc0RheSA9IDM7XHJcbiAgICAgICAgICB9IGVsc2UgaWYgKGkuY2xhc3NEYXkgPT09IFwiVGh1cnNkYXlcIikge1xyXG4gICAgICAgICAgICBjbGFzc0RheSA9IDQ7XHJcbiAgICAgICAgICB9IGVsc2UgaWYgKGkuY2xhc3NEYXkgPT09IFwiRnJpZGF5XCIpIHtcclxuICAgICAgICAgICAgY2xhc3NEYXkgPSA1O1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGkuY291cnNlU3RhcnQgPSBtb21lbnQoaS5jb3Vyc2VTdGFydCkuZm9ybWF0KCdZWVlZLU1NLUREJyk7XHJcbiAgICAgICAgICBpLmNvdXJzZUVuZCA9IG1vbWVudChpLmNvdXJzZUVuZCkuZm9ybWF0KCdZWVlZLU1NLUREJyk7XHJcbiAgICAgICAgICBpLmNsYXNzU3RhcnRUaW1lID0gbW9tZW50KGkuY2xhc3NTdGFydFRpbWUpLmZvcm1hdCgnaGg6bW0gQScpO1xyXG4gICAgICAgICAgaS5jbGFzc0VuZFRpbWUgPSBtb21lbnQoaS5jbGFzc0VuZFRpbWUpLmZvcm1hdCgnaGg6bW0gQScpO1xyXG5cclxuICAgICAgICAgIGlmIChpLmNsYXNzVGltZVN0cikge1xyXG4gICAgICAgICAgICB2YXIgYXJyYXkgPSBpLmNsYXNzVGltZVN0ci5zcGxpdCgnLCcpO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpdGVtIG9mIGFycmF5KSB7XHJcbiAgICAgICAgICAgICAgdmFyIGRhdGUgPSBpdGVtLnNwbGl0KCcgJyk7XHJcbiAgICAgICAgICAgICAgdmFyIGRheSA9IGRhdGVbMF07XHJcbiAgICAgICAgICAgICAgdmFyIHRpbWUgPSBkYXRlWzFdO1xyXG4gICAgICAgICAgICAgIHZhciBzdGFydFRpbWUgPSB0aW1lLnNwbGl0KCctJylbMF07XHJcbiAgICAgICAgICAgICAgdmFyIGVuZFRpbWUgPSB0aW1lLnNwbGl0KCctJylbMV07XHJcbiAgICAgICAgICAgICAgdGhpcy5ldmVudHMucHVzaChcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgXCJ0aXRsZVwiOiBpLmNvdXJzZU5hbWUsXHJcbiAgICAgICAgICAgICAgICAgIFwic3RhcnRcIjogZGF5ICsgXCJUXCIgKyBzdGFydFRpbWUsXHJcbiAgICAgICAgICAgICAgICAgIFwiZW5kXCI6IGRheSArIFwiVFwiICsgZW5kVGltZVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiTm8gY2xhc3MgZGF0ZSBzdHJpbmcgYXZhaWxhYmxlXCIpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHN3YWwuY2xvc2UoKTtcclxuICAgICAgfVxyXG4gICAgfSkuY2F0Y2goZXJyb3IgPT4ge1xyXG4gICAgICBjb25zb2xlLmxvZyhcIkVycm9yIGdldHRpbmcgZXZlbnRzIGJ5IGlkXCIpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBkaXNwbGF5RXJyb3JBbGVydChlcnJvcikge1xyXG4gICAgc3dhbChcclxuICAgICAgZXJyb3IudGl0bGUsXHJcbiAgICAgIGVycm9yLm1zZyxcclxuICAgICAgJ2Vycm9yJ1xyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIGdvQmFjaygpIHtcclxuICAgIHdpbmRvdy5oaXN0b3J5LmJhY2soKTtcclxuICB9XHJcbn1cclxuIl19
