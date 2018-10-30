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
const authentication_service_1 = require("../../services/authentication.service");
const client_service_1 = require("../../services/client.service");
const student_service_1 = require("../../services/student.service");
let DashboardComponent = class DashboardComponent {
    constructor(router, authService, clientService, studentService) {
        this.router = router;
        this.authService = authService;
        this.clientService = clientService;
        this.studentService = studentService;
        //variables used to toggle dahsboard items
        this.clientStatus = false;
        this.manageStudents = false;
        this.manageStaff = false;
        this.suitability = false;
        this.consent = false;
        this.manageCourses = false;
        this.caseNotes = false;
        this.learningStyle = false;
        this.maesdprf = false;
        this.timetable = false;
        this.attendanceList = false;
        this.attendanceReport = false;
        this.files = false;
        this.waitList = false;
        this.siteActivity = false;
    }
    ngOnInit() {
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (!currentUser.active) {
            this.router.navigate(['/reset-password']);
        }
        else {
            var userType = currentUser.userType;
            var userID = currentUser.userID;
            this.checkAuth(userType, userID);
            this.consentForm = true;
            this.learningStyleForm = true;
        }
    }
    checkAuth(userType, userID) {
        this.userType = userType;
        if (userType.indexOf('Admin') >= 0) {
            this.clientStatus = true;
            this.manageStudents = true;
            this.manageStaff = true;
            this.suitability = true;
            this.caseNotes = true;
            this.manageCourses = true;
            this.attendanceReport = true;
            this.attendanceList = true;
            this.timetable = true;
            this.consent = true;
            this.learningStyle = true;
            this.files = true;
            this.waitList = true;
            this.siteActivity = true;
        }
        if (userType.indexOf('Staff') >= 0) {
            this.clientStatus = true;
            this.manageStudents = true;
            this.suitability = true;
            this.timetable = true;
            this.caseNotes = true;
            this.manageCourses = true;
            this.attendanceReport = true;
            this.files = true;
            this.waitList = true;
            this.siteActivity = true;
        }
        if (userType.indexOf('Instructor') >= 0) {
            this.attendanceList = true;
            this.attendanceReport = true;
            this.timetable = true;
            this.caseNotes = true;
        }
        if (userType === 'Student') {
            this.timetable = true;
            this.consent = true;
            this.learningStyle = true;
            this.checkFormStatus(userType, userID);
        }
        if (userType === 'Client') {
            this.consent = true;
            this.learningStyle = true;
            //this.maesdprf = true;
            this.checkFormStatus(userType, userID);
        }
    }
    checkFormStatus(type, userID) {
        swal({
            title: 'Loading...'
        });
        swal.showLoading();
        if (type === 'Client') {
            this.clientService
                .getClient(userID)
                .then(object => {
                if (object.result === "error") {
                    this.client = null;
                    this.displayErrorAlert(object);
                }
                else {
                    this.client = object[0].firstName;
                    this.consentForm = object[0].consent;
                    this.learningStyleForm = object[0].learningStyle;
                    swal.close();
                }
            })
                .catch(error => console.log(error));
        }
        else if (type === 'Student') {
            this.studentService
                .getStudent(userID)
                .then(object => {
                if (object.result === "error") {
                    this.student = null;
                    this.displayErrorAlert(object);
                }
                else {
                    this.student = object.firstName;
                    this.consentForm = object.consent;
                    this.learningStyleForm = object.learningStyle;
                    swal.close();
                }
            })
                .catch(error => console.log(error));
        }
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
};
DashboardComponent = __decorate([
    core_1.Component({
        selector: 'dashboard',
        templateUrl: './app/components/dashboard/dashboard.component.html',
        styleUrls: ['./app/components/dashboard/dashboard.component.css']
    }),
    __metadata("design:paramtypes", [router_1.Router, authentication_service_1.AuthService, client_service_1.ClientService, student_service_1.StudentService])
], DashboardComponent);
exports.DashboardComponent = DashboardComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NsaWVudC9hcHAvY29tcG9uZW50cy9kYXNoYm9hcmQvZGFzaGJvYXJkLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLHdDQUFrRDtBQUNsRCw0Q0FBeUM7QUFDekMsa0ZBQW9FO0FBRXBFLGtFQUE4RDtBQUU5RCxvRUFBZ0U7QUFTaEUsSUFBYSxrQkFBa0IsR0FBL0I7SUEwQkksWUFBb0IsTUFBYyxFQUFVLFdBQXdCLEVBQVUsYUFBNEIsRUFBVyxjQUE4QjtRQUEvSCxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQVUsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFBVSxrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQUFXLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQW5CbkosMENBQTBDO1FBQzFDLGlCQUFZLEdBQUcsS0FBSyxDQUFDO1FBQ3JCLG1CQUFjLEdBQUcsS0FBSyxDQUFDO1FBQ3ZCLGdCQUFXLEdBQUcsS0FBSyxDQUFDO1FBQ3BCLGdCQUFXLEdBQUcsS0FBSyxDQUFDO1FBQ3BCLFlBQU8sR0FBRyxLQUFLLENBQUM7UUFDaEIsa0JBQWEsR0FBRyxLQUFLLENBQUM7UUFDdEIsY0FBUyxHQUFHLEtBQUssQ0FBQztRQUNsQixrQkFBYSxHQUFHLEtBQUssQ0FBQztRQUN0QixhQUFRLEdBQUcsS0FBSyxDQUFDO1FBQ2pCLGNBQVMsR0FBRyxLQUFLLENBQUM7UUFDbEIsbUJBQWMsR0FBRyxLQUFLLENBQUM7UUFDdkIscUJBQWdCLEdBQUcsS0FBSyxDQUFDO1FBQ3pCLFVBQUssR0FBRyxLQUFLLENBQUM7UUFDZCxhQUFRLEdBQUcsS0FBSyxDQUFDO1FBQ2pCLGlCQUFZLEdBQUcsS0FBSyxDQUFDO0lBTXJCLENBQUM7SUFFRCxRQUFRO1FBQ0osSUFBSSxXQUFXLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7UUFDbEUsSUFBSSxDQUFDLFdB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dUIsb0NBQVcsRUFBeUIsOEJBQWEsRUFBMkIsZ0NBQWM7R0ExQjFJLGtCQUFrQixDQW1KOUI7QUFuSlksZ0RBQWtCIiwiZmlsZSI6ImFwcC9jb21wb25lbnRzL2Rhc2hib2FyZC9kYXNoYm9hcmQuY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuaW1wb3J0IHsgQXV0aFNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9hdXRoZW50aWNhdGlvbi5zZXJ2aWNlJztcclxuaW1wb3J0IHsgQ2xpZW50IH0gZnJvbSBcIi4uLy4uL21vZGVscy9jbGllbnRcIjtcclxuaW1wb3J0IHsgQ2xpZW50U2VydmljZSB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9jbGllbnQuc2VydmljZVwiO1xyXG5pbXBvcnQgeyBTdHVkZW50IH0gZnJvbSBcIi4uLy4uL21vZGVscy9zdHVkZW50XCI7XHJcbmltcG9ydCB7IFN0dWRlbnRTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL3N0dWRlbnQuc2VydmljZVwiO1xyXG5kZWNsYXJlIHZhciBzd2FsOiBhbnk7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiAnZGFzaGJvYXJkJyxcclxuICAgIHRlbXBsYXRlVXJsOiAnLi9hcHAvY29tcG9uZW50cy9kYXNoYm9hcmQvZGFzaGJvYXJkLmNvbXBvbmVudC5odG1sJyxcclxuICAgIHN0eWxlVXJsczogWycuL2FwcC9jb21wb25lbnRzL2Rhc2hib2FyZC9kYXNoYm9hcmQuY29tcG9uZW50LmNzcyddXHJcbn0pXHJcblxyXG5leHBvcnQgY2xhc3MgRGFzaGJvYXJkQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuICAgIGNsaWVudDogQ2xpZW50W107XHJcbiAgICBzdHVkZW50OiBTdHVkZW50W107XHJcblxyXG4gICAgY29uc2VudEZvcm06IGJvb2xlYW47XHJcbiAgICBsZWFybmluZ1N0eWxlRm9ybTogYm9vbGVhbjtcclxuXHJcbiAgICAvL3ZhcmlhYmxlcyB1c2VkIHRvIHRvZ2dsZSBkYWhzYm9hcmQgaXRlbXNcclxuICAgIGNsaWVudFN0YXR1cyA9IGZhbHNlO1xyXG4gICAgbWFuYWdlU3R1ZGVudHMgPSBmYWxzZTtcclxuICAgIG1hbmFnZVN0YWZmID0gZmFsc2U7XHJcbiAgICBzdWl0YWJpbGl0eSA9IGZhbHNlO1xyXG4gICAgY29uc2VudCA9IGZhbHNlO1xyXG4gICAgbWFuYWdlQ291cnNlcyA9IGZhbHNlO1xyXG4gICAgY2FzZU5vdGVzID0gZmFsc2U7XHJcbiAgICBsZWFybmluZ1N0eWxlID0gZmFsc2U7XHJcbiAgICBtYWVzZHByZiA9IGZhbHNlO1xyXG4gICAgdGltZXRhYmxlID0gZmFsc2U7XHJcbiAgICBhdHRlbmRhbmNlTGlzdCA9IGZhbHNlO1xyXG4gICAgYXR0ZW5kYW5jZVJlcG9ydCA9IGZhbHNlO1xyXG4gICAgZmlsZXMgPSBmYWxzZTtcclxuICAgIHdhaXRMaXN0ID0gZmFsc2U7XHJcbiAgICBzaXRlQWN0aXZpdHkgPSBmYWxzZTtcclxuXHJcbiAgICB1c2VyVHlwZTogYW55O1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsIHByaXZhdGUgYXV0aFNlcnZpY2U6IEF1dGhTZXJ2aWNlLCBwcml2YXRlIGNsaWVudFNlcnZpY2U6IENsaWVudFNlcnZpY2UsICBwcml2YXRlIHN0dWRlbnRTZXJ2aWNlOiBTdHVkZW50U2VydmljZSkge1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBuZ09uSW5pdCgpIHtcclxuICAgICAgICB2YXIgY3VycmVudFVzZXIgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdjdXJyZW50VXNlcicpKTtcclxuICAgICAgICBpZiAoIWN1cnJlbnRVc2VyLmFjdGl2ZSkge1xyXG4gICAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWycvcmVzZXQtcGFzc3dvcmQnXSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHZhciB1c2VyVHlwZSA9IGN1cnJlbnRVc2VyLnVzZXJUeXBlO1xyXG4gICAgICAgICAgdmFyIHVzZXJJRCA9IGN1cnJlbnRVc2VyLnVzZXJJRDtcclxuICAgICAgICAgIHRoaXMuY2hlY2tBdXRoKHVzZXJUeXBlLCB1c2VySUQpO1xyXG4gICAgICAgICAgdGhpcy5jb25zZW50Rm9ybSA9IHRydWU7XHJcbiAgICAgICAgICB0aGlzLmxlYXJuaW5nU3R5bGVGb3JtID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY2hlY2tBdXRoKHVzZXJUeXBlLCB1c2VySUQpIHtcclxuICAgICAgICB0aGlzLnVzZXJUeXBlID0gdXNlclR5cGU7XHJcbiAgICAgICAgaWYgKHVzZXJUeXBlLmluZGV4T2YoJ0FkbWluJykgPj0gMCkge1xyXG4gICAgICAgICAgICB0aGlzLmNsaWVudFN0YXR1cyA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMubWFuYWdlU3R1ZGVudHMgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLm1hbmFnZVN0YWZmID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5zdWl0YWJpbGl0eSA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuY2FzZU5vdGVzID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5tYW5hZ2VDb3Vyc2VzID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5hdHRlbmRhbmNlUmVwb3J0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5hdHRlbmRhbmNlTGlzdCA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMudGltZXRhYmxlID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5jb25zZW50ID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5sZWFybmluZ1N0eWxlID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5maWxlcyA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMud2FpdExpc3QgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLnNpdGVBY3Rpdml0eSA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh1c2VyVHlwZS5pbmRleE9mKCdTdGFmZicpID49IDApIHtcclxuICAgICAgICAgICAgdGhpcy5jbGllbnRTdGF0dXMgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLm1hbmFnZVN0dWRlbnRzID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5zdWl0YWJpbGl0eSA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMudGltZXRhYmxlID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5jYXNlTm90ZXMgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLm1hbmFnZUNvdXJzZXMgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLmF0dGVuZGFuY2VSZXBvcnQgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLmZpbGVzID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy53YWl0TGlzdCA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuc2l0ZUFjdGl2aXR5ID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHVzZXJUeXBlLmluZGV4T2YoJ0luc3RydWN0b3InKSA+PSAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYXR0ZW5kYW5jZUxpc3QgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLmF0dGVuZGFuY2VSZXBvcnQgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLnRpbWV0YWJsZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuY2FzZU5vdGVzID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHVzZXJUeXBlID09PSAnU3R1ZGVudCcpIHtcclxuICAgICAgICAgICAgdGhpcy50aW1ldGFibGUgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLmNvbnNlbnQgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLmxlYXJuaW5nU3R5bGUgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLmNoZWNrRm9ybVN0YXR1cyh1c2VyVHlwZSwgdXNlcklEKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHVzZXJUeXBlID09PSAnQ2xpZW50Jykge1xyXG4gICAgICAgICAgICB0aGlzLmNvbnNlbnQgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLmxlYXJuaW5nU3R5bGUgPSB0cnVlO1xyXG4gICAgICAgICAgICAvL3RoaXMubWFlc2RwcmYgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLmNoZWNrRm9ybVN0YXR1cyh1c2VyVHlwZSwgdXNlcklEKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY2hlY2tGb3JtU3RhdHVzKHR5cGUsIHVzZXJJRCkge1xyXG4gICAgICBzd2FsKHtcclxuICAgICAgICB0aXRsZTogJ0xvYWRpbmcuLi4nXHJcbiAgICAgIH0pO1xyXG4gICAgICBzd2FsLnNob3dMb2FkaW5nKCk7XHJcbiAgICAgIGlmICh0eXBlID09PSAnQ2xpZW50Jykge1xyXG4gICAgICAgIHRoaXMuY2xpZW50U2VydmljZVxyXG4gICAgICAgICAgICAuZ2V0Q2xpZW50KHVzZXJJRClcclxuICAgICAgICAgICAgLnRoZW4ob2JqZWN0ID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICgob2JqZWN0IGFzIGFueSkucmVzdWx0ID09PSBcImVycm9yXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNsaWVudCA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kaXNwbGF5RXJyb3JBbGVydChvYmplY3QpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNsaWVudCA9IG9iamVjdFswXS5maXJzdE5hbWU7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb25zZW50Rm9ybSA9IG9iamVjdFswXS5jb25zZW50O1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubGVhcm5pbmdTdHlsZUZvcm0gPSBvYmplY3RbMF0ubGVhcm5pbmdTdHlsZTtcclxuICAgICAgICAgICAgICAgICAgICBzd2FsLmNsb3NlKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5jYXRjaChlcnJvciA9PiBjb25zb2xlLmxvZyhlcnJvcikpO1xyXG4gICAgICB9IGVsc2UgaWYgKHR5cGUgPT09ICdTdHVkZW50Jykge1xyXG4gICAgICAgIHRoaXMuc3R1ZGVudFNlcnZpY2VcclxuICAgICAgICAgICAgLmdldFN0dWRlbnQodXNlcklEKVxyXG4gICAgICAgICAgICAudGhlbihvYmplY3QgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKChvYmplY3QgYXMgYW55KS5yZXN1bHQgPT09IFwiZXJyb3JcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3R1ZGVudCA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kaXNwbGF5RXJyb3JBbGVydChvYmplY3QpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0dWRlbnQgPSBvYmplY3QuZmlyc3ROYW1lO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29uc2VudEZvcm0gPSBvYmplY3QuY29uc2VudDtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmxlYXJuaW5nU3R5bGVGb3JtID0gb2JqZWN0LmxlYXJuaW5nU3R5bGU7XHJcbiAgICAgICAgICAgICAgICAgICAgc3dhbC5jbG9zZSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuY2F0Y2goZXJyb3IgPT4gY29uc29sZS5sb2coZXJyb3IpKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGRpc3BsYXlFcnJvckFsZXJ0KGVycm9yKSB7XHJcbiAgICAgIGlmIChlcnJvci50aXRsZSA9PT0gXCJBdXRoIEVycm9yXCIpIHtcclxuICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJy9sb2dpbiddKTtcclxuICAgICAgICBzd2FsKFxyXG4gICAgICAgICAgZXJyb3IudGl0bGUsXHJcbiAgICAgICAgICBlcnJvci5tc2csXHJcbiAgICAgICAgICAnaW5mbydcclxuICAgICAgICApO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHN3YWwoXHJcbiAgICAgICAgICBlcnJvci50aXRsZSxcclxuICAgICAgICAgIGVycm9yLm1zZyxcclxuICAgICAgICAgICdlcnJvcidcclxuICAgICAgICApO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbn1cclxuIl19
