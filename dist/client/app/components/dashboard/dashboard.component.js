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
var authentication_service_1 = require("../../services/authentication.service");
var client_service_1 = require("../../services/client.service");
var student_service_1 = require("../../services/student.service");
var DashboardComponent = /** @class */ (function () {
    function DashboardComponent(router, authService, clientService, studentService) {
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
    DashboardComponent.prototype.ngOnInit = function () {
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
    };
    DashboardComponent.prototype.checkAuth = function (userType, userID) {
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
    };
    DashboardComponent.prototype.checkFormStatus = function (type, userID) {
        var _this = this;
        swal({
            title: 'Loading...'
        });
        swal.showLoading();
        if (type === 'Client') {
            this.clientService
                .getClient(userID)
                .then(function (object) {
                if (object.result === "error") {
                    _this.client = null;
                    _this.displayErrorAlert(object);
                }
                else {
                    _this.client = object[0].firstName;
                    _this.consentForm = object[0].consent;
                    _this.learningStyleForm = object[0].learningStyle;
                    swal.close();
                }
            })
                .catch(function (error) { return console.log(error); });
        }
        else if (type === 'Student') {
            this.studentService
                .getStudent(userID)
                .then(function (object) {
                if (object.result === "error") {
                    _this.student = null;
                    _this.displayErrorAlert(object);
                }
                else {
                    _this.student = object.firstName;
                    _this.consentForm = object.consent;
                    _this.learningStyleForm = object.learningStyle;
                    swal.close();
                }
            })
                .catch(function (error) { return console.log(error); });
        }
    };
    DashboardComponent.prototype.displayErrorAlert = function (error) {
        swal(error.title, error.msg, 'error');
    };
    DashboardComponent = __decorate([
        core_1.Component({
            selector: 'dashboard',
            templateUrl: './app/components/dashboard/dashboard.component.html',
            styleUrls: ['./app/components/dashboard/dashboard.component.css']
        }),
        __metadata("design:paramtypes", [router_1.Router, authentication_service_1.AuthService, client_service_1.ClientService, student_service_1.StudentService])
    ], DashboardComponent);
    return DashboardComponent;
}());
exports.DashboardComponent = DashboardComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NsaWVudC9hcHAvY29tcG9uZW50cy9kYXNoYm9hcmQvZGFzaGJvYXJkLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLHNDQUFrRDtBQUNsRCwwQ0FBeUM7QUFDekMsZ0ZBQW9FO0FBRXBFLGdFQUE4RDtBQUU5RCxrRUFBZ0U7QUFTaEU7SUEwQkksNEJBQW9CLE1BQWMsRUFBVSxXQUF3QixFQUFVLGFBQTRCLEVBQVcsY0FBOEI7UUFBL0gsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUFVLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBQVUsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFBVyxtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFuQm5KLDBDQUEwQztRQUMxQyxpQkFBWSxHQUFHLEtBQUssQ0FBQztRQUNyQixtQkFBYyxHQUFHLEtBQUssQ0FBQztRQUN2QixnQkFBVyxHQUFHLEtBQUssQ0FBQztRQUNwQixnQkFBVyxHQUFHLEtBQUssQ0FBQztRQUNwQixZQUFPLEdBQUcsS0FBSyxDQUFDO1FBQ2hCLGtCQUFhLEdBQUcsS0FBSyxDQUFDO1FBQ3RCLGNBQVMsR0FBRyxLQUFLLENBQUM7UUFDbEIsa0JBQWEsR0FBRyxLQUFLLENBQUM7UUFDdEIsYUFBUSxHQUFHLEtBQUssQ0FBQztRQUNqQixjQUFTLEdBQUcsS0FBSyxDQUFDO1FBQ2xCLG1CQUFjLEdBQUcsS0FBSyxDQUFDO1FBQ3ZCLHFCQUFnQixHQUFHLEtBQUssQ0FBQztRQUN6QixVQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ2QsYUFBUSxHQUFHLEtBQUssQ0FBQztRQUNqQixpQkFBWSxHQUFHLEtBQUssQ0FBQztJQU1yQixDQUFDO0lBRUQscUNBQVEsR0FBUjtRQUNJLElBQUksV0FBVyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDO1FBQ2xFLElBQUksQ0FBQyxXQUFXLENBQUMsTUFB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Q29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBSb3V0ZXIgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xyXG5pbXBvcnQgeyBBdXRoU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2F1dGhlbnRpY2F0aW9uLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBDbGllbnQgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL2NsaWVudFwiO1xyXG5pbXBvcnQgeyBDbGllbnRTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL2NsaWVudC5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IFN0dWRlbnQgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL3N0dWRlbnRcIjtcclxuaW1wb3J0IHsgU3R1ZGVudFNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvc3R1ZGVudC5zZXJ2aWNlXCI7XHJcbmRlY2xhcmUgdmFyIHN3YWw6IGFueTtcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6ICdkYXNoYm9hcmQnLFxyXG4gICAgdGVtcGxhdGVVcmw6ICcuL2FwcC9jb21wb25lbnRzL2Rhc2hib2FyZC9kYXNoYm9hcmQuY29tcG9uZW50Lmh0bWwnLFxyXG4gICAgc3R5bGVVcmxzOiBbJy4vYXBwL2NvbXBvbmVudHMvZGFzaGJvYXJkL2Rhc2hib2FyZC5jb21wb25lbnQuY3NzJ11cclxufSlcclxuXHJcbmV4cG9ydCBjbGFzcyBEYXNoYm9hcmRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG4gICAgY2xpZW50OiBDbGllbnRbXTtcclxuICAgIHN0dWRlbnQ6IFN0dWRlbnRbXTtcclxuXHJcbiAgICBjb25zZW50Rm9ybTogYm9vbGVhbjtcclxuICAgIGxlYXJuaW5nU3R5bGVGb3JtOiBib29sZWFuO1xyXG5cclxuICAgIC8vdmFyaWFibGVzIHVzZWQgdG8gdG9nZ2xlIGRhaHNib2FyZCBpdGVtc1xyXG4gICAgY2xpZW50U3RhdHVzID0gZmFsc2U7XHJcbiAgICBtYW5hZ2VTdHVkZW50cyA9IGZhbHNlO1xyXG4gICAgbWFuYWdlU3RhZmYgPSBmYWxzZTtcclxuICAgIHN1aXRhYmlsaXR5ID0gZmFsc2U7XHJcbiAgICBjb25zZW50ID0gZmFsc2U7XHJcbiAgICBtYW5hZ2VDb3Vyc2VzID0gZmFsc2U7XHJcbiAgICBjYXNlTm90ZXMgPSBmYWxzZTtcclxuICAgIGxlYXJuaW5nU3R5bGUgPSBmYWxzZTtcclxuICAgIG1hZXNkcHJmID0gZmFsc2U7XHJcbiAgICB0aW1ldGFibGUgPSBmYWxzZTtcclxuICAgIGF0dGVuZGFuY2VMaXN0ID0gZmFsc2U7XHJcbiAgICBhdHRlbmRhbmNlUmVwb3J0ID0gZmFsc2U7XHJcbiAgICBmaWxlcyA9IGZhbHNlO1xyXG4gICAgd2FpdExpc3QgPSBmYWxzZTtcclxuICAgIHNpdGVBY3Rpdml0eSA9IGZhbHNlO1xyXG5cclxuICAgIHVzZXJUeXBlOiBhbnk7XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSByb3V0ZXI6IFJvdXRlciwgcHJpdmF0ZSBhdXRoU2VydmljZTogQXV0aFNlcnZpY2UsIHByaXZhdGUgY2xpZW50U2VydmljZTogQ2xpZW50U2VydmljZSwgIHByaXZhdGUgc3R1ZGVudFNlcnZpY2U6IFN0dWRlbnRTZXJ2aWNlKSB7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIG5nT25Jbml0KCkge1xyXG4gICAgICAgIHZhciBjdXJyZW50VXNlciA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2N1cnJlbnRVc2VyJykpO1xyXG4gICAgICAgIGlmICghY3VycmVudFVzZXIuYWN0aXZlKSB7XHJcbiAgICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJy9yZXNldC1wYXNzd29yZCddKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdmFyIHVzZXJUeXBlID0gY3VycmVudFVzZXIudXNlclR5cGU7XHJcbiAgICAgICAgICB2YXIgdXNlcklEID0gY3VycmVudFVzZXIudXNlcklEO1xyXG4gICAgICAgICAgdGhpcy5jaGVja0F1dGgodXNlclR5cGUsIHVzZXJJRCk7XHJcbiAgICAgICAgICB0aGlzLmNvbnNlbnRGb3JtID0gdHJ1ZTtcclxuICAgICAgICAgIHRoaXMubGVhcm5pbmdTdHlsZUZvcm0gPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjaGVja0F1dGgodXNlclR5cGUsIHVzZXJJRCkge1xyXG4gICAgICAgIHRoaXMudXNlclR5cGUgPSB1c2VyVHlwZTtcclxuICAgICAgICBpZiAodXNlclR5cGUuaW5kZXhPZignQWRtaW4nKSA+PSAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2xpZW50U3RhdHVzID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5tYW5hZ2VTdHVkZW50cyA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMubWFuYWdlU3RhZmYgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLnN1aXRhYmlsaXR5ID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5jYXNlTm90ZXMgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLm1hbmFnZUNvdXJzZXMgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLmF0dGVuZGFuY2VSZXBvcnQgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLmF0dGVuZGFuY2VMaXN0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy50aW1ldGFibGUgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLmNvbnNlbnQgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLmxlYXJuaW5nU3R5bGUgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLmZpbGVzID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy53YWl0TGlzdCA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuc2l0ZUFjdGl2aXR5ID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHVzZXJUeXBlLmluZGV4T2YoJ1N0YWZmJykgPj0gMCkge1xyXG4gICAgICAgICAgICB0aGlzLmNsaWVudFN0YXR1cyA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMubWFuYWdlU3R1ZGVudHMgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLnN1aXRhYmlsaXR5ID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy50aW1ldGFibGUgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLmNhc2VOb3RlcyA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMubWFuYWdlQ291cnNlcyA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuYXR0ZW5kYW5jZVJlcG9ydCA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuZmlsZXMgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLndhaXRMaXN0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5zaXRlQWN0aXZpdHkgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodXNlclR5cGUuaW5kZXhPZignSW5zdHJ1Y3RvcicpID49IDApIHtcclxuICAgICAgICAgICAgdGhpcy5hdHRlbmRhbmNlTGlzdCA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuYXR0ZW5kYW5jZVJlcG9ydCA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMudGltZXRhYmxlID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5jYXNlTm90ZXMgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodXNlclR5cGUgPT09ICdTdHVkZW50Jykge1xyXG4gICAgICAgICAgICB0aGlzLnRpbWV0YWJsZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuY29uc2VudCA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMubGVhcm5pbmdTdHlsZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuY2hlY2tGb3JtU3RhdHVzKHVzZXJUeXBlLCB1c2VySUQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodXNlclR5cGUgPT09ICdDbGllbnQnKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY29uc2VudCA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMubGVhcm5pbmdTdHlsZSA9IHRydWU7XHJcbiAgICAgICAgICAgIC8vdGhpcy5tYWVzZHByZiA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuY2hlY2tGb3JtU3RhdHVzKHVzZXJUeXBlLCB1c2VySUQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjaGVja0Zvcm1TdGF0dXModHlwZSwgdXNlcklEKSB7XHJcbiAgICAgIHN3YWwoe1xyXG4gICAgICAgIHRpdGxlOiAnTG9hZGluZy4uLidcclxuICAgICAgfSk7XHJcbiAgICAgIHN3YWwuc2hvd0xvYWRpbmcoKTtcclxuICAgICAgaWYgKHR5cGUgPT09ICdDbGllbnQnKSB7XHJcbiAgICAgICAgdGhpcy5jbGllbnRTZXJ2aWNlXHJcbiAgICAgICAgICAgIC5nZXRDbGllbnQodXNlcklEKVxyXG4gICAgICAgICAgICAudGhlbihvYmplY3QgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKChvYmplY3QgYXMgYW55KS5yZXN1bHQgPT09IFwiZXJyb3JcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2xpZW50ID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRpc3BsYXlFcnJvckFsZXJ0KG9iamVjdCk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2xpZW50ID0gb2JqZWN0WzBdLmZpcnN0TmFtZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnNlbnRGb3JtID0gb2JqZWN0WzBdLmNvbnNlbnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sZWFybmluZ1N0eWxlRm9ybSA9IG9iamVjdFswXS5sZWFybmluZ1N0eWxlO1xyXG4gICAgICAgICAgICAgICAgICAgIHN3YWwuY2xvc2UoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLmNhdGNoKGVycm9yID0+IGNvbnNvbGUubG9nKGVycm9yKSk7XHJcbiAgICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gJ1N0dWRlbnQnKSB7XHJcbiAgICAgICAgdGhpcy5zdHVkZW50U2VydmljZVxyXG4gICAgICAgICAgICAuZ2V0U3R1ZGVudCh1c2VySUQpXHJcbiAgICAgICAgICAgIC50aGVuKG9iamVjdCA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoKG9iamVjdCBhcyBhbnkpLnJlc3VsdCA9PT0gXCJlcnJvclwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdHVkZW50ID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRpc3BsYXlFcnJvckFsZXJ0KG9iamVjdCk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3R1ZGVudCA9IG9iamVjdC5maXJzdE5hbWU7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb25zZW50Rm9ybSA9IG9iamVjdC5jb25zZW50O1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubGVhcm5pbmdTdHlsZUZvcm0gPSBvYmplY3QubGVhcm5pbmdTdHlsZTtcclxuICAgICAgICAgICAgICAgICAgICBzd2FsLmNsb3NlKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5jYXRjaChlcnJvciA9PiBjb25zb2xlLmxvZyhlcnJvcikpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZGlzcGxheUVycm9yQWxlcnQoZXJyb3IpIHtcclxuICAgICAgc3dhbChcclxuICAgICAgICBlcnJvci50aXRsZSxcclxuICAgICAgICBlcnJvci5tc2csXHJcbiAgICAgICAgJ2Vycm9yJ1xyXG4gICAgICApO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==
