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
        swal(error.title, error.msg, 'error');
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NsaWVudC9hcHAvY29tcG9uZW50cy9kYXNoYm9hcmQvZGFzaGJvYXJkLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLHdDQUFrRDtBQUNsRCw0Q0FBeUM7QUFDekMsa0ZBQW9FO0FBRXBFLGtFQUE4RDtBQUU5RCxvRUFBZ0U7QUFTaEUsSUFBYSxrQkFBa0IsR0FBL0I7SUEwQkksWUFBb0IsTUFBYyxFQUFVLFdBQXdCLEVBQVUsYUFBNEIsRUFBVyxjQUE4QjtRQUEvSCxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQVUsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFBVSxrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQUFXLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQW5CbkosMENBQTBDO1FBQzFDLGlCQUFZLEdBQUcsS0FBSyxDQUFDO1FBQ3JCLG1CQUFjLEdBQUcsS0FBSyxDQUFDO1FBQ3ZCLGdCQUFXLEdBQUcsS0FBSyxDQUFDO1FBQ3BCLGdCQUFXLEdBQUcsS0FBSyxDQUFDO1FBQ3BCLFlBQU8sR0FBRyxLQUFLLENBQUM7UUFDaEIsa0JBQWEsR0FBRyxLQUFLLENBQUM7UUFDdEIsY0FBUyxHQUFHLEtBQUssQ0FBQztRQUNsQixrQkFBYSxHQUFHLEtBQUssQ0FBQztRQUN0QixhQUFRLEdBQUcsS0FBSyxDQUFDO1FBQ2pCLGNBQVMsR0FBRyxLQUFLLENBQUM7UUFDbEIsbUJBQWMsR0FBRyxLQUFLLENBQUM7UUFDdkIscUJBQWdCLEdBQUcsS0FBSyxDQUFDO1FBQ3pCLFVBQUssR0FBRyxLQUFLLENBQUM7UUFDZCxhQUFRLEdBQUcsS0FBSyxDQUFDO1FBQ2pCLGlCQUFZLEdBQUcsS0FBSyxDQUFDO0lBTXJCLENBQUM7SUFFRCxRQUFRO1FBQ0osSUFBSSxXQUFXLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7UUFDbEUsSUFBSSxDQUFDLFdB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QyxNQUFNLENBQUM7aUJBQ2xCLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRTtnQkFDWCxJQUFLLE1BQWMsQ0FBQyxNQUFNLEtBQUssT0FBTyxFQUFFO29CQUNwQyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztvQkFDcEIsSUFBSSxDQUFDLGlCQUFpQixDQUFDLE1BQU0sQ0FBQyxDQUFDO2lCQUNsQztxQkFBTTtvQkFDSCxJQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQUM7b0JBQ2hDLElBQUksQ0FBQyxXQUFXLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQztvQkFDbEMsSUFBSSxDQUFDLGlCQUFpQixHQUFHLE1BQU0sQ0FBQyxhQUFhLENBQUM7b0JBQzlDLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztpQkFDaEI7WUFDTCxDQUFDLENBQUM7aUJBQ0QsS0FBSyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1NBQ3pDO0lBQ0gsQ0FBQztJQUVELGlCQUFpQixDQUFDLEtBQUs7UUFDckIsSUFBSSxDQUNGLEtBQUssQ0FBQyxLQUFLLEVBQ1gsS0FBSyxDQUFDLEdBQUcsRUFDVCxPQUFPLENBQ1IsQ0FBQztJQUNKLENBQUM7Q0FDSixDQUFBO0FBMUlZLGtCQUFrQjtJQU45QixnQkFBUyxDQUFDO1FBQ1AsUUFBUSxFQUFFLFdBQVc7UUFDckIsV0FBVyxFQUFFLHFEQUFxRDtRQUNsRSxTQUFTLEVBQUUsQ0FBQyxvREFBb0QsQ0FBQztLQUNwRSxDQUFDO3FDQTRCOEIsZUFBTSxFQUF1QixvQ0FBVyxFQUF5Qiw4QkFBYSxFQUEyQixnQ0FBYztHQTFCMUksa0JBQWtCLENBMEk5QjtBQTFJWSxnREFBa0IiLCJmaWxlIjoiYXBwL2NvbXBvbmVudHMvZGFzaGJvYXJkL2Rhc2hib2FyZC5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBSb3V0ZXIgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xyXG5pbXBvcnQgeyBBdXRoU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2F1dGhlbnRpY2F0aW9uLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBDbGllbnQgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL2NsaWVudFwiO1xyXG5pbXBvcnQgeyBDbGllbnRTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL2NsaWVudC5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IFN0dWRlbnQgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL3N0dWRlbnRcIjtcclxuaW1wb3J0IHsgU3R1ZGVudFNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvc3R1ZGVudC5zZXJ2aWNlXCI7XHJcbmRlY2xhcmUgdmFyIHN3YWw6IGFueTtcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6ICdkYXNoYm9hcmQnLFxyXG4gICAgdGVtcGxhdGVVcmw6ICcuL2FwcC9jb21wb25lbnRzL2Rhc2hib2FyZC9kYXNoYm9hcmQuY29tcG9uZW50Lmh0bWwnLFxyXG4gICAgc3R5bGVVcmxzOiBbJy4vYXBwL2NvbXBvbmVudHMvZGFzaGJvYXJkL2Rhc2hib2FyZC5jb21wb25lbnQuY3NzJ11cclxufSlcclxuXHJcbmV4cG9ydCBjbGFzcyBEYXNoYm9hcmRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG4gICAgY2xpZW50OiBDbGllbnRbXTtcclxuICAgIHN0dWRlbnQ6IFN0dWRlbnRbXTtcclxuXHJcbiAgICBjb25zZW50Rm9ybTogYm9vbGVhbjtcclxuICAgIGxlYXJuaW5nU3R5bGVGb3JtOiBib29sZWFuO1xyXG5cclxuICAgIC8vdmFyaWFibGVzIHVzZWQgdG8gdG9nZ2xlIGRhaHNib2FyZCBpdGVtc1xyXG4gICAgY2xpZW50U3RhdHVzID0gZmFsc2U7XHJcbiAgICBtYW5hZ2VTdHVkZW50cyA9IGZhbHNlO1xyXG4gICAgbWFuYWdlU3RhZmYgPSBmYWxzZTtcclxuICAgIHN1aXRhYmlsaXR5ID0gZmFsc2U7XHJcbiAgICBjb25zZW50ID0gZmFsc2U7XHJcbiAgICBtYW5hZ2VDb3Vyc2VzID0gZmFsc2U7XHJcbiAgICBjYXNlTm90ZXMgPSBmYWxzZTtcclxuICAgIGxlYXJuaW5nU3R5bGUgPSBmYWxzZTtcclxuICAgIG1hZXNkcHJmID0gZmFsc2U7XHJcbiAgICB0aW1ldGFibGUgPSBmYWxzZTtcclxuICAgIGF0dGVuZGFuY2VMaXN0ID0gZmFsc2U7XHJcbiAgICBhdHRlbmRhbmNlUmVwb3J0ID0gZmFsc2U7XHJcbiAgICBmaWxlcyA9IGZhbHNlO1xyXG4gICAgd2FpdExpc3QgPSBmYWxzZTtcclxuICAgIHNpdGVBY3Rpdml0eSA9IGZhbHNlO1xyXG5cclxuICAgIHVzZXJUeXBlOiBhbnk7XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSByb3V0ZXI6IFJvdXRlciwgcHJpdmF0ZSBhdXRoU2VydmljZTogQXV0aFNlcnZpY2UsIHByaXZhdGUgY2xpZW50U2VydmljZTogQ2xpZW50U2VydmljZSwgIHByaXZhdGUgc3R1ZGVudFNlcnZpY2U6IFN0dWRlbnRTZXJ2aWNlKSB7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIG5nT25Jbml0KCkge1xyXG4gICAgICAgIHZhciBjdXJyZW50VXNlciA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2N1cnJlbnRVc2VyJykpO1xyXG4gICAgICAgIGlmICghY3VycmVudFVzZXIuYWN0aXZlKSB7XHJcbiAgICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJy9yZXNldC1wYXNzd29yZCddKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdmFyIHVzZXJUeXBlID0gY3VycmVudFVzZXIudXNlclR5cGU7XHJcbiAgICAgICAgICB2YXIgdXNlcklEID0gY3VycmVudFVzZXIudXNlcklEO1xyXG4gICAgICAgICAgdGhpcy5jaGVja0F1dGgodXNlclR5cGUsIHVzZXJJRCk7XHJcbiAgICAgICAgICB0aGlzLmNvbnNlbnRGb3JtID0gdHJ1ZTtcclxuICAgICAgICAgIHRoaXMubGVhcm5pbmdTdHlsZUZvcm0gPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjaGVja0F1dGgodXNlclR5cGUsIHVzZXJJRCkge1xyXG4gICAgICAgIHRoaXMudXNlclR5cGUgPSB1c2VyVHlwZTtcclxuICAgICAgICBpZiAodXNlclR5cGUuaW5kZXhPZignQWRtaW4nKSA+PSAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2xpZW50U3RhdHVzID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5tYW5hZ2VTdHVkZW50cyA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMubWFuYWdlU3RhZmYgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLnN1aXRhYmlsaXR5ID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5jYXNlTm90ZXMgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLm1hbmFnZUNvdXJzZXMgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLmF0dGVuZGFuY2VSZXBvcnQgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLmF0dGVuZGFuY2VMaXN0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy50aW1ldGFibGUgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLmNvbnNlbnQgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLmxlYXJuaW5nU3R5bGUgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLmZpbGVzID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy53YWl0TGlzdCA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuc2l0ZUFjdGl2aXR5ID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHVzZXJUeXBlLmluZGV4T2YoJ1N0YWZmJykgPj0gMCkge1xyXG4gICAgICAgICAgICB0aGlzLmNsaWVudFN0YXR1cyA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMubWFuYWdlU3R1ZGVudHMgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLnN1aXRhYmlsaXR5ID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy50aW1ldGFibGUgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLmNhc2VOb3RlcyA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMubWFuYWdlQ291cnNlcyA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuYXR0ZW5kYW5jZVJlcG9ydCA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuZmlsZXMgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLndhaXRMaXN0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5zaXRlQWN0aXZpdHkgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodXNlclR5cGUuaW5kZXhPZignSW5zdHJ1Y3RvcicpID49IDApIHtcclxuICAgICAgICAgICAgdGhpcy5hdHRlbmRhbmNlTGlzdCA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuYXR0ZW5kYW5jZVJlcG9ydCA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMudGltZXRhYmxlID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5jYXNlTm90ZXMgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodXNlclR5cGUgPT09ICdTdHVkZW50Jykge1xyXG4gICAgICAgICAgICB0aGlzLnRpbWV0YWJsZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuY29uc2VudCA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMubGVhcm5pbmdTdHlsZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuY2hlY2tGb3JtU3RhdHVzKHVzZXJUeXBlLCB1c2VySUQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodXNlclR5cGUgPT09ICdDbGllbnQnKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY29uc2VudCA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMubGVhcm5pbmdTdHlsZSA9IHRydWU7XHJcbiAgICAgICAgICAgIC8vdGhpcy5tYWVzZHByZiA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuY2hlY2tGb3JtU3RhdHVzKHVzZXJUeXBlLCB1c2VySUQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjaGVja0Zvcm1TdGF0dXModHlwZSwgdXNlcklEKSB7XHJcbiAgICAgIHN3YWwoe1xyXG4gICAgICAgIHRpdGxlOiAnTG9hZGluZy4uLidcclxuICAgICAgfSk7XHJcbiAgICAgIHN3YWwuc2hvd0xvYWRpbmcoKTtcclxuICAgICAgaWYgKHR5cGUgPT09ICdDbGllbnQnKSB7XHJcbiAgICAgICAgdGhpcy5jbGllbnRTZXJ2aWNlXHJcbiAgICAgICAgICAgIC5nZXRDbGllbnQodXNlcklEKVxyXG4gICAgICAgICAgICAudGhlbihvYmplY3QgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKChvYmplY3QgYXMgYW55KS5yZXN1bHQgPT09IFwiZXJyb3JcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2xpZW50ID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRpc3BsYXlFcnJvckFsZXJ0KG9iamVjdCk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2xpZW50ID0gb2JqZWN0WzBdLmZpcnN0TmFtZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnNlbnRGb3JtID0gb2JqZWN0WzBdLmNvbnNlbnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sZWFybmluZ1N0eWxlRm9ybSA9IG9iamVjdFswXS5sZWFybmluZ1N0eWxlO1xyXG4gICAgICAgICAgICAgICAgICAgIHN3YWwuY2xvc2UoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLmNhdGNoKGVycm9yID0+IGNvbnNvbGUubG9nKGVycm9yKSk7XHJcbiAgICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gJ1N0dWRlbnQnKSB7XHJcbiAgICAgICAgdGhpcy5zdHVkZW50U2VydmljZVxyXG4gICAgICAgICAgICAuZ2V0U3R1ZGVudCh1c2VySUQpXHJcbiAgICAgICAgICAgIC50aGVuKG9iamVjdCA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoKG9iamVjdCBhcyBhbnkpLnJlc3VsdCA9PT0gXCJlcnJvclwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdHVkZW50ID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRpc3BsYXlFcnJvckFsZXJ0KG9iamVjdCk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3R1ZGVudCA9IG9iamVjdC5maXJzdE5hbWU7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb25zZW50Rm9ybSA9IG9iamVjdC5jb25zZW50O1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubGVhcm5pbmdTdHlsZUZvcm0gPSBvYmplY3QubGVhcm5pbmdTdHlsZTtcclxuICAgICAgICAgICAgICAgICAgICBzd2FsLmNsb3NlKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5jYXRjaChlcnJvciA9PiBjb25zb2xlLmxvZyhlcnJvcikpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZGlzcGxheUVycm9yQWxlcnQoZXJyb3IpIHtcclxuICAgICAgc3dhbChcclxuICAgICAgICBlcnJvci50aXRsZSxcclxuICAgICAgICBlcnJvci5tc2csXHJcbiAgICAgICAgJ2Vycm9yJ1xyXG4gICAgICApO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==
